# Procore API: Resource Planning (Resource Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Resource Planning)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Assignments](#assignments) - versions 1.0
- [Groups](#groups) - versions 1.0
- [Job Titles](#job-titles) - versions 1.0
- [People](#people) - versions 1.0
- [Permission Levels](#permission-levels) - versions 1.0
- [Resource Planning Notification Profiles](#resource-planning-notification-profiles) - versions 1.0
- [Resource Planning Projects](#resource-planning-projects) - versions 1.0
- [Resource Planning Reports](#resource-planning-reports) - versions 1.0
- [Resource Requests](#resource-requests) - versions 1.0
- [Tags](#tags) - versions 1.0
- [Time Off](#time-off) - versions 1.0

## Assignments

Resource id: `assignments`. Raw spec: `../openapi-raw/assignments.json`. Web: https://developers.procore.com/reference/rest/assignments?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/assignments

**Get Company Assignments**
Returns all of the Resource Planning Assignment data for the given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `created_after` [query] string(date) - Filters items created on or after the specified date (inclusive). Accepts an ISO 8601 date string.
- `created_at` [query] string(date) - Filters items based on their creation timestamp. Accepts an ISO 8601 date string.
- `created_before` [query] string(date) - Filters items created on or before the specified date (inclusive). Accepts an ISO 8601 date string.
- `dayRange` [query] string (required) - A value specifying how many days forward you would like to get assignments for from the specified startDay. Assignments whose start_day falls within the given range will be returned in the response. The startDay param...
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...
- `start_day` [query] string (required) - The starting day to filter assignments by.
- `updated_after` [query] string(date) - Filters items updated on or after the specified date (inclusive). Accepts an ISO 8601 date string.
- `updated_at` [query] string(date) - Filters items based on their last updated timestamp. Accepts an ISO 8601 date string.
- `updated_before` [query] string(date) - Filters items updated on or before the specified date (inclusive). Accepts an ISO 8601 date string.

Response 200 (application/json): array of object

- `possible_pages`: integer - Total number of pages available based on the query parameters e.g. `3`
- `current_page`: integer - The current 0-based page index of the returned data e.g. `0`
- `data`: array of object - List of people and their assignments
  - `person_id`: string - Unique identifier for the person e.g. `ce7da5a6-c908-4506-a251-16fcbf5e96d7`
  - `person_name`: string - Full name of the person e.g. `Aaron Kelly`
  - `employee_number`: string - Employee number assigned to the person e.g. `123-a234s-456`
  - `job_title_name`: string - The job title associated with the person e.g. `Apprentice-4`
  - `job_title_id`: string - Unique identifier for the job title e.g. `abe0afa9-c5be-4cee-8805-1adc88880d09`
  - `job_title_color`: string - The color associated with the job title e.g. `#5bd043`
  - `assignments`: array of object - List of assignments associated with the person
    - `assignment_status`: object - Status of the assignment
    - `start_day`: string(date) - Start date of the assignment (string format) e.g. `06/25/18`
    - `end_day`: string(date) - End date of the assignment (string format) e.g. `06/29/18`
    - `project_name`: string - Name of the project assigned to e.g. `Airport Concourse`
    - `project_number`: string - Project number e.g. `112233`
    - `project_id`: string - Unique identifier for the project e.g. `446e7813-02f0-4629-b2b7-81dd942a8941`
    - `procore_project_id`: integer - Procore-specific project identifier e.g. `12345`
    - `category_name`: string - Name of the assignment category (if applicable)
    - `category_id`: string - Unique identifier for the assignment category (if applicable)
    - `subcategory_name`: string - Name of the assignment subcategory (if applicable)
    - `subcategory_id`: string - Unique identifier for the assignment subcategory (if applicable)
    - `start_time`: string - Start time of the assignment e.g. `7:30 AM`
    - `end_time`: string - End time of the assignment e.g. `3:30 PM`
    - `work_days`: object - Workdays for the assignment, where 0 represents Sunday and 6 represents Saturday
    - `id`: string - Unique identifier for the assignment e.g. `6bf79bbe-2038-423f-8fee-f890abcbd929`
    - `created_at`: string - Timestamp of when the assignment was created (string format) e.g. `06/24/18`
    - `updated_at`: string - Timestamp of when the assignment was last updated (string format)
  - `timeoff`: array of object - List of time-off records for the person
    - `reason`: string - Reason for the time off e.g. `family`
    - `is_paid`: boolean - Indicates whether the time off is paid e.g. `true`
    - `repeat`: string - Recurrence pattern of the time off e.g. `never`
    - `start_time`: string - Start time of the time-off period e.g. `7:00 AM`
    - `end_time`: string - End time of the time-off period e.g. `3:30 PM`
    - `start_day`: string - Start date of the time-off period (string format) e.g. `07/09/18`
    - `end_day`: string - End date of the time-off period (string format) e.g. `07/13/18`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/assignments/current

**Get Current Company Assignments**
Returns all of the current Resource Planning Assignment data for the given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...

Response 200 (application/json): array of object

- `possible_pages`: integer - Total number of pages available based on the query parameters e.g. `3`
- `current_page`: integer - The current 0-based page index of the returned data e.g. `0`
- `data`: array of object - List of people and their assignments
  - `person_id`: string - Unique identifier for the person e.g. `ce7da5a6-c908-4506-a251-16fcbf5e96d7`
  - `person_name`: string - Full name of the person e.g. `Aaron Kelly`
  - `employee_number`: string - Employee number assigned to the person e.g. `123-a234s-456`
  - `job_title_name`: string - The job title associated with the person e.g. `Apprentice-4`
  - `job_title_id`: string - Unique identifier for the job title e.g. `abe0afa9-c5be-4cee-8805-1adc88880d09`
  - `job_title_color`: string - The color associated with the job title e.g. `#5bd043`
  - `assignments`: array of object - List of assignments associated with the person
    - `assignment_status`: object - Status of the assignment
    - `start_day`: string(date) - Start date of the assignment (string format) e.g. `06/25/18`
    - `end_day`: string(date) - End date of the assignment (string format) e.g. `06/29/18`
    - `project_name`: string - Name of the project assigned to e.g. `Airport Concourse`
    - `project_number`: string - Project number e.g. `112233`
    - `project_id`: string - Unique identifier for the project e.g. `446e7813-02f0-4629-b2b7-81dd942a8941`
    - `procore_project_id`: integer - Procore-specific project identifier e.g. `12345`
    - `category_name`: string - Name of the assignment category (if applicable)
    - `category_id`: string - Unique identifier for the assignment category (if applicable)
    - `subcategory_name`: string - Name of the assignment subcategory (if applicable)
    - `subcategory_id`: string - Unique identifier for the assignment subcategory (if applicable)
    - `start_time`: string - Start time of the assignment e.g. `7:30 AM`
    - `end_time`: string - End time of the assignment e.g. `3:30 PM`
    - `work_days`: object - Workdays for the assignment, where 0 represents Sunday and 6 represents Saturday
    - `id`: string - Unique identifier for the assignment e.g. `6bf79bbe-2038-423f-8fee-f890abcbd929`
    - `created_at`: string - Timestamp of when the assignment was created (string format) e.g. `06/24/18`
    - `updated_at`: string - Timestamp of when the assignment was last updated (string format)
  - `timeoff`: array of object - List of time-off records for the person
    - `reason`: string - Reason for the time off e.g. `family`
    - `is_paid`: boolean - Indicates whether the time off is paid e.g. `true`
    - `repeat`: string - Recurrence pattern of the time off e.g. `never`
    - `start_time`: string - Start time of the time-off period e.g. `7:00 AM`
    - `end_time`: string - End time of the time-off period e.g. `3:30 PM`
    - `start_day`: string - Start date of the time-off period (string format) e.g. `07/09/18`
    - `end_day`: string - End date of the time-off period (string format) e.g. `07/13/18`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/assignments

**Get Group Assignments**
Returns the Resource Planning Assignment data for the given company and group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...
- `dayRange` [query] string (required) - A value specifying how many days forward you would like to get assignments for from the specified startDay. Assignments whose start_day falls within the given range will be returned in the response. The startDay param...
- `start_day` [query] string (required) - The starting day to filter assignments by.

Response 200 (application/json): array of object

- `possible_pages`: integer - Total number of pages available based on the query parameters e.g. `3`
- `current_page`: integer - The current 0-based page index of the returned data e.g. `0`
- `data`: array of object - List of people and their assignments
  - `person_id`: string - Unique identifier for the person e.g. `ce7da5a6-c908-4506-a251-16fcbf5e96d7`
  - `person_name`: string - Full name of the person e.g. `Aaron Kelly`
  - `employee_number`: string - Employee number assigned to the person e.g. `123-a234s-456`
  - `job_title_name`: string - The job title associated with the person e.g. `Apprentice-4`
  - `job_title_id`: string - Unique identifier for the job title e.g. `abe0afa9-c5be-4cee-8805-1adc88880d09`
  - `job_title_color`: string - The color associated with the job title e.g. `#5bd043`
  - `assignments`: array of object - List of assignments associated with the person
    - `assignment_status`: object - Status of the assignment
    - `start_day`: string(date) - Start date of the assignment (string format) e.g. `06/25/18`
    - `end_day`: string(date) - End date of the assignment (string format) e.g. `06/29/18`
    - `project_name`: string - Name of the project assigned to e.g. `Airport Concourse`
    - `project_number`: string - Project number e.g. `112233`
    - `project_id`: string - Unique identifier for the project e.g. `446e7813-02f0-4629-b2b7-81dd942a8941`
    - `procore_project_id`: integer - Procore-specific project identifier e.g. `12345`
    - `category_name`: string - Name of the assignment category (if applicable)
    - `category_id`: string - Unique identifier for the assignment category (if applicable)
    - `subcategory_name`: string - Name of the assignment subcategory (if applicable)
    - `subcategory_id`: string - Unique identifier for the assignment subcategory (if applicable)
    - `start_time`: string - Start time of the assignment e.g. `7:30 AM`
    - `end_time`: string - End time of the assignment e.g. `3:30 PM`
    - `work_days`: object - Workdays for the assignment, where 0 represents Sunday and 6 represents Saturday
    - `id`: string - Unique identifier for the assignment e.g. `6bf79bbe-2038-423f-8fee-f890abcbd929`
    - `created_at`: string - Timestamp of when the assignment was created (string format) e.g. `06/24/18`
    - `updated_at`: string - Timestamp of when the assignment was last updated (string format)
  - `timeoff`: array of object - List of time-off records for the person
    - `reason`: string - Reason for the time off e.g. `family`
    - `is_paid`: boolean - Indicates whether the time off is paid e.g. `true`
    - `repeat`: string - Recurrence pattern of the time off e.g. `never`
    - `start_time`: string - Start time of the time-off period e.g. `7:00 AM`
    - `end_time`: string - End time of the time-off period e.g. `3:30 PM`
    - `start_day`: string - Start date of the time-off period (string format) e.g. `07/09/18`
    - `end_day`: string - End date of the time-off period (string format) e.g. `07/13/18`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/assignments

**Get Project Assignments**
Returns the Resource Planning Assignment data for the given company and project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `dayRange` [query] string (required) - A value specifying how many days forward you would like to get assignments for from the specified startDay. Assignments whose start_day falls within the given range will be returned in the response. The startDay param...
- `start_day` [query] string (required) - The starting day to filter assignments by.

Response 200 (application/json): array of object

- `data`: array of object - List of assignments
  - `id`: string - Unique identifier for the assignment e.g. `1a52e827-3b4e-4dff-903d-a321b378eb6c`
  - `created_at`: string - Timestamp of when the assignment was created (string format) e.g. `06/20/18`
  - `start_day`: string - Start date of the assignment (string format) e.g. `06/25/18`
  - `start_time`: string - Start time of the assignment e.g. `7:30 AM`
  - `end_day`: string - End date of the assignment (string format) e.g. `06/29/18`
  - `end_time`: string - End time of the assignment e.g. `3:30 PM`
  - `updated_at`: string - Timestamp of when the assignment was last updated (string format)
  - `state`: string - The current state of the assignment
  - `person_id`: string - Unique identifier for the person assigned e.g. `f6470e8b-013d-4145-b1b0-df05bceddad5`
  - `person_name`: string - Full name of the assigned person e.g. `Hunter Gray`
  - `project_id`: string - Unique identifier for the project e.g. `c805906e-8fe2-45ee-8525-72f1b4b58e58`
  - `project_name`: string - Name of the project e.g. `Children’s Mercy Hospital - Labor & Delivery Unit`
  - `project_number`: string - Project number e.g. `8203824`
  - `category_name`: string - Name of the assignment category (if applicable) e.g. `Apprentice`
  - `category_id`: string - Unique identifier for the assignment category (if applicable) e.g. `0c29fe4a-c183-4bec-a509-f8b7c694804c`
  - `subcategory_name`: string - Name of the assignment subcategory (if applicable) e.g. `North Lot`
  - `subcategory_id`: string - Unique identifier for the assignment subcategory (if applicable) e.g. `f87cbeb6-84e0-428d-b231-139e8e7180f4`
  - `work_days`: object - Workdays for the assignment, where 0 represents Sunday and 6 represents Saturday
    - `0`: boolean e.g. `false`
    - `1`: boolean e.g. `true`
    - `2`: boolean e.g. `true`
    - `3`: boolean e.g. `true`
    - `4`: boolean e.g. `true`
    - `5`: boolean e.g. `true`
    - `6`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/assignments

**Get Person Assignments**
Returns the Resource Planning Assignment data for the given company and person

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `dayRange` [query] string (required) - A value specifying how many days forward you would like to get assignments for from the specified startDay. Assignments whose start_day falls within the given range will be returned in the response. The startDay param...
- `start_day` [query] string (required) - The starting day to filter assignments by.

Response 200 (application/json): array of object

- `data`: array of object - List of assignments
  - `id`: string - Unique identifier for the assignment e.g. `6bf79bbe-2038-423f-8fee-f890abcbd929`
  - `created_at`: string - Timestamp of when the assignment was created (string format) e.g. `06/24/18`
  - `start_day`: string - Start date of the assignment (string format) e.g. `06/25/18`
  - `start_time`: string - Start time of the assignment e.g. `7:30 AM`
  - `end_day`: string - End date of the assignment (string format) e.g. `06/29/18`
  - `end_time`: string - End time of the assignment e.g. `3:30 PM`
  - `updated_at`: string - Timestamp of when the assignment was last updated (string format)
  - `state`: object - Status of the assignment
    - `abbreviation`: string - Abbreviated state of the assignment e.g. `COMP`
    - `color`: string - Status color code e.g. `#FFFB23`
    - `id`: string - Unique identifier for the state e.g. `c80148f1-1f29-4595-b552-08fbf16fdb30`
    - `name`: string - Full name of the state e.g. `Complete`
  - `person_id`: string - Unique identifier for the person assigned e.g. `ce7da5a6-c908-4506-a251-16fcbf5e96d7`
  - `person_name`: string - Full name of the assigned person e.g. `Aaron Kelly`
  - `project_id`: string - Unique identifier for the project e.g. `446e7813-02f0-4629-b2b7-81dd942a8941`
  - `project_name`: string - Name of the project e.g. `Airport Concourse`
  - `project_color`: string - The color associated with the project e.g. `#53A9FF`
  - `job_number`: string - Job number associated with the project e.g. `112233`
  - `category_name`: string - Name of the assignment category (if applicable)
  - `category_id`: string - Unique identifier for the assignment category (if applicable)
  - `subcategory_name`: string - Name of the assignment subcategory (if applicable)
  - `subcategory_id`: string - Unique identifier for the assignment subcategory (if applicable)
  - `work_days`: object - Workdays for the assignment, where 0 represents Sunday and 6 represents Saturday
    - `0`: boolean e.g. `false`
    - `1`: boolean e.g. `true`
    - `2`: boolean e.g. `true`
    - `3`: boolean e.g. `true`
    - `4`: boolean e.g. `true`
    - `5`: boolean e.g. `true`
    - `6`: boolean e.g. `false`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Groups

Resource id: `groups`. Raw spec: `../openapi-raw/groups.json`. Web: https://developers.procore.com/reference/rest/groups?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups

**Get All Company Groups**
Gets all Groups in a given Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Group. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
- `name`: string - The name of the Group. e.g. `West Coast - HQ`
- `timezone`: string - The timezone associated with the Group. e.g. `America/Los_Angeles`
- `color`: string - Hexadecimal color code for the Group. e.g. `#53A9FF`
- `address_1`: string - The first part of the Group's address. e.g. `1111 S Figueroa St`
- `address_2`: string - The second part of the Group's address (e.g., Building, Suite, Unit). e.g. `Building 3`
- `city_town`: string - The city or town where the Group is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Group is located. e.g. `CA`
- `zipcode`: string - The postal/zip code for the Group. e.g. `90015`
- `country`: string - The country where the Group is located. e.g. `United States`
- `contact_name`: string - The primary Point of Contact (P.O.C.) for the Group. e.g. `John Doe`
- `contact_number`: string - Phone number for the Group’s Point of Contact. e.g. `1-213-444-3535`
- `contact_email`: string(email) - Email address for the Group’s Point of Contact. e.g. `j.doe@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups

**Create a Single Group**
Creates a single Group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Request body (application/json):

- `name`: string (required) - Group Name. e.g. `Engineering Team`
- `timezone`: string (required) - The default Timezone for scheduling outbound messages from projects in this group that don't specify their own Timezone. Example format: America/Chicago. e.g. `America/Chicago`
- `color`: string - Hexadecimal color code for the Group. Can be helpful for categorization. Example: #53A9FF. e.g. `#53A9FF`
- `address_1`: string - The first part of the Group's address. e.g. `123 Main St`
- `address_2`: string - The second part of the Group's address (e.g., Apartment, Suite, Unit). e.g. `Suite 400`
- `city_town`: string - The City or Town for the Group. e.g. `Chicago`
- `state_province`: string - The State or Province for the Group. e.g. `Illinois`
- `zipcode`: string - Zip or Postal Code for the Group. e.g. `60601`
- `country`: string - The Country for the Group. e.g. `United States`
- `contact_name`: string - The Point of Contact (P.O.C.) name for the Group. e.g. `John Doe`
- `contact_phone`: string - Phone number for the Group's Point of Contact. Must include country and area code. e.g. `+1-312-555-1234`
- `contact_email`: string(email) - Email address for the Group's Point of Contact. e.g. `johndoe@example.com`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the newly created Group. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}

**Get a Single Group**
Get the single Group in a given ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Group. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
- `name`: string - The name of the Group. e.g. `West Coast - HQ`
- `timezone`: string - The timezone associated with the Group. e.g. `America/Los_Angeles`
- `color`: string - Hexadecimal color code for the Group. e.g. `#53A9FF`
- `address_1`: string - The first part of the Group's address. e.g. `1111 S Figueroa St`
- `address_2`: string - The second part of the Group's address (e.g., Building, Suite, Unit). e.g. `Building 3`
- `city_town`: string - The city or town where the Group is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Group is located. e.g. `CA`
- `zipcode`: string - The postal/zip code for the Group. e.g. `90015`
- `country`: string - The country where the Group is located. e.g. `United States`
- `contact_name`: string - The primary Point of Contact (P.O.C.) for the Group. e.g. `John Doe`
- `contact_number`: string - Phone number for the Group’s Point of Contact. e.g. `1-213-444-3535`
- `contact_email`: string(email) - Email address for the Group’s Point of Contact. e.g. `j.doe@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}

**Update a Single Group**
Update the single Group in a given ID and body

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group

Request body (application/json):

- `name`: string (required) - Group Name. e.g. `Engineering Team`
- `timezone`: string (required) - The default Timezone for scheduling outbound messages from projects in this group that don't specify their own Timezone. Example format: America/Chicago. e.g. `America/Chicago`
- `color`: string - Hexadecimal color code for the Group. Can be helpful for categorization. Example: #53A9FF. e.g. `#53A9FF`
- `address_1`: string - The first part of the Group's address. e.g. `123 Main St`
- `address_2`: string - The second part of the Group's address (e.g., Apartment, Suite, Unit). e.g. `Suite 400`
- `city_town`: string - The City or Town for the Group. e.g. `Chicago`
- `state_province`: string - The State or Province for the Group. e.g. `Illinois`
- `zipcode`: string - Zip or Postal Code for the Group. e.g. `60601`
- `country`: string - The Country for the Group. e.g. `United States`
- `contact_name`: string - The Point of Contact (P.O.C.) name for the Group. e.g. `John Doe`
- `contact_phone`: string - Phone number for the Group's Point of Contact. Must include country and area code. e.g. `+1-312-555-1234`
- `contact_email`: string(email) - Email address for the Group's Point of Contact. e.g. `johndoe@example.com`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Group. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
- `name`: string - The name of the Group. e.g. `West Coast - HQ`
- `timezone`: string - The timezone associated with the Group. e.g. `America/Los_Angeles`
- `color`: string - Hexadecimal color code for the Group. e.g. `#53A9FF`
- `address_1`: string - The first part of the Group's address. e.g. `1111 S Figueroa St`
- `address_2`: string - The second part of the Group's address (e.g., Building, Suite, Unit). e.g. `Building 3`
- `city_town`: string - The city or town where the Group is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Group is located. e.g. `CA`
- `zipcode`: string - The postal/zip code for the Group. e.g. `90015`
- `country`: string - The country where the Group is located. e.g. `United States`
- `contact_name`: string - The primary Point of Contact (P.O.C.) for the Group. e.g. `John Doe`
- `contact_number`: string - Phone number for the Group’s Point of Contact. e.g. `1-213-444-3535`
- `contact_email`: string(email) - Email address for the Group’s Point of Contact. e.g. `j.doe@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}

**Delete a Single Group**
Delete a single Group in a given ID. It should be noted that you can not delete a Group that has active Projects or People belonging to it. This is to prevent those entities from being "stranded" in the system if the group you are trying to delete is the single group they belong to. When you try to delete a Group that can not be deleted for this reason, you will be provided with a list of Project and People IDs that belong to this group so you can remove this group ID from those entities if you choose.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Job Titles

Resource id: `job-titles`. Raw spec: `../openapi-raw/job-titles.json`. Web: https://developers.procore.com/reference/rest/job-titles?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/job-titles

**Get all Job Titles in the Company**
Returns an array of all Job Titles within the specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Job Title. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
- `name`: string - Name of the Job Title. e.g. `Foreman`
- `group_ids`: array of string(uuid) - List of Group UUIDs where this Job Title is available. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "ea8fac53-e05f-49bc-a630-dd0c7739570b"]`
- `globally_accessible`: boolean - Controls whether the Job Title is globally available to all current and future Groups. e.g. `true`
- `color`: string - Hexadecimal color code for the Job Title. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `type`: string enum[hourly, salaried] - Specifies the Job Title type. - `hourly` - Hourly wage-based job title. - `salaried` - Fixed salary job title. e.g. `hourly`
- `hourly_rate`: number - Hourly wage rate for the Job Title. Required if type is `hourly`. e.g. `45`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/job-titles

**Create a Job Title**
Creates a new Job Title in the specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Request body (application/json):

- `name`: string (required) - The name of the Job Title. e.g. `Foreman`
- `group_ids`: array of string(uuid) (required) - Array of UUIDs for which Groups this Job Title should be available to. If `globally_accessible` is set to `true`, this value can be an empty array. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "2d2ad78e-c6de-467e-8413-c616b55294a5"]`
- `globally_accessible`: boolean (required) - Controls whether the Job Title should be globally available to all current and future Groups. e.g. `true`
- `color`: string - Hexadecimal color code for the Job Title. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `type`: string enum[salaried, hourly] - Indicates whether the Job Title is salaried or hourly. e.g. `hourly`
- `hourly_rate`: number - The rate value that will be factored into cost calculations for any person who has this job title applied and doesn't already have a standalone hourly wage value. This is also handy for costing manpower requests when ... e.g. `45`

Response 200 (application/json): object

- `id`: string(uuid) - The unique identifier of the Job Title. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/job-titles/{job_title_id}

**Get a Single Job Title**
Returns details for a specific Job Title in a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `job_title_id` [path] string(uuid) (required) - Unique identifier for the Job Title.

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Job Title. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
- `name`: string - Name of the Job Title. e.g. `Foreman`
- `group_ids`: array of string(uuid) - List of Group UUIDs where this Job Title is available. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "ea8fac53-e05f-49bc-a630-dd0c7739570b"]`
- `globally_accessible`: boolean - Controls whether the Job Title is globally available to all current and future Groups. e.g. `true`
- `color`: string - Hexadecimal color code for the Job Title. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `type`: string enum[hourly, salaried] - Specifies the Job Title type. - `hourly` - Hourly wage-based job title. - `salaried` - Fixed salary job title. e.g. `hourly`
- `hourly_rate`: number - Hourly wage rate for the Job Title. Required if type is `hourly`. e.g. `45`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/job-titles/{job_title_id}

**Update a Job Title**
Updates a Job Title given a company ID and job title ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `job_title_id` [path] string(uuid) (required) - Unique identifier for the Job Title.

Request body (application/json):

- `name`: string (required) - Name of the Job Title. e.g. `Foreman`
- `globally_accessible`: boolean - Controls whether the Job Title is globally available to all current and future Groups. e.g. `true`
- `color`: string - Hexadecimal color code for the Job Title. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `type`: string enum[hourly, salaried] (required) - Specifies the Job Title type. - `hourly` - Hourly wage-based job title. - `salaried` - Fixed salary job title. e.g. `hourly`
- `hourly_rate`: number - Hourly wage rate for the Job Title. Required if type is `hourly`. e.g. `45`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Job Title. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
- `name`: string - Name of the Job Title. e.g. `Foreman`
- `group_ids`: array of string(uuid) - List of Group UUIDs where this Job Title is available. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "ea8fac53-e05f-49bc-a630-dd0c7739570b"]`
- `globally_accessible`: boolean - Controls whether the Job Title is globally available to all current and future Groups. e.g. `true`
- `color`: string - Hexadecimal color code for the Job Title. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `type`: string enum[hourly, salaried] - Specifies the Job Title type. - `hourly` - Hourly wage-based job title. - `salaried` - Fixed salary job title. e.g. `hourly`
- `hourly_rate`: number - Hourly wage rate for the Job Title. Required if type is `hourly`. e.g. `45`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/job-titles/{job_title_id}

**Delete a Job Title**
Deletes a Job Title given a company ID and job title ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `job_title_id` [path] string(uuid) (required) - Unique identifier for the Job Title.

Response 200 (application/json): object

- `id`: string(uuid) - The unique identifier of the Job Title. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/job-titles

**Get all Job Titles belonging to a Group**
Returns an array of Job Titles assigned to a specific Group.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Job Title. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
- `name`: string - Name of the Job Title. e.g. `Foreman`
- `group_ids`: array of string(uuid) - List of Group UUIDs where this Job Title is available. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "ea8fac53-e05f-49bc-a630-dd0c7739570b"]`
- `globally_accessible`: boolean - Controls whether the Job Title is globally available to all current and future Groups. e.g. `true`
- `color`: string - Hexadecimal color code for the Job Title. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `type`: string enum[hourly, salaried] - Specifies the Job Title type. - `hourly` - Hourly wage-based job title. - `salaried` - Fixed salary job title. e.g. `hourly`
- `hourly_rate`: number - Hourly wage rate for the Job Title. Required if type is `hourly`. e.g. `45`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/job-titles/{job_title_id}/groups

**Make Job Title available to Group**
Makes a Job Title available to a Group it was not previously available to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `job_title_id` [path] string(uuid) (required) - Unique identifier for the Job Title.

Request body (application/json):

- `group_id`: string(uuid) (required) - UUID of the Group the Job Title is being added to or removed from. e.g. `ea8fac53-e05f-49bc-a630-dd0c7739570b`

Response 200 (application/json): object

- `group_ids`: array of string(uuid) - Array of unique identifiers for Groups. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "2d2ad78e-c6de-467e-8413-c616b55294a...`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/job-titles/{job_title_id}/groups

**Remove Job Title from being available to Group**
Removes a Job Title from a Group it was previously assigned to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `job_title_id` [path] string(uuid) (required) - Unique identifier for the Job Title.

Request body (application/json):

- `group_id`: string(uuid) (required) - UUID of the Group the Job Title is being added to or removed from. e.g. `ea8fac53-e05f-49bc-a630-dd0c7739570b`

Response 200 (application/json): object

- `group_ids`: array of string(uuid) - Array of unique identifiers for Groups. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "2d2ad78e-c6de-467e-8413-c616b55294a...`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## People

Resource id: `people`. Raw spec: `../openapi-raw/people.json`. Web: https://developers.procore.com/reference/rest/people?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/people

**Get all People belonging to a Company**
Returns array of Person objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...
- `first_name` [query] string - Filter results by the exact first name of the Person.
- `last_name` [query] string - Filter results by the exact last name of the Person.
- `email` [query] string(email) - Filter results by the exact email address of the Person.
- `employee_number` [query] string - Filter results by the exact employee number of the Person.
- `custom_fields_integration_name` [query] string - Filter results by a **Custom Field's** `integration_name`. This allows searching based on custom-defined attributes in the system. Example usage: `/v2/companies/{company_id}/...?my_custom_field=northwest`
- `created_at` [query] string(date) - Filters items based on their creation timestamp. Accepts an ISO 8601 date string.
- `created_before` [query] string(date) - Filters items created on or before the specified date (inclusive). Accepts an ISO 8601 date string.
- `created_after` [query] string(date) - Filters items created on or after the specified date (inclusive). Accepts an ISO 8601 date string.
- `updated_at` [query] string(date) - Filters items based on their last updated timestamp. Accepts an ISO 8601 date string.
- `updated_before` [query] string(date) - Filters items updated on or before the specified date (inclusive). Accepts an ISO 8601 date string.
- `updated_after` [query] string(date) - Filters items updated on or after the specified date (inclusive). Accepts an ISO 8601 date string.

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Person. e.g. `174b9d85-c5d0-407f-83c6-fb0fb1375bd7`
- `name`: object - First and Last Name of the Person.
  - `first`: string - First Name. e.g. `Anna`
  - `last`: string - Last Name. e.g. `Richardson`
- `company_id`: string(uuid) - Unique identifier for the Company. e.g. `c2c32240-311b-4993-8263-243aa8ba000e`
- `is_user`: boolean - Determines if the Person can log into the app. e.g. `false`
- `is_assignable`: boolean - Determines if the Person can be assigned to tasks. e.g. `true`
- `status`: string enum[active, inactive] - Status of the Person. e.g. `active`
- `email`: string(email) - The email associated with the Person. e.g. `nolak@example.com`
- `phone`: string - The Person's phone number, if available.
- `can_recieve_email`: boolean - Determines if the Person can receive email notifications. e.g. `true`
- `can_recieve_sms`: boolean - Determines if the Person can receive SMS notifications. e.g. `false`
- `group_ids`: array of string(uuid) - List of Group IDs the Person belongs to. e.g. `["9662f64f-74f4-478b-87a1-67fcbf14e803", "9be574ab-fbe3-4839-a3b4-2e4bccb617a...`
- `job_title_id`: string(uuid) - UUID reference to the Person’s Job Title. e.g. `8cf15293-6e3f-4382-931a-9dd5c14bd289`
- `hourly_wage`: number - Hourly wage rate for the Person. e.g. `35`
- `employee_number`: string - Internal employee identifier. e.g. `123-a234s-456`
- `hired_date`: string - Date the Person was hired. e.g. `2017-04-26T13:45:15.919Z`
- `dob`: string - Date of birth of the Person. e.g. `2015-02-01T14:18:35.919Z`
- `is_male`: boolean - Specifies if the Person identifies as male. e.g. `false`
- `address_1`: string - First part of the Person's address. e.g. `1510 Walnut St`
- `address_2`: string - Second part of the Person's address, if applicable.
- `city_town`: string - The city or town where the Person is located. e.g. `Kansas City`
- `state_province`: string - The state or province where the Person is located. e.g. `MO`
- `zipcode`: string - The postal/zip code of the Person. e.g. `66213`
- `country`: string - The country where the Person is located. e.g. `United States`
- `emergency_contact_name`: string - Name of the Person’s emergency contact.
- `emergency_contact_number`: string - Phone number of the emergency contact.
- `emergency_contact_email`: string(email) - Email address of the emergency contact.
- `emergency_contact_relation`: string - The relationship between the Person and their emergency contact.
- `tag_instances`: array of object - List of tags applied to the Person.
  - `id`: string(uuid) - Unique identifier for the Tag Instance. e.g. `3b24a193-202c-40f2-9b10-9f798a0ac3f9`
  - `tag_id`: string(uuid) - UUID reference to the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
  - `expr_date`: string - Expiration date for the Tag, if applicable. e.g. `2017-11-17T15:21:52.906Z`
- `created_at`: string - Timestamp of when the Person was created. e.g. `2017-11-17T13:45:15.680Z`
- `updated_at`: string - Timestamp of when the Person was last updated. e.g. `2017-10-29T00:00:00.000Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/people

**Create a Person**
Creates a Person for a given company ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Request body (application/json):

- `first_name`: string (required) - First Name of the Person. e.g. `John`
- `last_name`: string (required) - Last Name of the Person. e.g. `Doe`
- `is_user`: boolean (required) - Determines if the Person can log into the app. e.g. `true`
- `is_assignable`: boolean (required) - Determines if the Person can be assigned to tasks. e.g. `true`
- `status`: string enum[active, inactive] (required) - The status of the Person. `active` means the person is visible in all pages, while `inactive` hides the person unless filtered. Inactive People do not count against billing plans. e.g. `active`
- `group_ids`: array of string(uuid) (required) - Array of UUIDs representing the Groups this Person belongs to. Can be empty if the Person is an Admin. e.g. `["550e8400-e29b-41d4-a716-446655440000", "4f7e9e5b-d4f5-4a73-8a97-4e6b72fb5c19"]`
- `email`: string(email) - The email that the Person will log in with. Required if `is_user` is true. e.g. `johndoe@example.com`
- `permission_level_id`: string(uuid) - UUID of the Permission Level assigned to the Person. e.g. `94186279-fa66-42c6-a2ca-f44dde84f584`
- `no_invite`: boolean - If `true`, the Person will be created with all user properties but will not receive an invite until triggered manually by an Admin. e.g. `false`
- `password`: string - Password for logging in. If not provided, an email will be sent to the user to set their password. Must be at least 8 characters with one uppercase, one lowercase, and one number. e.g. `SecurePass123!`
- `notification_profile_id`: string(uuid) - UUID of the Notification Profile for the user. e.g. `cc8e24bc-42b6-41f7-8a7b-0de98a09e97f`
- `phone`: string - The Person's phone number, including country and area code. Must be unique among all registered People. **Note:** Pass `null` or exclude the field if the Person should not have a phone number. e.g. `+1-213-555-1234`
- `can_receive_sms`: boolean - Determines if the Person can receive SMS notifications. e.g. `false`
- `can_receive_email`: boolean - Determines if the Person can receive email notifications. e.g. `false`
- `can_receive_mobile`: boolean - Determines if the Person can receive mobile push notifications if they have the app installed. e.g. `true`
- `address_1`: string - First part of the Person's address. e.g. `1111 S Figueroa St`
- `address_2`: string - Second part of the Person's address (e.g., Apartment, Suite, Unit). e.g. `Building 3`
- `city_town`: string - The city or town where the Person is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Person is located. e.g. `CA`
- `zipcode`: string - The postal/zip code of the Person. e.g. `90015`
- `country`: string - The country where the Person is located. e.g. `United States`
- `job_title_id`: string(uuid) - UUID reference to a Job Title in the LaborChart System. e.g. `f7c3b0e2-67e3-4238-95fc-1e913156fbdf`
- `hourly_wage`: number - Hourly wage rate for the Person. Used for automatic spend tracking. e.g. `45.75`
- `employee_number`: string - Internal employee identifier. e.g. `EMP123456`
- `emergency_contact_name`: string - Name of the Person's emergency contact. e.g. `Jane Doe`
- `emergency_contact_number`: string - Phone number of the emergency contact. e.g. `+1-213-555-5678`
- `emergency_contact_email`: string(email) - Email address of the emergency contact. e.g. `jane.doe@example.com`
- `emergency_contact_relation`: string - The relationship between the Person and their emergency contact. e.g. `Spouse`
- `dob`: string(date) - Date of birth of the Person. Accepts ISO Date String, UTC Date String, or MS Numeric Epoch Time. e.g. `1990-05-15`
- `hired_date`: string(date) - Date the Person was hired. Accepts ISO Date String, UTC Date String, or MS Numeric Epoch Time. e.g. `2020-01-10`
- `is_male`: boolean - Specifies if the Person identifies as male. e.g. `true`
- `language`: string enum[english] - Language preference. Currently only `english` is supported. e.g. `english`
- `tag_instances`: array of object - List of tags applied to the Person. Tags can require expiration dates.
  - `tag_id`: string(uuid) - UUID reference to the Tag. e.g. `2d2ad78e-c6de-467e-8413-c616b55294a5`
  - `expr_date`: string(date-time) - Expiration date for the Tag, if applicable. e.g. `2025-12-31T23:59:59Z`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}

**Get a Single Person**
Returns single Person object.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Person. e.g. `174b9d85-c5d0-407f-83c6-fb0fb1375bd7`
- `name`: object - First and Last Name of the Person.
  - `first`: string - First Name. e.g. `Anna`
  - `last`: string - Last Name. e.g. `Richardson`
- `company_id`: string(uuid) - Unique identifier for the Company. e.g. `c2c32240-311b-4993-8263-243aa8ba000e`
- `is_user`: boolean - Determines if the Person can log into the app. e.g. `false`
- `is_assignable`: boolean - Determines if the Person can be assigned to tasks. e.g. `true`
- `status`: string enum[active, inactive] - Status of the Person. e.g. `active`
- `email`: string(email) - The email associated with the Person. e.g. `nolak@example.com`
- `phone`: string - The Person's phone number, if available.
- `can_recieve_email`: boolean - Determines if the Person can receive email notifications. e.g. `true`
- `can_recieve_sms`: boolean - Determines if the Person can receive SMS notifications. e.g. `false`
- `group_ids`: array of string(uuid) - List of Group IDs the Person belongs to. e.g. `["9662f64f-74f4-478b-87a1-67fcbf14e803", "9be574ab-fbe3-4839-a3b4-2e4bccb617a...`
- `job_title_id`: string(uuid) - UUID reference to the Person’s Job Title. e.g. `8cf15293-6e3f-4382-931a-9dd5c14bd289`
- `hourly_wage`: number - Hourly wage rate for the Person. e.g. `35`
- `employee_number`: string - Internal employee identifier. e.g. `123-a234s-456`
- `hired_date`: string - Date the Person was hired. e.g. `2017-04-26T13:45:15.919Z`
- `dob`: string - Date of birth of the Person. e.g. `2015-02-01T14:18:35.919Z`
- `is_male`: boolean - Specifies if the Person identifies as male. e.g. `false`
- `address_1`: string - First part of the Person's address. e.g. `1510 Walnut St`
- `address_2`: string - Second part of the Person's address, if applicable.
- `city_town`: string - The city or town where the Person is located. e.g. `Kansas City`
- `state_province`: string - The state or province where the Person is located. e.g. `MO`
- `zipcode`: string - The postal/zip code of the Person. e.g. `66213`
- `country`: string - The country where the Person is located. e.g. `United States`
- `emergency_contact_name`: string - Name of the Person’s emergency contact.
- `emergency_contact_number`: string - Phone number of the emergency contact.
- `emergency_contact_email`: string(email) - Email address of the emergency contact.
- `emergency_contact_relation`: string - The relationship between the Person and their emergency contact.
- `tag_instances`: array of object - List of tags applied to the Person.
  - `id`: string(uuid) - Unique identifier for the Tag Instance. e.g. `3b24a193-202c-40f2-9b10-9f798a0ac3f9`
  - `tag_id`: string(uuid) - UUID reference to the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
  - `expr_date`: string - Expiration date for the Tag, if applicable. e.g. `2017-11-17T15:21:52.906Z`
- `created_at`: string - Timestamp of when the Person was created. e.g. `2017-11-17T13:45:15.680Z`
- `updated_at`: string - Timestamp of when the Person was last updated. e.g. `2017-10-29T00:00:00.000Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}

**Update a Person**
Updates a Person for a given company and person ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Request body (application/json):

- `first_name`: string - First Name of the Person. e.g. `John`
- `last_name`: string - Last Name of the Person. e.g. `Doe`
- `is_assignable`: boolean - Determines if the Person can be assigned to tasks. e.g. `true`
- `status`: string enum[active, inactive] - The status of the Person. `active` means the person is visible in all pages, while `inactive` hides the person unless filtered. Inactive People do not count against billing plans. e.g. `active`
- `group_ids`: array of string(uuid) - Array of UUIDs representing the Groups this Person belongs to. **Cannot be empty** for an assignable resource or a non-admin Person. e.g. `["550e8400-e29b-41d4-a716-446655440000", "4f7e9e5b-d4f5-4a73-8a97-4e6b72fb5c19"]`
- `email`: string(email) - The email that the Person will log in with. **Required if updating `is_user` to `true`**. Must be unique across the company. e.g. `johndoe@example.com`
- `permission_level_id`: string(uuid) - UUID of the Permission Level assigned to the Person. **Required when setting `is_user: true`**. e.g. `94186279-fa66-42c6-a2ca-f44dde84f584`
- `notification_profile_id`: string(uuid) - UUID of the Notification Profile for the user. e.g. `cc8e24bc-42b6-41f7-8a7b-0de98a09e97f`
- `phone`: string - The Person's phone number, including country and area code. Must be **unique** among all registered People. e.g. `+1-213-555-1234`
- `can_receive_sms`: boolean - Determines if the Person can receive SMS notifications. e.g. `false`
- `can_receive_email`: boolean - Determines if the Person can receive email notifications. e.g. `false`
- `can_receive_mobile`: boolean - Determines if the Person can receive mobile push notifications if they have the app installed. e.g. `true`
- `address_1`: string - First part of the Person's address. e.g. `1111 S Figueroa St`
- `address_2`: string - Second part of the Person's address (e.g., Apartment, Suite, Unit). e.g. `Building 3`
- `city_town`: string - The city or town where the Person is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Person is located. e.g. `CA`
- `zipcode`: string - The postal/zip code of the Person. e.g. `90015`
- `country`: string - The country where the Person is located. e.g. `United States`
- `job_title_id`: string(uuid) - UUID reference to a Job Title in the LaborChart System. e.g. `f7c3b0e2-67e3-4238-95fc-1e913156fbdf`
- `hourly_wage`: number - Hourly wage rate for the Person. Used for automatic spend tracking. e.g. `45.75`
- `employee_number`: string - Internal employee identifier. e.g. `EMP123456`
- `emergency_contact_name`: string - Name of the Person's emergency contact. e.g. `Jane Doe`
- `emergency_contact_number`: string - Phone number of the emergency contact. e.g. `+1-213-555-5678`
- `emergency_contact_email`: string(email) - Email address of the emergency contact. e.g. `jane.doe@example.com`
- `emergency_contact_relation`: string - The relationship between the Person and their emergency contact. e.g. `Spouse`
- `dob`: string(date) - Date of birth of the Person. Accepts ISO Date String, UTC Date String, or MS Numeric Epoch Time. e.g. `1990-05-15`
- `hired_date`: string(date) - Date the Person was hired. Accepts ISO Date String, UTC Date String, or MS Numeric Epoch Time. e.g. `2020-01-10`
- `is_male`: boolean - Specifies if the Person identifies as male. e.g. `true`
- `language`: string enum[english] - Language preference. Currently only `english` is supported. e.g. `english`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Person. e.g. `174b9d85-c5d0-407f-83c6-fb0fb1375bd7`
- `name`: object - First and Last Name of the Person.
  - `first`: string - First Name. e.g. `Anna`
  - `last`: string - Last Name. e.g. `Richardson`
- `company_id`: string(uuid) - Unique identifier for the Company. e.g. `c2c32240-311b-4993-8263-243aa8ba000e`
- `is_user`: boolean - Determines if the Person can log into the app. e.g. `false`
- `is_assignable`: boolean - Determines if the Person can be assigned to tasks. e.g. `true`
- `status`: string enum[active, inactive] - Status of the Person. e.g. `active`
- `email`: string(email) - The email associated with the Person. e.g. `nolak@example.com`
- `phone`: string - The Person's phone number, if available.
- `can_recieve_email`: boolean - Determines if the Person can receive email notifications. e.g. `true`
- `can_recieve_sms`: boolean - Determines if the Person can receive SMS notifications. e.g. `false`
- `group_ids`: array of string(uuid) - List of Group IDs the Person belongs to. e.g. `["9662f64f-74f4-478b-87a1-67fcbf14e803", "9be574ab-fbe3-4839-a3b4-2e4bccb617a...`
- `job_title_id`: string(uuid) - UUID reference to the Person’s Job Title. e.g. `8cf15293-6e3f-4382-931a-9dd5c14bd289`
- `hourly_wage`: number - Hourly wage rate for the Person. e.g. `35`
- `employee_number`: string - Internal employee identifier. e.g. `123-a234s-456`
- `hired_date`: string - Date the Person was hired. e.g. `2017-04-26T13:45:15.919Z`
- `dob`: string - Date of birth of the Person. e.g. `2015-02-01T14:18:35.919Z`
- `is_male`: boolean - Specifies if the Person identifies as male. e.g. `false`
- `address_1`: string - First part of the Person's address. e.g. `1510 Walnut St`
- `address_2`: string - Second part of the Person's address, if applicable.
- `city_town`: string - The city or town where the Person is located. e.g. `Kansas City`
- `state_province`: string - The state or province where the Person is located. e.g. `MO`
- `zipcode`: string - The postal/zip code of the Person. e.g. `66213`
- `country`: string - The country where the Person is located. e.g. `United States`
- `emergency_contact_name`: string - Name of the Person’s emergency contact.
- `emergency_contact_number`: string - Phone number of the emergency contact.
- `emergency_contact_email`: string(email) - Email address of the emergency contact.
- `emergency_contact_relation`: string - The relationship between the Person and their emergency contact.
- `tag_instances`: array of object - List of tags applied to the Person.
  - `id`: string(uuid) - Unique identifier for the Tag Instance. e.g. `3b24a193-202c-40f2-9b10-9f798a0ac3f9`
  - `tag_id`: string(uuid) - UUID reference to the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
  - `expr_date`: string - Expiration date for the Tag, if applicable. e.g. `2017-11-17T15:21:52.906Z`
- `created_at`: string - Timestamp of when the Person was created. e.g. `2017-11-17T13:45:15.680Z`
- `updated_at`: string - Timestamp of when the Person was last updated. e.g. `2017-10-29T00:00:00.000Z`

Error responses: 304, 400, 401, 403, 404, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}

**Delete a Person**
Deletes a Person for a given company and person ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/user

**Enable a Person to Log In**
Enable a Person to log in after they have already been created

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Request body (application/json):

- `permission_level_id`: string(uuid) (required) - UUID of the Permission Level that defines the user's access. e.g. `94186279-fa66-42c6-a2ca-f44dde84f584`
- `email`: string(email) - The email the Person will use to log in. If the Person already has an email in LaborChart, this can be omitted. If no email is on record, this becomes required. e.g. `johndoe@example.com`
- `password`: string - The password the Person will use to log in. If omitted, the Person will receive an email from LaborChart instructing them to set up a password. If provided, no email will be sent. Passwords must meet complexity requir... e.g. `SecurePass123!`
- `no_invite`: boolean - If `true`, the Person will be created with all user properties but will not receive an invitation to the platform. Admins can manually trigger an invitation from the user's profile. e.g. `false`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/user

**Revoke a Person's Login**
Revoke a Person's login but leave them in as an assignable resource in the system

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/tags

**Add Tag Instance to Person**
Adds a Tag Instance to Person

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Request body (application/json):

- `tag_id`: string(uuid) (required) - UUID reference to the **Tag entity** in the LaborChart system. This identifies the Tag being assigned to the Person. **Tag ID vs Tag Instance ID** - `tag_id` references the **Tag entity** in your system. - `id` (Tag I... e.g. `94186279-fa66-42c6-a2ca-f44dde84f584`
- `expr_date`: integer(int64) - Expiration date for the tag in **milliseconds since epoch** (Unix timestamp). Required if the tag type mandates an expiration date. e.g. `1511228654337`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/tags/{tag_instance_id}

**Remove Tag Instance from Person**
Removes a Tag Instance from a Person

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `tag_instance_id` [path] integer (required) - Unique identifier for the tag instance

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for a tag instance. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/groups

**Add Person to a Group**
Grant a Person access to or to make them available to a new Group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Request body (application/json):

- `group_id`: string(uuid) (required) - UUID reference to the Group being assigned. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Response 200 (application/json): object

- `group_ids`: array of string(uuid) - List of UUIDs representing the assigned Groups. e.g. `["ea8fac53-e05f-49bc-a630-dd0c7739570b", "aeee8fc5-b8ee-4bf0-bca9-86f751f9979...`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/groups/{group_id}

**Remove a Person from a Group**
Removes a person from a given group. Note that when removing the last group_id, the Group IDs can not be empty for an assignable resource or a non-admin person. Therefore, the removing the last group id from an assignable resource or a non-admin person is not allowed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `group_id` [path] integer (required) - Unique identifier for the group

Response 200 (application/json): object

- `group_ids`: array of string(uuid) - List of UUIDs representing the assigned Groups. e.g. `["ea8fac53-e05f-49bc-a630-dd0c7739570b", "aeee8fc5-b8ee-4bf0-bca9-86f751f9979...`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/groups/people

**Get all People belonging to a Group**
Returns array of Person objects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...
- `first_name` [query] string - Filter results by the exact first name of the Person.
- `last_name` [query] string - Filter results by the exact last name of the Person.
- `email` [query] string(email) - Filter results by the exact email address of the Person.
- `employee_number` [query] string - Filter results by the exact employee number of the Person.
- `custom_fields_integration_name` [query] string - Filter results by a **Custom Field's** `integration_name`. This allows searching based on custom-defined attributes in the system. Example usage: `/v2/companies/{company_id}/...?my_custom_field=northwest`
- `created_at` [query] string(date) - Filters items based on their creation timestamp. Accepts an ISO 8601 date string.
- `created_before` [query] string(date) - Filters items created on or before the specified date (inclusive). Accepts an ISO 8601 date string.
- `created_after` [query] string(date) - Filters items created on or after the specified date (inclusive). Accepts an ISO 8601 date string.
- `updated_at` [query] string(date) - Filters items based on their last updated timestamp. Accepts an ISO 8601 date string.
- `updated_before` [query] string(date) - Filters items updated on or before the specified date (inclusive). Accepts an ISO 8601 date string.
- `updated_after` [query] string(date) - Filters items updated on or after the specified date (inclusive). Accepts an ISO 8601 date string.

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Person. e.g. `174b9d85-c5d0-407f-83c6-fb0fb1375bd7`
- `name`: object - First and Last Name of the Person.
  - `first`: string - First Name. e.g. `Anna`
  - `last`: string - Last Name. e.g. `Richardson`
- `company_id`: string(uuid) - Unique identifier for the Company. e.g. `c2c32240-311b-4993-8263-243aa8ba000e`
- `is_user`: boolean - Determines if the Person can log into the app. e.g. `false`
- `is_assignable`: boolean - Determines if the Person can be assigned to tasks. e.g. `true`
- `status`: string enum[active, inactive] - Status of the Person. e.g. `active`
- `email`: string(email) - The email associated with the Person. e.g. `nolak@example.com`
- `phone`: string - The Person's phone number, if available.
- `can_recieve_email`: boolean - Determines if the Person can receive email notifications. e.g. `true`
- `can_recieve_sms`: boolean - Determines if the Person can receive SMS notifications. e.g. `false`
- `group_ids`: array of string(uuid) - List of Group IDs the Person belongs to. e.g. `["9662f64f-74f4-478b-87a1-67fcbf14e803", "9be574ab-fbe3-4839-a3b4-2e4bccb617a...`
- `job_title_id`: string(uuid) - UUID reference to the Person’s Job Title. e.g. `8cf15293-6e3f-4382-931a-9dd5c14bd289`
- `hourly_wage`: number - Hourly wage rate for the Person. e.g. `35`
- `employee_number`: string - Internal employee identifier. e.g. `123-a234s-456`
- `hired_date`: string - Date the Person was hired. e.g. `2017-04-26T13:45:15.919Z`
- `dob`: string - Date of birth of the Person. e.g. `2015-02-01T14:18:35.919Z`
- `is_male`: boolean - Specifies if the Person identifies as male. e.g. `false`
- `address_1`: string - First part of the Person's address. e.g. `1510 Walnut St`
- `address_2`: string - Second part of the Person's address, if applicable.
- `city_town`: string - The city or town where the Person is located. e.g. `Kansas City`
- `state_province`: string - The state or province where the Person is located. e.g. `MO`
- `zipcode`: string - The postal/zip code of the Person. e.g. `66213`
- `country`: string - The country where the Person is located. e.g. `United States`
- `emergency_contact_name`: string - Name of the Person’s emergency contact.
- `emergency_contact_number`: string - Phone number of the emergency contact.
- `emergency_contact_email`: string(email) - Email address of the emergency contact.
- `emergency_contact_relation`: string - The relationship between the Person and their emergency contact.
- `tag_instances`: array of object - List of tags applied to the Person.
  - `id`: string(uuid) - Unique identifier for the Tag Instance. e.g. `3b24a193-202c-40f2-9b10-9f798a0ac3f9`
  - `tag_id`: string(uuid) - UUID reference to the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
  - `expr_date`: string - Expiration date for the Tag, if applicable. e.g. `2017-11-17T15:21:52.906Z`
- `created_at`: string - Timestamp of when the Person was created. e.g. `2017-11-17T13:45:15.680Z`
- `updated_at`: string - Timestamp of when the Person was last updated. e.g. `2017-10-29T00:00:00.000Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Permission Levels

Resource id: `permission-levels`. Raw spec: `../openapi-raw/permission-levels.json`. Web: https://developers.procore.com/reference/rest/permission-levels?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/permission-level-options

**Get Permission Level Options**
Retrieves a list of all available permission level options within a company. The `id` field in the response represents the UUID to be used for `permission_level_id` in API calls related to user permissions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the permission level. e.g. `fe73d999-7572-46f8-9c81-c8b63c275146`
- `name`: string - The name of the permission level. e.g. `Manager`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Resource Planning Notification Profiles

Resource id: `resource-planning-notification-profiles`. Raw spec: `../openapi-raw/resource-planning-notification-profiles.json`. Web: https://developers.procore.com/reference/rest/resource-planning-notification-profiles?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/notification-profiles

**Get Resource Planning Notification Profiles**
Returns all of the Resource Planning Notification Profile data for the given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `limit` [query] integer - The number of Notification Profile records to return per page.
- `starting_after` [query] string(uuid) - Cursor for forward pagination. Pass the value of `pagination.next_starting_after` from the previous response to fetch the next page.
- `starting_before` [query] string(uuid) - Cursor for reverse pagination. Pass the value of `pagination.previous_starting_before` from the previous response to fetch the prior page.

Response 200 (application/json): object

- `data`: array of object - List of Notification Profiles for the given company.
  - `id`: string(uuid) - Unique identifier for the Notification Profile. e.g. `7a2d8fcc-bd8e-49df-9cdb-00f55c07bea0`
  - `company_id`: string(uuid) - Unique identifier for the Company this Notification Profile belongs to. e.g. `eece1984-4c8d-4736-96c9-397ba86b0713`
  - `name`: string - Name of the Notification Profile. e.g. `A4`
  - `assigned_as_project_role`: boolean - Determines if notifications are scoped to people assigned in a project role context. e.g. `false`
  - `assignment_created`: string enum[none, users, groups, projects] - Notification audience when an assignment is created. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on the pro... e.g. `none`
  - `assignment_deleted`: string enum[none, users, groups, projects] - Notification audience when an assignment is deleted. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on the pro... e.g. `users`
  - `assignment_edited`: string enum[none, users, groups, projects] - Notification audience when an assignment is edited. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on the proj... e.g. `groups`
  - `assignment_ending`: string enum[none, users, groups, projects] - Notification audience when an assignment is ending soon. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on the... e.g. `projects`
  - `assignment_starting`: string enum[none, users, groups, projects] - Notification audience when an assignment is starting soon. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on t... e.g. `projects`
  - `person_existence_changed`: boolean - Determines if a notification is sent when a person is created or deleted. e.g. `true`
  - `person_groups_changed`: boolean - Determines if a notification is sent when a person's group membership changes. e.g. `false`
  - `person_status_changed`: boolean - Determines if a notification is sent when a person's status changes (e.g., active/inactive). e.g. `false`
  - `person_tag_expiring`: boolean - Determines if a notification is sent when a person's tag is expiring soon. e.g. `true`
  - `person_tag_warning`: boolean - Determines if a notification is sent as an early warning before a person's tag expires. e.g. `false`
  - `project_existence_changed`: boolean - Determines if a notification is sent when a project is created or deleted. e.g. `false`
  - `project_groups_changed`: boolean - Determines if a notification is sent when a project's group membership changes. e.g. `false`
  - `project_status_changed`: boolean - Determines if a notification is sent when a project's status changes. e.g. `false`
  - `request_created`: string enum[none, users, groups, projects] - Notification audience when a resource request is created. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on th... e.g. `groups`
  - `request_deleted`: string enum[none, users, groups, projects] - Notification audience when a resource request is deleted. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on th... e.g. `none`
  - `request_edited`: string enum[none, users, groups, projects] - Notification audience when a resource request is edited. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on the... e.g. `groups`
  - `request_ending`: string enum[none, users, groups, projects] - Notification audience when a resource request is ending soon. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people o... e.g. `projects`
  - `request_filled`: string enum[none, users, groups, projects] - Notification audience when a resource request is filled. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people on the... e.g. `groups`
  - `request_starting`: string enum[none, users, groups, projects] - Notification audience when a resource request is starting soon. - `none` - No notification sent. - `users` - Notify assigned users only. - `groups` - Notify members of relevant groups. - `projects` - Notify all people... e.g. `none`
- `pagination`: object - Pagination metadata for the Notification Profiles response.
  - `limit`: integer - The number of records returned in the response. e.g. `10`
  - `next_starting_after`: string(uuid) - The ID of the last record in the current page, used as a cursor to fetch the next page. Null when there are no further pages. e.g. `0020107c-77cf-4cc8-b5bf-b5f6e1edfef6`
  - `previous_starting_before`: string(uuid) - The ID of the first record in the current page, used as a cursor to fetch the previous page. Null when there are no prior pages.
  - `total_possible`: integer - The total number of Notification Profile records available for the company. e.g. `38`

Error responses: 400, 401, 403, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Resource Planning Projects

Resource id: `resource-planning-projects`. Raw spec: `../openapi-raw/resource-planning-projects.json`. Web: https://developers.procore.com/reference/rest/resource-planning-projects?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects

**List Company Projects**
Get a list of all projects for a given company ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...
- `name` [query] string - Filters items by their exact name. The query performs an exact match. Example usage: `/v2/companies/{company_id}/...?name=Bridge+Restoration`
- `project_number` [query] string - Filters items by their exact project number. The query performs an exact match. Example usage: `/v2/companies/{company_id}/...?project_number=BR-2024`
- `custom_fields_integration_name` [query] string - Filter results by a **Custom Field's** `integration_name`. This allows searching based on custom-defined attributes in the system. Example usage: `/v2/companies/{company_id}/...?my_custom_field=northwest`

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Project. e.g. `a3d9f4e2-8f9b-4c8a-ae89-12d7a68e95b3`
- `name`: string - The name of the Project. e.g. `Airport Concourse`
- `project_number`: string - Unique identifier for the Project used internally. e.g. `1zx212ms`
- `status`: string enum[active, pending, inactive] - The status of the Project, controlling visibility and filtering. e.g. `active`
- `start_date`: integer(int64) - Project's start date in Epoch time. e.g. `1509771600000`
- `est_end_date`: integer(int64) - Estimated end date for the Project in Epoch time.
- `closed_date`: integer(int64) - If the Project is closed, this is the closed date in Epoch time.
- `timezone`: string - Timezone used for scheduling outbound messages. e.g. `America/Los_Angeles`
- `color`: string - Hexadecimal color code for categorization. e.g. `#53A9FF`
- `daily_start_time`: string - Default start time for the Project's workday. e.g. `7:30 am`
- `daily_end_time`: string - Default end time for the Project's workday. e.g. `3:30 pm`
- `bid_rate`: number - Project bid rate. e.g. `20`
- `percent_complete`: number - Percentage of the Project completed. e.g. `30`
- `customer_name`: string - The name of the customer for the Project. e.g. `City of Los Angeles`
- `project_type`: string - Internal categorical classification for the Project. e.g. `Airport`
- `address_1`: string - The first part of the Project's address. e.g. `1111 S Figueroa St`
- `address_2`: string - The second part of the Project's address. e.g. `Building 17`
- `city_town`: string - The city or town where the Project is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Project is located. e.g. `KS`
- `zipcode`: string - The postal/zip code of the Project. e.g. `66085`
- `country`: string - The country where the Project is located. e.g. `United States`
- `stage`: string - The stage of the Project . e.g. `Course of Construction`
- `stage_id`: integer - The ID of the project stage. e.g. `12345`
- `group_ids`: array of string(uuid) - List of UUIDs representing the Groups associated with the Project. e.g. `["9be574ab-fbe3-4839-a3b4-2e4bccb617ab", "2ec02e52-8a14-4689-adec-bbd6161e37a4"]`
- `roles`: array of object - List of people assigned to roles in the Project.
  - `person_id`: string(uuid) - UUID of the Person assigned to the role. e.g. `572a480a-637e-4d0e-a02e-246b0181562c`
  - `job_title_id`: string(uuid) - UUID of the Job Title associated with the role. If omitted, the Person's default Job Title is used. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
- `categories`: array of object - List of Categories and their Subcategories within the Project.
  - `name`: string - The name of the Category. e.g. `Phase 1`
  - `subcategories`: array of object - Subcategories within the Category.
    - `name`: string - Name of the Subcategory. e.g. `North Lot`
- `tag_instances`: array of object - List of Tags associated with the Project.
  - `tag_id`: string(uuid) - UUID of the applied Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `wage_overrides`: array of object - List of Wage Overrides set for specific Job Titles on this Project.
  - `job_title_id`: string(uuid) - UUID of the Job Title. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
  - `rate`: number - Hourly wage override for the Job Title. e.g. `35`
- `created_at`: integer(int64) - Timestamp when the Project was created. e.g. `1508251600000`
- `updated_at`: integer(int64) - Timestamp when the Project was last updated. e.g. `1509251600000`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects

**Create a Project**
Create a Project for a given company ID. When a Project is successfully created, you will be returned the new Project UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Request body (application/json):

- `name`: string (required) - The name of the Project. e.g. `Airport Concourse`
- `status`: string enum[active, pending, inactive] (required) - Controls Project visibility and filtering. `active` - Project is currently in progress. `pending` - Project is planned but not started. `inactive` - Project is no longer active. e.g. `active`
- `group_ids`: array of string(uuid) (required) - UUID references to the Groups this Project should be available to. e.g. `["9be574ab-fbe3-4839-a3b4-2e4bccb617ab", "2ec02e52-8a14-4689-adec-bbd6161e37a4"]`
- `start_date`: string(date-time) - Project's start date. Required if `status` is `active`. e.g. `2024-06-01T00:00:00Z`
- `timezone`: string - The timezone to use for scheduling outbound messages for the Project. If not provided, the Group timezone will be used. e.g. `America/Chicago`
- `color`: string - Hexadecimal color code for the Project. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `daily_start_time`: string - Default time the Project's workday begins. Must follow `HH:MM am/pm` format. Allowed increments: 15 minutes. e.g. `7:30 am`
- `daily_end_time`: string - Default time the Project's workday ends. Must follow `HH:MM am/pm` format. Allowed increments: 15 minutes. e.g. `3:30 pm`
- `project_number`: string - A unique identifier for the Project. e.g. `1zx212ms`
- `est_end_date`: string(date-time) - Estimated end date for the Project. e.g. `2024-12-31T00:00:00Z`
- `closed_date`: string(date-time) - If loading already closed jobs for historical tracking, this field can be populated. e.g. `2025-01-01T00:00:00Z`
- `address_1`: string - First part of the Project's address. e.g. `1111 S Figueroa St`
- `address_2`: string - Second part of the Project's address (e.g., Apartment, Suite, Unit). e.g. `Building 17`
- `city_town`: string - The City/Town for the Project. e.g. `Los Angeles`
- `state_province`: string - The State/Province for the Project. e.g. `CA`
- `zipcode`: string - The Zip/Postal Code for the Project. e.g. `90015`
- `country`: string - The Country for the Project. e.g. `United States`
- `bid_rate`: number - The bid rate for the Project. e.g. `20`
- `percent_complete`: number - The percentage of the Project that is complete. e.g. `30`
- `customer_name`: string - Name of the customer associated with the Project. e.g. `City of Los Angeles`
- `project_type`: string - Any categorical classifier you use internally to label your Projects. e.g. `Airport`
- `tag_instances`: array of object - Tags can be used as categorical labels or to define requirements for people assigned to the Project.
  - `tag_id`: string(uuid) - UUID reference for the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `categories`: array of object - Categories define buckets for resource assignments. Each Category can have nested Subcategories.
  - `name`: string - The name of the Category. e.g. `Phase 1`
  - `subcategories`: array of object - A nested layer of classification inside the Category.
    - `name`: string - Name of the Subcategory. e.g. `North Lot`
- `wage_overrides`: array of object - Sets an hourly wage rate for specific Job Titles on this Project.
  - `job_title_id`: string(uuid) - UUID of the Job Title. e.g. `bc107873-b2fe-4f8f-9879-6d95b4a0684f`
  - `rate`: number - Hourly wage rate for the Job Title. e.g. `45`
- `roles`: array of object - Assigns specific People to Roles on the Project. Useful for defining responsibilities and for notifications.
  - `person_id`: string(uuid) - UUID of the Person assigned to the Role. e.g. `572a480a-637e-4d0e-a02e-246b0181562c`
  - `job_title_id`: string(uuid) - UUID of the Job Title for the Role. If omitted, the Person's default Job Title is used. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}

**Get a Single Project**
Get a single project given a company ID and project ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Project. e.g. `a3d9f4e2-8f9b-4c8a-ae89-12d7a68e95b3`
- `name`: string - The name of the Project. e.g. `Airport Concourse`
- `project_number`: string - Unique identifier for the Project used internally. e.g. `1zx212ms`
- `status`: string enum[active, pending, inactive] - The status of the Project, controlling visibility and filtering. e.g. `active`
- `start_date`: integer(int64) - Project's start date in Epoch time. e.g. `1509771600000`
- `est_end_date`: integer(int64) - Estimated end date for the Project in Epoch time.
- `closed_date`: integer(int64) - If the Project is closed, this is the closed date in Epoch time.
- `timezone`: string - Timezone used for scheduling outbound messages. e.g. `America/Los_Angeles`
- `color`: string - Hexadecimal color code for categorization. e.g. `#53A9FF`
- `daily_start_time`: string - Default start time for the Project's workday. e.g. `7:30 am`
- `daily_end_time`: string - Default end time for the Project's workday. e.g. `3:30 pm`
- `bid_rate`: number - Project bid rate. e.g. `20`
- `percent_complete`: number - Percentage of the Project completed. e.g. `30`
- `customer_name`: string - The name of the customer for the Project. e.g. `City of Los Angeles`
- `project_type`: string - Internal categorical classification for the Project. e.g. `Airport`
- `address_1`: string - The first part of the Project's address. e.g. `1111 S Figueroa St`
- `address_2`: string - The second part of the Project's address. e.g. `Building 17`
- `city_town`: string - The city or town where the Project is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Project is located. e.g. `KS`
- `zipcode`: string - The postal/zip code of the Project. e.g. `66085`
- `country`: string - The country where the Project is located. e.g. `United States`
- `stage`: string - The stage of the Project . e.g. `Course of Construction`
- `stage_id`: integer - The ID of the project stage. e.g. `12345`
- `group_ids`: array of string(uuid) - List of UUIDs representing the Groups associated with the Project. e.g. `["9be574ab-fbe3-4839-a3b4-2e4bccb617ab", "2ec02e52-8a14-4689-adec-bbd6161e37a4"]`
- `roles`: array of object - List of people assigned to roles in the Project.
  - `person_id`: string(uuid) - UUID of the Person assigned to the role. e.g. `572a480a-637e-4d0e-a02e-246b0181562c`
  - `job_title_id`: string(uuid) - UUID of the Job Title associated with the role. If omitted, the Person's default Job Title is used. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
- `categories`: array of object - List of Categories and their Subcategories within the Project.
  - `name`: string - The name of the Category. e.g. `Phase 1`
  - `subcategories`: array of object - Subcategories within the Category.
    - `name`: string - Name of the Subcategory. e.g. `North Lot`
- `tag_instances`: array of object - List of Tags associated with the Project.
  - `tag_id`: string(uuid) - UUID of the applied Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `wage_overrides`: array of object - List of Wage Overrides set for specific Job Titles on this Project.
  - `job_title_id`: string(uuid) - UUID of the Job Title. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
  - `rate`: number - Hourly wage override for the Job Title. e.g. `35`
- `created_at`: integer(int64) - Timestamp when the Project was created. e.g. `1508251600000`
- `updated_at`: integer(int64) - Timestamp when the Project was last updated. e.g. `1509251600000`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}

**Update a Single Project**
Updats a single project given a company ID and project ID and body params

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Request body (application/json):

- `name`: string (required) - The name of the Project. e.g. `Airport Concourse`
- `status`: string enum[active, pending, inactive] (required) - Controls Project visibility and filtering. `active` - Project is currently in progress. `pending` - Project is planned but not started. `inactive` - Project is no longer active. e.g. `active`
- `start_date`: string(date-time) - Project's start date. Required if `status` is `active`. e.g. `2024-06-01T00:00:00Z`
- `timezone`: string - The timezone to use for scheduling outbound messages for the Project. If not provided, the Group timezone will be used. e.g. `America/Chicago`
- `color`: string - Hexadecimal color code for the Project. Helps with categorization and visual distinction. e.g. `#53A9FF`
- `daily_start_time`: string - Default time the Project's workday begins. Must follow `HH:MM am/pm` format. Allowed increments: 15 minutes. e.g. `7:30 am`
- `daily_end_time`: string - Default time the Project's workday ends. Must follow `HH:MM am/pm` format. Allowed increments: 15 minutes. e.g. `3:30 pm`
- `job_title_id`: string(uuid) - UUID of the Job Title for the Role. If omitted, the Person's default Job Title is used. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Project. e.g. `a3d9f4e2-8f9b-4c8a-ae89-12d7a68e95b3`
- `name`: string - The name of the Project. e.g. `Airport Concourse`
- `project_number`: string - Unique identifier for the Project used internally. e.g. `1zx212ms`
- `status`: string enum[active, pending, inactive] - The status of the Project, controlling visibility and filtering. e.g. `active`
- `start_date`: integer(int64) - Project's start date in Epoch time. e.g. `1509771600000`
- `est_end_date`: integer(int64) - Estimated end date for the Project in Epoch time.
- `closed_date`: integer(int64) - If the Project is closed, this is the closed date in Epoch time.
- `timezone`: string - Timezone used for scheduling outbound messages. e.g. `America/Los_Angeles`
- `color`: string - Hexadecimal color code for categorization. e.g. `#53A9FF`
- `daily_start_time`: string - Default start time for the Project's workday. e.g. `7:30 am`
- `daily_end_time`: string - Default end time for the Project's workday. e.g. `3:30 pm`
- `bid_rate`: number - Project bid rate. e.g. `20`
- `percent_complete`: number - Percentage of the Project completed. e.g. `30`
- `customer_name`: string - The name of the customer for the Project. e.g. `City of Los Angeles`
- `project_type`: string - Internal categorical classification for the Project. e.g. `Airport`
- `address_1`: string - The first part of the Project's address. e.g. `1111 S Figueroa St`
- `address_2`: string - The second part of the Project's address. e.g. `Building 17`
- `city_town`: string - The city or town where the Project is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Project is located. e.g. `KS`
- `zipcode`: string - The postal/zip code of the Project. e.g. `66085`
- `country`: string - The country where the Project is located. e.g. `United States`
- `stage`: string - The stage of the Project . e.g. `Course of Construction`
- `stage_id`: integer - The ID of the project stage. e.g. `12345`
- `group_ids`: array of string(uuid) - List of UUIDs representing the Groups associated with the Project. e.g. `["9be574ab-fbe3-4839-a3b4-2e4bccb617ab", "2ec02e52-8a14-4689-adec-bbd6161e37a4"]`
- `roles`: array of object - List of people assigned to roles in the Project.
  - `person_id`: string(uuid) - UUID of the Person assigned to the role. e.g. `572a480a-637e-4d0e-a02e-246b0181562c`
  - `job_title_id`: string(uuid) - UUID of the Job Title associated with the role. If omitted, the Person's default Job Title is used. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
- `categories`: array of object - List of Categories and their Subcategories within the Project.
  - `name`: string - The name of the Category. e.g. `Phase 1`
  - `subcategories`: array of object - Subcategories within the Category.
    - `name`: string - Name of the Subcategory. e.g. `North Lot`
- `tag_instances`: array of object - List of Tags associated with the Project.
  - `tag_id`: string(uuid) - UUID of the applied Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `wage_overrides`: array of object - List of Wage Overrides set for specific Job Titles on this Project.
  - `job_title_id`: string(uuid) - UUID of the Job Title. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
  - `rate`: number - Hourly wage override for the Job Title. e.g. `35`
- `created_at`: integer(int64) - Timestamp when the Project was created. e.g. `1508251600000`
- `updated_at`: integer(int64) - Timestamp when the Project was last updated. e.g. `1509251600000`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}

**Delete a Single Project**
Delete a single project given a company ID and project ID. When a Project has been successfully deleted, you will receive the Project's ID back as confirmation.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/projects

**Get a Groups Projects**
Get the projects for a given company ID and group ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...
- `name` [query] string - Filters items by their exact name. The query performs an exact match. Example usage: `/v2/companies/{company_id}/...?name=Bridge+Restoration`
- `project_number` [query] string - Filters items by their exact project number. The query performs an exact match. Example usage: `/v2/companies/{company_id}/...?project_number=BR-2024`
- `custom_fields_integration_name` [query] string - Filter results by a **Custom Field's** `integration_name`. This allows searching based on custom-defined attributes in the system. Example usage: `/v2/companies/{company_id}/...?my_custom_field=northwest`
- `created_at` [query] string(date) - Filters items based on their creation timestamp. Accepts an ISO 8601 date string.
- `created_before` [query] string(date) - Filters items created on or before the specified date (inclusive). Accepts an ISO 8601 date string.
- `created_after` [query] string(date) - Filters items created on or after the specified date (inclusive). Accepts an ISO 8601 date string.
- `updated_at` [query] string(date) - Filters items based on their last updated timestamp. Accepts an ISO 8601 date string.
- `updated_before` [query] string(date) - Filters items updated on or before the specified date (inclusive). Accepts an ISO 8601 date string.
- `updated_after` [query] string(date) - Filters items updated on or after the specified date (inclusive). Accepts an ISO 8601 date string.

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Project. e.g. `a3d9f4e2-8f9b-4c8a-ae89-12d7a68e95b3`
- `name`: string - The name of the Project. e.g. `Airport Concourse`
- `project_number`: string - Unique identifier for the Project used internally. e.g. `1zx212ms`
- `status`: string enum[active, pending, inactive] - The status of the Project, controlling visibility and filtering. e.g. `active`
- `start_date`: integer(int64) - Project's start date in Epoch time. e.g. `1509771600000`
- `est_end_date`: integer(int64) - Estimated end date for the Project in Epoch time.
- `closed_date`: integer(int64) - If the Project is closed, this is the closed date in Epoch time.
- `timezone`: string - Timezone used for scheduling outbound messages. e.g. `America/Los_Angeles`
- `color`: string - Hexadecimal color code for categorization. e.g. `#53A9FF`
- `daily_start_time`: string - Default start time for the Project's workday. e.g. `7:30 am`
- `daily_end_time`: string - Default end time for the Project's workday. e.g. `3:30 pm`
- `bid_rate`: number - Project bid rate. e.g. `20`
- `percent_complete`: number - Percentage of the Project completed. e.g. `30`
- `customer_name`: string - The name of the customer for the Project. e.g. `City of Los Angeles`
- `project_type`: string - Internal categorical classification for the Project. e.g. `Airport`
- `address_1`: string - The first part of the Project's address. e.g. `1111 S Figueroa St`
- `address_2`: string - The second part of the Project's address. e.g. `Building 17`
- `city_town`: string - The city or town where the Project is located. e.g. `Los Angeles`
- `state_province`: string - The state or province where the Project is located. e.g. `KS`
- `zipcode`: string - The postal/zip code of the Project. e.g. `66085`
- `country`: string - The country where the Project is located. e.g. `United States`
- `stage`: string - The stage of the Project . e.g. `Course of Construction`
- `stage_id`: integer - The ID of the project stage. e.g. `12345`
- `group_ids`: array of string(uuid) - List of UUIDs representing the Groups associated with the Project. e.g. `["9be574ab-fbe3-4839-a3b4-2e4bccb617ab", "2ec02e52-8a14-4689-adec-bbd6161e37a4"]`
- `roles`: array of object - List of people assigned to roles in the Project.
  - `person_id`: string(uuid) - UUID of the Person assigned to the role. e.g. `572a480a-637e-4d0e-a02e-246b0181562c`
  - `job_title_id`: string(uuid) - UUID of the Job Title associated with the role. If omitted, the Person's default Job Title is used. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
- `categories`: array of object - List of Categories and their Subcategories within the Project.
  - `name`: string - The name of the Category. e.g. `Phase 1`
  - `subcategories`: array of object - Subcategories within the Category.
    - `name`: string - Name of the Subcategory. e.g. `North Lot`
- `tag_instances`: array of object - List of Tags associated with the Project.
  - `tag_id`: string(uuid) - UUID of the applied Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `wage_overrides`: array of object - List of Wage Overrides set for specific Job Titles on this Project.
  - `job_title_id`: string(uuid) - UUID of the Job Title. e.g. `38f2a244-365f-409e-8e94-60bbae1097a6`
  - `rate`: number - Hourly wage override for the Job Title. e.g. `35`
- `created_at`: integer(int64) - Timestamp when the Project was created. e.g. `1508251600000`
- `updated_at`: integer(int64) - Timestamp when the Project was last updated. e.g. `1509251600000`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/tags

**Add Tag Instance to Project**
To make a Tag available to a Project, send a `tag_id` in the POST body. A successful response will return the newly created Tag Instance UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Request body (application/json):

- `tag_id`: string(uuid) (required) - UUID reference of the Tag to be applied to the Project. e.g. `94186279-fa66-42c6-a2ca-f44dde84f584`

Response 200 (application/json): object

- `id`: string(uuid) - UUID representing the applied Tag Instance. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/tags/{tag_instance_id}

**Remove Tag Instance from Project**
Remove a Tag from a Project by specifying its `tag_instance_id`. A successful response returns the removed Tag Instance UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `tag_instance_id` [path] integer (required) - Unique identifier for the tag instance

Response 200 (application/json): object

- `id`: string(uuid) - UUID representing the applied Tag Instance. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/categories

**Add Category to Project**
Add a new Category to a Project. Subcategories can also be provided. A successful response returns the new Category UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Request body (application/json):

- `name`: string (required) - The name of the Category. e.g. `Phase 1`
- `subcategories`: array of object - List of Subcategories under this Category. If no Subcategories are needed, this can be an empty array.
  - `name`: string - The name of the Subcategory. e.g. `Night Shift`

Response 200 (application/json): object

- `id`: string(uuid) - The unique identifier of the Category. e.g. `bc107873-b2fe-4f8f-9879-6d95b4a0684f`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/categories/{category_id}

**Update Category Name**
Update a Category’s name within a Project. A successful response returns all Categories for the Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `category_id` [path] string(uuid) (required) - Unique identifier for the Category.

Request body (application/json):

- `name`: string (required) - The updated name of the Category. e.g. `Phase 1a`

Response 200 (application/json): object

- `categories`: array of object - List of categories associated with the Project.
  - `id`: string(uuid) - Unique identifier for the Category. e.g. `bc107873-b2fe-4f8f-9879-6d95b4a0684f`
  - `name`: string - Name of the Category. e.g. `Phase 1`
  - `subcategories`: array of object - List of subcategories within the Category.
    - `id`: string(uuid) - Unique identifier for the Subcategory. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
    - `name`: string - Name of the Subcategory. e.g. `North Lot`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/categories/{category_id}

**Delete Category**
Delete a Category from a Project. Assignments will be moved to the default "None" category. A successful response returns the deleted Category ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `category_id` [path] string(uuid) (required) - Unique identifier for the Category.

Response 200 (application/json): object

- `id`: string(uuid) - The unique identifier of the Category. e.g. `bc107873-b2fe-4f8f-9879-6d95b4a0684f`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/categories/{category_id}/subcategories

**Add Subcategory to Category**
Add a Subcategory to a Category in a Project. A successful response returns the new Subcategory UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `category_id` [path] string(uuid) (required) - Unique identifier for the Category.

Request body (application/json):

- `name`: string (required) - Name of the Subcategory to be added. e.g. `Temp Workers`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Subcategory. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/categories/{category_id}/subcategories/{subcategory_id}

**Update Subcategory Name**
Update a Subcategory’s name within a Category. A successful response returns the updated Subcategory UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `category_id` [path] string(uuid) (required) - Unique identifier for the Category.
- `subcategory_id` [path] string(uuid) (required) - Unique identifier for the Subcategory.

Request body (application/json):

- `name`: string (required) - The new name for the Subcategory. e.g. `Updated Subcategory Name`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Subcategory. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/categories/{category_id}/subcategories/{subcategory_id}

**Delete Subcategory**
Delete a Subcategory from a Project. Assignments will lose their subcategory. A successful response returns the deleted Subcategory UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `category_id` [path] string(uuid) (required) - Unique identifier for the Category.
- `subcategory_id` [path] string(uuid) (required) - Unique identifier for the Subcategory.

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Subcategory. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/wage-overrides

**Add Wage Override**
Add a Wage Override for a specific Job Title in a Project. A successful response returns the new Wage Override UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Request body (application/json):

- `job_title_id`: string(uuid) (required) - UUID of the Job Title for which the Wage Override applies. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `rate`: number (required) - Hourly wage rate override for the specified Job Title. e.g. `35`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Wage Override. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/wage-overrides/{wage_override_id}

**Delete Wage Override**
Delete a Wage Override from a Project. A successful response returns the removed Wage Override UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `wage_override_id` [path] string(uuid) (required) - Unique identifier for the Wage Override.

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Wage Override. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/roles

**Add Role to Project**
Assign a Person to a Role in a Project. A successful response returns the new Role UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Request body (application/json):

- `person_id`: string(uuid) (required) - UUID of the Person being assigned the Role. e.g. `bc107873-b2fe-4f8f-9879-6d95b4a0684f`
- `job_title_id`: string(uuid) - UUID of the Job Title for the Role. If omitted, the Person's default Job Title is used. e.g. `aeee8fc5-b8ee-4bf0-bca9-86f751f99795`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Role assigned to a Project. e.g. `d7852dc1-f466-467b-8e64-4fa74ac16e4a`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/roles/{role_id}

**Remove Role from Project**
Remove a Person from a Role in a Project. A successful response returns the removed Role UUID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `role_id` [path] string(uuid) (required) - Unique identifier for the Role in the Project.

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Role assigned to a Project. e.g. `d7852dc1-f466-467b-8e64-4fa74ac16e4a`

Error responses: 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/groups

**Add Project to Group**
Add a Project to a Group. A successful response returns the full list of Group IDs for the Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Request body (application/json):

- `group_id`: string(uuid) (required) - UUID of the Group. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Response 200 (application/json): object

- `group_ids`: array of string(uuid) - Array of unique identifiers for Groups. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "2d2ad78e-c6de-467e-8413-c616b55294a...`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/groups/{group_id}

**Remove Project from Group**
Remove a Project from a Group. A successful response returns the updated list of Group IDs for the Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `group_id` [path] integer (required) - Unique identifier for the group

Response 200 (application/json): object

- `group_ids`: array of string(uuid) - Array of unique identifiers for Groups. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "2d2ad78e-c6de-467e-8413-c616b55294a...`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Resource Planning Reports

Resource id: `resource-planning-reports`. Raw spec: `../openapi-raw/resource-planning-reports.json`. Web: https://developers.procore.com/reference/rest/resource-planning-reports?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/reports/look-ahead

**Get Look Ahead Data**
Fetches the Look Ahead report which provides future assignments and availability details for People within a specified Group. To span all Groups in the company, use `"all"` in place of `{group_id}`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group
- `jobTitleIds` [query] array of string(uuid) - An array of UUIDs representing the Job Titles to include in the report. People with Job Titles not in this list will be excluded.
- `assignmentCount` [query] integer enum[1, 2, 3] - The number of future assignments to return per person.
- `projectName` [query] boolean - Whether to include the project name for each assignment.
- `project_number` [query] string - Filters items by their exact project number. The query performs an exact match. Example usage: `/v2/companies/{company_id}/...?project_number=BR-2024`
- `assignmentStart` [query] boolean - Whether to include the assignment start date.
- `assignmentEnd` [query] boolean - Whether to include the assignment end date.
- `availableAfterDate` [query] boolean - Whether to include the last day a person is assigned in the future.
- `employee_number` [query] string - Filter results by the exact employee number of the Person.
- `jobTitle` [query] boolean - Whether to include the person's Job Title.
- `assignmentDuration` [query] boolean - Whether to include a calculated duration for each assignment.

Response 200 (application/json): array of object

- `available_after`: string - The last day in the future that this person is assigned. e.g. `11/12/2017`
- `employee_number`: string - The employee number of the person. e.g. `123-a234s-456`
- `name`: object - The first and last name of the person.
  - `first`: string e.g. `Joseph`
  - `last`: string e.g. `Lopez`
- `job_title_id`: string(uuid) - The UUID of the Job Title assigned to this person. e.g. `e70d45dd-27dc-43ad-ab1a-abd4c54bbe3a`
- `job_title_name`: string - The name of the Job Title assigned to this person. e.g. `Journeyman`
- `assignments`: array of object - List of upcoming assignments for this person.
  - `project_name`: string - The name of the assigned project. e.g. `Main St. Bridge`
  - `project_number`: string - The number of the assigned project. e.g. `2039`
  - `start_day`: string - The start date of the assignment. e.g. `10/01/2017`
  - `end_day`: string - The end date of the assignment. e.g. `11/02/2017`
  - `duration`: string - The duration of the assignment in a readable format. e.g. `4W 5D`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/reports/assignment-history

**Get Project's Assignment History Data**
Fetches the assignment history for a specific Project, returning records of all assignments linked to it.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `employeeName` [query] boolean - Determines whether the employee's name should be included in the response. If set to `true`, the response will include the person's first and last name. Default is `true`.
- `employee_number` [query] string - Filter results by the exact employee number of the Person.
- `jobTitle` [query] boolean - Whether to include the person's Job Title.
- `assignmentStart` [query] boolean - Whether to include the assignment start date.
- `assignmentEnd` [query] boolean - Whether to include the assignment end date.
- `start_time` [query] boolean - Will return the daily start time for each assignment.
- `end_time` [query] boolean - Will return the daily end time for each assignment.
- `cost_code` [query] boolean - Will return the name and UUID of the Cost Code for each assignment.
- `labels` [query] boolean - Will return the name and UUID of the Label for each assignment.
- `duration` [query] boolean - Will return a calculated duration for each listed assignment.

Response 200 (application/json): array of object

- `person_name`: object - The first and last name of the Person (Project request only).
  - `first`: string e.g. `Joseph`
  - `last`: string e.g. `Lopez`
- `employee_number`: string - The employee number of the assigned person (Project request only). e.g. `123-a234s-456`
- `job_title`: string - The job title of the assigned person (Project request only). e.g. `Journeyman`
- `project_name`: string - The name of the Project (Person request only). e.g. `Hospital Job`
- `project_number`: string - The number of the Project (Person request only). e.g. `123abc`
- `start_day`: string - The start date of the assignment. e.g. `10/01/2017`
- `end_day`: string - The end date of the assignment. e.g. `11/02/2017`
- `start_time`: string - The daily start time of the assignment. e.g. `7:30 am`
- `end_time`: string - The daily end time of the assignment. e.g. `3:30 pm`
- `cost_code_name`: string - The name of the Cost Code for the assignment. e.g. `Phase 1`
- `cost_code_id`: string(uuid) - The UUID of the Cost Code for the assignment. e.g. `e70d45dd-27dc-43ad-ab1a-abd4c54bbe3a`
- `label_name`: string - The name of the Label for the assignment. e.g. `Temp Work`
- `label_id`: string(uuid) - The UUID of the Label for the assignment. e.g. `25202254-f832-403f-9a96-2df2ceb8faf1`
- `duration`: string - The calculated duration of the assignment. e.g. `4W 5D`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/reports/assignment-history

**Get Person's Assignment History Data**
Fetches the assignment history for a specific Person, returning records of all assignments linked to them.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `projectName` [query] boolean - Whether to include the project name for each assignment.
- `project_number` [query] string - Filters items by their exact project number. The query performs an exact match. Example usage: `/v2/companies/{company_id}/...?project_number=BR-2024`
- `assignmentStart` [query] boolean - Whether to include the assignment start date.
- `assignmentEnd` [query] boolean - Whether to include the assignment end date.
- `start_time` [query] boolean - Will return the daily start time for each assignment.
- `end_time` [query] boolean - Will return the daily end time for each assignment.
- `cost_code` [query] boolean - Will return the name and UUID of the Cost Code for each assignment.
- `labels` [query] boolean - Will return the name and UUID of the Label for each assignment.
- `duration` [query] boolean - Will return a calculated duration for each listed assignment.

Response 200 (application/json): array of object

- `person_name`: object - The first and last name of the Person (Project request only).
  - `first`: string e.g. `Joseph`
  - `last`: string e.g. `Lopez`
- `employee_number`: string - The employee number of the assigned person (Project request only). e.g. `123-a234s-456`
- `job_title`: string - The job title of the assigned person (Project request only). e.g. `Journeyman`
- `project_name`: string - The name of the Project (Person request only). e.g. `Hospital Job`
- `project_number`: string - The number of the Project (Person request only). e.g. `123abc`
- `start_day`: string - The start date of the assignment. e.g. `10/01/2017`
- `end_day`: string - The end date of the assignment. e.g. `11/02/2017`
- `start_time`: string - The daily start time of the assignment. e.g. `7:30 am`
- `end_time`: string - The daily end time of the assignment. e.g. `3:30 pm`
- `cost_code_name`: string - The name of the Cost Code for the assignment. e.g. `Phase 1`
- `cost_code_id`: string(uuid) - The UUID of the Cost Code for the assignment. e.g. `e70d45dd-27dc-43ad-ab1a-abd4c54bbe3a`
- `label_name`: string - The name of the Label for the assignment. e.g. `Temp Work`
- `label_id`: string(uuid) - The UUID of the Label for the assignment. e.g. `25202254-f832-403f-9a96-2df2ceb8faf1`
- `duration`: string - The calculated duration of the assignment. e.g. `4W 5D`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/reports/tag-action

**Get Tags Requiring Action Report**
Retrieves a list of People who have Tags that are either expired or within their expiration warning period. This report is executed under the context of the specified Group ID. If you want to fetch data for all groups in a company, use `all` in place of `{group_id}`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group
- `tagIds` [query] array of string(uuid) - Array of UUIDs representing the Tags you want to filter the report by. If not provided, the report includes all Tags available to the Group.
- `warningTags` [query] boolean - Determines whether Tags within their expiration warning period should be included in the report. If set to `false`, only expired Tags will be included.
- `employee_number` [query] string - Filter results by the exact employee number of the Person.
- `jobTitle` [query] boolean - Whether to include the person's Job Title.

Response 200 (application/json): array of object

- `person_name`: object
  - `first`: string - The first name of the Person. e.g. `Joseph`
  - `last`: string - The last name of the Person. e.g. `Lopez`
- `employee_number`: string - The employee number of the Person. e.g. `123-a234s-456`
- `job_title`: string - The Job Title of the Person. e.g. `Journeyman`
- `tag`: object - Details about the Tag requiring action.
  - `name`: string - Name of the Tag. e.g. `Google Cert`
  - `abbreviation`: string - Shortened identifier for the Tag. e.g. `Goog`
  - `expr_date`: integer - Expiration date of the Tag in Unix timestamp format. e.g. `1511223730847`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Resource Requests

Resource id: `resource-requests`. Raw spec: `../openapi-raw/resource-requests.json`. Web: https://developers.procore.com/reference/rest/resource-requests?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/resource-requests

**Get All Resource Requests for a Single Project**
Retrieves all Resource Requests for a specified Project within a company. This is a pageable endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...

Response 200 (application/json): object

- `possible_pages`: integer - The total number of pages available for pagination. e.g. `5`
- `current_page`: integer - The current page index (0-based). e.g. `2`
- `data`: array of object - The list of Resource Requests on the current page.
  - `id`: string(uuid) - Unique identifier for the Resource Request. e.g. `012e9b89-2c7c-420b-a08a-d0e94a63e0a8`
  - `creator_id`: string(uuid) - ID of the user who created the Resource Request, if applicable. e.g. `2116968d-7320-4edc-bda8-836968ce6622`
  - `project_id`: string(uuid) - ID of the project associated with this Resource Request. e.g. `479b6fe1-fc3e-49f3-9898-544e68bcc191`
  - `start_day`: string - The start date for the requested resource (MM/DD/YY). e.g. `6/11/20`
  - `end_day`: string - The end date for the requested resource (MM/DD/YY). e.g. `6/19/20`
  - `start_time`: string - The start time of the requested resource. e.g. `7:30 am`
  - `end_time`: string - The end time of the requested resource. e.g. `3:30 pm`
  - `percent_allocated`: integer - The percentage allocation of the requested resource if applicable. e.g. `50`
  - `job_title_id`: string(uuid) - ID of the Job Title associated with the Resource Request. e.g. `8f134c16-dee8-45f9-b622-be344d19304d`
  - `category_id`: string(uuid) - ID of the Project Category associated with the Resource Request. e.g. `f34e8fe3-4c3b-4abb-b1f6-c1cd956ba2f5`
  - `subcategory_id`: string(uuid) - ID of the Project Subcategory associated with the Resource Request. e.g. `1b787e24-d67a-4042-8499-cb96b3b7ab37`
  - `state_id`: string(uuid) - ID of the Assignment State associated with the Resource Request.
  - `work_scope_text`: string - Description of the work scope for the requested resource. e.g. `An example scope`
  - `instruction_text`: string - Instructions related to the requested resource. e.g. `Some items to do`
  - `work_days`: object - Object representing workdays for the requested resource, using a 0-based index (Sunday-Saturday). e.g. `{"0": false, "1": true, "2": true, "3": true, "4": true, "5": false, "6": false}`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/projects/{project_id}/resource-requests

**Create a Resource Request on a Project**
Creates a new Resource Request for a specified project within a given company. Resource requests can be based on work hours (start_time and end_time) or percent allocation (percent_allocated).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `project_id` [path] integer (required) - Unique identifier for the project

Request body (application/json):

- `start_day`: string(date) (required) - The first day the requested resource is needed (ISO 8601). e.g. `2023-06-11T00:00:00Z`
- `end_day`: string(date) (required) - The last day the requested resource is needed (ISO 8601). e.g. `2023-06-19T00:00:00Z`
- `start_time`: string - Start time of the request (HH:MM am/pm format). e.g. `7:30 am`
- `end_time`: string - End time of the request (HH:MM am/pm format). e.g. `3:30 pm`
- `percent_allocated`: integer - Allocation percentage if the request is not hour-based. e.g. `50`
- `quantity`: integer - Number of resource requests to create. e.g. `1`
- `job_title_id`: string(uuid) - Job Title UUID for this request. e.g. `8f134c16-dee8-45f9-b622-be344d19304d`
- `category_id`: string(uuid) - UUID of the Project Category. e.g. `f34e8fe3-4c3b-4abb-b1f6-c1cd956ba2f5`
- `subcategory_id`: string(uuid) - UUID of the Project Subcategory. e.g. `1b787e24-d67a-4042-8499-cb96b3b7ab37`
- `state_id`: string(uuid) - UUID of the Assignment State. e.g. `null`
- `work_scope_text`: string - Scope of Work for the Resource Request. e.g. `An example scope`
- `instruction_text`: string - Instructions for the Resource Request. e.g. `Some items to do`
- `tag_ids`: array of string(uuid) - Array of UUIDs representing Tags. e.g. `["d8b4e4b7-47a2-4a5c-92ff-23b17cd93e2e"]`
- `work_days`: object - Object to control working days (Sunday - Saturday as 0-6 index).
  - `0`: boolean e.g. `false`
  - `1`: boolean e.g. `true`
  - `2`: boolean e.g. `true`
  - `3`: boolean e.g. `true`
  - `4`: boolean e.g. `true`
  - `5`: boolean e.g. `false`
  - `6`: boolean e.g. `false`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Resource Request. e.g. `012e9b89-2c7c-420b-a08a-d0e94a63e0a8`
- `project_id`: string(uuid) - Project ID where the request is created. e.g. `479b6fe1-fc3e-49f3-9898-544e68bcc191`
- `start_day`: string - Start date of the request. e.g. `2023-06-11`
- `end_day`: string - End date of the request. e.g. `2023-06-19`
- `start_time`: string - Start time of the request. e.g. `7:30 am`
- `end_time`: string - End time of the request. e.g. `3:30 pm`
- `percent_allocated`: integer - Allocation percentage if not hour-based. e.g. `50`
- `work_days`: object - Object defining working days.
  - `0`: boolean e.g. `false`
  - `1`: boolean e.g. `true`
  - `2`: boolean e.g. `true`
  - `3`: boolean e.g. `true`
  - `4`: boolean e.g. `true`
  - `5`: boolean e.g. `false`
  - `6`: boolean e.g. `false`
- `job_title_id`: string(uuid) - Job Title UUID for this request. e.g. `8f134c16-dee8-45f9-b622-be344d19304d`
- `category_id`: string(uuid) - UUID of the Project Category. e.g. `f34e8fe3-4c3b-4abb-b1f6-c1cd956ba2f5`
- `subcategory_id`: string(uuid) - UUID of the Project Subcategory. e.g. `1b787e24-d67a-4042-8499-cb96b3b7ab37`
- `work_scope_text`: string - Scope of Work for the Resource Request. e.g. `An example scope`
- `instruction_text`: string - Instructions for the Resource Request. e.g. `Some items to do`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/resource-requests

**Get All Resource Requests in a Company**
Retrieves all Resource Requests across a company. This is a pageable endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...

Response 200 (application/json): object

- `possible_pages`: integer - The total number of pages available for pagination. e.g. `5`
- `current_page`: integer - The current page index (0-based). e.g. `2`
- `data`: array of object - The list of Resource Requests on the current page.
  - `id`: string(uuid) - Unique identifier for the Resource Request. e.g. `012e9b89-2c7c-420b-a08a-d0e94a63e0a8`
  - `creator_id`: string(uuid) - ID of the user who created the Resource Request, if applicable. e.g. `2116968d-7320-4edc-bda8-836968ce6622`
  - `project_id`: string(uuid) - ID of the project associated with this Resource Request. e.g. `479b6fe1-fc3e-49f3-9898-544e68bcc191`
  - `start_day`: string - The start date for the requested resource (MM/DD/YY). e.g. `6/11/20`
  - `end_day`: string - The end date for the requested resource (MM/DD/YY). e.g. `6/19/20`
  - `start_time`: string - The start time of the requested resource. e.g. `7:30 am`
  - `end_time`: string - The end time of the requested resource. e.g. `3:30 pm`
  - `percent_allocated`: integer - The percentage allocation of the requested resource if applicable. e.g. `50`
  - `job_title_id`: string(uuid) - ID of the Job Title associated with the Resource Request. e.g. `8f134c16-dee8-45f9-b622-be344d19304d`
  - `category_id`: string(uuid) - ID of the Project Category associated with the Resource Request. e.g. `f34e8fe3-4c3b-4abb-b1f6-c1cd956ba2f5`
  - `subcategory_id`: string(uuid) - ID of the Project Subcategory associated with the Resource Request. e.g. `1b787e24-d67a-4042-8499-cb96b3b7ab37`
  - `state_id`: string(uuid) - ID of the Assignment State associated with the Resource Request.
  - `work_scope_text`: string - Description of the work scope for the requested resource. e.g. `An example scope`
  - `instruction_text`: string - Instructions related to the requested resource. e.g. `Some items to do`
  - `work_days`: object - Object representing workdays for the requested resource, using a 0-based index (Sunday-Saturday). e.g. `{"0": false, "1": true, "2": true, "3": true, "4": true, "5": false, "6": false}`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/resource-requests

**Get All Resource Requests for Projects in a Single Group**
Retrieves all Resource Requests for projects within a specified group. This is a pageable endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group
- `page` [query] integer - This is a **0-based index** representing the page slice of the data you want to retrieve. Each page contains up to **400 items**. ### **📌 Pageable Endpoints** People endpoints that return multiple records **support pa...

Response 200 (application/json): object

- `possible_pages`: integer - The total number of pages available for pagination. e.g. `5`
- `current_page`: integer - The current page index (0-based). e.g. `2`
- `data`: array of object - The list of Resource Requests on the current page.
  - `id`: string(uuid) - Unique identifier for the Resource Request. e.g. `012e9b89-2c7c-420b-a08a-d0e94a63e0a8`
  - `creator_id`: string(uuid) - ID of the user who created the Resource Request, if applicable. e.g. `2116968d-7320-4edc-bda8-836968ce6622`
  - `project_id`: string(uuid) - ID of the project associated with this Resource Request. e.g. `479b6fe1-fc3e-49f3-9898-544e68bcc191`
  - `start_day`: string - The start date for the requested resource (MM/DD/YY). e.g. `6/11/20`
  - `end_day`: string - The end date for the requested resource (MM/DD/YY). e.g. `6/19/20`
  - `start_time`: string - The start time of the requested resource. e.g. `7:30 am`
  - `end_time`: string - The end time of the requested resource. e.g. `3:30 pm`
  - `percent_allocated`: integer - The percentage allocation of the requested resource if applicable. e.g. `50`
  - `job_title_id`: string(uuid) - ID of the Job Title associated with the Resource Request. e.g. `8f134c16-dee8-45f9-b622-be344d19304d`
  - `category_id`: string(uuid) - ID of the Project Category associated with the Resource Request. e.g. `f34e8fe3-4c3b-4abb-b1f6-c1cd956ba2f5`
  - `subcategory_id`: string(uuid) - ID of the Project Subcategory associated with the Resource Request. e.g. `1b787e24-d67a-4042-8499-cb96b3b7ab37`
  - `state_id`: string(uuid) - ID of the Assignment State associated with the Resource Request.
  - `work_scope_text`: string - Description of the work scope for the requested resource. e.g. `An example scope`
  - `instruction_text`: string - Instructions related to the requested resource. e.g. `Some items to do`
  - `work_days`: object - Object representing workdays for the requested resource, using a 0-based index (Sunday-Saturday). e.g. `{"0": false, "1": true, "2": true, "3": true, "4": true, "5": false, "6": false}`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/resource-requests/{request_id}

**Update a Single Resource Request**
Updates an existing Resource Request within a company. Only specified properties in the request body will be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `request_id` [path] string(uuid) (required) - Unique identifier for the Resource Request.

Request body (application/json):

- `start_day`: string(date) - The first day the requested resource is needed (ISO 8601). e.g. `2023-06-11T00:00:00Z`
- `end_day`: string(date) - The last day the requested resource is needed (ISO 8601). e.g. `2023-06-19T00:00:00Z`
- `start_time`: string - Start time of the request (HH:MM am/pm format). e.g. `7:30 am`
- `end_time`: string - End time of the request (HH:MM am/pm format). e.g. `3:30 pm`
- `percent_allocated`: integer - Allocation percentage if the request is not hour-based. e.g. `50`
- `job_title_id`: string(uuid) - Job Title UUID for this request. e.g. `8f134c16-dee8-45f9-b622-be344d19304d`
- `category_id`: string(uuid) - UUID of the Project Category. e.g. `f34e8fe3-4c3b-4abb-b1f6-c1cd956ba2f5`
- `subcategory_id`: string(uuid) - UUID of the Project Subcategory. e.g. `1b787e24-d67a-4042-8499-cb96b3b7ab37`
- `state_id`: string(uuid) - UUID of the Assignment State. e.g. `null`
- `work_scope_text`: string - Scope of Work for the Resource Request. e.g. `An updated scope of work.`
- `instruction_text`: string - Instructions for the Resource Request. e.g. `Updated instructions for this request.`
- `work_days`: object - Object to control working days (Sunday - Saturday as 0-6 index).
  - `0`: boolean e.g. `false`
  - `1`: boolean e.g. `true`
  - `2`: boolean e.g. `true`
  - `3`: boolean e.g. `true`
  - `4`: boolean e.g. `true`
  - `5`: boolean e.g. `false`
  - `6`: boolean e.g. `false`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Resource Request. e.g. `012e9b89-2c7c-420b-a08a-d0e94a63e0a8`
- `project_id`: string(uuid) - Project ID where the request is created. e.g. `479b6fe1-fc3e-49f3-9898-544e68bcc191`
- `start_day`: string - Start date of the request. e.g. `2023-06-11`
- `end_day`: string - End date of the request. e.g. `2023-06-19`
- `start_time`: string - Start time of the request. e.g. `7:30 am`
- `end_time`: string - End time of the request. e.g. `3:30 pm`
- `percent_allocated`: integer - Allocation percentage if not hour-based. e.g. `50`
- `work_days`: object - Object defining working days.
  - `0`: boolean e.g. `false`
  - `1`: boolean e.g. `true`
  - `2`: boolean e.g. `true`
  - `3`: boolean e.g. `true`
  - `4`: boolean e.g. `true`
  - `5`: boolean e.g. `false`
  - `6`: boolean e.g. `false`
- `job_title_id`: string(uuid) - Job Title UUID for this request. e.g. `8f134c16-dee8-45f9-b622-be344d19304d`
- `category_id`: string(uuid) - UUID of the Project Category. e.g. `f34e8fe3-4c3b-4abb-b1f6-c1cd956ba2f5`
- `subcategory_id`: string(uuid) - UUID of the Project Subcategory. e.g. `1b787e24-d67a-4042-8499-cb96b3b7ab37`
- `work_scope_text`: string - Scope of Work for the Resource Request. e.g. `An example scope`
- `instruction_text`: string - Instructions for the Resource Request. e.g. `Some items to do`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/resource-requests/{request_id}

**Delete a Resource Request**
Deletes an existing Resource Request within a company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `request_id` [path] string(uuid) (required) - Unique identifier for the Resource Request.

Response 200 (application/json): object

- `id`: string(uuid) - The UUID of the deleted Resource Request. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Tags

Resource id: `tags`. Raw spec: `../openapi-raw/tags.json`. Web: https://developers.procore.com/reference/rest/tags?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/groups/{group_id}/tags

**Get All Resource Planning Tag for a Group**
Gets all of the Resource Planning Tags belonging to a Group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `group_id` [path] integer (required) - Unique identifier for the group

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `name`: string - The name of the Tag. e.g. `Google Certification`
- `group_ids`: array of string(uuid) - Array of UUIDs representing Groups this Tag is assigned to. Can be empty if `globally_accessible` is true.
- `globally_accessible`: boolean - Indicates if the Tag is globally available to all current and future Groups. e.g. `true`
- `abbreviation`: string - A 5-character max abbreviation for the Tag. e.g. `GOOGl`
- `require_expr_date`: boolean - Indicates whether an expiration date is required when applying the Tag to a Person. e.g. `true`
- `expr_days_warning`: integer - Number of days before expiration when the Tag enters "warning" mode. Only applicable if `require_expr_date` is true. e.g. `30`
- `color`: string - Hexadecimal color code for the Tag. e.g. `#53A9FF`
- `categories`: array of string - Array of Tag Categories the Tag belongs to. Can be empty if not categorized.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/tags

**Get All Resource Planning Tag for a Company**
Gets all of the Resource Planning Tags belonging to a Company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `name`: string - The name of the Tag. e.g. `Google Certification`
- `group_ids`: array of string(uuid) - Array of UUIDs representing Groups this Tag is assigned to. Can be empty if `globally_accessible` is true.
- `globally_accessible`: boolean - Indicates if the Tag is globally available to all current and future Groups. e.g. `true`
- `abbreviation`: string - A 5-character max abbreviation for the Tag. e.g. `GOOGl`
- `require_expr_date`: boolean - Indicates whether an expiration date is required when applying the Tag to a Person. e.g. `true`
- `expr_days_warning`: integer - Number of days before expiration when the Tag enters "warning" mode. Only applicable if `require_expr_date` is true. e.g. `30`
- `color`: string - Hexadecimal color code for the Tag. e.g. `#53A9FF`
- `categories`: array of string - Array of Tag Categories the Tag belongs to. Can be empty if not categorized.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/tags

**Create Company Tag**
Creates a Resource Planning Tag for the given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Request body (application/json):

- `company_id`: integer (required) - Unique identifier for the company. NOTE - this is a Laborchart company ID. e.g. `12345`
- `name`: string (required) - The Tag's name. e.g. `High Priority`
- `abbreviation`: string - A 5-character max String representing the abbreviation that will appear in most Tag views. Defaults to the first 5 characters of the name if not provided. e.g. `PRIOR`
- `categories`: array of string - Array of Tag Categories this Tag should be available to, if Tag Categories are enabled. e.g. `["Safety", "Urgent", "Training"]`
- `color`: string - Hexadecimal color code for the Tag, used for categorization and visual distinction. e.g. `#53A9FF`
- `expr_days_warning`: integer - Number of days before expiration when the Tag should be in "warning" mode. Only relevant if `require_expr_date` is true. e.g. `30`
- `globally_accessible`: boolean (required) - Controls whether the Tag should be globally available to all current and future Groups. e.g. `true`
- `group_ids`: array of string(uuid) (required) - Array of UUIDs for which Groups this Tag should be available to or be removed from depending on context. For adding availability, if `globally_accessible` is true, this can be an empty array. e.g. `["550e8400-e29b-41d4-a716-446655440000", "4f7e9e5b-d4f5-4a73-8a97-4e6b72fb5c19"]`
- `require_expr_date`: boolean - Controls whether the Tag should require an expiration date when applied to a Person. e.g. `true`

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Tag. e.g. `bc107873-b2fe-4f8f-9879-6d95b4a0684f`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/tags/{tag_id}

**Get a Single Resource Planning Tag**
Gets a single Resource Planning Tag

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `tag_id` [path] integer (required) - Unique identifier for the tag.

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `name`: string - The name of the Tag. e.g. `Google Certification`
- `group_ids`: array of string(uuid) - Array of UUIDs representing Groups this Tag is assigned to. Can be empty if `globally_accessible` is true.
- `globally_accessible`: boolean - Indicates if the Tag is globally available to all current and future Groups. e.g. `true`
- `abbreviation`: string - A 5-character max abbreviation for the Tag. e.g. `GOOGl`
- `require_expr_date`: boolean - Indicates whether an expiration date is required when applying the Tag to a Person. e.g. `true`
- `expr_days_warning`: integer - Number of days before expiration when the Tag enters "warning" mode. Only applicable if `require_expr_date` is true. e.g. `30`
- `color`: string - Hexadecimal color code for the Tag. e.g. `#53A9FF`
- `categories`: array of string - Array of Tag Categories the Tag belongs to. Can be empty if not categorized.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/tags/{tag_id}

**Update Company Tag**
Updates a Resource Planning Tag for the given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `tag_id` [path] integer (required) - Unique identifier for the tag.

Request body (application/json):

- `company_id`: integer (required) - Unique identifier for the company. NOTE - this is a Laborchart company ID. e.g. `12345`
- `name`: string (required) - The Tag's name. e.g. `High Priority`
- `abbreviation`: string - A 5-character max String representing the abbreviation that will appear in most Tag views. Defaults to the first 5 characters of the name if not provided. e.g. `PRIOR`
- `categories`: array of string - Array of Tag Categories this Tag should be available to, if Tag Categories are enabled. e.g. `["Safety", "Urgent", "Training"]`
- `color`: string - Hexadecimal color code for the Tag, used for categorization and visual distinction. e.g. `#53A9FF`
- `expr_days_warning`: integer - Number of days before expiration when the Tag should be in "warning" mode. Only relevant if `require_expr_date` is true. e.g. `30`
- `globally_accessible`: boolean (required) - Controls whether the Tag should be globally available to all current and future Groups. e.g. `true`
- `group_ids`: array of string(uuid) (required) - Array of UUIDs for which Groups this Tag should be available to or be removed from depending on context. For adding availability, if `globally_accessible` is true, this can be an empty array. e.g. `["550e8400-e29b-41d4-a716-446655440000", "4f7e9e5b-d4f5-4a73-8a97-4e6b72fb5c19"]`
- `require_expr_date`: boolean - Controls whether the Tag should require an expiration date when applied to a Person. e.g. `true`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Tag. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `name`: string - The name of the Tag. e.g. `Google Certification`
- `group_ids`: array of string(uuid) - Array of UUIDs representing Groups this Tag is assigned to. Can be empty if `globally_accessible` is true.
- `globally_accessible`: boolean - Indicates if the Tag is globally available to all current and future Groups. e.g. `true`
- `abbreviation`: string - A 5-character max abbreviation for the Tag. e.g. `GOOGl`
- `require_expr_date`: boolean - Indicates whether an expiration date is required when applying the Tag to a Person. e.g. `true`
- `expr_days_warning`: integer - Number of days before expiration when the Tag enters "warning" mode. Only applicable if `require_expr_date` is true. e.g. `30`
- `color`: string - Hexadecimal color code for the Tag. e.g. `#53A9FF`
- `categories`: array of string - Array of Tag Categories the Tag belongs to. Can be empty if not categorized.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/tags/{tag_id}

**Delete a Resource Planning Tag**
Deletes a Resource Planning Tag

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `tag_id` [path] integer (required) - Unique identifier for the tag.

Response 200 (application/json): array of object

- `id`: string(uuid) - Unique identifier for the Tag. e.g. `bc107873-b2fe-4f8f-9879-6d95b4a0684f`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/tags/{tag_id}/groups

**Make Tag from being Available to Group**
Makes a Resource Planning Tag from being Available to a given Group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `tag_id` [path] integer (required) - Unique identifier for the tag.

Request body (application/json):

- `group_ids`: array of string(uuid) (required) - Array of UUIDs for which Groups this Tag should be available to or removed from, depending on the context. If `globally_accessible` is true, this can be an empty array. e.g. `["550e8400-e29b-41d4-a716-446655440000", "4f7e9e5b-d4f5-4a73-8a97-4e6b72fb5c19"]`

Response 200 (application/json): array of object

- `group_ids`: array of string(uuid) - Array of unique identifiers for Groups. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "2d2ad78e-c6de-467e-8413-c616b55294a...`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/tags/{tag_id}/groups/{group_id}

**Remove Tag Availablility to Group**
Removes a Resource Planning Tag from being available to a given group or groups

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `tag_id` [path] integer (required) - Unique identifier for the tag.
- `group_id` [path] integer (required) - Unique identifier for the group
- `group_ids` [query] array of string(uuid) (required) - Array of UUIDs for which Groups this Tag should be available to or be removed from depending on context. For adding availability, if globally_accessible is true, this can be an empty array.

Response 200 (application/json): array of object

- `group_ids`: array of string(uuid) - Array of unique identifiers for Groups. e.g. `["bc107873-b2fe-4f8f-9879-6d95b4a0684f", "2d2ad78e-c6de-467e-8413-c616b55294a...`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time Off

Resource id: `time-off`. Raw spec: `../openapi-raw/time-off.json`. Web: https://developers.procore.com/reference/rest/time-off?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/time-off

**Get All Time Off for a Single Person**
Retrieves all Time Off entries for a specified Person within a company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `timezone` [query] string (required) - The timezone in which to order time off entries.
- `limit` [query] integer - The number of time off records to be returned in a single request. Default is 40.
- `start_after` [query] string(uuid) - Time off ID used for pagination.

Response 200 (application/json): object

- `data`: array of object - List of time off records associated with the person.
  - `id`: string(uuid) - Unique identifier for the Time Off record. e.g. `7263bc0c-68d5-4944-892f-72c770702cc6`
  - `person_id`: string(uuid) - ID of the person associated with this Time Off entry. e.g. `81c63107-6843-4822-be42-a40b41e75285`
  - `company_id`: string(uuid) - ID of the company this Time Off is associated with. e.g. `a4592b47-42ae-478f-926d-e77a7f768059`
  - `start_day`: string - Start date of the time off (MM/DD/YY). e.g. `11/01/23`
  - `end_day`: string - End date of the time off (MM/DD/YY). e.g. `11/29/23`
  - `is_paid`: boolean - Whether the time off is paid. e.g. `true`
  - `reason`: string - Reason for the time off. e.g. `medical`
  - `repeat`: string enum[never, weekly, monthly, yearly] - The repeat interval for recurring time off. e.g. `weekly`
  - `repeat_end_day`: string - The end date of the repeating time off. e.g. `12/01/23`
  - `cadence`: integer - Frequency of repetition (e.g., every 1 week, every 2 weeks). e.g. `1`
  - `apply_to_saturday`: boolean - Whether the time off applies to Saturdays. e.g. `false`
  - `apply_to_sunday`: boolean - Whether the time off applies to Sundays. e.g. `false`
  - `batch_start_time`: string - Start time of the time off (formatted as HH:MM am/pm). e.g. `7:00 AM`
  - `batch_end_time`: string - End time of the time off (formatted as HH:MM am/pm). e.g. `3:30 PM`
  - `instances`: array of object - List of instances for repeating time off.
    - `id`: string(uuid) - Unique identifier for the time off instance. e.g. `e52d54b4-1e61-4324-850d-cf8e62ac201c`
    - `start_day`: string - Start date for the instance. e.g. `11/01/23`
    - `end_day`: string - End date for the instance. e.g. `11/01/23`
- `pagination`: object - Pagination metadata for the time off records.
  - `limit`: integer - The number of records returned in the response. e.g. `40`
  - `next_starting_after`: string(uuid) - The ID of the last record in the response, used for pagination. e.g. `222df6e4-b8ea-46fd-a39c-5570d3fd5ace`
  - `previous_starting_before`: string(uuid) - The ID of the first record in the response, used for reverse pagination.
  - `total_possible`: integer - The total number of records available. e.g. `8`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/time-off

**Create Time Off for a Person**
Creates a new Time Off entry for a specified Person within a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person

Request body (application/json):

- `start_day`: string (required) - The start date of the time off. e.g. `10/23/23`
- `end_day`: string (required) - The end date of the time off. e.g. `10/23/23`
- `apply_to_saturday`: boolean - Whether the time off applies to Saturdays. e.g. `false`
- `apply_to_sunday`: boolean - Whether the time off applies to Sundays. e.g. `false`
- `is_paid`: boolean - Whether the time off is paid. e.g. `true`
- `reason`: string - The reason for the time off. e.g. `medical`
- `repeat`: string enum[never, weekly, monthly, yearly] - Repeat interval of the time off instances. e.g. `weekly`
- `batch_start_time`: string - Start time of the time off (HH:MM am/pm). e.g. `7:30 AM`
- `batch_end_time`: string - End time of the time off (HH:MM am/pm). e.g. `3:30 PM`
- `cadence`: integer - Cadence of the repeating time off. e.g. `1`
- `repeat_end_day`: string - The end date of the repeating time off. e.g. `12/01/23`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Time Off record. e.g. `7263bc0c-68d5-4944-892f-72c770702cc6`
- `person_id`: string(uuid) - ID of the person associated with this Time Off entry. e.g. `81c63107-6843-4822-be42-a40b41e75285`
- `company_id`: string(uuid) - ID of the company this Time Off is associated with. e.g. `a4592b47-42ae-478f-926d-e77a7f768059`
- `start_day`: string - Start date of the time off (MM/DD/YY). e.g. `11/01/23`
- `end_day`: string - End date of the time off (MM/DD/YY). e.g. `11/29/23`
- `is_paid`: boolean - Whether the time off is paid. e.g. `true`
- `reason`: string - Reason for the time off. e.g. `medical`
- `repeat`: string enum[never, weekly, monthly, yearly] - The repeat interval for recurring time off. e.g. `weekly`
- `repeat_end_day`: string - The end date of the repeating time off. e.g. `12/01/23`
- `cadence`: integer - Frequency of repetition (e.g., every 1 week, every 2 weeks). e.g. `1`
- `apply_to_saturday`: boolean - Whether the time off applies to Saturdays. e.g. `false`
- `apply_to_sunday`: boolean - Whether the time off applies to Sundays. e.g. `false`
- `batch_start_time`: string - Start time of the time off (formatted as HH:MM am/pm). e.g. `7:00 AM`
- `batch_end_time`: string - End time of the time off (formatted as HH:MM am/pm). e.g. `3:30 PM`
- `instances`: array of object - List of instances for repeating time off.
  - `id`: string(uuid) - Unique identifier for the time off instance. e.g. `e52d54b4-1e61-4324-850d-cf8e62ac201c`
  - `start_day`: string - Start date for the instance. e.g. `11/01/23`
  - `end_day`: string - End date for the instance. e.g. `11/01/23`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/time-off/{time_off_id}

**Get Single Time Off Record**
Retrieves a specific Time Off record by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `time_off_id` [path] string(uuid) (required) - The UUID of the Time Off record.

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Time Off record. e.g. `7263bc0c-68d5-4944-892f-72c770702cc6`
- `person_id`: string(uuid) - ID of the person associated with this Time Off entry. e.g. `81c63107-6843-4822-be42-a40b41e75285`
- `company_id`: string(uuid) - ID of the company this Time Off is associated with. e.g. `a4592b47-42ae-478f-926d-e77a7f768059`
- `start_day`: string - Start date of the time off (MM/DD/YY). e.g. `11/01/23`
- `end_day`: string - End date of the time off (MM/DD/YY). e.g. `11/29/23`
- `is_paid`: boolean - Whether the time off is paid. e.g. `true`
- `reason`: string - Reason for the time off. e.g. `medical`
- `repeat`: string enum[never, weekly, monthly, yearly] - The repeat interval for recurring time off. e.g. `weekly`
- `repeat_end_day`: string - The end date of the repeating time off. e.g. `12/01/23`
- `cadence`: integer - Frequency of repetition (e.g., every 1 week, every 2 weeks). e.g. `1`
- `apply_to_saturday`: boolean - Whether the time off applies to Saturdays. e.g. `false`
- `apply_to_sunday`: boolean - Whether the time off applies to Sundays. e.g. `false`
- `batch_start_time`: string - Start time of the time off (formatted as HH:MM am/pm). e.g. `7:00 AM`
- `batch_end_time`: string - End time of the time off (formatted as HH:MM am/pm). e.g. `3:30 PM`
- `instances`: array of object - List of instances for repeating time off.
  - `id`: string(uuid) - Unique identifier for the time off instance. e.g. `e52d54b4-1e61-4324-850d-cf8e62ac201c`
  - `start_day`: string - Start date for the instance. e.g. `11/01/23`
  - `end_day`: string - End date for the instance. e.g. `11/01/23`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/time-off/{time_off_id}

**Update a Time Off Record**
Updates an existing Time Off record for a specified Person within a given company. Only specified properties in the request body will be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `time_off_id` [path] string(uuid) (required) - The UUID of the Time Off record.

Request body (application/json):

- `start_day`: string - Start date of the time off (MM/DD/YY). e.g. `12/01/23`
- `end_day`: string - End date of the time off (MM/DD/YY). e.g. `12/01/23`
- `apply_to_saturday`: boolean - Whether the time off applies to Saturdays. e.g. `false`
- `apply_to_sunday`: boolean - Whether the time off applies to Sundays. e.g. `false`
- `is_paid`: boolean - Whether the time off is paid. e.g. `true`
- `reason`: string - Reason for the time off. e.g. `medical`
- `batch_start_time`: string - Start time of the time off (formatted as HH:MM am/pm). e.g. `7:00 AM`
- `batch_end_time`: string - End time of the time off (formatted as HH:MM am/pm). e.g. `3:30 PM`

Response 200 (application/json): object

- `id`: string(uuid) - Unique identifier for the Time Off record. e.g. `7263bc0c-68d5-4944-892f-72c770702cc6`
- `person_id`: string(uuid) - ID of the person associated with this Time Off entry. e.g. `81c63107-6843-4822-be42-a40b41e75285`
- `company_id`: string(uuid) - ID of the company this Time Off is associated with. e.g. `a4592b47-42ae-478f-926d-e77a7f768059`
- `start_day`: string - Start date of the time off (MM/DD/YY). e.g. `11/01/23`
- `end_day`: string - End date of the time off (MM/DD/YY). e.g. `11/29/23`
- `is_paid`: boolean - Whether the time off is paid. e.g. `true`
- `reason`: string - Reason for the time off. e.g. `medical`
- `repeat`: string enum[never, weekly, monthly, yearly] - The repeat interval for recurring time off. e.g. `weekly`
- `repeat_end_day`: string - The end date of the repeating time off. e.g. `12/01/23`
- `cadence`: integer - Frequency of repetition (e.g., every 1 week, every 2 weeks). e.g. `1`
- `apply_to_saturday`: boolean - Whether the time off applies to Saturdays. e.g. `false`
- `apply_to_sunday`: boolean - Whether the time off applies to Sundays. e.g. `false`
- `batch_start_time`: string - Start time of the time off (formatted as HH:MM am/pm). e.g. `7:00 AM`
- `batch_end_time`: string - End time of the time off (formatted as HH:MM am/pm). e.g. `3:30 PM`
- `instances`: array of object - List of instances for repeating time off.
  - `id`: string(uuid) - Unique identifier for the time off instance. e.g. `e52d54b4-1e61-4324-850d-cf8e62ac201c`
  - `start_day`: string - Start date for the instance. e.g. `11/01/23`
  - `end_day`: string - End date for the instance. e.g. `11/01/23`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/people/{person_id}/time-off/{time_off_id}

**Delete a Time Off Record**
Deletes a Time Off record for a specified Person within a given company. The ID of the deleted record is returned upon successful deletion.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `person_id` [path] integer (required) - Unique identifier for the person
- `time_off_id` [path] string(uuid) (required) - The UUID of the Time Off record.

Response 200 (application/json): object

- `data`: object
  - `id`: string(uuid) - Unique identifier of the deleted Time Off record. e.g. `c70b3873-b323-48ef-8255-03daef250057`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

