# Procore API: Submittals (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Submittals)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Distributed Submittals](#distributed-submittals) - versions 1.0
- [External Submittals](#external-submittals) - versions 2.0
- [External Submittals Filter Options](#external-submittals-filter-options) - versions 2.0
- [Submittal Approvers](#submittal-approvers) - versions 1.0
- [Submittal Logs](#submittal-logs) - versions 1.0
- [Submittal Packages](#submittal-packages) - versions 1.0
- [Submittal Responses](#submittal-responses) - versions 2.0, 1.0
- [Submittals](#submittals) - versions 2.0, 1.1, 1.0

## Distributed Submittals

Resource id: `distributed-submittals`. Raw spec: `../openapi-raw/distributed-submittals.json`. Web: https://developers.procore.com/reference/rest/distributed-submittals?version=latest
Product lines: PM Essentials

### PATCH /rest/v1.0/projects/{project_id}/submittal_logs/{id}/close_and_distribute

**Close and Distribute a Submittal Log**
Closes the specified Submittal Log (transitioning it to the Closed status supplied in the request body) and distributes the selected approver responses and attachments to the chosen recipients. Returns the created distributed submittal record.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID

Request body (application/json):

- `submittal_log_status_id`: integer - The ID of a Submittal Status (from `GET /rest/v1.0/companies/{company_id}/submittal_statuses`) whose `status` is `Closed`. The Submittal Log will be transitioned to this status as part of the call. e.g. `1`
- `submittal_description`: string e.g. `Submittal Description`
- `message`: string e.g. `Message Content`
- `prostore_file_ids`: array of integer - Prostore File IDs to attach directly to the distribution (e.g., new files uploaded as part of the distribution message).
- `submittal_attachment_ids`: array of integer - SubmittalAssociatedAttachment IDs to include in the distribution. IDs are resolved by `SubmittalAssociatedAttachment.id`. Available from `GET /rest/v1.0/projects/{project_id}/submittal_logs/{id}`.
- `recipient_ids`: array of integer - LoginInformation IDs of users to be notified of the distribution. Available from `GET /rest/v1.0/projects/{project_id}/users`.
- `selected_approvers`: array of object
  - `id`: integer - SubmittalLogApprover ID belonging to this Submittal Log. Available from the `approvers` array on `GET /rest/v1.0/projects/{project_id}/submittal_logs/{id}`. e.g. `100`
  - `include_comment`: boolean e.g. `true`
  - `attachment_ids`: array of integer - SubmittalAssociatedAttachment IDs (NOT Prostore File IDs) to include for this approver. IDs are resolved by `SubmittalAssociatedAttachment.id`. Available from `GET /rest/v1.0/projects/{project_id}/submittal_logs/{id}`.

Response 200 (application/json): object

- `id`: integer e.g. `122765`
- `message`: string
- `submittal_description`: string
- `sent_at`: string(date-time) e.g. `2014-04-20T20:08:09Z`
- `distributed_by`: object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `distributed_to`: array of object
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `distributed_attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `download_all_attachments_url`: string e.g. `url-to-download`
- `submittal_distributed_attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `download_all_submittal_distributed_attachments_url`: string e.g. `url-to-download`
- `message_distributed_attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `download_all_message_distributed_attachments_url`: string e.g. `url-to-download`
- `distributed_responses`: array of object - List of submittal responses selected to be distributed
  - `id`: integer e.g. `161072`
  - `comment`: string e.g. `I approve this`
  - `distributed_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `response_name`: string e.g. `Approved`
  - `submittal_response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `submittal_response_id`: integer e.g. `161072`
  - `submittal_approver_id`: integer e.g. `161072`
  - `user_id`: integer e.g. `161072`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer - Login Information ID of the User e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## External Submittals

Resource id: `external-submittals`. Raw spec: `../openapi-raw/external-submittals.json`. Web: https://developers.procore.com/reference/rest/external-submittals?version=latest
Product lines: PM Essentials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals  **[BETA]**

**Return a list of all External Submittals.**
Return a list of all External Submittals for the specified project. External Submittals are copies of submittals from connected upstream projects, accessible via Connections Manager.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: object - The connected submittal record.
  - `id`: string - Unique identifier of the connected submittal. Use as the {id} path parameter for GET /connected_submittals/{id}, GET /connected_submittals/{id}/revisions, and PATCH /connected_submittals/{id}/linked_local_submittals. e.g. `55321441`
  - `number`: string - Display number of the connected submittal. When spec-section numbering is enabled for the project, this is the spec-section-prefixed number. e.g. `1`
  - `title`: string - Title of the connected submittal. May be null if the upstream submittal has no title. e.g. `Flooring Product Data`
  - `description`: string - Free-text description of the connected submittal. May be null. e.g. `Product data for flooring materials.`
  - `status`: string enum[closed, deleted, outdated, reopened] - Downstream projection status of the connected submittal, derived from the upstream source. This is not a submittal log status. e.g. `closed`
  - `translated_status`: string - Localized, human-readable label for the downstream `status`, suitable for display. e.g. `Closed`
  - `revision`: string - Revision label of the connected submittal. May be null. e.g. `1`
  - `current_revision`: boolean - Whether this record is the current revision of the connected submittal. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the connected submittal projection was created, in ISO 8601 format. e.g. `2024-06-09T15:14:38Z`
  - `last_updated_at`: string(date-time) - Timestamp when the connected submittal projection was last updated, in ISO 8601 format. e.g. `2025-01-07T19:52:46Z`
  - `deleted_at`: string(date-time) - Timestamp when the connected submittal was soft-deleted, in ISO 8601 format. Null when the record is not deleted. e.g. `2025-02-01T10:00:00Z`
  - `for_record_only`: boolean - Whether the submittal is marked for record only (no workflow response required). e.g. `false`
  - `private`: boolean - Whether the submittal is private and visible only to permitted users. e.g. `false`
  - `buffer_time`: integer - Buffer time, in days, configured for the submittal schedule. Null when not set. e.g. `2`
  - `lead_time`: integer - Lead time, in days, for the submittal. Null when not set. e.g. `14`
  - `prepare_time`: integer - Preparation time, in days, for the submittal. Null when not set. e.g. `5`
  - `design_team_review_time`: integer - Design team review time, in days. Null when not set. e.g. `7`
  - `internal_review_time`: integer - Internal review time, in days. Null when not set. e.g. `3`
  - `revision_source_connected_submittal_id`: string - ID of the connected submittal that is the source revision for this record. Null when this record is the original revision. e.g. `55321440`
  - `connection_status`: string enum[connected, disconnected] - Whether the connected submittal's upstream project connection is currently syncing (`connected`) or not (`disconnected`). e.g. `connected`
  - `actual_delivery_date`: string(date-time) - Actual delivery date, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-26T11:00:00Z`
  - `confirmed_delivery_date`: string(date-time) - Confirmed delivery date, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-20T11:00:00Z`
  - `distributed_at`: string(date-time) - Date the submittal was distributed, rendered at noon in the project time zone. Null when not distributed. e.g. `2025-01-07T19:52:46Z`
  - `due_date`: string(date-time) - Due date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2025-02-04T11:00:00Z`
  - `issue_date`: string(date-time) - Issue date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-06-09T10:00:00Z`
  - `received_date`: string(date-time) - Date the submittal was received, rendered at noon in the project time zone. Null when not set. e.g. `2024-06-15T11:00:00Z`
  - `required_on_site_date`: string(date-time) - Required-on-site date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-26T11:00:00Z`
  - `submit_by`: string(date-time) - Submit-by date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-07-17T10:00:00Z`
  - `type`: object - Submittal type of the connected submittal. Null when no type is assigned.
    - `id`: string - Identifier of the submittal type. e.g. `10`
    - `name`: string - Name of the submittal type. e.g. `Product Information`
    - `translated_name`: string - Localized, human-readable name of the submittal type. e.g. `Product Information`
  - `responsible_contractor`: object - Vendor responsible for the connected submittal. Null when none is assigned.
    - `id`: string - Identifier of the responsible contractor vendor. e.g. `3168811`
    - `name`: string - Name of the responsible contractor vendor. e.g. `Arsh Kaur`
  - `created_by`: object - Contact who created the upstream submittal.
    - `id`: string - Identifier of the contact. e.g. `11555146`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408095`
    - `name`: string - Full name of the contact. e.g. `Heba Essam`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Acme Construction`
  - `received_from`: object - Contact the submittal was received from. Null when not set.
    - `id`: string - Identifier of the contact. e.g. `11555147`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408096`
    - `name`: string - Full name of the contact. e.g. `John Doe`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Acme Construction`
  - `submittal_manager`: object - Contact assigned as the submittal manager.
    - `id`: string - Identifier of the contact. e.g. `4301913`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408097`
    - `name`: string - Full name of the contact. e.g. `Dallas Hall`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Procore Technologies`
  - `specification_section`: object - Specification section associated with the connected submittal. Null when none is assigned.
    - `id`: string - Identifier of the specification section. e.g. `999`
    - `number`: string - Specification section number. e.g. `03 10 00`
    - `description`: string - Specification section description. e.g. `Concrete`
    - `label`: string - Display label combining the section number and description. e.g. `03 10 00 - Concrete`
  - `linked_local_submittals`: array of object - Local submittals linked to this connected submittal.
    - `id`: string - Identifier of the local submittal. e.g. `101`
    - `formatted_number`: string - Formatted submittal number. e.g. `001`
    - `number`: string - Submittal number. e.g. `1`
    - `revision`: string - Revision label of the local submittal. e.g. `0`
    - `title`: string - Title of the local submittal. e.g. `Steel Drawings`
    - `status`: object - Current status of the local submittal. Null when the submittal has no status.
  - `has_revisions`: boolean - Whether the connected submittal has additional revisions. Present only on the show (single-record) response. e.g. `true`
  - `connected_distributed_submittals`: array of object - List of values
    - `id`: string - Id e.g. `25566360`
    - `distributed_by`: object - Distributed By
    - `distributed_responses`: array of object - List of Connected Distributed Responses
    - `distributed_to`: array of object - List of values
    - `message`: string - Message e.g. `<p>test distributed</p>`
    - `sent_at`: string - Sent At e.g. `2025-01-07T19:52:46Z`
    - `submittal_description`: string - Submittal Description e.g. `<p>Distribution Description</p>`
    - `submittal_distributed_attachments`: array of object - List of Connected Distributed Attachments
  - `connected_submittal_connection_detail`: object - Details about the upstream project connection for this connected submittal. Present only on the show (single-record) response.
    - `id`: string - Identifier of the connection detail record. e.g. `778821`
    - `status`: string enum[connected, disconnected] - Whether the upstream connection is currently connected or disconnected. e.g. `connected`
    - `upstream_company_name`: string - Name of the upstream company that owns the source submittal. e.g. `Upstream Builders Inc.`
  - `linked_drawings`: array of object - Drawings linked to the connected submittal upstream. Present only on the show (single-record) response.
    - `id`: string - Identifier of the linked drawing record. e.g. `90211`
    - `attachment`: object - File attachment metadata for the linked drawing (identifier, name, and viewable/download URL).
  - `cover_sheet`: object - Most recent generated cover sheet PDF export for the connected submittal, with its file attachment. Null when no export exists. Present only on the show (single-record) response.
    - `id`: string - Identifier of the cover sheet PDF export record. e.g. `55110`
    - `attachment`: object - File attachment metadata for the cover sheet PDF (identifier, name, and viewable/download URL).
  - `project_connection`: object - Upstream project connection identifiers and names for the connected submittal. Null when there is no active connection. Present only on the show (single-record) response.
    - `upstream_project_name`: string - Name of the upstream project that owns the source submittal. e.g. `Downtown Tower - GC`
    - `upstream_company_name`: string - Name of the upstream company that owns the source submittal. e.g. `Upstream Builders Inc.`
    - `upstream_project_id`: string - Identifier of the upstream project. e.g. `2361000`
    - `upstream_company_id`: string - Identifier of the upstream company. e.g. `375`

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/{id}  **[BETA]**

**Return an External Submittal.**
Return an External Submittal for the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External Submittal ID

Response 200 (application/json): object

- `data`: object - The connected submittal record.
  - `id`: string - Unique identifier of the connected submittal. Use as the {id} path parameter for GET /connected_submittals/{id}, GET /connected_submittals/{id}/revisions, and PATCH /connected_submittals/{id}/linked_local_submittals. e.g. `55321441`
  - `number`: string - Display number of the connected submittal. When spec-section numbering is enabled for the project, this is the spec-section-prefixed number. e.g. `1`
  - `title`: string - Title of the connected submittal. May be null if the upstream submittal has no title. e.g. `Flooring Product Data`
  - `description`: string - Free-text description of the connected submittal. May be null. e.g. `Product data for flooring materials.`
  - `status`: string enum[closed, deleted, outdated, reopened] - Downstream projection status of the connected submittal, derived from the upstream source. This is not a submittal log status. e.g. `closed`
  - `translated_status`: string - Localized, human-readable label for the downstream `status`, suitable for display. e.g. `Closed`
  - `revision`: string - Revision label of the connected submittal. May be null. e.g. `1`
  - `current_revision`: boolean - Whether this record is the current revision of the connected submittal. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the connected submittal projection was created, in ISO 8601 format. e.g. `2024-06-09T15:14:38Z`
  - `last_updated_at`: string(date-time) - Timestamp when the connected submittal projection was last updated, in ISO 8601 format. e.g. `2025-01-07T19:52:46Z`
  - `deleted_at`: string(date-time) - Timestamp when the connected submittal was soft-deleted, in ISO 8601 format. Null when the record is not deleted. e.g. `2025-02-01T10:00:00Z`
  - `for_record_only`: boolean - Whether the submittal is marked for record only (no workflow response required). e.g. `false`
  - `private`: boolean - Whether the submittal is private and visible only to permitted users. e.g. `false`
  - `buffer_time`: integer - Buffer time, in days, configured for the submittal schedule. Null when not set. e.g. `2`
  - `lead_time`: integer - Lead time, in days, for the submittal. Null when not set. e.g. `14`
  - `prepare_time`: integer - Preparation time, in days, for the submittal. Null when not set. e.g. `5`
  - `design_team_review_time`: integer - Design team review time, in days. Null when not set. e.g. `7`
  - `internal_review_time`: integer - Internal review time, in days. Null when not set. e.g. `3`
  - `revision_source_connected_submittal_id`: string - ID of the connected submittal that is the source revision for this record. Null when this record is the original revision. e.g. `55321440`
  - `connection_status`: string enum[connected, disconnected] - Whether the connected submittal's upstream project connection is currently syncing (`connected`) or not (`disconnected`). e.g. `connected`
  - `actual_delivery_date`: string(date-time) - Actual delivery date, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-26T11:00:00Z`
  - `confirmed_delivery_date`: string(date-time) - Confirmed delivery date, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-20T11:00:00Z`
  - `distributed_at`: string(date-time) - Date the submittal was distributed, rendered at noon in the project time zone. Null when not distributed. e.g. `2025-01-07T19:52:46Z`
  - `due_date`: string(date-time) - Due date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2025-02-04T11:00:00Z`
  - `issue_date`: string(date-time) - Issue date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-06-09T10:00:00Z`
  - `received_date`: string(date-time) - Date the submittal was received, rendered at noon in the project time zone. Null when not set. e.g. `2024-06-15T11:00:00Z`
  - `required_on_site_date`: string(date-time) - Required-on-site date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-26T11:00:00Z`
  - `submit_by`: string(date-time) - Submit-by date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-07-17T10:00:00Z`
  - `type`: object - Submittal type of the connected submittal. Null when no type is assigned.
    - `id`: string - Identifier of the submittal type. e.g. `10`
    - `name`: string - Name of the submittal type. e.g. `Product Information`
    - `translated_name`: string - Localized, human-readable name of the submittal type. e.g. `Product Information`
  - `responsible_contractor`: object - Vendor responsible for the connected submittal. Null when none is assigned.
    - `id`: string - Identifier of the responsible contractor vendor. e.g. `3168811`
    - `name`: string - Name of the responsible contractor vendor. e.g. `Arsh Kaur`
  - `created_by`: object - Contact who created the upstream submittal.
    - `id`: string - Identifier of the contact. e.g. `11555146`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408095`
    - `name`: string - Full name of the contact. e.g. `Heba Essam`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Acme Construction`
  - `received_from`: object - Contact the submittal was received from. Null when not set.
    - `id`: string - Identifier of the contact. e.g. `11555147`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408096`
    - `name`: string - Full name of the contact. e.g. `John Doe`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Acme Construction`
  - `submittal_manager`: object - Contact assigned as the submittal manager.
    - `id`: string - Identifier of the contact. e.g. `4301913`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408097`
    - `name`: string - Full name of the contact. e.g. `Dallas Hall`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Procore Technologies`
  - `specification_section`: object - Specification section associated with the connected submittal. Null when none is assigned.
    - `id`: string - Identifier of the specification section. e.g. `999`
    - `number`: string - Specification section number. e.g. `03 10 00`
    - `description`: string - Specification section description. e.g. `Concrete`
    - `label`: string - Display label combining the section number and description. e.g. `03 10 00 - Concrete`
  - `linked_local_submittals`: array of object - Local submittals linked to this connected submittal.
    - `id`: string - Identifier of the local submittal. e.g. `101`
    - `formatted_number`: string - Formatted submittal number. e.g. `001`
    - `number`: string - Submittal number. e.g. `1`
    - `revision`: string - Revision label of the local submittal. e.g. `0`
    - `title`: string - Title of the local submittal. e.g. `Steel Drawings`
    - `status`: object - Current status of the local submittal. Null when the submittal has no status.
  - `has_revisions`: boolean - Whether the connected submittal has additional revisions. Present only on the show (single-record) response. e.g. `true`
  - `connected_distributed_submittals`: array of object - List of values
    - `id`: string - Id e.g. `25566360`
    - `distributed_by`: object - Distributed By
    - `distributed_responses`: array of object - List of Connected Distributed Responses
    - `distributed_to`: array of object - List of values
    - `message`: string - Message e.g. `<p>test distributed</p>`
    - `sent_at`: string - Sent At e.g. `2025-01-07T19:52:46Z`
    - `submittal_description`: string - Submittal Description e.g. `<p>Distribution Description</p>`
    - `submittal_distributed_attachments`: array of object - List of Connected Distributed Attachments
  - `connected_submittal_connection_detail`: object - Details about the upstream project connection for this connected submittal. Present only on the show (single-record) response.
    - `id`: string - Identifier of the connection detail record. e.g. `778821`
    - `status`: string enum[connected, disconnected] - Whether the upstream connection is currently connected or disconnected. e.g. `connected`
    - `upstream_company_name`: string - Name of the upstream company that owns the source submittal. e.g. `Upstream Builders Inc.`
  - `linked_drawings`: array of object - Drawings linked to the connected submittal upstream. Present only on the show (single-record) response.
    - `id`: string - Identifier of the linked drawing record. e.g. `90211`
    - `attachment`: object - File attachment metadata for the linked drawing (identifier, name, and viewable/download URL).
  - `cover_sheet`: object - Most recent generated cover sheet PDF export for the connected submittal, with its file attachment. Null when no export exists. Present only on the show (single-record) response.
    - `id`: string - Identifier of the cover sheet PDF export record. e.g. `55110`
    - `attachment`: object - File attachment metadata for the cover sheet PDF (identifier, name, and viewable/download URL).
  - `project_connection`: object - Upstream project connection identifiers and names for the connected submittal. Null when there is no active connection. Present only on the show (single-record) response.
    - `upstream_project_name`: string - Name of the upstream project that owns the source submittal. e.g. `Downtown Tower - GC`
    - `upstream_company_name`: string - Name of the upstream company that owns the source submittal. e.g. `Upstream Builders Inc.`
    - `upstream_project_id`: string - Identifier of the upstream project. e.g. `2361000`
    - `upstream_company_id`: string - Identifier of the upstream company. e.g. `375`

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/{id}/linked_local_submittals  **[BETA]**

**Update linked local submittals for an External Submittal.**
Adds or removes local submittals linked to an External Submittal. At least one of linked_local_submittals_added_ids or linked_local_submittals_removed_ids must be provided.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External Submittal ID

Request body (application/json) (required):

- `linked_local_submittals_added_ids`: array of string - IDs of local submittals to link to the External Submittal. e.g. `["101", "102"]`
- `linked_local_submittals_removed_ids`: array of string - IDs of local submittals to unlink from the External Submittal. e.g. `["203"]`

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier of the linked local submittal. e.g. `101`
  - `formatted_number`: string - Formatted submittal number. e.g. `001`
  - `number`: string - Submittal number. e.g. `001`
  - `revision`: string - Revision label of the linked local submittal. Null when the submittal has no revision. e.g. `01`
  - `title`: string - Title of the linked local submittal. Null when the submittal has no title. e.g. `Steel Drawings`
  - `status`: object - Current status of the linked local submittal. Null when the submittal has no assigned status.
    - `id`: string - Status ID. e.g. `5`
    - `status`: string - Machine-readable status key. e.g. `open`
    - `name`: string - Display name of the status. e.g. `Open`

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/export  **[BETA]**

**Download a list of External Submittals.**
Download a CSV or PDF of the External Submittals List.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `export_format` [query] string enum[csv, pdf] (required) - Export File Format

Response 200 (application/pdf): string


Response 202: Accepted (no body)

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/{id}/revisions  **[BETA]**

**List revisions for an External Submittal.**
Return all revisions for the specified External Submittal, ordered from the most recent revision to the oldest.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External Submittal ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: object - The connected submittal record.
  - `id`: string - Unique identifier of the connected submittal. Use as the {id} path parameter for GET /connected_submittals/{id}, GET /connected_submittals/{id}/revisions, and PATCH /connected_submittals/{id}/linked_local_submittals. e.g. `55321441`
  - `number`: string - Display number of the connected submittal. When spec-section numbering is enabled for the project, this is the spec-section-prefixed number. e.g. `1`
  - `title`: string - Title of the connected submittal. May be null if the upstream submittal has no title. e.g. `Flooring Product Data`
  - `description`: string - Free-text description of the connected submittal. May be null. e.g. `Product data for flooring materials.`
  - `status`: string enum[closed, deleted, outdated, reopened] - Downstream projection status of the connected submittal, derived from the upstream source. This is not a submittal log status. e.g. `closed`
  - `translated_status`: string - Localized, human-readable label for the downstream `status`, suitable for display. e.g. `Closed`
  - `revision`: string - Revision label of the connected submittal. May be null. e.g. `1`
  - `current_revision`: boolean - Whether this record is the current revision of the connected submittal. e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the connected submittal projection was created, in ISO 8601 format. e.g. `2024-06-09T15:14:38Z`
  - `last_updated_at`: string(date-time) - Timestamp when the connected submittal projection was last updated, in ISO 8601 format. e.g. `2025-01-07T19:52:46Z`
  - `deleted_at`: string(date-time) - Timestamp when the connected submittal was soft-deleted, in ISO 8601 format. Null when the record is not deleted. e.g. `2025-02-01T10:00:00Z`
  - `for_record_only`: boolean - Whether the submittal is marked for record only (no workflow response required). e.g. `false`
  - `private`: boolean - Whether the submittal is private and visible only to permitted users. e.g. `false`
  - `buffer_time`: integer - Buffer time, in days, configured for the submittal schedule. Null when not set. e.g. `2`
  - `lead_time`: integer - Lead time, in days, for the submittal. Null when not set. e.g. `14`
  - `prepare_time`: integer - Preparation time, in days, for the submittal. Null when not set. e.g. `5`
  - `design_team_review_time`: integer - Design team review time, in days. Null when not set. e.g. `7`
  - `internal_review_time`: integer - Internal review time, in days. Null when not set. e.g. `3`
  - `revision_source_connected_submittal_id`: string - ID of the connected submittal that is the source revision for this record. Null when this record is the original revision. e.g. `55321440`
  - `connection_status`: string enum[connected, disconnected] - Whether the connected submittal's upstream project connection is currently syncing (`connected`) or not (`disconnected`). e.g. `connected`
  - `actual_delivery_date`: string(date-time) - Actual delivery date, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-26T11:00:00Z`
  - `confirmed_delivery_date`: string(date-time) - Confirmed delivery date, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-20T11:00:00Z`
  - `distributed_at`: string(date-time) - Date the submittal was distributed, rendered at noon in the project time zone. Null when not distributed. e.g. `2025-01-07T19:52:46Z`
  - `due_date`: string(date-time) - Due date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2025-02-04T11:00:00Z`
  - `issue_date`: string(date-time) - Issue date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-06-09T10:00:00Z`
  - `received_date`: string(date-time) - Date the submittal was received, rendered at noon in the project time zone. Null when not set. e.g. `2024-06-15T11:00:00Z`
  - `required_on_site_date`: string(date-time) - Required-on-site date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-12-26T11:00:00Z`
  - `submit_by`: string(date-time) - Submit-by date for the submittal, rendered at noon in the project time zone. Null when not set. e.g. `2024-07-17T10:00:00Z`
  - `type`: object - Submittal type of the connected submittal. Null when no type is assigned.
    - `id`: string - Identifier of the submittal type. e.g. `10`
    - `name`: string - Name of the submittal type. e.g. `Product Information`
    - `translated_name`: string - Localized, human-readable name of the submittal type. e.g. `Product Information`
  - `responsible_contractor`: object - Vendor responsible for the connected submittal. Null when none is assigned.
    - `id`: string - Identifier of the responsible contractor vendor. e.g. `3168811`
    - `name`: string - Name of the responsible contractor vendor. e.g. `Arsh Kaur`
  - `created_by`: object - Contact who created the upstream submittal.
    - `id`: string - Identifier of the contact. e.g. `11555146`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408095`
    - `name`: string - Full name of the contact. e.g. `Heba Essam`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Acme Construction`
  - `received_from`: object - Contact the submittal was received from. Null when not set.
    - `id`: string - Identifier of the contact. e.g. `11555147`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408096`
    - `name`: string - Full name of the contact. e.g. `John Doe`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Acme Construction`
  - `submittal_manager`: object - Contact assigned as the submittal manager.
    - `id`: string - Identifier of the contact. e.g. `4301913`
    - `login_information_id`: string - Identifier of the associated login information (user), when the contact maps to a Procore user. Null otherwise. e.g. `8408097`
    - `name`: string - Full name of the contact. e.g. `Dallas Hall`
    - `vendor_name`: string - Name of the vendor the contact belongs to. Null when the contact has no vendor. e.g. `Procore Technologies`
  - `specification_section`: object - Specification section associated with the connected submittal. Null when none is assigned.
    - `id`: string - Identifier of the specification section. e.g. `999`
    - `number`: string - Specification section number. e.g. `03 10 00`
    - `description`: string - Specification section description. e.g. `Concrete`
    - `label`: string - Display label combining the section number and description. e.g. `03 10 00 - Concrete`
  - `linked_local_submittals`: array of object - Local submittals linked to this connected submittal.
    - `id`: string - Identifier of the local submittal. e.g. `101`
    - `formatted_number`: string - Formatted submittal number. e.g. `001`
    - `number`: string - Submittal number. e.g. `1`
    - `revision`: string - Revision label of the local submittal. e.g. `0`
    - `title`: string - Title of the local submittal. e.g. `Steel Drawings`
    - `status`: object - Current status of the local submittal. Null when the submittal has no status.
  - `has_revisions`: boolean - Whether the connected submittal has additional revisions. Present only on the show (single-record) response. e.g. `true`
  - `connected_distributed_submittals`: array of object - List of values
    - `id`: string - Id e.g. `25566360`
    - `distributed_by`: object - Distributed By
    - `distributed_responses`: array of object - List of Connected Distributed Responses
    - `distributed_to`: array of object - List of values
    - `message`: string - Message e.g. `<p>test distributed</p>`
    - `sent_at`: string - Sent At e.g. `2025-01-07T19:52:46Z`
    - `submittal_description`: string - Submittal Description e.g. `<p>Distribution Description</p>`
    - `submittal_distributed_attachments`: array of object - List of Connected Distributed Attachments
  - `connected_submittal_connection_detail`: object - Details about the upstream project connection for this connected submittal. Present only on the show (single-record) response.
    - `id`: string - Identifier of the connection detail record. e.g. `778821`
    - `status`: string enum[connected, disconnected] - Whether the upstream connection is currently connected or disconnected. e.g. `connected`
    - `upstream_company_name`: string - Name of the upstream company that owns the source submittal. e.g. `Upstream Builders Inc.`
  - `linked_drawings`: array of object - Drawings linked to the connected submittal upstream. Present only on the show (single-record) response.
    - `id`: string - Identifier of the linked drawing record. e.g. `90211`
    - `attachment`: object - File attachment metadata for the linked drawing (identifier, name, and viewable/download URL).
  - `cover_sheet`: object - Most recent generated cover sheet PDF export for the connected submittal, with its file attachment. Null when no export exists. Present only on the show (single-record) response.
    - `id`: string - Identifier of the cover sheet PDF export record. e.g. `55110`
    - `attachment`: object - File attachment metadata for the cover sheet PDF (identifier, name, and viewable/download URL).
  - `project_connection`: object - Upstream project connection identifiers and names for the connected submittal. Null when there is no active connection. Present only on the show (single-record) response.
    - `upstream_project_name`: string - Name of the upstream project that owns the source submittal. e.g. `Downtown Tower - GC`
    - `upstream_company_name`: string - Name of the upstream company that owns the source submittal. e.g. `Upstream Builders Inc.`
    - `upstream_project_id`: string - Identifier of the upstream project. e.g. `2361000`
    - `upstream_company_id`: string - Identifier of the upstream company. e.g. `375`

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/{id}/advanced_exports  **[BETA]**

**Show advanced export options for an External Submittal.**
Returns the available advanced export configuration options for the specified External Submittal, including cover sheet and file attachment selections.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External Submittal ID

Response 200 (application/json): object

- `data`: array of object
  - `slug`: string - Unique identifier for the option set. e.g. `files`
  - `name`: string - Display name of the option set. e.g. `Select All`
  - `type`: string enum[single_select, multi_select] - Selection type.
  - `options`: array of object
    - `id`: oneOf(integer | string) - Option identifier. Attachment options use the integer prostore file ID; the cover sheet option uses the string `cover_sheet`.
    - `name`: string - Display name of the option.
    - `content_type`: string - MIME content type (for file options).

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/{id}/advanced_exports  **[BETA]**

**Create an advanced export for an External Submittal.**
Kicks off an advanced export of the specified External Submittal with the selected format and attachments. ZIP exports and multi-file PDF exports are generated asynchronously and do not return a download URL. A PDF export containing only the cover sheet is generated synchronously and returns a download URL.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - External Submittal ID

Request body (application/json) (required):

- `format`: string enum[pdf, zip] (required) - Export file format. e.g. `pdf`
- `options`: object (required) - Advanced export options.
  - `files`: array of string - IDs of the External Submittal attachments to include in the export. Include the cover sheet slug to prepend a cover sheet. e.g. `["101", "cover_sheet"]`

Response 200 (application/json): object

- `data`: object - Export result data.
  - `message`: string - Success message.
  - `url`: string - URL to download the exported file (only present when the export is generated synchronously).

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## External Submittals Filter Options

Resource id: `external-submittals-filter-options`. Raw spec: `../openapi-raw/external-submittals-filter-options.json`. Web: https://developers.procore.com/reference/rest/external-submittals-filter-options?version=latest
Product lines: PM Essentials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options  **[BETA]**

**List available External Submittal Filter Options**
Returns a list of available External Submittals Filter Options for the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Machine-readable identifier of the filter. Use this value as the path segment when requesting the filter's available options (for example, request the `submittal_manager_contact_id` options endpoint). e.g. `submittal_manager_contact_id`
  - `value`: string - Localized, human-readable label for the filter, suitable for display in a filter menu. e.g. `Submittal Manager`
  - `endpoint`: string - Relative URL of the endpoint that returns the selectable options for this filter. Call it to populate the filter's choices. e.g. `/rest/v2.0/companies/:company_id/projects/:project_id/external_submittals/fil...`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/connection_status  **[BETA]**

**List existing Connection Status filter options**
Returns a list of available Connection Status filter options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Connection status value for this filter option. Submit it as the connection status filter value when querying the external submittals list. e.g. `connected`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `connected`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/created_by_contact_id  **[BETA]**

**List existing Created By filter options**
Returns a list of available Created By filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `999`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/current_revision  **[BETA]**

**List existing Current Revision filter options**
Returns a list of available Current Revision filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `true`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `Yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/number  **[BETA]**

**List existing Number filter options**
Returns a list of available Number filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `123`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `456`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/private  **[BETA]**

**List existing Private filter options**
Returns a list of available Private filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `true`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `Yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/received_from_contact_id  **[BETA]**

**List existing Received From filter options**
Returns a list of available Received From filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `999`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/responsible_contractor_vendor_id  **[BETA]**

**List existing Responsible Contractor filter options**
Returns a list of available Responsible Contractor filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `999`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `John Doe's Company`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/status_id  **[BETA]**

**List existing Status filter options**
Returns a list of available Status filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `999`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/specification_section_id  **[BETA]**

**List existing Specification Section filter options**
Returns a list of available Specification Section filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `999`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `03 10 00 - Concrete`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/submittal_manager_contact_id  **[BETA]**

**List existing Submittal Manager filter options**
Returns a list of available Submittal Manager filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `999`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `John Doe`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/linked_to_local_submittals  **[BETA]**

**List existing Linked to Local Submittals filter options**
Returns a list of boolean filter options indicating whether External Submittals are linked to local submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: string - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `true`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `Yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/external_submittals/filter_options/type_id  **[BETA]**

**List existing Type filter options**
Returns a list of available Type filter fields and options for External Submittals on the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object
  - `key`: integer - Identifier for this filter option. Submit it as the filter value when querying the external submittals list. e.g. `999`
  - `value`: string - Localized, human-readable label for this filter option, suitable for display. e.g. `Type A`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Submittal Approvers

Resource id: `submittal-approvers`. Raw spec: `../openapi-raw/submittal-approvers.json`. Web: https://developers.procore.com/reference/rest/submittal-approvers?version=latest
Product lines: PM Essentials

### PATCH /rest/v1.0/submittal_approvers/{id}

**Update Submittal Approver**
Update Submittal Approver for the specified Submittal

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Submittal Approver ID
- `project_id` [query] integer (required) - Unique identifier for the project.
- `send_emails` [query] boolean - Designates whether or not emails will be sent (default false)
- `submittal_id` [query] integer (required) - Submittal ID

Request body (application/json) (required):

- `submittal_approver`: object
  - `attachments_to_upload`: array of string - Submittal Approver's Attachments. To upload attachments you must upload the entire payload as `multipart/form-data` content-type and specify each parameter as form-data together with `attachments_to_upload[]` as files.
  - `attachment_ids`: array of integer - Submittal Approver's Attachment IDs. The Attachments specified here will be saved as attachments through the request.
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `comment`: string - Reviewer comment to record alongside the response.
  - `submittal_response_id`: integer (required) - ID of the Submittal Response to record for this approver (the review outcome, e.g. Approved / Revise & Resubmit). Must be a response available to the approver.
  - `sent_date`: string - Date the submittal was sent to the approver. Only settable by users who can respond on behalf of the approver (admins). e.g. `2019-4-17`
  - `returned_date`: string - Date the approver returned their response. Only settable by users who can respond on behalf of the approver (admins). e.g. `2019-4-17`
  - `forward_to`: object - Params used only when forwarding for review. Designates who the new reviewer is and what their due date is
    - `user_id`: integer (required) - User ID of the new reviewer e.g. `161072`
    - `due_date`: string(date) - Due Date of the new reviewer e.g. `2019-09-20`
  - `associated_attachments`: array of object - Submital Approver's Attachments to be carried forward. The Attachments specified here will be carried forward to the next person in the workflow.
    - `attachment_id`: integer (required) - Attachment ID
    - `attachment_source_id`: integer (required) - ID of the resource the Attachment originally belongs to
    - `attachment_source_type`: string (required) - Type of the resource the Attachment originally belongs to

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Submittal Approver. Use as the {id} path parameter to PATCH /rest/v1.0/submittal_approvers/{id}.
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `snapshot.png`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `comment`: string - Submittal Approver's comment
- `returned_date`: string(date) - The date the Submittal Approver responded to the Submittal
- `sent_date`: string(date) - The date the Submittal was sent to the Submittal Approver
- `days_to_respond`: integer - The number of days the Submittal Approver has to respond
- `submittal_response_id`: integer - The Submittal Response ID of the Submittal Approver

Error responses: 400, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Submittal Logs

Resource id: `submittal-logs`. Raw spec: `../openapi-raw/submittal-logs.json`. Web: https://developers.procore.com/reference/rest/submittal-logs?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/submittal_logs  **[DEPRECATED]**

**List Submittals**
This is a deprecated endpoint. Please use /submittals endpoint.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[approved_id]` [query] string
- `filters[ball_in_court]` [query] string
- `filters[date_range]` [query] string
- `filters[due_by]` [query] string(date)
- `filters[end_date]` [query] string(date)
- `filters[include_sublocations]` [query] boolean - Use together with `filters[location_id]`
- `filters[location_id]` [query] array of integer - Location ID. Returns item(s) with the specified Location ID or a range of Location IDs.
- `filters[only_current_revision]` [query] integer enum[1]
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[received_from_id]` [query] integer - Received From ID
- `filters[response]` [query] string
- `filters[responsible_contractor_id]` [query] array of integer - Array of Responsible Contractor IDs. A single Responsible Contractor ID is also accepted.
- `filters[spec_division]` [query] string
- `filters[spec_section_id]` [query] string
- `filters[start_date]` [query] string(date)
- `filters[status]` [query] array of string - Returns item(s) matching the specified status value.
- `filters[submittal_type]` [query] string
- `filters[submittal_package_id]` [query] array of integer - Array of Submittal Package IDs. Returns item(s) associated with the specified Submittal Package IDs. A single integer value is also accepted.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer (required) - Unique identifier of the Submittal Log. Use as the `{id}` path parameter to retrieve a single Submittal Log. e.g. `252579`
- `title`: string - Title of the Submittal Log. e.g. `Steel D8 Beam`
- `number`: string (required) - User-facing Submittal Log number (may be alphanumeric). e.g. `49`
- `revision`: string - Revision label of the Submittal Log. e.g. `0`
- `due_date`: string(date) - Date the Submittal Log response is due, in ISO 8601 (YYYY-MM-DD) format. e.g. `2013-04-15`
- `attachment_count`: integer - Number of files attached to the Submittal Log. e.g. `1`
- `status`: string (required) - Current status label of the Submittal Log (for example, Open or Closed). e.g. `Closed`
- `closed`: boolean - True when the Submittal Log is in a closed status. e.g. `true`
- `specification_section`: object - Specification section the Submittal Log belongs to. Omitted when the log is not associated with a section.
  - `id`: integer - Unique identifier of the specification section. e.g. `212630`
  - `description`: string - Description of the specification section. e.g. `Metal Fabrications`
  - `section`: string - Specification section number. e.g. `55000`
- `package`: object - Submittal Package the log belongs to. Omitted when the log is not part of a package.
  - `id`: string - Unique identifier of the Submittal Package. e.g. `90210`
  - `title`: string - Title of the Submittal Package. e.g. `Somebody's Package`
- `ball_in_court`: array of object - Users currently responsible for acting on the Submittal Log (the "ball in court").
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Display name of the user. e.g. `Carl Contractor`
- `responses`: array of object - Distributed responses recorded for the Submittal Log. Present only when the log is closed and has a distributed submittal.
  - `response`: string - Localized response label. e.g. `Closed Submittal Response`
- `location`: object - Physical location associated with the Submittal Log. Omitted when no location is set.
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Full location name, including parent locations. e.g. `1space>1 space`
  - `node_name`: string - Name of this location node, without parent locations. e.g. `1 space`
  - `parent_id`: integer - ID of the parent location, if any. e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/submittal_logs/{id}  **[DEPRECATED]**

**Show Submittal**
This is a deprecated endpoint. Please use /submittals/{id} endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of Submittal
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Submittal Log. Use as the `{id}` path parameter to retrieve this Submittal Log. e.g. `610071`
- `title`: string - Title of the Submittal Log. e.g. `Smiths - Teardown & Assembly Bldg`
- `number`: string - User-facing Submittal Log number (may be alphanumeric). e.g. `118`
- `formatted_number`: string - Deprecated. Combined specification-section and number label. No longer returned by this endpoint; use `number` instead. e.g. `55000-118`
- `revision`: string - Revision label of the Submittal Log. e.g. `0`
- `private`: boolean - True when the Submittal Log is marked private. e.g. `false`
- `received_date`: string(date) - Date the submittal was received, in ISO 8601 (YYYY-MM-DD) format. e.g. `2014-06-09`
- `issue_date`: string(date) - Date the submittal was issued, in ISO 8601 (YYYY-MM-DD) format. e.g. `2014-06-02`
- `submit_by`: string(date) - Date the submittal must be submitted by, in ISO 8601 (YYYY-MM-DD) format. e.g. `2014-06-11`
- `due_date`: string(date) - Date the response is due, in ISO 8601 (YYYY-MM-DD) format. e.g. `2014-07-22`
- `type`: string - Submittal type label (for example, Product Information). e.g. `Product Information`
- `description`: string - Plain-text description of the Submittal Log (HTML markup removed). e.g. `For your review and approval. Paul Revere 555-555-5555`
- `status`: string - Current status label of the Submittal Log. e.g. `Open`
- `closed`: boolean - True when the Submittal Log is in a closed status. e.g. `false`
- `created_by`: object - User who created the Submittal Log.
  - `name`: string - Display name of the user. e.g. `Paul Revere`
  - `login`: string(email) - Email address of the user. e.g. `paulrevere@example.com`
  - `login_id`: integer - Unique identifier of the user. e.g. `39023`
- `received_from`: object - User the submittal was received from. Omitted when no sender is recorded.
  - `name`: string - Display name of the user. e.g. `Frank Sinatra`
  - `login`: string(email) - Email address of the user. e.g. `frankie@example.com`
  - `login_id`: integer - Unique identifier of the user. e.g. `88402`
- `approvers`: array of object - Approvers assigned to the Submittal Log, including their response and any returned attachments.
  - `login_information`: object - The approver's user information.
    - `id`: integer - Unique identifier of the user. e.g. `160586`
    - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
    - `name`: string - Display name of the user. e.g. `Carl Contractor`
  - `id`: integer - Unique identifier of the approver record. e.g. `939302`
  - `response`: string - The approver's response label. e.g. `Approved as Noted`
  - `sent_date`: string(date) - Date the submittal was sent to the approver, in ISO 8601 format. e.g. `2014-05-10`
  - `returned_date`: string(date) - Date the approver returned the submittal, in ISO 8601 format. e.g. `2014-05-12`
  - `due_date`: string(date) - Date the approver's response is due, in ISO 8601 format. e.g. `2014-05-12`
  - `days_to_respond`: integer - Number of days allotted for the approver to respond. e.g. `2`
  - `comment`: string - Comment left by the approver with their response. e.g. `See attached drawing for wall dimensions.`
  - `distributed`: array of integer - IDs of users the approver's response was distributed to.
  - `attachments`: array of object - Files returned by the approver with their response.
    - `id`: integer - Unique identifier of the attachment. e.g. `5324`
    - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
    - `filename`: string - File name of the attachment. e.g. `january_receipt_copy.jpg`
- `distribution_members`: array of object - Users on the Submittal Log's distribution list.
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Display name of the user. e.g. `Carl Contractor`
- `ball_in_court`: array of object - Users currently responsible for acting on the Submittal Log (the "ball in court").
  - `id`: integer - Unique identifier of the user. e.g. `160586`
  - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
  - `name`: string - Display name of the user. e.g. `Carl Contractor`
- `location`: object - Physical location associated with the Submittal Log.
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Full location name, including parent locations. e.g. `1space>1 space`
  - `node_name`: string - Name of this location node, without parent locations. e.g. `1 space`
  - `parent_id`: integer - ID of the parent location, if any. e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `specification_section`: object - Specification section the Submittal Log belongs to. Omitted when the log is not associated with a section.
  - `id`: integer - Unique identifier of the specification section. e.g. `212630`
  - `description`: string - Description of the specification section. e.g. `Metal Fabrications`
  - `section`: string - Specification section number. e.g. `55000`
  - `current_revision_id`: integer - Identifier of the specification section's current revision, if versioned. e.g. `445128`
- `attachments`: array of object - Files attached directly to the Submittal Log.
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - File name of the attachment. e.g. `january_receipt_copy.jpg`
- `distribution_info`: object - Details of the most recent distribution of the Submittal Log. Omitted when the log has not been distributed.
  - `id`: integer - Unique identifier of the distribution record. e.g. `122765`
  - `message`: string - Message included with the distribution.
  - `distributed_date`: string(date-time) - Timestamp when the submittal was distributed, in ISO 8601 format. e.g. `2014-04-20T20:08:09Z`
  - `distributed_by`: object - User who performed the distribution.
    - `id`: integer - Unique identifier of the user. e.g. `160586`
    - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
    - `name`: string - Display name of the user. e.g. `Carl Contractor`
  - `distributed_to`: array of object - Users the submittal was distributed to.
    - `id`: integer - Unique identifier of the user. e.g. `160586`
    - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
    - `name`: string - Display name of the user. e.g. `Carl Contractor`
  - `final_attachments`: array of object - Final attachments included with the distribution.
    - `id`: integer - Unique identifier of the attachment. e.g. `5324`
    - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
    - `filename`: string - File name of the attachment. e.g. `january_receipt_copy.jpg`
- `submittal_package`: object - Submittal Package the log belongs to. Omitted when the log is not part of a package.
  - `id`: integer - Unique identifier of the Submittal Package. e.g. `90210`
  - `title`: string - Title of the Submittal Package. e.g. `Somebody's Package`
  - `created_by`: object - User who created the Submittal Package.
    - `id`: integer - Unique identifier of the user. e.g. `160586`
    - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
    - `name`: string - Display name of the user. e.g. `Carl Contractor`
  - `description`: string - Plain-text description of the Submittal Package (HTML markup removed).
  - `attachments`: array of object - Files attached to the Submittal Package.
    - `id`: integer - Unique identifier of the attachment. e.g. `5324`
    - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
    - `filename`: string - File name of the attachment. e.g. `january_receipt_copy.jpg`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Submittal Packages

Resource id: `submittal-packages`. Raw spec: `../openapi-raw/submittal-packages.json`. Web: https://developers.procore.com/reference/rest/submittal-packages?version=latest
Product lines: PM Essentials

### GET /rest/v1.0/projects/{project_id}/submittal_packages

**List Submittal Packages on a project**
Return a list of all Submittal Packages from a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `attachments_count`: integer - Number of files attached to the Submittal Package. e.g. `2`
- `created_by`: object - User who created the Submittal Package.
  - `id`: integer - Unique identifier of the user. e.g. `161072`
  - `name`: string - Display name of the user. e.g. `Carl the Contractor`
  - `locale`: string - Locale of the user (for example, en). e.g. `en`
  - `login`: string - Email address of the user. e.g. `carl.contractor@example.com`
- `description`: string - Plain-text description of the Submittal Package (HTML markup removed). e.g. `All items for Metal Fabrication`
- `specification_section_id`: integer - Identifier of the specification section associated with the package. Null when the package is not tied to a section. e.g. `212630`
- `updated_at`: string(date-time) - Timestamp of the last update to the Submittal Package, in ISO 8601 format. e.g. `2016-08-01T23:33:54Z`
- `attachments`: array of object - Files attached to the Submittal Package.
  - `id`: integer - Unique identifier of the attachment. e.g. `5324`
  - `url`: string - Download URL for the attachment. e.g. `http://www.example.com/`
  - `filename`: string - File name of the attachment. e.g. `january_receipt_copy.jpg`
- `submittal_ids`: array of integer - IDs of the Submittal Logs that belong to this package.
- `id`: integer - Unique identifier of the Submittal Package. Use as the `{id}` path parameter to retrieve or update this package. e.g. `161072`
- `number`: string - User-facing alphanumeric identifier of the package. e.g. `TBZ-44500`
- `title`: string - Title of the Submittal Package. e.g. `Windows`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Submittal Responses

Resource id: `submittal-responses`. Raw spec: `../openapi-raw/submittal-responses.json`. Web: https://developers.procore.com/reference/rest/submittal-responses?version=latest
Product lines: PM Essentials

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/submittal_responses/{id}  **[BETA]**

**Update Submittal Response**
Update the name of a Submittal Response for the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Submittal Response ID

Request body (application/json):

- `submittal_response`: object (required)
  - `name`: string (required) - New display name for the submittal response. Required. Maximum 255 characters. e.g. `Approved`

Response 200 (application/json): object

- `data`: object
  - `id`: string - Unique identifier of this submittal response option, returned as a string. Use as the {id} path parameter to update the response via PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/submittal_responses/{id}. e.g. `20`
  - `name`: string - Display label shown for this response in the submittal workflow (for example "Approved" or "Rejected"). For default responses this is the localized label; for custom responses it is the user-defined name. This is the ... e.g. `Approved`
  - `considered`: string enum[approved, approved as noted, for record only, forwarded for review, pending, rejected, revise and resubmit, submitted, void] - Underlying disposition category the response maps to, which drives submittal workflow behavior. Fixed when the response is created and cannot be changed. e.g. `approved`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/submittal_responses

**List Submittal Responses**
List Submittal Responses for the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `name`: string - Human-readable label of the Submittal Response. Standard responses are localized; custom responses use the name as entered. e.g. `Pending`
- `considered`: string - Normalized response category that determines how the response is treated in the submittal workflow (for example, whether it closes the submittal). See the create request body for the full set of values. e.g. `pending`
- `id`: integer - Unique identifier of the Submittal Response. Reference this value when assigning a response to a submittal. e.g. `161789`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittal_responses  **[BETA]**

**List Submittal Responses**
List Submittal Responses for the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `name`: string - Human-readable label of the Submittal Response. Standard responses are localized; custom responses use the name as entered. e.g. `Pending`
- `considered`: string - Normalized response category that determines how the response is treated in the submittal workflow (for example, whether it closes the submittal). See the create request body for the full set of values. e.g. `pending`
- `id`: integer - Unique identifier of the Submittal Response. Reference this value when assigning a response to a submittal. e.g. `161789`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/submittal_responses  **[BETA]**

**Create Submittal Response**
Create a Submittal Response for the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json):

- `submittal_response`: object (required)
  - `name`: string (required) - Human-readable label for the Submittal Response as it should appear to users. Required. e.g. `Approved`
  - `considered`: string enum[approved, approved as noted, for record only, forwarded for review, pending, rejected, revise and resubmit, submitted, void] (required) - Normalized response category that determines how the response is treated in the submittal workflow. Required. Must be one of the enumerated values. e.g. `approved`

Response 201 (application/json): object

- `name`: string - Human-readable label of the Submittal Response. Standard responses are localized; custom responses use the name as entered. e.g. `Pending`
- `considered`: string - Normalized response category that determines how the response is treated in the submittal workflow (for example, whether it closes the submittal). See the create request body for the full set of values. e.g. `pending`
- `id`: integer - Unique identifier of the Submittal Response. Reference this value when assigning a response to a submittal. e.g. `161789`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Submittals

Resource id: `submittals`. Raw spec: `../openapi-raw/submittals.json`. Web: https://developers.procore.com/reference/rest/submittals?version=latest
Product lines: PM Essentials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/submittals  **[BETA]**

**Return a list of all Submittals.**
Return a list of all Submittals.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of string - Return item(s) with the specified IDs.
- `filters[anticipated_delivery_date]` [query] array of string(date) - Array of dates (date range). Returns item(s) with their anticipated delivery date within the specified dates. A single date is also accepted. style: form
- `filters[ball_in_court_id]` [query] string - User ID. Return item(s) where the specified User ID is the Ball in Court.
- `filters[ball_in_court_company_id]` [query] string - Company ID. Return item(s) where the specified Company ID is the Ball in Court.
- `filters[closed_at]` [query] string(date) - Return item(s) that are due within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[received_from_id]` [query] array of string - Received From ID
- `filters[responsible_contractor_id]` [query] string - Return item(s) with the specified Responsible Contractor ID.
- `filters[specification_section_id]` [query] array of string - Array of Specification Section IDs. A single Specification Section ID is also accepted.
- `filters[approver_id]` [query] array of string - Array of User IDs. Return item(s) where the specified User IDs are in the approver list. A single integer is also accepted.
- `filters[current_revision]` [query] array of boolean - Default false. If true, only current revisions are shown. If false, all submittals are shown, regardless of whether or not it is the current revision.
- `filters[division]` [query] array of integer - Array of Divisions to filter on. A Division is the first two digits from the Specification Section Number. A single Division is also accepted.
- `filters[location_id]` [query] array of string - Array of Location IDs. A single Location ID is also accepted.
- `filters[submittal_manager_id]` [query] array of string - Array of Submittal Manager IDs. A single Submittal Manager ID is also accepted.
- `filters[submittal_package_id]` [query] array of string - Array of Submittal Package IDs. Returns item(s) associated with the specified Submittal Package IDs. A single integer value is also accepted.
- `filters[response_id]` [query] array of string - Array of Response IDs. A single Response ID is also accepted.
- `filters[sent_date]` [query] array of string(date) - Array of dates (date range). Returns item(s) where an approver's sent date falls within the specified dates. A single date is also accepted. Use "NULL" to filter for submittals with no sent date. style: form
- `filters[workflow_step]` [query] array of string - Array of workflow step numbers. Returns submittal(s) currently on one of the given steps. A single step number is also accepted. Use "NULL" to filter for submittals with no workflow step.
- `filters[status_id]` [query] array of string - Array of Status IDs. A single Status ID is also accepted.
- `filters[type]` [query] array of string - Array of Submittal Types. A single Submittal Type is also accepted.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[unpackaged]` [query] array of boolean - Parseable to boolean value, filters out unpackaged Submittals.
- `filters[number]` [query] array of string - Array of Numbers. A single Number is also accepted.
- `filters[has_operation_errors]` [query] array of boolean - Parseable to boolean value, filters Submittals based on whether they have operation errors from bulk operations.
- `filters[operation_errors_by_operation_id]` [query] array of integer - Filters Submittals that have operation errors associated with specific operation ID(s). Accepts single or multiple operation IDs.
- `sort` [query] string enum[specification_section, number, title, type, status, responsible_contractor, submit_by, received_from, received_date, due_date, due_date_days, workflow_step_days_late, ...] - Structure to sort submittal rows
- `show_attachments` [query] boolean - Determine the AttachmentVisible tag value(depend on configurable field set).
- `minimal_submittal_package` [query] boolean - When `true`, each submittal's `submittal_package` in the response includes only `id`, `number`, `title`, and `created_by` for smaller payloads and faster responses. Omit or set to `false` for the full package object.
- `filters` [query] object - Dynamic configured custom-field filters. Use a `custom_field_{definition_id}` key, for example `filters[custom_field_123]=true` or `filters[custom_field_456][]=789`. Values may be strings or arrays of strings. Use `NU...

Response 200 (application/json): object

- `data`: object - Data
  - `id`: string - Id e.g. `55321441`
  - `actual_delivery_date`: string(date) - The Actual Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `bic_due_date`: string(date) - The Ball-in-Court Due Date of the Submittal. For DSP projects, this comes from the submittal plan. For non-DSP projects with workflows, this is calculated from current step approvers. e.g. `2022-08-19`
  - `confirmed_delivery_date`: string(date) - The Confirmed Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2022-08-19T17:00:00Z`
  - `cost_code_id`: string - The ID of the Cost Code of the Submittal *This field can only be set by admins
  - `current_step_approvers`: array of object - List of approvers for the current workflow step. For completed workflows, this shows approvers from the final step. Empty for submittals without workflows.
    - `id`: string - The ID of the approver e.g. `12345`
    - `response_required`: boolean - Whether a response is required from this approver
    - `user`: object - The user information for the approver
  - `current_step_returned_date`: string(date) - The latest returned date from current step approvers who have answered. For completed workflows, this shows the date from the final step. e.g. `2022-08-19`
  - `current_step_sent_date`: string(date) - The earliest sent date to current step approvers. For completed workflows, this shows the date from the final step. e.g. `2022-08-19`
  - `custom_textarea_1`: string - *This field can only be set by admins
  - `custom_textfield_1`: string - *This field can only be set by admins
  - `description`: string - The Description of the Submittal
  - `design_team_review_time`: integer - The Design Team Review Time of the Submittal (in days) *This field can only be set if the project has schedule calculations enabled
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members of the Submittal
  - `due_date`: string(date) - The Due Date of the Submittal *This field is not available to be set if sequential approvers is enabled e.g. `2022-08-19`
  - `due_date_days`: integer - The number of calendar days between today (in the project's local timezone) and the submittal's due date. Negative values indicate the due date has passed. Returns null when no due date is set. For DSP-enabled project... e.g. `-3`
  - `has_responded_approver`: boolean - Whether the Submittal has at least one approver that has responded, i.e. at least one approver has a returned date set.
  - `internal_review_time`: integer - The Internal Review Time of the Submtital (in days) *This field can only be set if the project has schedule calculations enabled
  - `issue_date`: string(date) - The Issue Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `lead_time`: integer - The Lead Time of the Submittal (in days) *This field can only be set by admins or if the project has schedule calculations enabled
  - `location_id`: string - The Location of the Submittal
  - `number`: string - The Number of the Submittal
  - `private`: boolean - Whether the Submittal is Private or not
  - `received_date`: string(date) - The Received Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `received_from_id`: string - The Received From of the Submittal
  - `response_considered`: string - The response category of the latest completed workflow response (e.g. 'approved', 'void'). Null when no approver has responded.
  - `required_on_site_date`: string(date) - The Required On Site Date of the Submittal *This field can only be set by admins or if the project has schedule calculations enabled e.g. `2022-08-19`
  - `responsible_contractor_id`: string - The Responsible Contractor of the Submittal
  - `revision`: string - The Revision of the Submittal
  - `scheduled_task_key`: string - The key of the Scheduled Task of the Submittal. Note that use of this parameter is deprecated. Please use `scheduled_task_id` instead. *This field can only be set if the project has submittal delivery information enab...
  - `scheduled_task_id`: string - The ID of the Scheduled Task of the Submittal *This field can only be set if the project has submittal delivery information enabled and the user has permissions to view the calendar tool
  - `specification_section_id`: string - The ID of the Specification Section of the Submittal
  - `status_id`: string - The ID of the Submittal Status of the Submittal *This field can only be set by admins
  - `sub_job_id`: string - The ID of the Sub Job of the Submittal
  - `submit_by`: string(date) - The Submit By Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `submittal_manager_id`: string - The ID of the Submittal Manager of the Submittal *This field can only be set by admins
  - `submittal_package_id`: string - The ID of the Submittal Package of the Submittal *This field can only be set by admins
  - `title`: string - The Title of the Submittal
  - `type`: string - The Submittal Type of the Submittal
  - `workflow_approval_status_key`: string enum[rejected, approved, pending, not_started] - The approval state of the Submittal workflow. 'rejected' when the latest completed response is rejected, revise and resubmit, or void; 'approved' when the workflow is complete; 'pending' when at least one approver has...
  - `workflow_step`: object - Current workflow step information. Shows step progress and optional days late indicator. Null for submittals without workflows. e.g. `{"current_step": 2, "total_steps": 3, "days_late": 5}`
    - `current_step`: integer - The current workflow step number (1-based)
    - `total_steps`: integer - The total number of steps in the workflow
    - `days_late`: integer - Number of days the current step is late (only included if positive). Based on the earliest due date of pending approvers in the current step.
  - `permissions`: object - Row-level permissions for submittal list actions and inline editing.
    - `can_edit`: boolean - Whether the current user can open the edit action for this submittal.
    - `can_inline_update`: boolean - Whether the current user can update generic inline-editable fields.
    - `can_update_status`: boolean - Whether the current user can update this submittal's status inline.
    - `can_update_submit_by`: boolean - Whether the current user can update this submittal's submit by date inline.
    - `can_update_workflow_dates`: boolean - Whether the current user can update workflow sent and returned dates inline.
    - `can_view_buffer_time_and_variance`: boolean - Whether the current user can view buffer time and variance for this submittal.
  - `custom_field_%{custom_field_definition_id}`: object
    - `custom_field_%{custom_field_string_definition_id}`: object
    - `custom_field_%{custom_field_decimal_definition_id}`: object
    - `custom_field_%{custom_field_boolean_definition_id}`: object
    - `custom_field_%{custom_field_lov_entry_definition_id}`: object
    - `custom_field_%{custom_field_lov_entries_definition_id}`: object

Error responses: 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals

**List Submittals on a project**
Return a list of all Submittals from a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
See [Downloading attachments with markup](https://developers.procore.com/reference/rest/document-markup#show-or-create-document-markup-downloadable-pdf) for information on downloading attachments with markup as a PDF.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[ball_in_court_id]` [query] integer - User ID. Return item(s) where the specified User ID is the Ball in Court.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[received_from_id]` [query] integer - Received From ID
- `filters[responsible_contractor_id]` [query] array of integer - Array of Responsible Contractor IDs. A single Responsible Contractor ID is also accepted.
- `filters[required_on_site_date]` [query] array of string(date) - Array of dates (date range). Returns item(s) with their required on site date withing the specified dates. A single date is also accepted. style: form
- `filters[specification_section_id]` [query] array of integer - Array of Specification Section IDs. A single Specification Section ID is also accepted.
- `filters[approver_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are in the approver list. A single integer is also accepted.
- `filters[current_revision]` [query] boolean - Default false. If true, only current revisions are shown. If false, all submittals are shown, regardless of whether or not it is the current revision.
- `filters[division]` [query] array of integer - Array of Divisions to filter on. A Division is the first two digits from the Specification Section Number. A single Division is also accepted.
- `filters[location_id]` [query] array of integer - Array of Location IDs. A single Location ID is also accepted.
- `filters[submittal_manager_id]` [query] array of integer - Array of Submittal Manager IDs. A single Submittal Manager ID is also accepted.
- `filters[submittal_package_id]` [query] array of integer - Array of Submittal Package IDs. Returns item(s) associated with the specified Submittal Package IDs. A single integer value is also accepted.
- `filters[response_id]` [query] array of integer - Array of Response IDs. A single Response ID is also accepted.
- `filters[status_id]` [query] array of integer - Array of Status IDs. A single Status ID is also accepted.
- `filters[type]` [query] array of string - Array of Submittal Types. A single Submittal Type is also accepted.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[unpackaged]` [query] boolean - Parseable to boolean value, filters out unpackaged Submittals.
- `filters[number]` [query] array of string - Array of Numbers. A single Number is also accepted.
- `filters[task_id]` [query] array of integer - Array of Submittal Task IDs. Returns item(s) associated with the specified Submittal Task IDs. A single integer value is also accepted.
- `filters[anticipated_delivery_date]` [query] array of string(date) - Array of dates (date range). Returns item(s) with their anticipated delivery date within the specified dates. A single date is also accepted. style: form
- `sort` [query] string enum[specification_section, number, title, type, status, responsible_contractor, submit_by, received_from, received_date, due_date, distributed_at, submittal_package, ...]

Response 200 (application/json): array of object

- `id`: integer e.g. `161072`
- `number`: string e.g. `42`
- `formatted_number`: string e.g. `S-042`
- `title`: string e.g. `Steel Beams`
- `description`: string e.g. `Steel Beams`
- `revision`: string e.g. `1`
- `current_revision`: boolean e.g. `true`
- `private`: boolean e.g. `false`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) e.g. `2012-10-23`
- `issue_date`: string(date) e.g. `2012-10-23`
- `received_date`: string(date) e.g. `2012-10-23`
- `submit_by`: string(date) e.g. `2012-10-23`
- `actual_delivery_date`: string(date) e.g. `2012-10-23`
- `required_on_site_date`: string(date) e.g. `2012-10-23`
- `distributed_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `submittal_workflow_template_applied_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `lead_time`: integer e.g. `14`
- `location_id`: integer e.g. `161072`
- `cost_code_id`: integer e.g. `161072`
- `sub_job_id`: integer e.g. `161072`
- `created_by`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `received_from`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `submittal_manager`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `distribution_members`: array of object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `name`: string - Name e.g. `Carl Contractor`
  - `initials`: string e.g. `CC`
  - `vendor`: object
    - `id`: integer - ID
    - `name`: string e.g. `IV Plumber's Union`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
  - `translated_name`: string - translated type name e.g. `Field Measurement`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `submittal_workflow_template`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Standard Review`
- `drawing_ids`: array of integer
- `linked_drawing_ids`: array of integer
- `associated_attachments`: array of object
  - `id`: integer e.g. `161072`
  - `file_unavailable`: boolean - Whether the underlying file is currently unavailable (e.g. still processing or removed). When true, `url`, `filename`, and `content_type` may be null. e.g. `false`
  - `additional_page_count`: integer e.g. `0`
  - `attachment_id`: integer e.g. `161072`
  - `attached_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `content_type`: string e.g. `pdf`
  - `document_markup_layer_id`: integer e.g. `161072`
  - `filename`: string e.g. `steel_beams.pdf`
  - `markup_updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `state`: string e.g. `current`
  - `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `url`: string e.g. `example.com/steel_beams.pdf`
  - `version_timestamp`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `approvers`: array of object
  - `id`: integer e.g. `161072`
  - `approver_type`: string e.g. `Approver`
  - `associated_attachments`: array of object
    - `id`: integer e.g. `161072`
    - `file_unavailable`: boolean - Whether the underlying file is currently unavailable (e.g. still processing or removed). When true, `url`, `filename`, and `content_type` may be null. e.g. `false`
    - `additional_page_count`: integer e.g. `0`
    - `attachment_id`: integer e.g. `161072`
    - `attached_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
    - `content_type`: string e.g. `pdf`
    - `document_markup_layer_id`: integer e.g. `161072`
    - `filename`: string e.g. `steel_beams.pdf`
    - `markup_updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
    - `state`: string e.g. `current`
    - `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
    - `url`: string e.g. `example.com/steel_beams.pdf`
    - `version_timestamp`: string(date-time) e.g. `2012-10-23T21:39:40Z`
  - `comment`: string e.g. `These look great to me!`
  - `due_date`: string(date) e.g. `2012-10-23`
  - `response_required`: boolean e.g. `true`
  - `response`: object
    - `id`: integer - ID e.g. `161789`
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
  - `returned_date`: string(date) e.g. `2012-10-23`
  - `sent_date`: string(date) e.g. `2012-10-23`
  - `days_to_respond`: integer e.g. `2`
  - `user`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `variance`: number e.g. `0.5`
  - `workflow_group_number`: integer - The step in the workflow that the approver is on e.g. `0`
- `last_distributed_submittal`: object
  - `id`: integer e.g. `161072`
  - `distributed_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `distributed_responses`: array of object
    - `id`: integer e.g. `161072`
    - `comment`: string e.g. `I approve this`
    - `distributed_attachments`: array of object
    - `submittal_response`: object
    - `submittal_response_id`: integer e.g. `161072`
    - `submittal_approver_id`: integer e.g. `161072`
    - `user_id`: integer e.g. `161072`
  - `distributed_by`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `distributed_to`: array of object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `message`: string e.g. `This submittal is final`
  - `sent_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_package`: object
  - `id`: integer e.g. `161072`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `created_by`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `Package containing wetwork submittals`
  - `number`: string e.g. `42`
  - `specification_section_id`: integer e.g. `161072`
  - `submittal_ids`: array of integer
  - `title`: string e.g. `Wetwork Submittals`
  - `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `scheduled_task`: object - Information about the scheduled task associated with this submittal
  - `id`: integer - Scheduled Task ID e.g. `98765`
  - `name`: string - Full Name of the scheduled task e.g. `Review Window Installation`
  - `task_name`: string - the raw name of the scheduled task e.g. `Window Installation`
  - `formatted_name`: string - formatted name of the scheduled task e.g. `Review Window Installation`
  - `key`: string - surrogate key of the scheduled task e.g. `98765|36798130-963d-437d-b6b3-73eed4a23dac`
  - `start_date`: string(date-time) - the start date of the scheduled task e.g. `2018-02-28T17:00:00Z`
  - `finish_date`: string(date-time) - the finish date of the scheduled task e.g. `2018-03-28T17:00:00Z`
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

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/submittals

**Create Submittal**
Create a new Submittal associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `send_emails` [query] boolean - Designates whether or not emails will be sent (default false)

Request body (application/json) (required):

- `submittal`: object
  - `actual_delivery_date`: string(date) - The Actual Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `confirmed_delivery_date`: string(date) - The Confirmed Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `cost_code_id`: integer - The ID of the Cost Code of the Submittal *This field can only be set by admins
  - `buffer_time`: integer - The buffer working days for the dynamic submittal plan calculation *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `14`
  - `custom_textarea_1`: string - Value for the project's custom submittal textarea field (label configured in Submittals Settings). *This field can only be set by admins
  - `custom_textfield_1`: string - Value for the project's custom submittal text field (label configured in Submittals Settings). *This field can only be set by admins
  - `description`: string - The Description of the Submittal
  - `design_team_review_time`: integer - The Design Team Review Time of the Submittal (in days) *This field can only be set if the project has schedule calculations enabled
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members of the Submittal
  - `due_date`: string(date) - The Due Date of the Submittal *This field is not available to be set if sequential approvers is enabled e.g. `2022-08-19`
  - `for_record_only`: boolean - The field that controls if the dynamic submittal plan is for record only or not *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `true`
  - `internal_review_time`: integer - The Internal Review Time of the Submtital (in days) *This field can only be set if the project has schedule calculations enabled
  - `issue_date`: string(date) - The Issue Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `lead_time`: integer - The Lead Time of the Submittal (in days) *This field can only be set by admins or if the project has schedule calculations enabled
  - `location_id`: integer - The Location of the Submittal
  - `number`: string (required) - The Number of the Submittal
  - `private`: boolean - Whether the Submittal is Private or not
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Submittal as attachments. e.g. `[42]`
  - `received_date`: string(date) - The Received Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `received_from_id`: integer - The Received From of the Submittal
  - `required_on_site_date`: string(date) - The Required On Site Date of the Submittal *This field can only be set by admins or if the project has schedule calculations enabled e.g. `2022-08-19`
  - `responsible_contractor_id`: integer - The Responsible Contractor of the Submittal *This field is required when received_from_id is present and the field is visible in the project's field configuration
  - `revision`: string - The Revision of the Submittal
  - `scheduled_task_key`: string - The key of the Scheduled Task of the Submittal. Note that use of this parameter is deprecated. Please use `scheduled_task_id` instead. *This field can only be set if the project has submittal delivery information enab...
  - `scheduled_task_id`: integer - The ID of the Scheduled Task of the Submittal *This field can only be set if the project has submittal delivery information enabled and the user has permissions to view the calendar tool
  - `source_submittal_log_id`: integer - The ID of the Source Submittal. *By setting this field, the submittal will be created as a revision of source submittal.
  - `source_submittal_revision_id`: integer - The ID of the Submittal Log revision to copy revision attributes from when creating a new revision; `source_submittal_log_id` must be set when using this parameter. *This field only applies when creating a submittal a...
  - `specification_section_id`: integer - The ID of the Specification Section of the Submittal
  - `status_id`: integer - The ID of the Submittal Status of the Submittal *This field can only be set by admins
  - `sub_job_id`: integer - The ID of the Sub Job of the Submittal
  - `submit_by`: string(date) - The Submit By Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `submittal_manager_id`: integer - The ID of the Submittal Manager of the Submittal *This field can only be set by admins
  - `submittal_package_id`: integer - The ID of the Submittal Package of the Submittal *This field can only be set by admins
  - `title`: string - The Title of the Submittal
  - `type`: string - The Submittal Type of the Submittal
  - `submittal_workflow_template_id`: integer - The ID of a Submittal Workflow Template to apply to the submittal's approval workflow.
  - `prepare_time`: integer - The prepare time, in working days, for the dynamic submittal plan calculation. *This field is only available to be set if Dynamic Submittal Plan is enabled
  - `lead_time_format`: string enum[days, weeks] - The unit format used to interpret the lead time value.
  - `formatted_lead_time`: string - Human-readable lead time string, interpreted together with `lead_time_format`.
  - `submit_by_date_overridden`: boolean - Whether the Submit By date was manually overridden rather than calculated from the schedule.
  - `is_rejected`: boolean - Whether the Submittal is marked as rejected. *This field applies to submittal update only.
  - `rejected_submittal_log_approver_id`: integer - The ID of the approver whose response rejected the Submittal. *This field applies to submittal update only.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `actual_delivery_date`: string(date) e.g. `2015-03-14`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `confirmed_delivery_date`: string(date) e.g. `2012-01-01`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `custom_textarea_1`: string - Value of the project's custom submittal textarea field. Null when unset. The field label is configured in Submittals Settings.
- `custom_textfield_1`: string - Value of the project's custom submittal text field. Null when unset. The field label is configured in Submittals Settings.
- `deleted_at`: string(date-time) - *This field only displays on deleted items e.g. `2012-10-23T21:39:40Z`
- `description`: string e.g. `Thermal Insulation submittal`
- `rich_text_description`: string - HTML-formatted (rich text) version of the submittal description. Complements the plain-text `description`. e.g. `<p>Thermal Insulation submittal</p>`
- `design_team_review_time`: integer e.g. `7`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `internal_review_time`: integer e.g. `14`
- `lead_time`: integer e.g. `5`
- `required_on_site_date`: string(date) e.g. `2016-11-28`
- `scheduled_task`: object
  - `id`: integer - Task ID e.g. `1359235`
  - `name`: string - Task name e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `source_submittal_log_id`: integer e.g. `5`
- `distributed_submittals`: array of object
  - `id`: integer e.g. `122765`
  - `message`: string
  - `sent_at`: string(date-time) e.g. `2014-04-20T20:08:09Z`
  - `distributed_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `distributed_to`: array of object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `final_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `selected_approver_ids`: array of integer - List of Submittal Approver IDs for approvers selected to be distributed
- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer e.g. `2`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `workflow_group_number`: integer - The step in the workflow that the approver is on e.g. `0`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer - Buffer time, in working days, for Dynamic Submittal Plan scheduling. e.g. `14`
- `prepare_time`: integer - Prepare time, in working days, for Dynamic Submittal Plan scheduling. Null when not set. e.g. `7`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) e.g. `2014-06-09`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) e.g. `2014-07-22`
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
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/recycle_bin

**List of deleted Submittals**
The Submittals endpoint returns all deleted Submittals in a project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[ball_in_court_id]` [query] integer - User ID. Return item(s) where the specified User ID is the Ball in Court.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[received_from_id]` [query] integer - Received From ID
- `filters[responsible_contractor_id]` [query] array of integer - Array of Responsible Contractor IDs. A single Responsible Contractor ID is also accepted.
- `filters[specification_section_id]` [query] array of integer - Array of Specification Section IDs. A single Specification Section ID is also accepted.
- `filters[approver_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are in the approver list. A single integer is also accepted.
- `filters[current_revision]` [query] boolean - Default false. If true, only current revisions are shown. If false, all submittals are shown, regardless of whether or not it is the current revision.
- `filters[division]` [query] array of integer - Array of Divisions to filter on. A Division is the first two digits from the Specification Section Number. A single Division is also accepted.
- `filters[location_id]` [query] array of integer - Array of Location IDs. A single Location ID is also accepted.
- `filters[submittal_manager_id]` [query] array of integer - Array of Submittal Manager IDs. A single Submittal Manager ID is also accepted.
- `filters[submittal_package_id]` [query] array of integer - Array of Submittal Package IDs. Returns item(s) associated with the specified Submittal Package IDs. A single integer value is also accepted.
- `filters[response_id]` [query] array of integer - Array of Response IDs. A single Response ID is also accepted.
- `filters[status_id]` [query] array of integer - Array of Status IDs. A single Status ID is also accepted.
- `filters[type]` [query] array of string - Array of Submittal Types. A single Submittal Type is also accepted.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[specification_section, number, title, type, status, responsible_contractor, submit_by, received_from, received_date, due_date, distributed_at, submittal_package, ...]

Response 200 (application/json): array of object

- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer - Number of days this approver has to respond. e.g. `2`
  - `workflow_group_number`: integer - Sequential group (step) number of this approver within the workflow. Approvers sharing a group number act in parallel. e.g. `1`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID of the attachment.
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `required_on_site_date`: string(date) - Date the submittal item is required on site. Null when not set. e.g. `2014-07-22`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer e.g. `14`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) - Timestamp when the submittal was last distributed. Null if never distributed. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) - Date the submittal response is due. Null when not set. e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) - Date the submittal was issued. Null when not set. e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) - Date the submittal was received. Null when not set. e.g. `2014-06-09`
- `received_from`: object - Contact the submittal was received from. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the submittal. Null when not set.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object - Sub job associated with the submittal. Null when not set.
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) - Date by which the submittal must be submitted. Null when not set. e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object - Submittal type. Null when not set.
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object - User assigned as the submittal manager. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object - Location associated with the submittal. Null when not set.
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) - Date the submittal was opened. Null when not set. e.g. `2014-07-22`
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
- `scheduled_task`: object - Information about the scheduled task associated with this submittal. Null when no task is linked.
  - `id`: integer - Scheduled Task ID e.g. `98765`
  - `name`: string - Full Name of the scheduled task e.g. `Review Window Installation`
  - `task_name`: string - the raw name of the scheduled task e.g. `Window Installation`
  - `formatted_name`: string - formatted name of the scheduled task e.g. `Review Window Installation`
  - `key`: string - surrogate key of the scheduled task e.g. `98765|36798130-963d-437d-b6b3-73eed4a23dac`
  - `start_date`: string(date-time) - the start date of the scheduled task e.g. `2018-02-28T17:00:00Z`
  - `finish_date`: string(date-time) - the finish date of the scheduled task e.g. `2018-03-28T17:00:00Z`
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/attachments_with_markup

**List all submittal attachments with download urls**
Returns the latest version of every attachment. A polling url is provided for cases where the file can be downloaded with markup. If a polling url is provided, the file can be downloaded with the latest version of markup from this endpoint. https://developers.procore.com/reference/rest/document-markup#show-or-create-document-markup-downloadable-pdf

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer
- `polling_url`: string
- `original_url`: string e.g. `https://attachment_url`
- `submittal_id`: integer
- `name`: string e.g. `product_info.pdf`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/{id}

**Show Submittal**
Return detailed information on the specified Submittal.
See [Downloading attachments with markup](https://developers.procore.com/reference/rest/document-markup#show-or-create-document-markup-downloadable-pdf) for information on downloading attachments with markup as a PDF.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID

Response 200 (application/json): object

- `actual_delivery_date`: string(date) e.g. `2015-03-14`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `confirmed_delivery_date`: string(date) e.g. `2012-01-01`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `custom_textarea_1`: string - Value of the project's custom submittal textarea field. Null when unset. The field label is configured in Submittals Settings.
- `custom_textfield_1`: string - Value of the project's custom submittal text field. Null when unset. The field label is configured in Submittals Settings.
- `deleted_at`: string(date-time) - *This field only displays on deleted items e.g. `2012-10-23T21:39:40Z`
- `description`: string e.g. `Thermal Insulation submittal`
- `rich_text_description`: string - HTML-formatted (rich text) version of the submittal description. Complements the plain-text `description`. e.g. `<p>Thermal Insulation submittal</p>`
- `design_team_review_time`: integer e.g. `7`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `internal_review_time`: integer e.g. `14`
- `lead_time`: integer e.g. `5`
- `required_on_site_date`: string(date) e.g. `2016-11-28`
- `scheduled_task`: object
  - `id`: integer - Task ID e.g. `1359235`
  - `name`: string - Task name e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `source_submittal_log_id`: integer e.g. `5`
- `distributed_submittals`: array of object
  - `id`: integer e.g. `122765`
  - `message`: string
  - `sent_at`: string(date-time) e.g. `2014-04-20T20:08:09Z`
  - `distributed_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `distributed_to`: array of object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `final_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `selected_approver_ids`: array of integer - List of Submittal Approver IDs for approvers selected to be distributed
- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer e.g. `2`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `workflow_group_number`: integer - The step in the workflow that the approver is on e.g. `0`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer - Buffer time, in working days, for Dynamic Submittal Plan scheduling. e.g. `14`
- `prepare_time`: integer - Prepare time, in working days, for Dynamic Submittal Plan scheduling. Null when not set. e.g. `7`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) e.g. `2014-06-09`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) e.g. `2014-07-22`
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
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/submittals/{id}

**Update Submittal**
Update the specified Submittal.
Note: Updating the `workflow_data` field is only supported when using the `multipart/form-data` request format.
If you attempt to update `workflow_data` using a `JSON` request format, the request will fail with a `400 Bad Request` response, along with the error message: "Error Updating Approvers."

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID
- `send_emails` [query] boolean - Designates whether or not emails will be sent (default false)

Request body (application/json) (required):

- `submittal`: object
  - `actual_delivery_date`: string(date) - The Actual Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `confirmed_delivery_date`: string(date) - The Confirmed Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `cost_code_id`: integer - The ID of the Cost Code of the Submittal *This field can only be set by admins
  - `buffer_time`: integer - The buffer working days for the dynamic submittal plan calculation *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `14`
  - `custom_textarea_1`: string - Value for the project's custom submittal textarea field (label configured in Submittals Settings). *This field can only be set by admins
  - `custom_textfield_1`: string - Value for the project's custom submittal text field (label configured in Submittals Settings). *This field can only be set by admins
  - `description`: string - The Description of the Submittal
  - `design_team_review_time`: integer - The Design Team Review Time of the Submittal (in days) *This field can only be set if the project has schedule calculations enabled
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members of the Submittal
  - `due_date`: string(date) - The Due Date of the Submittal *This field is not available to be set if sequential approvers is enabled e.g. `2022-08-19`
  - `for_record_only`: boolean - The field that controls if the dynamic submittal plan is for record only or not *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `true`
  - `internal_review_time`: integer - The Internal Review Time of the Submtital (in days) *This field can only be set if the project has schedule calculations enabled
  - `issue_date`: string(date) - The Issue Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `lead_time`: integer - The Lead Time of the Submittal (in days) *This field can only be set by admins or if the project has schedule calculations enabled
  - `location_id`: integer - The Location of the Submittal
  - `number`: string (required) - The Number of the Submittal
  - `private`: boolean - Whether the Submittal is Private or not
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Submittal as attachments. e.g. `[42]`
  - `received_date`: string(date) - The Received Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `received_from_id`: integer - The Received From of the Submittal
  - `required_on_site_date`: string(date) - The Required On Site Date of the Submittal *This field can only be set by admins or if the project has schedule calculations enabled e.g. `2022-08-19`
  - `responsible_contractor_id`: integer - The Responsible Contractor of the Submittal *This field is required when received_from_id is present and the field is visible in the project's field configuration
  - `revision`: string - The Revision of the Submittal
  - `scheduled_task_key`: string - The key of the Scheduled Task of the Submittal. Note that use of this parameter is deprecated. Please use `scheduled_task_id` instead. *This field can only be set if the project has submittal delivery information enab...
  - `scheduled_task_id`: integer - The ID of the Scheduled Task of the Submittal *This field can only be set if the project has submittal delivery information enabled and the user has permissions to view the calendar tool
  - `source_submittal_log_id`: integer - The ID of the Source Submittal. *By setting this field, the submittal will be created as a revision of source submittal.
  - `source_submittal_revision_id`: integer - The ID of the Submittal Log revision to copy revision attributes from when creating a new revision; `source_submittal_log_id` must be set when using this parameter. *This field only applies when creating a submittal a...
  - `specification_section_id`: integer - The ID of the Specification Section of the Submittal
  - `status_id`: integer - The ID of the Submittal Status of the Submittal *This field can only be set by admins
  - `sub_job_id`: integer - The ID of the Sub Job of the Submittal
  - `submit_by`: string(date) - The Submit By Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `submittal_manager_id`: integer - The ID of the Submittal Manager of the Submittal *This field can only be set by admins
  - `submittal_package_id`: integer - The ID of the Submittal Package of the Submittal *This field can only be set by admins
  - `title`: string - The Title of the Submittal
  - `type`: string - The Submittal Type of the Submittal
  - `submittal_workflow_template_id`: integer - The ID of a Submittal Workflow Template to apply to the submittal's approval workflow.
  - `prepare_time`: integer - The prepare time, in working days, for the dynamic submittal plan calculation. *This field is only available to be set if Dynamic Submittal Plan is enabled
  - `lead_time_format`: string enum[days, weeks] - The unit format used to interpret the lead time value.
  - `formatted_lead_time`: string - Human-readable lead time string, interpreted together with `lead_time_format`.
  - `submit_by_date_overridden`: boolean - Whether the Submit By date was manually overridden rather than calculated from the schedule.
  - `is_rejected`: boolean - Whether the Submittal is marked as rejected. *This field applies to submittal update only.
  - `rejected_submittal_log_approver_id`: integer - The ID of the approver whose response rejected the Submittal. *This field applies to submittal update only.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `actual_delivery_date`: string(date) e.g. `2015-03-14`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `confirmed_delivery_date`: string(date) e.g. `2012-01-01`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `custom_textarea_1`: string - Value of the project's custom submittal textarea field. Null when unset. The field label is configured in Submittals Settings.
- `custom_textfield_1`: string - Value of the project's custom submittal text field. Null when unset. The field label is configured in Submittals Settings.
- `deleted_at`: string(date-time) - *This field only displays on deleted items e.g. `2012-10-23T21:39:40Z`
- `description`: string e.g. `Thermal Insulation submittal`
- `rich_text_description`: string - HTML-formatted (rich text) version of the submittal description. Complements the plain-text `description`. e.g. `<p>Thermal Insulation submittal</p>`
- `design_team_review_time`: integer e.g. `7`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `internal_review_time`: integer e.g. `14`
- `lead_time`: integer e.g. `5`
- `required_on_site_date`: string(date) e.g. `2016-11-28`
- `scheduled_task`: object
  - `id`: integer - Task ID e.g. `1359235`
  - `name`: string - Task name e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `source_submittal_log_id`: integer e.g. `5`
- `distributed_submittals`: array of object
  - `id`: integer e.g. `122765`
  - `message`: string
  - `sent_at`: string(date-time) e.g. `2014-04-20T20:08:09Z`
  - `distributed_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `distributed_to`: array of object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `final_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `selected_approver_ids`: array of integer - List of Submittal Approver IDs for approvers selected to be distributed
- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer e.g. `2`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `workflow_group_number`: integer - The step in the workflow that the approver is on e.g. `0`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer - Buffer time, in working days, for Dynamic Submittal Plan scheduling. e.g. `14`
- `prepare_time`: integer - Prepare time, in working days, for Dynamic Submittal Plan scheduling. Null when not set. e.g. `7`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) e.g. `2014-06-09`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) e.g. `2014-07-22`
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
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/submittals/{id}

