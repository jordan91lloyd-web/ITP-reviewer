# Procore API: Portfolio (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: Portfolio)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Projects](#projects) - versions 1.1, 1.0

## Projects

Resource id: `projects`. Raw spec: `../openapi-raw/projects.json`. Web: https://developers.procore.com/reference/rest/projects?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.1/projects

**List projects**
Return a list of active Projects.
If the authenticated user has full company admin permissions the request will return all of the projects in the company. If the user does not have full company admin permissions, the request will only return the projects that the user has been added to.
The default pagination is 100 projects per page. The max page size is 300 projects due to the size of the data in the response.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[by_status]` [query] string enum[All, Active, Inactive] - Filters on project status. Must be one of Active, Inactive, or All.
- `filters[name]` [query] string - Filters projects to those matching the given string.
- `filters[project_number]` [query] string - Filters on project number.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[synced]` [query] boolean - If true, returns only item(s) with a `synced` status.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[is_demo]` [query] boolean - Filters on project is_demo attribute, which indicates whether project is for demonstration purposes.
- `filters[custom_fields]` [query] object - JSON object returns project with matching custom_field_values
- `filters[template]` [query] boolean - Filters on project template attribute, which indicates whether project is a template
- `filters[by_owner_type]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project owner type ID(s).
- `filters[by_department]` [query] oneOf(integer | array of integer) - Return item(s) with the specified department ID(s).
- `filters[by_region]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project region ID(s).
- `filters[by_office]` [query] oneOf(integer | array of integer) - Return item(s) with the specified office ID(s).
- `filters[by_program]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project program ID(s).
- `filters[by_stage]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project stage ID(s).
- `filters[by_type]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project type ID(s).
- `filters[by_bid_type]` [query] oneOf(integer | array of integer) - Return item(s) with the specified project bid type ID(s).
- `view` [query] string enum[ids, compact, normal, extended] - The view determines which fields are returned. 'ids' return only id as an Integer (it additionally influences 'per_page' value to be strictly 200000), 'compact' returns only id and name, 'normal' returns more fields, ...
- `sort` [query] string enum[name, display_name] - Return items with the specified sort.

