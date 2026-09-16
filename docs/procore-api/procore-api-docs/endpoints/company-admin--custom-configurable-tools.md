# Procore API: Custom - Configurable Tools (Company Admin)

Source: https://developers.procore.com/reference/rest/ (tool category: Custom - Configurable Tools)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Configurable Field Sets](#configurable-field-sets) - versions 2.1, 2.0, 1.0
- [Correspondences](#correspondences) - versions 1.0
- [Custom Field Lov Entries](#custom-field-lov-entries) - versions 2.0, 1.0
- [Custom Fields](#custom-fields) - versions 2.0, 1.1, 1.0
- [Generic Tool Items](#generic-tool-items) - versions 1.0
- [Generic Tools](#generic-tools) - versions 2.0
- [Resource Planning Custom Fields](#resource-planning-custom-fields) - versions 1.0

## Configurable Field Sets

Resource id: `configurable-field-sets`. Raw spec: `../openapi-raw/configurable-field-sets.json`. Web: https://developers.procore.com/reference/rest/configurable-field-sets?version=latest
Product lines: Total Quality and Safety Management, PM Essentials

### GET /rest/v2.1/companies/{company_id}/configurable_field_sets

**List Configurable Field Sets**
Return a list of all Configurable Field Sets associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[type][]` [query] array of string - Filter by field set type(s). Could be a string or an array of string.
- `filters[generic_tool_id][]` [query] array of integer - Filter by generic tool id(s). Could be a integer or an array of integer.
- `filters[incident_type_id][]` [query] array of integer - Filter by incident type id(s). Could be an integer or an array of integers.
- `view` [query] string - Specify which view to render. Options are common, extended, mobile, or with_project_ids

Response 200 (application/json): object

- `data`: array of object - Array of Configurable Field Sets
  - `id`: string - The unique identifier of the configurable field set. e.g. `999`
  - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
  - `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
  - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
  - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
  - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `field_1`: object - The first Observation Field object.
    - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
  - `sections`: array of object - An array of sections that are used for custom fields.
    - `id`: string - The unique identifier of the section. e.g. `1`
    - `name`: string - The name of the section. e.g. `Section 1`
    - `description`: string - The description of the section. e.g. `Project ABC`
    - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
    - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
  - `inspection_type_id`: string - The unique identifier of the inspection type. e.g. `1`
  - `incident_type_id`: string - The unique identifier of the incident type. e.g. `1`
  - `generic_tool_id`: string - The unique idenfitier of the generic tool. e.g. `1`
  - `action_plan_type_id`: string - The unique idenfitier of the action plan type. e.g. `1`
  - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
  - `has_custom_fields`: boolean - Indicates whether the configurable field set has any custom fields defined. e.g. `true`
  - `has_custom_fields_sections`: boolean - Indicates whether the configurable field set has custom fields organized into sections. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/configurable_field_sets

**Create Configurable Field Sets**
Creates a Configurable Field Set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `configurable_field_set`: object (required)
  - `name`: string (required) - Name e.g. `Observation Form`
  - `class_name`: string enum[Observations::Item, PunchItem, Rfi::Header] (required) - Class Name of the object the Configurable Field Set is applied to
  - `fields`: object (required) - All fields that make up the form of the class name.
    - `field_1`: object - An example of what a field would look like
      - `name`: string (required) - the name of the field e.g. `field_1`
      - `visible`: boolean (required) - whether the field is visible or not in the form e.g. `true`
      - `required`: boolean - Whether or not the field is required e.g. `true`
  - `project_ids`: array of integer
  - `category`: string enum[quality, safety, commissioning, warranty, work_to_complete] - Required and only needed when associating projects for an Observations Configurable Field Set.(0 = quality, 1 = safety, 2 = commissioning, 3 = warranty, 4 = work to complete)
  - `action_plan_type_id`: string - Action Plan Type unique identifier e.g. `1`
  - `inspection_type_id`: string - Inspection type unique identifier e.g. `1`
  - `incident_type_id`: string - Incident type unique identifier e.g. `1`
  - `generic_tool_id`: string - Generic tool unique identifier e.g. `1`
  - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
  - `company_default`: boolean - If the Configurable Field Set is the company default for new projects e.g. `true`
  - `company_configurable_field_set_default_column_name`: string enum[commissioning_configurable_field_set, quality_configurable_field_set, safety_configurable_field_set, warranty_configurable_field_set, work_to_complete_configurable_field_set, rfi_configurable_field_set] - the column name on CompanyConfigurableFieldSetDefault to set the Configurable Field Set as default to. Only needed if company_default is true.
  - `schema_id`: string - DO NOT USE - This is a reference to an outside service (schema-service). It is the UUID of the schema that corresponds to this configurable field set in the schema-service. The schema-service will automatically create...
- `custom_field_sections`: array of object
  - `id`: string e.g. `1`
  - `name`: string
  - `custom_field_definition_ids`: array of integer

Response 201 (application/json): object

- `data`: object
  - `id`: string - The unique identifier of the configurable field set. e.g. `999`
  - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
  - `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
  - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
  - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
  - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `field_1`: object - The first Observation Field object.
    - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
  - `sections`: array of object - An array of sections that are used for custom fields.
    - `id`: string - The unique identifier of the section. e.g. `1`
    - `name`: string - The name of the section. e.g. `Section 1`
    - `description`: string - The description of the section. e.g. `Project ABC`
    - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
    - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
  - `updated_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `inspection_type_id`: string - The unique identifier of the inspection type. e.g. `1`
  - `incident_type_id`: string - The unique identifier of the incident type. e.g. `1`
  - `generic_tool_id`: string - The unique idenfitier of the generic tool. e.g. `1`
  - `action_plan_type_id`: string - The unique idenfitier of the action plan type. e.g. `1`
  - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
  - `projects`: array of object - An array of projects that are associated with the configurable field set.
    - `id`: string - The unique identifier of the project. e.g. `1`
    - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/configurable_field_sets/{id}

**Show Configurable Field Set**
Returns the details for a specified Configurable Field Set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Configurable Field Set ID

Response 200 (application/json): object

- `data`: object
  - `id`: string - The unique identifier of the configurable field set. e.g. `999`
  - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
  - `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
  - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
  - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
  - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `field_1`: object - The first Observation Field object.
    - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
  - `sections`: array of object - An array of sections that are used for custom fields.
    - `id`: string - The unique identifier of the section. e.g. `1`
    - `name`: string - The name of the section. e.g. `Section 1`
    - `description`: string - The description of the section. e.g. `Project ABC`
    - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
    - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
  - `updated_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `inspection_type_id`: string - The unique identifier of the inspection type. e.g. `1`
  - `incident_type_id`: string - The unique identifier of the incident type. e.g. `1`
  - `generic_tool_id`: string - The unique idenfitier of the generic tool. e.g. `1`
  - `action_plan_type_id`: string - The unique idenfitier of the action plan type. e.g. `1`
  - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
  - `projects`: array of object - An array of projects that are associated with the configurable field set.
    - `id`: string - The unique identifier of the project. e.g. `1`
    - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/configurable_field_sets/{id}

**Update Configurable Field Set**
Updates a Configurable Field Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Configurable Field Set ID

Request body (application/json) (required):

- `configurable_field_set`: object (required)
  - `name`: string (required) - Name e.g. `Observation Form`
  - `fields`: object (required) - All fields that make up the form of the class name.
    - `field_1`: object - An example of what a field would look like
      - `name`: string (required) - the name of the field e.g. `field_1`
      - `visible`: boolean (required) - whether the field is visible or not in the form e.g. `true`
      - `required`: boolean - Whether or not the field is required e.g. `true`
    - `custom_field_1`: object - Existing Custom Fields to be edited for this Configurable Field Set
      - `id`: string - Custom Field Metadatum ID e.g. `999`
      - `name`: string - The name of the Custom Field e.g. `custom_field_1`
      - `label`: string - The label of the Custom Field Definition e.g. `Worked hours`
      - `description`: string - The description of the Custom Field Definition e.g. `description`
      - `custom_field_definition_id`: string - Custom Field Definition ID e.g. `999`
      - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the Custom Field
      - `position`: integer - The display position of the Custom Field, which is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column pro... e.g. `999`
      - `required`: boolean - Whether or not the Field is required e.g. `true`
      - `visible`: boolean - Whether or not the Custom Field is visible e.g. `true`
      - `row`: number - Row the Field is position on the Form e.g. `1`
      - `column`: number - Column the Field is position on the Form e.g. `1`
      - `column_width`: number - How many columns the field spans on the Form e.g. `3`
  - `project_ids`: array of integer
  - `category`: string enum[quality, safety, commissioning, warranty, work_to_complete] - Required and only needed when associating projects for an Observations Configurable Field Set.(0 = quality, 1 = safety, 2 = commissioning, 3 = warranty, 4 = work to complete)
  - `include_all_projects`: boolean - Whether or not all projects selected e.g. `true`
  - `schema_id`: string - DO NOT USE - This is a reference to an outside service (schema-service). It is the UUID of the schema that corresponds to this configurable field set in the schema-service. The schema-service will use this field when ...
- `custom_field_sections`: array of object
  - `id`: string e.g. `1`
  - `name`: string
  - `custom_field_definition_ids`: array of integer

Response 200 (application/json): object

- `data`: object
  - `id`: string - The unique identifier of the configurable field set. e.g. `999`
  - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
  - `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
  - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
  - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
  - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `field_1`: object - The first Observation Field object.
    - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
  - `sections`: array of object - An array of sections that are used for custom fields.
    - `id`: string - The unique identifier of the section. e.g. `1`
    - `name`: string - The name of the section. e.g. `Section 1`
    - `description`: string - The description of the section. e.g. `Project ABC`
    - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
    - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
  - `updated_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `inspection_type_id`: string - The unique identifier of the inspection type. e.g. `1`
  - `incident_type_id`: string - The unique identifier of the incident type. e.g. `1`
  - `generic_tool_id`: string - The unique idenfitier of the generic tool. e.g. `1`
  - `action_plan_type_id`: string - The unique idenfitier of the action plan type. e.g. `1`
  - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
  - `projects`: array of object - An array of projects that are associated with the configurable field set.
    - `id`: string - The unique identifier of the project. e.g. `1`
    - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.1/companies/{company_id}/configurable_field_sets/{id}

**Delete Configurable Field Set**
Deletes a Configurable Field Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Configurable Field Set ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/configurable_field_sets/sections

**List Configurable Field Set Sections**
Returns a grouped/sectioned view of Configurable Field Sets for a company.
Field sets are grouped by their type, category, inspection type, generic tool, etc.
This endpoint provides the same data structure used in the admin UI for managing field sets.
The grouping logic is determined by the type parameter(s).
Accepts either a single type or an array of types. Sections for all requested types
will be returned in a flat array.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `types[]` [query] array of string (required) - The configurable field set type(s) to determine how to group the results. Can be a single string or an array of strings. This is required to determine the grouping logic.
- `correspondence_types` [query] string - The configurable field set correspondence type(s) to filter results by. Can be a single string or an array of strings.

Response 200 (application/json): object

- `data`: array of object - Array of Configurable Field Set Sections
  - `id`: string - Section identifier e.g. `commissioning`
  - `type`: string - Configurable Field Set type e.g. `ConfigurableFieldSet::Observations::Item`
  - `I18n_name`: string - Internationalization name key or actual name e.g. `views.company.admin.config_field_set.categories.commissioning`
  - `I18n_scope`: string - Internationalization scope
  - `I18n_default_name`: string - Default name for the section e.g. `Commissioning`
  - `configurable_field_sets`: array of object - Array of configurable field sets in this section
    - `id`: string - The unique identifier of the configurable field set. e.g. `999`
    - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
    - `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
    - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
    - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
    - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `sections`: array of object - An array of sections that are used for custom fields.
    - `inspection_type_id`: string - The unique identifier of the inspection type. e.g. `1`
    - `incident_type_id`: string - The unique identifier of the incident type. e.g. `1`
    - `generic_tool_id`: string - The unique idenfitier of the generic tool. e.g. `1`
    - `action_plan_type_id`: string - The unique idenfitier of the action plan type. e.g. `1`
    - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
    - `has_custom_fields`: boolean - Indicates whether the configurable field set has any custom fields defined. e.g. `true`
    - `has_custom_fields_sections`: boolean - Indicates whether the configurable field set has custom fields organized into sections. e.g. `false`
  - `default_fields`: object - Default fields configuration for this section
  - `show_procore_default`: boolean - Whether to show Procore default option
  - `procore_default_applied`: boolean - Whether Procore default is applied
  - `configurable_field_set_default_id`: string - ID of the default configurable field set
  - `incident_type_id`: string - Incident type ID (only present for incident type sections)
  - `cfs_default_path`: string - Path for setting default
  - `cfs_default_method`: string - HTTP method for setting default e.g. `patch`
  - `equipment_category_id`: string - Equipment category ID (only present for equipment category sections)
  - `disable_creation`: boolean - Whether creation should be disabled for this section
  - `project_counts`: object - Project counts for field sets in this section

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/configurable_field_sets

**List Project Configurable Field Sets**
Return a list of all Configurable Field Sets associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `types[]` [query] array of string - Filter by of configurable field set types
- `include_default_configurable_field_sets` [query] boolean - Flag to include the default values for each type of Configurable Field Set if one has not been created.

Response 200 (application/json): object

- `data`: array of object - Array of Configurable Field Sets
  - `id`: string - The unique identifier of the configurable field set. e.g. `999`
  - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
  - `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
  - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
  - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
  - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `field_1`: object - The first Observation Field object.
    - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
  - `sections`: array of object - An array of sections that are used for custom fields.
    - `id`: string - The unique identifier of the section. e.g. `1`
    - `name`: string - The name of the section. e.g. `Section 1`
    - `description`: string - The description of the section. e.g. `Project ABC`
    - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
    - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
  - `inspection_type_id`: string - The unique identifier of the inspection type. e.g. `1`
  - `incident_type_id`: string - The unique identifier of the incident type. e.g. `1`
  - `generic_tool_id`: string - The unique idenfitier of the generic tool. e.g. `1`
  - `action_plan_type_id`: string - The unique idenfitier of the action plan type. e.g. `1`
  - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
  - `has_custom_fields`: boolean - Indicates whether the configurable field set has any custom fields defined. e.g. `true`
  - `has_custom_fields_sections`: boolean - Indicates whether the configurable field set has custom fields organized into sections. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/custom_fields/{tool_name}/user_options

**List Custom Fields User options**
Returns login informations that have access to the specified tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `tool_name` [path] string enum[submittal_log, drawing_log, specification_sections, document_service] (required) - Tool name identifier
- `filters[search]` [query] string - filters results by the search query
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of users with access to tool for custom fields
  - `id`: string - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/configurable_field_sets/find_by_index

**Find Configurable Field Set by Index**
Returns the details for a specified Configurable Field Set if found. If not, template of type Field Set will be returned with ID null.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `type` [query] string (required) - The type of Configurable Field Set
- `project_id` [query] string - Project ID that is associated to the Configurable Field Set, if applicable
- `scope[category]` [query] integer - Category or observations_category_id required for an Observations Configurable Field Set (0 = quality, 1 = safety, 2 = commissioning, 3 = warranty, 4 = work to complete)
- `scope[observations_category_id]` [query] string - Category or observations_category_id required for an Observations Configurable Field Set
- `scope[inspection_type_id]` [query] string - Required for an Inspection Configurable Field Set. If a value is provided, only field set of the specific Inspection type is returned. If no value is provided, only field set of unassociated Inspections (Inspections w...
- `scope[incident_type_id]` [query] string - Required for an Incident Configurable Field Set. If a value is provided, only field set of the specific Incident type is returned.
- `scope[generic_tool_id]` [query] string - Required for a Generic Tool Item Configurable Field Set (type of ConfigurableFieldSet::GenericToolItem)
- `scope[action_plan_type_id]` [query] string - Required for an Action Plans Plan Configurable Field Set (type of ConfigurableFieldSet::ActionPlans::Plan)

Response 200 (application/json): object

- `data`: object
  - `id`: string - The unique identifier of the configurable field set. e.g. `999`
  - `name`: string - The name of the configurable field set. e.g. `Observation Fields`
  - `type`: string - The type of configurable field set e.g. `ConfigurableFieldSet::Observations::Item`
  - `category`: string - Specifies the category for the configurable field set if it exists or an empty string. This property was added for the ConfigurableFieldSet::Observations::Item class. e.g. `commissioning`
  - `class_name`: string - Specifies the class the configurable field set is associated with. e.g. `Observations::Item`
  - `fields`: object - Specifies the hash of fields on an object. This is for example purposes only.
    - `field_1`: object - The first Observation Field object.
    - `custom_field_1`: object - Custom Field object for an existing custom field in this configurable field set object.
  - `sections`: array of object - An array of sections that are used for custom fields.
    - `id`: string - The unique identifier of the section. e.g. `1`
    - `name`: string - The name of the section. e.g. `Section 1`
    - `description`: string - The description of the section. e.g. `Project ABC`
    - `position`: integer - The display position of the section, which is sorted ascending, lowest position is visually the top of the page. e.g. `999`
    - `from_v1_custom_fields`: boolean - If field was migrated from a v1 custom field. e.g. `false`
  - `deletable`: boolean - Deletable status e.g. `false`
  - `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
  - `updated_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `inspection_type_id`: string - The unique identifier of the inspection type. e.g. `1`
  - `incident_type_id`: string - The unique identifier of the incident type. e.g. `1`
  - `generic_tool_id`: string - The unique idenfitier of the generic tool. e.g. `1`
  - `action_plan_type_id`: string - The unique idenfitier of the action plan type. e.g. `1`
  - `observations_category_id`: string - The unique identifier of the observations category. e.g. `1`
  - `projects`: array of object - An array of projects that are associated with the configurable field set.
    - `id`: string - The unique identifier of the project. e.g. `1`
    - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/configurable_field_sets/{id}/projects

**List Configurable Field Set Projects**
Returns projects available for the specified configurable field set to be assigned to.  Also specifies what if any fieldset a project is already assigned to

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Configurable Field Set ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `with_name` [query] string - Filter by project name, project number or display name which contains the given text.
- `starts_with` [query] string - Filter by project name, project number or display name starts with the given text.

Response 200 (application/json): object

- `data`: array of object - Array of projects accessible on this configurable field set
  - `id`: string - Unique identifier for the project. e.g. `99`
  - `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
  - `assigned`: boolean - Indicates whether the configurable field set is assigned to the project e.g. `true`
  - `configurable_field_set_name`: string - Configurable Field Set Name e.g. `Observation Fields`
- `meta`: object - Metadata properties on this endpoint
  - `associated_total`: string - Number of projects that are associated to the Field Set e.g. `13`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/configurable_field_sets/{id}/projects

**Update Configurable Field Set Projects**
Assigns or unassigns a configurable field set to projects

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Configurable Field Set ID
- `category` [query] string enum[quality, safety, commissioning, warranty, work_to_complete] - Required and only needed when associating projects for an Observations Configurable Field Set.(0 = quality, 1 = safety, 2 = commissioning, 3 = warranty, 4 = work to complete)

Request body (application/json):

- `include_all_projects`: boolean e.g. `true`
- `exclude_all_projects`: boolean e.g. `false`
- `project_ids`: array of integer (required)
- `excluded_project_ids`: array of integer

Response 201: Created (no body)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/configurable_field_sets/{id}/validations

**Validate Custom Fields Values With Configurable Field Set**
Returns validation failure/success messages for values supplied to custom fields within the configurable field set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Configurable Field Set ID
- `project_id` [query] string - Project ID

Request body (application/json):

- `attributes`: object (required) - An object with configurable & custom field keys and values to be validated. This is for example purposes only.
  - `custom_field_47393`: string - The value to be validated for custom field with id 47393 e.g. `A value`
  - `custom_field_58238`: integer - The value to be validated for custom field with id 58238 e.g. `123213`
  - `title`: string - The value to be validated for configurable field "title" e.g. `A general title`
  - `number`: integer - The value value to be validated for configurable field "number" e.g. `12345`

Response 200 (application/json): object

- `data`: object
  - `valid`: boolean - True = attributes is valid, errors is empty, False = invalid, errors not empty e.g. `false`
  - `errors`: object - Errors on fields, empty object if valid is true
    - `custom_field_47393`: array of string - An array of validation failure messages.
    - `custom_field_58238`: array of string - An array of validation failure messages.
    - `number`: array of string - An array of validation failure messages.

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/configurable_field_sets/{id}/project_options

**List Configurable Field Set Project options**
Returns projects available for the specified configurable field set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `id` [path] integer (required) - Configurable Field Set ID
- `with_name` [query] string - Filter by project name, project number or display name which contains the given text.
- `starts_with` [query] string - Filter by project name, project number or display name starts with the given text.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the project. e.g. `99`
- `name`: string - Project Display Name (could include Project Number) e.g. `More Mesa Renovation`
- `assigned`: boolean - Indicates whether the configurable field set is assigned to the project e.g. `true`
- `configurable_field_set_name`: string - Configurable Field Set Name e.g. `Observation Fields`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/configurable_field_sets/{id}/duplicate

**Duplicate a Configurable Field Set and its custom fields**
Returns the newly duplicated configurable field set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Configurable Field Set ID
- `name` [query] string (required) - Name for new fieldset
- `include_custom_fields` [query] boolean - Boolean to dictate if the custom fields are duplicated

Response 200 (application/json): object

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

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/configurable_field_sets  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Configurable Field Sets**
Return a list of all Configurable Field Sets associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `include_lov_entries` [query] boolean - whether or not to include LOV entries in the response (defaults to true)
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[type][]` [query] array of string - Filter by field set type(s). Could be a string or an array of string.
- `filters[generic_tool_id][]` [query] array of integer - Filter by generic tool id(s). Could be a integer or an array of integer.
- `filters[incident_type_id][]` [query] array of integer - Filter by incident type id(s). Could be an integer or an array of integers.
- `view` [query] string - Specify which view to render. Options are common, extended, mobile, or with_project_ids

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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/configurable_field_sets  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Create Configurable Field Sets**
Creates a Configurable Field Set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `include_lov_entries` [query] boolean - whether or not to include LOV entries in the response (defaults to true)

Request body (application/json) (required):

- `configurable_field_set`: object (required)
  - `name`: string (required) - Name e.g. `Observation Form`
  - `class_name`: string enum[Observations::Item, PunchItem, Rfi::Header] (required) - Class Name of the object the Configurable Field Set is applied to
  - `fields`: object (required) - All fields that make up the form of the class name.
    - `field_1`: object - An example of what a field would look like
      - `name`: string (required) - the name of the field e.g. `field_1`
      - `visible`: boolean (required) - whether the field is visible or not in the form e.g. `true`
      - `required`: boolean - Whether or not the field is required e.g. `true`
  - `project_ids`: array of integer
  - `category`: string enum[quality, safety, commissioning, warranty, work_to_complete] - Required and only needed when associating projects for an Observations Configurable Field Set.(0 = quality, 1 = safety, 2 = commissioning, 3 = warranty, 4 = work to complete)
  - `action_plan_type_id`: integer - Action Plan Type unique identifier e.g. `1`
  - `inspection_type_id`: integer - Inspection type unique identifier e.g. `1`
  - `incident_type_id`: integer - Incident type unique identifier e.g. `1`
  - `generic_tool_id`: integer - Generic tool unique identifier e.g. `1`
  - `company_default`: boolean - If the Configurable Field Set is the company default for new projects e.g. `true`
  - `company_configurable_field_set_default_column_name`: string enum[commissioning_configurable_field_set, quality_configurable_field_set, safety_configurable_field_set, warranty_configurable_field_set, work_to_complete_configurable_field_set, rfi_configurable_field_set] - the column name on CompanyConfigurableFieldSetDefault to set the Configurable Field Set as default to. Only needed if company_default is true.

Response 201 (application/json): object

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
    - `company_id`: integer - The company identifier of the custom field. e.g. `999`
    - `label`: string - The label of the custom field definition. e.g. `Worked hours`
    - `description`: string - The description of the custom field definition. e.g. `description`
    - `custom_field_definition_id`: integer - The definition identifier of the custom field. e.g. `999`
    - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the custom field.
    - `variant`: string enum[currency, None] - The variant type of the custom field.
    - `custom_fields_section_id`: integer - The section identifier of the custom field. e.g. `999`
    - `default_value`: string - The default value of the custom field. e.g. `default_value`
    - `host_type`: string - The host type of the custom field. e.g. `Observations::Item`
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
- `deletable`: boolean - Deletable status e.g. `false`
- `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
- `updated_by`: object
  - `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique integer identifier for this user. e.g. `161072`
  - `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
  - `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`
- `inspection_type_id`: integer - The unique identifier of the inspection type. e.g. `1`
- `incident_type_id`: integer - The unique identifier of the incident type. e.g. `1`
- `generic_tool_id`: integer - The unique idenfitier of the generic tool. e.g. `1`
- `action_plan_type_id`: integer - The unique idenfitier of the action plan type. e.g. `1`
- `observations_category_id`: integer - The unique idenfitier of the observations category. e.g. `1`
- `projects`: array of object - An array of projects that are associated with the configurable field set.
  - `id`: integer - The unique identifier of the project. e.g. `1`
  - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/configurable_field_sets/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show Configurable Field Set**
Returns the details for a specified Configurable Field Set

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Configurable Field Set ID

Response 200 (application/json): object

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
    - `company_id`: integer - The company identifier of the custom field. e.g. `999`
    - `label`: string - The label of the custom field definition. e.g. `Worked hours`
    - `description`: string - The description of the custom field definition. e.g. `description`
    - `custom_field_definition_id`: integer - The definition identifier of the custom field. e.g. `999`
    - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the custom field.
    - `variant`: string enum[currency, None] - The variant type of the custom field.
    - `custom_fields_section_id`: integer - The section identifier of the custom field. e.g. `999`
    - `default_value`: string - The default value of the custom field. e.g. `default_value`
    - `host_type`: string - The host type of the custom field. e.g. `Observations::Item`
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
- `deletable`: boolean - Deletable status e.g. `false`
- `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
- `updated_by`: object
  - `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique integer identifier for this user. e.g. `161072`
  - `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
  - `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`
- `inspection_type_id`: integer - The unique identifier of the inspection type. e.g. `1`
- `incident_type_id`: integer - The unique identifier of the incident type. e.g. `1`
- `generic_tool_id`: integer - The unique idenfitier of the generic tool. e.g. `1`
- `action_plan_type_id`: integer - The unique idenfitier of the action plan type. e.g. `1`
- `observations_category_id`: integer - The unique idenfitier of the observations category. e.g. `1`
- `projects`: array of object - An array of projects that are associated with the configurable field set.
  - `id`: integer - The unique identifier of the project. e.g. `1`
  - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/configurable_field_sets/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Update Configurable Field Set**
Updates a Configurable Field Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Configurable Field Set ID

Request body (application/json) (required):

- `configurable_field_set`: object (required)
  - `name`: string (required) - Name e.g. `Observation Form`
  - `fields`: object (required) - All fields that make up the form of the class name.
    - `field_1`: object - An example of what a field would look like
      - `name`: string (required) - the name of the field e.g. `field_1`
      - `visible`: boolean (required) - whether the field is visible or not in the form e.g. `true`
      - `required`: boolean - Whether or not the field is required e.g. `true`
    - `custom_field_1`: object - Existing Custom Fields to be edited for this Configurable Field Set
      - `id`: integer - Custom Field Metadatum ID e.g. `999`
      - `name`: string - The name of the Custom Field e.g. `custom_field_1`
      - `label`: string - The label of the Custom Field Definition e.g. `Worked hours`
      - `description`: string - The description of the Custom Field Definition e.g. `description`
      - `custom_field_definition_id`: integer - Custom Field Definition ID e.g. `999`
      - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the Custom Field
      - `position`: integer - The display position of the Custom Field, which is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column pro... e.g. `999`
      - `required`: boolean - Whether or not the Field is required e.g. `true`
      - `visible`: boolean - Whether or not the Custom Field is visible e.g. `true`
      - `row`: number - Row the Field is position on the Form e.g. `1`
      - `column`: number - Column the Field is position on the Form e.g. `1`
      - `column_width`: number - How many columns the field spans on the Form e.g. `3`
  - `project_ids`: array of integer
  - `category`: string enum[quality, safety, commissioning, warranty, work_to_complete] - Category or observations_category_id are required and only needed when associating projects for an Observations Configurable Field Set. (0 = quality, 1 =safety, 2 = commissioning, 3 = warranty, 4 = work to complete)
  - `observations_category_id`: integer - Category or observations_category_id are required and only needed when associating projects for an Observations Configurable Field Set. (0 = quality, 1 =safety, 2 = commissioning, 3 = warranty, 4 = work to complete)
  - `include_all_projects`: boolean - Whether or not all projects selected e.g. `true`

Response 200 (application/json): object

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
    - `company_id`: integer - The company identifier of the custom field. e.g. `999`
    - `label`: string - The label of the custom field definition. e.g. `Worked hours`
    - `description`: string - The description of the custom field definition. e.g. `description`
    - `custom_field_definition_id`: integer - The definition identifier of the custom field. e.g. `999`
    - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the custom field.
    - `variant`: string enum[currency, None] - The variant type of the custom field.
    - `custom_fields_section_id`: integer - The section identifier of the custom field. e.g. `999`
    - `default_value`: string - The default value of the custom field. e.g. `default_value`
    - `host_type`: string - The host type of the custom field. e.g. `Observations::Item`
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
- `deletable`: boolean - Deletable status e.g. `false`
- `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
- `updated_by`: object
  - `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique integer identifier for this user. e.g. `161072`
  - `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
  - `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`
- `inspection_type_id`: integer - The unique identifier of the inspection type. e.g. `1`
- `incident_type_id`: integer - The unique identifier of the incident type. e.g. `1`
- `generic_tool_id`: integer - The unique idenfitier of the generic tool. e.g. `1`
- `action_plan_type_id`: integer - The unique idenfitier of the action plan type. e.g. `1`
- `observations_category_id`: integer - The unique idenfitier of the observations category. e.g. `1`
- `projects`: array of object - An array of projects that are associated with the configurable field set.
  - `id`: integer - The unique identifier of the project. e.g. `1`
  - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/configurable_field_sets/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Delete Configurable Field Set**
Deletes a Configurable Field Set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Configurable Field Set ID

Response 200: OK (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/configurable_field_sets/find_by_index  **[OLDER VERSION - a newer path version exists below/above]**

**Find Configurable Field Set by Index**
Returns the details for a specified Configurable Field Set if found. If not, template of type Field Set will be returned with ID null.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `type` [query] string (required) - The type of Configurable Field Set
- `project_id` [query] integer - Project ID that is associated to the Configurable Field Set, if applicable
- `scope[category]` [query] integer - Category or observations_category_id are required for an Observations Configurable Field Set (0 = quality, 1 = safety, 2 = commissioning, 3 = warranty, 4 = work to complete)
- `scope[observations_category_id]` [query] integer - Category or observations_category_id Required for an Observations Configurable Field Set
- `scope[inspection_type_id]` [query] integer - Required for an Inspection Configurable Field Set. If a value is provided, only field set of the specific Inspection type is returned. If no value is provided, only field set of unassociated Inspections (Inspections w...
- `scope[incident_type_id]` [query] integer - Required for an Incident Configurable Field Set. If a value is provided, only field set of the specific Incident type is returned.
- `scope[generic_tool_id]` [query] integer - Required for a Generic Tool Item Configurable Field Set (type of ConfigurableFieldSet::GenericToolItem)
- `scope[action_plan_type_id]` [query] integer - Required for an Action Plans Plan Configurable Field Set (type of ConfigurableFieldSet::ActionPlans::Plan)

Response 200 (application/json): object

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
    - `company_id`: integer - The company identifier of the custom field. e.g. `999`
    - `label`: string - The label of the custom field definition. e.g. `Worked hours`
    - `description`: string - The description of the custom field definition. e.g. `description`
    - `custom_field_definition_id`: integer - The definition identifier of the custom field. e.g. `999`
    - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the custom field.
    - `variant`: string enum[currency, None] - The variant type of the custom field.
    - `custom_fields_section_id`: integer - The section identifier of the custom field. e.g. `999`
    - `default_value`: string - The default value of the custom field. e.g. `default_value`
    - `host_type`: string - The host type of the custom field. e.g. `Observations::Item`
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
- `deletable`: boolean - Deletable status e.g. `false`
- `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
- `updated_by`: object
  - `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique integer identifier for this user. e.g. `161072`
  - `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
  - `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`
- `inspection_type_id`: integer - The unique identifier of the inspection type. e.g. `1`
- `incident_type_id`: integer - The unique identifier of the incident type. e.g. `1`
- `generic_tool_id`: integer - The unique idenfitier of the generic tool. e.g. `1`
- `action_plan_type_id`: integer - The unique idenfitier of the action plan type. e.g. `1`
- `observations_category_id`: integer - The unique idenfitier of the observations category. e.g. `1`
- `projects`: array of object - An array of projects that are associated with the configurable field set.
  - `id`: integer - The unique identifier of the project. e.g. `1`
  - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/configurable_field_sets/{id}/validations  **[OLDER VERSION - a newer path version exists below/above]**

**Validate Custom Fields Values With Configurable Field Set**
Returns validation failure/success messages for values supplied to custom fields within the configurable field set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Configurable Field Set ID
- `project_id` [query] integer - Project ID

Request body (application/json):

- `attributes`: object (required) - An object with configurable & custom field keys and values to be validated. This is for example purposes only.
  - `custom_field_47393`: string - The value to be validated for custom field with id 47393 e.g. `A value`
  - `custom_field_58238`: integer - The value to be validated for custom field with id 58238 e.g. `123213`
  - `title`: string - The value to be validated for configurable field "title" e.g. `A general title`
  - `number`: integer - The value value to be validated for configurable field "number" e.g. `12345`

Response 200 (application/json): object

- `valid`: boolean - True = attributes is valid, errors is empty, False = invalid, errors not empty e.g. `false`
- `errors`: object - Errors on fields, empty object if valid is true
  - `custom_field_47393`: array of string - An array of validation failure messages.
  - `custom_field_58238`: array of string - An array of validation failure messages.
  - `number`: array of string - An array of validation failure messages.

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/configurable_field_sets  **[OLDER VERSION - a newer path version exists below/above]**

**List Project Configurable Field Sets**
Return a list of all Configurable Field Sets associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `include_lov_entries` [query] boolean - whether or not to include LOV entries in the response (defaults to true)
- `types[]` [query] array of string - Filter by of configurable field set types
- `include_default_configurable_field_sets` [query] boolean - Flag to include the default values for each type of Configurable Field Set if one has not been created.
- `generic_tool_id` [query] integer - Filter by generic tool id(s). Could be a integer or an array of integer.
- `action_plan_type_id` [query] integer - Filter by Action Plan type id.
- `inspection_type_id` [query] integer - Filter by inspection type id.
- `incident_type_id` [query] integer - Filter by incident type id.
- `observations_category_id` [query] string - Filter by observations category id.
- `category` [query] string - Filter by category.

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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/custom_fields/{tool_name}/user_options  **[OLDER VERSION - a newer path version exists below/above]**

**List Custom Fields User options**
Returns login informations that have access to the specified tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `tool_name` [path] string enum[submittal_log, drawing_log, specification_sections, document_service] (required) - Tool name identifier
- `filters[search]` [query] string - filters results by the search query
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this user. Use as a value in the `user_ids` array when updating the default distribution list. e.g. `160586`
- `login`: string - Email address used to log in to Procore. Uniquely identifies the account. e.g. `carl.contractor@example.com`
- `name`: string - Full display name of the user. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of this user (e.g. `en`, `fr`). Null if the user has not set a locale preference. e.g. `en`
- `company_name`: string - Display name of the company this user is associated with. e.g. `Company ABC`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Correspondences

Resource id: `correspondences`. Raw spec: `../openapi-raw/correspondences.json`. Web: https://developers.procore.com/reference/rest/correspondences?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/generic_tools/{generic_tool_id}/statuses

**List Statuses for a Generic Tool**
Returns a list of all Statuses for a Generic Tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `5324`
- `status_name`: string - Status Name e.g. `In Review`
- `status`: string - Status e.g. `Open`
- `is_used`: boolean - Is Used in generic tool item or workflow e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/generic_tools/{generic_tool_id}/statuses

**Create Generic Tool Status**
Create a new Generic Tool Status for the specified Generic Tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool

Request body (application/json) (required):

- `generic_tool_status`: object (required)
  - `status_name`: string (required) - The name of the generic tool status. e.g. `In Review`
  - `status`: string (required) - The status of the generic tool status. e.g. `Open`

Response 201 (application/json): object

- `id`: integer - ID e.g. `5324`
- `status_name`: string - Status Name e.g. `In Review`
- `status`: string - Status e.g. `Open`
- `is_used`: boolean - Is Used in generic tool item or workflow e.g. `true`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/generic_tools/{generic_tool_id}/statuses/{id}

**Delete Generic Tool Status**
Delete the specified Generic Tool Status. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `id` [path] integer (required) - Unique identifier for the Status

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/generic_tools

**List Generic Tools**
Returns a list of all Generic Tools in the specified Company.
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[project_id]` [query] integer - Return item(s) with the Project ID.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the generic tool. e.g. `5324`
- `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
- `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
- `private_by_default`: boolean - If true, items created in the tool are private by default. e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/generic_tools

**Create Generic Tool**
Create a new Generic Tool in the specified Company. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `generic_tool`: object (required)
  - `title`: string (required) - The title of the generic tool. e.g. `My Custom Tool`
  - `abbreviation`: string - An abbreviation for the generic tool. e.g. `CT`
  - `private_by_default`: boolean - If this property is set to true, any items that are created for the tool are private by default.
  - `new_project_default`: boolean - If this property is set to true, the generic tool will be added to new projects by default.
  - `send_overdue_notifications`: boolean - If this property is set to true, notifications will be sent to assignees when an item is overdue.

Response 201 (application/json): object

- `id`: integer - Unique identifier for the generic tool. e.g. `5324`
- `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
- `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
- `private_by_default`: boolean - If true, items created in the tool are private by default. e.g. `true`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/generic_tools/{generic_tool_id}

**Update Generic Tool**
Update a Generic Tool's attributes. For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool.

Request body (application/json) (required):

- `generic_tool`: object (required)
  - `title`: string (required) - The title of the generic tool. e.g. `My Custom Tool`
  - `abbreviation`: string - An abbreviation for the generic tool. e.g. `CT`
  - `private_by_default`: boolean - If this property is set to true, any items that are created for the tool are private by default.
  - `new_project_default`: boolean - If this property is set to true, the generic tool will be added to new projects by default.
  - `send_overdue_notifications`: boolean - If this property is set to true, notifications will be sent to assignees when an item is overdue.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the generic tool. e.g. `5324`
- `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
- `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
- `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/correspondence_type_items

**List Correspondence Type Items**
Returns a list of all Correspondence Type Items in the specified Project. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[login_information_id]` [query] array of integer - Array of Login Information IDs. Returns item(s) with the specified Login Information ID.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[overdue]` [query] boolean - If true, returns item(s) that are overdue.
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[recycle_bin]` [query] boolean - If true, returns item(s) that have been deleted.
- `filters[generic_tool_id]` [query] array of integer - Return item(s) within the specified Generic Tool ID(s)
- `filters[received_from_id]` [query] integer - Received From ID
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[closed_at]` [query] string(date) - Returns item(s) closed within the specified ISO 8601 datetime range.
- `filters[issued_at]` [query] string - Returns item(s) issued within the specified ISO 8601 datetime range.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `filters[location_id]` [query] integer - Filters by specific location (Note: Use *either* this or location_id_with_sublocations, but not both)
- `sort` [query] string enum[due_date, login_information, position, status, title, updated_at, created_at] - Field to sort by. If the field is passed with a - (EX: -updated_at) it is sorted in reverse order
- `group` [query] string enum[generic_tool_title, none] - Controls if the Items are returned sorted by the sort attribute then the Generic Tool's Title or just the sort attribute. Defaults to 'generic_tool_title'.
- `view` [query] string enum[extended, compact, ids_only, flatten_v0] - Defines the type of view returned. Must be one of 'extended', 'compact', 'ids_only', or 'flatten_v0'.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the Generic Tool Item e.g. `85`
- `closed_at`: string(date-time) - Generic Tool Item closed at e.g. `2016-08-08T21:35:58Z`
- `created_at`: string(date-time) - Generic Tool Item created at e.g. `2016-08-08T21:35:58Z`
- `description`: string - Description of a Generic Tool Item e.g. `This is a description.`
- `due_date`: string(date) - Generic Tool Item Due Date e.g. `2016-08-08`
- `issued_at`: string(date-time) - Generic Tool Item issued at e.g. `2016-08-08T21:35:58Z`
- `origin_generic_tool_item_id`: integer - Origin Generic Tool Item ID e.g. `9`
- `origin_rfi_id`: integer - Origin RFI ID e.g. `14`
- `position`: string - The Number of the Generic Tool Item e.g. `A1`
- `private`: boolean - If the Generic Tool Item is private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: number(float) - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `75.5`
- `updated_at`: string(date-time) - Generic Tool Item updated at e.g. `2016-08-08T21:35:58Z`
- `status`: string - Status of the Generic Tool Item e.g. `open`
- `status_type`: string enum[Open, Closed, Draft] - The default status the Generic Tool Item's status is mapped to. e.g. `Open`
- `title`: string - Title of the Generic Tool Item e.g. `This is the title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `tasks`: array of object - Tasks
  - `id`: integer - Task ID e.g. `999`
  - `name`: string - Full Task name e.g. `01 - Closeout`
  - `task_name`: string - Task name e.g. `Closeout`
  - `key`: string - Task Key e.g. `A101`
- `sub_job`: object
  - `id`: integer - Sub Job ID e.g. `999`
  - `name`: string - Sub Job Name e.g. `Garage`
  - `Code`: string - Sub Job Code e.g. `1`
- `generic_tool`: object
  - `id`: integer - Unique identifier for the generic tool. e.g. `5324`
  - `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
  - `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
  - `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `document_management_document_revision_ids`: array of string - PDM document revision IDs e.g. `["51GW47XAV5N64CQ2F8HTWFW0M4", "51H5MADM07T70B3DAK6X2TFVB0"]`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `assignees`: array of object - Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/correspondence_type_items

**Batch Update Correspondence Type Items**
Update all specified Correspondence Type Items. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Defines whether to update items that can be, or none if at least one item can not be updated. Defaults to 'all_or_nothing'.

Request body (application/json) (required):

- `generic_tool_items`: array of object (required)
  - `id`: integer (required) - The unique idenfitier of the generic tool item. e.g. `123`
  - `due_date`: string(date) - The due date for the generic tool item. e.g. `2020-08-31`
  - `private`: boolean - If this property is set to true, the generic tool item is private. If this property is set to false, the generic tool item is not private.
  - `schedule_impact`: string - The schedule impact of the generic tool item. e.g. `no_impact`
  - `cost_impact`: string - The cost impact of the generic tool item. e.g. `no_impact`
  - `status`: string - The status of the generic tool item. e.g. `Open`
  - `assignee_ids`: array of integer
  - `received_from_id`: integer - The unique identifier for the Received From entity for the generic tool item. e.g. `84674967`
  - `location_id`: integer - The location identifier for the generic tool item. e.g. `1032218`
  - `cost_code_id`: integer - The cost code identifier for the generic tool item. e.g. `78261048`
  - `specification_section_id`: integer - The specification section identifier for the generic tool item. e.g. `7855556`
  - `sub_job_id`: integer - The sub job identifier for the generic tool item. e.g. `7855556`
  - `trade_ids`: array of integer
  - `task_ids`: array of integer

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/correspondence_types/defaults

**List Correspondence Type Defaults**
Returns a list of all Correspondence Types Defaults for the specificied Project. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[generic_tool_id]` [query] array of integer - Return item(s) within the specified Generic Tool ID(s)
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer e.g. `1`
- `correspondence_type_id`: integer e.g. `1`
- `description`: string e.g. `A description`
- `due_days`: integer e.g. `1`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `available_statuses`: array of string
- `statuses`: array of object - Statuses
  - `name`: string e.g. `In Progress`
  - `status`: string e.g. `Draft`
- `private_by_default`: boolean e.g. `true`
- `workflows_enabled`: boolean e.g. `false`
- `has_workflow_instances`: boolean - Whether any item of this type already has a workflow, regardless of whether a workflow template is currently assigned. Unlike workflows_enabled, this does not indicate that a new workflow can be started. e.g. `false`
- `workflow_has_missing_configuration`: boolean e.g. `false`
- `workflow_preset_config_url`: string e.g. `false`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/correspondence_types/permissions

**List Correspondence Type Permissions**
Returns a list of all Correspondence Types Permissions for the requesting User in the specificied Project.  Granular Permissions that are granted via UAL and are force-checked are not included in the list.
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer e.g. `1`
- `name`: string e.g. `documents`
- `friendly_name`: string e.g. `Documents`
- `domain_id`: integer e.g. `14`
- `tab_group`: string e.g. `core`
- `available_for_user`: boolean e.g. `true`
- `url`: string e.g. `/10/project/documents`
- `user_access_level`: object
  - `id`: integer - access level
  - `name`: string - friendly name for level
  - `permitted_actions`: object - actions supported by access level by tool
- `permitted_actions`: array of object
  - `id`: integer e.g. `12`
  - `action_name`: string e.g. `destroy_files_and_folders`
  - `label`: string e.g. `Delete folders and files`
  - `tool_name`: string e.g. `documents`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/correspondence_types/users

**List Correspondence Type Users**
Returns a list of all Correspondence Types Users Availability for the specificied Project. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer e.g. `1`
- `name`: string e.g. `John`
- `company`: object
  - `id`: integer - Unique identifier for the company. e.g. `160583`
  - `name`: string - Name e.g. `Company ABC`
- `generic_tools`: array of object
  - `id`: integer e.g. `3`
  - `potential_assignee`: boolean e.g. `true`
  - `potential_received_from`: boolean e.g. `true`
  - `potential_distribution_member`: boolean e.g. `true`
  - `custom_fields`: object

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/custom_tools/users

**List Custom Tool Users**
Returns a list of all Custom Tools Users Availability for the specificied Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer e.g. `1`
- `name`: string e.g. `John`
- `company`: object
  - `id`: integer - Unique identifier for the company. e.g. `160583`
  - `name`: string - Name e.g. `Company ABC`
- `generic_tools`: array of object
  - `id`: integer e.g. `3`
  - `potential_assignee`: boolean e.g. `true`
  - `potential_received_from`: boolean e.g. `true`
  - `potential_distribution_member`: boolean e.g. `true`
  - `custom_fields`: object

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/generic_tool_item_responses

**List Responses for a Generic Tool Item**
Returns a list of all responses for a generic tool item in the specified project and generic tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the generic tool.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the generic tool item.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Drawing Upload ID e.g. `85`
- `notes`: string - The text of the Response e.g. `This is a response.`
- `created_at`: string(date-time) - Generic Tool Item Response created at e.g. `2016-08-08T21:35:58Z`
- `official`: boolean - If the response is an Official Response e.g. `true`
- `position`: integer - Position of the Response e.g. `3`
- `status`: string - Status of the Generic Tool Item Response e.g. `open`
- `created_by`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `download_all_attachments_url`: string - URL for downloading all of the response's prostore-file attachments as a single zip. Only present when the response has at least 2 prostore-file attachments; null otherwise. PDM (document_management_document_revision)... e.g. `https://api.procore.com/rest/v1.0/projects/1/generic_tools/2/generic_tool_ite...`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/generic_tool_item_responses

**Create generic tool item response.**
Create a new response for a generic tool item in the specified project and generic tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the generic tool.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the generic tool item.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `generic_tool_item_response`: object (required)
  - `notes`: string - The notes property.
  - `official`: boolean - If this property is set to true, the response is an official response. If this property is set to false, the response is not an official response.
  - `skip_emails`: boolean - If true creating the response will not send emails to the users on the item.
  - `attachments`: array of string - Specifies the Generic Tool Item Response attachments. To upload attachments you must upload the entire payload as a `multipart/form-data` content-type and specify each parameter as form-data together with `attachments...
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - Drawing Upload ID e.g. `85`
- `notes`: string - The text of the Response e.g. `This is a response.`
- `created_at`: string(date-time) - Generic Tool Item Response created at e.g. `2016-08-08T21:35:58Z`
- `official`: boolean - If the response is an Official Response e.g. `true`
- `position`: integer - Position of the Response e.g. `3`
- `status`: string - Status of the Generic Tool Item Response e.g. `open`
- `created_by`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `download_all_attachments_url`: string - URL for downloading all of the response's prostore-file attachments as a single zip. Only present when the response has at least 2 prostore-file attachments; null otherwise. PDM (document_management_document_revision)... e.g. `https://api.procore.com/rest/v1.0/projects/1/generic_tools/2/generic_tool_ite...`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/generic_tool_item_responses/{id}/download_all_attachments

**Download All Response Attachments**
Downloads all of the response's prostore-file attachments as a single zip. Creates an asynchronous zip manifest server-side and 302 redirects to the streaming URL for the resulting zip. Responds with 422 when the response has fewer than 2 attachments in total (ProStore + PDM) or when it has no prostore-file attachments to bundle. PDM (document_management_document_revision) attachments are counted toward that threshold but are not currently included in the resulting zip.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the generic tool
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the generic tool item
- `id` [path] integer (required) - Unique identifier for the response
- `project_id` [path] integer (required) - Unique identifier for the project.

Error responses: 302, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/generic_tool_item_responses/{id}

**Update Generic Tool Item Response**
Update attributes on a generic tool item response. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the generic tool
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the generic tool item
- `id` [path] integer (required) - Unique identifier for the response
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `generic_tool_item_response`: object (required)
  - `official`: boolean - If this property is set ot true, the response is an official response. If this property is set to false, the response is not an official response.

Response 200 (application/json): object

- `id`: integer - Drawing Upload ID e.g. `85`
- `notes`: string - The text of the Response e.g. `This is a response.`
- `created_at`: string(date-time) - Generic Tool Item Response created at e.g. `2016-08-08T21:35:58Z`
- `official`: boolean - If the response is an Official Response e.g. `true`
- `position`: integer - Position of the Response e.g. `3`
- `status`: string - Status of the Generic Tool Item Response e.g. `open`
- `created_by`: object
  - `id`: integer - The unique identifier of the user. e.g. `160586`
  - `login`: string - The email address of the user that is used to log in. e.g. `carl.contractor@example.com`
  - `name`: string - The name of the user. e.g. `Carl the Contractor`
  - `company_name`: string - User's Company Name e.g. `Company ABC`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `download_all_attachments_url`: string - URL for downloading all of the response's prostore-file attachments as a single zip. Only present when the response has at least 2 prostore-file attachments; null otherwise. PDM (document_management_document_revision)... e.g. `https://api.procore.com/rest/v1.0/projects/1/generic_tools/2/generic_tool_ite...`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/change_histories

**List Change History for a Generic Tool Item**
Returns a list of all change histories for a generic tool item in the specified project and generic tool.
For more information on Generic Tool and Correspondence Tool endpoints,
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the generic tool.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the generic tool item.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of this change history entry. e.g. `101`
- `column`: string - Internal column name of the field that was changed. e.g. `assignee_id`
- `readable_column`: string - Localized, human-readable name of the field that was changed, translated to the requested locale. e.g. `Assignee`
- `formatted_column`: string - Human-readable name of the field that was changed, in the default locale. e.g. `Assignee`
- `old_value`: string - Previous value of the field. Null if the field was not previously set. e.g. `The original title`
- `new_value`: string - New value of the field. e.g. `The updated title`
- `created_by`: object
  - `id`: integer - Unique identifier of the user who made the change. e.g. `160586`
  - `login`: string - Email address (login) of the user who made the change. e.g. `carl.contractor@example.com`
  - `name`: string - Full name of the user who made the change. e.g. `Carl the Contractor`
  - `locale`: string - Locale preference of the user who made the change. Null if not set. e.g. `en-GB`
  - `company_name`: string - Name of the company the user belongs to. e.g. `Company ABC`
- `created_at`: string(date-time) - Timestamp when this change was recorded, in ISO 8601 format. e.g. `2018-05-08T13:21:20Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items

**List generic tool items**
Returns a list of all Generic Tool Items in the specified Project and Generic Tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended] - If supplied customize the response format
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[login_information_id]` [query] array of integer - Array of Login Information IDs. Returns item(s) with the specified Login Information ID.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[overdue]` [query] boolean - If true, returns item(s) that are overdue.
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[recycle_bin]` [query] boolean - If true, returns item(s) that have been deleted.
- `filters[received_from_id]` [query] integer - Received From ID
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[closed_at]` [query] string(date) - Returns item(s) closed within the specified ISO 8601 datetime range.
- `filters[issued_at]` [query] string - Returns item(s) issued within the specified ISO 8601 datetime range.
- `filters[vendor_id]` [query] integer - Return item(s) with the specified Vendor ID.
- `sort` [query] string enum[due_date, login_information, position, status, title, updated_at, created_at] - Field to sort by. If the field is passed with a - (EX: -updated_at) it is sorted in reverse order

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the Generic Tool Item e.g. `85`
- `closed_at`: string(date-time) - Generic Tool Item closed at e.g. `2016-08-08T21:35:58Z`
- `created_at`: string(date-time) - Generic Tool Item created at e.g. `2016-08-08T21:35:58Z`
- `description`: string - Description of a Generic Tool Item e.g. `This is a description.`
- `due_date`: string(date) - Generic Tool Item Due Date e.g. `2016-08-08`
- `issued_at`: string(date-time) - Generic Tool Item issued at e.g. `2016-08-08T21:35:58Z`
- `origin_generic_tool_item_id`: integer - Origin Generic Tool Item ID e.g. `9`
- `origin_rfi_id`: integer - Origin RFI ID e.g. `14`
- `position`: string - The Number of the Generic Tool Item e.g. `A1`
- `private`: boolean - If the Generic Tool Item is private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: number(float) - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `75.5`
- `updated_at`: string(date-time) - Generic Tool Item updated at e.g. `2016-08-08T21:35:58Z`
- `status`: string - Status of the Generic Tool Item e.g. `open`
- `status_type`: string enum[Open, Closed, Draft] - The default status the Generic Tool Item's status is mapped to. e.g. `Open`
- `title`: string - Title of the Generic Tool Item e.g. `This is the title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `tasks`: array of object - Tasks
  - `id`: integer - Task ID e.g. `999`
  - `name`: string - Full Task name e.g. `01 - Closeout`
  - `task_name`: string - Task name e.g. `Closeout`
  - `key`: string - Task Key e.g. `A101`
- `sub_job`: object
  - `id`: integer - Sub Job ID e.g. `999`
  - `name`: string - Sub Job Name e.g. `Garage`
  - `Code`: string - Sub Job Code e.g. `1`
- `generic_tool`: object
  - `id`: integer - Unique identifier for the generic tool. e.g. `5324`
  - `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
  - `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
  - `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `document_management_document_revision_ids`: array of string - PDM document revision IDs e.g. `["51GW47XAV5N64CQ2F8HTWFW0M4", "51H5MADM07T70B3DAK6X2TFVB0"]`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `assignees`: array of object - Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items

**Create Generic Tool Item**
Create a new Generic Tool Item in the specified Project and Generic Tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended] - If supplied customize the response format

Request body (application/json) (required):

- `generic_tool_item`: object (required)
  - `description`: string - The description of the generic tool item. e.g. `Ready for review/approval on finishes.`
  - `due_date`: string(date) - The due date for the generic tool item. e.g. `2020-08-31`
  - `position`: string - The position/number of the generic tool item. e.g. `interior-002`
  - `private`: boolean - If this property is set to true, the generic tool item is private. If this property is set to false, the generic tool item is not private.
  - `skip_emails`: boolean - If true creating and updating the item will not send emails to the users on the item.
  - `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The schedule impact status for the generic tool item. e.g. `no_impact`
  - `schedule_impact_value`: string - Specifies a value for the schedue impact of the generic tool item. e.g. `none`
  - `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The cost impact of the generic tool item. e.g. `no_impact`
  - `cost_impact_value`: string - Specifies a value for the cost impact of the generic tool item. e.g. `none`
  - `status`: string - The status of the generic tool item. e.g. `Open`
  - `title`: string - The title of the generic tool item. e.g. `Interior Finishes`
  - `received_from_id`: integer - The unique identifier for the Received From entity. e.g. `1386682`
  - `location_id`: integer - The location identifier for the generic tool item. e.g. `1234`
  - `cost_code_id`: integer - The cost code identifier for the generic tool item. e.g. `78261048`
  - `specification_section_id`: integer - The specification section identifier for the generic tool item. e.g. `782356`
  - `trade_id`: integer - The trade identifier for the generic tool item. e.g. `779365`
  - `distribution_member_ids`: array of integer - An array of distribution member identifiers for the generic tool item.
  - `assignee_ids`: array of integer - An array of assignee identifiers for the generic tool item.
  - `attachments`: array of object - Specifies an array of generic tool item attachments. To upload attachments you must upload the entire payload as a `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[...
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the Generic Tool Item e.g. `85`
- `closed_at`: string(date-time) - Generic Tool Item closed at e.g. `2016-08-08T21:35:58Z`
- `created_at`: string(date-time) - Generic Tool Item created at e.g. `2016-08-08T21:35:58Z`
- `description`: string - Description of a Generic Tool Item e.g. `This is a description.`
- `due_date`: string(date) - Generic Tool Item Due Date e.g. `2016-08-08`
- `issued_at`: string(date-time) - Generic Tool Item issued at e.g. `2016-08-08T21:35:58Z`
- `origin_generic_tool_item_id`: integer - Origin Generic Tool Item ID e.g. `9`
- `origin_rfi_id`: integer - Origin RFI ID e.g. `14`
- `position`: string - The Number of the Generic Tool Item e.g. `A1`
- `private`: boolean - If the Generic Tool Item is private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: number(float) - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `75.5`
- `updated_at`: string(date-time) - Generic Tool Item updated at e.g. `2016-08-08T21:35:58Z`
- `status`: string - Status of the Generic Tool Item e.g. `open`
- `status_type`: string enum[Open, Closed, Draft] - The default status the Generic Tool Item's status is mapped to. e.g. `Open`
- `title`: string - Title of the Generic Tool Item e.g. `This is the title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `tasks`: array of object - Tasks
  - `id`: integer - Task ID e.g. `999`
  - `name`: string - Full Task name e.g. `01 - Closeout`
  - `task_name`: string - Task name e.g. `Closeout`
  - `key`: string - Task Key e.g. `A101`
- `sub_job`: object
  - `id`: integer - Sub Job ID e.g. `999`
  - `name`: string - Sub Job Name e.g. `Garage`
  - `Code`: string - Sub Job Code e.g. `1`
- `generic_tool`: object
  - `id`: integer - Unique identifier for the generic tool. e.g. `5324`
  - `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
  - `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
  - `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `document_management_document_revision_ids`: array of string - PDM document revision IDs e.g. `["51GW47XAV5N64CQ2F8HTWFW0M4", "51H5MADM07T70B3DAK6X2TFVB0"]`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `assignees`: array of object - Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
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

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items

**Batch Update Generic Tool Items**
Update all selected Generic Tool Items. For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended] - If supplied customize the response format
- `completion_mode` [query] string enum[all_or_nothing, atomic] - Whether to update what can be or nothing if one can not be updated. Defaults to "all_or_nothing"
- `run_configurable_validations` [query] boolean - Whether to run configurable validations during the update operation. Defaults to false.

Request body (application/json) (required):

- `generic_tool_items`: array of object (required)
  - `id`: integer (required) - The unique idenfitier of the generic tool item. e.g. `123`
  - `due_date`: string(date) - The due date for the generic tool item. e.g. `2020-08-31`
  - `private`: boolean - If this property is set to true, the generic tool item is private. If this property is set to false, the generic tool item is not private.
  - `schedule_impact`: string - The schedule impact of the generic tool item. e.g. `no_impact`
  - `schedule_impact_value`: string - Specifies a value for the schedue impact of the generic tool item. e.g. `none`
  - `cost_impact`: string - The cost impact of the generic tool item. e.g. `no_impact`
  - `cost_impact_value`: string - Specifies a value for the cost impact of the generic tool item. e.g. `none`
  - `status`: string - The status of the generic tool item. e.g. `Open`
  - `assignee_ids`: array of integer
  - `received_from_id`: integer - The unique identifier for the Received From entity for the generic tool item. e.g. `84674967`
  - `location_id`: integer - The location identifier for the generic tool item. e.g. `1032218`
  - `cost_code_id`: integer - The cost code identifier for the generic tool item. e.g. `78261048`
  - `specification_section_id`: integer - The specification section identifier for the generic tool item. e.g. `7855556`
  - `sub_job_id`: integer - The sub job identifier for the generic tool item. e.g. `7855543`
  - `trade_ids`: array of integer
  - `task_ids`: array of integer
  - `quantity`: integer - The quantity of the generic tool item. e.g. `7855543`
  - `uom`: string - Unit of measure for the quantity field e.g. `ea`
  - `trade_id`: integer - The trade identifier for the generic tool item. e.g. `779365`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): array of array of object


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/available_statuses

**List statuses available for a generic tool**
Returns a list of all available statuses in the specified Project and Generic Tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `name`: string - Status name e.g. `Open`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/available_read_users

**List Users with access to a generic tool**
Returns a list of all Users in the specified Project and Generic Tool. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[query]` [query] string - Return item(s) containing search query

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this user. Use as a value in the `user_ids` array when updating the default distribution list. e.g. `160586`
- `login`: string - Email address used to log in to Procore. Uniquely identifies the account. e.g. `carl.contractor@example.com`
- `name`: string - Full display name of the user. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of this user (e.g. `en`, `fr`). Null if the user has not set a locale preference. e.g. `en`
- `company_name`: string - Display name of the company this user is associated with. e.g. `Company ABC`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{id}/download_all_attachments

**Download All Generic Tool Item Attachments**
Downloads all of the generic tool item's prostore-file attachments as a single zip. Creates an asynchronous zip manifest server-side and 302 redirects to the streaming URL for the resulting zip. Responds with 422 when the item has fewer than 2 attachments in total (ProStore + PDM) or when it has no prostore-file attachments to bundle. PDM (document_management_document_revision) attachments are counted toward that threshold but are not currently included in the resulting zip.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Generic Tool Item
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.

Error responses: 302, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}

**Show Generic Tool Item**
Get the details of a single Generic Tool Item. 
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the Generic Tool Item
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended, web, with_permissions, procore_search] - If supplied customize the response format

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Generic Tool Item e.g. `85`
- `closed_at`: string(date-time) - Generic Tool Item closed at e.g. `2016-08-08T21:35:58Z`
- `created_at`: string(date-time) - Generic Tool Item created at e.g. `2016-08-08T21:35:58Z`
- `description`: string - Description of a Generic Tool Item e.g. `This is a description.`
- `due_date`: string(date) - Generic Tool Item Due Date e.g. `2016-08-08`
- `issued_at`: string(date-time) - Generic Tool Item issued at e.g. `2016-08-08T21:35:58Z`
- `origin_generic_tool_item_id`: integer - Origin Generic Tool Item ID e.g. `9`
- `origin_rfi_id`: integer - Origin RFI ID e.g. `14`
- `position`: string - The Number of the Generic Tool Item e.g. `A1`
- `private`: boolean - If the Generic Tool Item is private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: number(float) - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `75.5`
- `updated_at`: string(date-time) - Generic Tool Item updated at e.g. `2016-08-08T21:35:58Z`
- `status`: string - Status of the Generic Tool Item e.g. `open`
- `status_type`: string enum[Open, Closed, Draft] - The default status the Generic Tool Item's status is mapped to. e.g. `Open`
- `title`: string - Title of the Generic Tool Item e.g. `This is the title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `tasks`: array of object - Tasks
  - `id`: integer - Task ID e.g. `999`
  - `name`: string - Full Task name e.g. `01 - Closeout`
  - `task_name`: string - Task name e.g. `Closeout`
  - `key`: string - Task Key e.g. `A101`
- `sub_job`: object
  - `id`: integer - Sub Job ID e.g. `999`
  - `name`: string - Sub Job Name e.g. `Garage`
  - `Code`: string - Sub Job Code e.g. `1`
- `generic_tool`: object
  - `id`: integer - Unique identifier for the generic tool. e.g. `5324`
  - `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
  - `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
  - `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `document_management_document_revision_ids`: array of string - PDM document revision IDs e.g. `["51GW47XAV5N64CQ2F8HTWFW0M4", "51H5MADM07T70B3DAK6X2TFVB0"]`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `assignees`: array of object - Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}

**Update Generic Tool Item**
Update a Generic Tool Item's attributes. For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the Generic Tool Item
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended, with_permissions, ids_only, flatten_v0] - If supplied customize the response format

Request body (application/json) (required):

- `generic_tool_item`: object (required)
  - `description`: string - The description of the generic tool item. e.g. `Ready for review/approval on finishes.`
  - `due_date`: string(date) - The due date for the generic tool item. e.g. `2020-08-31`
  - `position`: string - The position/number of the generic tool item. e.g. `interior-002`
  - `private`: boolean - If this property is set to true, the generic tool item is private. If this property is set to false, the generic tool item is not private.
  - `skip_emails`: boolean - If true creating and updating the item will not send emails to the users on the item.
  - `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The schedule impact status for the generic tool item. e.g. `no_impact`
  - `schedule_impact_value`: string - Specifies a value for the schedue impact of the generic tool item. e.g. `none`
  - `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The cost impact of the generic tool item. e.g. `no_impact`
  - `cost_impact_value`: string - Specifies a value for the cost impact of the generic tool item. e.g. `none`
  - `status`: string - The status of the generic tool item. e.g. `Open`
  - `title`: string - The title of the generic tool item. e.g. `Interior Finishes`
  - `received_from_id`: integer - The unique identifier for the Received From entity. e.g. `1386682`
  - `location_id`: integer - The location identifier for the generic tool item. e.g. `1234`
  - `cost_code_id`: integer - The cost code identifier for the generic tool item. e.g. `78261048`
  - `specification_section_id`: integer - The specification section identifier for the generic tool item. e.g. `782356`
  - `trade_id`: integer - The trade identifier for the generic tool item. e.g. `779365`
  - `distribution_member_ids`: array of integer - An array of distribution member identifiers for the generic tool item.
  - `assignee_ids`: array of integer - An array of assignee identifiers for the generic tool item.
  - `attachments`: array of object - Specifies an array of generic tool item attachments. To upload attachments you must upload the entire payload as a `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[...
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Generic Tool Item e.g. `85`
- `closed_at`: string(date-time) - Generic Tool Item closed at e.g. `2016-08-08T21:35:58Z`
- `created_at`: string(date-time) - Generic Tool Item created at e.g. `2016-08-08T21:35:58Z`
- `description`: string - Description of a Generic Tool Item e.g. `This is a description.`
- `due_date`: string(date) - Generic Tool Item Due Date e.g. `2016-08-08`
- `issued_at`: string(date-time) - Generic Tool Item issued at e.g. `2016-08-08T21:35:58Z`
- `origin_generic_tool_item_id`: integer - Origin Generic Tool Item ID e.g. `9`
- `origin_rfi_id`: integer - Origin RFI ID e.g. `14`
- `position`: string - The Number of the Generic Tool Item e.g. `A1`
- `private`: boolean - If the Generic Tool Item is private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: number(float) - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `75.5`
- `updated_at`: string(date-time) - Generic Tool Item updated at e.g. `2016-08-08T21:35:58Z`
- `status`: string - Status of the Generic Tool Item e.g. `open`
- `status_type`: string enum[Open, Closed, Draft] - The default status the Generic Tool Item's status is mapped to. e.g. `Open`
- `title`: string - Title of the Generic Tool Item e.g. `This is the title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `tasks`: array of object - Tasks
  - `id`: integer - Task ID e.g. `999`
  - `name`: string - Full Task name e.g. `01 - Closeout`
  - `task_name`: string - Task name e.g. `Closeout`
  - `key`: string - Task Key e.g. `A101`
- `sub_job`: object
  - `id`: integer - Sub Job ID e.g. `999`
  - `name`: string - Sub Job Name e.g. `Garage`
  - `Code`: string - Sub Job Code e.g. `1`
- `generic_tool`: object
  - `id`: integer - Unique identifier for the generic tool. e.g. `5324`
  - `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
  - `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
  - `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `document_management_document_revision_ids`: array of string - PDM document revision IDs e.g. `["51GW47XAV5N64CQ2F8HTWFW0M4", "51H5MADM07T70B3DAK6X2TFVB0"]`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `assignees`: array of object - Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
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

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}

**Delete Generic Tool Item**
Delete a Generic Tool Item. For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the Generic Tool Item
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended, with_permissions, ids_only, flatten_v0] - If supplied customize the response format

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/update_and_send_response

**Send a response from a Generic Tool Item and then update the item status**
Send a response from a generic tool item and then update that item. For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the Generic Tool Item
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `generic_tool_item`: object (required)
  - `description`: string - The description of the generic tool item. e.g. `Ready for review/approval on finishes.`
  - `due_date`: string(date) - The due date for the generic tool item. e.g. `2020-08-31`
  - `position`: string - The position/number of the generic tool item. e.g. `interior-002`
  - `private`: boolean - If this property is set to true, the generic tool item is private. If this property is set to false, the generic tool item is not private.
  - `skip_emails`: boolean - If true creating and updating the item will not send emails to the users on the item.
  - `schedule_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The schedule impact status for the generic tool item. e.g. `no_impact`
  - `schedule_impact_value`: string - Specifies a value for the schedue impact of the generic tool item. e.g. `none`
  - `cost_impact`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - The cost impact of the generic tool item. e.g. `no_impact`
  - `cost_impact_value`: string - Specifies a value for the cost impact of the generic tool item. e.g. `none`
  - `status`: string - The status of the generic tool item. e.g. `Open`
  - `title`: string - The title of the generic tool item. e.g. `Interior Finishes`
  - `received_from_id`: integer - The unique identifier for the Received From entity. e.g. `1386682`
  - `location_id`: integer - The location identifier for the generic tool item. e.g. `1234`
  - `cost_code_id`: integer - The cost code identifier for the generic tool item. e.g. `78261048`
  - `specification_section_id`: integer - The specification section identifier for the generic tool item. e.g. `782356`
  - `trade_id`: integer - The trade identifier for the generic tool item. e.g. `779365`
  - `distribution_member_ids`: array of integer - An array of distribution member identifiers for the generic tool item.
  - `assignee_ids`: array of integer - An array of assignee identifiers for the generic tool item.
  - `attachments`: array of object - Specifies an array of generic tool item attachments. To upload attachments you must upload the entire payload as a `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[...
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
- `generic_tool_item_response`: object (required)
  - `notes`: string - The notes property.
  - `official`: boolean - If this property is set to true, the response is an official response. If this property is set to false, the response is not an official response.
  - `skip_emails`: boolean - If true creating the response will not send emails to the users on the item.
  - `attachments`: array of string - Specifies the Generic Tool Item Response attachments. To upload attachments you must upload the entire payload as a `multipart/form-data` content-type and specify each parameter as form-data together with `attachments...
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Generic Tool Item e.g. `85`
- `closed_at`: string(date-time) - Generic Tool Item closed at e.g. `2016-08-08T21:35:58Z`
- `created_at`: string(date-time) - Generic Tool Item created at e.g. `2016-08-08T21:35:58Z`
- `description`: string - Description of a Generic Tool Item e.g. `This is a description.`
- `due_date`: string(date) - Generic Tool Item Due Date e.g. `2016-08-08`
- `issued_at`: string(date-time) - Generic Tool Item issued at e.g. `2016-08-08T21:35:58Z`
- `origin_generic_tool_item_id`: integer - Origin Generic Tool Item ID e.g. `9`
- `origin_rfi_id`: integer - Origin RFI ID e.g. `14`
- `position`: string - The Number of the Generic Tool Item e.g. `A1`
- `private`: boolean - If the Generic Tool Item is private e.g. `false`
- `schedule_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Schedule impact status e.g. `yes_known`
  - `value`: number(float) - Schedule impact value e.g. `14`
- `cost_impact`: object
  - `status`: string enum[yes_known, yes_unknown, no_impact, tbd, n_a] - Cost impact status e.g. `yes_known`
  - `value`: number(float) - Cost impact value in dollars e.g. `75.5`
- `updated_at`: string(date-time) - Generic Tool Item updated at e.g. `2016-08-08T21:35:58Z`
- `status`: string - Status of the Generic Tool Item e.g. `open`
- `status_type`: string enum[Open, Closed, Draft] - The default status the Generic Tool Item's status is mapped to. e.g. `Open`
- `title`: string - Title of the Generic Tool Item e.g. `This is the title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `North Building>First Floor>Electrical Closet`
  - `node_name`: string - Location node name e.g. `Electrical Closet`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
  - `code`: string - The unique code for this Location e.g. `L1`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `tasks`: array of object - Tasks
  - `id`: integer - Task ID e.g. `999`
  - `name`: string - Full Task name e.g. `01 - Closeout`
  - `task_name`: string - Task name e.g. `Closeout`
  - `key`: string - Task Key e.g. `A101`
- `sub_job`: object
  - `id`: integer - Sub Job ID e.g. `999`
  - `name`: string - Sub Job Name e.g. `Garage`
  - `Code`: string - Sub Job Code e.g. `1`
- `generic_tool`: object
  - `id`: integer - Unique identifier for the generic tool. e.g. `5324`
  - `abbreviation`: string - Abbreviation for the Title. Will be used as a prefix for the Generic Tool Item number. e.g. `CT`
  - `domain_id`: integer - Unique identifier for the generic tool domain. e.g. `-5324`
  - `title`: string - Primary name/title for the generic tool. e.g. `Custom Tool`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `document_management_document_revision_ids`: array of string - PDM document revision IDs e.g. `["51GW47XAV5N64CQ2F8HTWFW0M4", "51H5MADM07T70B3DAK6X2TFVB0"]`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
- `assignees`: array of object - Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
  - `company`: object
    - `id`: integer - ID e.g. `160583`
    - `name`: string - Name e.g. `Company ABC`
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

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/generic_tools/{generic_tool_id}/generic_tool_items/{generic_tool_item_id}/users_with_permission

**List Users with access to a Generic Tool Item**
Returns a list of all Users That have access to a private generic tool item. If the item is public it will return an empty array as anyone with access to the tool can access the item.
For more information on Generic Tool and Correspondence Tool endpoints, 
see [Working with the Correspondence Tool](/documentation/tutorial-correspondence).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `generic_tool_item_id` [path] integer (required) - Unique identifier for the Generic Tool Item
- `generic_tool_id` [path] integer (required) - Unique identifier for the Generic Tool
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this user. Use as a value in the `user_ids` array when updating the default distribution list. e.g. `160586`
- `login`: string - Email address used to log in to Procore. Uniquely identifies the account. e.g. `carl.contractor@example.com`
- `name`: string - Full display name of the user. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of this user (e.g. `en`, `fr`). Null if the user has not set a locale preference. e.g. `en`
- `company_name`: string - Display name of the company this user is associated with. e.g. `Company ABC`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Custom Field Lov Entries

Resource id: `custom-field-lov-entries`. Raw spec: `../openapi-raw/custom-field-lov-entries.json`. Web: https://developers.procore.com/reference/rest/custom-field-lov-entries?version=latest
Product lines: PM Essentials

### GET /rest/v2.0/companies/{company_id}/custom_field_definitions/{custom_field_definition_id}/custom_field_lov_entries

**List Custom Field Lov Entries**
Return a list of all Custom Field Lov Entries associated with the Current Company and the Custom Field Definition passed by path param.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `custom_field_definition_id` [path] string (required) - Unique identifier for the Custom Field Definition.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[start_with]` [query] string - return lov entries with a label that starts with query string
- `filters[active]` [query] boolean - return lov entries where the active status is (true or false)
- `filters[label_with]` [query] string - return lov entries where the label contains the query string

Response 200 (application/json): object

- `data`: array of object - Array of Custom Field LOV Entries
  - `id`: string - Custom Field Lov Entry ID e.g. `999`
  - `label`: string - Label e.g. `High`
  - `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
  - `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/custom_field_definitions/{custom_field_definition_id}/custom_field_lov_entries/bulk_create

**Bulk Create Custom Field Lov Entries**
Bulk Creates a Custom Field Lov Entries. Position is sorted descending, highest position is visually the top of the list.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `custom_field_definition_id` [path] integer (required) - Unique identifier for the Custom Field Definition.

Request body (application/json):

- `custom_field_lov_entries`: array of object (required)
  - `label`: string (required) - Custom Field Lov Entry Label e.g. `Field-Label-23`

Response 201 (application/json): array of object

- `id`: integer - Custom Field Lov Entry ID e.g. `999`
- `label`: string - Label e.g. `High`
- `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
- `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Custom Fields

Resource id: `custom-fields`. Raw spec: `../openapi-raw/custom-fields.json`. Web: https://developers.procore.com/reference/rest/custom-fields?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v2.0/companies/{company_id}/custom_field_definitions

**List Custom Field Definitions**
Return a list of Custom Field Definitions for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, with_configurable_field_sets] - Controls which fields are returned for each Custom Field Definition. 'with_configurable_field_sets' additionally includes the configurable_field_sets array listing the field sets that use the definition.
- `tool_name` [query] string enum[admin, home, timesheets] - The name of the company level tool whose read permissions are used to authorize the request.
- `includes_configurable_field_sets_count` [query] boolean - If true, response will include the number of field sets using item (custom field).
- `filters[id]` [query] array of string - return custom field definitions that are filtered on an array of ID's. Example: filters[id]=[1,2]
- `filters[with_label]` [query] string - Return custom field definitions that label contains text
- `sort` [query] string enum[created_at, label] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): object

- `data`: array of object - Array of Custom Field Definitions for the company.
  - `id`: string - Unique identifier for the Custom Field Definition. Use as the {id} path parameter for show, update, and delete requests. e.g. `999`
  - `label`: string - Human-readable name of the Custom Field shown to users. e.g. `Impact`
  - `active`: boolean - Whether the Custom Field Definition is active. Inactive definitions are retained but not offered for new field set configuration. e.g. `true`
  - `company_id`: string - ID of the company that owns this Custom Field Definition. Matches the company_id path parameter used to scope the request. e.g. `999`
  - `data_type`: string - The kind of value the Custom Field stores. One of: string, decimal, boolean, lov_entry (single select), lov_entries (multi select), datetime, rich_text, login_information, login_informations, vendor, location, prostor... e.g. `string`
  - `variant`: string - Sub-type that refines the data_type (e.g. currency for decimal, radio_button for lov_entry, read_only for rich_text). Null when the data_type has no variant. e.g. `read_only`
  - `description`: string - Optional longer description explaining the purpose of the Custom Field. e.g. `ABC`
  - `default_value`: string - Default value pre-populated for the Custom Field. Only set for read_only rich_text fields; null otherwise. e.g. `Foo Division`
  - `configurable_field_sets_count`: integer - Number of Configurable Field Sets that use this Custom Field. Only present when includes_configurable_field_sets_count=true is passed; null otherwise. e.g. `1`
  - `configurable_field_sets`: array of object - Configurable Field Sets that use this Custom Field. Only present when view=with_configurable_field_sets is requested.

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/custom_field_definitions

**Create Custom Field Definitions**
Creates a Custom Field Definition. The ID returned is then used as a path parameter (custom_field_definition_id) on the [Create Custom LOV Entries](/reference/rest/v1/custom-fields#create-custom-field-lov-entries) endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `view` [query] string enum[default, with_configurable_field_sets] - Controls which fields are returned for each Custom Field Definition. 'with_configurable_field_sets' additionally includes the configurable_field_sets array listing the field sets that use the definition.

Request body (application/json) (required):

- `custom_field_definition`: object (required)
  - `label`: string (required) - Label e.g. `Impact`
  - `data_type`: string enum[string, decimal, boolean, lov_entry, lov_entries, datetime, rich_text, login_information, login_informations, vendor, location, prostore_files] (required) - Type of Custom field
  - `variant`: string enum[currency, project_directory, radio_button, read_only] - The variant of the Custom Field. The supported variants is dependent on the data_type.
  - `active`: boolean - Whether the custom field is active or not. e.g. `true`
  - `description`: string - Description e.g. `ABC`
  - `default_value`: string - The default value for the Custom Field. Only accepted for read_only rich_text fields. e.g. `Default Text`
  - `custom_field_lov_entries`: array of object - List-of-value entries (selectable options) for the Custom Field. Only applicable to lov_entry and lov_entries data types.
    - `id`: string - Custom Field Lov Entry ID e.g. `999`
    - `label`: string - Label e.g. `High`
    - `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
    - `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Response 201 (application/json): object

- `data`: object
  - `id`: string - Unique identifier for the Custom Field Definition. Use as the {id} path parameter for show, update, and delete requests. e.g. `999`
  - `label`: string - Human-readable name of the Custom Field shown to users. e.g. `Impact`
  - `active`: boolean - Whether the Custom Field Definition is active. Inactive definitions are retained but not offered for new field set configuration. e.g. `true`
  - `company_id`: string - ID of the company that owns this Custom Field Definition. Matches the company_id path parameter used to scope the request. e.g. `999`
  - `data_type`: string - The kind of value the Custom Field stores. One of: string, decimal, boolean, lov_entry (single select), lov_entries (multi select), datetime, rich_text, login_information, login_informations, vendor, location, prostor... e.g. `string`
  - `variant`: string - Sub-type that refines the data_type (e.g. currency for decimal, radio_button for lov_entry, read_only for rich_text). Null when the data_type has no variant. e.g. `read_only`
  - `description`: string - Optional longer description explaining the purpose of the Custom Field. e.g. `ABC`
  - `default_value`: string - Default value pre-populated for the Custom Field. Only set for read_only rich_text fields; null otherwise. e.g. `Foo Division`
  - `configurable_field_sets_count`: integer - Number of Configurable Field Sets that use this Custom Field. Only present when includes_configurable_field_sets_count=true is passed; null otherwise. e.g. `1`
  - `configurable_field_sets`: array of object - Configurable Field Sets that use this Custom Field. Only present when view=with_configurable_field_sets is requested.

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/custom_field_definitions/{id}

**Show Custom Field Definition**
Returns the details for a specified Custom Field Definition

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Custom Field Definition ID
- `view` [query] string enum[default, with_configurable_field_sets] - Controls which fields are returned for each Custom Field Definition. 'with_configurable_field_sets' additionally includes the configurable_field_sets array listing the field sets that use the definition.
- `includes_configurable_field_sets_count` [query] boolean - If true, response will include the number of field sets using item (custom field).

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique identifier for the Custom Field Definition. Use as the {id} path parameter for show, update, and delete requests. e.g. `999`
  - `label`: string - Human-readable name of the Custom Field shown to users. e.g. `Impact`
  - `active`: boolean - Whether the Custom Field Definition is active. Inactive definitions are retained but not offered for new field set configuration. e.g. `true`
  - `company_id`: string - ID of the company that owns this Custom Field Definition. Matches the company_id path parameter used to scope the request. e.g. `999`
  - `data_type`: string - The kind of value the Custom Field stores. One of: string, decimal, boolean, lov_entry (single select), lov_entries (multi select), datetime, rich_text, login_information, login_informations, vendor, location, prostor... e.g. `string`
  - `variant`: string - Sub-type that refines the data_type (e.g. currency for decimal, radio_button for lov_entry, read_only for rich_text). Null when the data_type has no variant. e.g. `read_only`
  - `description`: string - Optional longer description explaining the purpose of the Custom Field. e.g. `ABC`
  - `default_value`: string - Default value pre-populated for the Custom Field. Only set for read_only rich_text fields; null otherwise. e.g. `Foo Division`
  - `configurable_field_sets_count`: integer - Number of Configurable Field Sets that use this Custom Field. Only present when includes_configurable_field_sets_count=true is passed; null otherwise. e.g. `1`
  - `configurable_field_sets`: array of object - Configurable Field Sets that use this Custom Field. Only present when view=with_configurable_field_sets is requested.

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/custom_field_definitions/{id}

**Update Custom Field Definition**
Updates a Custom Field Definition.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Custom Field Definition ID
- `view` [query] string enum[default, with_configurable_field_sets] - Controls which fields are returned for each Custom Field Definition. 'with_configurable_field_sets' additionally includes the configurable_field_sets array listing the field sets that use the definition.

Request body (application/json):

- `custom_field_definition`: object (required)
  - `label`: string (required) - Label e.g. `Impact`
  - `data_type`: string enum[string, decimal, boolean, lov_entry, lov_entries, datetime, rich_text, login_information, login_informations, vendor, location, prostore_files] - Type of Custom field
  - `variant`: string enum[currency, project_directory, radio_button, read_only] - The variant of the Custom Field. The supported variants is dependent on the data_type.
  - `active`: boolean - Whether the custom field is active or not. e.g. `true`
  - `description`: string - Description e.g. `ABC`
  - `default_value`: string - The default value for the Custom Field. Only accepted for read_only rich_text fields. e.g. `Default Text`
  - `custom_field_lov_entries`: array of object - Custom Lov Entries (selectable options) for the custom field.
    - `id`: string - Custom Field Lov Entry ID e.g. `999`
    - `label`: string - Label e.g. `High`
    - `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
    - `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique identifier for the Custom Field Definition. Use as the {id} path parameter for show, update, and delete requests. e.g. `999`
  - `label`: string - Human-readable name of the Custom Field shown to users. e.g. `Impact`
  - `active`: boolean - Whether the Custom Field Definition is active. Inactive definitions are retained but not offered for new field set configuration. e.g. `true`
  - `company_id`: string - ID of the company that owns this Custom Field Definition. Matches the company_id path parameter used to scope the request. e.g. `999`
  - `data_type`: string - The kind of value the Custom Field stores. One of: string, decimal, boolean, lov_entry (single select), lov_entries (multi select), datetime, rich_text, login_information, login_informations, vendor, location, prostor... e.g. `string`
  - `variant`: string - Sub-type that refines the data_type (e.g. currency for decimal, radio_button for lov_entry, read_only for rich_text). Null when the data_type has no variant. e.g. `read_only`
  - `description`: string - Optional longer description explaining the purpose of the Custom Field. e.g. `ABC`
  - `default_value`: string - Default value pre-populated for the Custom Field. Only set for read_only rich_text fields; null otherwise. e.g. `Foo Division`
  - `configurable_field_sets_count`: integer - Number of Configurable Field Sets that use this Custom Field. Only present when includes_configurable_field_sets_count=true is passed; null otherwise. e.g. `1`
  - `configurable_field_sets`: array of object - Configurable Field Sets that use this Custom Field. Only present when view=with_configurable_field_sets is requested.

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/custom_field_definitions/{id}

**Delete Custom Field Definition**
Deletes a Custom Field Definition.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Custom Field Definition ID

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/custom_field_metadata

**List Custom Field Metadata**
Return a list of all Custom Field Metadata associated with the Current Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended, with_field_set_name] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attributes company_id, host_type, source_type, source_id, label, data_type, variant, and default_...
- `filters[field_set_type][]` [query] array of string - Return a list of all Custom Field Metadata associated with the Current Company and source_type provided.
- `filters[field_set_id][]` [query] array of string - Return a list of all Custom Field Metadata associated with the Current Company and source_id provided.
- `filters[custom_field_definition_id]` [query] string - Return a list of all Custom Field Metadata associated with the Current Company and custom_field_definition_id provided.

Response 200 (application/json): object

- `data`: array of object - Array of Custom Field Metadata
  - `id`: string - Custom Field Metadatum ID e.g. `999`
  - `custom_field_definition_id`: string - Custom Field Definition ID e.g. `999`
  - `position`: number - Position is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column properties). e.g. `999`
  - `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
  - `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
  - `company_id`: string - Company ID e.g. `999`
  - `host_type`: string - Procore Entity e.g. `ProcoreEntityName`
  - `source_type`: string - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
  - `source_id`: string - Configurable FieldSet ID e.g. `999`
  - `label`: string - Custom Field Metadatum Label e.g. `Impact`
  - `data_type`: string - Type of Custom field e.g. `string`
  - `variant`: string - The variant type of the Custom Field e.g. `string`
  - `default_value`: string - The default value of the Custom Field e.g. `string`
  - `row`: number - Row the Field is position on the Form e.g. `1`
  - `column`: number - Column the Field is position on the Form e.g. `1`
  - `column_width`: number - How many columns the field spans on the Form e.g. `3`
  - `custom_fields_section_id`: string - The display section of the Custom Field, if null it is the general section, visually in the top level section typically called "General Information". e.g. `789`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/custom_field_metadata

**Create Custom Field Metadata**
Creates a Custom Field Metadatum

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `view` [query] string enum[default, extended, with_field_set_name] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attributes company_id, host_type, source_type, source_id, label, data_type, variant, and default_...

Request body (application/json) (required):

- `custom_field_metadatum`: object (required)
  - `custom_field_definition_id`: string (required) - Custom Field Definition ID e.g. `999`
  - `custom_fields_section_id`: string - Custom Fields Section ID e.g. `999`
  - `host_type`: string (required) - Procore Entity e.g. `ProcoreEntityName`
  - `source_type`: string (required) - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
  - `source_id`: string (required) - Configurable FieldSet ID e.g. `999`
  - `position`: number (required) - Position e.g. `1`
  - `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
  - `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
  - `row`: number - Row the Field is position on the Form e.g. `1`
  - `column`: number - Column the Field is position on the Form e.g. `1`
  - `column_width`: number - How many columns the field spans on the Form e.g. `3`

Response 201 (application/json): object

- `data`: object
  - `id`: string - Custom Field Metadatum ID e.g. `999`
  - `custom_field_definition_id`: string - Custom Field Definition ID e.g. `999`
  - `position`: number - Position is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column properties). e.g. `999`
  - `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
  - `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
  - `company_id`: string - Company ID e.g. `999`
  - `host_type`: string - Procore Entity e.g. `ProcoreEntityName`
  - `source_type`: string - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
  - `source_id`: string - Configurable FieldSet ID e.g. `999`
  - `label`: string - Custom Field Metadatum Label e.g. `Impact`
  - `data_type`: string - Type of Custom field e.g. `string`
  - `variant`: string - The variant type of the Custom Field e.g. `string`
  - `default_value`: string - The default value of the Custom Field e.g. `string`
  - `row`: number - Row the Field is position on the Form e.g. `1`
  - `column`: number - Column the Field is position on the Form e.g. `1`
  - `column_width`: number - How many columns the field spans on the Form e.g. `3`
  - `custom_fields_section_id`: string - The display section of the Custom Field, if null it is the general section, visually in the top level section typically called "General Information". e.g. `789`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/custom_field_metadata/{id}

**Show Custom Field Metadatum**
Returns the details for a specified Custom Field Metadatum

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Custom Field Metadatum ID
- `view` [query] string enum[default, extended, with_field_set_name] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attributes company_id, host_type, source_type, source_id, label, data_type, variant, and default_...

Response 200 (application/json): object

- `data`: object
  - `id`: string - Custom Field Metadatum ID e.g. `999`
  - `custom_field_definition_id`: string - Custom Field Definition ID e.g. `999`
  - `position`: number - Position is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column properties). e.g. `999`
  - `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
  - `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
  - `company_id`: string - Company ID e.g. `999`
  - `host_type`: string - Procore Entity e.g. `ProcoreEntityName`
  - `source_type`: string - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
  - `source_id`: string - Configurable FieldSet ID e.g. `999`
  - `label`: string - Custom Field Metadatum Label e.g. `Impact`
  - `data_type`: string - Type of Custom field e.g. `string`
  - `variant`: string - The variant type of the Custom Field e.g. `string`
  - `default_value`: string - The default value of the Custom Field e.g. `string`
  - `row`: number - Row the Field is position on the Form e.g. `1`
  - `column`: number - Column the Field is position on the Form e.g. `1`
  - `column_width`: number - How many columns the field spans on the Form e.g. `3`
  - `custom_fields_section_id`: string - The display section of the Custom Field, if null it is the general section, visually in the top level section typically called "General Information". e.g. `789`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/custom_field_metadata/{id}

**Update Custom Field Metadatum**
Updates a Custom Field Metadatum.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Custom Field Metadatum ID
- `view` [query] string enum[default, extended, with_field_set_name] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attributes company_id, host_type, source_type, source_id, label, data_type, variant, and default_...

Request body (application/json) (required):

- `custom_field_metadatum`: object (required)
  - `custom_field_definition_id`: string (required) - Custom Field Definition ID e.g. `999`
  - `custom_fields_section_id`: string - Custom Fields Section ID e.g. `999`
  - `host_type`: string (required) - Procore Entity e.g. `ProcoreEntityName`
  - `source_type`: string (required) - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
  - `source_id`: string (required) - Configurable FieldSet ID e.g. `999`
  - `position`: number (required) - Position e.g. `1`
  - `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
  - `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
  - `row`: number - Row the Field is position on the Form e.g. `1`
  - `column`: number - Column the Field is position on the Form e.g. `1`
  - `column_width`: number - How many columns the field spans on the Form e.g. `3`

Response 200 (application/json): object

- `data`: object
  - `id`: string - Custom Field Metadatum ID e.g. `999`
  - `custom_field_definition_id`: string - Custom Field Definition ID e.g. `999`
  - `position`: number - Position is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column properties). e.g. `999`
  - `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
  - `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
  - `company_id`: string - Company ID e.g. `999`
  - `host_type`: string - Procore Entity e.g. `ProcoreEntityName`
  - `source_type`: string - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
  - `source_id`: string - Configurable FieldSet ID e.g. `999`
  - `label`: string - Custom Field Metadatum Label e.g. `Impact`
  - `data_type`: string - Type of Custom field e.g. `string`
  - `variant`: string - The variant type of the Custom Field e.g. `string`
  - `default_value`: string - The default value of the Custom Field e.g. `string`
  - `row`: number - Row the Field is position on the Form e.g. `1`
  - `column`: number - Column the Field is position on the Form e.g. `1`
  - `column_width`: number - How many columns the field spans on the Form e.g. `3`
  - `custom_fields_section_id`: string - The display section of the Custom Field, if null it is the general section, visually in the top level section typically called "General Information". e.g. `789`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/custom_field/data_types