**Delete Submittal**
Delete the specified Submittal.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID

Response 200: Submittal deleted successfully (no body)

Error responses: 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/{id}.pdf

**Show Submittal in PDF format**
Return detailed information on the specified Submittal in PDF format.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID

Error responses: 302, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/{id}/workflow_data

**Get Workflow Data**
Returns attributes related to submittal workflow state

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID

Response 200 (application/json): object

- `steps`: array of object
  - `id`: integer e.g. `0`
  - `approver_ids`: array of integer
  - `number`: integer e.g. `0`
- `approvers`: array of object
  - `id`: integer
  - `attachment_ids`: array of integer
  - `company_name`: string e.g. `ORNL`
  - `name`: string e.g. `Alvin Weinber`
  - `days_to_respond`: integer e.g. `2`
  - `response_required`: boolean e.g. `true`
- `attachments`: array of object
  - `id`: integer e.g. `42`
  - `approver_id`: integer
  - `approver_marked_up_at`: string(date-time) e.g. `2020-01-28T16:45:06Z`
  - `can_carry_forward`: boolean e.g. `true`
  - `download_url`: string e.g. `https://...`
  - `has_failed`: boolean
  - `is_originating_attachment`: boolean
  - `is_processing`: boolean
  - `last_marked_up_at`: string(date-time) e.g. `2020-01-28T16:45:06Z`
  - `last_marked_up_by`: string e.g. `Alvin Weinberg`
  - `name`: string e.g. `msr_spec.pdf`
  - `viewer_type`: string e.g. `document`
  - `viewer_url`: string e.g. `https://...`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/{id}/revisions

