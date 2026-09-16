# Procore API: File Access & Storage (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: File Access & Storage)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Uploads](#uploads) - versions 1.1, 1.0, 2.1

## Uploads

Resource id: `uploads`. Raw spec: `../openapi-raw/uploads.json`. Web: https://developers.procore.com/reference/rest/uploads?version=latest

### POST /rest/v2.1/companies/{company_id}/uploads  **[BETA]**

**Create Unified Company Upload**
Creates a company-level file upload (no project scope) for the given company. Supports both standard (single-part) and segmented (multi-part) uploads with the same request and response shape as project-level create. Returns signed upload URL(s) in the segments array; the client completes the flow with PATCH when applicable.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `file_name`: string (required)
- `file_size`: integer(int64) (required) - File size in bytes. Minimum: 1 byte.
- `content_type`: string (required)
- `sha256`: string
- `md5`: string
- `url_expires_in`: integer(int32)
- `segments`: array of object (required) - Upload file segments. Files up to 104857600 bytes (100 MB) require a single segment, while larger files may be split into multiple segments. A maximum of 10000 segments is permitted per file.
  - `size`: integer(int64)
  - `sha256`: string (required)
  - `md5`: string
- `uploader_tool_name`: string enum[certifications, daily_hazard_analyses, document_management, estimating, lessons_learned, orientations, scheduling, tool_studio, toolbox_talks] (required) - Destination Procore tool for this file. Must match an allowed value. Not the originating client or service.
- `analytics`: object
  - `application`: object
    - `procore_os_name`: string
    - `procore_app_version`: string
    - `client_sdk_name`: string
    - `client_sdk_version`: string
  - `network`: object
    - `network_type`: string
    - `network_info`: object
  - `device`: object
    - `device_type`: string
    - `device_model`: string
    - `device_manufacturer`: string
    - `screen_resolution`: string
    - `browser_name`: string
    - `browser_version`: string
- `custom_metadata`: object

Response 201 (application/json): object

- `data`: object
  - `upload_id`: string
  - `file_name`: string
  - `file_size`: integer(int64)
  - `content_type`: string
  - `uploader_tool_name`: string
  - `upload_expires_at`: integer(int64)
  - `segments`: array of object
    - `url`: string - Presigned URL for uploading this segment
    - `url_expires_at`: integer(int64) - Unix timestamp when the presigned URL expires
    - `headers`: object - Headers to include when uploading this segment
  - `status`: string

Error responses: 400, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/uploads  **[BETA]**

**Create Unified Upload**
Creates a project-level file upload for the given company and project. Supports both standard (single-part) and segmented (multi-part) uploads with a unified request and response. Returns a segments array containing signed upload URL(s)—one segment for standard uploads, multiple for segmented—each with url, url_expires_at, and headers. The client uploads the file (or parts) to the returned URL(s), then completes via PATCH. Polling the upload status until it is available is mandatory before the file can be downloaded.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `file_name`: string (required)
- `file_size`: integer(int64) (required) - File size in bytes. Minimum: 1 byte.
- `content_type`: string (required)
- `sha256`: string
- `md5`: string
- `url_expires_in`: integer(int32)
- `segments`: array of object (required) - Upload file segments. Files up to 104857600 bytes (100 MB) require a single segment, while larger files may be split into multiple segments. A maximum of 10000 segments is permitted per file.
  - `size`: integer(int64)
  - `sha256`: string (required)
  - `md5`: string
- `uploader_tool_name`: string enum[certifications, daily_hazard_analyses, document_management, estimating, lessons_learned, orientations, scheduling, tool_studio, toolbox_talks] (required) - Destination Procore tool for this file. Must match an allowed value. Not the originating client or service.
- `analytics`: object
  - `application`: object
    - `procore_os_name`: string
    - `procore_app_version`: string
    - `client_sdk_name`: string
    - `client_sdk_version`: string
  - `network`: object
    - `network_type`: string
    - `network_info`: object
  - `device`: object
    - `device_type`: string
    - `device_model`: string
    - `device_manufacturer`: string
    - `screen_resolution`: string
    - `browser_name`: string
    - `browser_version`: string
- `custom_metadata`: object

Response 201 (application/json): object

