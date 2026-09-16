# Procore API: Scheduling (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Scheduling)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Activities](#activities) - versions 2.0
- [Activity Links](#activity-links) - versions 2.0
- [Calendars](#calendars) - versions 2.1, 2.0
- [Import Logs](#import-logs) - versions 2.0
- [Import Status](#import-status) - versions 2.0
- [Schedule Import](#schedule-import) - versions 2.0
- [Schedules](#schedules) - versions 2.0
- [Timeline Events](#timeline-events) - versions 2.0

## Activities

Resource id: `activities`. Raw spec: `../openapi-raw/activities.json`. Web: https://developers.procore.com/reference/rest/activities?version=latest
Product lines: schedule-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/activities

**List Activities**
List all activities in a schedule. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `filters[activity_id]` [query] string - Filter activities by activity_id
- `filters[activity_name]` [query] string - Filter activities by name
- `filters[is_critical]` [query] boolean - Filter activities by critical path status in read only project schedule
- `filters[updated_at][gt]` [query] string - Filter for activities updated after this timestamp (ISO 8601)
- `filters[start_date][gte]` [query] string(date) - Filter activities with start date on or after this date (inclusive, ISO 8601 date YYYY-MM-DD in project-local time)
- `filters[start_date][lte]` [query] string(date) - Filter activities with start date on or before this date (inclusive, ISO 8601 date YYYY-MM-DD in project-local time)
- `filters[finish_date][gte]` [query] string(date) - Filter activities with finish date on or after this date (inclusive, ISO 8601 date YYYY-MM-DD in project-local time)
- `filters[finish_date][lte]` [query] string(date) - Filter activities with finish date on or before this date (inclusive, ISO 8601 date YYYY-MM-DD in project-local time)
- `sort` [query] string enum[activity_id, activity_name, start_date, finish_date, percent_complete, parent_id, ordered_parent_index, deadline_date, created_at, last_modified_at, starts_at, finishes_at] - Sort by supported fields. Accepts comma separated values to sort by multiple fields. Order is ascending by default, prefix field with '-' for descending
- `page` [query] integer(int32) - The page number to retrieve
- `per_page` [query] integer - Number of records per page

Response 200 (application/json): object

- `data`: array of object
  - `activity_id`: string (required) - The unique identifier for the activity e.g. `245`
  - `activity_name`: string (required) - The descriptive name of the activity e.g. `Install Windows`
  - `start_date`: string - The activity's start date in UTC (ISO 8601 format) e.g. `2024-05-14T13:30:00Z`
  - `finish_date`: string - The activity's finish date in UTC (ISO 8601 format) e.g. `2024-05-25T17:00:00Z`
  - `duration`: number(float) - The duration of the activity e.g. `5`
  - `duration_unit`: string - The unit in which duration is stored (e.g., hours, day) e.g. `day`
  - `duration_display_unit`: string - The unit in which duration is displayed in the UI e.g. `days`
  - `percent_complete`: number(float) - The activity's completion percentage e.g. `75.5`
  - `parent_id`: string - The ID for the activity's parent activity e.g. `418600`
  - `ordered_parent_index`: integer(int32) (required) - The order of the activity amongst its siblings e.g. `3`
  - `constraint_type`: string - The scheduling constraint type e.g. `SNET`
  - `constraint_date`: string - The constraint date in UTC (ISO 8601 format) e.g. `2024-05-10T08:00:00Z`
  - `assigned_company`: string - The name of the assigned Company e.g. `ABC Contractors`
  - `crew_size`: integer(int32) - The assigned crew size quantity e.g. `5`
  - `calendar_id`: string - The ID of the assigned calendar e.g. `101`
  - `deadline_date`: string - The activity's assigned deadline date without timezone (ISO 8601 format) e.g. `2024-06-01`
  - `deadline_variance`: integer(int32) - The difference between the deadline and finish dates in days e.g. `-3`
  - `category_data`: array of object - The imported activity code details associated with the activity
    - `name`: string (required) - The name of the category field with the scope appended as a suffix e.g. `Phase_GLOBAL`
    - `value`: string (required) - The value of the category field e.g. `Foundation`
  - `resource_data`: array of object - The imported resources assignment details associated with the activity
    - `resource_id`: string (required) - The unique identifier for the resource e.g. `101`
    - `resource_name`: string (required) - The name of the resource e.g. `Crew 1`
  - `is_critical`: boolean - Describes whether the activity is on the critical path e.g. `true`
  - `is_actual_start`: boolean - Indicates whether the start date is an actualized value. For newly imported activities, this is initialized as true if an Actual Start exists in the source file or if the Percent Complete is greater than 0%. Once in P... e.g. `true`
  - `is_actual_finish`: boolean - Indicates whether the finish date is an actualized value. This flag is determined strictly by progress and is true only when the Percent Complete is 100%. This applies both at the time of import and during ongoing man... e.g. `false`
  - `total_float`: number(double) - The activity's total slack / float e.g. `2.5`
  - `notes`: string - Any notes associated with the activity e.g. `Foundation work must be completed first`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `created_at`: string (required) - The date and time the task was created (ISO 8601 format) e.g. `2024-05-14T13:30:00Z`
  - `created_by`: string (required) - The ID of the user who created the task e.g. `1001`
  - `updated_at`: string - The date and time the task was updated (ISO 8601 format) e.g. `2024-05-15T10:30:00Z`
  - `updated_by`: string - The ID of the user who updated the task e.g. `1002`
  - `unique_source_id`: string - The unique identifier of the task in the source file e.g. `A1008`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/activities/{activity_id}

**Get Activity by ID**
Get a single activity by id. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `activity_id` [path] string (required) - unique identifier of the activity

Response 200 (application/json): object

- `data`: object
  - `activity_id`: string (required) - The unique identifier for the activity e.g. `245`
  - `activity_name`: string (required) - The descriptive name of the activity e.g. `Install Windows`
  - `start_date`: string - The activity's start date in UTC (ISO 8601 format) e.g. `2024-05-14T13:30:00Z`
  - `finish_date`: string - The activity's finish date in UTC (ISO 8601 format) e.g. `2024-05-25T17:00:00Z`
  - `duration`: number(float) - The duration of the activity e.g. `5`
  - `duration_unit`: string - The unit in which duration is stored (e.g., hours, day) e.g. `day`
  - `duration_display_unit`: string - The unit in which duration is displayed in the UI e.g. `days`
  - `percent_complete`: number(float) - The activity's completion percentage e.g. `75.5`
  - `parent_id`: string - The ID for the activity's parent activity e.g. `418600`
  - `ordered_parent_index`: integer(int32) (required) - The order of the activity amongst its siblings e.g. `3`
  - `constraint_type`: string - The scheduling constraint type e.g. `SNET`
  - `constraint_date`: string - The constraint date in UTC (ISO 8601 format) e.g. `2024-05-10T08:00:00Z`
  - `assigned_company`: string - The name of the assigned Company e.g. `ABC Contractors`
  - `crew_size`: integer(int32) - The assigned crew size quantity e.g. `5`
  - `calendar_id`: string - The ID of the assigned calendar e.g. `101`
  - `deadline_date`: string - The activity's assigned deadline date without timezone (ISO 8601 format) e.g. `2024-06-01`
  - `deadline_variance`: integer(int32) - The difference between the deadline and finish dates in days e.g. `-3`
  - `category_data`: array of object - The imported activity code details associated with the activity
    - `name`: string (required) - The name of the category field with the scope appended as a suffix e.g. `Phase_GLOBAL`
    - `value`: string (required) - The value of the category field e.g. `Foundation`
  - `resource_data`: array of object - The imported resources assignment details associated with the activity
    - `resource_id`: string (required) - The unique identifier for the resource e.g. `101`
    - `resource_name`: string (required) - The name of the resource e.g. `Crew 1`
  - `is_critical`: boolean - Describes whether the activity is on the critical path e.g. `true`
  - `is_actual_start`: boolean - Indicates whether the start date is an actualized value. For newly imported activities, this is initialized as true if an Actual Start exists in the source file or if the Percent Complete is greater than 0%. Once in P... e.g. `true`
  - `is_actual_finish`: boolean - Indicates whether the finish date is an actualized value. This flag is determined strictly by progress and is true only when the Percent Complete is 100%. This applies both at the time of import and during ongoing man... e.g. `false`
  - `total_float`: number(double) - The activity's total slack / float e.g. `2.5`
  - `notes`: string - Any notes associated with the activity e.g. `Foundation work must be completed first`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `created_at`: string (required) - The date and time the task was created (ISO 8601 format) e.g. `2024-05-14T13:30:00Z`
  - `created_by`: string (required) - The ID of the user who created the task e.g. `1001`
  - `updated_at`: string - The date and time the task was updated (ISO 8601 format) e.g. `2024-05-15T10:30:00Z`
  - `updated_by`: string - The ID of the user who updated the task e.g. `1002`
  - `unique_source_id`: string - The unique identifier of the task in the source file e.g. `A1008`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Activity Links

Resource id: `activity-links`. Raw spec: `../openapi-raw/activity-links.json`. Web: https://developers.procore.com/reference/rest/activity-links?version=latest
Product lines: schedule-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/activity_links

**List Activity Links**
List all activity links in a schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `filters[id]` [query] string - Filter activity links by ID
- `filters[from_activity]` [query] string - Filter activity links by predecessor activity IDs (bracket list syntax like [1,2])
- `filters[to_activity]` [query] string - Filter activity links by successor activity IDs (bracket list syntax like [1,2])
- `filters[updated_at][gt]` [query] string - Filter for activity links updated after this timestamp (ISO 8601)
- `sort` [query] string enum[id, from_activity, to_activity, updated_at] - Sort by supported fields. Accepts comma separated values to sort by multiple fields. Order is ascending by default, prefix field with '-' for descending
- `page` [query] integer(int32) - The page number to retrieve
- `per_page` [query] integer - Number of records per page

Response 200 (application/json): object

- `data`: array of object
  - `id`: string (required) - The unique identifier for the activity link e.g. `98765`
  - `from_activity`: string (required) - The ID of the predecessor activity e.g. `418600`
  - `to_activity`: string (required) - The ID of the successor activity e.g. `418700`
  - `relationship_type`: string (required) - The type of dependency relationship (SS, SF, FS, FF) e.g. `FS`
  - `lag`: number(float) - The time delay between the activities e.g. `2.5`
  - `lag_unit`: string - The unit of time for the lag e.g. `hour`
  - `lag_display_unit`: string - The unit in which lag is displayed in the UI e.g. `hours`
  - `active`: boolean - Indicates whether the dependency is active e.g. `true`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `created_at`: string (required) - The date and time the link was created (ISO 8601 format) e.g. `2024-05-14T13:30:00Z`
  - `created_by`: string (required) - The ID of the user who created the link e.g. `1001`
  - `updated_at`: string - The date and time the link was updated (ISO 8601 format) e.g. `2024-05-15T10:30:00Z`
  - `updated_by`: string - The ID of the user who updated the link e.g. `1002`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/activity_links/{activity_link_id}

**Get Activity Link by ID**
Get a single activity link by its id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `activity_link_id` [path] string (required) - Activity Link ID

Response 200 (application/json): object

- `data`: object
  - `id`: string (required) - The unique identifier for the activity link e.g. `98765`
  - `from_activity`: string (required) - The ID of the predecessor activity e.g. `418600`
  - `to_activity`: string (required) - The ID of the successor activity e.g. `418700`
  - `relationship_type`: string (required) - The type of dependency relationship (SS, SF, FS, FF) e.g. `FS`
  - `lag`: number(float) - The time delay between the activities e.g. `2.5`
  - `lag_unit`: string - The unit of time for the lag e.g. `hour`
  - `lag_display_unit`: string - The unit in which lag is displayed in the UI e.g. `hours`
  - `active`: boolean - Indicates whether the dependency is active e.g. `true`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `created_at`: string (required) - The date and time the link was created (ISO 8601 format) e.g. `2024-05-14T13:30:00Z`
  - `created_by`: string (required) - The ID of the user who created the link e.g. `1001`
  - `updated_at`: string - The date and time the link was updated (ISO 8601 format) e.g. `2024-05-15T10:30:00Z`
  - `updated_by`: string - The ID of the user who updated the link e.g. `1002`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Calendars

Resource id: `calendars`. Raw spec: `../openapi-raw/calendars.json`. Web: https://developers.procore.com/reference/rest/calendars?version=latest
Product lines: schedule-management

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/calendars

**List Calendars (V2.1)**
List all calendars in a project associated with the Scheduling/Programming tool. V2.1 returns only source intervals (parent_interval_id IS NULL) and exposes the availability JSON on Exception intervals. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `filters[calendar_id]` [query] string - Filter calendars by calendar_id
- `filters[name]` [query] string - Filter calendars by name
- `filters[is_global]` [query] boolean - Filter calendars by global status
- `sort` [query] string enum[calendar_id, name, is_global] - Sort by supported fields. Accepts comma separated values to sort by multiple fields. Order is ascending by default, prefix field with '-' for descending
- `page` [query] integer(int32) - The page number to retrieve
- `per_page` [query] integer - Number of records per page

Response 200 (application/json): object

- `data`: array of object
  - `calendar_id`: string (required) - The unique identifier for the calendar e.g. `101`
  - `name`: string (required) - The name of the calendar e.g. `5`
  - `is_global`: boolean (required) - Indicates if the calendar is available to all projects in the company e.g. `false`
  - `hours_per_day`: integer(int32) (required) - The number of working hours in a day e.g. `8`
  - `days_per_week`: integer(int32) (required) - The number of working days in a week e.g. `5`
  - `days_per_month`: integer(int32) (required) - The number of working days in a month e.g. `20`
  - `project_id`: string - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `calendar_intervals`: array of object (required) - The intervals associated with this calendar
    - `interval_id`: string (required) - The unique identifier for the interval e.g. `1001`
    - `name`: string - The name of the interval e.g. `Exception 1`
    - `recurrent_start_date`: string - The start of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 17:00`
    - `recurrent_end_date`: string - The end of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 18:00`
    - `start_date`: string - The start date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T08:00:00Z`
    - `end_date`: string - The end date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T17:00:00Z`
    - `type`: string (required) - The type of interval e.g. `working`
    - `is_working`: boolean (required) - A flag to indicate whether this period is considered working time e.g. `true`
    - `availability`: object - JSON array of working slots within an Exception interval. Only present on Exception intervals. e.g. `[{"id": "slot-1", "startDate": "08:00", "endDate": "12:00"}]`
  - `is_archived`: boolean - Indicates if the calendar is archived e.g. `false`
  - `created_at`: string - The creation timestamp of the calendar in UTC (ISO 8601 format) e.g. `2024-05-14T08:00:00Z`
  - `updated_at`: string - The last update timestamp of the calendar in UTC (ISO 8601 format) e.g. `2024-05-15T09:30:00Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/calendars/{calendar_id}

**Get Calendar by ID (V2.1)**
Get a single calendar by id. V2.1 returns only source intervals (parent_interval_id IS NULL) and exposes the availability JSON on Exception intervals. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `calendar_id` [path] string (required) - Calendar ID

Response 200 (application/json): object

- `data`: object
  - `calendar_id`: string (required) - The unique identifier for the calendar e.g. `101`
  - `name`: string (required) - The name of the calendar e.g. `5`
  - `is_global`: boolean (required) - Indicates if the calendar is available to all projects in the company e.g. `false`
  - `hours_per_day`: integer(int32) (required) - The number of working hours in a day e.g. `8`
  - `days_per_week`: integer(int32) (required) - The number of working days in a week e.g. `5`
  - `days_per_month`: integer(int32) (required) - The number of working days in a month e.g. `20`
  - `project_id`: string - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `calendar_intervals`: array of object (required) - The intervals associated with this calendar
    - `interval_id`: string (required) - The unique identifier for the interval e.g. `1001`
    - `name`: string - The name of the interval e.g. `Exception 1`
    - `recurrent_start_date`: string - The start of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 17:00`
    - `recurrent_end_date`: string - The end of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 18:00`
    - `start_date`: string - The start date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T08:00:00Z`
    - `end_date`: string - The end date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T17:00:00Z`
    - `type`: string (required) - The type of interval e.g. `working`
    - `is_working`: boolean (required) - A flag to indicate whether this period is considered working time e.g. `true`
    - `availability`: object - JSON array of working slots within an Exception interval. Only present on Exception intervals. e.g. `[{"id": "slot-1", "startDate": "08:00", "endDate": "12:00"}]`
  - `is_archived`: boolean - Indicates if the calendar is archived e.g. `false`
  - `created_at`: string - The creation timestamp of the calendar in UTC (ISO 8601 format) e.g. `2024-05-14T08:00:00Z`
  - `updated_at`: string - The last update timestamp of the calendar in UTC (ISO 8601 format) e.g. `2024-05-15T09:30:00Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/calendars  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Calendars**
List all calendars in a project associated with the Scheduling/Programming tool. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `filters[calendar_id]` [query] string - Filter calendars by calendar_id
- `filters[name]` [query] string - Filter calendars by name
- `filters[is_global]` [query] boolean - Filter calendars by global status
- `sort` [query] string enum[calendar_id, name, is_global] - Sort by supported fields. Accepts comma separated values to sort by multiple fields. Order is ascending by default, prefix field with '-' for descending
- `page` [query] integer(int32) - The page number to retrieve
- `per_page` [query] integer - Number of records per page

Response 200 (application/json): object

- `data`: array of object
  - `calendar_id`: string (required) - The unique identifier for the calendar e.g. `101`
  - `name`: string (required) - The name of the calendar e.g. `5`
  - `is_global`: boolean (required) - Indicates if the calendar is available to all projects in the company e.g. `false`
  - `hours_per_day`: integer(int32) (required) - The number of working hours in a day e.g. `8`
  - `days_per_week`: integer(int32) (required) - The number of working days in a week e.g. `5`
  - `days_per_month`: integer(int32) (required) - The number of working days in a month e.g. `20`
  - `project_id`: string - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `calendar_intervals`: array of object (required) - The intervals associated with this calendar
    - `interval_id`: string (required) - The unique identifier for the interval e.g. `1001`
    - `name`: string - The name of the interval e.g. `Exception 1`
    - `recurrent_start_date`: string - The start of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 17:00`
    - `recurrent_end_date`: string - The end of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 18:00`
    - `start_date`: string - The start date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T08:00:00Z`
    - `end_date`: string - The end date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T17:00:00Z`
    - `type`: string (required) - The type of interval e.g. `working`
    - `is_working`: boolean (required) - A flag to indicate whether this period is considered working time e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/calendars/{calendar_id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Get Calendar by ID**
Get a single calendar by id. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `calendar_id` [path] string (required) - Calendar ID

Response 200 (application/json): object

- `data`: object
  - `calendar_id`: string (required) - The unique identifier for the calendar e.g. `101`
  - `name`: string (required) - The name of the calendar e.g. `5`
  - `is_global`: boolean (required) - Indicates if the calendar is available to all projects in the company e.g. `false`
  - `hours_per_day`: integer(int32) (required) - The number of working hours in a day e.g. `8`
  - `days_per_week`: integer(int32) (required) - The number of working days in a week e.g. `5`
  - `days_per_month`: integer(int32) (required) - The number of working days in a month e.g. `20`
  - `project_id`: string - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `calendar_intervals`: array of object (required) - The intervals associated with this calendar
    - `interval_id`: string (required) - The unique identifier for the interval e.g. `1001`
    - `name`: string - The name of the interval e.g. `Exception 1`
    - `recurrent_start_date`: string - The start of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 17:00`
    - `recurrent_end_date`: string - The end of a recurring interval. The day of week and time values are in project time zone e.g. `on Sun, Mon, Tue, Wed, Thu, Fri at 18:00`
    - `start_date`: string - The start date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T08:00:00Z`
    - `end_date`: string - The end date and time of the interval in UTC (ISO 8601 format) e.g. `2024-05-14T17:00:00Z`
    - `type`: string (required) - The type of interval e.g. `working`
    - `is_working`: boolean (required) - A flag to indicate whether this period is considered working time e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Import Logs

Resource id: `import-logs`. Raw spec: `../openapi-raw/import-logs.json`. Web: https://developers.procore.com/reference/rest/import-logs?version=latest
Product lines: schedule-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/imports/{job_id}/logs

**Get import logs**
Get structured validation/import logs for the latest completed or failed import.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `locale` [header] string - Optional. Locale for parsing the import report (e.g. en, fr-FR, ja-JP). Must match the locale used when the import was initiated. A mismatch will result in a parsing error.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `job_id` [path] string (required) - Import job id

Response 200 (application/json): object

- `data`: object
  - `summary`: object - Summary counts
    - `error_count`: integer(int32) - Number of error entries e.g. `5`
    - `warning_count`: integer(int32) - Number of warning entries e.g. `3`
  - `items`: array of object - Log entries
    - `level`: string - Log level (localized, e.g. ERROR, ERREUR, FEHLER) e.g. `ERROR`
    - `message`: string - Human-readable message e.g. `Non-nullable field 'task_name' is null`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Import Status

Resource id: `import-status`. Raw spec: `../openapi-raw/import-status.json`. Web: https://developers.procore.com/reference/rest/import-status?version=latest
Product lines: schedule-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/imports/{job_id}

**Get import status**
Get the status of an import job.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `job_id` [path] string (required) - Import job id

Response 200 (application/json): object

- `data`: object
  - `job_id`: string - Import job id e.g. `123`
  - `status`: string enum[queued, processing, completed, failed, none] - Current status e.g. `processing`
  - `status_url`: string - URL to poll for status e.g. `https://api.procore.com/rest/v2.0/...`
  - `finished_at`: string(date-time) - When the import job finished in UTC (ISO 8601) e.g. `2024-01-15T10:30:45Z`
  - `errors`: object - Present when status is failed (with optional detailed_log_url if logs exist), or when status is completed with warnings (warning message + detailed_log_url). Omitted on success with no logs.
    - `message`: string - Error or warning message
    - `detailed_log_url`: string - URL to fetch detailed log. Omitted when there are no logs (e.g. failed with no logs).

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedule Import

Resource id: `schedule-import`. Raw spec: `../openapi-raw/schedule-import.json`. Web: https://developers.procore.com/reference/rest/schedule-import?version=latest
Product lines: schedule-management

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/import

**Initiate schedule import**
Upload a schedule file to import.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `locale` [header] string - Optional. Locale for the import report (e.g. en, fr-FR, ja-JP). Determines the language of validation errors and warnings in the generated report. Must be the same locale used when fetching logs via the logs endpoint.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule

Request body (multipart/form-data):

- `file`: string(binary) (required) - Schedule file to import. Supported formats: .mpp, .ppx, .xer.

Response 202 (application/json): object

- `data`: object
  - `job_id`: string - Import job id e.g. `123`
  - `status`: string enum[queued, processing, completed, failed, none] - Current status e.g. `processing`
  - `status_url`: string - URL to poll for status e.g. `https://api.procore.com/rest/v2.0/...`
  - `finished_at`: string(date-time) - When the import job finished in UTC (ISO 8601) e.g. `2024-01-15T10:30:45Z`
  - `errors`: object - Present when status is failed (with optional detailed_log_url if logs exist), or when status is completed with warnings (warning message + detailed_log_url). Omitted on success with no logs.
    - `message`: string - Error or warning message
    - `detailed_log_url`: string - URL to fetch detailed log. Omitted when there are no logs (e.g. failed with no logs).

Error responses: 400, 401, 403, 404, 409, 413, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Schedules

Resource id: `schedules`. Raw spec: `../openapi-raw/schedules.json`. Web: https://developers.procore.com/reference/rest/schedules?version=latest
Product lines: schedule-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules

**List Schedules**
List all schedules in a project. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `filters[schedule_id]` [query] string - Filter schedules by schedule_id
- `filters[schedule_name]` [query] string - Filter schedules by name
- `filters[schedule_type]` [query] string enum[ONBOARDING, READONLY_PROJECT_SCHEDULE, LOOKAHEAD, READONLY_ONBOARDING, IMPORTED_READ_WRITE_ONBOARDING, IMPORTED_READ_WRITE_PROJECT_SCHEDULE, LOOKAHEAD_ONBOARDING] - Filter schedules by type. Values must exactly match a valid schedule type (case-sensitive)
- `filters[is_active]` [query] boolean - Filter schedules by active status
- `filters[updated_at][gt]` [query] string - Filter for schedules updated after this timestamp (ISO 8601 instant)
- `sort` [query] string enum[schedule_id, schedule_name, schedule_type, is_active, updated_at] - Sort by supported fields. Accepts comma separated values to sort by multiple fields. Order is ascending by default, prefix field with '-' for descending
- `page` [query] integer(int32) - The page number to retrieve
- `per_page` [query] integer - Number of records per page

Response 200 (application/json): object

- `data`: array of object
  - `schedule_id`: string (required) - The unique identifier for the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `schedule_name`: string (required) - The name of the schedule e.g. `Main Project Schedule`
  - `schedule_type`: string (required) - Indicates whether the schedule type is project schedule or lookahead e.g. `IMPORTED_READ_WRITE_PROJECT_SCHEDULE`
  - `is_active`: boolean (required) - Flag to indicate whether the schedule is active or archived e.g. `true`
  - `data_date`: string - Datetime string when the schedule's progress was last recorded in UTC ISO-8601 format e.g. `2024-05-14T00:00:00Z`
  - `start_date`: string - The schedule's start date as a datetime string in UTC ISO-8601 format e.g. `2024-05-01T00:00:00Z`
  - `calendar_id`: string - The schedule's default workday calendar e.g. `101`
  - `parent_schedule_id`: string - The schedule_id of the associated project schedule if this schedule is a lookahead e.g. `10`
  - `updated_at`: string - The date and time the schedule was last modified in UTC e.g. `2024-05-14T13:30:00Z`
  - `updated_by`: string - The user ID of the user who last modified the schedule e.g. `999`
  - `created_at`: string - The date and time the schedule was created in UTC e.g. `2024-05-14T13:30:00Z`
  - `created_by`: string - The user ID of the user who created the schedule e.g. `999`
  - `deleted_at`: string - The date and time the schedule was deleted in UTC e.g. `2024-05-14T13:30:00Z`
  - `deleted_by`: string - The user ID of the user who deleted the schedule e.g. `999`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}

**Get Schedule by ID**
Get a single schedule by id. Use the Show Project API when you need the project time zone to interpret UTC timestamps or values expressed in project time.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule

Response 200 (application/json): object

- `data`: object
  - `schedule_id`: string (required) - The unique identifier for the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`
  - `schedule_name`: string (required) - The name of the schedule e.g. `Main Project Schedule`
  - `schedule_type`: string (required) - Indicates whether the schedule type is project schedule or lookahead e.g. `IMPORTED_READ_WRITE_PROJECT_SCHEDULE`
  - `is_active`: boolean (required) - Flag to indicate whether the schedule is active or archived e.g. `true`
  - `data_date`: string - Datetime string when the schedule's progress was last recorded in UTC ISO-8601 format e.g. `2024-05-14T00:00:00Z`
  - `start_date`: string - The schedule's start date as a datetime string in UTC ISO-8601 format e.g. `2024-05-01T00:00:00Z`
  - `calendar_id`: string - The schedule's default workday calendar e.g. `101`
  - `parent_schedule_id`: string - The schedule_id of the associated project schedule if this schedule is a lookahead e.g. `10`
  - `updated_at`: string - The date and time the schedule was last modified in UTC e.g. `2024-05-14T13:30:00Z`
  - `updated_by`: string - The user ID of the user who last modified the schedule e.g. `999`
  - `created_at`: string - The date and time the schedule was created in UTC e.g. `2024-05-14T13:30:00Z`
  - `created_by`: string - The user ID of the user who created the schedule e.g. `999`
  - `deleted_at`: string - The date and time the schedule was deleted in UTC e.g. `2024-05-14T13:30:00Z`
  - `deleted_by`: string - The user ID of the user who deleted the schedule e.g. `999`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Timeline Events

Resource id: `timeline-events`. Raw spec: `../openapi-raw/timeline-events.json`. Web: https://developers.procore.com/reference/rest/timeline-events?version=latest
Product lines: schedule-management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/timeline_events

**List Timeline Events**
List all timeline events in a schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `filters[timeline_event_id]` [query] string - Filter timeline events by timeline_event_id
- `filters[timeline_event_name]` [query] string - Filter timeline events by timeline_event_name
- `filters[source_activity_deleted]` [query] boolean - Filter timeline events by source activity deleted status
- `sort` [query] string enum[timeline_event_id, timeline_event_name, start_date, finish_date] - Sort by supported fields. Accepts comma separated values to sort by multiple fields. Order is ascending by default, prefix field with '-' for descending
- `page` [query] integer(int32) - The page number to retrieve
- `per_page` [query] integer - Number of records per page

Response 200 (application/json): object

- `data`: array of object
  - `timeline_event_id`: string (required) - The unique identifier for the timeline event e.g. `15`
  - `timeline_event_name`: string (required) - The descriptive name of the timeline event e.g. `Phase 1`
  - `start_date`: string(date) - The timeline event start date (ISO 8601 format) e.g. `2024-05-01`
  - `finish_date`: string(date) - The timeline event finish date (ISO 8601 format) e.g. `2024-05-15`
  - `is_source_event`: boolean - Indicates if the timeline event is a source event (imported from an external schedule) e.g. `false`
  - `activity_code`: string - Activity code associated with the source activity e.g. `A1010`
  - `source_activity_deleted`: boolean - Indicates if the source activity was deleted e.g. `false`
  - `timeline_event_type`: string enum[time_range, start_milestone, finish_milestone] - Timeline event type e.g. `time_range`
  - `color`: string enum[FIREBRICK, SALMON, CRIMSON, TOMATO, DARKORANGE, KHAKI, DARKKHAKI, LIMEGREEN, YELLOWGREEN, PALEGREEN, SEAGREEN, OLIVE, ...] - Timeline event color e.g. `SALMON`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/timeline_events

**Create Timeline Event**
Create a timeline event in a schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule

Request body (application/json) (required):

- `timeline_event_name`: string (required) - The descriptive name of the timeline event e.g. `Inspector visit`
- `start_date`: string(date) (required) - The timeline event start date (ISO 8601 format) e.g. `2024-05-01`
- `finish_date`: string(date) (required) - The timeline event finish date (ISO 8601 format) e.g. `2024-05-15`
- `color`: string enum[FIREBRICK, SALMON, CRIMSON, TOMATO, DARKORANGE, KHAKI, DARKKHAKI, LIMEGREEN, YELLOWGREEN, PALEGREEN, SEAGREEN, OLIVE, ...] (required) - Timeline event color e.g. `SALMON`
- `timeline_event_type`: string enum[time_range, start_milestone, finish_milestone] (required) - Timeline event type e.g. `time_range`

Response 201 (application/json): object

- `data`: object
  - `timeline_event_id`: string (required) - The unique identifier for the timeline event e.g. `15`
  - `timeline_event_name`: string (required) - The descriptive name of the timeline event e.g. `Phase 1`
  - `start_date`: string(date) - The timeline event start date (ISO 8601 format) e.g. `2024-05-01`
  - `finish_date`: string(date) - The timeline event finish date (ISO 8601 format) e.g. `2024-05-15`
  - `is_source_event`: boolean - Indicates if the timeline event is a source event (imported from an external schedule) e.g. `false`
  - `activity_code`: string - Activity code associated with the source activity e.g. `A1010`
  - `source_activity_deleted`: boolean - Indicates if the source activity was deleted e.g. `false`
  - `timeline_event_type`: string enum[time_range, start_milestone, finish_milestone] - Timeline event type e.g. `time_range`
  - `color`: string enum[FIREBRICK, SALMON, CRIMSON, TOMATO, DARKORANGE, KHAKI, DARKKHAKI, LIMEGREEN, YELLOWGREEN, PALEGREEN, SEAGREEN, OLIVE, ...] - Timeline event color e.g. `SALMON`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/timeline_events/{timeline_event_id}

**Get Timeline Event by ID**
Get a single timeline event by its id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `timeline_event_id` [path] string (required) - Timeline Events ID

Response 200 (application/json): object

- `data`: object
  - `timeline_event_id`: string (required) - The unique identifier for the timeline event e.g. `15`
  - `timeline_event_name`: string (required) - The descriptive name of the timeline event e.g. `Phase 1`
  - `start_date`: string(date) - The timeline event start date (ISO 8601 format) e.g. `2024-05-01`
  - `finish_date`: string(date) - The timeline event finish date (ISO 8601 format) e.g. `2024-05-15`
  - `is_source_event`: boolean - Indicates if the timeline event is a source event (imported from an external schedule) e.g. `false`
  - `activity_code`: string - Activity code associated with the source activity e.g. `A1010`
  - `source_activity_deleted`: boolean - Indicates if the source activity was deleted e.g. `false`
  - `timeline_event_type`: string enum[time_range, start_milestone, finish_milestone] - Timeline event type e.g. `time_range`
  - `color`: string enum[FIREBRICK, SALMON, CRIMSON, TOMATO, DARKORANGE, KHAKI, DARKKHAKI, LIMEGREEN, YELLOWGREEN, PALEGREEN, SEAGREEN, OLIVE, ...] - Timeline event color e.g. `SALMON`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/timeline_events/{timeline_event_id}

**Update Timeline Event**
Partially update a timeline event. Only provided fields will be updated

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `timeline_event_id` [path] string (required) - Timeline Events ID

Request body (application/json) (required):

- `timeline_event_name`: string - The descriptive name of the timeline event e.g. `Updated Event Name`
- `start_date`: string(date) - The timeline event start date (ISO 8601 format) e.g. `2024-05-01`
- `finish_date`: string(date) - The timeline event finish date (ISO 8601 format) e.g. `2024-05-15`
- `color`: string enum[FIREBRICK, SALMON, CRIMSON, TOMATO, DARKORANGE, KHAKI, DARKKHAKI, LIMEGREEN, YELLOWGREEN, PALEGREEN, SEAGREEN, OLIVE, ...] - Timeline event color e.g. `SALMON`
- `timeline_event_type`: string enum[time_range, start_milestone, finish_milestone] (required) - Timeline event type e.g. `time_range`

Response 200 (application/json): object

- `data`: object
  - `timeline_event_id`: string (required) - The unique identifier for the timeline event e.g. `15`
  - `timeline_event_name`: string (required) - The descriptive name of the timeline event e.g. `Phase 1`
  - `start_date`: string(date) - The timeline event start date (ISO 8601 format) e.g. `2024-05-01`
  - `finish_date`: string(date) - The timeline event finish date (ISO 8601 format) e.g. `2024-05-15`
  - `is_source_event`: boolean - Indicates if the timeline event is a source event (imported from an external schedule) e.g. `false`
  - `activity_code`: string - Activity code associated with the source activity e.g. `A1010`
  - `source_activity_deleted`: boolean - Indicates if the source activity was deleted e.g. `false`
  - `timeline_event_type`: string enum[time_range, start_milestone, finish_milestone] - Timeline event type e.g. `time_range`
  - `color`: string enum[FIREBRICK, SALMON, CRIMSON, TOMATO, DARKORANGE, KHAKI, DARKKHAKI, LIMEGREEN, YELLOWGREEN, PALEGREEN, SEAGREEN, OLIVE, ...] - Timeline event color e.g. `SALMON`
  - `schedule_id`: string (required) - The ID of the schedule e.g. `15`
  - `project_id`: string (required) - Procore Project ID e.g. `12345`
  - `company_id`: string (required) - Procore Company ID e.g. `67890`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/schedules/{schedule_id}/timeline_events/{timeline_event_id}

**Delete Timeline Event**
Delete a timeline event from the schedule

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company
- `project_id` [path] string (required) - Unique identifier for the project
- `schedule_id` [path] string (required) - Unique identifier for the schedule
- `timeline_event_id` [path] string (required) - Timeline Events ID

Response 204: Successfully deleted timeline event (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