**Get Revisions**
Get the revision history of a submittal. Returns an array of submittals.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer - Number of days this approver has to respond. e.g. `2`
  - `workflow_group_number`: integer - Sequential group (step) number of this approver within the workflow. Approvers sharing a group number act in parallel. e.g. `1`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID of the attachment.
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `required_on_site_date`: string(date) - Date the submittal item is required on site. Null when not set. e.g. `2014-07-22`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer e.g. `14`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) - Timestamp when the submittal was last distributed. Null if never distributed. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) - Date the submittal response is due. Null when not set. e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) - Date the submittal was issued. Null when not set. e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) - Date the submittal was received. Null when not set. e.g. `2014-06-09`
- `received_from`: object - Contact the submittal was received from. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the submittal. Null when not set.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object - Sub job associated with the submittal. Null when not set.
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) - Date by which the submittal must be submitted. Null when not set. e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object - Submittal type. Null when not set.
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object - User assigned as the submittal manager. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object - Location associated with the submittal. Null when not set.
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) - Date the submittal was opened. Null when not set. e.g. `2014-07-22`
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
- `scheduled_task`: object - Information about the scheduled task associated with this submittal. Null when no task is linked.
  - `id`: integer - Scheduled Task ID e.g. `98765`
  - `name`: string - Full Name of the scheduled task e.g. `Review Window Installation`
  - `task_name`: string - the raw name of the scheduled task e.g. `Window Installation`
  - `formatted_name`: string - formatted name of the scheduled task e.g. `Review Window Installation`
  - `key`: string - surrogate key of the scheduled task e.g. `98765|36798130-963d-437d-b6b3-73eed4a23dac`
  - `start_date`: string(date-time) - the start date of the scheduled task e.g. `2018-02-28T17:00:00Z`
  - `finish_date`: string(date-time) - the finish date of the scheduled task e.g. `2018-03-28T17:00:00Z`
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/next_available_number

