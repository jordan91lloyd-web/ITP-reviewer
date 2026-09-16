# Procore API: Contracts (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Contracts)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Electronic Signatures](#electronic-signatures) - versions 1.0
- [Financial Markups](#financial-markups) - versions 1.0
- [Invoice Configuration](#invoice-configuration) - versions 1.0

## Electronic Signatures

Resource id: `electronic-signatures`. Raw spec: `../openapi-raw/electronic-signatures.json`. Web: https://developers.procore.com/reference/rest/electronic-signatures?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/electronic_signatures/{electronic_signature_id}  **[BETA]**

**View an Electronic Signature**
The endpoint gives the ability to view an Electronic Signature.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer - company_id (either company_id or project_id is required)
- `project_id` [query] integer - project_id (either project_id or company_id is required)
- `electronic_signature_id` [path] integer (required) - ID of the Electronic Signature to view.
- `view` [query] string enum[minimal] - Specifies how much information to show for the electronic signature. The minimal view returns only electronic signature information currently available. Specifying anything else defaults to all information. It is reco...

Response 200 (application/json): object

- `id`: integer - ID e.g. `58820`
- `object_id`: number - ID of the object that the Electronic Signature was created for e.g. `1634`
- `object_type`: string - Type of the object that the Electronic Signature was created for e.g. `Contract`
- `status`: string - the status of the electronic signature e.g. `created`
- `created_at`: string(date-time) - Timestamp when this electronic signature record was created, in ISO 8601 format. e.g. `2026-08-31T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when this electronic signature record was last updated e.g. `2026-08-31T21:45:12Z`
- `metadata`: object
  - `title`: string - title of the state of the electronic signature
  - `message`: string - a message giving information about the state of the electronic signature
  - `type`: string - the type of the metadata
- `actions`: object - actions that can be performed for the electronic signature in its current state
  - `name`: string enum[void, withdraw, edit, refresh, sign, reauthenticate, download, finish] - the name of an action that can be performed on the ElectronicSignature
  - `url`: string - the URL corresponding to the action
  - `display_name`: string - the i18n label for the buttons in the Docusign banner
- `ball_in_court_names`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/electronic_signatures  **[BETA]**

**Create an Electronic Signature**
The Electronic Signature endpoint allows for the creation of a Electronic Signature

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer - company_id (either company_id or project_id is required)
- `project_id` [query] integer - project_id (either project_id or company_id is required)
- `object_id` [query] integer (required) - ID of the object for which we need the create the electronic signature
- `object_type` [query] string enum[Billings::Requisition, Contract, ChangeOrderPackage, ChangeOrderRequest, PotentialChangeOrder, PaymentApplication, GenericToolItem] (required) - Type of the object for which we need the create the electronic signature

Request body (application/json):

- `account_type`: string enum[manual] - Provider type. Pass "manual" to create a manual upload electronic signature record without requiring DocuSign or ProcoreSign. Omit for standard DocuSign / ProcoreSign flows.
- `prostore_file_id`: integer - ID of the pre-uploaded signed document. Required when account_type is "manual".
- `redirect_path`: string - Relative path (no host or scheme) to redirect the user to. Absolute or protocol-relative paths are rejected.

Response 201 (application/json): object

- `id`: integer - ID e.g. `58820`
- `object_id`: number - ID of the object that the Electronic Signature was created for e.g. `1634`
- `object_type`: string - Type of the object that the Electronic Signature was created for e.g. `Contract`
- `status`: string - the status of the electronic signature e.g. `created`
- `created_at`: string(date-time) - Timestamp when this electronic signature record was created, in ISO 8601 format. e.g. `2026-08-31T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when this electronic signature record was last updated e.g. `2026-08-31T21:45:12Z`
- `metadata`: object
  - `title`: string - title of the state of the electronic signature
  - `message`: string - a message giving information about the state of the electronic signature
  - `type`: string - the type of the metadata
- `actions`: object - actions that can be performed for the electronic signature in its current state
  - `name`: string enum[void, withdraw, edit, refresh, sign, reauthenticate, download, finish] - the name of an action that can be performed on the ElectronicSignature
  - `url`: string - the URL corresponding to the action
  - `display_name`: string - the i18n label for the buttons in the Docusign banner
- `ball_in_court_names`: array of string

Response 202 (application/json): object

- `id`: integer - ID e.g. `58820`
- `object_id`: number - ID of the object that the Electronic Signature was created for e.g. `1634`
- `object_type`: string - Type of the object that the Electronic Signature was created for e.g. `Contract`
- `status`: string - the status of the electronic signature e.g. `created`
- `created_at`: string(date-time) - Timestamp when this electronic signature record was created, in ISO 8601 format. e.g. `2026-08-31T21:39:40Z`
- `updated_at`: string(date-time) - Timestamp when this electronic signature record was last updated e.g. `2026-08-31T21:45:12Z`
- `metadata`: object
  - `title`: string - title of the state of the electronic signature
  - `message`: string - a message giving information about the state of the electronic signature
  - `type`: string - the type of the metadata
- `actions`: object - actions that can be performed for the electronic signature in its current state
  - `name`: string enum[void, withdraw, edit, refresh, sign, reauthenticate, download, finish] - the name of an action that can be performed on the ElectronicSignature
  - `url`: string - the URL corresponding to the action
  - `display_name`: string - the i18n label for the buttons in the Docusign banner
- `ball_in_court_names`: array of string

Error responses: 400, 401, 403, 409, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/electronic_signatures/{electronic_signature_id}/withdraw  **[BETA]**

**Withdraw an Electronic Signature**
The endpoint gives the ability to withdraw an Electronic Signature.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer - company_id (either company_id or project_id is required)
- `project_id` [query] integer - project_id (either project_id or company_id is required)
- `electronic_signature_id` [path] integer (required) - ID of the Electronic Signature to withdraw.

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Financial Markups

Resource id: `financial-markups`. Raw spec: `../openapi-raw/financial-markups.json`. Web: https://developers.procore.com/reference/rest/financial-markups?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/financials/markups

**Retrieve a list of Markups**
Retrieves a list of markups associated with the specified holder.  This endpoint supports the Contract and Potential Change Order tools.  Access requires the user to have admin permissions for the relevant tool.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - ID of the Markup's Project
- `holder_type` [query] string enum[Contract, PotentialChangeOrder] (required) - Type of the Markup's Holder
- `holder_id` [query] integer (required) - ID of the Markup's Holder
- `view` [query] string enum[with_erp_data] - When set to `with_erp_data`, includes the `prime_line_item_id` field in the response.

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the markup. e.g. `121`
- `applies_to_all`: boolean - Indicates if the markup applies to all change management items within the holder. e.g. `true`
- `compound`: object - Details of the compound calculations for the markup.
  - `selections`: array of integer - Specifies which existing markups to include in the calculation when 'selective' compounding is chosen. e.g. `[1, 2, 3]`
  - `type`: string - Type of calculation for the markup: - **Basic Calculation (null):** Percentage is multiplied by the line items that meet the application criteria. - **Compounds all Above (above):** Percentage is multiplied by the lin... e.g. `above`
- `holder_id`: integer - Unique identifier for the markup holder. e.g. `29`
- `holder_type`: string enum[Contract, PotentialChangeOrder] - Type of the markup holder. e.g. `Contract`
- `markup_conditions`: array of object - Conditions that determine how the markup will be applied to change management items within the holder.
  - `id`: integer - Unique identifier for the markup condition. e.g. `231`
  - `match_type`: string enum[excludes, includes] - Specifies whether the condition includes or excludes items. e.g. `includes`
  - `wbs_segment_id`: integer - Unique identifier for the WBS Segment associated with the markup condition. Supported segments include Cost Type and Cost Code. e.g. `10`
  - `markup_condition_items`: array of object
    - `id`: integer - Unique identifier for the markup condition item. e.g. `764`
    - `wbs_segment_item_id`: integer - Unique identifier for the WBS Segment Item associated with the markup condition. If the match type is 'includes' and the WBS Segment is Cost Type, the markup will be applied to all change management items with the sel... e.g. `265`
- `markup_set`: string enum[change_orders_horizontal, change_orders_vertical, horizontal, vertical] - Set of the markup. - **Horizontal markup:** Calculates the markup amount on an individual line item. - **Vertical markup:** Calculates the markup amount as a subtotal on all line items on a change order. Contracts use... e.g. `vertical`
- `name`: string - Name of the markup. e.g. `Profit`
- `percentage`: string(decimal) - Percentage value of the markup. The default precision is 50. e.g. `5.25`
- `position`: integer - Position of the markup in the markup set of the holder. The default is the next available position, starting at 1. e.g. `1`
- `prime_line_item_id`: integer - Unique identifier for the Prime Contract Line Item associated with the markup. This ensures synchronization between the estimated value (without vertical markup) and the revenue value (with vertical markup) in the int... e.g. `123`
- `project_id`: integer - Unique identifier for the project associated with the markup. e.g. `15`
- `tax_code_id`: integer - Canonical tax code identifier associated with the markup. This may point to a tax-group code (`is_group: true`) or an individual code. During dual-write migration, writes mirror the first id from `tax_code_ids` when t... e.g. `101`
- `funding_rule_id`: integer - Unique identifier of the funding rule assigned to this markup. Null when no funding rule is assigned. Pass an active project-level funding rule for this project on create or update; pass null to clear. Accepted on Pri... e.g. `42`
- `tax_code_ids`: array of integer - List of unique identifiers for tax codes associated with the markup. Applicable only when advanced calculations are enabled. Still supported during dual-write migration; when both fields are sent, this array is author... e.g. `[101]`
- `wbs_code`: object - WBS Code to which the markup percentage will be applied on a project's budget.
  - `id`: integer - Unique identifier for the WBS Code. e.g. `999`
  - `flat_code`: string - Code of the WBS Code. e.g. `01-011.O`
  - `description`: string - Description of the WBS Code. e.g. `Purpose.Other`
  - `segment_items`: array of object
    - `id`: integer e.g. `77`
    - `code`: string e.g. `01-001`
    - `name`: string e.g. `Purpose`
    - `path_codes`: array of string e.g. `["01 - General Requirements", "01-001 - Purpose"]`
    - `path_ids`: array of integer e.g. `[55, 77]`
    - `segment_type`: string e.g. `cost_code`
    - `segment_id`: integer e.g. `88`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/financials/markups

**Add a new Markup**
Add a new Markup to the holder. This endpoint supports the Contract and Potential Change Order tools.  Access requires the user to have admin permissions for the relevant tool. Markups associated with contracts can be updated at any time. Markups on potential change orders can only be updated when the SOV (Schedule of Values) lines  are in an editable state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - ID of the Markup's Project
- `holder_type` [query] string enum[Contract, PotentialChangeOrder] (required) - Type of the Markup's Holder
- `holder_id` [query] integer (required) - ID of the Markup's Holder

Request body (application/json) (required):

- `markup`: object (required)
  - `applies_to_all`: boolean - Indicates if the markup applies to all change management items within the holder. e.g. `true`
  - `compound`: object - Details of the compound calculations for the markup.
    - `selections`: array of integer - Specifies which existing markups to include in the calculation when 'selective' compounding is chosen. e.g. `[1, 2, 3]`
    - `type`: string - Type of calculation for the markup: - **Basic Calculation (null):** Percentage is multiplied by the line items that meet the application criteria. - **Compounds all Above (above):** Percentage is multiplied by the lin... e.g. `above`
  - `markup_conditions`: array of object - Conditions that determine how the markup will be applied to change management items within the holder.
    - `match_type`: string enum[excludes, includes] - Specifies whether the condition includes or excludes items. e.g. `includes`
    - `wbs_segment_id`: integer - Unique identifier for the WBS Segment associated with the markup condition. Supported segments include Cost Type and Cost Code. e.g. `10`
    - `markup_condition_items`: array of object
      - `wbs_segment_item_id`: integer - Unique identifier for the WBS Segment Item associated with the markup condition. If the match type is 'includes' and the WBS Segment is Cost Type, the markup will be applied to all change management items with the sel... e.g. `265`
  - `markup_set`: string enum[change_orders_horizontal, change_orders_vertical, horizontal, vertical] (required) - Set of the markup. - **Horizontal markup:** Calculates the markup amount on an individual line item. - **Vertical markup:** Calculates the markup amount as a subtotal on all line items on a change order. Contracts use... e.g. `vertical`
  - `name`: string (required) - Name of the markup. e.g. `Profit`
  - `percentage`: string(decimal) (required) - Percentage value of the markup. The default precision is 50. e.g. `5.25`
  - `position`: integer - Position of the markup in the markup set of the holder. The default is the next available position, starting at 1. e.g. `1`
  - `prime_line_item_id`: integer - Unique identifier for the Prime Contract Line Item associated with the markup. This ensures synchronization between the estimated value (without vertical markup) and the revenue value (with vertical markup) in the int... e.g. `123`
  - `tax_code_id`: integer - Canonical tax code identifier associated with the markup. This may point to a tax-group code (`is_group: true`) or an individual code. During dual-write migration, writes mirror the first id from `tax_code_ids` when t... e.g. `101`
  - `funding_rule_id`: integer - Unique identifier of the funding rule assigned to this markup. Null when no funding rule is assigned. Pass an active project-level funding rule for this project on create or update; pass null to clear. Accepted on Pri... e.g. `42`
  - `tax_code_ids`: array of integer - List of unique identifiers for tax codes associated with the markup. Applicable only when advanced calculations are enabled. Still supported during dual-write migration; when both fields are sent, this array is author... e.g. `[101]`
  - `wbs_code_id`: integer - ID of the Wbs Code the Markup percentage will be applied to on a project's budget. Default is ID of the `None` Wbs Code. e.g. `999`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the markup. e.g. `121`
- `applies_to_all`: boolean - Indicates if the markup applies to all change management items within the holder. e.g. `true`
- `compound`: object - Details of the compound calculations for the markup.
  - `selections`: array of integer - Specifies which existing markups to include in the calculation when 'selective' compounding is chosen. e.g. `[1, 2, 3]`
  - `type`: string - Type of calculation for the markup: - **Basic Calculation (null):** Percentage is multiplied by the line items that meet the application criteria. - **Compounds all Above (above):** Percentage is multiplied by the lin... e.g. `above`
- `holder_id`: integer - Unique identifier for the markup holder. e.g. `29`
- `holder_type`: string enum[Contract, PotentialChangeOrder] - Type of the markup holder. e.g. `Contract`
- `markup_conditions`: array of object - Conditions that determine how the markup will be applied to change management items within the holder.
  - `id`: integer - Unique identifier for the markup condition. e.g. `231`
  - `match_type`: string enum[excludes, includes] - Specifies whether the condition includes or excludes items. e.g. `includes`
  - `wbs_segment_id`: integer - Unique identifier for the WBS Segment associated with the markup condition. Supported segments include Cost Type and Cost Code. e.g. `10`
  - `markup_condition_items`: array of object
    - `id`: integer - Unique identifier for the markup condition item. e.g. `764`
    - `wbs_segment_item_id`: integer - Unique identifier for the WBS Segment Item associated with the markup condition. If the match type is 'includes' and the WBS Segment is Cost Type, the markup will be applied to all change management items with the sel... e.g. `265`
- `markup_set`: string enum[change_orders_horizontal, change_orders_vertical, horizontal, vertical] - Set of the markup. - **Horizontal markup:** Calculates the markup amount on an individual line item. - **Vertical markup:** Calculates the markup amount as a subtotal on all line items on a change order. Contracts use... e.g. `vertical`
- `name`: string - Name of the markup. e.g. `Profit`
- `percentage`: string(decimal) - Percentage value of the markup. The default precision is 50. e.g. `5.25`
- `position`: integer - Position of the markup in the markup set of the holder. The default is the next available position, starting at 1. e.g. `1`
- `prime_line_item_id`: integer - Unique identifier for the Prime Contract Line Item associated with the markup. This ensures synchronization between the estimated value (without vertical markup) and the revenue value (with vertical markup) in the int... e.g. `123`
- `project_id`: integer - Unique identifier for the project associated with the markup. e.g. `15`
- `tax_code_id`: integer - Canonical tax code identifier associated with the markup. This may point to a tax-group code (`is_group: true`) or an individual code. During dual-write migration, writes mirror the first id from `tax_code_ids` when t... e.g. `101`
- `funding_rule_id`: integer - Unique identifier of the funding rule assigned to this markup. Null when no funding rule is assigned. Pass an active project-level funding rule for this project on create or update; pass null to clear. Accepted on Pri... e.g. `42`
- `tax_code_ids`: array of integer - List of unique identifiers for tax codes associated with the markup. Applicable only when advanced calculations are enabled. Still supported during dual-write migration; when both fields are sent, this array is author... e.g. `[101]`
- `wbs_code`: object - WBS Code to which the markup percentage will be applied on a project's budget.
  - `id`: integer - Unique identifier for the WBS Code. e.g. `999`
  - `flat_code`: string - Code of the WBS Code. e.g. `01-011.O`
  - `description`: string - Description of the WBS Code. e.g. `Purpose.Other`
  - `segment_items`: array of object
    - `id`: integer e.g. `77`
    - `code`: string e.g. `01-001`
    - `name`: string e.g. `Purpose`
    - `path_codes`: array of string e.g. `["01 - General Requirements", "01-001 - Purpose"]`
    - `path_ids`: array of integer e.g. `[55, 77]`
    - `segment_type`: string e.g. `cost_code`
    - `segment_id`: integer e.g. `88`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/financials/markups/{id}

**Retrieve details for the Markup**
Retrieve details for the Markup for specified holder. This endpoint supports the Contract and Potential Change Order tools.  Access requires the user to have admin permissions for the relevant tool

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - ID of the Markup's Project
- `holder_type` [query] string enum[Contract, PotentialChangeOrder] (required) - Type of the Markup's Holder
- `holder_id` [query] integer (required) - ID of the Markup's Holder
- `id` [path] integer (required) - ID of the Markup

Response 200 (application/json): object

- `id`: integer - Unique identifier for the markup. e.g. `121`
- `applies_to_all`: boolean - Indicates if the markup applies to all change management items within the holder. e.g. `true`
- `compound`: object - Details of the compound calculations for the markup.
  - `selections`: array of integer - Specifies which existing markups to include in the calculation when 'selective' compounding is chosen. e.g. `[1, 2, 3]`
  - `type`: string - Type of calculation for the markup: - **Basic Calculation (null):** Percentage is multiplied by the line items that meet the application criteria. - **Compounds all Above (above):** Percentage is multiplied by the lin... e.g. `above`
- `holder_id`: integer - Unique identifier for the markup holder. e.g. `29`
- `holder_type`: string enum[Contract, PotentialChangeOrder] - Type of the markup holder. e.g. `Contract`
- `markup_conditions`: array of object - Conditions that determine how the markup will be applied to change management items within the holder.
  - `id`: integer - Unique identifier for the markup condition. e.g. `231`
  - `match_type`: string enum[excludes, includes] - Specifies whether the condition includes or excludes items. e.g. `includes`
  - `wbs_segment_id`: integer - Unique identifier for the WBS Segment associated with the markup condition. Supported segments include Cost Type and Cost Code. e.g. `10`
  - `markup_condition_items`: array of object
    - `id`: integer - Unique identifier for the markup condition item. e.g. `764`
    - `wbs_segment_item_id`: integer - Unique identifier for the WBS Segment Item associated with the markup condition. If the match type is 'includes' and the WBS Segment is Cost Type, the markup will be applied to all change management items with the sel... e.g. `265`
- `markup_set`: string enum[change_orders_horizontal, change_orders_vertical, horizontal, vertical] - Set of the markup. - **Horizontal markup:** Calculates the markup amount on an individual line item. - **Vertical markup:** Calculates the markup amount as a subtotal on all line items on a change order. Contracts use... e.g. `vertical`
- `name`: string - Name of the markup. e.g. `Profit`
- `percentage`: string(decimal) - Percentage value of the markup. The default precision is 50. e.g. `5.25`
- `position`: integer - Position of the markup in the markup set of the holder. The default is the next available position, starting at 1. e.g. `1`
- `prime_line_item_id`: integer - Unique identifier for the Prime Contract Line Item associated with the markup. This ensures synchronization between the estimated value (without vertical markup) and the revenue value (with vertical markup) in the int... e.g. `123`
- `project_id`: integer - Unique identifier for the project associated with the markup. e.g. `15`
- `tax_code_id`: integer - Canonical tax code identifier associated with the markup. This may point to a tax-group code (`is_group: true`) or an individual code. During dual-write migration, writes mirror the first id from `tax_code_ids` when t... e.g. `101`
- `funding_rule_id`: integer - Unique identifier of the funding rule assigned to this markup. Null when no funding rule is assigned. Pass an active project-level funding rule for this project on create or update; pass null to clear. Accepted on Pri... e.g. `42`
- `tax_code_ids`: array of integer - List of unique identifiers for tax codes associated with the markup. Applicable only when advanced calculations are enabled. Still supported during dual-write migration; when both fields are sent, this array is author... e.g. `[101]`
- `wbs_code`: object - WBS Code to which the markup percentage will be applied on a project's budget.
  - `id`: integer - Unique identifier for the WBS Code. e.g. `999`
  - `flat_code`: string - Code of the WBS Code. e.g. `01-011.O`
  - `description`: string - Description of the WBS Code. e.g. `Purpose.Other`
  - `segment_items`: array of object
    - `id`: integer e.g. `77`
    - `code`: string e.g. `01-001`
    - `name`: string e.g. `Purpose`
    - `path_codes`: array of string e.g. `["01 - General Requirements", "01-001 - Purpose"]`
    - `path_ids`: array of integer e.g. `[55, 77]`
    - `segment_type`: string e.g. `cost_code`
    - `segment_id`: integer e.g. `88`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/financials/markups/{id}

**Modify an existing Markup**
Modify an existing Markup with new data for specified holder. This endpoint supports the Contract and Potential Change Order tools.  Access requires the user to have admin permissions for the relevant tool. Markups associated with contracts can be updated at any time. Markups on potential change orders can only be updated when the SOV (Schedule of Values) lines  are in an editable state

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - ID of the Markup's Project
- `holder_type` [query] string enum[Contract, PotentialChangeOrder] (required) - Type of the Markup's Holder
- `holder_id` [query] integer (required) - ID of the Markup's Holder
- `id` [path] integer (required) - ID of the Markup

Request body (application/json) (required):

- `markup`: object (required)
  - `applies_to_all`: boolean - Indicates if the markup applies to all change management items within the holder. e.g. `true`
  - `compound`: object - Details of the compound calculations for the markup.
    - `selections`: array of integer - Specifies which existing markups to include in the calculation when 'selective' compounding is chosen. e.g. `[1, 2, 3]`
    - `type`: string - Type of calculation for the markup: - **Basic Calculation (null):** Percentage is multiplied by the line items that meet the application criteria. - **Compounds all Above (above):** Percentage is multiplied by the lin... e.g. `above`
  - `markup_conditions`: array of object - Conditions that determine how the markup will be applied to change management items within the holder.
    - `_destroy`: boolean - Indicates whether the markup condition should be deleted. e.g. `true`
    - `id`: integer - Unique identifier for the markup condition. Provide this value to update an existing condition; if not provided, a new condition will be created. e.g. `231`
    - `match_type`: string enum[excludes, includes] - Specifies whether the condition includes or excludes items. e.g. `includes`
    - `wbs_segment_id`: integer - Unique identifier for the WBS Segment associated with the markup condition. Supported segments include Cost Type and Cost Code. e.g. `10`
    - `markup_condition_items`: array of object
      - `_destroy`: boolean - Indicates whether the markup condition should be deleted. e.g. `true`
      - `id`: integer - Unique identifier for the markup condition item. Provide this value to update an existing condition; if not provided, a new condition will be created. e.g. `764`
      - `wbs_segment_item_id`: integer - Unique identifier for the WBS Segment Item associated with the markup condition. If the match type is 'includes' and the WBS Segment is Cost Type, the markup will be applied to all change management items with the sel... e.g. `265`
  - `markup_set`: string enum[change_orders_horizontal, change_orders_vertical, horizontal, vertical] - Set of the markup. - **Horizontal markup:** Calculates the markup amount on an individual line item. - **Vertical markup:** Calculates the markup amount as a subtotal on all line items on a change order. Contracts use... e.g. `vertical`
  - `name`: string - Name of the markup. e.g. `Profit`
  - `percentage`: string(decimal) - Percentage value of the markup. The default precision is 50. e.g. `5.25`
  - `position`: integer - Position of the markup in the markup set of the holder. The default is the next available position, starting at 1. e.g. `1`
  - `prime_line_item_id`: integer - Unique identifier for the Prime Contract Line Item associated with the markup. This ensures synchronization between the estimated value (without vertical markup) and the revenue value (with vertical markup) in the int... e.g. `123`
  - `tax_code_id`: integer - Canonical tax code identifier associated with the markup. This may point to a tax-group code (`is_group: true`) or an individual code. During dual-write migration, writes mirror the first id from `tax_code_ids` when t... e.g. `101`
  - `funding_rule_id`: integer - Unique identifier of the funding rule assigned to this markup. Null when no funding rule is assigned. Pass an active project-level funding rule for this project on create or update; pass null to clear. Accepted on Pri... e.g. `42`
  - `tax_code_ids`: array of integer - List of unique identifiers for tax codes associated with the markup. Applicable only when advanced calculations are enabled. Still supported during dual-write migration; when both fields are sent, this array is author... e.g. `[101]`
  - `wbs_code_id`: integer - ID of the Wbs Code the Markup percentage will be applied to on a project's budget. Default is ID of the `None` Wbs Code. e.g. `999`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the markup. e.g. `121`
- `applies_to_all`: boolean - Indicates if the markup applies to all change management items within the holder. e.g. `true`
- `compound`: object - Details of the compound calculations for the markup.
  - `selections`: array of integer - Specifies which existing markups to include in the calculation when 'selective' compounding is chosen. e.g. `[1, 2, 3]`
  - `type`: string - Type of calculation for the markup: - **Basic Calculation (null):** Percentage is multiplied by the line items that meet the application criteria. - **Compounds all Above (above):** Percentage is multiplied by the lin... e.g. `above`
- `holder_id`: integer - Unique identifier for the markup holder. e.g. `29`
- `holder_type`: string enum[Contract, PotentialChangeOrder] - Type of the markup holder. e.g. `Contract`
- `markup_conditions`: array of object - Conditions that determine how the markup will be applied to change management items within the holder.
  - `id`: integer - Unique identifier for the markup condition. e.g. `231`
  - `match_type`: string enum[excludes, includes] - Specifies whether the condition includes or excludes items. e.g. `includes`
  - `wbs_segment_id`: integer - Unique identifier for the WBS Segment associated with the markup condition. Supported segments include Cost Type and Cost Code. e.g. `10`
  - `markup_condition_items`: array of object
    - `id`: integer - Unique identifier for the markup condition item. e.g. `764`
    - `wbs_segment_item_id`: integer - Unique identifier for the WBS Segment Item associated with the markup condition. If the match type is 'includes' and the WBS Segment is Cost Type, the markup will be applied to all change management items with the sel... e.g. `265`
- `markup_set`: string enum[change_orders_horizontal, change_orders_vertical, horizontal, vertical] - Set of the markup. - **Horizontal markup:** Calculates the markup amount on an individual line item. - **Vertical markup:** Calculates the markup amount as a subtotal on all line items on a change order. Contracts use... e.g. `vertical`
- `name`: string - Name of the markup. e.g. `Profit`
- `percentage`: string(decimal) - Percentage value of the markup. The default precision is 50. e.g. `5.25`
- `position`: integer - Position of the markup in the markup set of the holder. The default is the next available position, starting at 1. e.g. `1`
- `prime_line_item_id`: integer - Unique identifier for the Prime Contract Line Item associated with the markup. This ensures synchronization between the estimated value (without vertical markup) and the revenue value (with vertical markup) in the int... e.g. `123`
- `project_id`: integer - Unique identifier for the project associated with the markup. e.g. `15`
- `tax_code_id`: integer - Canonical tax code identifier associated with the markup. This may point to a tax-group code (`is_group: true`) or an individual code. During dual-write migration, writes mirror the first id from `tax_code_ids` when t... e.g. `101`
- `funding_rule_id`: integer - Unique identifier of the funding rule assigned to this markup. Null when no funding rule is assigned. Pass an active project-level funding rule for this project on create or update; pass null to clear. Accepted on Pri... e.g. `42`
- `tax_code_ids`: array of integer - List of unique identifiers for tax codes associated with the markup. Applicable only when advanced calculations are enabled. Still supported during dual-write migration; when both fields are sent, this array is author... e.g. `[101]`
- `wbs_code`: object - WBS Code to which the markup percentage will be applied on a project's budget.
  - `id`: integer - Unique identifier for the WBS Code. e.g. `999`
  - `flat_code`: string - Code of the WBS Code. e.g. `01-011.O`
  - `description`: string - Description of the WBS Code. e.g. `Purpose.Other`
  - `segment_items`: array of object
    - `id`: integer e.g. `77`
    - `code`: string e.g. `01-001`
    - `name`: string e.g. `Purpose`
    - `path_codes`: array of string e.g. `["01 - General Requirements", "01-001 - Purpose"]`
    - `path_ids`: array of integer e.g. `[55, 77]`
    - `segment_type`: string e.g. `cost_code`
    - `segment_id`: integer e.g. `88`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/financials/markups/{id}

**Remove an existing Markup**
Remove an existing Markup from the holder. This endpoint supports the Contract and Potential Change Order tools.  Access requires the user to have admin permissions for the relevant tool. Markups associated with contracts can be updated at any time. Markups on potential change orders can only be updated when the SOV (Schedule of Values) lines  are in an editable state.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - ID of the Markup's Project
- `holder_type` [query] string enum[Contract, PotentialChangeOrder] (required) - Type of the Markup's Holder
- `holder_id` [query] integer (required) - ID of the Markup's Holder
- `id` [path] integer (required) - ID of the Markup

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Invoice Configuration

Resource id: `invoice-configuration`. Raw spec: `../openapi-raw/invoice-configuration.json`. Web: https://developers.procore.com/reference/rest/invoice-configuration?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/projects/{project_id}/contracts/{contract_id}/invoice_configuration

**Get Contract's Invoice Configuration**
Get the details of a specific Contract's Invoice Configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - ID of the Contract

Response 200 (application/json): object

- `id`: integer - ID of the Invoice Configuration e.g. `12`
- `separate_billing_for_stored_materials`: boolean - Whether billing for materials separately from the work complete is allowed e.g. `true`
- `stored_materials_billing_method`: string - Billing method for stored materials e.g. `move_new_materials`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `contract_id`: integer - Contract ID e.g. `1366`
- `project_id`: integer - Project ID e.g. `180`
- `company_id`: integer - Company ID e.g. `90`
- `ssr_enabled`: boolean - Sliding Scale Retainage Enabled e.g. `true`
- `move_materials_to_previous_work_completed`: boolean - True if the Project Invoice Configuration is set to move materials to previous work completed e.g. `true`
- `commitment_has_invoices`: boolean - True if there are any invoices associated with this commitment e.g. `true`
- `retainage_rule_set`: object - A set of rules to control how retainage is applied to invoices of a contract
  - `id`: integer(int64) - Unique integer ID e.g. `12345`
  - `contract_id`: integer(int64) - Integer ID for the associated Contract e.g. `22222`
  - `name`: string - The Name of the Retainage Rule Set e.g. `Rule Set 1`
  - `retainage_rules`: array of object
    - `id`: integer(int64) - Unique integer ID e.g. `12345`
    - `max_retainage`: string - The maximum amount of retainage held before this rule no longer applies e.g. `1000.0`
    - `position`: integer(int64) - The ordinal of this Rule within the containing Rule Set e.g. `1`
    - `retainage_percentage`: string - The percentage of retaiange to withold on work completed while this Rule is active e.g. `10.0`
    - `rule_type`: string enum[%_original_contract_value, %_revised_contract_value, amount] - The property type used to calculate the max retainage for this Rule e.g. `%_original_contract_value`
    - `rule_type_upper_limit`: string - The amount used in conjunction with the Rule Type to detertmine the max retainage for this Rule e.g. `5.0`

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/contracts/{contract_id}/invoice_configuration

**Update Contract's Invoice Configuration**
Update a specific Contract's Invoice Configuration

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `contract_id` [path] integer (required) - ID of the Contract

Request body (application/json) (required):

- `invoice_configuration`: object (required) - Invoice Configuration for the Contract
  - `separate_billing_for_stored_materials`: boolean - Whether billing for materials separately from the work complete is allowed. Cannot be enabled when contract_invoicing_method is simplified; attempting to set it to true in that case returns a 422 error. e.g. `true`
  - `stored_materials_billing_method`: string enum[move_new_materials] - Billing method for stored materials e.g. `move_new_materials`
  - `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract. Only accepted for commitments when simplified invoicing is enabled for the project or company; otherwise the value is ignored. Locked once any invoice exists on the commitment; a... e.g. `progressive`

Response 200 (application/json): object

- `id`: integer - ID of the Invoice Configuration e.g. `12`
- `separate_billing_for_stored_materials`: boolean - Whether billing for materials separately from the work complete is allowed e.g. `true`
- `stored_materials_billing_method`: string - Billing method for stored materials e.g. `move_new_materials`
- `contract_invoicing_method`: string enum[progressive, simplified] - The invoicing method for the contract, either progressive or simplified e.g. `progressive`
- `contract_id`: integer - Contract ID e.g. `1366`
- `project_id`: integer - Project ID e.g. `180`
- `company_id`: integer - Company ID e.g. `90`
- `ssr_enabled`: boolean - Sliding Scale Retainage Enabled e.g. `true`
- `move_materials_to_previous_work_completed`: boolean - True if the Project Invoice Configuration is set to move materials to previous work completed e.g. `true`
- `commitment_has_invoices`: boolean - True if there are any invoices associated with this commitment e.g. `true`
- `retainage_rule_set`: object - A set of rules to control how retainage is applied to invoices of a contract
  - `id`: integer(int64) - Unique integer ID e.g. `12345`
  - `contract_id`: integer(int64) - Integer ID for the associated Contract e.g. `22222`
  - `name`: string - The Name of the Retainage Rule Set e.g. `Rule Set 1`
  - `retainage_rules`: array of object
    - `id`: integer(int64) - Unique integer ID e.g. `12345`
    - `max_retainage`: string - The maximum amount of retainage held before this rule no longer applies e.g. `1000.0`
    - `position`: integer(int64) - The ordinal of this Rule within the containing Rule Set e.g. `1`
    - `retainage_percentage`: string - The percentage of retaiange to withold on work completed while this Rule is active e.g. `10.0`
    - `rule_type`: string enum[%_original_contract_value, %_revised_contract_value, amount] - The property type used to calculate the max retainage for this Rule e.g. `%_original_contract_value`
    - `rule_type_upper_limit`: string - The amount used in conjunction with the Rule Type to detertmine the max retainage for this Rule e.g. `5.0`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