- `data`: object
  - `upload_id`: string
  - `file_name`: string
  - `file_size`: integer(int64)
  - `content_type`: string
  - `uploader_tool_name`: string
  - `upload_expires_at`: integer(int64)
  - `segments`: array of object
    - `url`: string - Presigned URL for uploading this segment
    - `url_expires_at`: integer(int64) - Unix timestamp when the presigned URL expires
    - `headers`: object - Headers to include when uploading this segment
  - `status`: string

Error responses: 400, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/uploads/{upload_id}  **[BETA]**

**Get Company Upload Status**
Retrieves status and metadata for a company-level unified upload by upload ID. Response includes upload_id, file_name, sanitized_file_name, content_type, file_size, status, and custom_metadata. Polling until status is available is mandatory before the file can be downloaded. Use this endpoint to poll upload progress (e.g. receiving → scanning → available) or inspect upload details after creation. When malware scanning is not enabled, status transitions directly from receiving → available.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `upload_id` [path] string (required) - Unique identifier for the upload.
- `url_expires_in` [query] integer(int32) - Presigned URL TTL in seconds (for URL refresh). Minimum: 60, Maximum: 3600, Default: 3600

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `file_name`: string
  - `sanitized_file_name`: string
  - `content_type`: string
  - `uploader_tool_name`: string
  - `file_size`: integer(int64)
  - `status`: string enum[ready, receiving, scanning, available, failed] - Upload lifecycle status. Scan outcomes are reflected here: 'scanning' while malware scan is in progress, 'available' when clean, 'failed' when infected or scan errored.
  - `error`: object - Present when status is 'failed', null otherwise. Describes the reason for failure.
    - `type`: string
    - `message`: string
    - `retryable`: boolean (required) - Whether retrying with a new upload_id may succeed. Always present when error is present.
  - `custom_metadata`: object
  - `segments`: array of object - List of segments for multi-part uploads. Contains presigned URLs and metadata for uploading each segment. Empty list unless status is 'ready' or 'receiving'.
    - `url`: string - Presigned URL for uploading this segment
    - `url_expires_at`: integer(int64) - Unix timestamp when the presigned URL expires
    - `headers`: object - Headers to include when uploading this segment

Error responses: 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/uploads/{upload_id}  **[BETA]**

**Complete Company Upload**
Completes or updates progress for a company-level unified upload. Send part_etags: one ETag per segment (from each PUT response), same order as POST segments. Single-part: one ETag. Segmented: one per segment; null for not-yet-uploaded segments (partial progress). All non-null completes the upload; response includes upload_id and status: 'scanning' when a malware scan is pending, otherwise 'available'. Partial progress returns 'receiving'.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `upload_id` [path] string (required) - Unique identifier for the upload.

Request body (application/json) (required):

- `part_etags`: array of string (required)

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `status`: string enum[ready, receiving, scanning, available, failed] - Upload lifecycle status, from the same vocabulary as the GET response. 'receiving' while segments are still outstanding, 'scanning' once complete and awaiting the malware scan verdict, 'available' when servable, 'fail...

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/{upload_id}  **[BETA]**

**Get Unified Upload Status**
Retrieves status and metadata for a unified upload by upload ID. Response includes upload_id, file_name, sanitized_file_name, content_type, file_size, status, and custom_metadata. Polling until status is available is mandatory before the file can be downloaded. Use this endpoint to poll upload progress (e.g. receiving → scanning → available) or inspect upload details after creation. When malware scanning is not enabled, status transitions directly from receiving → available.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `upload_id` [path] string (required) - Unique identifier for the upload.
- `url_expires_in` [query] integer(int32) - Presigned URL TTL in seconds (for URL refresh). Minimum: 60, Maximum: 3600, Default: 3600

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `file_name`: string
  - `sanitized_file_name`: string
  - `content_type`: string
  - `uploader_tool_name`: string
  - `file_size`: integer(int64)
  - `status`: string enum[ready, receiving, scanning, available, failed] - Upload lifecycle status. Scan outcomes are reflected here: 'scanning' while malware scan is in progress, 'available' when clean, 'failed' when infected or scan errored.
  - `error`: object - Present when status is 'failed', null otherwise. Describes the reason for failure.
    - `type`: string
    - `message`: string
    - `retryable`: boolean (required) - Whether retrying with a new upload_id may succeed. Always present when error is present.
  - `custom_metadata`: object
  - `segments`: array of object - List of segments for multi-part uploads. Contains presigned URLs and metadata for uploading each segment. Empty list unless status is 'ready' or 'receiving'.
    - `url`: string - Presigned URL for uploading this segment
    - `url_expires_at`: integer(int64) - Unix timestamp when the presigned URL expires
    - `headers`: object - Headers to include when uploading this segment

