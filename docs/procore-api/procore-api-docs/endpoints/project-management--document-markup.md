# Procore API: Document Markup (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Document Markup)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Context](#context) - versions 2.0, 1.0
- [Document Info](#document-info) - versions 2.0, 1.0
- [Document Markup](#document-markup) - versions 1.0
- [File Thumbnails](#file-thumbnails) - versions 1.0
- [File Thumbnails Bulk](#file-thumbnails-bulk) - versions 1.0
- [Group](#group) - versions 2.0, 1.0
- [Layer](#layer) - versions 2.0, 1.0
- [Markup Groups](#markup-groups) - versions 2.0, 1.0
- [Markup Indicator](#markup-indicator) - versions 2.0
- [Markup Stamp](#markup-stamp) - versions 2.1, 2.0, 1.0
- [Markups](#markups) - versions 2.0, 1.1, 1.0
- [Preprocess Company File](#preprocess-company-file) - versions 2.0
- [Preprocess Project File](#preprocess-project-file) - versions 2.0
- [Viewer Permissions](#viewer-permissions) - versions 1.0

## Context

Resource id: `context`. Raw spec: `../openapi-raw/context.json`. Web: https://developers.procore.com/reference/rest/context?version=latest

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}

**Get context by ID**
Retrieve a specific context by its internal ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `context_id` [path] string (required) - Unique identifier of the context

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}

**Update context**
Update an existing context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `context_id` [path] string (required) - Unique identifier of the context

Request body (application/json) (required):

- `name`: string
- `settings`: object

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}

**Delete context by ID**
Delete a context and all its associated layers, groups, and markups using context ID.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `context_id` [path] string (required) - Unique identifier of the context
- `skip_resource_deletion` [query] boolean - When true, skip deletion of associated resources (markups)

Response 204: No Content (no body)

### GET /rest/v2.0/companies/{company_id}/contexts/{context_id}

**Get company-level context by ID**
Retrieve a specific company-level context by its internal ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `context_id` [path] string (required) - Unique identifier of the context

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object

### PUT /rest/v2.0/companies/{company_id}/contexts/{context_id}

**Update company-level context**
Update an existing company-level context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `context_id` [path] string (required) - Unique identifier of the context

Request body (application/json) (required):

- `name`: string
- `settings`: object

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object

### DELETE /rest/v2.0/companies/{company_id}/contexts/{context_id}

**Delete company-level context by ID**
Delete a company-level context and all its associated layers, groups, and markups.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `context_id` [path] string (required) - Unique identifier of the context
- `skip_resource_deletion` [query] boolean - When true, skip deletion of associated resources (markups)

Response 204: No Content (no body)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/layer_structure

**Get complete layer structure**
Retrieve or create the complete hierarchy (contexts -> layers -> groups) by context type.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `include_groups`: boolean

Response 200 (*/*): object

- `data`: object
  - `context`: object
    - `id`: string
    - `name`: string
    - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
    - `context_type_id`: string
    - `sub_context_type`: string enum[NONE, PIN]
    - `sub_context_type_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `settings`: object
    - `layers`: array of object
  - `created`: boolean

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/contexts

**Create a new context**
Create a new context for organizing layers within a document

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 201 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/contexts

**Delete context by query parameters**
Delete a context and all its associated layers, groups, and markups by query parameters.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `context_type` [query] string - Context type to filter by
- `context_type_id` [query] string - Context type ID to filter by
- `sub_context_type` [query] string - Sub-context type to filter by
- `sub_context_type_id` [query] string - Sub-context type ID to filter by
- `skip_resource_deletion` [query] boolean - When true, skip deletion of associated resources (markups)

Response 204: No Content (no body)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/contexts/get_or_create

**Get or create context with hierarchy**
Get existing context hierarchy or create a new context with default layers.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 200 (*/*): object

- `data`: object
  - `context`: object
    - `id`: string
    - `name`: string
    - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
    - `context_type_id`: string
    - `sub_context_type`: string enum[NONE, PIN]
    - `sub_context_type_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `settings`: object
    - `layers`: array of object
  - `created`: boolean

### POST /rest/v2.0/companies/{company_id}/layer_structure

**Get company-level layer structure**
Retrieve or create the complete hierarchy (contexts -> layers -> groups) for a company-level document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company

Request body (application/json) (required):

- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `include_groups`: boolean

Response 200 (*/*): object

- `data`: object
  - `context`: object
    - `id`: string
    - `name`: string
    - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
    - `context_type_id`: string
    - `sub_context_type`: string enum[NONE, PIN]
    - `sub_context_type_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `settings`: object
    - `layers`: array of object
  - `created`: boolean

### POST /rest/v2.0/companies/{company_id}/contexts

**Create a new company-level context**
Create a new context for organizing layers within a company-level document

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 201 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object

### POST /rest/v2.0/companies/{company_id}/contexts/get_or_create

**Get or create company-level context with hierarchy**
Get existing company-level context hierarchy or create a new one with default layers.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 200 (*/*): object

- `data`: object
  - `context`: object
    - `id`: string
    - `name`: string
    - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
    - `context_type_id`: string
    - `sub_context_type`: string enum[NONE, PIN]
    - `sub_context_type_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `settings`: object
    - `layers`: array of object
  - `created`: boolean

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/domains/contexts

**Get Contexts**
Returns all contexts with pagination and filtering.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 5000 for ids_only)
- `filters[created_before]` [query] string(date-time) - Filter contexts created before this ISO date-time
- `filters[updated_at]` [query] string - Filter by updated_at range in ISO format (start...end)
- `filters[id]` [query] string - JSON array of context IDs to filter by
- `filters[context_type_id]` [query] string - Context type ID to filter by
- `filters[subcontext_type_id]` [query] string - Sub-context type ID to filter by

Response 200 (*/*): object


### GET /rest/v2.0/companies/{company_id}/domains/contexts

**Get company-level Contexts**
Returns all company-level contexts with pagination and filtering.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 5000 for ids_only)
- `filters[created_before]` [query] string(date-time) - Filter contexts created before this ISO date-time
- `filters[updated_at]` [query] string - Filter by updated_at range in ISO format (start...end)
- `filters[id]` [query] string - JSON array of context IDs to filter by
- `filters[context_type_id]` [query] string - Context type ID to filter by
- `filters[subcontext_type_id]` [query] string - Sub-context type ID to filter by

Response 200 (*/*): object


### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Get context by ID**
Retrieve a specific context by its internal ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `context_id` [path] string (required)

Response 200 (*/*): object

- `id`: string
- `name`: string
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
- `context_type_id`: string
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `settings`: object

### PUT /rest/v1.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update context**
Update an existing context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `context_id` [path] string (required)

Request body (application/json) (required):

- `name`: string
- `settings`: object

Response 200 (*/*): object

- `id`: string
- `name`: string
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
- `context_type_id`: string
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `settings`: object

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete context by ID**
Delete a context and all its associated layers, groups, and markups using context ID. Pass skip_resource_deletion=true when the caller has already deleted external resources.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `context_id` [path] string (required)
- `skip_resource_deletion` [query] boolean

Response 204: No Content (no body)

### GET /rest/v1.0/companies/{company_id}/contexts/{context_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Get company-level context by ID**
Retrieve a specific company-level context by its internal ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `context_id` [path] string (required)

Response 200 (*/*): object

- `id`: string
- `name`: string
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
- `context_type_id`: string
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `settings`: object

### PUT /rest/v1.0/companies/{company_id}/contexts/{context_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update company-level context**
Update an existing company-level context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `context_id` [path] string (required)

Request body (application/json) (required):

- `name`: string
- `settings`: object

Response 200 (*/*): object

- `id`: string
- `name`: string
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
- `context_type_id`: string
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `settings`: object

### DELETE /rest/v1.0/companies/{company_id}/contexts/{context_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete company-level context by ID**
Delete a company-level context and all its associated layers, groups, and markups. Pass skip_resource_deletion=true when the caller has already deleted external resources.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `context_id` [path] string (required)
- `skip_resource_deletion` [query] boolean

Response 204: No Content (no body)

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/layer_structure  **[OLDER VERSION - a newer path version exists below/above]**

**Get complete layer structure by context type and type ID**
Retrieve the complete hierarchy (contexts → layers → groups) based on context_type and context_type_id. If no context exists, creates default context with user's private layer and returns the structure.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Request body (application/json) (required):

- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `include_groups`: boolean

Response 200 (*/*): object

- `context`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object
  - `layers`: array of object
    - `id`: string
    - `name`: string
    - `type`: string enum[PRIVATE, PUBLIC]
    - `context_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `visibility`: boolean
    - `order_index`: number
    - `settings`: object
    - `groups`: array of object
    - `editable`: boolean
- `created`: boolean

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/contexts  **[OLDER VERSION - a newer path version exists below/above]**

**Create a new context**
Create a new context for organizing layers within a document

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 201 (*/*): object

- `id`: string
- `name`: string
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
- `context_type_id`: string
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `settings`: object

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/contexts  **[OLDER VERSION - a newer path version exists below/above]**

**Delete context by query parameters**
Delete a context and all its associated layers, groups, and markups. For PIN deletion: pass sub_context_type and sub_context_type_id. context_type and context_type_id are optional (for additional specificity). Pass skip_resource_deletion=true when the caller has already deleted external resources.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `context_type` [query] string
- `context_type_id` [query] string
- `sub_context_type` [query] string
- `sub_context_type_id` [query] string
- `skip_resource_deletion` [query] boolean

Response 204: No Content (no body)

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/contexts/get_or_create  **[OLDER VERSION - a newer path version exists below/above]**

**Get or create context with hierarchy**
Get existing context hierarchy based on context_type and context_type_id combination. If context doesn't exist, create a new context with default layers and return the hierarchy.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 200 (*/*): object

- `context`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object
  - `layers`: array of object
    - `id`: string
    - `name`: string
    - `type`: string enum[PRIVATE, PUBLIC]
    - `context_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `visibility`: boolean
    - `order_index`: number
    - `settings`: object
    - `groups`: array of object
    - `editable`: boolean
- `created`: boolean

### POST /rest/v1.0/companies/{company_id}/layer_structure  **[OLDER VERSION - a newer path version exists below/above]**

**Get company-level layer structure**
Retrieve the complete hierarchy (contexts → layers → groups) for a company-level document

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)

Request body (application/json) (required):

- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `include_groups`: boolean

Response 200 (*/*): object

- `context`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object
  - `layers`: array of object
    - `id`: string
    - `name`: string
    - `type`: string enum[PRIVATE, PUBLIC]
    - `context_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `visibility`: boolean
    - `order_index`: number
    - `settings`: object
    - `groups`: array of object
    - `editable`: boolean
- `created`: boolean

### POST /rest/v1.0/companies/{company_id}/contexts  **[OLDER VERSION - a newer path version exists below/above]**

**Create a company-level context**
Create a new context for organizing layers within a company-level document

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 201 (*/*): object

- `id`: string
- `name`: string
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
- `context_type_id`: string
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `settings`: object

### POST /rest/v1.0/companies/{company_id}/contexts/get_or_create  **[OLDER VERSION - a newer path version exists below/above]**

**Get or create company-level context with hierarchy**
Get existing company-level context hierarchy or create a new one with default layers

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)

Request body (application/json) (required):

- `name`: string (required)
- `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision] (required)
- `context_type_id`: string (required)
- `sub_context_type`: string enum[NONE, PIN]
- `sub_context_type_id`: string
- `settings`: object

Response 200 (*/*): object

- `context`: object
  - `id`: string
  - `name`: string
  - `context_type`: string enum[document_revision, document_container, FileVersion, folders_attachments, specification_section_revision, drawing_revision]
  - `context_type_id`: string
  - `sub_context_type`: string enum[NONE, PIN]
  - `sub_context_type_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `settings`: object
  - `layers`: array of object
    - `id`: string
    - `name`: string
    - `type`: string enum[PRIVATE, PUBLIC]
    - `context_id`: string
    - `company_id`: string
    - `project_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `deleted`: boolean
    - `visibility`: boolean
    - `order_index`: number
    - `settings`: object
    - `groups`: array of object
    - `editable`: boolean
- `created`: boolean

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/domains/contexts  **[OLDER VERSION - a newer path version exists below/above]**

**Get Contexts**
Returns all markup contexts for a specific company and project with pagination and filtering support.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)
- `view` [query] string
- `filters[created_before]` [query] string(date-time)
- `filters[updated_at]` [query] string
- `filters[id]` [query] string
- `filters[context_type_id]` [query] string
- `filters[subcontext_type_id]` [query] string

Response 200 (*/*): object


### GET /rest/v1.0/companies/{company_id}/domains/contexts  **[OLDER VERSION - a newer path version exists below/above]**

**Get company-level Contexts**
Returns all markup contexts for a specific company with pagination and filtering support.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)
- `view` [query] string
- `filters[created_before]` [query] string(date-time)
- `filters[updated_at]` [query] string
- `filters[id]` [query] string
- `filters[context_type_id]` [query] string
- `filters[subcontext_type_id]` [query] string

Response 200 (*/*): object


## Document Info

Resource id: `document-info`. Raw spec: `../openapi-raw/document-info.json`. Web: https://developers.procore.com/reference/rest/document-info?version=latest

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/get_or_create

**Get or create document info**
Get or create a document and return only essential document information for UI.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `item_id`: string (required)
- `item_type`: string (required)
- `attachment_id`: string
- `attachment_source`: string
- `internal_pdm_tool_data`: object
  - `file_key`: string
  - `file_format`: string
  - `file_locked`: boolean
  - `document_container_id`: string
  - `position_within_container`: string

Response 200 (application/json): object

- `data`: object
  - `item_type`: string
  - `item_id`: string
  - `attachment_source`: string
  - `attachment_id`: string
  - `viewer_doc_id`: string

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/get_or_create  **[OLDER VERSION - a newer path version exists below/above]**

**Get or create document info (V1.1)**
Get or create a document and return only essential document information for UI purposes. This is a lightweight endpoint that doesn't fetch markups.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Request body (application/json) (required):

- `item_id`: string (required)
- `item_type`: string (required)
- `attachment_id`: string
- `attachment_source`: string
- `internal_pdm_tool_data`: object
  - `file_key`: string
  - `file_format`: string
  - `file_locked`: boolean
  - `document_container_id`: string
  - `position_within_container`: string

Response 200 (application/json): object

- `item_type`: string
- `item_id`: string
- `attachment_source`: string
- `attachment_id`: string
- `viewer_doc_id`: string

## Document Markup

Resource id: `document-markup`. Raw spec: `../openapi-raw/document-markup.json`. Web: https://developers.procore.com/reference/rest/document-markup?version=latest
Product lines: PM Essentials

### POST /rest/v1.0/document_markup_downloadable_pdfs/find_or_create

**Show or Create Document Markup Downloadable PDF**
Find or Create Document Markup Downloadable PDF. Starts processing to create a downloadable PDF with markup. When completed, the same request will include a download URL for the PDF.
item_id, item_type, and attachment_id paramters are the same parameters included in the URL when viewing the attachment in procore.
Example: app.procore.com/161072/project/submittal_logs/document_viewer?attachment_id=43&item_id=42&item_type=SubmittalLog&project_id=161072

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `version_datetime` [query] string - Optional ISO 8601 timestamp (UTC) used to retrieve the state of the document and its markup as of that point in time. Omit to retrieve the current version.

Request body (application/json) (required):

- `project_id`: integer (required) - ID of the project that owns the item and its attachment.
- `item_id`: integer (required) - The ID of the parent item this document belongs to
- `item_type`: string (required) - The type of the parent item this document belongs to (eg SubmittalLog) e.g. `SubmittalLogApprover`
- `attachment_id`: integer (required) - ID of the ProstoreFile (attachment) being marked up. Matches the `attachment_id` shown in the document viewer URL.

Response 200 (application/json): object

- `id`: integer - ID of the Document Markup Downloadable PDF record. e.g. `42`
- `error_message`: string - Message describing a processing failure. Null for a completed PDF.
- `status`: string enum[completed] - Processing state of the Downloadable PDF; always `completed` for this response. e.g. `completed`
- `url`: string - Temporary download URL for the completed marked-up PDF. Fetch this URL to download the file. e.g. `https://example.com/some_document_url`
- `pusher_message_name`: string - Name of the Pusher message broadcast when this PDF's status changes. Subscribe to it to receive real-time processing updates. e.g. `downloadable_pdf_update_707`

Response 202 (application/json): object

- `id`: integer - ID of the Document Markup Downloadable PDF record. e.g. `42`
- `error_message`: string - Message describing a processing failure. Null while processing.
- `status`: string enum[processing] - Processing state of the Downloadable PDF; always `processing` for this response. e.g. `processing`
- `url`: string - Download URL for the marked-up PDF. Null until processing completes.
- `pusher_message_name`: string - Name of the Pusher message broadcast when this PDF's status changes. Subscribe to it to be notified when processing finishes and the download URL becomes available. e.g. `downloadable_pdf_update_707`

Error responses: 400, 403, 404, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## File Thumbnails

Resource id: `file-thumbnails`. Raw spec: `../openapi-raw/file-thumbnails.json`. Web: https://developers.procore.com/reference/rest/file-thumbnails?version=latest

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/file_processors/preprocess/thumbnails/{item_type}/{item_id}

**Retrieve thumbnails for a file (project scope)**
Returns thumbnail S3 URLs for a pre-processed file. By default all sizes are returned; use the size query param to filter.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `item_type` [path] string (required) - Item type discriminator (e.g. FileVersion)
- `item_id` [path] string (required) - Unique identifier of the item
- `size` [query] string - Optional thumbnail size filter: small, medium, large

Response 200 (*/*): object

- `data`: array of object
  - `url`: string
  - `width`: integer(int32)
  - `height`: integer(int32)
  - `size`: string
- `error_message`: string

### GET /rest/v1.0/companies/{company_id}/file_processors/preprocess/thumbnails/{item_type}/{item_id}

**Retrieve thumbnails for a file (company scope)**
Company-level variant. Returns thumbnail S3 URLs for a pre-processed file. By default all sizes are returned; use the size query param to filter.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `item_type` [path] string (required) - Item type discriminator (e.g. FileVersion)
- `item_id` [path] string (required) - Unique identifier of the item
- `size` [query] string - Optional thumbnail size filter: small, medium, large

Response 200 (*/*): object

- `data`: array of object
  - `url`: string
  - `width`: integer(int32)
  - `height`: integer(int32)
  - `size`: string
- `error_message`: string

## File Thumbnails Bulk

Resource id: `file-thumbnails-bulk`. Raw spec: `../openapi-raw/file-thumbnails-bulk.json`. Web: https://developers.procore.com/reference/rest/file-thumbnails-bulk?version=latest

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/file_processors/preprocess/thumbnails/{item_type}

**Retrieve thumbnails for multiple files (project scope)**
Returns thumbnail S3 URLs for multiple pre-processed files. Pass item_ids in the request body. By default all sizes are returned; use the size query param to filter.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `item_type` [path] string (required) - Item type discriminator (e.g. document_revision)
- `size` [query] string - Optional thumbnail size filter: small, medium, large

Request body (application/json) (required):

- `item_ids`: array of string (required)

Response 200 (*/*): object

- `data`: array of object
  - `item_id`: string
  - `thumbnails`: array of object
    - `url`: string
    - `width`: integer(int32)
    - `height`: integer(int32)
    - `size`: string
- `error_message`: string

### POST /rest/v1.0/companies/{company_id}/file_processors/preprocess/thumbnails/{item_type}

**Retrieve thumbnails for multiple files (company scope)**
Company-level variant. Returns thumbnail S3 URLs for multiple pre-processed files. Pass item_ids in the request body. By default all sizes are returned; use the size query param to filter.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `item_type` [path] string (required) - Item type discriminator (e.g. document_revision)
- `size` [query] string - Optional thumbnail size filter: small, medium, large

Request body (application/json) (required):

- `item_ids`: array of string (required)

Response 200 (*/*): object

- `data`: array of object
  - `item_id`: string
  - `thumbnails`: array of object
    - `url`: string
    - `width`: integer(int32)
    - `height`: integer(int32)
    - `size`: string
- `error_message`: string

## Group

Resource id: `group`. Raw spec: `../openapi-raw/group.json`. Web: https://developers.procore.com/reference/rest/group?version=latest

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/groups/{group_id}

**Get group by ID**
Retrieve a specific group by its ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `group_id` [path] string (required) - Unique identifier of the group

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `layer_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `color`: string
  - `settings`: object
  - `editable`: boolean
  - `allow_delete`: boolean
  - `layer_type`: string enum[PRIVATE, PUBLIC]
  - `sub_context_type_id`: string

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/groups/{group_id}

**Update group**
Update an existing group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `group_id` [path] string (required) - Unique identifier of the group

Request body (application/json) (required):

- `name`: string
- `layer_id`: string
- `order_index`: number
- `color`: string
- `visibility`: boolean
- `settings`: object

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `layer_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `color`: string
  - `settings`: object
  - `editable`: boolean
  - `allow_delete`: boolean
  - `layer_type`: string enum[PRIVATE, PUBLIC]
  - `sub_context_type_id`: string

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/groups/{group_id}

**Delete group**
Delete a group (markups in this group will need to be moved or deleted)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `group_id` [path] string (required) - Unique identifier of the group
- `delete_resources` [query] boolean - When true, also delete associated resources (markups)

Response 200 (*/*): object

- `data`: object
  - `success`: boolean
  - `message`: string
  - `resource_id`: string
  - `resource_type`: string
  - `error_code`: string
  - `error_details`: string

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/groups

**Create a new group**
Create a new group within a layer

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `name`: string (required)
- `layer_id`: string (required)
- `order_index`: number
- `color`: string
- `visibility`: boolean
- `settings`: object

Response 201 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `layer_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `color`: string
  - `settings`: object
  - `editable`: boolean
  - `allow_delete`: boolean
  - `layer_type`: string enum[PRIVATE, PUBLIC]
  - `sub_context_type_id`: string

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/groups/{group_id}/reposition

**Update group order rank**
Update a group's position using midpoint ranking with float values.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `group_id` [path] string (required) - Unique identifier of the group

Request body (application/json) (required):

- `order_index`: number (required)

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `layer_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `color`: string
  - `settings`: object
  - `editable`: boolean
  - `allow_delete`: boolean
  - `layer_type`: string enum[PRIVATE, PUBLIC]
  - `sub_context_type_id`: string

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}/groups

**Get groups for layer**
Retrieve all groups within a specific layer with pagination

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `layer_id` [path] string (required) - Unique identifier of the layer
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 100)

Response 200 (*/*): object


### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/domains/groups

**Get Groups**
Returns all accessible groups with pagination and filtering.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 5000 for ids_only)
- `filters[created_before]` [query] string(date-time) - Filter groups created before this ISO date-time
- `filters[updated_at]` [query] string - Filter by updated_at range in ISO format (start...end)
- `filters[id]` [query] string - JSON array of group IDs to filter by
- `filters[context_id]` [query] string - Context ID to filter groups by
- `filters[context_type_id]` [query] string - Context type ID to filter by
- `filters[subcontext_type_id]` [query] string - Sub-context type ID to filter by

Response 200 (*/*): object


### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/accessible_groups/{context_type}/{context_type_id}

**Get accessible groups for authenticated user by context**
Retrieve all groups accessible to the authenticated user for a given context type and ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `context_type` [path] string (required) - Context type (e.g. document_revision)
- `context_type_id` [path] string (required) - Context type identifier
- `layer_id` [query] string - Optional layer ID to filter groups by
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 100)

Response 200 (*/*): object


### GET /rest/v2.0/companies/{company_id}/domains/groups

**Get company-level Groups**
Returns all accessible company-level groups with pagination and filtering.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 5000 for ids_only)
- `filters[created_before]` [query] string(date-time) - Filter groups created before this ISO date-time
- `filters[updated_at]` [query] string - Filter by updated_at range in ISO format (start...end)
- `filters[id]` [query] string - JSON array of group IDs to filter by
- `filters[context_id]` [query] string - Context ID to filter groups by
- `filters[context_type_id]` [query] string - Context type ID to filter by
- `filters[subcontext_type_id]` [query] string - Sub-context type ID to filter by

Response 200 (*/*): object


### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}/groups/bulk

**Bulk-create groups in a layer**
Create multiple groups in a single layer atomically. Replaces the N-round-trip pattern of looping the per-item POST /groups endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `layer_id` [path] string (required)

Request body (application/json) (required):

- `groups`: array of object (required)
  - `name`: string (required)
  - `order_index`: number
  - `color`: string
  - `visibility`: boolean
  - `settings`: object

Response 201 (*/*): object

- `groups`: array of object
  - `id`: string
  - `name`: string
  - `layer_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `color`: string
  - `settings`: object
  - `editable`: boolean
  - `allow_delete`: boolean
  - `layer_type`: string enum[PRIVATE, PUBLIC]
  - `sub_context_type_id`: string

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/groups/{group_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Get group by ID**
Retrieve a specific group by its ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `group_id` [path] string (required)

Response 200 (*/*): object

- `id`: string
- `name`: string
- `layer_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `color`: string
- `settings`: object
- `editable`: boolean
- `allow_delete`: boolean
- `layer_type`: string enum[PRIVATE, PUBLIC]
- `sub_context_type_id`: string

### PUT /rest/v1.0/companies/{company_id}/projects/{project_id}/groups/{group_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update group**
Update an existing group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `group_id` [path] string (required)

Request body (application/json) (required):

- `name`: string
- `layer_id`: string
- `order_index`: number
- `color`: string
- `visibility`: boolean
- `settings`: object

Response 200 (*/*): object

- `id`: string
- `name`: string
- `layer_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `color`: string
- `settings`: object
- `editable`: boolean
- `allow_delete`: boolean
- `layer_type`: string enum[PRIVATE, PUBLIC]
- `sub_context_type_id`: string

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/groups/{group_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete group**
Delete a group (markups in this group will need to be moved or deleted)

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `group_id` [path] string (required)
- `delete_resources` [query] boolean

Response 200 (*/*): object

- `success`: boolean
- `message`: string
- `resource_id`: string
- `resource_type`: string
- `error_code`: string
- `error_details`: string

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/groups  **[OLDER VERSION - a newer path version exists below/above]**

**Create a new group**
Create a new group within a layer

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Request body (application/json) (required):

- `name`: string (required)
- `layer_id`: string (required)
- `order_index`: number
- `color`: string
- `visibility`: boolean
- `settings`: object

Response 201 (*/*): object

- `id`: string
- `name`: string
- `layer_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `color`: string
- `settings`: object
- `editable`: boolean
- `allow_delete`: boolean
- `layer_type`: string enum[PRIVATE, PUBLIC]
- `sub_context_type_id`: string

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/groups/{group_id}/reposition  **[OLDER VERSION - a newer path version exists below/above]**

**Update group order rank**
Update a group's position using midpoint ranking with float values. UI calculates the new rank (e.g., 1500.0 between 1000.0 and 2000.0) and passes it directly.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `group_id` [path] string (required)

Request body (application/json) (required):

- `order_index`: number (required)

Response 200 (*/*): object

- `id`: string
- `name`: string
- `layer_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `color`: string
- `settings`: object
- `editable`: boolean
- `allow_delete`: boolean
- `layer_type`: string enum[PRIVATE, PUBLIC]
- `sub_context_type_id`: string

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}/groups  **[OLDER VERSION - a newer path version exists below/above]**

**Get groups for layer**
Retrieve all groups within a specific layer

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `layer_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)

Response 200 (*/*): object

- `groups`: array of object
  - `id`: string
  - `name`: string
  - `layer_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `color`: string
  - `settings`: object
  - `editable`: boolean
  - `allow_delete`: boolean
  - `layer_type`: string enum[PRIVATE, PUBLIC]
  - `sub_context_type_id`: string
- `total_count`: integer(int64)
- `page`: integer(int32)
- `per_page`: integer(int32)

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/domains/groups  **[OLDER VERSION - a newer path version exists below/above]**

**Get Groups**
Returns all accessible markup groups (public + user's private) for a specific company and project with pagination and filtering support.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)
- `view` [query] string
- `filters[created_before]` [query] string(date-time)
- `filters[updated_at]` [query] string
- `filters[id]` [query] string
- `filters[context_id]` [query] string
- `filters[context_type_id]` [query] string
- `filters[subcontext_type_id]` [query] string

Response 200 (*/*): object


### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/accessible_groups/{context_type}/{context_type_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Get accessible groups for authenticated user by context**
Retrieve all groups accessible to the authenticated user for a given context type and ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `context_type` [path] string (required)
- `context_type_id` [path] string (required)
- `layer_id` [query] string
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)

Response 200 (*/*): object

- `groups`: array of object
  - `id`: string
  - `name`: string
  - `layer_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `color`: string
  - `settings`: object
  - `editable`: boolean
  - `allow_delete`: boolean
  - `layer_type`: string enum[PRIVATE, PUBLIC]
  - `sub_context_type_id`: string
- `total_count`: integer(int64)
- `page`: integer(int32)
- `per_page`: integer(int32)

### GET /rest/v1.0/companies/{company_id}/domains/groups  **[OLDER VERSION - a newer path version exists below/above]**

**Get company-level Groups**
Returns all accessible markup groups for a specific company with pagination and filtering support.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)
- `view` [query] string
- `filters[created_before]` [query] string(date-time)
- `filters[updated_at]` [query] string
- `filters[id]` [query] string
- `filters[context_id]` [query] string
- `filters[context_type_id]` [query] string
- `filters[subcontext_type_id]` [query] string

Response 200 (*/*): object


## Layer

Resource id: `layer`. Raw spec: `../openapi-raw/layer.json`. Web: https://developers.procore.com/reference/rest/layer?version=latest

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}

**Get layer by ID**
Retrieve a specific layer by its ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `layer_id` [path] string (required) - Unique identifier of the layer

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `type`: string enum[PRIVATE, PUBLIC]
  - `context_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `settings`: object
  - `editable`: boolean

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}

**Update layer**
Update an existing layer

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `layer_id` [path] string (required) - Unique identifier of the layer

Request body (application/json) (required):

- `name`: string
- `order_index`: number
- `visibility`: boolean
- `settings`: object

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `type`: string enum[PRIVATE, PUBLIC]
  - `context_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `settings`: object
  - `editable`: boolean

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}

**Delete layer**
Delete a layer and all its associated groups

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `layer_id` [path] string (required) - Unique identifier of the layer

Response 204: No Content (no body)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/layers

**Create a new layer**
Create a new layer within a context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `name`: string (required)
- `type`: string enum[PRIVATE, PUBLIC] (required)
- `context_id`: string (required)
- `order_index`: number
- `visibility`: boolean
- `settings`: object

Response 201 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `type`: string enum[PRIVATE, PUBLIC]
  - `context_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `settings`: object
  - `editable`: boolean

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}/reposition

**Update layer order rank**
Update a layer's position using midpoint ranking with float values.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `layer_id` [path] string (required) - Unique identifier of the layer

Request body (application/json) (required):

- `order_index`: number (required)

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `type`: string enum[PRIVATE, PUBLIC]
  - `context_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `settings`: object
  - `editable`: boolean

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}/convert_to_public

