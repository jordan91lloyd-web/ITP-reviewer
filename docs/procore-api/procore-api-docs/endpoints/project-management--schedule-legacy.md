# Procore API: Schedule (Legacy) (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Schedule (Legacy))

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Calendar Events](#calendar-events) - versions 1.0
- [Calendar Items](#calendar-items) - versions 1.0
- [Lookahead Tasks](#lookahead-tasks) - versions 1.0
- [Lookaheads](#lookaheads) - versions 1.1, 1.0
- [Requested Changes](#requested-changes) - versions 1.0
- [Schedule](#schedule) - versions 1.0
- [Schedule Imports](#schedule-imports) - versions 1.0
- [Schedule Integration](#schedule-integration) - versions 1.0
- [Schedule Resource Assignments](#schedule-resource-assignments) - versions 1.1
- [Schedule Resources](#schedule-resources) - versions 1.1, 1.0
- [Schedule Settings](#schedule-settings) - versions 1.0
- [Schedule Type](#schedule-type) - versions 1.0
- [Task Requested Changes](#task-requested-changes) - versions 1.1
- [Tasks](#tasks) - versions 1.0
- [ToDos](#todos) - versions 1.0

## Calendar Events

Resource id: `calendar-events`. Raw spec: `../openapi-raw/calendar-events.json`. Web: https://developers.procore.com/reference/rest/calendar-events?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/calendar_events  **[DEPRECATED]**

**List calendar events**
DEPRECATED:
This endpoint is not accurate across time zones and has been deprecated. It will be removed in a future version of the API. Use the Schedule Tasks, Calendar Items, and Schedule endpoints instead.
List all Calendar Events for a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `calendar[start_datetime]` [query] string(date-time) - Start date or date-time
- `calendar[finish_datetime]` [query] string(date-time) - Finish date or date-time
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `schedule_tasks_last_updated_at`: string(date-time) - Timestamp of the most recent change to any task in the schedule e.g. `2020-06-04T20:30:00Z`
- `tasks`: array of object - Tasks
  - `id`: integer - Unique identifier for this task. e.g. `1359235`
  - `name`: string - Task name as the user sees it in Procore. Depending on the project settings this may include the full outline path e.g. `INTERIOR`
  - `task_name`: string - Task name. This will always contain just the task name, and will not include the full outline path. e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
  - `start_datetime`: string(date-time) - Task start timestamp in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
  - `finish_datetime`: string(date-time) - Task finish timestamp in ISO 8601 UTC format. e.g. `2015-03-08T22:00:00Z`
  - `percentage`: integer - Percent complete value for this task. e.g. `80`
  - `color`: string - The RGB color value, expressed in hex digits for the color used when displaying the task in Procore. The color varies depending on whether the task is on the critical path, complete, unstarted or in progress. e.g. `#6070A0`
  - `parent_id`: integer - ID of the parent task. e.g. `802241`
  - `pending`: boolean - True if one or more change requests are pending for this task. e.g. `false`
  - `activity_id`: string - The external unique identifier for this task. Note that due to an oversight in the original API, the value returned for this attribute will be the `source_uid` value supplied when creating a task. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `schedule_activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
  - `resource_name`: string - Names of any resources assigned to this task. e.g. `Resource 1, Resource 2, Resource 3`
  - `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
  - `milestone`: boolean - True if this task is a milestone. e.g. `false`
  - `actual_start`: string(date-time) - Actual start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
  - `actual_finish`: string(date-time) - Actual finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
  - `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
  - `has_children`: boolean - True if this is a summary task, i.e. this task has child tasks. e.g. `false`
  - `full_outline_path`: string - Task full outline path e.g. `INTERIOR`
  - `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
  - `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
  - `resource_ids`: array of integer - The resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
  - `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
  - `baseline_start`: string(date-time) - The baseline start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
  - `baseline_finish`: string(date-time) - The baseline finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
  - `start_variance`: number(float) - The start variance in days for this task. e.g. `1.5`
  - `finish_variance`: number(float) - The finish variance in days for this task. e.g. `-2.5`
  - `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`
  - `created_at`: string(date-time) - Date/time the Task was created in ISO 8601 UTC format. e.g. `2015-03-05T11:00:00Z`
  - `updated_at`: string(date-time) - Date/time the Task was last updated in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `updated_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `todos`: array of object - ToDos
  - `id`: integer - ToDo id e.g. `12`
  - `assignment`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `color`: string - ToDo color e.g. `#A4505D`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `description`: string - ToDo description e.g. `Use some power tools to fix the drywall.`
  - `finish_datetime`: string(date-time) - ToDo finish date-time e.g. `2015-02-07T00:00:00Z`
  - `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
  - `milestone`: boolean - ToDo milestone status e.g. `true`
  - `name`: string - ToDo name e.g. `Fix drywall`
  - `percentage`: integer - ToDo percentage e.g. `99`
  - `private`: boolean - ToDo private status e.g. `false`
  - `start_datetime`: string(date-time) - ToDo start date-time e.g. `2015-02-06T00:00:00Z`
  - `task_name`: string - ToDo name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
  - `updated_at`: string(date-time) - Date/time the ToDo was last updated e.g. `2015-02-06T00:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Calendar Items

Resource id: `calendar-items`. Raw spec: `../openapi-raw/calendar-items.json`. Web: https://developers.procore.com/reference/rest/calendar-items?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/schedule/calendar_items

**List Calendar Items**
Returns all Calendar Items for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[ids_only, total_count_only] - The view to use when serializing Calendar Item data. The ids_only view returns an array of Calendar Item IDs. The total_count_only view returns total count of Calendar Items.
- `start_date` [query] string(date) - Calendar Items that occur after this date
- `finish_date` [query] string(date) - Calendar Items that occur before this date
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[assigned_id]` [query] array of integer - Returns task(s) with specified assignee(s)
- `filters[date]` [query] string - Returns task(s) existing on the specified ISO 8601 datetime
- `sort` [query] string enum[id, name, start_date, finish_date, percent] - Return item(s) with the specified sort. Prepend "-" to specify descending order.

Response 200 (application/json): array of object

- `id`: integer - Calendar Item ID
- `assigned`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
- `finish`: string(date) - Calendar Item finish date e.g. `2020-02-02`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - Calendar Item milestone status e.g. `true`
- `name`: string - Calendar Item name e.g. `Fix Drywall`
- `percentage`: integer - Calendar Item completion percentage e.g. `50`
- `private`: boolean - Calendar Item private status e.g. `false`
- `start`: string(date) - Calendar Item start date e.g. `2020-01-01`
- `task_name`: string - Calendar Item name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Calendar Item last updated at e.g. `2019-08-01T00:00:00Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/schedule/calendar_items

**Create Calendar Item**
Create a new Calendar Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `calendar_item`: object (required)
  - `assigned_id`: integer - ID of the assigned user for the Calendar Item
  - `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
  - `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
  - `finish`: string(date) - The finish date of the Calendar Item e.g. `2020-02-02`
  - `name`: string - Calendar Item name e.g. `Fix Drywall`
  - `percentage`: integer - Calendar Item completion percentage e.g. `50`
  - `private`: boolean - Calendar Item private status e.g. `false`
  - `start`: string(date) - The start date of the Calendar Item e.g. `2020-01-01`

Response 200 (application/json): object

- `id`: integer - Calendar Item ID
- `assigned`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
- `finish`: string(date) - Calendar Item finish date e.g. `2020-02-02`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - Calendar Item milestone status e.g. `true`
- `name`: string - Calendar Item name e.g. `Fix Drywall`
- `percentage`: integer - Calendar Item completion percentage e.g. `50`
- `private`: boolean - Calendar Item private status e.g. `false`
- `start`: string(date) - Calendar Item start date e.g. `2020-01-01`
- `task_name`: string - Calendar Item name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Calendar Item last updated at e.g. `2019-08-01T00:00:00Z`

Response 201 (application/json): object

- `id`: integer - Calendar Item ID
- `assigned`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
- `finish`: string(date) - Calendar Item finish date e.g. `2020-02-02`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - Calendar Item milestone status e.g. `true`
- `name`: string - Calendar Item name e.g. `Fix Drywall`
- `percentage`: integer - Calendar Item completion percentage e.g. `50`
- `private`: boolean - Calendar Item private status e.g. `false`
- `start`: string(date) - Calendar Item start date e.g. `2020-01-01`
- `task_name`: string - Calendar Item name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Calendar Item last updated at e.g. `2019-08-01T00:00:00Z`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/schedule/calendar_items/{id}

**Show Calendar Item**
Get the details of a single Calendar Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Calendar Item ID

Response 200 (application/json): object

- `id`: integer - Calendar Item ID
- `assigned`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
- `finish`: string(date) - Calendar Item finish date e.g. `2020-02-02`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - Calendar Item milestone status e.g. `true`
- `name`: string - Calendar Item name e.g. `Fix Drywall`
- `percentage`: integer - Calendar Item completion percentage e.g. `50`
- `private`: boolean - Calendar Item private status e.g. `false`
- `start`: string(date) - Calendar Item start date e.g. `2020-01-01`
- `task_name`: string - Calendar Item name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Calendar Item last updated at e.g. `2019-08-01T00:00:00Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/schedule/calendar_items/{id}

**Update Calendar Item**
Update attributes on a single Calendar Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Calendar Item ID

Request body (application/json) (required):

- `calendar_item`: object (required)
  - `assigned_id`: integer - ID of the assigned user for the Calendar Item
  - `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
  - `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
  - `finish`: string(date) - The finish date of the Calendar Item e.g. `2020-02-02`
  - `name`: string - Calendar Item name e.g. `Fix Drywall`
  - `percentage`: integer - Calendar Item completion percentage e.g. `50`
  - `private`: boolean - Calendar Item private status e.g. `false`
  - `start`: string(date) - The start date of the Calendar Item e.g. `2020-01-01`

Response 200 (application/json): object

- `id`: integer - Calendar Item ID
- `assigned`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
- `finish`: string(date) - Calendar Item finish date e.g. `2020-02-02`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - Calendar Item milestone status e.g. `true`
- `name`: string - Calendar Item name e.g. `Fix Drywall`
- `percentage`: integer - Calendar Item completion percentage e.g. `50`
- `private`: boolean - Calendar Item private status e.g. `false`
- `start`: string(date) - Calendar Item start date e.g. `2020-01-01`
- `task_name`: string - Calendar Item name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Calendar Item last updated at e.g. `2019-08-01T00:00:00Z`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/schedule/calendar_items/{id}

**Delete Calendar Item**
Delete a single Calendar Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Calendar Item ID

Response 200: OK (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/schedule/calendar_items/sync

**Sync Calendar Items**
Create or update a batch of Calendar Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - ID of the Calendar Item to be updated
  - `assigned_id`: integer - ID of the assigned user for the Calendar Item
  - `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
  - `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
  - `finish`: string(date) - The finish date of the Calendar Item e.g. `2020-02-02`
  - `name`: string - Calendar Item name e.g. `Fix Drywall`
  - `percentage`: integer - Calendar Item completion percentage e.g. `50`
  - `private`: boolean - Calendar Item private status e.g. `false`
  - `start`: string(date) - The start date of the Calendar Item e.g. `2020-01-01`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Calendar Item ID
  - `assigned`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `color`: string - Calendar Item color (as a hex triplet) e.g. `#A4505D`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `description`: string - Calendar Item description e.g. `Use some power tools to fix the drywall.`
  - `finish`: string(date) - Calendar Item finish date e.g. `2020-02-02`
  - `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
  - `milestone`: boolean - Calendar Item milestone status e.g. `true`
  - `name`: string - Calendar Item name e.g. `Fix Drywall`
  - `percentage`: integer - Calendar Item completion percentage e.g. `50`
  - `private`: boolean - Calendar Item private status e.g. `false`
  - `start`: string(date) - Calendar Item start date e.g. `2020-01-01`
  - `task_name`: string - Calendar Item name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
  - `updated_at`: string(date-time) - Calendar Item last updated at e.g. `2019-08-01T00:00:00Z`
- `errors`: array of object
  - `errors`: object
    - `field_name`: array of string

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Lookahead Tasks

Resource id: `lookahead-tasks`. Raw spec: `../openapi-raw/lookahead-tasks.json`. Web: https://developers.procore.com/reference/rest/lookahead-tasks?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/schedule/lookahead_tasks

**Create Lookahead Task**
Create new Lookahead Task for the project schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `lookahead_task`: object (required)
  - `lookahead_id`: integer (required) - ID of the associated Lookahead e.g. `8`
  - `parent_id`: integer (required) - ID of the parent Lookahead Task e.g. `1`
  - `name`: string (required) - The name of the Task e.g. `Interior`
  - `start_date`: string - Task start date, in project time zone e.g. `2019-09-20`
  - `end_date`: string - Task end date, in project time zone e.g. `2019-09-30`
  - `resource_ids`: array of integer - ID of Resource(s) to assign to this Lookahead Task
  - `comment`: string - Additional comments
  - `segments`: array of object
    - `date`: string (required) - Date represented by the task segment e.g. `2019-09-20`
    - `status`: string enum[blank, complete, incomplete] (required) - Completion status of the task segment e.g. `complete`
  - `assignee_ids`: array of integer - ID of Contact(s) to assign to this Lookahead Task
  - `vendor_ids`: array of integer - ID of Company(s) to assign to this Lookahead Task

Response 201 (application/json): object

- `id`: integer - Lookahead Task ID
- `project_id`: integer - ID of the associated Project e.g. `156293`
- `company_id`: integer - ID of the associated Company e.g. `5499`
- `lookahead_id`: integer - ID of the associated Lookahead e.g. `8`
- `task_id`: integer - ID of the associated Task in the Master Schedule e.g. `2401832`
- `created_at`: string(date-time) - Lookahead Task creation time e.g. `2019-09-20T00:00:00Z`
- `created_by_id`: integer - ID of the user who created the Lookahead Task e.g. `12`
- `parent_id`: integer - ID of the parent Lookahead Task e.g. `1`
- `name`: string - The name of the Lookahead Task e.g. `Interior`
- `start_date`: string - Lookahead Task start date, in project time zone e.g. `2019-09-20`
- `end_date`: string - Lookahead Task end date, in project time zone e.g. `2019-09-30`
- `row_number`: integer - Defines the sequence in which Lookahead Tasks are normally expected to be displayed e.g. `2`
- `critical_path`: boolean - True if this Lookahead Task is on the critical path e.g. `false`
- `comment`: string - Additional comments
- `activity_id`: string - Activity ID e.g. `1000435`
- `wbs`: string - WBS e.g. `1.2`
- `assignee_ids`: array of integer - IDs of Assignee(s) assigned to this Lookahead Task
- `resource_ids`: array of integer - IDs of Resource(s) assigned to this Lookahead Task
- `vendor_ids`: array of integer - IDs of Vendor(s) assigned to this Lookahead Task
- `segments`: array of object - Segments define the set of days for the entire date range of the Lookahead Task, and the completion status of each day in the Lookahead Task
  - `date`: string(date) - Date represented by the Lookahead Task Segment e.g. `2020-02-12`
  - `status`: string enum[blank, complete, incomplete] - Completion status of the Lookahead Task Segment e.g. `complete`
- `resources`: array of object - Resources assigned to this Task
  - `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `id`: integer - Resource id e.g. `1359235`
  - `name`: string - Resource name e.g. `INTERIOR`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/schedule/lookahead_tasks/{id}

**Update Lookahead Task**
Update a Lookahead Task for the project schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Lookahead Task ID

Request body (application/json) (required):

- `lookahead_task`: object (required)
  - `lookahead_id`: integer (required) - ID of the associated Lookahead e.g. `8`
  - `parent_id`: integer (required) - ID of the parent Lookahead Task e.g. `1`
  - `name`: string (required) - The name of the Task e.g. `Interior`
  - `start_date`: string - Task start date, in project time zone e.g. `2019-09-20`
  - `end_date`: string - Task end date, in project time zone e.g. `2019-09-30`
  - `resource_ids`: array of integer - ID of Resource(s) to assign to this Lookahead Task
  - `comment`: string - Additional comments
  - `segments`: array of object
    - `date`: string (required) - Date represented by the task segment e.g. `2019-09-20`
    - `status`: string enum[blank, complete, incomplete] (required) - Completion status of the task segment e.g. `complete`
  - `assignee_ids`: array of integer - ID of Contact(s) to assign to this Lookahead Task
  - `vendor_ids`: array of integer - ID of Company(s) to assign to this Lookahead Task

Response 200 (application/json): object

- `id`: integer - Lookahead Task ID
- `project_id`: integer - ID of the associated Project e.g. `156293`
- `company_id`: integer - ID of the associated Company e.g. `5499`
- `lookahead_id`: integer - ID of the associated Lookahead e.g. `8`
- `task_id`: integer - ID of the associated Task in the Master Schedule e.g. `2401832`
- `created_at`: string(date-time) - Lookahead Task creation time e.g. `2019-09-20T00:00:00Z`
- `created_by_id`: integer - ID of the user who created the Lookahead Task e.g. `12`
- `parent_id`: integer - ID of the parent Lookahead Task e.g. `1`
- `name`: string - The name of the Lookahead Task e.g. `Interior`
- `start_date`: string - Lookahead Task start date, in project time zone e.g. `2019-09-20`
- `end_date`: string - Lookahead Task end date, in project time zone e.g. `2019-09-30`
- `row_number`: integer - Defines the sequence in which Lookahead Tasks are normally expected to be displayed e.g. `2`
- `critical_path`: boolean - True if this Lookahead Task is on the critical path e.g. `false`
- `comment`: string - Additional comments
- `activity_id`: string - Activity ID e.g. `1000435`
- `wbs`: string - WBS e.g. `1.2`
- `assignee_ids`: array of integer - IDs of Assignee(s) assigned to this Lookahead Task
- `resource_ids`: array of integer - IDs of Resource(s) assigned to this Lookahead Task
- `vendor_ids`: array of integer - IDs of Vendor(s) assigned to this Lookahead Task
- `segments`: array of object - Segments define the set of days for the entire date range of the Lookahead Task, and the completion status of each day in the Lookahead Task
  - `date`: string(date) - Date represented by the Lookahead Task Segment e.g. `2020-02-12`
  - `status`: string enum[blank, complete, incomplete] - Completion status of the Lookahead Task Segment e.g. `complete`
- `resources`: array of object - Resources assigned to this Task
  - `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `id`: integer - Resource id e.g. `1359235`
  - `name`: string - Resource name e.g. `INTERIOR`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/schedule/lookahead_tasks/{id}

**Delete Lookahead Task**
Delete a Lookahead Task from the project schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Lookahead Task ID

Response 200: Deleted (no body)

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Lookaheads

Resource id: `lookaheads`. Raw spec: `../openapi-raw/lookaheads.json`. Web: https://developers.procore.com/reference/rest/lookaheads?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/schedule/lookaheads

**List Lookaheads**
Returns all Lookaheads for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - Lookahead ID
- `start_date`: string(date-time) - Lookahead start date, in project time zone e.g. `2019-09-20T12:42:00Z`
- `end_date`: string(date-time) - Lookahead end date, in project time zone e.g. `2019-09-20T12:42:00Z`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/schedule/lookaheads

**Create Lookahead**
Create a new Lookahead for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `lookahead`: object (required)
  - `start_date`: string (required) - Lookahead start date, in project time zone e.g. `2019-09-20`
  - `end_date`: string (required) - Lookahead end date, in project time zone e.g. `2019-09-30`
  - `copied_from_id`: integer - ID of a previously created lookahead that will be used to populate this lookahead. Defaults to null, in which case the lookahead will populate directly from the master schedule.

Response 201 (application/json): object

- `id`: integer - Lookahead ID
- `start_date`: string(date-time) - Lookahead start date, in project time zone e.g. `2019-09-20T12:42:00Z`
- `end_date`: string(date-time) - Lookahead end date, in project time zone e.g. `2019-09-20T12:42:00Z`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/schedule/lookaheads/{id}

**Show Lookahead**
Returns single Lookahead.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Lookahead ID

Response 200 (application/json): object

- `id`: integer - Lookahead ID
- `start_date`: string(date) - Lookahead start date, in project time zone e.g. `2019-09-20`
- `end_date`: string(date) - Lookahead end date, in project time zone e.g. `2019-09-20`
- `created_at`: string(date-time) - Lookahead creation time e.g. `2019-08-01T00:00:00Z`
- `data_date`: string(date-time) - Lookahead last update time e.g. `2019-08-01T00:00:00Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `label`: string - Lookahead label e.g. `08/27/21 - 09/16/21 | 3 Weeks`
- `lookahead_tasks`: array of object - List of tasks in the Lookahead, given in a nested tree structure according to parent-child relationships
  - `id`: integer - Lookahead Task ID
  - `parent_id`: integer e.g. `1234`
  - `name`: string - Task name
  - `row_number`: integer - Number of the task row within the project schedule e.g. `1`
  - `critical_path`: boolean - Whether or not the task is included in critical path
  - `comment`: string - Additional comments
  - `activity_id`: string - Activity ID e.g. `1000435`
  - `wbs`: string - WBS e.g. `1.2`
  - `segments`: array of object - Segments define the set of days for the entire date range of the task, and the completion status of each day in the task
    - `date`: string (required) - Date represented by the task segment e.g. `2019-09-20`
    - `status`: string enum[blank, complete, incomplete] (required) - Completion status of the task segment e.g. `complete`
  - `resources`: array of object - Resource(s) assigned to this Lookahead Task
    - `id`: integer e.g. `1`
    - `company_id`: integer e.g. `2`
    - `deleted_at`: string(date-time) e.g. `2019-08-01T00:00:00Z`
    - `project_id`: integer e.g. `3`
    - `source_uid`: string e.g. `00000000-0000-0000-0000-000000000000`
  - `assignees`: array of object - Contact(s) assigned to this Lookahead Task
    - `id`: integer e.g. `1`
    - `email`: string e.g. `assignee@example.com`
    - `login_information_id`: integer e.g. `2`
    - `name`: string e.g. `Arnold Assignee`
  - `vendors`: array of object - Company(s) assigned to this Lookahead Task
    - `id`: integer e.g. `1`
    - `name`: string e.g. `Versatile Vendor`
  - `task`: object - The Master Scheduled Task this Lookahead Task corresponds with, if one exists
    - `id`: integer - Lookahead ID
    - `finish`: string(date-time) - Task finish time e.g. `2019-08-22T23:59:99Z`
    - `start`: string(date-time) - Task start time e.g. `2019-08-01T00:00:00Z`
  - `subtasks`: array of object
    - `id`: integer e.g. `43`
    - `parent_id`: integer - ID reference to the parent task
    - `name`: string - Task name
    - `row_number`: integer e.g. `2`
    - `critical_path`: boolean - Whether or not the task is included in critical path
    - `comment`: string - Additional comments
    - `activity_id`: string - Activity ID e.g. `1000435`
    - `wbs`: string - WBS e.g. `1.2`
    - `segments`: array of object - Segments define the set of days for the entire date range of the task, and the completion status of each day in the task
    - `resources`: array of object - Resource(s) assigned to this Lookahead Task
    - `assignees`: array of object - Contact(s) assigned to this Lookahead Task
    - `vendors`: array of object - Company(s) assigned to this Lookahead Task
    - `task`: object - The Master Scheduled Task this Lookahead Task corresponds with, if one exists
    - `subtasks`: array of object - Subtask(s) assigned to this Lookahead Task
- `generation_errors`: array of object - List of errors that appeared during Lookahead generation.
  - `task`: object - Schedule Task
    - `id`: integer e.g. `43`
    - `row_number`: integer e.g. `43`
    - `name`: string e.g. `task`
  - `errors`: array of string
- `status`: string enum[queued, processing_previous_lookahead, processing_master_schedule, ready] - Lookahead processing status. e.g. `ready`
- `weeks`: integer - Number of weeks the Lookahead spans in duration e.g. `3`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/schedule/lookaheads/{id}

**Delete Lookahead**
Deletes a single Lookahead.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Lookahead ID

Response 204: The lookahead was deleted (no body)

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/schedule/lookaheads  **[OLDER VERSION - a newer path version exists below/above]**

**List Lookaheads**
Returns all Lookaheads for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - Lookahead ID
- `start_date`: string(date-time) - Lookahead start date, in project time zone e.g. `2019-09-20T12:42:00Z`
- `end_date`: string(date-time) - Lookahead end date, in project time zone e.g. `2019-09-20T12:42:00Z`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/schedule/lookaheads  **[OLDER VERSION - a newer path version exists below/above]**

**Create Lookahead**
Create a new Lookahead for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `lookahead`: object (required)
  - `start_date`: string (required) - Lookahead start date, in project time zone e.g. `2019-09-20`
  - `end_date`: string (required) - Lookahead end date, in project time zone e.g. `2019-09-30`
  - `copied_from_id`: integer - ID of a previously created lookahead that will be used to populate this lookahead. Defaults to the most recent lookahead.

Response 201 (application/json): object

- `id`: integer - Lookahead ID
- `start_date`: string(date-time) - Lookahead start date, in project time zone e.g. `2019-09-20T12:42:00Z`
- `end_date`: string(date-time) - Lookahead end date, in project time zone e.g. `2019-09-20T12:42:00Z`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/schedule/lookaheads/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Lookahead**
Returns single Lookahead.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Lookahead ID

Response 200 (application/json): object

- `id`: integer - Lookahead ID
- `start_date`: string(date) - Lookahead start date, in project time zone e.g. `2019-09-20`
- `end_date`: string(date) - Lookahead end date, in project time zone e.g. `2019-09-20`
- `created_at`: string(date-time) - Lookahead creation time e.g. `2019-08-01T00:00:00Z`
- `data_date`: string(date-time) - Lookahead last update time e.g. `2019-08-01T00:00:00Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `label`: string - Lookahead label e.g. `08/27/21 - 09/16/21 | 3 Weeks`
- `lookahead_tasks`: array of object - List of tasks in the Lookahead, given in a nested tree structure according to parent-child relationships
  - `id`: integer - Lookahead Task ID
  - `parent_id`: integer e.g. `1234`
  - `name`: string - Task name
  - `row_number`: integer - Number of the task row within the project schedule e.g. `1`
  - `critical_path`: boolean - Whether or not the task is included in critical path
  - `comment`: string - Additional comments
  - `activity_id`: string - Activity ID e.g. `1000435`
  - `wbs`: string - WBS e.g. `1.2`
  - `segments`: array of object - Segments define the set of days for the entire date range of the task, and the completion status of each day in the task
    - `date`: string (required) - Date represented by the task segment e.g. `2019-09-20`
    - `status`: string enum[blank, complete, incomplete] (required) - Completion status of the task segment e.g. `complete`
  - `resources`: array of object - Resource(s) assigned to this Lookahead Task
    - `id`: integer e.g. `1`
    - `company_id`: integer e.g. `2`
    - `deleted_at`: string(date-time) e.g. `2019-08-01T00:00:00Z`
    - `project_id`: integer e.g. `3`
    - `source_uid`: string e.g. `00000000-0000-0000-0000-000000000000`
  - `assignees`: array of object - Contact(s) assigned to this Lookahead Task
    - `id`: integer e.g. `1`
    - `email`: string e.g. `assignee@example.com`
    - `login_information_id`: integer e.g. `2`
    - `name`: string e.g. `Arnold Assignee`
  - `vendors`: array of object - Company(s) assigned to this Lookahead Task
    - `id`: integer e.g. `1`
    - `name`: string e.g. `Versatile Vendor`
  - `task`: object - The Master Scheduled Task this Lookahead Task corresponds with, if one exists
    - `id`: integer - Lookahead ID
    - `finish`: string(date-time) - Task finish time e.g. `2019-08-22T23:59:99Z`
    - `start`: string(date-time) - Task start time e.g. `2019-08-01T00:00:00Z`
  - `subtasks`: array of object
    - `id`: integer e.g. `43`
    - `parent_id`: integer - ID reference to the parent task
    - `name`: string - Task name
    - `row_number`: integer e.g. `2`
    - `critical_path`: boolean - Whether or not the task is included in critical path
    - `comment`: string - Additional comments
    - `activity_id`: string - Activity ID e.g. `1000435`
    - `wbs`: string - WBS e.g. `1.2`
    - `segments`: array of object - Segments define the set of days for the entire date range of the task, and the completion status of each day in the task
    - `resources`: array of object - Resource(s) assigned to this Lookahead Task
    - `assignees`: array of object - Contact(s) assigned to this Lookahead Task
    - `vendors`: array of object - Company(s) assigned to this Lookahead Task
    - `task`: object - The Master Scheduled Task this Lookahead Task corresponds with, if one exists
    - `subtasks`: array of object - Subtask(s) assigned to this Lookahead Task
- `generation_errors`: array of object - List of errors that appeared during Lookahead generation.
  - `task`: object - Schedule Task
    - `id`: integer e.g. `43`
    - `row_number`: integer e.g. `43`
    - `name`: string e.g. `task`
  - `errors`: array of string
- `status`: string enum[queued, processing_previous_lookahead, processing_master_schedule, ready] - Lookahead processing status. e.g. `ready`
- `weeks`: integer - Number of weeks the Lookahead spans in duration e.g. `3`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/schedule/lookaheads/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Lookahead**
Deletes a single Lookahead.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Lookahead ID

Response 204: The lookahead was deleted (no body)

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requested Changes

Resource id: `requested-changes`. Raw spec: `../openapi-raw/requested-changes.json`. Web: https://developers.procore.com/reference/rest/requested-changes?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/requested_changes  **[DEPRECATED]**

**List Requested Changes**
List all Requested Changes of a Task.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `task_id` [query] integer - The task for which all requested changes will be retrieved.
- `view` [query] string - The `with_task` view includes an additional task data for correspondent requested changes
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `requested_changes`: array of object
  - `id`: integer - Requested change id e.g. `333713`
  - `requested_by`: string - Requested change requested by e.g. `Bob Dole on Nov. 24`
  - `change_requested`: string - Requested change e.g. `<ul><li>Other change: why7</li></ul>`
  - `reason`: string - Requested change reason e.g. `<p>this is a description</p>`
  - `status`: string enum[Approved, Rejected, Pending] - Requested change status localized e.g. `Pending`
  - `status_not_localized`: string enum[approved, rejected, pending] - Requested change status not localized e.g. `pending`
  - `notes`: string - Requested change notes e.g. `Notes`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/requested_changes  **[DEPRECATED]**

**Creates Requested Change**
Creates a requested changes for a Task.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `task_id` [query] integer (required) - The task for which requested changes will be added to.

Request body (application/json) (required):

- `requested_change`: object
  - `change_reason`: string - Requested change reason e.g. `Change schedule request`
  - `other_change`: string e.g. `Other change`
  - `task`: object
    - `start`: string - Requested change start date e.g. `2022-01-31`
    - `finish`: string - Requested change finish date e.g. `2022-02-15`
    - `percentage`: integer - Requested change percentage e.g. `50`
  - `notes`: string - Requested change notes e.g. `Delayed due to weather`

Response 201 (application/json): object

- `id`: integer - Requested change id e.g. `333713`
- `change_requested`: string - Requested change e.g. `<ul><li>Other change: why7</li></ul>`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `new_finish`: string(date) - Requested change finish date e.g. `2022-03-04T00:00:00Z`
- `new_start`: string(date) - Requested change start date e.g. `2022-01-31T00:00:00Z`
- `new_percentage`: integer - Requested change percentage e.g. `50`
- `old_finish`: string(date) - Current finish date e.g. `2022-03-04T00:00:00Z`
- `old_start`: string(date) - Current start date e.g. `2022-01-31T00:00:00Z`
- `old_percentage`: integer - Current percentage e.g. `50`
- `other_change`: string - Other change e.g. `Add as milestone`
- `reason`: string - Requested change reason e.g. `<p>this is a description</p>`
- `status`: string - Localized requested change status e.g. `Pending`
- `status_not_localized`: string enum[approved, rejected, pending] - Requested change status not localized e.g. `pending`
- `notes`: string - Requested change notes e.g. `Notes`
- `created_at`: string(date) - Requested change created date e.g. `2022-03-04T00:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/requested_changes/review  **[DEPRECATED]**

**Review Requested Changes**
Review Requested Changes for Tasks.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `requested_changes`: array of object
  - `id`: integer - Requested Change ID e.g. `1`
  - `approved`: boolean - Review result
  - `disposition_reason`: string - reason of review e.g. `Looks reasonable`

Response 200 (application/json): array of object

- `id`: integer - Requested change id e.g. `333713`
- `requested_by`: string - Requested change requested by e.g. `Bob Dole on Nov. 24`
- `change_requested`: string - Requested change e.g. `<ul><li>Other change: why7</li></ul>`
- `reason`: string - Requested change reason e.g. `<p>this is a description</p>`
- `status`: string enum[Approved, Rejected, Pending] - Requested change status localized e.g. `Pending`
- `status_not_localized`: string enum[approved, rejected, pending] - Requested change status not localized e.g. `pending`
- `notes`: string - Requested change notes e.g. `Notes`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule

Resource id: `schedule`. Raw spec: `../openapi-raw/schedule.json`. Web: https://developers.procore.com/reference/rest/schedule?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/schedule

**Get Schedule Metadata**
Returns metadata about this Project's Schedule, including information about the Schedule integration configuration for the current project.
#### Schedule Types
| Type                                                 | Key                           |
|------------------------------------------------------|-------------------------------|
| File-based schedule integration via web browser      | "Microsoft Project"           |
| File-based schedule integration via Procore Drive    | "Microsoft Project 2010"      |
| File-based schedule integration via Procore Documents| "Microsoft Project Documents" |
| Primavera P6 database integration via Procore Drive  | "Primavera P6"                |
Note that the schedule types listed as "Microsoft Project", "Microsoft Project 2010", and "Microsoft Project Documents" are functionally identical.
In all cases Procore can consume any supported schedule file type and extract data from it, not just Microsoft Project.
Schedule files can be uploaded either via Procore Drive, via the Procore Documents tool, or via the Procore Schedule tool,
regardless of which of these three types is selected. Where Primavera P6 database integration via Procore Drive is in use, the `p6_id`
attribute returned by this API indicates which P6 project Procore Drive is extracting data from.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `active_features`: object
  - `schedule_activity_feed`: boolean
  - `schedule_gantt_crud`: boolean
  - `schedule_task_comments`: boolean
  - `schedule_task_details`: boolean
  - `schedule_linked_items`: boolean
- `last_calendar_view`: string e.g. `month`
- `schedule_present`: boolean
- `schedule_processing`: boolean
- `schedule_crud_beta_agreement`: object
  - `signed`: boolean
  - `version`: string e.g. `onetrust_beta_user/schedule_crud`
- `schedule_tasks_last_updated_at`: string(date-time) - Timestamp of the most recent change to any task in the Schedule. e.g. `2020-06-04T20:30:00Z`
- `schedule_tasks_edited_manually`: boolean
- `type`: object
  - `key`: string enum[Microsoft Project, Microsoft Project 2010, Microsoft Project Documents, Primavera P6, None] - Schedule type key e.g. `Microsoft Project`
  - `p6_id`: string - Schedule type Primavera P6 Identifier e.g. `NRG00940`
- `data_date`: string(date-time) - The data datetime of the last imported schedule. e.g. `2019-01-06T11:26:00Z`
- `lookahead_data_date`: string(date-time) - The Lookahead's data datetime. e.g. `2019-01-06T11:26:00Z`
- `number_of_pending_requested_changes`: number - The number of pending Requested Changes for the given user. e.g. `2`
- `uploaded_at`: string(date-time) - The upload datetime of the last imported schedule. e.g. `2019-01-06T11:26:00Z`
- `office`: object - Office
  - `id`: integer - Office id e.g. `1`
  - `name`: string - Office name e.g. `Main Office`
  - `address`: string - Office address e.g. `100 Construction Lane`
  - `city`: string - Office city e.g. `Santa Barbara`
  - `state_code`: string - Office state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `country_code`: string - Office country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `zip`: string - Office zip e.g. `93101`
  - `phone`: string - Office phone e.g. `8059831234`
  - `fax`: string - Office fax e.g. `8059834321`
  - `division`: string - Office division e.g. `First`
  - `logo`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
- `project`: object - Project
  - `id`: integer - Project Id e.g. `1`
  - `country_code`: string - Country Code e.g. `US`
  - `country_name`: string - Country Name e.g. `United States`
  - `state_code`: string - State Code e.g. `AL`
  - `state_name`: string - State Name e.g. `Alabama`
  - `county`: string - County e.g. `Washington County`
  - `city`: string - City e.g. `New York`
  - `address`: string - Address e.g. `First street 111`
  - `zip`: string - ZIP e.g. `12345`
  - `phone`: string - Phone e.g. `123456789`
  - `fax`: string - Fax e.g. `123456789`
  - `time_zone`: string - Time Zone e.g. `Eastern Time (US & Canada)`
  - `time_zone_name`: string - Time Zone Name e.g. `(GMT-05:00) Eastern Time (US & Canada)`
  - `logo_url`: string - Logo URL e.g. `https://some_url_to_logo.png`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/schedule

**Update Schedule Metadata**
Updates the Schedule integration type for a project.
#### Schedule Types
| Type                                                 | Key                           |
|------------------------------------------------------|-------------------------------|
| File-based schedule integration via web browser      | "Microsoft Project"           |
| File-based schedule integration via Procore Drive    | "Microsoft Project 2010"      |
| File-based schedule integration via Procore Documents| "Microsoft Project Documents" |
| Primavera P6 database integration via Procore Drive  | "Primavera P6"                |
Note that the schedule types listed as "Microsoft Project", "Microsoft Project 2010", and "Microsoft Project Documents" are functionally identical.
In all cases Procore can consume any supported schedule file type and extract data from it, not just Microsoft Project.
Schedule files can be uploaded either via Procore Drive, via the Procore Documents tool, or via the Procore Schedule tool,
regardless of which of these three types is selected. Where Primavera P6 database integration via Procore Drive is in use, the `p6_id`
attribute returned by this API indicates which P6 project Procore Drive is extracting data from.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Schedule Type belongs to e.g. `513526`
- `type`: object (required) - Schedule Type object
  - `key`: string enum[Microsoft Project, Microsoft Project 2010, Microsoft Project Documents, Primavera P6] - The Key of the Schedule Type e.g. `Primavera P6`
  - `p6_id`: string - The Primavera P6 Identifier of the Schedule Type e.g. `123456abc`

Response 200 (application/json): object

- `active_features`: object
  - `schedule_activity_feed`: boolean
  - `schedule_gantt_crud`: boolean
  - `schedule_task_comments`: boolean
  - `schedule_task_details`: boolean
  - `schedule_linked_items`: boolean
- `last_calendar_view`: string e.g. `month`
- `schedule_present`: boolean
- `schedule_processing`: boolean
- `schedule_crud_beta_agreement`: object
  - `signed`: boolean
  - `version`: string e.g. `onetrust_beta_user/schedule_crud`
- `schedule_tasks_last_updated_at`: string(date-time) - Timestamp of the most recent change to any task in the Schedule. e.g. `2020-06-04T20:30:00Z`
- `schedule_tasks_edited_manually`: boolean
- `type`: object
  - `key`: string enum[Microsoft Project, Microsoft Project 2010, Microsoft Project Documents, Primavera P6, None] - Schedule type key e.g. `Microsoft Project`
  - `p6_id`: string - Schedule type Primavera P6 Identifier e.g. `NRG00940`
- `data_date`: string(date-time) - The data datetime of the last imported schedule. e.g. `2019-01-06T11:26:00Z`
- `lookahead_data_date`: string(date-time) - The Lookahead's data datetime. e.g. `2019-01-06T11:26:00Z`
- `number_of_pending_requested_changes`: number - The number of pending Requested Changes for the given user. e.g. `2`
- `uploaded_at`: string(date-time) - The upload datetime of the last imported schedule. e.g. `2019-01-06T11:26:00Z`
- `office`: object - Office
  - `id`: integer - Office id e.g. `1`
  - `name`: string - Office name e.g. `Main Office`
  - `address`: string - Office address e.g. `100 Construction Lane`
  - `city`: string - Office city e.g. `Santa Barbara`
  - `state_code`: string - Office state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `country_code`: string - Office country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `zip`: string - Office zip e.g. `93101`
  - `phone`: string - Office phone e.g. `8059831234`
  - `fax`: string - Office fax e.g. `8059834321`
  - `division`: string - Office division e.g. `First`
  - `logo`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
- `project`: object - Project
  - `id`: integer - Project Id e.g. `1`
  - `country_code`: string - Country Code e.g. `US`
  - `country_name`: string - Country Name e.g. `United States`
  - `state_code`: string - State Code e.g. `AL`
  - `state_name`: string - State Name e.g. `Alabama`
  - `county`: string - County e.g. `Washington County`
  - `city`: string - City e.g. `New York`
  - `address`: string - Address e.g. `First street 111`
  - `zip`: string - ZIP e.g. `12345`
  - `phone`: string - Phone e.g. `123456789`
  - `fax`: string - Fax e.g. `123456789`
  - `time_zone`: string - Time Zone e.g. `Eastern Time (US & Canada)`
  - `time_zone_name`: string - Time Zone Name e.g. `(GMT-05:00) Eastern Time (US & Canada)`
  - `logo_url`: string - Logo URL e.g. `https://some_url_to_logo.png`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule Imports

Resource id: `schedule-imports`. Raw spec: `../openapi-raw/schedule-imports.json`. Web: https://developers.procore.com/reference/rest/schedule-imports?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/schedule/imports/processing_status

**Get Schedule Import processing state**
Get info regarding if schedule import is currently processing or not

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `schedule_processing_status`: string - The status of a Schedule Import e.g. `completed`
- `import_file`: object
  - `name`: string - The filename of the Schedule Import e.g. `Schedule.mpp`
- `schedule_uploaded`: boolean - The upload status of the Schedule Import e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule Integration

Resource id: `schedule-integration`. Raw spec: `../openapi-raw/schedule-integration.json`. Web: https://developers.procore.com/reference/rest/schedule-integration?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/schedule_integration

**List Schedule Imports**
Return a list of schedule imports for this project, most recent first.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - id of schedule import e.g. `7887`
- `message`: string - In the event that the schedule import failed, this field will contain a description of the failure. Note that if the import was successful, or if the import has not yet been processed, this field will be `null`. e.g. `Your file appears to be password protected. Please remove the password and tr...`
- `processed_at`: string(date-time) - The time at which the schedule import processing completed. e.g. `2019-01-06T11:26:08Z`
- `success`: boolean - If this field is `true`, this indicates that the schedule import was successful. `false` indicates that the schedule import failed. The `message` field should indicate why the import failed. `null` indicates that the ... e.g. `false`
- `uploaded_at`: string(date-time) - The time at which the schedule was uploaded. e.g. `2019-01-06T11:26:08Z`
- `schedule_source`: string enum[Procore, Procore API, Procore Documents, Procore Drive] - Used schedule upload method
- `uploaded_by`: object
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `file`: object
  - `id`: integer - Unique integer identifier for this file attachment.
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/schedule_integration

**Upload schedule file**
Upload a schedule file.
#### Supported File Formats
| Type | Source                                                        |
|------|---------------------------------------------------------------|
| MPP  | Microsoft Project                                             |
| MPX  | Microsoft Project, SureTrak                                   |
| XER  | Primavera P6, Primavera Contractor                            |
| PP   | Asta Powerproject, Asta Easyplan                              |
| XML  | Formatted for Microsoft Project, e.g. Smartsheet, OpenProject |
| XML  | Primavera PMXML                                               |
| PPX  | Phoenix Project Manager                                       |
| FTS  | FastTrack Schedule                                            |
| POD  | ProjectLibre                                                  |
| GAN  | GanttProject                                                  |
| PEP  | TurboProject                                                  |
| PRX  | Primavera P3                                                  |
| STX  | Primavera SureTrak                                            |
| CDPX | ConceptDraw PROJECT                                           |
| CDPZ | ConceptDraw PROJECT                                           |
| SP   | Synchro Scheduler                                             |
| SEDF | USACE Standard Data Exchange Format                           |
| ZIP  | Compressed file containing one of the supported file types    |

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `schedule_integration`: object (required)
  - `file_id`: string - Prostore File ID (Preferably use upload_id instead)
  - `upload_id`: string - Upload ID e.g. `01JBD3HF2SA3JZ5AR107GTWF4E`

Response 200: OK (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/schedule_integration  **[DEPRECATED]**

**Upload schedule file**
DEPRECATED:
This endpoint is a duplicate of the `PUT` endpoint. It will be removed in a future version of the API. Use the `PUT` method instead.
Upload a schedule file.
#### Supported File Formats
| Type | Source                                                        |
|------|---------------------------------------------------------------|
| MPP  | Microsoft Project                                             |
| MPX  | Microsoft Project, SureTrak                                   |
| XER  | Primavera P6, Primavera Contractor                            |
| PP   | Asta Powerproject, Asta Easyplan                              |
| XML  | Formatted for Microsoft Project, e.g. Smartsheet, OpenProject |
| XML  | Primavera PMXML                                               |
| PPX  | Phoenix Project Manager                                       |
| FTS  | FastTrack Schedule                                            |
| POD  | ProjectLibre                                                  |
| GAN  | GanttProject                                                  |
| PEP  | TurboProject                                                  |
| PRX  | Primavera P3                                                  |
| STX  | Primavera SureTrak                                            |
| CDPX | ConceptDraw PROJECT                                           |
| CDPZ | ConceptDraw PROJECT                                           |
| SP   | Synchro Scheduler                                             |
| SEDF | USACE Standard Data Exchange Format                           |
| ZIP  | Compressed file containing one of the supported file types    |

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `schedule_integration`: object (required)
  - `file_id`: string - Prostore File ID (Preferably use upload_id instead)
  - `upload_id`: string - Upload ID e.g. `01JBD3HF2SA3JZ5AR107GTWF4E`

Response 200: OK (no body)

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/schedule_integration/download

**Download schedule file**
Download the most recently uploaded schedule file.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule Resource Assignments

Resource id: `schedule-resource-assignments`. Raw spec: `../openapi-raw/schedule-resource-assignments.json`. Web: https://developers.procore.com/reference/rest/schedule-resource-assignments?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/schedule/resource_assignments/{id}

**Show resource assignment**
Show detail on the specified Resource Assignment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the resource

Response 200 (application/json): object

- `id`: integer - Resource Assignment id e.g. `1359235`
- `task_id`: integer - Task id e.g. `54671`
- `resource_id`: integer - Resource id e.g. `976541`
- `schedule_attributes`: object - When a schedule is imported from an external system, any attributes which are not otherwise represented in this object will appear as key-value pairs here. Note that the set of keys present in this object will depend ...

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule Resources

Resource id: `schedule-resources`. Raw spec: `../openapi-raw/schedule-resources.json`. Web: https://developers.procore.com/reference/rest/schedule-resources?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/schedule/resources

**List Resources**
Return a list of all resources in a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[query]` [query] string - Return item(s) containing search query

Response 200 (application/json): array of object

- `id`: integer - Resource id e.g. `1359235`
- `company_id`: integer - Company id e.g. `87765`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2018-09-20T21:39:40Z`
- `name`: string - Resource name e.g. `INTERIOR`
- `project_id`: integer - Project id e.g. `985384`
- `schedule_attributes`: object - When a schedule is imported from an external system, any attributes which are not otherwise represented in this object will appear as key-value pairs here. Note that the set of keys present in this object will depend ...
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/schedule/resources

**Create resource**
Create a new Resource associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Resource belongs to
- `resource`: object (required) - Resource object
  - `name`: string - The Name of the Resource
  - `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data.

Response 201 (application/json): object

- `id`: integer - Resource id e.g. `1359235`
- `company_id`: integer - Company id e.g. `87765`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2018-09-20T21:39:40Z`
- `name`: string - Resource name e.g. `INTERIOR`
- `project_id`: integer - Project id e.g. `985384`
- `schedule_attributes`: object - When a schedule is imported from an external system, any attributes which are not otherwise represented in this object will appear as key-value pairs here. Note that the set of keys present in this object will depend ...
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/schedule/resources/{id}

**Show resource**
Show detail on the specified Resource.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the resource

Response 200 (application/json): object

- `id`: integer - Resource id e.g. `1359235`
- `company_id`: integer - Company id e.g. `87765`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2018-09-20T21:39:40Z`
- `name`: string - Resource name e.g. `INTERIOR`
- `project_id`: integer - Project id e.g. `985384`
- `schedule_attributes`: object - When a schedule is imported from an external system, any attributes which are not otherwise represented in this object will appear as key-value pairs here. Note that the set of keys present in this object will depend ...
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/schedule/resources/{id}

**Update resource**
Update the specified Resource.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the resource

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Resource belongs to
- `resource`: object (required) - Resource object
  - `name`: string - The Name of the Resource
  - `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data.

Response 200 (application/json): object

- `id`: integer - Resource id e.g. `1359235`
- `company_id`: integer - Company id e.g. `87765`
- `deleted_at`: string(date-time) - Timestamp of deletion e.g. `2018-09-20T21:39:40Z`
- `name`: string - Resource name e.g. `INTERIOR`
- `project_id`: integer - Project id e.g. `985384`
- `schedule_attributes`: object - When a schedule is imported from an external system, any attributes which are not otherwise represented in this object will appear as key-value pairs here. Note that the set of keys present in this object will depend ...
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/schedule/resources/{id}

**Delete resource**
Delete the specified Resource. Note that when a Resource is deleted, any assignments to Tasks will also be removed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the resource

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/resources  **[OLDER VERSION - a newer path version exists below/above]**

**List Resources**
Return a list of all resources in a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Resource id e.g. `1359235`
- `name`: string - Resource name e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/resources  **[OLDER VERSION - a newer path version exists below/above]**

**Create resource**
Create a new Resource associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Resource belongs to
- `resource`: object (required) - Resource object
  - `name`: string - The Name of the Resource
  - `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data.

Response 201 (application/json): object

- `id`: integer - Resource id e.g. `1359235`
- `name`: string - Resource name e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/resources/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show resource**
Show detail on the specified Resource.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the resource
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Resource id e.g. `1359235`
- `name`: string - Resource name e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/resources/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update resource**
Update the specified Resource.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the resource

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Resource belongs to
- `resource`: object (required) - Resource object
  - `name`: string - The Name of the Resource
  - `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data.

Response 200 (application/json): object

- `id`: integer - Resource id e.g. `1359235`
- `name`: string - Resource name e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this resource from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/resources/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete resource**
Delete the specified Resource. Note that when a resource is deleted, any assignments to tasks will also be removed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the resource
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule Settings

Resource id: `schedule-settings`. Raw spec: `../openapi-raw/schedule-settings.json`. Web: https://developers.procore.com/reference/rest/schedule-settings?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/schedule/settings

**Show Project Schedule Settings**
Return the Schedule tool settings for the given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `project_id`: integer - Project e.g. `1`
- `company_id`: integer - Company e.g. `1`
- `primavera_schedule_id`: string - Primavera schedule e.g. `1`
- `schedule_type`: string - Schedule type e.g. `Microsoft Project`
- `schedule_file_pattern`: string - Schedule file pattern e.g. `*.mpp`
- `project_integration`: boolean - Project integration e.g. `false`
- `display_task_names_with_full_outline_path`: boolean - Display task names with full outline path e.g. `false`
- `schedule_show_resources_on_calendar`: boolean - Schedule show resources on calendar e.g. `false`
- `schedule_allow_task_updates`: boolean - Schedule allow task updates e.g. `false`
- `schedule_task_auto_formatting`: boolean - Schedule task auto formatting e.g. `false`
- `create_calendar_item_enabled`: boolean - Create calendar item enabled e.g. `false`
- `calendar_people_filters_enabled`: boolean - Calendar people filters enabled e.g. `false`
- `schedule_use_project_admin_working_days`: boolean - Schedule use project admin working days e.g. `false`
- `email_settings`: object - Email settings
  - `project_schedule_email_setting_id`: integer - Project schedule email setting e.g. `1`
  - `send_weekly`: boolean - Send weekly e.g. `false`
  - `day_of_week`: integer enum[0, 1, 2, 3, 4, 5, 6] - Day of week e.g. `1`
  - `hour_to_send`: integer enum[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] - Hour to send e.g. `1`
  - `weeks_to_show`: integer enum[1, 2, 3, 4, 5, 6, 7, 8] - Weeks to show e.g. `1`
  - `last_sent_at`: string(date-time) - Last sent at e.g. `2023-03-03T21:25:24Z`
  - `next_scheduled_at`: string(date-time) - Next scheduled at e.g. `2023-03-03T21:25:24Z`
  - `lookahead_send_weekly`: boolean - Lookahead send weekly e.g. `false`
  - `lookahead_day_of_week`: integer enum[0, 1, 2, 3, 4, 5, 6] - Lookahead day of week e.g. `1`
  - `lookahead_hour_to_send`: integer enum[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] - Lookahead hour to send e.g. `1`
  - `lookahead_last_sent_at`: string(date-time) - Lookahead last sent at e.g. `2023-03-03T21:25:24Z`
  - `lookahead_next_scheduled_at`: string(date-time) - Lookahead next scheduled at e.g. `2023-03-03T21:25:24Z`
  - `resource_send_weekly`: boolean - Resource send weekly e.g. `false`
  - `resource_day_of_week`: integer enum[0, 1, 2, 3, 4, 5, 6] - Resource day of week e.g. `1`
  - `resource_hour_to_send`: integer enum[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] - Resource hour to send e.g. `1`
  - `resource_weeks_to_show`: integer enum[1, 2, 3, 4, 5, 6, 7, 8] - Resource weeks to show e.g. `1`
  - `resource_last_sent_at`: string(date-time) - Resource last sent at e.g. `2023-03-03T21:25:24Z`
  - `resource_next_scheduled_at`: string(date-time) - Resource next scheduled at e.g. `2023-03-03T21:25:24Z`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule Type

Resource id: `schedule-type`. Raw spec: `../openapi-raw/schedule-type.json`. Web: https://developers.procore.com/reference/rest/schedule-type?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/schedule_type  **[DEPRECATED]**

**Show the schedule integration type for a project**
Return information about the schedule integration configuration for the current project.
#### Schedule Types
| Type                                                 | Key                           |
|------------------------------------------------------|-------------------------------|
| File-based schedule integration via web browser      | "Microsoft Project"           |
| File-based schedule integration via Procore Drive    | "Microsoft Project 2010"      |
| File-based schedule integration via Procore Documents| "Microsoft Project Documents" |
| Primavera P6 database integration via Procore Drive  | "Primavera P6"                |
Note that the schedule types listed as "Microsoft Project", "Microsoft Project 2010", and "Microsoft Project Documents" are functionally identical.
In all cases Procore can consume any supported schedule file type and extract data from it, not just Microsoft Project.
Schedule files can be upoaded either via Procore Drive, via the Procore Documents tool, or via the Procore Schedule tool,
regardless of which of these three types is selected. Where Primavera P6 database integration via Procore Drive is in use, the `p6_id`
attribute returned by this API indicates which P6 project Procore Drive is extracting data from.
This endpoint has been deprecated. Instead, use [/rest/v1/project/{project_id}/schedule)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `key`: string enum[Microsoft Project, Microsoft Project 2010, Microsoft Project Documents, Primavera P6] - Schedule type key e.g. `Microsoft Project`
- `p6_id`: string - Schedule type Primavera P6 Identifier e.g. `NRG00940`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/schedule_type  **[DEPRECATED]**

**Update schedule integration type**
Update the schedule integration type for a project.
#### Schedule Types
| Type                                                 | Key                           |
|------------------------------------------------------|-------------------------------|
| File-based schedule integration via web browser      | "Microsoft Project"           |
| File-based schedule integration via Procore Drive    | "Microsoft Project 2010"      |
| File-based schedule integration via Procore Documents| "Microsoft Project Documents" |
| Primavera P6 database integration via Procore Drive  | "Primavera P6"                |
Note that the schedule types listed as "Microsoft Project", "Microsoft Project 2010", and "Microsoft Project Documents" are functionally identical.
In all cases Procore can consume any supported schedule file type and extract data from it, not just Microsoft Project.
Schedule files can be upoaded either via Procore Drive, via the Procore Documents tool, or via the Procore Schedule tool,
regardless of which of these three types is selected. Where Primavera P6 database integration via Procore Drive is in use, the `p6_id`
attribute returned by this API indicates which P6 project Procore Drive is extracting data from.
This endpoint has been deprecated. Instead, use [/rest/v1/project/{project_id}/schedule)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Schedule Type belongs to
- `schedule_type`: object (required) - Schedule Type object
  - `key`: string enum[Microsoft Project, Microsoft Project 2010, Microsoft Project Documents, Primavera P6] (required) - The Key of the Schedule Type
  - `p6_id`: string - The Primavera P6 Identifier of the Schedule Type

Response 200 (application/json): object

- `key`: string enum[Microsoft Project, Microsoft Project 2010, Microsoft Project Documents, Primavera P6] - Schedule type key e.g. `Microsoft Project`
- `p6_id`: string - Schedule type Primavera P6 Identifier e.g. `NRG00940`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Task Requested Changes

Resource id: `task-requested-changes`. Raw spec: `../openapi-raw/task-requested-changes.json`. Web: https://developers.procore.com/reference/rest/task-requested-changes?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/schedule/requested_changes

**List requested changes for a Schedule or a Task**
Returns the requested change list.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `task_id` [query] integer - Task ID
- `view` [query] string - The `with_task` view includes an additional task data for correspondent requested changes
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Requested change id e.g. `333713`
- `change_requested`: string - Requested change e.g. `<ul><li>Other change: why7</li></ul>`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `new_finish`: string(date) - Requested change finish date e.g. `2022-03-04T00:00:00Z`
- `new_start`: string(date) - Requested change start date e.g. `2022-01-31T00:00:00Z`
- `new_percentage`: integer - Requested change percentage e.g. `50`
- `old_finish`: string(date) - Current finish date e.g. `2022-03-04T00:00:00Z`
- `old_start`: string(date) - Current start date e.g. `2022-01-31T00:00:00Z`
- `old_percentage`: integer - Current percentage e.g. `50`
- `other_change`: string - Other change e.g. `Add as milestone`
- `reason`: string - Requested change reason e.g. `<p>this is a description</p>`
- `status`: string - Localized requested change status e.g. `Pending`
- `status_not_localized`: string enum[approved, rejected, pending] - Requested change status not localized e.g. `pending`
- `notes`: string - Requested change notes e.g. `Notes`
- `created_at`: string(date) - Requested change created date e.g. `2022-03-04T00:00:00Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/schedule/tasks/{task_id}/requested_changes

**Create Requested Change**
Create a new requested change on a Task.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `task_id` [path] integer (required) - Task ID

Request body (application/json) (required):

- `requested_change`: object
  - `change_reason`: string - Requested change reason e.g. `Change schedule request`
  - `other_change`: string e.g. `Other change`
  - `task`: object
    - `start`: string - Requested change start date e.g. `2022-01-31`
    - `finish`: string - Requested change finish date e.g. `2022-02-15`
    - `percentage`: integer - Requested change percentage e.g. `50`
  - `notes`: string - Requested change notes e.g. `Delayed due to weather`

Response 201 (application/json): object

- `id`: integer - Requested change id e.g. `333713`
- `change_requested`: string - Requested change e.g. `<ul><li>Other change: why7</li></ul>`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `new_finish`: string(date) - Requested change finish date e.g. `2022-03-04T00:00:00Z`
- `new_start`: string(date) - Requested change start date e.g. `2022-01-31T00:00:00Z`
- `new_percentage`: integer - Requested change percentage e.g. `50`
- `old_finish`: string(date) - Current finish date e.g. `2022-03-04T00:00:00Z`
- `old_start`: string(date) - Current start date e.g. `2022-01-31T00:00:00Z`
- `old_percentage`: integer - Current percentage e.g. `50`
- `other_change`: string - Other change e.g. `Add as milestone`
- `reason`: string - Requested change reason e.g. `<p>this is a description</p>`
- `status`: string - Localized requested change status e.g. `Pending`
- `status_not_localized`: string enum[approved, rejected, pending] - Requested change status not localized e.g. `pending`
- `notes`: string - Requested change notes e.g. `Notes`
- `created_at`: string(date) - Requested change created date e.g. `2022-03-04T00:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/schedule/requested_changes/review

**Review Requested Changes**
Review Requested Changes for Tasks.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `requested_changes`: array of object
  - `id`: integer - Requested Change ID e.g. `1`
  - `approved`: boolean - Review result
  - `disposition_reason`: string - reason of review e.g. `Looks reasonable`

Response 200 (application/json): array of object

- `id`: integer - Requested change id e.g. `333713`
- `requested_by`: string - Requested change requested by e.g. `Bob Dole on Nov. 24`
- `change_requested`: string - Requested change e.g. `<ul><li>Other change: why7</li></ul>`
- `reason`: string - Requested change reason e.g. `<p>this is a description</p>`
- `status`: string enum[Approved, Rejected, Pending] - Requested change status localized e.g. `Pending`
- `status_not_localized`: string enum[approved, rejected, pending] - Requested change status not localized e.g. `pending`
- `notes`: string - Requested change notes e.g. `Notes`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Tasks

Resource id: `tasks`. Raw spec: `../openapi-raw/tasks.json`. Web: https://developers.procore.com/reference/rest/tasks?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/tasks

**List tasks**
List existing tasks for the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal] - The compact view contains id, name, key, formatted_name, and task_name. The normal view contains the response shown below. The default view is normal.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[row_number]` [query] integer - Returns Tasks with a row_number matching the given value. This endpoint supports single values of row_number, a range of row_numbers (filters[row_number]=4...7) as well as multiple values (filters[row_number][]=5&filt...
- `filters[query]` [query] string - Return item(s) containing search query

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this task. e.g. `1359235`
- `name`: string - Task name as the user sees it in Procore. Depending on the project settings this may include the full outline path e.g. `INTERIOR`
- `task_name`: string - Task name. This will always contain just the task name, and will not include the full outline path. e.g. `INTERIOR`
- `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `start_datetime`: string(date-time) - Task start timestamp in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `finish_datetime`: string(date-time) - Task finish timestamp in ISO 8601 UTC format. e.g. `2015-03-08T22:00:00Z`
- `percentage`: integer - Percent complete value for this task. e.g. `80`
- `color`: string - The RGB color value, expressed in hex digits for the color used when displaying the task in Procore. The color varies depending on whether the task is on the critical path, complete, unstarted or in progress. e.g. `#6070A0`
- `parent_id`: integer - ID of the parent task. e.g. `802241`
- `pending`: boolean - True if one or more change requests are pending for this task. e.g. `false`
- `activity_id`: string - The external unique identifier for this task. Note that due to an oversight in the original API, the value returned for this attribute will be the `source_uid` value supplied when creating a task. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `schedule_activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
- `resource_name`: string - Names of any resources assigned to this task. e.g. `Resource 1, Resource 2, Resource 3`
- `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
- `milestone`: boolean - True if this task is a milestone. e.g. `false`
- `actual_start`: string(date-time) - Actual start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `actual_finish`: string(date-time) - Actual finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
- `has_children`: boolean - True if this is a summary task, i.e. this task has child tasks. e.g. `false`
- `full_outline_path`: string - Task full outline path e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
- `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
- `resource_ids`: array of integer - The resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
- `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
- `baseline_start`: string(date-time) - The baseline start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `baseline_finish`: string(date-time) - The baseline finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `start_variance`: number(float) - The start variance in days for this task. e.g. `1.5`
- `finish_variance`: number(float) - The finish variance in days for this task. e.g. `-2.5`
- `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`
- `created_at`: string(date-time) - Date/time the Task was created in ISO 8601 UTC format. e.g. `2015-03-05T11:00:00Z`
- `updated_at`: string(date-time) - Date/time the Task was last updated in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `updated_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/tasks

**Create task**
Create a new Task associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - ID of the project this task belongs to. e.g. `101429`
- `task`: object (required) - Task object.
  - `name`: string - Task name. e.g. `INTERIOR`
  - `start`: string(date-time) - Task start timestamp. e.g. `2015-03-06T13:00:00Z`
  - `finish`: string(date-time) - Task finish timestamp. e.g. `2015-03-08T22:00:00Z`
  - `actual_start`: string(date-time) - Actual start timestamp for this task. e.g. `2015-03-08T00:00:00Z`
  - `actual_finish`: string(date-time) - Actual finish timestamp for this task. e.g. `2015-03-09T00:00:00Z`
  - `percentage`: integer - Percent complete value for this task. e.g. `80`
  - `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
  - `milestone`: boolean - True if this task is a milestone. e.g. `false`
  - `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
  - `has_children`: boolean - Flag set to true if this is a summary task, i.e. this task has child tasks. e.g. `false`
  - `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `parent_id`: integer - ID of the parent task. e.g. `802241`
  - `full_outline_path`: string - Task full outline path. e.g. `INTERIOR`
  - `activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
  - `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
  - `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
  - `resource_ids`: array of integer - Resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
  - `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
  - `baseline_start`: string(date-time) - The baseline start timestamp for this task. e.g. `2015-03-08T00:00:00Z`
  - `baseline_finish`: string(date-time) - The baseline finish timestamp for this task. e.g. `2015-03-09T00:00:00Z`
  - `start_variance`: number(float) - The start variance in days for this task, as calculated by the external system which owns the schedule data. e.g. `1.5`
  - `finish_variance`: number(float) - The finish variance in days for this task, as calculated by the external system which owns the schedule data. e.g. `-2.5`
  - `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this task. e.g. `1359235`
- `name`: string - Task name as the user sees it in Procore. Depending on the project settings this may include the full outline path e.g. `INTERIOR`
- `task_name`: string - Task name. This will always contain just the task name, and will not include the full outline path. e.g. `INTERIOR`
- `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `start_datetime`: string(date-time) - Task start timestamp in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `finish_datetime`: string(date-time) - Task finish timestamp in ISO 8601 UTC format. e.g. `2015-03-08T22:00:00Z`
- `percentage`: integer - Percent complete value for this task. e.g. `80`
- `color`: string - The RGB color value, expressed in hex digits for the color used when displaying the task in Procore. The color varies depending on whether the task is on the critical path, complete, unstarted or in progress. e.g. `#6070A0`
- `parent_id`: integer - ID of the parent task. e.g. `802241`
- `pending`: boolean - True if one or more change requests are pending for this task. e.g. `false`
- `activity_id`: string - The external unique identifier for this task. Note that due to an oversight in the original API, the value returned for this attribute will be the `source_uid` value supplied when creating a task. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `schedule_activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
- `resource_name`: string - Names of any resources assigned to this task. e.g. `Resource 1, Resource 2, Resource 3`
- `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
- `milestone`: boolean - True if this task is a milestone. e.g. `false`
- `actual_start`: string(date-time) - Actual start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `actual_finish`: string(date-time) - Actual finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
- `has_children`: boolean - True if this is a summary task, i.e. this task has child tasks. e.g. `false`
- `full_outline_path`: string - Task full outline path e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
- `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
- `resource_ids`: array of integer - The resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
- `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
- `baseline_start`: string(date-time) - The baseline start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `baseline_finish`: string(date-time) - The baseline finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `start_variance`: number(float) - The start variance in days for this task. e.g. `1.5`
- `finish_variance`: number(float) - The finish variance in days for this task. e.g. `-2.5`
- `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`
- `created_at`: string(date-time) - Date/time the Task was created in ISO 8601 UTC format. e.g. `2015-03-05T11:00:00Z`
- `updated_at`: string(date-time) - Date/time the Task was last updated in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `updated_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/tasks/sync

**Sync tasks**
This endpoint creates or updates a batch of tasks.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Tasks belongs to e.g. `101429`
- `updates`: array of object (required)
  - `name`: string - Task name. e.g. `INTERIOR`
  - `start`: string(date-time) - Task start timestamp. e.g. `2015-03-06T13:00:00Z`
  - `finish`: string(date-time) - Task finish timestamp. e.g. `2015-03-08T22:00:00Z`
  - `actual_start`: string(date-time) - Actual start timestamp for this task. e.g. `2015-03-08T00:00:00Z`
  - `actual_finish`: string(date-time) - Actual finish timestamp for this task. e.g. `2015-03-09T00:00:00Z`
  - `percentage`: integer - Percent complete value for this task. e.g. `80`
  - `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
  - `milestone`: boolean - True if this task is a milestone. e.g. `false`
  - `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
  - `has_children`: boolean - Flag set to true if this is a summary task, i.e. this task has child tasks. e.g. `false`
  - `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `parent_id`: integer - ID of the parent task. e.g. `802241`
  - `full_outline_path`: string - Task full outline path. e.g. `INTERIOR`
  - `activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
  - `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
  - `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
  - `resource_ids`: array of integer - Resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
  - `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
  - `baseline_start`: string(date-time) - The baseline start timestamp for this task. e.g. `2015-03-08T00:00:00Z`
  - `baseline_finish`: string(date-time) - The baseline finish timestamp for this task. e.g. `2015-03-09T00:00:00Z`
  - `start_variance`: number(float) - The start variance in days for this task, as calculated by the external system which owns the schedule data. e.g. `1.5`
  - `finish_variance`: number(float) - The finish variance in days for this task, as calculated by the external system which owns the schedule data. e.g. `-2.5`
  - `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Unique identifier for this task. e.g. `1359235`
  - `name`: string - Task name as the user sees it in Procore. Depending on the project settings this may include the full outline path e.g. `INTERIOR`
  - `task_name`: string - Task name. This will always contain just the task name, and will not include the full outline path. e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
  - `start_datetime`: string(date-time) - Task start timestamp in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
  - `finish_datetime`: string(date-time) - Task finish timestamp in ISO 8601 UTC format. e.g. `2015-03-08T22:00:00Z`
  - `percentage`: integer - Percent complete value for this task. e.g. `80`
  - `color`: string - The RGB color value, expressed in hex digits for the color used when displaying the task in Procore. The color varies depending on whether the task is on the critical path, complete, unstarted or in progress. e.g. `#6070A0`
  - `parent_id`: integer - ID of the parent task. e.g. `802241`
  - `pending`: boolean - True if one or more change requests are pending for this task. e.g. `false`
  - `activity_id`: string - The external unique identifier for this task. Note that due to an oversight in the original API, the value returned for this attribute will be the `source_uid` value supplied when creating a task. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `schedule_activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
  - `resource_name`: string - Names of any resources assigned to this task. e.g. `Resource 1, Resource 2, Resource 3`
  - `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
  - `milestone`: boolean - True if this task is a milestone. e.g. `false`
  - `actual_start`: string(date-time) - Actual start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
  - `actual_finish`: string(date-time) - Actual finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
  - `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
  - `has_children`: boolean - True if this is a summary task, i.e. this task has child tasks. e.g. `false`
  - `full_outline_path`: string - Task full outline path e.g. `INTERIOR`
  - `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
  - `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
  - `resource_ids`: array of integer - The resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
  - `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
  - `baseline_start`: string(date-time) - The baseline start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
  - `baseline_finish`: string(date-time) - The baseline finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
  - `start_variance`: number(float) - The start variance in days for this task. e.g. `1.5`
  - `finish_variance`: number(float) - The finish variance in days for this task. e.g. `-2.5`
  - `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`
  - `created_at`: string(date-time) - Date/time the Task was created in ISO 8601 UTC format. e.g. `2015-03-05T11:00:00Z`
  - `updated_at`: string(date-time) - Date/time the Task was last updated in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `updated_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `errors`: array of object
  - `id`: integer - Unique identifier for this task. e.g. `1359235`
  - `name`: string - Task name as the user sees it in Procore. Depending on the project settings this may include the full outline path e.g. `INTERIOR`
  - `task_name`: string - Task name. This will always contain just the task name, and will not include the full outline path. e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
  - `start_datetime`: string(date-time) - Task start timestamp in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
  - `finish_datetime`: string(date-time) - Task finish timestamp in ISO 8601 UTC format. e.g. `2015-03-08T22:00:00Z`
  - `percentage`: integer - Percent complete value for this task. e.g. `80`
  - `color`: string - The RGB color value, expressed in hex digits for the color used when displaying the task in Procore. The color varies depending on whether the task is on the critical path, complete, unstarted or in progress. e.g. `#6070A0`
  - `parent_id`: integer - ID of the parent task. e.g. `802241`
  - `pending`: boolean - True if one or more change requests are pending for this task. e.g. `false`
  - `activity_id`: string - The external unique identifier for this task. Note that due to an oversight in the original API, the value returned for this attribute will be the `source_uid` value supplied when creating a task. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `schedule_activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
  - `resource_name`: string - Names of any resources assigned to this task. e.g. `Resource 1, Resource 2, Resource 3`
  - `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
  - `milestone`: boolean - True if this task is a milestone. e.g. `false`
  - `actual_start`: string(date-time) - Actual start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
  - `actual_finish`: string(date-time) - Actual finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
  - `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
  - `has_children`: boolean - True if this is a summary task, i.e. this task has child tasks. e.g. `false`
  - `full_outline_path`: string - Task full outline path e.g. `INTERIOR`
  - `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
  - `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
  - `resource_ids`: array of integer - The resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
  - `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
  - `baseline_start`: string(date-time) - The baseline start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
  - `baseline_finish`: string(date-time) - The baseline finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
  - `start_variance`: number(float) - The start variance in days for this task. e.g. `1.5`
  - `finish_variance`: number(float) - The finish variance in days for this task. e.g. `-2.5`
  - `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`
  - `created_at`: string(date-time) - Date/time the Task was created in ISO 8601 UTC format. e.g. `2015-03-05T11:00:00Z`
  - `updated_at`: string(date-time) - Date/time the Task was last updated in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `updated_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/tasks/{id}

**Show task**
Show detail on the specified Task.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the task
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this task. e.g. `1359235`
- `name`: string - Task name as the user sees it in Procore. Depending on the project settings this may include the full outline path e.g. `INTERIOR`
- `task_name`: string - Task name. This will always contain just the task name, and will not include the full outline path. e.g. `INTERIOR`
- `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `start_datetime`: string(date-time) - Task start timestamp in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `finish_datetime`: string(date-time) - Task finish timestamp in ISO 8601 UTC format. e.g. `2015-03-08T22:00:00Z`
- `percentage`: integer - Percent complete value for this task. e.g. `80`
- `color`: string - The RGB color value, expressed in hex digits for the color used when displaying the task in Procore. The color varies depending on whether the task is on the critical path, complete, unstarted or in progress. e.g. `#6070A0`
- `parent_id`: integer - ID of the parent task. e.g. `802241`
- `pending`: boolean - True if one or more change requests are pending for this task. e.g. `false`
- `activity_id`: string - The external unique identifier for this task. Note that due to an oversight in the original API, the value returned for this attribute will be the `source_uid` value supplied when creating a task. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `schedule_activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
- `resource_name`: string - Names of any resources assigned to this task. e.g. `Resource 1, Resource 2, Resource 3`
- `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
- `milestone`: boolean - True if this task is a milestone. e.g. `false`
- `actual_start`: string(date-time) - Actual start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `actual_finish`: string(date-time) - Actual finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
- `has_children`: boolean - True if this is a summary task, i.e. this task has child tasks. e.g. `false`
- `full_outline_path`: string - Task full outline path e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
- `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
- `resource_ids`: array of integer - The resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
- `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
- `baseline_start`: string(date-time) - The baseline start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `baseline_finish`: string(date-time) - The baseline finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `start_variance`: number(float) - The start variance in days for this task. e.g. `1.5`
- `finish_variance`: number(float) - The finish variance in days for this task. e.g. `-2.5`
- `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`
- `created_at`: string(date-time) - Date/time the Task was created in ISO 8601 UTC format. e.g. `2015-03-05T11:00:00Z`
- `updated_at`: string(date-time) - Date/time the Task was last updated in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `updated_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/tasks/{id}

**Update task**
Update the specified Task.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the task

Request body (application/json) (required):

- `project_id`: integer (required) - ID of the project this task belongs to. e.g. `101429`
- `task`: object (required) - Task object.
  - `name`: string - Task name. e.g. `INTERIOR`
  - `start`: string(date-time) - Task start timestamp. e.g. `2015-03-06T13:00:00Z`
  - `finish`: string(date-time) - Task finish timestamp. e.g. `2015-03-08T22:00:00Z`
  - `actual_start`: string(date-time) - Actual start timestamp for this task. e.g. `2015-03-08T00:00:00Z`
  - `actual_finish`: string(date-time) - Actual finish timestamp for this task. e.g. `2015-03-09T00:00:00Z`
  - `percentage`: integer - Percent complete value for this task. e.g. `80`
  - `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
  - `milestone`: boolean - True if this task is a milestone. e.g. `false`
  - `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
  - `has_children`: boolean - Flag set to true if this is a summary task, i.e. this task has child tasks. e.g. `false`
  - `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
  - `parent_id`: integer - ID of the parent task. e.g. `802241`
  - `full_outline_path`: string - Task full outline path. e.g. `INTERIOR`
  - `activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
  - `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
  - `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
  - `resource_ids`: array of integer - Resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
  - `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
  - `baseline_start`: string(date-time) - The baseline start timestamp for this task. e.g. `2015-03-08T00:00:00Z`
  - `baseline_finish`: string(date-time) - The baseline finish timestamp for this task. e.g. `2015-03-09T00:00:00Z`
  - `start_variance`: number(float) - The start variance in days for this task, as calculated by the external system which owns the schedule data. e.g. `1.5`
  - `finish_variance`: number(float) - The finish variance in days for this task, as calculated by the external system which owns the schedule data. e.g. `-2.5`
  - `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this task. e.g. `1359235`
- `name`: string - Task name as the user sees it in Procore. Depending on the project settings this may include the full outline path e.g. `INTERIOR`
- `task_name`: string - Task name. This will always contain just the task name, and will not include the full outline path. e.g. `INTERIOR`
- `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `start_datetime`: string(date-time) - Task start timestamp in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `finish_datetime`: string(date-time) - Task finish timestamp in ISO 8601 UTC format. e.g. `2015-03-08T22:00:00Z`
- `percentage`: integer - Percent complete value for this task. e.g. `80`
- `color`: string - The RGB color value, expressed in hex digits for the color used when displaying the task in Procore. The color varies depending on whether the task is on the critical path, complete, unstarted or in progress. e.g. `#6070A0`
- `parent_id`: integer - ID of the parent task. e.g. `802241`
- `pending`: boolean - True if one or more change requests are pending for this task. e.g. `false`
- `activity_id`: string - The external unique identifier for this task. Note that due to an oversight in the original API, the value returned for this attribute will be the `source_uid` value supplied when creating a task. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `schedule_activity_id`: string - For tasks imported from external systems which have the concept of an "Activity ID" (for example Primavera P6), this attribute is used to hold the Activity ID value. Note that due to an oversight during the creation o... e.g. `EM12865`
- `resource_name`: string - Names of any resources assigned to this task. e.g. `Resource 1, Resource 2, Resource 3`
- `critical_path`: boolean - True if this task is on the critical path. e.g. `false`
- `milestone`: boolean - True if this task is a milestone. e.g. `false`
- `actual_start`: string(date-time) - Actual start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `actual_finish`: string(date-time) - Actual finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `row_number`: integer - The row number of a task defines the sequence in which tasks are normally expected to be displayed. e.g. `2`
- `has_children`: boolean - True if this is a summary task, i.e. this task has child tasks. e.g. `false`
- `full_outline_path`: string - Task full outline path e.g. `INTERIOR`
- `source_uid`: string - The unique identifier for this task from the external system which owns the schedule data. e.g. `0687b2f6-dc92-40c7-a8c8-a3c1f3ac9305`
- `wbs`: string - Work Breakdown Structure (WBS) number for this task. e.g. `1.1`
- `schedule_duration`: number(float) - The duration of this task in days as defined by the external system which owns the schedule data. e.g. `3`
- `resource_ids`: array of integer - The resources assigned to this task, represented as an array of resource ID values. e.g. `[1, 2, 3]`
- `notes`: string - Arbitrary notes about this task. e.g. `Some notes`
- `baseline_start`: string(date-time) - The baseline start timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-08T00:00:00Z`
- `baseline_finish`: string(date-time) - The baseline finish timestamp for this task in ISO 8601 UTC format. e.g. `2015-03-09T00:00:00Z`
- `start_variance`: number(float) - The start variance in days for this task. e.g. `1.5`
- `finish_variance`: number(float) - The finish variance in days for this task. e.g. `-2.5`
- `manually_edited`: boolean - Set to true if the task has been created or modified in Procore, false if the task was imported from an external schedule and has not been modified in Procore. e.g. `false`
- `created_at`: string(date-time) - Date/time the Task was created in ISO 8601 UTC format. e.g. `2015-03-05T11:00:00Z`
- `updated_at`: string(date-time) - Date/time the Task was last updated in ISO 8601 UTC format. e.g. `2015-03-06T13:00:00Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `updated_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/tasks/{id}

**Delete task**
Delete the specified Task.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the task
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## ToDos

Resource id: `todos`. Raw spec: `../openapi-raw/todos.json`. Web: https://developers.procore.com/reference/rest/todos?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### POST /rest/v1.0/todos  **[DEPRECATED]**

**Create todo**
Create a ToDo Item for a specified Project.
This endpoint has been deprecated. Instead, use [/rest/v1/calendar-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the ToDo belongs to
- `todo`: object (required) - ToDo object
  - `assignment_id`: integer - The ID of the Assignment of the ToDo
  - `color`: string - The Color of the ToDo
  - `finish_datetime`: string(date-time) (required) - The Finish date-time of the ToDo
  - `name`: string (required) - The Name of the ToDo
  - `description`: string - The Description of the ToDo
  - `percentage`: integer - The Percentage of the ToDo
  - `private`: boolean - The Private status of the ToDo
  - `start_datetime`: string(date-time) (required) - The Start date-time of the ToDo

Response 201 (application/json): object

- `id`: integer - ToDo id e.g. `12`
- `assignment`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - ToDo color e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - ToDo description e.g. `Use some power tools to fix the drywall.`
- `finish_datetime`: string(date-time) - ToDo finish date-time e.g. `2015-02-07T00:00:00Z`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - ToDo milestone status e.g. `true`
- `name`: string - ToDo name e.g. `Fix drywall`
- `percentage`: integer - ToDo percentage e.g. `99`
- `private`: boolean - ToDo private status e.g. `false`
- `start_datetime`: string(date-time) - ToDo start date-time e.g. `2015-02-06T00:00:00Z`
- `task_name`: string - ToDo name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Date/time the ToDo was last updated e.g. `2015-02-06T00:00:00Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/todos/sync  **[DEPRECATED]**

**Sync ToDos**
This endpoint creates or updates a batch of ToDos.
This endpoint has been deprecated. Instead, use [/rest/v1/calendar-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the ToDo item to update e.g. `1`
  - `assignment_id`: integer - The ID of the Assignment of the ToDo e.g. `1`
  - `color`: string - The Color of the ToDo e.g. `#314159`
  - `finish_datetime`: string(date-time) - The Finish date-time of the ToDo e.g. `2015-02-07T00:00:00Z`
  - `name`: string - The Name of the ToDo e.g. `Existing Todo`
  - `description`: string - The Description of the ToDo e.g. `Use some power tools to fix the drywall.`
  - `percentage`: integer - The Percentage of the ToDo e.g. `99`
  - `private`: boolean - The Private status of the ToDo e.g. `true`
  - `start_datetime`: string(date-time) - The Start date-time of the ToDo e.g. `2015-02-06T00:00:00Z`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ToDo id e.g. `12`
  - `assignment`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `color`: string - ToDo color e.g. `#A4505D`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `description`: string - ToDo description e.g. `Use some power tools to fix the drywall.`
  - `finish_datetime`: string(date-time) - ToDo finish date-time e.g. `2015-02-07T00:00:00Z`
  - `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
  - `milestone`: boolean - ToDo milestone status e.g. `true`
  - `name`: string - ToDo name e.g. `Fix drywall`
  - `percentage`: integer - ToDo percentage e.g. `99`
  - `private`: boolean - ToDo private status e.g. `false`
  - `start_datetime`: string(date-time) - ToDo start date-time e.g. `2015-02-06T00:00:00Z`
  - `task_name`: string - ToDo name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
  - `updated_at`: string(date-time) - Date/time the ToDo was last updated e.g. `2015-02-06T00:00:00Z`
- `errors`: array of object
  - `id`: integer - ToDo id e.g. `12`
  - `assignment`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `color`: string - ToDo color e.g. `#A4505D`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `description`: string - ToDo description e.g. `Use some power tools to fix the drywall.`
  - `finish_datetime`: string(date-time) - ToDo finish date-time e.g. `2015-02-07T00:00:00Z`
  - `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
  - `milestone`: boolean - ToDo milestone status e.g. `true`
  - `name`: string - ToDo name e.g. `Fix drywall`
  - `percentage`: integer - ToDo percentage e.g. `99`
  - `private`: boolean - ToDo private status e.g. `false`
  - `start_datetime`: string(date-time) - ToDo start date-time e.g. `2015-02-06T00:00:00Z`
  - `task_name`: string - ToDo name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
  - `updated_at`: string(date-time) - Date/time the ToDo was last updated e.g. `2015-02-06T00:00:00Z`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/todos/{id}  **[DEPRECATED]**

**Show todo**
Return detailed information about a ToDo Item in a specified Project.
This endpoint has been deprecated. Instead, use [/rest/v1/calendar-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the todo
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ToDo id e.g. `12`
- `assignment`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - ToDo color e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - ToDo description e.g. `Use some power tools to fix the drywall.`
- `finish_datetime`: string(date-time) - ToDo finish date-time e.g. `2015-02-07T00:00:00Z`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - ToDo milestone status e.g. `true`
- `name`: string - ToDo name e.g. `Fix drywall`
- `percentage`: integer - ToDo percentage e.g. `99`
- `private`: boolean - ToDo private status e.g. `false`
- `start_datetime`: string(date-time) - ToDo start date-time e.g. `2015-02-06T00:00:00Z`
- `task_name`: string - ToDo name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Date/time the ToDo was last updated e.g. `2015-02-06T00:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/todos/{id}  **[DEPRECATED]**

**Update todo**
Update a ToDo item for a specified Project.
This endpoint has been deprecated. Instead, use [/rest/v1/calendar-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the todo

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the ToDo belongs to
- `todo`: object (required) - ToDo object
  - `assignment_id`: integer - The ID of the Assignment of the ToDo
  - `color`: string - The Color of the ToDo
  - `finish_datetime`: string(date-time) - The Finish date-time of the ToDo
  - `name`: string - The Name of the ToDo
  - `description`: string - The Description of the ToDo
  - `percentage`: integer - The Percentage of the ToDo
  - `private`: boolean - The Private status of the ToDo
  - `start_datetime`: string(date-time) - The Start date-time of the ToDo

Response 200 (application/json): object

- `id`: integer - ToDo id e.g. `12`
- `assignment`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `color`: string - ToDo color e.g. `#A4505D`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `description`: string - ToDo description e.g. `Use some power tools to fix the drywall.`
- `finish_datetime`: string(date-time) - ToDo finish date-time e.g. `2015-02-07T00:00:00Z`
- `full_outline_path`: string - ToDo full outline path (corresponds to matching field on Tasks) e.g. `Fix drywall`
- `milestone`: boolean - ToDo milestone status e.g. `true`
- `name`: string - ToDo name e.g. `Fix drywall`
- `percentage`: integer - ToDo percentage e.g. `99`
- `private`: boolean - ToDo private status e.g. `false`
- `start_datetime`: string(date-time) - ToDo start date-time e.g. `2015-02-06T00:00:00Z`
- `task_name`: string - ToDo name (corresponds to matching field on Tasks) e.g. `Fix Drywall`
- `updated_at`: string(date-time) - Date/time the ToDo was last updated e.g. `2015-02-06T00:00:00Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/todos/{id}  **[DEPRECATED]**

**Delete todo**
Delete a specific ToDo Item in a specified Project.
This endpoint has been deprecated. Instead, use [/rest/v1/calendar-items)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the todo
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