**Get Next Available Number**
Returns the next available number. See Get Next Available Number By Spec Section if number submittals by spec section is enabled.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `next_number`: string - Next available submittal number for the project (or spec section). e.g. `2`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/next_available_number/{spec_section_id}

**Get Next Available Number By Spec Section**
Returns the next available number and next spec section number in the project if numbers submittals by spec section is enabled.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `spec_section_id` [path] integer (required) - Spec Section ID

Response 200 (application/json): object

- `next_number`: string - Next available submittal number for the project (or spec section). e.g. `2`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/submittals/check_number

**Check if number and revision entered are available or duplicated.**
Returns if the number and revision entered are available or duplicated. When duplicated, it returns the next_number attribute with the next available number.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `number_available`: boolean - Whether the requested number and revision are available (not already used by another submittal on the project). e.g. `true`
- `next_number`: string - Next available submittal number. Only returned when the requested number is not available (`number_available` is false). e.g. `2`
- `current_number`: string - The requested number that was checked. Only returned when the requested number is not available (`number_available` is false). e.g. `100.1`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/submittal_associated_attachments

**List Submittal Associated Attachments**
List Submittal Associated Attachments for the specified Project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `view` [query] string enum[ids_only] - view for which you are exporting

Response 200 (application/json): array of object

- `content_type`: string e.g. `application/pdf`
- `filename`: string e.g. `some_document.pdf`
- `document_markup_layer_id`: integer e.g. `218943`
- `attachment_id`: integer e.g. `162258`
- `additional_page_count`: integer - Number of additional pages appended to this attachment. e.g. `0`
- `attached_at`: string(date-time) - Timestamp when the file was attached, in ISO 8601 format. e.g. `2020-02-11T21:26:16Z`
- `file_unavailable`: boolean - True when the underlying prostore file no longer exists.
- `state`: string e.g. `current`
- `updated_at`: string(date-time) e.g. `2020-02-11T21:26:17Z`
- `url`: string e.g. `https://...pdf?sig=someSignature`
- `version_timestamp`: string(date-time) e.g. `2020-02-11T21:26:16Z`
- `id`: integer e.g. `161072`