**Convert private layer to public**
Convert a private layer to public, making it accessible to all project users

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `layer_id` [path] string (required) - Unique identifier of the layer

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `name`: string
  - `type`: string enum[PRIVATE, PUBLIC]
  - `context_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `settings`: object
  - `editable`: boolean

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/domains/layers

**Get Layers**
Returns all accessible layers with pagination and filtering.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 5000 for ids_only)
- `filters[created_before]` [query] string(date-time) - Filter layers created before this ISO date-time
- `filters[updated_at]` [query] string - Filter by updated_at range in ISO format (start...end)
- `filters[id]` [query] string - JSON array of layer IDs to filter by
- `filters[context_id]` [query] string - Context ID to filter layers by
- `filters[context_type_id]` [query] string - Context type ID to filter by
- `filters[subcontext_type_id]` [query] string - Sub-context type ID to filter by

Response 200 (*/*): object


### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}/layers

**Get layers for context**
Retrieve all layers within a specific context with pagination

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `context_id` [path] string (required) - Unique identifier of the context
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 100)

Response 200 (*/*): object


### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/accessible_layers/{context_type}/{context_type_id}

**Get accessible layers for authenticated user by context**
Retrieve all layers accessible to the authenticated user (private + public) for a given context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `context_type` [path] string (required) - Context type (e.g. document_revision)
- `context_type_id` [path] string (required) - Context type identifier
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 100)

Response 200 (*/*): object


### GET /rest/v2.0/companies/{company_id}/domains/layers

**Get company-level Layers**
Returns all accessible company-level layers with pagination and filtering.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 5000 for ids_only)
- `filters[created_before]` [query] string(date-time) - Filter layers created before this ISO date-time
- `filters[updated_at]` [query] string - Filter by updated_at range in ISO format (start...end)
- `filters[id]` [query] string - JSON array of layer IDs to filter by
- `filters[context_id]` [query] string - Context ID to filter layers by
- `filters[context_type_id]` [query] string - Context type ID to filter by
- `filters[subcontext_type_id]` [query] string - Sub-context type ID to filter by

Response 200 (*/*): object


### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Get layer by ID**
Retrieve a specific layer by its ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `layer_id` [path] string (required)

Response 200 (*/*): object

- `id`: string
- `name`: string
- `type`: string enum[PRIVATE, PUBLIC]
- `context_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `settings`: object
- `editable`: boolean