Error responses: 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/{upload_id}  **[BETA]**

**Complete Unified Upload**
Completes or updates progress for a unified upload. Send part_etags: one ETag per segment (from each PUT response), same order as POST segments. Single-part: one ETag. Segmented: one per segment; null for not-yet-uploaded segments (partial progress). All non-null completes the upload; response includes upload_id and status: 'scanning' when a malware scan is pending, otherwise 'available'. Partial progress returns 'receiving'.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `upload_id` [path] string (required) - Unique identifier for the upload.

Request body (application/json) (required):

- `part_etags`: array of string (required)

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `status`: string enum[ready, receiving, scanning, available, failed] - Upload lifecycle status, from the same vocabulary as the GET response. 'receiving' while segments are still outstanding, 'scanning' once complete and awaiting the malware scan verdict, 'available' when servable, 'fail...

Error responses: 400, 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/uploads/{upload_id}/url  **[BETA]**

**Get Unified Company Upload URL**
Gets the upload URL for a company-level file by ID with signature verification. This endpoint validates HMAC signatures for URI integrity. Used by the content streaming proxy to resolve the S3 presigned URL before upload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `upload_id` [path] string (required) - Unique identifier for the upload (file ID).
- `user_id` [query] string (required) - Unique identifier for the user.
- `sig` [query] string (required) - HMAC-SHA256 signature for URI integrity verification.
- `expires_at` [query] integer(int64) (required) - Expiration timestamp (Unix timestamp in seconds). The request will be rejected if this timestamp has expired.

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `upload_url`: string
  - `headers`: object

Error responses: 400, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/uploads/{upload_id}/parts/{part_number}/url  **[BETA]**

**Get Company Part Upload URL**
Gets the upload URL for a specific part by upload ID and part number with signature verification (company-level). This endpoint validates HMAC signatures for URI integrity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `upload_id` [path] string (required) - Unique identifier for the upload (file ID).
- `part_number` [path] integer(int32) (required) - Part number for the upload segment.
- `user_id` [query] string (required) - Unique identifier for the user.
- `sig` [query] string (required) - HMAC-SHA256 signature for URI integrity verification.
- `expires_at` [query] integer(int64) (required) - Expiration timestamp (Unix timestamp in seconds). The request will be rejected if this timestamp has expired.

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `part_number`: string
  - `upload_url`: string
  - `headers`: object

Error responses: 400, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/{upload_id}/url  **[BETA]**

**Get Unified Upload URL**
Gets the upload URL for a file by ID with signature verification. This endpoint validates HMAC signatures for URI integrity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `upload_id` [path] string (required) - Unique identifier for the upload (file ID).
- `user_id` [query] string (required) - Unique identifier for the user.
- `sig` [query] string (required) - HMAC-SHA256 signature for URI integrity verification.
- `expires_at` [query] integer(int64) (required) - Expiration timestamp (Unix timestamp in seconds). The request will be rejected if this timestamp has expired.

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `upload_url`: string
  - `headers`: object

Error responses: 400, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/uploads/{upload_id}/parts/{part_number}/url  **[BETA]**

**Get Unified Part Upload URL**
Gets the upload URL for a specific part by upload ID and part number with signature verification. This endpoint validates HMAC signatures for URI integrity.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `upload_id` [path] string (required) - Unique identifier for the upload (file ID).
- `part_number` [path] integer(int32) (required) - Part number for the upload segment.
- `user_id` [query] string (required) - Unique identifier for the user.
- `sig` [query] string (required) - HMAC-SHA256 signature for URI integrity verification.
- `expires_at` [query] integer(int64) (required) - Expiration timestamp (Unix timestamp in seconds). The request will be rejected if this timestamp has expired.

Response 200 (application/json): object

- `data`: object
  - `upload_id`: string
  - `part_number`: string
  - `upload_url`: string
  - `headers`: object

Error responses: 400, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/uploads/{uuid}

**Show Company Upload**
Show detailed information on an upload

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `uuid` [path] string (required) - Upload UUID

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/companies/{company_id}/uploads/{uuid}

**Update Company Upload**
Update the upload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `uuid` [path] string (required) - Upload UUID

Request body (application/json):

- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 410, 422, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/uploads