Error responses: 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options

**List available Submittal filters**
The Submittal Filter Options endpoint lists all endpoints for specific filter options

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: string - Key name is the filter field
- `value`: string - Value is the attribute to filter on
- `endpoint`: string - Endpoint is the path to the filter options endpoint

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/approver_id

**List Filter Options for Approvers**
Returns all Filter Options for Approvers defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Carl the Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/attachments

**List Filter Options for Attachments**
Returns all Filter Options for Attachments defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: boolean - Key is the value (usually an ID) passed in as the filter param *Attachments's key is a boolean value denoting whether to display just the submittals with attachments or not e.g. `true`
- `value`: string - Value is the name/description of the value being filtered on *Attachments's value is a boolean value denoting whether to display just the submittals with attachments or not e.g. `True`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/ball_in_court_id

**List Filter Options for Ball in Court**
Returns all Filter Options for Ball in Court defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Carl the Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/ball_in_court_company_id

**List Filter Options for Ball in Court Company**
Returns all Filter Options for Ball in Court Company defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Carl's Company`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/cost_code_id

**List Filter Options for Cost Code**
Returns all Filter Options for Cost Code defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Carl's Company`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/created_by_id

**List Filter Options for Created By**
Returns all Filter Options for Created By defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Key is the value (the user ID of created by field) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/current_revision