**Get Custom Field Data Types**
Returns all available custom field data types for a company, including their variants. This endpoint provides information about which data types are enabled for the company based on feature flags, the list of values (LOV) data types, and the available variants for each data type.
When `field_set_id` or `type` parameters are provided, the variants will be filtered to only include those supported by the specified field set.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `type` [query] string - Configurable field set type to filter data type variants. If provided, only variants supported by this field set type will be returned. For GenericToolItem, append the generic_tool_id (e.g., 'ConfigurableFieldSet::Gen...
- `field_set_id` [query] string - ID of an existing configurable field set. If provided, only variants supported by this specific field set will be returned. Takes priority over the 'type' parameter if both are provided.

Response 200 (application/json): object

- `data`: object (required)
  - `all`: array of string (required) - Array of all enabled data types for the company e.g. `["string", "decimal", "boolean", "lov_entry", "lov_entries", "datetime", "ric...`
  - `lov`: array of string (required) - Array of LOV (List of Values) data types e.g. `["lov_entry", "lov_entries"]`
  - `variants`: object (required) - Object mapping data types to their available variants e.g. `{"string": [], "decimal": [], "boolean": [], "lov_entry": [], "lov_entries": ...`

Error responses: 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/custom_field_definitions/{custom_field_definition_id}/configurable_field_sets

**List Custom Field Definition's Configurable Field Sets**
Return a list of all Configurable Field Sets for a given Custom Field Definition associated with the Current Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `custom_field_definition_id` [path] integer (required) - Custom Field Definition ID

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
    - `company_id`: integer - The company identifier of the custom field. e.g. `999`
    - `label`: string - The label of the custom field definition. e.g. `Worked hours`
    - `description`: string - The description of the custom field definition. e.g. `description`
    - `custom_field_definition_id`: integer - The definition identifier of the custom field. e.g. `999`
    - `data_type`: string enum[string, number, boolean, lov_entry, lov_entries] - Data type of the custom field.
    - `variant`: string enum[currency, None] - The variant type of the custom field.
    - `custom_fields_section_id`: integer - The section identifier of the custom field. e.g. `999`
    - `default_value`: string - The default value of the custom field. e.g. `default_value`
    - `host_type`: string - The host type of the custom field. e.g. `Observations::Item`
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
- `deletable`: boolean - Deletable status e.g. `false`
- `updated_at`: string(date-time) - Date updated e.g. `2018-06-09T16:20:57Z`
- `updated_by`: object
  - `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
  - `id`: integer - Unique integer identifier for this user. e.g. `161072`
  - `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
  - `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`
- `inspection_type_id`: integer - The unique identifier of the inspection type. e.g. `1`
- `incident_type_id`: integer - The unique identifier of the incident type. e.g. `1`
- `generic_tool_id`: integer - The unique idenfitier of the generic tool. e.g. `1`
- `action_plan_type_id`: integer - The unique idenfitier of the action plan type. e.g. `1`
- `observations_category_id`: integer - The unique idenfitier of the observations category. e.g. `1`
- `projects`: array of object - An array of projects that are associated with the configurable field set.
  - `id`: integer - The unique identifier of the project. e.g. `1`
  - `name`: string - The name of the project. e.g. `Project ABC`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_field_definitions/{custom_field_definition_id}/custom_field_lov_entries

**List Custom Field Lov Entries**
Return a list of all Custom Field Lov Entries associated with the Current Company and the Custom Field Definition passed by path param.
The filter `filters[active]` is ignored when `filters[id]` is present.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `custom_field_definition_id` [path] integer (required) - Unique identifier for the Custom Field Definition.
- `filters[start_with]` [query] string - return lov entries that label start with letters
- `filters[active]` [query] boolean - return lov entries that active status is (true or false)
- `filters[label_with]` [query] string - return lov entries that contains the label with the text
- `filters[id]` [query] array of integer - return lov entries that are filtered on an array of ID's. Example: filters[id]=[1,2]

Response 200 (application/json): oneOf(object | array of object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_field_definitions/{custom_field_definition_id}/custom_field_lov_entries/{id}

**Show Custom Field Lov Entry**
Returns the details for a specified Custom Field Lov Entry

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `custom_field_definition_id` [path] integer (required) - Unique identifier for the Custom Field Definition.
- `id` [path] integer (required) - Unique identifier for the Custom Field List of Values (LOV) Entry.
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Custom Field Lov Entry ID e.g. `999`
- `label`: string - Label e.g. `High`
- `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
- `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_fields_sections

**List Custom Field Sections**
Return a list of all Custom Field Sections associated with the Current Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Custom Fields Section ID e.g. `999`
- `name`: string - Name e.g. `First Section`
- `description`: string - Description e.g. `ABC`
- `position`: integer - Position is sorted ascending, lowest position is visually the top of the page. e.g. `12`
- `from_v1_custom_fields`: boolean - If section was migrated from v1 Custom Fields e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_fields_sections/{id}

**Show Custom Fields Section**
Returns the details for a specified Custom Field Section

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Custom Fields Section ID

Response 200 (application/json): object

- `id`: integer - Custom Fields Section ID e.g. `999`
- `name`: string - Name e.g. `First Section`
- `description`: string - Description e.g. `ABC`
- `position`: integer - Position is sorted ascending, lowest position is visually the top of the page. e.g. `12`
- `from_v1_custom_fields`: boolean - If section was migrated from v1 Custom Fields e.g. `false`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/custom_field_definitions  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Custom Field Definitions**
Return a list of Custom Field Definitions for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Items per page, default: 100, max: 100
- `tool_name` [query] string enum[admin, timesheets] - The name of the company/project level tool that is allowed read permissions to custom field definitions.
- `includes_configurable_field_sets_count` [query] boolean - If true, response will include the number of field sets using item (custom field).
- `filters[with_label]` [query] string - Return custom field definitions that label contains text
- `filters[id]` [query] array of integer - return custom field definitions that are filtered on an array of ID's. Example: filters[id]=[1,2]
- `sort` [query] string enum[created_at, label] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): array of object

- `id`: integer - Custom Field Definition ID e.g. `999`
- `label`: string - Custom Field Definition Label e.g. `Impact`
- `active`: boolean - Whether or not the Custom Field Definition is active e.g. `true`
- `company_id`: integer - Company ID e.g. `999`
- `data_type`: string - Type of Custom field e.g. `string`
- `variant`: string - The variant type of the Custom Field e.g. `string`
- `description`: string - Description e.g. `ABC`
- `default_value`: string - Text displayed on Read Only variant e.g. `Foo Division`
- `configurable_field_sets_count`: integer - Number of Configurable Field Sets associated with the Custom Field e.g. `1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_field_definitions  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Custom Field Definitions**
DEPRECATED
This endpoint has been deprecated, it will be sunset at 9/1/2024. Instead, please use rest/v1.1/companies/{company_id}/custom_field_definitions

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, with_lov_entries, extended] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attribute custom_field_lov_entries. The with_lov_entries view is the same as extended.
- `tool_name` [query] string enum[admin, timesheets] - The name of the company/project level tool that is allowed read permissions to custom field definitions.
- `includes_configurable_field_sets_count` [query] boolean - If true, response will include the number of field sets using item (custom field).
- `filters[with_label]` [query] string - Return custom field definitions that label contains text
- `scope[type]` [query] string - Return custom field definitions that contains fieldset type
- `scope[category]` [query] string - Return custom field definitions that contains category
- `scope[observations_category_id]` [query] integer - Return custom field definitions that contains observations_category_id
- `scope[inspection_type_id]` [query] integer - Return custom field definitions that contains inspection_type_id
- `scope[generic_tool_id]` [query] integer - Return custom field definitions that contains generic_tool_id
- `scope[action_plan_type_id]` [query] integer - Return custom field definitions that contains action_plan_type_id
- `sort` [query] string enum[created_at, label] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter.

Response 200 (application/json): oneOf(object | array of object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_field_definitions/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show Custom Field Definition**
Returns the details for a specified Custom Field Definition

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Custom Field Definition ID
- `view` [query] string enum[default, with_lov_entries, extended] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attribute custom_field_lov_entries. The with_lov_entries view is the same as extended.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `includes_configurable_field_sets_count` [query] boolean - If true, response will include the number of field sets using item (custom field).

Response 200 (application/json): object

- `id`: integer - Custom Field Definition ID e.g. `999`
- `label`: string - Custom Field Definition Label e.g. `Impact`
- `active`: boolean - Whether or not the Custom Field Definition is active e.g. `true`
- `company_id`: integer - Company ID e.g. `999`
- `data_type`: string - Type of Custom field e.g. `string`
- `variant`: string - The variant type of the Custom Field e.g. `string`
- `description`: string - Description e.g. `ABC`
- `default_value`: string - Text displayed on Read Only variant e.g. `Foo Division`
- `configurable_field_sets_count`: integer - Number of Configurable Field Sets associated with the Custom Field e.g. `1`
- `custom_field_lov_entries`: array of object
  - `id`: integer - Custom Field Lov Entry ID e.g. `999`
  - `label`: string - Label e.g. `High`
  - `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
  - `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_field_metadata  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Custom Field Metadata**
Return a list of all Custom Field Metadata associated with the Current Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer - Unique identifier for the company. You must supply either a company_id or project_id.
- `project_id` [query] integer - Unique identifier for the project. You must supply either a company_id or project_id.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, with_lov_entries, extended] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attributes company_id, host_type, source_type, source_id, label, data_type. The with_lov_entries ...
- `filters[field_set_type][]` [query] array of string - Return a list of all Custom Field Metadata associated with the Current Company and source_type provided.
- `filters[field_set_id][]` [query] array of integer - Return a list of all Custom Field Metadata associated with the Current Company and source_id provided.
- `filters[custom_field_definitions_id]` [query] integer - Return a list of all Custom Field Metadata associated with the Current Company and custom_field_definition_id provided.

Response 200 (application/json): array of object

- `id`: number - Custom Field Metadatum ID e.g. `999`
- `custom_field_definition_id`: number - Custom Field Definition ID e.g. `999`
- `position`: number - Position is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column properties). e.g. `999`
- `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
- `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
- `company_id`: number - Company ID e.g. `999`
- `host_type`: string - Procore Entity e.g. `ProcoreEntityName`
- `source_type`: string - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
- `source_id`: string - Configurable FieldSet ID e.g. `999`
- `label`: string - Custom Field Metadatum Label e.g. `Impact`
- `data_type`: string - Type of Custom field e.g. `string`
- `variant`: string - The variant type of the Custom Field e.g. `string`
- `default_value`: string - The default value of the Custom Field e.g. `string`
- `row`: number - Row the Field is position on the Form e.g. `1`
- `column`: number - Column the Field is position on the Form e.g. `1`
- `column_width`: number - How many columns the field spans on the Form e.g. `3`
- `custom_fields_section_id`: number - The display section of the Custom Field, if null it is the general section, visually in the top level section typically called "General Information". e.g. `789`
- `lov_entries`: array of object
  - `id`: integer - Custom Field Lov Entry ID e.g. `999`
  - `label`: string - Label e.g. `High`
  - `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
  - `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/custom_field_metadata/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show Custom Field Metadatum**
Returns the details for a specified Custom Field Metadatum

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Custom Field Metadatum ID
- `view` [query] string enum[default, with_lov_entries, extended] - The extended view provides what is shown below. The default view returns the same as the extended view but excludes the attributes company_id, host_type, source_type, source_id, label, data_type. The with_lov_entries ...
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: number - Custom Field Metadatum ID e.g. `999`
- `custom_field_definition_id`: number - Custom Field Definition ID e.g. `999`
- `position`: number - Position is sorted ascending, lowest position is visually the top left of the page on a grid basis (used in conjunction with column_width property to calculate row and column properties). e.g. `999`
- `required`: boolean - Whether or not the Custom Field Metadatum is required e.g. `true`
- `visible`: boolean - Whether or not the Custom Field Metadatum is visible e.g. `true`
- `company_id`: number - Company ID e.g. `999`
- `host_type`: string - Procore Entity e.g. `ProcoreEntityName`
- `source_type`: string - Configurable FieldSet Class e.g. `ConfigurableFieldSet::Base`
- `source_id`: string - Configurable FieldSet ID e.g. `999`
- `label`: string - Custom Field Metadatum Label e.g. `Impact`
- `data_type`: string - Type of Custom field e.g. `string`
- `variant`: string - The variant type of the Custom Field e.g. `string`
- `default_value`: string - The default value of the Custom Field e.g. `string`
- `row`: number - Row the Field is position on the Form e.g. `1`
- `column`: number - Column the Field is position on the Form e.g. `1`
- `column_width`: number - How many columns the field spans on the Form e.g. `3`
- `custom_fields_section_id`: number - The display section of the Custom Field, if null it is the general section, visually in the top level section typically called "General Information". e.g. `789`
- `lov_entries`: array of object
  - `id`: integer - Custom Field Lov Entry ID e.g. `999`
  - `label`: string - Label e.g. `High`
  - `position`: number - Position is sorted descending, highest position is visually the top of the list. e.g. `1`
  - `active`: boolean - Whether or not the Custom Field Lov Entry is active e.g. `true`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Generic Tool Items

Resource id: `generic-tool-items`. Raw spec: `../openapi-raw/generic-tool-items.json`. Web: https://developers.procore.com/reference/rest/generic-tool-items?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/generic_tool_items/{id}

**Show Generic Tool Item**
Get the details of a single Generic Tool Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Generic Tool Item ID

Response 200 (application/json): object

- `id`: integer - Generic Tool Item ID e.g. `85`
- `closed_at`: string(date-time) - Generic Tool Item closed at e.g. `2016-08-08T21:35:58Z`
- `created_at`: string(date-time) - Generic Tool Item created at e.g. `2016-08-08T21:35:58Z`
- `description`: string - Description of a Generic Tool Item e.g. `This is a description.`
- `due_date`: string(date) - Generic Tool Item Due Date e.g. `2016-08-08`
- `issued_at`: string(date-time) - Generic Tool Item issued at e.g. `2016-08-08T21:35:58Z`
- `origin_generic_tool_item_id`: integer - Origin Generic Tool Item ID e.g. `9`
- `origin_rfi_id`: integer - Origin RFI ID e.g. `14`
- `position`: string - The Number of the Generic Tool Item e.g. `A1`
- `private`: boolean - If the Generic Tool Item is private e.g. `false`
- `schedule_impact`: string - Amount of Schedule Impact e.g. `2.1`
- `updated_at`: string(date-time) - Generic Tool Item updated at e.g. `2016-08-08T21:35:58Z`
- `cost_impact`: string - Amount of Cost Impact e.g. `75.5`
- `status`: string - Status of the Generic Tool Item e.g. `open`
- `title`: string - Title of the Generic Tool Item e.g. `This is the title`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `received_from`: object
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
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `full_code`: string - Full Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Name e.g. `Earthwork`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object
  - `id`: integer - Sub Job ID e.g. `999`
  - `name`: string - Sub Job Name e.g. `Garage`
  - `Code`: string - Sub Job Code e.g. `01`
- `tasks`: array of object - Tasks
  - `id`: integer - Task ID e.g. `999`
  - `name`: string - Full Task name e.g. `01 - Closeout`
  - `task_name`: string - Task name e.g. `Closeout`
  - `key`: string - Task Key e.g. `A101`
- `trade`: object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `generic_tool`: object
  - `id`: integer - ID e.g. `5324`
  - `title`: string - Title e.g. `Custom Tool`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `distribution_members`: array of object - Distribution Members
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `assignees`: array of object - Assignees
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `custom_fields`: object
  - `custom_field_%{custom_field_string_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `string`
    - `value`: string - The value of the custom field e.g. `custom field value`
  - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `decimal`
    - `value`: number - The value of the custom field e.g. `2.2`
  - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `boolean`
    - `value`: boolean - The value of the custom field e.g. `true`
  - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entry`
    - `value`: object
  - `custom_field_%{custom_field_lov_entries_definition_id}`: object
    - `data_type`: string - Data type of the Custom Field Definition e.g. `lov_entries`
    - `value`: array of object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Generic Tools

Resource id: `generic-tools`. Raw spec: `../openapi-raw/generic-tools.json`. Web: https://developers.procore.com/reference/rest/generic-tools?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v2.0/companies/{company_id}/generic_tools/default_types

**List Default Correspondence Types**
Returns the default correspondence types available for the company.
These are the predefined types that can be used when creating generic tools.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object - Default correspondence types available e.g. `[{"key": "addendum", "allow_admin_view_private_item": true, "name": "Addendum...`
  - `key`: string (required) - Type key identifier e.g. `addendum`
  - `allow_admin_view_private_item`: boolean - Whether admins can view private items for this type e.g. `true`
  - `name`: string (required) - Type name e.g. `Addendum`
  - `abbreviation`: string (required) - Type abbreviation e.g. `ADD`
  - `fields`: object (required) - Field configurations for this type

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Resource Planning Custom Fields

Resource id: `resource-planning-custom-fields`. Raw spec: `../openapi-raw/resource-planning-custom-fields.json`. Web: https://developers.procore.com/reference/rest/resource-planning-custom-fields?version=latest
Product lines: Resource Management

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/custom-fields

**Get All Custom Fields**
Retrieves all Custom Fields within the specified company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Response 200 (application/json): array of object

- `id`: string(uuid) - UUID of the Custom Field. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `name`: string - The name of the Custom Field. e.g. `Location`
- `type`: string enum[text, number, currency, hex-color, bool, select, multi-select, date, paragraph] - The type of the Custom Field. e.g. `select`
- `can_filter`: boolean - If true, allows this field to be used as a filter. e.g. `true`
- `integration_only`: boolean - If true, only integrations can update this field. e.g. `false`
- `on_projects`: boolean - If true, the field is available on Projects. e.g. `true`
- `on_people`: boolean - If true, the field is available on People. e.g. `true`
- `description`: string - A description to help Admin users understand the field’s purpose. e.g. `This field helps us filter down to different offices within our region groups.`
- `values`: array of string - Only applicable for `select` or `multi-select` fields. List of dropdown values. e.g. `["Chicago", "Iowa", "Kansas City"]`
- `sort_by`: string enum[alpha, listed] - Controls sorting of dropdown values. `alpha` sorts alphabetically, while `listed` maintains the provided order. e.g. `alpha`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/custom-fields

**Create Custom Field**
Creates a new Custom Field for a given company ID. Custom Fields are used to store additional information about Projects or People.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...

Request body (application/json):

- `name`: string (required) - The name of the Custom Field that appears in the UI. e.g. `Location`
- `type`: string enum[text, number, currency, hex-color, bool, select, multi-select, date, paragraph] (required) - The type of Custom Field. Determines the kind of data it will store. The type cannot be changed once created. e.g. `select`
- `can_filter`: boolean - If true, allows this field to be used as a filter. e.g. `true`
- `integration_only`: boolean - If true, only integrations can update this field. e.g. `false`
- `on_projects`: boolean - If true, the field is available on Projects. e.g. `true`
- `on_people`: boolean - If true, the field is available on People. e.g. `true`
- `description`: string - A description to help Admin users understand the field’s purpose. e.g. `This field helps us filter down to different offices within our region groups.`
- `values`: array of string - Only applicable for `select` or `multi-select` fields. List of values that will be options in the field's dropdown. e.g. `["Chicago", "Iowa", "Kansas City"]`
- `sort_by`: string enum[alpha, listed] - Only applicable for `select` or `multi-select` fields. Controls sorting of dropdown values. `alpha` sorts alphabetically, while `listed` maintains the provided order. e.g. `alpha`

Response 200 (application/json): object

- `id`: string(uuid) - The unique identifier of the created Custom Field. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 400, 401, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workforce-planning/v2/companies/{company_id}/custom-fields/{field_id}

**Get Single Custom Field**
Retrieves a single Custom Field by its ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `field_id` [path] string(uuid) (required) - UUID of the Custom Field.

Response 200 (application/json): object

- `id`: string(uuid) - UUID of the Custom Field. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`
- `name`: string - The name of the Custom Field. e.g. `Location`
- `type`: string enum[text, number, currency, hex-color, bool, select, multi-select, date, paragraph] - The type of the Custom Field. e.g. `select`
- `can_filter`: boolean - If true, allows this field to be used as a filter. e.g. `true`
- `integration_only`: boolean - If true, only integrations can update this field. e.g. `false`
- `on_projects`: boolean - If true, the field is available on Projects. e.g. `true`
- `on_people`: boolean - If true, the field is available on People. e.g. `true`
- `description`: string - A description to help Admin users understand the field’s purpose. e.g. `This field helps us filter down to different offices within our region groups.`
- `values`: array of string - Only applicable for `select` or `multi-select` fields. List of dropdown values. e.g. `["Chicago", "Iowa", "Kansas City"]`
- `sort_by`: string enum[alpha, listed] - Controls sorting of dropdown values. `alpha` sorts alphabetically, while `listed` maintains the provided order. e.g. `alpha`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/custom-fields/{field_id}

**Update Custom Field**
Updates an existing Custom Field for a given company ID. The `type` property cannot be modified after creation.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `field_id` [path] string(uuid) (required) - UUID of the Custom Field.

Request body (application/json):

- `name`: string - The updated name of the Custom Field. e.g. `New Location`
- `can_filter`: boolean - If true, allows this field to be used as a filter. e.g. `true`
- `integration_only`: boolean - If true, only integrations can update this field. e.g. `false`
- `on_projects`: boolean - If true, the field is available on Projects. e.g. `true`
- `on_people`: boolean - If true, the field is available on People. e.g. `true`
- `description`: string - A description to help Admin users understand the field’s purpose. e.g. `Updated description for filtering locations.`
- `values`: array of string - Only applicable for `select` or `multi-select` fields. Replaces the entire list of values. e.g. `["Chicago", "Kansas City", "Denver"]`
- `sort_by`: string enum[alpha, listed] - Controls sorting of dropdown values. `alpha` sorts alphabetically, while `listed` maintains the provided order. e.g. `alpha`

Response 200 (application/json): object

- `success`: boolean e.g. `true`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/custom-fields/{field_id}

**Delete Custom Field**
Deletes a Custom Field from a company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `field_id` [path] string(uuid) (required) - UUID of the Custom Field.

Response 200 (application/json): object

- `id`: string(uuid) - The unique identifier of the created Custom Field. e.g. `3f447732-33ec-4b8e-a5d0-6462c12e18e6`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workforce-planning/v2/companies/{company_id}/custom-fields/{field_id}/values

**Add Values to Custom Field**
Appends new values to a Custom Field with type `select` or `multi-select`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `field_id` [path] string(uuid) (required) - UUID of the Custom Field.

Request body (application/json):

- `values`: array of string (required) - List of values to append to the field. e.g. `["Option 3", "Option 4"]`

Response 200 (application/json): object

- `success`: boolean e.g. `true`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/workforce-planning/v2/companies/{company_id}/custom-fields/{field_id}/values

**Remove Values from Custom Field**
Removes specified values from a Custom Field with type `select` or `multi-select`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] oneOf(integer | string(uuid)) (required) - Unique identifier for the company. This parameter accepts both formats: - **Recommended**: Procore company ID (integer) - Use this for new integrations - Legacy: LaborChart UUID format (uuid string) - Supported for ba...
- `field_id` [path] string(uuid) (required) - UUID of the Custom Field.

Request body (application/json):

- `values`: array of string (required) - List of values to remove from the field. e.g. `["Option 3", "Option 4"]`

Response 200 (application/json): object

- `success`: boolean e.g. `true`

Error responses: 400, 401 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