### PUT /rest/v1.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update layer**
Update an existing layer

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `layer_id` [path] string (required)

Request body (application/json) (required):

- `name`: string
- `order_index`: number
- `visibility`: boolean
- `settings`: object

Response 200 (*/*): object

- `id`: string
- `name`: string
- `type`: string enum[PRIVATE, PUBLIC]
- `context_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `settings`: object
- `editable`: boolean

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete layer**
Delete a layer and all its associated groups

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `layer_id` [path] string (required)

Response 204: No Content (no body)

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/layers  **[OLDER VERSION - a newer path version exists below/above]**

**Create a new layer**
Create a new layer within a context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Request body (application/json) (required):

- `name`: string (required)
- `type`: string enum[PRIVATE, PUBLIC] (required)
- `context_id`: string (required)
- `order_index`: number
- `visibility`: boolean
- `settings`: object

Response 201 (*/*): object

- `id`: string
- `name`: string
- `type`: string enum[PRIVATE, PUBLIC]
- `context_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `settings`: object
- `editable`: boolean

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}/reposition  **[OLDER VERSION - a newer path version exists below/above]**

**Update layer order rank**
Update a layer's position using midpoint ranking with float values. UI calculates the new rank (e.g., 1500.0 between 1000.0 and 2000.0) and passes it directly.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `layer_id` [path] string (required)

Request body (application/json) (required):

- `order_index`: number (required)

Response 200 (*/*): object

- `id`: string
- `name`: string
- `type`: string enum[PRIVATE, PUBLIC]
- `context_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `settings`: object
- `editable`: boolean

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/layers/{layer_id}/convert_to_public  **[OLDER VERSION - a newer path version exists below/above]**

