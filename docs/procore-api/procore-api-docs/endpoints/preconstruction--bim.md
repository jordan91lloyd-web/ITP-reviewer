# Procore API: BIM (Preconstruction)

Source: https://developers.procore.com/reference/rest/ (tool category: BIM)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [BIM File Extractions](#bim-file-extractions) - versions 1.0
- [BIM Files](#bim-files) - versions 1.0
- [BIM Geometry File Bundles](#bim-geometry-file-bundles) - versions 1.0
- [BIM Level Batch](#bim-level-batch) - versions 1.0
- [BIM Levels](#bim-levels) - versions 1.0
- [BIM Mint Tokens](#bim-mint-tokens) - versions 1.0
- [BIM Model Change History](#bim-model-change-history) - versions 1.0
- [BIM Model Revision Objects](#bim-model-revision-objects) - versions 1.0
- [BIM Model Revision Plan Batch](#bim-model-revision-plan-batch) - versions 1.0
- [BIM Model Revision Plans](#bim-model-revision-plans) - versions 1.0
- [BIM Model Revision Properties](#bim-model-revision-properties) - versions 1.0
- [BIM Model Revision Viewpoint Batch](#bim-model-revision-viewpoint-batch) - versions 1.0
- [BIM Model Revision Viewpoint Bulk Delete](#bim-model-revision-viewpoint-bulk-delete) - versions 1.0
- [BIM Model Revision Viewpoints](#bim-model-revision-viewpoints) - versions 1.0
- [BIM Model Revisions](#bim-model-revisions) - versions 1.0
- [BIM Models](#bim-models) - versions 1.0
- [BIM Plan Batch](#bim-plan-batch) - versions 1.0
- [BIM Plans](#bim-plans) - versions 1.0
- [BIM Property File Objects](#bim-property-file-objects) - versions 1.0
- [BIM Property File Properties](#bim-property-file-properties) - versions 1.0
- [BIM View Folders](#bim-view-folders) - versions 1.0
- [BIM Viewpoint Associations](#bim-viewpoint-associations) - versions 1.0
- [BIM Viewpoint Batch](#bim-viewpoint-batch) - versions 1.0
- [BIM Viewpoints](#bim-viewpoints) - versions 1.0
- [Nested BIM View Folder Batch](#nested-bim-view-folder-batch) - versions 1.0
- [Nested BIM View Folders](#nested-bim-view-folders) - versions 1.0

## BIM File Extractions

Resource id: `bim-file-extractions`. Raw spec: `../openapi-raw/bim-file-extractions.json`. Web: https://developers.procore.com/reference/rest/bim-file-extractions?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_file_extractions

**List BIM File Extractions**
Return a list of all BIM File Extractions
A BIM File Extraction can fail for several reasons. When it does, the errors attribute contains a list of errors encountered while processing the model. The following table lists the possible error codes and types.
#### Error Types
| Code | Type                   |
|------|------------------------|
| 1    | Undefined              |
| 2    | NetworkErr             |
| 3    | ServerErr              |
| 4    | JsonParseErr           |
| 5    | TokenExpiredErr        |
| 6    | FileOpenErr            |
| 7    | FileWriteErr           |
| 8    | FileCompressionErr     |
| 9    | FileUploadError        |
| 10   | ModelReadErr           |
| 11   | ModelFileSizeErr       |
| 12   | ModelExportErr         |
| 13   | ModelEmptyDBErr        |
| 14   | ModelViewpointErr      |
| 15   | ModelErr               |
| 16   | InvalidStatusError     |
| 17   | FileDecompressionErr   |
| 18   | UnsupportedFileFormat  |
| 19   | No3DGeometry           |
| 20   | InvalidInputError      |
| 21   | UnsupportedFileSource  |
| 22   | MeshNodeLimitError     |
| 23   | RateLimitExhausted     |
| 24   | ODAGenericError        |
| 25   | FileUploadFasError     |

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[status]` [query] string - Filter item(s) with matching status
- `filters[extraction_format]` [query] array of string enum[MobileFormat, WebFormat, Properties, ObjectSearch] - Filter item(s) with matching extraction format
- `filters[bim_file_id]` [query] array of integer - Return item(s) with the specified bim_file_id in bim_file_upload
- `filters[bim_file_upload_id]` [query] array of integer - Return item(s) with the specified bim_file_upload_id
- `filters[file_version_id]` [query] array of integer - Return item(s) with the specified file_version_id in bim_file_upload
- `filters[document_upload_id]` [query] array of string - Return item(s) with the specified document_upload_id in bim_file_upload
- `filters[document_revision_id]` [query] array of string - Return item(s) with the specified document_revision_id in bim_file_upload

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `206`
- `parent_bim_file_extraction_id`: integer - ID of the parent BIM File Extraction e.g. `138`
- `bim_file_upload_id`: integer - ID of the uploaded BIM File e.g. `198`
- `bim_file_upload`: object
  - `id`: integer - ID e.g. `198`
  - `bim_file_id`: integer - ID of the associated BIM File e.g. `51`
  - `document_upload_id`: integer - ID of the associated Document Upload e.g. `01AABBCCDDEEFFGGHHIIJJKKL`
  - `file_version`: object
    - `id`: integer - ID of the associated Document
    - `file_id`: integer - ID of the associated Folder File
  - `attachment`: object
    - `id`: integer
    - `content_type`: string
    - `name`: string
    - `url`: string
    - `size`: number
  - `created_by`: object
    - `id`: integer - Login Information ID e.g. `1738090`
    - `company_name`: string - User Company name e.g. `Builders Inc.`
    - `name`: string - User name e.g. `John Doe`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `created_at`: string(date-time) - Created date e.g. `2020-07-26T11:15:00Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2020-07-26T11:15:00Z`
  - `metadata`: object - Meta data
    - `linked_files`: array of object - Array of linked files
    - `drawing_sheets`: array of object - Array of drawing sheets
    - `file_type`: string enum[2d, 3d] - File Type (either 2d or 3d) e.g. `3d`
- `bim_model_revision_id`: integer - ID of the BIM Model Revision e.g. `116`
- `status`: string - Extraction Status e.g. `ready`
- `progress`: number - Progress of overall extraction taking into account the individual extraction items e.g. `46.5`
- `retry_count`: integer - No. of retries performed on the extraction e.g. `2`
- `viewpoint_id`: integer - ID of the BIM Viewpoint e.g. `781`
- `extraction_format_requests`: array of object - Array of items indicating formats of items requested to be extracted
  - `type`: string - Extraction type e.g. `MobileFormat`
- `extraction_items`: array of object - An array of items extracted from a 3d model
  - `id`: integer - ID e.g. `226`
  - `bim_file_extraction_id`: integer - BIM File extraction ID e.g. `206`
  - `item_type`: string enum[Grid, MobileFormat, Properties, WebFormat, ObjectSearch, ViewpointCollection] - Extraction type e.g. `MobileFormat`
  - `progress`: number - Extraction progress e.g. `15.6`
  - `artifact`: object - Artifact extracted from a 3d model. Only one of grid, mobile_format, properties, web_format, ifc, object_search, and viewpoint_collection will have data associated to the artifact extracted
    - `grid`: object
    - `mobile_format`: object
    - `properties`: object
    - `web_format`: object
    - `ifc`: object
    - `object_search`: object
    - `viewpoint_collection`: object
  - `error`: object - An error that can occur during model processing.
    - `code`: integer - Error code e.g. `68`
    - `type`: string - Error type e.g. `UnsupportedFileFormat`
    - `message`: string - Human readable error message e.g. `Bad Input File`
  - `created_at`: string(date-time) - Created date e.g. `2020-07-26T15:15:00Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2020-07-26T15:15:00Z`
- `errors`: array of object - An array of errors encountered during extraction
  - `code`: integer - Error code e.g. `68`
  - `type`: string - Error type e.g. `UnsupportedFileFormat`
  - `message`: string - Human readable error message e.g. `Bad Input File`
- `created_by`: object
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - User email e.g. `johndoe@example.com`
- `created_at`: string(date-time) - Created date e.g. `2020-07-26T13:15:00Z`
- `updated_at`: string(date-time) - Updated date e.g. `2020-07-26T13:15:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_file_extractions/{id}

**Show BIM File Extraction**
Return a single BIM File Extraction

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - ID e.g. `206`
- `parent_bim_file_extraction_id`: integer - ID of the parent BIM File Extraction e.g. `138`
- `bim_file_upload_id`: integer - ID of the uploaded BIM File e.g. `198`
- `bim_file_upload`: object
  - `id`: integer - ID e.g. `198`
  - `bim_file_id`: integer - ID of the associated BIM File e.g. `51`
  - `document_upload_id`: integer - ID of the associated Document Upload e.g. `01AABBCCDDEEFFGGHHIIJJKKL`
  - `file_version`: object
    - `id`: integer - ID of the associated Document
    - `file_id`: integer - ID of the associated Folder File
  - `attachment`: object
    - `id`: integer
    - `content_type`: string
    - `name`: string
    - `url`: string
    - `size`: number
  - `created_by`: object
    - `id`: integer - Login Information ID e.g. `1738090`
    - `company_name`: string - User Company name e.g. `Builders Inc.`
    - `name`: string - User name e.g. `John Doe`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `created_at`: string(date-time) - Created date e.g. `2020-07-26T11:15:00Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2020-07-26T11:15:00Z`
  - `metadata`: object - Meta data
    - `linked_files`: array of object - Array of linked files
    - `drawing_sheets`: array of object - Array of drawing sheets
    - `file_type`: string enum[2d, 3d] - File Type (either 2d or 3d) e.g. `3d`
- `bim_model_revision_id`: integer - ID of the BIM Model Revision e.g. `116`
- `status`: string - Extraction Status e.g. `ready`
- `progress`: number - Progress of overall extraction taking into account the individual extraction items e.g. `46.5`
- `retry_count`: integer - No. of retries performed on the extraction e.g. `2`
- `viewpoint_id`: integer - ID of the BIM Viewpoint e.g. `781`
- `extraction_format_requests`: array of object - Array of items indicating formats of items requested to be extracted
  - `type`: string - Extraction type e.g. `MobileFormat`
- `extraction_items`: array of object - An array of items extracted from a 3d model
  - `id`: integer - ID e.g. `226`
  - `bim_file_extraction_id`: integer - BIM File extraction ID e.g. `206`
  - `item_type`: string enum[Grid, MobileFormat, Properties, WebFormat, ObjectSearch, ViewpointCollection] - Extraction type e.g. `MobileFormat`
  - `progress`: number - Extraction progress e.g. `15.6`
  - `artifact`: object - Artifact extracted from a 3d model. Only one of grid, mobile_format, properties, web_format, ifc, object_search, and viewpoint_collection will have data associated to the artifact extracted
    - `grid`: object
    - `mobile_format`: object
    - `properties`: object
    - `web_format`: object
    - `ifc`: object
    - `object_search`: object
    - `viewpoint_collection`: object
  - `error`: object - An error that can occur during model processing.
    - `code`: integer - Error code e.g. `68`
    - `type`: string - Error type e.g. `UnsupportedFileFormat`
    - `message`: string - Human readable error message e.g. `Bad Input File`
  - `created_at`: string(date-time) - Created date e.g. `2020-07-26T15:15:00Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2020-07-26T15:15:00Z`
- `errors`: array of object - An array of errors encountered during extraction
  - `code`: integer - Error code e.g. `68`
  - `type`: string - Error type e.g. `UnsupportedFileFormat`
  - `message`: string - Human readable error message e.g. `Bad Input File`
- `created_by`: object
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `locale`: string - User dictionary e.g. `ko`
  - `company_name`: string - User Company name e.g. `Builders Inc.`
  - `login`: string - User email e.g. `johndoe@example.com`
- `created_at`: string(date-time) - Created date e.g. `2020-07-26T13:15:00Z`
- `updated_at`: string(date-time) - Updated date e.g. `2020-07-26T13:15:00Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Files

Resource id: `bim-files`. Raw spec: `../openapi-raw/bim-files.json`. Web: https://developers.procore.com/reference/rest/bim-files?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_files

**List BIM Files**
Lists BIM Files associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal and extended view contains the response shown below. The default view is normal.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `101`
- `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
- `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `34`
- `company_id`: number(integer) - Company ID e.g. `1`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/bim_files

**Create BIM File**
Create a BIM File in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `bim_file`: object (required) - BIM File Item object. Each BIM File can be uniquely identified by name and UUID.
  - `name`: string (required) - Name of the file to be associated a project. e.g. `101_BUILDING.NWF`
  - `uuid`: string (required) - UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`

Response 201 (application/json): object

- `id`: integer - ID e.g. `101`
- `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
- `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `34`
- `company_id`: number(integer) - Company ID e.g. `1`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_files/{id}

**Show BIM File**
Return a single BIM File item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] string (required) - BIM File ID.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal and extended view contains the response shown below. The default view is normal.

Response 200 (application/json): object

- `id`: integer - ID e.g. `101`
- `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
- `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `34`
- `company_id`: number(integer) - Company ID e.g. `1`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/bim_files/{id}

**Update BIM File**
Updates a BIM File

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM File ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `bim_file`: object (required) - BIM File Item object
  - `name`: string - Name of the issue file e.g. `101_BUILDING.NWF`
  - `target_project_id`: integer - Project that the issue file should be re-associated to. A BIM File can only be re-associated to another project if the file does not have any published models, levels or issues. e.g. `23456`

Response 200 (application/json): object

- `id`: integer - ID e.g. `101`
- `name`: string - Name of the file to be associated to a project e.g. `101_BLDG_FLR_2.NWF`
- `uuid`: string - Unique UUID associated with the file e.g. `a00147dd-a698-468a-b082-d277a564cf0c`
- `project_id`: number(integer) - Unique identifier for the project. e.g. `34`
- `company_id`: number(integer) - Company ID e.g. `1`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_files/{id}

**Delete BIM File**
Delete a BIM File from the system. A BIM File can only be deleted if it is not associated with BIM Levels, Revisions, or Viewpoints or Coordination Issues.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM File ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Geometry File Bundles

Resource id: `bim-geometry-file-bundles`. Raw spec: `../openapi-raw/bim-geometry-file-bundles.json`. Web: https://developers.procore.com/reference/rest/bim-geometry-file-bundles?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_geometry_file_bundles  **[DEPRECATED]**

**Create BIM Geometry File Bundle**
Create a BIM Geometry File Bundle in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `326`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_geometry_file_bundle`: object (required) - BIM Geometry File
  - `bim_model_revision_id`: integer (required) - ID of the model revision to be associated e.g. `1984`
  - `cell_upload_uuid`: string (required) - UUID of uploaded cell geometry file e.g. `1ZE258W9K804SAJJZX19JVAB3P`
  - `node_upload_uuid`: string (required) - UUID of uploaded node geometry file e.g. `1ZE258W9K804SAJJZX19JVAB3Q`
  - `mesh_node_upload_uuid`: string (required) - UUID of uploaded mesh node geometry file e.g. `1ZE258W9K804SAJJZX19JVAB3R`
  - `mesh_upload_uuid`: string (required) - UUID of uploaded mesh geometry file e.g. `1ZE258W9K804SAJJZX19JVAB3S`

Response 201 (application/json): object

- `id`: integer - ID e.g. `189`
- `bim_model_revision_id`: integer - ID of associated model revision e.g. `2264`
- `project_id`: integer - Unique identifier for the project. e.g. `101`
- `created_by_id`: integer - Creator ID e.g. `101`
- `created_at`: string(date-time) - Created date e.g. `2019-01-04T06:13:10Z`
- `updated_at`: string(date-time) - Updated date e.g. `2019-01-06T11:26:08Z`
- `cell_file`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `node_file`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `mesh_node_file`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `mesh_file`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_geometry_file_bundles/{id}  **[DEPRECATED]**

**Show BIM Geometry File Bundle**
Return BIM Geometry File Bundle details.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Geometry File Bundle ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains ids instead of objects for each file object. The default view is normal.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Level Batch

Resource id: `bim-level-batch`. Raw spec: `../openapi-raw/bim-level-batch.json`. Web: https://developers.procore.com/reference/rest/bim-level-batch?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_levels/batch

**Create a batch of BIM Levels**
Create a batch of BIM Levels

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_levels`: array of object (required) - An array of BIM Level payloads
  - `elevation`: number(float) (required) - Level elevation e.g. `10.25`
  - `bim_file_id`: integer (required) - ID of the BIM File linked to the Level e.g. `16`
  - `location_id`: integer (required) - ID of location linked to the Level e.g. `16`

Response 200 (application/json): object

- `bim_levels`: array of oneOf(object | object)
- `errors`: array of object
  - `elevation`: number(float) (required) - Level elevation e.g. `10.25`
  - `bim_file_id`: integer (required) - ID of the BIM File linked to the Level e.g. `16`
  - `location_id`: integer (required) - ID of location linked to the Level e.g. `16`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Levels

Resource id: `bim-levels`. Raw spec: `../openapi-raw/bim-levels.json`. Web: https://developers.procore.com/reference/rest/bim-levels?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_levels

**List BIM Levels**
Lists BIM Levels associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains 'bim_file_id', 'location_id', and 'created_by_id' instead of embedded objects. The default view is normal.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `sort` [query] string enum[elevation, location] - Sort item(s) by an attribute. The default sort is ascending. To sort in descending order, prepend the sort value with a hyphen character '-'

Response 200 (application/json): array of oneOf(object | object)


Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/bim_levels

**Create BIM Level**
Create a BIM Level in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_level`: object (required) - BIM Level
  - `elevation`: number(float) (required) - Level elevation e.g. `10.25`
  - `bim_file_id`: integer (required) - ID of the BIM File linked to the Level e.g. `16`
  - `location_id`: integer (required) - ID of location linked to the Level e.g. `16`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_levels/{id}

**Show BIM Level**
Return a single BIM Level item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Level ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains 'bim_file_id', 'location_id', and 'created_by_id' instead of embedded objects. The default view is normal.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/bim_levels/{id}

**Update BIM Level**
Update a BIM Level item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Level ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `bim_level`: object (required) - BIM Level Item object
  - `elevation`: number(float) - Level elevation e.g. `10.25`
  - `location_id`: integer - ID of location linked to the Level e.g. `16`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_levels/{id}

**Delete BIM Level**
Delete a BIM Level from the system. A BIM Level can only be deleted if it is not associated with published models.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Level ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Mint Tokens

Resource id: `bim-mint-tokens`. Raw spec: `../openapi-raw/bim-mint-tokens.json`. Web: https://developers.procore.com/reference/rest/bim-mint-tokens?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_mint_tokens

**Create BIM Mint Tokens**
Create BIM mint tokens in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `access_token`: string - Bim mint tokens for the project. e.g. `jwt-token-value`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Change History

Resource id: `bim-model-change-history`. Raw spec: `../openapi-raw/bim-model-change-history.json`. Web: https://developers.procore.com/reference/rest/bim-model-change-history?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_models/{id}/change_history  **[DEPRECATED]**

**List BIM Model Change History**
This is a deprecated endpoint. This endpoint returns the change history for the specified BimModel. The change history is sorted by most recent first.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, extended] - The extended view provides what is shown below. The normal view is the same as the extended view but excludes attribute created_by. The compact view returns ids only. The default view is normal.

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

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revision Objects

Resource id: `bim-model-revision-objects`. Raw spec: `../openapi-raw/bim-model-revision-objects.json`. Web: https://developers.procore.com/reference/rest/bim-model-revision-objects?version=latest
Product lines: Models

### GET /rest/v1.0/bim_model_revisions/{id}/objects

**List BIM Model Revision objects**
Lists objects for a specific BIM Model Revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model Revision ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[query]` [query] string - Filter item(s) containing query. Searchable fields include Object Value

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `19`
- `value`: string - Value e.g. `A_Interior_1001_SBA_Hexa.nwd`

Error responses: 400, 401, 403, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revision Plan Batch

Resource id: `bim-model-revision-plan-batch`. Raw spec: `../openapi-raw/bim-model-revision-plan-batch.json`. Web: https://developers.procore.com/reference/rest/bim-model-revision-plan-batch?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_model_revision_plans/batch

**Create a batch of BIM Model Revision Plans**
Create relationships between several BIM Model Revisions and BIM Plans.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `bim_model_revision_plans`: array of object (required) - An array of BIM Model Revision Plan payloads
  - `bim_model_revision_id`: integer (required) - ID of BIM Model Revision e.g. `16`
  - `bim_plan_id`: integer (required) - ID of BIM Plan. The BIM Plan should be associated to the same BIM File as the BIM Model Revision e.g. `96`

Response 200 (application/json): object

- `bim_model_revision_plans`: array of oneOf(object | object)
- `errors`: array of object
  - `bim_model_revision_id`: integer (required) - ID of BIM Model Revision e.g. `16`
  - `bim_plan_id`: integer (required) - ID of BIM Plan. The BIM Plan should be associated to the same BIM File as the BIM Model Revision e.g. `96`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revision Plans

Resource id: `bim-model-revision-plans`. Raw spec: `../openapi-raw/bim-model-revision-plans.json`. Web: https://developers.procore.com/reference/rest/bim-model-revision-plans?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_model_revision_plans

**List BIM Model Revision Plans**
Lists BIM Model Revision Plans associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains 'bim_plan_id' and 'bim_level_id' instead of objects. The default view is normal.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[bim_plan_id]` [query] integer - Filter item(s) with matching BIM Plan ids
- `filters[bim_model_revision_id]` [query] integer - Filter item(s) with matching Bim Model Revision ids.
- `filters[bim_level_id]` [query] integer - Filter item(s) with matching BIM Level ids

Response 200 (application/json): array of oneOf(object | object)


Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/bim_model_revision_plans

**Create BIM Model Revision Plan**
Create a relationship between a BIM Model Revision and a BIM Plan.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `bim_model_revision_plan`: object (required) - BIM Model Revision Plan
  - `bim_model_revision_id`: integer (required) - ID of BIM Model Revision e.g. `16`
  - `bim_plan_id`: integer (required) - ID of BIM Plan. The BIM Plan should be associated to the same BIM File as the BIM Model Revision e.g. `96`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_model_revision_plans/{id}

**Show BIM Model Revision Plan**
Return a single BIM Model Revision Plan item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model Revision Plan ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains 'bim_plan_id' and 'bim_level_id' instead of objects. The default view is normal.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_model_revision_plans/{id}

**Delete BIM Model Revision Plan**
Delete a BIM Model Revision Plan from the system.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model Revision Plan ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revision Properties

Resource id: `bim-model-revision-properties`. Raw spec: `../openapi-raw/bim-model-revision-properties.json`. Web: https://developers.procore.com/reference/rest/bim-model-revision-properties?version=latest
Product lines: Models

### GET /rest/v1.0/bim_model_revisions/{id}/properties

**List BIM Model Revision properties**
Lists properties for a specific BIM Model Revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model Revision ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[object_id]` [query] array of integer - Filter item(s) with matching object_id.
- `filters[category]` [query] array of string - Filter item(s) with matching category.
- `filters[name]` [query] array of string - Filter item(s) with matching name.
- `filters[value]` [query] array of string - Filter item(s) with matching value.
- `filters[query]` [query] string - Filter item(s) containing query. Searchable fields include Property Category, Name, and Value
- `filters[curated_list]` [query] boolean - Filter item(s) to return a curated list of properties
- `filters[has_uom]` [query] boolean - Filter item(s) to return properties with/without unit of measurement (uom).

Response 200 (application/json): array of oneOf(object | object)


Error responses: 400, 401, 403, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revision Viewpoint Batch

Resource id: `bim-model-revision-viewpoint-batch`. Raw spec: `../openapi-raw/bim-model-revision-viewpoint-batch.json`. Web: https://developers.procore.com/reference/rest/bim-model-revision-viewpoint-batch?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_model_revision_viewpoints/batch

**Create a batch of BIM Model Revision Viewpoints**
Create relationships between several BIM Model Revisions and BIM Viewpoints.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `bim_model_revision_viewpoints`: array of object (required) - An array of BIM Model Revision Viewpoint payloads
  - `bim_model_revision_id`: integer (required) - BIM Model Revision ID e.g. `91`
  - `bim_viewpoint_id`: integer (required) - BIM Viewpoint ID. The BIM Viewpoint should be associated to the same BIM File as the BIM Model Revision e.g. `83`
  - `primary`: boolean - Flag to indicate whether this is primary viewpoint for the model revision. There can only be one primary viewpoint per model revision e.g. `false`

Response 200 (application/json): object

- `bim_model_revision_viewpoints`: array of object
  - `id`: integer - ID e.g. `1`
  - `bim_model_revision_id`: integer - ID of associated published BIM Model Revision e.g. `91`
  - `bim_viewpoint_id`: integer - ID of associated BIM Viewpoint e.g. `83`
  - `primary`: boolean - Indicates whether primary viewpoint e.g. `false`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `errors`: array of object
  - `bim_model_revision_id`: integer (required) - BIM Model Revision ID e.g. `91`
  - `bim_viewpoint_id`: integer (required) - BIM Viewpoint ID. The BIM Viewpoint should be associated to the same BIM File as the BIM Model Revision e.g. `83`
  - `primary`: boolean - Flag to indicate whether this is primary viewpoint for the model revision. There can only be one primary viewpoint per model revision e.g. `false`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revision Viewpoint Bulk Delete

Resource id: `bim-model-revision-viewpoint-bulk-delete`. Raw spec: `../openapi-raw/bim-model-revision-viewpoint-bulk-delete.json`. Web: https://developers.procore.com/reference/rest/bim-model-revision-viewpoint-bulk-delete?version=latest
Product lines: Design Coordination

### DELETE /rest/v1.0/bim_model_revision_viewpoints/bulk_delete  **[BETA]**

**Bulk delete BIM Model Revision Viewpoints**
Delete multiple BIM Model Revision Viewpoint associations in a single request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `ids` [query] array of integer (required) - Array of BIM Model Revision Viewpoint IDs to delete

Response 200 (application/json): object

- `deleted_ids`: array of integer - Array of successfully deleted viewpoint IDs e.g. `[1, 3]`
- `errors`: array of string - Array of error messages for failed deletions e.g. `["Permission denied for viewpoint 2"]`

Error responses: 401, 403, 404, 413, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revision Viewpoints

Resource id: `bim-model-revision-viewpoints`. Raw spec: `../openapi-raw/bim-model-revision-viewpoints.json`. Web: https://developers.procore.com/reference/rest/bim-model-revision-viewpoints?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_model_revision_viewpoints

**List BIM Model Revision Viewpoints**
List BIM Model Revision Viewpoints associated to a BIM model revision

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[bim_model_revision_id]` [query] integer - Filter item(s) with matching Bim Model Revision ids.
- `filters[updated_at]` [query] string - Filter item(s) within a specific updated at iso8601 datetime range.
- `filters[primary]` [query] boolean - Filter items by primary flag
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains bim_viewpoint_id instead of object. The default view is normal.
- `viewpoint_format` [query] string enum[default, procore] - Specify viewpoint data format. This parameter functions only when the query parameter view is 'extended' The default format returns the viewpoint content as saved. The procore format returns the viewpoint content conv...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of oneOf(object | object)


Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_model_revision_viewpoints/{id}  **[BETA]**

**Delete BIM model revision viewpoint**
Delete a BIM model revision viewpoint

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Bim Model Revision Viewpoint ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Model Revisions

Resource id: `bim-model-revisions`. Raw spec: `../openapi-raw/bim-model-revisions.json`. Web: https://developers.procore.com/reference/rest/bim-model-revisions?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_model_revisions

**List BIM Model Revisions**
Lists BIM Model Revisions associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal view does not include the attribute 'published_model', and contains 'bim_gridline_id' instead of object. The extended view contains the response shown below. The default ...
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `filters[bim_model_id]` [query] integer - Filter item(s) with matching Bim Model ids.
- `filters[publish_status]` [query] string enum[unpublished, ready] - Filter item(s) by publish status
- `sort` [query] string enum[revision] - Sort item(s) by an attribute. The default sort is ascending. To sort in descending order, prepend the sort value with a hyphen character '-'

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/bim_model_revisions

**Create BIM Model Revision**
Create a Revision for a BIM Model. If a set of upload UUIDs or model artifact references are not provided, the revision will be created with 'unpublished' publish status.
For 3d files converted to Procore's format using BIM File Extractions API, the `geometry_file_id` can be retrieved via [BIM File Extraction API](https://developers.procore.com/reference/rest/v1/bim-file-extractions?version=1.0#show-bim-file-extraction) using the following JSONPath:
    $.extraction_items.artifact.mobile_format.id
In a similar manner, the `property_file_id` can be retrieved via [BIM File Extraction API](https://developers.procore.com/reference/rest/v1/bim-file-extractions?version=1.0#show-bim-file-extraction) using the following JSONPath:
    $.extraction_items.artifact.properties.id
Note that in the response for this BIM Model Revision endpoint, `geometry_file_id` will be designated as `published_model.id`, and `property_file_id` will be designated as `object_definition.id`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `123`
- `bim_model_revision`: oneOf(object | object | object) (required)

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_model_revisions/{id}

**Show BIM Model Revision**
Return a single BIM Model Revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model Revision ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The normal view does not include the attribute 'published_model', and contains 'bim_gridline_id' instead of object. The extended view contains the response shown below. The default ...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/bim_model_revisions/{id}

**Update BIM Model Revision**
Update a BIM Model Revision. The attributes `published_model_upload_uuid` and `object_definition_upload_uuid` should only be provided if the model is not associated to any upload. If a model is already associated to an upload, providing these attributes will cause error response.
For 3d files converted to Procore's format using BIM File Extractions API, the `geometry_file_id` can be retrieved via [BIM File Extraction API](https://developers.procore.com/reference/rest/v1/bim-file-extractions?version=1.0#show-bim-file-extraction) using the following JSONPath:
    $.extraction_items.artifact.mobile_format.id
In a similar manner, the `property_file_id` can be retrieved via [BIM File Extraction API](https://developers.procore.com/reference/rest/v1/bim-file-extractions?version=1.0#show-bim-file-extraction) using the following JSONPath:
    $.extraction_items.artifact.properties.id
Note that in the response for this BIM Model Revision endpoint, `geometry_file_id` will be designated as `published_model.id`, and `property_file_id` will be designated as `object_definition.id`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model Revision ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `123`
- `bim_model_revision`: oneOf(object | object) (required)

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_model_revisions/{id}

**Delete BIM Model Revision**
Delete a BIM Model Revision from the system.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model Revision ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Models

Resource id: `bim-models`. Raw spec: `../openapi-raw/bim-models.json`. Web: https://developers.procore.com/reference/rest/bim-models?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_models

**List BIM Models**
Lists BIM Models associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains 'current_revision_id' instead of an embedded object 'current_revision' The default view is normal.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `filters[has_revisions]` [query] boolean - Filter item(s) with or without revisions.
- `filters[search]` [query] string - Filter item(s) with the matching search query. The search is performed on title.
- `sort` [query] string enum[title, suitability, last_published_by, last_published_at] - Sort item(s) by an attribute. The default sort is ascending. To sort in descending order, prepend the sort value with a hyphen character '-'

Response 200 (application/json): array of oneOf(object | object)


Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/bim_models

**Create BIM Model**
Create a BIM Model in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_model`: object (required) - BIM Model
  - `title`: string (required) - BIM Model title e.g. `Combined Model`
  - `auto_publish`: boolean - Model auto publishing setting. When set to true, a new model revision is automatically published when a new version of the input model file is uploaded e.g. `false`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_models/{id}

**Show BIM Model**
Return a single BIM Model item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view contains 'current_revision_id' instead of an embedded object 'current_revision' The default view is normal.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/bim_models/{id}

**Update BIM Model**
Update a BIM Model item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `bim_model`: object (required) - BIM Model
  - `title`: string (required) - BIM Model title e.g. `Combined Model`
  - `auto_publish`: boolean - Model auto publishing setting. When set to true, a new model revision is automatically published when a new version of the input model file is uploaded e.g. `true`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_models/{id}

**Delete BIM Model**
Delete a BIM Model from the system. A BIM Model with revisions cannot be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Model ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Plan Batch

Resource id: `bim-plan-batch`. Raw spec: `../openapi-raw/bim-plan-batch.json`. Web: https://developers.procore.com/reference/rest/bim-plan-batch?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_plans/batch

**Create a batch of BIM Plans**
Create a batch of BIM Plans

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_plans`: array of oneOf(object | object) (required) - An array of BIM Plan payloads

Response 200 (application/json): object

- `bim_plans`: array of object
  - `id`: integer - ID e.g. `144`
  - `bim_level_id`: integer - ID of the BIM Level that the plan is associated to e.g. `16`
  - `drawing_id`: integer - ID of the Drawing that the plan is associated to e.g. `16`
  - `created_at`: string(date-time) - Created date e.g. `2019-01-04T06:13:10Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2019-01-06T11:26:08Z`
  - `title`: string - Title of the plan. This reflects the title of the drawing associated to the plan. If plan is not associated to a drawing, the title will contain the associated location name e.g. `A201: Floor II Plan`
  - `image`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `drawing.png`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
    - `height`: integer - Image height e.g. `1200`
    - `width`: integer - Image width e.g. `1600`
  - `thumbnail`: object
    - `id`: integer - ID e.g. `149`
    - `size`: string enum[small, medium, large] - Thumbnail size e.g. `small`
    - `url`: string - Thumbnail url e.g. `https://storage.procore.com/thumbnail-bucket/46971c37f_thumbnail_large.png?si...`
  - `sheet_map_start`: object - 2D Coordinate Point
    - `x`: number(double) - x-axis coordinate e.g. `6.24`
    - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `sheet_map_end`: object - 2D Coordinate Point
    - `x`: number(double) - x-axis coordinate e.g. `6.24`
    - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `model_map_start`: object - 3D Coordinate Point
    - `x`: number(double) - x-axis coordinate e.g. `6.24`
    - `y`: number(double) - y-axis coordinate e.g. `12.48`
    - `z`: number(double) - z-axis coordinate e.g. `24.96`
  - `model_map_end`: object - 3D Coordinate Point
    - `x`: number(double) - x-axis coordinate e.g. `6.24`
    - `y`: number(double) - y-axis coordinate e.g. `12.48`
    - `z`: number(double) - z-axis coordinate e.g. `24.96`
- `errors`: array of object
  - `bim_level_id`: integer (required) - ID of the BIM Level to be associated to the plan e.g. `16`
  - `drawing_id`: integer - ID of the Drawing to be associated to the plan e.g. `16`
  - `upload_uuid`: string - UUID of uploaded 2D sheet image. One of drawing_id or upload_uid is required e.g. `1ZE258W9K804SAJJZX19JVAB3R`
  - `sheet_map_start`: object - 2D Coordinate Point
    - `x`: number(float) - x-axis coordinate e.g. `6.24`
    - `y`: number(float) - y-axis coordinate e.g. `12.48`
  - `sheet_map_end`: object - 2D Coordinate Point
    - `x`: number(float) - x-axis coordinate e.g. `6.24`
    - `y`: number(float) - y-axis coordinate e.g. `12.48`
  - `model_map_start`: object - 3D Coordinate Point
    - `x`: number(float) - x-axis coordinate e.g. `6.24`
    - `y`: number(float) - y-axis coordinate e.g. `12.48`
    - `z`: number(float) - z-axis coordinate e.g. `24.96`
  - `model_map_end`: object - 3D Coordinate Point
    - `x`: number(float) - x-axis coordinate e.g. `6.24`
    - `y`: number(float) - y-axis coordinate e.g. `12.48`
    - `z`: number(float) - z-axis coordinate e.g. `24.96`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Plans

Resource id: `bim-plans`. Raw spec: `../openapi-raw/bim-plans.json`. Web: https://developers.procore.com/reference/rest/bim-plans?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_plans

**List BIM Plans**
Lists BIM Plans associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view does not contain the attributes 'image', 'sheet_map_start', 'sheet_map_end', 'model_map_start' and 'model_map_en...
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[bim_level_id]` [query] integer - Filter item(s) with matching BIM Level ids

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `144`
- `bim_level_id`: integer - ID of the BIM Level that the plan is associated to e.g. `16`
- `drawing_id`: integer - ID of the Drawing that the plan is associated to e.g. `16`
- `created_at`: string(date-time) - Created date e.g. `2019-01-04T06:13:10Z`
- `updated_at`: string(date-time) - Updated date e.g. `2019-01-06T11:26:08Z`
- `title`: string - Title of the plan. This reflects the title of the drawing associated to the plan. If plan is not associated to a drawing, the title will contain the associated location name e.g. `A201: Floor II Plan`
- `image`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `drawing.png`
  - `content_type`: string - A mime type or a file extension e.g. `image/png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `height`: integer - Image height e.g. `1200`
  - `width`: integer - Image width e.g. `1600`
- `thumbnail`: object
  - `id`: integer - ID e.g. `149`
  - `size`: string enum[small, medium, large] - Thumbnail size e.g. `small`
  - `url`: string - Thumbnail url e.g. `https://storage.procore.com/thumbnail-bucket/46971c37f_thumbnail_large.png?si...`
- `sheet_map_start`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `sheet_map_end`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `model_map_start`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`
- `model_map_end`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/bim_plans

**Create BIM Plan**
Create a BIM Plan in a Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_plan`: oneOf(object | object) (required)

Response 201 (application/json): object

- `id`: integer - ID e.g. `144`
- `bim_level_id`: integer - ID of the BIM Level that the plan is associated to e.g. `16`
- `drawing_id`: integer - ID of the Drawing that the plan is associated to e.g. `16`
- `created_at`: string(date-time) - Created date e.g. `2019-01-04T06:13:10Z`
- `updated_at`: string(date-time) - Updated date e.g. `2019-01-06T11:26:08Z`
- `title`: string - Title of the plan. This reflects the title of the drawing associated to the plan. If plan is not associated to a drawing, the title will contain the associated location name e.g. `A201: Floor II Plan`
- `image`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `drawing.png`
  - `content_type`: string - A mime type or a file extension e.g. `image/png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `height`: integer - Image height e.g. `1200`
  - `width`: integer - Image width e.g. `1600`
- `thumbnail`: object
  - `id`: integer - ID e.g. `149`
  - `size`: string enum[small, medium, large] - Thumbnail size e.g. `small`
  - `url`: string - Thumbnail url e.g. `https://storage.procore.com/thumbnail-bucket/46971c37f_thumbnail_large.png?si...`
- `sheet_map_start`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `sheet_map_end`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `model_map_start`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`
- `model_map_end`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_plans/{id}

**Show BIM Plan**
Return a single BIM Plan item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Plan ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - The compact view contains only ids. The extended view contains the response shown below. The normal view does not contain the attributes 'image', 'sheet_map_start', 'sheet_map_end', 'model_map_start' and 'model_map_en...

Response 200 (application/json): object

- `id`: integer - ID e.g. `144`
- `bim_level_id`: integer - ID of the BIM Level that the plan is associated to e.g. `16`
- `drawing_id`: integer - ID of the Drawing that the plan is associated to e.g. `16`
- `created_at`: string(date-time) - Created date e.g. `2019-01-04T06:13:10Z`
- `updated_at`: string(date-time) - Updated date e.g. `2019-01-06T11:26:08Z`
- `title`: string - Title of the plan. This reflects the title of the drawing associated to the plan. If plan is not associated to a drawing, the title will contain the associated location name e.g. `A201: Floor II Plan`
- `image`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `drawing.png`
  - `content_type`: string - A mime type or a file extension e.g. `image/png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `height`: integer - Image height e.g. `1200`
  - `width`: integer - Image width e.g. `1600`
- `thumbnail`: object
  - `id`: integer - ID e.g. `149`
  - `size`: string enum[small, medium, large] - Thumbnail size e.g. `small`
  - `url`: string - Thumbnail url e.g. `https://storage.procore.com/thumbnail-bucket/46971c37f_thumbnail_large.png?si...`
- `sheet_map_start`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `sheet_map_end`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `model_map_start`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`
- `model_map_end`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/bim_plans/{id}

**Update BIM Plan**
Update a single BIM Plan item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Plan ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_plan`: oneOf(object | object) (required)

Response 200 (application/json): object

- `id`: integer - ID e.g. `144`
- `bim_level_id`: integer - ID of the BIM Level that the plan is associated to e.g. `16`
- `drawing_id`: integer - ID of the Drawing that the plan is associated to e.g. `16`
- `created_at`: string(date-time) - Created date e.g. `2019-01-04T06:13:10Z`
- `updated_at`: string(date-time) - Updated date e.g. `2019-01-06T11:26:08Z`
- `title`: string - Title of the plan. This reflects the title of the drawing associated to the plan. If plan is not associated to a drawing, the title will contain the associated location name e.g. `A201: Floor II Plan`
- `image`: object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `drawing.png`
  - `content_type`: string - A mime type or a file extension e.g. `image/png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `height`: integer - Image height e.g. `1200`
  - `width`: integer - Image width e.g. `1600`
- `thumbnail`: object
  - `id`: integer - ID e.g. `149`
  - `size`: string enum[small, medium, large] - Thumbnail size e.g. `small`
  - `url`: string - Thumbnail url e.g. `https://storage.procore.com/thumbnail-bucket/46971c37f_thumbnail_large.png?si...`
- `sheet_map_start`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `sheet_map_end`: object - 2D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
- `model_map_start`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`
- `model_map_end`: object - 3D Coordinate Point
  - `x`: number(double) - x-axis coordinate e.g. `6.24`
  - `y`: number(double) - y-axis coordinate e.g. `12.48`
  - `z`: number(double) - z-axis coordinate e.g. `24.96`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_plans/{id}

**Delete BIM Plan**
Delete a BIM Plan from the system.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Plan ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 204: No Content (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Property File Objects

Resource id: `bim-property-file-objects`. Raw spec: `../openapi-raw/bim-property-file-objects.json`. Web: https://developers.procore.com/reference/rest/bim-property-file-objects?version=latest
Product lines: Models

### GET /rest/v1.0/bim_property_files/{id}/objects

**List BIM Property File Objects**
Lists objects from a specific BIM Property File.
A BIM Property File is a resource that represents a 3d-model database. For models published to the Models tool, the property file id can be found in [BIM Model Revision](https://developers.procore.com/reference/rest/v1/bim-model-revisions?version=1.0#show-bim-model-revision) object\_definition -> id. For models uploaded and extracted with Procore Documents, the property file id can be found in [BIM File Extraction](https://developers.procore.com/reference/rest/v1/bim-file-extractions?version=1.0#show-bim-file-extraction) extraction\_items -> artifact -> properties -> id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Property File ID.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `object_search_id` [query] integer - Object search id
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[query]` [query] string - Filter item(s) containing query. Searchable fields include Object Value

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `19`
- `value`: string - Value e.g. `A_Interior_1001_SBA_Hexa.nwd`

Error responses: 400, 401, 403, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Property File Properties

Resource id: `bim-property-file-properties`. Raw spec: `../openapi-raw/bim-property-file-properties.json`. Web: https://developers.procore.com/reference/rest/bim-property-file-properties?version=latest
Product lines: Models

### GET /rest/v1.0/bim_property_files/{id}/properties

**List BIM Property File Properties**
Lists properties from a specific BIM Property File.
A BIM Property File is a resource that represents a 3d-model database. For models published to the Models tool, the property file id can be found in [BIM Model Revision](https://developers.procore.com/reference/rest/v1/bim-model-revisions?version=1.0#show-bim-model-revision) object\_definition -> id. For models uploaded and extracted with Procore Documents, the property file id can be found in [BIM File Extraction](https://developers.procore.com/reference/rest/v1/bim-file-extractions?version=1.0#show-bim-file-extraction) extraction\_items -> artifact -> properties -> id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - BIM Property File ID.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[object_id]` [query] array of integer - Filter item(s) with matching object_id.
- `filters[category]` [query] array of string - Filter item(s) with matching category.
- `filters[name]` [query] array of string - Filter item(s) with matching name.
- `filters[value]` [query] array of string - Filter item(s) with matching value.
- `filters[query]` [query] string - Filter item(s) containing query. Searchable fields include Property Category, Name, and Value
- `filters[curated_list]` [query] boolean - Filter item(s) to return a curated list of properties
- `filters[has_uom]` [query] boolean - Filter item(s) to return properties with/without unit of measurement (uom).

Response 200 (application/json): array of oneOf(object | object)


Error responses: 400, 401, 403, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM View Folders

Resource id: `bim-view-folders`. Raw spec: `../openapi-raw/bim-view-folders.json`. Web: https://developers.procore.com/reference/rest/bim-view-folders?version=latest
Product lines: Design Coordination

### GET /rest/v1.0/bim_view_folders

**List BIM View Folders**
Lists BIM View Folders associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[bim_file_id]` [query] integer - Filter item(s) with matching BIM File ids
- `filters[parent_id]` [query] integer - Filter item(s) with matching parent_id

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `109`
- `name`: string - Name of view folder e.g. `Mechanical`
- `parent_id`: integer - Id of parent BimViewFolder e.g. `168`
- `bim_file_id`: integer - Id of associated BimFile e.g. `196`
- `project_id`: integer - Project Id e.g. `101`
- `created_by_id`: integer - Id if creator e.g. `137`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/bim_view_folders

**Create BIM View Folder**
Create BIM View Folder

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `bim_view_folder`: object (required)
  - `name`: string (required) - Name of view folder e.g. `Mechanical`
  - `parent_id`: integer - Id of parent BimViewFolder e.g. `168`
  - `bim_file_id`: integer (required) - Id of BimFile to associate e.g. `196`

Response 201 (application/json): object

- `id`: integer - ID e.g. `109`
- `name`: string - Name of view folder e.g. `Mechanical`
- `parent_id`: integer - Id of parent BimViewFolder e.g. `168`
- `bim_file_id`: integer - Id of associated BimFile e.g. `196`
- `project_id`: integer - Project Id e.g. `101`
- `created_by_id`: integer - Id if creator e.g. `137`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Viewpoint Associations

Resource id: `bim-viewpoint-associations`. Raw spec: `../openapi-raw/bim-viewpoint-associations.json`. Web: https://developers.procore.com/reference/rest/bim-viewpoint-associations?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_viewpoints/{bim_viewpoint_id}/associations

**Create Viewpoint and Procore Item association**
A BIM Viewpoint can be associated with other procore items. This API endpoint creates that association.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bim_viewpoint_id` [path] integer (required) - BIM Viewpoint ID

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `procore_item`: object - Details of Procore item to be linked to a BimViewpoint
  - `item_id`: integer (required) - Id of the Procore item to be associated e.g. `1`
  - `item_type`: string enum[BimModelRevision, Comment, CoordinationIssue] (required) - Type of the Procore item to be associated e.g. `CoordinationIssue`
  - `primary`: boolean - Set as primary viewpoint for the procore item. Only applicable for BimModelRevision e.g. `true`

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/bim_viewpoints/{bim_viewpoint_id}/associations

**Delete Viewpoint and Procore Item association**
Delete the association between a BIM Viewpoint and a procore item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bim_viewpoint_id` [path] integer (required) - BIM Viewpoint ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `item_id` [query] integer (required) - Procore Item ID
- `item_type` [query] string enum[BimModelRevision, Comment, CoordinationIssue] (required) - Procore Item Type

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Viewpoint Batch

Resource id: `bim-viewpoint-batch`. Raw spec: `../openapi-raw/bim-viewpoint-batch.json`. Web: https://developers.procore.com/reference/rest/bim-viewpoint-batch?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_viewpoints/batch

**Create a batch of BIM Viewpoints**
Create a batch of BIM Viewpoints

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `bim_viewpoints`: array of object (required) - An array of BIM Viewpoint payloads. Limited to 100 items per request
  - `bim_file_id`: integer (required) - ID of a BIM File to be associated to the viewpoint
  - `name`: string - Viewpoint name e.g. `Ceiling view`
  - `view_folder_id`: integer - ID of the BIM View Folder the viewpoint belongs to
  - `upload_uuid`: string (required) - UUID of uploaded snapshot e.g. `1ZE146W9K804SAJJZX19JVAD0R`
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `camera_data`: string (required) - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `visibility`: object - Object visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
      - `object_ids`: array of integer - Array of object ids e.g. `[24861, 46732]`
      - `object_ranges`: array of array of integer - Array of object ranges. A range is an array containing two numbers, the first represents object id, the second represents the number of objects in the range. e.g. `[[24862, 24]]`

Response 200 (application/json): object

- `bim_viewpoints`: array of object
  - `id`: integer - ID e.g. `206`
  - `bim_file_id`: integer - ID of associated BIM File e.g. `809`
  - `view_folder_id`: integer - ID of associated BIM View Folder e.g. `316`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
  - `snapshot`: object
    - `id`: integer
    - `name`: string - Base name of the file without its path e.g. `filename.ext`
    - `content_type`: string - A mime type or a file extension e.g. `image/png`
    - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
  - `name`: string - Viewpoint name e.g. `Mechanical Conflict View`
  - `render_mode`: string enum[shaded, xray] - Viewer render mode when viewpoint is applied
  - `uuid`: string - Unique identifier for the Extraction viewpoint e.g. `123e4567-e89b-12d3-a456-426614174000`
  - `visibility`: object - Object Visibility settings
    - `default_visibility`: boolean
    - `exceptions`: object - Group of model objects represented as an array of object ids, or object ranges
  - `camera_data`: string - JSON string representation of camera position e.g. `{"perspective_camera":{"camera_direction":{"x":-0.24,"y":-0.14,"z":-0.99},"ca...`
  - `redlines_data`: string - JSON string representation of markup e.g. `{"lines":[{"color":{"a":1.0,"b":0,"g":0,"r":1},"end_point":{"x":-0.29,"y":-0....`
  - `sections_data`: string - JSON string representation of sections applied to a 3d model as a set of clipping planes e.g. `[{"location":{"x":0.0,"y":0.0,"z":28.82},"direction":{"x":0,"y":0,"z":-1},"un...`
- `errors`: array of object
  - `bim_file_id`: integer (required) - ID of a BIM File to be associated to the viewpoint
  - `name`: string - Viewpoint name e.g. `Ceiling view`
  - `view_folder_id`: integer - ID of the BIM View Folder the viewpoint belongs to
  - `upload_uuid`: string (required) - UUID of uploaded snapshot e.g. `1ZE146W9K804SAJJZX19JVAD0R`
  - `camera_data`: string (required) - Camera data for the building model associated with the issue e.g. `{"Type":"Camera","Scale":1,"Up":[0,0,1],"Front":[0,1,2.22],"Right":[1,0,0],"P...`
  - `redlines_data`: string - Lines data for the building model associated with the issue e.g. `{"Type":"RedlineCollection","Values":[{"Type":"RedlineEllipse","Thickness":3,...`
  - `sections_data`: string - Clipping plane data for the building model associated with the issue e.g. `{"Type":"ClipPlaneSet","Version":1"}`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## BIM Viewpoints

Resource id: `bim-viewpoints`. Raw spec: `../openapi-raw/bim-viewpoints.json`. Web: https://developers.procore.com/reference/rest/bim-viewpoints?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/bim_viewpoints

**Create a BIM Viewpoint**
Create a BIM Viewpoint

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `bim_viewpoint`: oneOf(object | object | object) (required)

Response 201 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/bim_viewpoints/{id}

**Show BIM Viewpoint**
Return a single BIM Viewpoint

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): oneOf(object | object | object)


Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Nested BIM View Folder Batch

Resource id: `nested-bim-view-folder-batch`. Raw spec: `../openapi-raw/nested-bim-view-folder-batch.json`. Web: https://developers.procore.com/reference/rest/nested-bim-view-folder-batch?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/nested_bim_view_folders/batch

**Create a batch of BIM View Folder by path**
Creates a batch of nested BIM folders as per path provided. If the folder corresponding to a
path exists, the folder at the lowest level is returned.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `126`
- `view`: string enum[compact, normal, extended] - Specify response schema view
- `bim_view_folders`: array of object (required) - An array of nested BIM View Folder payload
  - `path`: array of string (required)
  - `bim_file_id`: integer (required) - Id of BimFile to associate e.g. `196`

Response 200 (application/json): object

- `bim_view_folders`: array of object
  - `id`: integer - ID e.g. `109`
  - `name`: string - Name of view folder e.g. `Mechanical`
  - `parent_id`: integer - Id of parent BimViewFolder e.g. `168`
  - `bim_file_id`: integer - Id of associated BimFile e.g. `196`
  - `project_id`: integer - Project Id e.g. `101`
  - `created_by_id`: integer - Id if creator e.g. `137`
  - `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
  - `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`
- `errors`: array of object
  - `path`: array of string (required)
  - `bim_file_id`: integer (required) - Id of BimFile to associate e.g. `196`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Nested BIM View Folders

Resource id: `nested-bim-view-folders`. Raw spec: `../openapi-raw/nested-bim-view-folders.json`. Web: https://developers.procore.com/reference/rest/nested-bim-view-folders?version=latest
Product lines: Design Coordination

### POST /rest/v1.0/nested_bim_view_folders

**Create or find BIM View Folder by path**
Creates or returns the last view folder for the array of path provided.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `bim_view_folder`: object (required)
  - `path`: array of string (required)
  - `bim_file_id`: integer (required) - Id of BimFile to associate e.g. `196`

Response 200 (application/json): object

- `id`: integer - ID e.g. `109`
- `name`: string - Name of view folder e.g. `Mechanical`
- `parent_id`: integer - Id of parent BimViewFolder e.g. `168`
- `bim_file_id`: integer - Id of associated BimFile e.g. `196`
- `project_id`: integer - Project Id e.g. `101`
- `created_by_id`: integer - Id if creator e.g. `137`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Response 201 (application/json): object

- `id`: integer - ID e.g. `109`
- `name`: string - Name of view folder e.g. `Mechanical`
- `parent_id`: integer - Id of parent BimViewFolder e.g. `168`
- `bim_file_id`: integer - Id of associated BimFile e.g. `196`
- `project_id`: integer - Project Id e.g. `101`
- `created_by_id`: integer - Id if creator e.g. `137`
- `created_at`: string(date-time) - Created date e.g. `2018-04-19T09:36:42Z`
- `updated_at`: string(date-time) - Updated date e.g. `2018-04-20T09:36:42Z`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

