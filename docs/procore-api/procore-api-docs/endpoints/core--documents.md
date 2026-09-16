# Procore API: Documents (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: Documents)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Company Folders and Files](#company-folders-and-files) - versions 1.0
- [Documents](#documents) - versions 2.0, 1.0
- [Local Files](#local-files) - versions 1.0
- [PDF Template Configs](#pdf-template-configs) - versions 1.0
- [Project Documents](#project-documents) - versions 1.0
- [Project Folders and Files](#project-folders-and-files) - versions 1.0

## Company Folders and Files

Resource id: `company-folders-and-files`. Raw spec: `../openapi-raw/company-folders-and-files.json`. Web: https://developers.procore.com/reference/rest/company-folders-and-files?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### POST /rest/v1.0/companies/{company_id}/file_versions

**Create company file version**
Uploads a new version of a specific file in the Company Documents tool.
See the Procore Support website articles on [Company Documents](https://support.procore.com/products/online/user-guide/company-level/documents).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `file_id` [query] integer (required) - The id of the File

Request body (multipart/form-data) (required):

- `file_version`: oneOf(object | object) (required)

Response 201 (application/json): object

- `id`: integer - File version id e.g. `12`
- `notes`: string - File version notes e.g. `this is a cool file version`
- `url`: string - File version url e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
- `size`: integer - File version size in bytes e.g. `12674`
- `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
- `number`: integer - File version number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `prostore_file`: object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
  - `filename`: string - :filename to be deprecated, use :name
- `file_id`: integer - Parent Files id e.g. `14`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/file_versions/{id}

**Show company file version**
Show detailed information about a File Version.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the file version

Response 200 (application/json): object

- `id`: integer - File version id e.g. `12`
- `notes`: string - File version notes e.g. `this is a cool file version`
- `url`: string - File version url e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
- `size`: integer - File version size in bytes e.g. `12674`
- `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
- `number`: integer - File version number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `prostore_file`: object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
  - `filename`: string - :filename to be deprecated, use :name
- `file_id`: integer - Parent Files id e.g. `14`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/files

**Create company File**
Create a new File associated with specific Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (multipart/form-data) (required):

- `file`: oneOf(object | object) (required)

Response 201 (application/json): object

- `id`: integer - File id e.g. `12`
- `name`: string - File name e.g. `file.pdf`
- `parent_id`: integer - File parent id e.g. `1`
- `size`: integer - File size e.g. `54332`
- `description`: string - File description e.g. `this is a cool file`
- `updated_at`: string(date-time) - File updated at e.g. `2017-01-04T21:27:18Z`
- `created_at`: string(date-time) - File created at e.g. `2017-01-04T21:27:18Z`
- `checked_out_until`: string(date-time) - File checked out until e.g. `2017-01-04T21:27:18Z`
- `name_with_path`: string - Full file path with filename e.g. `Root Folder/file.pdf`
- `private`: boolean - File private status e.g. `false`
- `is_tracked`: boolean - File is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `checked_out_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `file_type`: string - File type e.g. `PDF`
- `file_versions`: array of object
  - `id`: integer - File version id e.g. `12`
  - `notes`: string - File version notes e.g. `this is a cool file version`
  - `url`: string - File version url e.g. `www.file.com`
  - `size`: integer - File version size in bytes e.g. `12674`
  - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
  - `number`: integer - File version number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `file_id`: integer - Parent Files id e.g. `14`
- `legacy_id`: integer - Legacy File id e.g. `12`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/files/{id}

**Show company File**
Show detailed information about a File.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the File
- `show_latest_version_only` [query] boolean - Show only latest File Version

Response 200 (application/json): object

- `id`: integer - File id e.g. `12`
- `name`: string - File name e.g. `file.pdf`
- `parent_id`: integer - File parent id e.g. `1`
- `size`: integer - File size e.g. `54332`
- `description`: string - File description e.g. `this is a cool file`
- `updated_at`: string(date-time) - File updated at e.g. `2017-01-04T21:27:18Z`
- `created_at`: string(date-time) - File created at e.g. `2017-01-04T21:27:18Z`
- `checked_out_until`: string(date-time) - File checked out until e.g. `2017-01-04T21:27:18Z`
- `name_with_path`: string - Full file path with filename e.g. `Root Folder/file.pdf`
- `private`: boolean - File private status e.g. `false`
- `is_tracked`: boolean - File is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `checked_out_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `file_type`: string - File type e.g. `PDF`
- `file_versions`: array of object
  - `id`: integer - File version id e.g. `12`
  - `notes`: string - File version notes e.g. `this is a cool file version`
  - `url`: string - File version url e.g. `www.file.com`
  - `size`: integer - File version size in bytes e.g. `12674`
  - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
  - `number`: integer - File version number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `file_id`: integer - Parent Files id e.g. `14`
- `legacy_id`: integer - Legacy File id e.g. `12`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/files/{id}

**Update company File**
Update a specific File (creates a new file version).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the File

Request body (application/json) (required):

- `file`: object (required)
  - `parent_id`: integer - The ID of the parent folder to move the file to e.g. `12`
  - `name`: string - The Name of the file e.g. `test_folder`
  - `checked_out_until`: string(date-time) - Check out a file until the specified time. Admins may reset checkout by sending "null" e.g. `2022-08-12T12:42:34Z`
  - `is_tracked`: boolean - Status if a file should be tracked (true/false) e.g. `false`
  - `explicit_permissions`: boolean - Set file to private (true/false) e.g. `false`
  - `description`: string - A description of the file e.g. `This file is good`
  - `upload_uuid`: string - UUID referencing a previously completed Upload. This is the recommended approach for file uploads. See Company Uploads or Project Uploads endpoints for instructions on how to use uploads. You should not use both data ... e.g. `1QJ83Q56CVQR4X3C0JG7YV86F8`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - File id e.g. `12`
- `name`: string - File name e.g. `file.pdf`
- `parent_id`: integer - File parent id e.g. `1`
- `size`: integer - File size e.g. `54332`
- `description`: string - File description e.g. `this is a cool file`
- `updated_at`: string(date-time) - File updated at e.g. `2017-01-04T21:27:18Z`
- `created_at`: string(date-time) - File created at e.g. `2017-01-04T21:27:18Z`
- `checked_out_until`: string(date-time) - File checked out until e.g. `2017-01-04T21:27:18Z`
- `name_with_path`: string - Full file path with filename e.g. `Root Folder/file.pdf`
- `private`: boolean - File private status e.g. `false`
- `is_tracked`: boolean - File is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `checked_out_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `file_type`: string - File type e.g. `PDF`
- `file_versions`: array of object
  - `id`: integer - File version id e.g. `12`
  - `notes`: string - File version notes e.g. `this is a cool file version`
  - `url`: string - File version url e.g. `www.file.com`
  - `size`: integer - File version size in bytes e.g. `12674`
  - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
  - `number`: integer - File version number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `file_id`: integer - Parent Files id e.g. `14`
- `legacy_id`: integer - Legacy File id e.g. `12`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
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

Error responses: 400, 401, 403, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/files/{id}

**Delete company File**
Delete a specific File.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the File

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/files/{id}/send_email

**Send email for file sharing**
Send email for file sharing.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the File

Request body (application/json) (required):

- `subject`: string - Email Subject e.g. `Description of email`
- `body`: string - Email Body e.g. `Body of email`
- `distribution_ids`: array of integer
- `cc_distribution_ids`: array of integer
- `bcc_distribution_ids`: array of integer

Response 204: No Content (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/folders

**List company Folders and Files**
Return a list of Folders and Files associated with a specific Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `exclude_folders` [query] boolean - Exclude children Folders from results
- `exclude_files` [query] boolean - Exclude children Files from results

Response 200 (application/json): object

- `id`: integer - Folder id e.g. `1`
- `name`: string - Folder name e.g. `Root Folder`
- `parent_id`: integer - Folder parent id
- `private`: boolean - Folder private status e.g. `false`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with Folder name e.g. `Root Folder`
- `folders`: array of object - Folder subfolders
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `parent_id`: integer - Folder parent id e.g. `1`
  - `private`: boolean - Folder private status e.g. `true`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `is_tracked`: boolean - Folder is tracked status e.g. `true`
  - `tracked_folder`: object - Folder watchers
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
  - `folders`: array of object - The child Folders of the Folder
  - `files`: array of object - The child Files of the Folder
  - `read_only`: boolean - Folder read only status e.g. `true`
  - `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `has_children`: boolean - Folder has children status e.g. `true`
  - `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
  - `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `files`: array of object - Folder files
  - `id`: integer - The unique identifier of the file. e.g. `12`
  - `name`: string - Name of the file. e.g. `file.pdf`
  - `parent_id`: integer - The unique identifier of the file parent. e.g. `1`
  - `size`: integer - File size in bytes. e.g. `54332`
  - `description`: string - A description of the file. e.g. `this is a cool file`
  - `updated_at`: string(date-time) - File updated datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `created_at`: string(date-time) - File created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `checked_out_until`: string(date-time) - File checked out until datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `name_with_path`: string - Full file path with filename. e.g. `Root Folder/file.pdf`
  - `private`: boolean - File private status e.g. `false`
  - `is_tracked`: boolean - If true, file is being tracked. e.g. `false`
  - `tracked_folder`: object - Folder watchers
  - `checked_out_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `file_type`: string - Type of the file. e.g. `PDF`
  - `file_versions`: array of object
    - `id`: integer - The unique identifier of the file version. e.g. `12`
    - `notes`: string - File version notes e.g. `These are notes about the current file version.`
    - `url`: string - The URL where the file can be downloaded. e.g. `www.file.com`
    - `size`: integer - File version size in bytes. e.g. `12674`
    - `created_at`: string(date-time) - File version created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
    - `number`: integer - File version number. e.g. `1`
    - `created_by`: object
    - `prostore_file`: object
    - `file_id`: integer - The unique identifier of the parent files. e.g. `14`
  - `legacy_id`: integer - The unique identifier of the legacy file. e.g. `12`
  - `is_deleted`: boolean - If true, file is in the recycle bin. e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `read_only`: boolean - Folder read only status e.g. `false`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/folders

**Create company Folder**
Create a new Folder associated with a specific Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `folder`: object (required)
  - `parent_id`: integer - The ID of the parent folder to create the folder in. If not set the folder will be created under the root folder. e.g. `12`
  - `name`: string (required) - The Name of the folder e.g. `test_folder`
  - `is_tracked`: boolean - Status if a folder should be tracked (true/false) e.g. `true`
  - `explicit_permissions`: boolean - Set folder to private (true/false) e.g. `true`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - Folder id e.g. `2`
- `name`: string - Folder name e.g. `Subfolder`
- `parent_id`: integer - Folder parent id e.g. `1`
- `private`: boolean - Folder private status e.g. `true`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `true`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
- `folders`: array of object - The child Folders of the Folder
- `files`: array of object - The child Files of the Folder
- `read_only`: boolean - Folder read only status e.g. `true`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/folders/{id}

**Show company Folder**
Show detail on a specific Folder.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Folder
- `exclude_folders` [query] boolean - Exclude children Folders from results
- `exclude_files` [query] boolean - Exclude children Files from results

Response 200 (application/json): object

- `id`: integer - Folder id e.g. `1`
- `name`: string - Folder name e.g. `Root Folder`
- `parent_id`: integer - Folder parent id
- `private`: boolean - Folder private status e.g. `false`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with Folder name e.g. `Root Folder`
- `folders`: array of object - Folder subfolders
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `parent_id`: integer - Folder parent id e.g. `1`
  - `private`: boolean - Folder private status e.g. `true`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `is_tracked`: boolean - Folder is tracked status e.g. `true`
  - `tracked_folder`: object - Folder watchers
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
  - `folders`: array of object - The child Folders of the Folder
  - `files`: array of object - The child Files of the Folder
  - `read_only`: boolean - Folder read only status e.g. `true`
  - `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `has_children`: boolean - Folder has children status e.g. `true`
  - `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
  - `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `files`: array of object - Folder files
  - `id`: integer - The unique identifier of the file. e.g. `12`
  - `name`: string - Name of the file. e.g. `file.pdf`
  - `parent_id`: integer - The unique identifier of the file parent. e.g. `1`
  - `size`: integer - File size in bytes. e.g. `54332`
  - `description`: string - A description of the file. e.g. `this is a cool file`
  - `updated_at`: string(date-time) - File updated datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `created_at`: string(date-time) - File created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `checked_out_until`: string(date-time) - File checked out until datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `name_with_path`: string - Full file path with filename. e.g. `Root Folder/file.pdf`
  - `private`: boolean - File private status e.g. `false`
  - `is_tracked`: boolean - If true, file is being tracked. e.g. `false`
  - `tracked_folder`: object - Folder watchers
  - `checked_out_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `file_type`: string - Type of the file. e.g. `PDF`
  - `file_versions`: array of object
    - `id`: integer - The unique identifier of the file version. e.g. `12`
    - `notes`: string - File version notes e.g. `These are notes about the current file version.`
    - `url`: string - The URL where the file can be downloaded. e.g. `www.file.com`
    - `size`: integer - File version size in bytes. e.g. `12674`
    - `created_at`: string(date-time) - File version created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
    - `number`: integer - File version number. e.g. `1`
    - `created_by`: object
    - `prostore_file`: object
    - `file_id`: integer - The unique identifier of the parent files. e.g. `14`
  - `legacy_id`: integer - The unique identifier of the legacy file. e.g. `12`
  - `is_deleted`: boolean - If true, file is in the recycle bin. e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `read_only`: boolean - Folder read only status e.g. `false`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/folders/{id}

**Update company Folder**
Update a specific Folder.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Folder

Request body (application/json) (required):

- `folder`: object (required)
  - `parent_id`: integer - The ID of the parent folder to create the folder in. If not set the folder will be created under the root folder. e.g. `12`
  - `name`: string (required) - The Name of the folder e.g. `test_folder`
  - `is_tracked`: boolean - Status if a folder should be tracked (true/false) e.g. `true`
  - `explicit_permissions`: boolean - Set folder to private (true/false) e.g. `true`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Folder id e.g. `1`
- `name`: string - Folder name e.g. `Root Folder`
- `parent_id`: integer - Folder parent id
- `private`: boolean - Folder private status e.g. `false`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with Folder name e.g. `Root Folder`
- `folders`: array of object - Folder subfolders
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `parent_id`: integer - Folder parent id e.g. `1`
  - `private`: boolean - Folder private status e.g. `true`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `is_tracked`: boolean - Folder is tracked status e.g. `true`
  - `tracked_folder`: object - Folder watchers
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
  - `folders`: array of object - The child Folders of the Folder
  - `files`: array of object - The child Files of the Folder
  - `read_only`: boolean - Folder read only status e.g. `true`
  - `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `has_children`: boolean - Folder has children status e.g. `true`
  - `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
  - `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `files`: array of object - Folder files
  - `id`: integer - The unique identifier of the file. e.g. `12`
  - `name`: string - Name of the file. e.g. `file.pdf`
  - `parent_id`: integer - The unique identifier of the file parent. e.g. `1`
  - `size`: integer - File size in bytes. e.g. `54332`
  - `description`: string - A description of the file. e.g. `this is a cool file`
  - `updated_at`: string(date-time) - File updated datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `created_at`: string(date-time) - File created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `checked_out_until`: string(date-time) - File checked out until datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `name_with_path`: string - Full file path with filename. e.g. `Root Folder/file.pdf`
  - `private`: boolean - File private status e.g. `false`
  - `is_tracked`: boolean - If true, file is being tracked. e.g. `false`
  - `tracked_folder`: object - Folder watchers
  - `checked_out_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `file_type`: string - Type of the file. e.g. `PDF`
  - `file_versions`: array of object
    - `id`: integer - The unique identifier of the file version. e.g. `12`
    - `notes`: string - File version notes e.g. `These are notes about the current file version.`
    - `url`: string - The URL where the file can be downloaded. e.g. `www.file.com`
    - `size`: integer - File version size in bytes. e.g. `12674`
    - `created_at`: string(date-time) - File version created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
    - `number`: integer - File version number. e.g. `1`
    - `created_by`: object
    - `prostore_file`: object
    - `file_id`: integer - The unique identifier of the parent files. e.g. `14`
  - `legacy_id`: integer - The unique identifier of the legacy file. e.g. `12`
  - `is_deleted`: boolean - If true, file is in the recycle bin. e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `read_only`: boolean - Folder read only status e.g. `false`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/folders/{id}

**Delete company Folder**
Delete the specified Folder by moving it to the recycle bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the Folder

Response 200: OK (no body)

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Documents

Resource id: `documents`. Raw spec: `../openapi-raw/documents.json`. Web: https://developers.procore.com/reference/rest/documents?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v2.0/companies/{company_id}/folders/{id}

**Show company Folder**
Return immediate accessible children for a specific company folder as a single mixed collection of folders and files. Descendants beyond one level are not included, and any `filters[...]` parameters apply to those immediate children.
With `include_descendants=true` and at least one `filters[...]` parameter, the endpoint searches this folder's entire subtree instead. It never widens beyond the addressed folder, so matches elsewhere in the company are not returned; use the company root-children endpoint for that. Recycle bin content is excluded unless `filters[is_in_recycle_bin]` is provided.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the resource.
- `view` [query] string enum[normal, web_normal, sync_compact] - Response projection. Supports legacy `web_normal` requests for compatibility with v1 folder-show flows. `normal` and `web_normal` include `has_private_ancestor`; `sync_compact` omits it.
- `show_latest_file_version_only` [query] boolean - Return only the latest file version per file.
- `exclude_folders` [query] boolean - Exclude child folders from the response.
- `exclude_files` [query] boolean - Exclude child files from the response.
- `include_descendants` [query] boolean - Search the addressed folder's entire subtree instead of only its immediate children. On a root-children endpoint the addressed folder is the root, so this spans the whole Documents tool; on a nested folder endpoint it...
- `sort` [query] string - Sort immediate folder children by one or more comma-separated terms in left-to-right priority order. Supported fields are `updated_at`, `name`, `document_type`, `created_at`, and `created_by`. Prefix a term with `-` f...
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions, as a comma-separated list (e.g. `filters[file_type]=pdf,txt`).
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[folder_id]` [query] string - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of immediate child folders and files.
  - `id`: string - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `file.png`
  - `parent_id`: string - Folder parent id e.g. `1`
  - `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
  - `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `document_type`: string enum[file, folder] - Folder or File e.g. `file`
  - `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
  - `private`: boolean - Status whether Folder is explicitly private e.g. `false`
  - `has_private_ancestor`: boolean - Whether this item inherits privacy from above it, meaning its parent or any further ancestor is explicitly private. Independent of `private`, which stays true only when this item is itself explicitly private: an item ... e.g. `false`
  - `private_parent`: object - Not returned by these endpoints. Retained only so the documented contract stays unchanged; use `has_private_ancestor` instead.
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `tracked_folder`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `file`: object - will be filled if document_type is a file
    - `checked_out_by`: object
    - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
    - `current_version`: object
    - `description`: string - File name e.g. `some description`
    - `file_type`: string - File type e.g. `PDF`
  - `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
    - `has_children`: boolean - whether the Folder has children e.g. `false`
    - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
    - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/folders

**List company root folder children**
Returns the immediate accessible children of the company root folder as a single mixed collection of folders and files (descendants beyond one level are not included). Any `filters[...]` parameters apply to those immediate children.
With `include_descendants=true` and at least one `filters[...]` parameter, the endpoint instead searches the entire company Documents tool and returns every accessible folder and file matching all provided filters, regardless of depth in the folder tree. `sort`, `exclude_folders`, `exclude_files`, and pagination apply in both modes. When searching descendants, recycle bin content is excluded unless `filters[is_in_recycle_bin]` is provided, and `filters[private]` matches only items explicitly marked private (items inheriting privacy from a parent folder are not matched).
Results are permission-filtered for every user: an item is returned only when it and all of its ancestors are accessible. Schedules content requires the "Can See Schedule" permission and recycle bin content requires the "See Recycle Bin" permission; without them, those folders and everything beneath them are omitted. The `Total` header is exact and pagination is uncapped in both modes.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `view` [query] string enum[normal, web_normal, sync_compact] - Response projection. Supports legacy `web_normal` requests for compatibility with v1 folder-index flows. `normal` and `web_normal` include `has_private_ancestor`; `sync_compact` omits it.
- `show_latest_file_version_only` [query] boolean - Return only the latest file version per file.
- `exclude_folders` [query] boolean - Exclude child folders from the response.
- `exclude_files` [query] boolean - Exclude child files from the response.
- `include_descendants` [query] boolean - Search the addressed folder's entire subtree instead of only its immediate children. On a root-children endpoint the addressed folder is the root, so this spans the whole Documents tool; on a nested folder endpoint it...
- `sort` [query] string - Sort immediate folder children by one or more comma-separated terms in left-to-right priority order. Supported fields are `updated_at`, `name`, `document_type`, `created_at`, and `created_by`. Prefix a term with `-` f...
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions, as a comma-separated list (e.g. `filters[file_type]=pdf,txt`).
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[folder_id]` [query] string - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of immediate child folders and files.
  - `id`: string - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `file.png`
  - `parent_id`: string - Folder parent id e.g. `1`
  - `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
  - `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `document_type`: string enum[file, folder] - Folder or File e.g. `file`
  - `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
  - `private`: boolean - Status whether Folder is explicitly private e.g. `false`
  - `has_private_ancestor`: boolean - Whether this item inherits privacy from above it, meaning its parent or any further ancestor is explicitly private. Independent of `private`, which stays true only when this item is itself explicitly private: an item ... e.g. `false`
  - `private_parent`: object - Not returned by these endpoints. Retained only so the documented contract stays unchanged; use `has_private_ancestor` instead.
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `tracked_folder`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `file`: object - will be filled if document_type is a file
    - `checked_out_by`: object
    - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
    - `current_version`: object
    - `description`: string - File name e.g. `some description`
    - `file_type`: string - File type e.g. `PDF`
  - `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
    - `has_children`: boolean - whether the Folder has children e.g. `false`
    - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
    - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/folders/{id}

**Show project Folder (Company-scoped)**
Return immediate accessible children for a specific project folder as a single mixed collection of folders and files, scoped under a company. Descendants beyond one level are not included, and any `filters[...]` parameters apply to those immediate children.
With `include_descendants=true` and at least one `filters[...]` parameter, the endpoint searches this folder's entire subtree instead. It never widens beyond the addressed folder, so matches elsewhere in the project are not returned; use the project root-children endpoint for that. Recycle bin content is excluded unless `filters[is_in_recycle_bin]` is provided.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the resource.
- `view` [query] string enum[normal, web_normal, sync_compact] - Response projection. Supports legacy `web_normal` requests for compatibility with v1 folder-show flows. `normal` and `web_normal` include `has_private_ancestor`; `sync_compact` omits it.
- `show_latest_file_version_only` [query] boolean - Return only the latest file version per file.
- `exclude_folders` [query] boolean - Exclude child folders from the response.
- `exclude_files` [query] boolean - Exclude child files from the response.
- `include_descendants` [query] boolean - Search the addressed folder's entire subtree instead of only its immediate children. On a root-children endpoint the addressed folder is the root, so this spans the whole Documents tool; on a nested folder endpoint it...
- `sort` [query] string - Sort immediate folder children by one or more comma-separated terms in left-to-right priority order. Supported fields are `updated_at`, `name`, `document_type`, `created_at`, and `created_by`. Prefix a term with `-` f...
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions, as a comma-separated list (e.g. `filters[file_type]=pdf,txt`).
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[folder_id]` [query] string - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `filters[custom_tag_ids]` [query] array of integer - Return item(s) with specified custom tag IDs
- `filters[custom_fields]` [query] string - Return item(s) whose custom field values match the supplied JSON object, given as a string mapping custom field definition ids to the values to match (e.g. `{"12345":"Bid Set"}`). Keys must be integer definition ids; ...
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of immediate child folders and files.
  - `id`: string - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `file.png`
  - `parent_id`: string - Folder parent id e.g. `1`
  - `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
  - `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `document_type`: string enum[file, folder] - Folder or File e.g. `file`
  - `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
  - `private`: boolean - Status whether Folder is explicitly private e.g. `false`
  - `has_private_ancestor`: boolean - Whether this item inherits privacy from above it, meaning its parent or any further ancestor is explicitly private. Independent of `private`, which stays true only when this item is itself explicitly private: an item ... e.g. `false`
  - `private_parent`: object - Not returned by these endpoints. Retained only so the documented contract stays unchanged; use `has_private_ancestor` instead.
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `tracked_folder`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `file`: object - will be filled if document_type is a file
    - `checked_out_by`: object
    - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
    - `current_version`: object
    - `description`: string - File name e.g. `some description`
    - `file_type`: string - File type e.g. `PDF`
  - `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
    - `has_children`: boolean - whether the Folder has children e.g. `false`
    - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
    - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/folders

**List project root folder children (Company-scoped)**
Returns the immediate accessible children of the project root folder as a single mixed collection of folders and files, scoped under a company (descendants beyond one level are not included). Any `filters[...]` parameters apply to those immediate children.
With `include_descendants=true` and at least one `filters[...]` parameter, the endpoint instead searches the entire project Documents tool and returns every accessible folder and file matching all provided filters, regardless of depth in the folder tree. `sort`, `exclude_folders`, `exclude_files`, and pagination apply in both modes. When searching descendants, recycle bin content is excluded unless `filters[is_in_recycle_bin]` is provided, and `filters[private]` matches only items explicitly marked private (items inheriting privacy from a parent folder are not matched).
Results are permission-filtered for every user: an item is returned only when it and all of its ancestors are accessible. Schedules content requires the "Can See Schedule" permission and recycle bin content requires the "See Recycle Bin" permission; without them, those folders and everything beneath them are omitted. The `Total` header is exact and pagination is uncapped in both modes.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `view` [query] string enum[normal, web_normal, sync_compact] - Response projection. Supports legacy `web_normal` requests for compatibility with v1 folder-index flows. `normal` and `web_normal` include `has_private_ancestor`; `sync_compact` omits it.
- `show_latest_file_version_only` [query] boolean - Return only the latest file version per file.
- `exclude_folders` [query] boolean - Exclude child folders from the response.
- `exclude_files` [query] boolean - Exclude child files from the response.
- `include_descendants` [query] boolean - Search the addressed folder's entire subtree instead of only its immediate children. On a root-children endpoint the addressed folder is the root, so this spans the whole Documents tool; on a nested folder endpoint it...
- `sort` [query] string - Sort immediate folder children by one or more comma-separated terms in left-to-right priority order. Supported fields are `updated_at`, `name`, `document_type`, `created_at`, and `created_by`. Prefix a term with `-` f...
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions, as a comma-separated list (e.g. `filters[file_type]=pdf,txt`).
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[folder_id]` [query] string - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `filters[custom_tag_ids]` [query] array of integer - Return item(s) with specified custom tag IDs
- `filters[custom_fields]` [query] string - Return item(s) whose custom field values match the supplied JSON object, given as a string mapping custom field definition ids to the values to match (e.g. `{"12345":"Bid Set"}`). Keys must be integer definition ids; ...
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of immediate child folders and files.
  - `id`: string - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `file.png`
  - `parent_id`: string - Folder parent id e.g. `1`
  - `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
  - `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `document_type`: string enum[file, folder] - Folder or File e.g. `file`
  - `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
  - `private`: boolean - Status whether Folder is explicitly private e.g. `false`
  - `has_private_ancestor`: boolean - Whether this item inherits privacy from above it, meaning its parent or any further ancestor is explicitly private. Independent of `private`, which stays true only when this item is itself explicitly private: an item ... e.g. `false`
  - `private_parent`: object - Not returned by these endpoints. Retained only so the documented contract stays unchanged; use `has_private_ancestor` instead.
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `tracked_folder`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `file`: object - will be filled if document_type is a file
    - `checked_out_by`: object
    - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
    - `current_version`: object
    - `description`: string - File name e.g. `some description`
    - `file_type`: string - File type e.g. `PDF`
  - `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
    - `has_children`: boolean - whether the Folder has children e.g. `false`
    - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
    - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/projects/{project_id}/documents

**Project Folder and File index**
Return a list of all folders and files in the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended] - Determines how much information to include in the response. `normal` is the default, `extended` provides additional data. The example below shows the `extended` response.
- `sort` [query] string enum[updated_at, name, document_type, document_type_then_name, document_type_then_created_at, document_type_then_updated_at] - Field to sort by. If the field is passed with a - (EX: -updated_at) it is sorted in reverse order
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions, as a comma-separated list (e.g. `filters[file_type]=pdf,txt`).
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[folder_id]` [query] string - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `filters[custom_tag_ids]` [query] array of integer - Return item(s) with specified custom tag IDs
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Documents
  - `id`: string - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `file.png`
  - `parent_id`: string - Folder parent id e.g. `1`
  - `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
  - `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `document_type`: string enum[file, folder] - Folder or File e.g. `file`
  - `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
  - `private`: boolean - Status whether Folder is explicitly private e.g. `false`
  - `private_parent`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `tracked_folder`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `file`: object - will be filled if document_type is a file
    - `checked_out_by`: object
    - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
    - `current_version`: object
    - `description`: string - File name e.g. `some description`
    - `file_type`: string - File type e.g. `PDF`
  - `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
    - `has_children`: boolean - whether the Folder has children e.g. `false`
    - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
    - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/documents

**Project Folder and File index (Company-scoped)**
Return a list of all folders and files in the project, scoped under a company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended] - Determines how much information to include in the response. `normal` is the default, `extended` provides additional data. The example below shows the `extended` response.
- `sort` [query] string enum[updated_at, name, document_type, document_type_then_name, document_type_then_created_at, document_type_then_updated_at] - Field to sort by. If the field is passed with a - (EX: -updated_at) it is sorted in reverse order
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions, as a comma-separated list (e.g. `filters[file_type]=pdf,txt`).
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[folder_id]` [query] string - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `filters[custom_tag_ids]` [query] array of integer - Return item(s) with specified custom tag IDs
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Documents
  - `id`: string - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `file.png`
  - `parent_id`: string - Folder parent id e.g. `1`
  - `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
  - `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `document_type`: string enum[file, folder] - Folder or File e.g. `file`
  - `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
  - `private`: boolean - Status whether Folder is explicitly private e.g. `false`
  - `private_parent`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `tracked_folder`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `file`: object - will be filled if document_type is a file
    - `checked_out_by`: object
    - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
    - `current_version`: object
    - `description`: string - File name e.g. `some description`
    - `file_type`: string - File type e.g. `PDF`
  - `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
    - `has_children`: boolean - whether the Folder has children e.g. `false`
    - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
    - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/documents

**Company Folder and File index**
Return a list of all folders and files in the company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `view` [query] string enum[normal, extended] - Determines how much information to include in the response. `normal` is the default, `extended` provides additional data. The example below shows the `extended` response.
- `sort` [query] string enum[updated_at, name, document_type, document_type_then_name, document_type_then_created_at, document_type_then_updated_at] - Field to sort by. If the field is passed with a - (EX: -updated_at) it is sorted in reverse order
- `filters[created_by_id]` [query] array of string - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions, as a comma-separated list (e.g. `filters[file_type]=pdf,txt`).
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[folder_id]` [query] string - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Documents
  - `id`: string - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `file.png`
  - `parent_id`: string - Folder parent id e.g. `1`
  - `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
  - `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `document_type`: string enum[file, folder] - Folder or File e.g. `file`
  - `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
  - `private`: boolean - Status whether Folder is explicitly private e.g. `false`
  - `private_parent`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `tracked_folder`: object
    - `id`: string - Folder id e.g. `2`
    - `name`: string - Folder name e.g. `Subfolder`
  - `file`: object - will be filled if document_type is a file
    - `checked_out_by`: object
    - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
    - `current_version`: object
    - `description`: string - File name e.g. `some description`
    - `file_type`: string - File type e.g. `PDF`
  - `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
    - `has_children`: boolean - whether the Folder has children e.g. `false`
    - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
    - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/documents/{document_id}/revisions  **[BETA]**

**List of Document Revisions (Company)**
Return a list of the 20 most recent file versions (revisions) for a specific document in a company, sorted by created_at in descending order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `document_id` [path] string (required) - Unique identifier for the document (file).

Response 200 (application/json): object

- `data`: array of object - Array of Document Revisions
  - `id`: string - File version id e.g. `12345`
  - `prostore_id`: string - Prostore file id e.g. `933005548`
  - `url`: string(uri) - URL for the file version
  - `file_id`: string - File id (prostore file id) e.g. `933005548`
  - `file_name`: string - Name of the file
  - `file_size`: integer - Size of the file in bytes
  - `file_version`: integer - Version number of the file
  - `file_type`: string - File type or extension (e.g. pdf)
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `created_at`: string(date-time) - When this version was created

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/documents/{document_id}/revisions  **[BETA]**

**List of Document Revisions (Project)**
Return a list of the 20 most recent file versions (revisions) for a specific document in a project, sorted by created_at in descending order.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `document_id` [path] string (required) - Unique identifier for the document (file).

Response 200 (application/json): object

- `data`: array of object - Array of Document Revisions
  - `id`: string - File version id e.g. `12345`
  - `prostore_id`: string - Prostore file id e.g. `933005548`
  - `url`: string(uri) - URL for the file version
  - `file_id`: string - File id (prostore file id) e.g. `933005548`
  - `file_name`: string - Name of the file
  - `file_size`: integer - Size of the file in bytes
  - `file_version`: integer - Version number of the file
  - `file_type`: string - File type or extension (e.g. pdf)
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: string - ID e.g. `161072`
    - `name`: string - Name e.g. `Carl the Contractor`
  - `created_at`: string(date-time) - When this version was created

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/documents  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Company Folder and File index**
Return a list of all folders and files in the company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `view` [query] string enum[normal, extended] - Determines how much information to include in the response. `normal` is the default, `extended` provides additional data. The example below shows the `extended` response.
- `sort` [query] string enum[updated_at, name, document_type, document_type_then_name, document_type_then_created_at, document_type_then_updated_at] - Field to sort by. If the field is passed with a - (EX: -updated_at) it is sorted in reverse order
- `filters[created_by_id]` [query] array of integer - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Return item(s) that contain string in document name and file description
- `filters[folder_id]` [query] integer - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Folder id e.g. `2`
- `name`: string - Folder name e.g. `file.png`
- `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder/file.png`
- `parent_id`: integer - Folder parent id e.g. `1`
- `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
- `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `document_type`: string enum[file, folder] - Folder or File e.g. `file`
- `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
- `private`: boolean - Status whether Folder is explicitly private e.g. `false`
- `private_parent`: object
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
- `tracked_folder`: object
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
- `file`: object - will be filled if document_type is a file
  - `checked_out_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `locale`: string - Name e.g. `en-CA`
  - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
  - `current_version`: object
    - `id`: integer - File version id e.g. `12`
    - `notes`: string - File version notes e.g. `this is a cool file version`
    - `url`: string - File version url e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
    - `size`: integer - File version size in bytes e.g. `12674`
    - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
    - `number`: integer - File version number e.g. `1`
    - `created_by`: object
    - `prostore_file`: object
    - `file_id`: integer - Parent Files id e.g. `14`
  - `description`: string - File name e.g. `some description`
  - `file_type`: string - File type e.g. `PDF`
- `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
  - `has_children`: boolean - whether the Folder has children e.g. `false`
  - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
  - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
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

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/documents  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Project Folder and File index**
Return a list of all folders and files in the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended] - Determines how much information to include in the response. `normal` is the default, `extended` provides additional data. The example below shows the `extended` response.
- `sort` [query] string enum[updated_at, name, document_type, document_type_then_name, document_type_then_created_at, document_type_then_updated_at] - Field to sort by. If the field is passed with a - (EX: -updated_at) it is sorted in reverse order
- `filters[created_by_id]` [query] array of integer - Return item(s) created by the specified User IDs
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[document_type]` [query] string enum[file, folder] - Return item(s) that are file or folder
- `filters[file_type]` [query] array of string - Return item(s) that have the file extensions
- `filters[is_in_recycle_bin]` [query] boolean - Return item(s) that are in or not in the recycle bin
- `filters[search]` [query] string - Return item(s) that contain string in document name and file description
- `filters[folder_id]` [query] integer - Returns the folder for a given id with all subfolders and subfiles up to a depth of 100. Depths greater than 100 will need multiple queries to get all children.
- `filters[custom_tag_ids]` [query] array of integer - Return item(s) with specified custom tag IDs
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Folder id e.g. `2`
- `name`: string - Folder name e.g. `file.png`
- `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder/file.png`
- `parent_id`: integer - Folder parent id e.g. `1`
- `created_at`: string(date-time) - Folder created at e.g. `2017-01-04T21:27:18Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `read_only`: boolean - File is read_only (only updatable via Schedule) e.g. `false`
- `is_deleted`: boolean - Folder is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `document_type`: string enum[file, folder] - Folder or File e.g. `file`
- `is_tracked`: boolean - Status whether Folder is explicitly tracked e.g. `false`
- `private`: boolean - Status whether Folder is explicitly private e.g. `false`
- `private_parent`: object
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
- `tracked_folder`: object
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
- `file`: object - will be filled if document_type is a file
  - `checked_out_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
    - `locale`: string - Name e.g. `en-CA`
  - `checked_out_until`: string - File checked out time e.g. `2017-01-04T21:27:18Z`
  - `current_version`: object
    - `id`: integer - File version id e.g. `12`
    - `notes`: string - File version notes e.g. `this is a cool file version`
    - `url`: string - File version url e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
    - `size`: integer - File version size in bytes e.g. `12674`
    - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
    - `number`: integer - File version number e.g. `1`
    - `created_by`: object
    - `prostore_file`: object
    - `file_id`: integer - Parent Files id e.g. `14`
  - `description`: string - File name e.g. `some description`
  - `file_type`: string - File type e.g. `PDF`
- `children`: object - if folder is implicitly tracked, reflects the folder that is the cause
  - `has_children`: boolean - whether the Folder has children e.g. `false`
  - `has_children_files`: boolean - whether the Folder has children that are file e.g. `false`
  - `has_children_folders`: boolean - whether the Folder has children that are not file e.g. `false`
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

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Local Files

Resource id: `local-files`. Raw spec: `../openapi-raw/local-files.json`. Web: https://developers.procore.com/reference/rest/local-files?version=latest
Product lines: PM Starter Pack

### GET /rest/v1.0/local_files/{uuid}

**Get file by its UUID**
Get binary file content(from the local disk) or redirect to the File service(on remote storage).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `uuid` [path] string (required) - UUID of the file

Response 200 (application/json): string(binary)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## PDF Template Configs

Resource id: `pdf-template-configs`. Raw spec: `../openapi-raw/pdf-template-configs.json`. Web: https://developers.procore.com/reference/rest/pdf-template-configs?version=latest
Product lines: PDF Template Configs

### GET /rest/v1.0/companies/{company_id}/pdf_template_configs

**List PDF template configs**
Returns a list of PDF template configs

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[record_generic_tool_id]` [query] integer - Return item(s) with the specified Generic Tool ID.
- `filters[project_id]` [query] integer - Return item(s) with the Project ID.
- `filters[template_name]` [query] string - Return item(s) with provided template_name.
- `filters[only_parent]` [query] boolean - Return only parent records.
- `scope` [query] string enum[inspections] - Return only scoped records.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `333675`
- `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
- `template_name`: string - PdfTemplate name e.g. `bid_single`
- `default_project`: boolean - set the configs as default to every company's project
- `pdf_config_options`: object
  - `collapse_na_sections`: boolean
  - `show_na_items`: boolean
  - `show_status_change`: boolean
  - `show_activity_details`: boolean
  - `disclaimer_footer_text`: boolean
  - `attendees_table_format`: boolean
  - `attendees_phone_number_display`: boolean

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/pdf_template_configs

**Create PDF Template Config**
Create new PDF Template Config for a specified company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `pdf_template_config`: object (required)
  - `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
  - `template_name`: string - PdfTemplate name e.g. `bid_single`
  - `default_project`: boolean - set the configs as default to every company's project
  - `pdf_config_options`: object
    - `collapse_na_sections`: boolean
    - `show_na_items`: boolean
    - `show_status_change`: boolean e.g. `complete`
    - `show_activity_details`: boolean e.g. `complete`
    - `disclaimer_footer_text`: boolean e.g. `complete`
    - `attendees_table_format`: boolean
    - `attendees_phone_number_display`: boolean

Response 201 (application/json): object

- `id`: integer - ID e.g. `333675`
- `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
- `template_name`: string - PdfTemplate name e.g. `bid_single`
- `default_project`: boolean - set the configs as default to every company's project
- `pdf_config_options`: object
  - `collapse_na_sections`: boolean
  - `show_na_items`: boolean
  - `show_status_change`: boolean
  - `show_activity_details`: boolean
  - `disclaimer_footer_text`: boolean
  - `attendees_table_format`: boolean
  - `attendees_phone_number_display`: boolean

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/pdf_template_configs/{id}

**Return a PDF Template Config**
Return a PDF Template Config

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - PDF Template Configs ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
- `template_name`: string - PdfTemplate name e.g. `bid_single`
- `default_project`: boolean - set the configs as default to every company's project
- `pdf_config_options`: object
  - `collapse_na_sections`: boolean
  - `show_na_items`: boolean
  - `show_status_change`: boolean
  - `show_activity_details`: boolean
  - `disclaimer_footer_text`: boolean
  - `attendees_table_format`: boolean
  - `attendees_phone_number_display`: boolean

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/pdf_template_configs/{id}

**Update a PDF Template Config**
Update a PDF Template Config

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - PDF Template Configs ID

Request body (application/json) (required):

- `pdf_template_config`: object (required)
  - `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
  - `template_name`: string - PdfTemplate name e.g. `bid_single`
  - `default_project`: boolean - set the configs as default to every company's project
  - `pdf_config_options`: object
    - `collapse_na_sections`: boolean
    - `show_na_items`: boolean
    - `show_status_change`: boolean e.g. `complete`
    - `show_activity_details`: boolean e.g. `complete`
    - `disclaimer_footer_text`: boolean e.g. `complete`
    - `attendees_table_format`: boolean
    - `attendees_phone_number_display`: boolean

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
- `template_name`: string - PdfTemplate name e.g. `bid_single`
- `default_project`: boolean - set the configs as default to every company's project
- `pdf_config_options`: object
  - `collapse_na_sections`: boolean
  - `show_na_items`: boolean
  - `show_status_change`: boolean
  - `show_activity_details`: boolean
  - `disclaimer_footer_text`: boolean
  - `attendees_table_format`: boolean
  - `attendees_phone_number_display`: boolean

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/pdf_template_configs/{id}

**Delete PDF Template Config**
Delete PDF Template Config

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - PDF Template Configs ID

Response 200: OK (no body)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/pdf_template_configs/{id}/update_default_project  **[OLDER VERSION - a newer path version exists below/above]**

**Update a PDF Template Config**
Update a PDF Template Config

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the PDF Template Config

Request body (application/json) (required):

- `pdf_template_config`: object (required)
  - `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
  - `template_name`: string - PdfTemplate name e.g. `bid_single`
  - `default_project`: boolean - set the configs as default to every company's project
  - `pdf_config_options`: object
    - `collapse_na_sections`: boolean
    - `show_na_items`: boolean
    - `show_status_change`: boolean e.g. `complete`
    - `show_activity_details`: boolean e.g. `complete`
    - `disclaimer_footer_text`: boolean e.g. `complete`
    - `attendees_table_format`: boolean
    - `attendees_phone_number_display`: boolean

Response 200 (application/json): object

- `id`: integer - ID e.g. `333675`
- `description`: string - description of the PdfTemplateConfig e.g. `pdf template config description`
- `template_name`: string - PdfTemplate name e.g. `bid_single`
- `default_project`: boolean - set the configs as default to every company's project
- `pdf_config_options`: object
  - `collapse_na_sections`: boolean
  - `show_na_items`: boolean
  - `show_status_change`: boolean
  - `show_activity_details`: boolean
  - `disclaimer_footer_text`: boolean
  - `attendees_table_format`: boolean
  - `attendees_phone_number_display`: boolean

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Documents

Resource id: `project-documents`. Raw spec: `../openapi-raw/project-documents.json`. Web: https://developers.procore.com/reference/rest/project-documents?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/document_custom_tags

**List project Document Custom Tags**
Return a list of Document Custom Tags for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[document_id]` [query] integer - ID of the Folder or File

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the object. e.g. `5324`
- `name`: string - Name of the Custom Tag. e.g. `Concrete`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/document_custom_tags

**Create Document Custom Tag**
Create a new Custom Tag for the specified Folder or File

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `document_id`: integer (required) - ID of the Folder or File to add the Custom Tag to e.g. `1234`
- `document_custom_tag`: object (required) - Document Custom Tag object
  - `name`: string (required) - Name of the Custom Tag e.g. `Concrete`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the object. e.g. `5324`
- `name`: string - Name of the Custom Tag. e.g. `Concrete`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/document_custom_tags/{id}

**Delete Document Custom Tag**
Delete a Custom Tag From a specified Folder or File

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Custom Tag
- `document_id` [query] integer (required) - ID of the Folder or File to remove the Custom Tag from

Response 200 (application/json): object

- `id`: integer - Unique identifier of the object. e.g. `5324`
- `name`: string - Name of the Custom Tag. e.g. `Concrete`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Folders and Files

Resource id: `project-folders-and-files`. Raw spec: `../openapi-raw/project-folders-and-files.json`. Web: https://developers.procore.com/reference/rest/project-folders-and-files?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### POST /rest/v1.0/file_versions

**Create project file version**
Upload a new version of a specific file in the Project Documents tool.
See the Procore Support website articles on [Project Documents](https://support.procore.com/products/online/user-guide/project-level/documents) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `file_id` [query] integer (required) - The id of the File

Request body (application/json) (required):

- `file_version`: object (required)
  - `name`: string - Name of the file when downloaded e.g. `my.pdf`
  - `notes`: string - Notes about the File Version e.g. `This file version is good`
  - `upload_uuid`: string - UUID referencing a previously completed Upload. This is the recommended approach for file uploads. See Company Uploads or Project Uploads endpoints for instructions on how to use uploads. You should not use both data ... e.g. `1QJ83Q56CVQR4X3C0JG7YV86F8`

Response 201 (application/json): object

- `id`: integer - File version id e.g. `12`
- `notes`: string - File version notes e.g. `this is a cool file version`
- `url`: string - File version url e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
- `size`: integer - File version size in bytes e.g. `12674`
- `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
- `number`: integer - File version number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `prostore_file`: object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
  - `filename`: string - :filename to be deprecated, use :name
- `file_id`: integer - Parent Files id e.g. `14`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/file_versions/{id}

**Show project file version**
Show detailed information about a File Version.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the file version
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - File version id e.g. `12`
- `notes`: string - File version notes e.g. `this is a cool file version`
- `url`: string - File version url e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
- `size`: integer - File version size in bytes e.g. `12674`
- `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
- `number`: integer - File version number e.g. `1`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `prostore_file`: object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string e.g. `https://storage.procore.com/v4/d/us-east-1/pro-core.com/companies/1/RR1NG2IB4...`
  - `filename`: string - :filename to be deprecated, use :name
- `file_id`: integer - Parent Files id e.g. `14`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/files

**Create project File**
Create a new File in the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `file`: object (required)
  - `parent_id`: integer - The ID of the parent folder to create the file in. If not set the file will be created under the root folder. e.g. `12`
  - `name`: string - The Name of the file e.g. `test_file.pdf`
  - `is_tracked`: boolean - Status if a file should be tracked (true/false) e.g. `false`
  - `explicit_permissions`: boolean - Set file to private (true/false) e.g. `false`
  - `description`: string - A description of the file e.g. `This file is good`
  - `unique_name`: boolean - Toggles automatic renaming if the file name is already taken in a folder (unique_name = true). Returns a name taken error if a file name is taken in a folder (unique_name = false). e.g. `true`
  - `upload_uuid`: string - UUID referencing a previously completed Upload. This is the recommended approach for file uploads. See Company Uploads or Project Uploads endpoints for instructions on how to use uploads. You should not use both data ... e.g. `1QJ83Q56CVQR4X3C0JG7YV86F8`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - File id e.g. `12`
- `name`: string - File name e.g. `file.pdf`
- `parent_id`: integer - File parent id e.g. `1`
- `size`: integer - File size e.g. `54332`
- `description`: string - File description e.g. `this is a cool file`
- `updated_at`: string(date-time) - File updated at e.g. `2017-01-04T21:27:18Z`
- `created_at`: string(date-time) - File created at e.g. `2017-01-04T21:27:18Z`
- `checked_out_until`: string(date-time) - File checked out until e.g. `2017-01-04T21:27:18Z`
- `name_with_path`: string - Full file path with filename e.g. `Root Folder/file.pdf`
- `private`: boolean - File private status e.g. `false`
- `is_tracked`: boolean - File is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `checked_out_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `file_type`: string - File type e.g. `PDF`
- `file_versions`: array of object
  - `id`: integer - File version id e.g. `12`
  - `notes`: string - File version notes e.g. `this is a cool file version`
  - `url`: string - File version url e.g. `www.file.com`
  - `size`: integer - File version size in bytes e.g. `12674`
  - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
  - `number`: integer - File version number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `file_id`: integer - Parent Files id e.g. `14`
- `legacy_id`: integer - Legacy File id e.g. `12`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/files/{id}

**Show project File**
Show detailed information about a File.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the File
- `project_id` [query] integer (required) - Unique identifier for the project.
- `show_latest_version_only` [query] boolean - Show only latest File version

Response 200 (application/json): object

- `id`: integer - File id e.g. `12`
- `name`: string - File name e.g. `file.pdf`
- `parent_id`: integer - File parent id e.g. `1`
- `size`: integer - File size e.g. `54332`
- `description`: string - File description e.g. `this is a cool file`
- `updated_at`: string(date-time) - File updated at e.g. `2017-01-04T21:27:18Z`
- `created_at`: string(date-time) - File created at e.g. `2017-01-04T21:27:18Z`
- `checked_out_until`: string(date-time) - File checked out until e.g. `2017-01-04T21:27:18Z`
- `name_with_path`: string - Full file path with filename e.g. `Root Folder/file.pdf`
- `private`: boolean - File private status e.g. `false`
- `is_tracked`: boolean - File is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `checked_out_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `file_type`: string - File type e.g. `PDF`
- `file_versions`: array of object
  - `id`: integer - File version id e.g. `12`
  - `notes`: string - File version notes e.g. `this is a cool file version`
  - `url`: string - File version url e.g. `www.file.com`
  - `size`: integer - File version size in bytes e.g. `12674`
  - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
  - `number`: integer - File version number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `file_id`: integer - Parent Files id e.g. `14`
- `legacy_id`: integer - Legacy File id e.g. `12`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/files/{id}

**Update project File**
Update the specified File (creates a new file version).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the File
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `file`: object (required)
  - `parent_id`: integer - The ID of the parent folder to move the file to e.g. `12`
  - `name`: string - The Name of the file e.g. `test_folder`
  - `checked_out_until`: string(date-time) - Check out a file until the specified time. Admins may reset checkout by sending "null" e.g. `2022-08-12T12:42:34Z`
  - `is_tracked`: boolean - Status if a file should be tracked (true/false) e.g. `false`
  - `explicit_permissions`: boolean - Set file to private (true/false) e.g. `false`
  - `description`: string - A description of the file e.g. `This file is good`
  - `upload_uuid`: string - UUID referencing a previously completed Upload. This is the recommended approach for file uploads. See Company Uploads or Project Uploads endpoints for instructions on how to use uploads. You should not use both data ... e.g. `1QJ83Q56CVQR4X3C0JG7YV86F8`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - File id e.g. `12`
- `name`: string - File name e.g. `file.pdf`
- `parent_id`: integer - File parent id e.g. `1`
- `size`: integer - File size e.g. `54332`
- `description`: string - File description e.g. `this is a cool file`
- `updated_at`: string(date-time) - File updated at e.g. `2017-01-04T21:27:18Z`
- `created_at`: string(date-time) - File created at e.g. `2017-01-04T21:27:18Z`
- `checked_out_until`: string(date-time) - File checked out until e.g. `2017-01-04T21:27:18Z`
- `name_with_path`: string - Full file path with filename e.g. `Root Folder/file.pdf`
- `private`: boolean - File private status e.g. `false`
- `is_tracked`: boolean - File is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `checked_out_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `file_type`: string - File type e.g. `PDF`
- `file_versions`: array of object
  - `id`: integer - File version id e.g. `12`
  - `notes`: string - File version notes e.g. `this is a cool file version`
  - `url`: string - File version url e.g. `www.file.com`
  - `size`: integer - File version size in bytes e.g. `12674`
  - `created_at`: string(date-time) - File version created at e.g. `2017-01-04T21:27:18Z`
  - `number`: integer - File version number e.g. `1`
  - `created_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `prostore_file`: object
    - `id`: integer
    - `name`: string - Use :name, :filename to be deprecated
    - `url`: string
    - `filename`: string - :filename to be deprecated, use :name
  - `file_id`: integer - Parent Files id e.g. `14`
- `legacy_id`: integer - Legacy File id e.g. `12`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
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

Error responses: 400, 401, 403, 409, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/files/{id}

**Delete project File**
Delete the specified File by moving it to the recycle bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the File
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/folders

**List project folders and files**
Returns a list of folders and files for a specified project. Note: this operation will return all of the folders and files within the root folder of that project's document structure. For any folders that are nested more deeply an empty array [] will be returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `exclude_folders` [query] boolean - Exclude child folders from results. Must be either true or false.
- `exclude_files` [query] boolean - Exclude child files from results. Must be either true or false.
- `show_latest_file_version_only` [query] boolean - Show only the latest file version. Must be either true or false.

Response 200 (application/json): object

- `id`: integer - Folder id e.g. `1`
- `name`: string - Folder name e.g. `Root Folder`
- `parent_id`: integer - Folder parent id
- `private`: boolean - Folder private status e.g. `false`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with Folder name e.g. `Root Folder`
- `folders`: array of object - Folder subfolders
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `parent_id`: integer - Folder parent id e.g. `1`
  - `private`: boolean - Folder private status e.g. `true`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `is_tracked`: boolean - Folder is tracked status e.g. `true`
  - `tracked_folder`: object - Folder watchers
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
  - `folders`: array of object - The child Folders of the Folder
  - `files`: array of object - The child Files of the Folder
  - `read_only`: boolean - Folder read only status e.g. `true`
  - `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `has_children`: boolean - Folder has children status e.g. `true`
  - `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
  - `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `files`: array of object - Folder files
  - `id`: integer - The unique identifier of the file. e.g. `12`
  - `name`: string - Name of the file. e.g. `file.pdf`
  - `parent_id`: integer - The unique identifier of the file parent. e.g. `1`
  - `size`: integer - File size in bytes. e.g. `54332`
  - `description`: string - A description of the file. e.g. `this is a cool file`
  - `updated_at`: string(date-time) - File updated datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `created_at`: string(date-time) - File created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `checked_out_until`: string(date-time) - File checked out until datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `name_with_path`: string - Full file path with filename. e.g. `Root Folder/file.pdf`
  - `private`: boolean - File private status e.g. `false`
  - `is_tracked`: boolean - If true, file is being tracked. e.g. `false`
  - `tracked_folder`: object - Folder watchers
  - `checked_out_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `file_type`: string - Type of the file. e.g. `PDF`
  - `file_versions`: array of object
    - `id`: integer - The unique identifier of the file version. e.g. `12`
    - `notes`: string - File version notes e.g. `These are notes about the current file version.`
    - `url`: string - The URL where the file can be downloaded. e.g. `www.file.com`
    - `size`: integer - File version size in bytes. e.g. `12674`
    - `created_at`: string(date-time) - File version created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
    - `number`: integer - File version number. e.g. `1`
    - `created_by`: object
    - `prostore_file`: object
    - `file_id`: integer - The unique identifier of the parent files. e.g. `14`
  - `legacy_id`: integer - The unique identifier of the legacy file. e.g. `12`
  - `is_deleted`: boolean - If true, file is in the recycle bin. e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `read_only`: boolean - Folder read only status e.g. `false`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/folders

**Create Project Folder**
Create a new folder in the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `folder`: object (required)
  - `parent_id`: integer - The ID of the parent folder to create the folder in. If not set the folder will be created under the root folder. e.g. `12`
  - `name`: string (required) - The Name of the folder e.g. `test_folder`
  - `is_tracked`: boolean - Status if a folder should be tracked (true/false) e.g. `true`
  - `explicit_permissions`: boolean - Set folder to private (true/false) e.g. `true`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `id`: integer - Folder id e.g. `2`
- `name`: string - Folder name e.g. `Subfolder`
- `parent_id`: integer - Folder parent id e.g. `1`
- `private`: boolean - Folder private status e.g. `true`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `true`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
- `folders`: array of object - The child Folders of the Folder
- `files`: array of object - The child Files of the Folder
- `read_only`: boolean - Folder read only status e.g. `true`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/folders/{id}

**Show Project Folder**
Show detail on the specified folder. Must be either true or false.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the folder
- `project_id` [query] integer (required) - Unique identifier for the project.
- `exclude_folders` [query] boolean - Exclude children Folders from results. Must be either true or false.
- `exclude_files` [query] boolean - Exclude children files from results. Must be either true or false.
- `show_latest_file_version_only` [query] boolean - Show only the latest file version. Must be either true or false.

Response 200 (application/json): object

- `id`: integer - Folder id e.g. `1`
- `name`: string - Folder name e.g. `Root Folder`
- `parent_id`: integer - Folder parent id
- `private`: boolean - Folder private status e.g. `false`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `false`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with Folder name e.g. `Root Folder`
- `folders`: array of object - Folder subfolders
  - `id`: integer - Folder id e.g. `2`
  - `name`: string - Folder name e.g. `Subfolder`
  - `parent_id`: integer - Folder parent id e.g. `1`
  - `private`: boolean - Folder private status e.g. `true`
  - `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
  - `is_tracked`: boolean - Folder is tracked status e.g. `true`
  - `tracked_folder`: object - Folder watchers
  - `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
  - `folders`: array of object - The child Folders of the Folder
  - `files`: array of object - The child Files of the Folder
  - `read_only`: boolean - Folder read only status e.g. `true`
  - `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
  - `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
  - `has_children`: boolean - Folder has children status e.g. `true`
  - `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
  - `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `files`: array of object - Folder files
  - `id`: integer - The unique identifier of the file. e.g. `12`
  - `name`: string - Name of the file. e.g. `file.pdf`
  - `parent_id`: integer - The unique identifier of the file parent. e.g. `1`
  - `size`: integer - File size in bytes. e.g. `54332`
  - `description`: string - A description of the file. e.g. `this is a cool file`
  - `updated_at`: string(date-time) - File updated datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `created_at`: string(date-time) - File created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `checked_out_until`: string(date-time) - File checked out until datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
  - `name_with_path`: string - Full file path with filename. e.g. `Root Folder/file.pdf`
  - `private`: boolean - File private status e.g. `false`
  - `is_tracked`: boolean - If true, file is being tracked. e.g. `false`
  - `tracked_folder`: object - Folder watchers
  - `checked_out_by`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
  - `file_type`: string - Type of the file. e.g. `PDF`
  - `file_versions`: array of object
    - `id`: integer - The unique identifier of the file version. e.g. `12`
    - `notes`: string - File version notes e.g. `These are notes about the current file version.`
    - `url`: string - The URL where the file can be downloaded. e.g. `www.file.com`
    - `size`: integer - File version size in bytes. e.g. `12674`
    - `created_at`: string(date-time) - File version created datetime in ISO8601 format. e.g. `2017-01-04T21:27:18Z`
    - `number`: integer - File version number. e.g. `1`
    - `created_by`: object
    - `prostore_file`: object
    - `file_id`: integer - The unique identifier of the parent files. e.g. `14`
  - `legacy_id`: integer - The unique identifier of the legacy file. e.g. `12`
  - `is_deleted`: boolean - If true, file is in the recycle bin. e.g. `false`
  - `custom_fields`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object
- `read_only`: boolean - Folder read only status e.g. `false`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/folders/{id}

**Update Project Folder**
Update the specified folder.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the folder
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `folder`: object (required)
  - `parent_id`: integer - The ID of the parent folder to move the folder to. e.g. `12`
  - `name`: string - The Name of the folder e.g. `test_folder`
  - `is_tracked`: boolean - Status if a folder should be tracked (true/false) e.g. `true`
  - `explicit_permissions`: boolean - Set folder to private (true/false) e.g. `true`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `id`: integer - Folder id e.g. `2`
- `name`: string - Folder name e.g. `Subfolder`
- `parent_id`: integer - Folder parent id e.g. `1`
- `private`: boolean - Folder private status e.g. `true`
- `updated_at`: string(date-time) - Folder updated at e.g. `2017-01-04T21:27:18Z`
- `is_tracked`: boolean - Folder is tracked status e.g. `true`
- `tracked_folder`: object - Folder watchers
- `name_with_path`: string - Full file path with folder name e.g. `Root Folder/Subfolder`
- `folders`: array of object - The child Folders of the Folder
- `files`: array of object - The child Files of the Folder
- `read_only`: boolean - Folder read only status e.g. `true`
- `is_deleted`: boolean - File is in the recycle bin status e.g. `false`
- `is_recycle_bin`: boolean - Folder is recycle bin status e.g. `false`
- `has_children`: boolean - Folder has children status e.g. `true`
- `has_children_files`: boolean - Folder has at least one child that is a file status e.g. `true`
- `has_children_folders`: boolean - Folder has at least one child that is a folder status e.g. `true`
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

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/folders/{id}

**Delete Project Folder**
Delete the specified folder by moving it to the recycle bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the folder
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

