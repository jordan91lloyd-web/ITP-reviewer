# Procore API: Field Productivity (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Field Productivity)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Actual Production Quantities](#actual-production-quantities) - versions 1.0
- [Company Managed Equipment Maintenance Log Attachment](#company-managed-equipment-maintenance-log-attachment) - versions 1.0
- [Equipment Category](#equipment-category) - versions 1.0
- [Equipment Log](#equipment-log) - versions 1.0
- [Equipment Maintenance Log](#equipment-maintenance-log) - versions 1.0
- [Equipment Make](#equipment-make) - versions 1.0
- [Equipment Model](#equipment-model) - versions 1.0
- [Equipment Timecard Entries](#equipment-timecard-entries) - versions 2.0, 1.0
- [Equipment Type](#equipment-type) - versions 1.0
- [Gps Positions](#gps-positions) - versions 1.0
- [Managed Equipment - Company Level](#managed-equipment-company-level) - versions 1.0
- [Managed Equipment - Project Level](#managed-equipment-project-level) - versions 1.0
- [Managed Equipment Attachment](#managed-equipment-attachment) - versions 1.0
- [Material](#material) - versions 1.0
- [Rounding Configuration](#rounding-configuration) - versions 1.0
- [Task Codes (Field Productivity)](#task-codes-field-productivity) - versions 1.0
- [Time And Material Attachment](#time-and-material-attachment) - versions 1.0
- [Time Types](#time-types) - versions 1.0
- [Time and Material Entry](#time-and-material-entry) - versions 1.0
- [Time and Material Equipment Log](#time-and-material-equipment-log) - versions 1.0
- [Time and Material Notification](#time-and-material-notification) - versions 1.0
- [Time and Material Signature](#time-and-material-signature) - versions 1.0
- [Time and Material Timecard](#time-and-material-timecard) - versions 1.0
- [Timecard Entries](#timecard-entries) - versions 1.0
- [Timecards](#timecards) - versions 1.0
- [Timesheet To Budget Configuration](#timesheet-to-budget-configuration) - versions 1.0
- [Timesheets](#timesheets) - versions 1.1, 1.0
- [Timesheets Filters](#timesheets-filters) - versions 1.0

## Actual Production Quantities

Resource id: `actual-production-quantities`. Raw spec: `../openapi-raw/actual-production-quantities.json`. Web: https://developers.procore.com/reference/rest/actual-production-quantities?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/actual_production_quantities

**List all Actual Production Quantities**
Return a list of all Actual Production Quantities for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[unit_of_measure]` [query] string - Return item(s) with the specified unit of measure.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[timesheet_id]` [query] string - Timesheet ID. Returns item(s) with the specified Timesheet ID.
- `filters[crew_id]` [query] string - Crew ID. Returns item(s) with the specified Crew ID.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[date]` [query] string - Returns item(s) within the specified ISO 8601 datetime range.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[approval_status]` [query] string enum[pending, approved, rejected, locked] - Return Actual Production Quantities with the specified approval status.
- `per_page` [query] integer - Elements per page
- `page` [query] integer - Page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
- `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
- `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
- `quantity`: number - Amount of cost code installed e.g. `100`
- `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `sub_job`: object
  - `origin_id`: string - The Third-party ID of the Sub Job
  - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
  - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
  - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
- `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
- `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
- `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `can_be_viewed`: boolean - Can be viewed e.g. `false`
  - `viewable`: boolean - Viewable e.g. `true`
  - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
  - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
  - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/actual_production_quantities

**Create Actual Production Quantity**
Create new Actual Production Quantity associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `actual_production_quantity`: object (required)
  - `quantity`: number (required) - Amount installed e.g. `100`
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `wbs_code_id`: integer - The Production Quantity Code for the Actual Production Quantity. This is necessary if your project is configured for Task Codes. DO NOT provide if your project is not configured for Task Codes. e.g. `1234`
  - `cost_code_id`: integer - The Cost Code ID for the Actual Production Quantity. DO NOT provide if your project is configured for Task Codes. e.g. `1`
  - `crew_id`: integer - The Crew ID for the Actual Production Quantity e.g. `1`
  - `location_id`: integer - The Location ID for the Actual Production Quantity e.g. `1`
  - `timesheet_id`: integer - The Timesheet ID for the Actual Production Quantity. If the 'timesheet_id' is provided in the request, then the date for the timesheet will be associated with the production quantity, regardless of whether an addition... e.g. `1`
  - `sub_job_id`: integer - The Sub Job ID for the Actual Production Quantity. DO NOT provide if your project is configured for Task Codes. e.g. `1`
  - `date`: string(date) - Date the Actual Production Quantity was installed. The date will be associated with the production quantity only when 'timesheet_id' is not included in the request. e.g. `2015-02-06`
  - `prostore_file_ids`: array of integer - Prostore Files to attach to the Actual Production Quantity e.g. `[3]`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Actual Production Quantity attachments.
  - `image_ids`: array of integer - Images to attach to the Actual Production Quantity e.g. `[9]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the Actual Production Quantity e.g. `[4]`
  - `file_version_ids`: array of integer - File Versions to attach to the Actual Production Quantity e.g. `[6]`
  - `form_ids`: array of integer - Forms to attach to the Actual Production Quantity e.g. `[7]`
  - `installed_step_quantities`: array of object - Installed quantities keyed by production-tracking step. Required on create when the project uses rules of credit (at least one item). Optional on update; omit to leave existing steps unchanged. An empty array is treat... e.g. `[{"step_id": 42, "quantity": 10.5}]`
    - `step_id`: integer (required) - Identifier of the production-tracking step this quantity applies to. Must be an integer. Whether the step belongs to the project is validated by Production Tracking, not this endpoint. e.g. `42`
    - `quantity`: number - Installed quantity for this step. Numeric with at most two decimal places, from -999999999.99 to 999999999.99 inclusive. Zero and negatives are valid. Zero does not remove the step. Required on create. On update, omit... e.g. `10.5`
    - `_destroy`: boolean - When true on an update, removes this `step_id` from the Actual Production Quantity. Update only; omit or send null on create. Mutually exclusive with `quantity`. e.g. `true`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
- `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
- `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
- `quantity`: number - Amount of cost code installed e.g. `100`
- `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `sub_job`: object
  - `origin_id`: string - The Third-party ID of the Sub Job
  - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
  - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
  - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
- `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
- `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
- `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `can_be_viewed`: boolean - Can be viewed e.g. `false`
  - `viewable`: boolean - Viewable e.g. `true`
  - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
  - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
  - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/actual_production_quantities/{id}

**Show Actual Production Quantity**
Return Actual Production Quantity detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Request body (application/json):

- `actual_production_quantity`: object (required)
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `quantity`: number (required) - Amount installed e.g. `100`
  - `date`: string(date) - The date the Actual Production Quantity was performed e.g. `2026-08-20`
  - `crew_id`: integer - The ID of the crew for the Actual Production Quantity e.g. `1`
  - `location_id`: integer - The Location ID for the Actual Production Quantity e.g. `1`
  - `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity. Setting `approved` or `rejected` requires Admin on Production Tracking, or the matching granular permission; setting `locked` requires Admin. A `locked` APQ canno... e.g. `approved`
  - `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
  - `prostore_file_ids`: array of integer - Prostore Files to attach to the Actual Production Quantity e.g. `[3]`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Actual Production Quantity attachments.
  - `image_ids`: array of integer - Images to attach to the Actual Production Quantity e.g. `[9]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the Actual Production Quantity e.g. `[4]`
  - `file_version_ids`: array of integer - File Versions to attach to the Actual Production Quantity e.g. `[6]`
  - `form_ids`: array of integer - Forms to attach to the Actual Production Quantity e.g. `[7]`
  - `installed_step_quantities`: array of object - Installed quantities keyed by production-tracking step. Required on create when the project uses rules of credit (at least one item). Optional on update; omit to leave existing steps unchanged. An empty array is treat... e.g. `[{"step_id": 42, "quantity": 10.5}]`
    - `step_id`: integer (required) - Identifier of the production-tracking step this quantity applies to. Must be an integer. Whether the step belongs to the project is validated by Production Tracking, not this endpoint. e.g. `42`
    - `quantity`: number - Installed quantity for this step. Numeric with at most two decimal places, from -999999999.99 to 999999999.99 inclusive. Zero and negatives are valid. Zero does not remove the step. Required on create. On update, omit... e.g. `10.5`
    - `_destroy`: boolean - When true on an update, removes this `step_id` from the Actual Production Quantity. Update only; omit or send null on create. Mutually exclusive with `quantity`. e.g. `true`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
- `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
- `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
- `quantity`: number - Amount of cost code installed e.g. `100`
- `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `sub_job`: object
  - `origin_id`: string - The Third-party ID of the Sub Job
  - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
  - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
  - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
- `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
- `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
- `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `can_be_viewed`: boolean - Can be viewed e.g. `false`
  - `viewable`: boolean - Viewable e.g. `true`
  - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
  - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
  - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/actual_production_quantities/{id}

**Update Actual Production Quantity**
Update Actual Production Quantity associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Request body (application/json):

- `actual_production_quantity`: object (required)
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `quantity`: number (required) - Amount installed e.g. `100`
  - `date`: string(date) - The date the Actual Production Quantity was performed e.g. `2026-08-20`
  - `crew_id`: integer - The ID of the crew for the Actual Production Quantity e.g. `1`
  - `location_id`: integer - The Location ID for the Actual Production Quantity e.g. `1`
  - `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity. Setting `approved` or `rejected` requires Admin on Production Tracking, or the matching granular permission; setting `locked` requires Admin. A `locked` APQ canno... e.g. `approved`
  - `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
  - `prostore_file_ids`: array of integer - Prostore Files to attach to the Actual Production Quantity e.g. `[3]`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Actual Production Quantity attachments.
  - `image_ids`: array of integer - Images to attach to the Actual Production Quantity e.g. `[9]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the Actual Production Quantity e.g. `[4]`
  - `file_version_ids`: array of integer - File Versions to attach to the Actual Production Quantity e.g. `[6]`
  - `form_ids`: array of integer - Forms to attach to the Actual Production Quantity e.g. `[7]`
  - `installed_step_quantities`: array of object - Installed quantities keyed by production-tracking step. Required on create when the project uses rules of credit (at least one item). Optional on update; omit to leave existing steps unchanged. An empty array is treat... e.g. `[{"step_id": 42, "quantity": 10.5}]`
    - `step_id`: integer (required) - Identifier of the production-tracking step this quantity applies to. Must be an integer. Whether the step belongs to the project is validated by Production Tracking, not this endpoint. e.g. `42`
    - `quantity`: number - Installed quantity for this step. Numeric with at most two decimal places, from -999999999.99 to 999999999.99 inclusive. Zero and negatives are valid. Zero does not remove the step. Required on create. On update, omit... e.g. `10.5`
    - `_destroy`: boolean - When true on an update, removes this `step_id` from the Actual Production Quantity. Update only; omit or send null on create. Mutually exclusive with `quantity`. e.g. `true`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
- `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
- `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
- `quantity`: number - Amount of cost code installed e.g. `100`
- `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `sub_job`: object
  - `origin_id`: string - The Third-party ID of the Sub Job
  - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
  - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
  - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
- `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
- `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
- `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `can_be_viewed`: boolean - Can be viewed e.g. `false`
  - `viewable`: boolean - Viewable e.g. `true`
  - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
  - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
  - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/actual_production_quantities/{id}

**Delete Actual Production Quantity**
Delete Actual Production Quantity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
- `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
- `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
- `quantity`: number - Amount of cost code installed e.g. `100`
- `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `sub_job`: object
  - `origin_id`: string - The Third-party ID of the Sub Job
  - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
  - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
  - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
- `cost_code`: object
  - `id`: integer - Cost Code ID e.g. `12345`
  - `biller_id`: integer - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `parent_id`: integer - Parent e.g. `2345`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
- `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
- `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
- `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
  - `id`: integer - File ID e.g. `1`
  - `name`: string - Base name of the file without its path e.g. `contract.pdf`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
  - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
  - `can_be_viewed`: boolean - Can be viewed e.g. `false`
  - `viewable`: boolean - Viewable e.g. `true`
  - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
  - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
  - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
  - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/actual_production_quantities/ids

**List of Actual Production Quantity Ids**
Returns a list of Actual Production Quantity Ids.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `filters[unit_of_measure]` [query] string - Return item(s) with the specified unit of measure.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[timesheet_id]` [query] string - Timesheet ID. Returns item(s) with the specified Timesheet ID.
- `filters[crew_id]` [query] string - Crew ID. Returns item(s) with the specified Crew ID.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[date]` [query] string - Returns item(s) within the specified ISO 8601 datetime range.
- `filters[approval_status]` [query] string enum[pending, approved, rejected, locked] - Return Actual Production Quantities with the specified approval status.
- `per_page` [query] integer - Elements per page
- `page` [query] integer - Page

Response 200 (application/json): array of integer


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/actual_production_quantities/bulk_create  **[BETA]**

**Bulk Create Actual Production Quantities**
This endpoint bulk creates a batch of Actual Production Quantities (APQ).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `actual_production_quantities`: array of object (required)
  - `quantity`: number (required) - Amount installed e.g. `100`
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `wbs_code_id`: integer - The Production Quantity Code for the Actual Production Quantity. This is necessary if your project is configured for Task Codes. DO NOT provide if your project is not configured for Task Codes. e.g. `1234`
  - `cost_code_id`: integer (required) - The Cost Code ID for the Actual Production Quantity. DO NOT provide if your project is configured for Task Codes. e.g. `1`
  - `crew_id`: integer - The Crew ID for the Actual Production Quantity e.g. `1`
  - `location_id`: integer - The Location ID for the Actual Production Quantity e.g. `1`
  - `timesheet_id`: integer - The Timesheet ID for the Actual Production Quantity. If the 'timesheet_id' is provided in the request, then the date for the timesheet will be associated with the production quantity, regardless of whether an addition... e.g. `1`
  - `sub_job_id`: integer - The Sub Job ID for the Actual Production Quantity. DO NOT provide if your project is configured for Task Codes. e.g. `1`
  - `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity. Setting `approved` or `rejected` requires Admin on Production Tracking, or the matching granular permission; setting `locked` requires Admin. A `locked` APQ canno... e.g. `approved`
  - `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
  - `prostore_file_ids`: array of integer - Prostore Files to attach to the Actual Production Quantity e.g. `[3]`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Actual Production Quantity attachments.
  - `image_ids`: array of integer - Images to attach to the Actual Production Quantity e.g. `[9]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the Actual Production Quantity e.g. `[4]`
  - `file_version_ids`: array of integer - File Versions to attach to the Actual Production Quantity e.g. `[6]`
  - `form_ids`: array of integer - Forms to attach to the Actual Production Quantity e.g. `[7]`
  - `installed_step_quantities`: array of object - Installed quantities keyed by production-tracking step. Required on create when the project uses rules of credit (at least one item). Optional on update; omit to leave existing steps unchanged. An empty array is treat... e.g. `[{"step_id": 42, "quantity": 10.5}]`
    - `step_id`: integer (required) - Identifier of the production-tracking step this quantity applies to. Must be an integer. Whether the step belongs to the project is validated by Production Tracking, not this endpoint. e.g. `42`
    - `quantity`: number - Installed quantity for this step. Numeric with at most two decimal places, from -999999999.99 to 999999999.99 inclusive. Zero and negatives are valid. Zero does not remove the step. Required on create. On update, omit... e.g. `10.5`
    - `_destroy`: boolean - When true on an update, removes this `step_id` from the Actual Production Quantity. Update only; omit or send null on create. Mutually exclusive with `quantity`. e.g. `true`

Response 201 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `75414`
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
  - `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
  - `quantity`: number - Amount of cost code installed e.g. `100`
  - `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `sub_job`: object
    - `origin_id`: string - The Third-party ID of the Sub Job
    - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
    - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
  - `cost_code`: object
    - `id`: integer - Cost Code ID e.g. `12345`
    - `biller_id`: integer - Biller ID e.g. `12345`
    - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
    - `code`: string - Cost code, not including parent prefix e.g. `300`
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
    - `name`: string - Name e.g. `Earthwork`
    - `parent_id`: integer - Parent e.g. `2345`
    - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
    - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
    - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
  - `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
  - `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
  - `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
    - `id`: integer - File ID e.g. `1`
    - `name`: string - Base name of the file without its path e.g. `contract.pdf`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
    - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
    - `can_be_viewed`: boolean - Can be viewed e.g. `false`
    - `viewable`: boolean - Viewable e.g. `true`
    - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
    - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
    - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
    - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/actual_production_quantities/bulk_update  **[BETA]**

**Bulk Update Actual Production Quantities**
This endpoint bulk updates a batch of Actual Production Quantities (APQ).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `actual_production_quantities`: array of object (required)
  - `id`: integer (required) - The ID for the Actual Production Quantity e.g. `1`
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `quantity`: number - Amount installed e.g. `100`
  - `date`: string(date) - The date the Actual Production Quantity was performed e.g. `2026-08-20`
  - `crew_id`: integer - The Crew ID for the Actual Production Quantity e.g. `1`
  - `location_id`: integer - The Location ID for the Actual Production Quantity e.g. `1`
  - `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity. Setting `approved` or `rejected` requires Admin on Production Tracking, or the matching granular permission; setting `locked` requires Admin. A `locked` APQ canno... e.g. `approved`
  - `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
  - `prostore_file_ids`: array of integer - Prostore Files to attach to the Actual Production Quantity e.g. `[3]`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Actual Production Quantity attachments.
  - `image_ids`: array of integer - Images to attach to the Actual Production Quantity e.g. `[9]`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the Actual Production Quantity e.g. `[4]`
  - `file_version_ids`: array of integer - File Versions to attach to the Actual Production Quantity e.g. `[6]`
  - `form_ids`: array of integer - Forms to attach to the Actual Production Quantity e.g. `[7]`
  - `installed_step_quantities`: array of object - Installed quantities keyed by production-tracking step. Required on create when the project uses rules of credit (at least one item). Optional on update; omit to leave existing steps unchanged. An empty array is treat... e.g. `[{"step_id": 42, "quantity": 10.5}]`
    - `step_id`: integer (required) - Identifier of the production-tracking step this quantity applies to. Must be an integer. Whether the step belongs to the project is validated by Production Tracking, not this endpoint. e.g. `42`
    - `quantity`: number - Installed quantity for this step. Numeric with at most two decimal places, from -999999999.99 to 999999999.99 inclusive. Zero and negatives are valid. Zero does not remove the step. Required on create. On update, omit... e.g. `10.5`
    - `_destroy`: boolean - When true on an update, removes this `step_id` from the Actual Production Quantity. Update only; omit or send null on create. Mutually exclusive with `quantity`. e.g. `true`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `75414`
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
  - `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
  - `quantity`: number - Amount of cost code installed e.g. `100`
  - `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `sub_job`: object
    - `origin_id`: string - The Third-party ID of the Sub Job
    - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
    - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
  - `cost_code`: object
    - `id`: integer - Cost Code ID e.g. `12345`
    - `biller_id`: integer - Biller ID e.g. `12345`
    - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
    - `code`: string - Cost code, not including parent prefix e.g. `300`
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
    - `name`: string - Name e.g. `Earthwork`
    - `parent_id`: integer - Parent e.g. `2345`
    - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
    - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
    - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
  - `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
  - `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
  - `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
    - `id`: integer - File ID e.g. `1`
    - `name`: string - Base name of the file without its path e.g. `contract.pdf`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
    - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
    - `can_be_viewed`: boolean - Can be viewed e.g. `false`
    - `viewable`: boolean - Viewable e.g. `true`
    - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
    - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
    - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
    - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/actual_production_quantities/bulk_destroy  **[BETA]**

**Bulk Destroy Actual Production Quantities**
This endpoint bulk destroys a batch of Actual Production Quantities (APQ).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `actual_production_quantity_ids`: array of integer (required) - IDs of Actual Production Quantities to be destroyed

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `75414`
  - `description`: string - The description of the Actual Production Quantity e.g. `Unable to complete installation due to weather`
  - `earned_production_quantity_id`: integer - The ID of the associated Earned Production Quantity in the Production Tracking system e.g. `1`
  - `unit_of_measure`: string - The unit of measure the Actual Production Quantity was created with e.g. `Sf`
  - `quantity`: number - Amount of cost code installed e.g. `100`
  - `timesheet_id`: integer - The Timesheet ID the Actual Production Quantity was created with e.g. `1`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `sub_job`: object
    - `origin_id`: string - The Third-party ID of the Sub Job
    - `origin_data`: string - The Third-party Data of the Sub Job e.g. `{"data_field":{"is_important":true}}`
    - `created_at`: string - Created at e.g. `2017-08-14T21:39:40Z`
    - `updated_at`: string - Updated at e.g. `2017-08-15T21:39:40Z`
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `updated_at`: string(date-time) - Date the actual production quantity was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the actual production quantity was created e.g. `2015-11-12T21:26:28Z`
  - `cost_code`: object
    - `id`: integer - Cost Code ID e.g. `12345`
    - `biller_id`: integer - Biller ID e.g. `12345`
    - `biller_type`: string enum[Project, SubJob] - Biller type e.g. `Project`
    - `code`: string - Cost code, not including parent prefix e.g. `300`
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
    - `name`: string - Name e.g. `Earthwork`
    - `parent_id`: integer - Parent e.g. `2345`
    - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
    - `standard_cost_code_id`: integer - Standard Cost Code ID e.g. `122334`
    - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
  - `deleted_at`: string(date-time) - Date the actual production quantity was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `date`: string(date) - Date the actual production quantity was installed (YYYY-MM-DD) e.g. `2015-11-12`
  - `approval_status`: string enum[pending, approved, rejected, locked] - The approval status of the Actual Production Quantity e.g. `pending`
  - `rejection_reason`: string - Free-form note describing why the Actual Production Quantity was rejected e.g. `Missing supporting photos`
  - `attachments`: array of object - Files attached to the Actual Production Quantity. Add attachments on create or update with `actual_production_quantity[prostore_file_ids]`, `[upload_ids]`, `[image_ids]`, `[drawing_revision_ids]`, `[file_version_ids]`...
    - `id`: integer - File ID e.g. `1`
    - `name`: string - Base name of the file without its path e.g. `contract.pdf`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com`
    - `filename`: string - Base name of the file without its path e.g. `contract.pdf`
    - `can_be_viewed`: boolean - Can be viewed e.g. `false`
    - `viewable`: boolean - Viewable e.g. `true`
    - `attached_to_item_id`: string - Attached to item ID e.g. `51GW47XAV5N64CQ2F8HTWFW0M4`
    - `attached_to_item_type`: string - Attached to item type e.g. `document_management_document_revision`
    - `viewer_url`: string - Unified viewer link e.g. `/webclients/host/companies/1/projects/1/tools/document-viewer/prostore/1?item...`
    - `thumbnail_url`: string - URL of the large thumbnail for the attachment e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/example_thumbnail.png`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Managed Equipment Maintenance Log Attachment

Resource id: `company-managed-equipment-maintenance-log-attachment`. Raw spec: `../openapi-raw/company-managed-equipment-maintenance-log-attachment.json`. Web: https://developers.procore.com/reference/rest/company-managed-equipment-maintenance-log-attachment?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}/attachments  **[DEPRECATED]**

**List all maintenance logs attachment**
Return a list of all Maintenance Log attachments for the Maintenance Log the current user has access to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75413`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Managed Equipment Attachment e.g. `Example Filename`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}/attachments  **[DEPRECATED]**

**Create maintenance log attachment.**
Create a new maintenance log attachment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Managed Equipment Maintenance Log

Request body (application/json) (required):

- `managed_equipment_maintenance_logs_attachment`: object (required)
  - `managed_equipment_maintenance_logs_id`: integer - Maintenance log Id the maintenance log attachment is associated with e.g. `1`
  - `documents`: array of integer
  - `folders`: array of integer
  - `upload_uuids`: array of integer

Response 201 (application/json): object

- `id`: integer - ID e.g. `75413`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Managed Equipment Attachment e.g. `Example Filename`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}/attachments/{attachment_id}  **[DEPRECATED]**

**Show an individual managed equipment maintenance log attachment**
Return detailed information about a specific managed equipment maintenance log attachment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the managed equipment maintenance log to get attachments from
- `attachment_id` [path] integer (required) - ID of the managed equipment maintenance log attachment

Response 200 (application/json): object

- `id`: integer - ID e.g. `75413`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Managed Equipment Attachment e.g. `Example Filename`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}/attachments/{attachment_id}  **[DEPRECATED]**

**Delete Managed Equipment Maintenance Log Attachment**
Deleting an attachment from a Managed Equipment Maintenance Log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the managed equipment maintenance log to get attachments from
- `attachment_id` [path] integer (required) - ID of the managed equipment maintenance log attachment

Response 200 (application/json): object

- `id`: integer - ID e.g. `75413`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Managed Equipment Attachment e.g. `Example Filename`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}/attachments/bulk_destroy  **[DEPRECATED]**

**Bulk Delete Managed Equipment Maintenance Log Attachments**
Delete multiple Managed Equipment Maintenance Logs Attachments with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Managed Equipment Maintenance Log

Request body (application/json) (required):

- `managed_equipment_maintenance_logs_attachment`: object (required) - Managed Equipment Maintenance Logs Attachment Object
  - `managed_equipment_maintenance_logs_attachment_ids`: array of integer - IDs of all the Managed Equipment Maintenance Logs Attachment values specified for bulk destroy

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75413`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Managed Equipment Attachment e.g. `Example Filename`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment Category

Resource id: `equipment-category`. Raw spec: `../openapi-raw/equipment-category.json`. Web: https://developers.procore.com/reference/rest/equipment-category?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment_categories  **[DEPRECATED]**

**List all equipment categories**
Return a list of all equipment Categories.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment category e.g. `Earthmoving`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - If the category is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment_categories  **[DEPRECATED]**

**Create equipment Category**
Create a new equipment Category Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_category`: object (required)
  - `name`: string (required) - Name of the category e.g. `Earthmoving`
  - `is_active`: boolean - If the category is active e.g. `true`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment category e.g. `Earthmoving`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - If the category is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment_categories/{id}  **[DEPRECATED]**

**Show an equipment category**
Return detailed information about a specific equipment Category.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the equipment category

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment category e.g. `Earthmoving`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - If the category is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment_categories/{id}  **[DEPRECATED]**

**Update Equipment Category**
Update a specified equipment category.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Equipment Category

Request body (application/json):

- `managed_equipment_category`: object (required)
  - `name`: string (required) - Name of the category e.g. `Earthmoving`
  - `is_active`: boolean - If the category is active e.g. `true`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment category e.g. `Earthmoving`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - If the category is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment_categories/{id}  **[DEPRECATED]**

**Delete Equipment Category**
Detete a specific Equipment Category.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Equipment Category

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment category e.g. `Earthmoving`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - If the category is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment Log

Resource id: `equipment-log`. Raw spec: `../openapi-raw/equipment-log.json`. Web: https://developers.procore.com/reference/rest/equipment-log?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment_logs  **[DEPRECATED]**

**List all equipment logs**
Return a list of all equipment Logs for the projects the current user has access to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment_logs  **[DEPRECATED]**

**Create equipment log.**
Create a new equipment log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_log`: object (required)
  - `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
  - `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
  - `onsite`: string(date) - The Date equipment arrived on site e.g. `2019-04-10`
  - `offsite`: string(date) - The Date equipment left the site e.g. `2019-05-10`
  - `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-04-10`
  - `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
  - `induction_number`: string - The number used for equipment induction e.g. `00001`
  - `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment_logs/{id}  **[DEPRECATED]**

**Show an equipment log**
Return detailed information about a specific equipment log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the log to get
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/managed_equipment_logs  **[DEPRECATED]**

**List Project Equipment Logs**
Return a list of all equipment logs for a specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/managed_equipment_logs  **[DEPRECATED]**

**Create an Project Equipment Log**
Create a new equipment log entry

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `managed_equipment_log`: object (required)
  - `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
  - `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
  - `onsite`: string(date) - The Date equipment arrived on site e.g. `2019-04-10`
  - `offsite`: string(date) - The Date equipment left the site e.g. `2019-05-10`
  - `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-04-10`
  - `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
  - `induction_number`: string - The number used for equipment induction e.g. `00001`
  - `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/managed_equipment_logs/{id}  **[DEPRECATED]**

**Show an Project Equipment Log**
Return detailed information about a specific equipment log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the company to get the logs for

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/managed_equipment_logs/{id}  **[DEPRECATED]**

**Update an Project Equipment Log**
Update a specified equipment log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the company to get the logs for

Request body (application/json):

- `managed_equipment_log`: object (required)
  - `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
  - `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
  - `onsite`: string(date) - The Date equipment arrived on site e.g. `2019-04-10`
  - `offsite`: string(date) - The Date equipment left the site e.g. `2019-05-10`
  - `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-04-10`
  - `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
  - `induction_number`: string - The number used for equipment induction e.g. `00001`
  - `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/managed_equipment_logs/{id}  **[DEPRECATED]**

**Delete an Project Equipment Log**
Detete a specific equipment log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the company to get the logs for

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment Id the log is associated with e.g. `1`
- `onsite`: string(date) - The date equipment arrived on site e.g. `2019-04-10`
- `offsite`: string(date) - The date equipment leaves the site e.g. `2019-05-10`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `formatted_offsite`: string(date) - The formatted date equipment left on site e.g. `2015-11-12T21:26:28Z`
- `formatted_onsite`: string(date) - The formatted date equipment arrived on site e.g. `2015-11-12T21:26:28Z`
- `responsible_contractor`: string - The responsible contractor e.g. `MD construction`
- `inspection_date`: string(date) - The date the equipment was inspected e.g. `2019-02-19`
- `induction_checklist_list_id`: integer - Id of the inspection list the equipment uses e.g. `1`
- `induction_number`: string - The number used for equipment induction e.g. `1`
- `induction_status`: boolean - Indicates if the equipemnt has been successfully inspected and allowed to perform work e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment Maintenance Log

Resource id: `equipment-maintenance-log`. Raw spec: `../openapi-raw/equipment-maintenance-log.json`. Web: https://developers.procore.com/reference/rest/equipment-maintenance-log?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs  **[DEPRECATED]**

**List Equipment Maintenance Logs**
Return a list of all Equipment Maintenance Logs.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs  **[DEPRECATED]**

**Create Equipment Maintenance Log**
Create a new equipment maintenance log entry

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_maintenance_log`: object (required)
  - `managed_equipment_id`: integer - Equipment Id the maintenance log is associated with e.g. `1`
  - `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-20`
  - `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-05-20`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Managed Equipment Maintenance Logs Attachments.

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}  **[DEPRECATED]**

**Show Equipment Maintenance Log**
Return detailed information about a specific equipment Maintenance Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the makes for
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}  **[DEPRECATED]**

**Update Equipment Maintenance Log**
Update a specified equipment maintenance log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the makes for
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_maintenance_log`: object (required)
  - `managed_equipment_id`: integer - Equipment Id the maintenance log is associated with e.g. `1`
  - `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-20`
  - `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-05-20`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Managed Equipment Maintenance Logs Attachments.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment_maintenance_logs/{id}  **[DEPRECATED]**

**Delete Equipment Maintenance Log**
Detete a specific equipment maintenance log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the makes for
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/managed_equipment_maintenance_logs  **[DEPRECATED]**

**List Project Equipment Maintenance Logs**
Return a list of all Equipment Maintenance Logs

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/managed_equipment_maintenance_logs  **[DEPRECATED]**

**Create Project Equipment Maintenance Log**
Create a new Equipment Maintenance Log Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `managed_equipment_maintenance_log`: object (required)
  - `managed_equipment_id`: integer - Equipment Id the maintenance log is associated with e.g. `1`
  - `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-20`
  - `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-05-20`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Managed Equipment Maintenance Logs Attachments.

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/managed_equipment_maintenance_logs/{id}  **[DEPRECATED]**

**Show Project Equipment Maintenance Log**
Return detailed information about a specific Equipment Maintenance Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the maintenance logs for
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/managed_equipment_maintenance_logs/{id}  **[DEPRECATED]**

**Update Project Equipment Maintenance Log**
Update a specified Equipment Maintenance Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the maintenance logs for
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `managed_equipment_maintenance_log`: object (required)
  - `managed_equipment_id`: integer - Equipment Id the maintenance log is associated with e.g. `1`
  - `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-20`
  - `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-05-20`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Managed Equipment Maintenance Logs Attachments.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/managed_equipment_maintenance_logs/{id}  **[DEPRECATED]**

**Delete Project Equipment Maintenance Log**
Detete a specific Equipment Maintenance Log.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the maintenance logs for
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `project_id`: integer - ID of the project the equipment was logged for e.g. `14406`
- `managed_equipment_id`: integer - Equipment ID the log is associated to e.g. `1`
- `last_service_date`: string(date) - The Date the equipment was last services e.g. `2019-04-25`
- `next_service_date`: string(date) - Next service date for the equipment e.g. `2019-04-20`
- `updated_at`: string(date-time) - Date the equipment log was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment log was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment log was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment Make

Resource id: `equipment-make`. Raw spec: `../openapi-raw/equipment-make.json`. Web: https://developers.procore.com/reference/rest/equipment-make?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment_makes  **[DEPRECATED]**

**List all equipment makes**
Return a list of all equipment makes.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment make e.g. `CAT`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - if the equipment make is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment_makes  **[DEPRECATED]**

**Create an equipment make**
Create a new equipment make

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_make`: object (required)
  - `name`: string (required) - Name of the equipment make e.g. `CAT`
  - `is_active`: boolean (required) - Equipment make is active if true e.g. `true`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment make e.g. `CAT`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - if the equipment make is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment_makes/{id}  **[DEPRECATED]**

**Show an equipment make**
Return detailed information about a specific equipment make

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the equipment make

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment make e.g. `CAT`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - if the equipment make is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment_makes/{id}  **[DEPRECATED]**

**Update an equipment make**
Update a specified equipment make

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the equipment make

Request body (application/json):

- `managed_equipment_make`: object (required)
  - `name`: string (required) - Name of the equipment make e.g. `CAT`
  - `is_active`: boolean (required) - Equipment make is active if true e.g. `true`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment make e.g. `CAT`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - if the equipment make is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment_makes/{id}  **[DEPRECATED]**

**Delete an equipment make**
Detete a specific equipment make

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the equipment make

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment make e.g. `CAT`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - if the equipment make is currently active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment Model

Resource id: `equipment-model`. Raw spec: `../openapi-raw/equipment-model.json`. Web: https://developers.procore.com/reference/rest/equipment-model?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment_models  **[DEPRECATED]**

**List all equipment models**
Return a list of all equipment models

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment model e.g. `Earthmoving`
- `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
- `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment_models  **[DEPRECATED]**

**Create an equipment Model**
Create a new equipment model entry

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_model`: object (required)
  - `name`: string (required) - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer (required) - Equipment make ID the model is associated to e.g. `75414`
  - `managed_equipment_type_id`: integer (required) - Equipment type ID the model is associated to e.g. `75414`
  - `is_active`: boolean - If the equipment model is active e.g. `true`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment model e.g. `Earthmoving`
- `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
- `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment_models/bulk_update  **[DEPRECATED]**

**Bulk Update Managed Equipment models**
Update multiple Managed Equipment model entries is_active property with one request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `managed_equipment_model`: object (required) - Managed Equipment Model Object
  - `is_active`: boolean - If the equipment model is active e.g. `true`
  - `managed_equipment_make_id`: integer - The make id the Managed Equipment Model is associated with e.g. `533`
  - `managed_equipment_type_id`: integer - The make id the Managed Equipment Model is associated with e.g. `533`

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment model e.g. `Earthmoving`
- `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
- `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment_models/{id}  **[DEPRECATED]**

**Show an equipment model**
Return detailed information about a specific equipment model

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the models for
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment model e.g. `Earthmoving`
- `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
- `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment_models/{id}  **[DEPRECATED]**

**Update an equipment model**
Update a specified equipment model

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the models for
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_model`: object (required)
  - `name`: string (required) - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer (required) - Equipment make ID the model is associated to e.g. `75414`
  - `managed_equipment_type_id`: integer (required) - Equipment type ID the model is associated to e.g. `75414`
  - `is_active`: boolean - If the equipment model is active e.g. `true`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment model e.g. `Earthmoving`
- `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
- `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment_models/{id}  **[DEPRECATED]**

**Delete an equipment model**
Detete a specific equipment model

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the models for
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment model e.g. `Earthmoving`
- `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
- `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Equipment Timecard Entries

Resource id: `equipment-timecard-entries`. Raw spec: `../openapi-raw/equipment-timecard-entries.json`. Web: https://developers.procore.com/reference/rest/equipment-timecard-entries?version=latest
Product lines: Field Productivity, PM Essentials

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/equipment_timecard_entries/update_approval  **[BETA]**

**Update equipment timecard entry approval status**
Update approval status of equipment timecard entries (pending, approved, reviewed, billed) for the given project. Supports bulk updates: pass an array of equipment timecard entry IDs and the desired approval_status. Billed entries cannot be changed to another status (except to keep as billed). Requires project timesheet approval permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `serializer_view` [query] string enum[default, compact, mobile] - Optional response blueprint view. Defaults to `default`.

Request body (application/json) (required):

- `ids`: array of integer (required) - Array of equipment timecard entry IDs to update e.g. `[123456789, 123456790]`
- `approval_status`: string enum[pending, approved, reviewed, billed] (required) - The approval status to set for all specified entries e.g. `approved`

Response 200 (application/json): object

- `data`: array of object (required) - Equipment timecard entry objects
  - `id`: string (required) - Primary key (REST v2 serializes numeric identifiers as strings) e.g. `12345`
  - `approved_by_id`: string - Login that approved the entry, when applicable
  - `approval_status`: string enum[pending, approved, reviewed, billed] (required) - Approval workflow status
  - `approval_status_updated_at`: string(date-time) - When approval status was last updated
  - `company_id`: string (required) - Company ID
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation.
  - `created_at`: string(date-time) (required) - Creation timestamp
  - `created_by_id`: string - Creator login ID
  - `crew_id`: string - Crew ID
  - `date`: string(date) (required) - Entry date e.g. `2026-01-07`
  - `equipment_id`: string (required) - Equipment ULID (Equipment Register) e.g. `01KJX4Z277RJJNKQWKANZ74YB2`
  - `equipment_name`: string - Display name from Equipment Register when available (company-scoped list).
  - `equipment_identification_number`: string - Identification number from Equipment Register when available (company-scoped list).
  - `idle_quantity`: number (required) - Idle hours e.g. `0`
  - `location_id`: string - Location ID
  - `party_id`: string - Party ID
  - `project_id`: string (required) - Project ID
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: number (required) - Operating hours e.g. `8`
  - `timesheet_id`: string - Timesheet ID
  - `unit_of_measure`: integer (required) - Unit of measure (stored enum value) e.g. `0`
  - `updated_at`: string(date-time) (required) - Last update timestamp
  - `updated_by_id`: string - Last updater login ID
  - `wbs_code_id`: string - WBS / task code ID
  - `origin_data`: string - ERP / external integration payload from associated external_data
  - `origin_id`: string - External system identifier from associated external_data
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `timesheet`: object - Present when serializer_view=mobile; nested timesheet (TimesheetBlueprint normal view). Null when the entry has no timesheet.
    - `id`: string
    - `date`: string(date)
    - `name`: string
    - `number`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `status`: string enum[pending, approved, reviewed] - Timesheet workflow status
    - `created_by`: object - LoginInformationBlueprint normal view
  - `timesheet_status`: string enum[pending, approved, reviewed] - Present when serializer_view=mobile; same as timesheet.status when a timesheet is associated

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/equipment_timecard_entries  **[BETA]**

**List equipment timecard entries (Project)**
Returns a list of all equipment timecard entries for the given date range. If no date/date range is provided, it returns entries for the current date.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `start_date` [query] string(date) - The beginning of the date range for equipment timecard entries. (YYYY-MM-DD) Start date is inclusive.
- `end_date` [query] string(date) - The end of the date range for equipment timecard entries. (YYYY-MM-DD) End date is inclusive.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `serializer_view` [query] string enum[default, compact, mobile] - Optional response blueprint view. Defaults to `compact`.
- `filters[equipment_id]` [query] array of string - Return item(s) matching the specified equipment identifier(s).
- `filters[timesheet_id]` [query] array of integer - Return item(s) matching the specified timesheet ID(s).
- `filters[wbs_code_id]` [query] array of integer - Return item(s) matching the specified WBS code ID(s).
- `filters[party_id]` [query] array of integer - Return item(s) matching the specified party ID(s).
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset

Response 200 (application/json): object

- `data`: object
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/equipment_timecard_entries/{id}  **[BETA]**

**Show equipment timecard entry (Project)**
Return detailed information about a specific equipment timecard entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] string (required) - ID of the equipment timecard entry

Response 200 (application/json): object

- `data`: object
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/projects/{project_id}/equipment_timecard_entries/{id}  **[BETA]**

**Update equipment timecard entry (Project)**
Update a specific equipemnt timecard entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] string (required) - ID of the equipment timecard entry

Request body (application/json) (required):

- `timesheet_id`: string - The unique identifier of the timesheet associated with the equipment timecard entry.
- `wbs_code_id`: string - The Work Breakdown Structure (WBS) code associated with the equipment timecard entry.
- `date`: string(date) - The date of the timecard entry in ISO 8601 format.
- `equipment_id`: string - The unique identifier of the equipment associated with the equipment timecard entry.
- `location_id`: string - The unique identifier of the location associated with the equipment timecard entry.
- `origin_id`: string - ID of related external data
- `origin_data`: string - Value of related external data
- `crew_id`: string - The unique identifier of the crew associated with the equipment timecard entry.
- `party_id`: string - The unique identifier of the party associated with the equipment timecard entry.
- `quantity`: number - The quantity of hours worked for the equipment timecard entry.
- `idle_quantity`: number - The quantity of hours the equipment was idle for the equipment timecard entry.
- `unit_of_measure`: string - The unit of measure for the quantity, typically 'hours'.

Response 200 (application/json): object

- `data`: object
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/equipment_timecard_entries/{id}  **[BETA]**

**Delete equipment timecard entry (Project)**
Delete a specific timecard equipment entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] string (required) - ID of the equipment timecard entry

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/equipment_timecard_entries/bulk_create  **[BETA]**

**Bulk Create**
Create equipment timecard entries in a bulk transaction. (Current max is set to 25 timecard entries). NOTE, this endpoint is currently in the experimental stage and is subject to change. Please contact support to be added to the beta group.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `equipment_timecard_entries`: array of object (required) - Array of equipment timecard entries to be created
  - `timesheet_id`: integer - The unique identifier of the timesheet associated with the equipment timecard entry. e.g. `1234`
  - `wbs_code_id`: integer - The Work Breakdown Structure (WBS) code associated with the equipment timecard entry. e.g. `1234`
  - `date`: string(date) - The date of the equipment timecard entry in ISO 8601 format. e.g. `2023-12-15`
  - `equipment_id`: string - The unique identifier of the equipment associated with the equipment timecard entry. e.g. `01JAAV95D0FGY8AVJ3JG5DP3JZ`
  - `location_id`: integer - The unique identifier of the location associated with the equipment timecard entry. e.g. `1234`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew_id`: integer - The unique identifier of the crew associated with the equipment timecard entry. e.g. `1234`
  - `party_id`: integer - The unique identifier of the party associated with the equipment timecard entry. e.g. `1234`
  - `quantity`: number - The quantity of hours worked for the equipment timecard entry. e.g. `8.0`
  - `idle_quantity`: number - The quantity of hours the equipment was idle for the equipment timecard entry. e.g. `2.0`
  - `unit_of_measure`: integer - Enum representing the unit of measure, typically 'hours'. e.g. `0`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`

Response 201: Created (no body)

## Equipment Type

Resource id: `equipment-type`. Raw spec: `../openapi-raw/equipment-type.json`. Web: https://developers.procore.com/reference/rest/equipment-type?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment_types  **[DEPRECATED]**

**List all equipment types**
Return a list of all equipment types

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment Type e.g. `Backhoe`
- `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment_types  **[DEPRECATED]**

**Create an equipment type**
Create a new Equipment Type Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_type`: object (required)
  - `name`: string (required) - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer (required) - Equipment category ID the type is associated to e.g. `3355`
  - `is_active`: boolean - If the equipment model is active e.g. `true`

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment Type e.g. `Backhoe`
- `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment_types/bulk_update  **[DEPRECATED]**

**Bulk Update Managed Equipment types**
Update multiple Managed Equipment types entries is_active property with one request

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `managed_equipment_type`: object (required) - Managed Equipment Type Object
  - `is_active`: boolean - If the equipment type is active e.g. `true`
  - `managed_equipment_category_id`: integer - The category id the Managed Equipment Type is associated with e.g. `534`

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment Type e.g. `Backhoe`
- `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment_types/{id}  **[DEPRECATED]**

**Show an equipment type**
Return detailed information about a specific equipment type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the types for
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment Type e.g. `Backhoe`
- `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment_types/{id}  **[DEPRECATED]**

**Update an equipment type**
Update a specified equipment type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the types for
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `managed_equipment_type`: object (required)
  - `name`: string (required) - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer (required) - Equipment category ID the type is associated to e.g. `3355`
  - `is_active`: boolean - If the equipment model is active e.g. `true`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment Type e.g. `Backhoe`
- `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment_types/{id}  **[DEPRECATED]**

**Delete a equipment type**
Detete a specific equipment type

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the company to get the types for
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - Name of the equipment Type e.g. `Backhoe`
- `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
- `company_id`: integer - Company ID e.g. `3355`
- `is_active`: boolean - Is Active e.g. `true`
- `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Gps Positions

Resource id: `gps-positions`. Raw spec: `../openapi-raw/gps-positions.json`. Web: https://developers.procore.com/reference/rest/gps-positions?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/gps_positions

**List Gps Positions**
Return a list of all Gps Positions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer
- `company_id`: integer
- `latitude`: number - The latitude in degrees. e.g. `34.196411`
- `longitude`: number - The longitude in degrees. e.g. `-119.170898`
- `altitude`: number - The altitude, measured in meters. e.g. `52`
- `horizontal_accuracy`: number - The horizontal radius of uncertainty for the location, measured in meters. e.g. `100`
- `vertical_accuracy`: number - The vertical radius of uncertainty for the location, measured in meters. e.g. `100`
- `timestamp`: string(date-time) - The time at which this location was determined. e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_at`: string(date-time) - Date and time the gps position was created. e.g. `2015-05-15T00:00:00Z`
- `updated_at`: string(date-time) - Date and time the gps position was updated. e.g. `2015-05-15T00:00:00Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/gps_positions

**Create Gps Position**
Create a new Gps Position.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `gps_position`: object (required) - Gps Position object
  - `latitude`: number (required) - The latitude in degrees. e.g. `34.196411`
  - `longitude`: number (required) - The longitude in degrees. e.g. `-119.170898`
  - `altitude`: number - The altitude, measured in meters. e.g. `52`
  - `horizontal_accuracy`: number - The horizontal radius of uncertainty for the location, measured in meters. e.g. `100`
  - `vertical_accuracy`: number - The vertical radius of uncertainty for the location, measured in meters. e.g. `100`
  - `timestamp`: string(date-time) (required) - The time at which this location was determined. e.g. `2015-11-12T21:26:28Z`

Response 201 (application/json): object

- `id`: integer
- `company_id`: integer
- `latitude`: number - The latitude in degrees. e.g. `34.196411`
- `longitude`: number - The longitude in degrees. e.g. `-119.170898`
- `altitude`: number - The altitude, measured in meters. e.g. `52`
- `horizontal_accuracy`: number - The horizontal radius of uncertainty for the location, measured in meters. e.g. `100`
- `vertical_accuracy`: number - The vertical radius of uncertainty for the location, measured in meters. e.g. `100`
- `timestamp`: string(date-time) - The time at which this location was determined. e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_at`: string(date-time) - Date and time the gps position was created. e.g. `2015-05-15T00:00:00Z`
- `updated_at`: string(date-time) - Date and time the gps position was updated. e.g. `2015-05-15T00:00:00Z`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/gps_positions/{id}

**Show Gps Position**
Return detailed information about a specific Gps Position.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Gps Position
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer
- `company_id`: integer
- `latitude`: number - The latitude in degrees. e.g. `34.196411`
- `longitude`: number - The longitude in degrees. e.g. `-119.170898`
- `altitude`: number - The altitude, measured in meters. e.g. `52`
- `horizontal_accuracy`: number - The horizontal radius of uncertainty for the location, measured in meters. e.g. `100`
- `vertical_accuracy`: number - The vertical radius of uncertainty for the location, measured in meters. e.g. `100`
- `timestamp`: string(date-time) - The time at which this location was determined. e.g. `2015-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_at`: string(date-time) - Date and time the gps position was created. e.g. `2015-05-15T00:00:00Z`
- `updated_at`: string(date-time) - Date and time the gps position was updated. e.g. `2015-05-15T00:00:00Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Managed Equipment - Company Level

Resource id: `managed-equipment---company-level`. Raw spec: `../openapi-raw/managed-equipment---company-level.json`. Web: https://developers.procore.com/reference/rest/managed-equipment---company-level?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/companies/{company_id}/managed_equipment  **[DEPRECATED]**

**List all Equipment**
Return a list of all Equipment with details for a specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[managed_equipment_category_id]` [query] integer - Return item(s) with the specified Managed Equipment Category ID.
- `filters[managed_equipment_type_id]` [query] integer - Return item(s) with the specified Managed Equipment Type ID.
- `filters[managed_equipment_make_id]` [query] integer - Return item(s) with the specified Managed Equipment Make ID.
- `filters[managed_equipment_model_id]` [query] integer - Return item(s) with the specified Managed Equipment Model ID.
- `filters[company_visible]` [query] boolean - If true, return item(s) with 'company visible' status.
- `filters[current_project_id]` [query] integer - Return item(s) with the specified current project ID.
- `filters[year]` [query] integer - Return item(s) with the specified year.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[last_service_date]` [query] string - Return item(s) with a last service date within the specified ISO 8601 datetime range.
- `filters[next_service_date]` [query] string - Return item(s) with a next service date within the specified ISO 8601 datetime range.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment  **[DEPRECATED]**

**Create Equipment**
Create a new Equipment associated with the specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `current_project_id`: integer - ID of the project the equipment is currently dispatched to e.g. `14406`
  - `name`: string - Name of the equipment e.g. `Backhoe`
  - `serial_number`: string - Serial number of the equipment e.g. `S#12892`
  - `identification_number`: string - Identification number of the equipment e.g. `ID982011`
  - `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
  - `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
  - `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
  - `managed_equipment_type_id`: integer - ID of the equipment type e.g. `13`
  - `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
  - `company_visible`: boolean - Company visible e.g. `false`
  - `year`: integer - Year the equipment was manufactured in e.g. `2017`
  - `status`: string enum[available, in_use, under_maintenance] - Status e.g. `in_use`
  - `ownership`: string enum[owned, rented, sub] - The type of ownership e.g. `owned`
  - `upload_uuids`: array of string - Array of upload uuids

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment/query  **[DEPRECATED]**

**Search all equipment**
Return a list of all searched equipment with details for a specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[managed_equipment_category_id]` [query] integer - Return item(s) with the specified Managed Equipment Category ID.
- `filters[managed_equipment_type_id]` [query] integer - Return item(s) with the specified Managed Equipment Type ID.
- `filters[managed_equipment_make_id]` [query] integer - Return item(s) with the specified Managed Equipment Make ID.
- `filters[managed_equipment_model_id]` [query] integer - Return item(s) with the specified Managed Equipment Model ID.
- `filters[company_visible]` [query] boolean - If true, return item(s) with 'company visible' status.
- `filters[current_project_id]` [query] integer - Return item(s) with the specified current project ID.
- `filters[year]` [query] integer - Return item(s) with the specified year.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[last_service_date]` [query] string - Return item(s) with a last service date within the specified ISO 8601 datetime range.
- `filters[next_service_date]` [query] string - Return item(s) with a next service date within the specified ISO 8601 datetime range.
- `search_keyword` [query] string - Search keyword to search Project Managed Equipment.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment/user_permissions  **[DEPRECATED]**

**List all Company Managed Equipment User Permissions**
Return a list of allCompany Managed Equipment User Permissions for a specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `93988`
- `company_directory_admin`: boolean - User is a Company directory admin e.g. `false`
- `name`: string - Full name of user e.g. `user, test`
- `user_access_level`: object
  - `id`: integer - access level
  - `name`: string - friendly name for level
- `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true}`
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment/user_permissions  **[DEPRECATED]**

**Update User Permission**
Updating a Company Managed Equipment User Permission

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `id`: integer - ID e.g. `93988`
- `user_access_level_id`: integer enum[1, 2, 3, 4] - User Access Level ID - '1' for None, '2' for Read-Only, '3' for Standard, '4' for Admin e.g. `2`

Response 200 (application/json): object

- `id`: integer - ID e.g. `93988`
- `company_directory_admin`: boolean - User is a Company directory admin e.g. `false`
- `name`: string - Full name of user e.g. `user, test`
- `user_access_level`: object
  - `id`: integer - access level
  - `name`: string - friendly name for level
- `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true}`
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/managed_equipment/setup_managed_equipment_dependents  **[DEPRECATED]**

**Setup Managed Equipment Taxonomy**
Setup Managed Equipment Taxonomy with the specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `dependent_import_params`: object (required) - Dependent Import Params Object
  - `categories`: array of string - Names of all Managed Equipment categories specified for Managed Equipment dependent import
  - `types`: array of string - Names of all Managed Equipment types specified for Managed Equipment dependent import

Response 200: OK (no body)

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment/{id}  **[DEPRECATED]**

**Show Equipment**
Return Equipment detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment/{id}  **[DEPRECATED]**

**Update Equipment**
Updating a piece of Equipment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Equipment

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `current_project_id`: integer - ID of the project the equipment is currently dispatched to e.g. `14406`
  - `name`: string - Name of the equipment e.g. `Backhoe`
  - `serial_number`: string - Serial number of the equipment e.g. `S#12892`
  - `identification_number`: string - Identification number of the equipment e.g. `ID982011`
  - `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
  - `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
  - `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
  - `managed_equipment_type_id`: integer - ID of the equipment type e.g. `13`
  - `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
  - `company_visible`: boolean - Company visible e.g. `false`
  - `year`: integer - Year the equipment was manufactured in e.g. `2017`
  - `status`: string enum[available, in_use, under_maintenance] - Status e.g. `in_use`
  - `ownership`: string enum[owned, rented, sub] - The type of ownership e.g. `owned`
  - `upload_uuids`: array of string - Array of upload uuids

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment/{id}  **[DEPRECATED]**

**Delete Equipment**
Deleting a piece of Equipment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Equipment

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment/{id}/restore  **[DEPRECATED]**

**Retrieve Equipment**
Restore a piece of Equipment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Equipment

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `current_project_id`: integer - ID of the project the equipment is currently dispatched to e.g. `14406`
  - `name`: string - Name of the equipment e.g. `Backhoe`
  - `serial_number`: string - Serial number of the equipment e.g. `S#12892`
  - `identification_number`: string - Identification number of the equipment e.g. `ID982011`
  - `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
  - `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
  - `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
  - `managed_equipment_type_id`: integer - ID of the equipment type e.g. `13`
  - `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
  - `company_visible`: boolean - Company visible e.g. `false`
  - `year`: integer - Year the equipment was manufactured in e.g. `2017`
  - `status`: string enum[available, in_use, under_maintenance] - Status e.g. `in_use`
  - `ownership`: string enum[owned, rented, sub] - The type of ownership e.g. `owned`
  - `upload_uuids`: array of string - Array of upload uuids

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment/{id}/update_deleted_equipment_serial_number  **[DEPRECATED]**

**Update Deleted Equipment Serial Number**
Update a serial number for a deleted piece of Equipment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Equipment

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `serial_number`: string - Serial number of the equipment e.g. `S#12892`

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/managed_equipment/{id}/change_history  **[DEPRECATED]**

**Show Equipment Change History**
Return Equipment change history detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `column`: string - Column Name e.g. `This Managed Equipment Maintenance Log Was Created`
- `created_at`: string - Created At e.g. `05/11/21 at 02:14 pm`
- `created_by`: string - Created By e.g. `Anderson, Theo`
- `new_value`: string - Created By e.g. `Managed Equipment Maintenance Log`
- `old_value`: string - Created By e.g. `(None)`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment/bulk_destroy  **[DEPRECATED]**

**Bulk Delete Managed Equipment**
Delete multiple Managed Equipment with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `managed_equipment_ids`: array of integer - IDs of all Managed Equipment specified for bulk destroy

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/managed_equipment/bulk_restore  **[DEPRECATED]**

**Bulk Retrieve Managed Equipment**
Restore multiple Managed Equipment with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `managed_equipment_ids`: array of integer - IDs of all Managed Equipment specified for bulk restore

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Managed Equipment - Project Level

Resource id: `managed-equipment---project-level`. Raw spec: `../openapi-raw/managed-equipment---project-level.json`. Web: https://developers.procore.com/reference/rest/managed-equipment---project-level?version=latest
Product lines: Managed

### GET /rest/v1.0/projects/{project_id}/managed_equipment  **[DEPRECATED]**

**List all equipment**
Return a list of all equipment with details for a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[managed_equipment_category_id]` [query] integer - Return item(s) with the specified Managed Equipment Category ID.
- `filters[managed_equipment_type_id]` [query] integer - Return item(s) with the specified Managed Equipment Type ID.
- `filters[managed_equipment_make_id]` [query] integer - Return item(s) with the specified Managed Equipment Make ID.
- `filters[managed_equipment_model_id]` [query] integer - Return item(s) with the specified Managed Equipment Model ID.
- `filters[company_visible]` [query] boolean - If true, return item(s) with 'company visible' status.
- `filters[current_project_id]` [query] integer - Return item(s) with the specified current project ID.
- `filters[year]` [query] integer - Return item(s) with the specified year.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[last_service_date]` [query] string - Return item(s) with a last service date within the specified ISO 8601 datetime range.
- `filters[next_service_date]` [query] string - Return item(s) with a next service date within the specified ISO 8601 datetime range.
- `filters[onsite]` [query] array of string - Onsite Dates. Returns item(s) with the specified range of onsite dates.
- `filters[offsite]` [query] array of string - Offsite Dates. Returns item(s) with the specified range of offsite dates.
- `filters[ownership]` [query] string enum[Owned, Rented, Sub] - Returns only item(s) with the specified ownership value. Must be one of Owned, Rented, or Sub.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[induction_status]` [query] boolean - Returns item(s) with the specified inudction status.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/managed_equipment  **[DEPRECATED]**

**Create a new equipment**
Create a new equipment associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `current_project_id`: integer - ID of the project the equipment is currently dispatched to e.g. `14406`
  - `name`: string - Name of the equipment e.g. `Backhoe`
  - `serial_number`: string - Serial number of the equipment e.g. `S#12892`
  - `identification_number`: string - Identification number of the equipment e.g. `ID982011`
  - `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
  - `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
  - `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
  - `managed_equipment_type_id`: integer - ID of the equipment type e.g. `13`
  - `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
  - `company_visible`: boolean - Company visible e.g. `false`
  - `year`: integer - Year the equipment was manufactured in e.g. `2017`
  - `status`: string enum[available, in_use, under_maintenance] - Status e.g. `in_use`
  - `ownership`: string enum[owned, rented, sub] - The type of ownership e.g. `owned`
  - `upload_uuids`: array of string - Array of upload uuids

Response 201 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/managed_equipment/search  **[DEPRECATED]**

**Search all equipment**
Return a list of all searched equipment with details for a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[managed_equipment_id]` [query] integer - Return item(s) with the specified Managed Equipment ID.
- `filters[managed_equipment_category_id]` [query] integer - Return item(s) with the specified Managed Equipment Category ID.
- `filters[managed_equipment_type_id]` [query] integer - Return item(s) with the specified Managed Equipment Type ID.
- `filters[managed_equipment_make_id]` [query] integer - Return item(s) with the specified Managed Equipment Make ID.
- `filters[managed_equipment_model_id]` [query] integer - Return item(s) with the specified Managed Equipment Model ID.
- `filters[company_visible]` [query] boolean - If true, return item(s) with 'company visible' status.
- `filters[current_project_id]` [query] integer - Return item(s) with the specified current project ID.
- `filters[year]` [query] integer - Return item(s) with the specified year.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[last_service_date]` [query] string - Return item(s) with a last service date within the specified ISO 8601 datetime range.
- `filters[next_service_date]` [query] string - Return item(s) with a next service date within the specified ISO 8601 datetime range.
- `search_keyword` [query] string - Search keyword to search Project Managed Equipment.
- `filters[onsite]` [query] array of string - Onsite Dates. Returns item(s) with the specified range of onsite dates.
- `filters[offsite]` [query] array of string - Offsite Dates. Returns item(s) with the specified range of offsite dates.
- `filters[ownership]` [query] string enum[Owned, Rented, Sub] - Returns only item(s) with the specified ownership value. Must be one of Owned, Rented, or Sub.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[induction_status]` [query] boolean - Returns item(s) with the specified inudction status.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/managed_equipment/ids  **[DEPRECATED]**

**List all project equipment IDs**
Return a list of all equipment IDs with details for a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of integer


Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/managed_equipment/{id}  **[DEPRECATED]**

**Show equipment**
Return equipment detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/managed_equipment/{id}  **[DEPRECATED]**

**Update an equipment**
Updating an equipment associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the equipment

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `current_project_id`: integer - ID of the project the equipment is currently dispatched to e.g. `14406`
  - `name`: string - Name of the equipment e.g. `Backhoe`
  - `serial_number`: string - Serial number of the equipment e.g. `S#12892`
  - `identification_number`: string - Identification number of the equipment e.g. `ID982011`
  - `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
  - `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
  - `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
  - `managed_equipment_type_id`: integer - ID of the equipment type e.g. `13`
  - `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
  - `company_visible`: boolean - Company visible e.g. `false`
  - `year`: integer - Year the equipment was manufactured in e.g. `2017`
  - `status`: string enum[available, in_use, under_maintenance] - Status e.g. `in_use`
  - `ownership`: string enum[owned, rented, sub] - The type of ownership e.g. `owned`
  - `upload_uuids`: array of string - Array of upload uuids

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/managed_equipment/{id}  **[DEPRECATED]**

**Delete an equipment**
Deleting an equipment associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the equipment

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/managed_equipment/{id}/restore  **[DEPRECATED]**

**Restoring an equipment**
Restoring an equipment associated with the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the equipment

Request body (application/json) (required):

- `managed_equipment`: object (required) - Managed Equipment Object
  - `current_project_id`: integer - ID of the project the equipment is currently dispatched to e.g. `14406`
  - `name`: string - Name of the equipment e.g. `Backhoe`
  - `serial_number`: string - Serial number of the equipment e.g. `S#12892`
  - `identification_number`: string - Identification number of the equipment e.g. `ID982011`
  - `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
  - `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
  - `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
  - `managed_equipment_type_id`: integer - ID of the equipment type e.g. `13`
  - `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
  - `company_visible`: boolean - Company visible e.g. `false`
  - `year`: integer - Year the equipment was manufactured in e.g. `2017`
  - `status`: string enum[available, in_use, under_maintenance] - Status e.g. `in_use`
  - `ownership`: string enum[owned, rented, sub] - The type of ownership e.g. `owned`
  - `upload_uuids`: array of string - Array of upload uuids

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `name`: string - The name of the install managed equipment e.g. `Backhoe`
- `company_id`: integer - The Comapny ID the Managed Equipment was created with e.g. `1`
- `current_project_id`: integer - Project ids the equipment is involved in e.g. `1`
- `company_visible`: boolean - Is the equipment visible as a company equipment e.g. `false`
- `updated_at`: string(date-time) - Date the managed equipment was updated e.g. `2015-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the managed equipment was created e.g. `2015-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the managed equipment was deleted e.g. `2015-11-12T21:26:28Z`
- `serial_number`: string - Serial number of the equipment e.g. `S#12892`
- `identification_number`: string - Identification number of the equipment e.g. `ID#9018290`
- `description`: string - description of the equipment e.g. `This equipment was brought in for the backyard work.`
- `managed_equipment_make_id`: integer - ID of the equipment make e.g. `14`
- `managed_equipment_model_id`: integer - ID of the equipment model e.g. `13`
- `managed_equipment_type_id`: integer - ID of the equipment type e.g. `132`
- `managed_equipment_category_id`: integer - ID of the equipment category e.g. `13`
- `year`: integer - Year the equipment was manufactured in e.g. `2017`
- `status`: string - Status e.g. `in_use`
- `ownership`: string - The type of ownership e.g. `owned`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_make`: object - Equipment Make
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment make e.g. `CAT`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - if the equipment make is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_model`: object - Equipment Model
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment model e.g. `Earthmoving`
  - `managed_equipment_make_id`: integer - Equipment make ID the model is associated to e.g. `3355`
  - `managed_equipment_type_id`: integer - Equipment type ID the model is associated to e.g. `3356`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment model was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment model was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment model was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `managed_equipment_make`: object - Equipment Make
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment make e.g. `CAT`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - if the equipment make is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment make was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment make was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment make was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `managed_equipment_type`: object - Equipment Type
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment Type e.g. `Backhoe`
    - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - Is Active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
    - `managed_equipment_category`: object - Equipment Category
    - `created_by`: object
- `managed_equipment_category`: object - Equipment Category
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment category e.g. `Earthmoving`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - If the category is currently active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `managed_equipment_type`: object - Equipment Type
  - `id`: integer - ID e.g. `75414`
  - `name`: string - Name of the equipment Type e.g. `Backhoe`
  - `managed_equipment_category_id`: integer - Equipment category ID the type is associated with e.g. `3355`
  - `company_id`: integer - Company ID e.g. `3355`
  - `is_active`: boolean - Is Active e.g. `true`
  - `updated_at`: string(date-time) - Date the equipment type was updated e.g. `2015-11-12T21:26:28Z`
  - `created_at`: string(date-time) - Date the equipment type was created e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) - Date the equipment type was deleted e.g. `2015-11-12T21:26:28Z`
  - `managed_equipment_category`: object - Equipment Category
    - `id`: integer - ID e.g. `75414`
    - `name`: string - Name of the equipment category e.g. `Earthmoving`
    - `company_id`: integer - Company ID e.g. `3355`
    - `is_active`: boolean - If the category is currently active e.g. `true`
    - `updated_at`: string(date-time) - Date the equipment category was updated e.g. `2015-11-12T21:26:28Z`
    - `created_at`: string(date-time) - Date the equipment category was created e.g. `2015-11-12T21:26:28Z`
    - `deleted_at`: string(date-time) - Date the equipment category was deleted e.g. `2015-11-12T21:26:28Z`
    - `created_by`: object
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Managed Equipment Attachment

Resource id: `managed-equipment-attachment`. Raw spec: `../openapi-raw/managed-equipment-attachment.json`. Web: https://developers.procore.com/reference/rest/managed-equipment-attachment?version=latest
Product lines: Field Productivity

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment/{managed_equipment_id}/managed_equipment_attachments/{id}  **[DEPRECATED]**

**Delete Managed Equipment Attachment**
Deleting an attachment from a Managed Equipment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `managed_equipment_id` [path] integer (required) - Id of the Equipment
- `id` [path] integer (required) - Id of the Managed Equipment Attachment

Response 200 (application/json): object

- `id`: integer - ID e.g. `75414`
- `presentation_url`: string - URL e.g. `http://www.example.com/`
- `filename`: string - Filename of Managed Equipment Attachment e.g. `Example Filename`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/managed_equipment/{id}/managed_equipment_attachments/bulk_destroy  **[DEPRECATED]**

**Bulk Delete Managed Equipment Attachment**
Delete multiple Managed Equipment Attachments with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `managed_equipment_attachment`: object (required) - Managed Equipment Attachment Object
  - `managed_equipment_id`: integer - ID of the Managed Equipment associated with the attachment(s) e.g. `66`
  - `managed_equipment_attachment_ids`: array of integer - IDs of all the Managed Equipment Attachment values specified for bulk destroy

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `75414`
- `presentation_url`: string - URL e.g. `http://www.example.com/`
- `filename`: string - Filename of Managed Equipment Attachment e.g. `Example Filename`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Material

Resource id: `material`. Raw spec: `../openapi-raw/material.json`. Web: https://developers.procore.com/reference/rest/material?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/materials

**List Materials**
Return a list of all Materials

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/materials

**Create Material**
Create a new Material Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `material`: object (required)
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the material is associated with e.g. `13`
  - `name`: string - Name of the material e.g. `Wallpaper`
  - `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
  - `uom`: string - Unit of measure for the material e.g. `sf`
  - `quantity`: number(float) - Quantity of the material e.g. `2250.75`
  - `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Omit or send null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`

Response 201 (application/json): object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/materials/bulk_destroy

**Bulk Delete Materials**
Bulk delete Material entries with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_materials`: object (required) - Material Object
  - `time_and_material_materials_ids`: array of integer - Array of material IDs specified for delete

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/materials/bulk_create

**Bulk Create Materials**
Bulk create Material entries with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_materials`: array of object (required) - Array of Material objects
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the material is associated with e.g. `13`
  - `name`: string - Name of the material e.g. `Wallpaper`
  - `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
  - `uom`: string - Unit of measure for the material e.g. `sf`
  - `quantity`: number(float) - Quantity of the material e.g. `2250.75`
  - `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Omit or send null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`

Response 201 (application/json): array of object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/materials/bulk_update

**Bulk Update Materials**
Bulk update Material entries with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_materials`: array of object (required) - Array of Material objects
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the material is associated with e.g. `13`
  - `name`: string - Name of the material e.g. `Wallpaper`
  - `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
  - `uom`: string - Unit of measure for the material e.g. `sf`
  - `quantity`: number(float) - Quantity of the material e.g. `2250.75`
  - `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Omit or send null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/materials/{id}

**Show Material**
Return detailed information about a specific Material.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the project
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/materials/{id}

**Update Material**
Update a specified Material.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the project
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `material`: object (required)
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the material is associated with e.g. `13`
  - `name`: string - Name of the material e.g. `Wallpaper`
  - `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
  - `uom`: string - Unit of measure for the material e.g. `sf`
  - `quantity`: number(float) - Quantity of the material e.g. `2250.75`
  - `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Omit or send null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`

Response 200 (application/json): object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/materials/{id}

**Delete Material**
Detete a specific Material.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the project
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `13`
- `name`: string - Name of the material e.g. `Wallpaper`
- `description`: string - Description of the material e.g. `This Material was used for the upper portion of the wall`
- `uom`: string - Unit of measure e.g. `sf`
- `quantity`: number(float) - Quantity e.g. `2250.75`
- `project_id`: integer - ID of the project the material was logged for e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the material is associated with e.g. `13`
- `material_id`: string(uuid) - Identifier of the associated material in the Materials catalog microservice, formatted as a UUID. Null when the material is not linked to a catalog record. e.g. `019dac6d-e353-7a89-ab24-3637e2bf17bb`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Rounding Configuration

Resource id: `rounding-configuration`. Raw spec: `../openapi-raw/rounding-configuration.json`. Web: https://developers.procore.com/reference/rest/rounding-configuration?version=latest
Product lines: Field Productivity, PM Essentials, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/rounding_configuration

**Show rounding configuration**
Show time increments and rounding rules for company timesheets

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Rounding configuration ID e.g. `1`
- `company_id`: integer - Company ID e.g. `13`
- `time_increment`: integer - Time increment for rounding e.g. `5`
- `rule`: string - Rounding rule e.g. `up`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/rounding_configuration

**Create rounding configuration**
Create rounding configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `rounding_configuration`: object (required)
  - `time_increment`: integer - Time increment available for Timecard Entries. Options are 5, 6, 10, and 15 e.g. `5`
  - `rule`: string - Rule to apply to rounding. Options are 'up', 'down', 'nearest', and 'favor_employee' e.g. `up`

Response 200 (application/json): object

- `id`: integer - Rounding configuration ID e.g. `1`
- `company_id`: integer - Company ID e.g. `13`
- `time_increment`: integer - Time increment for rounding e.g. `5`
- `rule`: string - Rounding rule e.g. `up`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/rounding_configuration

**Update rounding configuration**
Update rounding configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `rounding_configuration`: object (required)
  - `time_increment`: integer - Time increment available for Timecard Entries. Options are 5, 6, 10, and 15 e.g. `5`
  - `rule`: string - Rule to apply to rounding. Options are 'up', 'down', 'nearest', and 'favor_employee' e.g. `up`

Response 200 (application/json): object

- `id`: integer - Rounding configuration ID e.g. `1`
- `company_id`: integer - Company ID e.g. `13`
- `time_increment`: integer - Time increment for rounding e.g. `5`
- `rule`: string - Rounding rule e.g. `up`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/rounding_configuration

**Delete rounding configuration**
Delete rounding configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 204: No Content (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Task Codes (Field Productivity)

Resource id: `task-codes-field-productivity`. Raw spec: `../openapi-raw/task-codes-field-productivity.json`. Web: https://developers.procore.com/reference/rest/task-codes-field-productivity?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/task_codes  **[BETA]**

**List Project WBS Task codes**
All Work Breakdown Structure task codes for a given project, sorted by flat code. NOTE, this endpoint is currently in the experimental stage and is subject to change.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `type` [query] string enum[labor (default), equipment, all (returns both labor and equipment task codes in a single request)] - Type of task codes to return
- `per_page` [query] integer - Elements per page
- `page` [query] integer - Page
- `project_id` [path] integer (required) - Unique identifier for the project.
- `serializer_view` [query] string - Controls which Task Code blueprint is used to serialize the data. This defaults to `task_code_entity`, but `id_only` is also valid. Errors may be generated if requesting a serializer view that is not compatible with W...
- `view` [query] string - Controls which Task Code blueprint is used to serialize the data. This defaults to `task_code_entity`, but `id_only` is also valid. Errors may be generated if requesting a serializer view that is not compatible with W...
- `filters` [query] object - Filters for wbs task codes

Response 200 (application/json): array of object

- `id`: integer - primary key e.g. `1234`
- `budgeted`: boolean - whether the task code is budgeted or not e.g. `true`
- `cost_code`: object - associated cost code
  - `id`: integer - Primary key of the cost code e.g. `1234`
  - `biller`: string - Biller e.g. `Campus`
  - `biller_id`: string - Biller ID e.g. `12345`
  - `biller_type`: string enum[Project, SubJob, ] - Biller type e.g. `Project`
  - `biller_origin_id`: string - Biller Origin Id e.g. `98765`
  - `budgeted`: boolean - Budgeted e.g. `false`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `created_at`: string(date-time) - Created at e.g. `2018-06-11T15:56:25Z`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2018-06-11T15:56:25Z`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
  - `origin_data`: string - Cost Code third party data e.g. `OD-129947`
  - `origin_id`: string - Cost Code third party id e.g. `9874484`
  - `parent`: object - Parent
    - `id`: string - Parent ID e.g. `2345`
  - `position`: integer - Position e.g. `1`
  - `sortable_code`: string - Sortable code (this property is deprecated - see full_code) e.g. `02-300`
  - `standard_cost_code_id`: string - Standard Cost Code ID e.g. `122334`
  - `updated_at`: string(date-time) - Updated at e.g. `2015-05-15T00:00:00Z`
  - `line_item_types`: array of object - Line Item Types
    - `id`: string - Unique identifier for the Line Item Type e.g. `12345`
    - `name`: string - Name for the Line Item Type e.g. `Equipment`
    - `code`: string - Code for the Line Item Type e.g. `LB`
    - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, other] - Base type e.g. `materials`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
- `description`: string - description of task code e.g. `remove brush from jobsite`
- `flat_code`: string - flat code for task code e.g. `02-411`
- `flat_name`: string - flat name of task code e.g. `Brush Removal`
- `production_quantity_code_id`: integer - primary key of associated production quantity wbs code e.g. `1235`
- `segment_items`: array of object
  - `id`: integer - ID e.g. `456`
  - `code`: string - Code e.g. `01-222`
  - `name`: string - Name e.g. `Lighting`
  - `created_at`: string(date-time) - Created at e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-08-30T18:11:43Z`
  - `parent_id`: integer - Parent ID e.g. `123`
  - `path_ids`: array of integer - Path variable IDs e.g. `[123, 456]`
  - `path_code`: string - Path Variable Code e.g. `a`
  - `is_parent`: boolean e.g. `false`
  - `path_codes`: array of string - Path variable codes e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `path_names`: array of string - Path variable names e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `in_use`: boolean - Whether or not this item is tagged on an entity e.g. `true`
  - `segment`: object - Segment attributes e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
    - `id`: integer e.g. `3`
    - `name`: string e.g. `Cost Code`
    - `type`: string e.g. `cost_code`
    - `position`: integer e.g. `1`
    - `delimiter`: string e.g. `.`
    - `required`: boolean e.g. `true`
    - `segment_items_count`: integer e.g. `2`
    - `project_can_modify_origin_project`: boolean e.g. `true`
    - `project_can_delete_origin_company`: boolean e.g. `true`
    - `structure`: string enum[tiered, flat] e.g. `tiered`
    - `created_at`: string(date-time) - Created at e.g. `2016-06-30T20:41:58Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-08-30T18:11:43Z`
    - `wbs_pattern_id`: integer - ID of the associated WBS Pattern e.g. `4567`
  - `status`: string - Segment item status e.g. `active`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time And Material Attachment

Resource id: `time-and-material-attachment`. Raw spec: `../openapi-raw/time-and-material-attachment.json`. Web: https://developers.procore.com/reference/rest/time-and-material-attachment?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/time_and_material_entry_attachments

**List all attachments**
Return a list of all Time and Material attachments for the specified Project user has access to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1200`
- `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
- `content_type`: string - Content type e.g. `image/jpeg`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_entry_attachments

**Create attachment**
Create a new attachment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_entry_id`: integer (required) - Time & Material Id the attachment is associated with e.g. `13`
- `time_and_material_entry_attachment`: object (required)
  - `documents`: array of integer
  - `folders`: array of integer
  - `upload_uuids`: array of integer

Response 201 (application/json): object

- `id`: integer - ID e.g. `1200`
- `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
- `content_type`: string - Content type e.g. `image/jpeg`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/time_and_material_entry_attachments/{id}

**Show an individual time and material attachment**
Return detailed information about a specific time and material attachment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the time and material attachment

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
- `content_type`: string - Content type e.g. `image/jpeg`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_entry_attachments/{id}

**Delete a Time and Material Attachment**
Deleting a Time and Material Attachment from a specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the time and material attachment

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
- `content_type`: string - Content type e.g. `image/jpeg`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_entry_attachments/bulk_destroy

**Bulk Delete Time and Material Attachments**
Delete multiple Time and Material Attachments with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_entry_attachment`: object (required) - Time and Material Attachment Object
  - `time_and_material_entry_attachment_ids`: array of integer - IDs of all the Time and Material Entries Attachment values specified for bulk destroy

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1200`
- `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
- `content_type`: string - Content type e.g. `image/jpeg`
- `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
- `url`: string - URL e.g. `http://www.example.com/`
- `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
- `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time Types

Resource id: `time-types`. Raw spec: `../openapi-raw/time-types.json`. Web: https://developers.procore.com/reference/rest/time-types?version=latest
Product lines: PM Essentials, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/timecard_time_types

**List Timecard Time Types**
Return a list of all Timecard Time Types for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Time type id e.g. `1`
- `time_type`: string - Time type e.g. `Another Time`
- `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
- `global`: boolean - Time type global status e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time and Material Entry

Resource id: `time-and-material-entry`. Raw spec: `../openapi-raw/time-and-material-entry.json`. Web: https://developers.procore.com/reference/rest/time-and-material-entry?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/time_and_material_entries

**List all Time And Material Entry**
Return a list of all Time And Material Entry associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_entries

**Create a new Time And Material Entry**
Create a new Time And Material Entry associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_entry`: object (required) - Time and Material Entry Object
  - `name`: string - The title of T&M ticket e.g. `Remove all pipes`
  - `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
  - `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
  - `status`: string - Current status of T&M ticket e.g. `draft`
  - `private`: boolean - If the T&M ticket is private e.g. `false`
  - `number`: integer - Unique number for the T&M ticket e.g. `56`
  - `customer_signature_id`: integer - The ID associate with customer's signature e.g. `7`
  - `company_signature_id`: integer - The ID associate with company's signature e.g. `3`
  - `company_signee_party_id`: integer - The ID associate with company's signature party e.g. `7`
  - `customer_signee_party_id`: integer - The ID associate with customer's signature party e.g. `3`
  - `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Time And Material Entry Attachments.

Response 201 (application/json): object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_entries/bulk_update

**Update Multiple Time And Material Entries**
Multiple Time And Material Entries Updated

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_entry`: object (required) - Time and Material Entry Object
  - `time_and_material_entry_ids`: array of integer - ID's of the Time And Material Entry Objects to be updated
  - `change_event_id`: integer - Associated Change Event ID e.g. `65`
  - `update_change_event_attachment`: boolean - Will the attachments need to be updated

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/time_and_material_entries/{id}

**Show Time And Material Entry**
Return Time And Material Entry detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_entries/{id}

**Update a Time And Material Entry**
Updating a Time And Material Entry associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Time And Material Entry
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_entry`: object (required) - Time and Material Entry Object
  - `name`: string - The title of T&M ticket e.g. `Remove all pipes`
  - `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
  - `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
  - `status`: string - Current status of T&M ticket e.g. `draft`
  - `private`: boolean - If the T&M ticket is private e.g. `false`
  - `number`: integer - Unique number for the T&M ticket e.g. `56`
  - `customer_signature_id`: integer - The ID associate with customer's signature e.g. `7`
  - `company_signature_id`: integer - The ID associate with company's signature e.g. `3`
  - `company_signee_party_id`: integer - The ID associate with company's signature party e.g. `7`
  - `customer_signee_party_id`: integer - The ID associate with customer's signature party e.g. `3`
  - `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - The specified array of upload ids is saved as Time And Material Entry Attachments.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_entries/{id}

**Delete a Time And Material Entry**
Deleting a Time And Material Entry associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of Time And Material Entry

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/time_and_material_entries/{id}/change_history

**Show Change History**
Show Change History For a Time And Material Entry

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Error responses: 304, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_entries/{id}/email_entry

**Email a Time And Material Entry**
Email a Time And Material Entry associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Time And Material Entry

Response 204: Time And Material Entry email sent (no body)

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_entries/create_equipment

**Create a piece of Equipment**
Create a piece of Equipment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_entry`: object (required) - Time and Material Entry Object
  - `equipment_name`: string - Equipment Name e.g. `Kubota KH123`

Response 201 (application/json): object

- `id`: integer - Equipment ID e.g. `15504`
- `name`: string - Equipment name e.g. `Jackhammer`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_entries/search

**List all Time And Material Entry matching the search keyword**
Return a list of all Time And Material Entry matching the search keyword

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `search_keyword` [query] string - Keyword for looking up Time And Material Entries

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_entries/{id}/restore

**Restore a Time And Material Entry**
Restored a deleted Time And Material Entry

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Time And Material Entry

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `name`: string - The title of T&M ticket e.g. `Remove all pipes`
- `reference_number`: string - The refrence number associate with T&M ticket e.g. `ABCDE789`
- `description`: string - The description of job e.g. `We focused on removing all damaged pipe`
- `status`: integer - Current status of T&M ticket e.g. `draft`
- `private`: boolean - If the T&M ticket is private e.g. `false`
- `number`: integer - Unique number for the T&M ticket
- `company_signee_party`: object - Company signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `company_signature`: object - Company signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signature`: object - Customer signature
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `customer_signee_party`: object - Customer signee party
  - `employee_id`: string - Employee ID for the Party Person e.g. `123456789`
  - `first_name`: string - Party Person first name e.g. `Leah`
  - `id`: integer - Unique identifier for the Party Person. e.g. `381006`
  - `is_employee`: boolean - Employee status for the Party Person e.g. `false`
  - `last_name`: string - Party Person last name e.g. `Russell`
  - `user_id`: integer - User ID if this Party Person represents a User. NULL for a Reference User. e.g. `700215`
  - `work_classification`: object
    - `id`: integer - ID e.g. `57869`
    - `name`: string - The name of the classification e.g. `Driver`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `location_id`: integer - ID of the location the T&M ticket was logged for e.g. `4567`
- `customer_id`: integer - ID of the costomer who asked for T&M ticket e.g. `567`
- `work_performed_on_date`: string - Date work performed on e.g. `2019-12-10T22:10:33Z`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`
- `deleted_at`: string(date-time) - Date the T&M ticket was deleted e.g. `2019-07-14T10:09:56Z`
- `created_by_id`: integer - The user ID the T&M ticket was created with e.g. `7`
- `time_and_material_entry_attachments`: array of object
  - `id`: integer - ID e.g. `1200`
  - `attachment_id`: integer - ID of the associated prostore file e.g. `1233`
  - `content_type`: string - Content type e.g. `image/jpeg`
  - `presentation_url`: string - URL e.g. `http://www.example.com/presentation_url`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `thumbnail_url`: string - URL e.g. `http://www.example.com/thumbnail_url`
  - `filename`: string - Filename of Time and Material Entry Attachment e.g. `Example Filename`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/time_and_material_entries/configurable_field_sets

**List all Time And Material Entry Configurable Field Sets**
Return a list of all Time And Material Entry Configurable Field Sets associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - The unique identifier of the configurable field set. e.g. `999`
- `name`: string - The name of the configurable field set. e.g. `Observation Fields`
- `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
- `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
- `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
- `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
  - `field_1`: object - The first Observation Field object.
    - `name`: string - The name of the field. e.g. `field_1`
    - `visible`: boolean - If this property is set to true, the field is visible. If this property is set to false, the field is not visible. e.g. `true`
    - `required`: boolean - If this property is set to true, the field is required, if the property is set to false, the field is not required. e.g. `true`
  - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
    - `id`: integer - The metadatum identifier of the custom field. e.g. `999`
    - `name`: string - The name of the custom field. e.g. `custom_field_1`
    - `label`: string - The label of the custom field definition. e.g. `Worked hours`
    - `description`: string - The description of the custom field definition. e.g. `description`
    - `custom_field_definition_id`: integer - The definition identifier of the custom field. e.g. `999`
    - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the custom field.
    - `variant`: string enum[currency] - The variant type of the custom field.
    - `position`: integer - The display position of the custom field, which is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column pro... e.g. `999`
    - `required`: boolean - If this property is set to true, the custom field is required. If this property is set to false, the custom field is not required. e.g. `true`
    - `visible`: boolean - If this property is set to true, the custom field is visible. If this property is set to false, the custom field is not visible. e.g. `true`
    - `row`: number - The number of the row where the custom field is positioned on the form. e.g. `1`
    - `column`: number - The number of the column where the custom field is positioned on the form. e.g. `1`
    - `column_width`: number - The number of columns the custom field spans on the form. e.g. `3`
- `sections`: array of object - An array of sections that are used for custom fields.
  - `id`: integer - The unique identifier of the section. e.g. `1`
  - `name`: string - The name of the section. e.g. `Section 1`
  - `description`: string - The description of the section. e.g. `Project ABC`
  - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
  - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
- `inspection_type_id`: integer - The unique identifier of the inspection type. e.g. `1`
- `incident_type_id`: integer - The unique identifier of the incident type. e.g. `1`
- `generic_tool_id`: integer - The unique idenfitier of the generic tool. e.g. `1`
- `action_plan_type_id`: integer - The unique idenfitier of the action plan type. e.g. `1`
- `observations_category_id`: integer - The unique idenfitier of the observations category. e.g. `1`
- `updated_at`: string(date-time) - The time when the field set was last updated. e.g. `2025-08-20T12:34:56Z`
- `updated_by`: object - The user who last updated the field set.
  - `id`: integer - The unique identifier of the user who last updated the field set. e.g. `999`
  - `email`: string - The email address of the user who last updated the field set. e.g. `user@example.com`
  - `name`: string - The name of the user who last updated the field set. e.g. `John Doe`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time and Material Equipment Log

Resource id: `time-and-material-equipment-log`. Raw spec: `../openapi-raw/time-and-material-equipment-log.json`. Web: https://developers.procore.com/reference/rest/time-and-material-equipment-log?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs

**List of all Time and Material Equipment Logs**
List of all Time and Material Equipment Logs

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs

**Create a new Time And Material Equipment Log**
Create a new Time And Material Equipment log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_equipment_log`: object (required)
  - `time_and_material_entry_id`: integer - Time & Material Entry Id of Time And Material Equipment Log e.g. `16`
  - `description`: string - Description of Time And Material Equipment Log e.g. `This backhoe was used for the second day for all damaged pipes`
  - `uom`: string - Unit of measure for Time And Material Equipment Log e.g. `each`
  - `quantity`: integer - Quantity of Time And Material Equipment Log e.g. `10`
  - `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log e.g. `3.5`

Response 201 (application/json): object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs/bulk_destroy

**Bulk Delete Time and material equipment logs**
Bulk delete Time and material equipment logs with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_equipment_logs`: object (required) - Equipment log Object
  - `time_and_material_equipment_logs_ids`: array of integer - Array of time and material equipment log IDs specified for delete

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs/bulk_create

**Bulk Create Time and material equipment logs**
Bulk create Time and material equipment logs with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_equipment_logs`: array of object (required) - Array of Time and material equipment log objects
  - `time_and_material_entry_id`: integer - Time & Material Entry Id of Time And Material Equipment Log e.g. `16`
  - `description`: string - Description of Time And Material Equipment Log e.g. `This backhoe was used for the second day for all damaged pipes`
  - `uom`: string - Unit of measure for Time And Material Equipment Log e.g. `each`
  - `quantity`: integer - Quantity of Time And Material Equipment Log e.g. `10`
  - `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log e.g. `3.5`

Response 201 (application/json): array of object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs/bulk_update

**Bulk Update Time and Material Equipment logs**
Bulk update Time and Material Equipment logs with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_equipment_logs`: array of object (required) - Array of Time and material equipment log objects
  - `time_and_material_entry_id`: integer - Time & Material Entry Id of Time And Material Equipment Log e.g. `16`
  - `description`: string - Description of Time And Material Equipment Log e.g. `This backhoe was used for the second day for all damaged pipes`
  - `uom`: string - Unit of measure for Time And Material Equipment Log e.g. `each`
  - `quantity`: integer - Quantity of Time And Material Equipment Log e.g. `10`
  - `idle_quantity`: number(float) - Idle hours for the Time And Material Equipment Log e.g. `3.5`

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs/{id}

**Show Time And Material Equipment Log**
Return Time And Material Equipment Log detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs/{id}

**Update a Time And Material Equipment Log**
Updating a Time And Material Equipment Log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Time And Material Equipment Log
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_equipment_log`: object (required)
  - `time_and_material_entry_id`: integer - Time & Material Entry Id of Time And Material Equipment Log e.g. `16`
  - `description`: string - Description of Time And Material Equipment Log e.g. `This backhoe was used for the second day for all damaged pipes`
  - `uom`: string - Unit of measure for Time And Material Equipment Log e.g. `each`
  - `quantity`: integer - Quantity of Time And Material Equipment Log e.g. `10`
  - `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log e.g. `3.5`

Response 200 (application/json): object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_equipment_logs/{id}

**Delete a Time And Material Equipment Log**
Deleting a Time And Material Equipment Log

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Time And Material Equipment Log

Response 200 (application/json): object

- `id`: integer - ID e.g. `67800`
- `description`: string - Discription of Time And Material Equipment Log e.g. `This backhoe was used for the second day`
- `uom`: string - Unit of measure for associate Time And Material Equipment Log e.g. `each`
- `quantity`: integer - Number of Time And Material Equipment Log used
- `idle_quantity`: number(float) - Idle Quantity of Time And Material Equipment Log was used e.g. `3.5`
- `project_id`: integer - ID of the project the Time And Material Equipment Log was logged on e.g. `1235`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the Time And Material Equipment Log is associated with e.g. `45`
- `updated_at`: string(date-time) - Date the Time And Material Equipment Log was updated e.g. `2019-10-30T10:34:56Z`
- `created_at`: string(date-time) - Date the Time And Material Equipment Log was created e.g. `2019-10-31T12:34:52Z`
- `deleted_at`: string(date-time) - Date the Time And Material Equipment Log was deleted e.g. `2019-11-26T08:12:45Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time and Material Notification

Resource id: `time-and-material-notification`. Raw spec: `../openapi-raw/time-and-material-notification.json`. Web: https://developers.procore.com/reference/rest/time-and-material-notification?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/time_and_material_notifications

**Show Time And Material Notification**
Return Time And Material Notification detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `creation`: array of integer
- `customer_signed`: array of integer
- `company_signed`: array of integer
- `closed`: array of integer
- `group_equipment_totals_by`: string - Grouping configurations for T&M Equipment push to Change Management e.g. `per_ticket`
- `group_labor_totals_by`: string - Grouping configurations for T&M Labor push to Change Management e.g. `per_ticket`
- `notify_dl_on_customer_signed`: boolean e.g. `true`
- `notify_dl_on_company_signed`: boolean e.g. `true`
- `notify_dl_on_creation`: boolean e.g. `true`
- `notify_dl_on_closed`: boolean e.g. `true`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_notifications

**Create a new Time And Material Notification**
Create a new Time And Material Notification associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_notification`: object (required) - Time and Material Notification Object
  - `creation`: array of integer
  - `customer_signed`: array of integer
  - `company_signed`: array of integer
  - `closed`: array of integer
  - `group_equipment_totals_by`: string - Grouping configurations for T&M Equipment push to Change Management e.g. `per_ticket`
  - `notify_dl_on_customer_signed`: boolean e.g. `true`
  - `notify_dl_on_company_signed`: boolean e.g. `true`
  - `notify_dl_on_creation`: boolean e.g. `true`
  - `notify_dl_on_closed`: boolean e.g. `true`
  - `group_labor_totals_by`: string - Grouping configurations for T&M Labor push to Change Management e.g. `per_ticket`

Response 201 (application/json): object

- `id`: integer - ID e.g. `1200`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `creation`: array of integer
- `customer_signed`: array of integer
- `company_signed`: array of integer
- `closed`: array of integer
- `group_equipment_totals_by`: string - Grouping configurations for T&M Equipment push to Change Management e.g. `per_ticket`
- `group_labor_totals_by`: string - Grouping configurations for T&M Labor push to Change Management e.g. `per_ticket`
- `notify_dl_on_customer_signed`: boolean e.g. `true`
- `notify_dl_on_company_signed`: boolean e.g. `true`
- `notify_dl_on_creation`: boolean e.g. `true`
- `notify_dl_on_closed`: boolean e.g. `true`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_notifications

**Update a Time And Material Notification**
Updating a Time And Material Notification associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_notification`: object (required) - Time and Material Notification Object
  - `creation`: array of integer
  - `customer_signed`: array of integer
  - `company_signed`: array of integer
  - `closed`: array of integer
  - `group_equipment_totals_by`: string - Grouping configurations for T&M Equipment push to Change Management e.g. `per_ticket`
  - `notify_dl_on_customer_signed`: boolean e.g. `true`
  - `notify_dl_on_company_signed`: boolean e.g. `true`
  - `notify_dl_on_creation`: boolean e.g. `true`
  - `notify_dl_on_closed`: boolean e.g. `true`
  - `group_labor_totals_by`: string - Grouping configurations for T&M Labor push to Change Management e.g. `per_ticket`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `creation`: array of integer
- `customer_signed`: array of integer
- `company_signed`: array of integer
- `closed`: array of integer
- `group_equipment_totals_by`: string - Grouping configurations for T&M Equipment push to Change Management e.g. `per_ticket`
- `group_labor_totals_by`: string - Grouping configurations for T&M Labor push to Change Management e.g. `per_ticket`
- `notify_dl_on_customer_signed`: boolean e.g. `true`
- `notify_dl_on_company_signed`: boolean e.g. `true`
- `notify_dl_on_creation`: boolean e.g. `true`
- `notify_dl_on_closed`: boolean e.g. `true`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_notifications

**Delete a Time And Material Notification**
Deleting a Time And Material Notification associated with the specified project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1200`
- `project_id`: integer - ID of the project the T&M ticket was logged for e.g. `1456`
- `company_id`: integer - ID of the company the T&M ticket was logged for e.g. `1590`
- `creation`: array of integer
- `customer_signed`: array of integer
- `company_signed`: array of integer
- `closed`: array of integer
- `group_equipment_totals_by`: string - Grouping configurations for T&M Equipment push to Change Management e.g. `per_ticket`
- `group_labor_totals_by`: string - Grouping configurations for T&M Labor push to Change Management e.g. `per_ticket`
- `notify_dl_on_customer_signed`: boolean e.g. `true`
- `notify_dl_on_company_signed`: boolean e.g. `true`
- `notify_dl_on_creation`: boolean e.g. `true`
- `notify_dl_on_closed`: boolean e.g. `true`
- `updated_at`: string(date-time) - Date the T&M ticket was updated e.g. `2019-12-10T22:10:33Z`
- `created_at`: string(date-time) - Date the T&M ticket was created e.g. `2019-12-10T22:10:33Z`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time and Material Signature

Resource id: `time-and-material-signature`. Raw spec: `../openapi-raw/time-and-material-signature.json`. Web: https://developers.procore.com/reference/rest/time-and-material-signature?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/time_and_material_entries/signatures

**List Signatures**
Return all Signatures detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_entries/signatures

**Create Signature for Time and Material Entry**
Create new Signature associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `signature`: object (required)
  - `data`: string - Attachment representing the Signature. To upload an attachment, you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `data` file.
  - `party_id`: integer (required) - ID of the party the signature is attributed to
  - `signature_text`: string - Acknowedgement text the signature was signed against.
  - `upload_id`: string - Signature Upload ID e.g. `01JBD3HF2SA3JZ5AR107GTWF4E`

Response 201 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/time_and_material_entries/signatures/{id}

**Show A Signature**
Return Signature detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Signature ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_entries/signatures/{id}

**Delete Signature**
Deletes the Signature for the corresponding ID passed

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Signature ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_entries/signatures/bulk_destroy

**Delete Multiple Signatures**
Deletes the Signature for the corresponding IDs passed

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_entry`: object (required) - Time and Material Entry Signature
  - `time_and_material_signature_ids`: array of integer

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_at`: string(date-time) - Created at date e.g. `2024-03-15T06:13:10Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Time and Material Timecard

Resource id: `time-and-material-timecard`. Raw spec: `../openapi-raw/time-and-material-timecard.json`. Web: https://developers.procore.com/reference/rest/time-and-material-timecard?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/time_and_material_timecards

**List Time And Material Timecards**
Return a list of all Time And Material Timecards

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_timecards

**Create Time And Material Timecard**
Create a new Time And Material Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_timecard`: object (required)
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the timecard is associated with e.g. `13`
  - `timecard_time_type_id`: integer - Type id for the type of timecard being created e.g. `13`
  - `login_information_id`: integer - ID of the person the timecard is being created for e.g. `10`
  - `work_classification_id`: integer - ID of the worker's work classification e.g. `10`
  - `hours_worked`: number(float) - Total hours worked e.g. `7.5`

Response 201 (application/json): object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_timecards/bulk_destroy

**Bulk Delete Time and material timecards**
Bulk delete Time and material timecards with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_timecards`: object (required) - Time and material timecard Object
  - `time_and_material_timecards_ids`: array of integer - Array of time and material timecard IDs specified for delete

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/time_and_material_timecards/bulk_create

**Bulk Create Time and material timecards**
Bulk create Time and material timecards with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_timecards`: array of object (required) - Array of Time and material timecard objects
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the timecard is associated with e.g. `13`
  - `timecard_time_type_id`: integer - Type id for the type of timecard being created e.g. `13`
  - `login_information_id`: integer - ID of the person the timecard is being created for e.g. `10`
  - `work_classification_id`: integer - ID of the worker's work classification e.g. `10`
  - `hours_worked`: number(float) - Total hours worked e.g. `7.5`

Response 201 (application/json): array of object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_timecards/bulk_update

**Bulk Update Time and material timecards**
Bulk update Time and material timecards with one request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `time_and_material_timecards`: array of object (required) - Array of Time and material timecard objects
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the timecard is associated with e.g. `13`
  - `timecard_time_type_id`: integer - Type id for the type of timecard being created e.g. `13`
  - `login_information_id`: integer - ID of the person the timecard is being created for e.g. `10`
  - `work_classification_id`: integer - ID of the worker's work classification e.g. `10`
  - `hours_worked`: number(float) - Total hours worked e.g. `7.5`

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/time_and_material_timecards/{id}

**Show Time And Material Timecard**
Return detailed information about a specific Time And Material Timecard.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the project to get the time and material timecards for
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/time_and_material_timecards/{id}

**Update Time And Material Timecard**
Update a specified Time And Material Timecard.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the project to get the time and material timecards for
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `time_and_material_timecard`: object (required)
  - `time_and_material_entry_id`: integer - Time & Material Entry Id the timecard is associated with e.g. `13`
  - `timecard_time_type_id`: integer - Type id for the type of timecard being created e.g. `13`
  - `login_information_id`: integer - ID of the person the timecard is being created for e.g. `10`
  - `work_classification_id`: integer - ID of the worker's work classification e.g. `10`
  - `hours_worked`: number(float) - Total hours worked e.g. `7.5`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/time_and_material_timecards/{id}

**Delete Time And Material Timecard**
Detete a specific Time And Material Timecard.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the project to get the time and material timecards for
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1023`
- `hours_worked`: number(float) - Quantity e.g. `7.5`
- `company_id`: integer - Company ID e.g. `1509`
- `project_id`: integer - Unique identifier for the project. e.g. `14406`
- `time_and_material_entry_id`: integer - Time And Material Entry ID the timecard is associated with e.g. `13`
- `timecard_time_type_id`: integer - Type ID for the timecard e.g. `19`
- `work_classification_id`: integer - Work classification id for the worker e.g. `10`
- `updated_at`: string(date-time) - Date the Material was updated e.g. `2019-11-12T21:26:28Z`
- `created_at`: string(date-time) - Date the Material was created e.g. `2019-11-12T21:26:28Z`
- `deleted_at`: string(date-time) - Date the Material was deleted e.g. `2019-11-12T21:26:28Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Timecard Entries

Resource id: `timecard-entries`. Raw spec: `../openapi-raw/timecard-entries.json`. Web: https://developers.procore.com/reference/rest/timecard-entries?version=latest
Product lines: Field Productivity, PM Essentials, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/timecard_entries

**List timecard entries (Company)**
Return a list of all Timecard Entries, serialized according to the MyTime field set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[party_id]` [query] array of integer - Return item(s) with the specified Party ID.
- `filters[in_progress_only]` [query] boolean - Return work in progress item(s).
- `filters[include_in_progress]` [query] boolean - Return available and work in progress item(s).
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[deleted_at]` [query] string - Return item(s) that were deleted within the specified ISO 8601 datetime range.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `start_date` [query] string(date) - The beginning of the date range for entries. (YYYY-MM-DD)
- `end_date` [query] string(date) - The ending of the date range for entries. (YYYY-MM-DD)
- `start_time_in` [query] string(time) - The beginning of the time_in range for entries (YYYY-MM-DDTHH:MM:SSZ). "Z" represents the timezone offset (i.e. -08:00, -0800). Optionally you may pass the literal "Z" which also means "UTC".
- `end_time_in` [query] string(time) - The ending of the time_in range for entries (YYYY-MM-DDTHH:MM:SSZ). "Z" represents the timezone offset (i.e. -08:00, -0800). Optionally you may pass the literal "Z" which also means "UTC".
- `use_filter_tz` [query] string enum[true] - When passed as "true" the timezone from start_time_in or end_time_in will be used for all timestamps in the response. Otherwise they'll use UTC.
- `serializer_view` [query] string enum[ids_only, compact_with_date_range] - Changes what fields are included in the response.

Response 200 (application/json): array of object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `in_progress`: boolean - Timecard entry in progress state e.g. `false`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
- `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
- `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
- `approval_status`: string - Timecard entry approval status e.g. `pending`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `crew`: object
  - `id`: integer
  - `name`: string
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `project`: object
  - `id`: integer - Unique identifier for the project. e.g. `99`
  - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
- `clock_in`: object
  - `id`: integer
- `clock_out`: object
  - `id`: integer
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `in_progress`: boolean - Timecard entry in progress state e.g. `false`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
  - `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
  - `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
  - `approval_status`: string - Timecard entry approval status e.g. `pending`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `crew`: object
    - `id`: integer
    - `name`: string
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `project`: object
    - `id`: integer - Unique identifier for the project. e.g. `99`
    - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
  - `clock_in`: object
    - `id`: integer
  - `clock_out`: object
    - `id`: integer
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/timecard_entries

**Create timecard entry (Company)**
Create a new Timecard Entry.
#### See - [Company People guide](https://developers.procore.com/reference/rest/company-people) - for additional info on
* Getting a contact's party_id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Timecard Entry belongs to e.g. `2910`
- `timecard_entry`: object (required) - Timecard Entry object
  - `date`: string(date) (required) - The Date of the Timecard Entry e.g. `2019-05-19`
  - `hours`: string - The Hours of the Timecard Entry e.g. `8.0`
  - `lunch_time`: string - Duration of lunch break in minutes for the Timecard Entry. Only required if Timesheet time entry is configured for Start Time and Stop Time. e.g. `60`
  - `time_in`: string - The Start Time of the Timecard Entry in ISO 8601 format. Only required if Timesheet time entry is configured for Start Time and Stop Time. e.g. `2019-05-19T07:08:00Z`
  - `time_out`: string - The Stop Time of the Timecard Entry in ISO 8601 format. Only required if Timesheet time entry is configured for Start Time and Stop Time. e.g. `2019-05-19T07:17:00Z`
  - `billable`: boolean - The Billable status of the Timecard Entry
  - `description`: string - The Description of the Timecard Entry e.g. `No injuries today.`
  - `timecard_time_type_id`: integer - The ID of the Timecard Time Type of the Timecard Entry e.g. `10`
  - `location_id`: integer - The ID of the Location of the Timecard Entry e.g. `21`
  - `cost_code_id`: integer - The ID of the Cost Code of the Timecard Entry e.g. `90`
  - `set_timecard_time_type_automatically`: boolean - Whether or not to allow the automatic overtime management system to apply the configured rules to set the timecard_time_type_id and/or split the timecard entry automatically e.g. `true`
  - `sub_job_id`: integer - The ID of the Sub Job of the Timecard Entry e.g. `11`
  - `party_id`: integer - The ID of the Party of the Timecard Entry e.g. `87`
  - `crew_id`: integer - The ID of the Crew of the Timecard Entry e.g. `92`
  - `procore_signature_id`: integer - The ID of the Procore Signature of the Timecard Entry e.g. `980`
  - `timesheet_id`: integer - The ID of the Timesheet of the Timecard Entry e.g. `41823`
  - `clock_in_id`: integer - The ID of the clock in Gps Position of the Timecard Entry e.g. `345`
  - `clock_out_id`: integer - The ID of the clock out Gps Position of the Timecard Entry e.g. `642`
  - `clock_in_time`: string - The datetime a timecard clock in was punched e.g. `2020-03-24T04:14:06Z`
  - `clock_out_time`: string - The datetime a timecard clock out was punched e.g. `2020-03-24T05:14:22Z`
  - `approval_status`: string enum[pending, reviewed, approved, completed] - The Approval Status of the Timecard Entry e.g. `approved`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `line_item_type_id`: integer - The ID of the Line Item Type of Timecard Entry e.g. `13`

Response 201 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `in_progress`: boolean - Timecard entry in progress state e.g. `false`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
- `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
- `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
- `approval_status`: string - Timecard entry approval status e.g. `pending`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `crew`: object
  - `id`: integer
  - `name`: string
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `project`: object
  - `id`: integer - Unique identifier for the project. e.g. `99`
  - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
- `clock_in`: object
  - `id`: integer
- `clock_out`: object
  - `id`: integer
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `in_progress`: boolean - Timecard entry in progress state e.g. `false`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
  - `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
  - `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
  - `approval_status`: string - Timecard entry approval status e.g. `pending`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `crew`: object
    - `id`: integer
    - `name`: string
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `project`: object
    - `id`: integer - Unique identifier for the project. e.g. `99`
    - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
  - `clock_in`: object
    - `id`: integer
  - `clock_out`: object
    - `id`: integer
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timecard_entries/{id}

**Show timecard entry (Company)**
Return detailed information about a specific Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the timecard entry
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `in_progress`: boolean - Timecard entry in progress state e.g. `false`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
- `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
- `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
- `approval_status`: string - Timecard entry approval status e.g. `pending`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `crew`: object
  - `id`: integer
  - `name`: string
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `project`: object
  - `id`: integer - Unique identifier for the project. e.g. `99`
  - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
- `clock_in`: object
  - `id`: integer
- `clock_out`: object
  - `id`: integer
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `in_progress`: boolean - Timecard entry in progress state e.g. `false`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
  - `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
  - `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
  - `approval_status`: string - Timecard entry approval status e.g. `pending`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `crew`: object
    - `id`: integer
    - `name`: string
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `project`: object
    - `id`: integer - Unique identifier for the project. e.g. `99`
    - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
  - `clock_in`: object
    - `id`: integer
  - `clock_out`: object
    - `id`: integer
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/timecard_entries/{id}

**Update timecard entry (Company)**
Update a specified Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the timecard entry
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Timecard Entry belongs to e.g. `2910`
- `timecard_entry`: object (required) - Timecard Entry object
  - `date`: string(date) (required) - The Date of the Timecard Entry e.g. `2019-06-01`
  - `hours`: string - The Hours of the Timecard Entry e.g. `8.0`
  - `lunch_time`: string - Duration of lunch break in minutes for the Timecard Entry. Only required if Timesheet time entry is configured for Start Time and Stop Time. e.g. `60`
  - `time_in`: string - The Start Time of the Timecard Entry in ISO 8601 format. Only required if Timesheet time entry is configured for Start Time and Stop Time. e.g. `2019-06-01T07:08:00Z`
  - `time_out`: string - The Stop Time of the Timecard Entry in ISO 8601 format. Only required if Timesheet time entry is configured for Start Time and Stop Time. e.g. `2019-06-01T07:17:00Z`
  - `billable`: boolean - The Billable status of the Timecard Entry
  - `description`: string - The Description of the Timecard Entry e.g. `Moderate rain.`
  - `timecard_time_type_id`: integer - The ID of the Timecard Time Type of the Timecard Entry e.g. `1029`
  - `location_id`: integer - The ID of the Location of the Timecard Entry e.g. `1009`
  - `cost_code_id`: integer - The ID of the Cost Code of the Timecard Entry e.g. `108`
  - `set_timecard_time_type_automatically`: boolean - Whether or not to allow the automatic overtime management system to apply the configured rules to set the timecard_time_type_id and/or split the timecard entry automatically e.g. `true`
  - `sub_job_id`: integer - The ID of the Sub Job of the Timecard Entry e.g. `191`
  - `party_id`: integer - The ID of the Party of the Timecard Entry e.g. `192`
  - `crew_id`: integer - The ID of the Crew of the Timecard Entry e.g. `1119`
  - `procore_signature_id`: integer - The ID of the Procore Signature of the Timecard Entry e.g. `10`
  - `timesheet_id`: integer - The ID of the Timesheet of the Timecard Entry e.g. `41823`
  - `clock_in_id`: integer - The ID of the clock in Gps Position of the Timecard Entry e.g. `345`
  - `clock_out_id`: integer - The ID of the clock out Gps Position of the Timecard Entry e.g. `642`
  - `clock_in_time`: string - The datetime a timecard clock in was punched e.g. `2020-03-24T04:14:06Z`
  - `clock_out_time`: string - The datetime a timecard clock out was punched e.g. `2020-03-24T05:14:22Z`
  - `approval_status`: string enum[pending, reviewed, approved, completed] - The Approval Status of the Timecard Entry e.g. `approved`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`

Response 200 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `in_progress`: boolean - Timecard entry in progress state e.g. `false`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
- `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
- `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
- `approval_status`: string - Timecard entry approval status e.g. `pending`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `crew`: object
  - `id`: integer
  - `name`: string
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `project`: object
  - `id`: integer - Unique identifier for the project. e.g. `99`
  - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
- `clock_in`: object
  - `id`: integer
- `clock_out`: object
  - `id`: integer
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `in_progress`: boolean - Timecard entry in progress state e.g. `false`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
  - `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
  - `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
  - `approval_status`: string - Timecard entry approval status e.g. `pending`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `crew`: object
    - `id`: integer
    - `name`: string
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `project`: object
    - `id`: integer - Unique identifier for the project. e.g. `99`
    - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
  - `clock_in`: object
    - `id`: integer
  - `clock_out`: object
    - `id`: integer
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/timecard_entries/{id}

**Delete timecard entry (Company)**
Detete a specific Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the timecard entry
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `in_progress`: boolean - Timecard entry in progress state e.g. `false`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
- `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
- `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
- `approval_status`: string - Timecard entry approval status e.g. `pending`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `crew`: object
  - `id`: integer
  - `name`: string
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `project`: object
  - `id`: integer - Unique identifier for the project. e.g. `99`
  - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
- `clock_in`: object
  - `id`: integer
- `clock_out`: object
  - `id`: integer
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `in_progress`: boolean - Timecard entry in progress state e.g. `false`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `time_in`: string(date-time) - Timecard entry time in e.g. `2019-05-12T08:26:28Z`
  - `time_out`: string(date-time) - Timecard entry time out e.g. `2019-05-12T17:26:28Z`
  - `lunch_time`: string - Timecard entry lunch time in minutes e.g. `30`
  - `approval_status`: string - Timecard entry approval status e.g. `pending`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2019-05-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `crew`: object
    - `id`: integer
    - `name`: string
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `project`: object
    - `id`: integer - Unique identifier for the project. e.g. `99`
    - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
  - `clock_in`: object
    - `id`: integer
  - `clock_out`: object
    - `id`: integer
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timecard_entries/{id}/change_history

**Show timecard entry change history (Company)**
Returns the change history for a Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the timecard entry
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `column`: string - Column that changed e.g. `Description`
- `old_value`: string - Column's old value e.g. `Old description`
- `new_value`: string - Column's new value e.g. `New description`
- `created_at`: string - Created at e.g. `05/29/20 at 05:49 pm`
- `created_by`: string - Created by e.g. `Carl Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/timecard_entries

**List timecard entries**
Return a list of all Timecard Entries within a specified date range.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `start_date` [query] string(date) - The beginning of the date range for entries. (YYYY-MM-DD); if not provided, this will default to 1 week ago
- `end_date` [query] string(date) - The end of the date range for entries. (YYYY-MM-DD); if not provided, this will default to today
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/timecard_entries

**Create timecard entry**
Create a new Timecard Entry.
#### See - [Project People guide](https://developers.procore.com/reference/rest/project-people) - for additional info on
* Getting a contact's party_id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Timecard Entry belongs to
- `timecard_entry`: object (required) - Timecard Entry object
  - `party_id`: integer - The ID of the Party of the Timecard Entry e.g. `2342`
  - `hours`: string (required) - The Hours of the Timecard Entry e.g. `8.0`
  - `billable`: boolean - The Billable status of the Timecard Entry
  - `date`: string(date) (required) - The Date of the Timecard Entry e.g. `2019-06-01`
  - `description`: string - The Description of the Timecard Entry e.g. `A description for the Timecard Entry.`
  - `timecard_time_type_id`: integer - The ID of the Timecard Time Type of the Timecard Entry e.g. `1029`
  - `cost_code_id`: integer - The ID of the Cost Code of the Timecard Entry e.g. `12345`
  - `login_information_id`: integer - The ID of the Login Information of the Timecard Entry e.g. `1009`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `clock_in_time`: string - The datetime a timecard clock in was punched e.g. `2020-03-24T04:14:06Z`
  - `clock_out_time`: string - The datetime a timecard clock out was punched e.g. `2020-03-24T05:14:22Z`

Response 201 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `cost_code`: string - Timecard entry cost code e.g. `Summary`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `full_cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `cost_code`: string - Timecard entry cost code e.g. `Summary`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `full_cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/timecard_entries/{id}

**Show timecard entry**
Return detailed information about a specific Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the timecard entry
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `cost_code`: string - Timecard entry cost code e.g. `Summary`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `full_cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `cost_code`: string - Timecard entry cost code e.g. `Summary`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `full_cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/timecard_entries/{id}

**Update timecard entry**
Update a specified Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the timecard entry

Request body (application/json) (required):

- `project_id`: integer (required) - The ID of the Project the Timecard Entry belongs to
- `timecard_entry`: object (required) - Timecard Entry object
  - `party_id`: integer - The ID of the Party of the Timecard Entry e.g. `2342`
  - `hours`: string (required) - The Hours of the Timecard Entry e.g. `8.0`
  - `billable`: boolean - The Billable status of the Timecard Entry
  - `date`: string(date) (required) - The Date of the Timecard Entry e.g. `2019-06-01`
  - `description`: string - The Description of the Timecard Entry e.g. `A description for the Timecard Entry.`
  - `timecard_time_type_id`: integer - The ID of the Timecard Time Type of the Timecard Entry e.g. `1029`
  - `cost_code_id`: integer - The ID of the Cost Code of the Timecard Entry e.g. `12345`
  - `login_information_id`: integer - The ID of the Login Information of the Timecard Entry e.g. `1009`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `clock_in_time`: string - The datetime a timecard clock in was punched e.g. `2020-03-24T04:14:06Z`
  - `clock_out_time`: string - The datetime a timecard clock out was punched e.g. `2020-03-24T05:14:22Z`

Response 200 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `cost_code`: string - Timecard entry cost code e.g. `Summary`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `full_cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `cost_code`: string - Timecard entry cost code e.g. `Summary`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `full_cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/timecard_entries/{id}

**Delete timecard entry**
Detete a specific Timecard Entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the timecard entry
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timecard_entries

**List timecard entries (Project)**
Returns a list of all timecard entries for the current date.
See [Working with Daily Logs](https://developers.procore.com/documentation/daily-logs) for information on filtering the response using the log\_date, start\_date, and end\_date parameters.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `log_date` [query] string(date) - Timecard entries at the specified date. (YYYY-MM-DD)
- `start_date` [query] string(date) - The beginning of the date range for timecard entries. (YYYY-MM-DD) Start date is inclusive.
- `end_date` [query] string(date) - The end of the date range for timecard entries. (YYYY-MM-DD) End date is inclusive.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `serializer_view` [query] string enum[daily_log, extended, extended_daily_log, ids_only] - Changes what fields are included in the response.
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[in_progress_only]` [query] boolean - Return work in progress item(s).
- `filters[approval_status]` [query] string - Return entries matching the specified approval status.
- `filters[billable]` [query] string - Return entries matching billable state.
- `filters[cost_code_id]` [query] integer - Return entries matching the specified cost code ID.
- `filters[daily_log_header_id]` [query] integer - Return entries matching the specified daily log header ID.
- `filters[date]` [query] string - Filter by date. Accepts a single date (YYYY-MM-DD) or a date range (YYYY-MM-DD...YYYY-MM-DD).
- `filters[id]` [query] array of integer - Return entries matching the specified entry ID(s).
- `filters[location_id]` [query] integer - Return entries matching the specified location ID.
- `filters[party_id]` [query] array of integer - Return item(s) with the specified Party ID.
- `filters[origin_id]` [query] string - Return entries matching the specified origin ID.
- `filters[search]` [query] string - Text search filter for legacy search behavior.
- `filters[sub_job_id]` [query] integer - Return entries matching the specified sub job ID.
- `filters[timecard_time_type_id]` [query] integer - Return entries matching the specified timecard time type ID.
- `filters[updated_at]` [query] string - Return entries updated within the specified datetime/date range. Formats: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ.
- `filters[work_classification_id]` [query] integer - Return entries matching the specified work classification ID.
- `filters[wbs_code_id]` [query] integer - Return entries matching the specified WBS code ID.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1`
- `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
- `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
- `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
- `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - The description for the timecard entry. e.g. `This is a description.`
- `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `approval_status`: string - Supervisor approval status e.g. `pending`
- `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
- `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
- `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
- `origin_id`: integer - The ID of related external data e.g. `23423`
- `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - ID e.g. `1`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
  - `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
  - `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
  - `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
  - `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - The description for the timecard entry. e.g. `This is a description.`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `approval_status`: string - Supervisor approval status e.g. `pending`
  - `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
  - `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
  - `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
  - `origin_id`: integer - The ID of related external data e.g. `23423`
  - `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/timecard_entries

**Create timecard entry (Project)**
Create a new Timecard Entry.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments
#### See - [Project People guide](https://developers.procore.com/reference/rest/project-people) - for additional info on
* Getting a contact's party_id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `serializer_view` [query] string enum[extended_daily_log] - Changes which fields are included in the serialized response. - `extended_daily_log` - Returns extended fields plus Daily Log segment associations - Default (not specified) - Returns the standard extended Daily Log fi...

Request body (application/json) (required):

- `timecard_entry`: object (required) - Timecard Entry object
  - `hours`: string (required) - Total number of hours worked (excluding breaks) for the timecard entry. This property is not required if the timesheet time entry is configured for start time and stop time. e.g. `8.0`
  - `lunch_time`: string (required) - The duration of the lunch break, in minutes, for the timecard entry. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `60`
  - `party_id`: integer - The ID of the Party of the Timecard Entry
  - `time_in`: string (required) - The start time of the timecard entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2020-10-14T07:00:00Z`
  - `time_out`: string (required) - The stop time of the timecard entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2018-10-14T16:00:00Z`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `false`
  - `date`: string(date) - The date of the timecard entry in ISO 8601 format. e.g. `2020-10-14`
  - `datetime`: string(date-time) - The date and time value of record. This property is mutually exclusive with the Date property. e.g. `2020-05-19T12:00:00Z`
  - `description`: string - The description of the timecard entry. e.g. `This is a description.`
  - `timecard_time_type_id`: integer - The ID of the timecard time type corresponding to the timecard entry property. e.g. `1`
  - `set_timecard_time_type_automatically`: boolean - Whether or not to allow the automatic overtime management system to apply the configured rules to set the timecard_time_type_id and/or split the timecard entry automatically e.g. `true`
  - `timesheet_id`: integer - The ID of the timesheet corresponding to the timecard entry property. e.g. `41823`
  - `cost_code_id`: integer - The ID of the cost code corresponding to the timecard entry property. e.g. `12345`
  - `sub_job_id`: integer - The ID of the subjob corresponding to the timecard entry property. e.g. `3483483`
  - `location_id`: integer - The ID of the multi-tier location corresponding to the timecard entry property. e.g. `161072`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `login_information_id`: integer - The ID of the login information corresponding to the timecard entry property. e.g. `2341`
  - `origin_id`: integer - The ID of the related external data. e.g. `23423`
  - `origin_data`: string - The value of the related external data. e.g. `{'example':'related data'}`
  - `line_item_type_id`: integer - The ID of the line item type corresponding to the time card entry.

Response 201 (application/json): object

- `id`: integer - ID e.g. `1`
- `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
- `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
- `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
- `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - The description for the timecard entry. e.g. `This is a description.`
- `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `approval_status`: string - Supervisor approval status e.g. `pending`
- `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
- `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
- `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
- `origin_id`: integer - The ID of related external data e.g. `23423`
- `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - ID e.g. `1`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
  - `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
  - `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
  - `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
  - `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - The description for the timecard entry. e.g. `This is a description.`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `approval_status`: string - Supervisor approval status e.g. `pending`
  - `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
  - `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
  - `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
  - `origin_id`: integer - The ID of related external data e.g. `23423`
  - `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timecard_entries/{id}

**Show timecard entry (Project)**
Return detailed information about a specific timecard entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the timecard entry
- `serializer_view` [query] string enum[extended_daily_log] - Changes which fields are included in the serialized response. - `extended_daily_log` - Returns extended fields plus Daily Log segment associations - Default (not specified) - Returns the standard extended Daily Log fi...

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
- `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
- `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
- `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - The description for the timecard entry. e.g. `This is a description.`
- `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `approval_status`: string - Supervisor approval status e.g. `pending`
- `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
- `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
- `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
- `origin_id`: integer - The ID of related external data e.g. `23423`
- `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - ID e.g. `1`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
  - `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
  - `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
  - `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
  - `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - The description for the timecard entry. e.g. `This is a description.`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `approval_status`: string - Supervisor approval status e.g. `pending`
  - `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
  - `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
  - `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
  - `origin_id`: integer - The ID of related external data e.g. `23423`
  - `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/timecard_entries/{id}

**Update timecard entry (Project)**
Update a specific timecard entry.
#### See - [Daily Log guide](https://developers.procore.com/documentation/daily-logs) - for additional info on
* Attachments

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the timecard entry
- `serializer_view` [query] string enum[extended_daily_log] - Changes which fields are included in the serialized response. - `extended_daily_log` - Returns extended fields plus Daily Log segment associations - Default (not specified) - Returns the standard extended Daily Log fi...

Request body (application/json) (required):

- `timecard_entry`: object (required) - The Timecard Entry object
  - `hours`: string - Total number of hours worked (excluding breaks) for the timecard entry. This property is not applicable if the timesheet time entry is configured for start time and stop time. e.g. `8.0`
  - `lunch_time`: string - The duration of the lunch break, in minutes, for the timecard entry. This property is only applicable if the tmesheet time entry is configured for start time and stop time. e.g. `60`
  - `party_id`: integer - The ID of the Party of the Timecard Entry
  - `time_in`: string - The start time of the timecard entry in ISO 8601 format. This property is only applicable if the timesheet time entry is configured for start time and stop time. e.g. `2020-10-14T07:00:00Z`
  - `time_out`: string - The stop time of the timecard entry in ISO 8601 format. This property is only applicable if the timesheet time entry is configured for start time and stop time. e.g. `2018-10-14T16:00:00Z`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `false`
  - `date`: string(date) - The date of the timecard dntry in ISO 8601 format. e.g. `2020-10-14`
  - `datetime`: string(date-time) - The date and time of the record. This property is mutually exclusive with the Date property. e.g. `2020-05-19T12:00:00Z`
  - `description`: string - The description of the timecard entry. e.g. `This is a timecard entry description.`
  - `timecard_time_type_id`: integer - The ID of the timecard time type corresponding to the timecard entry. e.g. `1`
  - `set_timecard_time_type_automatically`: boolean - Whether or not to allow the automatic overtime management system to apply the configured rules to set the timecard_time_type_id and/or split the timecard entry automatically e.g. `true`
  - `cost_code_id`: integer - The ID of the cost code corresponding to the timecard entry. e.g. `1`
  - `login_information_id`: integer - The ID of the login information corresponding to the timecard entry. e.g. `2341`
  - `timesheet_id`: integer - The ID of the timesheet corresponding to the timecard entry. e.g. `41823`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `clock_in_id`: integer - The ID of the clock in GPS position corresponding to the timecard entry. e.g. `2`
  - `clock_out_id`: integer - The ID of the clock out GPS position corresponding to the timecard entry. e.g. `2`
  - `origin_id`: integer - The ID of the related external data. e.g. `23423`
  - `origin_data`: string - The value of the related external data. e.g. `{'example':'related data'}`
  - `line_item_type_id`: integer - The ID of the line item type pertaining to the time card entry. e.g. `13`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
- `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
- `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
- `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - The description for the timecard entry. e.g. `This is a description.`
- `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `approval_status`: string - Supervisor approval status e.g. `pending`
- `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
- `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
- `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
- `origin_id`: integer - The ID of related external data e.g. `23423`
- `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - ID e.g. `1`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
  - `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
  - `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
  - `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
  - `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - The description for the timecard entry. e.g. `This is a description.`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `approval_status`: string - Supervisor approval status e.g. `pending`
  - `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
  - `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
  - `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
  - `origin_id`: integer - The ID of related external data e.g. `23423`
  - `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/timecard_entries/{id}

**Delete timecard entry (Project)**
Delete a specific timecard entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the timecard entry

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/timecard_entries/{id}/sign

**Update timecard entry signature (Project)**
Update timecard entry signature with the provided signature ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - The ID of the timecard entry.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `signature_id`: integer (required) - The signature ID to be added to the timecard entry. e.g. `1`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
- `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
- `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
- `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - The description for the timecard entry. e.g. `This is a description.`
- `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `approval_status`: string - Supervisor approval status e.g. `pending`
- `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
- `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
- `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
- `origin_id`: integer - The ID of related external data e.g. `23423`
- `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - ID e.g. `1`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
  - `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
  - `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
  - `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
  - `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - The description for the timecard entry. e.g. `This is a description.`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `approval_status`: string - Supervisor approval status e.g. `pending`
  - `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
  - `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
  - `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
  - `origin_id`: integer - The ID of related external data e.g. `23423`
  - `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/timecard_entries/{id}/remove_signature

**Remove signature from timecard entry (Project)**
Remove the signature ID from the provided timecard entry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - The ID of the timecard entry.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
- `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
- `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
- `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
- `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
- `description`: string - The description for the timecard entry. e.g. `This is a description.`
- `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `approval_status`: string - Supervisor approval status e.g. `pending`
- `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
- `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
- `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
- `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
- `origin_id`: integer - The ID of related external data e.g. `23423`
- `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
- `timesheet`: object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
- `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `crew`: object
  - `id`: integer
  - `name`: string
  - `project_id`: integer
  - `company_id`: integer
  - `employees`: array of object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `lead`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `procore_signature`: object
  - `id`: integer - ID e.g. `5324`
  - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
  - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - ID e.g. `1`
  - `billable`: boolean - The billable status of the timecard entry. Must be either true or false. e.g. `true`
  - `created_at`: string(date-time) - The date and time when the timecard entry was created. e.g. `2020-10-23T21:39:40Z`
  - `date`: string(date) - The date when the timecard was created. e.g. `2020-05-12`
  - `datetime`: string(date-time) - The estimated UTC date time of record. e.g. `2016-05-19T12:00:00Z`
  - `deleted_at`: string(date-time) - The date and time when the timecard entry was deleted. e.g. `2017-07-29T21:39:40Z`
  - `description`: string - The description for the timecard entry. e.g. `This is a description.`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `approval_status`: string - Supervisor approval status e.g. `pending`
  - `lunch_time`: integer - Number of hours taken for lunch e.g. `1`
  - `time_in`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `time_out`: string(date) - The date and time the timecard was last updated e.g. `2015-05-12T21:09:29Z`
  - `injured`: boolean - Whether or not an injury occured during work hours. Must be either true or false. e.g. `false`
  - `signed`: boolean - Whether or not the timecard has been signed. Must be either true or false. e.g. `false`
  - `origin_id`: integer - The ID of related external data e.g. `23423`
  - `origin_data`: string - The value of related external data e.g. `{'example':'related data'}`
  - `timesheet`: object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `updated_at`: string(date-time) - The date and time when the timesheet was updated. e.g. `2020-10-24T21:39:40Z`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `crew`: object
    - `id`: integer
    - `name`: string
    - `project_id`: integer
    - `company_id`: integer
    - `employees`: array of object
    - `created_by`: object
    - `lead`: object
    - `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
    - `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
  - `location`: object
    - `id`: integer - Location ID e.g. `15504`
    - `name`: string - Location name e.g. `1space>1 space`
    - `node_name`: string - Location node name e.g. `1 space`
    - `parent_id`: integer - Location parent id e.g. `788866`
    - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
    - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `procore_signature`: object
    - `id`: integer - ID e.g. `5324`
    - `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
    - `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
    - `created_by`: object
  - `sub_job`: object
    - `id`: integer - ID e.g. `3483483`
    - `name`: string - Name e.g. `Floor 2`
    - `code`: string - Unique code in the scope of a Project e.g. `18`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the line item type of the timecard entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Timecards

Resource id: `timecards`. Raw spec: `../openapi-raw/timecards.json`. Web: https://developers.procore.com/reference/rest/timecards?version=latest
Product lines: PM Essentials, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/timecard_time_types

**List Timecard Time Types**
Return a list of all Timecard Time Types for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `id`: integer - Time type id e.g. `1`
- `time_type`: string - Time type e.g. `Another Time`
- `in_use`: boolean - True when the time type is referenced by at least one timecard entry, overtime rule, or time and material timecard. Use this to decide whether the time type is safe to delete or hide. e.g. `false`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/timecard_time_types/{id}

**Update Timecard Time Type**
Return an update Timecard Time Type for a specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Id of the Timecard Time Type

Request body (application/json) (required):

- `timecard_time_type`: object (required) - Timecard Time Type Object
  - `pay_rate`: boolean - The pay_rate of the Timecard Time Type e.g. `1.5`
  - `name`: string - The name of the Timecard Time Type. Cannot be edited when the Timecard Time Type has associated timecard entries. e.g. `Regular Time`
  - `abbreviated_time_type`: string - The abbreviation of the Timecard Time Type. Cannot be edited when the Timecard Time Type has associated timecard entries. e.g. `REG`

Response 200 (application/json): object

- `id`: integer - Time type id e.g. `1`
- `time_type`: string - Time type e.g. `Another Time`
- `in_use`: boolean - True when the time type is referenced by at least one timecard entry, overtime rule, or time and material timecard. Use this to decide whether the time type is safe to delete or hide. e.g. `false`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Timesheet To Budget Configuration

Resource id: `timesheet-to-budget-configuration`. Raw spec: `../openapi-raw/timesheet-to-budget-configuration.json`. Web: https://developers.procore.com/reference/rest/timesheet-to-budget-configuration?version=latest
Product lines: Field Productivity, PM Essentials, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/timesheets/timesheet_to_budget_configuration

**Show timesheet to budget configuration**
Show timesheet to budget configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - TimesheetToBudgetConfiguration ID e.g. `1`
- `line_item_type_id`: integer - Line Item Type ID (Cost Type) e.g. `8`
- `erp_default_line_item_type_id`: integer - ERP Line Item Type ID (Cost Type). Company must also be ERP integrated e.g. `12`
- `equipment_default_line_item_type_id`: integer - Line Item Type ID (Cost Type) for equipment timecards entries. e.g. `14`
- `equipment_erp_default_line_item_type_id`: integer - Line Item Type ID (Cost Type) for equipment timecards entries. Company must also be ERP integrated e.g. `15`
- `company_id`: integer - Company ID e.g. `13`
- `has_backfilled`: boolean - Whether the default Line Item Type ID has been backfilled to Timecard Entries e.g. `false`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/timesheets/timesheet_to_budget_configuration

**Create timesheet to budget configuration**
Create timesheet to budget configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `line_item_type_id`: integer (required) - Line Item Type ID
- `erp_default_line_item_type_id`: integer (required) - ERP Line Item Type ID

Response 200 (application/json): object

- `id`: integer - TimesheetToBudgetConfiguration ID e.g. `1`
- `line_item_type_id`: integer - Line Item Type ID (Cost Type) e.g. `8`
- `erp_default_line_item_type_id`: integer - ERP Line Item Type ID (Cost Type). Company must also be ERP integrated e.g. `12`
- `equipment_default_line_item_type_id`: integer - Line Item Type ID (Cost Type) for equipment timecards entries. e.g. `14`
- `equipment_erp_default_line_item_type_id`: integer - Line Item Type ID (Cost Type) for equipment timecards entries. Company must also be ERP integrated e.g. `15`
- `company_id`: integer - Company ID e.g. `13`
- `has_backfilled`: boolean - Whether the default Line Item Type ID has been backfilled to Timecard Entries e.g. `false`

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/timesheets/timesheet_to_budget_configuration

**Update timesheet to budget configuration**
Update timesheet to budget configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `apply_to_existing`: boolean - Whether the passed in Line Item Type ID should be applied to existing timecard entries (erp or not) e.g. `true`
- `line_item_type_id`: integer (required) - Line Item Type ID
- `erp_default_line_item_type_id`: integer (required) - ERP Line Item Type ID

Response 200 (application/json): object

- `id`: integer - TimesheetToBudgetConfiguration ID e.g. `1`
- `line_item_type_id`: integer - Line Item Type ID (Cost Type) e.g. `8`
- `erp_default_line_item_type_id`: integer - ERP Line Item Type ID (Cost Type). Company must also be ERP integrated e.g. `12`
- `equipment_default_line_item_type_id`: integer - Line Item Type ID (Cost Type) for equipment timecards entries. e.g. `14`
- `equipment_erp_default_line_item_type_id`: integer - Line Item Type ID (Cost Type) for equipment timecards entries. Company must also be ERP integrated e.g. `15`
- `company_id`: integer - Company ID e.g. `13`
- `has_backfilled`: boolean - Whether the default Line Item Type ID has been backfilled to Timecard Entries e.g. `false`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/timesheets/timesheet_to_budget_configuration

**Delete timesheet to budget configuration**
Delete timesheet to budget configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 204: No Content (no body)

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Timesheets

Resource id: `timesheets`. Raw spec: `../openapi-raw/timesheets.json`. Web: https://developers.procore.com/reference/rest/timesheets?version=latest
Product lines: Field Productivity, PM Essentials, Total Quality and Safety Management, Construction Financials

### POST /rest/v1.1/projects/{project_id}/project_timecard_entries

**Create Timecard Entry**
Create Timecard Entry associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `hours`: string - Total number of hours worked (excluding breaks) for the timecard entry. This property is not required if the timesheet time entry is configured for start time and stop time. e.g. `8.0`
- `lunch_time`: string - The duration of the lunch break, in minutes, for the Timecard Entry. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `60`
- `time_in`: string - The start time of the Timecard Entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2020-10-14T07:00:00Z`
- `time_out`: string - The stop time of the Timecard Entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2018-10-14T16:00:00Z`
- `billable`: boolean - The billable status of the Timecard Entry. Must be either true or false. e.g. `false`
- `date`: string(date) - The date of the Timecard Entry in ISO 8601 format. e.g. `2020-10-14`
- `description`: string - The description of the Timecard Entry. e.g. `This is a description.`
- `timecard_time_type_id`: integer - The ID of the Timecard Time Type corresponding to the Timecard Entry property. e.g. `1`
- `timesheet_id`: integer - The ID of the Timesheet corresponding to the Timecard Entry property. e.g. `41823`
- `cost_code_id`: integer - The ID of the Cost Code corresponding to the Timecard Entry property. e.g. `12345`
- `sub_job_id`: integer - The ID of the Subjob corresponding to the Timecard Entry property. e.g. `3483483`
- `location_id`: integer - The ID of the Location corresponding to the Timecard Entry property. e.g. `161072`
- `login_information_id`: integer - The ID of the Login Information corresponding to the Timecard Entry property. e.g. `2341`
- `party_id`: integer - The ID of the Party corresponding to the Timecard Entry property. e.g. `2341`
- `origin_id`: integer - The ID of the related external data. e.g. `23423`
- `origin_data`: string - The value of the related external data. e.g. `{'example':'related data'}`
- `line_item_type_id`: integer - The ID of the line item type corresponding to the time card entry.
- `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `cost_code`: string - Timecard entry cost code e.g. `Summary`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `full_cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `cost_code`: string - Timecard entry cost code e.g. `Summary`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `full_cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/project_timecard_entries/{id}

**Edit a Timecard Entry**
Update Timecard Entry associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Timecard Entry

Request body (application/json):

- `hours`: string - Total number of hours worked (excluding breaks) for the timecard entry. This property is not required if the timesheet time entry is configured for start time and stop time. e.g. `8.0`
- `lunch_time`: string - The duration of the lunch break, in minutes, for the Timecard Entry. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `60`
- `time_in`: string - The start time of the Timecard Entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2020-10-14T07:00:00Z`
- `time_out`: string - The stop time of the Timecard Entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2018-10-14T16:00:00Z`
- `billable`: boolean - The billable status of the Timecard Entry. Must be either true or false. e.g. `false`
- `date`: string(date) - The date of the Timecard Entry in ISO 8601 format. e.g. `2020-10-14`
- `description`: string - The description of the Timecard Entry. e.g. `This is a description.`
- `timecard_time_type_id`: integer - The ID of the Timecard Time Type corresponding to the Timecard Entry property. e.g. `1`
- `timesheet_id`: integer - The ID of the Timesheet corresponding to the Timecard Entry property. e.g. `41823`
- `cost_code_id`: integer - The ID of the Cost Code corresponding to the Timecard Entry property. e.g. `12345`
- `sub_job_id`: integer - The ID of the Subjob corresponding to the Timecard Entry property. e.g. `3483483`
- `location_id`: integer - The ID of the Location corresponding to the Timecard Entry property. e.g. `161072`
- `login_information_id`: integer - The ID of the Login Information corresponding to the Timecard Entry property. e.g. `2341`
- `party_id`: integer - The ID of the Party corresponding to the Timecard Entry property. e.g. `2341`
- `origin_id`: integer - The ID of the related external data. e.g. `23423`
- `origin_data`: string - The value of the related external data. e.g. `{'example':'related data'}`
- `line_item_type_id`: integer - The ID of the line item type corresponding to the time card entry.
- `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `cost_code`: string - Timecard entry cost code e.g. `Summary`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
- `full_cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `string`
    - `value`: string - The value of the custom field. e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `decimal`
    - `value`: number - The value of the custom field. e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `boolean`
    - `value`: boolean - The value of the custom field. e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - The data type of the Custom Field Definition. e.g. `lov_entries`
    - `value`: array of object
- `automatically_split_timecard_entries`: array of object - Timecard entries returned with associated object as part of overtime_management
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `cost_code`: string - Timecard entry cost code e.g. `Summary`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet_status`: string - Deprecated. Reference status property. e.g. `pending`
  - `full_cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/project_timecard_entries/bulk_create  **[BETA]**

**Bulk Create**
Create multiple timecard entries in a single transaction.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `timecard_entries`: array of object (required) - Array of timecard entries to be created in bulk (maximum 25 entries). e.g. `[{"date": "2024-01-15", "description": "Foundation work - Building A", "hours...`
  - `id`: integer (read-only) - Unique identifier for the timecard entry. e.g. `1`
  - `project_id`: integer (required) - The ID of the project this timecard entry belongs to. e.g. `54321`
  - `company_id`: integer (read-only) - The ID of the company this timecard entry belongs to. e.g. `12345`
  - `date`: string(date) - The date this work was performed, in YYYY-MM-DD format. e.g. `2024-01-15`
  - `hours`: string - Total hours worked for this timecard entry, excluding breaks. Required for hours-based timesheets. Must be numeric with a maximum of 24 hours per entry. When both time_in and time_out are provided, this value is autom... e.g. `8.0`
  - `time_in`: string(date-time) - Start time used for calculating hours worked. This is the clock_in_time after company rounding rules have been applied. This rounded time is what gets used in the actual hours calculation, not the original clock_in_ti... e.g. `2024-01-15T07:00:00Z`
  - `time_out`: string(date-time) - End time used for calculating hours worked. This is the clock_out_time after company rounding rules have been applied. This rounded time is what gets used in the actual hours calculation, not the original clock_out_ti... e.g. `2024-01-15T16:00:00Z`
  - `clock_in_time`: string(date-time) - Actual timestamp when worker clocked in via GPS or kiosk. This is the raw, unrounded time as recorded by the system. Company rounding rules are applied to this timestamp to calculate the time_in value, which is then u... e.g. `2024-01-15T07:00:00Z`
  - `clock_out_time`: string(date-time) - Actual timestamp when worker clocked out via GPS or kiosk. This is the raw, unrounded time as recorded by the system. Company rounding rules are applied to this timestamp to calculate the time_out value, which is then... e.g. `2024-01-15T16:00:00Z`
  - `clock_in_id`: integer - ID of GPS position record for clock-in event. Must be unique per worker within company to prevent duplicate clock-ins and cannot equal clock_out_id. e.g. `11111`
  - `clock_out_id`: integer - ID of GPS position record for clock-out event. Must be unique per worker within company to prevent duplicate clock-outs. e.g. `11112`
  - `lunch_time`: string - Lunch break duration in minutes. Can be provided directly by the client, or will be automatically calculated when both lunch_start_time and lunch_stop_time are provided. Cannot be greater than total work duration. e.g. `30`
  - `lunch_start_time`: string(date-time) - The datetime when the lunch break started, in ISO 8601 format. e.g. `2024-01-15T12:00:00Z`
  - `lunch_stop_time`: string(date-time) - The datetime when lunch break ended, in ISO 8601 format. When both lunch_start_time and lunch_stop_time are provided, the system automatically calculates and updates the lunch_time field with the duration. e.g. `2024-01-15T12:30:00Z`
  - `lunch_clock_in_id`: integer - ID of GPS record for lunch clock-in event. See [List GPS Positions](https://developers.procore.com/reference/rest/v1/gps-positions#list-gps-positions). e.g. `11113`
  - `lunch_clock_out_id`: integer - ID of GPS record for lunch clock-out event. See [List GPS Positions](https://developers.procore.com/reference/rest/v1/gps-positions#list-gps-positions). e.g. `11114`
  - `description`: string - A description of the work performed during this timecard entry. e.g. `Foundation work - Building A`
  - `billable`: boolean - Whether this time can be charged to the client. The API defaults to false if not specified, but the UI defaults new entries to true. e.g. `true`
  - `timecard_time_type_id`: integer - The ID of the timecard time type (e.g., Regular Time, Overtime, Double Time). This directly affects hourly rate multipliers and overtime premium calculations. See [List Timecard Time Types](https://developers.procore.... e.g. `1`
  - `cost_code_id`: integer - The ID of the cost code for this work. DO NOT provide if providing a wbs_code_id, as they are mutually exclusive. This represents the traditional construction cost accounting system for tracking labor costs against bu... e.g. `12345`
  - `wbs_code_id`: integer - The ID of the Work Breakdown Structure (Task Code) for this timecard entry. This is the preferred modern approach over cost_code_id. In the timecard context, "WBS code" specifically refers to Task Codes - the modern c... e.g. `67890`
  - `line_item_type_id`: integer - The ID of the line item type for this timecard entry. DO NOT provide if providing a wbs_code_id, as they are mutually exclusive. This represents construction contract line item classification for direct contract billi... e.g. `13`
  - `work_classification_id`: integer - The ID of the work classification that categorizes the type of work performed (e.g., Carpenter, Electrician, Laborer). This construction trade classification system tracks skilled labor types and wage rates, often ali... e.g. `101`
  - `party_id`: integer - The ID of the person/party who performed this work. This identifies the worker for the timecard entry and represents construction worker identification in the Procore system. Can represent employees, subcontractors, o... e.g. `12345`
  - `timesheet_id`: integer - The ID of the timesheet to associate this timecard entry with. All entries in a bulk request typically belong to the same timesheet. Construction timesheets represent a collection of time entries for a specific period... e.g. `54321`
  - `location_id`: integer - The ID of the location where this work was performed. Used for job site tracking and reporting. This represents a specific construction site location within a project, such as Building A, Floor 3, or Parking Lot. Larg... e.g. `161072`
  - `crew_id`: integer - The ID of the crew this timecard entry is associated with. Used for crew-based time tracking and reporting. This represents construction work crew organization for team-based labor tracking and productivity analysis. ... e.g. `789`
  - `approval_status`: string enum[pending, approved, reviewed, completed] - Current approval status of the timecard entry. e.g. `pending`
  - `approval_date`: string(date) - The date when this timecard entry was approved, in YYYY-MM-DD format. Only set when approval_status is 'approved'. e.g. `2024-01-16`
  - `approved_by_id`: integer - The ID of the user who approved this timecard entry. e.g. `12345`
  - `set_timecard_time_type_automatically`: boolean - Automatically calculates overtime based on company rules. Only applies when completing an in-progress timecard entry or creating a non-in-progress entry. May split entry into multiple time types. A single 12-hour entr... e.g. `false`
  - `origin_id`: string e.g. `23423`
  - `origin_data`: string e.g. `{"external_system": "MyERP", "batch_id": "12345"}`
  - `custom_field_%{custom_field_definition_id}`: string - Custom field values where %{custom_field_definition_id} is replaced with the actual ID. These are construction-specific data fields customized per company needs, such as equipment used, weather conditions, or safety i... e.g. `custom_field_123: 'Custom Value'`
  - `sub_job_id`: integer - The ID of the sub job this timecard entry is associated with. This is legacy - don't use if you have WBS codes. Used for more granular project cost tracking and reporting. This represents construction project subdivis... e.g. `7890`
  - `signed`: boolean - Whether this timecard entry has been digitally signed by the worker. This represents a digital signature requirement for construction timecard legal compliance and dispute prevention. It provides legal proof of worker... e.g. `true`
  - `in_progress`: boolean - Whether this entry represents an active work session. In-progress timecard entries generally do not appear in API responses unless specifically requested using the include_in_progress filter. e.g. `false`
  - `split_parent_id`: integer (read-only) - The ID of the parent timecard entry when this entry was created by Overtime Management. This only shows up when the timecard entry is created the first time. e.g. `98765`
  - `created_at`: string(date-time) (read-only) - When the timecard entry was created. This provides a construction timecard audit trail for legal compliance and dispute resolution, and provides evidence of when time was originally recorded for wage and hour law comp... e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) (read-only) - When the timecard entry was last updated. This represents construction timecard modification tracking for audit trails and change management, and is critical for resolving wage disputes and demonstrating proper record... e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) (read-only) - When the timecard entry was deleted (if applicable). This represents construction timecard soft deletion for maintaining audit trails while removing erroneous entries. It preserves a record of deleted entries for regu... e.g. `2017-07-29T21:39:40Z`

Response 201 (application/json): object

- `timecard_entries`: array of object - Array of created timecard entry records
  - `id`: integer (read-only) - Unique identifier for the timecard entry. e.g. `1`
  - `project_id`: integer (required) - The ID of the project this timecard entry belongs to. e.g. `54321`
  - `company_id`: integer (read-only) - The ID of the company this timecard entry belongs to. e.g. `12345`
  - `date`: string(date) - The date this work was performed, in YYYY-MM-DD format. e.g. `2024-01-15`
  - `hours`: string - Total hours worked for this timecard entry, excluding breaks. Required for hours-based timesheets. Must be numeric with a maximum of 24 hours per entry. When both time_in and time_out are provided, this value is autom... e.g. `8.0`
  - `time_in`: string(date-time) - Start time used for calculating hours worked. This is the clock_in_time after company rounding rules have been applied. This rounded time is what gets used in the actual hours calculation, not the original clock_in_ti... e.g. `2024-01-15T07:00:00Z`
  - `time_out`: string(date-time) - End time used for calculating hours worked. This is the clock_out_time after company rounding rules have been applied. This rounded time is what gets used in the actual hours calculation, not the original clock_out_ti... e.g. `2024-01-15T16:00:00Z`
  - `clock_in_time`: string(date-time) - Actual timestamp when worker clocked in via GPS or kiosk. This is the raw, unrounded time as recorded by the system. Company rounding rules are applied to this timestamp to calculate the time_in value, which is then u... e.g. `2024-01-15T07:00:00Z`
  - `clock_out_time`: string(date-time) - Actual timestamp when worker clocked out via GPS or kiosk. This is the raw, unrounded time as recorded by the system. Company rounding rules are applied to this timestamp to calculate the time_out value, which is then... e.g. `2024-01-15T16:00:00Z`
  - `clock_in_id`: integer - ID of GPS position record for clock-in event. Must be unique per worker within company to prevent duplicate clock-ins and cannot equal clock_out_id. e.g. `11111`
  - `clock_out_id`: integer - ID of GPS position record for clock-out event. Must be unique per worker within company to prevent duplicate clock-outs. e.g. `11112`
  - `lunch_time`: string - Lunch break duration in minutes. Can be provided directly by the client, or will be automatically calculated when both lunch_start_time and lunch_stop_time are provided. Cannot be greater than total work duration. e.g. `30`
  - `lunch_start_time`: string(date-time) - The datetime when the lunch break started, in ISO 8601 format. e.g. `2024-01-15T12:00:00Z`
  - `lunch_stop_time`: string(date-time) - The datetime when lunch break ended, in ISO 8601 format. When both lunch_start_time and lunch_stop_time are provided, the system automatically calculates and updates the lunch_time field with the duration. e.g. `2024-01-15T12:30:00Z`
  - `lunch_clock_in_id`: integer - ID of GPS record for lunch clock-in event. See [List GPS Positions](https://developers.procore.com/reference/rest/v1/gps-positions#list-gps-positions). e.g. `11113`
  - `lunch_clock_out_id`: integer - ID of GPS record for lunch clock-out event. See [List GPS Positions](https://developers.procore.com/reference/rest/v1/gps-positions#list-gps-positions). e.g. `11114`
  - `description`: string - A description of the work performed during this timecard entry. e.g. `Foundation work - Building A`
  - `billable`: boolean - Whether this time can be charged to the client. The API defaults to false if not specified, but the UI defaults new entries to true. e.g. `true`
  - `timecard_time_type_id`: integer - The ID of the timecard time type (e.g., Regular Time, Overtime, Double Time). This directly affects hourly rate multipliers and overtime premium calculations. See [List Timecard Time Types](https://developers.procore.... e.g. `1`
  - `cost_code_id`: integer - The ID of the cost code for this work. DO NOT provide if providing a wbs_code_id, as they are mutually exclusive. This represents the traditional construction cost accounting system for tracking labor costs against bu... e.g. `12345`
  - `wbs_code_id`: integer - The ID of the Work Breakdown Structure (Task Code) for this timecard entry. This is the preferred modern approach over cost_code_id. In the timecard context, "WBS code" specifically refers to Task Codes - the modern c... e.g. `67890`
  - `line_item_type_id`: integer - The ID of the line item type for this timecard entry. DO NOT provide if providing a wbs_code_id, as they are mutually exclusive. This represents construction contract line item classification for direct contract billi... e.g. `13`
  - `work_classification_id`: integer - The ID of the work classification that categorizes the type of work performed (e.g., Carpenter, Electrician, Laborer). This construction trade classification system tracks skilled labor types and wage rates, often ali... e.g. `101`
  - `party_id`: integer - The ID of the person/party who performed this work. This identifies the worker for the timecard entry and represents construction worker identification in the Procore system. Can represent employees, subcontractors, o... e.g. `12345`
  - `timesheet_id`: integer - The ID of the timesheet to associate this timecard entry with. All entries in a bulk request typically belong to the same timesheet. Construction timesheets represent a collection of time entries for a specific period... e.g. `54321`
  - `location_id`: integer - The ID of the location where this work was performed. Used for job site tracking and reporting. This represents a specific construction site location within a project, such as Building A, Floor 3, or Parking Lot. Larg... e.g. `161072`
  - `crew_id`: integer - The ID of the crew this timecard entry is associated with. Used for crew-based time tracking and reporting. This represents construction work crew organization for team-based labor tracking and productivity analysis. ... e.g. `789`
  - `approval_status`: string enum[pending, approved, reviewed, completed] - Current approval status of the timecard entry. e.g. `pending`
  - `approval_date`: string(date) - The date when this timecard entry was approved, in YYYY-MM-DD format. Only set when approval_status is 'approved'. e.g. `2024-01-16`
  - `approved_by_id`: integer - The ID of the user who approved this timecard entry. e.g. `12345`
  - `set_timecard_time_type_automatically`: boolean - Automatically calculates overtime based on company rules. Only applies when completing an in-progress timecard entry or creating a non-in-progress entry. May split entry into multiple time types. A single 12-hour entr... e.g. `false`
  - `origin_id`: string e.g. `23423`
  - `origin_data`: string e.g. `{"external_system": "MyERP", "batch_id": "12345"}`
  - `custom_field_%{custom_field_definition_id}`: string - Custom field values where %{custom_field_definition_id} is replaced with the actual ID. These are construction-specific data fields customized per company needs, such as equipment used, weather conditions, or safety i... e.g. `custom_field_123: 'Custom Value'`
  - `sub_job_id`: integer - The ID of the sub job this timecard entry is associated with. This is legacy - don't use if you have WBS codes. Used for more granular project cost tracking and reporting. This represents construction project subdivis... e.g. `7890`
  - `signed`: boolean - Whether this timecard entry has been digitally signed by the worker. This represents a digital signature requirement for construction timecard legal compliance and dispute prevention. It provides legal proof of worker... e.g. `true`
  - `in_progress`: boolean - Whether this entry represents an active work session. In-progress timecard entries generally do not appear in API responses unless specifically requested using the include_in_progress filter. e.g. `false`
  - `split_parent_id`: integer (read-only) - The ID of the parent timecard entry when this entry was created by Overtime Management. This only shows up when the timecard entry is created the first time. e.g. `98765`
  - `created_at`: string(date-time) (read-only) - When the timecard entry was created. This provides a construction timecard audit trail for legal compliance and dispute resolution, and provides evidence of when time was originally recorded for wage and hour law comp... e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) (read-only) - When the timecard entry was last updated. This represents construction timecard modification tracking for audit trails and change management, and is critical for resolving wage disputes and demonstrating proper record... e.g. `2015-11-12T21:26:28Z`
  - `deleted_at`: string(date-time) (read-only) - When the timecard entry was deleted (if applicable). This represents construction timecard soft deletion for maintaining audit trails while removing erroneous entries. It preserves a record of deleted entries for regu... e.g. `2017-07-29T21:39:40Z`

Error responses: 400, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/project_timesheet_timecard_entries/{id}

**Update Timesheet**
Update Timesheet associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Timesheet

Request body (application/json):

- `timesheet`: object
  - `date`: string(date) - The Date of the Timesheet e.g. `2017-04-19`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/project_timesheet_timecard_entries/draft_create  **[DEPRECATED]**

**Draft Create**
Creates a Timesheet and Timecard Entries in bulk together (DEPRECATED) Please use the following endpoint for a POST to https://app.procore.com/rest/v1.0/projects/{project_id}/timesheets for creating a timesheet and a POST to https://app.procore.com/rest/v1.1/projects/{project_id}/project_timecard_entries/bulk_create for creating timecard entries

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `date`: string(date) - The Date of the Timesheet e.g. `2021-04-19`
- `timecard_entries`: array of object - Timecard Entries to Create
  - `hours`: string (required) - Total number of hours worked (excluding breaks) for the timecard entry. This property is not required if the timesheet time entry is configured for start time and stop time. e.g. `8.0`
  - `lunch_time`: string (required) - The duration of the lunch break, in minutes, for the Timecard Entry. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `60`
  - `time_in`: string (required) - The start time of the Timecard Entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2020-10-14T07:00:00Z`
  - `time_out`: string (required) - The stop time of the Timecard Entry in ISO 8601 format. This property is only required if the timesheet time entry is configured for start time and stop time. e.g. `2018-10-14T16:00:00Z`
  - `billable`: boolean - The billable status of the Timecard Entry. Must be either true or false. e.g. `false`
  - `date`: string(date) - The date of the Timecard Entry in ISO 8601 format. e.g. `2020-10-14`
  - `description`: string - The description of the Timecard Entry. e.g. `This is a description.`
  - `timecard_time_type_id`: integer - The ID of the Timecard Time Type corresponding to the Timecard Entry property. e.g. `1`
  - `timesheet_id`: integer - The ID of the Timesheet corresponding to the Timecard Entry property. e.g. `41823`
  - `cost_code_id`: integer - The ID of the Cost Code corresponding to the Timecard Entry property. e.g. `12345`
  - `sub_job_id`: integer - The ID of the Subjob corresponding to the Timecard Entry property. e.g. `3483483`
  - `location_id`: integer - The ID of the Location corresponding to the Timecard Entry property. e.g. `161072`
  - `login_information_id`: integer - The ID of the Login Information corresponding to the Timecard Entry property. e.g. `2341`
  - `party_id`: integer - The ID of the Party corresponding to the Timecard Entry property. e.g. `2341`
  - `origin_id`: integer - The ID of the related external data. e.g. `23423`
  - `origin_data`: string - The value of the related external data. e.g. `{'example':'related data'}`
  - `line_item_type_id`: integer - The ID of the line item type corresponding to the time card entry.
  - `wbs_code_id`: integer - The ID of the wbs code corresponding to the Timecard entry.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/project_timesheet_timecard_entries/recent_wbs_code_ids  **[DEPRECATED]**

**Show recent Timecard Entry wbs code ids (DEPRECATED)**
Show recent Timecard Entry wbs_code ids associated with the specific Project (DEPRECATED--please use /rest/v1.0/projects/{project_id}/task_codes/recent_ids instead!).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of integer


Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/timesheets/signatures

**Create Signature for Timesheet**
Create new Signature associated with the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `signature`: object (required)
  - `data`: string (required) - Attachment representing the Signature. To upload an attachment, you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `data` file.
  - `user_id`: integer (required) - ID of the user the signature is attributed to
  - `signature_text`: string - Acknowedgement text the signature was signed against.
  - `upload_id`: string - Signature Upload ID e.g. `01JBD3HF2SA3JZ5AR107GTWF4E`

Response 201 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/signatures/{id}

**Show A Signature**
Return Signature detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/timesheets/signatures/{id}

**Delete A Signature**
Delete A Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets

**List Timecard Data**
Returns timecard data for all employees on all projects in the current work week. Use the start_date and end_date query parameters to specify a date range other than the current work week. Note that if you use the updated_at or deleted_at filters, those dates must fall within the current work week,  otherwise you must also specify a date range using start_date and end_date.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[deleted_at]` [query] string - Returns item(s) deleted within the specified ISO 8601 datetime range.
- `start_date` [query] string(date) - Start date of specific timecards desired in YYYY-MM-DD format (use together with end_date)
- `end_date` [query] string(date) - End date of specific timecards desired in YYYY-MM-DD format (use together with start_date)
- `skip_saving_sticky_filters` [query] boolean - When true, the filters supplied on this request are not saved as the user's sticky Timesheets filters. Use this for background reads that should not change which filters the user sees the next time they open the Times...

Response 200 (application/json): array of object

- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `other_hours`: array of object
  - `hours`: integer - Number of hours worked that week on the project e.g. `40`
  - `project`: object
    - `id`: integer - ID of the project e.g. `1`
    - `name`: string - Name of the project e.g. `Hotel Remodel`
- `timecard_entries`: array of object
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `cost_code`: string - Timecard entry cost code e.g. `Summary`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet_status`: object - Deprecated. Reference status property.
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
    - `timecard_entries`: array of object
  - `full_cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/timesheets

**Bulk Create Timecard Entries**
Creates multiple timecard entries at the same time

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `timecard_entries`: array of object - Array of Timecard Entries you want to create
  - `approval_status`: string - Approval status of a Timecard Entry e.g. `pending|reviewed|appoved|completed`
  - `billable`: boolean - The Billable status of the Timecard Entry e.g. `true`
  - `cost_code_id`: integer - The ID of the Cost Code of the Timecard Entry e.g. `12345`
  - `crew_id`: integer - The ID of the crew for the Timecard Entry e.g. `23456`
  - `date`: string(date) - The Date of the Timecard Entry e.g. `2017-04-19`
  - `description`: string - The description of the Timecard Entry e.g. `This is extra info about the Timecard Entry`
  - `hours`: integer - Hours worked on a Timecard Entry e.g. `8`
  - `location_id`: integer - The ID of the Location for the Timecard Entry e.g. `34567`
  - `origin_id`: integer - ID of related external data e.g. `45678`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - The ID of the Party for the Timecard Entry e.g. `56789`
  - `project_id`: integer - The ID of the Project of the Timecard Entry e.g. `678910`
  - `set_timecard_time_type_automatically`: boolean - Whether or not to allow the automatic overtime management system to apply the configured rules to set the timecard_time_type_id and/or split the timecard entry automatically e.g. `true`
  - `sub_job_id`: integer - The ID of the Sub Job of the Timecard Entry e.g. `7891011`
  - `time_in`: string(date-time) - Time in for the Timecard Entry e.g. `2015-02-06T00:00:00Z`
  - `time_out`: string(date-time) - Time out for the Timecard Entry e.g. `2015-02-06T03:00:00Z`
  - `timesheet_id`: integer - The ID of the Timesheet of the Timecard Entry e.g. `89101112`
  - `timecard_time_type_id`: integer - The ID of the Timecard Time Type of the Timecard Entry e.g. `910111213`
  - `user_id`: integer - The ID of the Login Information of the Timecard Entry e.g. `1011121314`
  - `work_classification_id`: integer - The ID of the Work Classification of the Timecard Entry e.g. `1112131415`

Response 200 (application/json): array of object

- `id`: integer - Timecard entry id e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `date`: string(date) - Timecard entry date e.g. `2015-05-12`
- `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
- `description`: string - Timecard entry description e.g. `Description`
- `billable`: boolean - Timecard entry billable status e.g. `true`
- `hours`: string - Timecard entry hours e.g. `5.0`
- `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
- `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
- `cost_code`: string - Timecard entry cost code e.g. `Summary`
- `origin_id`: integer - ID of related external data e.g. `23423`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `timesheet_status`: object - Deprecated. Reference status property.
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `date`: string(date) - Timesheet date e.g. `2015-05-12`
  - `number`: integer - Timesheet number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
  - `status`: string - The approval status of the Timesheet e.g. `pending`
  - `timecard_entries`: array of object
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
    - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
    - `description`: string - Description e.g. `Description`
    - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
    - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
    - `injured`: boolean - Injury status e.g. `false`
    - `lunch_time`: integer - Lunch duration e.g. `30`
    - `billable`: boolean - Billable status e.g. `true`
    - `origin_id`: integer - ID of related external data e.g. `23423`
    - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
    - `crew`: object
    - `custom_fields`: object
    - `cost_code`: object
    - `created_by`: object
    - `login_information`: object
    - `location`: object
    - `timecard_time_type`: object
- `full_cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `login_information`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `party`: object
  - `id`: integer - Timecard entry id e.g. `1`
  - `name`: string - Party Name e.g. `Dolores Umbridge`
- `timecard_time_type`: object
  - `id`: integer - Time type id e.g. `1`
  - `abbreviated_time_type`: string - Time type abbreviated e.g. `true`
  - `company_id`: integer - Time type company id e.g. `15125`
  - `global`: boolean - Time type global status e.g. `false`
  - `time_type`: string - Time type e.g. `Another Time`
- `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/timesheets

**Bulk Update Timecard Entries**
Updates multiple timecard entries at the same time

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `approval_status`: string - Approval status of a Timecard Entry e.g. `pending|reviewed|appoved|completed`
- `billable`: boolean - The Billable status of the Timecard Entry e.g. `true`
- `cost_code_id`: integer - The ID of the Cost Code of the Timecard Entry e.g. `12345`
- `crew_id`: integer - The ID of the crew for the Timecard Entry e.g. `23456`
- `date`: string(date) - The Date of the Timecard Entry e.g. `2017-04-19`
- `description`: string - The description of the Timecard Entry e.g. `This is extra info about the Timecard Entry`
- `hours`: integer - Hours worked on a Timecard Entry e.g. `8`
- `location_id`: integer - The location ID for the Timecard Entry e.g. `34567`
- `origin_id`: integer - ID of related external data e.g. `45678`
- `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
- `party_id`: integer - The ID of the party for the Timecard Entry e.g. `56789`
- `project_id`: integer - The ID of the Timecard Time Type of the Timecard Entry e.g. `678910`
- `set_timecard_time_type_automatically`: boolean - Whether or not to allow the automatic overtime management system to apply the configured rules to set the timecard_time_type_id and/or split the timecard entry automatically e.g. `true`
- `sub_job_id`: integer - The ID of the Sub Job of the Timecard Entry e.g. `7891011`
- `time_in`: string(date-time) - Time in for the Timecard Entry e.g. `2015-02-06T00:00:00Z`
- `time_out`: string(date-time) - Time out for the Timecard Entry e.g. `2015-02-06T03:00:00Z`
- `timesheet_id`: integer - The ID of the Timesheet of the Timecard Entry e.g. `89101112`
- `timecard_time_type_id`: integer - The ID of the Timecard Time Type of the Timecard Entry e.g. `910111213`
- `updates`: array of object (required) - The IDs of the timecards you want to update
  - `id`: integer e.g. `1011121314`
- `user_id`: integer - The ID of the Login Information of the Timecard Entry e.g. `1112131415`
- `work_classification_id`: integer - The ID of the Work Classification of the Timecard Entry e.g. `1213141516`

Response 200 (application/json): object

- `updated_timecard_entries`: array of object - Array of updated timecard entries
  - `id`: integer - Timecard entry id e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timecard entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Timecard entry description e.g. `Description`
  - `billable`: boolean - Timecard entry billable status e.g. `true`
  - `hours`: string - Timecard entry hours e.g. `5.0`
  - `updated_at`: string(date-time) - Timecard entry updated at e.g. `2015-11-12T21:26:28Z`
  - `timecard_type`: string - Timecard entry time type e.g. `Regular Time`
  - `cost_code`: string - Timecard entry cost code e.g. `Summary`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `timesheet_status`: object - Deprecated. Reference status property.
    - `id`: integer - ID e.g. `1`
    - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
    - `date`: string(date) - Timesheet date e.g. `2015-05-12`
    - `number`: integer - Timesheet number e.g. `1`
    - `created_by`: object
    - `name`: string - Timesheet name e.g. `2015-05-12 - 01`
    - `status`: string - The approval status of the Timesheet e.g. `pending`
    - `timecard_entries`: array of object
  - `full_cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `party`: object
    - `id`: integer - Timecard entry id e.g. `1`
    - `name`: string - Party Name e.g. `Dolores Umbridge`
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `true`
    - `company_id`: integer - Time type company id e.g. `15125`
    - `global`: boolean - Time type global status e.g. `false`
    - `time_type`: string - Time type e.g. `Another Time`
  - `line_item_type_id`: integer - The ID of the Line Item Type of the Timecard Entry e.g. `13`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/csv_export  **[DEPRECATED]**

**Export Company Time Index to CSV**
Exports timecards in a given work week from the company timesheets index to CSV. (DEPRECATED--please use /rest/v1.0/company/{company_id}/timesheets.csv instead!)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[deleted_at]` [query] string - Returns item(s) deleted within the specified ISO 8601 datetime range.
- `filters[start_date]` [query] string(date)
- `filters[end_date]` [query] string(date)

Response 200 (application/json): string(binary)


Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/signatures

**List Signatures**
Return all Signatures detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/timesheets/signatures

**Create Signature for Timesheet**
Create new Signature associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `signature`: object (required)
  - `data`: string (required) - Attachment representing the Signature. To upload an attachment, you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `data` file.
  - `user_id`: integer (required) - ID of the user the signature is attributed to
  - `signature_text`: string - Acknowedgement text the signature was signed against.

Response 201 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/signatures/{id}

**Show A Signature**
Return Signature detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Signature ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/timesheets/signatures/{id}

**Delete Signature**
Deletes the Signature for the corresponding ID passed

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Signature ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `5324`
- `signature_text`: string - Acknowedgement text the signature was signed against. e.g. `I acknowledge these hours are correct.`
- `file_name`: string - File Name e.g. `signature_2018_09_16.jpg`
- `url`: string - URL e.g. `http://www.example.com/`
- `medium_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `large_thumbnail_url`: string - URL e.g. `http://www.example.com/`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/{id}

**Show A Timesheet**
Return Timesheet detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/timesheets/{id}

**Update Timesheet**
Update Timesheet associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Request body (application/json):

- `timesheet`: object (required)
  - `date`: string(date) - The Date of the Timesheet e.g. `2017-04-19`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/timesheets/{id}  **[BETA]**

**Delete Timesheet**
Delete Timesheet associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 400, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets

**List all Timesheets**
Return a list of all Timesheets for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[deleted_at]` [query] string - Returns item(s) deleted within the specified ISO 8601 datetime range.
- `filters[date]` [query] string - Returns item(s) within the specified ISO 8601 datetime range.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/timesheets

**Create Timesheet**
Create new Timesheet associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `timesheet`: object (required)
  - `date`: string(date) (required) - The Date of the Timesheet e.g. `2017-04-19`

Response 201 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/timesheets

**Update Timecard Entries**
Update the date of Timecard Entries associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `timesheet_id`: integer - ID of Timesheet e.g. `1`
- `timecard_entries`: array of object (required) - Timesheet object
  - `date`: string(date) - The Date of the Timesheet e.g. `2017-04-19`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/timesheets

**Delete Timecard Entries**
Delete Timecard Entries associated with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `ids`: array of integer - IDs of Timesheets to be deleted

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/potential_timesheet_creators

**Get a list of possible Timesheet Creators**
Returns all potential Timesheet Creators for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Login Information ID of the User e.g. `161072`
- `name`: string e.g. `Carl the Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/potential_timesheet_creator_ids

**Get a list of possible Timesheet Creator Ids**
Returns all potential Timesheet Creator Ids for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of integer


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/scoped_cost_codes

**List Cost Codes for Timesheets**
Returns a list of Cost Codes for Timesheets.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `sub_job_id` [query] integer - Sub Job ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/scoped_cost_code_ids

**List Cost Codes Ids for Timesheets**
Returns a list of Cost Codes Ids for Timesheets.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `sub_job_id` [query] integer - Sub Job ID

Response 200 (application/json): array of integer


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/timesheets/update_approval

**Update timesheet status**
Update Timesheet statuses as either pending/approved with the specific Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `timesheets`: array of object (required) - array of Timesheet objects
  - `id`: integer - The ID of Timesheet to change the status of e.g. `1`
  - `status`: string - The status of the Timesheet - pending/approved e.g. `approved`

Response 200 (application/json): object

- `id`: integer - ID e.g. `1`
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
- `date`: string(date) - Timesheet date e.g. `2015-05-12`
- `number`: integer - Timesheet number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `name`: string - Timesheet name e.g. `2015-05-12 - 01`
- `status`: string - The approval status of the Timesheet e.g. `pending`
- `timecard_entries`: array of object
  - `id`: integer - ID e.g. `1`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `date`: string(date) - Timesheet entry date e.g. `2015-05-12`
  - `deleted_at`: string(date-time) - Deleted at e.g. `2017-07-29T21:39:40Z`
  - `description`: string - Description e.g. `Description`
  - `hours`: string - Total number of hours the resource was on sight. e.g. `5.0`
  - `updated_at`: string(date-time) - Updated at e.g. `2012-10-24T21:39:40Z`
  - `time_in`: string(date-time) - Starting time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `time_out`: string(date-time) - Ending time for the Timesheet e.g. `2017-07-29T21:39:40Z`
  - `injured`: boolean - Injury status e.g. `false`
  - `lunch_time`: integer - Lunch duration e.g. `30`
  - `billable`: boolean - Billable status e.g. `true`
  - `origin_id`: integer - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `crew`: object
    - `id`: integer - Id of selected Crew e.g. `1`
    - `name`: string - Name of selected Crew e.g. `ADL's Crew`
  - `cost_code`: object
    - `id`: integer - ID e.g. `12345`
    - `name`: string - Name e.g. `Earthwork`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `login_information`: object
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
  - `timecard_time_type`: object
    - `id`: integer - Time type id e.g. `1`
    - `time_type`: string - Time type e.g. `Another Time`
    - `abbreviated_time_type`: string - Time type abbreviated e.g. `REG`
    - `global`: boolean - Time type global status e.g. `false`
  - `wbs_code_id`: integer - Wbs code id e.g. `12`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `equipment_timecard_entries`: array of object - Equipment timecard entries associated with this timesheet.
  - `id`: integer - ID e.g. `1`
  - `company_id`: integer - ID of the company e.g. `123`
  - `client_local_id`: string - Client-provided local identifier echoed in API responses for request/response correlation. e.g. `1234567890`
  - `crew_id`: integer - ID of the crew the equipment timecard entry is associated with. e.g. `12345`
  - `created_at`: string - The date and time the equipment timecard entry was created. e.g. `2020-05-12T12:00:00Z`
  - `created_by_id`: integer - ID of the user who created the equipment timecard entry. e.g. `12345`
  - `date`: string(date) - The date for the equipment timecard entry. e.g. `2020-05-12`
  - `equipment_id`: string - Id of the equipment the equipment timecard entry is associated with. e.g. `U0123456789`
  - `location_id`: integer - ID of the location the equipment timecard entry is associated with. e.g. `15504`
  - `origin_id`: string - ID of related external data e.g. `23423`
  - `origin_data`: string - Value of related external data e.g. `{'example':'related data'}`
  - `party_id`: integer - ID of the party the equipment timecard entry is associated with (ie, operator). e.g. `12345`
  - `project_id`: integer - ID of the project the equipment timecard entry is associated with. e.g. `12345`
  - `project_name`: string - Display name of the project identified by project_id. Null when the associated project cannot be resolved. Use to label entries without a separate request to the projects endpoint. e.g. `Downtown Office Tower`
  - `quantity`: string - Total number of hours/days/weeks the equipment was on site. e.g. `5.0`
  - `idle_quantity`: string - Total number of hours/days/weeks the equipment was idle on site. e.g. `3.0`
  - `timesheet_id`: integer - ID of the timesheet the equipment timecard entry is associated with. e.g. `1`
  - `unit_of_measure`: integer - Enum that represents the unit of measure for provided quantity.
  - `updated_at`: string - The date and time the equipment timecard entry was last updated. e.g. `2020-05-12T12:00:00Z`
  - `wbs_code_id`: integer - ID of the WBS code, the equipment timecard entry is associated with. e.g. `12345`

Error responses: 400, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/timesheets/change_history

**Change History**
Change history for timecard entries

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `ids`: array of integer

Response 200 (application/json): array of object

- `id`: integer - Change History ID
- `ref_id`: integer - Timesheet ID
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `column`: string - Column that changed value
- `old_value`: string - Old value in the column
- `new_value`: string - New value in the column

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/timesheets/change_history

**List Change History for Timesheet**
Returns Change History for specified Timesheet

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `ids`: array of integer (required) - Array of Timecard Entry IDs you want to view the Change Histories for e.g. `[1, 2, 3]`

Response 200 (application/json): array of object

- `id`: integer - Change History ID
- `ref_id`: integer - Timesheet ID
- `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `column`: string - Column that changed value
- `old_value`: string - Old value in the column
- `new_value`: string - New value in the column

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Timesheets Filters

Resource id: `timesheets-filters`. Raw spec: `../openapi-raw/timesheets-filters.json`. Web: https://developers.procore.com/reference/rest/timesheets-filters?version=latest
Product lines: Field Productivity, PM Essentials, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/approval_status

**Show timesheet approval status filters**
Show timesheet approval status filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `1`
- `value`: string e.g. `Pending`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/billable

**Show timesheet billable filters**
Show timesheet billable filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `17`
- `value`: string e.g. `Billable`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/created_by

**Show timesheet created by filters**
Show timesheet created by filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `19`
- `value`: string e.g. `Marc Duncan`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/departments

**Show timesheet department filters**
Show timesheet department filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `19`
- `value`: string e.g. `Department 1`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/locations

**Show timesheet location filters**
Show timesheet location filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `22`
- `value`: string e.g. `Floor 21`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/offices

**Show timesheet office filters**
Show timesheet office filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `19`
- `value`: string e.g. `Office 1`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/regions

**Show timesheet region filters**
Show timesheet region filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `19`
- `value`: string e.g. `NW`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/employees

**Show timesheet employee filters**
Show timesheet employee filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `21`
- `value`: string e.g. `Chris Karcher`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/employee_ids

**Show timesheet employee id filters**
Show timesheet employee id filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `23`
- `value`: string e.g. `123`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/crews

**Show timesheet crews filters**
Show timesheet crews filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `20`
- `value`: string e.g. `Electricians`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/projects

**Show timesheet project filters**
Show timesheet approval status filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `23`
- `value`: string e.g. `Vortex Business Center`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/sub_job

**Show timesheet sub job filters**
Show timesheet sub job filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `24`
- `value`: string e.g. `Floor 4`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/time_type

**Show timesheet time type filters**
Show timesheet time type filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `25`
- `value`: string e.g. `Double Time`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/work_classifications

**Show timesheet work classification filters**
Show timesheet work classification filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `26`
- `value`: string e.g. `Foreman`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/timesheets/filters/wbs_codes

**Show timesheet wbs code filters**
Show timesheet wbs code filters

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `key`: integer e.g. `26`
- `value`: string e.g. `Instruction`

Error responses: 400, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

