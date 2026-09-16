# Procore API: Photos (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Photos)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Image Categories](#image-categories) - versions 1.0
- [Images](#images) - versions 1.0

## Image Categories

Resource id: `image-categories`. Raw spec: `../openapi-raw/image-categories.json`. Web: https://developers.procore.com/reference/rest/image-categories?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/image_categories

**List image categories**
Return a list of all Photo Albums (Image Categories) in a specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the photo album (image category). Pass as the {id} path parameter to GET/PATCH/DELETE /rest/v1.0/image_categories/{id}.
- `count`: integer - Number of images in the album visible to the requesting user; private images are excluded unless the user has private-photo access.
- `cover_photo`: string - URL of the album's cover thumbnail. Null when the album has no cover image visible to the user.
- `created_at`: string(date-time) - Timestamp when the album was created, in ISO 8601 format.
- `links`: object - Action URLs for this album.
  - `show`: string - Web URL to view the album's images.
  - `delete`: string - REST URL to delete the album via DELETE. Present only when the user may delete the album and it is not the default 'Unclassified' album.
  - `update`: string - REST URL to update the album via PATCH. Present only when the user may modify the album and it is not the default 'Unclassified' album.
- `name`: string - Display name of the album, e.g. 'Site Progress - March'.
- `private`: boolean - Whether the album and its images are restricted to users with private-photo access.
- `updated_at`: string(date-time) - Timestamp when the album was last modified, in ISO 8601 format.
- `position`: integer - Sort order of the album within the project's album list; lower values appear first.

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/image_categories

**Create image category**
Create a new Photo Album (Category) for Images.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `image_category`: object (required)
  - `name`: string (required) - The Name of the Image Category e.g. `1/1/17 album`
  - `private`: boolean - The Private status of the Image Category e.g. `false`
  - `album_cover_id`: integer - ID of an Image that is the cover Image of the Image Category. e.g. `1`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the photo album (image category). Pass as the {id} path parameter to GET/PATCH/DELETE /rest/v1.0/image_categories/{id}.
- `name`: string - Display name of the album, e.g. 'Site Progress - March'.
- `position`: integer - Sort order of the album within the project's album list; lower values appear first.
- `album_cover_id`: integer - Identifier of the Image set as this album's cover, referencing an Image in this album. Null when no cover has been set.
- `created_at`: string(date-time) - Timestamp when the album was created, in ISO 8601 format.
- `private`: boolean - Whether the album and its images are restricted to users with private-photo access.
- `count`: integer - Number of images in the album visible to the requesting user; private images are excluded unless the user has private-photo access.

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/image_categories/ids_with_images

**List Image Category IDs That Contain Images**
Return an array of Image Category IDs for a specified Project that contain Images
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[updated_at]` [query] string - Return Image Categories that contain Images that are within a specific updated_at date-time range.

Response 200 (application/json): array of integer


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/image_categories/{id}

**Show image category**
Return detail information about the specified Photo Album (Image Category).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the image category
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the photo album (image category). Pass as the {id} path parameter to GET/PATCH/DELETE /rest/v1.0/image_categories/{id}.
- `name`: string - Display name of the album, e.g. 'Site Progress - March'.
- `position`: integer - Sort order of the album within the project's album list; lower values appear first.
- `album_cover_id`: integer - Identifier of the Image set as this album's cover, referencing an Image in this album. Null when no cover has been set.
- `created_at`: string(date-time) - Timestamp when the album was created, in ISO 8601 format.
- `private`: boolean - Whether the album and its images are restricted to users with private-photo access.
- `count`: integer - Number of images in the album visible to the requesting user; private images are excluded unless the user has private-photo access.

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/image_categories/{id}

**Update image category**
Update a Photo Album (Image Category) in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the image category
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `image_category`: object (required)
  - `name`: string (required) - The Name of the Image Category e.g. `1/1/17 album`
  - `private`: boolean - The Private status of the Image Category e.g. `false`
  - `album_cover_id`: integer - ID of an Image that is the cover Image of the Image Category. e.g. `1`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the photo album (image category). Pass as the {id} path parameter to GET/PATCH/DELETE /rest/v1.0/image_categories/{id}.
- `name`: string - Display name of the album, e.g. 'Site Progress - March'.
- `position`: integer - Sort order of the album within the project's album list; lower values appear first.
- `album_cover_id`: integer - Identifier of the Image set as this album's cover, referencing an Image in this album. Null when no cover has been set.
- `created_at`: string(date-time) - Timestamp when the album was created, in ISO 8601 format.
- `private`: boolean - Whether the album and its images are restricted to users with private-photo access.
- `count`: integer - Number of images in the album visible to the requesting user; private images are excluded unless the user has private-photo access.

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/image_categories/{id}

**Delete image category**
Delete a Photo Album (Image Category) from a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the image category
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Images

Resource id: `images`. Raw spec: `../openapi-raw/images.json`. Web: https://developers.procore.com/reference/rest/images?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/images

**List images**
Return a list of all Images from a Project's Photo Album (Image Category).
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `image_category_id` [query] integer - Optional. ID of the image category to filter the images by.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[daily_log_segment_id]` [query] array of integer - Daily Log Segment ID filter
- `filters[log_date]` [query] string(date) - Date of Photos added to the Daily Log in the format "YYYY-MM-DD", or a range of dates in the format "YYYY-MM-DD...YYYY-MM-DD".
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `filters[starred]` [query] boolean - If true, returns only item(s) with a `starred` status. This will be ignored for users without permission to star photos, returning the unfiltered list rather than an error.
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[trade_ids]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.
- `filters[projection]` [query] string enum[360, regular] - Return items with the specified projection type.
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[uploader_id]` [query] array of integer - Return item(s) uploaded by the specified User IDs
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `sort` [query] string enum[deleted_at, created_at, exposure_date, taken_at, most_recent] - Field to sort by. If the field is passed with a - (EX: -created_at) it is sorted in reverse order
- `serializer_view` [query] string enum[normal, android, mobile, mobile_feed, prostore_file, ids_only] - The data set that should be returned from the serializer. The normal view includes default fields, plus links, comments_count, trades. The android view includes default fields, plus trades, comments. The mobile view i...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the Image. Use as the {id} path segment in GET/PATCH/DELETE /rest/v1.0/images/{id}.
- `url`: string - Time-limited URL to download the full-resolution image file. Null when the image has been permanently deleted.
- `size`: integer - Image size
- `filename`: string - Image file name
- `description`: string - Image description
- `thumbnail_url`: string - Time-limited URL to the large thumbnail. Null when the image has been permanently deleted.
- `taken_at`: string(date-time) - Timestamp the photo was captured, from EXIF exposure metadata, in ISO 8601 format. Null when the source file has no capture date.
- `created_at`: string(date-time) - Image created at
- `updated_at`: string(date-time) - Image updated at
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `image_category_name`: string - Image Category Name
- `image_category_id`: integer - Image Category ID
- `permanently_deleted`: boolean - True when the image is marked as permanently deleted.
- `private`: boolean - Image private status
- `projection`: string enum[unknown, regular, 360] - Spatial projection of the image. '360' marks a panoramic photo, which clients render in a dedicated 360 viewer; such images are also eligible for tile generation, but only when the file is larger than MINIMUM_SIZE_FOR... e.g. `regular`
- `starred`: boolean - Image starred status
- `width`: integer - Image width
- `height`: integer - Image height
- `image_category_private`: boolean - Whether the Image's category is marked private. Mirrors the private flag of the Image's Image Category.
- `origin_id`: integer - ID of the source record this Image originated from (for example, a Daily Log entry). Null when the Image was uploaded directly. e.g. `45678`
- `daily_log_header_id`: integer - ID of the Daily Log day this Image is attached to. Null when the Image is not associated with a Daily Log. e.g. `987`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `gps_lat`: string - GPS latitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `34.0522`
- `gps_long`: string - GPS longitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `-118.2437`
- `uploader`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `links`: object
  - `self`: string - A link back to the current resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `update`: string - A link to the update endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `delete`: string - A link to the delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `permanentlyDelete`: string - A link to the permanent delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074&permanen...`
  - `retrieve`: string - A link to the retrieve endpoint for the resource e.g. `/rest/v1.0/images/9122752/retrieve?project_id=173074`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `comments_count`: integer - the number of comments on this image

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/images

**Create image**
Upload and add a new Image to a Project's Photo Album (Image Category).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `upload_uuid`: string - UUID referencing a previously completed Upload. This is the recommended approach for image uploads. See Company Uploads or Project Uploads for instructions on how use uploads. You should not use both data and uuid fie... e.g. `1QJ83Q56CVQR4X3C0JG7YV86F8`
- `source_image_id`: integer - ID of an existing Image in the same project to copy. Creates a new independent Image with its own file storage. Mutually exclusive with upload_uuid and data. When provided, image_name is not required. Takes precedence... e.g. `12345`
- `image_name`: string - The name of the image file to be uploaded. Required when using an upload_uuid to upload the image. Not required when using source_image_id. e.g. `my_file.png`
- `image`: object (required) - At least one attribute is required even when an 'upload_uuid' or 'source_image_id' key is provided. If neither is provided, then the 'data' key must be provided
  - `private`: boolean - The Private status of the Image. Defaults to a project configuration. e.g. `false`
  - `provider_type`: string - Provider type. Currently supports only `MarkupLayer`, and should only be used when adding an Image to markup. e.g. `MarkupLayer`
  - `provider_id`: integer - Provider ID. Currently supports only MarkupLayer IDs, and should only be used when adding an Image to markup. e.g. `12`
  - `starred`: boolean - The Starred status of the Image. e.g. `true`
  - `source`: string - Image source e.g. `Image from API`
  - `description`: string - Image description e.g. `This is a cool image`
  - `image_category_id`: integer - Image Category ID e.g. `2`
  - `location_id`: integer - If you want to use an existing location and you have the ID of that existing location use this. `location_id` takes precedence over `mt_location` e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["Location 1", "Location 2"]`
  - `trade_ids`: array of integer - An array of IDs of the Trades of the Image e.g. `[1, 2]`
  - `log_date`: string e.g. `2018-01-01`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the Image. Use as the {id} path segment in GET/PATCH/DELETE /rest/v1.0/images/{id}.
- `url`: string - Time-limited URL to download the full-resolution image file. Null when the image has been permanently deleted.
- `size`: integer - Image size
- `filename`: string - Image file name
- `description`: string - Image description
- `thumbnail_url`: string - Time-limited URL to the large thumbnail. Null when the image has been permanently deleted.
- `taken_at`: string(date-time) - Timestamp the photo was captured, from EXIF exposure metadata, in ISO 8601 format. Null when the source file has no capture date.
- `created_at`: string(date-time) - Image created at
- `updated_at`: string(date-time) - Image updated at
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `image_category_name`: string - Image Category Name
- `image_category_id`: integer - Image Category ID
- `permanently_deleted`: boolean - True when the image is marked as permanently deleted.
- `private`: boolean - Image private status
- `projection`: string enum[unknown, regular, 360] - Spatial projection of the image. '360' marks a panoramic photo, which clients render in a dedicated 360 viewer; such images are also eligible for tile generation, but only when the file is larger than MINIMUM_SIZE_FOR... e.g. `regular`
- `starred`: boolean - Image starred status
- `width`: integer - Image width
- `height`: integer - Image height
- `image_category_private`: boolean - Whether the Image's category is marked private. Mirrors the private flag of the Image's Image Category.
- `origin_id`: integer - ID of the source record this Image originated from (for example, a Daily Log entry). Null when the Image was uploaded directly. e.g. `45678`
- `daily_log_header_id`: integer - ID of the Daily Log day this Image is attached to. Null when the Image is not associated with a Daily Log. e.g. `987`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `gps_lat`: string - GPS latitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `34.0522`
- `gps_long`: string - GPS longitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `-118.2437`
- `uploader`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `links`: object
  - `self`: string - A link back to the current resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `update`: string - A link to the update endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `delete`: string - A link to the delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `permanentlyDelete`: string - A link to the permanent delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074&permanen...`
  - `retrieve`: string - A link to the retrieve endpoint for the resource e.g. `/rest/v1.0/images/9122752/retrieve?project_id=173074`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `comments_count`: integer - the number of comments on this image

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/images/{id}

**Show image**
Show detailed information for a specified Image in a Project's Photo Album (Image Category).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the image
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Image. Use as the {id} path segment in GET/PATCH/DELETE /rest/v1.0/images/{id}.
- `url`: string - Time-limited URL to download the full-resolution image file. Null when the image has been permanently deleted.
- `size`: integer - Image size
- `filename`: string - Image file name
- `description`: string - Image description
- `thumbnail_url`: string - Time-limited URL to the large thumbnail. Null when the image has been permanently deleted.
- `taken_at`: string(date-time) - Timestamp the photo was captured, from EXIF exposure metadata, in ISO 8601 format. Null when the source file has no capture date.
- `created_at`: string(date-time) - Image created at
- `updated_at`: string(date-time) - Image updated at
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `image_category_name`: string - Image Category Name
- `image_category_id`: integer - Image Category ID
- `permanently_deleted`: boolean - True when the image is marked as permanently deleted.
- `private`: boolean - Image private status
- `projection`: string enum[unknown, regular, 360] - Spatial projection of the image. '360' marks a panoramic photo, which clients render in a dedicated 360 viewer; such images are also eligible for tile generation, but only when the file is larger than MINIMUM_SIZE_FOR... e.g. `regular`
- `starred`: boolean - Image starred status
- `width`: integer - Image width
- `height`: integer - Image height
- `image_category_private`: boolean - Whether the Image's category is marked private. Mirrors the private flag of the Image's Image Category.
- `origin_id`: integer - ID of the source record this Image originated from (for example, a Daily Log entry). Null when the Image was uploaded directly. e.g. `45678`
- `daily_log_header_id`: integer - ID of the Daily Log day this Image is attached to. Null when the Image is not associated with a Daily Log. e.g. `987`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `gps_lat`: string - GPS latitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `34.0522`
- `gps_long`: string - GPS longitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `-118.2437`
- `uploader`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `links`: object
  - `self`: string - A link back to the current resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `update`: string - A link to the update endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `delete`: string - A link to the delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `permanentlyDelete`: string - A link to the permanent delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074&permanen...`
  - `retrieve`: string - A link to the retrieve endpoint for the resource e.g. `/rest/v1.0/images/9122752/retrieve?project_id=173074`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `comments_count`: integer - the number of comments on this image
- `tiling_status`: string enum[not_tiled, pending, processing, tiled, failed] - Status of image tiling process e.g. `not_tiled`
- `tiles_config`: object e.g. `{"id": 123, "tile_resolution": 512, "cube_resolution": 4096, "max_zoom_level"...`
  - `id`: integer - Image Tiles Config ID e.g. `123`
  - `tile_resolution`: integer - Resolution of individual tiles in pixels e.g. `512`
  - `cube_resolution`: integer - Resolution of the cube map in pixels e.g. `4096`
  - `max_zoom_level`: integer - Maximum zoom level for the tiled image e.g. `3`
  - `extension`: string - File extension for tile images e.g. `jpg`
  - `path_pattern`: string - Path pattern for accessing tiles e.g. `%l/%f%x_%y`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/images/{id}

**Update image**
Update an existing Image in a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the image
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `image`: object (required)
  - `private`: boolean - The Private status of the Image. Defaults to a project configuration. e.g. `false`
  - `starred`: boolean - The Starred status of the Image. e.g. `true`
  - `description`: string - Image description e.g. `This is a cool image`
  - `image_category_id`: integer - Image Category ID to move the Image to e.g. `2`
  - `location_id`: integer - If you want to use an existing location and you have the ID of that existing location use this. `location_id` takes precedence over `mt_location` e.g. `13`
  - `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
  - `mt_location`: array of string - Use this for creating a new multi-tier or single-tier Location. This will be ignored if `location_id` is provided. e.g. `["Location 1", "Location 2"]`
  - `trade_ids`: array of integer - An array of IDs of the Trades of the Image e.g. `[1, 2]`
  - `log_date`: string e.g. `2018-01-01`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Image. Use as the {id} path segment in GET/PATCH/DELETE /rest/v1.0/images/{id}.
- `url`: string - Time-limited URL to download the full-resolution image file. Null when the image has been permanently deleted.
- `size`: integer - Image size
- `filename`: string - Image file name
- `description`: string - Image description
- `thumbnail_url`: string - Time-limited URL to the large thumbnail. Null when the image has been permanently deleted.
- `taken_at`: string(date-time) - Timestamp the photo was captured, from EXIF exposure metadata, in ISO 8601 format. Null when the source file has no capture date.
- `created_at`: string(date-time) - Image created at
- `updated_at`: string(date-time) - Image updated at
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `image_category_name`: string - Image Category Name
- `image_category_id`: integer - Image Category ID
- `permanently_deleted`: boolean - True when the image is marked as permanently deleted.
- `private`: boolean - Image private status
- `projection`: string enum[unknown, regular, 360] - Spatial projection of the image. '360' marks a panoramic photo, which clients render in a dedicated 360 viewer; such images are also eligible for tile generation, but only when the file is larger than MINIMUM_SIZE_FOR... e.g. `regular`
- `starred`: boolean - Image starred status
- `width`: integer - Image width
- `height`: integer - Image height
- `image_category_private`: boolean - Whether the Image's category is marked private. Mirrors the private flag of the Image's Image Category.
- `origin_id`: integer - ID of the source record this Image originated from (for example, a Daily Log entry). Null when the Image was uploaded directly. e.g. `45678`
- `daily_log_header_id`: integer - ID of the Daily Log day this Image is attached to. Null when the Image is not associated with a Daily Log. e.g. `987`
- `daily_log_segment_id`: integer - Daily Log Segment ID e.g. `123456`
- `daily_log_segment`: object
  - `id`: integer - ID e.g. `123456`
  - `name`: string - Name of the segment e.g. `Morning Shift`
  - `description`: string - Description of the segment e.g. `Work performed during the morning shift`
  - `deleted_at`: string(date-time) - Timestamp when the segment was soft deleted e.g. `2025-01-15T10:30:00Z`
  - `deleted`: boolean - Indicates if the segment is deleted e.g. `false`
- `gps_lat`: string - GPS latitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `34.0522`
- `gps_long`: string - GPS longitude extracted from the image EXIF metadata, as a decimal-degrees string. Null when the image has no embedded location data. e.g. `-118.2437`
- `uploader`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `links`: object
  - `self`: string - A link back to the current resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `update`: string - A link to the update endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `delete`: string - A link to the delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074`
  - `permanentlyDelete`: string - A link to the permanent delete endpoint for the resource e.g. `/rest/v1.0/images/9122752?image_category_id=186339&project_id=173074&permanen...`
  - `retrieve`: string - A link to the retrieve endpoint for the resource e.g. `/rest/v1.0/images/9122752/retrieve?project_id=173074`
- `trades`: array of object
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `comments_count`: integer - the number of comments on this image

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/images/{id}

**Delete image**
Remove an Image from a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the image
- `project_id` [query] integer (required) - Unique identifier for the project.
- `permanent` [query] boolean - If true, permanently deletes the image.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

