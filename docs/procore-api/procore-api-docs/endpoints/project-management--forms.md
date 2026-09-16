# Procore API: Forms (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Forms)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Forms](#forms) - versions 1.1, 1.0

## Forms

Resource id: `forms`. Raw spec: `../openapi-raw/forms.json`. Web: https://developers.procore.com/reference/rest/forms?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.1/projects/{project_id}/forms

**List Forms on a project**
Return a list of all Forms from a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[private]` [query] boolean - If true, returns only item(s) with a `private` status.
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[form_template_id]` [query] array of integer - Array of Form Template IDs. Return item(s) associated with the specified Form Template IDs.
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_by, description, name, created_at, updated_at]

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/forms

**List Forms on a project**
Return a list of all Forms from a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[form_template_id]` [query] array of integer - Array of Form Template IDs. Return item(s) associated with the specified Form Template IDs.
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[created_by, description, name, created_at, updated_at]

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/forms

**Create Form**
Create a new Form associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `form`: object (required)
  - `name`: string (required) - The name of the Form. e.g. `Daily Inspection Form`
  - `description`: string (required) - The Description of the Form e.g. `This is a description`
  - `form_template_id`: integer (required) - ID of the Form Template that the Form is made from e.g. `1`
  - `private`: boolean - The Private status of the Form e.g. `false`
  - `fillable_pdf_prostore_file_id`: integer (required) - Form's Fillable PDF. Either `fillable_pdf_prostore_file_id` or `fillable_pdf_upload_id` must be present. e.g. `5432`
  - `fillable_pdf_upload_id`: string - The specified Upload is saved as the Form's Fillable PDF. Either `fillable_pdf_prostore_file_id` or `fillable_pdf_upload_id` must be present. e.g. `01HZB4TFFBZWDQ92N3RJFM5J2Z`
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Form as attachments e.g. `[4, 5]`
  - `upload_ids`: array of string - An array of Upload UUIDs. The Uploads will be transformed into the Form's attachments

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 400, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/forms/{id}

**Show Form**
Return detailed information on the specified Form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Form ID

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/forms/{id}

**Update Form**
Update the specified Form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Form ID
- `send_emails` [query] boolean - Designates whether or not emails will be sent (default false)

Request body (application/json) (required):

- `form`: object (required)
  - `name`: string - The name of the Form. e.g. `Daily Inspection Form`
  - `description`: string - The Description of the Form e.g. `This is a description`
  - `private`: boolean - The Private status of the Form e.g. `false`
  - `fillable_pdf_prostore_file_id`: integer - Form's Fillable PDF. `fillable_pdf_prostore_file_id` and `fillable_pdf_upload_id` are mutually exclusive. e.g. `5432`
  - `fillable_pdf_upload_id`: string - The specified Upload is saved as the Form's Fillable PDF. `fillable_pdf_prostore_file_id` and `fillable_pdf_upload_id` are mutually exclusive. e.g. `01HZB4TFFBZWDQ92N3RJFM5J2Z`
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Form as attachments e.g. `[4, 5]`
  - `upload_ids`: array of string - An array of Upload UUIDs. The Uploads will be transformed into the Form's attachments

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 400, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/forms/{id}

**Delete Form**
Delete the specified Form.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Form ID

Response 200: Form deleted successfully (no body)

Error responses: 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/forms

**List Recycled Project Forms**
Returns a collection of Recycled Forms for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/recycle_bin/forms/{id}

**Show Recycled Project Form**
Returns the details for a specified recycled Project Form

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Project Form ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/recycle_bin/forms/{id}/restore

**Restore Project Form**
Restores the specified Form from Recycle Bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Project Form ID
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Form. Use as the `{id}` path parameter for show, update, delete, and send_email requests on this Form. e.g. `999`
- `created_at`: string(date-time) - Timestamp when the Form was created, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `description`: string - Free-text description of the Form provided by its author. e.g. `This is a Form`
- `form_template_id`: integer - ID of the Form Template this Form was created from. References a Form Template in the same company. e.g. `1`
- `form_template_name`: string - Name of the Form Template this Form was created from. e.g. `Inspection Form Template`
- `name`: string - Display name of the Form. e.g. `Inspection Form`
- `private`: boolean - When true, the Form is visible only to its creator and users with admin access to the Forms tool; when false, it is visible to all users who can view Forms. e.g. `false`
- `created_by`: object - The user who created the Form.
  - `id`: integer - ID of the user (login information) who created the Form. e.g. `160586`
  - `login`: string - Email/login of the user who created the Form. e.g. `exampleuser@example.com`
  - `name`: string - Full name of the user who created the Form. e.g. `Carl Contractor`
- `updated_at`: string(date-time) - Timestamp when the Form was last updated, in ISO 8601 format. e.g. `2016-08-23T15:23:57Z`
- `fillable_pdf`: object - The fillable PDF file backing this Form.
  - `id`: integer - ID of the underlying file (Prostore File) for the fillable PDF. e.g. `5324`
  - `url`: string - Download URL for the fillable PDF. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the fillable PDF. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the fillable PDF file. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this file. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the PDF has been generated and can be displayed in-app. e.g. `true`
- `attachments`: array of object - Additional files attached to the Form.
  - `id`: integer - ID of the attached file (Prostore File). e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - Original filename of the attachment. e.g. `january_receipt_copy.pdf`
  - `name`: string - Display name of the attachment. e.g. `january_receipt_copy.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `thumbnail_url`: string - URL of the Form's thumbnail image. Falls back to a generic document placeholder image when no thumbnail has been generated. e.g. `https://storage.procore.com/v4/d/us-east-1/prostore-thumbnail-bucket-staging/...`
- `viewable`: boolean - True when a viewable (rendered) version of the Form's fillable PDF exists and can be displayed in-app. e.g. `true`
- `viewable_document_id`: integer - ID of the generated viewable document for the Form's fillable PDF. Null when no viewable version has been generated. e.g. `4`
- `holder_class`: string - Class name of the record that holds the file, used by attachment-related clients. Always "Form" for this resource. e.g. `Form`
- `download_all_uuid`: object - Session token object used to request a bulk download of the Form and its attachments. Only populated on the show response; null otherwise.
- `attachment`: object - The Form's primary fillable PDF, exposed as a single attachment object. Mirrors `fillable_pdf`.
  - `id`: integer - ID of the attachment file (Prostore File). e.g. `17`
  - `name`: string - Display name of the attachment. e.g. `test.pdf`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/v4/d/us-east-1`
  - `filename`: string - Original filename of the attachment. e.g. `test.pdf`
  - `can_be_viewed`: boolean - True when the current user is permitted to view this attachment. e.g. `true`
  - `viewable`: boolean - True when a viewable (rendered) version of the attachment has been generated and can be displayed in-app. e.g. `true`
- `permissions`: object - The current user's permissions for this Form. Only present when the request includes the `view=with_permissions` query parameter.
  - `can_edit`: boolean - True when the current user can edit this Form. e.g. `false`
  - `can_view_change_history`: boolean - True when the current user can view this Form's change history. e.g. `true`
  - `can_view_download_log`: boolean - True when the current user can view this Form's download log. e.g. `true`
  - `can_email`: boolean - True when the current user can send this Form by email. e.g. `true`
  - `can_destroy`: boolean - True when the current user can delete this Form. e.g. `true`
- `deleted`: boolean - True when the Form has been soft-deleted (moved to the recycle bin) and is pending permanent removal or restoration. e.g. `false`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

