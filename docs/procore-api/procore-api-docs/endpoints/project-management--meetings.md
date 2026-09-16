# Procore API: Meetings (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Meetings)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Meeting Attendees](#meeting-attendees) - versions 1.0
- [Meeting Categories](#meeting-categories) - versions 1.0
- [Meeting Templates](#meeting-templates) - versions 1.0
- [Meeting Topics](#meeting-topics) - versions 1.1, 1.0
- [Meetings](#meetings) - versions 2.0, 1.1, 1.0

## Meeting Attendees

Resource id: `meeting-attendees`. Raw spec: `../openapi-raw/meeting-attendees.json`. Web: https://developers.procore.com/reference/rest/meeting-attendees?version=latest
Product lines: PM Essentials

### POST /rest/v1.0/meeting_attendee_records

**Create meeting attendee record**
Create a new Meeting Attendee record. This associates a user with a meeting.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `meeting_id` [query] integer (required) - ID of the Meeting

Request body (application/json) (required):

- `meeting_attendee_record`: object (required) - Attributes for the meeting attendee record to create or update.
  - `status`: string enum[Present, Absent, For Distribution Only, Conference] - Attendance status to set for the user. Constrained to the values in the enum. e.g. `Present`
  - `login_information_id`: integer - Login Information (user) ID of the Project user to associate with the Meeting as an attendee. e.g. `999`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this meeting attendee record. Use as the `{id}` path parameter to update or delete the record via `/rest/v1.0/meeting_attendee_records/{id}`. e.g. `999`
- `meeting_id`: integer - Identifier of the Meeting this attendee belongs to. Pass as the `meeting_id` query parameter when updating or deleting the record. e.g. `999`
- `status`: string enum[Present, Absent, For Distribution Only, Conference] - Attendance status of the user for this meeting. Constrained to the values in the enum. e.g. `Present`
- `login_information`: object - Identity of the Project user attached to this attendee record.
  - `id`: integer - Login Information (user) identifier of the attendee. e.g. `160586`
  - `login`: string - Email address the attendee signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Full display name of the attendee. e.g. `Carl Contractor`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/meeting_attendee_records/{id}

**Update meeting attendee record**
Update a Meeting Attendee record.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `meeting_id` [query] integer (required) - ID of the Meeting
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Meeting Attendee record

Request body (application/json) (required):

- `meeting_attendee_record`: object (required) - Attributes for the meeting attendee record to create or update.
  - `status`: string enum[Present, Absent, For Distribution Only, Conference] - Attendance status to set for the user. Constrained to the values in the enum. e.g. `Present`
  - `login_information_id`: integer - Login Information (user) ID of the Project user to associate with the Meeting as an attendee. e.g. `999`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this meeting attendee record. Use as the `{id}` path parameter to update or delete the record via `/rest/v1.0/meeting_attendee_records/{id}`. e.g. `999`
- `meeting_id`: integer - Identifier of the Meeting this attendee belongs to. Pass as the `meeting_id` query parameter when updating or deleting the record. e.g. `999`
- `status`: string enum[Present, Absent, For Distribution Only, Conference] - Attendance status of the user for this meeting. Constrained to the values in the enum. e.g. `Present`
- `login_information`: object - Identity of the Project user attached to this attendee record.
  - `id`: integer - Login Information (user) identifier of the attendee. e.g. `160586`
  - `login`: string - Email address the attendee signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Full display name of the attendee. e.g. `Carl Contractor`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/meeting_attendee_records/{id}

**Delete meeting attendee record**
Delete a specified meeting attendee record, disassociating a given user from a meeting

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `meeting_id` [query] integer (required) - ID of the Meeting
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Meeting Attendee record

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Meeting Categories

Resource id: `meeting-categories`. Raw spec: `../openapi-raw/meeting-categories.json`. Web: https://developers.procore.com/reference/rest/meeting-categories?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/meeting_categories

**List meeting categories**
Returns all Meeting Categories for a given Meeting.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `meeting_id` [query] integer (required) - ID of the meeting
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this meeting category. Use as the `{id}` path parameter to update the category via `/rest/v1.0/meeting_categories/{id}`. e.g. `192424`
- `title`: string - Display name of the category, shown as a section heading for its topics. e.g. `Uncategorized Items`
- `position`: integer - Zero-based ordering of this category within the Meeting; lower values sort first. e.g. `0`
- `created_by`: object - The Project user who created this category. Null when the creator is unknown (for example, on categories created before creator tracking).
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/meeting_categories

**Create meeting category**
Create a new Meeting Category.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to. Must reference an existing Project the caller can access. e.g. `192424`
- `meeting_id`: integer (required) - Identifier of the Meeting the new category will be added to. e.g. `213513`
- `meeting_category`: object (required) - Attributes for the meeting category to create or update.
  - `position`: integer - Zero-based sort order for the category within the Meeting. When omitted on create, the category is appended after existing categories. e.g. `1`
  - `title`: string - Display name for the category, shown as a section heading for its topics. e.g. `Uncategorized Items`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this meeting category. Use as the `{id}` path parameter to update the category via `/rest/v1.0/meeting_categories/{id}`. e.g. `192424`
- `title`: string - Display name of the category, shown as a section heading for its topics. e.g. `Uncategorized Items`
- `position`: integer - Zero-based ordering of this category within the Meeting; lower values sort first. e.g. `0`
- `created_by`: object - The Project user who created this category. Null when the creator is unknown (for example, on categories created before creator tracking).
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/meeting_categories/{id}

**Update meeting category**
Update a Meeting Category.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the meeting category

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to. Must reference an existing Project the caller can access. e.g. `192424`
- `meeting_id`: integer (required) - Identifier of the Meeting the new category will be added to. e.g. `213513`
- `meeting_category`: object (required) - Attributes for the meeting category to create or update.
  - `position`: integer - Zero-based sort order for the category within the Meeting. When omitted on create, the category is appended after existing categories. e.g. `1`
  - `title`: string - Display name for the category, shown as a section heading for its topics. e.g. `Uncategorized Items`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this meeting category. Use as the `{id}` path parameter to update the category via `/rest/v1.0/meeting_categories/{id}`. e.g. `192424`
- `title`: string - Display name of the category, shown as a section heading for its topics. e.g. `Uncategorized Items`
- `position`: integer - Zero-based ordering of this category within the Meeting; lower values sort first. e.g. `0`
- `created_by`: object - The Project user who created this category. Null when the creator is unknown (for example, on categories created before creator tracking).
  - `id`: integer - Login Information ID e.g. `1738090`
  - `name`: string - User name e.g. `John Doe`
  - `login`: string - User email e.g. `johndoe@example.com`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Meeting Templates

Resource id: `meeting-templates`. Raw spec: `../openapi-raw/meeting-templates.json`. Web: https://developers.procore.com/reference/rest/meeting-templates?version=latest
Product lines: Total Quality and Safety Management

### GET /rest/v1.0/companies/{company_id}/meeting_templates

**List Meeting Templates**
Returns the paginated list of Meeting Templates configured for the specified company. Use the returned `id` values to fetch a single template via `GET /rest/v1.0/companies/{company_id}/meeting_templates/{id}`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended, compact] - Controls how much detail each template includes in the response. `default` returns the standard fields, `extended` adds fuller detail, and `compact` returns a reduced payload.

Response 200 (application/json): array of object

- `id`: integer - Id e.g. `10`
- `name`: string - Name e.g. `Better Signage`
- `overview`: string - Overview e.g. `Discuss building better signage`
- `private`: boolean - Indicates that this meeting template should be private e.g. `true`
- `agendas`: array of object - Agendas
  - `id`: integer - Id e.g. `2`
  - `title`: string - Title e.g. `Signs meeting agenda`
  - `category`: string - Category e.g. `Signs work`
  - `description`: string - Description e.g. `Discuss new signs`
  - `attachments`: array of object - Attachments
    - `id`: string - Id e.g. `1`
    - `name`: string - Name e.g. `agenda.pdf`
    - `url`: string - Url e.g. `https://storage.procore.com/files/attachment.png`
- `attachments`: array of object - Attachments
  - `id`: string - Id e.g. `1`
  - `name`: string - Name e.g. `contract.pdf`
  - `url`: string - Url e.g. `https://storage.procore.com/files/attachment.png`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/meeting_templates/{id}

**Show a Meeting Template**
Returns a single Meeting Template belonging to the specified company, including its agendas and attachments.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Identifier of the Meeting Template to retrieve.
- `view` [query] string enum[default, extended, compact] - Controls how much detail the template includes in the response. `default` returns the standard fields, `extended` adds fuller detail, and `compact` returns a reduced payload.

Response 200 (application/json): object

- `id`: integer - Id e.g. `10`
- `name`: string - Name e.g. `Better Signage`
- `overview`: string - Overview e.g. `Discuss building better signage`
- `private`: boolean - Indicates that this meeting template should be private e.g. `true`
- `agendas`: array of object - Agendas
  - `id`: integer - Id e.g. `2`
  - `title`: string - Title e.g. `Signs meeting agenda`
  - `category`: string - Category e.g. `Signs work`
  - `description`: string - Description e.g. `Discuss new signs`
  - `attachments`: array of object - Attachments
    - `id`: string - Id e.g. `1`
    - `name`: string - Name e.g. `agenda.pdf`
    - `url`: string - Url e.g. `https://storage.procore.com/files/attachment.png`
- `attachments`: array of object - Attachments
  - `id`: string - Id e.g. `1`
  - `name`: string - Name e.g. `contract.pdf`
  - `url`: string - Url e.g. `https://storage.procore.com/files/attachment.png`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Meeting Topics

Resource id: `meeting-topics`. Raw spec: `../openapi-raw/meeting-topics.json`. Web: https://developers.procore.com/reference/rest/meeting-topics?version=latest
Product lines: PM Essentials

### GET /rest/v1.1/projects/{project_id}/meeting_topics/{meeting_topic_id}/parent_minutes

**Get the minutes and date created for all parent topics**
Returns an array of objects of minutes and created_on values for all parent meeting topics

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `meeting_id` [query] integer (required) - ID of the meeting
- `meeting_topic_id` [path] integer (required) - ID of the meeting topic

Response 200 (application/json): array of object

- `id`: integer - Identifier of the ancestor meeting topic these minutes belong to. e.g. `965039`
- `meeting_id`: integer - Identifier of the Meeting the ancestor topic belongs to. e.g. `82593`
- `created_on`: string(date) - Date the ancestor topic's minutes were recorded. e.g. `2014-04-25`
- `minutes`: string - Rich-text (HTML) minutes recorded on the ancestor topic, or a placeholder message when none exist. e.g. `<p>Reviewed the previous action items.</p>`
- `no_minutes`: boolean - True when the ancestor topic has no recorded minutes. e.g. `false`
- `marked`: boolean - Whether the ancestor topic's minutes are starred (flagged for emphasis on the PDF). e.g. `false`
- `meeting_position`: integer - Position of the ancestor topic's Meeting within its series. e.g. `1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/meeting_topics

**Create meeting topic**
Creates Meeting Topic.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `meeting_id`: integer (required) - Identifier of the Meeting this topic will be created under or updated within.
- `meeting_topic`: object (required) - Attributes for the meeting topic to create or update.
  - `title`: string - Short title summarizing the topic.
  - `description`: string - Rich-text (HTML) description of the topic. Markup is sanitized before it is stored. e.g. `Need pricing from vendor for 34' level`
  - `due_date`: string(date) - Date by which the topic should be resolved. e.g. `2014-05-20`
  - `status`: string enum[Open, On Hold, Closed] - Workflow state to set on the topic. Constrained to the values in the enum. e.g. `On Hold`
  - `minutes`: string - Rich-text (HTML) meeting minutes for the topic. Markup is sanitized before it is stored. e.g. `<p><span style=\\\"font-size: large;\\\">Please look at Item 1 and have those...`
  - `is_private`: boolean - When true, restricts the topic to assignees and users with Admin access to the Meetings tool.
  - `closed_at`: string(date-time) - Timestamp when the topic was closed. Managed automatically when status becomes `Closed`. e.g. `2021-05-20T12:00:00Z`
  - `priority`: string enum[, High, Medium, Low] - Priority to assign to the topic. Constrained to the values in the enum; an empty string clears the priority. e.g. `Low`
  - `added_under_agenda`: boolean - Whether the topic was added while the Meeting was in agenda mode. Defaults to true.
  - `meeting_wide_number`: integer - Sequential number of the topic across the whole Meeting, used to build the topic's outline number. e.g. `1`
  - `meeting_category_id`: integer - Identifier of the meeting category to place this topic under. e.g. `192424`
  - `assignment_ids`: array of oneOf(integer | string) - Login Information (user) IDs of the Project users to assign to this topic. Setting `meeting_topic[assignment_ids]` to "none" erases assignments.
  - `upload_ids`: array of string - Upload IDs of previously uploaded files to attach to the topic.
- `attachments`: array of string - Files to attach to the topic. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - Unique identifier for this meeting topic. Use as the `{id}` path parameter to update the topic via `/rest/v1.1/projects/{project_id}/meeting_topics/{id}`. e.g. `965039`
- `number`: string - Human-readable outline number for the topic, combining its category and position (for example `1.1`). e.g. `1.1`
- `created_on`: string(date) - Date the topic was created, in the project's time zone. e.g. `2014-04-25`
- `position`: integer - Zero-based ordering of this topic within its meeting category; lower values sort first. e.g. `0`
- `due_date`: string(date) - Date by which the topic is expected to be resolved. Null when no due date is set. e.g. `2014-05-20`
- `priority`: string enum[, High, Medium, Low, None] - Priority assigned to the topic. Constrained to the values in the enum; null or an empty string means no priority. e.g. `Low`
- `status`: string enum[Open, On Hold, Closed] - Workflow state of the topic. Constrained to the values in the enum. e.g. `On Hold`
- `title`: string - Short title summarizing the topic. e.g. `34' Level`
- `minutes`: string - Rich-text (HTML) meeting minutes recorded for this topic. Null when no minutes have been entered. e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
- `description`: string - Plain-text description of the topic, with any rich-text markup stripped. e.g. `Need pricing from vendor for 34' level`
- `meeting_category`: object - The category this topic is grouped under within the Meeting.
  - `id`: integer - Identifier of the meeting category. e.g. `192424`
  - `title`: string - Display name of the meeting category. e.g. `Uncategorized Items`
- `assignments`: array of object - Project users assigned responsibility for this topic. Each entry carries the assignee's id, login, and name.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Files attached to this topic.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.jpg`
  - `filename`: string - Original file name of the attachment. Present on create and update responses. e.g. `january_receipt_copy.jpg`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/meeting_topics/{id}

**Update meeting topic**
Update an existing Meeting Topic.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the Meeting Topic

Request body (application/json) (required):

- `meeting_id`: integer (required) - Identifier of the Meeting this topic will be created under or updated within.
- `meeting_topic`: object (required) - Attributes for the meeting topic to create or update.
  - `title`: string - Short title summarizing the topic.
  - `description`: string - Rich-text (HTML) description of the topic. Markup is sanitized before it is stored. e.g. `Need pricing from vendor for 34' level`
  - `due_date`: string(date) - Date by which the topic should be resolved. e.g. `2014-05-20`
  - `status`: string enum[Open, On Hold, Closed] - Workflow state to set on the topic. Constrained to the values in the enum. e.g. `On Hold`
  - `minutes`: string - Rich-text (HTML) meeting minutes for the topic. Markup is sanitized before it is stored. e.g. `<p><span style=\\\"font-size: large;\\\">Please look at Item 1 and have those...`
  - `is_private`: boolean - When true, restricts the topic to assignees and users with Admin access to the Meetings tool.
  - `closed_at`: string(date-time) - Timestamp when the topic was closed. Managed automatically when status becomes `Closed`. e.g. `2021-05-20T12:00:00Z`
  - `priority`: string enum[, High, Medium, Low] - Priority to assign to the topic. Constrained to the values in the enum; an empty string clears the priority. e.g. `Low`
  - `added_under_agenda`: boolean - Whether the topic was added while the Meeting was in agenda mode. Defaults to true.
  - `meeting_wide_number`: integer - Sequential number of the topic across the whole Meeting, used to build the topic's outline number. e.g. `1`
  - `meeting_category_id`: integer - Identifier of the meeting category to place this topic under. e.g. `192424`
  - `assignment_ids`: array of oneOf(integer | string) - Login Information (user) IDs of the Project users to assign to this topic. Setting `meeting_topic[assignment_ids]` to "none" erases assignments.
  - `upload_ids`: array of string - Upload IDs of previously uploaded files to attach to the topic.
- `attachments`: array of string - Files to attach to the topic. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this meeting topic. Use as the `{id}` path parameter to update the topic via `/rest/v1.1/projects/{project_id}/meeting_topics/{id}`. e.g. `965039`
- `number`: string - Human-readable outline number for the topic, combining its category and position (for example `1.1`). e.g. `1.1`
- `created_on`: string(date) - Date the topic was created, in the project's time zone. e.g. `2014-04-25`
- `position`: integer - Zero-based ordering of this topic within its meeting category; lower values sort first. e.g. `0`
- `due_date`: string(date) - Date by which the topic is expected to be resolved. Null when no due date is set. e.g. `2014-05-20`
- `priority`: string enum[, High, Medium, Low, None] - Priority assigned to the topic. Constrained to the values in the enum; null or an empty string means no priority. e.g. `Low`
- `status`: string enum[Open, On Hold, Closed] - Workflow state of the topic. Constrained to the values in the enum. e.g. `On Hold`
- `title`: string - Short title summarizing the topic. e.g. `34' Level`
- `minutes`: string - Rich-text (HTML) meeting minutes recorded for this topic. Null when no minutes have been entered. e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
- `description`: string - Plain-text description of the topic, with any rich-text markup stripped. e.g. `Need pricing from vendor for 34' level`
- `meeting_category`: object - The category this topic is grouped under within the Meeting.
  - `id`: integer - Identifier of the meeting category. e.g. `192424`
  - `title`: string - Display name of the meeting category. e.g. `Uncategorized Items`
- `assignments`: array of object - Project users assigned responsibility for this topic. Each entry carries the assignee's id, login, and name.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object - Files attached to this topic.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.jpg`
  - `filename`: string - Original file name of the attachment. Present on create and update responses. e.g. `january_receipt_copy.jpg`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/meeting_topics/parent_minutes  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Get the minutes and date created for all parent topics**
Returns an array of objects of minutes and created_on values for all parent meeting topics

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `meeting_id` [query] integer (required) - ID of the meeting
- `meeting_topic_id` [query] integer (required) - ID of the meeting topic

Response 200 (application/json): array of object

- `created_on`: string(date)
- `minutes`: string
- `no_minutes`: boolean

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/meeting_topics  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Create meeting topic**
Creates Meeting Topic.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to. Must reference a Project the caller can access.
- `meeting_id`: integer (required) - Identifier of the Meeting this topic will be created under or updated within.
- `meeting_topic`: object (required) - Attributes for the meeting topic to create or update.
  - `title`: string - Short title summarizing the topic.
  - `description`: string - Rich-text (HTML) description of the topic. Markup is sanitized before it is stored. e.g. `Need pricing from vendor for 34' level`
  - `due_date`: string(date) - Date by which the topic should be resolved. e.g. `2014-05-20`
  - `status`: string enum[Open, On Hold, Closed] - Workflow state to set on the topic. Constrained to the values in the enum. e.g. `On Hold`
  - `minutes`: string - Rich-text (HTML) meeting minutes for the topic. Markup is sanitized before it is stored. e.g. `<p><span style=\\\"font-size: large;\\\">Please look at Item 1 and have those...`
  - `is_private`: boolean - When true, restricts the topic to assignees and users with Admin access to the Meetings tool.
  - `closed_at`: string(date-time) - Timestamp when the topic was closed. Managed automatically when status becomes `Closed`. e.g. `2021-05-20T12:00:00Z`
  - `priority`: string enum[, High, Medium, Low] - Priority to assign to the topic. Constrained to the values in the enum; an empty string clears the priority. e.g. `Low`
  - `added_under_agenda`: boolean - Whether the topic was added while the Meeting was in agenda mode. Defaults to true.
  - `meeting_wide_number`: integer - Sequential number of the topic across the whole Meeting, used to build the topic's outline number. e.g. `1`
  - `meeting_category_id`: integer - Identifier of the meeting category to place this topic under. e.g. `192424`
  - `assignment_ids`: array of oneOf(integer | string) - Login Information (user) IDs of the Project users to assign to this topic. Setting `meeting_topic[assignment_ids]` to "none" erases assignments.
- `attachments`: array of string - Files to attach to the topic. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - Unique identifier for this meeting topic. Use as the `{id}` path parameter to update the topic via `/rest/v1.0/meeting_topics/{id}`. e.g. `965039`
- `number`: string - Human-readable outline number for the topic, combining its category and position (for example `1.1`). e.g. `1.1`
- `created_on`: string(date) - Date the topic was created, in the project's time zone. e.g. `2014-04-25`
- `position`: integer - Zero-based ordering of this topic within its meeting category; lower values sort first. e.g. `0`
- `due_date`: string(date) - Date by which the topic is expected to be resolved. Null when no due date is set. e.g. `2014-05-20`
- `priority`: string enum[, High, Medium, Low] - Priority assigned to the topic. Constrained to the values in the enum; an empty string means no priority. e.g. `Low`
- `status`: string enum[Open, On Hold, Closed] - Workflow state of the topic. Constrained to the values in the enum. e.g. `On Hold`
- `title`: string - Short title summarizing the topic. e.g. `34' Level`
- `minutes`: string - Rich-text (HTML) meeting minutes recorded for this topic. e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
- `description`: string - Plain-text description of the topic, with any rich-text markup stripped. e.g. `Need pricing from vendor for 34' level`
- `meeting_category`: object - The category this topic is grouped under within the Meeting.
  - `id`: integer - Identifier of the meeting category. e.g. `192424`
  - `title`: string - Display name of the meeting category. e.g. `Uncategorized Items`
- `assignments`: array of object - Project users assigned responsibility for this topic.
  - `id`: integer - Login Information (user) identifier of the assignee. e.g. `160586`
  - `login`: string - Email address the assignee signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Full display name of the assignee. e.g. `Carl Contractor`
- `attachments`: array of object - Files attached to this topic.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.jpg`
  - `filename`: string - Original file name of the attachment (same value as `name`). e.g. `january_receipt_copy.jpg`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/meeting_topics/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Update meeting topic**
Update an existing Meeting Topic.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the meeting topic

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to. Must reference a Project the caller can access.
- `meeting_id`: integer (required) - Identifier of the Meeting this topic will be created under or updated within.
- `meeting_topic`: object (required) - Attributes for the meeting topic to create or update.
  - `title`: string - Short title summarizing the topic.
  - `description`: string - Rich-text (HTML) description of the topic. Markup is sanitized before it is stored. e.g. `Need pricing from vendor for 34' level`
  - `due_date`: string(date) - Date by which the topic should be resolved. e.g. `2014-05-20`
  - `status`: string enum[Open, On Hold, Closed] - Workflow state to set on the topic. Constrained to the values in the enum. e.g. `On Hold`
  - `minutes`: string - Rich-text (HTML) meeting minutes for the topic. Markup is sanitized before it is stored. e.g. `<p><span style=\\\"font-size: large;\\\">Please look at Item 1 and have those...`
  - `is_private`: boolean - When true, restricts the topic to assignees and users with Admin access to the Meetings tool.
  - `closed_at`: string(date-time) - Timestamp when the topic was closed. Managed automatically when status becomes `Closed`. e.g. `2021-05-20T12:00:00Z`
  - `priority`: string enum[, High, Medium, Low] - Priority to assign to the topic. Constrained to the values in the enum; an empty string clears the priority. e.g. `Low`
  - `added_under_agenda`: boolean - Whether the topic was added while the Meeting was in agenda mode. Defaults to true.
  - `meeting_wide_number`: integer - Sequential number of the topic across the whole Meeting, used to build the topic's outline number. e.g. `1`
  - `meeting_category_id`: integer - Identifier of the meeting category to place this topic under. e.g. `192424`
  - `assignment_ids`: array of oneOf(integer | string) - Login Information (user) IDs of the Project users to assign to this topic. Setting `meeting_topic[assignment_ids]` to "none" erases assignments.
- `attachments`: array of string - Files to attach to the topic. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this meeting topic. Use as the `{id}` path parameter to update the topic via `/rest/v1.0/meeting_topics/{id}`. e.g. `965039`
- `number`: string - Human-readable outline number for the topic, combining its category and position (for example `1.1`). e.g. `1.1`
- `created_on`: string(date) - Date the topic was created, in the project's time zone. e.g. `2014-04-25`
- `position`: integer - Zero-based ordering of this topic within its meeting category; lower values sort first. e.g. `0`
- `due_date`: string(date) - Date by which the topic is expected to be resolved. Null when no due date is set. e.g. `2014-05-20`
- `priority`: string enum[, High, Medium, Low] - Priority assigned to the topic. Constrained to the values in the enum; an empty string means no priority. e.g. `Low`
- `status`: string enum[Open, On Hold, Closed] - Workflow state of the topic. Constrained to the values in the enum. e.g. `On Hold`
- `title`: string - Short title summarizing the topic. e.g. `34' Level`
- `minutes`: string - Rich-text (HTML) meeting minutes recorded for this topic. e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
- `description`: string - Plain-text description of the topic, with any rich-text markup stripped. e.g. `Need pricing from vendor for 34' level`
- `meeting_category`: object - The category this topic is grouped under within the Meeting.
  - `id`: integer - Identifier of the meeting category. e.g. `192424`
  - `title`: string - Display name of the meeting category. e.g. `Uncategorized Items`
- `assignments`: array of object - Project users assigned responsibility for this topic.
  - `id`: integer - Login Information (user) identifier of the assignee. e.g. `160586`
  - `login`: string - Email address the assignee signs in with. e.g. `carl.contractor@example.com`
  - `name`: string - Full display name of the assignee. e.g. `Carl Contractor`
- `attachments`: array of object - Files attached to this topic.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `name`: string - Display name of the attached file. e.g. `january_receipt_copy.jpg`
  - `filename`: string - Original file name of the attachment (same value as `name`). e.g. `january_receipt_copy.jpg`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Meetings

Resource id: `meetings`. Raw spec: `../openapi-raw/meetings.json`. Web: https://developers.procore.com/reference/rest/meetings?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/meetings

**List meetings**
Returns a list of all Meetings for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of string - Returns meeting(s) with the specified ID(s)
- `filters[assignee_id]` [query] array of string - Returns meeting(s) with the specified assignee
- `filters[title]` [query] string - Returns meeting(s) with parts of title matching the specified string
- `filters[public]` [query] string - Filter by visibility. Pass `true` to return only public meetings or `false` for private meetings. Value is a boolean string.
- `filters[draft]` [query] string - Filter by draft state. Pass `true` to return only draft meetings or `false` for finalized meetings. Value is a boolean string.
- `filters[mode]` [query] string enum[agenda, meetings] - Returns meeting(s) in certain mode.
- `filter[root_id]` [query] string - Returns child meeting(s) whose root_id matches the specified root_id. Parent is returned as well
- `filters[template_id]` [query] string - Returns child meeting(s) whose meeting_template_id matches the specified template_id.
- `filters[from]` [query] string - Returns meeting(s) started at a date >= specified date
- `filters[to]` [query] string - Returns meeting(s) started at a date <= specified date
- `filters[roots]` [query] string - Returns Only parent/root meetings
- `filters[deleted]` [query] string - Returns Only deleted meetings
- `view` [query] string enum[default, meeting_information, compact, mobile] - The data set that should be returned from the serializer. Default view is `default`.
- `sort` [query] string enum[created_at, -created_at, title, -title, updated_at, -updated_at, deleted_at, -deleted_at, id, -id] - Sort results by the specified field. Add a "-" prefix for descending order (e.g., -created_at).

Response 200 (application/json): oneOf(object | object | object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/meetings

**POST Meeting**
Creates a new meeting for the given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json):

- `title`: string - Meeting title e.g. `Jon's Meeting`
- `location`: string - Meeting location e.g. `Office 123`
- `overview`: string - Meeting overview e.g. `Overview of meeting`
- `is_private`: boolean - Indicates whether this meeting is only visible to scheduled attendees and users with 'Admin' level permissions to the Meetings tool. e.g. `true`
- `conclusion`: string - Meeting conclusion e.g. `My conclusion`
- `is_draft`: boolean - Is draft e.g. `false`
- `time_zone`: string - Time zone e.g. `US/Pacific`
- `remote_meeting_url`: string - URL for remote meeting e.g. `https://zoom.us/j/123456789`
- `start_time`: string - Start time e.g. `10:00 AM`
- `finish_time`: string - Finish time e.g. `11:00 AM`
- `meeting_template_id`: string - Meeting Template id e.g. `82593`
- `custom_textfield_1`: string - Custom text field 1 e.g. `My custom text field`
- `custom_textarea_1`: string - Custom text area 1 e.g. `My custom text area`
- `position`: integer - Position of the meeting e.g. `6`
- `attendees`: array of integer - An array of the IDs of the Attendees of the Meeting e.g. `[1, 2]`
- `attendee_minutes_approvers`: array of integer - An array of the IDs of the Attendee Minutes Approvers of the Meeting e.g. `[1]`
- `create_uncategorized_items_category`: boolean - Create an uncategorized items category e.g. `false`
- `meeting_date`: string - Meeting date e.g. `2025-07-22`
- `starts_at`: string(date-time) - Start date and time of the meeting in ISO 8601 format. Only available when view=mobile. Cannot be used together with 'meeting_date', 'start_time', or 'finish_time'. e.g. `2025-07-22T14:00:00Z`
- `ends_at`: string(date-time) - End date and time of the meeting in ISO 8601 format. Only available when view=mobile. Cannot be used together with 'meeting_date', 'start_time', or 'finish_time'. e.g. `2025-07-22T15:00:00Z`
- `view`: string enum[default, mobile] - The data set that should be returned from the serializer. Default is `default`. e.g. `mobile`
- `attachment_ids`: array of string - The current attachments to the item. Values should be omitted to remove attachments. New files cannot be attached via this param. If the key is omitted, the existing attachments will remain unchanged. e.g. `["1", "2"]`
- `drawing_revision_ids`: array of string - Drawing Revisions to attach to the response e.g. `["3", "4"]`
- `file_version_ids`: array of string - File Versions to attach to the response e.g. `["5", "6"]`
- `form_ids`: array of string - Forms to attach to the response e.g. `["7", "8"]`
- `image_ids`: array of string - Images to attach to the response e.g. `["9", "10"]`
- `upload_ids`: array of string - Uploads to attach to the response e.g. `["01J15GF28TDQ2X20RNRJ5DDX27", "01J15GFDKQ4TDRBQPZ2M6E9H44"]`
- `prostore_file_ids`: array of integer - Ids of meeting attachment files Prostore file IDs (Not to be used if other attachment types are included) e.g. `[1, 2]`
- `document_management_document_revision_ids`: array of string - Ids of document management document revision attachment files e.g. `["13", "14"]`

Response 201 (application/json): oneOf(object | object)


Error responses: 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/meetings/{id}/categories/{category_id}

**Delete meeting category**
Delete a Meeting Category.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Meeting ID
- `category_id` [path] string (required) - ID of the meeting category

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/meetings/{id}/change_history

**Get Meeting Change History**
Get Meeting Change History

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Meeting ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at] - Direction (asc/desc) can be controlled by the presence or absence of '-' before the sort parameter

Response 200 (application/json): object

- `data`: array of object
  - `data`: object - Change History.
    - `id`: string - ID e.g. `101`
    - `column`: string - Name of the column changed e.g. `Assignee Id`
    - `old_value`: string - Value of the column before change e.g. `The original title`
    - `new_value`: string - Value of the column after change e.g. `The updated title`
    - `created_by`: string - A name and the company of the user who made the change e.g. `John Doe, (Brickworks)`
    - `created_at`: string - Created date e.g. `Wed Sep 21, 2016 at 10:00 AM`

Error responses: 401, 403, 404, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/meetings

**List meetings**
Returns a list of all Meetings for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `deleted_only` [query] boolean - Indicates whether to only show deleted meetings. When this query parameter is passed the response body will be an array of meetings without grouping. i.e. { "meetings":[{Meeting_1}, {Meeting_2}] }
- `filters[assignee_id]` [query] array of integer - Returns meeting(s) with the specified assignee
- `filters[id]` [query] array of integer - Returns meeting(s) with the specified ID(s)
- `serializer_view` [query] string enum[normal, extended] - The data set that should be returned from the serializer. The normal view includes default fields. The extended view includes the default fields plus Meeting Template fields. Default view is normal.

Response 200 (application/json): oneOf(array of object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/meetings

**Create meeting**
Create a new Meeting.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to.
- `meeting`: object (required) - Attributes for the Meeting to create.
  - `position`: integer (required) - Ordering of the Meeting within its series; lower values sort first. e.g. `42`
  - `title`: string - Title of the Meeting. e.g. `James's Meeting`
  - `location`: string - Where the Meeting takes place. e.g. `Sandspit`
  - `minutes`: string - Rich-text (HTML) minutes for the Meeting. e.g. `My Minutes`
  - `overview`: string - Overview/description of the Meeting. e.g. `Overview of meeting`
  - `occurred`: boolean - Whether the Meeting has already taken place. e.g. `false`
  - `starts_at`: string (required) - Timestamp when the Meeting starts (ISO 8601). e.g. `2021-07-22T17:00:00.000Z`
  - `ends_at`: string (required) - Timestamp when the Meeting ends (ISO 8601). e.g. `2021-07-22T17:00:00.000Z`
  - `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
  - `is_private`: boolean - When true, restricts the Meeting to scheduled attendees and users with Admin access to the Meetings tool. e.g. `true`
  - `conclusion`: string - Conclusion text for the Meeting. e.g. `My conclusion`
  - `is_draft`: boolean - When true, saves the Meeting as a draft rather than finalizing it. e.g. `false`
  - `attendees`: array of integer - Login Information (user) IDs of the Project users to add as attendees.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `prostore_file_ids`: array of integer - Ids of meeting attachment files Prostore file IDs (Not to be used if other attachment types are included)
- `attachments`: array of string - Meeting Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - Unique identifier for the Meeting. Use as the `{id}` path parameter to fetch, update, or delete the Meeting via `/rest/v1.1/projects/{project_id}/meetings/{id}`. e.g. `82593`
- `meeting_template_id`: integer - Identifier of the Meeting Template this Meeting was created from. Null when the Meeting was not created from a template. e.g. `82593`
- `position`: integer - Ordering of the Meeting within its series; lower values sort first. e.g. `1`
- `created_by_id`: integer - Login Information (user) ID of the Meeting's creator. Only populated for meetings created after Dec 2023. e.g. `1`
- `title`: string - Title of the Meeting. e.g. `Jon's Meeting`
- `location`: string - Where the Meeting takes place. Null when no location is set. e.g. `Victoria Conference Room`
- `occurred`: boolean - Indicates whether this meeting has already taken place. e.g. `false`
- `starts_at`: string(date-time) - Timestamp when the Meeting starts. e.g. `2021-07-23T10:00:00Z`
- `ends_at`: string(date-time) - Timestamp when the Meeting ends. e.g. `2021-07-23T17:00:00Z`
- `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
- `is_private`: boolean - When true, the Meeting is only visible to scheduled attendees and users with Admin access to the Meetings tool. e.g. `false`
- `is_draft`: boolean - When true, the Meeting is still a draft and not yet finalized. e.g. `false`
- `mode`: string enum[minutes, agenda] - Whether the Meeting is currently in agenda or minutes mode. Constrained to the values in the enum. e.g. `minutes`
- `created_at`: string(date-time) - Timestamp when the Meeting was created. e.g. `2021-07-23T10:00:00Z`
- `updated_at`: string(date-time) - Timestamp when the Meeting was last updated. e.g. `2021-07-23T10:00:00Z`
- `description`: string - Plain-text overview of the Meeting, with any rich-text markup stripped. e.g. `Stuff is going to go down aka ticket eating`
- `conclusion`: string - Plain-text conclusion of the Meeting, with any rich-text markup stripped. e.g. `Meeting conclusion`
- `remote_meeting_url`: string - URL attendees can use to join the Meeting remotely. Null when no remote link is set. e.g. `https://zoom.us/j/123456789`
- `download_all_url`: string - URL to download all of the Meeting's attachments as a single archive. Only present when the Meeting has attachments. e.g. `http://www.example.com/company/attachments/download_all?uuid=9ab95907a82318e6...`
- `attachments`: array of object - Files attached to the Meeting.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original file name of the attachment. e.g. `january_receipt_copy.jpg`
  - `name`: string - Display name of the attached file (same value as `filename`). e.g. `january_receipt_copy.jpg`
- `attendees`: array of object - Meeting attendees
  - `id`: integer - Attendee id e.g. `972145`
  - `status`: string enum[Present, Absent, For Distribution Only, Conference, None] - Attendee status e.g. `Absent`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `meeting_categories`: array of object - Meeting categories
  - `id`: integer - Meeting category id e.g. `192424`
  - `title`: string - Meeting category topic e.g. `Uncategorized Items`
  - `position`: integer - Meeting category position e.g. `0`
  - `meeting_topic`: array of object - Meeting category meeting topics
    - `id`: integer - Meeting topic id e.g. `965039`
    - `number`: string - Meeting topic number e.g. `1.1`
    - `created_on`: string(date) - Meeting topic created on e.g. `2014-04-25`
    - `position`: integer - Meeting topic position e.g. `0`
    - `due_date`: string(date) - Meeting topic due date e.g. `2014-05-20`
    - `priority`: string enum[, High, Medium, Low] - Meeting topic priority e.g. `Low`
    - `status`: string enum[Open, On Hold, Closed] - Meeting topic status e.g. `On Hold`
    - `title`: string - Meeting topic title e.g. `34' Level`
    - `minutes`: string - Meeting topic minutes e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
    - `description`: string - Meeting topic description e.g. `Need pricing from vendor for 34' level`
    - `meeting_category`: object - Meeting category
    - `assignments`: array of object - Meeting topic assignments
    - `attachments`: array of object - Meeting topic attachments
    - `download_all_url`: string - URL to download all attachments for this meeting e.g. `http://localhost:3000/1/company/attachments/download_all?uuid=9ab95907a82318e...`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/meetings/ecrion_pdf_generation_data  **[DEPRECATED]**

**List Ecrion Xml and Template for Meetings**
**Deprecated.** This endpoint is deprecated and will be removed on 2027-09-09.
Use `GET /rest/v2.0/companies/{company_id}/projects/{project_id}/meetings/ecrion_pdf_generation_data` instead.
Returns Ecrion Xml and Template for all Meetings on the Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[assignee_id]` [query] array of integer - Returns meeting(s) with the specified assignee
- `filters[id]` [query] array of integer - Returns meeting(s) with the specified ID(s)
- `filters[public]` [query] string - Returns public meeting(s).
- `filters[draft]` [query] string - Returns draft meeting(s).
- `filters[mode]` [query] string enum[agenda, meetings] - Returns meeting(s) in certain mode.
- `filters[root_id]` [query] string - Returns child meeting(s) whose root_id matches the specified root_id. Parent is returned as well
- `filters[roots]` [query] string - Returns Only parent/root meetings
- `filters[template_id]` [query] string - Returns child meeting(s) whose meeting_template_id matches the specified template_id.
- `show_attachments` [query] boolean - determine the AttachmentVisible tag value

Response 200 (application/json): object

- `pdf_template`: object - The PDF template applied when generating the Meeting PDFs.
  - `uuid`: string - Unique identifier of the PDF template. e.g. `ab1fa9b8a1a4fc1ed7b6e2c64968ebe77729`
  - `pdf_filename`: string - File name of the uploaded PDF template. Null when no file is set. e.g. `pdf.pdf`
  - `name`: string - Display name of the PDF template. e.g. `Pdf Template name`
  - `url`: string - Download URL for the PDF template file. e.g. `http://www.example.com/`
  - `storage_type`: string - Storage backend the PDF template is served from when passed to Ecrion. Either `govcloud` or `default`. e.g. `default`
- `meetings`: array of object - Per-meeting Ecrion rendering data, one entry per Meeting on the Project.
  - `id`: integer - Identifier of the Meeting this Ecrion data belongs to. e.g. `2`
  - `name`: string - File name to use for the generated Meeting PDF. e.g. `meeting_1`
  - `xml`: string - Ecrion XML payload describing the Meeting's contents for PDF generation. e.g. `<xml></xml>`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/meetings/{id}

**Show meeting**
Returns detailed information about a Meeting in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the meeting

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Meeting. Use as the `{id}` path parameter to fetch, update, or delete the Meeting via `/rest/v1.1/projects/{project_id}/meetings/{id}`. e.g. `82593`
- `meeting_template_id`: integer - Identifier of the Meeting Template this Meeting was created from. Null when the Meeting was not created from a template. e.g. `82593`
- `position`: integer - Ordering of the Meeting within its series; lower values sort first. e.g. `1`
- `created_by_id`: integer - Login Information (user) ID of the Meeting's creator. Only populated for meetings created after Dec 2023. e.g. `1`
- `title`: string - Title of the Meeting. e.g. `Jon's Meeting`
- `location`: string - Where the Meeting takes place. Null when no location is set. e.g. `Victoria Conference Room`
- `occurred`: boolean - Indicates whether this meeting has already taken place. e.g. `false`
- `starts_at`: string(date-time) - Timestamp when the Meeting starts. e.g. `2021-07-23T10:00:00Z`
- `ends_at`: string(date-time) - Timestamp when the Meeting ends. e.g. `2021-07-23T17:00:00Z`
- `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
- `is_private`: boolean - When true, the Meeting is only visible to scheduled attendees and users with Admin access to the Meetings tool. e.g. `false`
- `is_draft`: boolean - When true, the Meeting is still a draft and not yet finalized. e.g. `false`
- `mode`: string enum[minutes, agenda] - Whether the Meeting is currently in agenda or minutes mode. Constrained to the values in the enum. e.g. `minutes`
- `created_at`: string(date-time) - Timestamp when the Meeting was created. e.g. `2021-07-23T10:00:00Z`
- `updated_at`: string(date-time) - Timestamp when the Meeting was last updated. e.g. `2021-07-23T10:00:00Z`
- `description`: string - Plain-text overview of the Meeting, with any rich-text markup stripped. e.g. `Stuff is going to go down aka ticket eating`
- `conclusion`: string - Plain-text conclusion of the Meeting, with any rich-text markup stripped. e.g. `Meeting conclusion`
- `remote_meeting_url`: string - URL attendees can use to join the Meeting remotely. Null when no remote link is set. e.g. `https://zoom.us/j/123456789`
- `download_all_url`: string - URL to download all of the Meeting's attachments as a single archive. Only present when the Meeting has attachments. e.g. `http://www.example.com/company/attachments/download_all?uuid=9ab95907a82318e6...`
- `attachments`: array of object - Files attached to the Meeting.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original file name of the attachment. e.g. `january_receipt_copy.jpg`
  - `name`: string - Display name of the attached file (same value as `filename`). e.g. `january_receipt_copy.jpg`
- `attendees`: array of object - Meeting attendees
  - `id`: integer - Attendee id e.g. `972145`
  - `status`: string enum[Present, Absent, For Distribution Only, Conference, None] - Attendee status e.g. `Absent`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `meeting_categories`: array of object - Meeting categories
  - `id`: integer - Meeting category id e.g. `192424`
  - `title`: string - Meeting category topic e.g. `Uncategorized Items`
  - `position`: integer - Meeting category position e.g. `0`
  - `meeting_topic`: array of object - Meeting category meeting topics
    - `id`: integer - Meeting topic id e.g. `965039`
    - `number`: string - Meeting topic number e.g. `1.1`
    - `created_on`: string(date) - Meeting topic created on e.g. `2014-04-25`
    - `position`: integer - Meeting topic position e.g. `0`
    - `due_date`: string(date) - Meeting topic due date e.g. `2014-05-20`
    - `priority`: string enum[, High, Medium, Low] - Meeting topic priority e.g. `Low`
    - `status`: string enum[Open, On Hold, Closed] - Meeting topic status e.g. `On Hold`
    - `title`: string - Meeting topic title e.g. `34' Level`
    - `minutes`: string - Meeting topic minutes e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
    - `description`: string - Meeting topic description e.g. `Need pricing from vendor for 34' level`
    - `meeting_category`: object - Meeting category
    - `assignments`: array of object - Meeting topic assignments
    - `attachments`: array of object - Meeting topic attachments
    - `download_all_url`: string - URL to download all attachments for this meeting e.g. `http://localhost:3000/1/company/attachments/download_all?uuid=9ab95907a82318e...`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/meetings/{id}

**Update meeting**
Update a Meeting.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the meeting

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to.
- `meeting`: object (required) - Attributes to update on the Meeting.
  - `position`: integer - Ordering of the Meeting within its series. Can only be updated if this is the first Meeting in the series. e.g. `42`
  - `title`: string - Title of the Meeting. e.g. `James's Meeting`
  - `location`: string - Where the Meeting takes place. e.g. `Sandspit`
  - `minutes`: string - Rich-text (HTML) minutes for the Meeting. e.g. `My Minutes`
  - `overview`: string - Overview/description of the Meeting. e.g. `Overview of meeting`
  - `occurred`: boolean - Whether the Meeting has already taken place. e.g. `false`
  - `starts_at`: string - Timestamp when the Meeting starts (ISO 8601). e.g. `2021-07-22T17:00:00.000Z`
  - `ends_at`: string - Timestamp when the Meeting ends (ISO 8601). e.g. `2021-07-22T17:00:00.000Z`
  - `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
  - `is_private`: boolean - When true, restricts the Meeting to scheduled attendees and users with Admin access to the Meetings tool. e.g. `true`
  - `conclusion`: string - Conclusion text for the Meeting. e.g. `My conclusion`
  - `is_draft`: boolean - When true, keeps the Meeting as a draft rather than finalizing it. e.g. `false`
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `prostore_file_ids`: array of integer - Ids of meeting attachment files Prostore file IDs (Not to be used if other attachment types are included)
- `attachments`: array of string - Meeting Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Meeting. Use as the `{id}` path parameter to fetch, update, or delete the Meeting via `/rest/v1.1/projects/{project_id}/meetings/{id}`. e.g. `82593`
- `meeting_template_id`: integer - Identifier of the Meeting Template this Meeting was created from. Null when the Meeting was not created from a template. e.g. `82593`
- `position`: integer - Ordering of the Meeting within its series; lower values sort first. e.g. `1`
- `created_by_id`: integer - Login Information (user) ID of the Meeting's creator. Only populated for meetings created after Dec 2023. e.g. `1`
- `title`: string - Title of the Meeting. e.g. `Jon's Meeting`
- `location`: string - Where the Meeting takes place. Null when no location is set. e.g. `Victoria Conference Room`
- `occurred`: boolean - Indicates whether this meeting has already taken place. e.g. `false`
- `starts_at`: string(date-time) - Timestamp when the Meeting starts. e.g. `2021-07-23T10:00:00Z`
- `ends_at`: string(date-time) - Timestamp when the Meeting ends. e.g. `2021-07-23T17:00:00Z`
- `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
- `is_private`: boolean - When true, the Meeting is only visible to scheduled attendees and users with Admin access to the Meetings tool. e.g. `false`
- `is_draft`: boolean - When true, the Meeting is still a draft and not yet finalized. e.g. `false`
- `mode`: string enum[minutes, agenda] - Whether the Meeting is currently in agenda or minutes mode. Constrained to the values in the enum. e.g. `minutes`
- `created_at`: string(date-time) - Timestamp when the Meeting was created. e.g. `2021-07-23T10:00:00Z`
- `updated_at`: string(date-time) - Timestamp when the Meeting was last updated. e.g. `2021-07-23T10:00:00Z`
- `description`: string - Plain-text overview of the Meeting, with any rich-text markup stripped. e.g. `Stuff is going to go down aka ticket eating`
- `conclusion`: string - Plain-text conclusion of the Meeting, with any rich-text markup stripped. e.g. `Meeting conclusion`
- `remote_meeting_url`: string - URL attendees can use to join the Meeting remotely. Null when no remote link is set. e.g. `https://zoom.us/j/123456789`
- `download_all_url`: string - URL to download all of the Meeting's attachments as a single archive. Only present when the Meeting has attachments. e.g. `http://www.example.com/company/attachments/download_all?uuid=9ab95907a82318e6...`
- `attachments`: array of object - Files attached to the Meeting.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original file name of the attachment. e.g. `january_receipt_copy.jpg`
  - `name`: string - Display name of the attached file (same value as `filename`). e.g. `january_receipt_copy.jpg`
- `attendees`: array of object - Meeting attendees
  - `id`: integer - Attendee id e.g. `972145`
  - `status`: string enum[Present, Absent, For Distribution Only, Conference, None] - Attendee status e.g. `Absent`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `meeting_categories`: array of object - Meeting categories
  - `id`: integer - Meeting category id e.g. `192424`
  - `title`: string - Meeting category topic e.g. `Uncategorized Items`
  - `position`: integer - Meeting category position e.g. `0`
  - `meeting_topic`: array of object - Meeting category meeting topics
    - `id`: integer - Meeting topic id e.g. `965039`
    - `number`: string - Meeting topic number e.g. `1.1`
    - `created_on`: string(date) - Meeting topic created on e.g. `2014-04-25`
    - `position`: integer - Meeting topic position e.g. `0`
    - `due_date`: string(date) - Meeting topic due date e.g. `2014-05-20`
    - `priority`: string enum[, High, Medium, Low] - Meeting topic priority e.g. `Low`
    - `status`: string enum[Open, On Hold, Closed] - Meeting topic status e.g. `On Hold`
    - `title`: string - Meeting topic title e.g. `34' Level`
    - `minutes`: string - Meeting topic minutes e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
    - `description`: string - Meeting topic description e.g. `Need pricing from vendor for 34' level`
    - `meeting_category`: object - Meeting category
    - `assignments`: array of object - Meeting topic assignments
    - `attachments`: array of object - Meeting topic attachments
    - `download_all_url`: string - URL to download all attachments for this meeting e.g. `http://localhost:3000/1/company/attachments/download_all?uuid=9ab95907a82318e...`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/meetings/{id}

**Delete meeting**
Delete a specified meeting from the system

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the meeting

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/meetings  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List meetings**
Returns a list of all Meetings for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `deleted_only` [query] boolean - Indicates whether to only show deleted meetings. When this query parameter is passed the response body will be an array of meetings without grouping. i.e. { "meetings":[{Meeting_1}, {Meeting_2}] }
- `serializer_view` [query] string enum[normal, extended] - The data set that should be returned from the serializer. The normal view includes default fields. The extended view includes the default fields plus Meeting Template fields. Default view is normal.

Response 200 (application/json): array of object

- `group_title`: string - Title of the meeting series this group represents. e.g. `Jon's Meeting`
- `meetings`: array of object - Meetings in this series, ordered within the group.
  - `id`: integer - Unique identifier for the Meeting. Use as the `{id}` path parameter to fetch details via `/rest/v1.0/meetings/{id}`. e.g. `82593`
  - `meeting_template_id`: integer - Identifier of the Meeting Template this Meeting was created from. Null when the Meeting was not created from a template. e.g. `82593`
  - `title`: string - Title of the Meeting. e.g. `Jon's Meeting`
  - `position`: integer - Ordering of the Meeting within its series; lower values sort first. e.g. `1`
  - `created_by_id`: integer - Login Information (user) ID of the Meeting's creator. Only populated for meetings created after Dec 2023. e.g. `1`
  - `description`: string - Plain-text overview of the Meeting, with any rich-text markup stripped. e.g. `Stuff is going to go down aka ticket eating`
  - `mode`: string enum[minutes, agenda] - Whether the Meeting is currently in agenda or minutes mode. Constrained to the values in the enum. e.g. `minutes`
  - `meeting_date`: string(date) - Calendar date the Meeting takes place. e.g. `2014-04-14`
  - `parent_id`: integer - Identifier of the previous Meeting in the series, or null for the first Meeting. e.g. `88835`
  - `location`: string - Where the Meeting takes place. Null when no location is set. e.g. `Office 123`
  - `meeting_topics_count`: integer - Number of agenda/minutes topics associated with this Meeting. e.g. `5`
  - `occurred`: boolean - Indicates whether this meeting has already taken place. e.g. `true`
  - `is_private`: boolean - Indicates whether this meeting is only visible to scheduled attendees and users with 'Admin' level permissions to the Meetings tool. e.g. `true`
  - `distributed_at`: string(date-time) - Timestamp when the Meeting's agenda or minutes were last distributed. Null if never distributed. e.g. `2021-07-23T10:00:00Z`
  - `last_distributed_event`: string enum[minutes, agenda, None] - Which document was distributed most recently. Constrained to the values in the enum; null if never distributed. e.g. `agenda`
  - `distributed_by`: object - The Project user who last distributed the Meeting's agenda or minutes. Null if never distributed.
    - `id`: integer - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `created_at`: string(date-time) - Timestamp when the Meeting was created. e.g. `2021-07-23T10:00:00Z`
  - `updated_at`: string(date-time) - Timestamp when the Meeting was last updated. e.g. `2021-07-23T10:00:00Z`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/meetings  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Create meeting**
Create a new Meeting.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to.
- `meeting`: object (required) - Attributes for the Meeting to create.
  - `position`: integer (required) - Ordering of the Meeting within its series; lower values sort first.
  - `title`: string - Title of the Meeting.
  - `location`: string - Where the Meeting takes place.
  - `minutes`: string - Rich-text (HTML) minutes for the Meeting.
  - `meeting_date`: string(date) - Calendar date the Meeting takes place.
  - `overview`: string - Overview/description of the Meeting.
  - `occurred`: boolean - Whether the Meeting has already taken place.
  - `start_time`: string - Free-text start time of the Meeting.
  - `finish_time`: string - Free-text finish time of the Meeting.
  - `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in.
  - `is_private`: boolean - When true, restricts the Meeting to scheduled attendees and users with Admin access to the Meetings tool.
  - `conclusion`: string - Conclusion text for the Meeting.
  - `is_draft`: boolean - When true, saves the Meeting as a draft rather than finalizing it.
  - `attendees`: array of integer - Login Information (user) IDs of the Project users to add as attendees.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
- `attachments`: array of string - Meeting Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - Unique identifier for the Meeting. Use as the `{id}` path parameter to fetch, update, or delete the Meeting via `/rest/v1.0/meetings/{id}`. e.g. `82593`
- `position`: integer - Ordering of the Meeting within its series; lower values sort first. e.g. `1`
- `created_by_id`: integer - Login Information (user) ID of the Meeting's creator. Only populated for meetings created after Dec 2023. e.g. `1`
- `title`: string - Title of the Meeting. e.g. `Jon's Meeting`
- `location`: string - Where the Meeting takes place. e.g. `Victoria Conference Room`
- `meeting_date`: string(date) - Calendar date the Meeting takes place. e.g. `2014-04-14`
- `occurred`: boolean - Indicates whether this meeting has already taken place. e.g. `false`
- `start_time`: string - Free-text start time of the Meeting. e.g. `2:00 PM`
- `finish_time`: string - Free-text finish time of the Meeting. e.g. `3:00 PM`
- `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
- `is_private`: boolean - When true, the Meeting is only visible to scheduled attendees and users with Admin access to the Meetings tool. e.g. `false`
- `is_draft`: boolean - When true, the Meeting is still a draft and not yet finalized. e.g. `false`
- `mode`: string enum[minutes, agenda] - Whether the Meeting is currently in agenda or minutes mode. Constrained to the values in the enum. e.g. `minutes`
- `remote_meeting_url`: string - URL attendees can use to join the Meeting remotely. Null when no remote link is set. e.g. `https://zoom.us/j/123456789`
- `meeting_template_id`: integer - Identifier of the Meeting Template this Meeting was created from. Null when the Meeting was not created from a template. e.g. `82593`
- `description`: string - Plain-text overview of the Meeting, with any rich-text markup stripped. e.g. `Stuff is going to go down aka ticket eating`
- `conclusion`: string - Plain-text conclusion of the Meeting, with any rich-text markup stripped. e.g. `Meeting conclusion`
- `created_at`: string(date-time) - Timestamp when the Meeting was created. e.g. `2021-07-23T10:00:00Z`
- `updated_at`: string(date-time) - Timestamp when the Meeting was last updated. e.g. `2021-07-23T10:00:00Z`
- `download_all_url`: string - URL to download all of the Meeting's attachments as a single archive. Only present when the Meeting has attachments. e.g. `http://www.example.com/company/attachments/download_all?uuid=9ab95907a82318e6...`
- `attachments`: array of object - Files attached to the Meeting.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original file name of the attachment. e.g. `january_receipt_copy.jpg`
  - `name`: string - Display name of the attached file (same value as `filename`). e.g. `january_receipt_copy.jpg`
- `attendees`: array of object - Meeting attendees
  - `id`: integer - Attendee id e.g. `972145`
  - `status`: string - Attendee status e.g. `Absent`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `meeting_categories`: array of object - Meeting categories
  - `id`: integer - Meeting category id e.g. `192424`
  - `title`: string - Meeting category topic e.g. `Uncategorized Items`
  - `position`: integer - Meeting category position e.g. `0`
  - `meeting_topic`: array of object - Meeting category meeting topics
    - `id`: integer - Meeting topic id e.g. `965039`
    - `number`: string - Meeting topic number e.g. `1.1`
    - `created_on`: string(date) - Meeting topic created on e.g. `2014-04-25`
    - `position`: integer - Meeting topic position e.g. `0`
    - `due_date`: string(date) - Meeting topic due date e.g. `2014-05-20`
    - `priority`: string enum[, High, Medium, Low] - Meeting topic priority e.g. `Low`
    - `status`: string enum[Open, On Hold, Closed] - Meeting topic status e.g. `On Hold`
    - `title`: string - Meeting topic title e.g. `34' Level`
    - `minutes`: string - Meeting topic minutes e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
    - `description`: string - Meeting topic description e.g. `Need pricing from vendor for 34' level`
    - `meeting_category`: object - Meeting category
    - `assignments`: array of object - Meeting topic assignments
    - `attachments`: array of object - Meeting topic attachments

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/meetings/ecrion_pdf_generation_data  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List Ecrion Xml and Template for Meetings**
Returns Ecrion Xml and Template for all Meetings on the Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `pdf_template`: object - The PDF template applied when generating the Meeting PDFs.
  - `uuid`: string - Unique identifier of the PDF template. e.g. `ab1fa9b8a1a4fc1ed7b6e2c64968ebe77729`
  - `pdf_filename`: string - File name of the uploaded PDF template. Null when no file is set. e.g. `pdf.pdf`
  - `name`: string - Display name of the PDF template. e.g. `Pdf Template name`
  - `url`: string - Download URL for the PDF template file. e.g. `http://www.example.com/`
  - `storage_type`: string - Storage backend the PDF template is served from when passed to Ecrion. Either `govcloud` or `default`. e.g. `default`
- `meetings`: array of object - Per-meeting Ecrion rendering data, one entry per Meeting on the Project.
  - `id`: integer - Identifier of the Meeting this Ecrion data belongs to. e.g. `2`
  - `name`: string - File name to use for the generated Meeting PDF. e.g. `meeting_1`
  - `xml`: string - Ecrion XML payload describing the Meeting's contents for PDF generation. e.g. `<xml></xml>`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/meetings/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show meeting**
Returns detailed information about a Meeting in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the meeting
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Meeting. Use as the `{id}` path parameter to fetch, update, or delete the Meeting via `/rest/v1.0/meetings/{id}`. e.g. `82593`
- `position`: integer - Ordering of the Meeting within its series; lower values sort first. e.g. `1`
- `created_by_id`: integer - Login Information (user) ID of the Meeting's creator. Only populated for meetings created after Dec 2023. e.g. `1`
- `title`: string - Title of the Meeting. e.g. `Jon's Meeting`
- `location`: string - Where the Meeting takes place. e.g. `Victoria Conference Room`
- `meeting_date`: string(date) - Calendar date the Meeting takes place. e.g. `2014-04-14`
- `occurred`: boolean - Indicates whether this meeting has already taken place. e.g. `false`
- `start_time`: string - Free-text start time of the Meeting. e.g. `2:00 PM`
- `finish_time`: string - Free-text finish time of the Meeting. e.g. `3:00 PM`
- `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
- `is_private`: boolean - When true, the Meeting is only visible to scheduled attendees and users with Admin access to the Meetings tool. e.g. `false`
- `is_draft`: boolean - When true, the Meeting is still a draft and not yet finalized. e.g. `false`
- `mode`: string enum[minutes, agenda] - Whether the Meeting is currently in agenda or minutes mode. Constrained to the values in the enum. e.g. `minutes`
- `remote_meeting_url`: string - URL attendees can use to join the Meeting remotely. Null when no remote link is set. e.g. `https://zoom.us/j/123456789`
- `meeting_template_id`: integer - Identifier of the Meeting Template this Meeting was created from. Null when the Meeting was not created from a template. e.g. `82593`
- `description`: string - Plain-text overview of the Meeting, with any rich-text markup stripped. e.g. `Stuff is going to go down aka ticket eating`
- `conclusion`: string - Plain-text conclusion of the Meeting, with any rich-text markup stripped. e.g. `Meeting conclusion`
- `created_at`: string(date-time) - Timestamp when the Meeting was created. e.g. `2021-07-23T10:00:00Z`
- `updated_at`: string(date-time) - Timestamp when the Meeting was last updated. e.g. `2021-07-23T10:00:00Z`
- `download_all_url`: string - URL to download all of the Meeting's attachments as a single archive. Only present when the Meeting has attachments. e.g. `http://www.example.com/company/attachments/download_all?uuid=9ab95907a82318e6...`
- `attachments`: array of object - Files attached to the Meeting.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original file name of the attachment. e.g. `january_receipt_copy.jpg`
  - `name`: string - Display name of the attached file (same value as `filename`). e.g. `january_receipt_copy.jpg`
- `attendees`: array of object - Meeting attendees
  - `id`: integer - Attendee id e.g. `972145`
  - `status`: string - Attendee status e.g. `Absent`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `meeting_categories`: array of object - Meeting categories
  - `id`: integer - Meeting category id e.g. `192424`
  - `title`: string - Meeting category topic e.g. `Uncategorized Items`
  - `position`: integer - Meeting category position e.g. `0`
  - `meeting_topic`: array of object - Meeting category meeting topics
    - `id`: integer - Meeting topic id e.g. `965039`
    - `number`: string - Meeting topic number e.g. `1.1`
    - `created_on`: string(date) - Meeting topic created on e.g. `2014-04-25`
    - `position`: integer - Meeting topic position e.g. `0`
    - `due_date`: string(date) - Meeting topic due date e.g. `2014-05-20`
    - `priority`: string enum[, High, Medium, Low] - Meeting topic priority e.g. `Low`
    - `status`: string enum[Open, On Hold, Closed] - Meeting topic status e.g. `On Hold`
    - `title`: string - Meeting topic title e.g. `34' Level`
    - `minutes`: string - Meeting topic minutes e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
    - `description`: string - Meeting topic description e.g. `Need pricing from vendor for 34' level`
    - `meeting_category`: object - Meeting category
    - `assignments`: array of object - Meeting topic assignments
    - `attachments`: array of object - Meeting topic attachments

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/meetings/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Update meeting**
Update a Meeting.
#### Uploading attachments
To upload attachments you must upload the entire payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `attachments[]` as files.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the meeting

Request body (application/json) (required):

- `project_id`: integer (required) - Identifier of the Project the Meeting belongs to.
- `meeting`: object (required) - Attributes to update on the Meeting.
  - `position`: integer - Ordering of the Meeting within its series. Can only be updated if this is the first Meeting in the series.
  - `title`: string - Title of the Meeting.
  - `location`: string - Where the Meeting takes place.
  - `minutes`: string - Rich-text (HTML) minutes for the Meeting.
  - `meeting_date`: string(date) - Calendar date the Meeting takes place.
  - `overview`: string - Overview/description of the Meeting.
  - `occurred`: boolean - Whether the Meeting has already taken place.
  - `start_time`: string - Free-text start time of the Meeting.
  - `finish_time`: string - Free-text finish time of the Meeting.
  - `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in.
  - `is_private`: boolean - When true, restricts the Meeting to scheduled attendees and users with Admin access to the Meetings tool.
  - `conclusion`: string - Conclusion text for the Meeting.
  - `is_draft`: boolean - When true, keeps the Meeting as a draft rather than finalizing it.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`
- `attachments`: array of string - Meeting Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Meeting. Use as the `{id}` path parameter to fetch, update, or delete the Meeting via `/rest/v1.0/meetings/{id}`. e.g. `82593`
- `position`: integer - Ordering of the Meeting within its series; lower values sort first. e.g. `1`
- `created_by_id`: integer - Login Information (user) ID of the Meeting's creator. Only populated for meetings created after Dec 2023. e.g. `1`
- `title`: string - Title of the Meeting. e.g. `Jon's Meeting`
- `location`: string - Where the Meeting takes place. e.g. `Victoria Conference Room`
- `meeting_date`: string(date) - Calendar date the Meeting takes place. e.g. `2014-04-14`
- `occurred`: boolean - Indicates whether this meeting has already taken place. e.g. `false`
- `start_time`: string - Free-text start time of the Meeting. e.g. `2:00 PM`
- `finish_time`: string - Free-text finish time of the Meeting. e.g. `3:00 PM`
- `time_zone`: string - IANA/Rails time zone the Meeting's times are expressed in. e.g. `US/Pacific`
- `is_private`: boolean - When true, the Meeting is only visible to scheduled attendees and users with Admin access to the Meetings tool. e.g. `false`
- `is_draft`: boolean - When true, the Meeting is still a draft and not yet finalized. e.g. `false`
- `mode`: string enum[minutes, agenda] - Whether the Meeting is currently in agenda or minutes mode. Constrained to the values in the enum. e.g. `minutes`
- `remote_meeting_url`: string - URL attendees can use to join the Meeting remotely. Null when no remote link is set. e.g. `https://zoom.us/j/123456789`
- `meeting_template_id`: integer - Identifier of the Meeting Template this Meeting was created from. Null when the Meeting was not created from a template. e.g. `82593`
- `description`: string - Plain-text overview of the Meeting, with any rich-text markup stripped. e.g. `Stuff is going to go down aka ticket eating`
- `conclusion`: string - Plain-text conclusion of the Meeting, with any rich-text markup stripped. e.g. `Meeting conclusion`
- `created_at`: string(date-time) - Timestamp when the Meeting was created. e.g. `2021-07-23T10:00:00Z`
- `updated_at`: string(date-time) - Timestamp when the Meeting was last updated. e.g. `2021-07-23T10:00:00Z`
- `download_all_url`: string - URL to download all of the Meeting's attachments as a single archive. Only present when the Meeting has attachments. e.g. `http://www.example.com/company/attachments/download_all?uuid=9ab95907a82318e6...`
- `attachments`: array of object - Files attached to the Meeting.
  - `id`: integer - Identifier of the attached file. e.g. `5324`
  - `url`: string - Download URL for the attached file. e.g. `http://www.example.com/`
  - `filename`: string - Original file name of the attachment. e.g. `january_receipt_copy.jpg`
  - `name`: string - Display name of the attached file (same value as `filename`). e.g. `january_receipt_copy.jpg`
- `attendees`: array of object - Meeting attendees
  - `id`: integer - Attendee id e.g. `972145`
  - `status`: string - Attendee status e.g. `Absent`
  - `login_information`: object
    - `id`: integer - ID e.g. `160586`
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `name`: string - Name e.g. `Carl Contractor`
- `meeting_categories`: array of object - Meeting categories
  - `id`: integer - Meeting category id e.g. `192424`
  - `title`: string - Meeting category topic e.g. `Uncategorized Items`
  - `position`: integer - Meeting category position e.g. `0`
  - `meeting_topic`: array of object - Meeting category meeting topics
    - `id`: integer - Meeting topic id e.g. `965039`
    - `number`: string - Meeting topic number e.g. `1.1`
    - `created_on`: string(date) - Meeting topic created on e.g. `2014-04-25`
    - `position`: integer - Meeting topic position e.g. `0`
    - `due_date`: string(date) - Meeting topic due date e.g. `2014-05-20`
    - `priority`: string enum[, High, Medium, Low] - Meeting topic priority e.g. `Low`
    - `status`: string enum[Open, On Hold, Closed] - Meeting topic status e.g. `On Hold`
    - `title`: string - Meeting topic title e.g. `34' Level`
    - `minutes`: string - Meeting topic minutes e.g. `<p><span style=\"font-size: large;\">Please look at Item 1 and have those pie...`
    - `description`: string - Meeting topic description e.g. `Need pricing from vendor for 34' level`
    - `meeting_category`: object - Meeting category
    - `assignments`: array of object - Meeting topic assignments
    - `attachments`: array of object - Meeting topic attachments

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/meetings/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Delete meeting**
Delete a specified meeting from the system

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the meeting
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

