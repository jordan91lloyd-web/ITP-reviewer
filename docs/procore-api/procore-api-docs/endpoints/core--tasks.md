# Procore API: Tasks (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: Tasks)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Task Item Categories](#task-item-categories) - versions 1.0
- [Task Item Comments](#task-item-comments) - versions 1.0
- [Task Item Project Distribution Members](#task-item-project-distribution-members) - versions 2.0
- [Task Items](#task-items) - versions 1.0
- [Task Items Assignees](#task-items-assignees) - versions 1.0

## Task Item Categories

Resource id: `task-item-categories`. Raw spec: `../openapi-raw/task-item-categories.json`. Web: https://developers.procore.com/reference/rest/task-item-categories?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/task_item_categories

**List task item categories**
Returns a list of task item categories associated with the company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[ids_only, compact, normal, extended] - Serialization view. Defaults to **`normal`**. - **`ids_only`** — JSON array of category IDs (integers); pagination headers apply. - **`compact`** / **`normal`** — `id` and friendly `name`. - **`extended`** — adds `cre...

Response 200 (application/json): oneOf(array of integer | array of object | array of object)


Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Task Item Comments

Resource id: `task-item-comments`. Raw spec: `../openapi-raw/task-item-comments.json`. Web: https://developers.procore.com/reference/rest/task-item-comments?version=latest
Product lines: PM Essentials, PM Starter Pack

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/task_item_comments

**List Task Item Comments**
Returns a list of comments associated with the project. Can be filtered by task_item_id and/or created_by_id.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[task_item_id]` [query] integer - Filter by task_item_id to return comments for only that task_item
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, extended] - Serialization view for each comment. Defaults to **`normal`** when omitted. - **`compact`** — core fields including `task_item_id` (no nested `created_by` / attachments metadata). - **`normal`** — includes `created_by...

Response 200 (application/json): oneOf(array of object | array of object | array of object)


Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/task_item_comments

**Create a task item comment**
Create a new task item comment for a given task_item_id and created_by_id

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - Serialization view for the created comment (default **normal**).

Request body (application/json) (required):

- `task_item_comment`: object
  - `comment`: string - The message of the comment e.g. `Clean up area 4`
  - `status`: string enum[initiated, in_progress, ready_for_review, closed, void] - The status of the task item at the time the comment is created. Standard users who are assigned to the task item cannot change the status to closed or void. e.g. `in_progress`
  - `task_item_id`: integer (required) - The task_item associated with the comment e.g. `731`
  - `attachments`: array of string - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): oneOf(object | object | object)


Error responses: 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/projects/{project_id}/task_item_comments/{id}

**Update a task item comment**
Updates the task item comment with ID supplied in path. Returns the updated comment.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Task Item Comment ID
- `view` [query] string enum[compact, normal, extended] - Serialization view for the updated comment (default **normal**).

Request body (application/json) (required):

- `task_item_comment`: object
  - `comment`: string - The message of the comment e.g. `Clean up area 4`
  - `status`: string enum[initiated, in_progress, ready_for_review, closed, void] - The status of the task item at the time of the comment. Standard users who are assigned to a task item cannot change the status to closed or void. e.g. `in_progress`
  - `attachments`: array of string - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): oneOf(object | object | object)


Error responses: 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/task_item_comments/{id}

**Delete a task item comment**
Deletes the task item comment with ID supplied in path. Returns **200 OK** with an empty body on success.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Task Item Comment ID

Response 200: OK — empty response body (no body)

Error responses: 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Task Item Project Distribution Members

Resource id: `task-item-project-distribution-members`. Raw spec: `../openapi-raw/task-item-project-distribution-members.json`. Web: https://developers.procore.com/reference/rest/task-item-project-distribution-members?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/task_items_project_distribution_members/options

**List Task Items Distribution Member Options**
Returns options for distribution members that the current user can add to Task Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Login information ID
  - `login`: string - Email / login
  - `name`: string - Display name (first_last in company context)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/task_items_project_distribution_members/default

**List Default Task Items Project Distribution Members**
Returns default distribution members for Task Items for the given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Login information ID
  - `login`: string - Email / login
  - `name`: string - Display name (first_last in company context)

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Task Items

Resource id: `task-items`. Raw spec: `../openapi-raw/task-items.json`. Web: https://developers.procore.com/reference/rest/task-items?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### POST /rest/v1.0/task_items/send_unsent

**Send unsent Task Items**
Sends email notifications for unsent Task Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `id`: integer

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/task_items

**List task items**
Returns a list of task items on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[assigned_id]` [query] string - Assigned ID
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[created_by_id]` [query] array of integer - Returns item(s) created by the specified User IDs.
- `filters[due_date]` [query] string - Returns item(s) due within the specified ISO 8601 datetime range.
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[task_item_category_id]` [query] string - Returns item(s) matching the specified Task Item Category ID.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `sort` [query] string enum[number, title, assignee, due_date, status, category] - Return item(s) with the specified sort.
- `view` [query] string enum[ids_only, compact, normal, extended] - Serialization view for each task item in the list. When omitted, defaults to `normal`. - **`ids_only`** — JSON array of task item IDs (integers) only; pagination headers still apply. - **`compact`** — `id` and `title`...

Response 200 (application/json): oneOf(array of integer | array of object | array of object | array of object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/task_items

**Create task item**
Creates a task item on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `view` [query] string enum[compact, normal, extended] - Serialization view for the created task item in the response. Defaults to **`extended`** when omitted.

Request body (application/json) (required):

- `task_item`: object (required)
  - `title`: string - Title e.g. `Safety audit of sector 7G`
  - `number`: string - Number e.g. `1B`
  - `description`: string - Description e.g. `Perform full audit to determine safety compliance in 7G`
  - `due_date`: string(date-time) - Date and time due
  - `status`: string enum[initiated, in_progress, ready_for_review, closed, void] - Status
  - `task_item_category_id`: integer - The task item category to associate with the task item.
  - `private`: boolean - Privacy flag
  - `assigned_id`: integer - Assignee ID
  - `assignee_ids`: array of integer - Assignee IDs
  - `distribution_member_ids`: array of integer - Distribution Member IDs
  - `prostore_file_ids`: array of integer - Prostore File IDs
  - `attachments`: array of string - Task Item attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 201 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/task_items/{id}

**Show task item**
Show detailed information for a specific task item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Task Item ID
- `view` [query] string enum[compact, normal, extended] - Serialization view for the task item. When omitted, defaults to **`extended`** for this API version. - **`compact`** — `id` and `title` only. - **`normal`** — standard shape without extended-only fields. - **`extended...

Response 200 (application/json): oneOf(object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/task_items/{id}

**Update task item**
Update a task item's attributes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Task Item ID
- `view` [query] string enum[compact, normal, extended] - Serialization view for the task item. When omitted, defaults to **`extended`** for this API version. - **`compact`** — `id` and `title` only. - **`normal`** — standard shape without extended-only fields. - **`extended...

Request body (multipart/form-data) (required):

- `task_item`: object (required)
  - `title`: string - Title e.g. `Safety audit of sector 7G`
  - `number`: string - Number e.g. `1B`
  - `description`: string - Description e.g. `Perform full audit to determine safety compliance in 7G`
  - `due_date`: string(date-time) - Date and time due
  - `status`: string enum[initiated, in_progress, ready_for_review, closed, void] - Status
  - `task_item_category_id`: integer - The task item category to associate with the task item.
  - `private`: boolean - Privacy flag
  - `assigned_id`: integer - Assignee ID
  - `assignee_ids`: array of integer - Assignee IDs
  - `distribution_member_ids`: array of integer - Distribution Member IDs
  - `prostore_file_ids`: array of integer - Prostore File IDs
  - `attachments`: array of string - Task Item attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/task_items/{id}

**Destroy task item**
Send a task item to the recycle bin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Task Item ID
- `view` [query] string enum[compact, normal, extended] - Serialization view for the task item. When omitted, defaults to **`extended`** for this API version. - **`compact`** — `id` and `title` only. - **`normal`** — standard shape without extended-only fields. - **`extended...

Response 204: No Content (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Task Items Assignees

Resource id: `task-items-assignees`. Raw spec: `../openapi-raw/task-items-assignees.json`. Web: https://developers.procore.com/reference/rest/task-items-assignees?version=latest
Product lines: PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/task_items/assignees

**List Task Items Assignee options**
Returns Users that the current User can assign to Task Items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.

Response 200 (application/json): array of object

- `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
- `id`: integer - Unique integer identifier for this user. e.g. `161072`
- `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/task_items/assignees/current

**List Assignees for Accessible Tasks**
Returns Users assigned to task items that the current user has access to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `login`: string - Email address (login) of the user. Uniquely identifies the account across Procore. e.g. `carl.contractor@example.com`
- `id`: integer - Unique integer identifier for this user. e.g. `161072`
- `name`: string - Full display name of the user, formatted as first + last name. e.g. `Carl the Contractor`
- `locale`: string - Locale preference of the user, e.g. `en-US`. Null if not explicitly set. e.g. `en-US`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