**Convert private layer to public**
Convert a private layer to public, making it accessible to all project users

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `layer_id` [path] string (required)

Response 200 (*/*): object

- `id`: string
- `name`: string
- `type`: string enum[PRIVATE, PUBLIC]
- `context_id`: string
- `company_id`: string
- `project_id`: string
- `created_at`: string(date-time)
- `updated_at`: string(date-time)
- `created_by_id`: string
- `deleted`: boolean
- `visibility`: boolean
- `order_index`: number
- `settings`: object
- `editable`: boolean

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/domains/layers  **[OLDER VERSION - a newer path version exists below/above]**

**Get Layers**
Returns all accessible markup layers (public + user's private) for a specific company and project with pagination and filtering support.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)
- `view` [query] string
- `filters[created_before]` [query] string(date-time)
- `filters[updated_at]` [query] string
- `filters[id]` [query] string
- `filters[context_id]` [query] string
- `filters[context_type_id]` [query] string
- `filters[subcontext_type_id]` [query] string

Response 200 (*/*): object


### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/contexts/{context_id}/layers  **[OLDER VERSION - a newer path version exists below/above]**

**Get layers for context**
Retrieve all layers within a specific context

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `context_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)

Response 200 (*/*): object

- `layers`: array of object
  - `id`: string
  - `name`: string
  - `type`: string enum[PRIVATE, PUBLIC]
  - `context_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `settings`: object
  - `editable`: boolean
