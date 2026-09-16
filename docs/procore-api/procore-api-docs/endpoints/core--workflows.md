# Procore API: Workflows (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: Workflows)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Legacy - Workflow Activity Histories](#legacy-workflow-activity-histories) - versions 1.0
- [Legacy - Workflow Instances](#legacy-workflow-instances) - versions 1.0
- [Legacy - Workflow Permanent Logs](#legacy-workflow-permanent-logs) - versions 1.0
- [Workflow Bulk Replace Requests](#workflow-bulk-replace-requests) - versions 2.0
- [Workflow Instances](#workflow-instances) - versions 2.0
- [Workflow Instances (Bulk)](#workflow-instances-bulk) - versions 2.0
- [Workflow Instances (Flow Control)](#workflow-instances-flow-control) - versions 2.0
- [Workflow Instances (History)](#workflow-instances-history) - versions 2.0
- [Workflow Managers](#workflow-managers) - versions 2.0
- [Workflow Possible Assignees](#workflow-possible-assignees) - versions 2.0
- [Workflow Presets](#workflow-presets) - versions 2.0
- [Workflow Template Versions](#workflow-template-versions) - versions 2.0
- [Workflow Templates](#workflow-templates) - versions 2.0
- [Workflow Tools](#workflow-tools) - versions 2.0

## Legacy - Workflow Activity Histories

Resource id: `legacy---workflow-activity-histories`. Raw spec: `../openapi-raw/legacy---workflow-activity-histories.json`. Web: https://developers.procore.com/reference/rest/legacy---workflow-activity-histories?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v1.0/workflow_activity_histories

**List Workflow Activity Histories**
Return a list of activities performed for a workflow instance.
Identify the instance with `workflow_instance_id`, or with both `filters[workflowed_object_type]` and `filters[workflowed_object_id]` (the same object addressing used by Legacy Workflow Permanent Logs and Workflow Setup). When `workflow_instance_id` is present it is used and the object filters are ignored. Change-order object types also require `project_id`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `workflow_instance_id` [query] integer - Workflow Instance ID. Required unless both `filters[workflowed_object_type]` and `filters[workflowed_object_id]` are provided.
- `filters[workflowed_object_type]` [query] string - Tool or V1 class name of the workflowed object. Used with `filters[workflowed_object_id]` to locate the instance when `workflow_instance_id` is omitted.
- `filters[workflowed_object_id]` [query] integer - ID of the workflowed object. Used with `filters[workflowed_object_type]` to locate the instance when `workflow_instance_id` is omitted.
- `project_id` [query] integer - Project ID. Required when locating the instance with a change-order `filters[workflowed_object_type]` and no `workflow_instance_id`.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[created_at, -created_at] - Sort attribute. Prefix with `-` for descending order. Omit to keep the default ascending primary-key order. Use `sort=-created_at` for newest-first pagination (for example, panel "Show more" loads of older history).

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `43584`
- `attachments`: array of string - List of Attachment URLs
- `file_attachments`: array of object - List of file attachments with their identifying metadata
  - `id`: integer - Prostore File ID e.g. `12334`
  - `name`: string - File name e.g. `doc.pdf`
  - `url`: string - File download URL e.g. `http://www.example.com/`
- `assigned_to_id`: integer - Login Information ID of the user the activity is assigned to. e.g. `12345`
- `assigned_to_name`: string - Full Name of Contact for the assigned Login Information e.g. `Rahul Sharma`
- `bic_duration`: string - Ball In Court duration in days e.g. `2 days`
- `bic_start`: string(date-time) - Ball In Court started at e.g. `2017-10-23T21:39:40Z`
- `bic_end`: string(date-time) - Ball In Court ended at e.g. `2017-10-23T21:39:40Z`
- `comments`: string - Comments e.g. `Forwarding for review`
- `created_at`: string(date-time) - Created at e.g. `2017-10-23T21:39:40Z`
- `performed_by_id`: integer - Login Information ID of a Workflow User Role Login Information. e.g. `12345`
- `performed_by_name`: string - Full Name of Contact for Workflow User Role Login Information e.g. `12345`
- `updated_at`: string(date-time) - Updated at e.g. `2017-10-24T21:39:40Z`
- `workflow_activity_id`: integer - Workflow Activity ID e.g. `12345`
- `workflow_activity_name`: string - Workflow Activity Name e.g. `approve`
- `workflow_instance_id`: integer - Workflow Instance ID e.g. `12345`
- `workflow_user_role_id`: integer - Workflow User Role ID e.g. `12345`
- `workflow_user_role_name`: string - Workflow User Role Name e.g. `assignees`
- `workflow_state_id`: integer - Workflow State ID e.g. `12345`
- `workflow_state_name`: string - Workflow State Name e.g. `Under Review`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/workflow_activity_histories

**Create Workflow Activity History**
Perform a workflow activity. Workflows Instances transition between states when all required activities have been performed.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `workflow_instance_id` [query] integer (required) - Workflow Instance ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `workflow_activity_history`: object (required) - Workflow Activity History object
  - `workflow_activity_id`: integer (required) - Workflow Activity ID e.g. `12345`
  - `workflow_instance_id`: integer (required) - Workflow Instance ID e.g. `12345`
  - `workflow_user_role_id`: integer (required) - Workflow User Role ID e.g. `12345`
  - `performed_by_id`: integer (required) - Login Information ID of a Workflow User Role Login Information. e.g. `12345`
  - `comments`: string - Comments e.g. `Forwarding this for review`
  - `prostore_file_ids`: array of integer - IDs of previously uploaded Prostore Files to attach to this activity history.
  - `attachments`: array of string - Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments[]` as files.

Response 201 (application/json): object

- `id`: integer - ID e.g. `43584`
- `attachments`: array of string - List of Attachment URLs
- `file_attachments`: array of object - List of file attachments with their identifying metadata
  - `id`: integer - Prostore File ID e.g. `12334`
  - `name`: string - File name e.g. `doc.pdf`
  - `url`: string - File download URL e.g. `http://www.example.com/`
- `assigned_to_id`: integer - Login Information ID of the user the activity is assigned to. e.g. `12345`
- `assigned_to_name`: string - Full Name of Contact for the assigned Login Information e.g. `Rahul Sharma`
- `bic_duration`: string - Ball In Court duration in days e.g. `2 days`
- `bic_start`: string(date-time) - Ball In Court started at e.g. `2017-10-23T21:39:40Z`
- `bic_end`: string(date-time) - Ball In Court ended at e.g. `2017-10-23T21:39:40Z`
- `comments`: string - Comments e.g. `Forwarding for review`
- `created_at`: string(date-time) - Created at e.g. `2017-10-23T21:39:40Z`
- `performed_by_id`: integer - Login Information ID of a Workflow User Role Login Information. e.g. `12345`
- `performed_by_name`: string - Full Name of Contact for Workflow User Role Login Information e.g. `12345`
- `updated_at`: string(date-time) - Updated at e.g. `2017-10-24T21:39:40Z`
- `workflow_activity_id`: integer - Workflow Activity ID e.g. `12345`
- `workflow_activity_name`: string - Workflow Activity Name e.g. `approve`
- `workflow_instance_id`: integer - Workflow Instance ID e.g. `12345`
- `workflow_user_role_id`: integer - Workflow User Role ID e.g. `12345`
- `workflow_user_role_name`: string - Workflow User Role Name e.g. `assignees`
- `workflow_state_id`: integer - Workflow State ID e.g. `12345`
- `workflow_state_name`: string - Workflow State Name e.g. `Under Review`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workflow_activity_histories/{id}

**Show Workflow Activity History**
Get information about a Workflow Activity History.
Identify the parent instance with `workflow_instance_id`, or with both `filters[workflowed_object_type]` and `filters[workflowed_object_id]`. When `workflow_instance_id` is present it is used and the object filters are ignored. Change-order object types also require `project_id`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID
- `workflow_instance_id` [query] integer - Workflow Instance ID. Required unless both `filters[workflowed_object_type]` and `filters[workflowed_object_id]` are provided.
- `filters[workflowed_object_type]` [query] string - Tool or V1 class name of the workflowed object. Used with `filters[workflowed_object_id]` to locate the instance when `workflow_instance_id` is omitted.
- `filters[workflowed_object_id]` [query] integer - ID of the workflowed object. Used with `filters[workflowed_object_type]` to locate the instance when `workflow_instance_id` is omitted.
- `project_id` [query] integer - Project ID. Required when locating the instance with a change-order `filters[workflowed_object_type]` and no `workflow_instance_id`.
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - ID e.g. `43584`
- `attachments`: array of string - List of Attachment URLs
- `file_attachments`: array of object - List of file attachments with their identifying metadata
  - `id`: integer - Prostore File ID e.g. `12334`
  - `name`: string - File name e.g. `doc.pdf`
  - `url`: string - File download URL e.g. `http://www.example.com/`
- `assigned_to_id`: integer - Login Information ID of the user the activity is assigned to. e.g. `12345`
- `assigned_to_name`: string - Full Name of Contact for the assigned Login Information e.g. `Rahul Sharma`
- `bic_duration`: string - Ball In Court duration in days e.g. `2 days`
- `bic_start`: string(date-time) - Ball In Court started at e.g. `2017-10-23T21:39:40Z`
- `bic_end`: string(date-time) - Ball In Court ended at e.g. `2017-10-23T21:39:40Z`
- `comments`: string - Comments e.g. `Forwarding for review`
- `created_at`: string(date-time) - Created at e.g. `2017-10-23T21:39:40Z`
- `performed_by_id`: integer - Login Information ID of a Workflow User Role Login Information. e.g. `12345`
- `performed_by_name`: string - Full Name of Contact for Workflow User Role Login Information e.g. `12345`
- `updated_at`: string(date-time) - Updated at e.g. `2017-10-24T21:39:40Z`
- `workflow_activity_id`: integer - Workflow Activity ID e.g. `12345`
- `workflow_activity_name`: string - Workflow Activity Name e.g. `approve`
- `workflow_instance_id`: integer - Workflow Instance ID e.g. `12345`
- `workflow_user_role_id`: integer - Workflow User Role ID e.g. `12345`
- `workflow_user_role_name`: string - Workflow User Role Name e.g. `assignees`
- `workflow_state_id`: integer - Workflow State ID e.g. `12345`
- `workflow_state_name`: string - Workflow State Name e.g. `Under Review`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Legacy - Workflow Instances

Resource id: `legacy---workflow-instances`. Raw spec: `../openapi-raw/legacy---workflow-instances.json`. Web: https://developers.procore.com/reference/rest/legacy---workflow-instances?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v1.0/workflow_instances

**List Workflow Instances**
Return a list of workflow instances for a workflow. Any resource using workflow should have a workflow instance.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `filters[workflowed_object_id]` [query] integer - ID of the workflowed object. When supplied with `filters[workflowed_object_type]`, the pair is resolved to the stored V1 workflow instance.
- `filters[workflowed_object_type]` [query] string - Tool or V1 class name of the workflowed object. When supplied with `filters[workflowed_object_id]`, V2 tool names are resolved to the stored V1 workflowed object type.
- `project_id` [query] integer - Project ID. Required when resolving a change-order workflowed object.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `43584`
- `becomes_overdue_at`: string(date-time) - Workflowed Object is considered overdue after e.g. `2016-10-23T21:39:40Z`
- `current_state_set_at`: string(date-time) - Workflow entered the current state at e.g. `2016-10-23T21:39:40Z`
- `workflowed_object_id`: integer - Workflowed Object ID e.g. `43584`
- `workflowed_object_type`: string - The Type of the Workflowed Object e.g. `WorkOrderContract`
- `project`: object
  - `name`: string - Name of the associated project e.g. `Example Project`
  - `id`: integer - Unique identifier for the project. e.g. `43584`
- `current_workflow_activities`: array of object
  - `id`: integer - ID e.g. `43584`
  - `name`: string - Name e.g. `Approve`
  - `workflow_user_role`: object - Workflow User Role
    - `id`: integer - ID e.g. `43584`
    - `name`: string - Name e.g. `Project Manager`
    - `assignee`: object - Assignee
  - `perform_activity`: object - Endpoint to perform Workflow Activities
    - `url`: string - URL to perform the Workflow Activity e.g. `https://app.procore.com/rest/v1.0/workflow_activity_histories?`
    - `method`: string - HTTP Method with which to request the URL e.g. `POST`
    - `data`: object - JSON to be submitted as the request body
- `current_workflow_state`: object - Workflow State
  - `id`: integer - ID e.g. `43584`
  - `name`: string - Name e.g. `Under Review`
  - `status`: string - Human-readable status. In the Show response (GET /workflow_instances/{id}) this uses the workflowed object's status text when available, otherwise the workflow state's status. The list endpoint returns the workflow st... e.g. `Draft`
  - `ball_in_court`: array of object - Users the workflow is currently waiting on to act. Computed per instance, so each item in a list response carries its own set.
    - `name`: string - First, last and company name of the user e.g. `Peter Pan (Neverland Inc.)`
- `workflow`: object - Workflow
  - `id`: integer - ID e.g. `43584`
  - `name`: string - Name e.g. `Subcontract Workflow`
  - `description`: string - Description e.g. `Workflow for Subcontracts < 10M`
  - `class_name`: string - Class Name e.g. `WorkOrderContract`
  - `friendly_name`: string - Human-readable name of the workflowed object's type. e.g. `Contract`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Created at e.g. `2012-11-28T18:11:03Z`
  - `domain`: string - Domain name
- `terminated_at`: string(date-time) - When this workflow instance was terminated. Present after a successful terminate request; otherwise null. Matches `archived_at` on the instance. e.g. `2016-10-23T21:39:40Z`
- `terminated_by`: object - User who terminated the workflow instance
  - `id`: integer - ID of the user who terminated the workflow e.g. `1`
  - `login`: string - Login/email of the user who terminated the workflow e.g. `abc@example.com`
  - `name`: string - Name of the user who terminated the workflow e.g. `Customer Support`
- `permissions`: object - Permissions of the requesting user against this workflow instance. Computed independently for each instance in list and show responses. Two instances in the same list can therefore return different flags for the same ...
  - `can_view`: boolean - Whether the user can view this workflow instance. True when the user is a company directory admin (company-scoped GET /workflow_instances), passes the workflowed object's VisiblePolicy (project-scoped GET /projects/{p... e.g. `true`
  - `can_respond`: boolean - Whether the user can respond to the current state. False for an archived instance. Otherwise true when the user is a company directory admin (REST POST /workflow_activity_histories), is a tool/domain admin for the wor... e.g. `true`
  - `can_act_on_behalf_of`: boolean - Whether the user can act on behalf of an assignee on the current state. Matches legacy UI: true when the user is a tool/domain admin for the workflowed object and satisfies the company's WorkflowAdminOverride settings... e.g. `false`
  - `can_terminate`: boolean - Whether the user can terminate this legacy workflow instance. True when the instance is not already archived and the user is a tool/domain admin for the workflowed object who satisfies the company's WorkflowAdminOverr... e.g. `false`
  - `can_restart`: boolean - Whether this V1 instance can be replaced by a new V2 instance for the filters[workflowed_object_type] and filters[workflowed_object_id] supplied to the Show request. This verifies V1 termination permission, the V1-to-... e.g. `false`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/workflow_instances/{id}

**Show Workflow Instance**
Get information about a Workflow Instance. By default, `id` identifies the workflow instance. Alternatively, supply both `filters[workflowed_object_type]` and `filters[workflowed_object_id]` to resolve the instance from its workflowed object. The complete filter pair takes precedence over `id`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Workflow Instance ID. When both workflowed object filters are supplied, those filters identify the instance and this path value is ignored; object-addressed callers should provide the workflowed object ID here.
- `filters[workflowed_object_type]` [query] string - Tool or V1 class name of the workflowed object. Supply with filters[workflowed_object_id] to resolve the instance and evaluate permissions.can_restart.
- `filters[workflowed_object_id]` [query] integer - ID of the workflowed object. Supply with filters[workflowed_object_type] to resolve the instance and evaluate permissions.can_restart.
- `project_id` [query] integer - Project ID. Required when resolving a change-order workflowed object.

Response 200 (application/json): object

- `id`: integer - ID e.g. `43584`
- `becomes_overdue_at`: string(date-time) - Workflowed Object is considered overdue after e.g. `2016-10-23T21:39:40Z`
- `current_state_set_at`: string(date-time) - Workflow entered the current state at e.g. `2016-10-23T21:39:40Z`
- `workflowed_object_id`: integer - Workflowed Object ID e.g. `43584`
- `workflowed_object_type`: string - The Type of the Workflowed Object e.g. `WorkOrderContract`
- `project`: object
  - `name`: string - Name of the associated project e.g. `Example Project`
  - `id`: integer - Unique identifier for the project. e.g. `43584`
- `current_workflow_activities`: array of object
  - `id`: integer - ID e.g. `43584`
  - `name`: string - Name e.g. `Approve`
  - `workflow_user_role`: object - Workflow User Role
    - `id`: integer - ID e.g. `43584`
    - `name`: string - Name e.g. `Project Manager`
    - `assignee`: object - Assignee
  - `perform_activity`: object - Endpoint to perform Workflow Activities
    - `url`: string - URL to perform the Workflow Activity e.g. `https://app.procore.com/rest/v1.0/workflow_activity_histories?`
    - `method`: string - HTTP Method with which to request the URL e.g. `POST`
    - `data`: object - JSON to be submitted as the request body
- `current_workflow_state`: object - Workflow State
  - `id`: integer - ID e.g. `43584`
  - `name`: string - Name e.g. `Under Review`
  - `status`: string - Human-readable status. In the Show response (GET /workflow_instances/{id}) this uses the workflowed object's status text when available, otherwise the workflow state's status. The list endpoint returns the workflow st... e.g. `Draft`
  - `ball_in_court`: array of object - Users the workflow is currently waiting on to act. Computed per instance, so each item in a list response carries its own set.
    - `name`: string - First, last and company name of the user e.g. `Peter Pan (Neverland Inc.)`
- `workflow`: object - Workflow
  - `id`: integer - ID e.g. `43584`
  - `name`: string - Name e.g. `Subcontract Workflow`
  - `description`: string - Description e.g. `Workflow for Subcontracts < 10M`
  - `class_name`: string - Class Name e.g. `WorkOrderContract`
  - `friendly_name`: string - Human-readable name of the workflowed object's type. e.g. `Contract`
  - `created_at`: string(date-time) - Created at e.g. `2012-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Created at e.g. `2012-11-28T18:11:03Z`
  - `domain`: string - Domain name
- `terminated_at`: string(date-time) - When this workflow instance was terminated. Present after a successful terminate request; otherwise null. Matches `archived_at` on the instance. e.g. `2016-10-23T21:39:40Z`
- `terminated_by`: object - User who terminated the workflow instance
  - `id`: integer - ID of the user who terminated the workflow e.g. `1`
  - `login`: string - Login/email of the user who terminated the workflow e.g. `abc@example.com`
  - `name`: string - Name of the user who terminated the workflow e.g. `Customer Support`
- `permissions`: object - Permissions of the requesting user against this workflow instance. Computed independently for each instance in list and show responses. Two instances in the same list can therefore return different flags for the same ...
  - `can_view`: boolean - Whether the user can view this workflow instance. True when the user is a company directory admin (company-scoped GET /workflow_instances), passes the workflowed object's VisiblePolicy (project-scoped GET /projects/{p... e.g. `true`
  - `can_respond`: boolean - Whether the user can respond to the current state. False for an archived instance. Otherwise true when the user is a company directory admin (REST POST /workflow_activity_histories), is a tool/domain admin for the wor... e.g. `true`
  - `can_act_on_behalf_of`: boolean - Whether the user can act on behalf of an assignee on the current state. Matches legacy UI: true when the user is a tool/domain admin for the workflowed object and satisfies the company's WorkflowAdminOverride settings... e.g. `false`
  - `can_terminate`: boolean - Whether the user can terminate this legacy workflow instance. True when the instance is not already archived and the user is a tool/domain admin for the workflowed object who satisfies the company's WorkflowAdminOverr... e.g. `false`
  - `can_restart`: boolean - Whether this V1 instance can be replaced by a new V2 instance for the filters[workflowed_object_type] and filters[workflowed_object_id] supplied to the Show request. This verifies V1 termination permission, the V1-to-... e.g. `false`

Error responses: 400 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Legacy - Workflow Permanent Logs

Resource id: `legacy---workflow-permanent-logs`. Raw spec: `../openapi-raw/legacy---workflow-permanent-logs.json`. Web: https://developers.procore.com/reference/rest/legacy---workflow-permanent-logs?version=latest
Product lines: PM Essentials, Construction Financials

### GET /rest/v1.0/companies/{company_id}/workflow_permanent_logs

**List Workflow Permanent Logs**
Return a list of workflow permanent logs. Any resource using workflow should have log of activities and events related to the workflow.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[workflowed_object_type]` [query] string (required) - Filter log(s) with matching workflowed object type
- `filters[workflowed_object_id]` [query] integer (required) - Filter log(s) with matching workflowed object id

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `43584`
- `activity`: string - Name of the activity logged e.g. `Approved`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `ball_in_court_duration`: string - How long the assignee was responsible prior to acting e.g. `3 days`
- `comments`: string - Comments provided by the assignee when acting in the workflow e.g. `I approve the changes`
- `created_at`: string(date-time) - Log recorded at e.g. `2016-10-23T21:39:40Z`
- `performed_by`: string - Name of the user performing the activity e.g. `First Name, Last Name (Company)`
- `user_role`: string - Name of the workflow role e.g. `Project Manager`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/workflow_permanent_logs  **[OLDER VERSION - a newer path version exists below/above]**

**List Workflow Permanent Logs**
Return a list of workflow permanent logs. Any resource using workflow should have log of activities and events related to the workflow.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[workflowed_object_type]` [query] string (required) - Filter log(s) with matching workflowed object type
- `filters[workflowed_object_id]` [query] integer (required) - Filter log(s) with matching workflowed object id

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `43584`
- `activity`: string - Name of the activity logged e.g. `Approved`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `ball_in_court_duration`: string - How long the assignee was responsible prior to acting e.g. `3 days`
- `comments`: string - Comments provided by the assignee when acting in the workflow e.g. `I approve the changes`
- `created_at`: string(date-time) - Log recorded at e.g. `2016-10-23T21:39:40Z`
- `performed_by`: string - Name of the user performing the activity e.g. `First Name, Last Name (Company)`
- `user_role`: string - Name of the workflow role e.g. `Project Manager`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Bulk Replace Requests

Resource id: `workflow-bulk-replace-requests`. Raw spec: `../openapi-raw/workflow-bulk-replace-requests.json`. Web: https://developers.procore.com/reference/rest/workflow-bulk-replace-requests?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/workflows/bulk_replace_requests

**List Workflow Bulk Replace Requests**
Returns a list of workflows bulk replace requests.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `filters[status]` [query] array of string enum[active, completed, expired, failed, processing, stopped, upcoming] - Filter bulk replace requests with matching status.
- `filters[old_assignee_ids]` [query] array of integer - Filter bulk replace requests with any of the matching old assignees.
- `filters[new_assignee_ids]` [query] array of integer - Filter bulk replace requests with any of the matching new assignees.
- `filters[updated_by_id]` [query] array of integer - Filter bulk replace requests with any of the matching updated by users.
- `filters[type]` [query] array of string enum[temporary, permanent] - Filter bulk replace requests by replacement type (temporary or permanent).
- `filters[start_date]` [query] string - Filter bulk replace requests by start date range. Format: ISO 8601 date range "YYYY-MM-DD...YYYY-MM-DD".
- `filters[end_date]` [query] string - Filter bulk replace requests by end date range. Format: ISO 8601 date range "YYYY-MM-DD...YYYY-MM-DD".
- `sort` [query] string - Sort the results by specified fields. Supported fields: updated_by, status, old_assignee, updated_at, start_date, end_date, type
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - List of workflow bulk replace requests
  - `id`: string - ID of the bulk replace request e.g. `257`
  - `status`: string - Status of the bulk replace request e.g. `completed`
  - `replacement_type`: string - Replacement Type of the bulk replace request e.g. `temporary`
  - `old_assignee`: object - The old assignee to be replaced by the bulk replace request
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `new_assignees`: array of object - List of new assignees requested to replace the old assignee
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `new_workflow_manager`: object - Login Information
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `start_date`: string(date) - Date the bulk replace request will start (only applies to requests with temporary replacement_type) e.g. `2018-04-20`
  - `end_date`: string(date) - Date the bulk replace request will end (only applies to requests with temporary replacement_type) e.g. `2018-04-28`
  - `modify_project_roles`: boolean - Whether the bulk replace request should replace the assignees for project roles e.g. `true`
  - `project_ids`: array of string - List of project ids within which the bulk replace request will be applied (empty list means all projects)
  - `tools`: array of object - List of tools to which the bulk replace request will be applied (empty list means all tools)
    - `type`: string - The type of tool e.g. `GenericToolItem`
    - `sub_type`: string - The sub type of the tool e.g. `-5193`
  - `stopped_at`: string(date-time) - When the bulk replace request was stopped e.g. `2018-04-20T16:20:57Z`
  - `created_at`: string(date-time) - Date created e.g. `2018-04-20T16:20:57Z`
  - `created_by`: object - Login Information
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `updated_at`: string(date-time) - Date updated e.g. `2018-04-20T16:20:57Z`
  - `updated_by`: object - Login Information
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `has_errors`: boolean - Whether the bulk replace request has encountered errors e.g. `false`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/bulk_replace_requests

**Create Workflow Bulk Replace Request**
Creates a new workflows bulk replace request to replace assignees across workflow instances.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `replacement_type`: string enum[temporary, permanent] (required) - Type of replacement (temporary or permanent)
- `old_assignee_id`: string (required) - ID of the assignee to be replaced
- `new_assignee_ids`: array of string (required) - Array of IDs for new assignees
- `new_workflow_manager_id`: string - ID of the new workflow manager (optional)
- `start_date`: string(date) - Start date for temporary replacements
- `end_date`: string(date) - End date for temporary replacements
- `modify_project_roles`: boolean (required) - Whether to modify project roles during replacement
- `reason`: string (required) - Reason for the replacement
- `project_ids`: array of string - Array of project IDs to limit replacement scope (optional)
- `tools`: array of object - Array of tool configurations to limit replacement scope (optional)
  - `type`: string - Tool type
  - `sub_type`: string - Tool sub-type

Response 202 (application/json): object

- `data`: object
  - `bulk_replace_request_id`: string - ID of the created bulk replace request
  - `operation_id`: string - ID of the background operation processing the request

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/bulk_replace_requests/{id}

**Show Workflow Bulk Replace Request**
Returns a workflows bulk replace request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow bulk replace request.

Response 200 (application/json): object

- `data`: object - Workflow bulk replace request
  - `id`: string - ID of the bulk replace request e.g. `257`
  - `status`: string - Status of the bulk replace request e.g. `completed`
  - `replacement_type`: string - Replacement Type of the bulk replace request e.g. `temporary`
  - `old_assignee`: object - Login Information
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `new_assignees`: array of object - List of new assignees requested to replace the old assignee
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `new_workflow_manager`: object - Login Information
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `start_date`: string(date) - Date the bulk replace request will start (only applies to requests with temporary replacement_type) e.g. `2018-04-20`
  - `end_date`: string(date) - Date the bulk replace request will end (only applies to requests with temporary replacement_type) e.g. `2018-04-28`
  - `modify_project_roles`: boolean - Whether the bulk replace request should replace the assignees for project roles e.g. `true`
  - `project_ids`: array of string - List of project ids within which the bulk replace request will be applied (empty list means all projects)
  - `tools`: array of object - List of tools that share the same bulk replace request error for the same project or company
    - `type`: string - The type of tool e.g. `GenericToolItem`
    - `sub_type`: string - The sub type of the tool e.g. `-5193`
  - `stopped_at`: string(date-time) - When the bulk replace request was stopped e.g. `2018-04-20T16:20:57Z`
  - `created_at`: string(date-time) - Date created e.g. `2018-04-20T16:20:57Z`
  - `created_by`: object - Login Information
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `updated_at`: string(date-time) - Date updated e.g. `2018-04-20T16:20:57Z`
  - `updated_by`: object - Login Information
    - `id`: string - Login Information ID e.g. `1738090`
    - `name`: string - User name e.g. `John Doe`
    - `login`: string - User email e.g. `johndoe@example.com`
  - `errors`: array of object - Errors that were occurred for the bulk replace request
    - `tools`: array of object - List of tools that share the same bulk replace request error for the same project or company
    - `provider_name`: string - Name of the provider (company or project) on which the error occurred e.g. `6749`
    - `project_id`: string - ID of the project on which the error occurred e.g. `6749`
    - `user_ids`: array of string
    - `error_type`: string - Type of error which occurred for the bulk replace request e.g. `Permission issue`
    - `error_message`: string - Message describing the error which occurred for the bulk replace request e.g. `Bob, Mary, and Tom does not have permission to access the Documents tool.`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v2.0/companies/{company_id}/workflows/bulk_replace_requests/{id}

**Update Workflow Bulk Replace Request**
Updates an existing workflows bulk replace request. This API validates the input, updates the request record in the DB, and creates a new async operation record. The request must be temporary to be updated. The replacement type and original assignee cannot be changed. This API will queue another async operation even if the update does not introduce any changes, effectively "retrying" a request that previously contained errors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow bulk replace request.

Request body (application/json):

- `new_assignee_ids`: array of string - Array of IDs for new assignees
- `new_workflow_manager_id`: string - ID of the new workflow manager (optional)
- `start_date`: string(date) - Start date for temporary replacements
- `end_date`: string(date) - End date for temporary replacements
- `modify_project_roles`: boolean - Whether to modify project roles during replacement
- `reason`: string - Reason for the replacement
- `project_ids`: array of string - Array of project IDs to limit replacement scope (optional)
- `tools`: array of object - Array of tool configurations to limit replacement scope (optional)
  - `type`: string - Tool type
  - `sub_type`: string - Tool sub-type

Response 202 (application/json): object

- `data`: object
  - `bulk_replace_request_id`: string - ID of the updated bulk replace request
  - `operation_id`: string - ID of the background operation processing the request

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/workflows/bulk_replace_requests/{id}

**Stop Temporary Workflow Bulk Replace Request**
Stops an existing temporary bulk replace request.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow bulk replace request.

Response 202 (application/json): object

- `data`: object
  - `operation_id`: string - ID of the background operation processing the request

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/bulk_replace_requests/{id}/errors

**Download Bulk Replace Request Errors CSV**
Downloads a CSV file containing the errors for a bulk replace request. The CSV includes project or company information, tool details, error types, and error messages.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow bulk replace request.
- `Accept` [header] string enum[text/csv] (required) - Must be set to text/csv for CSV download

Response 200 (text/csv): string(binary)


Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Instances

Resource id: `workflow-instances`. Raw spec: `../openapi-raw/workflow-instances.json`. Web: https://developers.procore.com/reference/rest/workflow-instances?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances

**List Workflow Instances (Project)**
Returns a list of workflow instances for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `filters[tool_type]` [query] string (required) - Filter instances with matching tool type.
- `filters[tool_subtype]` [query] integer - Filter instances by tool subtype. Required when tool_type is 'correspondence'.
- `filters[item_id]` [query] string - Filter instances with matching item id.
- `filters[assignee_id]` [query] string - Filter instances with matching current assignee.
- `filters[active]` [query] boolean - Return only instances that are active.
- `filters[overdue]` [query] boolean - Return only instances whose next workflow step is overdue.
- `include_internal` [query] boolean - Include internal workflow instances when true. Defaults to false when omitted.
- `per_page` [query] integer - Elements per page
- `cursor` [query] string - Cursor location where the returned list of items are before or after this cursor location. Cursor pagination is used by default. Cannot be combined with the `page` parameter.
- `page` [query] integer - Page number for page-based pagination. When provided, page-based pagination is used instead of the default cursor pagination. Cannot be combined with the `cursor` parameter.

Response 200 (application/json): object

- `data`: array of object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `43584`
  - `item_id`: string - The associated item's ID e.g. `2387`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence) e.g. `-873`
  - `tool_type`: string - The type of the associated tool e.g. `correspondence`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances

**Create a Workflow Instance (Project Public)**
Creates a new workflow instance for a given project. The template_id and preset_id options can be used to specify a specific template. If neither are specified, the default preset will be used. If both are specified, the preset_id will be used.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `tool_type`: string (required) - The type of tool for the workflow instance. e.g. `generic_tool_item`
- `tool_subtype`: string - The subtype of the tool. Required when tool_type is 'correspondence'. e.g. `-123`
- `item_id`: string (required) - The ID of the item to associate with the workflow instance. e.g. `483`
- `template_id`: string - Optional. Specific template ID to use for the workflow instance. e.g. `534`
- `preset_id`: string - Optional. Specific preset ID to use for the workflow instance. Takes precedence over template_id if both are provided. e.g. `876`

Response 201 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/instances

**List Workflow Instances (Company)**
Returns a list of workflow instances for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `filters[tool_type]` [query] string (required) - Filter instances with matching tool type.
- `filters[tool_subtype]` [query] integer - Filter instances by tool subtype. Required when tool_type is 'correspondence'.
- `filters[item_id]` [query] string - Filter instances with matching item id.
- `filters[assignee_id]` [query] string - Filter item(s) with matching current assignee.
- `filters[active]` [query] boolean - Return only items that are active.
- `filters[overdue]` [query] boolean - Return only items whose next workflow step is overdue.
- `include_internal` [query] boolean - Include internal workflow instances when true. Defaults to false when omitted.
- `per_page` [query] integer - Elements per page
- `cursor` [query] string - Cursor location where the returned list of items are before or after this cursor location. Cursor pagination is used by default. Cannot be combined with the `page` parameter.
- `page` [query] integer - Page number for page-based pagination. When provided, page-based pagination is used instead of the default cursor pagination. Cannot be combined with the `cursor` parameter.

Response 200 (application/json): object

- `data`: array of object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `43584`
  - `item_id`: string - The associated item's ID e.g. `2387`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence) e.g. `-873`
  - `tool_type`: string - The type of the associated tool e.g. `correspondence`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances

**Create a Workflow Instance (Company Public)**
Creates a new workflow instance for a given company. The template_id and preset_id options can be used to specify a specific template. If neither are specified, the default preset will be used. If both are specified, the preset_id will be used.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `tool_type`: string (required) - The type of tool for the workflow instance. e.g. `generic_tool_item`
- `tool_subtype`: string (required) - The subtype of the tool. Required when tool_type is 'correspondence'. e.g. `-123`
- `item_id`: string (required) - The ID of the item to associate with the workflow instance. e.g. `483`
- `template_id`: string - Optional. Specific template ID to use for the workflow instance. e.g. `534`
- `preset_id`: string - Optional. Specific preset ID to use for the workflow instance. Takes precedence over template_id if both are provided. e.g. `876`

Response 201 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/{id}

**Get a Workflow Instance (Project)**
Returns a single instance for a given project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/instances/{id}

**Get a Workflow Instance (Company)**
Returns a single workflow instance for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/{id}/responses

**Respond to a Workflow Instance (Project)**
Submit a response for the current step of a workflow instance.
**Idempotency:** If the user has already submitted a response for the current step, the behavior depends on whether the resubmitted payload matches the original:
- **Identical resubmission** (same response option and comment): returns 204 No Content
  as a successful no-op, making the operation safe to retry.
- **Conflicting resubmission** (different response option or comment): returns 422
  Unprocessable Entity, since the response has already been recorded with different values.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique identifier for the project.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the resource.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (application/json):

- `response`: object (required) - The response object
  - `current_step_occurrence_id`: string (required) - ID of the current step occurrence e.g. `1`
  - `selected_response_option_id`: string (required) - ID of the selected response option e.g. `2000`
  - `comment`: string - A note about this response e.g. `A note about this response`
  - `attachments`: object (required) - Attachments associated with this response
    - `prostore_file_ids`: array of string - List of Procore Store file IDs
    - `drawing_revision_ids`: array of string - List of drawing revision IDs
    - `file_version_ids`: array of string - List of file version IDs
    - `form_ids`: array of string - List of form IDs
    - `image_ids`: array of string - List of image IDs
    - `upload_ids`: array of string - List of upload IDs

Response 204: No Content. The response was recorded successfully, or an identical resubmission was accepted as a no-op. (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances/{id}/responses

**Respond to a Workflow Instance (Company)**
Submit a response for the current step of a workflow instance.
**Idempotency:** If the user has already submitted a response for the current step, the behavior depends on whether the resubmitted payload matches the original:
- **Identical resubmission** (same response option and comment): returns 204 No Content
  as a successful no-op, making the operation safe to retry.
- **Conflicting resubmission** (different response option or comment): returns 422
  Unprocessable Entity, since the response has already been recorded with different values.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the resource.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (application/json):

- `response`: object (required) - The response object
  - `current_step_occurrence_id`: string (required) - ID of the current step occurrence e.g. `1`
  - `selected_response_option_id`: string (required) - ID of the selected response option e.g. `2000`
  - `comment`: string - A note about this response e.g. `A note about this response`
  - `attachments`: object (required) - Attachments associated with this response
    - `prostore_file_ids`: array of string - List of Procore Store file IDs
    - `drawing_revision_ids`: array of string - List of drawing revision IDs
    - `file_version_ids`: array of string - List of file version IDs
    - `form_ids`: array of string - List of form IDs
    - `image_ids`: array of string - List of image IDs
    - `upload_ids`: array of string - List of upload IDs

Response 204: No Content. The response was recorded successfully, or an identical resubmission was accepted as a no-op. (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/{id}/additional_assignees

**Add Additional Assignees to a Workflow Instance (Project)**
Adds additional assignees to a step occurrence on a project workflow instance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Request body (application/json) (required):

- `step_occurrence_id`: string (required) - The ID of the step occurrence to add assignees to. e.g. `123`
- `required`: boolean (required) - Whether the additional assignees are required to respond. e.g. `true`
- `role_type`: string enum[responder, commenter] - Role applied to the additional assignees on the step. Defaults to responder when omitted. e.g. `responder`
- `reason`: string enum[new_employee, original_assignee_left_company, original_assignee_left_the_project, original_assignee_on_extended_leave, original_assignee_on_vacation, other] (required) - The reason for adding the additional assignees. e.g. `new_employee`
- `comment`: string - Optional comment about this invitation. e.g. `A note about this invitation`
- `message`: string - Optional message to send to the assignees. e.g. `You've been assigned to a workflow`
- `assignee_ids`: array of string (required) - List of user IDs to add as additional assignees. e.g. `["8", "42", "79"]`

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances/{id}/additional_assignees

**Add Additional Assignees to a Workflow Instance (Company)**
Adds additional assignees to a step occurrence on a company workflow instance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Request body (application/json) (required):

- `step_occurrence_id`: string (required) - The ID of the step occurrence to add assignees to. e.g. `123`
- `required`: boolean (required) - Whether the additional assignees are required to respond. e.g. `true`
- `role_type`: string enum[responder, commenter] - Role applied to the additional assignees on the step. Defaults to responder when omitted. e.g. `responder`
- `reason`: string enum[new_employee, original_assignee_left_company, original_assignee_left_the_project, original_assignee_on_extended_leave, original_assignee_on_vacation, other] (required) - The reason for adding the additional assignees. e.g. `new_employee`
- `comment`: string - Optional comment about this invitation. e.g. `A note about this invitation`
- `message`: string - Optional message to send to the assignees. e.g. `You've been assigned to a workflow`
- `assignee_ids`: array of string (required) - List of user IDs to add as additional assignees. e.g. `["8", "42", "79"]`

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Instances (Bulk)

Resource id: `workflow-instances-bulk`. Raw spec: `../openapi-raw/workflow-instances-bulk.json`. Web: https://developers.procore.com/reference/rest/workflow-instances-bulk?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/bulk_create

**Bulk Create Workflow Instances (Project) (Public)**
Asynchronously bulk create workflow instances for a list of project-level items. If an active instance already exists for an item, a failure will be returned for that item.
The returned async operation id can be used to query for status using the [`GET /rest/v2.0/companies/{company_id}/async_operations/{operation_id}`](https://developers.procore.com/reference/rest/operations?version=latest#get-operation-details) API. The result field of the operation contains a list of completed and failed items.
For example:
````json
{
  "completed_items": [
    {
      "item_id": "123",
      "instance_id": "456"
    }
  ],
  "failed_items": [
    {
      "item_id": "789",
      "step": "create",
      "message": "Item not found"
    }
  ]
}
````

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (application/json):

- `tool_type`: string (required) - Tool that instances are being created for. e.g. `drawing`
- `tool_subtype`: string - Tool sub-type. Only required for specific tools. e.g. `-18472`
- `items`: array of object (required) - List of objects to create workflow instances for.
  - `item_id`: string - ID of the item to create the workflow for. e.g. `9238237`
  - `preset_id`: string - ID of the workflow configuration to use when creating the workflow. e.g. `328274`

Response 202 (application/json): object

- `data`: object - Result of the bulk creation request
  - `operation_id`: string - ID of the asynchronous operation e.g. `115654`
  - `operation_type`: string - Type of the asynchronous operation e.g. `workflows_instance_bulk_create`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances/bulk_create

**Bulk Create Workflow Instances (Company) (Public)**
Asynchronously bulk create workflow instances for a list of company-level items. If an active instance already exists for an item, a failure will be returned for that item.
The returned async operation id can be used to query for status using the [`GET /rest/v2.0/companies/{company_id}/async_operations/{operation_id}`](https://developers.procore.com/reference/rest/operations?version=latest#get-operation-details) API. The result field of the operation contains a list of completed and failed items.
For example:
````json
{
  "completed_items": [
    {
      "item_id": "123",
      "instance_id": "456"
    }
  ],
  "failed_items": [
    {
      "item_id": "789",
      "step": "create",
      "message": "Item not found"
    }
  ]
}
````

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (application/json):

- `tool_type`: string (required) - Tool that instances are being created for. e.g. `drawing`
- `tool_subtype`: string - Tool sub-type. Only required for specific tools. e.g. `-18472`
- `items`: array of object (required) - List of objects to create workflow instances for.
  - `item_id`: string - ID of the item to create the workflow for. e.g. `9238237`
  - `preset_id`: string - ID of the workflow configuration to use when creating the workflow. e.g. `328274`

Response 202 (application/json): object

- `data`: object - Result of the bulk creation request
  - `operation_id`: string - ID of the asynchronous operation e.g. `115654`
  - `operation_type`: string - Type of the asynchronous operation e.g. `workflows_instance_bulk_create`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Instances (Flow Control)

Resource id: `workflow-instances-flow-control`. Raw spec: `../openapi-raw/workflow-instances-flow-control.json`. Web: https://developers.procore.com/reference/rest/workflow-instances-flow-control?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/{id}/restart

**Restart a Workflow Instance (Project)**
Terminates the current instance and restarts a new instance from the beginning. Returns the new instance information.
**Idempotency:** If the instance has already been restarted (i.e., it is already terminated and an active sibling instance exists), the endpoint returns 200 OK with the previously created instance instead of creating a duplicate. This makes the operation safe to retry.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Request body (application/json):

- `restart_mode`: string enum[defaults, current_configuration] - Controls how the new workflow instance is configured. `defaults` uses the current company/project preset configuration. `current_configuration` uses the terminated instance's configuration (assignees, steps, workflow ...

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances/{id}/restart

**Restart a Workflow Instance (Company)**
Terminates the current instance and restarts a new instance from the beginning. Returns the new instance information.
**Idempotency:** If the instance has already been restarted (i.e., it is already terminated and an active sibling instance exists), the endpoint returns 200 OK with the previously created instance instead of creating a duplicate.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Request body (application/json):

- `restart_mode`: string enum[defaults, current_configuration] - Controls how the new workflow instance is configured. `defaults` uses the current company/project preset configuration. `current_configuration` uses the terminated instance's configuration (assignees, steps, workflow ...

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/{id}/refresh

**Refresh a Workflow Instance (Project)**
Refreshes and retries a blocked project workflow instance. Updates role assignees and retries failed steps.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances/{id}/refresh

**Refresh a Workflow Instance (Company)**
Refreshes and retries a blocked company workflow instance. Updates role assignees and retries failed steps.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/{id}/terminate

**Terminate a Workflow Instance (Project) (Public)**
Terminates the instance.
**Idempotency:** If the instance is already terminated, the endpoint returns 200 OK with the current instance state without modifying it.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances/{id}/terminate

**Terminate a Workflow Instance (Company) (Public)**
Terminates the instance.
**Idempotency:** If the instance is already terminated, the endpoint returns 200 OK with the current instance state without modifying it.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow instance.

Response 200 (application/json): object

- `data`: object - Workflow instance details
  - `id`: string - Unique identifier for the workflow instance e.g. `123`
  - `tool_type`: string - The type of the associated tool e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of the associated tool (used for correspondence)
  - `item_id`: string - The associated item's ID e.g. `123`
  - `created_at`: string(date-time) - Date when the instance was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the instance was last updated e.g. `2018-04-20T16:20:57Z`
  - `started_at`: string(date-time) - Date when the instance was started e.g. `2018-04-20T16:20:57Z`
  - `ended_at`: string(date-time) - Date when the instance ended e.g. `2018-05-20T16:20:57Z`
  - `current_step_occurrence`: object - Details of the current workflow step
    - `id`: string - Unique identifier for the step occurrence e.g. `123`
    - `step_uuid`: string - UUID of the current step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the current step e.g. `Architectural Review`
    - `started_at`: string(date-time) - Date when the step was started e.g. `2018-04-20T16:20:57Z`
    - `overdue_at`: string(date-time) - Date when the step became overdue e.g. `2018-04-20T16:20:57Z`
    - `step_histories`: array of object - History of assignee replacements for this step occurrence
    - `available_response_options`: array of object - List of available response options for the step
    - `individual_assignees`: array of object - Individual assignees for the current step, filtered by step UUID and enriched with login information
    - `notification_recipients`: array of object - List of notification recipients for the current step
    - `response_occurrences`: array of object - List of response occurrences for the step
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `responsible_group_memberships`: array of object - List of responsible group memberships
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `89891510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - Name of the responsible group e.g. `Approvers`
    - `assignees`: array of object - List of assignees in the group
  - `all_assignees`: array of object - List of all current assignees across all steps of the workflow. Includes fully resolved project role assignments and accounts for temporary replacements.
    - `id`: string (required) - ID of the assignee e.g. `1`
    - `name`: string (required) - Name of the assignee e.g. `Jane Doe`
    - `login`: string (required) - Assignee login e.g. `jane.doe@example.com`
    - `company`: object (required) - Company of the assignee
  - `template_version_id`: string - ID of the template version e.g. `123`
  - `created_by`: object - User who created the workflow instance
    - `id`: string - ID of the user who created the workflow e.g. `161072`
    - `login`: string - Login/email of the user who created the workflow e.g. `carl.contractor@example.com`
    - `name`: string - Name of the user who created the workflow e.g. `Carl the Contractor`
    - `company`: object - Company of the user

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Instances (History)

Resource id: `workflow-instances-history`. Raw spec: `../openapi-raw/workflow-instances-history.json`. Web: https://developers.procore.com/reference/rest/workflow-instances-history?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/{id}/history

**Get Workflow Instance History (Project)**
Returns an ordered list of history events for a given project workflow instance.
Each event in the `history` array has a `type` field and a `details` object. The following event types are supported:
**WorkflowStarted** — emitted when the workflow begins.
```json
{
  "type": "WorkflowStarted",
  "details": {
    "started_at": "2024-01-15T10:00:00Z"
  }
}
```
**WorkflowTerminated** — emitted when the workflow is terminated before completion.
```json
{
  "type": "WorkflowTerminated",
  "details": {
    "name": "Bulk Assignee Update",
    "terminated_at": "2024-01-15T10:30:00Z",
    "terminated_by": {
      "id": "77",
      "login": "mary@example.com",
      "name": "Mary Thompson"
    },
    "terminate_reason": "Suspended",
    "terminate_result": {
      "details": [
        {
          "items": [
            {
              "label": "Status",
              "text": "Approved"
            }
          ]
        }
      ]
    }
  }
}
```
**ResponseStep** — emitted for each response step, including who responded and what they said.
```json
{
  "type": "ResponseStep",
  "details": {
    "id": "1001",
    "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Manager Approval",
    "started_at": "2024-01-15T10:00:00Z",
    "ended_at": "2024-01-15T11:00:00Z",
    "due_date": "2024-01-16T17:00:00Z",
    "decision_type": "first",
    "required_responders_decide": true,
    "responses": [
      {
        "id": "12345",
        "response_id": "99901",
        "login": "mary@example.com",
        "name": "Mary Thompson",
        "response": "Approved",
        "response_type": "approve",
        "role_type": "responder",
        "required": true,
        "comment": "Looks good to me.",
        "responded_at": "2024-01-15T10:45:00Z",
        "attachments": [
          {
            "id": "55501",
            "name": "review.pdf",
            "url": "https://example.com/review.pdf"
          }
        ],
        "original_assignees": [
          {
            "id": "67890",
            "name": "John Smith",
            "login": "john@example.com"
          }
        ]
      }
    ],
    "overall_response": "Approved",
    "overall_response_type": "approve",
    "overall_response_description": "All required approvers agreed.",
    "status": "Approved",
    "available_response_options": null,
    "events": [
      {
        "type": "action_executed",
        "title": "Action Executed",
        "created_at": "2024-01-15T10:05:00Z",
        "created_by": {
          "id": "100",
          "login": "automation@example.com",
          "name": "Workflow System"
        },
        "icon": "People",
        "temporary": false,
        "details": [
          {
            "type": "custom",
            "title": "Watermark applied",
            "icon": "Document",
            "created_by": {
              "id": "100",
              "login": "automation@example.com",
              "name": "Workflow System"
            },
            "items": [
              {
                "label": "Document",
                "text": "Spec v2"
              }
            ],
            "attachments": [
              {
                "id": "55501",
                "name": "review.pdf",
                "url": "https://example.com/review.pdf"
              }
            ]
          }
        ]
      }
    ],
    "assignee_updates": [
      {
        "created_at": "2024-01-15T10:12:00Z",
        "created_by": {
          "id": "200",
          "login": "coordinator@example.com",
          "name": "Pat Coordinator"
        },
        "logins": [
          {
            "id": "12345",
            "name": "Mary Thompson",
            "login": "mary@example.com",
            "required": true,
            "role_type": "responder"
          }
        ],
        "responsible_groups": [
          {
            "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            "responses_required": "all",
            "role_type": "responder"
          }
        ]
      }
    ],
    "override": {
      "overridden_at": "2024-01-15T10:50:00Z",
      "overridden_by": {
        "id": "200",
        "login": "coordinator@example.com",
        "name": "Pat Coordinator"
      },
      "override_reason": "Manual override after escalation",
      "overridden_assignees": [
        {
          "id": "12345",
          "login": "mary@example.com",
          "name": "Mary Thompson"
        }
      ],
      "attachments": [
        {
          "id": "55501",
          "name": "review.pdf",
          "url": "https://example.com/review.pdf"
        }
      ]
    },
    "responsible_groups": [
      {
        "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "name": "Project Manager",
        "type": "project_role",
        "responses_required": "one",
        "role_type": "responder",
        "login_ids": ["12345"]
      }
    ],
    "additional_assignees": [
      {
        "required": true,
        "role_type": "responder",
        "invited_by": {
          "id": "200",
          "login": "coordinator@example.com",
          "name": "Pat Coordinator"
        },
        "logins": [
          {
            "id": "50001",
            "login": "newhire@example.com",
            "name": "New Hire"
          }
        ],
        "created_at": "2024-01-15T10:20:00Z",
        "reason": "new_employee",
        "comment": null
      }
    ],
    "individual_assignees": [
      {
        "id": "50002",
        "name": "Alex Lee",
        "login": "alex@example.com",
        "required": true,
        "role_type": "responder"
      }
    ],
    "notification_recipients": [
      {
        "id": "300",
        "name": "Sam Observer",
        "login": "sam@example.com"
      }
    ]
  }
}
```
**EndStep** — emitted when the workflow reaches a terminal step (either successful completion or termination).
```json
{
  "type": "EndStep",
  "details": {
    "id": "2001",
    "uuid": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "name": "Complete",
    "started_at": "2024-01-15T11:00:00Z",
    "ended_at": "2024-01-15T11:00:01Z",
    "due_date": "2024-01-16T12:00:00Z",
    "end_type": "success",
    "status": "Approved"
  }
}
```
**Action** — emitted for automated action steps (e.g. setting a status via a dynamic step).
```json
{
  "type": "Action",
  "details": {
    "id": "3001",
    "uuid": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "name": "Set Status",
    "icon": "Status",
    "started_at": "2024-01-15T11:00:00Z",
    "ended_at": "2024-01-15T11:00:01Z",
    "due_date": null,
    "status": "in_progress",
    "description": "Contract status updated to Approved",
    "is_continuable": true,
    "events": [
      {
        "type": "override",
        "title": "Step Override",
        "details": [
          {
            "title": "Override details",
            "attachments": [
              {
                "id": "55501",
                "name": "review.pdf",
                "url": "https://example.com/review.pdf"
              }
            ]
          }
        ]
      }
    ],
    "override": {
      "overridden_at": "2024-01-15T11:00:01Z",
      "overridden_by": {
        "id": "200",
        "login": "coordinator@example.com",
        "name": "Pat Coordinator"
      },
      "override_reason": "Force-advanced pending vendor response",
      "overridden_assignees": [
        {
          "id": "12345",
          "login": "mary@example.com",
          "name": "Mary Thompson"
        }
      ],
      "attachments": [
        {
          "id": "55501",
          "name": "review.pdf",
          "url": "https://example.com/review.pdf"
        }
      ]
    }
  }
}
```
**Conditional** — emitted when a conditional gateway is evaluated.
```json
{
  "type": "Conditional",
  "details": {
    "id": "4001",
    "uuid": "d4e5f6a7-b8c9-0123-def0-234567890123",
    "name": "Amount > 50?",
    "evaluated_at": "2024-01-15T11:00:00Z",
    "description": "Amount is greater than 50: Yes"
  }
}
```

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow instance.
- `filters[activity_types][]` [query] array of string enum[comments, attachments] - Optional activity filter (`comments`, `attachments`). When present, the response only includes timeline rows that match the filter. **Future step events are not included** when this filter is used (linear templates on...

Response 200 (application/json): object

- `data`: object (required) - Workflow instance history details
  - `name`: string (required) - Display name of the workflow template for this instance e.g. `Submittal Approval`
  - `format`: string enum[diagram, linear] (required) - Template layout format
  - `status`: string enum[blocked, overdue, warning, in_progress, complete, processing, terminated] (required) - Urgency-derived status for the workflow instance, or null when urgency has not been set.
  - `started_at`: string(date-time) (required) - Timestamp when the workflow instance was started e.g. `2024-01-15T10:00:00Z`
  - `ended_at`: string(date-time) (required) - Timestamp when the workflow instance ended e.g. `2024-01-15T12:00:00Z`
  - `blocked_reason`: string (required) - Human-readable reason when status is blocked
  - `blocked_is_retriable`: boolean (required) - True when a blocked instance may recover by refreshing the workflow.
  - `blocked_learn_more_url`: string - Optional support URL for additional guidance. Null when the instance is not blocked. e.g. `https://support.procore.com/products/online/user-guide/project-level/project-...`
  - `current_step_index`: integer (required) - Zero-based index within the history array pointing to the current active step, or null when inactive e.g. `1`
  - `history`: array of oneOf(object | object | object | object | object | object) (required) - Ordered list of history events for the workflow instance

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/instances/{id}/history

**Get Workflow Instance History (Company)**
Returns an ordered list of history events for a given company workflow instance.
Each event in the `history` array has a `type` field and a `details` object. The following event types are supported:
**WorkflowStarted** — emitted when the workflow begins.
```json
{
  "type": "WorkflowStarted",
  "details": {
    "started_at": "2024-01-15T10:00:00Z"
  }
}
```
**WorkflowTerminated** — emitted when the workflow is terminated before completion.
```json
{
  "type": "WorkflowTerminated",
  "details": {
    "name": "Bulk Assignee Update",
    "terminated_at": "2024-01-15T10:30:00Z",
    "terminated_by": {
      "id": "77",
      "login": "mary@example.com",
      "name": "Mary Thompson"
    },
    "terminate_reason": "Suspended",
    "terminate_result": {
      "details": [
        {
          "items": [
            {
              "label": "Status",
              "text": "Approved"
            }
          ]
        }
      ]
    }
  }
}
```
**ResponseStep** — emitted for each response step, including who responded and what they said.
```json
{
  "type": "ResponseStep",
  "details": {
    "id": "1001",
    "uuid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Manager Approval",
    "started_at": "2024-01-15T10:00:00Z",
    "ended_at": "2024-01-15T11:00:00Z",
    "due_date": "2024-01-16T17:00:00Z",
    "decision_type": "first",
    "required_responders_decide": true,
    "responses": [
      {
        "id": "12345",
        "response_id": "99901",
        "login": "mary@example.com",
        "name": "Mary Thompson",
        "response": "Approved",
        "response_type": "approve",
        "role_type": "responder",
        "required": true,
        "comment": "Looks good to me.",
        "responded_at": "2024-01-15T10:45:00Z",
        "attachments": [
          {
            "id": "55501",
            "name": "review.pdf",
            "url": "https://example.com/review.pdf"
          }
        ],
        "original_assignees": [
          {
            "id": "67890",
            "name": "John Smith",
            "login": "john@example.com"
          }
        ]
      }
    ],
    "overall_response": "Approved",
    "overall_response_type": "approve",
    "overall_response_description": "All required approvers agreed.",
    "status": "Approved",
    "available_response_options": null,
    "events": [
      {
        "type": "action_executed",
        "title": "Action Executed",
        "created_at": "2024-01-15T10:05:00Z",
        "created_by": {
          "id": "100",
          "login": "automation@example.com",
          "name": "Workflow System"
        },
        "icon": "People",
        "temporary": false,
        "details": [
          {
            "type": "custom",
            "title": "Watermark applied",
            "icon": "Document",
            "created_by": {
              "id": "100",
              "login": "automation@example.com",
              "name": "Workflow System"
            },
            "items": [
              {
                "label": "Document",
                "text": "Spec v2"
              }
            ],
            "attachments": [
              {
                "id": "55501",
                "name": "review.pdf",
                "url": "https://example.com/review.pdf"
              }
            ]
          }
        ]
      }
    ],
    "assignee_updates": [
      {
        "created_at": "2024-01-15T10:12:00Z",
        "created_by": {
          "id": "200",
          "login": "coordinator@example.com",
          "name": "Pat Coordinator"
        },
        "logins": [
          {
            "id": "12345",
            "name": "Mary Thompson",
            "login": "mary@example.com",
            "required": true,
            "role_type": "responder"
          }
        ],
        "responsible_groups": [
          {
            "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            "responses_required": "all",
            "role_type": "responder"
          }
        ]
      }
    ],
    "override": {
      "overridden_at": "2024-01-15T10:50:00Z",
      "overridden_by": {
        "id": "200",
        "login": "coordinator@example.com",
        "name": "Pat Coordinator"
      },
      "override_reason": "Manual override after escalation",
      "overridden_assignees": [
        {
          "id": "12345",
          "login": "mary@example.com",
          "name": "Mary Thompson"
        }
      ],
      "attachments": [
        {
          "id": "55501",
          "name": "review.pdf",
          "url": "https://example.com/review.pdf"
        }
      ]
    },
    "responsible_groups": [
      {
        "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "name": "Project Manager",
        "type": "project_role",
        "responses_required": "one",
        "role_type": "responder",
        "login_ids": ["12345"]
      }
    ],
    "additional_assignees": [
      {
        "required": true,
        "role_type": "responder",
        "invited_by": {
          "id": "200",
          "login": "coordinator@example.com",
          "name": "Pat Coordinator"
        },
        "logins": [
          {
            "id": "50001",
            "login": "newhire@example.com",
            "name": "New Hire"
          }
        ],
        "created_at": "2024-01-15T10:20:00Z",
        "reason": "new_employee",
        "comment": null
      }
    ],
    "individual_assignees": [
      {
        "id": "50002",
        "name": "Alex Lee",
        "login": "alex@example.com",
        "required": true,
        "role_type": "responder"
      }
    ],
    "notification_recipients": [
      {
        "id": "300",
        "name": "Sam Observer",
        "login": "sam@example.com"
      }
    ]
  }
}
```
**EndStep** — emitted when the workflow reaches a terminal step (either successful completion or termination).
```json
{
  "type": "EndStep",
  "details": {
    "id": "2001",
    "uuid": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "name": "Complete",
    "started_at": "2024-01-15T11:00:00Z",
    "ended_at": "2024-01-15T11:00:01Z",
    "due_date": "2024-01-16T12:00:00Z",
    "end_type": "success",
    "status": "Approved"
  }
}
```
**Action** — emitted for automated action steps (e.g. setting a status via a dynamic step).
```json
{
  "type": "Action",
  "details": {
    "id": "3001",
    "uuid": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "name": "Set Status",
    "icon": "Status",
    "started_at": "2024-01-15T11:00:00Z",
    "ended_at": "2024-01-15T11:00:01Z",
    "due_date": null,
    "status": "in_progress",
    "description": "Contract status updated to Approved",
    "is_continuable": true,
    "events": [
      {
        "type": "override",
        "title": "Step Override",
        "details": [
          {
            "title": "Override details",
            "attachments": [
              {
                "id": "55501",
                "name": "review.pdf",
                "url": "https://example.com/review.pdf"
              }
            ]
          }
        ]
      }
    ],
    "override": {
      "overridden_at": "2024-01-15T11:00:01Z",
      "overridden_by": {
        "id": "200",
        "login": "coordinator@example.com",
        "name": "Pat Coordinator"
      },
      "override_reason": "Force-advanced pending vendor response",
      "overridden_assignees": [
        {
          "id": "12345",
          "login": "mary@example.com",
          "name": "Mary Thompson"
        }
      ],
      "attachments": [
        {
          "id": "55501",
          "name": "review.pdf",
          "url": "https://example.com/review.pdf"
        }
      ]
    }
  }
}
```
**Conditional** — emitted when a conditional gateway is evaluated.
```json
{
  "type": "Conditional",
  "details": {
    "id": "4001",
    "uuid": "d4e5f6a7-b8c9-0123-def0-234567890123",
    "name": "Amount > 50?",
    "evaluated_at": "2024-01-15T11:00:00Z",
    "description": "Amount is greater than 50: Yes"
  }
}
```

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow instance.
- `filters[activity_types][]` [query] array of string enum[comments, attachments] - Optional activity filter (`comments`, `attachments`). When present, the response only includes timeline rows that match the filter. **Future step events are not included** when this filter is used (linear templates on...

Response 200 (application/json): object

- `data`: object (required) - Workflow instance history details
  - `name`: string (required) - Display name of the workflow template for this instance e.g. `Submittal Approval`
  - `format`: string enum[diagram, linear] (required) - Template layout format
  - `status`: string enum[blocked, overdue, warning, in_progress, complete, processing, terminated] (required) - Urgency-derived status for the workflow instance, or null when urgency has not been set.
  - `started_at`: string(date-time) (required) - Timestamp when the workflow instance was started e.g. `2024-01-15T10:00:00Z`
  - `ended_at`: string(date-time) (required) - Timestamp when the workflow instance ended e.g. `2024-01-15T12:00:00Z`
  - `blocked_reason`: string (required) - Human-readable reason when status is blocked
  - `blocked_is_retriable`: boolean (required) - True when a blocked instance may recover by refreshing the workflow.
  - `blocked_learn_more_url`: string - Optional support URL for additional guidance. Null when the instance is not blocked. e.g. `https://support.procore.com/products/online/user-guide/project-level/project-...`
  - `current_step_index`: integer (required) - Zero-based index within the history array pointing to the current active step, or null when inactive e.g. `1`
  - `history`: array of oneOf(object | object | object | object | object | object) (required) - Ordered list of history events for the workflow instance

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/bulk_history

**Get Bulk Project Workflowable Object Instance Histories**
Returns workflow instance histories for multiple workflowable objects in a single request, grouped by `item_id`. Each group contains the full ordered history for every workflow instance associated with that object.
**Authorization:** The request fails with 403 if the requesting user cannot view the history of all workflow instances for any submitted `item_id`. Objects with no workflow instances return an empty `instances` array without causing an error.
**Granular permissions:** Within each instance, history events are filtered to those the requesting user is permitted to see (full history, previous step only, or none).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `tool_type`: string (required) - Workflowable tool type. Supports external name (preferred) and class name (compatibility).
- `item_ids`: array of string (required) - One or more workflowable object identifiers. All submitted identifiers must be accessible to the requesting user; if any identifier has hidden instances the request fails with 403.
- `filters`: object
  - `activity_types`: array of string enum[comments, attachments] - Optional activity filter (`comments`, `attachments`). When present, **future step events are not included** (linear templates only).

Response 200 (application/json): object

- `data`: array of object (required) - List of workflowable objects and their corresponding workflow instance histories
  - `item_id`: string (required) - The workflowable object identifier that was submitted in the request e.g. `42`
  - `instances`: array of object (required) - Workflow instance histories for this workflowable object, ordered most-recent-first. Empty array when the object has no workflow instances.
    - `instance_id`: string (required) - Unique identifier of the workflow instance e.g. `42`
    - `name`: string (required) - Display name of the workflow template for this instance
    - `format`: string enum[diagram, linear] (required)
    - `status`: string enum[blocked, overdue, warning, in_progress, complete, processing, terminated] (required) - Status for the workflow instance
    - `started_at`: string(date-time) (required) - Timestamp when the workflow instance was started e.g. `2024-01-15T10:00:00Z`
    - `ended_at`: string(date-time) (required) - Timestamp when the workflow instance ended e.g. `2024-01-15T12:00:00Z`
    - `blocked_reason`: string (required)
    - `blocked_is_retriable`: boolean (required) - True when a blocked instance may recover via an instance refresh.
    - `blocked_learn_more_url`: string - Optional support URL for additional guidance. Null when the instance is not blocked. e.g. `https://support.procore.com/products/online/user-guide/project-level/project-...`
    - `history`: array of oneOf(object | object | object | object | object | object) (required) - Ordered list of history events for this workflow instance
    - `current_step_index`: integer (required) - Zero-based index within the history array pointing to the current active step, or null when the instance has ended e.g. `1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/instances/history

**Get Project Workflowable Object Instance Histories**
Returns grouped workflow instance histories for a workflowable object (`tool_type` + `item_id`).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `tool_type` [query] string (required) - Workflowable tool type. Supports external name (preferred) and class name (compatibility).
- `item_id` [query] string (required) - Workflowable object identifier.
- `filters[activity_types][]` [query] array of string enum[comments, attachments] - Optional activity filter (`comments`, `attachments`). When present, **future step events are not included** (linear templates only).

Response 200 (application/json): object

- `data`: array of object (required) - List of workflow instances and their corresponding histories
  - `instance_id`: string (required) - Unique identifier of the workflow instance e.g. `42`
  - `name`: string (required) - Display name of the workflow template for this instance
  - `format`: string enum[diagram, linear] (required)
  - `status`: string enum[blocked, overdue, warning, in_progress, complete, processing, terminated] (required) - Status for the workflow instance
  - `started_at`: string(date-time) (required) - Timestamp when the workflow instance was started e.g. `2024-01-15T10:00:00Z`
  - `ended_at`: string(date-time) (required) - Timestamp when the workflow instance ended e.g. `2024-01-15T12:00:00Z`
  - `blocked_reason`: string (required)
  - `blocked_is_retriable`: boolean (required) - True when a blocked instance may recover via an instance refresh.
  - `blocked_learn_more_url`: string - Optional support URL for additional guidance. Null when the instance is not blocked. e.g. `https://support.procore.com/products/online/user-guide/project-level/project-...`
  - `history`: array of oneOf(object | object | object | object | object | object) (required) - Ordered list of history events for this workflow instance
  - `current_step_index`: integer (required) - Zero-based index within the history array pointing to the current active step, or null when the instance has ended e.g. `1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/workflows/instances/bulk_history

**Get Bulk Company Workflowable Object Instance Histories**
Returns workflow instance histories for multiple workflowable objects in a single request, grouped by `item_id`. Each group contains the full ordered history for every workflow instance associated with that object.
**Authorization:** The request fails with 403 if the requesting user cannot view the history of all workflow instances for any submitted `item_id`. Objects with no workflow instances return an empty `instances` array without causing an error.
**Granular permissions:** Within each instance, history events are filtered to those the requesting user is permitted to see (full history, previous step only, or none).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `tool_type`: string (required) - Workflowable tool type. Supports external name (preferred) and class name (compatibility).
- `item_ids`: array of string (required) - One or more workflowable object identifiers. All submitted identifiers must be accessible to the requesting user; if any identifier has hidden instances the request fails with 403.
- `filters`: object
  - `activity_types`: array of string enum[comments, attachments] - Optional activity filter (`comments`, `attachments`). When present, **future step events are not included** (linear templates only).

Response 200 (application/json): object

- `data`: array of object (required) - List of workflowable objects and their corresponding workflow instance histories
  - `item_id`: string (required) - The workflowable object identifier that was submitted in the request e.g. `42`
  - `instances`: array of object (required) - Workflow instance histories for this workflowable object, ordered most-recent-first. Empty array when the object has no workflow instances.
    - `instance_id`: string (required) - Unique identifier of the workflow instance e.g. `42`
    - `name`: string (required) - Display name of the workflow template for this instance
    - `format`: string enum[diagram, linear] (required)
    - `status`: string enum[blocked, overdue, warning, in_progress, complete, processing, terminated] (required) - Status for the workflow instance
    - `started_at`: string(date-time) (required) - Timestamp when the workflow instance was started e.g. `2024-01-15T10:00:00Z`
    - `ended_at`: string(date-time) (required) - Timestamp when the workflow instance ended e.g. `2024-01-15T12:00:00Z`
    - `blocked_reason`: string (required)
    - `blocked_is_retriable`: boolean (required) - True when a blocked instance may recover via an instance refresh.
    - `blocked_learn_more_url`: string - Optional support URL for additional guidance. Null when the instance is not blocked. e.g. `https://support.procore.com/products/online/user-guide/project-level/project-...`
    - `history`: array of oneOf(object | object | object | object | object | object) (required) - Ordered list of history events for this workflow instance
    - `current_step_index`: integer (required) - Zero-based index within the history array pointing to the current active step, or null when the instance has ended e.g. `1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/instances/history

**Get Company Workflowable Object Instance Histories**
Returns grouped workflow instance histories for a workflowable object (`tool_type` + `item_id`).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `tool_type` [query] string (required) - Workflowable tool type. Supports external name (preferred) and class name (compatibility).
- `item_id` [query] string (required) - Workflowable object identifier.
- `filters[activity_types][]` [query] array of string enum[comments, attachments] - Optional activity filter (`comments`, `attachments`). When present, **future step events are not included** (linear templates only).

Response 200 (application/json): object

- `data`: array of object (required) - List of workflow instances and their corresponding histories
  - `instance_id`: string (required) - Unique identifier of the workflow instance e.g. `42`
  - `name`: string (required) - Display name of the workflow template for this instance
  - `format`: string enum[diagram, linear] (required)
  - `status`: string enum[blocked, overdue, warning, in_progress, complete, processing, terminated] (required) - Status for the workflow instance
  - `started_at`: string(date-time) (required) - Timestamp when the workflow instance was started e.g. `2024-01-15T10:00:00Z`
  - `ended_at`: string(date-time) (required) - Timestamp when the workflow instance ended e.g. `2024-01-15T12:00:00Z`
  - `blocked_reason`: string (required)
  - `blocked_is_retriable`: boolean (required) - True when a blocked instance may recover via an instance refresh.
  - `blocked_learn_more_url`: string - Optional support URL for additional guidance. Null when the instance is not blocked. e.g. `https://support.procore.com/products/online/user-guide/project-level/project-...`
  - `history`: array of oneOf(object | object | object | object | object | object) (required) - Ordered list of history events for this workflow instance
  - `current_step_index`: integer (required) - Zero-based index within the history array pointing to the current active step, or null when the instance has ended e.g. `1`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Managers

Resource id: `workflow-managers`. Raw spec: `../openapi-raw/workflow-managers.json`. Web: https://developers.procore.com/reference/rest/workflow-managers?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/workflow_managers

**List Workflow Managers (Project)**
Returns a list of all workflow managers for a given project and tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `tool_type` [query] string (required) - Return workflow managers for the associated tool.
- `tool_subtype` [query] integer - Return workflow managers for the associated tool_subtype. Required when tool_type is 'correspondence'.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - List of workflow managers
  - `id`: string - Unique identifier for the workflow manager e.g. `161072`
  - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
  - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
  - `company`: object - Vendor company for the workflow manager when one is associated in the requested company context
    - `name`: string - Vendor display name e.g. `Brickworks`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/workflow_managers

**List Workflow Managers (Company)**
Returns a list of all workflow managers for a given company and tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `tool_type` [query] string (required) - Return workflow managers for the associated tool.
- `tool_subtype` [query] integer - Return workflow managers for the associated tool_subtype. Required when tool_type is 'correspondence'.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - List of workflow managers
  - `id`: string - Unique identifier for the workflow manager e.g. `161072`
  - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
  - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
  - `company`: object - Vendor company for the workflow manager when one is associated in the requested company context
    - `name`: string - Vendor display name e.g. `Brickworks`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Possible Assignees

Resource id: `workflow-possible-assignees`. Raw spec: `../openapi-raw/workflow-possible-assignees.json`. Web: https://developers.procore.com/reference/rest/workflow-possible-assignees?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/possible_assignees

**List Possible Assignees (Project)**
Returns a list of all workflows possible assignees for a given project and tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `tool_type` [query] string (required) - Return workflow possible assignees for the associated tool.
- `tool_subtype` [query] integer - Return workflow possible assignees for the associated tool_subtype. Required when tool_type is 'correspondence'.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - List of possible assignees
  - `id`: string - Unique identifier for the assignee e.g. `161072`
  - `login`: string - Assignee login e.g. `carl.contractor@example.com`
  - `name`: string - Name of the assignee e.g. `Carl the Contractor`
  - `company`: object - Vendor company for the assignee when one is associated in the requested company context
    - `name`: string - Vendor display name e.g. `Brickworks`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/possible_assignees

**List Possible Assignees (Company)**
Returns a list of all workflows possible assignees for a given company and tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `tool_type` [query] string (required) - Return workflow possible assignees for the associated tool.
- `tool_subtype` [query] integer - Return workflow possible assignees for the associated tool_subtype. Required when tool_type is 'correspondence'.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - List of possible assignees
  - `id`: string - Unique identifier for the assignee e.g. `161072`
  - `login`: string - Assignee login e.g. `carl.contractor@example.com`
  - `name`: string - Name of the assignee e.g. `Carl the Contractor`
  - `company`: object - Vendor company for the assignee when one is associated in the requested company context
    - `name`: string - Vendor display name e.g. `Brickworks`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Presets

Resource id: `workflow-presets`. Raw spec: `../openapi-raw/workflow-presets.json`. Web: https://developers.procore.com/reference/rest/workflow-presets?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/presets

**List Workflow Presets (Project)**
Get a list of Workflow Presets

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `per_page` [query] integer - Elements per page
- `filters[tool_type]` [query] string (required) - Filter by tool type
- `filters[tool_subtype]` [query] string - Filter by tool subtype
- `filters[is_default]` [query] boolean - Filter by default preset. When true, returns only presets marked as default. When false, returns only non-default presets.
- `filters[is_valid]` [query] boolean - Filter by configuration validity. When true, returns only presets with valid configuration (no configuration or external errors). When false, returns only presets with invalid configuration. When omitted, returns all ...

Response 200 (application/json): object

- `data`: array of object - List of presets
  - `id`: string - Template Preset ID e.g. `30`
  - `valid`: boolean - If true, this configured template is ready to use to generate an instance
  - `default`: boolean - If true, this configured template will be used by default for this tool
  - `template`: object
    - `id`: string - Workflow Template ID e.g. `2`
    - `name`: string - Name of the Workflow Template e.g. `Super neat workflow`
    - `last_published_version_id`: string - Last published version of the Workflow template e.g. `1002`
    - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/presets

**List Workflow Presets (Company)**
Get a list of Workflow Presets

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `per_page` [query] integer - Elements per page
- `filters[tool_type]` [query] string (required) - Filter by tool type
- `filters[tool_subtype]` [query] string - Filter by tool subtype
- `filters[is_default]` [query] boolean - Filter by default preset. When true, returns only presets marked as default. When false, returns only non-default presets.
- `filters[is_valid]` [query] boolean - Filter by configuration validity. When true, returns only presets with valid configuration (no configuration or external errors). When false, returns only presets with invalid configuration. When omitted, returns all ...

Response 200 (application/json): object

- `data`: array of object - List of presets
  - `id`: string - Template Preset ID e.g. `30`
  - `valid`: boolean - If true, this configured template is ready to use to generate an instance
  - `default`: boolean - If true, this configured template will be used by default for this tool
  - `template`: object
    - `id`: string - Workflow Template ID e.g. `2`
    - `name`: string - Name of the Workflow Template e.g. `Super neat workflow`
    - `last_published_version_id`: string - Last published version of the Workflow template e.g. `1002`
    - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/presets/{id}

**Get Workflow Preset (Project)**
Get details of a specific workflow preset.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow preset

Response 200 (application/json): object

- `data`: object - Workflow preset details
  - `id`: string - Unique identifier for the workflow preset e.g. `30`
  - `valid`: boolean - If true, this preset has a valid configuration and is ready to use for new instances
  - `default`: boolean - If true, this preset will be used by default for this tool
  - `created_at`: string(date-time) - Date when the preset was created e.g. `2020-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date when the preset was last updated e.g. `2020-01-01T00:00:00Z`
  - `template`: object
    - `id`: string - Unique identifier of the workflow template e.g. `2`
    - `last_published_version_id`: string - Unique identifier of the latest published version of the template e.g. `2566`
    - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `distribution_list`: object
    - `id`: string - Unique identifier for the distribution list e.g. `1`
    - `name`: string - Name of the distribution list e.g. `Project Managers`
  - `responsible_group_memberships`: array of object - Associations between assignees and responsible groups
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
    - `assignees`: array of object - List of assignees in the responsible group
  - `individual_assignees`: array of object - Individual assignees per step, enriched with login information
    - `step_uuid`: string - UUID of the step this assignee belongs to e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `logins`: array of object - List of individual assignee logins for the step

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/presets/{id}

**Update Workflow Preset (Project)**
Updates a workflow preset for a project tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the workflow preset

Request body (application/json):

- `default`: boolean - Indicates if this is the default preset e.g. `true`

Response 200 (application/json): object

- `data`: object - Workflow preset details
  - `id`: string - Unique identifier for the workflow preset e.g. `30`
  - `valid`: boolean - If true, this preset has a valid configuration and is ready to use for new instances
  - `default`: boolean - If true, this preset will be used by default for this tool
  - `created_at`: string(date-time) - Date when the preset was created e.g. `2020-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date when the preset was last updated e.g. `2020-01-01T00:00:00Z`
  - `template`: object
    - `id`: string - Unique identifier of the workflow template e.g. `2`
    - `last_published_version_id`: string - Unique identifier of the latest published version of the template e.g. `2566`
    - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `distribution_list`: object
    - `id`: string - Unique identifier for the distribution list e.g. `1`
    - `name`: string - Name of the distribution list e.g. `Project Managers`
  - `responsible_group_memberships`: array of object - Associations between assignees and responsible groups
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
    - `assignees`: array of object - List of assignees in the responsible group
  - `individual_assignees`: array of object - Individual assignees per step, enriched with login information
    - `step_uuid`: string - UUID of the step this assignee belongs to e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `logins`: array of object - List of individual assignee logins for the step

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/workflows/presets/{id}

**Get Workflow Preset (Company)**
Get details of a specific workflow preset.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow preset

Response 200 (application/json): object

- `data`: object - Workflow preset details
  - `id`: string - Unique identifier for the workflow preset e.g. `30`
  - `valid`: boolean - If true, this preset has a valid configuration and is ready to use for new instances
  - `default`: boolean - If true, this preset will be used by default for this tool
  - `created_at`: string(date-time) - Date when the preset was created e.g. `2020-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date when the preset was last updated e.g. `2020-01-01T00:00:00Z`
  - `template`: object
    - `id`: string - Unique identifier of the workflow template e.g. `2`
    - `last_published_version_id`: string - Unique identifier of the latest published version of the template e.g. `2566`
    - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `distribution_list`: object
    - `id`: string - Unique identifier for the distribution list e.g. `1`
    - `name`: string - Name of the distribution list e.g. `Project Managers`
  - `responsible_group_memberships`: array of object - Associations between assignees and responsible groups
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
    - `assignees`: array of object - List of assignees in the responsible group
  - `individual_assignees`: array of object - Individual assignees per step, enriched with login information
    - `step_uuid`: string - UUID of the step this assignee belongs to e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `logins`: array of object - List of individual assignee logins for the step

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/workflows/presets/{id}

**Update Workflow Preset (Company)**
Updates a workflow preset for a company tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the workflow preset

Request body (application/json):

- `default`: boolean - Indicates if this is the default preset e.g. `true`

Response 200 (application/json): object

- `data`: object - Workflow preset details
  - `id`: string - Unique identifier for the workflow preset e.g. `30`
  - `valid`: boolean - If true, this preset has a valid configuration and is ready to use for new instances
  - `default`: boolean - If true, this preset will be used by default for this tool
  - `created_at`: string(date-time) - Date when the preset was created e.g. `2020-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date when the preset was last updated e.g. `2020-01-01T00:00:00Z`
  - `template`: object
    - `id`: string - Unique identifier of the workflow template e.g. `2`
    - `last_published_version_id`: string - Unique identifier of the latest published version of the template e.g. `2566`
    - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`
  - `workflow_manager`: object - Workflow manager
    - `id`: string - Unique identifier for the workflow manager e.g. `161072`
    - `login`: string - Workflow manager login e.g. `carl.contractor@example.com`
    - `name`: string - Name of the workflow manager e.g. `Carl the Contractor`
    - `company`: object - Workflow manager's company
  - `distribution_list`: object
    - `id`: string - Unique identifier for the distribution list e.g. `1`
    - `name`: string - Name of the distribution list e.g. `Project Managers`
  - `responsible_group_memberships`: array of object - Associations between assignees and responsible groups
    - `responsible_group_uuid`: string - UUID of the responsible group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
    - `assignees`: array of object - List of assignees in the responsible group
  - `individual_assignees`: array of object - Individual assignees per step, enriched with login information
    - `step_uuid`: string - UUID of the step this assignee belongs to e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `logins`: array of object - List of individual assignee logins for the step

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/workflows/presets/{id}/assignees

**Update Assignees and Workflow Manager (Project)**
Updates assignees and workflow manager for a workflow preset for a project tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the resource.

Request body (application/json):

- `workflow_manager_id`: string - ID of the new workflow manager e.g. `115654`
- `responsible_group_memberships`: array of object - List of responsible groups memberships
  - `uuid`: string - UUID of the group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
  - `login_ids`: array of string - List of assignee login ids
- `individual_assignees`: array of object - List of individual assignees per step
  - `step_uuid`: string - UUID of the step e.g. `f47ac10b-58cc-4372-a567-0e02b2c3d479`
  - `logins`: array of object - List of individual assignee logins
    - `id`: string - Login ID of the assignee e.g. `161072`
    - `required`: boolean - Whether this assignee's response is required e.g. `true`
    - `role_type`: string enum[responder, commenter] - Optional role for this individual assignee on this step. When omitted, defaults to `responder`. e.g. `responder`

Response 200 (application/json): object

- `data`: object - Result of the update
  - `workflow_manager_id`: string - ID of the new workflow manager e.g. `115654`
  - `responsible_group_memberships`: array of object - List of responsible groups memberships
    - `uuid`: string - UUID of the group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
    - `login_ids`: array of string - List of assignees ids
  - `individual_assignees`: array of object - List of individual assignees per step, enriched with login information
    - `step_uuid`: string - UUID of the step this assignee belongs to e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `logins`: array of object - List of individual assignee logins for the step

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/workflows/presets/{id}/assignees

**Update Assignees and Workflow Manager (Company)**
Updates assignees and workflow manager for a workflow preset for a company tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the resource.

Request body (application/json):

- `workflow_manager_id`: string - ID of the new workflow manager e.g. `115654`
- `responsible_group_memberships`: array of object - List of responsible groups memberships
  - `uuid`: string - UUID of the group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
  - `login_ids`: array of string - List of assignee login ids
- `individual_assignees`: array of object - List of individual assignees per step
  - `step_uuid`: string - UUID of the step e.g. `f47ac10b-58cc-4372-a567-0e02b2c3d479`
  - `logins`: array of object - List of individual assignee logins
    - `id`: string - Login ID of the assignee e.g. `161072`
    - `required`: boolean - Whether this assignee's response is required e.g. `true`
    - `role_type`: string enum[responder, commenter] - Optional role for this individual assignee on this step. When omitted, defaults to `responder`. e.g. `responder`

Response 200 (application/json): object

- `data`: object - Result of the update
  - `workflow_manager_id`: string - ID of the new workflow manager e.g. `115654`
  - `responsible_group_memberships`: array of object - List of responsible groups memberships
    - `uuid`: string - UUID of the group e.g. `adb387e3-8deb-417e-b863-3b2cea6e07e1`
    - `login_ids`: array of string - List of assignees ids
  - `individual_assignees`: array of object - List of individual assignees per step, enriched with login information
    - `step_uuid`: string - UUID of the step this assignee belongs to e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `logins`: array of object - List of individual assignee logins for the step

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Template Versions

Resource id: `workflow-template-versions`. Raw spec: `../openapi-raw/workflow-template-versions.json`. Web: https://developers.procore.com/reference/rest/workflow-template-versions?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/workflows/templates/versions/{id}

**Get a Workflow Template Version**
Returns the details of a specific workflow template version.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier for the resource.

Response 200 (application/json): object

- `data`: object - View of a template version
  - `id`: string - Unique identifier for the version e.g. `1318`
  - `version`: string - Version number e.g. `1.0.0`
  - `created_at`: string(date-time) - Date when the version was created e.g. `2018-04-20T16:20:57Z`
  - `updated_at`: string(date-time) - Date when the version was last updated e.g. `2018-04-20T16:20:57Z`
  - `tool_type`: string - The type of tool this template is for e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of tool this template is for (only applies to "correspondence" types) e.g. `-1234`
  - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`
  - `steps`: array of object
    - `uuid`: string - UUID of the step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - The step name e.g. `Step 1`
    - `type`: string - The step type e.g. `STANDARD`
    - `responsible_groups`: array of object - List of responsible groups for the step
  - `dynamic_steps`: array of object
    - `uuid`: string - UUID of the step e.g. `2d931510-d99f-494a-8c67-87feb05e1594`
    - `name`: string - The step name e.g. `Step 1`
    - `type`: string - The step type e.g. `WORKFLOW`
    - `configuration`: object - Configuration for the dynamic step
  - `responsible_groups`: array of object - List of responsible groups for the step
    - `uuid`: string - UUID of the responsible group e.g. `39091882-2593-4a60-85fb-689d42b55a55`
    - `name`: string - The name of the responsible group e.g. `Item Creator`
    - `type`: string - The responsible group type e.g. `ITEM_CREATOR`
  - `flow_visualizer_settings`: object - React-flow visualization settings for the workflow template
    - `nodes`: array of object - React-flow nodes configuration
    - `edges`: array of object - React-flow edges configuration

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Templates

Resource id: `workflow-templates`. Raw spec: `../openapi-raw/workflow-templates.json`. Web: https://developers.procore.com/reference/rest/workflow-templates?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/workflows/templates

**List Workflow Templates**
Returns a list of all workflow templates for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - List of workflow templates
  - `id`: string - Unique identifier for the workflow template e.g. `161072`
  - `name`: string - Workflow template name e.g. `Purchase Order Approval`
  - `created_at`: string(date-time) - Date when the template was created e.g. `2020-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date when the template was last updated e.g. `2020-01-01T00:00:00Z`
  - `archived_at`: string(date-time) - Date when the template was archived e.g. `2020-01-01T00:00:00Z`
  - `assigned_projects_count`: integer - Number of projects this template is assigned to e.g. `1`
  - `tool_type`: string - The type of tool this template is for e.g. `purchase_order_contract`
  - `tool_subtype`: string - The subtype of tool this template is for (only applies to "correspondence" types) e.g. `-1234`
  - `format`: string enum[diagram, linear] - Workflow layout format (`diagram` or `linear`). e.g. `diagram`
  - `latest_published_version`: object - Latest published version of the template
    - `id`: string - Unique identifier for the version e.g. `161072`
    - `version`: string - Version number e.g. `1.0`
  - `versions`: array of object
    - `id`: string - Unique identifier for the version e.g. `161072`
    - `version`: string - Version number e.g. `1.0`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Workflow Tools

Resource id: `workflow-tools`. Raw spec: `../openapi-raw/workflow-tools.json`. Web: https://developers.procore.com/reference/rest/workflow-tools?version=latest
Product lines: PM Essentials, PM Starter Pack, Construction Financials

### GET /rest/v2.0/companies/{company_id}/workflows/tools

**List Tools Enabled for Workflows**
Returns a list of workflowable tools for a given company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `name`: string - Translated display name of the tool e.g. `Purchase Order`
  - `type`: string - Tool type e.g. `purchase_order`
  - `provider`: string enum[Project, Company] - Specifies the provider of the tool, either "Project" or "Company"
  - `subtype`: string - Tool subtype, for 'correspondence' tool only e.g. `-123456789`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

