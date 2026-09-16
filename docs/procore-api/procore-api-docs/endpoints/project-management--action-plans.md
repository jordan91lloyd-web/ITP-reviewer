# Procore API: Action Plans (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Action Plans)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Action Plan Approver Signature](#action-plan-approver-signature) - versions 1.0
- [Action Plan Approvers](#action-plan-approvers) - versions 1.0
- [Action Plan Change History Events](#action-plan-change-history-events) - versions 2.0
- [Action Plan Item Assignee Signature](#action-plan-item-assignee-signature) - versions 1.0
- [Action Plan Item Assignees](#action-plan-item-assignees) - versions 1.0
- [Action Plan Items](#action-plan-items) - versions 2.0, 1.0
- [Action Plan Parties](#action-plan-parties) - versions 1.0
- [Action Plan Receiver Signature](#action-plan-receiver-signature) - versions 1.0
- [Action Plan Receivers](#action-plan-receivers) - versions 1.0
- [Action Plan References](#action-plan-references) - versions 1.0
- [Action Plan Sections](#action-plan-sections) - versions 1.0
- [Action Plan Test Record Requests](#action-plan-test-record-requests) - versions 1.0
- [Action Plan Test Records](#action-plan-test-records) - versions 1.0
- [Action Plan Verification Methods](#action-plan-verification-methods) - versions 1.0
- [Action Plans](#action-plans) - versions 2.0, 1.0
- [Company Action Plan Template Item Assignees](#company-action-plan-template-item-assignees) - versions 1.0
- [Company Action Plan Template Items](#company-action-plan-template-items) - versions 1.0
- [Company Action Plan Template References](#company-action-plan-template-references) - versions 1.0
- [Company Action Plan Template Sections](#company-action-plan-template-sections) - versions 1.0
- [Company Action Plan Template Test Record Requests](#company-action-plan-template-test-record-requests) - versions 1.0
- [Company Action Plan Templates](#company-action-plan-templates) - versions 1.1, 1.0
- [Company Action Plan Types](#company-action-plan-types) - versions 1.0
- [Project Action Plan Template Approvers](#project-action-plan-template-approvers) - versions 1.0
- [Project Action Plan Template Item Assignees](#project-action-plan-template-item-assignees) - versions 1.0
- [Project Action Plan Template Items](#project-action-plan-template-items) - versions 1.0
- [Project Action Plan Template Receivers](#project-action-plan-template-receivers) - versions 1.0
- [Project Action Plan Template References](#project-action-plan-template-references) - versions 1.0
- [Project Action Plan Template Sections](#project-action-plan-template-sections) - versions 1.0
- [Project Action Plan Template Test Record Requests](#project-action-plan-template-test-record-requests) - versions 1.0
- [Project Action Plan Templates](#project-action-plan-templates) - versions 1.0

## Action Plan Approver Signature

Resource id: `action-plan-approver-signature`. Raw spec: `../openapi-raw/action-plan-approver-signature.json`. Web: https://developers.procore.com/reference/rest/action-plan-approver-signature?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_approvers/{plan_approver_id}/signature

**Show Action Plan Approver Signature**
Get the details of an Action Plan Approver Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_approver_id` [path] integer (required) - Action Plan Approver ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this signature record. e.g. `32`
- `attachment`: object
  - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
  - `content_type`: string - MIME type of the signature file. e.g. `image/png`
  - `name`: string - File name of the uploaded signature image. e.g. `action_plan_party_signature_1.png`
  - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
- `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
- `captured_by`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_approvers/{plan_approver_id}/signature

**Create Action Plan Approver Signature**
Create a single Action Plan Approver Signature.
Note that only one of `attachment` or `attachment_string` may be passed when creating a signature, not both.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_approver_id` [path] integer (required) - Action Plan Approver ID

Request body (application/json) (required):

- `signature`: object
  - `attachment_id`: integer (required) - Prostore File ID e.g. `42`
  - `upload_id`: string - Upload ID e.g. `01JDENGN32Z9AJN1EB8R6NWYGD`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this signature record. e.g. `32`
- `attachment`: object
  - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
  - `content_type`: string - MIME type of the signature file. e.g. `image/png`
  - `name`: string - File name of the uploaded signature image. e.g. `action_plan_party_signature_1.png`
  - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
- `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
- `captured_by`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_approvers/{plan_approver_id}/signature

**Delete Action Plan Approver Signature**
Delete an Action Plan Approver Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_approver_id` [path] integer (required) - Action Plan Approver ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Approvers

Resource id: `action-plan-approvers`. Raw spec: `../openapi-raw/action-plan-approvers.json`. Web: https://developers.procore.com/reference/rest/action-plan-approvers?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_approvers

**List Action Plan Approvers**
Returns all Action Plan Approvers for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Action Plan Approver. Use as the {plan_approver_id} path parameter to manage the approver's signature. e.g. `12`
- `plan_id`: integer - ID of the Action Plan this approver is assigned to. Use as filters[plan_id] to list approvers for a specific plan. e.g. `54`
- `updated_at`: string - Timestamp in ISO 8601 format when this approver record was last updated. Use with filters[updated_at] to retrieve recently changed approvers. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `signature`: object - Action Plan Approver Signature (Show)
  - `id`: integer - Unique identifier for this approver signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `image.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this approver signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Change History Events

Resource id: `action-plan-change-history-events`. Raw spec: `../openapi-raw/action-plan-change-history-events.json`. Web: https://developers.procore.com/reference/rest/action-plan-change-history-events?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plans/{plan_id}/change_history_events

**List of Change History Events for an Action Plan**
List oF Change History Events for an Action Plan

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `plan_id` [path] string (required) - Plan ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of the change history event. String in v2. e.g. `12`
  - `plan_id`: string - Unique identifier of the parent Action Plan. String in v2. e.g. `54`
  - `event_type`: string - Type of Event. The structure of the "event_data" attribute will be determined by this value. e.g. `plan_published`
  - `event_data`: object - Additional data pertaining to the event. Structure varies by event_type.
  - `user`: object
    - `id`: string - Unique identifier of the user who triggered the event. String in v2. e.g. `160586`
    - `login`: string - Login email address of the user who triggered the event. e.g. `exampleuser@example.com`
    - `name`: string - Full name of the user who triggered the event. e.g. `Carl Contractor`
  - `timestamp`: string - Timestamp when the change history event was recorded. e.g. `Wed Sep 21, 2016 at 10:00 AM`

Error responses: 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Item Assignee Signature

Resource id: `action-plan-item-assignee-signature`. Raw spec: `../openapi-raw/action-plan-item-assignee-signature.json`. Web: https://developers.procore.com/reference/rest/action-plan-item-assignee-signature?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/{plan_item_assignee_id}/signature

**Show Action Plan Item Assignee Signature**
Get the details of an Action Plan Item Assignee Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_item_assignee_id` [path] integer (required) - Action Plan Item Assignee ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this signature record. e.g. `32`
- `attachment`: object
  - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
  - `content_type`: string - MIME type of the signature file. e.g. `image/png`
  - `name`: string - File name of the uploaded signature image. e.g. `action_plan_party_signature_1.png`
  - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
- `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
- `captured_by`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/{plan_item_assignee_id}/signature

**Create Action Plan Item Assignee Signature**
Create a single Action Plan Item Assignee Signature.
Note that only one of `attachment` or `attachment_string` may be passed when creating a signature, not both.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_item_assignee_id` [path] integer (required) - Action Plan Item Assignee ID

Request body (application/json) (required):

- `signature`: object
  - `attachment_id`: integer (required) - Prostore File ID e.g. `42`
  - `upload_id`: string - Upload ID e.g. `01JDENGN32Z9AJN1EB8R6NWYGD`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this signature record. e.g. `32`
- `attachment`: object
  - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
  - `content_type`: string - MIME type of the signature file. e.g. `image/png`
  - `name`: string - File name of the uploaded signature image. e.g. `action_plan_party_signature_1.png`
  - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
- `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
- `captured_by`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/{plan_item_assignee_id}/signature

**Delete Action Plan Item Assignee Signature**
Delete an Action Plan Item Assignee Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_item_assignee_id` [path] integer (required) - Action Plan Item Assignee ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Item Assignees

Resource id: `action-plan-item-assignees`. Raw spec: `../openapi-raw/action-plan-item-assignees.json`. Web: https://developers.procore.com/reference/rest/action-plan-item-assignees?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees

**List Action Plan Item Assignees**
List of all Action Plan Item Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Action Plan Item Assignee. Use as the {id} path parameter to show, update, or delete the assignee. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan Item this assignee belongs to. Use with filters[plan_item_id] to list assignees for a specific item. e.g. `36`
- `created_at`: string - Timestamp in ISO 8601 format when this assignee was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
- `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `plan_id`: integer - ID of the Action Plan this assignee's item belongs to. Use with filters[plan_id] to list all assignees across a plan. e.g. `21`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of this assignee on the Action Plan Item. Determines which party type fills the sign-off slot. e.g. `specialty_contractor`
- `role_id`: integer - ID of the role record assigned to this Action Plan Item Assignee. Null when the assignee was added by party rather than by role. e.g. `17`
- `signature`: object - Action Plan Item Assignee Signature (Show)
  - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `action_plan_signature_1_2_assignee_53.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`
- `updated_at`: string - Timestamp in ISO 8601 format when this assignee was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier for this verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
  - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
  - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees

**Create Action Plan Item Assignee**
Create an Action Plan Item Assignee. NOTE: Though both body `party_id` and `role` parameters are marked as required below, at least one of the two needs to be passed in (i.e., if you pass in a `role` then you do not need to also pass in a `party_id`, and vice versa, though you can pass in both parameters)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_item_assignee`: object (required)
  - `plan_item_id`: integer (required) - Action Plan Item ID of the Action Plan Item Assignee to be set e.g. `42`
  - `is_holding`: boolean - Indicates whether or not the Action Item Assignee's signature is holding e.g. `true`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Action Plan Item Assignee to be set e.g. `specialty_contractor`
  - `verification_method_id`: integer - Verification Method ID of the Action Plan Item Assignee to be set e.g. `1`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Action Plan Item Assignee. Use as the {id} path parameter to show, update, or delete the assignee. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan Item this assignee belongs to. Use with filters[plan_item_id] to list assignees for a specific item. e.g. `36`
- `created_at`: string - Timestamp in ISO 8601 format when this assignee was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
- `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `plan_id`: integer - ID of the Action Plan this assignee's item belongs to. Use with filters[plan_id] to list all assignees across a plan. e.g. `21`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of this assignee on the Action Plan Item. Determines which party type fills the sign-off slot. e.g. `specialty_contractor`
- `role_id`: integer - ID of the role record assigned to this Action Plan Item Assignee. Null when the assignee was added by party rather than by role. e.g. `17`
- `signature`: object - Action Plan Item Assignee Signature (Show)
  - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `action_plan_signature_1_2_assignee_53.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`
- `updated_at`: string - Timestamp in ISO 8601 format when this assignee was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier for this verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
  - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
  - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/{id}

**Show Action Plan Item Assignee**
Details of a single Action Plan Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item Assignee ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Action Plan Item Assignee. Use as the {id} path parameter to show, update, or delete the assignee. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan Item this assignee belongs to. Use with filters[plan_item_id] to list assignees for a specific item. e.g. `36`
- `created_at`: string - Timestamp in ISO 8601 format when this assignee was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
- `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `plan_id`: integer - ID of the Action Plan this assignee's item belongs to. Use with filters[plan_id] to list all assignees across a plan. e.g. `21`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of this assignee on the Action Plan Item. Determines which party type fills the sign-off slot. e.g. `specialty_contractor`
- `role_id`: integer - ID of the role record assigned to this Action Plan Item Assignee. Null when the assignee was added by party rather than by role. e.g. `17`
- `signature`: object - Action Plan Item Assignee Signature (Show)
  - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `action_plan_signature_1_2_assignee_53.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`
- `updated_at`: string - Timestamp in ISO 8601 format when this assignee was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier for this verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
  - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
  - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/{id}

**Update Action Plan Item Assignee**
Updates a single Action Plan Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item Assignee ID

Request body (application/json) (required):

- `plan_item_assignee`: object (required)
  - `is_holding`: boolean - Indicates whether or not the Action Plan Item Assignee's signature is holding e.g. `true`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `verification_method_id`: integer - Verification Method ID of the Action Plan Item Assignee to be set e.g. `1`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Action Plan Item Assignee. Use as the {id} path parameter to show, update, or delete the assignee. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan Item this assignee belongs to. Use with filters[plan_item_id] to list assignees for a specific item. e.g. `36`
- `created_at`: string - Timestamp in ISO 8601 format when this assignee was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
- `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `plan_id`: integer - ID of the Action Plan this assignee's item belongs to. Use with filters[plan_id] to list all assignees across a plan. e.g. `21`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of this assignee on the Action Plan Item. Determines which party type fills the sign-off slot. e.g. `specialty_contractor`
- `role_id`: integer - ID of the role record assigned to this Action Plan Item Assignee. Null when the assignee was added by party rather than by role. e.g. `17`
- `signature`: object - Action Plan Item Assignee Signature (Show)
  - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `action_plan_signature_1_2_assignee_53.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`
- `updated_at`: string - Timestamp in ISO 8601 format when this assignee was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier for this verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
  - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
  - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/{id}

**Delete Action Plan Item Assignee**
Delete an Action Plan Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item Assignee ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_item_assignees

**List Recycled Action Plan Item Assignees**
List of all Recycled Action Plan Item Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this recycled Action Plan Item Assignee. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan Item this assignee belonged to. e.g. `36`
- `created_at`: string - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string - Timestamp in ISO 8601 format when this assignee was deleted. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether the assignee was required to sign for a hold point before deletion. e.g. `true`
- `is_locked`: boolean - Whether the assignee was added prior to the Action Plan's approval. e.g. `false`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `plan_id`: integer - ID of the Action Plan this assignee's item belonged to before deletion. e.g. `21`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role this assignee held on the Action Plan Item. e.g. `specialty_contractor`
- `role_id`: integer - ID of the role record assigned to this Action Plan Item Assignee. Null when the assignee was added by party rather than by role. e.g. `17`
- `signature`: object - Action Plan Item Assignee Signature (Show)
  - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `action_plan_signature_1_2_assignee_53.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`
- `updated_at`: string - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier for this verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
  - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
  - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_item_assignees/{id}

**Show Recycled Action Plan Item Assignee**
Details of a single Recycled Action Plan Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item Assignee ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this recycled Action Plan Item Assignee. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan Item this assignee belonged to. e.g. `36`
- `created_at`: string - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string - Timestamp in ISO 8601 format when this assignee was deleted. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether the assignee was required to sign for a hold point before deletion. e.g. `true`
- `is_locked`: boolean - Whether the assignee was added prior to the Action Plan's approval. e.g. `false`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `plan_id`: integer - ID of the Action Plan this assignee's item belonged to before deletion. e.g. `21`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role this assignee held on the Action Plan Item. e.g. `specialty_contractor`
- `role_id`: integer - ID of the role record assigned to this Action Plan Item Assignee. Null when the assignee was added by party rather than by role. e.g. `17`
- `signature`: object - Action Plan Item Assignee Signature (Show)
  - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `action_plan_signature_1_2_assignee_53.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`
- `updated_at`: string - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier for this verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
  - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
  - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/bulk_update

**Bulk Update Action Plan Item Assignees**
Updates multiple Action Plan Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_item_assignees`: array of object (required)
  - `id`: integer (required) - The ID of the Action Plan Item Assignee e.g. `123`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `verification_method_id`: integer - Verification Method ID of the Action Plan Item Assignee to be set e.g. `1`

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_item_assignees/bulk_create

**Bulk Create Action Plan Item Assignees**
Creates multiple Action Plan Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_item_assignees`: array of object (required)
  - `plan_item_id`: integer (required) - Action Plan Item ID of the Action Plan Item Assignee to be set e.g. `42`
  - `is_holding`: boolean - Indicates whether or not the Action Item Assignee's signature is holding e.g. `true`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Action Plan Item Assignee to be set e.g. `specialty_contractor`
  - `verification_method_id`: integer - Verification Method ID of the Action Plan Item Assignee to be set e.g. `1`

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Items

Resource id: `action-plan-items`. Raw spec: `../openapi-raw/action-plan-items.json`. Web: https://developers.procore.com/reference/rest/action-plan-items?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plan_items

**List Action Plan Items**
Returns Action Plan Items for a project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Section(s).
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[due_at]` [query] string(date-time) - Return item(s) due within the specified date range.
- `filters[status_id]` [query] array of integer - Array of Status IDs. A single Status ID is also accepted.
- `filters[assignee_party_id_or_role_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Assignee party ID(s) or role ID(s)
- `filters[attachment_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference attachment ID(s)
- `filters[drawing_revision_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference drawing revision ID(s)
- `filters[file_version_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference file version ID(s)
- `filters[plan_test_record_request_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Test Record Request ID(s).
- `filters[specification_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference specification section id ID(s)
- `filters[verification_method_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Assignee verification method ID(s)
- `filters[generic_tool_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Generic Tool Item ID(s)
- `filters[form_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Form ID(s)
- `filters[meeting_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Meeting ID(s)
- `filters[observation_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Observation Item ID(s)
- `filters[submittal_log_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference submittal log ID(s)
- `filters[record_checklist_template_id]` [query] integer - Return item(s) with the specified checklist template id.
- `filters[record_generic_tool_id]` [query] integer - Return item(s) with the specified Generic Tool ID.
- `filters[reference_type]` [query] array of string enum[attachment, document, drawing, generic_tool_item, specification_section, submittals] - Return item(s) associated with the specified Action Plan reference type(s)
- `view` [query] string enum[normal, flat_v0, ids] - Selects the response shape. `normal` (default) returns the full item; `flat_v0` returns a flattened representation with a bare `status_id`; `ids` returns only item ids.

Response 200 (application/json): oneOf(object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plan_items/{id}

**Update Action Plan Item**
Updates one Action Plan Item. Title, description, and holding type can be changed only when the parent Action Plan is in draft. Due date, notes, and status can be updated while the plan is in progress if the user has permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the resource.

Request body (application/json) (required):

- `plan_item`: object (required)
  - `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `Inspect fire extinguishers`
  - `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `Verify all extinguishers are charged and tagged.`
  - `due_at`: string(date-time) - Due date for this item in ISO 8601 format. e.g. `2024-12-19T00:00:00Z`
  - `holding_type`: string enum[plan, section] - Whether the item holds all succeeding items in the section or in the plan. e.g. `plan`
  - `notes`: string - Free text notes attached to this Action Plan Item. e.g. `Completed during morning walkthrough.`
  - `status_id`: string - ID of the item status to set. May be a built in status or a company custom status. e.g. `5`

Response 200 (application/json): object

- `data`: object - Action Plan Item. Field-for-field identical to the v1.0 Action Plan Item, except that every id / *_id attribute (at any nesting depth, including inside plan_item_assignees) is a string, per the Rest V2 convention, and...
  - `id`: string - Unique identifier for this Action Plan Item. e.g. `43584`
  - `plan_item_assignees`: array of object
    - `id`: string - Unique identifier for this Action Plan Item Assignee. e.g. `12`
    - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
    - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
    - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
    - `party`: object
    - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
    - `role_id`: string - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
    - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
    - `verification_method`: object
  - `created_at`: string - Timestamp in ISO 8601 format when this item was created. e.g. `2018-09-20T21:39:40Z`
  - `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `A New Action Plan Item Description`
  - `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date has been set. e.g. `2017-07-29T21:39:40Z`
  - `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
  - `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
  - `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
  - `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
  - `plan_id`: string - ID of the Action Plan this item belongs to. e.g. `43584`
  - `position`: integer - Ordinal position of this item within its section. e.g. `3`
  - `plan_section_id`: string - ID of the section this item belongs to within the Action Plan. e.g. `43584`
  - `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `A New Action Plan Item`
  - `status`: object
    - `id`: string - Unique identifier for the item status. Reflects the item's real status, including any company-custom status — unlike the v1.0 list endpoint, which downgrades company-custom statuses to the built-in status they map to. e.g. `2`
    - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing'). e.g. `in_progress`
    - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
    - `global`: boolean - Whether this is a built-in Procore status available to every company. e.g. `true`
  - `template_item_id`: string - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
  - `updated_at`: string - Timestamp in ISO 8601 format when this item was last updated. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_items  **[DEPRECATED]**

**List Action Plan Items**
Returns all Action Plan Items for a given Project.
**Deprecated.** Use the v2 Action Plan Items list endpoint (`GET /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plan_items`) instead.
For backwards compatibility, requests from Procore mobile clients (identified by a `Procore-OSName` header of `iOS` or `android`) have any company-custom item status downgraded to the built-in Procore status it maps to (`status` enum: `open`, `in_progress`, `delayed`, `closed`). For those clients the returned `status` object and `status_id` always reference one of the four built-in statuses (ids 1-4), never a company-custom status. All other clients receive the untouched status, including any company-custom status. Clients that need the full company-custom status must use the v2 endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Section(s).
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[due_at]` [query] string(date-time) - Return item(s) due within the specified date range.
- `filters[assignee_party_id_or_role_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Assignee party ID(s) or role ID(s)
- `filters[attachment_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference attachment ID(s)
- `filters[drawing_revision_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference drawing revision ID(s)
- `filters[file_version_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference file version ID(s)
- `filters[plan_test_record_request_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Test Record Request ID(s).
- `filters[specification_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference specification section id ID(s)
- `filters[verification_method_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Assignee verification method ID(s)
- `filters[generic_tool_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Generic Tool Item ID(s)
- `filters[form_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Form ID(s)
- `filters[meeting_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Meeting ID(s)
- `filters[observation_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference Observation Item ID(s)
- `filters[submittal_log_id]` [query] array of integer - Return item(s) associated with the specified Action Plan reference submittal log ID(s)
- `filters[record_checklist_template_id]` [query] integer - Return item(s) with the specified checklist template id.
- `filters[record_generic_tool_id]` [query] integer - Return item(s) with the specified Generic Tool ID.
- `filters[reference_type]` [query] array of string enum[attachment, document, drawing, generic_tool_item, specification_section, submittals] - Return item(s) associated with the specified Action Plan reference type(s)
- `filters[status_id]` [query] array of integer - Array of Status IDs. A single Status ID is also accepted.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Action Plan Item. Use as the {id} path parameter to show, update, delete, or move the item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string - Timestamp in ISO 8601 format when this item was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `A New Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date has been set. Use with filters[due_at] for deadline-based filtering. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this item belongs to. Use with filters[plan_id] to list all items in a specific plan. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Items are displayed in ascending position order. e.g. `3`
- `plan_section_id`: integer - ID of the section this item belongs to within the Action Plan. Use with filters[plan_section_id] to list items in a specific section. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `A New Action Plan Item`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `updated_at`: string - Timestamp in ISO 8601 format when this item was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_items

**Create Action Plan Item**
Creates an Action Plan Item for a given Action Plan Section.
For Procore mobile clients (identified by a `Procore-OSName` header of `iOS` or `android`), any company-custom item status in the response is downgraded to the built-in Procore status it maps to (`status` enum: `open`, `in_progress`, `delayed`, `closed`), so the returned `status` object and `status_id` always reference one of the four built-in statuses (ids 1-4). All other clients receive the untouched status. Use the v2 endpoint to always receive the full company-custom status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_item`: object (required)
  - `plan_section_id`: integer (required) - Section ID of the Action Plan Item e.g. `42`
  - `title`: string (required) - Title of the Action Plan Item e.g. `A new Action Plan Item`
  - `description`: string - Description of the Action Plan Item e.g. `Must perform the 2 items for the Action Plan Item`
  - `notes`: string - Notes for the Action Plan Item e.g. `Noting this Action Plan Item is complete`
  - `due_at`: string(date-time) - Due Date of the Action Plan Item e.g. `2017-07-29T21:39:40Z`
  - `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Action Plan Item. Use as the {id} path parameter to show, update, delete, or move the item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string - Timestamp in ISO 8601 format when this item was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `A New Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date has been set. Use with filters[due_at] for deadline-based filtering. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this item belongs to. Use with filters[plan_id] to list all items in a specific plan. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Items are displayed in ascending position order. e.g. `3`
- `plan_section_id`: integer - ID of the section this item belongs to within the Action Plan. Use with filters[plan_section_id] to list items in a specific section. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `A New Action Plan Item`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `updated_at`: string - Timestamp in ISO 8601 format when this item was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_items/{id}

**Show Action Plan Item**
Returns an Action Plan Item.
For Procore mobile clients (identified by a `Procore-OSName` header of `iOS` or `android`), any company-custom item status in the response is downgraded to the built-in Procore status it maps to (`status` enum: `open`, `in_progress`, `delayed`, `closed`), so the returned `status` object and `status_id` always reference one of the four built-in statuses (ids 1-4). All other clients receive the untouched status. Use the v2 endpoint to always receive the full company-custom status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Action Plan Item. Use as the {id} path parameter to show, update, delete, or move the item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string - Timestamp in ISO 8601 format when this item was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `A New Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date has been set. Use with filters[due_at] for deadline-based filtering. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this item belongs to. Use with filters[plan_id] to list all items in a specific plan. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Items are displayed in ascending position order. e.g. `3`
- `plan_section_id`: integer - ID of the section this item belongs to within the Action Plan. Use with filters[plan_section_id] to list items in a specific section. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `A New Action Plan Item`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `updated_at`: string - Timestamp in ISO 8601 format when this item was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plan_items/{id}  **[DEPRECATED]**

**Update Action Plan Item**
Updates an Action Plan Item.
**Deprecated.** Use the v2 Action Plan Item update endpoint (`PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plan_items/{id}`) instead.
For Procore mobile clients (identified by a `Procore-OSName` header of `iOS` or `android`), any company-custom item status in the response is downgraded to the built-in Procore status it maps to (`status` enum: `open`, `in_progress`, `delayed`, `closed`), so the returned `status` object and `status_id` always reference one of the four built-in statuses (ids 1-4). All other clients receive the untouched status. Use the v2 endpoint to always receive the full company-custom status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item ID

Request body (application/json) (required):

- `plan_item`: object (required)
  - `title`: string - Title of the Action Plan Item e.g. `A new Action Plan Item`
  - `description`: string - Description of the Action Plan Item e.g. `Must perform the 2 items for the Action Plan Item`
  - `notes`: string - Notes for the Action Plan Item e.g. `Noting this Action Plan Item is complete`
  - `due_at`: string(date-time) - Due Date of the Action Plan Item e.g. `2017-07-29T21:39:40Z`
  - `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `section`
  - `status_id`: integer - Status ID of the Action Plan Item (1 - open, 2 - in_progress, 3 - delayed, 4 - closed) e.g. `2`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Action Plan Item. Use as the {id} path parameter to show, update, delete, or move the item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string - Timestamp in ISO 8601 format when this item was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `A New Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date has been set. Use with filters[due_at] for deadline-based filtering. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this item belongs to. Use with filters[plan_id] to list all items in a specific plan. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Items are displayed in ascending position order. e.g. `3`
- `plan_section_id`: integer - ID of the section this item belongs to within the Action Plan. Use with filters[plan_section_id] to list items in a specific section. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `A New Action Plan Item`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `updated_at`: string - Timestamp in ISO 8601 format when this item was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_items/{id}

**Delete Action Plan Item**
Deletes an Action Plan Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plan_items/bulk_update

**Bulk Update Action Plan Item**
Updates multiple Action Plan Items.
For Procore mobile clients (identified by a `Procore-OSName` header of `iOS` or `android`), any company-custom item status in the response is downgraded to the built-in Procore status it maps to (`status` enum: `open`, `in_progress`, `delayed`, `closed`), so the returned `status` object and `status_id` always reference one of the four built-in statuses (ids 1-4). All other clients receive the untouched status. Use the v2 endpoint to always receive the full company-custom status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_items`: array of object (required)
  - `id`: integer (required) - ID of the Action Plan Item e.g. `43584`
  - `title`: string - Title of the Action Plan Item e.g. `A new Action Plan Item`
  - `description`: string - Description of the Action Plan Item e.g. `Must perform the 2 items for the Action Plan Item`
  - `notes`: string - Notes for the Action Plan Item e.g. `Noting this Action Plan Item is complete`
  - `due_at`: string(date-time) - Due Date of the Action Plan Item e.g. `2017-07-29T21:39:40Z`
  - `status_id`: integer - Status ID of the Action Plan Item (1 - open, 2 - in_progress, 3 - delayed, 4 - closed) e.g. `2`

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Action Plan Item. Use as the {id} path parameter to show, update, delete, or move the item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string - Timestamp in ISO 8601 format when this item was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `A New Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date has been set. Use with filters[due_at] for deadline-based filtering. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this item belongs to. Use with filters[plan_id] to list all items in a specific plan. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Items are displayed in ascending position order. e.g. `3`
- `plan_section_id`: integer - ID of the section this item belongs to within the Action Plan. Use with filters[plan_section_id] to list items in a specific section. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `A New Action Plan Item`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `updated_at`: string - Timestamp in ISO 8601 format when this item was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_items/{id}/move

**Move Action Plan Item within or across Sections**
Move Action Plan Item within or across Action Plan Sections.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item ID
- `next_plan_item_id` [query] integer - ID of the Action Plan Item that will follow the newly moved Item. When moving an Item to the last position of the Section, do not provide this parameter.
- `plan_section_id` [query] integer (required) - ID of the Action Plan Section the Item will move within or to

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_items/create_from_item

**Create a copy of the Action Plan Item in the Item's Section.**
Create a copy of the Action Plan Item in the Item's Section.
For Procore mobile clients (identified by a `Procore-OSName` header of `iOS` or `android`), any company-custom item status in the response is downgraded to the built-in Procore status it maps to (`status` enum: `open`, `in_progress`, `delayed`, `closed`), so the returned `status` object and `status_id` always reference one of the four built-in statuses (ids 1-4). All other clients receive the untouched status. Use the v2 endpoint to always receive the full company-custom status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_item_id`: integer (required) - ID of the Action Plan Item to copy from. e.g. `4435`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Action Plan Item. Use as the {id} path parameter to show, update, delete, or move the item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string - Timestamp in ISO 8601 format when this item was created. Use with filters[created_at] for date-range filtering. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this Action Plan Item. e.g. `A New Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date has been set. Use with filters[due_at] for deadline-based filtering. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this item belongs to. Use with filters[plan_id] to list all items in a specific plan. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Items are displayed in ascending position order. e.g. `3`
- `plan_section_id`: integer - ID of the section this item belongs to within the Action Plan. Use with filters[plan_section_id] to list items in a specific section. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this Action Plan Item. e.g. `A New Action Plan Item`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `updated_at`: string - Timestamp in ISO 8601 format when this item was last updated. Use with filters[updated_at] for change-based polling. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_items

**List Recycled Action Plan Items**
Returns all Recycled Action Plan Items for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Section(s).
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[query]` [query] string - Return item(s) containing search query

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this recycled Action Plan Item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp in ISO 8601 format when this item was created. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp in ISO 8601 format when this item was deleted. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this item. e.g. `A New Recycled Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date was set. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this recycled item belonged to. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section at the time of deletion. e.g. `3`
- `plan_section_id`: integer - ID of the section this recycled item belonged to. e.g. `43584`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this recycled item. e.g. `A New Recycled Action Plan Item`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this item was last updated. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_items/{id}

**Show Recycled Action Plan Item**
Returns a Specific Recycled Action Plan Item for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Item ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this recycled Action Plan Item. e.g. `43584`
- `plan_item_assignees`: array of object
  - `id`: integer - Unique identifier for this Action Plan Item Assignee. e.g. `12`
  - `created_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was created. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `is_locked`: boolean - Boolean flag indicating whether the assignee was added prior to an Action Plan's approval e.g. `false`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, null, internal] - Organizational role of this assignee on the Action Plan Item. e.g. `specialty_contractor`
  - `role_id`: integer - ID of the role record assigned to this assignee. Null when the assignee was added by party rather than by role. e.g. `17`
  - `signature`: object - Action Plan Item Assignee Signature (Show)
    - `id`: integer - Unique identifier for this item assignee signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this assignee was last updated. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier for this verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is currently available for assignment. Inactive methods may still appear on existing assignees. e.g. `true`
    - `name`: string - Display name of the verification method (e.g., Hold Point, Witness Point, Review Record). e.g. `Hold Point`
    - `source_key`: string - Machine-readable key for this verification method. Use for programmatic comparisons rather than the display name. e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp in ISO 8601 format when this item was created. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp in ISO 8601 format when this item was deleted. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection required for this item. e.g. `A New Recycled Action Plan Item Description`
- `due_at`: string(date-time) - Due date for this item in ISO 8601 format. Null if no due date was set. e.g. `2017-07-29T21:39:40Z`
- `holding_type`: string enum[plan, section] - Action Plan Item holding type specifies whether the current item holds all the succeeding items in the section or the plan e.g. `plan`
- `is_blocked`: boolean - Indicates whether current Action Plan Item is blocked by another Action Plan Item
- `is_blocking`: boolean - Indicates whether current Action Plan Item is blocking other Action Plan Items
- `notes`: string - Free-text notes attached to this Action Plan Item. e.g. `Noting this Action Plan Item is complete`
- `plan_id`: integer - ID of the Action Plan this recycled item belonged to. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section at the time of deletion. e.g. `3`
- `plan_section_id`: integer - ID of the section this recycled item belonged to. e.g. `43584`
- `status`: object
  - `id`: integer - Unique identifier for the item status. For Procore mobile clients (requests sending a `Procore-OSName` header of `iOS` or `android`) the v1.0 Action Plan Item endpoints downgrade company-custom statuses to the built-i... e.g. `2`
  - `name`: string - Display name of the status (e.g. 'In Progress', or a company-custom name such as 'Ready for Testing' where the status isn't downgraded). e.g. `in_progress`
  - `status`: string enum[open, in_progress, delayed, closed] - Underlying status type category this status maps to. Custom company statuses map to one of these built-in keys. e.g. `in_progress`
  - `global`: boolean - Whether this is a built-in Procore status available to every company. Always true for Procore mobile clients on the v1.0 Action Plan Item endpoints (their company-custom statuses are downgraded to built-ins); other cl... e.g. `true`
- `template_item_id`: integer - ID of the plan template item this item was generated from. Null if the item was created directly rather than from a template. e.g. `43584`
- `title`: string - Short title summarizing the inspection or task for this recycled item. e.g. `A New Recycled Action Plan Item`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this item was last updated. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Parties

Resource id: `action-plan-parties`. Raw spec: `../openapi-raw/action-plan-parties.json`. Web: https://developers.procore.com/reference/rest/action-plan-parties?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/parties

**List Action Plan Parties**
List of all project Action Plan Parties

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name] - Sort the collection by full name. Ascending by default; prefix the value with a hyphen (`-name`) to sort descending.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this party person within the project directory. e.g. `23`
- `first_name`: string - First name of the party person. e.g. `Paul`
- `last_name`: string - Last name of the party person. e.g. `Admin`
- `name`: string - Full display name of the party person (first and last name combined). e.g. `Paul Admin`
- `vendor`: object
  - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
  - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `user_id`: integer - User ID of the login account associated with this party person. Null if the party person has no login account. e.g. `453`
- `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
- `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
- `potential_approver`: boolean - Whether this party person is eligible to serve as an Action Plan approver. Use to filter candidates when assigning approvers. e.g. `true`
- `potential_assignee`: boolean - Whether this party person is eligible to be assigned to Action Plan items. Use to filter candidates when assigning item assignees. e.g. `true`
- `potential_manager`: boolean - Whether this party person is eligible to serve as an Action Plan manager. Use to filter candidates when assigning plan managers. e.g. `true`
- `potential_receiver`: boolean - Whether this party person is eligible to serve as an Action Plan receiver. Use to filter candidates when assigning receivers. e.g. `true`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2018-09-20T21:39:40Z`
- `login`: string - Email address (login) of the party person's user account. Null if no login account exists. e.g. `paul@example.com`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Receiver Signature

Resource id: `action-plan-receiver-signature`. Raw spec: `../openapi-raw/action-plan-receiver-signature.json`. Web: https://developers.procore.com/reference/rest/action-plan-receiver-signature?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_receivers/{plan_receiver_id}/signature

**Show Action Plan Receiver Signature**
Get the details of an Action Plan Receiver Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_receiver_id` [path] integer (required) - Action Plan Receiver ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this signature record. e.g. `32`
- `attachment`: object
  - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
  - `content_type`: string - MIME type of the signature file. e.g. `image/png`
  - `name`: string - File name of the uploaded signature image. e.g. `action_plan_party_signature_1.png`
  - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
- `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
- `captured_by`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_receivers/{plan_receiver_id}/signature

**Create Action Plan Receiver Signature**
Create a single Action Plan Receiver Signature.
Note that only one of `attachment` or `attachment_string` may be passed when creating a signature, not both.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_receiver_id` [path] integer (required) - Action Plan Receiver ID

Request body (application/json) (required):

- `signature`: object
  - `attachment_id`: integer (required) - Prostore File ID e.g. `42`
  - `upload_id`: string - Upload ID e.g. `01JDENGN32Z9AJN1EB8R6NWYGD`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this signature record. e.g. `32`
- `attachment`: object
  - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
  - `content_type`: string - MIME type of the signature file. e.g. `image/png`
  - `name`: string - File name of the uploaded signature image. e.g. `action_plan_party_signature_1.png`
  - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
- `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
- `captured_by`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_receivers/{plan_receiver_id}/signature

**Delete Action Plan Receiver Signature**
Delete an Action Plan Receiver Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_receiver_id` [path] integer (required) - Action Plan Receiver ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Receivers

Resource id: `action-plan-receivers`. Raw spec: `../openapi-raw/action-plan-receivers.json`. Web: https://developers.procore.com/reference/rest/action-plan-receivers?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_receivers

**List Action Plan Receivers**
Returns all Action Plan Receivers for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Action Plan receiver assignment. e.g. `54`
- `plan_id`: integer - ID of the Action Plan this receiver is assigned to. Use as the plan_id filter when listing receivers for a specific plan. e.g. `54`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this receiver assignment was last updated. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `signature`: object - Action Plan Receiver Signature (Show)
  - `id`: integer - Unique identifier for this signature record. e.g. `32`
  - `attachment`: object
    - `id`: integer - Unique identifier of the Prostore file containing the signature image. e.g. `23`
    - `content_type`: string - MIME type of the signature file. e.g. `image/png`
    - `name`: string - File name of the uploaded signature image. e.g. `action_plan_receiver_signature_1.png`
    - `url`: string - URL to download the signature image. The URL is temporary and expires after a period. e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/signature.png`
  - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
  - `captured_by`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Indicates whether Party is an Employee of the current Company e.g. `true`
    - `employee_id`: integer - Employee ID of this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `contractor@example.com`
    - `vendor`: object
    - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this party person record was last updated. e.g. `2017-01-04T21:27:18Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan References

Resource id: `action-plan-references`. Raw spec: `../openapi-raw/action-plan-references.json`. Web: https://developers.procore.com/reference/rest/action-plan-references?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_references

**List Action Plan References**
List of all Action Plan References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Action Plan reference. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was created. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Type-specific payload containing identifiers for the referenced resource. The fields present depend on the value of the type field.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - ID of the Drawing that contains the referenced revision.
  - `drawing_revision_id`: integer - ID of the current Drawing Revision for the referenced Drawing.
  - `file_version_id`: integer - ID of the current File Version for the referenced Document.
  - `folder_id`: integer - ID of the Folder containing the referenced Document.
  - `specification_section_id`: integer - ID of the referenced Specification Section. e.g. `55`
  - `specification_section_current_revision_id`: integer - ID of the current revision of the referenced Specification Section. Null if no revision exists. e.g. `42`
  - `submittal_log_id`: integer - ID of the referenced Submittal Log entry. e.g. `65`
  - `generic_tool_item_id`: integer - ID of the referenced Generic Tool Item (Correspondence).
  - `generic_tool_id`: integer - ID of the Generic Tool (Correspondence tool) that the referenced item belongs to. Present when the reference type is generic_tool_item.
  - `form_id`: integer - ID of the referenced Form.
  - `meeting_id`: integer - ID of the referenced Meeting.
  - `observation_item_id`: integer - ID of the referenced Observation Item.
  - `image_id`: integer - ID of the referenced image. Present when the reference type is image.
  - `viewer_url`: string - URL to open the referenced item in the Procore web viewer. Present for attachment, form, image, and document management reference types.
  - `collection_id`: string(uuid) - Document collection ID for a document management reference.
  - `container_id`: string(uuid) - Document container ID for a document management reference.
  - `document_revision_id`: string - Document revision ID for a document management reference. Null for open items showing the latest revision.
  - `document_name`: string - Name of the referenced document management document.
- `plan_id`: integer - ID of the Action Plan that owns the item this reference is attached to. e.g. `985`
- `type`: string enum[attachment, drawing, specification_section, submittal_log, document, document_management_document_reference, generic_tool_item, form, meeting, observation_item, image] - Type of resource this reference points to. e.g. `specification_section`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was last updated. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was soft-deleted. Null if the reference is active. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_references

**Create Action Plan Reference**
Create an Action Plan Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_reference`: object (required)
  - `plan_item_id`: integer (required) - Action Plan Item ID e.g. `54`
  - `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, submittal_log, generic_tool_item, form, meeting, observation_item] (required) - Action Plan Reference Type e.g. `specification_section`
  - `payload`: object (required) - One of attachment, drawing_revision_id, file_version_id, document_management_document_reference, specification_section_id, submittal_log_id, generic_tool_item_id, form_id, meeting_id, or observation_item_id is accepte...
    - `drawing_revision_id`: integer - Drawing Revision ID e.g. `53`
    - `file_version_id`: integer - File Version ID e.g. `54`
    - `document_management_document_reference`: object - PDM (Product Document Management) document reference
      - `collection_id`: string(uuid) - Document collection ID e.g. `123e4567-e89b-12d3-a456-426614174000`
      - `container_id`: string(uuid) - Document container ID e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `specification_section_id`: integer - Specification Section ID e.g. `55`
    - `submittal_log_id`: integer - Submittal Log ID e.g. `65`
    - `generic_tool_item_id`: integer - Generic Tool Item (Correspondence) ID e.g. `56`
    - `form_id`: integer - Form ID e.g. `57`
    - `meeting_id`: integer - Meeting ID e.g. `58`
    - `observation_item_id`: integer - Observation Item ID e.g. `59`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Action Plan reference. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was created. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Type-specific payload containing identifiers for the referenced resource. The fields present depend on the value of the type field.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - ID of the Drawing that contains the referenced revision.
  - `drawing_revision_id`: integer - ID of the current Drawing Revision for the referenced Drawing.
  - `file_version_id`: integer - ID of the current File Version for the referenced Document.
  - `folder_id`: integer - ID of the Folder containing the referenced Document.
  - `specification_section_id`: integer - ID of the referenced Specification Section. e.g. `55`
  - `specification_section_current_revision_id`: integer - ID of the current revision of the referenced Specification Section. Null if no revision exists. e.g. `42`
  - `submittal_log_id`: integer - ID of the referenced Submittal Log entry. e.g. `65`
  - `generic_tool_item_id`: integer - ID of the referenced Generic Tool Item (Correspondence).
  - `generic_tool_id`: integer - ID of the Generic Tool (Correspondence tool) that the referenced item belongs to. Present when the reference type is generic_tool_item.
  - `form_id`: integer - ID of the referenced Form.
  - `meeting_id`: integer - ID of the referenced Meeting.
  - `observation_item_id`: integer - ID of the referenced Observation Item.
  - `image_id`: integer - ID of the referenced image. Present when the reference type is image.
  - `viewer_url`: string - URL to open the referenced item in the Procore web viewer. Present for attachment, form, image, and document management reference types.
  - `collection_id`: string(uuid) - Document collection ID for a document management reference.
  - `container_id`: string(uuid) - Document container ID for a document management reference.
  - `document_revision_id`: string - Document revision ID for a document management reference. Null for open items showing the latest revision.
  - `document_name`: string - Name of the referenced document management document.
- `plan_id`: integer - ID of the Action Plan that owns the item this reference is attached to. e.g. `985`
- `type`: string enum[attachment, drawing, specification_section, submittal_log, document, document_management_document_reference, generic_tool_item, form, meeting, observation_item, image] - Type of resource this reference points to. e.g. `specification_section`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was last updated. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was soft-deleted. Null if the reference is active. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_references/{id}

**Show Action Plan Reference**
Returns an Action Plan Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Reference ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Action Plan reference. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was created. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Type-specific payload containing identifiers for the referenced resource. The fields present depend on the value of the type field.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - ID of the Drawing that contains the referenced revision.
  - `drawing_revision_id`: integer - ID of the current Drawing Revision for the referenced Drawing.
  - `file_version_id`: integer - ID of the current File Version for the referenced Document.
  - `folder_id`: integer - ID of the Folder containing the referenced Document.
  - `specification_section_id`: integer - ID of the referenced Specification Section. e.g. `55`
  - `specification_section_current_revision_id`: integer - ID of the current revision of the referenced Specification Section. Null if no revision exists. e.g. `42`
  - `submittal_log_id`: integer - ID of the referenced Submittal Log entry. e.g. `65`
  - `generic_tool_item_id`: integer - ID of the referenced Generic Tool Item (Correspondence).
  - `generic_tool_id`: integer - ID of the Generic Tool (Correspondence tool) that the referenced item belongs to. Present when the reference type is generic_tool_item.
  - `form_id`: integer - ID of the referenced Form.
  - `meeting_id`: integer - ID of the referenced Meeting.
  - `observation_item_id`: integer - ID of the referenced Observation Item.
  - `image_id`: integer - ID of the referenced image. Present when the reference type is image.
  - `viewer_url`: string - URL to open the referenced item in the Procore web viewer. Present for attachment, form, image, and document management reference types.
  - `collection_id`: string(uuid) - Document collection ID for a document management reference.
  - `container_id`: string(uuid) - Document container ID for a document management reference.
  - `document_revision_id`: string - Document revision ID for a document management reference. Null for open items showing the latest revision.
  - `document_name`: string - Name of the referenced document management document.
- `plan_id`: integer - ID of the Action Plan that owns the item this reference is attached to. e.g. `985`
- `type`: string enum[attachment, drawing, specification_section, submittal_log, document, document_management_document_reference, generic_tool_item, form, meeting, observation_item, image] - Type of resource this reference points to. e.g. `specification_section`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was last updated. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was soft-deleted. Null if the reference is active. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_references/{id}

**Delete Action Plan Reference**
Deletes an Action Plan Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Reference ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_references

**List Recycled Action Plan References**
List of all Recycled Action Plan References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Action Plan reference. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was created. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Type-specific payload containing identifiers for the referenced resource. The fields present depend on the value of the type field.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - ID of the Drawing that contains the referenced revision.
  - `drawing_revision_id`: integer - ID of the current Drawing Revision for the referenced Drawing.
  - `file_version_id`: integer - ID of the current File Version for the referenced Document.
  - `folder_id`: integer - ID of the Folder containing the referenced Document.
  - `specification_section_id`: integer - ID of the referenced Specification Section. e.g. `55`
  - `specification_section_current_revision_id`: integer - ID of the current revision of the referenced Specification Section. Null if no revision exists. e.g. `42`
  - `submittal_log_id`: integer - ID of the referenced Submittal Log entry. e.g. `65`
  - `generic_tool_item_id`: integer - ID of the referenced Generic Tool Item (Correspondence).
  - `generic_tool_id`: integer - ID of the Generic Tool (Correspondence tool) that the referenced item belongs to. Present when the reference type is generic_tool_item.
  - `form_id`: integer - ID of the referenced Form.
  - `meeting_id`: integer - ID of the referenced Meeting.
  - `observation_item_id`: integer - ID of the referenced Observation Item.
  - `image_id`: integer - ID of the referenced image. Present when the reference type is image.
  - `viewer_url`: string - URL to open the referenced item in the Procore web viewer. Present for attachment, form, image, and document management reference types.
  - `collection_id`: string(uuid) - Document collection ID for a document management reference.
  - `container_id`: string(uuid) - Document container ID for a document management reference.
  - `document_revision_id`: string - Document revision ID for a document management reference. Null for open items showing the latest revision.
  - `document_name`: string - Name of the referenced document management document.
- `plan_id`: integer - ID of the Action Plan that owns the item this reference is attached to. e.g. `985`
- `type`: string enum[attachment, drawing, specification_section, submittal_log, document, document_management_document_reference, generic_tool_item, form, meeting, observation_item, image] - Type of resource this reference points to. e.g. `specification_section`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was last updated. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was soft-deleted. Null if the reference is active. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_references/{id}

**Show Recycled Action Plan Reference**
Returns a Recycled Action Plan Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Reference ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Action Plan reference. e.g. `12`
- `plan_item_id`: integer - ID of the Action Plan item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was created. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Type-specific payload containing identifiers for the referenced resource. The fields present depend on the value of the type field.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - ID of the Drawing that contains the referenced revision.
  - `drawing_revision_id`: integer - ID of the current Drawing Revision for the referenced Drawing.
  - `file_version_id`: integer - ID of the current File Version for the referenced Document.
  - `folder_id`: integer - ID of the Folder containing the referenced Document.
  - `specification_section_id`: integer - ID of the referenced Specification Section. e.g. `55`
  - `specification_section_current_revision_id`: integer - ID of the current revision of the referenced Specification Section. Null if no revision exists. e.g. `42`
  - `submittal_log_id`: integer - ID of the referenced Submittal Log entry. e.g. `65`
  - `generic_tool_item_id`: integer - ID of the referenced Generic Tool Item (Correspondence).
  - `generic_tool_id`: integer - ID of the Generic Tool (Correspondence tool) that the referenced item belongs to. Present when the reference type is generic_tool_item.
  - `form_id`: integer - ID of the referenced Form.
  - `meeting_id`: integer - ID of the referenced Meeting.
  - `observation_item_id`: integer - ID of the referenced Observation Item.
  - `image_id`: integer - ID of the referenced image. Present when the reference type is image.
  - `viewer_url`: string - URL to open the referenced item in the Procore web viewer. Present for attachment, form, image, and document management reference types.
  - `collection_id`: string(uuid) - Document collection ID for a document management reference.
  - `container_id`: string(uuid) - Document container ID for a document management reference.
  - `document_revision_id`: string - Document revision ID for a document management reference. Null for open items showing the latest revision.
  - `document_name`: string - Name of the referenced document management document.
- `plan_id`: integer - ID of the Action Plan that owns the item this reference is attached to. e.g. `985`
- `type`: string enum[attachment, drawing, specification_section, submittal_log, document, document_management_document_reference, generic_tool_item, form, meeting, observation_item, image] - Type of resource this reference points to. e.g. `specification_section`
- `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was last updated. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp in ISO 8601 format when this reference was soft-deleted. Null if the reference is active. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_references/bulk_create

**Bulk Create Action Plan References**
Creates multiple Action References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_references`: array of object (required)
  - `plan_item_id`: integer (required) - Action Plan Item ID e.g. `54`
  - `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, submittal_log, generic_tool_item, form, meeting, observation_item] (required) - Action Plan Reference Type e.g. `specification_section`
  - `payload`: object (required) - One of attachment, drawing_revision_id, file_version_id, document_management_document_reference, specification_section_id, submittal_log_id, generic_tool_item_id, form_id, meeting_id, or observation_item_id is accepte...
    - `drawing_revision_id`: integer - Drawing Revision ID e.g. `53`
    - `file_version_id`: integer - File Version ID e.g. `54`
    - `document_management_document_reference`: object - PDM (Product Document Management) document reference
      - `collection_id`: string(uuid) - Document collection ID e.g. `123e4567-e89b-12d3-a456-426614174000`
      - `container_id`: string(uuid) - Document container ID e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `specification_section_id`: integer - Specification Section ID e.g. `55`
    - `submittal_log_id`: integer - Submittal Log ID e.g. `65`
    - `generic_tool_item_id`: integer - Generic Tool Item (Correspondence) ID e.g. `56`
    - `form_id`: integer - Form ID e.g. `57`
    - `meeting_id`: integer - Meeting ID e.g. `58`
    - `observation_item_id`: integer - Observation Item ID e.g. `59`

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Sections

Resource id: `action-plan-sections`. Raw spec: `../openapi-raw/action-plan-sections.json`. Web: https://developers.procore.com/reference/rest/action-plan-sections?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_sections

**List Action Plan Sections**
Returns all Action Plan Sections for a given Project.
**View Parameter:**
- `normal` (default): Returns standard Action Plan Section attributes
- `extended`: Returns standard attributes plus nested `plan_items` array
- `ids`: Returns an array of Action Plan Section IDs only

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `view` [query] string enum[normal, extended, ids] - Specifies which view (which attributes) of the Action Plan Section is going to be present in the response. - `normal` (default): Returns standard Action Plan Section attributes - `extended`: Returns standard attribute...

Response 200 (application/json): oneOf(array of object | array of object | array of integer)


Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_sections

**Create Action Plan Section**
Creates an Action Plan Section for a given Action Plan.
**View Parameter:**
- `normal` (default): Returns standard Action Plan Section attributes
- `extended`: Returns standard attributes plus nested `plan_items` array

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended, ids] - Specifies which view (which attributes) of the Action Plan Section is going to be present in the response. - `normal` (default): Returns standard Action Plan Section attributes - `extended`: Returns standard attribute...

Request body (application/json) (required):

- `plan_section`: object (required)
  - `plan_id`: integer (required) - Action Plan ID e.g. `42`
  - `title`: string (required) - Title e.g. `A new Action Plan Section`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_sections/{id}

**Show Action Plan Section**
Returns an Action Plan Section.
**View Parameter:**
- `normal` (default): Returns standard Action Plan Section attributes
- `extended`: Returns standard attributes plus nested `plan_items` array

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Section ID
- `view` [query] string enum[normal, extended, ids] - Specifies which view (which attributes) of the Action Plan Section is going to be present in the response. - `normal` (default): Returns standard Action Plan Section attributes - `extended`: Returns standard attribute...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plan_sections/{id}

**Update Action Plan Section**
Updates an Action Plan Section.
**View Parameter:**
- `normal` (default): Returns standard Action Plan Section attributes
- `extended`: Returns standard attributes plus nested `plan_items` array

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Section ID
- `view` [query] string enum[normal, extended, ids] - Specifies which view (which attributes) of the Action Plan Section is going to be present in the response. - `normal` (default): Returns standard Action Plan Section attributes - `extended`: Returns standard attribute...

Request body (application/json) (required):

- `plan_section`: object (required)
  - `title`: string - Title e.g. `An updated Action Plan Section`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_sections/{id}

**Delete Action Plan Section**
Deletes an Action Plan Section

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Section ID

Response 204: No Content (no body)

Error responses: 400, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_sections/{id}/move

**Move Action Plan Section**
Moves the Action Plan Section.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Section ID
- `next_section_id` [query] integer - ID of the Action Plan Section that will follow the newly moved Section. When moving an Action Plan Section to the last position of the Action Plan, do not provide this parameter.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_sections/create_from_section

**Create a copy of the Action Plan Section in the Action Plan of the Section.**
Create a copy of the Action Plan Section in the Action Plan of the Section.
**View Parameter:**
- `normal` (default): Returns standard Action Plan Section attributes
- `extended`: Returns standard attributes plus nested `plan_items` array

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended, ids] - Specifies which view (which attributes) of the Action Plan Section is going to be present in the response. - `normal` (default): Returns standard Action Plan Section attributes - `extended`: Returns standard attribute...

Request body (application/json) (required):

- `plan_section_id`: integer (required) - ID of the Action Plan Section to copy from. e.g. `4435`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_sections

**List Recycled Action Plan Sections**
Returns all Recycled Action Plan Sections for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this deleted Action Plan section. e.g. `43584`
- `created_at`: string - Timestamp in ISO 8601 format when this section was created. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string - Timestamp in ISO 8601 format when this section was soft-deleted. e.g. `2017-01-16T18:42:12Z`
- `plan_id`: integer - ID of the Action Plan this deleted section belonged to. e.g. `57`
- `position`: integer - Ordinal position this section held within its Action Plan before deletion. e.g. `3`
- `title`: string - Display title of the deleted section. e.g. `A New Action Plan Section`
- `updated_at`: string - Timestamp in ISO 8601 format when this section was last updated before deletion. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_sections/{id}

**Show Recycled Action Plan Section**
Returns a Recycled Action Plan Section

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Section ID

Response 200 (application/json): object

- `id`: integer - Unique identifier for this deleted Action Plan section. e.g. `43584`
- `created_at`: string - Timestamp in ISO 8601 format when this section was created. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string - Timestamp in ISO 8601 format when this section was soft-deleted. e.g. `2017-01-16T18:42:12Z`
- `plan_id`: integer - ID of the Action Plan this deleted section belonged to. e.g. `57`
- `position`: integer - Ordinal position this section held within its Action Plan before deletion. e.g. `3`
- `title`: string - Display title of the deleted section. e.g. `A New Action Plan Section`
- `updated_at`: string - Timestamp in ISO 8601 format when this section was last updated before deletion. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Test Record Requests

Resource id: `action-plan-test-record-requests`. Raw spec: `../openapi-raw/action-plan-test-record-requests.json`. Web: https://developers.procore.com/reference/rest/action-plan-test-record-requests?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests

**List Action Plan Test Record Requests**
List of all Action Plan Test Record Requests

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[type]` [query] array of string - Return item(s) associated with the specified Action Plan Test Record Type(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the test record request. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record Request
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_records_count`: integer - Count of Action Plan Test Records linked to this Action Plan Test Record Request e.g. `2`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `type_id`: integer - Identifier of the test record type lookup record. e.g. `347`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests

**Create Action Plan Test Record Request**
Create an Action Plan Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_test_record_request`: object (required)
  - `plan_item_id`: integer (required) - Action Plan Item ID e.g. `42`
  - `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] (required) - Action Plan Test Record Type e.g. `checklist`
  - `payload`: object - Used to specify extra required details for some types.
    - `checklist_template_id`: integer - Checklist Template ID for the checklist type test record request e.g. `42`
    - `form_template_id`: integer - Form Template ID for the form type test record request e.g. `43`
    - `generic_tool_id`: integer - Generic Tool ID for the generic_tool type test record request e.g. `41`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the test record request. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record Request
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_records_count`: integer - Count of Action Plan Test Records linked to this Action Plan Test Record Request e.g. `2`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `type_id`: integer - Identifier of the test record type lookup record. e.g. `347`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests/{id}

**Show Action Plan Test Record Request**
Returns an Action Plan Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Test Record Request ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the test record request. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record Request
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_records_count`: integer - Count of Action Plan Test Records linked to this Action Plan Test Record Request e.g. `2`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `type_id`: integer - Identifier of the test record type lookup record. e.g. `347`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests/{id}

**Delete Action Plan Test Record Request**
Deletes an Action Plan Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Test Record Request ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_test_record_requests

**List Recycled Action Plan Test Record Requests**
List of all Recycled Action Plan Test Record Requests

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[type]` [query] array of string - Return item(s) associated with the specified Action Plan Test Record Type(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the test record request. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the test record request was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record Request
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_records_count`: integer - Count of Action Plan Test Records linked to this Action Plan Test Record Request e.g. `2`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `type_id`: integer - Identifier of the test record type lookup record. e.g. `347`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_test_record_requests/{id}

**Show Recycled Action Plan Test Record Request**
Returns a Recycled Action Plan Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Test Record Request ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the test record request. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the test record request was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record Request
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_records_count`: integer - Count of Action Plan Test Records linked to this Action Plan Test Record Request e.g. `2`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `type_id`: integer - Identifier of the test record type lookup record. e.g. `347`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests/bulk_create

**Bulk Create Action Plan Test Record Requests**
Creates multiple Action Test Record Requests

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_test_record_requests`: array of object (required)
  - `plan_item_id`: integer (required) - Action Plan Item ID e.g. `42`
  - `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] (required) - Action Plan Test Record Type e.g. `checklist`
  - `payload`: object - Used to specify extra required details for some types.
    - `checklist_template_id`: integer - Checklist Template ID for the checklist type test record request e.g. `42`
    - `form_template_id`: integer - Form Template ID for the form type test record request e.g. `43`
    - `generic_tool_id`: integer - Generic Tool ID for the generic_tool type test record request e.g. `41`

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Test Records

Resource id: `action-plan-test-records`. Raw spec: `../openapi-raw/action-plan-test-records.json`. Web: https://developers.procore.com/reference/rest/action-plan-test-records?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_test_records

**List Action Plan Test Records**
List of all Action Plan Test Records

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[plan_test_record_request_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Test Record Request ID(s).
- `filters[type]` [query] array of string - Return item(s) associated with the specified Action Plan Test Record Types.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the test record. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record
  - `checklist_id`: integer - Identifier of the linked checklist instance. Present when type is 'checklist'. e.g. `55`
  - `checklist_template_id`: integer - Identifier of the checklist template used. Present when type is 'checklist'. e.g. `42`
  - `form_id`: integer - Identifier of the linked form instance. Present when type is 'form'. e.g. `43`
  - `form_template_id`: integer - Identifier of the form template used. Present when type is 'form'. e.g. `44`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `56`
  - `generic_tool_item_id`: integer - Identifier of the linked generic tool item record. Present when type is 'generic_tool'. e.g. `57`
  - `meeting_id`: integer - Identifier of the linked meeting. Present when type is 'meeting'. e.g. `45`
  - `submittal_log_id`: integer - Identifier of the linked submittal log. Present when type is 'submittal_log'. e.g. `58`
  - `observation_item_id`: integer - Identifier of the linked observation item. Present when type is 'observation'. e.g. `59`
  - `viewer_url`: string - URL to view the linked record in context. Present for attachment, photo, and form types.
  - `attachment`: object
    - `id`: integer - Unique identifier of the uploaded file. e.g. `5324`
    - `url`: string - Download URL for the uploaded file. e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Thumbnail URL for the uploaded file. Null if no thumbnail is available. e.g. `http://www.example.com/`
    - `name`: string - Original file name of the upload. e.g. `january_receipt_copy.jpg`
    - `content_type`: string - MIME content type of the uploaded file. e.g. `image/jpg`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_record_request_id`: integer - Unique identifier of the parent test record request this record fulfills. e.g. `42`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, photo, submittal_log, observation] - Categorization of the test record. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_records

**Create Action Plan Test Record**
Create an Action Plan Test Record
Action Plan Test Records can have one of the following payload formats (checklist_id, form_id, generic_tool_id, meeting_id, submittal_log_id, observation_item_id, attachment)
Attachment payloads must be a binary file or contain an attachment_id, upload_id, drawing_revision_id, file_version_id, form_id, or image_id.
A specific Action Plan Test Record Type can only leverage its corresponding format.
*For instance, Checklist Test Records can only leverage checklist_id while Attachment/Photo Test Records can only leverage attachment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_test_record`: object (required)
  - `plan_item_id`: integer (required) - ID of the associated Action Plan Control Activity e.g. `54`
  - `plan_test_record_request_id`: integer (required) - ID of the associated Action Plan Test Record Request e.g. `42`
  - `type`: string enum[attachment, checklist, form, generic_tool, meeting, photo, submittal_log, observation] (required) - Action Plan Test Record Type e.g. `checklist`
  - `payload`: oneOf(object | object | object | object | object | object | object) (required)

Response 201 (application/json): object

- `id`: integer - Unique identifier of the test record. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record
  - `checklist_id`: integer - Identifier of the linked checklist instance. Present when type is 'checklist'. e.g. `55`
  - `checklist_template_id`: integer - Identifier of the checklist template used. Present when type is 'checklist'. e.g. `42`
  - `form_id`: integer - Identifier of the linked form instance. Present when type is 'form'. e.g. `43`
  - `form_template_id`: integer - Identifier of the form template used. Present when type is 'form'. e.g. `44`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `56`
  - `generic_tool_item_id`: integer - Identifier of the linked generic tool item record. Present when type is 'generic_tool'. e.g. `57`
  - `meeting_id`: integer - Identifier of the linked meeting. Present when type is 'meeting'. e.g. `45`
  - `submittal_log_id`: integer - Identifier of the linked submittal log. Present when type is 'submittal_log'. e.g. `58`
  - `observation_item_id`: integer - Identifier of the linked observation item. Present when type is 'observation'. e.g. `59`
  - `viewer_url`: string - URL to view the linked record in context. Present for attachment, photo, and form types.
  - `attachment`: object
    - `id`: integer - Unique identifier of the uploaded file. e.g. `5324`
    - `url`: string - Download URL for the uploaded file. e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Thumbnail URL for the uploaded file. Null if no thumbnail is available. e.g. `http://www.example.com/`
    - `name`: string - Original file name of the upload. e.g. `january_receipt_copy.jpg`
    - `content_type`: string - MIME content type of the uploaded file. e.g. `image/jpg`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_record_request_id`: integer - Unique identifier of the parent test record request this record fulfills. e.g. `42`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, photo, submittal_log, observation] - Categorization of the test record. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_test_records/{id}

**View an Action Plan Test Record**
Returns the details of an Action Plan Test Record

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Test Record ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the test record. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record
  - `checklist_id`: integer - Identifier of the linked checklist instance. Present when type is 'checklist'. e.g. `55`
  - `checklist_template_id`: integer - Identifier of the checklist template used. Present when type is 'checklist'. e.g. `42`
  - `form_id`: integer - Identifier of the linked form instance. Present when type is 'form'. e.g. `43`
  - `form_template_id`: integer - Identifier of the form template used. Present when type is 'form'. e.g. `44`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `56`
  - `generic_tool_item_id`: integer - Identifier of the linked generic tool item record. Present when type is 'generic_tool'. e.g. `57`
  - `meeting_id`: integer - Identifier of the linked meeting. Present when type is 'meeting'. e.g. `45`
  - `submittal_log_id`: integer - Identifier of the linked submittal log. Present when type is 'submittal_log'. e.g. `58`
  - `observation_item_id`: integer - Identifier of the linked observation item. Present when type is 'observation'. e.g. `59`
  - `viewer_url`: string - URL to view the linked record in context. Present for attachment, photo, and form types.
  - `attachment`: object
    - `id`: integer - Unique identifier of the uploaded file. e.g. `5324`
    - `url`: string - Download URL for the uploaded file. e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Thumbnail URL for the uploaded file. Null if no thumbnail is available. e.g. `http://www.example.com/`
    - `name`: string - Original file name of the upload. e.g. `january_receipt_copy.jpg`
    - `content_type`: string - MIME content type of the uploaded file. e.g. `image/jpg`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_record_request_id`: integer - Unique identifier of the parent test record request this record fulfills. e.g. `42`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, photo, submittal_log, observation] - Categorization of the test record. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_test_records/{id}

**Delete Action Plan Test Record**
Deletes an Action Plan Test Record

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Test Record ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_test_records

**List Recyled Action Plan Test Records**
List of all Recycled Action Plan Test Records

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_id]` [query] array of integer - Return item(s) associated with the specified Action Plan ID(s)
- `filters[plan_test_record_request_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Test Record Request ID(s).
- `filters[type]` [query] array of string - Return item(s) associated with the specified Action Plan Test Record Type(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the test record. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the test record was moved to the recycle bin. ISO 8601 format. e.g. `2019-10-25T18:46:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record
  - `checklist_id`: integer - Identifier of the linked checklist instance. Present when type is 'checklist'. e.g. `55`
  - `checklist_template_id`: integer - Identifier of the checklist template used. Present when type is 'checklist'. e.g. `42`
  - `form_id`: integer - Identifier of the linked form instance. Present when type is 'form'. e.g. `43`
  - `form_template_id`: integer - Identifier of the form template used. Present when type is 'form'. e.g. `44`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `56`
  - `generic_tool_item_id`: integer - Identifier of the linked generic tool item record. Present when type is 'generic_tool'. e.g. `57`
  - `meeting_id`: integer - Identifier of the linked meeting. Present when type is 'meeting'. e.g. `45`
  - `submittal_log_id`: integer - Identifier of the linked submittal log. Present when type is 'submittal_log'. e.g. `58`
  - `observation_item_id`: integer - Identifier of the linked observation item. Present when type is 'observation'. e.g. `59`
  - `viewer_url`: string - URL to view the linked record in context. Present for attachment, photo, and form types.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_record_request_id`: integer - Unique identifier of the parent test record request this record fulfills. e.g. `42`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_test_records/{id}

**Show Recycled Action Plan Test Record**
Returns a Recycled Action Plan Test Record

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Test Record ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the test record. e.g. `12`
- `plan_item_id`: integer - Unique identifier of the Action Plan Item this test record belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the test record was moved to the recycle bin. ISO 8601 format. e.g. `2019-10-25T18:46:40Z`
- `payload`: object - Contains specific attributes depending on the type of Action Plan Test Record
  - `checklist_id`: integer - Identifier of the linked checklist instance. Present when type is 'checklist'. e.g. `55`
  - `checklist_template_id`: integer - Identifier of the checklist template used. Present when type is 'checklist'. e.g. `42`
  - `form_id`: integer - Identifier of the linked form instance. Present when type is 'form'. e.g. `43`
  - `form_template_id`: integer - Identifier of the form template used. Present when type is 'form'. e.g. `44`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `56`
  - `generic_tool_item_id`: integer - Identifier of the linked generic tool item record. Present when type is 'generic_tool'. e.g. `57`
  - `meeting_id`: integer - Identifier of the linked meeting. Present when type is 'meeting'. e.g. `45`
  - `submittal_log_id`: integer - Identifier of the linked submittal log. Present when type is 'submittal_log'. e.g. `58`
  - `observation_item_id`: integer - Identifier of the linked observation item. Present when type is 'observation'. e.g. `59`
  - `viewer_url`: string - URL to view the linked record in context. Present for attachment, photo, and form types.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `plan_id`: integer - Unique identifier of the parent Action Plan. e.g. `985`
- `plan_test_record_request_id`: integer - Unique identifier of the parent test record request this record fulfills. e.g. `42`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plan Verification Methods

Resource id: `action-plan-verification-methods`. Raw spec: `../openapi-raw/action-plan-verification-methods.json`. Web: https://developers.procore.com/reference/rest/action-plan-verification-methods?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/action_plans/verification_methods

**List Action Plan Verification Methods**
List of all company Action Plan Verification Methods

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, name, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the verification method. e.g. `21`
- `active`: boolean - Whether this verification method is enabled for selection in Action Plan items. When false, it is hidden from selection in new plan items. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the verification method was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Display name of the verification method. e.g. `Hold Point`
- `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `updated_at`: string(date-time) - Timestamp when the verification method was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/verification_methods

**Create Action Plan Verification Methods**
Create an Action Plan Verification Method for a specified company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `verification_method`: object (required)
  - `active`: boolean - Specifies if the Action Plan Verification Method is intended for use
  - `name`: string (required) - Name e.g. `New Hold Point`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the verification method. e.g. `21`
- `active`: boolean - Whether this verification method is enabled for selection in Action Plan items. When false, it is hidden from selection in new plan items. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the verification method was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Display name of the verification method. e.g. `Hold Point`
- `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `updated_at`: string(date-time) - Timestamp when the verification method was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/action_plans/verification_methods/{id}

**Show Action Plan Verification Method**
Details of an Action Plan Verification Method

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Action Plan Verification Method ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the verification method. e.g. `21`
- `active`: boolean - Whether this verification method is enabled for selection in Action Plan items. When false, it is hidden from selection in new plan items. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the verification method was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Display name of the verification method. e.g. `Hold Point`
- `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `updated_at`: string(date-time) - Timestamp when the verification method was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/action_plans/verification_methods/{id}

**Update Action Plan Verification Method**
Update a company Action Plan Verification Method

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Action Plan Verification Method ID

Request body (application/json) (required):

- `verification_method`: object (required)
  - `active`: boolean - Specifies if the Action Plan Verification Method is intended for use

Response 200 (application/json): object

- `id`: integer - Unique identifier of the verification method. e.g. `21`
- `active`: boolean - Whether this verification method is enabled for selection in Action Plan items. When false, it is hidden from selection in new plan items. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the verification method was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Display name of the verification method. e.g. `Hold Point`
- `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `updated_at`: string(date-time) - Timestamp when the verification method was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/action_plans/verification_methods/{id}

**Delete Action Plan Verification Method**
Delete an Action Plan Verification Method

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Action Plan Verification Method ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Action Plans

Resource id: `action-plans`. Raw spec: `../openapi-raw/action-plans.json`. Web: https://developers.procore.com/reference/rest/action-plans?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plans/bulk_create_for_locations

**Bulk Create Action Plans for Locations**
Creates multiple Action Plans from a single Action Plan Template at a specified location. The endpoint enqueues background jobs to create the specified number of Action Plans asynchronously.
The template must be in "published" status. Templates in "draft" or "in_revision" status cannot be used to create plans.
Each Action Plan will be created with all sections, items, assignees, references, and test record requests copied from the template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `template_id`: string (required) - The ID of the Action Plan Template to create plans from e.g. `123`
- `location_id`: string (required) - The ID of the Location where the Action Plans will be created e.g. `456`
- `number_of_plans`: integer (required) - The number of Action Plans to create (1-1000) e.g. `10`

Response 202 (application/json): object

- `data`: object
  - `id`: string - Unique identifier for the batch of jobs e.g. `BV4VqSB2D_QoZg`
  - `template`: object - Information about the template used
    - `id`: string - The ID of the Action Plan Template e.g. `123`
    - `title`: string - The title of the Action Plan Template e.g. `Safety Inspection Template`
  - `plans`: object - Information about the Action Plans to be created
    - `count`: integer - The number of Action Plans that will be created e.g. `10`

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plans/bulk_create_for_assets

**Bulk Create Action Plans for Assets**
Creates one Action Plan per asset from a single Action Plan Template. Each created plan is automatically linked to its corresponding asset via the Related Items framework.
The endpoint is asynchronous: it returns `202 Accepted` with an `operation_id` and enqueues background jobs that create the plans and links in batches of 200. Clients poll the existing async-operations endpoint at `GET /rest/v2.0/companies/{company_id}/projects/{project_id}/submittals/async_operations/{operation_id}` for live progress and a per-asset success / failure breakdown.
Pre-flight validation rejects requests synchronously with `422` when any `asset_ids` entry does not belong to the project (deleted, cross-tenant, or typo'd) — those requests never persist an `Operations::Operation` row or fan out background workers.
Requires the Assets project tool to be active on the project. The selected template must be published and its plan type's configurable field set must have the `assets` field visible for this project; otherwise the request is rejected with `422`.
Each Action Plan is created with all sections, items, assignees, references, and test record requests copied from the template — identical to the per-plan create flow.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `template_id`: string (required) - The ID of the Action Plan Template to create plans from e.g. `123`
- `asset_ids`: array of string (required) - Asset IDs to create plans for. One Action Plan is created per unique asset id; duplicate ids in the array are deduped before fan-out. Up to 1,000 assets per request.

Response 202 (application/json): object

- `data`: object
  - `operation_id`: string - ID of the `Operations::Operation` row tracking this bulk create. Poll the async-operations endpoint with this id to observe progress and final per-asset status. e.g. `4242`
  - `status`: string enum[created, in_progress] - Initial operation status (typically `created` or `in_progress`) e.g. `created`
  - `template`: object - Information about the template used
    - `id`: string - The ID of the Action Plan Template e.g. `123`
    - `title`: string - The title of the Action Plan Template e.g. `Equipment Inspection Template`
  - `plans`: object - Information about the Action Plans that will be created
    - `count`: integer - The number of Action Plans that will be created (equals the count of unique, non-blank `asset_ids` after server-side dedupe). e.g. `3`

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plans

**List Action Plans**
List of all Action Plans

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[approver_id]` [query] array of integer - Return Action Plan(s) that have any of the specified Party IDs as an Action Plan Approver.
- `filters[custom_fields]` [query] object - Return Action Plan(s) whose custom field values match the supplied JSON object. Each key must be a custom field definition ID. A scalar value matches Action Plan(s) whose value for that field is equal to it; an array ...
- `filters[number]` [query] array of integer - Return Action Plan(s) with the specified Action Plan number(s). A range such as `10...20` is also accepted.
- `filters[receiver_id]` [query] array of integer - Return Action Plan(s) that have any of the specified Party IDs as an Action Plan Receiver. Matches every Receiver regardless of whether they have signed.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[manager_id]` [query] array of integer - Return item(s) with a specific Manager ID or a range of Manager ID(s).
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `filters[plan_type_id]` [query] array of integer - Action Plan Type ID. Returns item(s) with the specified Action Plan Type ID(s).
- `filters[template_id]` [query] array of integer - Return Action Plan(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, location, manager, number, title, plan_approvers, plan_receivers, plan_type, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `view` [query] string enum[list, normal, full, ids] - Controls which fields are included in the response. - `list` — Slim view for the plans index table. Returns only the fields rendered by the list UI: id, number, title, private, closed_item_count, total_item_count, sta...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Action Plan. e.g. `43584`
- `closed_item_count`: integer - Number of plan items with a closed status. e.g. `25`
- `created_at`: string(date-time) - Time the Action Plan was created e.g. `2018-09-20T21:39:40Z`
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
- `description`: string - Description of the Action Plan in rich text form e.g. `<p>Important Safety Action Plan.</p>`
- `description_plain_text`: string - Description of the Action Plan in plain text form e.g. `Important Safety Action Plan`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `manager`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `number`: integer - Sequential number assigned to the Action Plan within its project. e.g. `3`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `plan_status`: object
  - `id`: integer - Unique identifier of the plan status. e.g. `21`
  - `created_at`: string(date-time) - Timestamp when the status was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `global`: boolean - Whether this is a system-wide status available to all companies. Global statuses cannot be deleted. e.g. `true`
  - `name`: string - Display name of the plan status (e.g., 'In Progress', 'Closed'). e.g. `In Progress`
  - `status`: string - Underlying status type category. Custom company statuses map to one of these base types. e.g. `in_progress`
  - `updated_at`: string(date-time) - Timestamp when the status was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_approvers`: array of object
  - `id`: integer - Unique identifier for this Action Plan Approver. Use as the {plan_approver_id} path parameter to manage the approver's signature. e.g. `12`
  - `plan_id`: integer - ID of the Action Plan this approver is assigned to. Use as filters[plan_id] to list approvers for a specific plan. e.g. `54`
  - `updated_at`: string - Timestamp in ISO 8601 format when this approver record was last updated. Use with filters[updated_at] to retrieve recently changed approvers. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Approver Signature (Show)
    - `id`: integer - Unique identifier for this approver signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this approver signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `plan_receivers`: array of object
  - `id`: integer - Unique identifier for this Action Plan receiver assignment. e.g. `54`
  - `plan_id`: integer - ID of the Action Plan this receiver is assigned to. Use as the plan_id filter when listing receivers for a specific plan. e.g. `54`
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this receiver assignment was last updated. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Receiver Signature (Show)
    - `id`: integer - Unique identifier for this signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `private`: boolean - Whether the Action Plan is restricted to participants only. When true, only the manager, approvers, receivers, and assigned users can view the plan. e.g. `false`
- `status`: string enum[draft, in_progress, in_revision, completed] - Display name of the current plan status. Default values are draft, in_progress, and closed. Companies may define custom status names that map to underlying status types. e.g. `draft`
- `status_type`: string enum[draft, in_progress, in_revision, completed] - Underlying status type category for this plan's status. e.g. `draft`
- `template_id`: integer - Identifier of the Action Plan Template this plan was created from. Null if not created from a template.
- `title`: string - Title of the Action Plan e.g. `A New Action Plan`
- `total_item_count`: integer - Total number of plan items in this Action Plan, regardless of status. e.g. `50`
- `updated_at`: string(date-time) - Timestamp when the Action Plan was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `assets`: array of object
  - `id`: string - Unique identifier of the Asset e.g. `01KJS2QXHDVC95SWNT2EQTXDNQ`
  - `asset_code`: string - Code of the Asset e.g. `344`
  - `asset_status`: object - Status of the Asset
    - `id`: string - Unique identifier of the Asset Status e.g. `04K474PW6RZMEG6WHW6G2MPMNW`
    - `name`: string - Name of the Asset Status e.g. `Installed`
    - `metadata`: object
  - `asset_type`: object - Type of the Asset
    - `id`: string - Unique identifier of the Asset Type e.g. `01KH6JANKCPQ35F8Y1DCVTNJ9V`
    - `name`: string - Name of the Asset Type e.g. `SubType 1`
    - `metadata`: object
  - `modified_at`: string(date-time) - Timestamp of when the Asset was last modified e.g. `2026-03-03T05:29:11Z`
  - `title`: string - Title of the Asset e.g. `Test Asset`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plans

**Create Action Plan**
Create an Action Plan

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan`: object (required)
  - `title`: string (required) - Title of the Action Plan e.g. `A new Action Plan`
  - `description`: string - Description of the Action Plan e.g. `A description of the Action Plan`
  - `private`: boolean - Privacy flag of the Action Plan e.g. `false`
  - `location_id`: integer - Location ID to be set on the Action Plan e.g. `4`
  - `asset_ids`: array of string - Asset IDs to be set on the Action Plan e.g. `["1432", "2345"]`
  - `manager_id`: integer - Party Person ID of the Action Plan Manager e.g. `43`
  - `plan_type_id`: integer (required) - Plan Type ID to be set on the Action Plan e.g. `2`
  - `plan_approvers_attributes`: array of object
    - `party_id`: integer (required) - Party Person ID of the Action Plan Approver to be set
  - `plan_receivers_attributes`: array of object
    - `party_id`: integer (required) - Party Person ID of the Action Plan Receiver to be set
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Action Plan. e.g. `43584`
- `closed_item_count`: integer - Number of plan items with a closed status. e.g. `25`
- `created_at`: string(date-time) - Time the Action Plan was created e.g. `2018-09-20T21:39:40Z`
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
- `description`: string - Description of the Action Plan in rich text form e.g. `<p>Important Safety Action Plan.</p>`
- `description_plain_text`: string - Description of the Action Plan in plain text form e.g. `Important Safety Action Plan`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `manager`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `number`: integer - Sequential number assigned to the Action Plan within its project. e.g. `3`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `plan_status`: object
  - `id`: integer - Unique identifier of the plan status. e.g. `21`
  - `created_at`: string(date-time) - Timestamp when the status was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `global`: boolean - Whether this is a system-wide status available to all companies. Global statuses cannot be deleted. e.g. `true`
  - `name`: string - Display name of the plan status (e.g., 'In Progress', 'Closed'). e.g. `In Progress`
  - `status`: string - Underlying status type category. Custom company statuses map to one of these base types. e.g. `in_progress`
  - `updated_at`: string(date-time) - Timestamp when the status was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_approvers`: array of object
  - `id`: integer - Unique identifier for this Action Plan Approver. Use as the {plan_approver_id} path parameter to manage the approver's signature. e.g. `12`
  - `plan_id`: integer - ID of the Action Plan this approver is assigned to. Use as filters[plan_id] to list approvers for a specific plan. e.g. `54`
  - `updated_at`: string - Timestamp in ISO 8601 format when this approver record was last updated. Use with filters[updated_at] to retrieve recently changed approvers. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Approver Signature (Show)
    - `id`: integer - Unique identifier for this approver signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this approver signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `plan_receivers`: array of object
  - `id`: integer - Unique identifier for this Action Plan receiver assignment. e.g. `54`
  - `plan_id`: integer - ID of the Action Plan this receiver is assigned to. Use as the plan_id filter when listing receivers for a specific plan. e.g. `54`
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this receiver assignment was last updated. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Receiver Signature (Show)
    - `id`: integer - Unique identifier for this signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `private`: boolean - Whether the Action Plan is restricted to participants only. When true, only the manager, approvers, receivers, and assigned users can view the plan. e.g. `false`
- `status`: string enum[draft, in_progress, in_revision, completed] - Display name of the current plan status. Default values are draft, in_progress, and closed. Companies may define custom status names that map to underlying status types. e.g. `draft`
- `status_type`: string enum[draft, in_progress, in_revision, completed] - Underlying status type category for this plan's status. e.g. `draft`
- `template_id`: integer - Identifier of the Action Plan Template this plan was created from. Null if not created from a template.
- `title`: string - Title of the Action Plan e.g. `A New Action Plan`
- `total_item_count`: integer - Total number of plan items in this Action Plan, regardless of status. e.g. `50`
- `updated_at`: string(date-time) - Timestamp when the Action Plan was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `assets`: array of object
  - `id`: string - Unique identifier of the Asset e.g. `01KJS2QXHDVC95SWNT2EQTXDNQ`
  - `asset_code`: string - Code of the Asset e.g. `344`
  - `asset_status`: object - Status of the Asset
    - `id`: string - Unique identifier of the Asset Status e.g. `04K474PW6RZMEG6WHW6G2MPMNW`
    - `name`: string - Name of the Asset Status e.g. `Installed`
    - `metadata`: object
  - `asset_type`: object - Type of the Asset
    - `id`: string - Unique identifier of the Asset Type e.g. `01KH6JANKCPQ35F8Y1DCVTNJ9V`
    - `name`: string - Name of the Asset Type e.g. `SubType 1`
    - `metadata`: object
  - `modified_at`: string(date-time) - Timestamp of when the Asset was last modified e.g. `2026-03-03T05:29:11Z`
  - `title`: string - Title of the Asset e.g. `Test Asset`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plans/{id}

**Show Action Plan**
Details of a single Action Plan

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan. e.g. `43584`
- `closed_item_count`: integer - Number of plan items with a closed status. e.g. `25`
- `created_at`: string(date-time) - Time the Action Plan was created e.g. `2018-09-20T21:39:40Z`
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
- `description`: string - Description of the Action Plan in rich text form e.g. `<p>Important Safety Action Plan.</p>`
- `description_plain_text`: string - Description of the Action Plan in plain text form e.g. `Important Safety Action Plan`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `manager`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `number`: integer - Sequential number assigned to the Action Plan within its project. e.g. `3`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `plan_status`: object
  - `id`: integer - Unique identifier of the plan status. e.g. `21`
  - `created_at`: string(date-time) - Timestamp when the status was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `global`: boolean - Whether this is a system-wide status available to all companies. Global statuses cannot be deleted. e.g. `true`
  - `name`: string - Display name of the plan status (e.g., 'In Progress', 'Closed'). e.g. `In Progress`
  - `status`: string - Underlying status type category. Custom company statuses map to one of these base types. e.g. `in_progress`
  - `updated_at`: string(date-time) - Timestamp when the status was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_approvers`: array of object
  - `id`: integer - Unique identifier for this Action Plan Approver. Use as the {plan_approver_id} path parameter to manage the approver's signature. e.g. `12`
  - `plan_id`: integer - ID of the Action Plan this approver is assigned to. Use as filters[plan_id] to list approvers for a specific plan. e.g. `54`
  - `updated_at`: string - Timestamp in ISO 8601 format when this approver record was last updated. Use with filters[updated_at] to retrieve recently changed approvers. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Approver Signature (Show)
    - `id`: integer - Unique identifier for this approver signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this approver signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `plan_receivers`: array of object
  - `id`: integer - Unique identifier for this Action Plan receiver assignment. e.g. `54`
  - `plan_id`: integer - ID of the Action Plan this receiver is assigned to. Use as the plan_id filter when listing receivers for a specific plan. e.g. `54`
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this receiver assignment was last updated. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Receiver Signature (Show)
    - `id`: integer - Unique identifier for this signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `private`: boolean - Whether the Action Plan is restricted to participants only. When true, only the manager, approvers, receivers, and assigned users can view the plan. e.g. `false`
- `status`: string enum[draft, in_progress, in_revision, completed] - Display name of the current plan status. Default values are draft, in_progress, and closed. Companies may define custom status names that map to underlying status types. e.g. `draft`
- `status_type`: string enum[draft, in_progress, in_revision, completed] - Underlying status type category for this plan's status. e.g. `draft`
- `template_id`: integer - Identifier of the Action Plan Template this plan was created from. Null if not created from a template.
- `title`: string - Title of the Action Plan e.g. `A New Action Plan`
- `total_item_count`: integer - Total number of plan items in this Action Plan, regardless of status. e.g. `50`
- `updated_at`: string(date-time) - Timestamp when the Action Plan was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `assets`: array of object
  - `id`: string - Unique identifier of the Asset e.g. `01KJS2QXHDVC95SWNT2EQTXDNQ`
  - `asset_code`: string - Code of the Asset e.g. `344`
  - `asset_status`: object - Status of the Asset
    - `id`: string - Unique identifier of the Asset Status e.g. `04K474PW6RZMEG6WHW6G2MPMNW`
    - `name`: string - Name of the Asset Status e.g. `Installed`
    - `metadata`: object
  - `asset_type`: object - Type of the Asset
    - `id`: string - Unique identifier of the Asset Type e.g. `01KH6JANKCPQ35F8Y1DCVTNJ9V`
    - `name`: string - Name of the Asset Type e.g. `SubType 1`
    - `metadata`: object
  - `modified_at`: string(date-time) - Timestamp of when the Asset was last modified e.g. `2026-03-03T05:29:11Z`
  - `title`: string - Title of the Asset e.g. `Test Asset`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plans/{id}

**Update Action Plan**
Update an Action Plan

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan ID

Request body (application/json) (required):

- `plan`: object (required)
  - `title`: string - Title of the Action Plan e.g. `A new Action Plan`
  - `description`: string - Description of the Action Plan e.g. `A short description explaining what this Action Plan is supposed to do`
  - `private`: boolean - Privacy flag of the Action Plan e.g. `false`
  - `location_id`: integer - Location ID to be set on the Action Plan e.g. `4`
  - `asset_ids`: array of string - Asset IDs to be set on the Action Plan e.g. `["1432", "2345"]`
  - `manager_id`: integer - Party Person ID of the Action Plan Manager e.g. `43`
  - `plan_type_id`: integer - Plan Type ID to be set on the Action Plan e.g. `2`
  - `status_id`: integer - Action Plan Status ID to be set on the Action Plan e.g. `3`
  - `plan_approvers_attributes`: array of object
    - `party_id`: integer (required) - Party Person ID of the Action Approver to be set
  - `plan_receivers_attributes`: array of object
    - `party_id`: integer (required) - Party Person ID of the Action Receiver to be set
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan. e.g. `43584`
- `closed_item_count`: integer - Number of plan items with a closed status. e.g. `25`
- `created_at`: string(date-time) - Time the Action Plan was created e.g. `2018-09-20T21:39:40Z`
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
- `description`: string - Description of the Action Plan in rich text form e.g. `<p>Important Safety Action Plan.</p>`
- `description_plain_text`: string - Description of the Action Plan in plain text form e.g. `Important Safety Action Plan`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `manager`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `number`: integer - Sequential number assigned to the Action Plan within its project. e.g. `3`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `plan_status`: object
  - `id`: integer - Unique identifier of the plan status. e.g. `21`
  - `created_at`: string(date-time) - Timestamp when the status was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `global`: boolean - Whether this is a system-wide status available to all companies. Global statuses cannot be deleted. e.g. `true`
  - `name`: string - Display name of the plan status (e.g., 'In Progress', 'Closed'). e.g. `In Progress`
  - `status`: string - Underlying status type category. Custom company statuses map to one of these base types. e.g. `in_progress`
  - `updated_at`: string(date-time) - Timestamp when the status was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_approvers`: array of object
  - `id`: integer - Unique identifier for this Action Plan Approver. Use as the {plan_approver_id} path parameter to manage the approver's signature. e.g. `12`
  - `plan_id`: integer - ID of the Action Plan this approver is assigned to. Use as filters[plan_id] to list approvers for a specific plan. e.g. `54`
  - `updated_at`: string - Timestamp in ISO 8601 format when this approver record was last updated. Use with filters[updated_at] to retrieve recently changed approvers. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Approver Signature (Show)
    - `id`: integer - Unique identifier for this approver signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this approver signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `plan_receivers`: array of object
  - `id`: integer - Unique identifier for this Action Plan receiver assignment. e.g. `54`
  - `plan_id`: integer - ID of the Action Plan this receiver is assigned to. Use as the plan_id filter when listing receivers for a specific plan. e.g. `54`
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this receiver assignment was last updated. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Receiver Signature (Show)
    - `id`: integer - Unique identifier for this signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `private`: boolean - Whether the Action Plan is restricted to participants only. When true, only the manager, approvers, receivers, and assigned users can view the plan. e.g. `false`
- `status`: string enum[draft, in_progress, in_revision, completed] - Display name of the current plan status. Default values are draft, in_progress, and closed. Companies may define custom status names that map to underlying status types. e.g. `draft`
- `status_type`: string enum[draft, in_progress, in_revision, completed] - Underlying status type category for this plan's status. e.g. `draft`
- `template_id`: integer - Identifier of the Action Plan Template this plan was created from. Null if not created from a template.
- `title`: string - Title of the Action Plan e.g. `A New Action Plan`
- `total_item_count`: integer - Total number of plan items in this Action Plan, regardless of status. e.g. `50`
- `updated_at`: string(date-time) - Timestamp when the Action Plan was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `assets`: array of object
  - `id`: string - Unique identifier of the Asset e.g. `01KJS2QXHDVC95SWNT2EQTXDNQ`
  - `asset_code`: string - Code of the Asset e.g. `344`
  - `asset_status`: object - Status of the Asset
    - `id`: string - Unique identifier of the Asset Status e.g. `04K474PW6RZMEG6WHW6G2MPMNW`
    - `name`: string - Name of the Asset Status e.g. `Installed`
    - `metadata`: object
  - `asset_type`: object - Type of the Asset
    - `id`: string - Unique identifier of the Asset Type e.g. `01KH6JANKCPQ35F8Y1DCVTNJ9V`
    - `name`: string - Name of the Asset Type e.g. `SubType 1`
    - `metadata`: object
  - `modified_at`: string(date-time) - Timestamp of when the Asset was last modified e.g. `2026-03-03T05:29:11Z`
  - `title`: string - Title of the Asset e.g. `Test Asset`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plans/{id}

**Delete Action Plan**
Delete an Action Plan

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plans/{id}/revise

**Move Action Plan back into "Draft"**
Move Action Plan Back into "Draft". This will remove approver and receiver signatures from the Plan, and set the status to "draft". Once in this state, the Plan is able to be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan ID

Response 204: No Content (no body)

Error responses: 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plans/{id}/publish

**Move Action Plan into "In Progress"**
Move Action Plan into "In Progress". This will set the status of the Plan to "in_progress". Once in this state, only specific updates to the Plan are allowed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan ID

Response 204: No Content (no body)

Error responses: 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plans/create_from_template

**Create an Action Plan from a Plan Template.**
Create an Action Plan from a Plan Template. In addition to creating the plan itself, this action will also create sections, items, assignees, references and test record requests from the template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `plan_template_id` [query] integer (required) - Action Plan Template ID

Response 201 (application/json): object

- `id`: integer - Action Plan ID e.g. `43584`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plans

**List Recycled Action Plan**
Returns a list of Recycled Action Plans for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[approver_id]` [query] array of integer - Return Action Plan(s) that have any of the specified Party IDs as an Action Plan Approver.
- `filters[custom_fields]` [query] object - Return Action Plan(s) whose custom field values match the supplied JSON object. Each key must be a custom field definition ID. A scalar value matches Action Plan(s) whose value for that field is equal to it; an array ...
- `filters[number]` [query] array of integer - Return Action Plan(s) with the specified Action Plan number(s). A range such as `10...20` is also accepted.
- `filters[receiver_id]` [query] array of integer - Return Action Plan(s) that have any of the specified Party IDs as an Action Plan Receiver. Matches every Receiver regardless of whether they have signed.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[deleted_at]` [query] string - Returns item(s) deleted within the specified ISO 8601 datetime range.
- `filters[deleted_by_id]` [query] array of integer - Return item(s) with a specific Deleted By ID or a range of Deleted By IDs.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[manager_id]` [query] array of integer - Return item(s) with a specific Manager ID or a range of Manager ID(s).
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `filters[plan_type_id]` [query] array of integer - Action Plan Type ID. Returns item(s) with the specified Action Plan Type ID(s).
- `filters[template_id]` [query] array of integer - Return Action Plan(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, deleted_at, deleted_by, location, manager, number, plan_approvers, plan_receivers, title, type, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted Action Plan. e.g. `43584`
- `plan_approvers`: array of object
  - `id`: integer - Unique identifier for this Action Plan Approver. Use as the {plan_approver_id} path parameter to manage the approver's signature. e.g. `12`
  - `plan_id`: integer - ID of the Action Plan this approver is assigned to. Use as filters[plan_id] to list approvers for a specific plan. e.g. `54`
  - `updated_at`: string - Timestamp in ISO 8601 format when this approver record was last updated. Use with filters[updated_at] to retrieve recently changed approvers. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Approver Signature (Show)
    - `id`: integer - Unique identifier for this approver signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this approver signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `created_at`: string(date-time) - Time the Action Plan was created e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Action Plan was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_by`: object - User who moved this Action Plan to the recycle bin.
  - `id`: integer - Unique identifier of the user. e.g. `808`
  - `name`: string - Full name of the user who deleted the plan. e.g. `Jane Doe`
  - `login`: string - Login email address of the user. e.g. `jane.doe@example.com`
- `description`: string - Description of the Action Plan in rich text form e.g. `<p>Important Safety Action.</p>`
- `description_plain_text`: string - Description of the Action Plan in plain text form e.g. `Important Safety Action`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `manager`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `number`: integer - Sequential number assigned to the Action Plan within its project. e.g. `3`
- `plan_receivers`: array of object
  - `id`: integer - Unique identifier for this Action Plan receiver assignment. e.g. `54`
  - `plan_id`: integer - ID of the Action Plan this receiver is assigned to. Use as the plan_id filter when listing receivers for a specific plan. e.g. `54`
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this receiver assignment was last updated. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Receiver Signature (Show)
    - `id`: integer - Unique identifier for this signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `plan_status`: object
  - `id`: integer - Unique identifier of the plan status. e.g. `21`
  - `created_at`: string(date-time) - Timestamp when the status was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `global`: boolean - Whether this is a system-wide status available to all companies. Global statuses cannot be deleted. e.g. `true`
  - `name`: string - Display name of the plan status (e.g., 'In Progress', 'Closed'). e.g. `In Progress`
  - `status`: string - Underlying status type category. Custom company statuses map to one of these base types. e.g. `in_progress`
  - `updated_at`: string(date-time) - Timestamp when the status was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `status`: string enum[draft, in_progress, completed] - Display name of the plan status at the time of deletion. e.g. `draft`
- `title`: string - Title of the Action Plan e.g. `A New Action Plan`
- `updated_at`: string(date-time) - Timestamp when the Action Plan was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plans/{id}

**Show Recycled Action Plan**
Returns the specified Recycled Action Plan.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted Action Plan. e.g. `43584`
- `plan_approvers`: array of object
  - `id`: integer - Unique identifier for this Action Plan Approver. Use as the {plan_approver_id} path parameter to manage the approver's signature. e.g. `12`
  - `plan_id`: integer - ID of the Action Plan this approver is assigned to. Use as filters[plan_id] to list approvers for a specific plan. e.g. `54`
  - `updated_at`: string - Timestamp in ISO 8601 format when this approver record was last updated. Use with filters[updated_at] to retrieve recently changed approvers. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Approver Signature (Show)
    - `id`: integer - Unique identifier for this approver signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when this approver signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `created_at`: string(date-time) - Time the Action Plan was created e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the Action Plan was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_by`: object - User who moved this Action Plan to the recycle bin.
  - `id`: integer - Unique identifier of the user. e.g. `808`
  - `name`: string - Full name of the user who deleted the plan. e.g. `Jane Doe`
  - `login`: string - Login email address of the user. e.g. `jane.doe@example.com`
- `description`: string - Description of the Action Plan in rich text form e.g. `<p>Important Safety Action.</p>`
- `description_plain_text`: string - Description of the Action Plan in plain text form e.g. `Important Safety Action`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `manager`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `number`: integer - Sequential number assigned to the Action Plan within its project. e.g. `3`
- `plan_receivers`: array of object
  - `id`: integer - Unique identifier for this Action Plan receiver assignment. e.g. `54`
  - `plan_id`: integer - ID of the Action Plan this receiver is assigned to. Use as the plan_id filter when listing receivers for a specific plan. e.g. `54`
  - `updated_at`: string(date-time) - Timestamp in ISO 8601 format when this receiver assignment was last updated. e.g. `2018-09-20T21:39:40Z`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `signature`: object - Action Plan Receiver Signature (Show)
    - `id`: integer - Unique identifier for this signature record. e.g. `32`
    - `attachment`: object
    - `captured_at`: string(date-time) - Timestamp in ISO 8601 format when the signature was captured. e.g. `2015-02-07T00:00:00Z`
    - `captured_by`: object
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `plan_status`: object
  - `id`: integer - Unique identifier of the plan status. e.g. `21`
  - `created_at`: string(date-time) - Timestamp when the status was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `global`: boolean - Whether this is a system-wide status available to all companies. Global statuses cannot be deleted. e.g. `true`
  - `name`: string - Display name of the plan status (e.g., 'In Progress', 'Closed'). e.g. `In Progress`
  - `status`: string - Underlying status type category. Custom company statuses map to one of these base types. e.g. `in_progress`
  - `updated_at`: string(date-time) - Timestamp when the status was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `status`: string enum[draft, in_progress, completed] - Display name of the plan status at the time of deletion. e.g. `draft`
- `title`: string - Title of the Action Plan e.g. `A New Action Plan`
- `updated_at`: string(date-time) - Timestamp when the Action Plan was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plans/{id}/restore

**Restore Recycled Action Plan**
Restores the specified Action Plan from Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Action Plan Template Item Assignees

Resource id: `company-action-plan-template-item-assignees`. Raw spec: `../openapi-raw/company-action-plan-template-item-assignees.json`. Web: https://developers.procore.com/reference/rest/company-action-plan-template-item-assignees?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_template_item_assignees

**List Company Action Plan Template Item Assignees**
List of all Company Action Plan Template Item Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
- `plan_template_item_id`: integer - Unique identifier of the template item this assignee belongs to. e.g. `429`
- `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `248`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
- `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier of the verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
  - `name`: string - Display name of the verification method. e.g. `Hold Point`
  - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_item_assignees

**Create Company Action Plan Template Item Assignee**
Create an Company Action Plan Template Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_item_assignee`: object (required)
  - `plan_template_item_id`: integer (required) - Company Action Plan Template Item ID of the Company Action Plan Template Item Assignee to be set e.g. `42`
  - `is_holding`: boolean - Indicates whether or not the Assignee's signature is holding e.g. `true`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] (required) - Role of the Company Action Plan Template Item Assignee to be set e.g. `architect`
  - `verification_method_id`: integer - Verification Method ID of the Company Action Plan Template Item Assignee to be set e.g. `1`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
- `plan_template_item_id`: integer - Unique identifier of the template item this assignee belongs to. e.g. `429`
- `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `248`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
- `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier of the verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
  - `name`: string - Display name of the verification method. e.g. `Hold Point`
  - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_template_item_assignees/{id}

**Show Company Action Plan Template Item Assignee**
Details of a single Company Action Plan Template Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Assignee ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
- `plan_template_item_id`: integer - Unique identifier of the template item this assignee belongs to. e.g. `429`
- `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `248`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
- `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier of the verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
  - `name`: string - Display name of the verification method. e.g. `Hold Point`
  - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/action_plans/plan_template_item_assignees/{id}

**Update Company Action Plan Template Item Assignee**
Updates a single Company Action Plan Template Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Assignee ID

Request body (application/json) (required):

- `plan_template_item_assignee`: object (required)
  - `is_holding`: boolean - Indicates whether or not the Assignee's signature is holding e.g. `true`
  - `verification_method_id`: integer - Verification Method ID of the Company Action Plan Template Item Assignee to be set e.g. `1`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
- `plan_template_item_id`: integer - Unique identifier of the template item this assignee belongs to. e.g. `429`
- `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `248`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
- `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier of the verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
  - `name`: string - Display name of the verification method. e.g. `Hold Point`
  - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/action_plans/plan_template_item_assignees/{id}

**Delete Company Action Plan Template Item Assignee**
Delete a Company Action Plan Template Item Assignee

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Assignee ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_item_assignees

**List Recycled Company Action Plan Template Items Assignees**
Returns all Recycled Company Action Plan Template Item Assignees for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted template item assignee. e.g. `43584`
- `plan_template_item_id`: integer - Unique identifier of the template item this assignee belonged to. e.g. `429`
- `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the assignee was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `248`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
- `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier of the verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
  - `name`: string - Display name of the verification method. e.g. `Hold Point`
  - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_item_assignees/{id}

**Show Recycled Company Action Plan Template Items Assignee**
Returns a Specific Recycled Company Action Plan Template Item Assignee for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Action Plan Template Item Assignee ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted template item assignee. e.g. `43584`
- `plan_template_item_id`: integer - Unique identifier of the template item this assignee belonged to. e.g. `429`
- `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the assignee was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `248`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
- `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Unique identifier of the verification method. e.g. `21`
  - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
  - `name`: string - Display name of the verification method. e.g. `Hold Point`
  - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_item_assignees/bulk_create

**Bulk Create Action Plan Template Item Assignees**
Creates multiple Action Plan Template Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_item_assignees`: array of object (required)
  - `plan_template_item_id`: integer (required) - The ID of the Action Plan Template Item Assignee e.g. `123`
  - `is_holding`: boolean - Indicates whether or not the Assignee's signature is holding e.g. `true`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`
  - `verification_method_id`: integer - Verification Method ID of the Project Action Plan Template Item Assignee to be set e.g. `1`

Response 200 (application/json): array of object

- `plan_template_item_id`: integer - The ID of the Item e.g. `123`
- `is_holding`: boolean - status of the update on that Item e.g. `true`
- `errors`: object
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`
- `verification_method_id`: integer - Verification Method ID of the Project Action Plan Template Item Assignee to be set e.g. `1`
- `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
- `status`: string enum[success, failure] - status of the update on that Item e.g. `success`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/action_plans/plan_template_item_assignees/bulk_update  **[BETA]**

**Bulk Update Company Action Plan Template Item Assignees**
Updates multiple Action Plan Assignees for the selected action plan items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_item_assignees`: array of object (required)
  - `id`: integer (required) - The ID of the Action Plan Item Assignee e.g. `123`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `verification_method_id`: integer - Verification Method ID of the Action Plan Item Assignee to be set e.g. `1`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`

Response 200 (application/json): array of object

- `id`: integer - The ID of the Item e.g. `123`
- `is_holding`: boolean - status of the update on that Item e.g. `true`
- `errors`: object
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`
- `verification_method_id`: integer - Verification Method ID of the Project Action Plan Template Item Assignee to be set e.g. `1`
- `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
- `status`: string enum[success, failure] - status of the update on that Item e.g. `success`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Action Plan Template Items

Resource id: `company-action-plan-template-items`. Raw spec: `../openapi-raw/company-action-plan-template-items.json`. Web: https://developers.procore.com/reference/rest/company-action-plan-template-items?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_template_items

**List Company Action Plan Template Items**
Gets the list of Company Action Plan Template Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Section ID(s).
- `filters[plan_template_id]` [query] integer - Return item(s) associated with the specified Action Plan Template ID.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, position, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template item. e.g. `43584`
- `plan_template_item_assignees`: array of object - Assignees responsible for this template item, rendered in compact view.
  - `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
  - `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
  - `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier of the verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
    - `name`: string - Display name of the verification method. e.g. `Hold Point`
    - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp when the template item was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection activity for this template item. e.g. `A New Company Action Plan Template Item Description`
- `holding_type`: string enum[plan, section] - Scope of the hold point. 'section' holds subsequent items within the same section; 'plan' holds all subsequent items across the entire plan. e.g. `plan`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Use to determine display order. e.g. `3`
- `plan_template_section_id`: integer - Unique identifier of the section this template item belongs to. e.g. `43584`
- `title`: string - Title of the template item describing the inspection or work activity. e.g. `A New Company Action Plan Template Item`
- `due_at`: string(date-time) - Due date for the template item. e.g. `2018-09-25T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when the template item was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_items

**Create Company Action Plan Template Item**
Creates a Company Action Plan Template Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_item`: object (required)
  - `plan_template_section_id`: integer (required) - ID of the Company Action Plan Template Section it belongs to e.g. `42`
  - `title`: string (required) - Title e.g. `A new ITP Company Plan Template Item`
  - `description`: string - Description e.g. `A ITP Company Plan Template Item listing work to complete`
  - `holding_type`: string enum[plan, section] - Specifies whether the current item holds all the succeeding items in the Action Plan Section or the Action Plan e.g. `section`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template item. e.g. `43584`
- `plan_template_item_assignees`: array of object - Assignees responsible for this template item, rendered in compact view.
  - `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
  - `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
  - `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier of the verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
    - `name`: string - Display name of the verification method. e.g. `Hold Point`
    - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp when the template item was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection activity for this template item. e.g. `A New Company Action Plan Template Item Description`
- `holding_type`: string enum[plan, section] - Scope of the hold point. 'section' holds subsequent items within the same section; 'plan' holds all subsequent items across the entire plan. e.g. `plan`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Use to determine display order. e.g. `3`
- `plan_template_section_id`: integer - Unique identifier of the section this template item belongs to. e.g. `43584`
- `title`: string - Title of the template item describing the inspection or work activity. e.g. `A New Company Action Plan Template Item`
- `due_at`: string(date-time) - Due date for the template item. e.g. `2018-09-25T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when the template item was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_items/create_from_item

**Create a copy of the Action Plan Template Item in the Item's Section.**
Create a copy of the Action Plan Template Item in the Item's Section.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_item_id`: integer (required) - ID of the Action Plan Template Item to copy from. e.g. `4435`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template item. e.g. `43584`
- `plan_template_item_assignees`: array of object - Assignees responsible for this template item, rendered in compact view.
  - `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
  - `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
  - `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier of the verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
    - `name`: string - Display name of the verification method. e.g. `Hold Point`
    - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp when the template item was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection activity for this template item. e.g. `A New Company Action Plan Template Item Description`
- `holding_type`: string enum[plan, section] - Scope of the hold point. 'section' holds subsequent items within the same section; 'plan' holds all subsequent items across the entire plan. e.g. `plan`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Use to determine display order. e.g. `3`
- `plan_template_section_id`: integer - Unique identifier of the section this template item belongs to. e.g. `43584`
- `title`: string - Title of the template item describing the inspection or work activity. e.g. `A New Company Action Plan Template Item`
- `due_at`: string(date-time) - Due date for the template item. e.g. `2018-09-25T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when the template item was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_items

**List Recycled Action Plan Template Items**
Returns all Recycled Action Plan Template Items for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Section ID(s).
- `filters[plan_template_id]` [query] integer - Return item(s) associated with the specified Action Plan Template ID.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted template item. e.g. `43584`
- `plan_template_item_assignees`: array of object - Assignees responsible for this template item, rendered in compact view.
  - `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
  - `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
  - `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier of the verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
    - `name`: string - Display name of the verification method. e.g. `Hold Point`
    - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp when the template item was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the template item was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection activity for this template item. e.g. `A New Recycled Action Plan Template Item Description`
- `holding_type`: string enum[plan, section] - Scope of the hold point. 'section' holds subsequent items within the same section; 'plan' holds all subsequent items across the entire plan. e.g. `plan`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Use to determine display order. e.g. `3`
- `plan_template_section_id`: integer - Unique identifier of the section this template item belongs to. e.g. `43584`
- `title`: string - Title of the template item describing the inspection or work activity. e.g. `A New Recycled Action Plan Template Item`
- `due_at`: string(date-time) - Due date for the recycled template item. e.g. `2018-09-25T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when the template item was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_items/{id}

**Show Recycled Action Plan Template Items**
Returns a Specific Recycled Action Plan Template Item for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Action Plan Template Item ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted template item. e.g. `43584`
- `plan_template_item_assignees`: array of object - Assignees responsible for this template item, rendered in compact view.
  - `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
  - `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Whether this assignee must sign off at a hold point before subsequent work can proceed. e.g. `true`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Organizational role of the assignee within the inspection workflow. e.g. `architect`
  - `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - Unique identifier of the verification method. e.g. `21`
    - `active`: boolean - Whether this verification method is enabled for selection in template items. e.g. `true`
    - `name`: string - Display name of the verification method. e.g. `Hold Point`
    - `source_key`: string - System key identifying a built-in verification method. Null for user-created custom methods. e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp when the template item was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the template item was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Detailed description of the work or inspection activity for this template item. e.g. `A New Recycled Action Plan Template Item Description`
- `holding_type`: string enum[plan, section] - Scope of the hold point. 'section' holds subsequent items within the same section; 'plan' holds all subsequent items across the entire plan. e.g. `plan`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `43584`
- `position`: integer - Ordinal position of this item within its section. Use to determine display order. e.g. `3`
- `plan_template_section_id`: integer - Unique identifier of the section this template item belongs to. e.g. `43584`
- `title`: string - Title of the template item describing the inspection or work activity. e.g. `A New Recycled Action Plan Template Item`
- `due_at`: string(date-time) - Due date for the recycled template item. e.g. `2018-09-25T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when the template item was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/action_plans/plan_template_items/bulk_update  **[BETA]**

**Bulk Update Action Plan Template Item**
Updates multiple Action Plan Template Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_items`: array of object (required)
  - `id`: integer (required) - ID of the Action Plan Template Item e.g. `43584`
  - `description`: string - Description of the Action Plan Template Item e.g. `Must perform the 2 items for the Action Plan Item`

Response 200 (application/json): array of array of object


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Action Plan Template References

Resource id: `company-action-plan-template-references`. Raw spec: `../openapi-raw/company-action-plan-template-references.json`. Web: https://developers.procore.com/reference/rest/company-action-plan-template-references?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_template_references

**List Company Action Plan Template References**
List of all Company Action Plan Template References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[plan_template_id]` [query] integer - Return item(s) associated with the specified Action Plan Template ID.
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. For company templates, only the attachment type is supported.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment] - Type of reference attached to the template item. Company templates only support 'attachment'. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_references

**Create Company Action Plan Template Reference**
Create a Company Action Plan Template Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (multipart/form-data) (required):

- `plan_template_reference`: object (required)
  - `plan_template_item_id`: integer (required) - ID of the associated Template Item e.g. `54`
  - `type`: string enum[attachment] (required) - Company Action Plan Template Reference Type e.g. `attachment`
  - `payload`: object (required) - To upload an attachment you must upload the entire payload as `multipart/form-data` content-type
    - `attachment`: string(binary) - Reference Attachment. To upload an attachment you must upload the entire payload as `multipart/form-data` content-type with the `attachment` file.

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. For company templates, only the attachment type is supported.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment] - Type of reference attached to the template item. Company templates only support 'attachment'. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_template_references/{id}

**Show Company Action Plan Template Reference**
Returns a Company Action Plan Template Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Reference ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference is attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. For company templates, only the attachment type is supported.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment] - Type of reference attached to the template item. Company templates only support 'attachment'. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/action_plans/plan_template_references/{id}

**Delete Company Action Plan Template Reference**
Deletes a Company Action Plan Template Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Reference ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_references

**List Recycled Company Action Plan Template References**
List of all Recycled Company Action Plan Template References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[plan_template_id]` [query] integer - Return item(s) associated with the specified Action Plan Template ID.
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference was attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the reference was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. For company templates, only the attachment type is supported.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment] - Type of reference attached to the template item. Company templates only support 'attachment'. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_references/{id}

**Show Recycled Company Action Plan Template Reference**
Returns a Recycled Company Action Plan Template Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Action Plan Template Reference ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference was attached to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the reference was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. For company templates, only the attachment type is supported.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment] - Type of reference attached to the template item. Company templates only support 'attachment'. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_references/bulk_create

**Bulk Create Plan Template References**
Creates multiple Plan Template References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_references`: array of object (required)
  - `plan_template_item_id`: integer (required) - Plan Template Item ID e.g. `54`
  - `type`: string enum[attachment] (required) - Plan Template Reference Type e.g. `specification_section`
  - `payload`: object (required) - Payload for the attachment type
    - `attachment`: string(binary)

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Action Plan Template Sections

Resource id: `company-action-plan-template-sections`. Raw spec: `../openapi-raw/company-action-plan-template-sections.json`. Web: https://developers.procore.com/reference/rest/company-action-plan-template-sections?version=latest
Product lines: Total Quality and Safety Management

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_sections

**Create Company Action Plan Template Section**
Creates a Company Action Plan Template Section for a given Company Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_section`: object (required)
  - `plan_template_id`: integer (required) - ID of the Company Action Plan Template to be created under e.g. `42`
  - `title`: string (required) - Title e.g. `A new Company Action Plan Template Section`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template section. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the section was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `57`
- `position`: integer - Ordinal position of this section within the template. Use to determine display order. e.g. `3`
- `title`: string - Title of the template section. e.g. `A New ITP Company Plan Template Section`
- `updated_at`: string(date-time) - Timestamp when the section was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_sections/create_from_section

**Create a copy of the Action Plan Template Section in the Section's Template.**
Create a copy of the Action Plan Template Section in the Section's Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `template_section_id`: integer (required) - ID of the Action Plan Template Section to copy from. e.g. `4435`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template section. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the section was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `57`
- `position`: integer - Ordinal position of this section within the template. Use to determine display order. e.g. `3`
- `title`: string - Title of the template section. e.g. `A New ITP Company Plan Template Section`
- `updated_at`: string(date-time) - Timestamp when the section was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_sections

**List Recycled Action Plan Template Sections**
Returns all Recycled Action Plan Template Sections for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted template section. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the section was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the section was moved to the recycle bin. ISO 8601 format. e.g. `2017-01-16T18:42:12Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `57`
- `position`: integer - Ordinal position of this section within the template. Use to determine display order. e.g. `3`
- `title`: string - Title of the template section. e.g. `A New Action Plan Template Section`
- `updated_at`: string(date-time) - Timestamp when the section was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_sections/{id}

**Show Recycled Action Plan Template Section**
Returns a Recycled Action Plan Template Section

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Action Plan Template Section ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted template section. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the section was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the section was moved to the recycle bin. ISO 8601 format. e.g. `2017-01-16T18:42:12Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `57`
- `position`: integer - Ordinal position of this section within the template. Use to determine display order. e.g. `3`
- `title`: string - Title of the template section. e.g. `A New Action Plan Template Section`
- `updated_at`: string(date-time) - Timestamp when the section was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Action Plan Template Test Record Requests

Resource id: `company-action-plan-template-test-record-requests`. Raw spec: `../openapi-raw/company-action-plan-template-test-record-requests.json`. Web: https://developers.procore.com/reference/rest/company-action-plan-template-test-record-requests?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_template_test_record_requests

**List Company Action Plan Template Requests**
Gets the list of Company Action Plan Template Test Record Requests

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Company Action Plan Template Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[type]` [query] array of string - Return item(s) associated with the specified Test Record Type(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template test record request. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_test_record_requests

**Create Company Action Plan Template Test Record Request**
Creates an Company Action Plan Template Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_test_record_request`: object (required)
  - `plan_template_item_id`: integer (required) - ID of the associated Company Action Plan Template Item e.g. `42`
  - `type`: string enum[checklist, attachment, photo] (required) - Action Plan Template Test Record Type e.g. `checklist`
  - `payload`: object
    - `checklist_template_id`: integer - Company Checklist Template ID e.g. `42`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template test record request. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_template_test_record_requests/{id}

**Show Company Action Plan Template Test Record Request**
Get the details of a single Company Action Plan Template Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template Test Record Request ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template test record request. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/action_plans/plan_template_test_record_requests/{id}

**Delete Company Action Plan Template Test Record Request**
Delete a single Company Action Plan Template Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template Test Record Request ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_test_record_requests

**List Recycled Company Action Plan Template Test Record Requests**
Returns all Recycled Company Action Plan Template Test Record Requests for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[type]` [query] array of string - Return item(s) associated with the specified Record Type(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template test record request. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the test record request was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_template_test_record_requests/{id}

**Show Recycled Company Action Plan Template Test Record Request**
Returns a Recycled Company Action Plan Template Test Record Request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template Test Record Request ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template test record request. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the test record request was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_template_test_record_requests/bulk_create  **[BETA]**

**Bulk Create Action Plan Template Test Record Requests**
Creates Multiple Company Action Plan Template Test Record Requests

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template_test_record_requests`: array of object (required)
  - `plan_template_item_id`: integer (required) - Action Plan Template Item ID e.g. `42`
  - `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] (required) - Action Plan Test Record Type e.g. `checklist`
  - `payload`: object - Used to specify extra required details for some types.
    - `checklist_template_id`: integer - Checklist Template ID for the checklist type test record request e.g. `42`
    - `form_template_id`: integer - Form Template ID for the form type test record request e.g. `43`
    - `generic_tool_id`: integer - Generic Tool ID for the generic_tool type test record request e.g. `41`

Response 200 (application/json): array of object

- `plan_template_item_id`: integer - Action Plan Template Item ID e.g. `42`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Action Plan Test Record Type e.g. `checklist`
- `payload`: object - Used to specify extra required details for some types.
  - `checklist_template_id`: integer - Checklist Template ID for the checklist type test record request e.g. `42`
  - `form_template_id`: integer - Form Template ID for the form type test record request e.g. `43`
  - `generic_tool_id`: integer - Generic Tool ID for the generic_tool type test record request e.g. `41`
- `status`: string enum[success, failure] - Status of the update on that Item e.g. `success`
- `errors`: object - errors of the record

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Action Plan Templates

Resource id: `company-action-plan-templates`. Raw spec: `../openapi-raw/company-action-plan-templates.json`. Web: https://developers.procore.com/reference/rest/company-action-plan-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/companies/{company_id}/action_plans/plan_templates

**List of Company Action Plan Templates**
List of all Company Action Plan Templates

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, plan_type, title, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_type_id]` [query] array of integer - Action Plan Type ID. Returns item(s) with the specified Action Plan Type ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `private`: boolean - Whether the template is restricted to participants only. e.g. `false`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `provider_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/companies/{company_id}/action_plans/plan_templates

**Create Company Action Plan Templates**
Create a Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template`: object (required)
  - `title`: string (required) - Title e.g. `A new Company Action Plan Template`
  - `description`: string - Description e.g. `A description of the Company Action Plan Template`
  - `private`: boolean - Privacy flag of the Company Action Plan Template e.g. `false`
  - `plan_type_id`: integer (required) - ID of an Action Plan Type e.g. `2`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `private`: boolean - Whether the template is restricted to participants only. e.g. `false`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `provider_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/action_plans/plan_templates/{id}

**Show Company Action Plan Template**
Details of a single Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `private`: boolean - Whether the template is restricted to participants only. e.g. `false`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `provider_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/companies/{company_id}/action_plans/plan_templates/{id}

**Update a Company Action Plan Template**
Update a Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Request body (application/json) (required):

- `plan_template`: object (required)
  - `title`: string - Title e.g. `A new Company Action Plan Template`
  - `description`: string - Description e.g. `A short description explaining what this Company Action Plan Template is supp...`
  - `private`: boolean - Privacy flag of the Company Action Plan Template e.g. `false`
  - `plan_type_id`: integer - ID of an Action Plan Type e.g. `2`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `private`: boolean - Whether the template is restricted to participants only. e.g. `false`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `provider_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/companies/{company_id}/action_plans/plan_templates/{id}

**Delete a Company Action Plan Templates**
Delete a Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/companies/{company_id}/action_plans/plan_templates/{id}/revise

**Move Company Action Plan Template into "In Revision"**
Move Company Action Plan Template into "In Revision". This will set the status to "in_revision". Once in this state, the Company Action Plan Template is able to be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 204: No Content (no body)

Error responses: 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/companies/{company_id}/action_plans/plan_templates/{id}/publish

**Move Company Action Plan Template into "Published"**
Move Company Action Plan Template into "Published". This will set the status of the Company Action Plan Templates to "Published". Once in this state, further updates to the Company Action Plan Template will be denied.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 204: No Content (no body)

Error responses: 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/recycle_bin/action_plans/plan_templates

**List Recycled Company Action Plan Templates**
Returns a list of Recycled Company Action Plan Templates for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[deleted_at]` [query] string - Returns item(s) deleted within the specified ISO 8601 datetime range.
- `filters[deleted_by_id]` [query] array of integer - Return item(s) deleted by the specified User IDs
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[type_id]` [query] array of string - Return item(s) with a specific Action Plan Type ID or a range of Action Plan Type IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, deleted_by, title, plan_type, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the template was moved to the recycle bin. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `deleted_by`: object - User who moved this template to the recycle bin.
  - `id`: integer - Unique identifier of the user. e.g. `808`
  - `name`: string - Full name of the user who deleted the template. e.g. `John Michaels`
  - `login`: string - Login email address of the user. e.g. `john.michaels@example.com`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template at time of deletion. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `provider_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/recycle_bin/action_plans/plan_templates/{id}

**Show Recycled Company Action Plan Template**
Returns the specified Recycled Company Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the template was moved to the recycle bin. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `deleted_by`: object - User who moved this template to the recycle bin.
  - `id`: integer - Unique identifier of the user. e.g. `808`
  - `name`: string - Full name of the user who deleted the template. e.g. `John Michaels`
  - `login`: string - Login email address of the user. e.g. `john.michaels@example.com`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template at time of deletion. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `provider_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/companies/{company_id}/recycle_bin/action_plans/plan_templates/{id}/restore

**Restore Recycled Company Action Plan Template**
Restores the specified Company Action Plan Template from Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Plan ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_templates  **[OLDER VERSION - a newer path version exists below/above]**

**List of Company Action Plan Templates**
List of all Company Action Plan Templates

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, plan_type, title, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_type_id]` [query] array of integer - Action Plan Type ID. Returns item(s) with the specified Action Plan Type ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `template_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_templates  **[OLDER VERSION - a newer path version exists below/above]**

**Create Company Action Plan Templates**
Create a Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_template`: object (required)
  - `title`: string (required) - Title e.g. `A new Company Action Plan Template`
  - `description`: string - Description e.g. `A description of the Company Action Plan Template`
  - `plan_type_id`: integer (required) - ID of an Action Plan Type e.g. `2`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `template_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_templates/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Company Action Plan Template**
Details of a single Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `template_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/action_plans/plan_templates/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update a Company Action Plan Template**
Update a Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Request body (application/json) (required):

- `plan_template`: object (required)
  - `title`: string - Title e.g. `Modified Company Action Plan Template`
  - `description`: string - Description e.g. `A short description explaining what this Company Action Plan Template is supp...`
  - `plan_type_id`: integer - ID of an Action Plan Type e.g. `2`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `template_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/action_plans/plan_templates/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete a Company Action Plan Templates**
Delete a Company Action Plan Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_templates/{id}/revise  **[OLDER VERSION - a newer path version exists below/above]**

**Move Company Action Plan Template into "In Revision"**
Move Company Action Plan Template into "In Revision". This will set the status to "in_revision". Once in this state, the Company Action Plan Template is able to be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 204: No Content (no body)

Error responses: 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_templates/{id}/publish  **[OLDER VERSION - a newer path version exists below/above]**

**Move Company Action Plan Template into "Published"**
Move Company Action Plan Template into "Published". This will set the status of the Company Action Plan Templates to "Published". Once in this state, further updates to the Company Action Plan Template will be denied.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 204: No Content (no body)

Error responses: 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_templates  **[OLDER VERSION - a newer path version exists below/above]**

**List Recycled Company Action Plan Templates**
Returns a list of Recycled Company Action Plan Templates for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[deleted_at]` [query] string - Returns item(s) deleted within the specified ISO 8601 datetime range.
- `filters[deleted_by_id]` [query] array of integer - Return item(s) deleted by the specified User IDs
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[type_id]` [query] array of string - Return item(s) with a specific Action Plan Type ID or a range of Action Plan Type IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, deleted_by, title, plan_type, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the template was moved to the recycle bin. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `deleted_by`: object - User who moved this template to the recycle bin.
  - `id`: integer - Unique identifier of the user. e.g. `808`
  - `name`: string - Full name of the user who deleted the template. e.g. `John Michaels`
  - `login`: string - Login email address of the user. e.g. `john.michaels@example.com`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template at time of deletion. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `template_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_templates/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Recycled Company Action Plan Template**
Returns the specified Recycled Company Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Template ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the template was moved to the recycle bin. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `deleted_by`: object - User who moved this template to the recycle bin.
  - `id`: integer - Unique identifier of the user. e.g. `808`
  - `name`: string - Full name of the user who deleted the template. e.g. `John Michaels`
  - `login`: string - Login email address of the user. e.g. `john.michaels@example.com`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Company Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Company Action Plan Template.`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template at time of deletion. e.g. `draft`
- `title`: string - Title of the Action Plan Template. e.g. `A New Company Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `template_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `company`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/recycle_bin/action_plans/plan_templates/{id}/restore  **[OLDER VERSION - a newer path version exists below/above]**

**Restore Recycled Company Action Plan Template**
Restores the specified Company Action Plan Template from Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Plan ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Action Plan Types

Resource id: `company-action-plan-types`. Raw spec: `../openapi-raw/company-action-plan-types.json`. Web: https://developers.procore.com/reference/rest/company-action-plan-types?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_types

**List Company Action Plan Types**
List of all Company Action Plan Types for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, name, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
- `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
- `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/action_plans/plan_types

**Create a Company Action Plan Type**
Create a Company Action Plan Type for a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `plan_type`: object (required)
  - `active`: boolean - Indicates if the Action Plan Type is intended for use
  - `name`: string (required) - Name e.g. `A new Action Plan Type`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
- `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
- `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/action_plans/plan_types/{id}

**Show Company Action Plan Type**
Details of a Company Action Plan Type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Type ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
- `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
- `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/action_plans/plan_types/{id}

**Update Company Action Plan Type**
Update an Company Action Plan Type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Type ID

Request body (application/json) (required):

- `type`: object (required)
  - `active`: boolean - Indicates if the Action Plan Type is intended for use

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
- `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
- `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
- `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/action_plans/plan_types/{id}

**Delete Company Action Plan Type**
Delete an Company Action Plan Type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Company Action Plan Type ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Template Approvers

Resource id: `project-action-plan-template-approvers`. Raw spec: `../openapi-raw/project-action-plan-template-approvers.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-template-approvers?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_approvers

**List Action Plan Template Approvers**
Returns all Action Plan Template Approvers for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template approver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the approver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_approvers

**Create Action Plan Template Approver**
Creates an Action Plan Template Approver for a given Project Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_approver`: object (required)
  - `plan_template_id`: integer (required) - ID of the Project Action Plan Template e.g. `1`
  - `party_id`: string (required) - ID of the Party to be designated as the Plan Approver e.g. `1`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template approver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the approver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_approvers/{id}

**Show Action Plan Template Approver**
Returns an Action Plan Template Approver

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Template Approver ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template approver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the approver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_template_approvers/{id}

**Delete Action Plan Template Approver**
Deletes an Action Plan Template Approver

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Template Approver ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_approvers/bulk_create

**Bulk Create Action Plan Template Approvers**
Bulk Create Action Plan Template Approvers for a given Project Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_approvers`: object (required)
  - `plan_template_id`: integer (required) - ID of the Project Action Plan Template e.g. `1`
  - `party_ids`: array of integer (required) - Array of Party IDs

Response 201 (application/json): array of object

- `id`: integer - Unique identifier of the template approver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the approver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_template_approvers/bulk_destroy

**Bulk Destroy Action Plan Template Approvers**
Bulk Destroy Action Plan Template Approvers from a given Project Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_approvers`: object (required)
  - `plan_template_id`: integer (required) - ID of the Project Action Plan Template e.g. `1`
  - `ids`: array of integer (required) - Array of Approver IDs

Response 204: No Content (no body)

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_template_approvers

**List Recycled Action Plan Template Approvers**
Returns all Recycled Action Plan Template Approvers for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted template approver. e.g. `54`
- `deleted_at`: string(date-time) - Timestamp when the approver was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the approver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_template_approvers/{id}

**Show Recycled Action Plan Template Approver**
Returns a Recycled Action Plan Template Approver

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Template Approver ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted template approver. e.g. `54`
- `deleted_at`: string(date-time) - Timestamp when the approver was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the approver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Template Item Assignees

Resource id: `project-action-plan-template-item-assignees`. Raw spec: `../openapi-raw/project-action-plan-template-item-assignees.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-template-item-assignees?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_item_assignees

**List Action Plan Template Item Assignees**
List of all Action Plan Template Item Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template item assignee. e.g. `43584`
- `plan_template_item_id`: integer - Unique identifier of the template item this assignee belongs to. e.g. `429`
- `created_at`: string(date-time) - Timestamp when the assignee was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `is_holding`: boolean - Whether this assignee's signature is required for a hold point. When true, items after the hold point cannot proceed until this assignee signs. e.g. `true`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `248`
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the assignee within the Action Plan workflow. e.g. `architect`
- `updated_at`: string(date-time) - Timestamp when the assignee was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `verification_method`: object
  - `id`: integer - Action Plan Verification Method ID e.g. `21`
  - `active`: boolean - Flag indicating if Action Plan Verification Method is active e.g. `true`
  - `name`: string - Name of the Action Plan Verification Method e.g. `Hold Point`
  - `source_key`: string - Internal Translation Key e.g. `hold_point`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_item_assignees/bulk_create

**Bulk Create Action Plan Template Item Assignees**
Creates multiple Action Plan Template Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_item_assignees`: array of object (required)
  - `plan_template_item_id`: integer (required) - The ID of the Action Plan Template Item Assignee e.g. `123`
  - `is_holding`: boolean - Indicates whether or not the Assignee's signature is holding e.g. `true`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`
  - `verification_method_id`: integer - Verification Method ID of the Project Action Plan Template Item Assignee to be set e.g. `1`

Response 200 (application/json): array of object

- `plan_template_item_id`: integer - The ID of the Item e.g. `123`
- `is_holding`: boolean - status of the update on that Item e.g. `true`
- `errors`: object
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`
- `verification_method_id`: integer - Verification Method ID of the Project Action Plan Template Item Assignee to be set e.g. `1`
- `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
- `status`: string enum[success, failure] - status of the update on that Item e.g. `success`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plan_template_item_assignees/bulk_update

**Bulk update Action Plan Template Item Assignees**
Update multiple Action Plan Template Assignees

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_item_assignees`: array of object (required)
  - `id`: integer (required) - The ID of the Action Plan Template Item Assignee e.g. `123`
  - `is_holding`: boolean - Indicates whether or not the Assignee's signature is holding e.g. `true`
  - `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`
  - `verification_method_id`: integer - Verification Method ID of the Project Action Plan Template Item Assignee to be set e.g. `1`

Response 200 (application/json): array of object

- `id`: integer - The ID of the Item e.g. `123`
- `is_holding`: boolean - status of the update on that Item e.g. `true`
- `errors`: object
- `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee to be set e.g. `architect`
- `verification_method_id`: integer - Verification Method ID of the Project Action Plan Template Item Assignee to be set e.g. `1`
- `party_id`: integer - Party Person ID of the Action Plan Item Assignee to be set e.g. `27`
- `status`: string enum[success, failure] - status of the update on that Item e.g. `success`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Template Items

Resource id: `project-action-plan-template-items`. Raw spec: `../openapi-raw/project-action-plan-template-items.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-template-items?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_items

**List Project Action Plan Template Items**
Gets the list of Project Action Plan Template Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] integer - Return item(s) associated with the specified Action Plan Template ID.
- `filters[plan_template_section_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Section ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_at, position, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template item. e.g. `43584`
- `plan_template_item_assignees`: array of object - Assignees responsible for this template item.
  - `id`: integer - ID e.g. `43584`
  - `created_at`: string(date-time) - Time the Project Action Plan Template Item Assignee was created e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee e.g. `architect`
  - `updated_at`: string(date-time) - Time the Project Action Plan Template Item Assignee was updated e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - ID e.g. `21`
    - `active`: boolean - Flag indicating if the Project Action Plan Template Verification Method is intended for use e.g. `true`
    - `name`: string - Name e.g. `Hold Point`
    - `source_key`: string - Internal translation key e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp when the template item was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `due_at`: string(date-time) - Deadline for the template item. Null if no due date is set. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Acceptance criteria or additional details describing what this item requires. e.g. `A New Project Action Plan Template Item Description`
- `holding_type`: string enum[plan, section] - Determines the scope of the hold point. 'plan' holds all succeeding items in the entire plan; 'section' holds only items in the same section. e.g. `plan`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `43584`
- `position`: integer - Position of the template item within its section. Lower values appear first. e.g. `3`
- `plan_template_section_id`: integer - Unique identifier of the section this item belongs to. e.g. `43584`
- `title`: string - Title of the template item. e.g. `A New Project Action Plan Template Item`
- `updated_at`: string(date-time) - Timestamp when the template item was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_items/create_from_item

**Create a copy of the Action Plan Template Item in the Item's Section.**
Create a copy of the Action Plan Template Item in the Item's Section.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_item_id`: integer (required) - ID of the Action Plan Template Item to copy from. e.g. `4435`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template item. e.g. `43584`
- `plan_template_item_assignees`: array of object - Assignees responsible for this template item.
  - `id`: integer - ID e.g. `43584`
  - `created_at`: string(date-time) - Time the Project Action Plan Template Item Assignee was created e.g. `2018-09-20T21:39:40Z`
  - `is_holding`: boolean - Boolean flag indicating whether the assignee is necessary to sign for a hold point e.g. `true`
  - `party`: object
    - `id`: integer - Party Person ID e.g. `23`
    - `first_name`: string - First name of the Party Person e.g. `Paul`
    - `last_name`: string - Last name of the Party Person e.g. `Admin`
    - `name`: string - Full name of the Party Person e.g. `Paul Admin`
    - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
    - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
    - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
    - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
    - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
    - `vendor`: object
  - `role`: string enum[contractor, specialty_contractor, client, architect, third_party, internal] - Role of the Project Action Plan Template Item Assignee e.g. `architect`
  - `updated_at`: string(date-time) - Time the Project Action Plan Template Item Assignee was updated e.g. `2018-09-20T21:39:40Z`
  - `verification_method`: object
    - `id`: integer - ID e.g. `21`
    - `active`: boolean - Flag indicating if the Project Action Plan Template Verification Method is intended for use e.g. `true`
    - `name`: string - Name e.g. `Hold Point`
    - `source_key`: string - Internal translation key e.g. `hold_point`
- `created_at`: string(date-time) - Timestamp when the template item was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `due_at`: string(date-time) - Deadline for the template item. Null if no due date is set. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Acceptance criteria or additional details describing what this item requires. e.g. `A New Project Action Plan Template Item Description`
- `holding_type`: string enum[plan, section] - Determines the scope of the hold point. 'plan' holds all succeeding items in the entire plan; 'section' holds only items in the same section. e.g. `plan`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `43584`
- `position`: integer - Position of the template item within its section. Lower values appear first. e.g. `3`
- `plan_template_section_id`: integer - Unique identifier of the section this item belongs to. e.g. `43584`
- `title`: string - Title of the template item. e.g. `A New Project Action Plan Template Item`
- `updated_at`: string(date-time) - Timestamp when the template item was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/action_plans/plan_template_items/bulk_update  **[BETA]**

**Bulk Update Action Plan Template Item**
Updates multiple Action Plan Template Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_items`: array of object (required)
  - `id`: integer (required) - ID of the Action Plan Template Item e.g. `43584`
  - `description`: string - Description of the Action Plan Item e.g. `Must perform the 2 items for the Action Plan Item`
  - `due_at`: string(date-time) - Timestamp of when the Project Action Plan Template Item should be completed by e.g. `2016-12-13T03:00:00Z`

Response 200 (application/json): array of array of object


Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Template Receivers

Resource id: `project-action-plan-template-receivers`. Raw spec: `../openapi-raw/project-action-plan-template-receivers.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-template-receivers?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_receivers

**List Action Plan Template Receivers**
Returns all Action Plan Template Receivers for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template receiver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the receiver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_receivers

**Create Action Plan Template Receiver**
Creates an Action Plan Template Receiver for a given Project Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_receiver`: object (required)
  - `plan_template_id`: integer (required) - ID of the Project Action Plan Template e.g. `1`
  - `party_id`: string (required) - ID of the Party to be designated as the Plan Receiver e.g. `1`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template receiver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the receiver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_receivers/{id}

**Show Action Plan Template Receiver**
Returns an Action Plan Template Receiver

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Template Receiver ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template receiver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the receiver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_template_receivers/{id}

**Delete Action Plan Template Receiver**
Deletes an Action Plan Template Receiver

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Template Receiver ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_receivers/bulk_create

**Bulk Create Action Plan Template Receivers**
Bulk Create Action Plan Template Receivers for a given Project Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_receivers`: object (required)
  - `plan_template_id`: integer (required) - ID of the Project Action Plan Template e.g. `1`
  - `party_ids`: array of integer (required) - Array of Party IDs

Response 201 (application/json): array of object

- `id`: integer - Unique identifier of the template receiver. e.g. `54`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the receiver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_template_receivers/bulk_destroy

**Bulk Destroy Action Plan Template Receivers**
Bulk Destroy Action Plan Template Receivers from a given Project Action Plan Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_receivers`: object (required)
  - `plan_template_id`: integer (required) - ID of the Project Action Plan Template e.g. `1`
  - `ids`: array of integer (required) - Array of Receiver IDs

Response 204: No Content (no body)

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_template_receivers

**List Recycled Action Plan Template Receivers**
Returns all Recycled Action Plan Template Receivers for a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted template receiver. e.g. `54`
- `deleted_at`: string(date-time) - Timestamp when the receiver was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the receiver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_template_receivers/{id}

**Show Recycled Action Plan Template Receiver**
Returns a Recycled Action Plan Template Receiver

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Template Receiver ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted template receiver. e.g. `54`
- `deleted_at`: string(date-time) - Timestamp when the receiver was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `54`
- `updated_at`: string(date-time) - Timestamp when the receiver was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `party`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Template References

Resource id: `project-action-plan-template-references`. Raw spec: `../openapi-raw/project-action-plan-template-references.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-template-references?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_references

**List Project Action Plan Template References**
List of all Project Action Plan Template References available to a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[plan_template_id]` [query] integer - Return item(s) associated with the specified Action Plan Template ID.
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - Identifier of the drawing the drawing revision belongs to. Present when type is 'drawing'.
  - `drawing_revision_id`: integer - Identifier of the latest drawing revision. Present when type is 'drawing'.
  - `file_version_id`: integer - Identifier of the latest file version of the folder file. Present when type is 'document'.
  - `folder_id`: integer - Identifier of the folder the file version belongs to. Present when type is 'document'.
  - `specification_section_id`: integer - Identifier of the specification section. Present when type is 'specification_section'. e.g. `55`
  - `specification_section_current_revision_id`: integer - Identifier of the current revision of the specification section. Null if no revision exists. e.g. `42`
  - `generic_tool_item_id`: integer - Identifier of the generic tool item (correspondence). Present when type is 'generic_tool_item'.
  - `form_id`: integer - Identifier of the form. Present when type is 'form'.
  - `image_id`: integer - Identifier of the image. Present when type is 'image'.
  - `meeting_id`: integer - Identifier of the meeting. Present when type is 'meeting'.
  - `observation_item_id`: integer - Identifier of the observation item. Present when type is 'observation_item'.
  - `document_management_document_reference`: object - Product Document Management (PDM) document reference details. Present when type is 'document_management_document_reference'.
    - `collection_id`: string(uuid) - Unique identifier of the document collection. e.g. `123e4567-e89b-12d3-a456-426614174000`
    - `container_id`: string(uuid) - Unique identifier of the document container. e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `document_revision_id`: string(uuid) - Identifier of the document revision. Null for templates; always shows latest for plans. e.g. `123e4567-e89b-12d3-a456-426614174002`
    - `document_name`: string - Display name of the document. e.g. `contract.pdf`
    - `viewer_url`: string(uri) - URL to view the document in the browser. e.g. `https://app.procore.com/...`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, generic_tool_item, form, image, meeting, observation_item] - Categorization of the reference. Determines which payload fields are populated. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_references

**Create Project Action Plan Template Reference**
Create a Project Action Plan Template Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_reference`: object (required)
  - `plan_template_item_id`: integer (required) - Project Action Plan Template Item ID e.g. `54`
  - `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, generic_tool_item, form, image, meeting, observation_item] (required) - Action Plan Reference Type e.g. `specification_section`
  - `payload`: object (required) - One of attachment, drawing_revision_id, file_version_id, document_management_document_reference, specification_section_id, generic_tool_item_id, form_id, image_id, meeting_id, or observation_item_id is accepted depend...
    - `drawing_revision_id`: integer - Drawing Revision ID e.g. `53`
    - `file_version_id`: integer - File Version ID e.g. `54`
    - `document_management_document_reference`: object - PDM (Product Document Management) document reference
      - `collection_id`: string(uuid) - Document collection ID e.g. `123e4567-e89b-12d3-a456-426614174000`
      - `container_id`: string(uuid) - Document container ID e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `specification_section_id`: integer - Specification Section ID e.g. `55`
    - `generic_tool_item_id`: integer - Generic Tool Item (Correspondence) ID e.g. `56`
    - `form_id`: integer - Form ID e.g. `57`
    - `image_id`: integer - Image ID e.g. `60`
    - `meeting_id`: integer - Meeting ID e.g. `58`
    - `observation_item_id`: integer - Observation Item ID e.g. `59`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - Identifier of the drawing the drawing revision belongs to. Present when type is 'drawing'.
  - `drawing_revision_id`: integer - Identifier of the latest drawing revision. Present when type is 'drawing'.
  - `file_version_id`: integer - Identifier of the latest file version of the folder file. Present when type is 'document'.
  - `folder_id`: integer - Identifier of the folder the file version belongs to. Present when type is 'document'.
  - `specification_section_id`: integer - Identifier of the specification section. Present when type is 'specification_section'. e.g. `55`
  - `specification_section_current_revision_id`: integer - Identifier of the current revision of the specification section. Null if no revision exists. e.g. `42`
  - `generic_tool_item_id`: integer - Identifier of the generic tool item (correspondence). Present when type is 'generic_tool_item'.
  - `form_id`: integer - Identifier of the form. Present when type is 'form'.
  - `image_id`: integer - Identifier of the image. Present when type is 'image'.
  - `meeting_id`: integer - Identifier of the meeting. Present when type is 'meeting'.
  - `observation_item_id`: integer - Identifier of the observation item. Present when type is 'observation_item'.
  - `document_management_document_reference`: object - Product Document Management (PDM) document reference details. Present when type is 'document_management_document_reference'.
    - `collection_id`: string(uuid) - Unique identifier of the document collection. e.g. `123e4567-e89b-12d3-a456-426614174000`
    - `container_id`: string(uuid) - Unique identifier of the document container. e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `document_revision_id`: string(uuid) - Identifier of the document revision. Null for templates; always shows latest for plans. e.g. `123e4567-e89b-12d3-a456-426614174002`
    - `document_name`: string - Display name of the document. e.g. `contract.pdf`
    - `viewer_url`: string(uri) - URL to view the document in the browser. e.g. `https://app.procore.com/...`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, generic_tool_item, form, image, meeting, observation_item] - Categorization of the reference. Determines which payload fields are populated. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_references/{id}

**Show Project Action Plan Template Reference**
View the details of a Project Action Plan Template Reference from a given Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Project Action Plan Template Reference ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - Identifier of the drawing the drawing revision belongs to. Present when type is 'drawing'.
  - `drawing_revision_id`: integer - Identifier of the latest drawing revision. Present when type is 'drawing'.
  - `file_version_id`: integer - Identifier of the latest file version of the folder file. Present when type is 'document'.
  - `folder_id`: integer - Identifier of the folder the file version belongs to. Present when type is 'document'.
  - `specification_section_id`: integer - Identifier of the specification section. Present when type is 'specification_section'. e.g. `55`
  - `specification_section_current_revision_id`: integer - Identifier of the current revision of the specification section. Null if no revision exists. e.g. `42`
  - `generic_tool_item_id`: integer - Identifier of the generic tool item (correspondence). Present when type is 'generic_tool_item'.
  - `form_id`: integer - Identifier of the form. Present when type is 'form'.
  - `image_id`: integer - Identifier of the image. Present when type is 'image'.
  - `meeting_id`: integer - Identifier of the meeting. Present when type is 'meeting'.
  - `observation_item_id`: integer - Identifier of the observation item. Present when type is 'observation_item'.
  - `document_management_document_reference`: object - Product Document Management (PDM) document reference details. Present when type is 'document_management_document_reference'.
    - `collection_id`: string(uuid) - Unique identifier of the document collection. e.g. `123e4567-e89b-12d3-a456-426614174000`
    - `container_id`: string(uuid) - Unique identifier of the document container. e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `document_revision_id`: string(uuid) - Identifier of the document revision. Null for templates; always shows latest for plans. e.g. `123e4567-e89b-12d3-a456-426614174002`
    - `document_name`: string - Display name of the document. e.g. `contract.pdf`
    - `viewer_url`: string(uri) - URL to view the document in the browser. e.g. `https://app.procore.com/...`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, generic_tool_item, form, image, meeting, observation_item] - Categorization of the reference. Determines which payload fields are populated. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/action_plans/plan_template_references/{id}

**Delete Project Action Plan Template Reference**
Deletes a Project Action Plan Template Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Project Action Plan Template Reference ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_template_references

**List Recycled Project Action Plan Template References**
List of all Recycled Project Action Plan Template References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[plan_template_id]` [query] integer - Return item(s) associated with the specified Action Plan Template ID.
- `sort` [query] string enum[created_at, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the deleted template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the reference was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - Identifier of the drawing the drawing revision belongs to. Present when type is 'drawing'.
  - `drawing_revision_id`: integer - Identifier of the latest drawing revision. Present when type is 'drawing'.
  - `file_version_id`: integer - Identifier of the latest file version of the folder file. Present when type is 'document'.
  - `folder_id`: integer - Identifier of the folder the file version belongs to. Present when type is 'document'.
  - `specification_section_id`: integer - Identifier of the specification section. Present when type is 'specification_section'. e.g. `55`
  - `specification_section_current_revision_id`: integer - Identifier of the current revision of the specification section. Null if no revision exists. e.g. `42`
  - `generic_tool_item_id`: integer - Identifier of the generic tool item (correspondence). Present when type is 'generic_tool_item'.
  - `form_id`: integer - Identifier of the form. Present when type is 'form'.
  - `image_id`: integer - Identifier of the image. Present when type is 'image'.
  - `meeting_id`: integer - Identifier of the meeting. Present when type is 'meeting'.
  - `observation_item_id`: integer - Identifier of the observation item. Present when type is 'observation_item'.
  - `document_management_document_reference`: object - Product Document Management (PDM) document reference details. Present when type is 'document_management_document_reference'.
    - `collection_id`: string(uuid) - Unique identifier of the document collection. e.g. `123e4567-e89b-12d3-a456-426614174000`
    - `container_id`: string(uuid) - Unique identifier of the document container. e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `document_revision_id`: string(uuid) - Identifier of the document revision. Null for templates; always shows latest for plans. e.g. `123e4567-e89b-12d3-a456-426614174002`
    - `document_name`: string - Display name of the document. e.g. `contract.pdf`
    - `viewer_url`: string(uri) - URL to view the document in the browser. e.g. `https://app.procore.com/...`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, generic_tool_item, form, image, meeting, observation_item] - Categorization of the reference. Determines which payload fields are populated. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/action_plans/plan_template_references/{id}

**Show Recycled Project Action Plan Template Reference**
Returns a Recycled Project Action Plan Template Reference

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Action Plan Template Reference ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the deleted template reference. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this reference belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the reference was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `deleted_at`: string(date-time) - Timestamp when the reference was moved to the recycle bin. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `attachment`: object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - Image URL e.g. `http://www.example.com/`
    - `thumbnail_url`: string - Image Thumbnail URL e.g. `http://www.example.com/`
    - `name`: string - File Name e.g. `january_receipt_copy.jpg`
    - `content_type`: string - Content Type e.g. `image/jpg`
  - `drawing_id`: integer - Identifier of the drawing the drawing revision belongs to. Present when type is 'drawing'.
  - `drawing_revision_id`: integer - Identifier of the latest drawing revision. Present when type is 'drawing'.
  - `file_version_id`: integer - Identifier of the latest file version of the folder file. Present when type is 'document'.
  - `folder_id`: integer - Identifier of the folder the file version belongs to. Present when type is 'document'.
  - `specification_section_id`: integer - Identifier of the specification section. Present when type is 'specification_section'. e.g. `55`
  - `specification_section_current_revision_id`: integer - Identifier of the current revision of the specification section. Null if no revision exists. e.g. `42`
  - `generic_tool_item_id`: integer - Identifier of the generic tool item (correspondence). Present when type is 'generic_tool_item'.
  - `form_id`: integer - Identifier of the form. Present when type is 'form'.
  - `image_id`: integer - Identifier of the image. Present when type is 'image'.
  - `meeting_id`: integer - Identifier of the meeting. Present when type is 'meeting'.
  - `observation_item_id`: integer - Identifier of the observation item. Present when type is 'observation_item'.
  - `document_management_document_reference`: object - Product Document Management (PDM) document reference details. Present when type is 'document_management_document_reference'.
    - `collection_id`: string(uuid) - Unique identifier of the document collection. e.g. `123e4567-e89b-12d3-a456-426614174000`
    - `container_id`: string(uuid) - Unique identifier of the document container. e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `document_revision_id`: string(uuid) - Identifier of the document revision. Null for templates; always shows latest for plans. e.g. `123e4567-e89b-12d3-a456-426614174002`
    - `document_name`: string - Display name of the document. e.g. `contract.pdf`
    - `viewer_url`: string(uri) - URL to view the document in the browser. e.g. `https://app.procore.com/...`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, generic_tool_item, form, image, meeting, observation_item] - Categorization of the reference. Determines which payload fields are populated. e.g. `attachment`
- `updated_at`: string(date-time) - Timestamp when the reference was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_references/bulk_create  **[BETA]**

**Bulk Create Action Plan Template References**
Creates multiple Action Plan Template References

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `plan_template_references`: array of object (required)
  - `plan_template_item_id`: integer (required) - Action Plan Template Item ID e.g. `54`
  - `type`: string enum[attachment, drawing, document, document_management_document_reference, specification_section, submittal_log, generic_tool_item, form, image, meeting, observation_item] (required) - Action Plan Reference Type e.g. `specification_section`
  - `payload`: object (required) - One of attachment, drawing_revision_id, file_version_id, document_management_document_reference, specification_section_id, submittal_log_id, generic_tool_item_id, form_id, image_id, meeting_id, or observation_item_id ...
    - `drawing_revision_id`: integer - Drawing Revision ID e.g. `53`
    - `file_version_id`: integer - File Version ID e.g. `54`
    - `document_management_document_reference`: object - PDM (Product Document Management) document reference
      - `collection_id`: string(uuid) - Document collection ID e.g. `123e4567-e89b-12d3-a456-426614174000`
      - `container_id`: string(uuid) - Document container ID e.g. `123e4567-e89b-12d3-a456-426614174001`
    - `specification_section_id`: integer - Specification Section ID e.g. `55`
    - `submittal_log_id`: integer - Submittal Log ID e.g. `65`
    - `generic_tool_item_id`: integer - Generic Tool Item (Correspondence) ID e.g. `56`
    - `form_id`: integer - Form ID e.g. `57`
    - `image_id`: integer - Image ID e.g. `60`
    - `meeting_id`: integer - Meeting ID e.g. `58`
    - `observation_item_id`: integer - Observation Item ID e.g. `59`

Response 201 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Template Sections

Resource id: `project-action-plan-template-sections`. Raw spec: `../openapi-raw/project-action-plan-template-sections.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-template-sections?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_sections

**List Project Action Plan Template Sections**
Returns all Action Plan Template Sections for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, position, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template section. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the section was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `57`
- `position`: integer - Position of the section within the template. Lower values appear first. e.g. `3`
- `title`: string - Title of the template section. e.g. `A New Project Action Plan Template Section`
- `updated_at`: string(date-time) - Timestamp when the section was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_sections/create_from_section

**Create a copy of the Action Plan Template Section in the Section's Template.**
Create a copy of the Action Plan Template Section in the Section's Template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `template_section_id`: integer (required) - ID of the Action Plan Template Section to copy from. e.g. `4435`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the template section. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the section was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `57`
- `position`: integer - Position of the section within the template. Lower values appear first. e.g. `3`
- `title`: string - Title of the template section. e.g. `A New Project Action Plan Template Section`
- `updated_at`: string(date-time) - Timestamp when the section was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Template Test Record Requests

Resource id: `project-action-plan-template-test-record-requests`. Raw spec: `../openapi-raw/project-action-plan-template-test-record-requests.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-template-test-record-requests?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_template_test_record_requests

**List Project Action Plan Template Test Record Requests**
List of all Project Action Plan Template Test Record Requests

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[plan_template_item_id]` [query] array of integer - Return item(s) associated with the specified Action Plan Template Item ID(s).
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[plan_template_id]` [query] array of integer - Return section(s) associated with the specified Action Plan Template ID(s).
- `filters[type]` [query] array of string - Return item(s) associated with the specified Record Type(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, updated_at]

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the template test record request. e.g. `12`
- `plan_template_item_id`: integer - Unique identifier of the template item this test record request belongs to. e.g. `54`
- `created_at`: string(date-time) - Timestamp when the test record request was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `payload`: object - Contains type-specific attributes. Which fields are present depends on the type value.
  - `checklist_template_id`: integer - Identifier of the linked checklist template. Present when type is 'checklist'. e.g. `55`
  - `form_template_id`: integer - Identifier of the linked form template. Present when type is 'form'. e.g. `56`
  - `generic_tool_id`: integer - Identifier of the linked generic tool. Present when type is 'generic_tool'. e.g. `57`
- `plan_template_id`: integer - Unique identifier of the parent Action Plan Template. e.g. `985`
- `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] - Categorization of the test record request. Determines which payload fields are populated. e.g. `checklist`
- `updated_at`: string(date-time) - Timestamp when the test record request was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/action_plans/plan_template_test_record_requests/bulk_create  **[BETA]**

**Bulk Create Action Plan Template Test Record Requests**
Creates Multiple Project Action Plan Template Test Record Requests for selected Template item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_template_test_record_requests`: array of object (required)
  - `plan_template_item_id`: integer (required) - Action Plan Template Item ID e.g. `42`
  - `type`: string enum[attachment, checklist, form, generic_tool, meeting, observation, photo, submittal_log] (required) - Action Plan Test Record Type e.g. `checklist`
  - `payload`: object - Used to specify extra required details for some types.
    - `checklist_template_id`: integer - Checklist Template ID for the checklist type test record request e.g. `42`
    - `form_template_id`: integer - Form Template ID for the form type test record request e.g. `43`
    - `generic_tool_id`: integer - Generic Tool ID for the generic_tool type test record request e.g. `41`

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Action Plan Templates

Resource id: `project-action-plan-templates`. Raw spec: `../openapi-raw/project-action-plan-templates.json`. Web: https://developers.procore.com/reference/rest/project-action-plan-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/action_plans/plan_templates

**List of Project Action Plan Templates**
List of all Project Action Plan Templates

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, plan_type, provider_type, title, updated_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[provider_type]` [query] array of string enum[company, project] - Return item(s) with the specified Provider Type(s)
- `filters[type_id]` [query] array of string - Return item(s) with a specific Action Plan Type ID or a range of Action Plan Type IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Action Plan Template. e.g. `43584`
- `created_at`: string(date-time) - Timestamp when the template was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
- `description`: string - Description of the template in rich text (HTML) form. e.g. `<p>Important Safety Project Action Plan Template.</p>`
- `description_plain_text`: string - Description of the template in plain text form. e.g. `Important Safety Project Action Plan Template.`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `manager`: object
  - `id`: integer - Party Person ID e.g. `23`
  - `first_name`: string - First name of the Party Person e.g. `Paul`
  - `last_name`: string - Last name of the Party Person e.g. `Admin`
  - `name`: string - Full name of the Party Person e.g. `Paul Admin`
  - `user_id`: integer - User ID of the login account associated with this party person. e.g. `453`
  - `is_employee`: boolean - Whether this party person is an employee of the current company, as opposed to an external vendor contact. e.g. `true`
  - `employee_id`: string - Employee ID string for this party person. Null if no employee ID is assigned. e.g. `12`
  - `login`: string - Email address (login) of the party person's user account. e.g. `login@example.com`
  - `updated_at`: string(date-time) - Time the Party Person was updated e.g. `2018-09-20T21:39:40Z`
  - `vendor`: object
    - `id`: integer - Unique identifier of the vendor company this party person belongs to. e.g. `223`
    - `name`: string - Name of the vendor company this party person belongs to. e.g. `Freddie's Excavating`
- `status`: string enum[draft, in_revision, published] - Lifecycle state of the template. Templates must be 'published' before plans can be created from them. e.g. `draft`
- `private`: boolean - Whether the template is restricted to participants only. e.g. `false`
- `title`: string - Title of the Action Plan Template. e.g. `A New Project Action Plan Template`
- `plan_type`: object
  - `id`: integer - Unique identifier of the Action Plan type. e.g. `21`
  - `active`: boolean - Whether this type is enabled for use. When false, it is hidden from selection when creating new plans or templates. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the type was created. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `name`: string - Localized display name of the Action Plan type. e.g. `Safety`
  - `updated_at`: string(date-time) - Timestamp when the type was last modified. ISO 8601 format. e.g. `2018-09-20T21:39:40Z`
  - `source_key`: string - System key identifying a built-in type. Null for user-created custom types. e.g. `safety`
- `provider_type`: string enum[company, project] - Scope of the template. 'company' templates are company-wide; 'project' templates are project-specific. e.g. `project`
- `updated_at`: string(date-time) - Timestamp when the template was last modified. ISO 8601 format. e.g. `2015-03-19T12:00:00Z`
- `non_closed_plans_count`: integer - Number of non-closed (draft or in-progress) Action Plans created from this template. Only returned when the template is requested with the `with_plans_count` view. e.g. `2`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