Response 200 (application/json): array of oneOf(object | object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects

**List projects**
Return a list of active Projects.
If the authenticated user has full company admin permissions the request will return all of the projects in the company. If the user does not have full company admin permissions, the request will only return the projects that the user has been added to.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[by_status]` [query] string enum[All, Active, Inactive] - Filters on project status. Must be one of Active, Inactive, or All.
- `filters[name]` [query] string - Filters projects to those matching the given string.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[from_project_template_id]` [query] integer - Filter projects by the project template ID they were created from. Returns projects that were created from the specified project template.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[synced]` [query] boolean - If true, returns only item(s) with a `synced` status.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[custom_fields]` [query] object - JSON object returns project with matching custom_field_values
- `serializer_view` [query] string enum[compact] - The 'compact' view only returns id, name and display_name. Passing any other value (or passing no value at all) will result in the more complete list of attributes shown below.
- `sort` [query] string enum[name, display_name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the project. e.g. `12738`
- `name`: string - The name of the Project e.g. `Lakeside Mixed Use`
- `is_demo`: boolean - Indicates whether this is a test project or not e.g. `false`
- `parent_job_id`: integer - Identifier for the parent job e.g. `123456`
- `parent_job`: object
  - `id`: integer - The identifier for the parent project/job e.g. `312345`
  - `name`: string - The name for the parent project/job e.g. `Project Alpha`
- `display_name`: string - The display name for the Project e.g. `12 - Lakeside Mixed Use`
- `project_number`: string - The Project number e.g. `12`
- `address`: string - The street address for the Project e.g. `123 First St.`
- `city`: string - The city in which the Project is located e.g. `Carpinteria`
- `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
- `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
- `zip`: string - The postal code for the Project e.g. `93103`
- `county`: string - The county in which the Project is located e.g. `Santa Barbara County`
- `time_zone`: string - The timezone the Project is located in e.g. `US/Pacific`
- `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
- `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
- `stage`: string - The name of the Project stage e.g. `Course of Construction`
- `project_stage`: object
  - `id`: integer - The identifier for the Project Stage e.g. `3`
  - `name`: string - The name for the Project Stage e.g. `Course of Construction`
- `project_template`: object
  - `id`: integer - The identifier for the Project template e.g. `3`
  - `name`: string - The name of the Project template e.g. `Fairview Apartments`
- `phone`: string - The telephone number for the Project e.g. `480-800-5555`
- `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
- `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2015-04-20T18:09:33Z`
- `active`: boolean - The active status for the Project e.g. `true`
- `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
- `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
- `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
- `owners_project_id`: integer - A linked identifier for the Owner's Project e.g. `1234`
- `total_value`: string(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000.0`
- `store_number`: string - The store number for the Project e.g. `3`
- `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
- `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
- `project_region_id`: integer - The region identifier for the Project e.g. `1`
- `project_bid_type_id`: integer - The Bid Type identifier for the Project e.g. `1`
- `project_owner_type_id`: integer - The Owner Type identifier for the Project e.g. `1`
- `photo_id`: integer - The unique identifier for the Project Photo e.g. `1`
- `start_date`: string(date) - The start date for the project e.g. `2019-10-31`
- `completion_date`: string(date) - The completion date for the project e.g. `2020-10-31`
- `projected_finish_date`: string(date) - The projected finish date for the project e.g. `2020-12-31`
- `estimated_value`: string(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000.0`
- `fax`: string - The fax number for the Project e.g. `480-800-5555`
- `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
- `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
- `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
- `estimated_budget`: number(decimal) - The estimated budget for the project e.g. `1500000`
- `priority`: string enum[low, medium, high] - The priority level for the project e.g. `high`
- `company`: object
  - `id`: integer - Unique identifier for the company. e.g. `1234`
  - `name`: string - The Company name e.g. `CA Construction`
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
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
- `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects

**Create project**
Create a new Project in a Procore account. The new project is active by default.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.
#### Recommendation
For accounts creating a significant number of projects (more than 300),  schedule these operations during non-business hours (5 P.M PST - 7 A.M PST) to optimize efficiency. Coordinate the timing with your solution architect for insights into system load and effective resource utilization.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `company_id`: integer (required) - The company identifier the project is associated with. e.g. `3461`
- `project`: object (required)
  - `active`: boolean - The project active status. e.g. `true`
  - `address`: string - The street address of the project. e.g. `500 Construction Way`
  - `city`: string - The city where the project is located. e.g. `Carpinteria`
  - `code`: string - The project code. e.g. `ABC`
  - `country_code`: string - The country code (ISO-3166 Alpha-2 format) where the project is located. e.g. `US`
  - `description`: string - The project description. e.g. `A description of the project`
  - `start_date`: string(date) - The date that the contract for the project is signed. Note: This field replaces estimated_start_date and will mirror its value. e.g. `2015-05-15`
  - `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: This field replaces estimated_completion_date and will mirror its value. e.g. `2015-05-15`
  - `total_value`: number(float) - The total amount of construction work performed, planned, or put in place during the project. Note: This field is a replacement of estimated_value and will mirror its value. e.g. `10000`
  - `warranty_start_date`: string(date) - The project warranty start date. e.g. `2015-05-16`
  - `warranty_end_date`: string(date) - The project warranty end date. e.g. `2016-06-10`
  - `flag`: string enum[Red, Yellow, Green] - The project flag. e.g. `Yellow`
  - `image_id`: integer - The project image identifier. e.g. `10`
  - `locale`: string enum[de-DE, en, en-AE, en-AU, en-CA, en-GB, en-SG, en-US-x-owner, en-US-x-sc, en-budget, en-owner, es, ...] - The locale for the Project. (Note that your account may not have access to all locales.)
  - `name`: string (required) - The project name. e.g. `Project F`
  - `office_id`: integer - The project office identifier. e.g. `3610`
  - `phone`: string - The project telephone number. e.g. `310-555-5555`
  - `project_number`: string - The project number. e.g. `A-2`
  - `public_notes`: string - The public notes for the project. e.g. `Notes`
  - `project_stage_id`: integer - The project stage identifier. e.g. `1`
  - `square_feet`: integer - The total square footage of the project. e.g. `5000`
  - `state_code`: string - The state code (ISO-3166 Alpha-2 format) where the project is located. e.g. `CA`
  - `time_zone`: string - The timezone where the project is located. e.g. `US/Pacific`
  - `zip`: string - The project postal code. e.g. `93110`
  - `parent_job_id`: integer - The project's parent job identifier. e.g. `2`
  - `program_id`: integer - The project program identifier. e.g. `5`
  - `portfolio_program_uuid`: string(uuid) - Public UUID of the Portfolio Program this project is placed under. Null or omitted means Unassigned. Ignored when the company does not have Portfolio Programs. Distinct from program_id (legacy grouping). e.g. `018f7c9a-8b2e-7c3d-9e4f-5a6b7c8d9e0f`
  - `project_bid_type_id`: integer - The project bid type identifier. e.g. `2`
  - `project_type_id`: integer - The project type identifier. e.g. `5`
  - `project_owner_type_id`: integer - The project owner type identifier. e.g. `8`
  - `project_region_id`: integer - The project region id of the project. e.g. `22`
  - `project_template_id`: integer - The project template identifier as designated by another project on this company. It must be a project that is a template defined by `template: true`. e.g. `99`
  - `origin_id`: string - External third-party identifier for the project. e.g. `657`
  - `origin_data`: string - External third-party data string associated with the project. e.g. `AC-1234`
  - `origin_code`: string - External third-party code associated with the project. e.g. `Code 123`
  - `override_start_date`: string(date) - This is the date that the project started and will be displayed on the portfolio page. e.g. `2015-05-15`
  - `override_start_date_check`: boolean - This is the property that enables the use of the override_start_date as the Actual Start Date. e.g. `true`
  - `override_end_date`: string(date) - This is the date that the project will be finished and will be displayed on the portfolio page. e.g. `2015-05-31`
  - `override_end_date_check`: boolean - This is the property that enables the use of the override_end_date as the Projected Finish Date. e.g. `true`
  - `department_ids`: array of integer - The department ids the project is associated with. The array should represent all departments, so if the current value is `[1, 2, 3]` and want to remove department `2`, then send `[1, 3]`. e.g. `[3128, 3127]`
  - `estimated_value`: number(float) - The estimated value of the project. Note: This field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000`
  - `estimated_start_date`: string(date) - The estimated start date of the project. Note: This field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
  - `estimated_completion_date`: string(date) - The estimated completion date of the project. Note: This field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
  - `store_number`: string - The project store number. e.g. `3`
  - `accounting_project_number`: string - The project accounting project number. e.g. `3456`
  - `designated_market_area`: string - The project designated market area. e.g. `Southeast`
  - `erp_integrated`: boolean - The project will be ERP integrated. e.g. `true`
  - `latitude`: number(float) - Project latitude e.g. `34.3850464855729`
  - `longitude`: number(float) - Project longitude e.g. `-119.490849121334`
  - `enable_copy_of_standard_cost_codes`: boolean - This property enables the user to copy default standard cost codes during new project creation when it is set to true. However, this flag does not have any impact when using project template, and the company's configu... e.g. `true`
  - `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
  - `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
  - `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
  - `estimated_budget`: number(decimal) - The estimated budget for the project e.g. `1500000`
  - `priority`: string enum[low, medium, high] - The priority level for the project e.g. `high`
  - `currency_configuration`: object - This object will initialize the project currency configuration
    - `currency_iso_code`: string (required) - The currency iso code for the new project, must be available in the company exchange rates list e.g. `USD`
    - `exchange_rate_override`: number(float) - -> This optional parameter is used to populate a fixed initial project to company exchange rate, company exchange rate for the project currency iso code will be used instead if this parameter is missing e.g. `1.724`
  - `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the project. e.g. `89025`
- `logo_id`: integer - Unique identifier for the Project logo e.g. `1`
- `logo_url`: string - The URL for the Project logo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `name`: string - The name for the Project e.g. `Casa de Casper`
- `is_demo`: boolean - Indicates if the project is a test project e.g. `true`
- `template`: boolean - Indicates if the project is a template project e.g. `true`
- `display_name`: string - The display name for the Project e.g. `A-1 Casa de Casper`
- `project_number`: string - The Project number e.g. `A-1`
- `address`: string - The street address for the Project e.g. `500 Construction Way`
- `city`: string - The city in which the Project is located e.g. `Carpinteria`
- `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
- `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
- `zip`: string - The postal code for the Project e.g. `93110`
- `time_zone`: string - The timezone in which the Project is located e.g. `US/Pacific`
- `tz_name`: string - The tz-database version of the timezone for the Project e.g. `America/Los_Angeles`
- `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
- `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
- `county`: string - The county in which the Project is located e.g. `Santa Barbara County`
- `parent_job_id`: integer - Unique identifier for the Parent Job e.g. `3`
- `parent_job`: object
  - `id`: integer - The identifier for the parent project/job e.g. `312345`
  - `name`: string - The name for the parent project/job e.g. `Project Alpha`
- `from_project_template_id`: integer - Unique identifier for the Project Template used to create this project e.g. `3`
- `description`: string - Project description e.g. `Very cool project.`
- `square_feet`: integer - The total square footage for the Project e.g. `5000`
- `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
- `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
- `total_value`: string(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000.0`
- `store_number`: string - The store number for the Project e.g. `3`
- `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
- `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
- `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-15`
- `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2015-05-31`
- `active`: boolean - The active status for the Project e.g. `true`
- `flag`: string enum[Red, Yellow, Green, None] - The Project flag (Red, Yellow, or Green) e.g. `Yellow`
- `locale`: object
- `phone`: string - The telephone number for the Project e.g. `707-555-9866`
- `public_notes`: string - Public notes on the Project e.g. `We're building a large private residence.`
- `actual_start_date`: string(date) - The actual start date for the Project e.g. `2015-05-15`
- `projected_finish_date`: string(date) - The projected finish date for the Project e.g. `2015-05-31`
- `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
- `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2016-03-14T16:52:22Z`
- `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
- `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
- `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
- `standard_cost_code_list_id`: integer e.g. `98`
- `is_erp_integrated`: boolean - True if project is ERP integrated e.g. `false`
- `owners_project_id`: integer - A linked identifier for the Owner's Project e.g. `1234`
- `photo_id`: integer - The unique identifier for the Project Photo e.g. `1`
- `photo_url`: string - The URL for the Project photo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `inbound_email`: string - The inbound email address username suffix for the project. e.g. `user`
- `inbound_email_address`: string(email) - The inbound email address for the project. e.g. `user@example.com`
- `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
- `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
- `estimated_value`: string(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000.0`
- `code`: string - The Code of the project. e.g. `PCOR`
- `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
- `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
- `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `persistent_message`: object
  - `title`: string - The title of the persistent message for the Project e.g. `General Scope of Work`
  - `message`: string - The text content for the Project persistent message e.g. `Provide and install HVAC systems.`
- `office`: object - Office associated to the project or company main office if project does not set an office
  - `id`: integer - The identifier for the Office e.g. `3610`
  - `name`: string - The name for the Office e.g. `Carpinteria`
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
    - `name`: string
    - `url`: string
- `project_bid_type_id`: integer - The identifier for the Project Bid Type e.g. `1`
- `project_bid_type`: object
  - `id`: integer - The identifier for the Project Bid Type e.g. `1`
  - `name`: string - The name for the Project Bid Type e.g. `Competitive Bid`
- `project_owner_type_id`: integer - The identifier for the Project Owner Type e.g. `5`
- `project_owner_type`: object
  - `id`: integer - The identifier for the Project Owner Type e.g. `1`
  - `name`: string - The name for the Project Owner Type e.g. `Project Owner Type A`
- `project_region_id`: integer - The Project Region ID of the Project e.g. `22`
- `project_region`: object
  - `id`: integer - The identifier for the Project Region e.g. `1`
  - `name`: string - The name for the Project Region e.g. `West`
- `project_stage_id`: integer - The identifier for the Project Stage e.g. `1`
- `project_stage`: object
  - `id`: integer - The identifier for the Project Stage e.g. `3`
  - `name`: string - The name for the Project Stage e.g. `Course of Construction`
- `project_type`: object
  - `id`: integer - The identifier for the Project Type e.g. `1`
  - `name`: string - The name for the Project Type e.g. `Project Type A`
- `program`: object
  - `id`: integer - The identifier for the Project Program e.g. `4`
  - `name`: string - The name for the Project Program e.g. `Design Bid`
- `departments`: array of object - An array of project departments
  - `id`: integer - The identifier for the Project Department e.g. `2`
  - `name`: string - The name for the Project Department e.g. `Residential`
- `company`: object
  - `id`: integer - The identifier for the Project Company e.g. `1234`
  - `name`: string - The name for the Project Company e.g. `CA Construction`
- `dictionary_type`: string - Dictionary Type e.g. `general-contractor`
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
- `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/sync

**Sync projects**
Create or update a batch of projects.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.
#### Recommendation
Please be advised to not use the sync endpoint for bulk project creation due to potential performance bottlenecks.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer - Unique identifier for the company.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `company_id`: integer (required) - The company identifier the project is associated with. Required only if `company_id` is not included in the request's query parameters. e.g. `3461`
- `updates`: array of object (required)
  - `id`: integer - Unique identifier for the project. e.g. `1`
  - `active`: boolean - The project active status. e.g. `true`
  - `address`: string - The street address of the project. e.g. `500 Construction Way`
  - `city`: string - The city where the project is located. e.g. `Carpinteria`
  - `country_code`: string - The country code (ISO-3166 Alpha-2 format) where the project is located. e.g. `US`
  - `description`: string - The project description. e.g. `A description of the project`
  - `start_date`: string(date) - The date that the contract for the project is signed. Note: This field replaces estimated_start_date and will mirror its value. e.g. `2015-05-15`
  - `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: This field replaces estimated_completion_date and will mirror its value. e.g. `2015-05-15`
  - `total_value`: number(float) - The total amount of construction work performed, planned, or put in place during the project. Note: This field is a replacement of estimated_value and will mirror its value. e.g. `10000`
  - `warranty_start_date`: string(date) - The project warranty start date. e.g. `2015-05-16`
  - `warranty_end_date`: string(date) - The project warranty end date. e.g. `2016-06-10`
  - `flag`: string enum[Red, Yellow, Green] - The project flag. e.g. `Yellow`
  - `image_id`: integer - The project image identifier. e.g. `10`
  - `name`: string - The project name. e.g. `Project F`
  - `office_id`: integer - The project office identifier. e.g. `3610`
  - `phone`: string - The project telephone number. e.g. `310-555-5555`
  - `project_number`: string - The project number. e.g. `A-2`
  - `public_notes`: string - The public notes for the project. e.g. `Notes`
  - `project_stage_id`: integer - The project stage identifier. e.g. `1`
  - `square_feet`: integer - The total square footage of the project. e.g. `5000`
  - `state_code`: string - The state code (ISO-3166 Alpha-2 format) where the project is located. e.g. `CA`
  - `time_zone`: string - The timezone where the project is located. e.g. `US/Pacific`
  - `zip`: string - The project postal code. e.g. `93110`
  - `program_id`: integer - The project program identifier. e.g. `5`
  - `portfolio_program_uuid`: string(uuid) - Public UUID of the Portfolio Program this project is placed under. Null or omitted means Unassigned. On bulk/sync, an invalid placement fails that row (the rest of the payload may still succeed). Ignored when the comp... e.g. `018f7c9a-8b2e-7c3d-9e4f-5a6b7c8d9e0f`
  - `project_bid_type_id`: integer - The project bid type identifier. e.g. `2`
  - `project_type_id`: integer - The project type identifier. e.g. `5`
  - `project_owner_type_id`: integer - The project owner type identifier. e.g. `8`
  - `project_region_id`: integer - The project region id of the project. e.g. `22`
  - `project_template_id`: integer - The project template identifier as designated by another project on this company. It must be a project that is a template defined by `template: true`. e.g. `99`
  - `origin_id`: string - External third-party identifier for the project. e.g. `657`
  - `origin_data`: string - External third-party data string associated with the project. e.g. `{"data_field":{"is_important":true}}`
  - `department_ids`: array of integer - The department ids the project is associated with. The array should represent all departments, so if the current value is `[1, 2, 3]` and want to remove department `2`, then send `[1, 3]`. e.g. `[3128, 3127]`
  - `estimated_value`: number(float) - The estimated value of the project. Note: This field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000`
  - `estimated_start_date`: string(date) - The estimated start date of the project. Note: This field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
  - `estimated_completion_date`: string(date) - The estimated completion date of the project. Note: This field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
  - `store_number`: string - The project store number. e.g. `3`
  - `accounting_project_number`: string - The project accounting project number. e.g. `3456`
  - `designated_market_area`: string - The project designated market area. e.g. `Southeast`
  - `enable_copy_of_standard_cost_codes`: boolean - This property enables the user to copy default standard cost codes during new project creation when it is set to true. However, this flag does not have any impact when using project template, and the company's configu... e.g. `true`
  - `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
  - `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
  - `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
  - `estimated_budget`: number(decimal) - The estimated budget for the project e.g. `1500000`
  - `priority`: string enum[low, medium, high] - The priority level for the project e.g. `high`
  - `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - Unique identifier for the project. e.g. `89025`
  - `logo_url`: string - The URL for the Project logo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
  - `name`: string - The name for the Project e.g. `Casa de Casper`
  - `display_name`: string - The display name for the Project e.g. `A-1 Casa de Casper`
  - `project_number`: string - The Project number e.g. `A-1`
  - `address`: string - The street address for the Project e.g. `500 Construction Way`
  - `city`: string - The city in which the Project is located e.g. `Carpinteria`
  - `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
  - `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
  - `zip`: string - The postal code for the Project e.g. `93110`
  - `time_zone`: string - The timezone in which the Project is located e.g. `US/Pacific`
  - `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
  - `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
  - `description`: string - Project description e.g. `Very cool project.`
  - `square_feet`: integer - The total square footage for the Project e.g. `5000`
  - `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
  - `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
  - `total_value`: string(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000.0`
  - `store_number`: string - The store number for the Project e.g. `3`
  - `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
  - `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
  - `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-15`
  - `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2015-05-31`
  - `active`: boolean - The active status for the Project e.g. `true`
  - `flag`: string enum[Red, Yellow, Green, None] - The Project flag (Red, Yellow, or Green) e.g. `Yellow`
  - `phone`: string - The telephone number for the Project e.g. `707-555-9866`
  - `public_notes`: string - Public notes on the Project e.g. `We're building a large private residence.`
  - `actual_start_date`: string(date) - The actual start date for the Project e.g. `2015-05-15`
  - `projected_finish_date`: string(date) - The projected finish date for the Project e.g. `2015-05-31`
  - `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
  - `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2016-03-14T16:52:22Z`
  - `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
  - `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
  - `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
  - `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
  - `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
  - `estimated_value`: string(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000.0`
  - `office`: object
    - `id`: integer - The identifier for the Office e.g. `3610`
    - `name`: string - The name for the Office e.g. `Carpinteria`
  - `project_bid_type_id`: integer - The identifier for the Project Bid Type e.g. `1`
  - `project_owner_type_id`: integer - The identifier for the Project Owner Type e.g. `5`
  - `project_region_id`: integer - The Project Region ID of the Project e.g. `22`
  - `project_stage`: object
    - `id`: integer - The identifier for the Project Stage e.g. `3`
    - `name`: string - The name for the Project Stage e.g. `Course of Construction`
  - `project_type`: object
    - `id`: integer - The identifier for the Project Type e.g. `1`
    - `name`: string - The name for the Project Type e.g. `Project Type A`
  - `program`: object
    - `id`: integer - The identifier for the Project Program e.g. `4`
    - `name`: string - The name for the Project Program e.g. `Design Bid`
  - `departments`: array of object - An array of project departments
    - `id`: integer - The identifier for the Project Department e.g. `2`
    - `name`: string - The name for the Project Department e.g. `Residential`
  - `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
  - `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
  - `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
  - `estimated_budget`: number(decimal) - The estimated budget for the project e.g. `1500000`
  - `priority`: string enum[low, medium, high] - The priority level for the project e.g. `high`
  - `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`
- `errors`: array of object
  - `id`: integer - Unique identifier for the project. e.g. `89025`
  - `logo_url`: string - The URL for the Project logo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
  - `name`: string - The name for the Project e.g. `Casa de Casper`
  - `display_name`: string - The display name for the Project e.g. `A-1 Casa de Casper`
  - `project_number`: string - The Project number e.g. `A-1`
  - `address`: string - The street address for the Project e.g. `500 Construction Way`
  - `city`: string - The city in which the Project is located e.g. `Carpinteria`
  - `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
  - `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
  - `zip`: string - The postal code for the Project e.g. `93110`
  - `time_zone`: string - The timezone in which the Project is located e.g. `US/Pacific`
  - `tz_name`: string - The tz-database version of the timezone for the Project e.g. `America/Los_Angeles`
  - `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
  - `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
  - `county`: string - The county in which the Project is located e.g. `Santa Barbara County`
  - `parent_job_id`: integer - Unique identifier for the Parent Job e.g. `3`
  - `description`: string - Project description e.g. `Very cool project.`
  - `square_feet`: integer - The total square footage for the Project e.g. `5000`
  - `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
  - `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
  - `total_value`: number(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000`
  - `store_number`: string - The store number for the Project e.g. `3`
  - `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
  - `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
  - `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-15`
  - `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2015-05-31`
  - `active`: boolean - The active status for the Project e.g. `true`
  - `flag`: string enum[Red, Yellow, Green] - The Project flag (Red, Yellow, or Green) e.g. `Yellow`
  - `phone`: string - The telephone number for the Project e.g. `707-555-9866`
  - `public_notes`: string - Public notes on the Project e.g. `We're building a large private residence.`
  - `actual_start_date`: string(date) - The actual start date for the Project e.g. `2015-05-15`
  - `projected_finish_date`: string(date) - The projected finish date for the Project e.g. `2015-05-31`
  - `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
  - `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2016-03-14T16:52:22Z`
  - `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
  - `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
  - `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
  - `standard_cost_code_list_id`: integer e.g. `98`
  - `owners_project_id`: integer - A linked identifier for the Owner's Project e.g. `1234`
  - `photo_id`: integer - The unique identifier for the Project Photo e.g. `1`
  - `inbound_email`: string - The inbound email address username suffix for the project. e.g. `inbound-casa-de-casper`
  - `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
  - `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
  - `estimated_value`: number(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000`
  - `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
  - `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
  - `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
  - `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`
  - `persistent_message`: object
    - `title`: string - The title of the persistent message for the Project e.g. `General Scope of Work`
    - `message`: string - The text content for the Project persistent message e.g. `Provide and install HVAC systems.`
  - `office`: object
    - `id`: integer - The identifier for the Office e.g. `3610`
    - `name`: string - The name for the Office e.g. `Carpinteria`
    - `address`: string - Office address e.g. `100 Construction Lane`
    - `city`: string - Office city e.g. `Santa Barbara`
    - `state_code`: string - Office state code (ISO-3166 Alpha-2 format) e.g. `CA`
    - `country_code`: string - Office country code (ISO-3166 Alpha-2 format) e.g. `US`
    - `zip`: string - Office zip e.g. `93101`
    - `phone`: string - Office phone e.g. `8059831234`
    - `fax`: string - Office fax e.g. `8059834321`
    - `division`: string - Office division e.g. `First`
    - `logo`: object
  - `project_bid_type`: object
    - `id`: integer - The identifier for the Project Bid Type e.g. `1`
    - `name`: string - The name for the Project Bid Type e.g. `Competitive Bid`
  - `project_owner_type`: object
    - `id`: integer - The identifier for the Project Owner Type e.g. `1`
    - `name`: string - The name for the Project Owner Type e.g. `Project Owner Type A`
  - `project_region`: object
    - `id`: integer - The identifier for the Project Region e.g. `1`
    - `name`: string - The name for the Project Region e.g. `West`
  - `project_stage`: object
    - `id`: integer - The identifier for the Project Stage e.g. `3`
    - `name`: string - The name for the Project Stage e.g. `Course of Construction`
  - `project_type`: object
    - `id`: integer - The identifier for the Project Type e.g. `1`
    - `name`: string - The name for the Project Type e.g. `Project Type A`
  - `program`: object
    - `id`: integer - The identifier for the Project Program e.g. `4`
    - `name`: string - The name for the Project Program e.g. `Design Bid`
  - `departments`: array of object - An array of project departments
    - `id`: integer - The identifier for the Project Department e.g. `2`
    - `name`: string - The name for the Project Department e.g. `Residential`
  - `company`: object
    - `id`: integer - The identifier for the Project Company e.g. `1234`
    - `name`: string - The name for the Project Company e.g. `CA Construction`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{id}

**Show project**
Show details for the specified project in Procore.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the project.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `view` [query] string enum[minimal] - The view determines which fields are returned for the project show endpoint. 'minimal' returns a subset of project fields including name, project_number, country_code, latitude, longitude, county, actual_start_date, p...

Response 200 (application/json): object

- `id`: integer - Unique identifier for the project. e.g. `89025`
- `logo_id`: integer - Unique identifier for the Project logo e.g. `1`
- `logo_url`: string - The URL for the Project logo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `name`: string - The name for the Project e.g. `Casa de Casper`
- `is_demo`: boolean - Indicates if the project is a test project e.g. `true`
- `template`: boolean - Indicates if the project is a template project e.g. `true`
- `display_name`: string - The display name for the Project e.g. `A-1 Casa de Casper`
- `project_number`: string - The Project number e.g. `A-1`
- `address`: string - The street address for the Project e.g. `500 Construction Way`
- `city`: string - The city in which the Project is located e.g. `Carpinteria`
- `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
- `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
- `zip`: string - The postal code for the Project e.g. `93110`
- `time_zone`: string - The timezone in which the Project is located e.g. `US/Pacific`
- `tz_name`: string - The tz-database version of the timezone for the Project e.g. `America/Los_Angeles`
- `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
- `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
- `county`: string - The county in which the Project is located e.g. `Santa Barbara County`
- `parent_job_id`: integer - Unique identifier for the Parent Job e.g. `3`
- `parent_job`: object
  - `id`: integer - The identifier for the parent project/job e.g. `312345`
  - `name`: string - The name for the parent project/job e.g. `Project Alpha`
- `from_project_template_id`: integer - Unique identifier for the Project Template used to create this project e.g. `3`
- `description`: string - Project description e.g. `Very cool project.`
- `square_feet`: integer - The total square footage for the Project e.g. `5000`
- `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
- `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
- `total_value`: string(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000.0`
- `store_number`: string - The store number for the Project e.g. `3`
- `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
- `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
- `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-15`
- `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2015-05-31`
- `active`: boolean - The active status for the Project e.g. `true`
- `flag`: string enum[Red, Yellow, Green, None] - The Project flag (Red, Yellow, or Green) e.g. `Yellow`
- `locale`: object
- `phone`: string - The telephone number for the Project e.g. `707-555-9866`
- `public_notes`: string - Public notes on the Project e.g. `We're building a large private residence.`
- `actual_start_date`: string(date) - The actual start date for the Project e.g. `2015-05-15`
- `projected_finish_date`: string(date) - The projected finish date for the Project e.g. `2015-05-31`
- `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
- `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2016-03-14T16:52:22Z`
- `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
- `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
- `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
- `standard_cost_code_list_id`: integer e.g. `98`
- `is_erp_integrated`: boolean - True if project is ERP integrated e.g. `false`
- `owners_project_id`: integer - A linked identifier for the Owner's Project e.g. `1234`
- `photo_id`: integer - The unique identifier for the Project Photo e.g. `1`
- `photo_url`: string - The URL for the Project photo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `inbound_email`: string - The inbound email address username suffix for the project. e.g. `user`
- `inbound_email_address`: string(email) - The inbound email address for the project. e.g. `user@example.com`
- `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
- `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
- `estimated_value`: string(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000.0`
- `code`: string - The Code of the project. e.g. `PCOR`
- `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
- `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
- `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `persistent_message`: object
  - `title`: string - The title of the persistent message for the Project e.g. `General Scope of Work`
  - `message`: string - The text content for the Project persistent message e.g. `Provide and install HVAC systems.`
- `office`: object - Office associated to the project or company main office if project does not set an office
  - `id`: integer - The identifier for the Office e.g. `3610`
  - `name`: string - The name for the Office e.g. `Carpinteria`
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
    - `name`: string
    - `url`: string
- `project_bid_type_id`: integer - The identifier for the Project Bid Type e.g. `1`
- `project_bid_type`: object
  - `id`: integer - The identifier for the Project Bid Type e.g. `1`
  - `name`: string - The name for the Project Bid Type e.g. `Competitive Bid`
- `project_owner_type_id`: integer - The identifier for the Project Owner Type e.g. `5`
- `project_owner_type`: object
  - `id`: integer - The identifier for the Project Owner Type e.g. `1`
  - `name`: string - The name for the Project Owner Type e.g. `Project Owner Type A`
- `project_region_id`: integer - The Project Region ID of the Project e.g. `22`
- `project_region`: object
  - `id`: integer - The identifier for the Project Region e.g. `1`
  - `name`: string - The name for the Project Region e.g. `West`
- `project_stage_id`: integer - The identifier for the Project Stage e.g. `1`
- `project_stage`: object
  - `id`: integer - The identifier for the Project Stage e.g. `3`
  - `name`: string - The name for the Project Stage e.g. `Course of Construction`
- `project_type`: object
  - `id`: integer - The identifier for the Project Type e.g. `1`
  - `name`: string - The name for the Project Type e.g. `Project Type A`
- `program`: object
  - `id`: integer - The identifier for the Project Program e.g. `4`
  - `name`: string - The name for the Project Program e.g. `Design Bid`
- `departments`: array of object - An array of project departments
  - `id`: integer - The identifier for the Project Department e.g. `2`
  - `name`: string - The name for the Project Department e.g. `Residential`
- `company`: object
  - `id`: integer - The identifier for the Project Company e.g. `1234`
  - `name`: string - The name for the Project Company e.g. `CA Construction`
- `dictionary_type`: string - Dictionary Type e.g. `general-contractor`
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
- `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{id}

**Update project**
Update information for an existing project.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `company_id`: integer (required) - The unique identifier for the Company the Project is associated with. e.g. `3461`
- `project`: object (required)
  - `active`: boolean - The Active status of the project. Must be true or false. e.g. `true`
  - `address`: string - The street address for the Project location e.g. `500 Construction Way`
  - `city`: string - The City in which the project is located e.g. `Carpinteria`
  - `country_code`: string - The two character code that represents the country in which the project is located (ISO-3166 Alpha-2 format) e.g. `US`
  - `county`: string - The County in which the project is located e.g. `Santa Barbara County`
  - `description`: string - The description for the project e.g. `A description of the project`
  - `erp_integrated`: boolean - This project is integrated with ERP e.g. `true`
  - `standard_cost_code_list_id`: integer - The identifier for the Standard Cost Code List e.g. `1`
  - `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
  - `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
  - `total_value`: number(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000`
  - `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-16`
  - `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2016-06-10`
  - `fax`: string - The fax number for the project e.g. `310-555-5555`
  - `flag`: string enum[Red, Yellow, Green] - The flag for the project e.g. `Yellow`
  - `image_id`: integer - The identifier for the project image e.g. `10`
  - `locale`: string enum[de-DE, en, en-AE, en-AU, en-CA, en-GB, en-SG, en-US-x-owner, en-US-x-sc, en-budget, en-owner, es, ...] - The locale for the Project. (Note that your account may not have access to all locales.)
  - `name`: string - The name of the project e.g. `Project F`
  - `office_id`: integer - The identifier for the Project Office e.g. `3610`
  - `phone`: string - The telephone number for the Project e.g. `310-555-5555`
  - `project_number`: string - The number for the Project e.g. `A-2`
  - `public_notes`: string - The public notes for the Project e.g. `Notes`
  - `project_stage_id`: integer - The identifier for the Project Stage e.g. `1`
  - `square_feet`: integer - The total square footage of the Project e.g. `5000`
  - `state_code`: string - The code that represents the Project State (ISO-3166 Alpha-2 format) e.g. `CA`
  - `time_zone`: string - The timezone the Project is located in e.g. `US/Pacific`
  - `zip`: string - The postal code for the Project e.g. `93110`
  - `parent_job_id`: integer - The identifier for the Project's Parent Job e.g. `2`
  - `program_id`: integer - The identifier for the Project Program ID e.g. `5`
  - `portfolio_program_uuid`: string(uuid) - Public UUID of the Portfolio Program this project is placed under. Null or omitted means Unassigned. Ignored when the company does not have Portfolio Programs. Distinct from program_id (legacy grouping). e.g. `018f7c9a-8b2e-7c3d-9e4f-5a6b7c8d9e0f`
  - `project_bid_type_id`: integer - The identifier for the Project Bid Type e.g. `2`
  - `project_type_id`: integer - The identifier for the Project Type e.g. `5`
  - `project_owner_type_id`: integer - The identifier for the Project Owner Type e.g. `5`
  - `project_region_id`: integer - The identifier for the Project Region e.g. `2`
  - `project_template_id`: integer - The identifier for the Project Template as designated by another Project on this company. It must be a Project that is a Template defined by template: `true` e.g. `22585`
  - `origin_id`: string - An external third-party identifier for the Project e.g. `22585`
  - `origin_data`: string - An external third-party data string associated with the Project e.g. `AC-1234`
  - `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
  - `department_ids`: array of integer - The identifiers for the Departments the Project belongs to. The array should always represent all Departments, so if you have `[1, 2, 3]` and want to remove deparment `2`, then send `[1, 3]` e.g. `[3128, 3127]`
  - `estimated_value`: number(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000`
  - `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
  - `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
  - `store_number`: string - Store Number of the Project e.g. `3`
  - `accounting_project_number`: string - Accounting Project Number of the Project e.g. `3456`
  - `designated_market_area`: string - Designated Market Area of the Project e.g. `Southeast`
  - `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
  - `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
  - `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the project. e.g. `89025`
- `logo_id`: integer - Unique identifier for the Project logo e.g. `1`
- `logo_url`: string - The URL for the Project logo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `name`: string - The name for the Project e.g. `Casa de Casper`
- `is_demo`: boolean - Indicates if the project is a test project e.g. `true`
- `template`: boolean - Indicates if the project is a template project e.g. `true`
- `display_name`: string - The display name for the Project e.g. `A-1 Casa de Casper`
- `project_number`: string - The Project number e.g. `A-1`
- `address`: string - The street address for the Project e.g. `500 Construction Way`
- `city`: string - The city in which the Project is located e.g. `Carpinteria`
- `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
- `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
- `zip`: string - The postal code for the Project e.g. `93110`
- `time_zone`: string - The timezone in which the Project is located e.g. `US/Pacific`
- `tz_name`: string - The tz-database version of the timezone for the Project e.g. `America/Los_Angeles`
- `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
- `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
- `county`: string - The county in which the Project is located e.g. `Santa Barbara County`
- `parent_job_id`: integer - Unique identifier for the Parent Job e.g. `3`
- `parent_job`: object
  - `id`: integer - The identifier for the parent project/job e.g. `312345`
  - `name`: string - The name for the parent project/job e.g. `Project Alpha`
- `from_project_template_id`: integer - Unique identifier for the Project Template used to create this project e.g. `3`
- `description`: string - Project description e.g. `Very cool project.`
- `square_feet`: integer - The total square footage for the Project e.g. `5000`
- `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
- `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
- `total_value`: string(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000.0`
- `store_number`: string - The store number for the Project e.g. `3`
- `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
- `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
- `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-15`
- `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2015-05-31`
- `active`: boolean - The active status for the Project e.g. `true`
- `flag`: string enum[Red, Yellow, Green, None] - The Project flag (Red, Yellow, or Green) e.g. `Yellow`
- `locale`: object
- `phone`: string - The telephone number for the Project e.g. `707-555-9866`
- `public_notes`: string - Public notes on the Project e.g. `We're building a large private residence.`
- `actual_start_date`: string(date) - The actual start date for the Project e.g. `2015-05-15`
- `projected_finish_date`: string(date) - The projected finish date for the Project e.g. `2015-05-31`
- `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
- `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2016-03-14T16:52:22Z`
- `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
- `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
- `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
- `standard_cost_code_list_id`: integer e.g. `98`
- `is_erp_integrated`: boolean - True if project is ERP integrated e.g. `false`
- `owners_project_id`: integer - A linked identifier for the Owner's Project e.g. `1234`
- `photo_id`: integer - The unique identifier for the Project Photo e.g. `1`
- `photo_url`: string - The URL for the Project photo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `inbound_email`: string - The inbound email address username suffix for the project. e.g. `user`
- `inbound_email_address`: string(email) - The inbound email address for the project. e.g. `user@example.com`
- `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
- `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
- `estimated_value`: string(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000.0`
- `code`: string - The Code of the project. e.g. `PCOR`
- `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
- `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
- `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `persistent_message`: object
  - `title`: string - The title of the persistent message for the Project e.g. `General Scope of Work`
  - `message`: string - The text content for the Project persistent message e.g. `Provide and install HVAC systems.`
- `office`: object - Office associated to the project or company main office if project does not set an office
  - `id`: integer - The identifier for the Office e.g. `3610`
  - `name`: string - The name for the Office e.g. `Carpinteria`
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
    - `name`: string
    - `url`: string
- `project_bid_type_id`: integer - The identifier for the Project Bid Type e.g. `1`
- `project_bid_type`: object
  - `id`: integer - The identifier for the Project Bid Type e.g. `1`
  - `name`: string - The name for the Project Bid Type e.g. `Competitive Bid`
- `project_owner_type_id`: integer - The identifier for the Project Owner Type e.g. `5`
- `project_owner_type`: object
  - `id`: integer - The identifier for the Project Owner Type e.g. `1`
  - `name`: string - The name for the Project Owner Type e.g. `Project Owner Type A`
- `project_region_id`: integer - The Project Region ID of the Project e.g. `22`
- `project_region`: object
  - `id`: integer - The identifier for the Project Region e.g. `1`
  - `name`: string - The name for the Project Region e.g. `West`
- `project_stage_id`: integer - The identifier for the Project Stage e.g. `1`
- `project_stage`: object
  - `id`: integer - The identifier for the Project Stage e.g. `3`
  - `name`: string - The name for the Project Stage e.g. `Course of Construction`
- `project_type`: object
  - `id`: integer - The identifier for the Project Type e.g. `1`
  - `name`: string - The name for the Project Type e.g. `Project Type A`
- `program`: object
  - `id`: integer - The identifier for the Project Program e.g. `4`
  - `name`: string - The name for the Project Program e.g. `Design Bid`
- `departments`: array of object - An array of project departments
  - `id`: integer - The identifier for the Project Department e.g. `2`
  - `name`: string - The name for the Project Department e.g. `Residential`
- `company`: object
  - `id`: integer - The identifier for the Project Company e.g. `1234`
  - `name`: string - The name for the Project Company e.g. `CA Construction`
- `dictionary_type`: string - Dictionary Type e.g. `general-contractor`
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
- `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{id}/filters

**List filters**
List all filters customer can use for the project and tool

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the project.
- `tool` [query] string enum[commitments, change_orders, direct_costs] (required) - Tool name
- `tab` [query] string (required) - Tab name

Response 200 (application/json): object

- `filters`: array of object
  - `index`: integer - Order number e.g. `0`
  - `key`: string - Field name to filter by e.g. `status`
  - `endpoint`: string(path) - Filter endpoint e.g. `/rest/v1.0/projects/1584033/filters/status?locale=en&tab=1&tool=commitments`
  - `value`: string - Filter value e.g. `Status`
  - `type`: string - Filter type e.g. `checkboxGroup`
- `saved_filters`: array of object
  - `index`: integer - Order number e.g. `0`
  - `key`: string - Field name to filter by e.g. `status`
  - `endpoint`: string(path) - Filter endpoint e.g. `/rest/v1.0/projects/1584033/filters/status?locale=en&tab=1&tool=commitments`
  - `value`: string - Filter value e.g. `Status`
  - `type`: string - Filter type e.g. `checkboxGroup`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{id}/filters/{filter_name}

**List possible Tool filter values**
List all possible values customer can apply to a filter

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the project.
- `filter_name` [path] string (required) - Filter name
- `tool` [query] string enum[commitments, change_orders, direct_costs] (required) - Tool name
- `tab` [query] string (required) - Tab name

Response 200 (application/json): array of object

- `key`: string - filter key e.g. `From`
- `value`: string - filter value e.g. `2022-02-06`
- `groupId`: string - filter group id e.g. `all_commitments`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{id}/logo

**Create a project logo**
Updates the project logo from a upload and returns the updated project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `logo`: object
  - `upload_uuid`: string (required) - UUID referencing a previously completed Upload. See Company Uploads or Project Uploads for instructions on how use uploads. e.g. `1QJ83Q56CVQR4X3C0JG7YV86F8`
  - `file_name`: string - The name of the logo file to be created. e.g. `my_file.png`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the project. e.g. `89025`
- `logo_id`: integer - Unique identifier for the Project logo e.g. `1`
- `logo_url`: string - The URL for the Project logo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `name`: string - The name for the Project e.g. `Casa de Casper`
- `is_demo`: boolean - Indicates if the project is a test project e.g. `true`
- `template`: boolean - Indicates if the project is a template project e.g. `true`
- `display_name`: string - The display name for the Project e.g. `A-1 Casa de Casper`
- `project_number`: string - The Project number e.g. `A-1`
- `address`: string - The street address for the Project e.g. `500 Construction Way`
- `city`: string - The city in which the Project is located e.g. `Carpinteria`
- `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
- `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
- `zip`: string - The postal code for the Project e.g. `93110`
- `time_zone`: string - The timezone in which the Project is located e.g. `US/Pacific`
- `tz_name`: string - The tz-database version of the timezone for the Project e.g. `America/Los_Angeles`
- `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
- `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
- `county`: string - The county in which the Project is located e.g. `Santa Barbara County`
- `parent_job_id`: integer - Unique identifier for the Parent Job e.g. `3`
- `parent_job`: object
  - `id`: integer - The identifier for the parent project/job e.g. `312345`
  - `name`: string - The name for the parent project/job e.g. `Project Alpha`
- `from_project_template_id`: integer - Unique identifier for the Project Template used to create this project e.g. `3`
- `description`: string - Project description e.g. `Very cool project.`
- `square_feet`: integer - The total square footage for the Project e.g. `5000`
- `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
- `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
- `total_value`: string(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000.0`
- `store_number`: string - The store number for the Project e.g. `3`
- `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
- `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
- `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-15`
- `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2015-05-31`
- `active`: boolean - The active status for the Project e.g. `true`
- `flag`: string enum[Red, Yellow, Green, None] - The Project flag (Red, Yellow, or Green) e.g. `Yellow`
- `locale`: object
- `phone`: string - The telephone number for the Project e.g. `707-555-9866`
- `public_notes`: string - Public notes on the Project e.g. `We're building a large private residence.`
- `actual_start_date`: string(date) - The actual start date for the Project e.g. `2015-05-15`
- `projected_finish_date`: string(date) - The projected finish date for the Project e.g. `2015-05-31`
- `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
- `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2016-03-14T16:52:22Z`
- `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
- `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
- `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
- `standard_cost_code_list_id`: integer e.g. `98`
- `is_erp_integrated`: boolean - True if project is ERP integrated e.g. `false`
- `owners_project_id`: integer - A linked identifier for the Owner's Project e.g. `1234`
- `photo_id`: integer - The unique identifier for the Project Photo e.g. `1`
- `photo_url`: string - The URL for the Project photo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `inbound_email`: string - The inbound email address username suffix for the project. e.g. `user`
- `inbound_email_address`: string(email) - The inbound email address for the project. e.g. `user@example.com`
- `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
- `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
- `estimated_value`: string(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000.0`
- `code`: string - The Code of the project. e.g. `PCOR`
- `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
- `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
- `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `persistent_message`: object
  - `title`: string - The title of the persistent message for the Project e.g. `General Scope of Work`
  - `message`: string - The text content for the Project persistent message e.g. `Provide and install HVAC systems.`
- `office`: object - Office associated to the project or company main office if project does not set an office
  - `id`: integer - The identifier for the Office e.g. `3610`
  - `name`: string - The name for the Office e.g. `Carpinteria`
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
    - `name`: string
    - `url`: string
- `project_bid_type_id`: integer - The identifier for the Project Bid Type e.g. `1`
- `project_bid_type`: object
  - `id`: integer - The identifier for the Project Bid Type e.g. `1`
  - `name`: string - The name for the Project Bid Type e.g. `Competitive Bid`
- `project_owner_type_id`: integer - The identifier for the Project Owner Type e.g. `5`
- `project_owner_type`: object
  - `id`: integer - The identifier for the Project Owner Type e.g. `1`
  - `name`: string - The name for the Project Owner Type e.g. `Project Owner Type A`
- `project_region_id`: integer - The Project Region ID of the Project e.g. `22`
- `project_region`: object
  - `id`: integer - The identifier for the Project Region e.g. `1`
  - `name`: string - The name for the Project Region e.g. `West`
- `project_stage_id`: integer - The identifier for the Project Stage e.g. `1`
- `project_stage`: object
  - `id`: integer - The identifier for the Project Stage e.g. `3`
  - `name`: string - The name for the Project Stage e.g. `Course of Construction`
- `project_type`: object
  - `id`: integer - The identifier for the Project Type e.g. `1`
  - `name`: string - The name for the Project Type e.g. `Project Type A`
- `program`: object
  - `id`: integer - The identifier for the Project Program e.g. `4`
  - `name`: string - The name for the Project Program e.g. `Design Bid`
- `departments`: array of object - An array of project departments
  - `id`: integer - The identifier for the Project Department e.g. `2`
  - `name`: string - The name for the Project Department e.g. `Residential`
- `company`: object
  - `id`: integer - The identifier for the Project Company e.g. `1234`
  - `name`: string - The name for the Project Company e.g. `CA Construction`
- `dictionary_type`: string - Dictionary Type e.g. `general-contractor`
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
- `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{id}/logo

**Delete the project logo**
Updates the project setting the logo reference to null

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the project. e.g. `89025`
- `logo_id`: integer - Unique identifier for the Project logo e.g. `1`
- `logo_url`: string - The URL for the Project logo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `name`: string - The name for the Project e.g. `Casa de Casper`
- `is_demo`: boolean - Indicates if the project is a test project e.g. `true`
- `template`: boolean - Indicates if the project is a template project e.g. `true`
- `display_name`: string - The display name for the Project e.g. `A-1 Casa de Casper`
- `project_number`: string - The Project number e.g. `A-1`
- `address`: string - The street address for the Project e.g. `500 Construction Way`
- `city`: string - The city in which the Project is located e.g. `Carpinteria`
- `state_code`: string - The state code for the Project (ISO-3166 Alpha-2 format) e.g. `CA`
- `country_code`: string - The country code for the Project (ISO-3166 Alpha-2 format) e.g. `US`
- `zip`: string - The postal code for the Project e.g. `93110`
- `time_zone`: string - The timezone in which the Project is located e.g. `US/Pacific`
- `tz_name`: string - The tz-database version of the timezone for the Project e.g. `America/Los_Angeles`
- `latitude`: number(float) - The geographic coordinate that specifies the north–south position of the Project on the Earth's surface. e.g. `34.3850464855729`
- `longitude`: number(float) - The geographic coordinate that specifies the east–west position of the Project on the Earth's surface. e.g. `-119.490849121334`
- `county`: string - The county in which the Project is located e.g. `Santa Barbara County`
- `parent_job_id`: integer - Unique identifier for the Parent Job e.g. `3`
- `parent_job`: object
  - `id`: integer - The identifier for the parent project/job e.g. `312345`
  - `name`: string - The name for the parent project/job e.g. `Project Alpha`
- `from_project_template_id`: integer - Unique identifier for the Project Template used to create this project e.g. `3`
- `description`: string - Project description e.g. `Very cool project.`
- `square_feet`: integer - The total square footage for the Project e.g. `5000`
- `start_date`: string(date) - The date that the contract for the project is signed. Note: this field is a replacement to estimated_start_date and will mirror its value. e.g. `2015-05-15`
- `completion_date`: string(date) - The date that all parties agree the project meets or must meet “substantial completion”. Note: this field is a replacement to estimated_completion_date and will mirror its value. e.g. `2015-05-15`
- `total_value`: string(float) - The total amount of construction work performed, planned, or put in place during the project. Note: this field is a replacement to estimated_value and will mirror its value. e.g. `10000.0`
- `store_number`: string - The store number for the Project e.g. `3`
- `accounting_project_number`: string - The accounting project number for the Project e.g. `3456`
- `designated_market_area`: string - The designated market area the Project is located in e.g. `Southeast`
- `warranty_start_date`: string(date) - The start date for the Project Warranty e.g. `2015-05-15`
- `warranty_end_date`: string(date) - The end date for the Project Warranty e.g. `2015-05-31`
- `active`: boolean - The active status for the Project e.g. `true`
- `flag`: string enum[Red, Yellow, Green, None] - The Project flag (Red, Yellow, or Green) e.g. `Yellow`
- `locale`: object
- `phone`: string - The telephone number for the Project e.g. `707-555-9866`
- `public_notes`: string - Public notes on the Project e.g. `We're building a large private residence.`
- `actual_start_date`: string(date) - The actual start date for the Project e.g. `2015-05-15`
- `projected_finish_date`: string(date) - The projected finish date for the Project e.g. `2015-05-31`
- `created_at`: string(date-time) - The date and time the Project was created e.g. `2014-12-29T21:53:56Z`
- `updated_at`: string(date-time) - The date and time the Project was last updated e.g. `2016-03-14T16:52:22Z`
- `origin_id`: string - An external third-party identifier for the Project e.g. `OD-2398273424`
- `origin_data`: string - An external third-party data string associated with the Project e.g. `459247544`
- `origin_code`: string - An external third-party code associated with the Project e.g. `Code 123`
- `standard_cost_code_list_id`: integer e.g. `98`
- `is_erp_integrated`: boolean - True if project is ERP integrated e.g. `false`
- `owners_project_id`: integer - A linked identifier for the Owner's Project e.g. `1234`
- `photo_id`: integer - The unique identifier for the Project Photo e.g. `1`
- `photo_url`: string - The URL for the Project photo e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20150904220156_production_1053...`
- `inbound_email`: string - The inbound email address username suffix for the project. e.g. `user`
- `inbound_email_address`: string(email) - The inbound email address for the project. e.g. `user@example.com`
- `estimated_start_date`: string(date) - The Estimated Start Date of the Project Note: this field is now deprecated and will mirror the value of start_date until it is no longer supported. e.g. `2015-05-15`
- `estimated_completion_date`: string(date) - The Estimated Completion Date of the Project. Note: this field is now deprecated and will mirror the value of completion_date until it is no longer supported. e.g. `2015-05-31`
- `estimated_value`: string(float) - The Estimated Value of the project. Note: this field is now deprecated and will mirror the value of total_value until it is no longer supported. e.g. `10000.0`
- `code`: string - The Code of the project. e.g. `PCOR`
- `sector`: string enum[agriculture, airport, alcohol_establishment, amusement_park, animal_health_veterinary, animal_lodging, assembly, auto_parts_store, auto_service, auto_vehicle_terminal, automobile_retail, aviation, ...] - The sector of a project.
- `work_scope`: string enum[new_construction, renovation_alteration, maintenance_service, None] - The work scope of a project.
- `delivery_method`: string enum[construction_management_at_risk_cmar, construction_manager_as_agent_owners_rep, design_bid_build_dbb, design_build_db, indefinite_delivery_indefinite_quantity_idiq, integrated_project_delivery, multi_prime, public_private_partnership_p3, other, None] - The delivery method of a project.
- `created_by`: object - Login Information
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`
- `persistent_message`: object
  - `title`: string - The title of the persistent message for the Project e.g. `General Scope of Work`
  - `message`: string - The text content for the Project persistent message e.g. `Provide and install HVAC systems.`
- `office`: object - Office associated to the project or company main office if project does not set an office
  - `id`: integer - The identifier for the Office e.g. `3610`
  - `name`: string - The name for the Office e.g. `Carpinteria`
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
    - `name`: string
    - `url`: string
- `project_bid_type_id`: integer - The identifier for the Project Bid Type e.g. `1`
- `project_bid_type`: object
  - `id`: integer - The identifier for the Project Bid Type e.g. `1`
  - `name`: string - The name for the Project Bid Type e.g. `Competitive Bid`
- `project_owner_type_id`: integer - The identifier for the Project Owner Type e.g. `5`
- `project_owner_type`: object
  - `id`: integer - The identifier for the Project Owner Type e.g. `1`
  - `name`: string - The name for the Project Owner Type e.g. `Project Owner Type A`
- `project_region_id`: integer - The Project Region ID of the Project e.g. `22`
- `project_region`: object
  - `id`: integer - The identifier for the Project Region e.g. `1`
  - `name`: string - The name for the Project Region e.g. `West`
- `project_stage_id`: integer - The identifier for the Project Stage e.g. `1`
- `project_stage`: object
  - `id`: integer - The identifier for the Project Stage e.g. `3`
  - `name`: string - The name for the Project Stage e.g. `Course of Construction`
- `project_type`: object
  - `id`: integer - The identifier for the Project Type e.g. `1`
  - `name`: string - The name for the Project Type e.g. `Project Type A`
- `program`: object
  - `id`: integer - The identifier for the Project Program e.g. `4`
  - `name`: string - The name for the Project Program e.g. `Design Bid`
- `departments`: array of object - An array of project departments
  - `id`: integer - The identifier for the Project Department e.g. `2`
  - `name`: string - The name for the Project Department e.g. `Residential`
- `company`: object
  - `id`: integer - The identifier for the Project Company e.g. `1234`
  - `name`: string - The name for the Project Company e.g. `CA Construction`
- `dictionary_type`: string - Dictionary Type e.g. `general-contractor`
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
- `project_sector_id`: integer - Id of the project sector associated with the project. e.g. `1`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