**Create Project Upload**
Creating an Upload is the first step in associating a file to a resource
in Procore. Creating an Upload can be seen as fetching instruction on how
to post your file directly to Procore's storage service.
The instructions contain three properties: a UUID to reference the
Upload, a URL which has to be used to post the file, and fields which
need to be posted together with the file.
To upload the file you must POST to the URL in the _url_ property with
a multipart/form-data body (see RFC 2388). Make sure to include **all**
the names and values from _fields_ without altering them. The URL and
fields necessary to complete the upload may vary between companies and
may also change over time so none of these may be hard-coded. Finally add
a field named _file_ with the actual file data.
Uploads are associated to the Company that owns the project so they can
use company specific upload settings. The currently authenticated user
will become the owner of the Upload and only that user can use the Upload
in subsequent requests.
You will have to initiate the upload within one hour or you can expect
a 403 Forbidden response. Other errors are usually clearly explained in
the response body.
For an example of how to associate a finalized upload to another resource
in Procore see the Photos resource. An Upload will have to be associated
to another resource within a week or it will be automatically deleted from
Procore servers.
Note that there is also a variant of this API endpoint that works using a
Company ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `response_filename`: string (required) - By setting a filename you ensure that the storage service knows the filename of the upload. Files are often downloaded directly from the storage service and without the filename they will save on the end users' device... e.g. `Contract.pdf`
- `response_content_type`: string - The content-type set through this parameter will be used by the storage service during download just like the response_filename. Setting this value is less important because HTTP clients and operating systems are gene... e.g. `application/pdf`
- `attachment_content_disposition`: boolean - The content type set through this parameter will be used by the storage system during download, similar to the response_filename. When set to true, the file will be downloaded as an attachment. Otherwise, the file con... e.g. `true`
- `size`: integer - File size in bytes e.g. `1234567`
- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/uploads/{uuid}

**Show Project Upload**
Show detailed information on an upload

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `uuid` [path] string (required) - Upload UUID

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/uploads/{uuid}

**Update Project Upload**
Update the upload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `uuid` [path] string (required) - Upload UUID

Request body (application/json):

- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 410, 422, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/companies/{company_id}/uploads  **[OLDER VERSION - a newer path version exists below/above]**

**Create Company Upload**
Creating an Upload is the first step in associating a file to a resource
in Procore. Creating an Upload can be seen as fetching instruction on how
to post your file directly to Procore's storage service.
The instructions contain three properties: a UUID to reference the
Upload, a URL which has to be used to post the file, and fields which
need to be posted together with the file.
To upload the file you must POST to the URL in the _url_ property with
a multipart/form-data body (see RFC 2388). Make sure to include **all**
the names and values from _fields_ without altering them. The URL and
fields necessary to complete the upload may vary between companies and
may also change over time so none of these may be hard-coded. Finally add
a field named _file_ with the actual file data.
Uploads are associated to a Company so they can use company specific
upload settings. The currently authenticated user will become the owner
of the Upload and only that user can use the Upload in subsequent
requests.
You will have to initiate the upload within one hour or you can expect
a 403 Forbidden response. Other errors are usually clearly explained in
the response body.
For an example of how to associate a finalized upload to another resource
in Procore see the Photos resource. An Upload will have to be associated
to another resource within a week or it will be automatically deleted from
Procore servers.
Note that there is also a variant of this API endpoint that works using a
Project ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `response_filename`: string (required) - By setting a filename you ensure that the storage service knows the filename of the upload. Files are often downloaded directly from the storage service and without the filename they will save on the end users' device... e.g. `Contract.pdf`
- `response_content_type`: string - The content-type set through this parameter will be used by the storage service during download just like the response_filename. Setting this value is less important because HTTP clients and operating systems are gene... e.g. `application/pdf`
- `attachment_content_disposition`: boolean - The content type set through this parameter will be used by the storage system during download, similar to the response_filename. When set to true, the file will be downloaded as an attachment. Otherwise, the file con... e.g. `true`
- `size`: integer - File size in bytes e.g. `1234567`
- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/uploads  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Create Company Upload**
Creating an Upload is the first step in associating a file to a resource
in Procore. Creating an Upload can be seen as fetching instruction on how
to post your file directly to Procore's storage service.
The instructions contain three properties: a UUID to reference the
Upload, a URL which has to be used to post the file, and fields which
need to be posted together with the file.
To upload the file you must POST to the URL in the _url_ property with
a multipart/form-data body (see RFC 2388). Make sure to include **all**
the names and values from _fields_ without altering them. The URL and
fields necessary to complete the upload may vary between companies and
may also change over time so none of these may be hard-coded. Finally add
a field named _file_ with the actual file data.
Uploads are associated to a Company so they can use company specific
upload settings. The currently authenticated user will become the owner
of the Upload and only that user can use the Upload in subsequent
requests.
You will have to initiate the upload within one hour or you can expect
a 403 Forbidden response. Other errors are usually clearly explained in
the response body.
For an example of how to associate a finalized upload to another resource
in Procore see the Photos resource. An Upload will have to be associated
to another resource within a week or it will be automatically deleted from
Procore servers.
Note that there is also a variant of this API endpoint that works using a
Project ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json):

