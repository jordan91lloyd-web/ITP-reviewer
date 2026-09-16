# Procore API: Company Settings (Company Admin)

Source: https://developers.procore.com/reference/rest/ (tool category: Company Settings)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Companies](#companies) - versions 1.0
- [Company Configurations](#company-configurations) - versions 1.0
- [Company Offices](#company-offices) - versions 1.0
- [Company Projects](#company-projects) - versions 1.0
- [Company Schedule](#company-schedule) - versions 1.0
- [Company Schedule Resources](#company-schedule-resources) - versions 1.0
- [Company Security Settings](#company-security-settings) - versions 2.0
- [Company Settings](#company-settings) - versions 1.0
- [Concierge](#concierge) - versions 1.0
- [Construction Volume](#construction-volume) - versions 1.0
- [Form Templates](#form-templates) - versions 1.0
- [Operations](#operations) - versions 2.0
- [Personal Settings](#personal-settings) - versions 1.0
- [Programs](#programs) - versions 1.0
- [Project Bid Types](#project-bid-types) - versions 1.0
- [Project Owner Types](#project-owner-types) - versions 1.0
- [Project Regions](#project-regions) - versions 1.0
- [Project Stages](#project-stages) - versions 1.0
- [Project Types](#project-types) - versions 1.0
- [Roles](#roles) - versions 2.0, 1.0
- [Submittal Statuses](#submittal-statuses) - versions 1.0
- [Submittal Types](#submittal-types) - versions 1.0
- [Support Pins](#support-pins) - versions 2.0
- [Trades](#trades) - versions 1.0
- [Work Classification - Company Level](#work-classification-company-level) - versions 1.0
- [Work Classification - Project Level](#work-classification-project-level) - versions 1.0

## Companies

Resource id: `companies`. Raw spec: `../openapi-raw/companies.json`. Web: https://developers.procore.com/reference/rest/companies?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies

**List Companies**
Return a list of Companies visible to the User.
NOTE: This endpoint does not require the ['Procore-Company-Id' header]
(https://developers.procore.com/documentation/tutorial-mpz)
to be included on a request.

Parameters:

- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `include_free_companies` [query] boolean - By default the endpoint excludes free companies. Provide include_free_companies=true to include them

Response 200 (application/json): array of object

- `id`: integer - Company id e.g. `1`
- `name`: string - Company name e.g. `ABC Drywall`
- `is_active`: boolean - Company is active status e.g. `true`
- `logo_url`: string - Company Logo URL e.g. `https://pro-core.com/prostore/logo.gif`
- `pcn_business_experience`: boolean - Company has business experience enabled e.g. `true`
- `my_company`: boolean - The current user is an active employee of this company. This will only return as true for a single company in the response. e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Configurations

Resource id: `company-configurations`. Raw spec: `../openapi-raw/company-configurations.json`. Web: https://developers.procore.com/reference/rest/company-configurations?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/company_configuration

**Show Company Configuration**
Returns company configuration.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `strict_file_uploading`: boolean - Strict File Uploading Allowed e.g. `true`
- `enable_image_real_time_as_builts`: boolean - Image Real Time As Builts Enabled e.g. `true`
- `currency_symbol`: string - Currency Symbol e.g. `$`
- `currency_display`: string - Currency Display e.g. `symbol`
- `currency_iso_code`: string - Currency ISO Code e.g. `USD`
- `timecard_employees_see_all_projects`: boolean - Timecard Employees Can See All Projects e.g. `true`
- `timesheet_enabled_cost_type`: array of integer - Timesheet IDs With Enabled Cost Type e.g. `[1, 2, 3]`
- `timesheet_type`: array of integer - Timesheet IDs With Enabled Cost Type e.g. `[1, 2, 3]`
- `enable_sd_storage`: boolean - SD Storage Enabled e.g. `true`
- `timesheets_custom_signature_text`: string - Timesheets Custom Signature Text e.g. `Custom signature text`
- `timesheets_week_start_day`: integer - Timesheets Week Starting Day e.g. `1`
- `use_24_hour_mode`: boolean - Use 24 Hour Clock e.g. `true`
- `timesheets_tab_enabled`: boolean - Timesheets Tab Enabled e.g. `true`
- `timecard_should_track_location`: array of integer - Projects whose configuration has track_timecard_location equals to true
- `projects_timecard_in_out_enabled`: array of integer - Projects Timecard In Out Enabled
- `rounding_configuration`: object - Rounding Configuration
  - `rule`: string - Rounding Rule e.g. `up`
  - `time_increment`: integer e.g. `5`
- `time_and_materials_company_config`: object - Time and Materials Company Config
  - `materials_enabled`: boolean e.g. `true`
  - `labor_enabled`: boolean e.g. `true`
  - `equipment_enabled`: boolean e.g. `true`
  - `subcontractors_enabled`: boolean e.g. `true`
- `projects_timecard_default_lunch_time`: array of object - Project Configurations whose timecard_default_lunch_time is not nil
  - `project_id`: integer - ID of the project e.g. `1234`
  - `timecard_default_lunch_time`: integer - Timecard default lunch time in minutes e.g. `60`
- `projects_timecard_default_start_time`: array of object - Project Configurations whose timecard_default_start_time is not nil
  - `project_id`: integer - ID of the project e.g. `1234`
  - `timecard_default_start_time`: string - Timecard default start time in format HH:MM
- `projects_timecard_default_stop_time`: array of object - Project Configurations whose timecard_default_stop_time is not nil
  - `project_id`: integer - ID of the project e.g. `1234`
  - `timecard_default_stop_time`: string - Timecard default stop time in format HH:MM
- `projects_timecard_lunch_time_tracking`: array of object - Project Configurations whose timecard_lunch_time_tracking is not nil
  - `project_id`: integer - ID of the project e.g. `1234`
  - `timecard_lunch_time_tracking`: string - Timecard lunch time tracking e.g. `total_time`
- `task_codes_enabled`: boolean - Task codes enabled e.g. `true`
- `timecard_employees_can_select_non_budgeted_items`: array of integer - Timecard Employees can select non budgeted items
- `timecards_private`: boolean - Timecards private by default e.g. `true`
- `timesheet_default_cost_type_id`: integer - Company Timesheet Budget Configuration default line item type id for non-erp integrated projects e.g. `12`
- `timesheet_erp_default_cost_type_id`: integer - Company Timesheet Budget Configuration default line item type id for erp integrated projects e.g. `13`
- `timesheet_equipment_default_cost_type_id`: integer - Company Timesheet Budget Configuration default equipment line item type id for non-erp integrated projects e.g. `14`
- `timesheet_equipment_erp_default_cost_type_id`: integer - Company Timesheet Budget Configuration default equipment line item type id for erp integrated projects e.g. `15`

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Offices

Resource id: `company-offices`. Raw spec: `../openapi-raw/company-offices.json`. Web: https://developers.procore.com/reference/rest/company-offices?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/offices

**List company offices**
Returns a collection of Offices associated to a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[normal, extended] - The view determines which fields are returned. 'normal' returns id, address, city, country_code, division, fax, logo, name, phone, state_code, and zip. 'extended' additionally returns main_office.

Response 200 (application/json): array of object

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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/offices

**Create company office**
Creates an Office associated to a Company.
#### Uploading logo
To upload an office logo you must upload whole payload as `multipart/form-data` content-type
and specify each parameter as form-data together with `office[logo]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - The ID of the Company the Office belongs to
- `office`: object (required) - Office object
  - `name`: string (required) - The Name of the Office
  - `address`: string - The Address of the Office
  - `city`: string - The City of the Office
  - `state_code`: string - The State Code of the Office (ISO-3166 Alpha-2 format)
  - `country_code`: string - The Country Code of the Office (ISO-3166 Alpha-2 format)
  - `zip`: string - The Zip of the Office
  - `phone`: string - The Phone of the Office
  - `fax`: string - The Fax of the Office
  - `division`: string - The Division of the Office
  - `logo_prostore_file_id`: integer - Prostore File ID

Response 201 (application/json): object

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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/offices/{id}

**Show company office**
Returns information about an Office associated to a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the office
- `company_id` [query] integer (required) - Unique identifier for the company.
- `view` [query] string enum[normal, extended] - Response schema to use

Response 200 (application/json): object

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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/offices/{id}

**Update company office**
Updates an Office associated to a Company.
#### Uploading logo
To upload an office logo you must upload whole payload as `multipart/form-data` content-type
and specify each parameter as form-data together with `office[logo]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the office

Request body (application/json) (required):

- `company_id`: integer (required) - The ID of the Company the Office belongs to
- `office`: object (required) - Office object
  - `name`: string (required) - The Name of the Office
  - `address`: string - The Address of the Office
  - `city`: string - The City of the Office
  - `state_code`: string - The State Code of the Office (ISO-3166 Alpha-2 format)
  - `country_code`: string - The Country Code of the Office (ISO-3166 Alpha-2 format)
  - `zip`: string - The Zip of the Office
  - `phone`: string - The Phone of the Office
  - `fax`: string - The Fax of the Office
  - `division`: string - The Division of the Office
  - `logo_prostore_file_id`: integer - Prostore File ID

Response 200 (application/json): object

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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/offices/{id}

**Delete a company office**
Deletes an Office associated to a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the office
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Projects

Resource id: `company-projects`. Raw spec: `../openapi-raw/company-projects.json`. Web: https://developers.procore.com/reference/rest/company-projects?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/projects

**List company's projects**
Returns a list of Projects associated with a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `id`: integer - Project ID e.g. `89025`
- `name`: string - Project name e.g. `Long Bridge`
- `address`: object - Address
  - `street`: string - street name e.g. `700 Boylston St`
  - `city`: string - City e.g. `Boston`
  - `state_code`: string - State code e.g. `MA`
  - `zip`: string - Zip code e.g. `2116`
  - `country_code`: string - CityCountry code e.g. `US`
- `stage_name`: string - Project stage e.g. `Pre-Construction`
- `status_name`: string - Project status e.g. `Active`
- `type_name`: string - Project type e.g. `Commercial`
- `open_items`: array of object
  - `id`: integer - ID e.g. `160586`
  - `details`: string e.g. `The very first RFI`
  - `host`: string e.g. `https://us02.procore.com`
  - `url`: string e.g. `/2/projects/todo_items/3`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `email`: string - Email e.g. `abc@example.com`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Schedule

Resource id: `company-schedule`. Raw spec: `../openapi-raw/company-schedule.json`. Web: https://developers.procore.com/reference/rest/company-schedule?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/schedule/summary

**Return company schedule summary**
Returns a list of the number of tasks and calendar items per project for each day in the specified date range.
Tasks and calendar items whose start - finish overlap with the specified date range are included in the sums.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `after` [query] string (required) - Beginning of date range to filter by.
- `before` [query] string (required) - End of date range to filter by
- `limit_per_day` [query] integer - Number of results to return per day
- `project_ids` [query] array of integer - Filter by project IDs
- `project_stage_ids` [query] array of integer - Filter by project stage IDs
- `project_type_ids` [query] array of integer - Filter by project type IDs
- `project_department_ids` [query] array of integer - Filter by project department IDs
- `project_office_ids` [query] array of integer - Filter by project office IDs
- `project_region_ids` [query] array of integer - Filter by project region IDs
- `project_owner_type_ids` [query] array of integer - Filter by project owner type IDs
- `program_ids` [query] array of integer - Filter by project program IDs
- `resource_ids` [query] array of integer - Filter by resource IDs
- `sort_key` [query] string enum[project_event_count, project_name, estimated_start_date, estimated_completion_date] - Sort results by a property of projects. Defaults to descending project_event_count.
- `sort_dir` [query] string enum[asc, desc] - Sort results in ascending or descending order

Response 200 (application/json): object

- `data`: array of object
  - `date`: string(date-time) - Datetime at beginning of day e.g. `2023-06-04T00:00:00Z`
  - `projects_count`: integer - Number of projects with tasks or calendar items on this day e.g. `2`
  - `projects`: array of object - List of projects with counts of tasks or calendar items on this day. The size of this list is limited by the `limit_per_day` query parameter. The order of this list is determined by the `sort_key` and `sort_dir` query...
    - `id`: integer - Project ID e.g. `1`
    - `name`: string - Project Name e.g. `Project 1`
    - `tasks_count`: integer - Number of tasks on this day e.g. `5`
    - `calendar_items_count`: integer - Number of calendar items on this day e.g. `3`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Schedule Resources

Resource id: `company-schedule-resources`. Raw spec: `../openapi-raw/company-schedule-resources.json`. Web: https://developers.procore.com/reference/rest/company-schedule-resources?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/schedule/resources

**List Schedule Resources**
Returns all resources for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[name]` [query] array of string - Filter item(s) with matching name.

Response 200 (application/json): object

- `resources`: array of object - Resources
  - `id`: integer - Id e.g. `2`
  - `name`: string - Name e.g. `Electrician`
  - `source_uid`: string - Source uid e.g. `b6e53ef0-20d8-11ee-be56-0242ac120002`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Security Settings

Resource id: `company-security-settings`. Raw spec: `../openapi-raw/company-security-settings.json`. Web: https://developers.procore.com/reference/rest/company-security-settings?version=latest
Product lines: PM Essentials

### GET /rest/v2.0/companies/{company_id}/company_security_settings

**Show Company Security Settings**
Show Company Security Settings for Admin user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `enable_login_lockout`: boolean - Lock out after 3 failed sign in attempts. e.g. `true`
  - `password_reset_after`: integer - Password expiration in minutes. e.g. `60`
  - `session_timeout`: integer - Session timeout in minutes. e.g. `15`
  - `enforce_password_reset_by_email`: boolean - Enforce password resets via email. e.g. `false`
  - `is_pin_required_for_jit`: boolean - Is PIN required for JIT e.g. `false`
  - `password_security_url`: string - Full URL path to the zone-specific Password Security Settings page e.g. `https://us02.procore.com/123/company/home/password_security`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Settings

Resource id: `company-settings`. Raw spec: `../openapi-raw/company-settings.json`. Web: https://developers.procore.com/reference/rest/company-settings?version=latest
Product lines: PM Essentials

### PUT /rest/v1.0/companies/{company_id}/settings/logo

**Update company's logo**
Upload and set company logo

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `type` [query] string enum[pcn] - Type of requesting entity

Request body (application/json):

- oneOf(object | object)

Response 200 (application/json): array of object

- `name`: string - The flag name e.g. `welcome_tour_dismissed`
- `value`: string - The flag value e.g. `GST@10%`
- `is_user_flag`: boolean - If the flag is related to the user only (or company-wide) e.g. `true`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/settings/logo

**Delete company logo**
Delete company logo

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `name`: string - The flag name e.g. `welcome_tour_dismissed`
- `value`: string - The flag value e.g. `GST@10%`
- `is_user_flag`: boolean - If the flag is related to the user only (or company-wide) e.g. `true`

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Concierge

Resource id: `concierge`. Raw spec: `../openapi-raw/concierge.json`. Web: https://developers.procore.com/reference/rest/concierge?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### PATCH /rest/v1.0/companies/{company_id}/concierge

**Update Concierge parameters**
Upload Notification

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `concierge`: object
  - `estimated_initial_projects`: integer - Estimated number of projects in first three months e.g. `3`
  - `estimated_initial_users`: integer - Estimated number of staff users in first three months e.g. `15`

Response 200 (application/json): object

- `id`: integer e.g. `123`
- `implementation_manager_origin_id`: integer - ID for the IM in Liftoff e.g. `123`
- `estimated_initial_projects`: integer - Estimates number of projects in first 3 month e.g. `3`
- `estimated_initial_users`: integer - Estimates number of staff users in first 3 month e.g. `15`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Construction Volume

Resource id: `construction-volume`. Raw spec: `../openapi-raw/construction-volume.json`. Web: https://developers.procore.com/reference/rest/construction-volume?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### POST /rest/v1.0/companies/{company_id}/construction_volume/urgent_error

**Send Urgent Error**
Send an urgent error to be recieved and delt with quickly.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `message`: string - The Error Message

Response 201 (application/json): object


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Form Templates

Resource id: `form-templates`. Raw spec: `../openapi-raw/form-templates.json`. Web: https://developers.procore.com/reference/rest/form-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/form_templates

**List Company Form Templates from Project**
Returns a collection of Company Form Templates for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/form_templates/{id}

**Show Company Form Template from Project**
Returns the details for a specified Company Form Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Form Template ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/form_templates

**List Company Form Templates**
Returns a collection of Form Templates for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/form_templates

**Create Company Form Template**
Create a new Company Form Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (multipart/form-data) (required):

- `form_template`: object (required)
  - `name`: string (required) - Name of the Form Template e.g. `JHA`
  - `description`: string (required) - The Description of the Form Template e.g. `Please fill out to the best of your ability`
- `fillable_pdf`: string(binary) (required) - Form Template's Fillable PDF. To upload a fillable PDF you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `fillable_pdf` as files.

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/form_templates/{id}

**Show Company Form Template**
Returns the details for a specified Company Form Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Form Template ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/form_templates/{id}

**Update Company Form Template**
Update a Company Form Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Form Template ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `form_template`: object (required)
  - `name`: string - The Name of the Form Template e.g. `JHA`
  - `description`: string - The Description of the Form Template e.g. `Please fill out to the best of your ability`
  - `fillable_pdf`: string - Form's Fillable PDF. To upload a fillable PDF you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `fillable_pdf` as files.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/form_templates/{id}

**Delete Company Form Template**
Delete a Company Form Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Form Template ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 204: Form Template deleted successfully (no body)

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/form_templates

**List Recycled Company Form Templates**
Returns a collection of Recycled Form Templates for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/recycle_bin/form_templates/{id}

**Show Recycled Company Form Template**
Returns the details for a specified recycled Company Form Template

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Form Template ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form Template. Use as the {id} path parameter to retrieve, update, or delete a specific Form Template. e.g. `999`
- `name`: string - Human-readable name of the Form Template, shown to users when selecting a template to fill out. e.g. `Inspection Form Template`
- `description`: string - Longer description explaining the purpose of the Form Template or instructions for completing it. e.g. `This is a Form Template`
- `created_at`: string(date-time) - Timestamp when the Form Template was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `updated_at`: string(date-time) - Timestamp when the Form Template was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `archived_at`: string(date-time) - Timestamp when the Form Template was archived, in ISO 8601 format. Null when the template is active (not archived). e.g. `2016-08-23T15:23:57Z`
- `created_by`: object - User who created the Form Template.
  - `id`: integer - Unique identifier of the user who created the Form Template. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form Template. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who created the Form Template. e.g. `Carl Contractor`
- `attachment`: object - Reference to the uploaded PDF file associated with this Form Template. Null when no file has been attached.
  - `id`: integer - Unique identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attached file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.pdf`
- `fillable_pdf`: object - Reference to the fillable PDF that project users complete when filling out a form from this template. Null when no fillable PDF has been uploaded.
  - `id`: integer - Unique identifier of the fillable PDF file. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF file. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/recycle_bin/form_templates/{id}/restore

**Restore Company Form Template**
Restores the specified Form Template from Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Company Form Template ID
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Operations

Resource id: `operations`. Raw spec: `../openapi-raw/operations.json`. Web: https://developers.procore.com/reference/rest/operations?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v2.0/companies/{company_id}/async_operations

**List Operations**
List all asynchronous operations for the company. Non-admin users only see operations they created, unless the request is filtered to a company-readable operation type (for example `bulk_create_and_initialize_projects`) — either directly via `operation_type` or via `parent_id` — in which case matching operations are returned with a restricted payload that omits `result`, `error`, and `created_by_id`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `parent_id` [query] string - Return child operations of the specified parent operation.
- `filters[operation_type]` [query] string - Return operations of the specified type.
- `filters[started_after]` [query] string(date-time) - Return operations that started after the started_after time.
- `filters[started_before]` [query] string(date-time) - Return operations that started before the started_before time.
- `filters[status]` [query] string enum[created, in_progress, done, failed] - Return operations with the specified status.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Operation details
  - `id`: string - Unique identifier for the operation e.g. `12345`
  - `operation_type`: string - Operation type e.g. `create_and_initialize_project`
  - `started_at`: string(date-time) - Time that the operation started e.g. `2024-08-12T08:40:51Z`
  - `completed_at`: string(date-time) - Time that the operation completed e.g. `2024-08-12T08:40:51Z`
  - `status`: string enum[created, in_progress, done, failed] - Operation status
  - `error`: object - Error message if operation failed
    - `message`: string - Error message e.g. `Item not found`
  - `result`: object - Operation-specific result. See the initiating API for details on the result format.
  - `context`: object - Opaque internal context information for the operation.
  - `created_by_id`: string - User ID of the user who created the operation e.g. `123456`
  - `project_id`: string - ID of the project the operation belongs to, if any e.g. `789`
  - `parent_id`: string - ID of the parent operation, if this operation is a child of a batch operation e.g. `12344`
  - `failure_details`: object - Why this operation failed, when the failure was recorded with a reason. Populated for rows of a bulk create that were rejected before a project was attempted, or that failed while initializing. Null for operations tha...
    - `errors`: array of string - Reasons this operation failed
    - `submitted_row`: object - Values submitted for this row, keyed by bulk-create template column. Restricted to the name and project_number columns for readers who are neither the operation creator nor a company admin.
    - `row_index`: integer - Zero-based position of this row in the original bulk-create upload. Present on failed create_and_initialize_project children so clients can label the row and restore upload order. Children are not created in upload or... e.g. `0`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/async_operations/{operation_id}

**Get Operation Details**
Retrieve details of a specific asynchronous operation for the company. Available to the operation's creator and company admins. For company-readable operation types (for example `bulk_create_and_initialize_projects`), any company member may read the operation, receiving a restricted payload that omits `result`, `error`, `created_by_id`, and `sub_operations`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `operation_id` [path] string (required) - Unique identifier for the operation.

Response 200 (application/json): object

- `data`: object - Operation details
  - `id`: string - Unique identifier for the operation e.g. `12345`
  - `operation_type`: string - Operation type e.g. `create_and_initialize_project`
  - `started_at`: string(date-time) - Time that the operation started e.g. `2024-08-12T08:40:51Z`
  - `completed_at`: string(date-time) - Time that the operation completed e.g. `2024-08-12T08:40:51Z`
  - `status`: string enum[created, in_progress, done, failed, partial_done, cancelled] - Operation status
  - `error`: object - Error message if operation failed
    - `message`: string - Error message e.g. `Item not found`
  - `result`: object - Operation-specific result. See the initiating API for details on the result format.
  - `context`: object - Opaque internal context information for the operation.
  - `created_by_id`: string - User ID of the user who created the operation e.g. `123456`
  - `parent_id`: string - ID of the parent operation, if this operation is a child of a batch operation e.g. `12344`
  - `failure_details`: object - Why this operation failed, when the failure was recorded with a reason. Populated for rows of a bulk create that were rejected before a project was attempted, or that failed while initializing. Null for operations tha...
    - `errors`: array of string - Reasons this operation failed
    - `submitted_row`: object - Values submitted for this row, keyed by bulk-create template column. Restricted to the name and project_number columns for readers who are neither the operation creator nor a company admin.
    - `row_index`: integer - Zero-based position of this row in the original bulk-create upload. Present on failed create_and_initialize_project children so clients can label the row and restore upload order. Children are not created in upload or... e.g. `0`
  - `progress`: object - Progress summary for parent operations that fan out into child operations. Only populated for bulk-create parent operations.
    - `total`: integer - Total number of child operations (submitted rows), capped at 100 e.g. `100`
    - `successful`: integer - Number of child operations whose base project was successfully initialized e.g. `95`
    - `failed`: integer - Number of child operations that failed validation or base initialization e.g. `5`
    - `in_progress`: integer - Number of child operations still in progress e.g. `0`
    - `percentage`: integer - Percentage of successful base-project initializations (successful / total * 100) e.g. `95`
  - `sub_operations`: array of object - Sub-operation details
    - `id`: string - Unique identifier for the sub-operation e.g. `12345`
    - `sub_operation_type`: string - Sub-operation type e.g. `directory_initializer`
    - `started_at`: string(date-time) - Time that the sub-operation started e.g. `2024-08-12T08:40:51Z`
    - `completed_at`: string(date-time) - Time that the sub-operation completed e.g. `2024-08-12T08:40:51Z`
    - `status`: string enum[created, enqueued, in_progress, done, failed, retry, partial_done, cancelled] - Sub-operation status
    - `error`: object - Error message if sub-operation failed
    - `result`: object - Sub-operation-specific result. See the initiating API for details on the result format.
    - `context`: object - Opaque internal context information for the sub-operation.

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Personal Settings

Resource id: `personal-settings`. Raw spec: `../openapi-raw/personal-settings.json`. Web: https://developers.procore.com/reference/rest/personal-settings?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v1.0/companies/{company_id}/settings/my/avatar

**Returns avatar of the current user**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `url`: string

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/companies/{company_id}/settings/my/avatar

**Bulk create/update UI flags**
Create or update UI flags associated with company, and user

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- oneOf(object | object)

Response 200 (application/json): object

- `url`: string

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Programs

Resource id: `programs`. Raw spec: `../openapi-raw/programs.json`. Web: https://developers.procore.com/reference/rest/programs?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/programs

**List programs**
Return a list of Programs associated to the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Program ID
- `name`: string - Program name
- `address_freeform`: string - Program address
- `website`: string - Program website
- `photo_prostore_file_id`: integer - Prostore file ID for the program photo
- `logo_prostore_file_id`: integer - Prostore file ID for the program logo
- `photo_prostore_file_url`: string - URL for the program photo
- `logo_prostore_file_url`: string - URL for the program logo
- `project_count`: integer - Number of projects associated to the program

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/programs

**Create program**
Create a new Program in the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `program`: object (required)
  - `name`: string - The Name of the Program e.g. `Program A`
  - `address_freeform`: string - The Address of the Program e.g. `500 Construction Way, Santa Barbara`
  - `website`: string - The Website of the Program e.g. `http://www.example.com`
  - `zip`: string - The Zip code of the Program e.g. `91013`

Response 201 (application/json): object

- `id`: integer - Program ID e.g. `1`
- `name`: string - Program name e.g. `NW USA`
- `address_freeform`: string - Program address e.g. `Seattle`
- `website`: string - Program website e.g. `http://www.example.com`
- `zip`: string - Program zip-code e.g. `91013`
- `longitude`: string - Program longitude e.g. `1`
- `latitude`: string - Program latitude e.g. `1`
- `projects`: array of object - Array of program projects
  - `id`: integer - Unique identifier for the project. e.g. `46146`
  - `name`: string - Project name e.g. `2014 Draft`
  - `project_number`: string - Project number e.g. `1234`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/programs/{id}

**Show program**
Show detail on the specified Program.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the program

Response 200 (application/json): object

- `id`: integer - Program ID e.g. `1`
- `name`: string - Program name e.g. `NW USA`
- `address_freeform`: string - Program address e.g. `Seattle`
- `website`: string - Program website e.g. `http://www.example.com`
- `zip`: string - Program zip-code e.g. `91013`
- `longitude`: string - Program longitude e.g. `1`
- `latitude`: string - Program latitude e.g. `1`
- `projects`: array of object - Array of program projects
  - `id`: integer - Unique identifier for the project. e.g. `46146`
  - `name`: string - Project name e.g. `2014 Draft`
  - `project_number`: string - Project number e.g. `1234`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/programs/{id}

**Update program**
Update the specified Program.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the program

Request body (application/json) (required):

- `program`: object (required)
  - `name`: string - The Name of the Program e.g. `Program A`
  - `address_freeform`: string - The Address of the Program e.g. `500 Construction Way, Santa Barbara`
  - `website`: string - The Website of the Program e.g. `http://www.example.com`
  - `zip`: string - The Zip code of the Program e.g. `91013`

Response 200 (application/json): object

- `id`: integer - Program ID e.g. `1`
- `name`: string - Program name e.g. `NW USA`
- `address_freeform`: string - Program address e.g. `Seattle`
- `website`: string - Program website e.g. `http://www.example.com`
- `zip`: string - Program zip-code e.g. `91013`
- `longitude`: string - Program longitude e.g. `1`
- `latitude`: string - Program latitude e.g. `1`
- `projects`: array of object - Array of program projects
  - `id`: integer - Unique identifier for the project. e.g. `46146`
  - `name`: string - Project name e.g. `2014 Draft`
  - `project_number`: string - Project number e.g. `1234`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/programs/{id}

**Delete program**
Delete the specified Program.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the program

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Bid Types

Resource id: `project-bid-types`. Raw spec: `../openapi-raw/project-bid-types.json`. Web: https://developers.procore.com/reference/rest/project-bid-types?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/project_bid_types

**List Project Bid Types**
Return a list of Project Bid Types

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Project Bid Type ID e.g. `1`
- `name`: string - Project Bid Type name e.g. `Negotiated`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/project_bid_types

**Create Project Bid Type**
Create a new Project Bid Type in the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_bid_type`: object (required)
  - `name`: string - The Name of the Project Bid Type e.g. `Negotiated`

Response 201 (application/json): object

- `id`: integer - Project Bid Type ID e.g. `1`
- `name`: string - Project Bid Type name e.g. `Negotiated`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/project_bid_types/{id}

**Show Project Bid Type**
Show detail on a specified Project Bid Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Bid Type

Response 200 (application/json): object

- `id`: integer - Project Bid Type ID e.g. `1`
- `name`: string - Project Bid Type name e.g. `Negotiated`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/project_bid_types/{id}

**Update Project Bid Type**
Update the specified Project Bid Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Bid Type

Request body (application/json) (required):

- `project_bid_type`: object (required)
  - `name`: string - The Name of the Project Bid Type e.g. `Negotiated`

Response 200 (application/json): object

- `id`: integer - Project Bid Type ID e.g. `1`
- `name`: string - Project Bid Type name e.g. `Negotiated`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/project_bid_types/{id}

**Delete Project Bid Type**
Delete the specified Project Bid Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Bid Type

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Owner Types

Resource id: `project-owner-types`. Raw spec: `../openapi-raw/project-owner-types.json`. Web: https://developers.procore.com/reference/rest/project-owner-types?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/project_owner_types

**List Project Owner Types**
Return a list of Project Owner Types

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Project Owner Type ID e.g. `1`
- `name`: string - Project Owner Type name e.g. `Commercial`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/project_owner_types

**Create Project Owner Type**
Create a new Project Owner Type in the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_owner_type`: object (required)
  - `name`: string - The Name of the Project Owner Type e.g. `Commercial`

Response 201 (application/json): object

- `id`: integer - Project Owner Type ID e.g. `1`
- `name`: string - Project Owner Type name e.g. `Commercial`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/project_owner_types/{id}

**Show Project Owner Type**
Show detail on a specified Project Owner Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Owner Type

Response 200 (application/json): object

- `id`: integer - Project Owner Type ID e.g. `1`
- `name`: string - Project Owner Type name e.g. `Commercial`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/project_owner_types/{id}

**Update Project Owner Type**
Update the specified Project Owner Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Owner Type

Request body (application/json) (required):

- `project_owner_type`: object (required)
  - `name`: string - The Name of the Project Owner Type e.g. `Commercial`

Response 200 (application/json): object

- `id`: integer - Project Owner Type ID e.g. `1`
- `name`: string - Project Owner Type name e.g. `Commercial`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/project_owner_types/{id}

**Delete Project Owner Type**
Delete the specified Project Owner Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Owner Type

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Regions

Resource id: `project-regions`. Raw spec: `../openapi-raw/project-regions.json`. Web: https://developers.procore.com/reference/rest/project-regions?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/project_regions

**List Project Regions**
Return a list of Project Regions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Project Region ID e.g. `1`
- `name`: string - Project Region name e.g. `NW`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/project_regions

**Create Project Region**
Create a new Project Region in the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_region`: object (required)
  - `name`: string - The Name of the Project Region e.g. `NW`

Response 201 (application/json): object

- `id`: integer - Project Region ID e.g. `1`
- `name`: string - Project Region name e.g. `NW`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/project_regions/{id}

**Show Project Region**
Show detail on a specified Project Region.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Region

Response 200 (application/json): object

- `id`: integer - Project Region ID e.g. `1`
- `name`: string - Project Region name e.g. `NW`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/project_regions/{id}

**Update Project Region**
Update the specified Project Region.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Region

Request body (application/json) (required):

- `project_region`: object (required)
  - `name`: string - The Name of the Project Region e.g. `NW`

Response 200 (application/json): object

- `id`: integer - Project Region ID e.g. `1`
- `name`: string - Project Region name e.g. `NW`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/project_regions/{id}

**Delete Project Region**
Delete the specified Project Region.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Project Region

Response 200 (application/json): object


Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Stages

Resource id: `project-stages`. Raw spec: `../openapi-raw/project-stages.json`. Web: https://developers.procore.com/reference/rest/project-stages?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/project_stages

**List Project Stages**
Return a list of Project Stages.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `project_id` [query] integer - Project ID is required if retrieving a list of project stages for RFI users

Response 200 (application/json): array of object

- `id`: integer - Project Stage ID e.g. `1`
- `name`: string - Project Stage name e.g. `Project Stage A`
- `is_bidding_stage`: boolean - Project Stage is bidding stage status e.g. `false`
- `is_concept_stage`: boolean - Indicates if the stage is a concept stage e.g. `false`
- `category`: string - The Category Type of the Project Stage e.g. `course_of_construction`
- `readonly`: boolean - Indicates whether the stage is editable or deletable e.g. `false`
- `default_stage`: boolean - Indicates if the stage was created automatically by Procore and is not editable nor deletable e.g. `false`
- `hideable`: boolean - Indicates if the stage is hideable or not e.g. `true`
- `has_rfi_prefixes`: boolean - Indicates if the stage has RFI prefixes e.g. `true`
- `project_stage_has_children`: boolean - Indicates if the stage has children e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/project_stages

**Create project stage**
Create a new Project Stage in the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_stage`: object (required)
  - `is_bidding_stage`: boolean - The Bidding Stage status of the Project Stage e.g. `false`
  - `name`: string - The Name of the Project Stage e.g. `Project Stage A`
  - `category`: string enum[pre_construction, course_of_construction, post_construction, completed, not_awarded, canceled] - The Category Type of the Project Stage e.g. `course_of_construction`

Response 201 (application/json): object

- `id`: integer - Project Stage ID e.g. `1`
- `name`: string - Project Stage name e.g. `Project Stage A`
- `is_bidding_stage`: boolean - Project Stage is bidding stage status e.g. `false`
- `is_concept_stage`: boolean - Indicates if the stage is a concept stage e.g. `false`
- `category`: string - The Category Type of the Project Stage e.g. `course_of_construction`
- `readonly`: boolean - Indicates whether the stage is editable or deletable e.g. `false`
- `default_stage`: boolean - Indicates if the stage was created automatically by Procore and is not editable nor deletable e.g. `false`
- `hideable`: boolean - Indicates if the stage is hideable or not e.g. `true`
- `has_rfi_prefixes`: boolean - Indicates if the stage has RFI prefixes e.g. `true`
- `project_stage_has_children`: boolean - Indicates if the stage has children e.g. `true`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/project_stages/{id}

**Show project stage**
Show detail on a specified Project Stage.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the project stage

Response 200 (application/json): object

- `id`: integer - Project Stage ID e.g. `1`
- `name`: string - Project Stage name e.g. `Project Stage A`
- `is_bidding_stage`: boolean - Project Stage is bidding stage status e.g. `false`
- `is_concept_stage`: boolean - Indicates if the stage is a concept stage e.g. `false`
- `category`: string - The Category Type of the Project Stage e.g. `course_of_construction`
- `readonly`: boolean - Indicates whether the stage is editable or deletable e.g. `false`
- `default_stage`: boolean - Indicates if the stage was created automatically by Procore and is not editable nor deletable e.g. `false`
- `hideable`: boolean - Indicates if the stage is hideable or not e.g. `true`
- `has_rfi_prefixes`: boolean - Indicates if the stage has RFI prefixes e.g. `true`
- `project_stage_has_children`: boolean - Indicates if the stage has children e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/project_stages/{id}

**Update project stage**
Update the specified Project Stage.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the project stage

Request body (application/json) (required):

- `project_stage`: object (required)
  - `is_bidding_stage`: boolean - The Bidding Stage status of the Project Stage e.g. `false`
  - `name`: string - The Name of the Project Stage e.g. `Project Stage A`
  - `category`: string enum[pre_construction, course_of_construction, post_construction, completed, not_awarded, canceled] - The Category Type of the Project Stage e.g. `course_of_construction`

Response 200 (application/json): object

- `id`: integer - Project Stage ID e.g. `1`
- `name`: string - Project Stage name e.g. `Project Stage A`
- `is_bidding_stage`: boolean - Project Stage is bidding stage status e.g. `false`
- `is_concept_stage`: boolean - Indicates if the stage is a concept stage e.g. `false`
- `category`: string - The Category Type of the Project Stage e.g. `course_of_construction`
- `readonly`: boolean - Indicates whether the stage is editable or deletable e.g. `false`
- `default_stage`: boolean - Indicates if the stage was created automatically by Procore and is not editable nor deletable e.g. `false`
- `hideable`: boolean - Indicates if the stage is hideable or not e.g. `true`
- `has_rfi_prefixes`: boolean - Indicates if the stage has RFI prefixes e.g. `true`
- `project_stage_has_children`: boolean - Indicates if the stage has children e.g. `true`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/project_stages/{id}

**Delete project stage**
Delete the specified Project Stage.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the project stage

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Types

Resource id: `project-types`. Raw spec: `../openapi-raw/project-types.json`. Web: https://developers.procore.com/reference/rest/project-types?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/project_types

**List project types**
Returns a list of Project Types associated with a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Project Type ID
- `name`: string - Project Type name

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/project_types

**Create project type**
Create a new Project Type associated with a specific Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_type`: object (required)
  - `name`: string (required) - The Name of the Project Type

Response 201 (application/json): object

- `id`: integer - Project Type ID
- `name`: string - Project Type name

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/project_types/{id}

**Show project type**
Show detail on the specified Project Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the project type

Response 200 (application/json): object

- `id`: integer - Project Type ID
- `name`: string - Project Type name

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/project_types/{id}

**Update project type**
Update a Project Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the project type

Request body (application/json) (required):

- `project_type`: object (required)
  - `name`: string (required) - The Name of the Project Type

Response 200 (application/json): object

- `id`: integer - Project Type ID
- `name`: string - Project Type name

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/project_types/{id}

**Delete project type**
Delete the specified Project Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the project type

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Roles

Resource id: `roles`. Raw spec: `../openapi-raw/roles.json`. Web: https://developers.procore.com/reference/rest/roles?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v2.0/companies/{company_id}/roles

**List Company Roles**
Return a list of roles for a company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page number for pagination
- `per_page` [query] integer - Elements per page
- `filters[users_only]` [query] boolean - If true, returns only project roles of type contact.

Response 200 (application/json): object

- `data`: array of object - Array of Roles
  - `id`: string - ID e.g. `12345`
  - `add_to_project_team`: boolean
  - `archetype`: string e.g. `owner`
  - `deletable`: boolean (read-only) e.g. `true`
  - `display_on_company_home`: boolean e.g. `true`
  - `name`: string e.g. `Owner`
  - `type`: string e.g. `contact`
  - `position`: integer e.g. `0`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/roles

**POST Company Role**
Create Company Role

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json):

- `project_role`: object - Role Object
  - `id`: string - ID e.g. `12345`
  - `add_to_project_team`: boolean
  - `archetype`: string e.g. `owner`
  - `display_on_company_home`: boolean e.g. `true`
  - `name`: string e.g. `Owner`
  - `type`: string e.g. `contact`

Response 201 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `12345`
  - `add_to_project_team`: boolean
  - `archetype`: string e.g. `owner`
  - `deletable`: boolean (read-only) e.g. `true`
  - `display_on_company_home`: boolean e.g. `true`
  - `name`: string e.g. `Owner`
  - `type`: string e.g. `contact`
  - `position`: integer e.g. `0`

Error responses: 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/roles/{id}

**PATCH Company Role**
Update Company Role

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the resource.

Request body (application/json):

- `project_role`: object - Role Object
  - `id`: string - ID e.g. `12345`
  - `add_to_project_team`: boolean
  - `archetype`: string e.g. `owner`
  - `display_on_company_home`: boolean e.g. `true`
  - `name`: string e.g. `Owner`
  - `type`: string e.g. `contact`

Response 200 (application/json): object

- `data`: object
  - `id`: string - ID e.g. `12345`
  - `add_to_project_team`: boolean
  - `archetype`: string e.g. `owner`
  - `deletable`: boolean (read-only) e.g. `true`
  - `display_on_company_home`: boolean e.g. `true`
  - `name`: string e.g. `Owner`
  - `type`: string e.g. `contact`
  - `position`: integer e.g. `0`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/roles/{id}

**DELETE Company Role**
Delete Company Role

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the resource.

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/roles/reorder

**Reorder Company Role**
Reorder Company Role

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json):

- `order`: array of string (required) - Array of roles id e.g. `["0", "1", "2"]`

Response 204: No Content (no body)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/roles  **[OLDER VERSION - a newer path version exists below/above]**

**List Company Roles**
Return a list of roles for a company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[users_only]` [query] boolean - If true, returns only project roles of type user.

Response 200 (application/json): array of object

- `id`: integer - Role ID
- `name`: string - Role name

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Submittal Statuses

Resource id: `submittal-statuses`. Raw spec: `../openapi-raw/submittal-statuses.json`. Web: https://developers.procore.com/reference/rest/submittal-statuses?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/companies/{company_id}/submittal_statuses

**List Submittal Statuses**
Return a list of all Submittal  Statuses from a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `183101`
- `name`: string - Name e.g. `In Review`
- `status`: string - Status e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Submittal Types

Resource id: `submittal-types`. Raw spec: `../openapi-raw/submittal-types.json`. Web: https://developers.procore.com/reference/rest/submittal-types?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/companies/{company_id}/submittal_types

**List Submittal Types**
Return a list of all active Submittal Types from a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `42`
- `name`: string - Name e.g. `Approved`
- `translated_name`: string - Translated Name e.g. `Approved`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Support Pins

Resource id: `support-pins`. Raw spec: `../openapi-raw/support-pins.json`. Web: https://developers.procore.com/reference/rest/support-pins?version=latest
Product lines: PM Essentials

### GET /rest/v2.0/companies/{company_id}/support_pins

**Fetch active support pin**
Fetches active support pin for given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: object
  - `id`: string - ID of support pin e.g. `8675309`
  - `expires_at`: string(date-time) - Expiration date of support pin e.g. `2024-10-31T23:59:59Z`
  - `pin_plaintext`: string - Decrypted key for support pin e.g. `123ABC`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/support_pins

**Create support pin**
Creates a support pin for the given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 201 (application/json): object

- `data`: object - List of active support pins
  - `data`: object
    - `id`: string - ID of support pin e.g. `8675309`
    - `expires_at`: string(date-time) - Expiration date of support pin e.g. `2024-10-31T23:59:59Z`
    - `pin_plaintext`: string - Decrypted key for support pin e.g. `123ABC`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Trades

Resource id: `trades`. Raw spec: `../openapi-raw/trades.json`. Web: https://developers.procore.com/reference/rest/trades?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/trades

**List trades**
Return a list of all Trades associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[active]` [query] boolean - Limit results to available trades
- `filters[query]` [query] string - Query trades by name

Response 200 (application/json): array of object

- `id`: integer - Trade ID e.g. `999`
- `name`: string - Trade name e.g. `09 - acoustical panels`
- `active`: boolean - Trade availability e.g. `true`
- `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/trades

**Create Trade**
Creates a Trade associated to a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `trade`: object
  - `name`: string - The name of the Trade e.g. `09 - acoustical panels`
  - `active`: boolean - The availability status of the Trade e.g. `true`

Response 201 (application/json): object

- `id`: integer - Trade ID e.g. `999`
- `name`: string - Trade name e.g. `09 - acoustical panels`
- `active`: boolean - Trade availability e.g. `true`
- `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/trades/{id}

**Show Trade**
Returns the details for a specified Trade.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Trade ID

Response 200 (application/json): object

- `id`: integer - Trade ID e.g. `999`
- `name`: string - Trade name e.g. `09 - acoustical panels`
- `active`: boolean - Trade availability e.g. `true`
- `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Classification - Company Level

Resource id: `work-classification---company-level`. Raw spec: `../openapi-raw/work-classification---company-level.json`. Web: https://developers.procore.com/reference/rest/work-classification---company-level?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/work_classifications

**List all Classification**
Return a list of all Classification with details for a specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `serializer_view` [query] string enum[compact, extended, ids_only, normal] - The data set that should be returned from the serializer. Default view is normal.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/work_classifications

**Create Classification**
Create a new Classification associated with the specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `work_classification`: object (required) - Work Classification Object
  - `name`: string - Name of the classification e.g. `Driver`
  - `abbreviation`: string - The shortened form of classification e.g. `DR1`

Response 201 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/work_classifications/{id}

**Show Classification**
Return Classification detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/work_classifications/{id}

**Update Classification**
Updating a Classification

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Classification

Request body (application/json) (required):

- `work_classification`: object (required) - Work Classification Object
  - `name`: string - Name of the classification e.g. `Driver`
  - `abbreviation`: string - The shortened form of classification e.g. `DR1`

Response 200 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/work_classifications/{id}

**Delete Classification**
Deleting a Classification

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Classification

Response 200 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Classification - Project Level

Resource id: `work-classification---project-level`. Raw spec: `../openapi-raw/work-classification---project-level.json`. Web: https://developers.procore.com/reference/rest/work-classification---project-level?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/work_classifications

**List all classifications**
Return a list of all classifications with details for a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/work_classifications

**Create a new classification**
Create a new classification associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `work_classification`: object (required) - Work Classification Object
  - `name`: string - Name of the classification e.g. `Driver`
  - `abbreviation`: string - The shortened form of classification e.g. `DR1`
  - `is_active`: boolean - Is the classification active or not e.g. `false`

Response 201 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_classifications/{id}

**Show classification**
Return classification detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_classifications/{id}

**Update a classification**
Updating a classification associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the classification

Request body (application/json) (required):

- `work_classification`: object (required) - Work Classification Object
  - `name`: string - Name of the classification e.g. `Driver`
  - `abbreviation`: string - The shortened form of classification e.g. `DR1`
  - `is_active`: boolean - Is the classification active or not e.g. `false`

Response 200 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/work_classifications/{id}

**Delete a classification**
Deleting a classification associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the classification

Response 200 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/work_classifications/initial_setup

**Create Company Classifications For Project**
All company work classifications are created for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 201 (application/json): array of object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_classifications/bulk_update

**Update all classification**
Activating/deactivating all classifications associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `work_classification`: object (required) - Work Classification Object
  - `is_active`: boolean - Is the classifications active or not e.g. `false`

Response 200 (application/json): object

- `id`: integer - ID e.g. `57869`
- `name`: string - The name of the classification e.g. `Driver`
- `abbreviation`: string - The shortened form of classification e.g. `DR1`
- `company_id`: integer - The comapny ID the classification was created with e.g. `1`
- `deletable`: boolean (read-only) - Indicates if the classification can be deleted e.g. `true`
- `company_visible`: boolean - Is the classification visible as a company classification e.g. `false`
- `updated_at`: string(date-time) - Date the classification was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the classification was created e.g. `2019-12-10T22:10:33Z`
- `created_by_id`: integer - The user ID the classification was created with e.g. `7`
- `project_ids`: array of integer

Error responses: 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

