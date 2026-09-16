# Procore API: Emails (Project Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Emails)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Communication Tags](#communication-tags) - versions 1.0
- [Communications](#communications) - versions 1.0
- [Communications Threads](#communications-threads) - versions 1.0
- [Email Communications](#email-communications) - versions 1.0

## Communication Tags

Resource id: `communication-tags`. Raw spec: `../openapi-raw/communication-tags.json`. Web: https://developers.procore.com/reference/rest/communication-tags?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/communication_tags

**List communication tags**
List communication tags on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[extended] - View type for the response.
- `search` [query] string - Search term to filter communication tags by title.

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/communication_tags

**Create communication tag**
Create a communication tag on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `communication_tag`: object (required)
  - `title`: string (required) - name of the tag

Response 200 (application/json): object

- `id`: integer e.g. `161072`
- `name`: string e.g. `my tag`

Response 201 (application/json): object

- `id`: integer e.g. `161072`
- `name`: string e.g. `my tag`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Communications

Resource id: `communications`. Raw spec: `../openapi-raw/communications.json`. Web: https://developers.procore.com/reference/rest/communications?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/communications/{id}

**Show Communication**
Shows detailed information around a single email communication

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Communication ID

Response 200 (application/json): object

- `initial_post`: object
  - `id`: integer - ID
  - `subject`: string - Subject
  - `email_sent_at`: string(date-time) - Date email sent
- `communication_tags`: array of object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `my tag`
- `created_at`: string(date) - Date created
- `private`: boolean - Private flag
- `closed`: boolean - Closed flag
- `id`: integer - ID
- `subject`: string - Subject

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Communications Threads

Resource id: `communications-threads`. Raw spec: `../openapi-raw/communications-threads.json`. Web: https://developers.procore.com/reference/rest/communications-threads?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/communications/{communication_id}/threads

**List Communication Threads**
Return a list of email communication threads.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `communication_id` [path] integer (required) - Communication ID

Response 200 (application/json): object

- `from_external_email`: boolean - Flag indicating whether the communication originated outside of Procore
- `from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `to`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `id`: integer - ID
- `subject`: string - Subject
- `email_sent_at`: string(date-time) - Date email sent

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/communications/{communication_id}/threads/{id}

**Show Communication Thread**
Shows detailed information for a specific email communication thread

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `communication_id` [path] integer (required) - Communication ID
- `id` [path] integer (required) - Communication Thread ID

Response 200 (application/json): object

- `body`: string - Body
- `cc`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `bcc`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `attachments`: array of object
  - `id`: integer
  - `name`: string - Use :name, :filename to be deprecated
  - `url`: string
  - `filename`: string - :filename to be deprecated, use :name
- `from_external_email`: boolean - Flag indicating whether the communication originated outside of Procore
- `from`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `to`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `id`: integer - ID
- `subject`: string - Subject
- `email_sent_at`: string(date-time) - Date email sent

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Email Communications

Resource id: `email-communications`. Raw spec: `../openapi-raw/email-communications.json`. Web: https://developers.procore.com/reference/rest/email-communications?version=latest
Product lines: PM Starter Pack, PM Essentials, Total Quality and Safety Management

### GET /rest/v1.0/project/{project_id}/email_communications/{id}

**Show Email Communication**
Shows detailed information around a single email communication

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Communication ID

Response 200 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/project/{project_id}/email_communications/{id}

**Update a private field in Email Communication**
Update a private field in email communication on the specified project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Communication ID

Request body (application/json) (required):

- `private`: boolean (required) - Private Indicator e.g. `true`

Response 201 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/project/{project_id}/email_communications

**Create Email Communication**
Creates a email communication on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `topic_type` [query] string enum[rfi, submittal_log, submittal_package, project, task, checklist, purchase_order_contract, work_order_contract, prime_contract, billings_requisition, payment_application, daily_log_header, ...] (required) - The type of the topic to be associated with the communication
- `topic_id` [query] integer (required) - Topic ID

Request body (application/json) (required):

- `communication`: object (required)
  - `subject`: string - Subject of the communication
- `email`: object (required)
  - `body`: string - Body of the email
  - `prostore_file_ids`: array of integer - Prostore file IDs
  - `drawing_revision_ids`: array of integer - Drawing revision IDs
  - `file_version_ids`: array of integer - File version IDs
  - `form_ids`: array of integer - Form IDs
  - `image_ids`: array of integer - Image IDs
  - `upload_ids`: array of string - Upload UUIDs
  - `distribution_ids`: array of integer - An array of IDs of the Distributions of the topic
  - `cc_distribution_ids`: array of integer - User IDs on the email CC distribution
  - `bcc_distribution_ids`: array of integer - User IDs on the email BCC distribution

Response 201 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/project/{project_id}/email_communications/{communication_id}/export

**Export Email Communication to PDF**
Creates a email communication on a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `communication_id` [path] integer (required) - Communication ID
- `topic_type` [query] string enum[rfi, submittal_log, submittal_package, project, task, checklist, purchase_order_contract, work_order_contract, prime_contract, billings_requisition, payment_application, daily_log_header, ...] (required) - The type of the topic to be associated with the communication

Response 200 (application/json): object

- `pdf_url`: string - Image URL e.g. `http://www.example.com/`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/project/{project_id}/email_communications/emails

**List of Emails**
Return a list of emails.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `topic_type` [query] string enum[rfi, submittal_log, submittal_package, project, task, checklist, purchase_order_contract, work_order_contract, prime_contract, billings_requisition, payment_application, daily_log_header, ...] (required) - The type of the topic to be associated with the communication
- `topic_id` [query] integer (required) - Topic ID

Response 200 (application/json): object

- `emails`: array of object - An array of IDs of the Distributions of the topic
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `subject`: string - Subject of the email e.g. `subject of the email`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
- `total`: integer - Total count of emails e.g. `12`
- `new_communication_email`: string - Email for creating a new communication thread associated with this topic e.g. `procore-inbound-email@example.com`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/project/{project_id}/email_communications/{communication_id}/emails

**Create Email**
Creates a email on a given communication

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `communication_id` [path] integer (required) - Communication ID
- `topic_type` [query] string enum[rfi, submittal_log, submittal_package, project, task, checklist, purchase_order_contract, work_order_contract, prime_contract, billings_requisition, payment_application, daily_log_header, ...] (required) - The type of the topic to be associated with the communication
- `topic_id` [query] integer (required) - Topic ID

Request body (application/json) (required):

- `email`: object (required)
  - `body`: string - Body of the email
  - `prostore_file_ids`: array of integer - Prostore file IDs
  - `distribution_ids`: array of integer - An array of IDs of the Distributions of the topic
  - `cc_distribution_ids`: array of integer - User IDs on the email CC distribution
  - `bcc_distribution_ids`: array of integer - User IDs on the email BCC distribution
  - `drawing_revision_ids`: array of integer - Drawing Revisions to attach to the response e.g. `[4, 5]`
  - `file_version_ids`: array of integer - File Versions to attach to the response e.g. `[6, 7]`
  - `form_ids`: array of integer - Forms to attach to the response e.g. `[7, 8]`
  - `image_ids`: array of integer - Images to attach to the response e.g. `[9, 10]`
  - `upload_ids`: array of string - Uploads to attach to the response e.g. `["4120226e-36a8-416f-970e-880bae78164f", "de07e35a-4860-4f96-acd8-8360833dc495"]`
  - `document_management_document_revision_ids`: array of string - PDM document to attach to the response e.g. `["01JC3TZNKJK6121Z1A2V7G574Q", "01JC3TZPXCJMC6P88CHHD6PTZ9"]`

Response 200 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/project/{project_id}/email_communications/{communication_id}/emails/{email_id}/download_attachments

**Download all email attachments**
Return URL to download all email attachments in .zip format

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `communication_id` [path] integer (required) - Communication ID
- `email_id` [path] integer (required) - Email ID

Response 200 (application/json): object

- `download_all_attachments_url`: string - URL to download all email attachments in .zip e.g. `http://www.example.com/`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/email_communications/emails

**List of Company-level Emails**
Return a list of emails for company-level communications.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `topic_type` [query] string enum[rfi, submittal_log, submittal_package, project, task, checklist, purchase_order_contract, work_order_contract, prime_contract, billings_requisition, payment_application, daily_log_header, ...] (required) - The type of the topic to be associated with the communication
- `topic_id` [query] integer (required) - Topic ID

Response 200 (application/json): object

- `communication_threads`: array of object - list of emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `subject`: string - Subject of the email e.g. `subject of the email`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
- `total`: integer - Total number of emails e.g. `345`
- `new_communication_email`: string - Email address for new communication e.g. `procore-inbound-email@example.com`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/email_communications/{communication_id}/emails

**Create Company-level Email**
Creates an email on a given company-level communication

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `communication_id` [path] integer (required) - Communication ID
- `topic_type` [query] string enum[rfi, submittal_log, submittal_package, project, task, checklist, purchase_order_contract, work_order_contract, prime_contract, billings_requisition, payment_application, daily_log_header, ...] (required) - The type of the topic to be associated with the communication
- `topic_id` [query] integer (required) - Topic ID

Request body (application/json) (required):

- `email`: object (required)
  - `body`: string - Body of the email
  - `prostore_file_ids`: array of integer - Prostore file IDs
  - `upload_ids`: array of string - Upload UUIDs
  - `distribution_ids`: array of integer - An array of IDs of the Distributions of the topic
  - `cc_distribution_ids`: array of integer - User IDs on the email CC distribution
  - `bcc_distribution_ids`: array of integer - User IDs on the email BCC distribution

Response 200 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/email_communications/{communication_id}/emails/{email_id}/download_attachments

**Download all company-level email attachments**
Return URL to download all email attachments in .zip format for company-level communications

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `communication_id` [path] integer (required) - Communication ID
- `email_id` [path] integer (required) - Email ID

Response 200 (application/json): object

- `download_all_attachments_url`: string - URL to download all email attachments in .zip e.g. `http://www.example.com/`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/email_communications/{id}

**Show Company-level Email Communication**
Shows detailed information around a single company-level email communication

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Communication ID

Response 200 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/email_communications/{id}

**Update a private field in Company-level Email Communication**
Update a private field in company-level email communication.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Communication ID

Request body (application/json) (required):

- `private`: boolean (required) - Private Indicator e.g. `true`

Response 201 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/email_communications

**Create Company-level Email Communication**
Creates a company-level email communication

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `topic_type` [query] string enum[rfi, submittal_log, submittal_package, project, task, checklist, purchase_order_contract, work_order_contract, prime_contract, billings_requisition, payment_application, daily_log_header, ...] (required) - The type of the topic to be associated with the communication
- `topic_id` [query] integer (required) - Topic ID

Request body (application/json) (required):

- `communication`: object (required)
  - `subject`: string - Subject of the communication
- `email`: object (required)
  - `body`: string - Body of the email
  - `prostore_file_ids`: array of integer - Prostore file IDs
  - `upload_ids`: array of string - Upload UUIDs
  - `distribution_ids`: array of integer - An array of IDs of the Distributions of the topic
  - `cc_distribution_ids`: array of integer - User IDs on the email CC distribution
  - `bcc_distribution_ids`: array of integer - User IDs on the email BCC distribution

Response 201 (application/json): object

- `id`: integer - Communication ID e.g. `29`
- `private`: boolean - Private Indicator e.g. `true`
- `subject`: string - Subject of the email communication e.g. `subject of the communication`
- `emails`: array of object - Emails
  - `id`: integer - Email ID e.g. `29`
  - `communication_id`: integer - Communication ID e.g. `2`
  - `private`: boolean - Private Indicator e.g. `true`
  - `attachments`: array of object - Email attachnents
    - `id`: integer - Attachment ID e.g. `123`
    - `name`: string - Attachment name e.g. `Example Attachment`
    - `url`: string - Attachment URL e.g. `http://www.example.com/`
  - `bcc_distribution`: array of object - Users on the email BCC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `body`: string - Company name e.g. `Doe Construction`
  - `sanitized_body_html`: string - Body of the email in HTML format e.g. `<p>Test email body</p>`
  - `cc_distribution`: array of object - Users on the email CC distribution
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `distribution`: array of object - An array of users of the Distributions of the topic
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`
  - `email_sent_at`: string(date-time) - Date email sent
  - `login_information`: object - User
    - `id`: integer - User ID e.g. `123`
    - `company_name`: string - Company Name e.g. `Some Company Name`
    - `locale`: string - User dictionary e.g. `ko`
    - `login`: string - Login of user e.g. `person18@example.com`
    - `name`: string - User name e.g. `Paul Dou`
    - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
    - `initials`: string - User initials e.g. `PD`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/email_communications/{id}/export

**Export Company-level Email Communication**
Export detailed information for company-level Email Communications for specified Id to PDF.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Communication ID

Response 200 (application/json): object

- `download_url`: string - URL to download PDF e.g. `http://www.example.com/`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

