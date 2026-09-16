# Procore API: Payments (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Payments)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Contract Compliance Documents](#contract-compliance-documents) - versions 2.0
- [Invoice Payment Terms](#invoice-payment-terms) - versions 2.0
- [Payment Terms](#payment-terms) - versions 2.0
- [Payments Subtier Waivers](#payments-subtier-waivers) - versions 1.0
- [Payments Subtiers](#payments-subtiers) - versions 1.0
- [Requisition Compliance Documents](#requisition-compliance-documents) - versions 2.0

## Contract Compliance Documents

Resource id: `contract-compliance-documents`. Raw spec: `../openapi-raw/contract-compliance-documents.json`. Web: https://developers.procore.com/reference/rest/contract-compliance-documents?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/contracts/{contract_id}/documents

**List contract compliance documents**
Lists the contract compliance documents
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `contract_id` [path] string (required) - ID of the contract
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `status[]` [query] array of string enum[not_compliant, in_review, revision_needed, compliant] - Return only compliance documents in the given statuses. Repeat the parameter to filter on more than one status. Omit it to return documents in every status. Example usage: ?status[]=not_compliant&status[]=in_review&st...
- `allow_vendor_submission` [query] boolean - Return only compliance documents whose vendor submission setting matches the given value. Omit it to return documents regardless of the setting.

Response 200 (application/json): object

- `data`: object - A single compliance document.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/contracts/{contract_id}/documents

**Create contract compliance document**
Creates a compliance document for a contract
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `contract_id` [path] string (required) - ID of the contract

Request body (application/json):

- `name`: string - Name of the compliance document e.g. `Document One`
- `document_type`: string - Document type of the compliance document e.g. `bond`
- `notes`: string - Notes for the compliance document e.g. `GC notes`
- `reviewer_notes`: string - Notes from the reviewer. When provided, the requesting user is recorded as the reviewer and the review timestamp is set. e.g. `Reviewer Notes`
- `prostore_file_ids`: array of string - Array of Procore file IDs
- `effective_at`: string(date-time) - Effective date of the compliance document e.g. `2021-01-01T00:00:00Z`
- `expires_at`: string(date-time) - Expiration date of the compliance document e.g. `2021-01-01T00:00:00Z`
- `allow_vendor_submission`: boolean - Whether vendors are allowed to submit this compliance document e.g. `true`
- `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when the effective allow_vendor_submission is true - it is forced to false otherwise. Defaults to false. e.g. `false`
- `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. Only commitment admins can set this field. e.g. `true`
- `status`: string - Initial status of the compliance document. **Required** when the vendor submission feature flag is enabled — a 400 is returned if omitted. Ignored when the flag is disabled; status is then auto-determined based on whe... e.g. `not_submitted`

Response 201 (application/json): object

- `data`: object - A single compliance document.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/contracts/{contract_id}/documents/{id}

**Get contract compliance document**
Gets the contract compliance document
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `contract_id` [path] string (required) - ID of the contract
- `id` [path] string (required) - ID of the compliance document

Response 200 (application/json): object

- `data`: object - A single compliance document.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/contracts/{contract_id}/documents/{id}

**Update contract compliance document**
Updates a contract compliance document
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `contract_id` [path] string (required) - ID of the contract
- `id` [path] string (required) - ID of the compliance document

Request body (application/json):

- `name`: string - Name of the compliance document e.g. `Document One`
- `document_type`: string - Document type of the compliance document e.g. `bond`
- `status`: string - Status of the compliance document e.g. `approved`
- `reviewer_notes`: string - Notes from the reviewer e.g. `Reviewer Notes`
- `notes`: string - Notes for the compliance document. Only commitment admins can update this field. e.g. `GC notes`
- `prostore_file_ids`: array of string - Array of Procore file IDs
- `effective_at`: string(date-time) - Effective date of the compliance document e.g. `2021-01-01T00:00:00Z`
- `expires_at`: string(date-time) - Expiration date of the compliance document e.g. `2021-01-01T00:00:00Z`
- `allow_vendor_submission`: boolean - Whether vendors are allowed to submit this compliance document e.g. `true`
- `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when the effective allow_vendor_submission is true - it is forced to false otherwise. Only commitment admins c... e.g. `false`
- `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. Only commitment admins can update this field. e.g. `true`

Response 200 (application/json): object

- `data`: object - A single compliance document.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/contracts/{contract_id}/documents/{id}

**Delete contract compliance document**
Deletes a contract compliance document
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `contract_id` [path] string (required) - ID of the contract
- `id` [path] string (required) - ID of the compliance document

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Invoice Payment Terms

Resource id: `invoice-payment-terms`. Raw spec: `../openapi-raw/invoice-payment-terms.json`. Web: https://developers.procore.com/reference/rest/invoice-payment-terms?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/requisitions/{id}/invoice_payment_terms  **[BETA]**

**Show the Invoice Payment Term for a Requisition (Subcontractor Invoice)**
Returns the Invoice Payment Term snapshot for a Requisition (Subcontractor Invoice).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `id` [path] string (required) - Unique identifier for the Requisition (Subcontractor Invoice)

Response 200 (application/json): object

- `data`: object - Per-invoice snapshot of the payment term assigned to the commitment at invoice submission. The snapshotted term values are fixed at submission, so later changes to the company payment term do not affect existing invoi...
  - `id`: string - Unique identifier for the invoice payment term e.g. `123456`
  - `company_id`: string - Company ID that owns this invoice payment term e.g. `789`
  - `project_id`: string - Project ID that owns this invoice payment term e.g. `456`
  - `requisition_id`: string - ID of the requisition (subcontractor invoice) this payment term applies to e.g. `321`
  - `payment_term_id`: string - Identifier of the company-level payment term this snapshot was copied from e.g. `5f9b2c1e-2a44-4d0b-9d2e-4c1a1c9c0f11`
  - `payment_term_type`: string enum[NET_DAYS_AFTER_SUBMISSION, DISCOUNT_TERMS, OWNER_FUNDING_RECEIVED] - Type of payment term captured in the snapshot e.g. `NET_DAYS_AFTER_SUBMISSION`
  - `payment_term_status`: string enum[ACTIVE, WAIVED, EXPIRED, DISABLED_MANUAL_PAID, DISABLED_PARTIALLY_PAID, PAID] - Current status of the invoice payment term. WAIVED, PAID, DISABLED_MANUAL_PAID, and DISABLED_PARTIALLY_PAID are terminal. e.g. `ACTIVE`
  - `net_days`: integer - Number of days after the qualifying event that payment is due e.g. `30`
  - `discount_rate`: integer - Discount rate in basis points e.g. `200`
  - `discount_valid_days`: integer - Number of days the discount remains valid after invoice submission e.g. `10`
  - `discount_day_of_month`: integer - Day of the month the discount expires, for DISCOUNT_TERMS payment terms e.g. `10`
  - `auto_expire_discount`: boolean - Whether the discount automatically expires once the due date passes e.g. `true`
  - `discount_amount`: string - Calculated discount amount for this invoice e.g. `200.0`
  - `due_date`: string(date) - Date the invoice payment is due under this payment term e.g. `2025-06-30`
  - `created_at`: string(date-time) - Timestamp when the invoice payment term was created e.g. `2025-05-31T13:21:20Z`
  - `updated_at`: string(date-time) - Timestamp when the invoice payment term was last updated e.g. `2025-06-01T13:21:20Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Payment Terms

Resource id: `payment-terms`. Raw spec: `../openapi-raw/payment-terms.json`. Web: https://developers.procore.com/reference/rest/payment-terms?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/payment_terms  **[BETA]**

**List Payment Terms**
Returns all company-level Payment Terms. Requires company payments read permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object
  - `id`: string - Unique identifier (UUID) for the payment term. Matches payment_terms_id on commitment contracts. e.g. `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
  - `company_id`: string - Company ID that owns this payment term e.g. `789`
  - `name`: string - Display name of the payment term e.g. `Net 30`
  - `payment_term_type`: string enum[NET_DAYS_AFTER_SUBMISSION, DISCOUNT_TERMS, OWNER_FUNDING_RECEIVED] - Type of payment term e.g. `NET_DAYS_AFTER_SUBMISSION`
  - `net_days`: integer - Number of days after the qualifying event that payment is due e.g. `30`
  - `discount_rate`: integer - Discount rate in basis points e.g. `200`
  - `discount_valid_days`: integer - Number of days the discount remains valid after invoice submission e.g. `10`
  - `discount_due_day_of_month`: integer - Day of the month the discount expires, for DISCOUNT_TERMS payment terms e.g. `15`
  - `auto_expire_discount`: boolean - Whether the discount automatically expires once the due date passes e.g. `true`
  - `erp_id`: string - External ERP system identifier for this payment term, when configured e.g. `ERP-PT-100`
  - `active`: boolean - Whether the payment term is currently active and available for assignment e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the payment term was created e.g. `2025-05-31T13:21:20Z`
  - `updated_at`: string(date-time) - Timestamp when the payment term was last updated e.g. `2025-06-01T13:21:20Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/payment_terms/{id}  **[BETA]**

**Show a Payment Term**
Returns a company-level Payment Term by id. Requires company payments read permission.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - Unique identifier (UUID) for the payment term. This is the same value returned as payment_terms_id on commitment contracts.

Response 200 (application/json): object

- `data`: object - Company-level payment term definition. Commitments reference this resource via payment_terms_id. The same term may be snapshotted onto invoices as an Invoice Payment Term.
  - `id`: string - Unique identifier (UUID) for the payment term. Matches payment_terms_id on commitment contracts. e.g. `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
  - `company_id`: string - Company ID that owns this payment term e.g. `789`
  - `name`: string - Display name of the payment term e.g. `Net 30`
  - `payment_term_type`: string enum[NET_DAYS_AFTER_SUBMISSION, DISCOUNT_TERMS, OWNER_FUNDING_RECEIVED] - Type of payment term e.g. `NET_DAYS_AFTER_SUBMISSION`
  - `net_days`: integer - Number of days after the qualifying event that payment is due e.g. `30`
  - `discount_rate`: integer - Discount rate in basis points e.g. `200`
  - `discount_valid_days`: integer - Number of days the discount remains valid after invoice submission e.g. `10`
  - `discount_due_day_of_month`: integer - Day of the month the discount expires, for DISCOUNT_TERMS payment terms e.g. `15`
  - `auto_expire_discount`: boolean - Whether the discount automatically expires once the due date passes e.g. `true`
  - `erp_id`: string - External ERP system identifier for this payment term, when configured e.g. `ERP-PT-100`
  - `active`: boolean - Whether the payment term is currently active and available for assignment e.g. `true`
  - `created_at`: string(date-time) - Timestamp when the payment term was created e.g. `2025-05-31T13:21:20Z`
  - `updated_at`: string(date-time) - Timestamp when the payment term was last updated e.g. `2025-06-01T13:21:20Z`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Payments Subtier Waivers

Resource id: `payments-subtier-waivers`. Raw spec: `../openapi-raw/payments-subtier-waivers.json`. Web: https://developers.procore.com/reference/rest/payments-subtier-waivers?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/payments/subtier_waivers

**List payments subtier waivers**
Returns list of payment subtier waivers

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - ID of the project
- `subtier_requisition_id` [query] string (required) - Unique identifier of the subtier requisition, supports comma separated list
- `waiver_type` [query] string enum[unconditional, conditional] - Filters returned waivers by type. Conditional waivers are contingent on payment; unconditional waivers confirm payment received.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the subtier waiver. Use as the {id} path parameter for update, cancel, and regenerate operations. e.g. `1`
- `subtier_requisition_id`: integer - Identifier of the subtier requisition (billing period) this waiver applies to. e.g. `1`
- `subtier_id`: integer - Identifier of the subtier this waiver belongs to. Use as the {subtier_id} path parameter. e.g. `1`
- `waiver_type`: string enum[unconditional, conditional] - Whether the waiver is conditional (contingent on payment) or unconditional (payment confirmed). e.g. `conditional`
- `created_by`: string - Full name of the user who created the waiver. e.g. `John Doe`
- `updated_by`: string - Full name of the user who last updated the waiver. e.g. `John Doe`
- `uploaded_by`: string - Full name of the user who uploaded the signed waiver document. Null when no document has been uploaded. e.g. `John Doe`
- `created_at`: string(date-time) - Timestamp when the waiver was created, in ISO 8601 format. e.g. `2018-05-08T13:21:20Z`
- `updated_at`: string(date-time) - Timestamp when the waiver was last updated, in ISO 8601 format. e.g. `2018-05-08T13:21:20Z`
- `uploaded_at`: string(date-time) - Timestamp when the signed waiver document was uploaded, in ISO 8601 format. Null when no document has been uploaded. e.g. `2018-05-08T13:21:20Z`
- `reviewed_at`: string(date-time) - Timestamp when the waiver was reviewed, in ISO 8601 format. Null until reviewed. e.g. `2018-05-08T13:21:20Z`
- `reviewed_by`: string - Full name of the user who reviewed the waiver. Null until reviewed. e.g. `John Doe`
- `reviewer_notes`: string - Free-text notes left by the reviewer, typically explaining a revise-and-resubmit decision. e.g. `Please upload the signed copy.`
- `status`: string - Review lifecycle state of the waiver. One of not_submitted, review_pending, revise_and_resubmit, or approved. e.g. `approved`
- `attachment`: object - The uploaded waiver document, when one has been attached. Null when no document is present.
  - `id`: integer - Unique identifier of the attachment. e.g. `1`
  - `name`: string - Display name of the attachment. e.g. `Waiver`
  - `url`: string - Temporary, downloadable URL for retrieving the attachment file. e.g. `https://example.com/waiver.pdf`
  - `filename`: string - Original filename of the uploaded document. e.g. `january_receipt_copy.jpg`
  - `content_type`: string - MIME type of the attachment file. e.g. `image/jpeg`
- `generated_waiver`: object - The Procore-generated lien waiver document sent to the subtier for e-signature. Null until a waiver is generated via the generate/regenerate endpoints.
  - `id`: integer - Unique identifier of the generated lien waiver. e.g. `1`
  - `status`: string - Current state of the generated lien waiver document. e.g. `sent`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Payments Subtiers

Resource id: `payments-subtiers`. Raw spec: `../openapi-raw/payments-subtiers.json`. Web: https://developers.procore.com/reference/rest/payments-subtiers?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/payments/requisitions/{requisition_id}/subtiers

**List payments subtiers for the requisition**
Returns list of payment subtiers

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - ID of the project
- `requisition_id` [path] integer (required) - ID of the requisition
- `commitment_id` [query] integer (required) - Unique identifier of the commitment
- `id` [query] integer - Unique identifier of the subtier

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the subtier. e.g. `1`
- `commitment_id`: integer - Identifier of the project commitment (contract) this subtier is tracked under. e.g. `1`
- `commitment_amount`: number - Total contracted amount committed to this subtier. e.g. `200000`
- `name`: string - Company name of the subtier. e.g. `Cohen's Concrete`
- `amount_billed_to_date`: number - Cumulative amount billed to date for this subtier on the current requisition. e.g. `100000`
- `status`: string - Lifecycle status of the subtier. One of active, exempt, lien_filed, final_expected, or final_received. e.g. `active`
- `waiver_contact_email`: string - Email address of the subtier contact who receives lien waivers to e-sign. e.g. `abd@example.com`
- `subtier_type`: string - Whether the subtier is a supplier or a subcontractor. e.g. `supplier`
- `kind_of_work`: string - Description of the type of work the subtier performs. e.g. `Concrete`
- `phone`: string - Phone number of the subtier. e.g. `1234567890`
- `address`: string - Street address of the subtier. e.g. `123 Main St`
- `city`: string - City of the subtier's address. e.g. `New York`
- `state_code`: string - State or province code of the subtier's address. e.g. `NY`
- `zip`: string - Postal/ZIP code of the subtier's address. e.g. `10001`
- `country_code`: string - Country code of the subtier's address. e.g. `US`
- `additional_address_information`: string - Supplementary address details such as suite or unit number. e.g. `Suite 100`
- `hired_by_subtier_id`: integer - Identifier of the subtier that hired this subtier, establishing the hiring hierarchy. Null when hired directly by the commitment holder. e.g. `1`
- `hired_by_subtier_name`: string - Company name of the subtier that hired this subtier. e.g. `Subtier Two`
- `joint_check_future_requisitions`: boolean - Whether future requisitions for this subtier should be paid by joint check. e.g. `true`
- `vendor_id`: integer - Identifier of the vendor record associated with this subtier. Null when no vendor is linked. e.g. `12345`
- `vendor_verified`: boolean - Whether the associated vendor has been verified for payments. e.g. `true`
- `beneficiary_status`: string - Procore Pay beneficiary status of the associated vendor. e.g. `approved`
- `subtier_requisitions`: array of object - Per-requisition billing details for this subtier. Only returned when extended=true.
  - `id`: integer - Unique identifier of the subtier requisition. e.g. `1`
  - `requisition_id`: integer - Identifier of the commitment requisition (billing period) this subtier requisition belongs to. e.g. `1`
  - `billing_type`: string - Whether this requisition is a progress billing or the final billing. e.g. `progress`
  - `billing_amount`: number - Amount billed by the subtier on this requisition. e.g. `100000`
  - `through_date`: string(date-time) - Billing period end date for the subtier requisition, in ISO 8601 format. e.g. `2024-05-31T14:00:00Z`
  - `joint_check_requisition`: boolean - Whether this subtier requisition should be paid by joint check. e.g. `true`
  - `waiver_required`: boolean - Whether a lien waiver is required for this subtier requisition. e.g. `true`
  - `authorized`: boolean - Whether this subtier requisition has been verified and authorized for payment. e.g. `true`
  - `authorized_by`: string - Full name of the user who authorized the subtier requisition. Null until authorized. e.g. `John Doe`
  - `authorized_at`: string(date-time) - Timestamp when the subtier requisition was authorized, in ISO 8601 format. Null until authorized. e.g. `2024-06-15T10:30:00Z`
  - `authorized_amount`: number - Amount authorized for payment on this subtier requisition. e.g. `80000`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/payments/commitments/{commitment_id}/subtiers

**List payments subtiers for the commitment**
Returns list of payment subtiers

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - ID of the project
- `commitment_id` [path] integer (required) - ID of the commitment
- `id` [query] integer - Unique identifier of the subtier

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the subtier. Use as the {id} path parameter to update or delete this subtier. e.g. `1`
- `commitment_id`: integer - Identifier of the project commitment (contract) this subtier is tracked under. e.g. `1`
- `commitment_amount`: number - Total contracted amount committed to this subtier. e.g. `200000`
- `name`: string - Company name of the subtier. e.g. `Cohen's Concrete`
- `amount_billed_to_date`: number - Cumulative amount billed to date for this subtier on the current requisition. e.g. `100000`
- `status`: string - Lifecycle status of the subtier. One of active, exempt, lien_filed, final_expected, or final_received. e.g. `active`
- `has_notices`: boolean - Whether the subtier has any notice documents attached. e.g. `true`
- `deletable`: boolean - Whether the subtier can be deleted. False when the subtier has associated billing that prevents removal. e.g. `true`
- `first_date_on_project`: string(date-time) - Timestamp of the subtier's first day of work on the project, in ISO 8601 format. Null when not recorded. e.g. `2024-01-10T15:39:40Z`
- `last_date_on_project`: string(date-time) - Timestamp of the subtier's last day of work on the project, in ISO 8601 format. Null when not recorded. e.g. `2024-02-22T15:39:40Z`
- `last_notice_received_on`: string(date-time) - Timestamp when the most recent notice from the subtier was received, in ISO 8601 format. Null when no notice received. e.g. `2024-02-20T15:39:40Z`
- `notes`: string - Free-text notes recorded about the subtier. e.g. `Subtier 1 Notes`
- `waiver_contact_email`: string - Email address of the subtier contact who receives lien waivers to e-sign. e.g. `abd@example.com`
- `joint_check_future_requisitions`: boolean - Whether future requisitions for this subtier should be paid by joint check. e.g. `false`
- `subtier_type`: string - Whether the subtier is a supplier or a subcontractor. e.g. `supplier`
- `kind_of_work`: string - Description of the type of work the subtier performs. e.g. `Concrete`
- `phone`: string - Phone number of the subtier. e.g. `1234567890`
- `address`: string - Street address of the subtier. e.g. `123 Main St`
- `city`: string - City of the subtier's address. e.g. `New York`
- `state_code`: string - State or province code of the subtier's address. e.g. `NY`
- `zip`: string - Postal/ZIP code of the subtier's address. e.g. `10001`
- `country_code`: string - Country code of the subtier's address. e.g. `US`
- `additional_address_information`: string - Supplementary address details such as suite or unit number. e.g. `Suite 100`
- `hired_by_subtier_id`: integer - Identifier of the subtier that hired this subtier, establishing the hiring hierarchy. Null when hired directly by the commitment holder. e.g. `1`
- `hired_by_subtier_name`: string - Company name of the subtier that hired this subtier. e.g. `Subtier Two`
- `vendor_id`: integer - Identifier of the vendor record associated with this subtier. Null when no vendor is linked. e.g. `12345`
- `vendor_verified`: boolean - Whether the associated vendor has been verified for payments. e.g. `true`
- `beneficiary_status`: string - Procore Pay beneficiary status of the associated vendor. e.g. `approved`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Requisition Compliance Documents

Resource id: `requisition-compliance-documents`. Raw spec: `../openapi-raw/requisition-compliance-documents.json`. Web: https://developers.procore.com/reference/rest/requisition-compliance-documents?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/invoices/{invoice_id}/documents

**List requisition compliance documents**
Lists the requisition compliance documents
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `invoice_id` [path] string (required) - ID of the SC Invoice
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `status[]` [query] array of string enum[not_compliant, in_review, revision_needed, compliant] - Return only compliance documents in the given statuses. Repeat the parameter to filter on more than one status. Omit it to return documents in every status. Example usage: ?status[]=not_compliant&status[]=in_review&st...
- `allow_vendor_submission` [query] boolean - Return only compliance documents whose vendor submission setting matches the given value. Omit it to return documents regardless of the setting.

Response 200 (application/json): object

- `data`: array of object - The compliance documents for the invoice.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/invoices/{invoice_id}/documents

**Create compliance document**
Creates a compliance document
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `invoice_id` [path] string (required) - ID of the SC Invoice

Request body (application/json):

- `name`: string - Display name of the compliance document. e.g. `Document One`
- `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document. Valid values are constrained by the enum. e.g. `bond`
- `notes`: string - General notes for the compliance document. e.g. `GC notes`
- `reviewer_notes`: string - Notes recorded by the reviewer during review. When provided, the requesting user is recorded as the reviewer and the review timestamp is set. e.g. `Reviewer Notes`
- `prostore_file_ids`: array of string - IDs of Procore files to attach to the compliance document.
- `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
- `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
- `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
- `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when the effective allow_vendor_submission is true - it is forced to false otherwise. Defaults to false. e.g. `false`
- `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Initial compliance status of the document. Valid values are constrained by the enum. e.g. `not_submitted`

Response 201 (application/json): object

- `data`: object - A single compliance document.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 400, 401, 403, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/invoices/{invoice_id}/documents/{document_id}

**Get requisition compliance document**
Gets the requisition compliance document
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `invoice_id` [path] string (required) - ID of the SC Invoice
- `document_id` [path] string (required) - ID of the compliance document

Response 200 (application/json): object

- `data`: object - A single compliance document.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/invoices/{invoice_id}/documents/{document_id}

**Update requisition compliance document**
Updates the requisition compliance document
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `invoice_id` [path] string (required) - ID of the SC Invoice
- `document_id` [path] string (required) - ID of the compliance document

Request body (application/json):

- `name`: string - Display name of the compliance document. e.g. `Document One`
- `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document. Valid values are constrained by the enum. e.g. `bond`
- `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Compliance status to set on the document. Valid values are constrained by the enum. e.g. `approved`
- `reviewer_notes`: string - Notes recorded by the reviewer during review. e.g. `Reviewer Notes`
- `notes`: string - General notes for the compliance document. Only commitment admins can update this field. e.g. `GC notes`
- `prostore_file_ids`: array of string - IDs of Procore files to attach to the compliance document.
- `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
- `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
- `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
- `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when the effective allow_vendor_submission is true - it is forced to false otherwise. Only commitment admins c... e.g. `false`

Response 200 (application/json): object

- `data`: object - A single compliance document.
  - `id`: string - Unique identifier for this compliance document. Use as the document_id path parameter to retrieve, update, or delete it. e.g. `123456`
  - `name`: string - Display name of the compliance document. e.g. `Compliance document name example`
  - `status`: string enum[not_submitted, review_pending, revise_and_resubmit, approved, not_compliant, in_review, revision_needed, compliant] - Current compliance status of the document. Valid values are constrained by the enum. e.g. `approved`
  - `document_type`: string enum[bond, project_insurance, license, master_agreement, permit, safety, w9, other, payroll, stored_material, closeout] - Category of compliance document (e.g. bond, insurance, license). Valid values are constrained by the enum. e.g. `safety`
  - `notes`: string - General notes for the compliance document. Null when no notes have been added. e.g. `Compliance document notes example`
  - `effective_at`: string(date-time) - Date and time the document becomes effective, in ISO 8601 format. Null when not set. e.g. `2021-01-01T00:00:00Z`
  - `expires_at`: string(date-time) - Date and time the document expires, in ISO 8601 format. Null when the document does not expire. e.g. `2021-01-01T00:00:00Z`
  - `created_at`: string(date-time) - Date and time the document was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
  - `updated_at`: string(date-time) - Date and time the document was last updated, in ISO 8601 format. Null if it has never been updated since creation. e.g. `2021-01-01T00:00:00Z`
  - `reviewed_at`: string(date-time) - Date and time the document was last reviewed, in ISO 8601 format. Null if it has not been reviewed. e.g. `2021-01-01T00:00:00Z`
  - `created_by_id`: string - ID of the user who created the document. e.g. `123456`
  - `created_by`: string - Full name of the user who created the document. e.g. `John Doe`
  - `updated_by_id`: string - ID of the user who last updated the document. Null if it has never been updated. e.g. `123456`
  - `updated_by`: string - Full name of the user who last updated the document. Null if it has never been updated. e.g. `John Doe`
  - `reviewed_by_id`: string - ID of the user who last reviewed the document. Null if it has not been reviewed. e.g. `123456`
  - `reviewed_by`: string - Full name of the user who last reviewed the document. Null if it has not been reviewed. e.g. `John Doe`
  - `reviewer_notes`: string - Notes recorded by the reviewer during review. Null when the document has not been reviewed or no reviewer notes were added. e.g. `Compliance document reviewer notes example`
  - `compliance_document_requirement_id`: string - ID of the parent document requirement when the compliance document was created from a template. Null for manually created documents. e.g. `123456`
  - `allow_vendor_submission`: boolean - Whether vendors are allowed to submit files against this compliance document. e.g. `true`
  - `required_for_vendor_submission`: boolean - Whether the vendor must submit this compliance document before they can submit an invoice. Only applicable when allow_vendor_submission is true. Defaults to false. e.g. `false`
  - `send_expiration_notification`: boolean - Whether an expiration notification should be sent before this compliance document expires. e.g. `false`
  - `compliance_documents_prostore_files`: array of object - Files attached to this compliance document. Only populated on the show and update responses; null or empty otherwise.
    - `id`: string - Unique identifier for this compliance document file attachment. e.g. `123456`
    - `compliance_document_id`: string - ID of the compliance document this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files
  - `submission_instructions`: string - Rich-text HTML submission instructions inherited live from the parent document requirement, describing how to submit this document. Returned on the show response. Null when the document does not originate from a requi... e.g. `<p>Please upload a signed bond certificate.</p>`
  - `sample_files`: array of object - Sample files inherited live from the parent document requirement to illustrate the expected submission. Returned on the show response. Empty when the document does not originate from a requirement that permits vendor ...
    - `id`: string - Unique identifier for this compliance document requirement file attachment. e.g. `123456`
    - `compliance_document_requirement_id`: string - ID of the compliance document requirement this file is attached to. e.g. `123456`
    - `created_at`: string(date-time) - Timestamp when the attachment was created, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `updated_at`: string(date-time) - Timestamp when the attachment was last updated, in ISO 8601 format. e.g. `2021-01-01T00:00:00Z`
    - `created_by_id`: string - ID of the user who created the attachment. e.g. `123456`
    - `created_by`: string - Full name of the user who created the attachment. e.g. `John Doe`
    - `updated_by_id`: string - ID of the user who last updated the attachment. Null if it has never been updated. e.g. `123456`
    - `updated_by`: string - Full name of the user who last updated the attachment. Null if it has never been updated. e.g. `John Doe`
    - `prostore_file`: object - Prostore Files

Error responses: 400, 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/invoices/{invoice_id}/documents/{document_id}

**Delete requisition compliance document**
Deletes the requisition compliance document
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `invoice_id` [path] string (required) - ID of the SC Invoice
- `document_id` [path] string (required) - ID of the compliance document

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/compliance/invoices/{invoice_id}/documents/attachments

**List requisition compliance attachments**
Lists the requisition compliance attachments
**Procore Pay must be enabled to use this endpoint.**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - ID of the company
- `project_id` [path] string (required) - ID of the project
- `invoice_id` [path] string (required) - ID of the SC Invoice
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Compliance Attachments
  - `data`: object - Compliance attachment data object
    - `id`: string - Unique identifier for this compliance attachment. e.g. `123456`
    - `name`: string - File name of the compliance attachment. e.g. `Compliance attachment name example`
    - `type`: string - Source type of the attachment (e.g. a Procore file). e.g. `prostore_file`
    - `content_type`: string - MIME content type of the attached file. e.g. `application/pdf`
    - `url`: string - URL where the compliance attachment file can be downloaded. e.g. `https://example.com/compliance_attachment.pdf`

Error responses: 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