- `response_filename`: string - By setting a filename you ensure that the storage service knows the filename of the upload. Files are often downloaded directly from the storage service and without the filename they will save on the end users' device... e.g. `Contract.pdf`
- `response_content_type`: string - The content-type set through this parameter will be used by the storage service during download just like the response_filename. Setting this value is less important because HTTP clients and operating systems are gene... e.g. `application/pdf`
- `attachment_content_disposition`: boolean - The content type set through this parameter will be used by the storage system during download, similar to the response_filename. When set to true, the file will be downloaded as an attachment. Otherwise, the file con... e.g. `true`
- `size`: integer - File size in bytes e.g. `1234567`
- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/uploads/{uuid}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Company Upload**
Show detailed information on an upload

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `uuid` [path] string (required) - Upload UUID

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/uploads/{uuid}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Company Upload**
Update the upload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `uuid` [path] string (required) - Upload UUID

Request body (application/json):

- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 410, 422, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/uploads  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Create Project Upload**
Creating an Upload is the first step in associating a file to a resource
in Procore. Creating an Upload can be seen as fetching instruction on how
to post your file directly to Procore's storage service.
The instructions contain three properties: a UUID to reference the
Upload, a URL which has to be used to post the file, and fields which
need to be posted together with the file.
To upload the file you must POST to the URL in the _url_ property with
a multipart/form-data body (see RFC 2388). Make sure to include **all**
the names and values from _fields_ without altering them. The URL and
fields necessary to complete the upload may vary between companies and
may also change over time so none of these may be hard-coded. Finally add
a field named _file_ with the actual file data.
Uploads are associated to the Company that owns the project so they can
use company specific upload settings. The currently authenticated user
will become the owner of the Upload and only that user can use the Upload
in subsequent requests.
You will have to initiate the upload within one hour or you can expect
a 403 Forbidden response. Other errors are usually clearly explained in
the response body.
For an example of how to associate a finalized upload to another resource
in Procore see the Photos resource. An Upload will have to be associated
to another resource within a week or it will be automatically deleted from
Procore servers.
Note that there is also a variant of this API endpoint that works using a
Company ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `response_filename`: string - By setting a filename you ensure that the storage service knows the filename of the upload. Files are often downloaded directly from the storage service and without the filename they will save on the end users' device... e.g. `Contract.pdf`
- `response_content_type`: string - The content-type set through this parameter will be used by the storage service during download just like the response_filename. Setting this value is less important because HTTP clients and operating systems are gene... e.g. `application/pdf`
- `attachment_content_disposition`: boolean - The content type set through this parameter will be used by the storage system during download, similar to the response_filename. When set to true, the file will be downloaded as an attachment. Otherwise, the file con... e.g. `true`
- `size`: integer - File size in bytes e.g. `1234567`
- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/uploads/{uuid}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Project Upload**
Show detailed information on an upload

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `uuid` [path] string (required) - Upload UUID

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/uploads/{uuid}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Project Upload**
Update the upload.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `uuid` [path] string (required) - Upload UUID

Request body (application/json):

- `segments`: array of object - Upload segments
  - `size`: integer (required) - Segment file size in bytes e.g. `5242880`
  - `sha256`: string (required) - SHA-256 hash of the file segment e.g. `70c50ce1892d79bc900a0e753b12126273ea8e80051386531b3c10dc68d33926`
  - `md5`: string - MD5 checksum of the file segment e.g. `85a13cb23a2fded1b6c6b78a48507a12`
  - `etag`: string - Entity tag. Hash of S3 object e.g. `9c6243014e7ae154a58d29294906d4a960c60765`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 410, 422, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