- `total_count`: integer(int64)
- `page`: integer(int32)
- `per_page`: integer(int32)

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/accessible_layers/{context_type}/{context_type_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Get accessible layers for authenticated user by context**
Retrieve all layers accessible to the authenticated user (private + public) for a given context type and ID

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `context_type` [path] string (required)
- `context_type_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)

Response 200 (*/*): object

- `layers`: array of object
  - `id`: string
  - `name`: string
  - `type`: string enum[PRIVATE, PUBLIC]
  - `context_id`: string
  - `company_id`: string
  - `project_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `deleted`: boolean
  - `visibility`: boolean
  - `order_index`: number
  - `settings`: object
  - `editable`: boolean
- `total_count`: integer(int64)
- `page`: integer(int32)
- `per_page`: integer(int32)

### GET /rest/v1.0/companies/{company_id}/domains/layers  **[OLDER VERSION - a newer path version exists below/above]**

**Get company-level Layers**
Returns all accessible markup layers for a specific company with pagination and filtering support.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `page` [query] integer(int32)
- `per_page` [query] integer(int32)
- `view` [query] string
- `filters[created_before]` [query] string(date-time)
- `filters[updated_at]` [query] string
- `filters[id]` [query] string
- `filters[context_id]` [query] string
- `filters[context_type_id]` [query] string
- `filters[subcontext_type_id]` [query] string

Response 200 (*/*): object


## Markup Groups

Resource id: `markup-groups`. Raw spec: `../openapi-raw/markup-groups.json`. Web: https://developers.procore.com/reference/rest/markup-groups?version=latest

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups/groups

**Create Group and Move Markups**
Creates a new group and moves specified markups to it.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `viewer_doc_id` [path] string (required) - Unique identifier of the viewer document

Request body (application/json) (required):

- `markup_ids`: array of string
- `source_group_id`: string (required)
- `action`: string
- `pin_id`: string
- `escalate_to_pin`: boolean

Response 200 (*/*): object

- `data`: object
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string
  - `failed_markups`: array of object
    - `xfdf_id`: string
    - `reason`: string

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups/groups  **[OLDER VERSION - a newer path version exists below/above]**

**Create Group and Move Markups**
Creates a new group in the same layer as the source group and moves the specified markups to it.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `viewer_doc_id` [path] string (required)

Request body (application/json) (required):

- `markup_ids`: array of string
- `source_group_id`: string (required)
- `action`: string
- `pin_id`: string
- `escalate_to_pin`: boolean

Response 200 (*/*): object

- `markups`: array of object
  - `id`: string
  - `xfdf_id`: string
  - `markup_type`: string
  - `viewer_doc_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `updated_by_id`: string
  - `company_id`: string
  - `project_id`: string
  - `deleted`: boolean
  - `editable`: boolean
  - `xfdf`: string
  - `created_by_name`: string
  - `updated_by_name`: string
  - `created_by_vendor_id`: string
  - `created_by_vendor_name`: string
  - `page_number`: integer(int32)
  - `audit_transaction_timestamp`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string
  - `markup_source`: string
- `failed_markups`: array of object
  - `xfdf_id`: string
  - `reason`: string

## Markup Indicator

Resource id: `markup-indicator`. Raw spec: `../openapi-raw/markup-indicator.json`. Web: https://developers.procore.com/reference/rest/markup-indicator?version=latest

### POST /rest/v2.0/companies/{company_id}/viewer_documents/markup_indicator

**Company Markup Indicators by Items**
Returns per-item markup indicators (e.g. has_public_markup) across a company. Items the caller cannot view, or whose classification could not be resolved, are silently omitted from data.items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company

Request body (application/json) (required):

- `item_type`: string (required)
- `item_ids`: array of string (required)

Response 200 (*/*): object


### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/markup_indicator

**Project Markup Indicators by Items**
Returns per-item markup indicators (e.g. has_public_markup) for a project, in a single batch call. Items the caller cannot view, or whose classification could not be resolved, are silently omitted from data.items.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `item_type`: string (required)
- `item_ids`: array of string (required)

Response 200 (*/*): object


## Markup Stamp

Resource id: `markup-stamp`. Raw spec: `../openapi-raw/markup-stamp.json`. Web: https://developers.procore.com/reference/rest/markup-stamp?version=latest

### PUT /rest/v2.1/companies/{company_id}/projects/{project_id}/viewer_documents/stamps/{stamp_id}

**Update Stamp**
Updates an existing stamp for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `stamp_id` [path] string (required) - Unique identifier of the stamp to update
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `background_image`: string
- `background_color`: string
- `title`: string (required)
- `text`: string
- `font_family`: string
- `text_color`: string
- `custom_properties`: object
  - `user_name`: boolean
  - `company`: boolean
  - `date`: boolean
  - `time`: boolean
- `font_style`: object
  - `bold`: boolean
  - `italic`: boolean
  - `underline`: boolean
  - `strike_through`: boolean
  - `font_family`: string (required)
  - `size`: integer(int32)
  - `text_color`: string

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `background_image`: string
  - `background_color`: string
  - `title`: string
  - `text`: string
  - `custom_properties`: object
    - `user_name`: boolean
    - `company`: boolean
    - `date`: boolean
    - `time`: boolean
  - `font_style`: object
    - `bold`: boolean
    - `italic`: boolean
    - `underline`: boolean
    - `strike_through`: boolean
    - `font_family`: string (required)
    - `size`: integer(int32)
    - `text_color`: string
  - `is_legacy_stamp`: boolean

### DELETE /rest/v2.1/companies/{company_id}/projects/{project_id}/viewer_documents/stamps/{stamp_id}

**Delete Stamp**
Deletes a stamp for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `stamp_id` [path] string (required) - Unique identifier of the stamp to delete

Response 200: OK (no body)

### GET /rest/v2.1/companies/{company_id}/projects/{project_id}/viewer_documents/stamps

**Get Stamps**
Returns stamps for the user, company and project with pagination and search.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of stamps to return per page (max 100)
- `search_text` [query] string - Text to search for in stamp content

Response 200 (application/json): object

- `data`: array of object (required) - Array of stamp objects
  - `id`: string
  - `background_image`: string
  - `background_color`: string
  - `title`: string
  - `text`: string
  - `custom_properties`: object
    - `user_name`: boolean
    - `company`: boolean
    - `date`: boolean
    - `time`: boolean
  - `font_style`: object
    - `bold`: boolean
    - `italic`: boolean
    - `underline`: boolean
    - `strike_through`: boolean
    - `font_family`: string (required)
    - `size`: integer(int32)
    - `text_color`: string
  - `is_legacy_stamp`: boolean

### POST /rest/v2.1/companies/{company_id}/projects/{project_id}/viewer_documents/stamps

**Save Stamp**
Saves a new stamp for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `background_image`: string
- `background_color`: string
- `title`: string (required)
- `text`: string
- `font_family`: string
- `text_color`: string
- `custom_properties`: object
  - `user_name`: boolean
  - `company`: boolean
  - `date`: boolean
  - `time`: boolean
- `font_style`: object
  - `bold`: boolean
  - `italic`: boolean
  - `underline`: boolean
  - `strike_through`: boolean
  - `font_family`: string (required)
  - `size`: integer(int32)
  - `text_color`: string

Response 200 (*/*): object

- `data`: object
  - `id`: string
  - `background_image`: string
  - `background_color`: string
  - `title`: string
  - `text`: string
  - `custom_properties`: object
    - `user_name`: boolean
    - `company`: boolean
    - `date`: boolean
    - `time`: boolean
  - `font_style`: object
    - `bold`: boolean
    - `italic`: boolean
    - `underline`: boolean
    - `strike_through`: boolean
    - `font_family`: string (required)
    - `size`: integer(int32)
    - `text_color`: string
  - `is_legacy_stamp`: boolean

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups/{markup_id}/stamps

**Get Markup Stamp**
Get Markup Stamp image.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `viewer_doc_id` [path] string (required) - Unique identifier of the viewer document
- `markup_id` [path] string (required) - Unique identifier of the markup

Response 200 (*/*): string(binary)


### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/stamps/{stamp_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Stamp**
Updates an existing stamp with enhanced features for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `stamp_id` [path] string (required) - The unique identifier of the stamp to update
- `company_id` [path] string (required) - The unique identifier of the company
- `project_id` [path] string (required) - The unique identifier of the project

Request body (application/json) (required):

- `background_image`: string
- `background_color`: string
- `title`: string (required)
- `text`: string
- `font_family`: string
- `text_color`: string
- `custom_properties`: object
  - `user_name`: boolean
  - `company`: boolean
  - `date`: boolean
  - `time`: boolean
- `font_style`: object
  - `bold`: boolean
  - `italic`: boolean
  - `underline`: boolean
  - `strike_through`: boolean
  - `font_family`: string (required)
  - `size`: integer(int32)
  - `text_color`: string

Response 200 (*/*): object

- `id`: string
- `background_image`: string
- `background_color`: string
- `title`: string
- `text`: string
- `custom_properties`: object
  - `user_name`: boolean
  - `company`: boolean
  - `date`: boolean
  - `time`: boolean
- `font_style`: object
  - `bold`: boolean
  - `italic`: boolean
  - `underline`: boolean
  - `strike_through`: boolean
  - `font_family`: string (required)
  - `size`: integer(int32)
  - `text_color`: string
- `is_legacy_stamp`: boolean

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/stamps/{stamp_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Stamp**
Deletes a stamp for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The unique identifier of the company
- `project_id` [path] string (required) - The unique identifier of the project
- `stamp_id` [path] string (required) - The unique identifier of the stamp to delete

Response 200 (*/*): object

- `message`: string

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/stamps  **[OLDER VERSION - a newer path version exists below/above]**

**Get Stamps**
Returns Stamps V2 for the user, company and project with pagination and search functionality. Supports both legacy and new stamps.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The unique identifier of the company
- `project_id` [path] string (required) - The unique identifier of the project
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of stamps to return per page
- `search_text` [query] string - Text to search for in stamp content

Response 200 (application/json): object

- `stamps`: array of object
  - `id`: string
  - `background_image`: string
  - `background_color`: string
  - `title`: string
  - `text`: string
  - `custom_properties`: object
    - `user_name`: boolean
    - `company`: boolean
    - `date`: boolean
    - `time`: boolean
  - `font_style`: object
    - `bold`: boolean
    - `italic`: boolean
    - `underline`: boolean
    - `strike_through`: boolean
    - `font_family`: string (required)
    - `size`: integer(int32)
    - `text_color`: string
  - `is_legacy_stamp`: boolean

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/stamps  **[OLDER VERSION - a newer path version exists below/above]**

**Save Stamp**
Saves new stamp with enhanced features for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The unique identifier of the company
- `project_id` [path] string (required) - The unique identifier of the project

Request body (application/json) (required):

- `background_image`: string
- `background_color`: string
- `title`: string (required)
- `text`: string
- `font_family`: string
- `text_color`: string
- `custom_properties`: object
  - `user_name`: boolean
  - `company`: boolean
  - `date`: boolean
  - `time`: boolean
- `font_style`: object
  - `bold`: boolean
  - `italic`: boolean
  - `underline`: boolean
  - `strike_through`: boolean
  - `font_family`: string (required)
  - `size`: integer(int32)
  - `text_color`: string

Response 200 (*/*): object

- `id`: string
- `background_image`: string
- `background_color`: string
- `title`: string
- `text`: string
- `custom_properties`: object
  - `user_name`: boolean
  - `company`: boolean
  - `date`: boolean
  - `time`: boolean
- `font_style`: object
  - `bold`: boolean
  - `italic`: boolean
  - `underline`: boolean
  - `strike_through`: boolean
  - `font_family`: string (required)
  - `size`: integer(int32)
  - `text_color`: string
- `is_legacy_stamp`: boolean

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/stamps  **[OLDER VERSION - a newer path version exists below/above]**

**Get Stamps**
Returns Stamps for the user , company and project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Response 200 (application/json): object

- `stamps`: array of object
  - `id`: string
  - `stamp`: string

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/stamps  **[OLDER VERSION - a newer path version exists below/above]**

**Save Stamp**
Saves new stamp for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Request body (application/json) (required):

- `stamp`: string (required)

Response 200 (*/*): object

- `id`: string

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups/{markup_id}/stamps  **[OLDER VERSION - a newer path version exists below/above]**

**Get Markup Stamp**
Get Markup Stamp

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `viewer_doc_id` [path] string (required)
- `markup_id` [path] string (required)

Response 200 (*/*): string(binary)


### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/stamps/{stamp_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Stamp**
Deletes markups for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `stamp_id` [path] string (required)

Response 200 (*/*): object

- `message`: string

## Markups

Resource id: `markups`. Raw spec: `../openapi-raw/markups.json`. Web: https://developers.procore.com/reference/rest/markups?version=latest

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups

**Save Markups**
Saves new markups for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `viewer_doc_id` [path] string (required) - Unique identifier of the viewer document

Request body (application/json) (required):

- `markups`: array of object (required)
  - `xfdf`: string (required)
  - `markup_type`: string (required)
  - `page_number`: integer(int32) (required)
  - `xfdf_id`: string (required)
  - `id`: string
  - `page_height`: integer(int32) (required)
  - `page_width`: integer(int32) (required)
  - `updated_at`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string

Response 200 (*/*): object

- `data`: object
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string
  - `failed_markups`: array of object
    - `xfdf_id`: string
    - `reason`: string

### PUT /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups

**Modify Markups**
Modifies existing markups for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `viewer_doc_id` [path] string (required) - Unique identifier of the viewer document

Request body (application/json) (required):

- `markups`: array of object (required)
  - `xfdf`: string (required)
  - `markup_type`: string (required)
  - `page_number`: integer(int32) (required)
  - `xfdf_id`: string (required)
  - `id`: string
  - `page_height`: integer(int32) (required)
  - `page_width`: integer(int32) (required)
  - `updated_at`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string

Response 200 (*/*): object

- `data`: object
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string
  - `failed_markups`: array of object
    - `xfdf_id`: string
    - `reason`: string

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups

**Delete Markups**
Deletes markups for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `viewer_doc_id` [path] string (required) - Unique identifier of the viewer document

Request body (application/json) (required):

- `markups`: array of object (required)
  - `id`: string
  - `xfdf_id`: string (required)

Response 200 (*/*): object

- `data`: object
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string
  - `failed_markups`: array of object
    - `xfdf_id`: string
    - `reason`: string

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents

**Find or create an Annotated Document**
Find or create an Annotated Document where markup may be added. Supports filtering by markup context and pin origin.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `combined_xfdf` [query] boolean - When true, return combined XFDF instead of per-markup XFDF
- `markup_context` [query] string - Filter by markup context (WORKFLOW, WORKSPACE, or PIN)
- `pin_origin` [query] string - Origin of the pin (WORKFLOW or WORKSPACE), required when markup_context is PIN

Request body (application/json) (required):

- `item_id`: string (required)
- `item_type`: string (required)
- `attachment_id`: string
- `attachment_source`: string
- `internal_pdm_tool_data`: object
  - `file_key`: string
  - `file_format`: string
  - `file_locked`: boolean
  - `document_container_id`: string
  - `position_within_container`: string

Response 200 (application/json): object

- `data`: object
  - `viewer_doc_id`: string
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string
  - `combined_xfdf`: string
  - `permissions`: object
    - `file_locked`: boolean
    - `allowed_actions`: array of string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/markups/by_groups

**Get Markups by Groups**
Retrieves markups associated with specific group IDs.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `page` [query] integer(int32) - Page number for pagination (1-based)
- `per_page` [query] integer(int32) - Number of items per page (max 100)

Request body (application/json) (required):

- `group_ids`: array of string (required)
- `item_id`: string (required)
- `item_type`: string (required)

Response 200 (*/*): object


### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/markups/copy

**Copy Markups**
Copies all public WORKSPACE markups from a source document to a target document. The caller must hold ROLE_EDIT_PUBLIC_LAYERS and ROLE_EDIT_SHARED_MARKUP on the source document. By default the same roles are also required on the target document; this check is gated by the mms.markup-copy.target-permission-check-enabled flag and can be disabled per environment. The operation is atomic.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Request body (application/json) (required):

- `source_item_id`: string (required)
- `target_item_id`: string (required)
- `item_type`: string enum[document_revision, document_upload, submittal_log, submittal_log_approver, FileVersion, specification_section_revision, drawing_revision] (required)

Response 200 (*/*): object

- `data`: object
  - `source_viewer_doc_id`: string
  - `target_viewer_doc_id`: string
  - `copied_count`: integer(int32)
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/{item_type}/{item_id}/viewer_permissions

**Item-scoped Document Markup Permissions**
Returns the user's tool-level permissions for the specified document, identified by item_type and item_id in the URL path. Allowed item_type values are document_revision, document_upload, FileVersion, and specification_section_revision, and drawing_revision.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `item_type` [path] string (required) - Type of the item being queried. One of: document_revision, document_upload, FileVersion, specification_section_revision, drawing_revision.
- `item_id` [path] string (required) - External identifier of the item

Response 200 (application/json): object

- `data`: object
  - `viewer_doc_id`: string
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string
  - `combined_xfdf`: string
  - `permissions`: object
    - `file_locked`: boolean
    - `allowed_actions`: array of string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/permissions

**Document Markup Permissions**
Returns the user permissions for the document specified in Procore-Document-Id header.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project

Response 200 (application/json): object

- `data`: object
  - `viewer_doc_id`: string
  - `markups`: array of object
    - `id`: string
    - `xfdf_id`: string
    - `markup_type`: string
    - `viewer_doc_id`: string
    - `created_at`: string(date-time)
    - `updated_at`: string(date-time)
    - `created_by_id`: string
    - `updated_by_id`: string
    - `company_id`: string
    - `project_id`: string
    - `deleted`: boolean
    - `editable`: boolean
    - `xfdf`: string
    - `created_by_name`: string
    - `updated_by_name`: string
    - `created_by_vendor_id`: string
    - `created_by_vendor_name`: string
    - `page_number`: integer(int32)
    - `audit_transaction_timestamp`: string(date-time)
    - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
    - `group_id`: string
    - `pin_id`: string
    - `comment_id`: string
    - `document`: object
    - `markup_source`: string
  - `combined_xfdf`: string
  - `permissions`: object
    - `file_locked`: boolean
    - `allowed_actions`: array of string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/viewer_documents/accessible_tools

**Accessible Tools**
Returns the set of Procore item types (tools) the current user is permitted to act on for the given company and project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `item_type` [query] string - Viewer document type used to choose the Related Items pin holder (e.g. specification_section_revision, FileVersion). Defaults to Document Management's DocumentPin.

Response 200 (application/json): object

- `data`: object
  - `accessible_tools`: array of string

### POST /rest/v1.1/companies/{company_id}/projects/{project_id}/viewer_documents  **[OLDER VERSION - a newer path version exists below/above]**

**Find or create an Annotated Document with markup context filtering**
Find or create an Annotated Document where markup may be added. Supports filtering by a single markup context (WORKFLOW, WORKSPACE, or PIN). When markup_context is PIN, pin_origin (WORKFLOW or WORKSPACE) is required. Pass markup_context=NO_CONTEXT to skip markup retrieval entirely and receive only the viewer document, document descriptor, and permissions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `combined_xfdf` [query] boolean
- `markup_context` [query] string
- `pin_origin` [query] string
- `layer_type` [query] string

Request body (application/json) (required):

- `item_id`: string (required)
- `item_type`: string (required)
- `attachment_id`: string
- `attachment_source`: string
- `internal_pdm_tool_data`: object
  - `file_key`: string
  - `file_format`: string
  - `file_locked`: boolean
  - `document_container_id`: string
  - `position_within_container`: string

Response 200 (application/json): object

- `viewer_doc_id`: string
- `markups`: array of object
  - `id`: string
  - `xfdf_id`: string
  - `markup_type`: string
  - `viewer_doc_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `updated_by_id`: string
  - `company_id`: string
  - `project_id`: string
  - `deleted`: boolean
  - `editable`: boolean
  - `xfdf`: string
  - `created_by_name`: string
  - `updated_by_name`: string
  - `created_by_vendor_id`: string
  - `created_by_vendor_name`: string
  - `page_number`: integer(int32)
  - `audit_transaction_timestamp`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string
  - `markup_source`: string
- `combined_xfdf`: string
- `permissions`: object
  - `file_locked`: boolean
  - `allowed_actions`: array of string
- `document`: object
  - `external_document_id`: string
  - `document_type`: string

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups  **[OLDER VERSION - a newer path version exists below/above]**

**Save Markups**
Saves new markups or updates existing ones for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `viewer_doc_id` [path] string (required)

Request body (application/json) (required):

- `markups`: array of object (required)
  - `xfdf`: string (required)
  - `markup_type`: string (required)
  - `page_number`: integer(int32) (required)
  - `xfdf_id`: string (required)
  - `id`: string
  - `page_height`: integer(int32) (required)
  - `page_width`: integer(int32) (required)
  - `updated_at`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string

Response 200 (*/*): object

- `markups`: array of object
  - `id`: string
  - `xfdf_id`: string
  - `markup_type`: string
  - `viewer_doc_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `updated_by_id`: string
  - `company_id`: string
  - `project_id`: string
  - `deleted`: boolean
  - `editable`: boolean
  - `xfdf`: string
  - `created_by_name`: string
  - `updated_by_name`: string
  - `created_by_vendor_id`: string
  - `created_by_vendor_name`: string
  - `page_number`: integer(int32)
  - `audit_transaction_timestamp`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string
  - `markup_source`: string
- `failed_markups`: array of object
  - `xfdf_id`: string
  - `reason`: string

### PUT /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups  **[OLDER VERSION - a newer path version exists below/above]**

**Modify Markups**
Modifies existing markups for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `viewer_doc_id` [path] string (required)

Request body (application/json) (required):

- `markups`: array of object (required)
  - `xfdf`: string (required)
  - `markup_type`: string (required)
  - `page_number`: integer(int32) (required)
  - `xfdf_id`: string (required)
  - `id`: string
  - `page_height`: integer(int32) (required)
  - `page_width`: integer(int32) (required)
  - `updated_at`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string

Response 200 (*/*): object

- `markups`: array of object
  - `id`: string
  - `xfdf_id`: string
  - `markup_type`: string
  - `viewer_doc_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `updated_by_id`: string
  - `company_id`: string
  - `project_id`: string
  - `deleted`: boolean
  - `editable`: boolean
  - `xfdf`: string
  - `created_by_name`: string
  - `updated_by_name`: string
  - `created_by_vendor_id`: string
  - `created_by_vendor_name`: string
  - `page_number`: integer(int32)
  - `audit_transaction_timestamp`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string
  - `markup_source`: string
- `failed_markups`: array of object
  - `xfdf_id`: string
  - `reason`: string

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/{viewer_doc_id}/markups  **[OLDER VERSION - a newer path version exists below/above]**

**Delete Markups**
Deletes markups for a specific company, project, and document.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `viewer_doc_id` [path] string (required)

Request body (application/json) (required):

- `markups`: array of object (required)
  - `id`: string
  - `xfdf_id`: string (required)

Response 200 (*/*): object

- `markups`: array of object
  - `id`: string
  - `xfdf_id`: string
  - `markup_type`: string
  - `viewer_doc_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `updated_by_id`: string
  - `company_id`: string
  - `project_id`: string
  - `deleted`: boolean
  - `editable`: boolean
  - `xfdf`: string
  - `created_by_name`: string
  - `updated_by_name`: string
  - `created_by_vendor_id`: string
  - `created_by_vendor_name`: string
  - `page_number`: integer(int32)
  - `audit_transaction_timestamp`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string
  - `markup_source`: string
- `failed_markups`: array of object
  - `xfdf_id`: string
  - `reason`: string

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents  **[OLDER VERSION - a newer path version exists below/above]**

**Find or create an Annotated Document**
Find or create an Annotated Document where markup may be added. Returns only WORKFLOW context markups for backward compatibility.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)
- `combined_xfdf` [query] boolean

Request body (application/json) (required):

- `item_id`: string (required)
- `item_type`: string (required)
- `attachment_id`: string
- `attachment_source`: string
- `internal_pdm_tool_data`: object
  - `file_key`: string
  - `file_format`: string
  - `file_locked`: boolean
  - `document_container_id`: string
  - `position_within_container`: string

Response 200 (application/json): object

- `viewer_doc_id`: string
- `markups`: array of object
  - `id`: string
  - `xfdf_id`: string
  - `markup_type`: string
  - `viewer_doc_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `updated_by_id`: string
  - `company_id`: string
  - `project_id`: string
  - `deleted`: boolean
  - `editable`: boolean
  - `xfdf`: string
  - `created_by_name`: string
  - `updated_by_name`: string
  - `created_by_vendor_id`: string
  - `created_by_vendor_name`: string
  - `page_number`: integer(int32)
  - `audit_transaction_timestamp`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string
  - `markup_source`: string
- `combined_xfdf`: string
- `permissions`: object
  - `file_locked`: boolean
  - `allowed_actions`: array of string
- `document`: object
  - `external_document_id`: string
  - `document_type`: string

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/viewer_documents/permissions  **[OLDER VERSION - a newer path version exists below/above]**

**Document Markup Permissions**
Returns the user permissions for the document specified in Procore-Document-Id header

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [path] string (required)

Response 200 (application/json): object

- `viewer_doc_id`: string
- `markups`: array of object
  - `id`: string
  - `xfdf_id`: string
  - `markup_type`: string
  - `viewer_doc_id`: string
  - `created_at`: string(date-time)
  - `updated_at`: string(date-time)
  - `created_by_id`: string
  - `updated_by_id`: string
  - `company_id`: string
  - `project_id`: string
  - `deleted`: boolean
  - `editable`: boolean
  - `xfdf`: string
  - `created_by_name`: string
  - `updated_by_name`: string
  - `created_by_vendor_id`: string
  - `created_by_vendor_name`: string
  - `page_number`: integer(int32)
  - `audit_transaction_timestamp`: string(date-time)
  - `markup_context`: string enum[WORKFLOW, WORKSPACE, PIN, NO_CONTEXT]
  - `group_id`: string
  - `pin_id`: string
  - `comment_id`: string
  - `document`: object
    - `external_document_id`: string
    - `document_type`: string
  - `markup_source`: string
- `combined_xfdf`: string
- `permissions`: object
  - `file_locked`: boolean
  - `allowed_actions`: array of string
- `document`: object
  - `external_document_id`: string
  - `document_type`: string

## Preprocess Company File

Resource id: `preprocess-company-file`. Raw spec: `../openapi-raw/preprocess-company-file.json`. Web: https://developers.procore.com/reference/rest/preprocess-company-file?version=latest

### GET /rest/v2.0/companies/{company_id}/file_processors/preprocess/{item_type}/{item_id}

**Retrieve pre-processed file metadata (company scope, v2)**
Company-level GET without project_id. Includes allowed_actions. Brotli compression is applied when requested via Accept-Encoding.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `item_type` [path] string (required) - Item type discriminator
- `item_id` [path] string (required) - Unique identifier of the item
- `attachment_id` [query] string - Optional Prostore attachment identifier
- `no_previews` [query] boolean - When true, omit image previews in the response

Response 200 (*/*): object


### POST /rest/v2.0/companies/{company_id}/file_processors/preprocess/{item_type}/{item_id}

**Trigger pre-processing for a file (company scope, v2)**
Company-level pre-process trigger without project_id in the path. Tools that require a project may return 400 from the service layer.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `item_type` [path] string (required) - Item type discriminator (e.g. document_revision, FileVersion)
- `item_id` [path] string (required) - Unique identifier of the item to pre-process
- `replace_existing` [query] boolean - When true, replace any existing pre-processed artifacts
- `attachment_id` [query] string - Optional Prostore attachment identifier
- `optimize` [query] boolean - When true, request optimization passes where supported

Response 200 (*/*): object


## Preprocess Project File

Resource id: `preprocess-project-file`. Raw spec: `../openapi-raw/preprocess-project-file.json`. Web: https://developers.procore.com/reference/rest/preprocess-project-file?version=latest

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/file_processors/preprocess/{item_type}/{item_id}

**Retrieve pre-processed file metadata (project scope, v2)**
Returns pre-processed document metadata in a v2 envelope with allowed_actions from the authenticated user's tool roles.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `item_type` [path] string (required) - Item type discriminator
- `item_id` [path] string (required) - Unique identifier of the item
- `attachment_id` [query] string - Optional Prostore attachment identifier
- `no_previews` [query] boolean - When true, omit image previews in the response

Response 200 (*/*): object


### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/file_processors/preprocess/{item_type}/{item_id}

**Trigger pre-processing for a file (project scope, v2)**
Creates a process to pre-process the document and upload to storage. Response uses the v2 data envelope; no permissions object on POST.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier of the company
- `project_id` [path] string (required) - Unique identifier of the project
- `item_type` [path] string (required) - Item type discriminator (e.g. document_revision, FileVersion)
- `item_id` [path] string (required) - Unique identifier of the item to pre-process
- `replace_existing` [query] boolean - When true, replace any existing pre-processed artifacts
- `attachment_id` [query] string - Optional Prostore attachment identifier
- `optimize` [query] boolean - When true, request optimization passes where supported

Response 200 (*/*): object


## Viewer Permissions

Resource id: `viewer-permissions`. Raw spec: `../openapi-raw/viewer-permissions.json`. Web: https://developers.procore.com/reference/rest/viewer-permissions?version=latest

### GET /rest/v1.0/companies/{company_id}/viewer-proxy/permissions

**Lists the App and Tool level permissions for the user**
Lists the App and Tool level permissions for the user

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required)
- `project_id` [query] string
- `item_type` [query] string
- `item_id` [query] string
- `recycled` [query] boolean

Response 200 (application/json): object

- `userId`: integer(int64)
- `username`: string
- `appLevelRole`: string enum[ROLE_ADMIN, ROLE_STANDARD, ROLE_READONLY, ROLE_NONE]
- `toolLevelRoles`: array of string enum[ROLE_VIEW, ROLE_EDIT_MARKUP, ROLE_VIEW_CHANGE_HISTORY, ROLE_EDIT_METADATA, ROLE_DOWNLOAD, ROLE_EDIT_PUBLIC_LAYERS, ROLE_EDIT_SHARED_MARKUP, ROLE_READ_ONLY]
- `fileLocked`: boolean
- `pdmToolData`: object
  - `file_key`: string
  - `file_format`: string
  - `file_locked`: boolean
  - `document_container_id`: string
  - `position_within_container`: string
- `email`: string
- `companyId`: string
- `projectId`: string
- `tool`: string enum[PDM, DOCUMENTS, SPECIFICATIONS, DRAWINGS]
- `vendorId`: integer(int64)
- `vendorName`: string
- `credentialsNonExpired`: boolean
- `accountNonExpired`: boolean
- `accountNonLocked`: boolean
- `enabled`: boolean