**List Filter Options for Current Revision**
Returns all Filter Options for Current Revision defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: boolean - Key is the value (usually an ID) passed in as the filter param *Current Revision's key is a boolean value denoting whether to display just the current revisions or not e.g. `true`
- `value`: string - Value is the name/description of the value being filtered on *Current Revision's value is a boolean value denoting whether to display just the current revisions or not e.g. `True`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/division

**List Filter Options for Specification Division**
Returns all Filter Options for Specification Division defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: string - Key is the value (usually an ID) passed in as the filter param *Division's key is a 1-2 digit string matching the division number e.g. `42`
- `value`: string - Value is the name/description of the value being filtered on *Division's value is a 1-2 digit string matching the division number e.g. `42`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/location_id

**List Filter Options for Location**
Returns all Filter Options for Location defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `P6 Parking Garage`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/private

**List Filter Options for Private**
Returns all Filter Options for Private defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: boolean - Key is the value (usually an ID) passed in as the filter param *Private's key is a boolean value denoting whether to display just the private submittals or not e.g. `true`
- `value`: string - Value is the name/description of the value being filtered on *Private's value is a boolean value denoting whether to display just the private submittals or not e.g. `True`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/received_from_id

**List Filter Options for Received From**
Returns all Filter Options for Received From defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Carl the Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/response_id

**List Filter Options for Submittal Response**
Returns all Filter Options for Submittal Response defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Approved as Noted`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/responsible_contractor_id

**List Filter Options for Responsible Contractor**
Returns all Filter Options for Responsible Contractor defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `DML Architecture`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/revision

**List Filter Options for Submittal Revision**
Returns all Filter Options for Submittal Revision defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: string - Key is the value passed in as the filter param e.g. `Rev A`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Rev A`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/specification_section_id

**List Filter Options for Specification Section**
Returns all Filter Options for Specification Section defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `84400 - Glazed Aluminum Curtain Walls`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/status_id

**List Filter Options for Submittal Status**
Returns all Filter Options for Submittal Status defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/sub_job_id

**List Filter Options for Submittal Sub Job**
Returns all Filter Options for Submittal Sub Job defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/submittal_manager_id

**List Filter Options for Submittal Manager**
Returns all Filter Options for Submittal Manager defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Carl the Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/submittal_package_id

**List Filter Options for Submittal Package**
Returns all Filter Options for Submittal Package defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1119495`
- `value`: string - Value is the name/description of the value being filtered on e.g. `#46: Window Submittals`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/type

**List Filter Options for Type**
Returns all Filter Options for Type defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: string - Key is the value (usually an ID) passed in as the filter param *Type's key is a string that matches the value e.g. `G&E's (Electrical)`
- `value`: string - Value is the name/description of the value being filtered on *Type's value is a string that matches the key e.g. `G&E's (Electrical)`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/number

**List of Number Filter Options**
Returns all unique Submittals Number defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: string - Key is the value (usually an ID) passed in as the filter param *Number's key is a string that matches the value e.g. `1`
- `value`: string - Value is the name/description of the value being filtered on *Number's value is a string that matches the key e.g. `2`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/submittal_workflow_template_id

**List Filter Options for Submittal Workflow Template**
Returns all Filter Options for Submittal Workflow Template defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1117897`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/task_id

**List Filter Options for Submittal Scheduled Task**
Returns all Filter Options for Submittal Scheduled Task defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value (usually an ID) passed in as the filter param e.g. `1117897`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Open`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/unpackaged

**List Filter Options for Submittal Unpackaged**
Returns all Filter Options for Submittal Unpackaged defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: boolean - Key is the value passed in as the filter param e.g. `true`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/buffer_time

**List Filter Options for Buffer Time**
Returns all Filter Options for Buffer Time defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value passed in as the filter param e.g. `7`
- `value`: string - Value is the name/description of the value being filtered on e.g. `7 days`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/created_via

