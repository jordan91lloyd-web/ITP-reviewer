# Procore API: Daily Log (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Daily Log)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Accident Logs](#accident-logs) - versions 1.0
- [Admin Equipment Logs](#admin-equipment-logs) - versions 1.0
- [Call Logs](#call-logs) - versions 1.0
- [Daily Construction Report Logs](#daily-construction-report-logs) - versions 1.0
- [Daily Log Bulk Updates](#daily-log-bulk-updates) - versions 1.0
- [Daily Log Clones](#daily-log-clones) - versions 1.0
- [Daily Log Counts](#daily-log-counts) - versions 1.1
- [Daily Log Headers](#daily-log-headers) - versions 1.0
- [Daily Logs](#daily-logs) - versions 1.0
- [Delay Log Types](#delay-log-types) - versions 1.0
- [Delay Logs](#delay-logs) - versions 1.0
- [Delivery Logs](#delivery-logs) - versions 1.0
- [Dumpster Logs](#dumpster-logs) - versions 1.0
- [Inspection Logs](#inspection-logs) - versions 1.0
- [Instruction Types](#instruction-types) - versions 1.0
- [Instructions](#instructions) - versions 1.0
- [Manpower Logs](#manpower-logs) - versions 1.0
- [Notes Logs](#notes-logs) - versions 1.0
- [Plan Revision Logs](#plan-revision-logs) - versions 1.0
- [Productivity Logs](#productivity-logs) - versions 1.0
- [Quantity Logs](#quantity-logs) - versions 1.0
- [Safety Violation Logs](#safety-violation-logs) - versions 1.0
- [Visitor Logs](#visitor-logs) - versions 1.0
- [Waste Logs](#waste-logs) - versions 1.0
- [Weather Conditions](#weather-conditions) - versions 1.0
- [Weather Logs](#weather-logs) - versions 1.1, 1.0
- [Work Logs](#work-logs) - versions 1.0

## Accident Logs

Resource id: `accident-logs`. Raw spec: `../openapi-raw/accident-logs.json`. Web: https://developers.procore.com/reference/rest/accident-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/accident_logs

**List Accident Logs**
Returns all Accident Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `per_page` [query] integer - Elements per page
- `page` [query] integer - Page
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] integer - Return item(s) created by the specified User ID
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional information about the accident e.g. `There was an accident on the roof`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the accident occurred e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `involved_name`: string - Name of the person involved in the accident e.g. `4`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `involved_company`: string - Name of the Company involved in the accident e.g. `Procore Technologies`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of accident - hour e.g. `10`
- `time_minute`: integer - Time of accident - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/accident_logs

**Create Accident Log**
Creates single Accident Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `accident_log`: object (required)
  - `comments`: string - Additional comments about the accident e.g. `Accident Log comments`
  - `date`: string(date) - Date that the accident occured. Format: YYYY-MM-DD e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `involved_company`: string - Name of the Company involved in the accident e.g. `Procore Technologies`
  - `involved_name`: string - Name of the person involved in the accident e.g. `Roger`
  - `time_hour`: integer - Time of accident - hour e.g. `10`
  - `time_minute`: integer - Time of accident - minute e.g. `15`
  - `vendor_id`: integer - ID of the Vendor associated to the accident e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Accident Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional information about the accident e.g. `There was an accident on the roof`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the accident occurred e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `involved_name`: string - Name of the person involved in the accident e.g. `4`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `involved_company`: string - Name of the Company involved in the accident e.g. `Procore Technologies`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of accident - hour e.g. `10`
- `time_minute`: integer - Time of accident - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/accident_logs/{id}

**Show Accident Logs**
Returns single Accident Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Accident log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional information about the accident e.g. `There was an accident on the roof`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the accident occurred e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `involved_name`: string - Name of the person involved in the accident e.g. `4`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `involved_company`: string - Name of the Company involved in the accident e.g. `Procore Technologies`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of accident - hour e.g. `10`
- `time_minute`: integer - Time of accident - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/accident_logs/{id}

**Update Accident Log**
Update single Accident Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Accident log ID

Request body (application/json) (required):

- `accident_log`: object (required)
  - `comments`: string - Additional comments about the accident e.g. `Accident Log comments`
  - `date`: string(date) - Date that the accident occured. Format: YYYY-MM-DD e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `involved_company`: string - Name of the Company involved in the accident e.g. `Procore Technologies`
  - `involved_name`: string - Name of the person involved in the accident e.g. `Roger`
  - `time_hour`: integer - Time of accident - hour e.g. `10`
  - `time_minute`: integer - Time of accident - minute e.g. `15`
  - `vendor_id`: integer - ID of the Vendor associated to the accident e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Accident Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional information about the accident e.g. `There was an accident on the roof`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the accident occurred e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `involved_name`: string - Name of the person involved in the accident e.g. `4`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `involved_company`: string - Name of the Company involved in the accident e.g. `Procore Technologies`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of accident - hour e.g. `10`
- `time_minute`: integer - Time of accident - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/accident_logs/{id}

**Delete Accident Log**
Delete single Accident Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Accident log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Admin Equipment Logs

Resource id: `admin-equipment-logs`. Raw spec: `../openapi-raw/admin-equipment-logs.json`. Web: https://developers.procore.com/reference/rest/admin-equipment-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/equipment_logs

**List Equipment Logs**
Returns all Equipment Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] integer - Return item(s) created by the specified User ID
- `filters[location_id]` [query] integer - Return item(s) with the specified Location ID.
- `per_page` [query] integer - Elements per page
- `page` [query] integer - Page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hours_idle`: string - Number of hours the Equipment was idle e.g. `2.0`
- `hours_operating`: string - Number of hours the Equipment was in operation e.g. `8.0`
- `inspected`: boolean - Equipment was inspected before operation e.g. `false`
- `inspection_hour`: integer - Time of inspection - hour e.g. `9`
- `inspection_minute`: integer - Time of Inspection - minute e.g. `50`
- `notes`: string - Additional Notes e.g. `Equipment notes`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `equipment`: object - Equipment of Equipment (Legacy) Tool. Can't be present at the same time with 'equipment_register' field
  - `id`: integer e.g. `15504`
  - `project_id`: integer e.g. `14406`
  - `position`: integer e.g. `18300`
  - `name`: string e.g. `Jackhammer`
- `equipment_register`: object - Equipment of Equipment Register (Beta) Tool. Can't be present at the same time with 'equipment' field
  - `id`: string e.g. `01JFDH7QE1W2HC65VTAR4VCR23`
  - `name`: string e.g. `Jackhammer`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - Equipment Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/equipment_logs

**Create Equipment Log**
Creates single Equipment Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `equipment_log`: object (required)
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD e.g. `2016-04-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `hours_idle`: integer - Number of hours the Equipment was idle
  - `hours_operating`: integer - Number of hours the Equipment was in operation
  - `inspected`: boolean - Inspection status of Equipment before operation
  - `inspection_hour`: integer - Time of inspection - hour
  - `inspection_minute`: integer - Time of inspection - minute
  - `notes`: string - Notes
  - `location_id`: integer - The ID of the Location of the Inspection Log. `location_id` takes precedence over `mt_location`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided.
  - `cost_code_id`: integer - Cost Code ID
  - `equipment_id`: integer - Equipment ID. This params is accepted only if project uses Equipment Legacy tool. Use equipment_register_id param if project uses Equipment Beta tool.
  - `equipment_name`: string - Equipment name. This Equipment will create on the fly if it doesn't exist and will take precedence over Equipment ID. This params is accepted only if project uses Equipment Legacy tool. Use equipment_register_id param...
  - `equipment_register_id`: string - This params is accepted only if project uses Equipment Beta tool. Use equipment_id OR equipment_name param if project uses Equipment Legacy tool. e.g. `01JFDH7QE1W2HC65VTAR4VCR23`
  - `vendor_id`: integer - ID of the Vendor associated to the equipment log e.g. `1120327`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hours_idle`: string - Number of hours the Equipment was idle e.g. `2.0`
- `hours_operating`: string - Number of hours the Equipment was in operation e.g. `8.0`
- `inspected`: boolean - Equipment was inspected before operation e.g. `false`
- `inspection_hour`: integer - Time of inspection - hour e.g. `9`
- `inspection_minute`: integer - Time of Inspection - minute e.g. `50`
- `notes`: string - Additional Notes e.g. `Equipment notes`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `equipment`: object - Equipment of Equipment (Legacy) Tool. Can't be present at the same time with 'equipment_register' field
  - `id`: integer e.g. `15504`
  - `project_id`: integer e.g. `14406`
  - `position`: integer e.g. `18300`
  - `name`: string e.g. `Jackhammer`
- `equipment_register`: object - Equipment of Equipment Register (Beta) Tool. Can't be present at the same time with 'equipment' field
  - `id`: string e.g. `01JFDH7QE1W2HC65VTAR4VCR23`
  - `name`: string e.g. `Jackhammer`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - Equipment Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/equipment_logs/{id}

**Show Equipment Logs**
Returns single Equipment Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Equipment Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hours_idle`: string - Number of hours the Equipment was idle e.g. `2.0`
- `hours_operating`: string - Number of hours the Equipment was in operation e.g. `8.0`
- `inspected`: boolean - Equipment was inspected before operation e.g. `false`
- `inspection_hour`: integer - Time of inspection - hour e.g. `9`
- `inspection_minute`: integer - Time of Inspection - minute e.g. `50`
- `notes`: string - Additional Notes e.g. `Equipment notes`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `equipment`: object - Equipment of Equipment (Legacy) Tool. Can't be present at the same time with 'equipment_register' field
  - `id`: integer e.g. `15504`
  - `project_id`: integer e.g. `14406`
  - `position`: integer e.g. `18300`
  - `name`: string e.g. `Jackhammer`
- `equipment_register`: object - Equipment of Equipment Register (Beta) Tool. Can't be present at the same time with 'equipment' field
  - `id`: string e.g. `01JFDH7QE1W2HC65VTAR4VCR23`
  - `name`: string e.g. `Jackhammer`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - Equipment Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/equipment_logs/{id}

**Update Equipment Log**
Update single Equipment Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Equipment Log ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `equipment_log`: object (required)
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD e.g. `2016-04-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `hours_idle`: integer - Number of hours the Equipment was idle
  - `hours_operating`: integer - Number of hours the Equipment was in operation
  - `inspected`: boolean - Inspection status of Equipment before operation
  - `inspection_hour`: integer - Time of inspection - hour
  - `inspection_minute`: integer - Time of inspection - minute
  - `notes`: string - Notes
  - `location_id`: integer - The ID of the Location of the Inspection Log. `location_id` takes precedence over `mt_location`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided.
  - `cost_code_id`: integer - Cost Code ID
  - `equipment_id`: integer - Equipment ID. This params is accepted only if project uses Equipment Legacy tool. Use equipment_register_id param if project uses Equipment Beta tool.
  - `equipment_name`: string - Equipment name. This Equipment will create on the fly if it doesn't exist and will take precedence over Equipment ID. This params is accepted only if project uses Equipment Legacy tool. Use equipment_register_id param...
  - `equipment_register_id`: string - This params is accepted only if project uses Equipment Beta tool. Use equipment_id OR equipment_name param if project uses Equipment Legacy tool. e.g. `01JFDH7QE1W2HC65VTAR4VCR23`
  - `vendor_id`: integer - ID of the Vendor associated to the equipment log e.g. `1120327`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hours_idle`: string - Number of hours the Equipment was idle e.g. `2.0`
- `hours_operating`: string - Number of hours the Equipment was in operation e.g. `8.0`
- `inspected`: boolean - Equipment was inspected before operation e.g. `false`
- `inspection_hour`: integer - Time of inspection - hour e.g. `9`
- `inspection_minute`: integer - Time of Inspection - minute e.g. `50`
- `notes`: string - Additional Notes e.g. `Equipment notes`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `equipment`: object - Equipment of Equipment (Legacy) Tool. Can't be present at the same time with 'equipment_register' field
  - `id`: integer e.g. `15504`
  - `project_id`: integer e.g. `14406`
  - `position`: integer e.g. `18300`
  - `name`: string e.g. `Jackhammer`
- `equipment_register`: object - Equipment of Equipment Register (Beta) Tool. Can't be present at the same time with 'equipment' field
  - `id`: string e.g. `01JFDH7QE1W2HC65VTAR4VCR23`
  - `name`: string e.g. `Jackhammer`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - Equipment Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/equipment_logs/{id}

**Delete Equipment Log**
Delete single Equipment Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Equipment Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Call Logs

Resource id: `call-logs`. Raw spec: `../openapi-raw/call-logs.json`. Web: https://developers.procore.com/reference/rest/call-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/call_logs

**List Call Logs**
Returns all Call Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] integer - Return item(s) created by the specified User ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the call took place e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `subject_to`: string - Name of the person that received the call e.g. `Gino Briones (Procore)`
- `subject_from`: string - Name of the person that called e.g. `Chris Admin (Procore Technologies)`
- `description`: string - Details describing the call e.g. `Important Call`
- `start_hour`: integer - Time when the call started - hour e.g. `10`
- `start_minute`: integer - Time when the call started - minute e.g. `15`
- `end_hour`: integer - Time when the call ended - hour e.g. `11`
- `end_minute`: integer - Time when the call ended - minute e.g. `15`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Position in the list of recorded calls for the day e.g. `142143`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/call_logs

**Create Call Log**
Creates single Call Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `call_log`: object (required)
  - `date`: string(date) - Date that the call took place. Format: YYYY-MM-DD Example: 2016-05-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `description`: string - Description e.g. `Important call from Inspector`
  - `end_hour`: integer - Time when the call ended - hour e.g. `11`
  - `end_minute`: integer - Time when the call ended - minute e.g. `15`
  - `start_hour`: integer - Time when the call started - hour e.g. `10`
  - `start_minute`: integer - Time when the call started - minute e.g. `15`
  - `subject_from`: string - Name of the person that called e.g. `Steven Kang (Procore Technologies)`
  - `subject_to`: string - Name of the person that received the call e.g. `Gino Briones (Procore)`
  - `vendor_id`: integer - ID of the Vendor associated to the Call Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Call Log e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the call took place e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `subject_to`: string - Name of the person that received the call e.g. `Gino Briones (Procore)`
- `subject_from`: string - Name of the person that called e.g. `Chris Admin (Procore Technologies)`
- `description`: string - Details describing the call e.g. `Important Call`
- `start_hour`: integer - Time when the call started - hour e.g. `10`
- `start_minute`: integer - Time when the call started - minute e.g. `15`
- `end_hour`: integer - Time when the call ended - hour e.g. `11`
- `end_minute`: integer - Time when the call ended - minute e.g. `15`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Position in the list of recorded calls for the day e.g. `142143`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/call_logs/{id}

**Show Call Logs**
Returns single Call Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Call log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the call took place e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `subject_to`: string - Name of the person that received the call e.g. `Gino Briones (Procore)`
- `subject_from`: string - Name of the person that called e.g. `Chris Admin (Procore Technologies)`
- `description`: string - Details describing the call e.g. `Important Call`
- `start_hour`: integer - Time when the call started - hour e.g. `10`
- `start_minute`: integer - Time when the call started - minute e.g. `15`
- `end_hour`: integer - Time when the call ended - hour e.g. `11`
- `end_minute`: integer - Time when the call ended - minute e.g. `15`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Position in the list of recorded calls for the day e.g. `142143`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/call_logs/{id}

**Update Call Log**
Update single Call Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Call log ID

Request body (application/json) (required):

- `call_log`: object (required)
  - `date`: string(date) - Date that the call took place. Format: YYYY-MM-DD Example: 2016-05-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `description`: string - Description e.g. `Important call from Inspector`
  - `end_hour`: integer - Time when the call ended - hour e.g. `11`
  - `end_minute`: integer - Time when the call ended - minute e.g. `15`
  - `start_hour`: integer - Time when the call started - hour e.g. `10`
  - `start_minute`: integer - Time when the call started - minute e.g. `15`
  - `subject_from`: string - Name of the person that called e.g. `Steven Kang (Procore Technologies)`
  - `subject_to`: string - Name of the person that received the call e.g. `Gino Briones (Procore)`
  - `vendor_id`: integer - ID of the Vendor associated to the Call Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Call Log e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date that the call took place e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `subject_to`: string - Name of the person that received the call e.g. `Gino Briones (Procore)`
- `subject_from`: string - Name of the person that called e.g. `Chris Admin (Procore Technologies)`
- `description`: string - Details describing the call e.g. `Important Call`
- `start_hour`: integer - Time when the call started - hour e.g. `10`
- `start_minute`: integer - Time when the call started - minute e.g. `15`
- `end_hour`: integer - Time when the call ended - hour e.g. `11`
- `end_minute`: integer - Time when the call ended - minute e.g. `15`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Position in the list of recorded calls for the day e.g. `142143`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/call_logs/{id}

**Delete Call Log**
Delete single Call Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Call log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Daily Construction Report Logs

Resource id: `daily-construction-report-logs`. Raw spec: `../openapi-raw/daily-construction-report-logs.json`. Web: https://developers.procore.com/reference/rest/daily-construction-report-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/daily_construction_report_logs

**List Daily Construction Report Logs**
Returns all approved Daily Construction Report Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[status]` [query] string - Filter on status for "pending" or "approved" or "all"
- `filters[created_by_id]` [query] integer - Return item(s) created by the specified User ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `apprentice_hours`: string - Number of hours the apprentice workers were on site e.g. `5.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of the report e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `first_year_hours`: string - Number of hours performed by first-year apprentices e.g. `3.5`
- `foreman_hours`: string - Number of hours that the foremen were on site e.g. `5.0`
- `journeyman_hours`: string - Number of hours that the journeymen were on site e.g. `5.0`
- `local_city_hours`: string - Number of hours performed by local city resident workers e.g. `3.5`
- `local_county_hours`: string - Number of hours performed by local county resident workers e.g. `3.5`
- `minority_hours`: string - Number of hours performed by minority workers e.g. `3.5`
- `notes`: string - Additional notes e.g. `Daily Construction Report Log note`
- `number_of_apprentice_workers`: integer - Number of apprentice workers on site e.g. `4`
- `number_of_foreman_workers`: integer - Number of foremen on site e.g. `4`
- `number_of_journeyman_workers`: integer - Number of journeymen on site e.g. `4`
- `number_of_other_workers`: integer - Number of other workers on site e.g. `4`
- `other_hours`: string - Number of hours that the other worker were on site e.g. `5.0`
- `position`: integer - Position in the list Daily Construction Reports e.g. `53253`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `veteran_hours`: string - Number of hours performed by veteran workers e.g. `3.5`
- `women_hours`: string - Number of hours performed by women workers e.g. `3.5`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/daily_construction_report_logs

**Create Daily Construction Report Log**
Creates single Daily Construction Report Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `daily_construction_report_log`: object (required)
  - `apprentice_hours`: string - Number of hours that the Apprentice workers were on site e.g. `3.0`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `first_year_hours`: string - Number of hours performed by first-year apprentices e.g. `3.5`
  - `foreman_hours`: string - Number of hours that the foremen were on site e.g. `1.0`
  - `journeyman_hours`: string - Number of hours that the journeymen were on site e.g. `2.0`
  - `local_city_hours`: string - Number of hours performed by local city resident workers e.g. `3.5`
  - `local_county_hours`: string - Number of hours performed by local county resident workers e.g. `3.5`
  - `location_id`: integer - The ID of the Location e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `minority_hours`: string - Number of hours performed by minority workers e.g. `3.5`
  - `notes`: string - Additional notes e.g. `No other workers on site today`
  - `number_of_apprentice_workers`: integer - Number of apprentice workers on site e.g. `4`
  - `number_of_foreman_workers`: integer - Number of foremen on site e.g. `3`
  - `number_of_journeyman_workers`: integer - Number of journeymen on site e.g. `4`
  - `number_of_other_workers`: integer - Number of other workers on site e.g. `5`
  - `other_hours`: string - Number of hours that other workers were on site e.g. `4.0`
  - `vendor_id`: integer - ID of the Vendor associated to the report e.g. `1120327`
  - `veteran_hours`: string - Number of hours performed by veteran workers e.g. `3.5`
  - `women_hours`: string - Number of hours performed by women workers e.g. `3.5`
  - `trade_id`: integer - ID of the Trade associated to the report e.g. `100884`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `apprentice_hours`: string - Number of hours the apprentice workers were on site e.g. `5.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of the report e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `first_year_hours`: string - Number of hours performed by first-year apprentices e.g. `3.5`
- `foreman_hours`: string - Number of hours that the foremen were on site e.g. `5.0`
- `journeyman_hours`: string - Number of hours that the journeymen were on site e.g. `5.0`
- `local_city_hours`: string - Number of hours performed by local city resident workers e.g. `3.5`
- `local_county_hours`: string - Number of hours performed by local county resident workers e.g. `3.5`
- `minority_hours`: string - Number of hours performed by minority workers e.g. `3.5`
- `notes`: string - Additional notes e.g. `Daily Construction Report Log note`
- `number_of_apprentice_workers`: integer - Number of apprentice workers on site e.g. `4`
- `number_of_foreman_workers`: integer - Number of foremen on site e.g. `4`
- `number_of_journeyman_workers`: integer - Number of journeymen on site e.g. `4`
- `number_of_other_workers`: integer - Number of other workers on site e.g. `4`
- `other_hours`: string - Number of hours that the other worker were on site e.g. `5.0`
- `position`: integer - Position in the list Daily Construction Reports e.g. `53253`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `veteran_hours`: string - Number of hours performed by veteran workers e.g. `3.5`
- `women_hours`: string - Number of hours performed by women workers e.g. `3.5`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/daily_construction_report_logs/{id}

**Show Daily Construction Report Logs**
Returns single Daily Construction Report Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Daily Construction Report Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `apprentice_hours`: string - Number of hours the apprentice workers were on site e.g. `5.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of the report e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `first_year_hours`: string - Number of hours performed by first-year apprentices e.g. `3.5`
- `foreman_hours`: string - Number of hours that the foremen were on site e.g. `5.0`
- `journeyman_hours`: string - Number of hours that the journeymen were on site e.g. `5.0`
- `local_city_hours`: string - Number of hours performed by local city resident workers e.g. `3.5`
- `local_county_hours`: string - Number of hours performed by local county resident workers e.g. `3.5`
- `minority_hours`: string - Number of hours performed by minority workers e.g. `3.5`
- `notes`: string - Additional notes e.g. `Daily Construction Report Log note`
- `number_of_apprentice_workers`: integer - Number of apprentice workers on site e.g. `4`
- `number_of_foreman_workers`: integer - Number of foremen on site e.g. `4`
- `number_of_journeyman_workers`: integer - Number of journeymen on site e.g. `4`
- `number_of_other_workers`: integer - Number of other workers on site e.g. `4`
- `other_hours`: string - Number of hours that the other worker were on site e.g. `5.0`
- `position`: integer - Position in the list Daily Construction Reports e.g. `53253`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `veteran_hours`: string - Number of hours performed by veteran workers e.g. `3.5`
- `women_hours`: string - Number of hours performed by women workers e.g. `3.5`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/daily_construction_report_logs/{id}

**Update Daily Construction Report Log**
Update single Daily Construction Report Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Daily Construction Report Log ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `daily_construction_report_log`: object (required)
  - `apprentice_hours`: string - Number of hours that the Apprentice workers were on site e.g. `3.0`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `first_year_hours`: string - Number of hours performed by first-year apprentices e.g. `3.5`
  - `foreman_hours`: string - Number of hours that the foremen were on site e.g. `1.0`
  - `journeyman_hours`: string - Number of hours that the journeymen were on site e.g. `2.0`
  - `local_city_hours`: string - Number of hours performed by local city resident workers e.g. `3.5`
  - `local_county_hours`: string - Number of hours performecd by local county resident workers e.g. `3.5`
  - `location_id`: integer - The ID of the Location e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `minority_hours`: string - Number of hours performed by minority workers e.g. `3.5`
  - `notes`: string - Additional notes e.g. `No other workers on site today`
  - `number_of_apprentice_workers`: integer - Number of apprentice workers on site e.g. `4`
  - `number_of_foreman_workers`: integer - Number of foremen on site e.g. `3`
  - `number_of_journeyman_workers`: integer - Number of journeymen on site e.g. `4`
  - `number_of_other_workers`: integer - Number of other workers on site e.g. `5`
  - `other_hours`: string - Number of hours that the other workers were on site e.g. `4.0`
  - `vendor_id`: integer - The ID of the associated Vendor e.g. `1120327`
  - `status`: string - Approval for pending logs e.g. `approved`
  - `trade_id`: integer - The ID of the associated trade e.g. `100884`
  - `veteran_hours`: string - Number of hours performed by veteran workers e.g. `3.5`
  - `women_hours`: string - Number of hours performed by women workers e.g. `3.5`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `apprentice_hours`: string - Number of hours the apprentice workers were on site e.g. `5.0`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of the report e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `first_year_hours`: string - Number of hours performed by first-year apprentices e.g. `3.5`
- `foreman_hours`: string - Number of hours that the foremen were on site e.g. `5.0`
- `journeyman_hours`: string - Number of hours that the journeymen were on site e.g. `5.0`
- `local_city_hours`: string - Number of hours performed by local city resident workers e.g. `3.5`
- `local_county_hours`: string - Number of hours performed by local county resident workers e.g. `3.5`
- `minority_hours`: string - Number of hours performed by minority workers e.g. `3.5`
- `notes`: string - Additional notes e.g. `Daily Construction Report Log note`
- `number_of_apprentice_workers`: integer - Number of apprentice workers on site e.g. `4`
- `number_of_foreman_workers`: integer - Number of foremen on site e.g. `4`
- `number_of_journeyman_workers`: integer - Number of journeymen on site e.g. `4`
- `number_of_other_workers`: integer - Number of other workers on site e.g. `4`
- `other_hours`: string - Number of hours that the other worker were on site e.g. `5.0`
- `position`: integer - Position in the list Daily Construction Reports e.g. `53253`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `veteran_hours`: string - Number of hours performed by veteran workers e.g. `3.5`
- `women_hours`: string - Number of hours performed by women workers e.g. `3.5`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
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
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/daily_construction_report_logs/{id}

**Delete Daily Construction Report Log**
Delete single Daily Construction Report Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Daily Construction Report Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/daily_construction_report_logs/vendor_options

**List Daily Construction Report Logs Vendor Options**
Returns all Vendors that can be assigned to a new Daily Construction Report Log given the current user permissions

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
- `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Daily Log Bulk Updates

Resource id: `daily-log-bulk-updates`. Raw spec: `../openapi-raw/daily-log-bulk-updates.json`. Web: https://developers.procore.com/reference/rest/daily-log-bulk-updates?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### PATCH /rest/v1.0/projects/{project_id}/daily_logs/bulk_updates/bulk_update

**Bulk Updates for Daily Logs**
Updates multiple daily logs with single request. Currently only status update is available. 300 logs maximum is allowed per request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: object (required)
  - `accident_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `call_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `delay_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `delivery_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `dumpster_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `equipment_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `inspection_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `manpower_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `daily_construction_report_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `notes_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `plan_revision_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `productivity_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `quantity_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `safety_violation_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `timecard_entry`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `visitor_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `waste_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `work_log`: array of object - Array of Update Data for Log Type
    - `id`: integer (required) - The ID of the Log e.g. `123`
    - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`

Response 200 (application/json): array of object

- `accident_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `call_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `delay_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `delivery_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `dumpster_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `equipment_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `inspection_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `manpower_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `daily_construction_report_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `notes_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `plan_revision_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `productivity_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `quantity_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `safety_violation_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `timecard_entry`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `visitor_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `waste_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`
- `work_log`: array of object - Array of Response Data for Log Type
  - `id`: integer (required) - The ID of the Log e.g. `123`
  - `status`: string enum[pending, approved, rejected] (required) - Status of the Log e.g. `approved`
  - `success`: boolean (required) - Is update was successful e.g. `true`
  - `error`: string - Error description if update for log was not successful e.g. `Log type is invalid`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Daily Log Clones

Resource id: `daily-log-clones`. Raw spec: `../openapi-raw/daily-log-clones.json`. Web: https://developers.procore.com/reference/rest/daily-log-clones?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### POST /rest/v1.0/projects/{project_id}/daily_logs/clones

**Clones Daily Logs from one Date to another Date**
Clones Daily Logs of the given log_types from the from_date to the to_date.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (application/json) (required):

- `from_date`: string(date) (required) - Date to copy logs from in YYYY-MM-DD format e.g. `2020-11-12`
- `to_date`: string(date) (required) - Date to copy logs to in YYYY-MM-DD format e.g. `2020-11-12`
- `log_types`: array of string enum[accident_log, call_log, delay_log, delivery_log, dumpster_log, equipment_log, inspection_log, manpower_log, daily_construction_report_log, notes_log, plan_revision_log, productivity_log, ...] (required) - Log types to copy. More than one log type can be provided.
- `daily_log_segment_id`: integer - Optional. The ID of the daily log area to filter logs by. Only logs belonging to the specified area will be copied. If the area has associated log types, only those log types will be allowed. e.g. `140`

Response 200: OK (Duplicate Idempotency-token header) (no body)

Response 201 (application/json): object

- `notes_log`: object
  - `id`: number e.g. `9`
  - `comment`: string e.g. `123`
  - `created_at`: string(date-time) e.g. `2021-01-07T21:37:43Z`
  - `created_by_collaborator`: boolean
  - `custom_fields`: object
  - `date`: string(date) e.g. `2021-01-07`
  - `datetime`: string(date-time) e.g. `2021-01-07T20:00:00Z`
  - `daily_log_header_id`: number e.g. `4`
  - `deleted_at`: string
  - `is_issue_day`: string
  - `permissions`: object
    - `can_update`: boolean
    - `can_delete`: boolean
  - `position`: number e.g. `9`
  - `updated_at`: string(date-time) e.g. `2021-01-07T21:37:43Z`
  - `status`: string e.g. `approved`
  - `attachments`: array of object
  - `created_by`: object
    - `id`: number e.g. `3`
    - `login`: string e.g. `carl.contractor@example.com`
    - `name`: string
  - `location`: string

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Daily Log Counts

Resource id: `daily-log-counts`. Raw spec: `../openapi-raw/daily-log-counts.json`. Web: https://developers.procore.com/reference/rest/daily-log-counts?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/daily_logs/counts

**List Counts of Daily Logs**
Returns counts of all daily logs arranged by type, given the current user permissions. Read Only/Standard users will
see only counts of approved logs, Collaborator users will see only counts of logs created by themselves, Admins
can use filter options to see all logs, or only a specific approval status (defaulting to approved).
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired. Example formats YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY
- `start_date` [query] string(date) - Start date of specific logs desired. Use together with end_date to specify a date range. Example formats YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY
- `end_date` [query] string(date) - End date of specific logs desired. Use together with start_date to specify a date range. Example formats YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY
- `filters[status]` [query] string enum[all, approved, pending] - Filter on log status
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `module_name`: string - The name of the log type e.g. `manpower_log`
- `count`: integer - The number of logs that match the current date and permissions filters for this module e.g. `11`
- `position`: integer - The position this module is shown at, on the web e.g. `6`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Daily Log Headers

Resource id: `daily-log-headers`. Raw spec: `../openapi-raw/daily-log-headers.json`. Web: https://developers.procore.com/reference/rest/daily-log-headers?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/daily_log_headers

**Get the Daily Log Header via date or id**
Returns the Daily Log Header for a given date or id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [query] integer - The id of the requested Daily Log Header
- `log_date` [query] string(date) - The log date for the requested Daily Log Header

Response 200 (application/json): object

- `id`: integer - The id of the daily log header e.g. `12345`
- `log_date`: string(date) - Date that this daily log header represents Format: YYYY-MM-DD Example: 2016-05-19 e.g. `2016-05-19`
- `log_datetime`: string(date-time) - Estimated UTC datetime that this daily log header represents e.g. `2016-05-19T12:00:00Z`
- `completed`: boolean - Is this log date marked as complete? e.g. `true`
- `completed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `completed_at`: string(date-time) - Daily log header marked complete at e.g. `2017-09-19T20:02:27Z`
- `completable`: boolean - Is this log date able to be completed? e.g. `true`
- `distributed`: boolean - Is this log date marked as distributed? e.g. `true`
- `distributed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distributed_at`: string(date-time) - Daily log header marked distributed at e.g. `2017-09-19T20:02:27Z`
- `distributable`: boolean - Is this log date able to be distributed? e.g. `true`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/daily_log_headers

**Update the state of a Daily Log Header**
Sets the completed boolean value and/or distributes the Daily Log to its distribution list

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [query] integer - The id of the requested Daily Log Header
- `log_date` [query] string(date) - The log date for the requested Daily Log Header
- `app_name` [query] string - The name of app which issues this request. If app name is 'web' and request completes day then web filters of user which completes day are applied to pdf which is sent to distribution users.

Request body (application/json) (required):

- `daily_log_header`: object (required)
  - `completed`: boolean (required) - Set the completion status for the day e.g. `true`
  - `distributed`: boolean (required) - Distribute the Daily Log for the day e.g. `true`

Response 200 (application/json): object

- `id`: integer - The id of the daily log header e.g. `12345`
- `log_date`: string(date) - Date that this daily log header represents Format: YYYY-MM-DD Example: 2016-05-19 e.g. `2016-05-19`
- `log_datetime`: string(date-time) - Estimated UTC datetime that this daily log header represents e.g. `2016-05-19T12:00:00Z`
- `completed`: boolean - Is this log date marked as complete? e.g. `true`
- `completed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `completed_at`: string(date-time) - Daily log header marked complete at e.g. `2017-09-19T20:02:27Z`
- `completable`: boolean - Is this log date able to be completed? e.g. `true`
- `distributed`: boolean - Is this log date marked as distributed? e.g. `true`
- `distributed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distributed_at`: string(date-time) - Daily log header marked distributed at e.g. `2017-09-19T20:02:27Z`
- `distributable`: boolean - Is this log date able to be distributed? e.g. `true`

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/daily_log_headers/index

**Get Daily Log Headers for the Project**
Returns Daily Log Headers for the Project. When no date range is supplied, results default to the project's creation date through today. Daily Log Headers dated before the project's creation date are returned only when an explicit `start_date` earlier than that date is supplied.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `start_date` [query] string(date) - The left (earliest) boundary of the requested date range, inclusive, matched against each header's `log_date`. Defaults to the project's creation date when omitted. Supply a `start_date` earlier than the project's cre...
- `end_date` [query] string(date) - The right (latest) boundary of the requested date range, inclusive, matched against each header's `log_date`. Defaults to today when omitted and is always capped at today, so a future `end_date` returns results only t...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - The id of the daily log header e.g. `12345`
- `log_date`: string(date) - Date that this daily log header represents Format: YYYY-MM-DD Example: 2016-05-19 e.g. `2016-05-19`
- `log_datetime`: string(date-time) - Estimated UTC datetime that this daily log header represents e.g. `2016-05-19T12:00:00Z`
- `completed`: boolean - Is this log date marked as complete? e.g. `true`
- `completed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `completed_at`: string(date-time) - Daily log header marked complete at e.g. `2017-09-19T20:02:27Z`
- `completable`: boolean - Is this log date able to be completed? e.g. `true`
- `distributed`: boolean - Is this log date marked as distributed? e.g. `true`
- `distributed_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distributed_at`: string(date-time) - Daily log header marked distributed at e.g. `2017-09-19T20:02:27Z`
- `distributable`: boolean - Is this log date able to be distributed? e.g. `true`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Daily Logs

Resource id: `daily-logs`. Raw spec: `../openapi-raw/daily-logs.json`. Web: https://developers.procore.com/reference/rest/daily-logs?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/daily_logs/count  **[DEPRECATED]**

**List Counts of Daily Logs**
Returns counts of all daily logs arranged by type, given the current user permissions. Read Only/Standard users will
see only counts of approved logs, Collaborator users will see only counts of logs created by themselves, Admins
can use filter options to see all logs, or only a specific approval status (defaulting to approved).
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.
This is a deprecated endpoint, please use [/rest/v1.1/projects/{project_id}/daily_logs/counts](daily_logs#counts)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[status]` [query] string - Filter on status for "pending" or "approved" or "all"
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.

Response 200 (application/json): array of object

- `module_name`: string - The name of the log type e.g. `manpower_log`
- `count`: integer - The number of logs that match the current date and permissions filters for this module e.g. `11`
- `position`: integer - The position this module is shown at, on the web e.g. `6`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Delay Log Types

Resource id: `delay-log-types`. Raw spec: `../openapi-raw/delay-log-types.json`. Web: https://developers.procore.com/reference/rest/delay-log-types?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/daily_logs/delay_log_types

**List Delay Log Types**
Returns all Delay Log Types associated with the project and their visibility.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[visible]` [query] string enum[true, false, false...true] - Filter Delay Log Types based on visible. Defaults to true, to query all types pass 'false...true'
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer e.g. `579`
- `display_name`: string - The name displayed in the web UI e.g. `Existing Conditions`
- `translation_key`: string - The key used to translate default delay log types e.g. `existing_conditions`
- `visible`: boolean - Whether the type is visible in the UI e.g. `true`
- `created_at`: string(date-time) - The UTC datetime for the creation of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`
- `updated_at`: string(date-time) - The UTC datetime for the last update of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/daily_logs/delay_log_types

**Create new Delay Log Type**
Create a new Delay Log Type for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `delay_log_type`: object (required)
  - `display_name`: string (required) - The name displayed in the web UI e.g. `Custom Condition`
  - `visible`: boolean - Whether the delay log type is displayed in the UI. Defaults to true e.g. `true`

Response 201 (application/json): object

- `id`: integer e.g. `579`
- `display_name`: string - The name displayed in the web UI e.g. `Existing Conditions`
- `translation_key`: string - The key used to translate default delay log types e.g. `existing_conditions`
- `visible`: boolean - Whether the type is visible in the UI e.g. `true`
- `created_at`: string(date-time) - The UTC datetime for the creation of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`
- `updated_at`: string(date-time) - The UTC datetime for the last update of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/daily_logs/delay_log_types/{id}

**Update a Delay Log Type**
Update the visibility of a Delay Log Type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Delay Log Type ID

Request body (application/json) (required):

- `delay_log_type`: object (required)
  - `visible`: boolean - Whether the Delay Log Type is visible in the UI e.g. `false`

Response 200 (application/json): object

- `id`: integer e.g. `579`
- `display_name`: string - The name displayed in the web UI e.g. `Existing Conditions`
- `translation_key`: string - The key used to translate default delay log types e.g. `existing_conditions`
- `visible`: boolean - Whether the type is visible in the UI e.g. `true`
- `created_at`: string(date-time) - The UTC datetime for the creation of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`
- `updated_at`: string(date-time) - The UTC datetime for the last update of the resource in ISO 8601 format. e.g. `2019-09-14T16:20:00Z`

Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Delay Logs

Resource id: `delay-logs`. Raw spec: `../openapi-raw/delay-logs.json`. Web: https://developers.procore.com/reference/rest/delay-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/delay_logs

**List Delay Logs**
Returns all Delay Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Delay Log comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delay_type`: string - Type of delay e.g. `weather`
- `duration`: integer - Number of hours the delay lasted (between 1 and 24) e.g. `5`
- `end_time`: string - Time when the delay ended, Format: HH:MM Example: 21:39 e.g. `21:39`
- `end_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `end_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `start_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `start_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/delay_logs

**Create Delay Log**
Creates single Delay Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `delay_log`: object (required)
  - `comments`: string - Additional comments e.g. `Nothing to say`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `daily_log_header_id`: integer - Daily Log Header ID e.g. `76384`
  - `delay_type`: string - Type of delay e.g. `weather`
  - `location_id`: integer - The ID of the Location of the Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `start_time`: string - Time when the delay started, Format: HH:MM Example: 21:39 e.g. `21:39`
  - `start_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
  - `start_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
  - `end_time`: string - Time when the delay started, Format: HH:MM Example: 21:39 e.g. `21:39`
  - `end_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
  - `end_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
  - `vendor_id`: integer - ID of the Vendor associated to the delay log e.g. `1120327`
  - `cost_code_id`: integer - ID of the Cost Code associated to the delay log e.g. `11241`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Delay Log comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delay_type`: string - Type of delay e.g. `weather`
- `duration`: integer - Number of hours the delay lasted (between 1 and 24) e.g. `5`
- `end_time`: string - Time when the delay ended, Format: HH:MM Example: 21:39 e.g. `21:39`
- `end_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `end_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `start_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `start_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/delay_logs/{id}

**Show Delay Logs**
Returns single Delay Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Delay log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Delay Log comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delay_type`: string - Type of delay e.g. `weather`
- `duration`: integer - Number of hours the delay lasted (between 1 and 24) e.g. `5`
- `end_time`: string - Time when the delay ended, Format: HH:MM Example: 21:39 e.g. `21:39`
- `end_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `end_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `start_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `start_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/delay_logs/{id}

**Update Delay Log**
Update single Delay Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Delay log ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `delay_log`: object (required)
  - `comments`: string - Additional comments e.g. `No Additional comments`
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `daily_log_header_id`: integer - Daily Log Header ID e.g. `76384`
  - `delay_type`: string - Type of delay e.g. `weather`
  - `location_id`: integer - The ID of the Location of the Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `start_time`: string - Time when the delay started, Format: HH:MM Example: 21:39 e.g. `21:39`
  - `start_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
  - `start_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
  - `end_time`: string - Time when the delay started, Format: HH:MM Example: 21:39 e.g. `21:39`
  - `end_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
  - `end_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
  - `vendor_id`: integer - ID of the Vendor associated to the delay log e.g. `1120327`
  - `cost_code_id`: integer - ID of the Cost Code associated to the delay log e.g. `11241`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Delay Log comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delay_type`: string - Type of delay e.g. `weather`
- `duration`: integer - Number of hours the delay lasted (between 1 and 24) e.g. `5`
- `end_time`: string - Time when the delay ended, Format: HH:MM Example: 21:39 e.g. `21:39`
- `end_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `end_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `start_time_hour`: number - Number between 0 and 23 representing hour of day e.g. `21`
- `start_time_minute`: number - Number between 0 and 59 representing minute e.g. `39`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/delay_logs/{id}

**Delete Delay Log**
Delete single Delay Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Delay log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Delivery Logs

Resource id: `delivery-logs`. Raw spec: `../openapi-raw/delivery-logs.json`. Web: https://developers.procore.com/reference/rest/delivery-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/delivery_logs

**List Delivery Logs**
Returns all approved Delivery Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[status]` [query] string - Filter on status for "pending" or "approved" or "all"
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Additional comments e.g. `Delivered on Time`
- `contents`: string - Contents of the delivery e.g. `Delivery Content`
- `date`: string(date) - Date of delivery e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delivery_from`: string - Name of the Company that delivered the items e.g. `1`
- `position`: integer - Position in the list of recorded deliveries for the day e.g. `1`
- `status`: string - Is a log pending or approved e.g. `pending`
- `time_hour`: integer - Time of delivery - hour e.g. `14`
- `time_minute`: integer - Time of delivery - minute e.g. `0`
- `tracking_number`: string - Tracking number for the delivery e.g. `123`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/delivery_logs

**Create Delivery Log**
Creates single Delivery Log in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `delivery_log`: object (required)
  - `comments`: string - Additional comments
  - `contents`: string - Contents of the delivery
  - `date`: string(date) - (ie. '2016-04-19')
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `delivery_from`: string - Name of the Company that delivered the items
  - `time_hour`: integer - Time of delivery - hour
  - `time_minute`: integer - Time of delivery - minute
  - `tracking_number`: string - Tracking number for the delivery
  - `vendor_id`: integer - ID of the Vendor associated to the Delivery Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Delivery Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Additional comments e.g. `Delivered on Time`
- `contents`: string - Contents of the delivery e.g. `Delivery Content`
- `date`: string(date) - Date of delivery e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delivery_from`: string - Name of the Company that delivered the items e.g. `1`
- `position`: integer - Position in the list of recorded deliveries for the day e.g. `1`
- `status`: string - Is a log pending or approved e.g. `pending`
- `time_hour`: integer - Time of delivery - hour e.g. `14`
- `time_minute`: integer - Time of delivery - minute e.g. `0`
- `tracking_number`: string - Tracking number for the delivery e.g. `123`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/delivery_logs/{id}

**Show Delivery Log**
Returns single Delivery Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Delivery Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Additional comments e.g. `Delivered on Time`
- `contents`: string - Contents of the delivery e.g. `Delivery Content`
- `date`: string(date) - Date of delivery e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delivery_from`: string - Name of the Company that delivered the items e.g. `1`
- `position`: integer - Position in the list of recorded deliveries for the day e.g. `1`
- `status`: string - Is a log pending or approved e.g. `pending`
- `time_hour`: integer - Time of delivery - hour e.g. `14`
- `time_minute`: integer - Time of delivery - minute e.g. `0`
- `tracking_number`: string - Tracking number for the delivery e.g. `123`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/delivery_logs/{id}

**Update Delivery Log**
Update single Delivery Log in the specfied Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Delivery Log ID

Request body (application/json) (required):

- `delivery_log`: object (required)
  - `comments`: string - All supplies were delivered on time
  - `contents`: string - Contents of the delivery
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `delivery_from`: string - Company that deliveried the items
  - `time_hour`: integer - Delivery Time - hour
  - `time_minute`: integer - Delivery Time - minute
  - `tracking_number`: string - Delivery tracking number
  - `status`: string - Approval for pending logs e.g. `approved`
  - `vendor_id`: integer - ID of the Vendor associated to the Delivery Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Delivery Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Additional comments e.g. `Delivered on Time`
- `contents`: string - Contents of the delivery e.g. `Delivery Content`
- `date`: string(date) - Date of delivery e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `delivery_from`: string - Name of the Company that delivered the items e.g. `1`
- `position`: integer - Position in the list of recorded deliveries for the day e.g. `1`
- `status`: string - Is a log pending or approved e.g. `pending`
- `time_hour`: integer - Time of delivery - hour e.g. `14`
- `time_minute`: integer - Time of delivery - minute e.g. `0`
- `tracking_number`: string - Tracking number for the delivery e.g. `123`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/delivery_logs/{id}

**Delete Delivery Log**
Delete single Delivery Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Delivery Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Dumpster Logs

Resource id: `dumpster-logs`. Raw spec: `../openapi-raw/dumpster-logs.json`. Web: https://developers.procore.com/reference/rest/dumpster-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/dumpster_logs

**List Dumpster Logs**
Returns all Dumpster Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Dumpster Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `quantity_delivered`: integer - Number of dumpsters delivered on site e.g. `5`
- `quantity_removed`: integer - Number of dumpsters removed from site e.g. `2`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Dumpster Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/dumpster_logs

**Create Dumpster Log**
Creates single Dumpster Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `dumpster_log`: object (required)
  - `comments`: string - Additional comments e.g. `Dumpsters delivered on time`
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
  - `location_id`: integer - The ID of the Location e.g. `153252`
  - `quantity_delivered`: integer - Number of dumpsters delivered on e.g. `5`
  - `quantity_removed`: integer - Number of dumpsters removed from site e.g. `2`
  - `vendor_id`: integer - Associated Vendor ID e.g. `1120327`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Dumpster Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `quantity_delivered`: integer - Number of dumpsters delivered on site e.g. `5`
- `quantity_removed`: integer - Number of dumpsters removed from site e.g. `2`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Dumpster Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/dumpster_logs/{id}

**Show Dumpster Logs**
Returns single Dumpster Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Dumpster Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Dumpster Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `quantity_delivered`: integer - Number of dumpsters delivered on site e.g. `5`
- `quantity_removed`: integer - Number of dumpsters removed from site e.g. `2`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Dumpster Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/dumpster_logs/{id}

**Update Dumpster Log**
Update single Dumpster Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Dumpster Log ID

Request body (application/json) (required):

- `dumpster_log`: object (required)
  - `comments`: string - Additional comments e.g. `Dumpsters delivered on time`
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
  - `location_id`: integer - The ID of the Location e.g. `153252`
  - `quantity_delivered`: integer - Number of dumpsters delivered on e.g. `5`
  - `quantity_removed`: integer - Number of dumpsters removed from site e.g. `2`
  - `vendor_id`: integer - Associated Vendor ID e.g. `1120327`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comments`: string - Additional comments e.g. `Dumpster Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `quantity_delivered`: integer - Number of dumpsters delivered on site e.g. `5`
- `quantity_removed`: integer - Number of dumpsters removed from site e.g. `2`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Dumpster Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/dumpster_logs/{id}

**Delete Dumpster Log**
Delete single Dumpster Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Dumpster Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Inspection Logs

Resource id: `inspection-logs`. Raw spec: `../openapi-raw/inspection-logs.json`. Web: https://developers.procore.com/reference/rest/inspection-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/inspection_logs

**List Inspection Logs**
Returns all Inspection Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `area`: string - Area within the specified location e.g. `Level 5`
- `comments`: string - Additional comments e.g. `Inspection Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of inspection e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `end_hour`: integer - Ending time of inspection - hour e.g. `10`
- `end_minute`: integer - Ending time of inspection - minute e.g. `0`
- `inspecting_entity`: string - Type of inspector performing the inspection e.g. `Safety`
- `inspection_type`: string - Type of inspection performed e.g. `Safety`
- `inspector_name`: string - Name of the inspector e.g. `Steven`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `start_hour`: integer - Starting time of inspection - hour e.g. `10`
- `start_minute`: integer - Starting time of inspection - minute e.g. `0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/inspection_logs

**Create Inspection Log**
Creates single Inspection Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `inspection_log`: object (required)
  - `area`: string - Area within the specified location e.g. `Level 5`
  - `comments`: string - Additional comments e.g. `Inspection took a total of 2 hours`
  - `date`: string(date) - Date of inspection. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `end_hour`: integer - Ending time of inspection - hour e.g. `10`
  - `end_minute`: integer - Ending time of inspection - minute e.g. `0`
  - `inspecting_entity`: string - Type of inspector that performing the inspection e.g. `Safety Rules`
  - `inspection_type`: string - Type of inspection performed e.g. `Safety`
  - `inspector_name`: string - Name of the inspector e.g. `Steven`
  - `start_hour`: integer - Starting time of inspection - hour e.g. `10`
  - `start_minute`: integer - Starting time of inspection - minute e.g. `0`
  - `location_id`: integer - The ID of the Location of the Inspection Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. Look at Daily Log Guide for more info. e.g. `["1space"]`
  - `vendor_id`: integer - ID of the Vendor associated to the inspection log e.g. `1120327`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `area`: string - Area within the specified location e.g. `Level 5`
- `comments`: string - Additional comments e.g. `Inspection Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of inspection e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `end_hour`: integer - Ending time of inspection - hour e.g. `10`
- `end_minute`: integer - Ending time of inspection - minute e.g. `0`
- `inspecting_entity`: string - Type of inspector performing the inspection e.g. `Safety`
- `inspection_type`: string - Type of inspection performed e.g. `Safety`
- `inspector_name`: string - Name of the inspector e.g. `Steven`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `start_hour`: integer - Starting time of inspection - hour e.g. `10`
- `start_minute`: integer - Starting time of inspection - minute e.g. `0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/inspection_logs/{id}

**Show Inspection Logs**
Returns single Inspection Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Inspection Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `area`: string - Area within the specified location e.g. `Level 5`
- `comments`: string - Additional comments e.g. `Inspection Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of inspection e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `end_hour`: integer - Ending time of inspection - hour e.g. `10`
- `end_minute`: integer - Ending time of inspection - minute e.g. `0`
- `inspecting_entity`: string - Type of inspector performing the inspection e.g. `Safety`
- `inspection_type`: string - Type of inspection performed e.g. `Safety`
- `inspector_name`: string - Name of the inspector e.g. `Steven`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `start_hour`: integer - Starting time of inspection - hour e.g. `10`
- `start_minute`: integer - Starting time of inspection - minute e.g. `0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/inspection_logs/{id}

**Update Inspection Log**
Update single Inspection Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Inspection Log ID

Request body (application/json) (required):

- `inspection_log`: object (required)
  - `area`: string - Area within the specified location e.g. `Level 5`
  - `comments`: string - Additional comments e.g. `Inspection took a total of 2 hours`
  - `date`: string(date) - Date of inspection. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `end_hour`: integer - Ending time of inspection - hour e.g. `10`
  - `end_minute`: integer - Ending time of inspection - minute e.g. `0`
  - `inspecting_entity`: string - Type of inspector that performing the inspection e.g. `Safety Rules`
  - `inspection_type`: string - Type of inspection performed e.g. `Safety`
  - `inspector_name`: string - Name of the inspector e.g. `Steven`
  - `start_hour`: integer - Starting time of inspection - hour e.g. `10`
  - `start_minute`: integer - Starting time of inspection - minute e.g. `0`
  - `location_id`: integer - The ID of the Location of the Inspection Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `vendor_id`: integer - ID of the Vendor associated to the inspection log e.g. `1120327`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `area`: string - Area within the specified location e.g. `Level 5`
- `comments`: string - Additional comments e.g. `Inspection Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of inspection e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `end_hour`: integer - Ending time of inspection - hour e.g. `10`
- `end_minute`: integer - Ending time of inspection - minute e.g. `0`
- `inspecting_entity`: string - Type of inspector performing the inspection e.g. `Safety`
- `inspection_type`: string - Type of inspection performed e.g. `Safety`
- `inspector_name`: string - Name of the inspector e.g. `Steven`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `start_hour`: integer - Starting time of inspection - hour e.g. `10`
- `start_minute`: integer - Starting time of inspection - minute e.g. `0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/inspection_logs/{id}

**Delete Inspection Log**
Delete single Inspection Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Inspection Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Instruction Types

Resource id: `instruction-types`. Raw spec: `../openapi-raw/instruction-types.json`. Web: https://developers.procore.com/reference/rest/instruction-types?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/projects/{project_id}/instruction_types

**List Instruction Types on a project**
Return a list of all Instruction Types from a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `2`
- `name`: string - Name e.g. `Owner Instruction`
- `prefix`: string - Prefix e.g. `OI`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/instruction_types

**Create Instruction Types**
Create a new Instruction Type associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `instruction_type`: object (required)
  - `name`: string (required) - Name of Instruction Type e.g. `Owner Instruction`

Response 201 (application/json): object

- `id`: integer - ID e.g. `2`
- `name`: string - Name e.g. `Owner Instruction`
- `prefix`: string - Prefix e.g. `OI`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/instruction_types/{id}

**Show Instruction Type**
Return detailed information on the specified Instruction Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Instruction ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `2`
- `name`: string - Name e.g. `Owner Instruction`
- `prefix`: string - Prefix e.g. `OI`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/instruction_types/{id}

**Update Instruction Type**
Update the specified Instruction Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Instruction ID

Request body (application/json) (required):

- `instruction_type`: object (required)
  - `name`: string (required) - Name of Instruction Type e.g. `Owner Instruction`

Response 200 (application/json): object

- `id`: integer - ID e.g. `2`
- `name`: string - Name e.g. `Owner Instruction`
- `prefix`: string - Prefix e.g. `OI`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/instruction_types/{id}

**Delete Instruction Type**
Delete the specified Instruction Type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Instruction ID

Response 200: Instruction deleted successfully (no body)

Error responses: 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Instructions

Resource id: `instructions`. Raw spec: `../openapi-raw/instructions.json`. Web: https://developers.procore.com/reference/rest/instructions?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/projects/{project_id}/instructions

**List Instructions on a project**
Return a list of all Instructions from a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `999`
- `number`: string - Number e.g. `1`
- `title`: string - Number e.g. `Fix this thing`
- `rich_text_description`: string - Rich Text Description e.g. `<p>This is an Instruction</p>`
- `plain_text_description`: string - Plain Text Description e.g. `This is an Instruction`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `date_received`: string(date) - Date created e.g. `2016-08-23`
- `date_issued`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `status`: string enum[draft, issued, closed] - Status e.g. `draft`
- `private`: boolean - private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars
- `instruction_type`: object
  - `id`: integer - ID e.g. `2`
  - `name`: string - Name e.g. `Owner Instruction`
  - `prefix`: string - Prefix e.g. `OI`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `instruction_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distribution_members`: array of object - Instruction Distribution List of Users
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attentions`: array of object - Instruction Attentions
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `snapshot.png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/instructions

**Create Instructions**
Create a new Instruction associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `instruction`: object (required)
  - `number`: string - The Number of the Instruction e.g. `1`
  - `title`: string (required) - The Title of the Instruction e.g. `Fix this thing`
  - `status`: string enum[draft, issued] (required) - The Status of the Instruction e.g. `draft`
  - `instruction_type_id`: integer (required) - ID of the Instruction Type e.g. `1`
  - `instruction_from_id`: integer - ID of the User who the Instruction is from e.g. `1`
  - `date_received`: string(date) e.g. `2016-10-13`
  - `schedule_impact`: object - The Schedule Impact of the Instruction
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Schedule Impact
    - `value`: integer - The Value in days of the Schedule Impact e.g. `14`
  - `cost_impact`: object - The Cost Impact of the Instruction
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Cost Impact
    - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
  - `private`: boolean - The Private status of the Instruction e.g. `false`
  - `description`: string - The Description of the Instruction e.g. `This is a description`
  - `attention_ids`: array of integer - An array of IDs of the Attentions of the Instruction
  - `distribution_member_ids`: array of integer - An array of IDs of the Distributions of the Instruction
  - `trade_ids`: array of integer - An array of IDs of the Trades of the Instruction
  - `attachments`: array of string - Instruction's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `upload_ids`: array of string - The specified array of upload ids is saved as Site Instruction Attachments.

Response 201 (application/json): object

- `id`: integer - ID e.g. `999`
- `number`: string - Number e.g. `1`
- `title`: string - Number e.g. `Fix this thing`
- `rich_text_description`: string - Rich Text Description e.g. `<p>This is an Instruction</p>`
- `plain_text_description`: string - Plain Text Description e.g. `This is an Instruction`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `date_received`: string(date) - Date created e.g. `2016-08-23`
- `date_issued`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `status`: string enum[draft, issued, closed] - Status e.g. `draft`
- `private`: boolean - private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars
- `instruction_type`: object
  - `id`: integer - ID e.g. `2`
  - `name`: string - Name e.g. `Owner Instruction`
  - `prefix`: string - Prefix e.g. `OI`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `instruction_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distribution_members`: array of object - Instruction Distribution List of Users
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attentions`: array of object - Instruction Attentions
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `snapshot.png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/instructions/{id}

**Show Instruction**
Return detailed information on the specified Instruction.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Instruction ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `999`
- `number`: string - Number e.g. `1`
- `title`: string - Number e.g. `Fix this thing`
- `rich_text_description`: string - Rich Text Description e.g. `<p>This is an Instruction</p>`
- `plain_text_description`: string - Plain Text Description e.g. `This is an Instruction`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `date_received`: string(date) - Date created e.g. `2016-08-23`
- `date_issued`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `status`: string enum[draft, issued, closed] - Status e.g. `draft`
- `private`: boolean - private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars
- `instruction_type`: object
  - `id`: integer - ID e.g. `2`
  - `name`: string - Name e.g. `Owner Instruction`
  - `prefix`: string - Prefix e.g. `OI`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `instruction_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distribution_members`: array of object - Instruction Distribution List of Users
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attentions`: array of object - Instruction Attentions
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `snapshot.png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/instructions/{id}

**Update Instruction**
Update the specified Instruction.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Instruction ID
- `send_emails` [query] boolean - Designates whether or not emails will be sent (default false)

Request body (application/json) (required):

- `instruction`: object (required)
  - `number`: string - The Number of the Instruction e.g. `1`
  - `title`: string - The Title of the Instruction e.g. `Fix this thing`
  - `status`: string enum[draft, issued, closed] - The Status of the Instruction e.g. `draft`
  - `instruction_type_id`: integer - ID of the Instruction Type e.g. `1`
  - `instruction_from_id`: integer - ID of the User who the Instruction is from e.g. `1`
  - `date_received`: string(date) e.g. `2016-10-13`
  - `schedule_impact`: object - The Schedule Impact of the Instruction
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Schedule Impact
    - `value`: integer - The Value in days of the Schedule Impact e.g. `14`
  - `cost_impact`: object - The Cost Impact of the Instruction
    - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The Status of the Cost Impact
    - `value`: number(float) - Cost impact value in dollars e.g. `12039.55`
  - `private`: boolean - The Private status of the Instruction e.g. `false`
  - `description`: string - The Description of the Instruction e.g. `This is a description`
  - `attention_ids`: array of integer - An array of IDs of the Attentions of the Instruction
  - `distribution_member_ids`: array of integer - An array of IDs of the Distributions of the Instruction
  - `trade_ids`: array of integer - An array of IDs of the Trades of the Instruction
  - `attachments`: array of string - Instruction's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `upload_ids`: array of string - The specified array of upload ids is saved as Site Instruction Attachments.

Response 200 (application/json): object

- `id`: integer - ID e.g. `999`
- `number`: string - Number e.g. `1`
- `title`: string - Number e.g. `Fix this thing`
- `rich_text_description`: string - Rich Text Description e.g. `<p>This is an Instruction</p>`
- `plain_text_description`: string - Plain Text Description e.g. `This is an Instruction`
- `created_at`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `date_received`: string(date) - Date created e.g. `2016-08-23`
- `date_issued`: string(date-time) - Date created e.g. `2016-08-23T15:23:57Z`
- `status`: string enum[draft, issued, closed] - Status e.g. `draft`
- `private`: boolean - private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: integer - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars
- `instruction_type`: object
  - `id`: integer - ID e.g. `2`
  - `name`: string - Name e.g. `Owner Instruction`
  - `prefix`: string - Prefix e.g. `OI`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `instruction_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `distribution_members`: array of object - Instruction Distribution List of Users
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attentions`: array of object - Instruction Attentions
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `snapshot.png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/instructions/{id}

**Delete Instruction**
Delete the specified Instruction.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Instruction ID

Response 200: Instruction deleted successfully (no body)

Error responses: 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Manpower Logs

Resource id: `manpower-logs`. Raw spec: `../openapi-raw/manpower-logs.json`. Web: https://developers.procore.com/reference/rest/manpower-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/manpower_logs/contact_options

**List Manpower Logs Contact Options**
Returns all Contacts that can be assigned to a new Manpower Log given the current user permissions

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[is_employee]` [query] boolean - If provided, filters contacts by their is_employee status. When 'true', only return contacts that are employees. When 'false', only return contacts that are not employees.

Response 200 (application/json): array of object

- `id`: integer - Login Information ID of the User e.g. `161072`
- `name`: string e.g. `Carl the Contractor`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/manpower_logs/daily_totals

**Get total workers and man hours**
Returns total workers and man hours between a start date and end date. To get a single day, supply the same date for start and end.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.

Response 200 (application/json): object

- `total_workers`: integer e.g. `10`
- `total_man_hours`: number(float) e.g. `40.3`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/manpower_logs

**List Manpower Logs**
Returns all approved Manpower Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[status]` [query] string - Filter on status for "pending" or "approved" or "all"
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `man_hours`: string - Total man hours (num_workers x num_hours) e.g. `32.0`
- `notes`: string - Additional notes e.g. `Manpower Notes`
- `num_workers`: integer - Number of workers e.g. `4`
- `num_hours`: string - Number of hours for each worker e.g. `8.0`
- `position`: integer - Position in which this entry was recorded for the day e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - This key is available when Contact is a Vendor
  - `id`: integer - Vendor ID e.g. `324`
  - `name`: string - Vendor Name e.g. `AAA Constructions`
- `user`: object - This key is available when Contact is a User
  - `id`: integer - User ID e.g. `324`
  - `login`: string - User Login e.g. `login@example.com`
  - `name`: string - User Name e.g. `AAA Constructions`
- `contact`: object
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/manpower_logs

**Create Manpower Log**
Creates single Manpower Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `manpower_log`: object (required)
  - `date`: string(date) - Date of record. Mutually exclusive with the datetime property. e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `notes`: string - Notes e.g. `Notes`
  - `num_workers`: integer - Number of workers e.g. `4`
  - `num_hours`: string - Number of hours for each worker e.g. `8.0`
  - `contact_id`: integer - ID of the Vendor that is performing work e.g. `1128828`
  - `user_id`: integer - ID of the user that is performing work. Use this instead of contact_id when tracking hours for a specific user.
  - `cost_code_id`: integer - Cost Code ID e.g. `11241`
  - `location_id`: integer - The ID of the Location of the Manpower Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `trade_id`: integer - ID of the Trade associated to the Manpower Log
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `man_hours`: string - Total man hours (num_workers x num_hours) e.g. `32.0`
- `notes`: string - Additional notes e.g. `Manpower Notes`
- `num_workers`: integer - Number of workers e.g. `4`
- `num_hours`: string - Number of hours for each worker e.g. `8.0`
- `position`: integer - Position in which this entry was recorded for the day e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - This key is available when Contact is a Vendor
  - `id`: integer - Vendor ID e.g. `324`
  - `name`: string - Vendor Name e.g. `AAA Constructions`
- `user`: object - This key is available when Contact is a User
  - `id`: integer - User ID e.g. `324`
  - `login`: string - User Login e.g. `login@example.com`
  - `name`: string - User Name e.g. `AAA Constructions`
- `contact`: object
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/manpower_logs/{id}

**Show Manpower Logs**
Returns single Manpower Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Manpower Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `man_hours`: string - Total man hours (num_workers x num_hours) e.g. `32.0`
- `notes`: string - Additional notes e.g. `Manpower Notes`
- `num_workers`: integer - Number of workers e.g. `4`
- `num_hours`: string - Number of hours for each worker e.g. `8.0`
- `position`: integer - Position in which this entry was recorded for the day e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - This key is available when Contact is a Vendor
  - `id`: integer - Vendor ID e.g. `324`
  - `name`: string - Vendor Name e.g. `AAA Constructions`
- `user`: object - This key is available when Contact is a User
  - `id`: integer - User ID e.g. `324`
  - `login`: string - User Login e.g. `login@example.com`
  - `name`: string - User Name e.g. `AAA Constructions`
- `contact`: object
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/manpower_logs/{id}

**Update Manpower Log**
Update single Manpower Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Manpower Log ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `manpower_log`: object (required)
  - `date`: string(date) - Date of inspection. Mutually exclusive with the datetime property. e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `notes`: string - Additional notes e.g. `Notes`
  - `num_workers`: integer - Number of workers e.g. `4`
  - `num_hours`: string - Number of hours for each worker e.g. `8.0`
  - `contact_id`: integer - ID of the Vendor that is performing work e.g. `1128828`
  - `user_id`: integer - ID of the User that is performing work. Use this instead of contact_id when tracking hours for a specific user.
  - `cost_code_id`: integer - Cost Code ID e.g. `11241`
  - `location_id`: integer - The ID of the Location of the Manpower Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `trade_id`: integer - ID of the Trade associated to the Manpower Log e.g. `100884`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `status`: string - Approval for pending logs e.g. `approved`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `man_hours`: string - Total man hours (num_workers x num_hours) e.g. `32.0`
- `notes`: string - Additional notes e.g. `Manpower Notes`
- `num_workers`: integer - Number of workers e.g. `4`
- `num_hours`: string - Number of hours for each worker e.g. `8.0`
- `position`: integer - Position in which this entry was recorded for the day e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object - This key is available when Contact is a Vendor
  - `id`: integer - Vendor ID e.g. `324`
  - `name`: string - Vendor Name e.g. `AAA Constructions`
- `user`: object - This key is available when Contact is a User
  - `id`: integer - User ID e.g. `324`
  - `login`: string - User Login e.g. `login@example.com`
  - `name`: string - User Name e.g. `AAA Constructions`
- `contact`: object
  - `id`: integer e.g. `1128828`
  - `business_phone`: string e.g. `(503)744-3200`
  - `business_phone_extension`: integer e.g. `1234`
  - `email`: string e.g. `john.doe@example.com`
  - `fax_number`: string e.g. `813043`
  - `job_title`: string e.g. `Engineer`
  - `login_information_id`: integer
  - `mobile_phone`: string
  - `name`: string e.g. `A-1 Electric Company`
  - `vendor_name`: string
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/manpower_logs/{id}

**Delete Manpower Log**
Delete single Manpower Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Manpower Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/manpower_logs/vendor_options

**List Manpower Logs Vendor Options**
Returns all Vendors that can be assigned to a new Manpower Log given the current user permissions

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
- `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Notes Logs

Resource id: `notes-logs`. Raw spec: `../openapi-raw/notes-logs.json`. Web: https://developers.procore.com/reference/rest/notes-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/notes_logs

**List Notes Logs**
Returns all approved Notes Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[status]` [query] string - Filter on status for "pending" or "approved" or "all"
- `filters[created_by_id]` [query] integer - Return item(s) created by the specified User ID
- `filters[location_id]` [query] integer - Filters by specific location (Note: Use *either* this or location_id_with_sublocations, but not both)
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `comment`: string - Additional comments e.g. `Notes Log comment`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `daily_log_header_id`: integer - Daily Log Header ID e.g. `151335`
- `is_issue_day`: boolean - The note being added is an issue affecting the projet e.g. `false`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by_collaborator`: boolean
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
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/notes_logs

**Create Notes Log**
Creates single Notes Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `notes_log`: object (required)
  - `comment`: string - Additional comments e.g. `No Additional notes`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `daily_log_header_id`: integer - Daily Log Header ID e.g. `76384`
  - `is_issue_day`: boolean - The note being added is an issue affecting the project e.g. `true`
  - `location_id`: integer - The ID of the Location of the Notes Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `vendor_id`: integer - ID of the Vendor associated to the notes log e.g. `1120327`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comment`: string - Additional comments e.g. `Notes Log comment`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `daily_log_header_id`: integer - Daily Log Header ID e.g. `151335`
- `is_issue_day`: boolean - The note being added is an issue affecting the projet e.g. `false`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by_collaborator`: boolean
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
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/notes_logs/{id}

**Show Notes Logs**
Returns single Notes Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Notes Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comment`: string - Additional comments e.g. `Notes Log comment`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `daily_log_header_id`: integer - Daily Log Header ID e.g. `151335`
- `is_issue_day`: boolean - The note being added is an issue affecting the projet e.g. `false`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by_collaborator`: boolean
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
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/notes_logs/{id}

**Update Notes Log**
Update single Notes Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Notes Log ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `notes_log`: object (required)
  - `comment`: string - Additional comments e.g. `No Additional notes`
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `daily_log_header_id`: integer - Daily Log Header ID e.g. `76384`
  - `is_issue_day`: boolean - The note being added is an issue affecting the project e.g. `true`
  - `location_id`: integer - The ID of the Location of the Notes Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `status`: string - Approval for pending logs e.g. `approved`
  - `vendor_id`: integer - ID of the Vendor associated to the notes log e.g. `1120327`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `comment`: string - Additional comments e.g. `Notes Log comment`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `daily_log_header_id`: integer - Daily Log Header ID e.g. `151335`
- `is_issue_day`: boolean - The note being added is an issue affecting the projet e.g. `false`
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`
- `position`: integer - Order in which this entry was recorded e.g. `11241`
- `status`: string - Is a log pending or approved e.g. `pending`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by_collaborator`: boolean
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
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `content_type`: string e.g. `image/jpeg`
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
  - `share_url`: string e.g. `https://example.com/rest/v1.0/local_files/62d97223fd22a7806c3c7b12fc5ba9ee900...`
  - `viewable_type`: string e.g. `image`
  - `viewable_url`: string e.g. `https://example.com/15/project/daily_log/viewable_document_image_show?holder_...`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/notes_logs/{id}

**Delete Notes Log**
Delete single Notes Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Notes Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Plan Revision Logs

Resource id: `plan-revision-logs`. Raw spec: `../openapi-raw/plan-revision-logs.json`. Web: https://developers.procore.com/reference/rest/plan-revision-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/plan_revision_logs

**List Plan Revision Logs**
Returns all Plan Revision Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `category`: string - Category of discipline that appears on the revision e.g. `Plan Revision category`
- `comments`: string - Additional comments e.g. `Plan Revision comments`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `plan_number`: string - Number that appears on the plan submitted e.g. `3plan#`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `revision`: string - Revision number e.g. `Revision`
- `title`: string - Title of the plans e.g. `Plan Revision title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Plan Revision Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/plan_revision_logs

**Create Plan Revision Log**
Creates single Plan Revision Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `plan_revision_log`: object (required)
  - `category`: string - Category of discipline that appears on the revision e.g. `Plan Revision Category`
  - `comments`: string - Additional comments e.g. `Plan Revision comments`
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `plan_number`: string - Number that appears on the plan submitted e.g. `3plan#`
  - `revision`: string - Revision number e.g. `763892`
  - `title`: string - Title of the plans e.g. `Plan Revision title`
  - `vendor_id`: integer - ID of the Vendor associated to the Plan Revision Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Plan Revision Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `category`: string - Category of discipline that appears on the revision e.g. `Plan Revision category`
- `comments`: string - Additional comments e.g. `Plan Revision comments`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `plan_number`: string - Number that appears on the plan submitted e.g. `3plan#`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `revision`: string - Revision number e.g. `Revision`
- `title`: string - Title of the plans e.g. `Plan Revision title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Plan Revision Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/plan_revision_logs/{id}

**Show Plan Revision Logs**
Returns single Plan Revision Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Plan Revision Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `category`: string - Category of discipline that appears on the revision e.g. `Plan Revision category`
- `comments`: string - Additional comments e.g. `Plan Revision comments`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `plan_number`: string - Number that appears on the plan submitted e.g. `3plan#`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `revision`: string - Revision number e.g. `Revision`
- `title`: string - Title of the plans e.g. `Plan Revision title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Plan Revision Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/plan_revision_logs/{id}

**Update Plan Revision Log**
Update single Plan Revision Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Plan Revision Log ID

Request body (application/json) (required):

- `plan_revision_log`: object (required)
  - `category`: string - Category of discipline that appears on the revision e.g. `Plan Revision Category`
  - `comments`: string - Additional comments e.g. `Plan Revision comments`
  - `date`: string(date) - Date of record. Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `plan_number`: string - Number that appears on the plan submitted e.g. `3plan#`
  - `revision`: string - Revision number e.g. `763892`
  - `title`: string - Title of the plans e.g. `Plan Revision title`
  - `vendor_id`: integer - ID of the Vendor associated to the Plan Revision Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Plan Revision Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `category`: string - Category of discipline that appears on the revision e.g. `Plan Revision category`
- `comments`: string - Additional comments e.g. `Plan Revision comments`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `plan_number`: string - Number that appears on the plan submitted e.g. `3plan#`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `revision`: string - Revision number e.g. `Revision`
- `title`: string - Title of the plans e.g. `Plan Revision title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Plan Revision Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/plan_revision_logs/{id}

**Delete Plan Revision Log**
Delete single Plan Revision Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Plan Revision Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Productivity Logs

Resource id: `productivity-logs`. Raw spec: `../openapi-raw/productivity-logs.json`. Web: https://developers.procore.com/reference/rest/productivity-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/productivity_logs

**List Productivity Logs**
Returns all Productivity Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(log_date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `company`: string - Name of Company e.g. `World Concrete`
- `contract`: string - Approved Commitment Contract title e.g. `PO-007`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `line_item_id`: integer - ID of the Line Item from the approved Commitment Contract e.g. `173890`
- `line_item_description`: string - Description of the Line Item e.g. `#1 - - 0.0 Ea`
- `line_item_holder`: object - Object that the Line Item belongs to (WorkOrderContract, PurchaseOrderContract, PotentialChangeOrder)
  - `id`: integer - ID e.g. `160586`
  - `title`: string - Title e.g. `SC-008 - Awarded Contract for Procore Construction`
  - `number`: string - Number e.g. `CO-003`
  - `type`: string - The type of object that the Line Item belongs to e.g. `PurchaseOrderContract`
- `notes`: string - Additional notes e.g. `Productivity 50% complete`
- `position`: integer - Order in which this entry was recorded e.g. `142`
- `previously_delivered`: string - Number of materials that were previously delivered on site e.g. `8.0`
- `previously_used`: string - Number of materials previously put in place on site e.g. `4.0`
- `quantity_delivered`: string - Number of materials delivered on site e.g. `5.0`
- `quantity_used`: string - Number of materials put in place on site e.g. `4.0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/productivity_logs

**Create Productivity Log**
Creates single Productivity Log
#### Click - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
#### Note: The required Line Item ID to create a Productivity Log must be from an approved Contract
#### How to find a Line Item ID
* If the Line Item comes from a Work Order Contract use the `Work Order Contracts List` endpoint
* If the Line Item comes from a Purchase Order Contract use the `Purchase Order Contracts List` endpoint
* Use filter - `filters[status] 'Approved'` - to get list of approved Contracts
* Use the Contract ID to the Show endpoint to get the Line Item ID associated with the Contract

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `productivity_log`: object (required)
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `line_item_id`: integer - Line Item ID of an approved contract
  - `location_id`: integer - The ID of the Location e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `notes`: string - Notes
  - `quantity_delivered`: string - Total number of materials delivered
  - `quantity_used`: string - Total number of materials used
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `company`: string - Name of Company e.g. `World Concrete`
- `contract`: string - Approved Commitment Contract title e.g. `PO-007`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `line_item_id`: integer - ID of the Line Item from the approved Commitment Contract e.g. `173890`
- `line_item_description`: string - Description of the Line Item e.g. `#1 - - 0.0 Ea`
- `line_item_holder`: object - Object that the Line Item belongs to (WorkOrderContract, PurchaseOrderContract, PotentialChangeOrder)
  - `id`: integer - ID e.g. `160586`
  - `title`: string - Title e.g. `SC-008 - Awarded Contract for Procore Construction`
  - `number`: string - Number e.g. `CO-003`
  - `type`: string - The type of object that the Line Item belongs to e.g. `PurchaseOrderContract`
- `notes`: string - Additional notes e.g. `Productivity 50% complete`
- `position`: integer - Order in which this entry was recorded e.g. `142`
- `previously_delivered`: string - Number of materials that were previously delivered on site e.g. `8.0`
- `previously_used`: string - Number of materials previously put in place on site e.g. `4.0`
- `quantity_delivered`: string - Number of materials delivered on site e.g. `5.0`
- `quantity_used`: string - Number of materials put in place on site e.g. `4.0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/productivity_logs/{id}

**Show Productivity Logs**
Returns single Productivity Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Productivity Log ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `company`: string - Name of Company e.g. `World Concrete`
- `contract`: string - Approved Commitment Contract title e.g. `PO-007`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `line_item_id`: integer - ID of the Line Item from the approved Commitment Contract e.g. `173890`
- `line_item_description`: string - Description of the Line Item e.g. `#1 - - 0.0 Ea`
- `line_item_holder`: object - Object that the Line Item belongs to (WorkOrderContract, PurchaseOrderContract, PotentialChangeOrder)
  - `id`: integer - ID e.g. `160586`
  - `title`: string - Title e.g. `SC-008 - Awarded Contract for Procore Construction`
  - `number`: string - Number e.g. `CO-003`
  - `type`: string - The type of object that the Line Item belongs to e.g. `PurchaseOrderContract`
- `notes`: string - Additional notes e.g. `Productivity 50% complete`
- `position`: integer - Order in which this entry was recorded e.g. `142`
- `previously_delivered`: string - Number of materials that were previously delivered on site e.g. `8.0`
- `previously_used`: string - Number of materials previously put in place on site e.g. `4.0`
- `quantity_delivered`: string - Number of materials delivered on site e.g. `5.0`
- `quantity_used`: string - Number of materials put in place on site e.g. `4.0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/productivity_logs/{id}

**Update Productivity Log**
Update single Productivity Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Productivity Log ID

Request body (application/json) (required):

- `productivity_log`: object (required)
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `line_item_id`: integer - Line Item ID of an approved contract
  - `location_id`: integer - The ID of the Location e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `notes`: string - Notes
  - `quantity_delivered`: string - Total number of materials delivered
  - `quantity_used`: string - Total number of materials used
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `company`: string - Name of Company e.g. `World Concrete`
- `contract`: string - Approved Commitment Contract title e.g. `PO-007`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Date of record e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `line_item_id`: integer - ID of the Line Item from the approved Commitment Contract e.g. `173890`
- `line_item_description`: string - Description of the Line Item e.g. `#1 - - 0.0 Ea`
- `line_item_holder`: object - Object that the Line Item belongs to (WorkOrderContract, PurchaseOrderContract, PotentialChangeOrder)
  - `id`: integer - ID e.g. `160586`
  - `title`: string - Title e.g. `SC-008 - Awarded Contract for Procore Construction`
  - `number`: string - Number e.g. `CO-003`
  - `type`: string - The type of object that the Line Item belongs to e.g. `PurchaseOrderContract`
- `notes`: string - Additional notes e.g. `Productivity 50% complete`
- `position`: integer - Order in which this entry was recorded e.g. `142`
- `previously_delivered`: string - Number of materials that were previously delivered on site e.g. `8.0`
- `previously_used`: string - Number of materials previously put in place on site e.g. `4.0`
- `quantity_delivered`: string - Number of materials delivered on site e.g. `5.0`
- `quantity_used`: string - Number of materials put in place on site e.g. `4.0`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/productivity_logs/{id}

**Delete Productivity Log**
Delete single Productivity Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Productivity Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Quantity Logs

Resource id: `quantity-logs`. Raw spec: `../openapi-raw/quantity-logs.json`. Web: https://developers.procore.com/reference/rest/quantity-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/quantity_logs

**List Quantity Logs**
Returns all Quantity Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[location_id]` [query] array of integer - Return item(s) with the specified Location IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Quantity amount was exact`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `quantity`: integer - Total number of the specified materials placed on the site that day e.g. `4`
- `unit`: string - Units that were delivered e.g. `5`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `attachments`: array of object - Quantity Log Attachments
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/quantity_logs

**Create Quantity Log**
Creates single Quantity Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `quantity_log`: object (required)
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `description`: string - Description e.g. `Quantity amount was exact`
  - `quantity`: integer - Total number of the specified materials placed on the site that day e.g. `4`
  - `unit`: string - Units that were delivered e.g. `5`
  - `cost_code_id`: integer - Cost Code ID e.g. `24086477`
  - `location_id`: integer - The ID of the Location of the Quantity Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `vendor_id`: integer - ID of the Vendor associated to the quantity log e.g. `1120327`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Quantity amount was exact`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `quantity`: integer - Total number of the specified materials placed on the site that day e.g. `4`
- `unit`: string - Units that were delivered e.g. `5`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `attachments`: array of object - Quantity Log Attachments
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/quantity_logs/{id}

**Show Quantity Logs**
Returns single Quantity Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Quantity Log ID

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Quantity amount was exact`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `quantity`: integer - Total number of the specified materials placed on the site that day e.g. `4`
- `unit`: string - Units that were delivered e.g. `5`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `attachments`: array of object - Quantity Log Attachments
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/quantity_logs/{id}

**Update Quantity Log**
Update single Quantity Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
* Locations

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Quantity Log ID

Request body (application/json) (required):

- `quantity_log`: object (required)
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `description`: string - Description e.g. `Quantity amount was exact`
  - `quantity`: integer - Total number of the specified materials placed on the site that day e.g. `4`
  - `unit`: string - Units that were delivered e.g. `5`
  - `cost_code_id`: integer - Cost Code ID e.g. `24086477`
  - `location_id`: integer - The ID of the Location of the Quantity Log. `location_id` takes precedence over `mt_location` e.g. `153252`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["1space"]`
  - `vendor_id`: integer - ID of the Vendor associated to the quantity log e.g. `1120327`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Quantity amount was exact`
- `position`: integer - Order in which this entry was recorded for the day e.g. `11241`
- `quantity`: integer - Total number of the specified materials placed on the site that day e.g. `4`
- `unit`: string - Units that were delivered e.g. `5`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `attachments`: array of object - Quantity Log Attachments
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/quantity_logs/{id}

**Delete Quantity Log**
Delete single Quantity Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Quantity Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Safety Violation Logs

Resource id: `safety-violation-logs`. Raw spec: `../openapi-raw/safety-violation-logs.json`. Web: https://developers.procore.com/reference/rest/safety-violation-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/safety_violation_logs

**List Safety Violation Logs**
Returns all Safety Violation Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Comments e.g. `No safety violations`
- `compliance_due`: string(date) - The date the compliance for the safety violation is due by e.g. `2016-06-20`
- `issued_to`: string - Person who the safety violation was issued to e.g. `ACL Industries`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `safety_notice`: string - Name/number of the safety notice issued e.g. `Safety Notice`
- `subject`: string - Reason for the safety violation e.g. `hard hats`
- `time_hour`: integer - Time of safety violation - hour e.g. `12`
- `time_minute`: integer - Time of safety violation - minute e.g. `15`
- `date`: string(date) - 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/safety_violation_logs

**Create Safety Violation Log**
Creates single Safety Violation Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `safety_violation_log`: object (required)
  - `comments`: string - Comments e.g. `No safety violations`
  - `compliance_due`: string(date) - The date the compliance for the safety violation is due by e.g. `2016-06-20`
  - `issued_to`: string - Person who the safety violation was issued to e.g. `ACL Industries`
  - `safety_notice`: string - Name/number of the safety notice issued e.g. `Safety Notice`
  - `subject`: string - Reason for the safety violation e.g. `hard hats`
  - `time_hour`: integer - Time of safety violation - hour e.g. `12`
  - `time_minute`: integer - Time of safety violation - minute e.g. `15`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `vendor_id`: integer - ID of the Vendor associated to the Safety Violation Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Safety Violation Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Comments e.g. `No safety violations`
- `compliance_due`: string(date) - The date the compliance for the safety violation is due by e.g. `2016-06-20`
- `issued_to`: string - Person who the safety violation was issued to e.g. `ACL Industries`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `safety_notice`: string - Name/number of the safety notice issued e.g. `Safety Notice`
- `subject`: string - Reason for the safety violation e.g. `hard hats`
- `time_hour`: integer - Time of safety violation - hour e.g. `12`
- `time_minute`: integer - Time of safety violation - minute e.g. `15`
- `date`: string(date) - 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/safety_violation_logs/{id}

**Show Safety Violation Logs**
Returns single Safety Violation Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Safety Violation Log ID

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Comments e.g. `No safety violations`
- `compliance_due`: string(date) - The date the compliance for the safety violation is due by e.g. `2016-06-20`
- `issued_to`: string - Person who the safety violation was issued to e.g. `ACL Industries`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `safety_notice`: string - Name/number of the safety notice issued e.g. `Safety Notice`
- `subject`: string - Reason for the safety violation e.g. `hard hats`
- `time_hour`: integer - Time of safety violation - hour e.g. `12`
- `time_minute`: integer - Time of safety violation - minute e.g. `15`
- `date`: string(date) - 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/safety_violation_logs/{id}

**Update Safety Violation Log**
Update single Safety Violation Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Safety Violation Log ID

Request body (application/json) (required):

- `safety_violation_log`: object (required)
  - `comments`: string - Comments e.g. `No safety violations`
  - `compliance_due`: string(date) - The date the compliance for the safety violation is due by e.g. `2016-06-20`
  - `issued_to`: string - Person who the safety violation was issued to e.g. `ACL Industries`
  - `safety_notice`: string - Name/number of the safety notice issued e.g. `Safety Notice`
  - `subject`: string - Reason for the safety violation e.g. `hard hats`
  - `time_hour`: integer - Time of safety violation - hour e.g. `12`
  - `time_minute`: integer - Time of safety violation - minute e.g. `15`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `vendor_id`: integer - ID of the Vendor associated to the Safety Violation Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Safety Violation Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `comments`: string - Comments e.g. `No safety violations`
- `compliance_due`: string(date) - The date the compliance for the safety violation is due by e.g. `2016-06-20`
- `issued_to`: string - Person who the safety violation was issued to e.g. `ACL Industries`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `safety_notice`: string - Name/number of the safety notice issued e.g. `Safety Notice`
- `subject`: string - Reason for the safety violation e.g. `hard hats`
- `time_hour`: integer - Time of safety violation - hour e.g. `12`
- `time_minute`: integer - Time of safety violation - minute e.g. `15`
- `date`: string(date) - 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - :filename to be deprecated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/safety_violation_logs/{id}

**Delete Safety Violation Log**
Delete single Safety Violation Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Safety Violation Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Visitor Logs

Resource id: `visitor-logs`. Raw spec: `../openapi-raw/visitor-logs.json`. Web: https://developers.procore.com/reference/rest/visitor-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/visitor_logs

**List Visitor Logs**
Returns all Visitor Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer e.g. `333675`
- `begin_hour`: integer - Time of visitation - hour e.g. `12`
- `begin_minute`: integer - Time of visitation - hour e.g. `10`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `details`: string - Details of visit e.g. `Visitor Log`
- `end_hour`: integer - Time that the visitation ended - hour e.g. `14`
- `end_minute`: integer - Time that the visitation ended - minute e.g. `30`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `status`: string - Is a log pending or approved e.g. `pending`
- `subject`: string e.g. `Elizabeth Cannon (1st Choice Glass Inc.)`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/visitor_logs

**Create Visitor Log**
Creates a single Visitor Log in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `visitor_log`: object (required)
  - `begin_hour`: integer - Time of visitation - hour e.g. `12`
  - `begin_minute`: integer - Time of visitation - hour e.g. `10`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `details`: string - Details of visit e.g. `Visitor Log`
  - `end_hour`: integer - Time that the visitation ended - hour e.g. `14`
  - `end_minute`: integer - Time that the visitation ended - minute e.g. `30`
  - `vendor_id`: integer - ID of the Vendor associated to the visit e.g. `1120327`
  - `location_id`: integer - ID of the Location where the visitor was e.g. `1120327`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer e.g. `333675`
- `begin_hour`: integer - Time of visitation - hour e.g. `12`
- `begin_minute`: integer - Time of visitation - hour e.g. `10`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `details`: string - Details of visit e.g. `Visitor Log`
- `end_hour`: integer - Time that the visitation ended - hour e.g. `14`
- `end_minute`: integer - Time that the visitation ended - minute e.g. `30`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `status`: string - Is a log pending or approved e.g. `pending`
- `subject`: string e.g. `Elizabeth Cannon (1st Choice Glass Inc.)`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/visitor_logs/{id}

**Show Visitor Logs**
Returns single Visitor Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Visitor Log ID

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `begin_hour`: integer - Time of visitation - hour e.g. `12`
- `begin_minute`: integer - Time of visitation - hour e.g. `10`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `details`: string - Details of visit e.g. `Visitor Log`
- `end_hour`: integer - Time that the visitation ended - hour e.g. `14`
- `end_minute`: integer - Time that the visitation ended - minute e.g. `30`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `status`: string - Is a log pending or approved e.g. `pending`
- `subject`: string e.g. `Elizabeth Cannon (1st Choice Glass Inc.)`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/visitor_logs/{id}

**Update Visitor Log**
Updates a single Visitor Log in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Visitor Log ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `visitor_log`: object (required)
  - `begin_hour`: integer - Time of visitation - hour e.g. `12`
  - `begin_minute`: integer - Time of visitation - hour e.g. `10`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `details`: string - Details of visit e.g. `Visitor Log`
  - `end_hour`: integer - Time that the visitation ended - hour e.g. `14`
  - `end_minute`: integer - Time that the visitation ended - minute e.g. `30`
  - `vendor_id`: integer - ID of the Vendor associated to the visit e.g. `1120327`
  - `location_id`: integer - ID of the Location where the visitor was e.g. `1120327`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `begin_hour`: integer - Time of visitation - hour e.g. `12`
- `begin_minute`: integer - Time of visitation - hour e.g. `10`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `details`: string - Details of visit e.g. `Visitor Log`
- `end_hour`: integer - Time that the visitation ended - hour e.g. `14`
- `end_minute`: integer - Time that the visitation ended - minute e.g. `30`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `status`: string - Is a log pending or approved e.g. `pending`
- `subject`: string e.g. `Elizabeth Cannon (1st Choice Glass Inc.)`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
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
- `permissions`: object - TBD
  - `can_update`: boolean - Can Update e.g. `true`
  - `can_delete`: boolean - Can Delete e.g. `false`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/visitor_logs/{id}

**Delete Visitor Log**
Delete single Visitor Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Visitor Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Waste Logs

Resource id: `waste-logs`. Raw spec: `../openapi-raw/waste-logs.json`. Web: https://developers.procore.com/reference/rest/waste-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/waste_logs

**List Waste Logs**
Returns all Waste Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer e.g. `333675`
- `approximate_quantity`: integer - Waste log approximate quantity e.g. `5`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Left over wood chips`
- `disposal_location`: string - Waste disposal location e.g. `Dump Yard`
- `material`: string - Type of waste disposed of e.g. `Waste material`
- `method_of_disposal`: string - Method used to dispose of the waste e.g. `Truck`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of waste disposal - hour e.g. `10`
- `time_minute`: integer - Time of waste disposal - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `contact`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Waste Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/waste_logs

**Create Waste Log**
Creates single Waste Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
[Project Vendor List](https://developers.procore.com/docs/list-project-vendors)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `waste_log`: object (required)
  - `approximate_quantity`: integer - Waste log approximate quantity e.g. `5`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `description`: string - Description e.g. `Disposal complete`
  - `disposal_location`: string - Waste disposal location e.g. `Dump Yard`
  - `material`: string - Type of waste disposed of e.g. `Waste Material`
  - `method_of_disposal`: string - Method used to dispose of the waste e.g. `Truck`
  - `time_hour`: integer - Time of waste disposal - hour e.g. `10`
  - `time_minute`: integer - Time of waste disposal - minute e.g. `15`
  - `vendor_id`: integer - ID of the Vendor who disposed of the waste e.g. `1120327`
  - `contact_id`: integer - ID of the Contact associated with the waste log e.g. `1120327`
  - `location_id`: integer - ID of the Location where the waste was disposed e.g. `1120327`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer e.g. `333675`
- `approximate_quantity`: integer - Waste log approximate quantity e.g. `5`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Left over wood chips`
- `disposal_location`: string - Waste disposal location e.g. `Dump Yard`
- `material`: string - Type of waste disposed of e.g. `Waste material`
- `method_of_disposal`: string - Method used to dispose of the waste e.g. `Truck`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of waste disposal - hour e.g. `10`
- `time_minute`: integer - Time of waste disposal - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `contact`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Waste Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/waste_logs/{id}

**Show Waste Logs**
Returns single Waste Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Waste Log ID

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `approximate_quantity`: integer - Waste log approximate quantity e.g. `5`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Left over wood chips`
- `disposal_location`: string - Waste disposal location e.g. `Dump Yard`
- `material`: string - Type of waste disposed of e.g. `Waste material`
- `method_of_disposal`: string - Method used to dispose of the waste e.g. `Truck`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of waste disposal - hour e.g. `10`
- `time_minute`: integer - Time of waste disposal - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `contact`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Waste Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/waste_logs/{id}

**Update Waste Log**
Update single Waste Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Waste Log ID

Request body (application/json) (required):

- `waste_log`: object (required)
  - `approximate_quantity`: integer - Waste log approximate quantity e.g. `5`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `datetime`: string(date-time) - Datetime of record. Mutually exclusive with the date property. e.g. `2016-05-19T12:00:00Z`
  - `description`: string - Description e.g. `Disposal complete`
  - `disposal_location`: string - Waste disposal location e.g. `Dump Yard`
  - `material`: string - Type of waste disposed of e.g. `Waste Material`
  - `method_of_disposal`: string - Method used to dispose of the waste e.g. `Truck`
  - `time_hour`: integer - Time of waste disposal - hour e.g. `10`
  - `time_minute`: integer - Time of waste disposal - minute e.g. `15`
  - `vendor_id`: integer - ID of the Vendor who disposed of the waste e.g. `1120327`
  - `contact_id`: integer - ID of the Contact associated with the waste log e.g. `1120327`
  - `location_id`: integer - ID of the Location where the waste was disposed e.g. `1120327`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `approximate_quantity`: integer - Waste log approximate quantity e.g. `5`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `description`: string - Description e.g. `Left over wood chips`
- `disposal_location`: string - Waste disposal location e.g. `Dump Yard`
- `material`: string - Type of waste disposed of e.g. `Waste material`
- `method_of_disposal`: string - Method used to dispose of the waste e.g. `Truck`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `time_hour`: integer - Time of waste disposal - hour e.g. `10`
- `time_minute`: integer - Time of waste disposal - minute e.g. `15`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `contact`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Waste Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/waste_logs/{id}

**Delete Waste Log**
Delete single Waste Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Waste Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Weather Conditions

Resource id: `weather-conditions`. Raw spec: `../openapi-raw/weather-conditions.json`. Web: https://developers.procore.com/reference/rest/weather-conditions?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/daily_logs/weather_conditions

**List Accepted Weather Conditions**
Returns accepted weather conditions for the sky, ground, temperature, calamity, and wind categories.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `sky`: array of object
  - `key`: string enum[Clear, Cloudy, Overcast, Fog, Mist, Rain, Snow, Ice/Sleet/Hail, Smoke] - Value used as weather state ID and stored on server
  - `value`: string - Weather state value localized in user's locale. Intended to be shown for user in UI. e.g. `Dégagé`
- `ground`: array of object
  - `key`: string enum[Dry, Wet/Muddy, Flooded, Snow, Frozen, -----, High Tide, Low Tide, Heavy Surf/Swell] - Value used as weather state ID and stored on server
  - `value`: string - Weather state value localized in user's locale. Intended to be shown for user in UI. e.g. `Sec`
- `calamity`: array of object
  - `key`: string enum[Earthquake, Fire, Flash Flood, Landslide, Tornado, Hurricane, Snow, Other] - Value used as weather state ID and stored on server
  - `value`: string - Weather state value localized in user's locale. Intended to be shown for user in UI. e.g. `Séisme`
- `wind`: array of object
  - `key`: string enum[Calm, Light Wind, High Wind] - Value used as weather state ID and stored on server
  - `value`: string - Weather state value localized in user's locale. Intended to be shown for user in UI. e.g. `Calme`
- `temperature`: array of object
  - `key`: string enum[Very Hot, Hot, Mild, Cold, Very Cold] - Value used as weather state ID and stored on server
  - `value`: string - Weather state value localized in user's locale. Intended to be shown for user in UI. e.g. `Très chaud`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Weather Logs

Resource id: `weather-logs`. Raw spec: `../openapi-raw/weather-logs.json`. Web: https://developers.procore.com/reference/rest/weather-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/daily_logs/weather_logs

**List Weather Logs**
Returns all Weather Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired. Example formats YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY
- `start_date` [query] string(date) - Start date of specific logs desired. Use together with end_date to specify a date range. Example formats YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY
- `end_date` [query] string(date) - End date of specific logs desired. Use together with start_date to specify a date range. Example formats YYYY-MM-DD, YYYY/MM/DD, DD-MM-YYYY, DD/MM/YYYY
- `filters[status]` [query] string enum[all, approved, pending] - Filter on log status
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer e.g. `20160101`
- `attachments`: array of object
  - `id`: integer
  - `name`: string
  - `url`: string
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Translated Calamity condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Translated Ground condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Translated Sky condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Clear`
- `temperature`: string - Translated Temperature condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Translated Wind condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/daily_logs/weather_logs

**Create Weather Log**
Creates single Weather Log.
#### See - [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `weather_log`: object (required)
  - `date`: string(date) (required) - Date of the Weather Log. Format: YYYY-MM-DD e.g. `2016-05-19`
  - `is_weather_delay`: integer - Weather delay status e.g. `1`
  - `calamity`: string enum[Earthquake, Fire, Flash Flood, Hurricane, Landslide, Other, Snow, Tornado] - Type of calamity the jobsite was subject to e.g. `Fire`
  - `ground`: string enum[Dry, Flooded, Frozen, Heavy Surf/Swell, High Tide, Low Tide, Snow, Wet/Muddy, -----] - Ground condition e.g. `Dry`
  - `location_id`: integer - The ID of the Location of the Weather Log. e.g. `153252`
  - `sky`: string enum[Clear, Cloudy, Fog, Ice/Sleet/Hail, Overcast, Mist, Rain, Snow] - Sky condition e.g. `Clear`
  - `temperature`: string enum[Cold, Hot, Mild, Very Cold, Very Hot] - Weather temperature e.g. `Hot`
  - `wind`: string enum[Calm, High Wind, Light Wind] - Wind condition e.g. `Calm`
  - `average`: string - Average temperature for the workday e.g. `50`
  - `precipitation`: string - Precipitation conditions e.g. `Yes minor saturation`
  - `comments`: string - Additional comments e.g. `Weather Log Comments`
  - `time`: string(time) - UTC time weather conditions were observed. The date of observation must match entry's date. e.g. `15:57:37Z`
  - `vendor_id`: integer - ID of the Vendor associated to the Weather log e.g. `1120327`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer e.g. `20160101`
- `attachments`: array of object
  - `id`: integer
  - `name`: string
  - `url`: string
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Translated Calamity condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Translated Ground condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Translated Sky condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Clear`
- `temperature`: string - Translated Temperature condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Translated Wind condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/daily_logs/weather_logs/{id}

**Show Weather Log**
Returns single Weather Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Weather Log ID

Response 200 (application/json): object

- `id`: integer e.g. `20160101`
- `attachments`: array of object
  - `id`: integer
  - `name`: string
  - `url`: string
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Translated Calamity condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Translated Ground condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Translated Sky condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Clear`
- `temperature`: string - Translated Temperature condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Translated Wind condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/daily_logs/weather_logs/{id}

**Update Weather Log**
Update single Weather Log.
#### See - [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Weather Log ID
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `weather_log`: object (required)
  - `date`: string(date) (required) - Date of the Weather Log. Format: YYYY-MM-DD e.g. `2016-05-19`
  - `is_weather_delay`: integer - Weather delay status e.g. `1`
  - `calamity`: string enum[Earthquake, Fire, Flash Flood, Hurricane, Landslide, Other, Snow, Tornado] - Type of calamity the jobsite was subject to e.g. `Fire`
  - `ground`: string enum[Dry, Flooded, Frozen, Heavy Surf/Swell, High Tide, Low Tide, Snow, Wet/Muddy, -----] - Ground condition e.g. `Dry`
  - `location_id`: integer - The ID of the Location of the Weather Log. e.g. `153252`
  - `sky`: string enum[Clear, Cloudy, Fog, Ice/Sleet/Hail, Overcast, Mist, Rain, Snow] - Sky condition e.g. `Clear`
  - `temperature`: string enum[Cold, Hot, Mild, Very Cold, Very Hot] - Weather temperature e.g. `Hot`
  - `wind`: string enum[Calm, High Wind, Light Wind] - Wind condition e.g. `Calm`
  - `average`: string - Average temperature for the workday e.g. `50`
  - `precipitation`: string - Precipitation conditions e.g. `Yes minor saturation`
  - `comments`: string - Additional comments e.g. `Weather Log Comments`
  - `time`: string(time) - UTC time weather conditions were observed. The date of observation must match entry's date. e.g. `15:57:37Z`
  - `vendor_id`: integer - ID of the Vendor associated to the Weather log e.g. `1120327`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer e.g. `20160101`
- `attachments`: array of object
  - `id`: integer
  - `name`: string
  - `url`: string
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Translated Calamity condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Translated Ground condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Translated Sky condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Clear`
- `temperature`: string - Translated Temperature condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Translated Wind condition based on user's locale. List of possible values can be retrieved using Weather Conditions API https://developers.procore.com/reference/rest/v1/weather-conditions?version=1.0 e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/daily_logs/weather_logs/{id}

**Delete Weather Log**
Delete single Weather Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Weather Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/weather_logs/conditions  **[DEPRECATED]**

**List Accepted Weather Conditions**
Returns accepted weather conditions for the sky, ground, temperature, calamity, and wind categories.
This is a deprecated endpoint, please use [Weather Conditions](weather-conditions#list-accepted-weather-conditions)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `sky`: array of string
- `ground`: array of string
- `calamity`: array of string
- `wind`: array of string
- `temperature`: array of string

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/weather_logs/{id}  **[DEPRECATED]**

**Show Weather Logs**
Returns single Weather Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Use log date as your ID. Format YYYYMMDD ie:20161108
- `log_date` [query] string(date) - Log date of specific log desired in YYYY-MM-DD format (This will override ID as log Date)

Response 200 (application/json): object

- `id`: integer e.g. `20160101`
- `attachments`: array of object - :filename to be depricated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Type of calamity the jobsite was subject to e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Ground condition e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Sky condition e.g. `Clear`
- `temperature`: string - Weather temperature e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Wind condition e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/weather_logs/{id}  **[DEPRECATED]**

**Update Weather Log**
Update single Weather Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Use log date as your ID. Format YYYYMMDD ie:20161108

Request body (application/json) (required):

- `weather_log`: object (required)
  - `date`: string(date) (required) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `is_weather_delay`: integer - Weather delay status e.g. `1`
  - `sky`: string - Sky condition - "", "Clear", "Cloudy", "Overcast", "Fog", "Mist", "Rain", "Snow", "Ice/Sleet/Hail" e.g. `Clear`
  - `temperature`: string - Weather temperature - "", "Very Hot", "Hot", "Mild", "Cold", "Very Cold" e.g. `Hot`
  - `average`: string - Average temperature for the workday e.g. `50`
  - `wind`: string - Wind condition - "", "Calm", "Light Wind", "High Wind" e.g. `Calm`
  - `ground`: string - Ground condition - "", "Dry", "Wet/Muddy", "Flooded","Snow","Frozen","-----","High Tide","Low Tide", "Heavy Surf/Swell" e.g. `Dry`
  - `calamity`: string - Type of calamity the jobsite was subject to - "", "Earthquake", "Fire", "Flash Flood", "Landslide", "Tornado", "Hurricane", "Snow","Other" e.g. `Fire`
  - `precipitation`: string - Precipitation conditions e.g. `Yes minor saturation`
  - `comments`: string - Additional comments e.g. `Weather Log Comments`
  - `time`: string(time) - UTC time weather conditions were observed. The date of observation must match entry's date. e.g. `15:57:37Z`
  - `vendor_id`: integer - ID of the Vendor associated to the Weather log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Weather Log. e.g. `153252`

Response 200 (application/json): object

- `id`: integer e.g. `20160101`
- `attachments`: array of object - :filename to be depricated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Type of calamity the jobsite was subject to e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Ground condition e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Sky condition e.g. `Clear`
- `temperature`: string - Weather temperature e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Wind condition e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/weather_logs/{id}  **[DEPRECATED]**

**Delete Weather Log**
Delete single Weather Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Use log date as your ID. Format YYYYMMDD ie:20161108

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/weather_logs  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Weather Logs**
Returns all Weather Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer e.g. `20160101`
- `attachments`: array of object - :filename to be depricated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Type of calamity the jobsite was subject to e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Ground condition e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Sky condition e.g. `Clear`
- `temperature`: string - Weather temperature e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Wind condition e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/weather_logs  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Create Weather Log**
Creates single Weather Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `weather_log`: object (required)
  - `date`: string(date) (required) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `is_weather_delay`: integer - Weather delay status e.g. `1`
  - `sky`: string - Sky condition - "", "Clear", "Cloudy", "Overcast", "Fog", "Mist", "Rain", "Snow", "Ice/Sleet/Hail" e.g. `Clear`
  - `temperature`: string - Weather temperature - "", "Very Hot", "Hot", "Mild", "Cold", "Very Cold" e.g. `Hot`
  - `average`: string - Average temperature for the workday e.g. `50`
  - `wind`: string - Wind condition - "", "Calm", "Light Wind", "High Wind" e.g. `Calm`
  - `ground`: string - Ground condition - "", "Dry", "Wet/Muddy", "Flooded","Snow","Frozen","-----","High Tide","Low Tide", "Heavy Surf/Swell" e.g. `Dry`
  - `calamity`: string - Type of calamity the jobsite was subject to - "", "Earthquake", "Fire", "Flash Flood", "Landslide", "Tornado", "Hurricane", "Snow","Other" e.g. `Fire`
  - `precipitation`: string - Precipitation conditions e.g. `Yes minor saturation`
  - `comments`: string - Additional comments e.g. `Weather Log Comments`
  - `time`: string(time) - UTC time weather conditions were observed. The date of observation must match entry's date. e.g. `15:57:37Z`
  - `vendor_id`: integer - ID of the Vendor associated to the Weather log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Weather Log. e.g. `153252`

Response 200 (application/json): object

- `id`: integer e.g. `20160101`
- `attachments`: array of object - :filename to be depricated, use :name
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `average`: string - Average temperature for the workday e.g. `50`
- `calamity`: string - Type of calamity the jobsite was subject to e.g. `Fire`
- `comments`: string - Additional comments e.g. `Weather Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `is_weather_delay`: string - Weather delay status e.g. `1`
- `ground`: string - Ground condition e.g. `Dry`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `position`: integer - Order in which this entry was recorded for the day e.g. `1`
- `precipitation`: string - Precipitation conditions e.g. `true`
- `sky`: string - Sky condition e.g. `Clear`
- `temperature`: string - Weather temperature e.g. `Hot`
- `time`: string(date-time) - UTC time weather conditions were observed e.g. `2012-10-24T21:39:40Z`
- `wind`: string - Wind condition e.g. `Calm`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Work Logs

Resource id: `work-logs`. Raw spec: `../openapi-raw/work-logs.json`. Web: https://developers.procore.com/reference/rest/work-logs?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/projects/{project_id}/work_logs

**List Work Logs**
Returns all Work Logs for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters. Note that if none of the date parameters are provided in the call, only logs from the current date are returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Date of specific logs desired in YYYY-MM-DD format
- `start_date` [query] string(date) - Start date of specific logs desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific logs desired in YYYY-MM-DD format (use together with start_date)
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter

Response 200 (application/json): array of object

- `id`: integer e.g. `333675`
- `comments`: string - Comments e.g. `Work Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hourly_rate`: number(float) - Scheduled work hourly rate e.g. `20`
- `hours`: number(float) - Scheduled work hours e.g. `12`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `reimbursable`: boolean - If scheduled work is reimbursable e.g. `true`
- `resource_name`: string - Name of the resource associated with the scheduled work e.g. `Alices Admin (Twenty Twelve Inc)`
- `showed`: boolean - If scheduled worker kept the work log schedule e.g. `true`
- `workers`: integer - Scheduled number of workers e.g. `6`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Work Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `scheduled_tasks`: array of object
  - `id`: integer e.g. `100884`
  - `work_log_id`: integer e.g. `28652`
  - `task_name`: string e.g. `Concrete Pre-Pour`
  - `task_percentage`: integer e.g. `50`
  - `task_id`: integer e.g. `198325`
  - `task_row_number`: integer e.g. `987654`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/work_logs

**Create Work Log**
Creates single Work Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `work_log`: object (required)
  - `comments`: string - Comments e.g. `All workers showed up`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `hourly_rate`: number(float) - Scheduled work hourly rate e.g. `20`
  - `hours`: number(float) - Scheduled work hours e.g. `12`
  - `reimbursable`: boolean - If scheduled work is reimbursable e.g. `true`
  - `resource_name`: string - Resource Name e.g. `Alices Admin (Twenty Twelve Inc)`
  - `showed`: boolean - If scheduled worker kept the work log schedule e.g. `true`
  - `workers`: integer - Scheduled number of workers e.g. `6`
  - `vendor_id`: integer - ID of the Vendor associated to the Work Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Work Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer e.g. `333675`
- `comments`: string - Comments e.g. `Work Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hourly_rate`: number(float) - Scheduled work hourly rate e.g. `20`
- `hours`: number(float) - Scheduled work hours e.g. `12`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `reimbursable`: boolean - If scheduled work is reimbursable e.g. `true`
- `resource_name`: string - Name of the resource associated with the scheduled work e.g. `Alices Admin (Twenty Twelve Inc)`
- `showed`: boolean - If scheduled worker kept the work log schedule e.g. `true`
- `workers`: integer - Scheduled number of workers e.g. `6`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Work Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `scheduled_tasks`: array of object
  - `id`: integer e.g. `100884`
  - `work_log_id`: integer e.g. `28652`
  - `task_name`: string e.g. `Concrete Pre-Pour`
  - `task_percentage`: integer e.g. `50`
  - `task_id`: integer e.g. `198325`
  - `task_row_number`: integer e.g. `987654`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_logs/{id}

**Show Work Logs**
Returns single Work Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Work Log ID

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `comments`: string - Comments e.g. `Work Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hourly_rate`: number(float) - Scheduled work hourly rate e.g. `20`
- `hours`: number(float) - Scheduled work hours e.g. `12`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `reimbursable`: boolean - If scheduled work is reimbursable e.g. `true`
- `resource_name`: string - Name of the resource associated with the scheduled work e.g. `Alices Admin (Twenty Twelve Inc)`
- `showed`: boolean - If scheduled worker kept the work log schedule e.g. `true`
- `workers`: integer - Scheduled number of workers e.g. `6`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Work Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `scheduled_tasks`: array of object
  - `id`: integer e.g. `100884`
  - `work_log_id`: integer e.g. `28652`
  - `task_name`: string e.g. `Concrete Pre-Pour`
  - `task_percentage`: integer e.g. `50`
  - `task_id`: integer e.g. `198325`
  - `task_row_number`: integer e.g. `987654`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_logs/{id}

**Update Work Log**
Update single Work Log.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Work Log ID

Request body (application/json) (required):

- `work_log`: object (required)
  - `comments`: string - Comments e.g. `All workers showed up`
  - `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
  - `hourly_rate`: number(float) - Scheduled work hourly rate e.g. `20`
  - `hours`: number(float) - Scheduled work hours e.g. `12`
  - `reimbursable`: boolean - If scheduled work is reimbursable e.g. `true`
  - `resource_name`: string - Resource Name e.g. `Alices Admin (Twenty Twelve Inc)`
  - `showed`: boolean - If scheduled worker kept the work log schedule e.g. `true`
  - `workers`: integer - Scheduled number of workers e.g. `6`
  - `vendor_id`: integer - ID of the Vendor associated to the Work Log e.g. `1120327`
  - `location_id`: integer - The ID of the Location of the Work Log. e.g. `153252`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer e.g. `333675`
- `comments`: string - Comments e.g. `Work Log Comments`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Format: YYYY-MM-DD Example: 2016-04-19 e.g. `2016-05-19`
- `datetime`: string(date-time) - Estimated UTC datetime of record e.g. `2016-05-19T12:00:00Z`
- `hourly_rate`: number(float) - Scheduled work hourly rate e.g. `20`
- `hours`: number(float) - Scheduled work hours e.g. `12`
- `position`: integer - Order in which this entry was recorded for the day e.g. `142143`
- `reimbursable`: boolean - If scheduled work is reimbursable e.g. `true`
- `resource_name`: string - Name of the resource associated with the scheduled work e.g. `Alices Admin (Twenty Twelve Inc)`
- `showed`: boolean - If scheduled worker kept the work log schedule e.g. `true`
- `workers`: integer - Scheduled number of workers e.g. `6`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `attachments`: array of object - Work Log Attachments are not viewable or used on web
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `scheduled_tasks`: array of object
  - `id`: integer e.g. `100884`
  - `work_log_id`: integer e.g. `28652`
  - `task_name`: string e.g. `Concrete Pre-Pour`
  - `task_percentage`: integer e.g. `50`
  - `task_id`: integer e.g. `198325`
  - `task_row_number`: integer e.g. `987654`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/work_logs/{id}

**Delete Work Log**
Delete single Work Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Work Log ID

Response 200: OK (no body)

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