**List Filter Options for Created Via**
Returns all Filter Options for Created Via defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: string - Key is the value passed in as the filter param e.g. `item_form`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Item Form`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/design_team_review_time

**List Filter Options for Design Team Review Time**
Returns all Filter Options for Design Team Review Time defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value passed in as the filter param e.g. `14`
- `value`: string - Value is the name/description of the value being filtered on e.g. `14 days`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/for_record_only

**List Filter Options for For Record Only**
Returns all Filter Options for For Record Only defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: boolean - Key is the value passed in as the filter param e.g. `true`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/internal_review_time

**List Filter Options for Internal Review Time**
Returns all Filter Options for Internal Review Time defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value passed in as the filter param e.g. `5`
- `value`: string - Value is the name/description of the value being filtered on e.g. `5 days`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/is_rejected

**List Filter Options for Is Rejected**
Returns all Filter Options for Is Rejected defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: boolean - Key is the value passed in as the filter param e.g. `true`
- `value`: string - Value is the name/description of the value being filtered on e.g. `Yes`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/lead_time

**List Filter Options for Lead Time**
Returns all Filter Options for Lead Time defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value passed in as the filter param e.g. `10`
- `value`: integer - Value is the name/description of the value being filtered on e.g. `10`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/prepare_time

**List Filter Options for Prepare Time**
Returns all Filter Options for Prepare Time defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the value passed in as the filter param e.g. `10`
- `value`: string - Value is the name/description of the value being filtered on e.g. `10 days`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/filter_options/specification_area_id

**List Filter Options for Specification Area**
Returns all Filter Options for Specification Area defined for the project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `key`: integer - Key is the specification area ID value passed in as the filter param e.g. `123`
- `value`: string - Value is the name/description of the specification area being filtered on e.g. `Area 01`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals  **[OLDER VERSION - a newer path version exists below/above]**

**List Submittals on a Project**
Return a list of all Submittals from a specified Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.
See [Downloading attachments with markup](https://developers.procore.com/reference/rest/document-markup#show-or-create-document-markup-downloadable-pdf).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[ball_in_court_id]` [query] integer - User ID. Return item(s) where the specified User ID is the Ball in Court.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[received_from_id]` [query] integer - Received From ID
- `filters[responsible_contractor_id]` [query] array of integer - Array of Responsible Contractor IDs. A single Responsible Contractor ID is also accepted.
- `filters[attachments]` [query] array of boolean - Array of boolean values to filter submittals by "Attachments" status.
- `filters[specification_section_id]` [query] array of integer - Array of Specification Section IDs. A single Specification Section ID is also accepted.
- `filters[approver_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are in the approver list. A single integer is also accepted.
- `filters[cost_code_id]` [query] array of integer - Array of Cost Code IDs. A single Cost Code ID is also accepted.
- `filters[current_revision]` [query] boolean - Default false. If true, only current revisions are shown. If false, all submittals are shown, regardless of whether or not it is the current revision.
- `filters[division]` [query] array of integer - Array of Divisions to filter on. A Division is the first two digits from the Specification Section Number. A single Division is also accepted.
- `filters[location_id]` [query] array of integer - Array of Location IDs. A single Location ID is also accepted.
- `filters[submittal_manager_id]` [query] array of integer - Array of Submittal Manager IDs. A single Submittal Manager ID is also accepted.
- `filters[number]` [query] array of string - Array of Numbers. A single Number is also accepted.
- `filters[submittal_package_id]` [query] array of integer - Array of Submittal Package IDs. Returns item(s) associated with the specified Submittal Package IDs. A single integer value is also accepted.
- `filters[response_id]` [query] array of integer - Array of Response IDs. A single Response ID is also accepted.
- `filters[required_on_site_date]` [query] array of string(date) - Array of dates (date range). Returns item(s) with their required on site date withing the specified dates. A single date is also accepted. style: form
- `filters[status_id]` [query] array of integer - Array of Status IDs. A single Status ID is also accepted.
- `filters[type]` [query] array of string - Array of Submittal Types. A single Submittal Type is also accepted.
- `filters[task_id]` [query] array of integer - Array of Submittal Task IDs. Returns item(s) associated with the specified Submittal Task IDs. A single integer value is also accepted.
- `filters[revision]` [query] array of string - Array of Submittal Revision values. A single Submittal Revision is also accepted.
- `filters[specification_area_id]` [query] array of oneOf(integer | string enum[NULL]) - Array of specification area IDs to filter submittals by. A single value is also accepted. Use "NULL" to filter submittals with no specification area.
- `filters[unpackaged]` [query] boolean - Parseable to boolean value, filters out unpackaged Submittals.
- `filters[workflow_progress]` [query] array of string enum[on_track, off_track, overdue, paused, none] - Array of strings to filter submittals by "Workflow Progress" status. Available options: on_track, off_track, overdue, paused, none
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[anticipated_delivery_date]` [query] array of string(date) - Array of dates (date range). Returns item(s) with their anticipated delivery date within the specified dates. A single date is also accepted. style: form
- `sort` [query] string enum[specification_section, number, title, type, status, responsible_contractor, submit_by, received_from, received_date, due_date, distributed_at, submittal_package, ...]

Response 200 (application/json): array of object

- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer - Number of days this approver has to respond. e.g. `2`
  - `workflow_group_number`: integer - Sequential group (step) number of this approver within the workflow. Approvers sharing a group number act in parallel. e.g. `1`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID of the attachment.
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `required_on_site_date`: string(date) - Date the submittal item is required on site. Null when not set. e.g. `2014-07-22`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer e.g. `14`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) - Timestamp when the submittal was last distributed. Null if never distributed. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) - Date the submittal response is due. Null when not set. e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) - Date the submittal was issued. Null when not set. e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) - Date the submittal was received. Null when not set. e.g. `2014-06-09`
- `received_from`: object - Contact the submittal was received from. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the submittal. Null when not set.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object - Sub job associated with the submittal. Null when not set.
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) - Date by which the submittal must be submitted. Null when not set. e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object - Submittal type. Null when not set.
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object - User assigned as the submittal manager. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object - Location associated with the submittal. Null when not set.
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) - Date the submittal was opened. Null when not set. e.g. `2014-07-22`
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
- `scheduled_task`: object - Information about the scheduled task associated with this submittal. Null when no task is linked.
  - `id`: integer - Scheduled Task ID e.g. `98765`
  - `name`: string - Full Name of the scheduled task e.g. `Review Window Installation`
  - `task_name`: string - the raw name of the scheduled task e.g. `Window Installation`
  - `formatted_name`: string - formatted name of the scheduled task e.g. `Review Window Installation`
  - `key`: string - surrogate key of the scheduled task e.g. `98765|36798130-963d-437d-b6b3-73eed4a23dac`
  - `start_date`: string(date-time) - the start date of the scheduled task e.g. `2018-02-28T17:00:00Z`
  - `finish_date`: string(date-time) - the finish date of the scheduled task e.g. `2018-03-28T17:00:00Z`
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/submittals  **[OLDER VERSION - a newer path version exists below/above]**

**Create Submittal**
Create a new Submittal associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `send_emails` [query] boolean - Designates whether or not emails will be sent (default false)

Request body (application/json) (required):

- `submittal`: object
  - `actual_delivery_date`: string(date) - The Actual Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `confirmed_delivery_date`: string(date) - The Confirmed Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `cost_code_id`: integer - The ID of the Cost Code of the Submittal *This field can only be set by admins
  - `buffer_time`: integer - The buffer working days for the dynamic submittal plan calculation *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `14`
  - `for_record_only`: boolean - The field that controls if the dynamic submittal plan is for record only or not *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `true`
  - `prepare_time`: integer - The prepare time, in working days, for the dynamic submittal plan calculation. *This field is only available to be set if Dynamic Submittal Plan is enabled
  - `custom_textarea_1`: string - Value for the project's custom submittal textarea field (label configured in Submittals Settings). *This field can only be set by admins
  - `custom_textfield_1`: string - Value for the project's custom submittal text field (label configured in Submittals Settings). *This field can only be set by admins
  - `description`: string - The Description of the Submittal
  - `design_team_review_time`: integer - The Design Team Review Time of the Submittal (in days) *This field can only be set if the project has schedule calculations enabled
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members of the Submittal
  - `due_date`: string(date) - The Due Date of the Submittal *This field is not available to be set if sequential approvers is enabled e.g. `2022-08-19`
  - `internal_review_time`: integer - The Internal Review Time of the Submtital (in days) *This field can only be set if the project has schedule calculations enabled
  - `issue_date`: string(date) - The Issue Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `lead_time`: integer - The Lead Time of the Submittal (in days) *This field can only be set by admins or if the project has schedule calculations enabled
  - `lead_time_format`: string enum[days, weeks] - The unit format used to interpret the lead time value.
  - `formatted_lead_time`: string - Human-readable lead time string, interpreted together with `lead_time_format`.
  - `location_id`: integer - The Location of the Submittal
  - `number`: string (required) - The Number of the Submittal
  - `private`: boolean - Whether the Submittal is Private or not
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Submittal as attachments. e.g. `[42]`
  - `received_date`: string(date) - The Received Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `received_from_id`: integer - The Received From of the Submittal
  - `required_on_site_date`: string(date) - The Required On Site Date of the Submittal *This field can only be set by admins or if the project has schedule calculations enabled e.g. `2022-08-19`
  - `responsible_contractor_id`: integer - The Responsible Contractor of the Submittal *This field is required when received_from_id is present and the field is visible in the project's field configuration
  - `revision`: string - The Revision of the Submittal
  - `scheduled_task_key`: string - The key of the Scheduled Task of the Submittal. Note that use of this parameter is deprecated. Please use `scheduled_task_id` instead. *This field can only be set if the project has submittal delivery information enab...
  - `scheduled_task_id`: integer - The ID of the Scheduled Task of the Submittal *This field can only be set if the project has submittal delivery information enabled and the user has permissions to view the calendar tool
  - `source_submittal_log_id`: integer - The ID of the Source Submittal. *By setting this field, the submittal will be created as a revision of source submittal.
  - `specification_section_id`: integer - The ID of the Specification Section of the Submittal
  - `status_id`: integer - The ID of the Submittal Status of the Submittal *This field can only be set by admins
  - `sub_job_id`: integer - The ID of the Sub Job of the Submittal
  - `submit_by`: string(date) - The Submit By Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `submit_by_date_overridden`: boolean - Whether the Submit By date was manually overridden rather than calculated from the schedule.
  - `submittal_manager_id`: integer - The ID of the Submittal Manager of the Submittal *This field can only be set by admins
  - `submittal_package_id`: integer - The ID of the Submittal Package of the Submittal *This field can only be set by admins
  - `submittal_workflow_template_id`: integer - The ID of a Submittal Workflow Template to apply to the submittal's approval workflow.
  - `title`: string - The Title of the Submittal
  - `type`: string - The Submittal Type of the Submittal
  - `workflow_data`: array of array of object - The Submittal Workflow Data e.g. `[[{"login_information_id":1738090,"approver_type":"Approver","days_to_respond...`
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 201 (application/json): object

- `actual_delivery_date`: string(date) e.g. `2015-03-14`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `confirmed_delivery_date`: string(date) e.g. `2012-01-01`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `custom_textarea_1`: string - Value of the project's custom submittal textarea field. Null when unset. The field label is configured in Submittals Settings.
- `custom_textfield_1`: string - Value of the project's custom submittal text field. Null when unset. The field label is configured in Submittals Settings.
- `deleted_at`: string(date-time) - *This field only displays on deleted items e.g. `2012-10-23T21:39:40Z`
- `description`: string e.g. `Thermal Insulation submittal`
- `rich_text_description`: string - HTML-formatted (rich text) version of the submittal description. Complements the plain-text `description`. e.g. `<p>Thermal Insulation submittal</p>`
- `design_team_review_time`: integer e.g. `7`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `internal_review_time`: integer e.g. `14`
- `lead_time`: integer e.g. `5`
- `required_on_site_date`: string(date) e.g. `2016-11-28`
- `scheduled_task`: object
  - `id`: integer - Task ID e.g. `1359235`
  - `name`: string - Task name e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `source_submittal_log_id`: integer e.g. `5`
- `distributed_submittals`: array of object
  - `id`: integer e.g. `122765`
  - `message`: string
  - `sent_at`: string(date-time) e.g. `2014-04-20T20:08:09Z`
  - `distributed_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `distributed_to`: array of object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `final_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `selected_approver_ids`: array of integer - List of Submittal Approver IDs for approvers selected to be distributed
- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer e.g. `2`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `workflow_group_number`: integer - The step in the workflow that the approver is on e.g. `0`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer - Buffer time, in working days, for Dynamic Submittal Plan scheduling. e.g. `14`
- `prepare_time`: integer - Prepare time, in working days, for Dynamic Submittal Plan scheduling. Null when not set. e.g. `7`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) e.g. `2014-06-09`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) e.g. `2014-07-22`
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
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/recycle_bin  **[OLDER VERSION - a newer path version exists below/above]**

**List of deleted Submittals**
The Submittals endpoint returns all deleted Submittals in a project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of integer - Return item(s) with the specified IDs.
- `filters[ball_in_court_id]` [query] integer - User ID. Return item(s) where the specified User ID is the Ball in Court.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[query]` [query] string - Return item(s) containing search query
- `filters[received_from_id]` [query] integer - Received From ID
- `filters[responsible_contractor_id]` [query] array of integer - Array of Responsible Contractor IDs. A single Responsible Contractor ID is also accepted.
- `filters[specification_section_id]` [query] array of integer - Array of Specification Section IDs. A single Specification Section ID is also accepted.
- `filters[approver_id]` [query] array of integer - Array of User IDs. Return item(s) where the specified User IDs are in the approver list. A single integer is also accepted.
- `filters[current_revision]` [query] boolean - Default false. If true, only current revisions are shown. If false, all submittals are shown, regardless of whether or not it is the current revision.
- `filters[division]` [query] array of integer - Array of Divisions to filter on. A Division is the first two digits from the Specification Section Number. A single Division is also accepted.
- `filters[location_id]` [query] array of integer - Array of Location IDs. A single Location ID is also accepted.
- `filters[submittal_manager_id]` [query] array of integer - Array of Submittal Manager IDs. A single Submittal Manager ID is also accepted.
- `filters[submittal_package_id]` [query] array of integer - Array of Submittal Package IDs. Returns item(s) associated with the specified Submittal Package IDs. A single integer value is also accepted.
- `filters[response_id]` [query] array of integer - Array of Response IDs. A single Response ID is also accepted.
- `filters[status_id]` [query] array of integer - Array of Status IDs. A single Status ID is also accepted.
- `filters[type]` [query] array of string - Array of Submittal Types. A single Submittal Type is also accepted.
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `sort` [query] string enum[specification_section, number, title, type, status, responsible_contractor, submit_by, received_from, received_date, due_date, distributed_at, submittal_package, ...]

Response 200 (application/json): array of object

- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer - Number of days this approver has to respond. e.g. `2`
  - `workflow_group_number`: integer - Sequential group (step) number of this approver within the workflow. Approvers sharing a group number act in parallel. e.g. `1`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID of the attachment.
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `required_on_site_date`: string(date) - Date the submittal item is required on site. Null when not set. e.g. `2014-07-22`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer e.g. `14`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) - Timestamp when the submittal was last distributed. Null if never distributed. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) - Date the submittal response is due. Null when not set. e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) - Date the submittal was issued. Null when not set. e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) - Date the submittal was received. Null when not set. e.g. `2014-06-09`
- `received_from`: object - Contact the submittal was received from. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the submittal. Null when not set.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object - Sub job associated with the submittal. Null when not set.
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) - Date by which the submittal must be submitted. Null when not set. e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object - Submittal type. Null when not set.
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object - User assigned as the submittal manager. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object - Location associated with the submittal. Null when not set.
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) - Date the submittal was opened. Null when not set. e.g. `2014-07-22`
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
- `scheduled_task`: object - Information about the scheduled task associated with this submittal. Null when no task is linked.
  - `id`: integer - Scheduled Task ID e.g. `98765`
  - `name`: string - Full Name of the scheduled task e.g. `Review Window Installation`
  - `task_name`: string - the raw name of the scheduled task e.g. `Window Installation`
  - `formatted_name`: string - formatted name of the scheduled task e.g. `Review Window Installation`
  - `key`: string - surrogate key of the scheduled task e.g. `98765|36798130-963d-437d-b6b3-73eed4a23dac`
  - `start_date`: string(date-time) - the start date of the scheduled task e.g. `2018-02-28T17:00:00Z`
  - `finish_date`: string(date-time) - the finish date of the scheduled task e.g. `2018-03-28T17:00:00Z`
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Submittal**
Return detailed information on the specified Submittal.
See [Downloading attachments with markup](https://developers.procore.com/reference/rest/document-markup#show-or-create-document-markup-downloadable-pdf).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID

Response 200 (application/json): object

- `actual_delivery_date`: string(date) e.g. `2015-03-14`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `confirmed_delivery_date`: string(date) e.g. `2012-01-01`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `custom_textarea_1`: string - Value of the project's custom submittal textarea field. Null when unset. The field label is configured in Submittals Settings.
- `custom_textfield_1`: string - Value of the project's custom submittal text field. Null when unset. The field label is configured in Submittals Settings.
- `deleted_at`: string(date-time) - *This field only displays on deleted items e.g. `2012-10-23T21:39:40Z`
- `description`: string e.g. `Thermal Insulation submittal`
- `rich_text_description`: string - HTML-formatted (rich text) version of the submittal description. Complements the plain-text `description`. e.g. `<p>Thermal Insulation submittal</p>`
- `design_team_review_time`: integer e.g. `7`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `internal_review_time`: integer e.g. `14`
- `lead_time`: integer e.g. `5`
- `required_on_site_date`: string(date) e.g. `2016-11-28`
- `scheduled_task`: object
  - `id`: integer - Task ID e.g. `1359235`
  - `name`: string - Task name e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `source_submittal_log_id`: integer e.g. `5`
- `distributed_submittals`: array of object
  - `id`: integer e.g. `122765`
  - `message`: string
  - `sent_at`: string(date-time) e.g. `2014-04-20T20:08:09Z`
  - `distributed_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `distributed_to`: array of object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `final_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `selected_approver_ids`: array of integer - List of Submittal Approver IDs for approvers selected to be distributed
- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer e.g. `2`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `workflow_group_number`: integer - The step in the workflow that the approver is on e.g. `0`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer - Buffer time, in working days, for Dynamic Submittal Plan scheduling. e.g. `14`
- `prepare_time`: integer - Prepare time, in working days, for Dynamic Submittal Plan scheduling. Null when not set. e.g. `7`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) e.g. `2014-06-09`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) e.g. `2014-07-22`
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
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/submittals/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update Submittal**
Update the specified Submittal.
Note: Updating the `workflow_data` field is only supported when using the `multipart/form-data` request format.
If you attempt to update `workflow_data` using a `JSON` request format, the request will fail with a `400 Bad Request` response, along with the error message: "Error Updating Approvers."

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID
- `send_emails` [query] boolean - Designates whether or not emails will be sent (default false)

Request body (application/json) (required):

- `submittal`: object
  - `actual_delivery_date`: string(date) - The Actual Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `confirmed_delivery_date`: string(date) - The Confirmed Delivery Date of the Submittal *This field can only be set if the project has submittal delivery information enabled e.g. `2022-08-19`
  - `cost_code_id`: integer - The ID of the Cost Code of the Submittal *This field can only be set by admins
  - `buffer_time`: integer - The buffer working days for the dynamic submittal plan calculation *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `14`
  - `custom_textarea_1`: string - Value for the project's custom submittal textarea field (label configured in Submittals Settings). *This field can only be set by admins
  - `custom_textfield_1`: string - Value for the project's custom submittal text field (label configured in Submittals Settings). *This field can only be set by admins
  - `description`: string - The Description of the Submittal
  - `design_team_review_time`: integer - The Design Team Review Time of the Submittal (in days) *This field can only be set if the project has schedule calculations enabled
  - `distribution_member_ids`: array of integer - The IDs of the Distribution Members of the Submittal
  - `due_date`: string(date) - The Due Date of the Submittal *This field is not available to be set if sequential approvers is enabled e.g. `2022-08-19`
  - `for_record_only`: boolean - The field that controls if the dynamic submittal plan is for record only or not *This field is only available to be set if Dynamic Submittal Plan is enabled e.g. `true`
  - `internal_review_time`: integer - The Internal Review Time of the Submtital (in days) *This field can only be set if the project has schedule calculations enabled
  - `issue_date`: string(date) - The Issue Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `lead_time`: integer - The Lead Time of the Submittal (in days) *This field can only be set by admins or if the project has schedule calculations enabled
  - `location_id`: integer - The Location of the Submittal
  - `number`: string (required) - The Number of the Submittal
  - `private`: boolean - Whether the Submittal is Private or not
  - `prostore_file_ids`: array of integer - An array of Prostore File IDs. The Prostore Files will be associated with the Submittal as attachments. e.g. `[42]`
  - `received_date`: string(date) - The Received Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `received_from_id`: integer - The Received From of the Submittal
  - `required_on_site_date`: string(date) - The Required On Site Date of the Submittal *This field can only be set by admins or if the project has schedule calculations enabled e.g. `2022-08-19`
  - `responsible_contractor_id`: integer - The Responsible Contractor of the Submittal *This field is required when received_from_id is present and the field is visible in the project's field configuration
  - `revision`: string - The Revision of the Submittal
  - `scheduled_task_key`: string - The key of the Scheduled Task of the Submittal. Note that use of this parameter is deprecated. Please use `scheduled_task_id` instead. *This field can only be set if the project has submittal delivery information enab...
  - `scheduled_task_id`: integer - The ID of the Scheduled Task of the Submittal *This field can only be set if the project has submittal delivery information enabled and the user has permissions to view the calendar tool
  - `source_submittal_log_id`: integer - The ID of the Source Submittal. *By setting this field, the submittal will be created as a revision of source submittal.
  - `source_submittal_revision_id`: integer - The ID of the Submittal Log revision to copy revision attributes from when creating a new revision; `source_submittal_log_id` must be set when using this parameter. *This field only applies when creating a submittal a...
  - `specification_section_id`: integer - The ID of the Specification Section of the Submittal
  - `status_id`: integer - The ID of the Submittal Status of the Submittal *This field can only be set by admins
  - `sub_job_id`: integer - The ID of the Sub Job of the Submittal
  - `submit_by`: string(date) - The Submit By Date of the Submittal *This field can only be set by admins e.g. `2022-08-19`
  - `submittal_manager_id`: integer - The ID of the Submittal Manager of the Submittal *This field can only be set by admins
  - `submittal_package_id`: integer - The ID of the Submittal Package of the Submittal *This field can only be set by admins
  - `title`: string - The Title of the Submittal
  - `type`: string - The Submittal Type of the Submittal
  - `submittal_workflow_template_id`: integer - The ID of a Submittal Workflow Template to apply to the submittal's approval workflow.
  - `prepare_time`: integer - The prepare time, in working days, for the dynamic submittal plan calculation. *This field is only available to be set if Dynamic Submittal Plan is enabled
  - `lead_time_format`: string enum[days, weeks] - The unit format used to interpret the lead time value.
  - `formatted_lead_time`: string - Human-readable lead time string, interpreted together with `lead_time_format`.
  - `submit_by_date_overridden`: boolean - Whether the Submit By date was manually overridden rather than calculated from the schedule.
  - `is_rejected`: boolean - Whether the Submittal is marked as rejected. *This field applies to submittal update only.
  - `rejected_submittal_log_approver_id`: integer - The ID of the approver whose response rejected the Submittal. *This field applies to submittal update only.
  - `custom_field_%{custom_field_definition_id}`: oneOf(string | number | boolean | array of integer) - Value of the custom field. The data type of the value passed in corresponds with the data_type of the Custom Field Definition. For a lov_entry data_type the value passed in should be the ID of one of the Custom Field ... e.g. `custom field value`

Response 200 (application/json): object

- `actual_delivery_date`: string(date) e.g. `2015-03-14`
- `attachments`: array of object
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `confirmed_delivery_date`: string(date) e.g. `2012-01-01`
- `cost_code`: object
  - `id`: integer - ID e.g. `12345`
  - `name`: string - Name e.g. `Earthwork`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `custom_textarea_1`: string - Value of the project's custom submittal textarea field. Null when unset. The field label is configured in Submittals Settings.
- `custom_textfield_1`: string - Value of the project's custom submittal text field. Null when unset. The field label is configured in Submittals Settings.
- `deleted_at`: string(date-time) - *This field only displays on deleted items e.g. `2012-10-23T21:39:40Z`
- `description`: string e.g. `Thermal Insulation submittal`
- `rich_text_description`: string - HTML-formatted (rich text) version of the submittal description. Complements the plain-text `description`. e.g. `<p>Thermal Insulation submittal</p>`
- `design_team_review_time`: integer e.g. `7`
- `distribution_members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `internal_review_time`: integer e.g. `14`
- `lead_time`: integer e.g. `5`
- `required_on_site_date`: string(date) e.g. `2016-11-28`
- `scheduled_task`: object
  - `id`: integer - Task ID e.g. `1359235`
  - `name`: string - Task name e.g. `INTERIOR`
  - `key`: string - A deprecated value which was originally used to uniquely identify tasks. This value will be removed in a later version of the API. e.g. `101429|40e65ab5-07a5-4cb3-88c0-bc691c3902e0`
- `source_submittal_log_id`: integer e.g. `5`
- `distributed_submittals`: array of object
  - `id`: integer e.g. `122765`
  - `message`: string
  - `sent_at`: string(date-time) e.g. `2014-04-20T20:08:09Z`
  - `distributed_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `distributed_to`: array of object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `final_attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `selected_approver_ids`: array of integer - List of Submittal Approver IDs for approvers selected to be distributed
- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer e.g. `2`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `workflow_group_number`: integer - The step in the workflow that the approver is on e.g. `0`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer - Buffer time, in working days, for Dynamic Submittal Plan scheduling. e.g. `14`
- `prepare_time`: integer - Prepare time, in working days, for Dynamic Submittal Plan scheduling. Null when not set. e.g. `7`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) e.g. `2014-06-09`
- `received_from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) e.g. `2014-07-22`
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
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/{id}/workflow_data  **[OLDER VERSION - a newer path version exists below/above]**

**Get Workflow Data**
Returns attributes related to submittal workflow state

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID

Response 200 (application/json): object

- `steps`: array of object
  - `id`: integer e.g. `0`
  - `approver_ids`: array of integer
  - `number`: integer e.g. `0`
- `approvers`: array of object
  - `id`: integer
  - `attachment_ids`: array of integer
  - `company_name`: string e.g. `ORNL`
  - `name`: string e.g. `Alvin Weinber`
  - `days_to_respond`: integer e.g. `2`
  - `response_required`: boolean e.g. `true`
- `attachments`: array of object
  - `id`: integer e.g. `42`
  - `approver_id`: integer
  - `approver_marked_up_at`: string(date-time) e.g. `2020-01-28T16:45:06Z`
  - `can_carry_forward`: boolean e.g. `true`
  - `download_url`: string e.g. `https://...`
  - `has_failed`: boolean
  - `is_originating_attachment`: boolean
  - `is_processing`: boolean
  - `last_marked_up_at`: string(date-time) e.g. `2020-01-28T16:45:06Z`
  - `last_marked_up_by`: string e.g. `Alvin Weinberg`
  - `name`: string e.g. `msr_spec.pdf`
  - `viewer_type`: string e.g. `document`
  - `viewer_url`: string e.g. `https://...`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/{id}/revisions  **[OLDER VERSION - a newer path version exists below/above]**

**Get Revisions**
Get the revision history of a submittal. Returns an array of submittals.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Submittal ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `approvers`: array of object
  - `approver_type`: string - Role of Approver e.g. `Submitter`
  - `comment`: string e.g. `I approve this submittal`
  - `distributed`: boolean e.g. `false`
  - `response`: object
    - `name`: string - Name of Submittal Response e.g. `Pending`
    - `considered`: string - Mapping of the Submittal Response e.g. `pending`
    - `id`: integer - ID e.g. `161789`
  - `returned_date`: string(date) - Returned Date e.g. `2016-04-05`
  - `sent_date`: string(date) - Sent Date e.g. `2014-05-04`
  - `due_date`: string(date) - Due Date e.g. `2014-05-05`
  - `response_required`: boolean e.g. `true`
  - `days_to_respond`: integer - Number of days this approver has to respond. e.g. `2`
  - `workflow_group_number`: integer - Sequential group (step) number of this approver within the workflow. Approvers sharing a group number act in parallel. e.g. `1`
  - `user`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID of the attachment.
    - `name`: string - Display name of the attachment file.
    - `url`: string - Download URL of the attachment.
    - `filename`: string - Original filename of the attachment. Prefer `name`.
  - `submittal_associated_attachment_ids`: array of integer - Submittal Associated Attachment IDs e.g. `[314265]`
  - `id`: integer - ID e.g. `161789`
- `attachments_count`: integer - Number of attachments on the submittal. e.g. `2`
- `is_rejected`: boolean - Whether the submittal was rejected during its approval workflow. e.g. `false`
- `rejected_submittal_log_approver_id`: integer - ID of the approver whose response rejected the submittal. Null when the submittal has not been rejected.
- `required_on_site_date`: string(date) - Date the submittal item is required on site. Null when not set. e.g. `2014-07-22`
- `submittal_workflow_template`: object - Workflow template applied to this submittal, if any. Null when no template has been applied.
  - `id`: integer - ID of the applied Submittal Workflow Template. e.g. `101`
  - `name`: string - Name of the applied Submittal Workflow Template. e.g. `Standard Architectural Review`
- `submittal_workflow_template_applied_at`: string(date-time) - Timestamp when a workflow template was applied to this submittal, in ISO 8601 format. Null when no template has been applied. e.g. `2012-10-23T21:39:40Z`
- `operation_item_errors`: array of object - Errors recorded for this submittal by the most recent bulk/async operation. Empty when the last operation succeeded.
  - `attribute`: string - Name of the attribute that failed validation. e.g. `due_date`
  - `message`: string - Human-readable error message. e.g. `can't be blank`
- `ball_in_court`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `buffer_time`: integer e.g. `14`
- `created_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `current_revision`: boolean e.g. `true`
- `distributed_at`: string(date-time) - Timestamp when the submittal was last distributed. Null if never distributed. e.g. `2012-10-23T21:39:40Z`
- `closed_at`: string(date-time) - Timestamp when the submittal was closed. e.g. `2012-10-23T21:39:40Z`
- `due_date`: string(date) - Date the submittal response is due. Null when not set. e.g. `2014-07-22`
- `for_record_only`: boolean e.g. `true`
- `formatted_number`: string e.g. `08560-118`
- `issue_date`: string(date) - Date the submittal was issued. Null when not set. e.g. `2014-06-02`
- `private`: boolean e.g. `false`
- `received_date`: string(date) - Date the submittal was received. Null when not set. e.g. `2014-06-09`
- `received_from`: object - Contact the submittal was received from. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `responsible_contractor`: object - Vendor responsible for the submittal. Null when not set.
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `specification_section`: object
  - `id`: integer - ID e.g. `161072`
  - `number`: string - Number e.g. `08560`
  - `description`: string - Description e.g. `Vinyl Windows`
  - `label`: string - Label e.g. `08560 Vinyl Windows`
  - `current_revision_id`: integer - Current Revision ID e.g. `145092`
- `sub_job`: object - Sub job associated with the submittal. Null when not set.
  - `id`: integer - ID e.g. `3483483`
  - `name`: string - Name e.g. `Floor 2`
  - `code`: string - Unique code in the scope of a Project e.g. `18`
- `submit_by`: string(date) - Date by which the submittal must be submitted. Null when not set. e.g. `2014-06-11`
- `status`: object
  - `id`: integer - ID e.g. `183101`
  - `name`: string - Name e.g. `In Review`
  - `status`: string - Status e.g. `Open`
- `type`: object - Submittal type. Null when not set.
  - `id`: integer - ID e.g. `42`
  - `name`: string - Name e.g. `Field Measurement`
- `updated_at`: string(date-time) e.g. `2012-10-23T21:39:40Z`
- `submittal_manager`: object - User assigned as the submittal manager. Null when not set.
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `submittal_package`: object
  - `attachments_count`: integer e.g. `2`
  - `created_by`: object
    - `login`: string - Email e.g. `carl.contractor@example.com`
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `Carl the Contractor`
  - `description`: string e.g. `All items for Metal Fabrication`
  - `attachments`: array of object
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `submittal_ids`: array of integer
  - `id`: integer e.g. `161072`
  - `number`: string e.g. `TBZ-44500`
  - `title`: string e.g. `Windows`
- `location`: object - Location associated with the submittal. Null when not set.
  - `id`: integer - Location ID e.g. `15504`
  - `name`: string - Location name e.g. `1space>1 space`
  - `node_name`: string - Location node name e.g. `1 space`
  - `parent_id`: integer - Location parent id e.g. `788866`
  - `created_at`: string(date-time) - Timestamp of Location creation e.g. `2016-08-01T23:33:54Z`
  - `updated_at`: string(date-time) - Timestamp of last update to Location e.g. `2016-08-01T23:33:54Z`
- `open_date`: string(date) - Date the submittal was opened. Null when not set. e.g. `2014-07-22`
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
- `scheduled_task`: object - Information about the scheduled task associated with this submittal. Null when no task is linked.
  - `id`: integer - Scheduled Task ID e.g. `98765`
  - `name`: string - Full Name of the scheduled task e.g. `Review Window Installation`
  - `task_name`: string - the raw name of the scheduled task e.g. `Window Installation`
  - `formatted_name`: string - formatted name of the scheduled task e.g. `Review Window Installation`
  - `key`: string - surrogate key of the scheduled task e.g. `98765|36798130-963d-437d-b6b3-73eed4a23dac`
  - `start_date`: string(date-time) - the start date of the scheduled task e.g. `2018-02-28T17:00:00Z`
  - `finish_date`: string(date-time) - the finish date of the scheduled task e.g. `2018-03-28T17:00:00Z`
- `id`: integer e.g. `610071`
- `number`: string e.g. `118`
- `revision`: string e.g. `0`
- `title`: string e.g. `Smiths - Teardown & Assembly Bldg`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/next_available_number  **[OLDER VERSION - a newer path version exists below/above]**

**Get Next Available Number**
Returns the next available number. See Get Next Available Number By Spec Section if number submittals by spec section is enabled.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `next_number`: string e.g. `2`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/submittals/next_available_number/{spec_section_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Get Next Available Number By Spec Section**
Returns the next available number and next spec section number in the project if numbers submittals by spec section is enabled.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `spec_section_id` [path] integer (required) - Spec Section ID

Response 200 (application/json): object

- `next_number`: string e.g. `2`

Error responses: 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

