# Procore API: Work Breakdown Structure (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Work Breakdown Structure)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Attribute Items](#attribute-items) - versions 2.0
- [Attributes](#attributes) - versions 2.0
- [Codes](#codes) - versions 2.0, 1.0
- [Cost Codes](#cost-codes) - versions 1.0
- [Line Item Type Categories](#line-item-type-categories) - versions 2.0
- [Patterns](#patterns) - versions 1.0
- [Segment Item Lists](#segment-item-lists) - versions 1.0
- [Segment Items](#segment-items) - versions 1.0
- [Segments](#segments) - versions 1.0
- [Sub Jobs](#sub-jobs) - versions 1.0

## Attribute Items

Resource id: `attribute-items`. Raw spec: `../openapi-raw/attribute-items.json`. Web: https://developers.procore.com/reference/rest/attribute-items?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items

**List Wbs Attribute Items**
List Wbs Attributes items for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `filters[id]` [query] array of string - Return item(s) with the specified IDs.
- `filters[attribute_id]` [query] array of string - Return item(s) with the specified Attribute IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name] - Field to sort by. If the field is passed with a - (Example: -name) it is sorted in reverse order. For multiple sort fields, separate them with a comma (Example: name,-position)

Response 200 (application/json): object

- `data`: array of object - Array of Wbs Attribute Items
  - `attribute_id`: string - String ID of the parent WBS Attribute this item belongs to. Use to group items by attribute or to filter the list endpoint with filters[attribute_id]. Retrieve valid attribute IDs from GET /rest/v2.0/companies/{compan...
  - `id`: string - Unique string identifier for this WBS Attribute Item. Use as the {wbs_attribute_item_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_item_id}.
  - `name`: string - Display name of this attribute item. Must be unique within its parent attribute (e.g. "Labor", "Materials"). Shown in WBS code pickers and budget views.

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items

**Create Wbs Attribute Item**
Create Wbs Attribute Item for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `attribute_id`: string (required) - ID of the WBS Attribute to associate this item with. Retrieve valid attribute IDs from GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes.
- `name`: string (required) - Display name for this attribute item. Must be unique within the parent attribute (e.g. "Labor", "Materials"). Maximum 255 characters.

Response 201 (application/json): object

- `data`: object - A work breakdown structure attribute item.
  - `attribute_id`: string - String ID of the parent WBS Attribute this item belongs to. Use to group items by attribute or to filter the list endpoint with filters[attribute_id]. Retrieve valid attribute IDs from GET /rest/v2.0/companies/{compan...
  - `id`: string - Unique string identifier for this WBS Attribute Item. Use as the {wbs_attribute_item_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_item_id}.
  - `name`: string - Display name of this attribute item. Must be unique within its parent attribute (e.g. "Labor", "Materials"). Shown in WBS code pickers and budget views.

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/bulk

**Create Wbs Attribute Items in bulk**
Create Wbs Attribute Items in bulk for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `attribute_items`: array of object
  - `attribute_id`: string (required) - ID of the WBS Attribute to associate this item with. Retrieve valid attribute IDs from GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes.
  - `name`: string (required) - Display name for this attribute item. Must be unique within the parent attribute (e.g. "Labor", "Materials"). Maximum 255 characters.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_item_id}

**Update Wbs Attribute Item**
Update Wbs Attribute Item for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `wbs_attribute_item_id` [path] string (required) - Unique string ID of the WBS Attribute Item to operate on. Use as the {wbs_attribute_item_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_it...

Request body (application/json) (required):

- `name`: string (required) - Attribute Item name. Unique within the Attribute.

Response 200 (application/json): object

- `data`: object - A work breakdown structure attribute item.
  - `attribute_id`: string - String ID of the parent WBS Attribute this item belongs to. Use to group items by attribute or to filter the list endpoint with filters[attribute_id]. Retrieve valid attribute IDs from GET /rest/v2.0/companies/{compan...
  - `id`: string - Unique string identifier for this WBS Attribute Item. Use as the {wbs_attribute_item_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_item_id}.
  - `name`: string - Display name of this attribute item. Must be unique within its parent attribute (e.g. "Labor", "Materials"). Shown in WBS code pickers and budget views.

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_item_id}

**Delete Wbs Attribute Item**
Delete Wbs Attribute Item for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `wbs_attribute_item_id` [path] string (required) - Unique string ID of the WBS Attribute Item to operate on. Use as the {wbs_attribute_item_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_it...

Response 200 (application/json): object

- `data`: object - A work breakdown structure attribute item.
  - `attribute_id`: string - String ID of the parent WBS Attribute this item belongs to. Use to group items by attribute or to filter the list endpoint with filters[attribute_id]. Retrieve valid attribute IDs from GET /rest/v2.0/companies/{compan...
  - `id`: string - Unique string identifier for this WBS Attribute Item. Use as the {wbs_attribute_item_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attribute_items/{wbs_attribute_item_id}.
  - `name`: string - Display name of this attribute item. Must be unique within its parent attribute (e.g. "Labor", "Materials"). Shown in WBS code pickers and budget views.

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Attributes

Resource id: `attributes`. Raw spec: `../openapi-raw/attributes.json`. Web: https://developers.procore.com/reference/rest/attributes?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes

**List Wbs Attributes**
List Wbs Attributes for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `filters[id]` [query] array of string - Return item(s) with the specified IDs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name, position] - Field to sort by. If the field is passed with a - (Example: -name) it is sorted in reverse order. For multiple sort fields, separate them with a comma (Example: name,-position)

Response 200 (application/json): object

- `data`: array of object - Array of Wbs Attributes
  - `id`: string - Unique string identifier for this WBS Attribute. Use as the {wbs_attribute_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}, and to associate...
  - `name`: string - Display name of this attribute. Must be unique within the project (e.g. "Cost Type", "Phase"). Maximum 50 characters.
  - `position`: integer(int32) - 1-based display position of this attribute column in WBS code views. Must be unique within the project and between 1 and 3 (a project can have at most 3 attributes). Lower values appear first (leftmost) in the budget ...
  - `segment_id`: string - ID of the WBS Segment that backs this attribute in the code read model. Read-only internal identifier used to correlate attribute data with segment-level queries. Cannot be filtered on directly through the API.

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes

**Create Wbs Attributes**
Create Wbs Attributes for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `name`: string (required) - Attribute name. Unique within the project.
- `position`: integer(int32) (required) - Position of the Attribute in the Company. Unique within the Project.

Response 201 (application/json): object

- `data`: object - A work breakdown structure attribute.
  - `id`: string - Unique string identifier for this WBS Attribute. Use as the {wbs_attribute_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}, and to associate...
  - `name`: string - Display name of this attribute. Must be unique within the project (e.g. "Cost Type", "Phase"). Maximum 50 characters.
  - `position`: integer(int32) - 1-based display position of this attribute column in WBS code views. Must be unique within the project and between 1 and 3 (a project can have at most 3 attributes). Lower values appear first (leftmost) in the budget ...
  - `segment_id`: string - ID of the WBS Segment that backs this attribute in the code read model. Read-only internal identifier used to correlate attribute data with segment-level queries. Cannot be filtered on directly through the API.

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}

**Update Wbs Attributes**
Update Wbs Attributes for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `wbs_attribute_id` [path] string (required) - Unique string ID of the WBS Attribute to operate on. Use as the {wbs_attribute_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}. Retrieve val...

Request body (application/json) (required):

- `name`: string (required) - Attribute name. Unique within the project.

Response 200 (application/json): object

- `data`: object - A work breakdown structure attribute.
  - `id`: string - Unique string identifier for this WBS Attribute. Use as the {wbs_attribute_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}, and to associate...
  - `name`: string - Display name of this attribute. Must be unique within the project (e.g. "Cost Type", "Phase"). Maximum 50 characters.
  - `position`: integer(int32) - 1-based display position of this attribute column in WBS code views. Must be unique within the project and between 1 and 3 (a project can have at most 3 attributes). Lower values appear first (leftmost) in the budget ...
  - `segment_id`: string - ID of the WBS Segment that backs this attribute in the code read model. Read-only internal identifier used to correlate attribute data with segment-level queries. Cannot be filtered on directly through the API.

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}

**Delete Wbs Attributes**
Delete Wbs Attributes for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `wbs_attribute_id` [path] string (required) - Unique string ID of the WBS Attribute to operate on. Use as the {wbs_attribute_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}. Retrieve val...

Response 200 (application/json): object

- `data`: object - A work breakdown structure attribute.
  - `id`: string - Unique string identifier for this WBS Attribute. Use as the {wbs_attribute_id} path parameter in PATCH/DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/attributes/{wbs_attribute_id}, and to associate...
  - `name`: string - Display name of this attribute. Must be unique within the project (e.g. "Cost Type", "Phase"). Maximum 50 characters.
  - `position`: integer(int32) - 1-based display position of this attribute column in WBS code views. Must be unique within the project and between 1 and 3 (a project can have at most 3 attributes). Lower values appear first (leftmost) in the budget ...
  - `segment_id`: string - ID of the WBS Segment that backs this attribute in the code read model. Read-only internal identifier used to correlate attribute data with segment-level queries. Cannot be filtered on directly through the API.

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Codes

Resource id: `codes`. Raw spec: `../openapi-raw/codes.json`. Web: https://developers.procore.com/reference/rest/codes?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/codes

**List Wbs Codes**
List Wbs Code for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] array of string - Return item(s) with the specified IDs.
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `filters[scope]` [query] string enum[budget_code, production_quantity_code] - Restricts results to a specific code scope. 'budget_code' returns codes used for budget line items; 'production_quantity_code' returns codes used for production quantity tracking.
- `group` [query] string - Return groups with the specified filter ID. Supported values: `status`, `segment_id-tier_depth`. For example: `group=500-1` will return objects with all values of tier 2 of the segment with id 500.

Response 200 (application/json): object

- `data`: array of object - Array of Wbs Codes ordered
  - `attribute_1_name`: string - Display name of the attribute item assigned to the first WBS Attribute slot for this code. Null when no attribute item has been assigned to attribute position 1.
  - `attribute_2_name`: string - Display name of the attribute item assigned to the second WBS Attribute slot for this code. Null when no attribute item has been assigned to attribute position 2.
  - `attribute_3_name`: string - Display name of the attribute item assigned to the third WBS Attribute slot for this code. Null when no attribute item has been assigned to attribute position 3.
  - `code`: string - Formatted WBS code string — a concatenation of the segment items' codes in pattern order, delimited by '.'. Use to display or search for a specific budget code (e.g. "09.L", "15.O.P2").
  - `description`: string - Human-readable description of this WBS code. Defaults to a concatenation of the segment items' names in pattern order, delimited by '.'. Null when not explicitly set.
  - `id`: string - Unique string identifier for this WBS Code. Use to filter the list endpoint with filters[id][]=value, or as input to the /codes/attribute_items assign/unassign endpoints.
  - `status`: string enum[active, inactive] - Availability status of this WBS code. 'active' means the code is visible and available for selection in budget pickers; 'inactive' means the code is hidden and cannot be assigned to new line items. Filter by status us...

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/codes/attribute_items

**Assign the Attribute Items to the Wbs Codes**
Assign the Attribute Items to the Wbs Codes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `filters[id][]` [query] array of string - Assign item(s) to the specified WBS Code IDs. Example usage: ?filters[id][]=2670495558&filters[id][]=973021455

Request body (application/json) (required):

- `attribute_item_ids`: array of string (required) - IDs of the Attribute Items to be assigned. Max size 3.
- `filters`: object - Filters to select target WBS Codes.
  - `id`: array of string - WBS Code IDs to apply the assignment to.

Response 204: Assigned. No content. (no body)

Error responses: 400, 401, 403, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/codes/attribute_items

**Unassign the Attribute Items from the Wbs Codes**
Unassign the Attribute Items from the Wbs Codes

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `filters[attribute_id][]` [query] array of string - Delete item(s) with the specified Wbs Attribute IDs. Example usage: ?filters[attribute_id][]=2670495558&filters[id][]=973021455
- `filters[attribute_item_id][]` [query] array of string - Delete item(s) with the specified Wbs Attribute Item IDs. Example usage: ?filters[attribute_item_id][]=2670495558&filters[id][]=973021455
- `filters[id][]` [query] array of string - Delete item(s) with the specified Wbs Code IDs. Example usage: ?filters[id][]=2670495558&filters[id][]=973021455

Response 204: Deleted. No content. (no body)

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/codes/filter_options

**List Wbs Codes Filter Options**
List Wbs Code Filter Options for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[id]` [query] string - Id is an attribute from filter response. Pattern is `{segment_id}-{tier-depth}. Returns item(s) with matching segment id and tier depth.
- `filters[search]` [query] string - Returns item(s) with code or name matching the specified search query string.

Response 200 (application/json): object

- `data`: array of object - Array of Wbs Codes Filter options ordered by natural sort on a label
  - `id`: array of string - Array of WBS Segment Item string IDs that match this filter option. Multiple IDs may share the same name when segment items at different positions have identical codes. Pass individual IDs to filters[id][]=value in th...
  - `label`: string - Concatenation of the segment item's sortable code and name as {code} - {name} (e.g. 'L - Labor', '300 - Site Work'), shown in filter dropdowns.

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/codes/filters

**List Wbs Codes Filters**
List Wbs Code Filters for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): object

- `data`: array of object - Array of Wbs Codes Filters
  - `id`: string - Composite identifier for this filter in the pattern '{segment_id}-{tier_depth}' (e.g. '500-1' for tier 2 of segment 500). Use as the value of the filters[id] query parameter in GET .../codes/filter_options to retrieve...
  - `label`: string - Translated human-readable label for this filter, describing the segment and tier level (e.g. "Cost Code Tier 1", "Cost Type Tier 1"). Display to users in filter selection dropdowns.

Error responses: 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/wbs/codes/ids

**List Wbs Code IDs**
List Wbs Code IDs for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Request body (application/json):

- `id`: array of string - Array of WBS Code string IDs to include. Returns only codes whose id matches one of the provided values.
- `scope`: string enum[budget_code, production_quantity_code] - Scope of WBS codes to return. 'budget_code' returns codes used for budget line items; 'production_quantity_code' returns codes used for production quantity tracking.
- `search`: string - Free-text search term. Matches against the WBS code string, description, and the names of assigned attribute items.
- `segment_item`: array of object - Array of segment item filters. Each object restricts results to codes that include a segment item at the given segment and tier. Multiple objects within the array are combined with AND logic.
  - `id`: array of string (required) - Array of Segment Item string IDs to match within the specified segment and tier. Null entries are permitted to match codes with no item at that tier.
  - `segment_id`: string (required) - String ID of the WBS Segment to filter within. Retrieve valid segment IDs from GET .../work_breakdown_structure/segments.
  - `tier_depth`: integer (required) - 0-based tier depth within the segment hierarchy to target (0 = top level, 1 = second level, etc.). Use with tiered segments to filter on a specific level.
- `status`: string enum[active, inactive] - Lifecycle status of WBS codes to return. 'active' returns codes available for selection; 'inactive' returns hidden codes.

Response 200 (application/json): object

- `data`: array of string - Array of Wbs Codes Ids

Error responses: 400, 401, 403, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes

**List Project WBS codes**
All Work Breakdown Structure codes for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `can_select_divisions` [query] boolean - If true, will include WBS Codes with division segment items. Default is true.
- `required_segments` [query] array of string enum[cost_code, line_item_type] - Filters results to include only WBS codes that have at least one segment item for each of the specified segment types. Valid values: 'cost_code', 'line_item_type'. Pass multiple values to require more than one segment...
- `filters[status][]` [query] array of string - Filter results to only return codes with the included statuses. Options are 'active' or 'inactive'. Defaults to returning all results.
- `filters[updated_at]` [query] string - Filter results to only return codes that were updated within the range of the two specified ISO 8601 timestamps separated by the ... delimiter.
- `scope` [query] string enum[budget_code, production_quantity_code] - Filter results to only return codes that match the specified WBS scope.
- `query` [query] string - Searches the WBS code and description values and returns results sorted in descending order of relevance to the search query.
- `group_type` [query] string enum[contract] - Along with 'group_id', groups WBS codes by the specified group type and group ID. Only supported option is 'contract'.
- `group_id` [query] integer - Along with 'group_type', groups WBS codes by the specified group type and group ID. Only supported option is a contract ID.
- `hide_not_in_group` [query] boolean - If true, will hide WBS codes that are not in the specified 'group_type' and 'group_id'. Default is true. If false, WBS codes in the specified group will be returned first followed by WBS codes not in the group.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique identifier of the Work Breakdown Structure code. Use as the {id} path parameter in PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes/{id}. e.g. `1`
- `flat_code`: string - The Work Breakdown Structure code made up of segment values, concatenated by the set delimiter. Use this value to display or identify a WBS code. e.g. `01.100.Concrete.Slabs`
- `flat_name`: string - The names of the Work Breakdown Structure segments concatenated using the company's delimiter and WBS pattern. e.g. `SubJob.CostCode.CostType`
- `description`: string - Description of the WBS code. Falls back to flat_name when no custom description has been set. e.g. `WBS Description`
- `status`: string enum[active, inactive] - Lifecycle status of the WBS code. One of: 'active' (available for use in budgets and line items), 'inactive' (not available for selection). Filter collections with filters[status][]=active or filters[status][]=inactive. e.g. `active`
- `created_at`: string(date-time) - Timestamp when this WBS code was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this WBS code was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `segment_items`: array of object - The segment items that make up this WBS code, one per segment in the WBS pattern. Each item represents a cost code, line item type, sub-job, or custom segment item.
  - `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
  - `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
  - `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
  - `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
  - `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
  - `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
  - `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
  - `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
  - `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
    - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
    - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
    - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
    - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
    - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
    - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
    - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
    - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
    - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
    - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
    - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
    - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
    - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
  - `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`
- `wbs_pattern_id`: integer - ID of the WBS pattern that defines the segment structure for this code. All WBS codes under the same project share the same wbs_pattern_id. e.g. `42`
- `attribute_items`: array of object - Custom attribute items assigned to this WBS code. Only present when the project has WBS attributes configured. Empty array when no attributes are assigned.
  - `attribute_id`: string - ID of the WBS attribute definition. e.g. `7`
  - `id`: string - ID of the WBS attribute item. e.g. `12`
  - `name`: string - Display name of the assigned attribute item (a value within an attribute, e.g. 'Labor'). e.g. `Labor`
- `is_in_group`: boolean - Whether this WBS code belongs to the group specified by the group_type and group_id query parameters. Only present when the group_type query parameter is provided; group_id is optional. e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes

**Create a WBS Code**
Create a new WBS code using the specified segments. If the combination of segments matches an existing WBS Code, the existing code will be updated with the description provided.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `description`: string - Description of the wbs code.
- `segment_items`: array of object (required) e.g. `[{"segment_id": 1, "segment_item_id": 2}, {"segment_id": 2, "segment_item_id"...`
  - `segment_id`: integer (required) - Id of the Segment defined at the company level.
  - `segment_item_id`: integer (required) - Id of the Segment Item.
- `default_uom_id`: integer - ID of the Unit of Measure to set as the default for this WBS code. Pass null to remove the existing default. Part of the Units of Measure Validation beta. e.g. `5`

Response 201 (application/json): object

- `id`: integer - Unique identifier of the Work Breakdown Structure code. Use as the {id} path parameter in PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes/{id}. e.g. `1`
- `flat_code`: string - The Work Breakdown Structure code made up of segment values, concatenated by the set delimiter. Use this value to display or identify a WBS code. e.g. `01.100.Concrete.Slabs`
- `flat_name`: string - The names of the Work Breakdown Structure segments concatenated using the company's delimiter and WBS pattern. e.g. `SubJob.CostCode.CostType`
- `description`: string - Description of the WBS code. Falls back to flat_name when no custom description has been set. e.g. `WBS Description`
- `status`: string enum[active, inactive] - Lifecycle status of the WBS code. One of: 'active' (available for use in budgets and line items), 'inactive' (not available for selection). Filter collections with filters[status][]=active or filters[status][]=inactive. e.g. `active`
- `created_at`: string(date-time) - Timestamp when this WBS code was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this WBS code was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `segment_items`: array of object - The segment items that make up this WBS code, one per segment in the WBS pattern. Each item represents a cost code, line item type, sub-job, or custom segment item.
  - `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
  - `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
  - `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
  - `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
  - `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
  - `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
  - `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
  - `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
  - `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
    - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
    - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
    - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
    - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
    - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
    - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
    - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
    - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
    - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
    - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
    - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
    - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
    - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
  - `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`
- `wbs_pattern_id`: integer - ID of the WBS pattern that defines the segment structure for this code. All WBS codes under the same project share the same wbs_pattern_id. e.g. `42`
- `attribute_items`: array of object - Custom attribute items assigned to this WBS code. Only present when the project has WBS attributes configured. Empty array when no attributes are assigned.
  - `attribute_id`: string - ID of the WBS attribute definition. e.g. `7`
  - `id`: string - ID of the WBS attribute item. e.g. `12`
  - `name`: string - Display name of the assigned attribute item (a value within an attribute, e.g. 'Labor'). e.g. `Labor`
- `is_in_group`: boolean - Whether this WBS code belongs to the group specified by the group_type and group_id query parameters. Only present when the group_type query parameter is provided; group_id is optional. e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes/bulk_create

**Bulk Create WBS codes**
Bulk Create WBS codes using the specified segments. If the combination of segments matches an existing WBS Code, the existing code will be updated with the description provided.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `bulk`: array of object (required)
  - `description`: string - Description of the wbs code.
  - `segment_items`: array of object
    - `segment_id`: integer (required) - Id of the Segment defined at the company level. e.g. `1`
    - `segment_item_id`: integer (required) - Segment Item ID. If present, a Segment Item will not be implicitly created. e.g. `1`
  - `default_uom_id`: integer - ID of the Unit of Measure to set as the default for this WBS code. Pass null to remove the existing default. Part of the Units of Measure Validation beta. e.g. `5`

Response 201 (application/json): object

- `entities`: array of object
  - `id`: integer - Unique identifier of the Work Breakdown Structure code. Use as the {id} path parameter in PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes/{id}. e.g. `1`
  - `flat_code`: string - The Work Breakdown Structure code made up of segment values, concatenated by the set delimiter. Use this value to display or identify a WBS code. e.g. `01.100.Concrete.Slabs`
  - `flat_name`: string - The names of the Work Breakdown Structure segments concatenated using the company's delimiter and WBS pattern. e.g. `SubJob.CostCode.CostType`
  - `description`: string - Description of the WBS code. Falls back to flat_name when no custom description has been set. e.g. `WBS Description`
  - `status`: string enum[active, inactive] - Lifecycle status of the WBS code. One of: 'active' (available for use in budgets and line items), 'inactive' (not available for selection). Filter collections with filters[status][]=active or filters[status][]=inactive. e.g. `active`
  - `created_at`: string(date-time) - Timestamp when this WBS code was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this WBS code was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `segment_items`: array of object - The segment items that make up this WBS code, one per segment in the WBS pattern. Each item represents a cost code, line item type, sub-job, or custom segment item.
    - `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
    - `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
    - `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
    - `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
    - `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
    - `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
    - `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
    - `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
    - `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
    - `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
    - `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
    - `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
    - `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
    - `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`
  - `wbs_pattern_id`: integer - ID of the WBS pattern that defines the segment structure for this code. All WBS codes under the same project share the same wbs_pattern_id. e.g. `42`
  - `attribute_items`: array of object - Custom attribute items assigned to this WBS code. Only present when the project has WBS attributes configured. Empty array when no attributes are assigned.
    - `attribute_id`: string - ID of the WBS attribute definition. e.g. `7`
    - `id`: string - ID of the WBS attribute item. e.g. `12`
    - `name`: string - Display name of the assigned attribute item (a value within an attribute, e.g. 'Labor'). e.g. `Labor`
  - `is_in_group`: boolean - Whether this WBS code belongs to the group specified by the group_type and group_id query parameters. Only present when the group_type query parameter is provided; group_id is optional. e.g. `true`
- `errors`: array of object

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes/update_all

**Bulk update WBS codes**
Bulk update WBS Codes with the same status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `ids`: array of integer (required) - WBS Code IDs e.g. `[123, 456, 789]`
- `attributes`: object (required)
  - `status`: string enum[active, inactive] - New status of the WBS Codes e.g. `inactive`
  - `default_uom_id`: integer - ID of the Unit of Measure to set as the default for all selected WBS codes. Pass null to remove the existing default. Part of the Units of Measure Validation beta. e.g. `5`

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes/{id}

**Update a WBS code**
Update a WBS Code with new custom description or status.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - WBS Code ID

Request body (application/json) (required):

- `description`: string - New custom description of the WBS Code e.g. `Project A - Building B - Room C`
- `status`: string enum[active, inactive] - New status of the WBS Code e.g. `inactive`
- `default_uom_id`: integer - ID of the Unit of Measure to set as the default for this WBS code. Pass null to remove the existing default. Part of the Units of Measure Validation beta. e.g. `5`

Response 200 (application/json): object

- `id`: integer - Unique identifier of the Work Breakdown Structure code. Use as the {id} path parameter in PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/wbs_codes/{id}. e.g. `1`
- `flat_code`: string - The Work Breakdown Structure code made up of segment values, concatenated by the set delimiter. Use this value to display or identify a WBS code. e.g. `01.100.Concrete.Slabs`
- `flat_name`: string - The names of the Work Breakdown Structure segments concatenated using the company's delimiter and WBS pattern. e.g. `SubJob.CostCode.CostType`
- `description`: string - Description of the WBS code. Falls back to flat_name when no custom description has been set. e.g. `WBS Description`
- `status`: string enum[active, inactive] - Lifecycle status of the WBS code. One of: 'active' (available for use in budgets and line items), 'inactive' (not available for selection). Filter collections with filters[status][]=active or filters[status][]=inactive. e.g. `active`
- `created_at`: string(date-time) - Timestamp when this WBS code was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this WBS code was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `segment_items`: array of object - The segment items that make up this WBS code, one per segment in the WBS pattern. Each item represents a cost code, line item type, sub-job, or custom segment item.
  - `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
  - `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
  - `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
  - `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
  - `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
  - `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
  - `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
  - `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
  - `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
  - `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
    - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
    - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
    - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
    - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
    - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
    - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
    - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
    - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
    - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
    - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
    - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
    - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
    - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
  - `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`
- `wbs_pattern_id`: integer - ID of the WBS pattern that defines the segment structure for this code. All WBS codes under the same project share the same wbs_pattern_id. e.g. `42`
- `attribute_items`: array of object - Custom attribute items assigned to this WBS code. Only present when the project has WBS attributes configured. Empty array when no attributes are assigned.
  - `attribute_id`: string - ID of the WBS attribute definition. e.g. `7`
  - `id`: string - ID of the WBS attribute item. e.g. `12`
  - `name`: string - Display name of the assigned attribute item (a value within an attribute, e.g. 'Labor'). e.g. `Labor`
- `is_in_group`: boolean - Whether this WBS code belongs to the group specified by the group_type and group_id query parameters. Only present when the group_type query parameter is provided; group_id is optional. e.g. `true`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Cost Codes

Resource id: `cost-codes`. Raw spec: `../openapi-raw/cost-codes.json`. Web: https://developers.procore.com/reference/rest/cost-codes?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/cost_codes

**List Cost Codes**
Returns a list of Cost Codes.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `sub_job_id` [query] integer - Unique identifier for the Sub Job
- `filters[id]` [query] array of integer - Filter results to only the cost codes with the specified IDs. Pass multiple values as an array. Example: filters[id]=[1,2].
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `view` [query] string enum[default, erp_compact] - Specifies which view (which attributes) of the resource is going to be present in the response.

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/cost_codes

**Create Cost Code**
Create a new Cost Code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `sub_job_id`: integer - ID of the sub job to scope this operation to. When provided, the cost code is created or updated under this sub job rather than the project directly. e.g. `12345`
- `cost_code`: object (required) - Cost Code object
  - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
  - `code`: string (required) - Cost code segment, not including the parent prefix. For example, for full code "02-300", the value of this field should be "300". e.g. `300`
  - `name`: string (required) - Display name of the cost code. e.g. `Site Work`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. e.g. `OD-239238`
  - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `3497237`
  - `parent_id`: integer - ID of the parent cost code in the hierarchy. Creates a root-level cost code when omitted. e.g. `12345`
  - `parent_origin_id`: string - ERP origin ID of the parent cost code. Alternative to parent_id for looking up the parent by its ERP identifier rather than its Procore ID. e.g. `ERP-CC-001`
  - `standard_cost_code_id`: integer - ID of the company-level standard cost code to associate with this cost code. e.g. `122334`

Response 201 (application/json): object

- `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
- `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
- `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
- `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
- `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
- `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
- `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
- `name`: string - Display name of the cost code. e.g. `Earthwork`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
- `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
- `parent`: object - The immediate parent cost code of this record, if any.
  - `id`: integer - Procore ID of this cost code's parent cost code. Null for root-level cost codes. e.g. `2345`
- `position`: integer - Sort order of this cost code within its parent. e.g. `1`
- `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
- `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
- `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
- `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
  - `id`: integer - Unique identifier for the Line Item Type. e.g. `12345`
  - `name`: string - Display name of the Line Item Type. e.g. `Equipment`
  - `code`: string - Short code used for CSV import of this Line Item Type. e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, labor, other] - Canonical cost category for this line item type. One of: 'equipment', 'materials', 'commitment', 'owner_cost', 'professional_services', 'labor', 'other'. e.g. `materials`
  - `origin_id`: string - ERP system identifier for this line item type. Null when not linked to an ERP system. e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/cost_codes/copy_from_standard_list

**Copy from Standard Cost Code List**
Copy Cost Codes from Standard Cost Code List.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `1351`
- `sub_job_id`: integer - ID of the sub job to copy cost codes into. When provided, codes are copied to the sub job rather than the project directly. e.g. `456`
- `standard_cost_code_list_id`: integer (required) - ID of the standard cost code list to copy all cost codes from into this project. e.g. `242`

Response 201 (application/json): array of oneOf(object | object)


Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/cost_codes/{id}

**Show Cost Code**
Returns details on a specific Cost Code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Cost Code
- `project_id` [query] integer (required) - Unique identifier for the project.
- `sub_job_id` [query] integer - Unique identifier for the Sub Job

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
- `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
- `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
- `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
- `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
- `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
- `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
- `name`: string - Display name of the cost code. e.g. `Earthwork`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
- `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
- `parent`: object - The immediate parent cost code of this record, if any.
  - `id`: integer - Procore ID of this cost code's parent cost code. Null for root-level cost codes. e.g. `2345`
- `position`: integer - Sort order of this cost code within its parent. e.g. `1`
- `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
- `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
- `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
- `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
  - `id`: integer - Unique identifier for the Line Item Type. e.g. `12345`
  - `name`: string - Display name of the Line Item Type. e.g. `Equipment`
  - `code`: string - Short code used for CSV import of this Line Item Type. e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, labor, other] - Canonical cost category for this line item type. One of: 'equipment', 'materials', 'commitment', 'owner_cost', 'professional_services', 'labor', 'other'. e.g. `materials`
  - `origin_id`: string - ERP system identifier for this line item type. Null when not linked to an ERP system. e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/cost_codes/{id}

**Update Cost Code**
Update a specific Cost Code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Cost Code

Request body (application/json) (required):

- `project_id`: integer (required) - Unique identifier for the project. e.g. `12345`
- `sub_job_id`: integer - ID of the sub job to scope this operation to. When provided, the cost code is created or updated under this sub job rather than the project directly. e.g. `12345`
- `cost_code`: object (required) - Cost Code object
  - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
  - `code`: string (required) - Cost code segment, not including the parent prefix. For example, for full code "02-300", the value of this field should be "300". e.g. `300`
  - `name`: string (required) - Display name of the cost code. e.g. `Site Work`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. e.g. `OD-239238`
  - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `3497237`
  - `parent_id`: integer - ID of the parent cost code in the hierarchy. Creates a root-level cost code when omitted. e.g. `12345`
  - `parent_origin_id`: string - ERP origin ID of the parent cost code. Alternative to parent_id for looking up the parent by its ERP identifier rather than its Procore ID. e.g. `ERP-CC-001`
  - `standard_cost_code_id`: integer - ID of the company-level standard cost code to associate with this cost code. e.g. `122334`

Response 200 (application/json): object

- `id`: integer - Unique identifier for this Cost Code record. e.g. `12345`
- `biller`: string - Display name of the entity (project or sub job) that owns this cost code. e.g. `Campus`
- `biller_id`: integer - Procore ID of the owning project or sub job. Use with biller_type to identify the owning entity. e.g. `12345`
- `biller_type`: string enum[Project, SubJob] - Type of entity that owns this cost code. One of: 'Project' (a standard project) or 'SubJob' (a sub job within the project). e.g. `Project`
- `biller_origin_id`: string - ERP origin ID of the owning project or sub job. Null when no ERP origin has been set. e.g. `98765`
- `budgeted`: boolean - Whether this cost code has been marked as budgeted. True when at least one budget line item exists for this cost code. e.g. `false`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
- `created_at`: string(date-time) - Timestamp when this cost code was created, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
- `deleted_at`: string(date-time) - Timestamp when this cost code was soft-deleted, in ISO 8601 format. Null when the record is active. e.g. `2017-07-29T21:39:40Z`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). e.g. `02-300`
- `name`: string - Display name of the cost code. e.g. `Earthwork`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Null when no ERP origin data has been set. e.g. `OD-129947`
- `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `9874484`
- `parent`: object - The immediate parent cost code of this record, if any.
  - `id`: integer - Procore ID of this cost code's parent cost code. Null for root-level cost codes. e.g. `2345`
- `position`: integer - Sort order of this cost code within its parent. e.g. `1`
- `sortable_code`: string - Deprecated alias for full_code. Use full_code instead. Included for backwards compatibility. e.g. `02-300`
- `standard_cost_code_id`: integer - ID of the company-level standard cost code that this project cost code was created from. Null when not derived from a standard list. e.g. `122334`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list associated with this cost code via its standard cost code. Null when not linked to a standard list. Only present in the extended view. e.g. `133445`
- `updated_at`: string(date-time) - Timestamp when this cost code was last updated, in ISO 8601 format. e.g. `2015-05-15T00:00:00Z`
- `line_item_types`: array of object - Array of line item types (cost types) assigned to this cost code. Each entry represents one Cost Code / Line Item Type assignment.
  - `id`: integer - Unique identifier for the Line Item Type. e.g. `12345`
  - `name`: string - Display name of the Line Item Type. e.g. `Equipment`
  - `code`: string - Short code used for CSV import of this Line Item Type. e.g. `LB`
  - `base_type`: string enum[equipment, materials, commitment, owner_cost, professional_services, labor, other] - Canonical cost category for this line item type. One of: 'equipment', 'materials', 'commitment', 'owner_cost', 'professional_services', 'labor', 'other'. e.g. `materials`
  - `origin_id`: string - ERP system identifier for this line item type. Null when not linked to an ERP system. e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/cost_codes/sync

**Sync Cost Codes**
This endpoint creates or updates a batch of Cost Codes.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `sub_job_id` [query] integer - ID of the sub job to scope this sync operation to. When provided, cost codes are created or updated under this sub job rather than the project directly.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - Unique identifier for the Cost Code e.g. `348330`
  - `position`: integer - Sort order of this cost code within its parent. e.g. `1`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", the value of this field should be "300". e.g. `300`
  - `name`: string - Display name of the cost code. e.g. `Site Work`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. e.g. `OD-239238`
  - `origin_id`: string - ERP system identifier for this cost code. Used by sync operations to match records across systems. e.g. `3497237`
  - `parent_id`: integer - ID of the parent cost code in the hierarchy. Creates a root-level cost code when omitted. e.g. `12345`
  - `parent_origin_id`: string - ERP origin ID of the parent cost code. Alternative to parent_id for looking up the parent by its ERP identifier rather than its Procore ID. e.g. `ERP-CC-001`
  - `standard_cost_code_id`: integer - ID of the company-level standard cost code to associate with this cost code. e.g. `122334`

Response 200 (application/json): object

- `entities`: array of oneOf(object | object)
- `errors`: array of object
  - `errors`: object - Validation errors for this item in the sync batch. Keys are field names (e.g., 'code', 'name', 'parent_id'); values are arrays of error message strings describing why the item could not be synced.
    - `field_name`: array of string - Array of error messages for the named field. The key is a placeholder for the actual field name (e.g., 'code').

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/cost_codes/copy_subset_from_standard_list

**Copy Subset from Standard Cost Code List**
Copy a subset of Cost Codes from Standard Cost Code List.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json):

- `standard_cost_code_list_id`: integer (required) - ID of the standard cost code list to copy codes from. Must be a list belonging to the same company as the project. e.g. `1`
- `standard_cost_code_ids`: array of integer (required) - IDs of the specific standard cost codes to copy. Must include the ancestors of any standard cost code in this list so the hierarchy is preserved. e.g. `[123, 456]`
- `sub_job_id`: integer - ID of the sub job to copy cost codes into. When provided, codes are copied to the sub job rather than the project directly. e.g. `1`
- `project_id`: integer (required) - ID of the project to copy cost codes into. e.g. `2`

Response 201 (application/json): object

- `successes`: array of oneOf(object | object) - Array of successfully created Cost Codes
- `failures`: array of string - An empty array

Response 207 (application/json): object

- `successes`: array of oneOf(object | object) - Array of successfully created Cost Codes
- `failures`: array of oneOf(object | object) - Array of biller-created duplicates of Standard Cost Codes

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/standard_cost_code_lists  **[DEPRECATED]**

**List Standard Cost Code Lists**
Return a list of all Standard Cost Code Lists at the Company level.
Deprecation Note: Please find the replacement endpoint in the Work Breakdown Structure documents. This endpoint will be replaced with the List Company WBS Segment Item Lists Endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `filter_erp_integrated` [query] boolean - When true and the company is ERP-integrated, filters the list to only ERP-enabled or non-ERP lists based on the project's ERP status. Requires a project context to take effect.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `available_to_use_on_new_projects`: boolean - Whether this Standard Cost Code List is available to be assigned to new projects. When true, it may be selected during project creation. e.g. `true`
- `id`: integer - Unique identifier for the Standard Cost Code List. Use as the {id} path parameter in GET, PATCH /rest/v1.0/standard_cost_code_lists/{id}. e.g. `12345`
- `is_erp_list`: boolean - Whether this list is linked to an ERP integration. When true, cost codes derived from this list are ERP-managed. Cannot be reverted to false once set. e.g. `true`
- `name`: string - Display name of the Standard Cost Code List. e.g. `Client X Cost Codes`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/standard_cost_code_lists

**Create Standard Cost Code List**
Create a new Standard Cost Code List at the Company level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - Unique identifier for the company. e.g. `12345`
- `standard_cost_code_list`: object (required)
  - `name`: string - Name of Standard Cost Code List e.g. `Client X Cost Codes`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the Standard Cost Code List. Use as the {id} path parameter in GET, PATCH /rest/v1.0/standard_cost_code_lists/{id}. e.g. `12345`
- `is_erp_list`: boolean - Whether this list is linked to an ERP integration. When true, cost codes derived from this list are ERP-managed. Cannot be reverted to false once set. e.g. `true`
- `name`: string - Display name of the Standard Cost Code List. e.g. `Client X Cost Codes`
- `company_id`: integer - ID of the company that owns this Standard Cost Code List. Use as the company_id parameter in company-scoped requests. e.g. `309`
- `available_to_use_on_new_projects`: boolean - Whether this Standard Cost Code List is available to be assigned to new projects. When true, it may be selected during project creation. e.g. `true`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/standard_cost_code_lists/{id}

**Show Standard Cost Code List**
Return detailed information on a Standard Cost Code List at the Company level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Standard Cost Code List. Use the ID returned from GET /rest/v1.0/standard_cost_code_lists.
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Standard Cost Code List. Use as the {id} path parameter in GET, PATCH /rest/v1.0/standard_cost_code_lists/{id}. e.g. `12345`
- `is_erp_list`: boolean - Whether this list is linked to an ERP integration. When true, cost codes derived from this list are ERP-managed. Cannot be reverted to false once set. e.g. `true`
- `name`: string - Display name of the Standard Cost Code List. e.g. `Client X Cost Codes`
- `company_id`: integer - ID of the company that owns this Standard Cost Code List. Use as the company_id parameter in company-scoped requests. e.g. `309`
- `available_to_use_on_new_projects`: boolean - Whether this Standard Cost Code List is available to be assigned to new projects. When true, it may be selected during project creation. e.g. `true`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/standard_cost_code_lists/{id}

**Update Standard Cost Code List**
Update a Standard Cost Code List at the Company level.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Standard Cost Code List. Use the ID returned from GET /rest/v1.0/standard_cost_code_lists.

Request body (application/json) (required):

- `company_id`: integer (required) - ID of the company that owns the Standard Cost Code List. e.g. `123`
- `standard_cost_code_list`: object (required) - Standard Cost Code List attributes to update.
  - `name`: string - New display name for the Standard Cost Code List. e.g. `Standard Cost Code List`
  - `is_erp_list`: boolean - Set to true to link this list to the company's ERP integration. Cannot be set to false once enabled on an existing ERP list. e.g. `true`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Standard Cost Code List. Use as the {id} path parameter in GET, PATCH /rest/v1.0/standard_cost_code_lists/{id}. e.g. `12345`
- `is_erp_list`: boolean - Whether this list is linked to an ERP integration. When true, cost codes derived from this list are ERP-managed. Cannot be reverted to false once set. e.g. `true`
- `name`: string - Display name of the Standard Cost Code List. e.g. `Client X Cost Codes`
- `company_id`: integer - ID of the company that owns this Standard Cost Code List. Use as the company_id parameter in company-scoped requests. e.g. `309`
- `available_to_use_on_new_projects`: boolean - Whether this Standard Cost Code List is available to be assigned to new projects. When true, it may be selected during project creation. e.g. `true`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/standard_cost_codes

**List Standard Cost Codes**
Return a list of all Standard Cost Codes in a specified Standard Cost Code list.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `standard_cost_code_list_id` [query] integer (required) - ID of the standard cost code list to scope this request to. Required.
- `only_active_cost_codes` [query] boolean - When true, returns only active standard cost codes. When false or omitted, returns all codes including inactive ones.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `view` [query] string enum[default, compact, extended] - The 'default' view only returns id and standard_cost_code_list_id. The 'compact' view also includes origin_id. The 'extended' view includes the more complete list of attributes shown below. The 'extended' view is used...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for the Standard Cost Code. Use as the {id} path parameter in GET, PATCH, and DELETE /rest/v1.0/standard_cost_codes/{id}. e.g. `12345`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list this code belongs to. Use as the standard_cost_code_list_id query parameter when operating on this code. Always present. e.g. `12345`
- `parent_id`: integer - ID of the parent standard cost code in the hierarchy. Null for root-level codes. Only present in 'extended' view. e.g. `12345`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". Only present in 'extended' view. e.g. `300`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). Only present in 'extended' view. e.g. `02-300`
- `name`: string - Display name of the standard cost code. Only present in 'extended' view. e.g. `Site Work`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Only present in 'extended' view. e.g. `OD-2398273424`
- `origin_id`: string - ERP system identifier for this standard cost code. Used by sync operations to match records across systems. Present in 'compact' and 'extended' views. e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/standard_cost_codes

**Create Standard Cost Code**
Create a new Standard Cost Code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[default, compact, extended] - The 'default' view only returns id and standard_cost_code_list_id. The 'compact' view also includes origin_id. The 'extended' view includes the more complete list of attributes shown below. The 'extended' view is used...

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `12345`
- `standard_cost_code_list_id`: integer (required) - Standard Cost Code List ID e.g. `12345`
- `standard_cost_code`: object (required)
  - `parent_id`: integer - ID of the parent standard cost code. Creates a root-level code when omitted. e.g. `12345`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `300`
  - `name`: string - Display name of the standard cost code. e.g. `Site Work`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. e.g. `OD-2398273424`
  - `origin_id`: string - ERP system identifier for this standard cost code. Used by sync operations to match records across systems. e.g. `ABC123`

Response 201 (application/json): object

- `id`: integer - Unique identifier for the Standard Cost Code. Use as the {id} path parameter in GET, PATCH, and DELETE /rest/v1.0/standard_cost_codes/{id}. e.g. `12345`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list this code belongs to. Use as the standard_cost_code_list_id query parameter when operating on this code. Always present. e.g. `12345`
- `parent_id`: integer - ID of the parent standard cost code in the hierarchy. Null for root-level codes. Only present in 'extended' view. e.g. `12345`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". Only present in 'extended' view. e.g. `300`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). Only present in 'extended' view. e.g. `02-300`
- `name`: string - Display name of the standard cost code. Only present in 'extended' view. e.g. `Site Work`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Only present in 'extended' view. e.g. `OD-2398273424`
- `origin_id`: string - ERP system identifier for this standard cost code. Used by sync operations to match records across systems. Present in 'compact' and 'extended' views. e.g. `ABC123`

Error responses: 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/standard_cost_codes/{id}

**Show Standard Cost Code**
Return information about a Standard Cost Code from a specified Standard Cost Code list.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Standard Cost Code. Use the ID returned from GET /rest/v1.0/standard_cost_codes.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `standard_cost_code_list_id` [query] integer (required) - ID of the standard cost code list that contains this code. Required.
- `view` [query] string enum[default, compact, extended] - The 'default' view only returns id and standard_cost_code_list_id. The 'compact' view also includes origin_id. The 'extended' view includes the more complete list of attributes shown below. The 'extended' view is used...

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Standard Cost Code. Use as the {id} path parameter in GET, PATCH, and DELETE /rest/v1.0/standard_cost_codes/{id}. e.g. `12345`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list this code belongs to. Use as the standard_cost_code_list_id query parameter when operating on this code. Always present. e.g. `12345`
- `parent_id`: integer - ID of the parent standard cost code in the hierarchy. Null for root-level codes. Only present in 'extended' view. e.g. `12345`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". Only present in 'extended' view. e.g. `300`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). Only present in 'extended' view. e.g. `02-300`
- `name`: string - Display name of the standard cost code. Only present in 'extended' view. e.g. `Site Work`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Only present in 'extended' view. e.g. `OD-2398273424`
- `origin_id`: string - ERP system identifier for this standard cost code. Used by sync operations to match records across systems. Present in 'compact' and 'extended' views. e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/standard_cost_codes/{id}

**Update Standard Cost Code**
Update a Standard Cost Code.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Standard Cost Code. Use the ID returned from GET /rest/v1.0/standard_cost_codes.
- `view` [query] string enum[default, compact, extended] - The 'default' view only returns id and standard_cost_code_list_id. The 'compact' view also includes origin_id. The 'extended' view includes the more complete list of attributes shown below. The 'extended' view is used...

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `12345`
- `standard_cost_code_list_id`: integer (required) - Standard Cost Code List ID e.g. `12345`
- `standard_cost_code`: object (required)
  - `parent_id`: integer - Parent ID (keeps the same Parent ID as before if not provided) e.g. `12345`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `name`: string - Description e.g. `Site Work`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Standard Cost Code. Use as the {id} path parameter in GET, PATCH, and DELETE /rest/v1.0/standard_cost_codes/{id}. e.g. `12345`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list this code belongs to. Use as the standard_cost_code_list_id query parameter when operating on this code. Always present. e.g. `12345`
- `parent_id`: integer - ID of the parent standard cost code in the hierarchy. Null for root-level codes. Only present in 'extended' view. e.g. `12345`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". Only present in 'extended' view. e.g. `300`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). Only present in 'extended' view. e.g. `02-300`
- `name`: string - Display name of the standard cost code. Only present in 'extended' view. e.g. `Site Work`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Only present in 'extended' view. e.g. `OD-2398273424`
- `origin_id`: string - ERP system identifier for this standard cost code. Used by sync operations to match records across systems. Present in 'compact' and 'extended' views. e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/standard_cost_codes/{id}  **[DEPRECATED]**

**Delete Standard Cost Code**
Delete a Standard Cost Code for ERP integrated companies and standard cost code lists.
Deprecation Note: Please find the replacement endpoint in the Work Breakdown Structure documents. This endpoint will be replaced with the Delete Company Segment Item Endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique identifier for the Standard Cost Code. Use the ID returned from GET /rest/v1.0/standard_cost_codes.
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Unique identifier for the Standard Cost Code. Use as the {id} path parameter in GET, PATCH, and DELETE /rest/v1.0/standard_cost_codes/{id}. e.g. `12345`
- `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list this code belongs to. Use as the standard_cost_code_list_id query parameter when operating on this code. Always present. e.g. `12345`
- `parent_id`: integer - ID of the parent standard cost code in the hierarchy. Null for root-level codes. Only present in 'extended' view. e.g. `12345`
- `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". Only present in 'extended' view. e.g. `300`
- `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). Only present in 'extended' view. e.g. `02-300`
- `name`: string - Display name of the standard cost code. Only present in 'extended' view. e.g. `Site Work`
- `origin_data`: string - Free-form third-party metadata string from the ERP system. Only present in 'extended' view. e.g. `OD-2398273424`
- `origin_id`: string - ERP system identifier for this standard cost code. Used by sync operations to match records across systems. Present in 'compact' and 'extended' views. e.g. `ABC123`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/standard_cost_codes/sync

**Sync Standard Cost Codes**
This endpoint creates or updates a batch of Standard Cost Codes.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[default, compact, extended] - The 'default' view only returns id and standard_cost_code_list_id. The 'compact' view also includes origin_id. The 'extended' view includes the more complete list of attributes shown below. The 'extended' view is used...

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `12345`
- `standard_cost_code_list_id`: integer (required) - Standard Cost Code list ID e.g. `23456`
- `updates`: array of object (required)
  - `name`: string - Display name of the standard cost code. e.g. `General Requirements`
  - `id`: integer - ID of an existing Standard Cost Code to update. When omitted or not found, the service attempts to match on origin_id and create or update accordingly. e.g. `123`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". e.g. `2-075`
  - `parent_id`: integer - ID of the parent standard cost code. Creates a root-level code when omitted. e.g. `456`
  - `origin_id`: string - ERP system identifier for this standard cost code. Used to match records across systems during sync. e.g. `OID-123`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. e.g. `OD-234`

Response 200 (application/json): object

- `entities`: array of object - Array of updated entities
  - `id`: integer - Unique identifier for the Standard Cost Code. Use as the {id} path parameter in GET, PATCH, and DELETE /rest/v1.0/standard_cost_codes/{id}. e.g. `12345`
  - `standard_cost_code_list_id`: integer - ID of the company-level standard cost code list this code belongs to. Use as the standard_cost_code_list_id query parameter when operating on this code. Always present. e.g. `12345`
  - `parent_id`: integer - ID of the parent standard cost code in the hierarchy. Null for root-level codes. Only present in 'extended' view. e.g. `12345`
  - `code`: string - Cost code segment, not including the parent prefix. For example, for full code "02-300", this field is "300". Only present in 'extended' view. e.g. `300`
  - `full_code`: string - Full cost code including all parent prefixes (e.g. "02-300"). Only present in 'extended' view. e.g. `02-300`
  - `name`: string - Display name of the standard cost code. Only present in 'extended' view. e.g. `Site Work`
  - `origin_data`: string - Free-form third-party metadata string from the ERP system. Only present in 'extended' view. e.g. `OD-2398273424`
  - `origin_id`: string - ERP system identifier for this standard cost code. Used by sync operations to match records across systems. Present in 'compact' and 'extended' views. e.g. `ABC123`
- `errors`: array of object - Array of errors e.g. `[{"id": 3, "name": "General Requirements", "errors": {"id": ["Entity with thi...`

Error responses: 401, 403, 413 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Line Item Type Categories

Resource id: `line-item-type-categories`. Raw spec: `../openapi-raw/line-item-type-categories.json`. Web: https://developers.procore.com/reference/rest/line-item-type-categories?version=latest
Product lines: Construction Financials

### GET /rest/v2.0/companies/{company_id}/line_item_type_categories

**List Line Item Type Categories**
Return a list of the company's Line Item Type Categories (Cost Type Categories).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Response 200 (application/json): object

- `data`: array of object - Array of Line Item Type Categories
  - `id`: string (required) - Unique identifier of the Line Item Type Category. e.g. `12345`
  - `name`: string (required) - Cost Type Category name e.g. `Labor`

Error responses: 401, 403, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Patterns

Resource id: `patterns`. Raw spec: `../openapi-raw/patterns.json`. Web: https://developers.procore.com/reference/rest/patterns?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns

**List Company WBS Patterns**
All patterns for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `include[]` [query] array of string enum[tier_depth] - Optional response extensions. Pass include[]=tier_depth to include the tier_depth field on each segment in the response.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this WBS Pattern. Use as the {id} path parameter when operating on a specific pattern. e.g. `12345`
- `description`: string - Display name / description of the WBS Pattern. Defaults to 'Procore Standard Pattern' when not specified during creation. e.g. `Procore Standard Pattern`
- `created_at`: string(date-time) - ISO 8601 timestamp when the WBS Pattern was created. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp when the WBS Pattern was last updated. e.g. `2016-08-30T18:11:43Z`
- `segments`: array of object - Ordered list of WBS Segments that make up this pattern. Each segment represents one dimension of the work breakdown structure (e.g. Cost Code, Cost Type, Sub Job).
  - `id`: integer - Unique identifier for this WBS Segment. Use as the segment_id body parameter when calling add_segment or remove_segment on a project pattern, or as segment_id in update_segment_order. e.g. `4567`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Domain type of this WBS Segment. One of: 'cost_code' (cost code dimension), 'line_item_type' (cost type / line item type dimension), 'sub_job' (sub job dimension), 'custom' (user-defined dimension), 'attribute' (attri... e.g. `cost_code`
  - `name`: string - Localised display name of the WBS Segment (e.g. 'Cost Code', 'Cost Type', 'Phase'). e.g. `Cost Code`
  - `position`: integer - Ordinal position of this segment within the company WBS Pattern. Lower numbers appear first. Use update_segment_order to change positions. e.g. `1`
  - `segment_items_count`: integer - Total number of segment items (e.g. cost codes, cost types) belonging to this segment at the company level. Null when the count cannot be determined. e.g. `200`
  - `tier_depth`: integer - Present only when include[]=tier_depth is requested (list endpoints only). Flat segments (sub_job, line_item_type) return 1; tiered segments return the number of levels. Omitted (not null) when not requested. e.g. `3`
  - `required`: boolean - Whether a value for this segment must be selected when creating a WBS Code (Budget Code). Always true for cost_code and line_item_type segments. e.g. `true`
  - `delimiter`: string - Character used to separate this segment's value from the next segment in the full WBS Code string (e.g. '-' produces '01-200'). e.g. `-`
  - `project_can_modify_origin_project`: boolean - Whether project-specific Segment Items (items created at the project level) can be added to a project for this segment. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether Segment Items inherited from the company level can be deleted from a project for this segment. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of this segment's items. 'tiered' means items can have parent–child relationships (e.g. cost codes with sub-codes); 'flat' means all items are at the same level (e.g. cost types). e.g. `tiered`
  - `created_at`: string(date-time) - ISO 8601 timestamp when this WBS Segment was created. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp when this WBS Segment was last updated. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS Pattern this segment belongs to. Matches the parent pattern's id field. e.g. `12345`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns/update_segment_order

**Update Company Pattern's Segment Order**
Updates the segment order on a company pattern

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `updated_order`: array of object (required) - Array of segment position assignments. Every segment in the pattern must be included.
  - `segment_id`: integer (required) - ID of the WBS Segment to reposition. Retrieve valid IDs from segments[].id in the GET patterns response. e.g. `4567`
  - `position`: integer (required) - Relative sort key. Segments are ordered by ascending position and renumbered 1..N server-side; any integers may be used as long as the intended order is preserved. e.g. `1`

Response 204: No Content (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns

**List Project WBS Patterns**
All patterns for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `include[]` [query] array of string enum[tier_depth] - Optional response extensions. Pass include[]=tier_depth to include the tier_depth field on each segment in the response.

Response 200 (application/json): object

- `id`: integer - Unique identifier for this WBS Pattern. Use as the {id} path parameter when operating on a specific pattern. e.g. `12345`
- `description`: string - Display name / description of the WBS Pattern. Defaults to 'Procore Standard Pattern' when not specified during creation. e.g. `Procore Standard Pattern`
- `created_at`: string(date-time) - ISO 8601 timestamp when the WBS Pattern was created. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp when the WBS Pattern was last updated. e.g. `2016-08-30T18:11:43Z`
- `is_project_level_ordered`: boolean - Whether the project's WBS Pattern segment order has been customised from the company-level order. True once update_segment_order has been called for this project. e.g. `true`
- `segments`: array of object - Ordered list of WBS Segments that make up this project pattern. Each segment represents one dimension of the work breakdown structure (e.g. Cost Code, Cost Type, Sub Job).
  - `id`: integer - Unique identifier for this WBS Segment. Use as the segment_id body parameter when calling add_segment or remove_segment on this project pattern, or as segment_id in update_segment_order. e.g. `12345`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Domain type of this WBS Segment. One of: 'cost_code' (cost code dimension), 'line_item_type' (cost type / line item type dimension), 'sub_job' (sub job dimension), 'custom' (user-defined dimension), 'attribute' (attri... e.g. `cost_code`
  - `name`: string - Localised display name of the WBS Segment (e.g. 'Cost Code', 'Cost Type', 'Phase'). e.g. `Cost Code`
  - `position`: integer - Ordinal position of this segment within the project WBS Pattern. Lower numbers appear first. Use update_segment_order to change positions. e.g. `1`
  - `segment_items_count`: integer - Total number of segment items (e.g. cost codes, cost types) belonging to this segment at the project level. Null when the count cannot be determined. e.g. `200`
  - `tier_depth`: integer - Present only when include[]=tier_depth is requested (list endpoints only). Flat segments (sub_job, line_item_type) return 1; tiered segments return the number of levels. Omitted (not null) when not requested. e.g. `3`
  - `required`: boolean - Whether a value for this segment must be selected when creating a WBS Code (Budget Code). Always true for cost_code and line_item_type segments. e.g. `true`
  - `delimiter`: string - Character used to separate this segment's value from the next segment in the full WBS Code string (e.g. '-' produces '01-200'). e.g. `-`
  - `project_can_modify_origin_project`: boolean - Whether project-specific Segment Items (items created at the project level) can be added to this project for this segment. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether Segment Items inherited from the company level can be deleted from this project for this segment. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of this segment's items. 'tiered' means items can have parent–child relationships (e.g. cost codes with sub-codes); 'flat' means all items are at the same level (e.g. cost types). e.g. `tiered`
  - `selectable_tiers`: boolean - Whether non-leaf (parent) Segment Items can be selected in the Budget Code picker for this project. Only relevant for tiered segments. e.g. `true`
  - `is_included_in_project_pattern`: boolean - Whether this WBS Segment is currently included in the project's WBS Pattern. Use add_segment / remove_segment to change this. e.g. `true`
  - `created_at`: string(date-time) - ISO 8601 timestamp when this WBS Segment was created. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp when this WBS Segment was last updated. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS Pattern this segment belongs to. Matches the parent pattern's id field. e.g. `12345`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns/add_segment

**Add segment to the project pattern**
Add segment to the project pattern

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `segment_id`: integer (required) - ID of the WBS Segment to add to or remove from the project pattern. Retrieve valid segment IDs from the segments[].id field returned by GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns. e.g. `4567`

Response 204: No Response (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns/remove_segment

**Remove segment from the project pattern**
Remove segment from the project pattern

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `segment_id`: integer (required) - ID of the WBS Segment to add to or remove from the project pattern. Retrieve valid segment IDs from the segments[].id field returned by GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns. e.g. `4567`

Response 204: No Response (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PUT /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns/update_segment_order

**Update Project Pattern's Segment Order**
Updates the segment order on a project pattern

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updated_order`: array of object (required) - Array of segment position assignments. Every segment in the pattern must be included.
  - `segment_id`: integer (required) - ID of the WBS Segment to reposition. Retrieve valid IDs from segments[].id in the GET patterns response. e.g. `4567`
  - `position`: integer (required) - Relative sort key. Segments are ordered by ascending position and renumbered 1..N server-side; any integers may be used as long as the intended order is preserved. e.g. `1`

Response 204: No Content (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Segment Item Lists

Resource id: `segment-item-lists`. Raw spec: `../openapi-raw/segment-item-lists.json`. Web: https://developers.procore.com/reference/rest/segment-item-lists?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/lists

**List Company WBS Segment Item Lists**
List Segment Item Lists for a specific segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment whose Segment Item Lists to retrieve. Only cost_code and line_item_type segment types are supported; other segment types return an empty array. Retrieve valid segment IDs from segments[].id in th...

Response 200 (application/json): array of object

- `id`: integer - Unique identifier for this Segment Item List. For cost_code segments, this is the Standard Cost Code List ID. For line_item_type segments, 1 = Procore Cost Types (non-ERP) and 2 = ERP Cost Types. e.g. `12345`
- `name`: string - Display name of the Segment Item List (e.g. 'Procore Standard Cost Codes' or 'Procore Cost Types'). Shown in the WBS Admin UI when selecting a list for a segment. e.g. `Procore Cost Types`
- `segment_items_count`: integer - Total number of segment items (cost codes or cost types) contained in this list. e.g. `48`
- `erp_integrated`: boolean - Whether this list is linked to an ERP integration. When true, the segment items in this list are managed by the connected ERP system and cannot be freely edited in Procore. e.g. `false`
- `available_to_use_on_new_projects`: boolean - Whether this list is available to be assigned to new projects. When true, it can be selected during project creation or project-level WBS configuration. e.g. `true`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Segment Items

Resource id: `segment-items`. Raw spec: `../openapi-raw/segment-items.json`. Web: https://developers.procore.com/reference/rest/segment-items?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items

**List Company Segment Items**
List Segment Items for a specific segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.
- `segment_item_list_id` [query] integer - Used to filter legacy segment items by list. Required for Cost Codes.
- `only_active_items` [query] boolean - When true, returns only active segment items (status=active). Defaults to false (returns all items including inactive).
- `include_action_policy` [query] boolean - When true, includes an action_policy object on each segment item indicating which operations (create, update, delete) are permitted for the current user and ERP integration state.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
- `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
- `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
- `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
- `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
- `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
- `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
- `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
- `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
  - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
  - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
  - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
  - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
  - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
  - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
  - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
  - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items

**Create Company Segment Item**
Create a Company Segment Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.

Request body (application/json) (required):

- `code`: string (required) - Short alphanumeric code for this segment item (e.g., '300'). For tiered segments, provide the leaf-level code only — not the full path code including parent prefixes. e.g. `300`
- `name`: string (required) - Display name of this segment item (e.g., 'Concrete'). Shown in the WBS picker when building a WBS code. e.g. `Concrete`
- `segment_item_list_id`: integer - ID of the Segment Item List (Standard Cost Code List) to associate this item with. Required for cost_code segments; optional for other segment types. Retrieve valid list IDs from GET .../segments/{segment_id}/lists. e.g. `12345`
- `parent_id`: integer - ID of the parent segment item for tiered segments. Omit to create a root-level item. Not applicable for flat-structure segments. e.g. `34`
- `status`: string enum[active, inactive] - Initial lifecycle status of the segment item. One of: 'active' (available for selection), 'inactive' (hidden from the WBS picker). Defaults to 'active' when omitted. e.g. `active`
- `default_uom_id`: integer - ID of the default unit of measure. Applies to line_item_type segment items only (company scope); ignored for other segment types. e.g. `5`

Response 201 (application/json): object

- `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
- `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
- `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
- `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
- `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
- `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
- `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
- `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
- `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
  - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
  - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
  - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
  - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
  - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
  - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
  - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
  - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items/update_all

**Update All Company Segment Items**
Update All Segment Items with the same attributes. The endpoint handles updating status (deactivating or reactivating) for segment items and their children, including cost types when the cost type deactivation feature is enabled. Deactivating the default cost type (Other) or the last remaining active cost type is not allowed.
For bulk status changes on the **Cost types** (line item types) segment, `attributes` must contain **only** `status`. Any other property in `attributes` results in **400 Bad Request** with an error message. Other segment types may define their own allowed `attributes` keys.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.

Request body (application/json) (required):

- `ids`: array of integer (required) - List of segment item IDs. The API will find and update the children of the provided IDs. e.g. `[23, 24]`
- `attributes`: object (required) - Fields to apply to every selected segment item. For bulk **Cost types** status updates (when cost type deactivation is enabled), send **only** `status`; extra keys are rejected with **400 Bad Request**.
  - `status`: string enum[active, inactive] - Lifecycle status to apply to all selected segment items. One of: 'active' (re-activates items), 'inactive' (deactivates items and their descendants, hiding them from the WBS picker). e.g. `inactive`

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items/bulk_destroy

**Bulk Delete Company Segment Items**
Bulk Delete Company Segment Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.

Request body (application/json) (required):

- `segment_item_ids`: array of integer (required) - Array of segment item IDs to delete. Retrieve valid IDs from the index endpoint. e.g. `[23, 24]`

Response 207 (application/json): object

- `successes`: array of integer - IDs that succeeded
- `failures`: array of object - List of failures
  - `id`: integer - ID e.g. `456`
  - `error`: string - Error message e.g. `Is in use`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items/{id}

**Show Company Segment Item**
Return details on a specific Company Segment Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.
- `id` [path] integer (required) - Segment Item ID
- `standard_cost_code_list_id` [query] integer - ID of the Standard Cost Code List to scope this request to. Required for cost_code segments — omitting it will result in an error for those segments. Retrieve valid list IDs from GET /rest/v1.0/companies/{company_id}/...

Response 200 (application/json): object

- `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
- `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
- `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
- `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
- `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
- `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
- `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
- `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
- `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
  - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
  - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
  - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
  - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
  - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
  - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
  - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
  - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items/{id}

**Update Company Segment Item**
Update a specific Company Segment Item. For cost types (line item types), the status attribute can be used to activate or deactivate the cost type when the cost type deactivation feature is enabled. Deactivating the default cost type (Other) or the last remaining active cost type will return a 422 error.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.
- `id` [path] integer (required) - Segment Item ID
- `standard_cost_code_list_id` [query] integer - ID of the Standard Cost Code List to scope this request to. Required for cost_code segments — omitting it will result in an error for those segments. Retrieve valid list IDs from GET /rest/v1.0/companies/{company_id}/...

Request body (application/json) (required):

- `code`: string - Short alphanumeric code for this segment item (e.g., '300'). For tiered segments, provide the leaf-level code only — not the full path code including parent prefixes. e.g. `300`
- `name`: string - Display name of this segment item (e.g., 'Concrete'). Shown in the WBS picker when building a WBS code. e.g. `Concrete`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when building WBS codes), 'inactive' (hidden from the WBS picker but retained for historical records). e.g. `active`
- `parent_id`: integer - ID of the new parent segment item for tiered segments. Set to null to move the item to the root level. e.g. `34`
- `default_uom_id`: integer - ID of the default unit of measure. Applies to line_item_type segment items only (company scope); ignored for other segment types. e.g. `5`

Response 200 (application/json): object

- `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
- `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
- `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
- `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
- `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
- `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
- `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
- `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
- `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
  - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
  - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
  - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
  - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
  - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
  - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
  - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
  - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{segment_id}/segment_items/{id}

**Delete Company Segment Item**
Delete a specific Company Segment Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.
- `id` [path] integer (required) - Segment Item ID

Response 204: No Content (no body)

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{segment_id}/segment_items

**List Project Segment Items**
List Segment Items for a specific segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.
- `legacy_sub_job_id` [query] integer - Used to filter legacy cost codes by sub job. Default will filter by project.
- `legacy_cost_code_id` [query] integer - ERP-specific filter: ID of the legacy cost code record from the connected ERP system. Only applicable for ERP-integrated projects. Ignored for non-ERP-integrated projects.
- `include_action_policy` [query] boolean - When true, includes an action_policy object on each segment item indicating which operations (create, update, delete) are permitted for the current user and ERP integration state.
- `only_active_items` [query] boolean - When true, returns only active segment items (status=active). Defaults to false (returns all items including inactive).
- `with_descendant_counts` [query] boolean - When true, includes a count of descendant segment items on each parent item in the response. Useful for rendering tiered segment trees without loading all children upfront.
- `include_sub_job_cost_codes` [query] boolean - When true, includes cost codes that are associated with sub jobs in the response. Only relevant for cost_code segments on projects that have sub jobs enabled.
- `with_sub_job_cost_codes_count` [query] boolean - Used to include the count of cost codes that can be used to create wbs codes for each sub job. ONLY supported by sub jobs.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
- `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
- `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
- `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
- `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
- `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
- `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
- `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
- `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
  - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
  - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
  - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
  - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
  - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
  - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
  - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
  - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{segment_id}/segment_items

**Create Project Segment Item**
Create a Project Segment Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.

Request body (application/json) (required):

- `code`: string (required) - Short alphanumeric code for this segment item (e.g., '300'). For tiered segments, provide the leaf-level code only — not the full path code including parent prefixes. e.g. `300`
- `name`: string (required) - Display name of this segment item (e.g., 'Concrete'). Shown in the WBS picker when building a WBS code. e.g. `Concrete`
- `parent_id`: integer - ID of the parent segment item for tiered segments. Omit to create a root-level item. Not applicable for flat-structure segments. e.g. `34`
- `sub_job_id`: integer - ID of the Sub Job to associate this cost code with. Required when creating a cost code that belongs to a specific sub job rather than the project directly. e.g. `12`
- `status`: string enum[active, inactive] - Initial lifecycle status of the segment item. One of: 'active' (available for selection), 'inactive' (hidden from the WBS picker). Defaults to 'active' when omitted. e.g. `active`

Response 201 (application/json): object

- `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
- `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
- `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
- `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
- `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
- `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
- `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
- `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
- `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
  - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
  - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
  - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
  - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
  - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
  - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
  - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
  - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{segment_id}/segment_items/{id}

**Update Project Segment Item**
Update a specific Project Segment Item. The ID of the record is subject to change under certain conditions, please store the response accordingly.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.
- `id` [path] integer (required) - Segment Item ID

Request body (application/json) (required):

- `code`: string - Short alphanumeric code for this segment item (e.g., '300'). For tiered segments, provide the leaf-level code only — not the full path code including parent prefixes. e.g. `300`
- `name`: string - Display name of this segment item (e.g., 'Concrete'). Shown in the WBS picker when building a WBS code. e.g. `Concrete`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when building WBS codes), 'inactive' (hidden from the WBS picker but retained for historical records). e.g. `active`
- `sub_job_id`: integer - ID of the Sub Job that owns this cost code. Required when updating a cost code belonging to a specific sub job rather than the project directly. e.g. `12`
- `parent_id`: integer - ID of the new parent segment item for tiered segments. Set to null to move the item to the root level. e.g. `34`

Response 200 (application/json): object

- `id`: integer - Unique ID of this segment item (cost code, sub-job, line item type, or custom segment item). Use as segment_item_id when constructing a new WBS code via POST /rest/v1.0/projects/{project_id}/work_breakdown_structure/w... e.g. `456`
- `code`: string - Short alphanumeric code for this segment item (e.g., '01-222'). Combined with sibling segment codes to form the flat_code on the parent WBS code. e.g. `01-222`
- `name`: string - Human-readable name of this segment item (e.g., 'Lighting'). Combined with sibling segment names to form the flat_name on the parent WBS code. e.g. `Lighting`
- `created_at`: string(date-time) - Timestamp when this segment item was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - Timestamp when this segment item was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
- `parent_id`: integer - ID of the parent segment item in a tiered segment hierarchy. Null for root-level items or items in a flat-structure segment. e.g. `123`
- `path_ids`: array of integer - Ordered list of IDs from the root ancestor down to (and including) this segment item. Use to reconstruct the full hierarchy path. e.g. `[123, 456]`
- `path_code`: string - Full path code for this segment item representing the leaf code in its hierarchy (e.g., '01-222'). e.g. `a`
- `is_parent`: boolean - Whether this segment item has child items in a tiered segment structure. Always false for flat-structure segments. e.g. `false`
- `path_codes`: array of string - Ordered list of code strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `path_names`: array of string - Ordered list of name strings from the root ancestor down to (and including) this segment item, formatted as 'code - name'. e.g. `["01 - Requirements", "01-222 - Lighting"]`
- `in_use`: boolean - Whether this segment item is currently referenced by at least one entity (e.g., a budget line item or WBS code). e.g. `true`
- `segment`: object - The WBS segment definition that this segment item belongs to. e.g. `{"id": 3, "name": "Cost Code", "type": "cost_code", "position": 1, "delimiter...`
  - `id`: integer - Unique ID of the WBS segment definition. e.g. `3`
  - `name`: string - Display name of the segment (e.g., 'Cost Code', 'Sub Job'). e.g. `Cost Code`
  - `type`: string enum[cost_code, line_item_type, sub_job, custom, attribute] - Category of this segment. One of: 'cost_code', 'line_item_type', 'sub_job', 'custom', 'attribute'. Determines which domain entity backs the segment items. e.g. `cost_code`
  - `position`: integer - Display order of this segment within the WBS pattern. Lower numbers appear first when reading the flat_code left to right. e.g. `1`
  - `delimiter`: string - Character used to separate this segment's value from adjacent segments in the flat_code (e.g., '.'). e.g. `.`
  - `required`: boolean - Whether this segment must have a value for a WBS code to be valid. e.g. `true`
  - `segment_items_count`: integer - Total number of segment items defined for this segment. e.g. `2`
  - `project_can_modify_origin_project`: boolean - Whether project-level users can modify segment items that originated from this project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether project-level users can delete segment items that originated from the company level. e.g. `true`
  - `structure`: string enum[tiered, flat] - Hierarchy structure of the segment. 'flat' means items have no parent-child relationship; 'tiered' means items can be nested with parent_id references. e.g. `tiered`
  - `created_at`: string(date-time) - Timestamp when this segment definition was created, in ISO 8601 format. e.g. `2016-06-30T20:41:58Z`
  - `updated_at`: string(date-time) - Timestamp when this segment definition was last updated, in ISO 8601 format. e.g. `2016-08-30T18:11:43Z`
  - `wbs_pattern_id`: integer - ID of the WBS pattern this segment belongs to. e.g. `4567`
- `status`: string enum[active, inactive] - Lifecycle status of the segment item. One of: 'active' (available for selection when creating WBS codes), 'inactive' (not available for new WBS codes). e.g. `active`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{segment_id}/segment_items/{id}

**Delete Project Segment Item**
Delete a specific Project Segment Item.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.
- `id` [path] integer (required) - Segment Item ID
- `sub_job_id` [query] integer - ID of the Sub Job to scope this operation to. When provided, the action targets cost codes belonging to this sub job rather than the project directly. Only relevant for cost_code segments on projects that have sub job...

Response 204: No Content (no body)

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{segment_id}/segment_items/update_all

**Update All Project Segment Items**
Update All Segment Items with the same attributes. The endpoint currently handles updating status (deactivating or reactivating) for segment items and their children. Bulk status updates on a segment may require `attributes` to contain only `status`; see segment-specific documentation. Sending unsupported properties can result in **400 Bad Request**.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.

Request body (application/json) (required):

- `ids`: array of integer (required) - List of segment item IDs. The API will find and update the children of the provided IDs. e.g. `[23, 24]`
- `attributes`: object (required) - Fields to apply to every selected segment item. For bulk status-only operations, send only the properties supported for that segment type; unsupported keys may yield **400 Bad Request**.
  - `status`: string enum[active, inactive] - Lifecycle status to apply to all selected segment items. One of: 'active' (re-activates items), 'inactive' (deactivates items and their descendants, hiding them from the WBS picker). e.g. `inactive`

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{segment_id}/segment_items/bulk_destroy

**Bulk Delete Project Segment Items**
Bulk Delete Project Segment Items

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `segment_id` [path] integer (required) - ID of the WBS Segment to scope this request to (e.g., the cost_code or line_item_type segment). Retrieve valid segment IDs from segments[].id in the GET patterns response.

Request body (application/json) (required):

- `segment_item_ids`: array of integer (required) - Array of segment item IDs to delete. Retrieve valid IDs from the index endpoint. e.g. `[23, 24]`

Response 207 (application/json): object

- `successes`: array of integer - IDs that succeeded
- `failures`: array of object - List of failures
  - `id`: integer - ID e.g. `456`
  - `error`: string - Error message e.g. `Is in use`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Segments

Resource id: `segments`. Raw spec: `../openapi-raw/segments.json`. Web: https://developers.procore.com/reference/rest/segments?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments

**List Company WBS Segments**
All Segments for a given company

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `include[]` [query] array of string enum[tier_depth, action_policy] - Optional sideloads to include in each segment object. Valid values: 'tier_depth' (adds the tier_depth integer field), 'action_policy' (adds the action_policy object with permitted actions for the current user). Multip...
- `include_action_policy` [query] boolean - Convenience flag equivalent to passing include[]=action_policy. When true, each segment includes an action_policy object describing permitted actions for the current user.

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this WBS Segment. Use as the {id} path parameter in GET/PATCH/DELETE /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{id}. e.g. `4567`
- `type`: string enum[sub_job, cost_code, line_item_type, custom, attribute] - The segment type. One of: 'sub_job' (sub-job dimension), 'cost_code' (cost code dimension), 'line_item_type' (line item type dimension), 'custom' (user-defined custom segment), 'attribute' (attribute dimension). Only ... e.g. `custom`
- `name`: string - Localized display name of this WBS Segment shown in the UI (e.g. "Cost Code", "Phase"). Corresponds to the i18n label, not the internal segment_type value. e.g. `Phase`
- `position`: integer - Ordinal position of this segment within the company WBS pattern. Lower values appear first. Use to determine column order in budget code displays. e.g. `1`
- `segment_items_count`: integer - Total number of segment items belonging to this segment. Use to gauge whether a segment has been populated before attempting to list segment items. e.g. `200`
- `required`: boolean - Whether this segment must have a value assigned when creating a WBS Code. When true, budget codes cannot be created without selecting an item from this segment. e.g. `true`
- `delimiter`: string - Character that separates this segment's value from the next segment's value in a formatted WBS code string (e.g. '.' produces "01.02"). e.g. `.`
- `project_can_modify_origin_project`: boolean - Whether project-specific segment items can be added, edited, or removed from a project. When true, project admins may manage items in this segment independently of the company list. e.g. `true`
- `project_can_delete_origin_company`: boolean - Whether segment items inherited from the company level can be deleted from a project. When true, project admins may remove company-defined items from the project's visible list. e.g. `true`
- `structure`: string enum[tiered, flat] - Hierarchy structure of this segment. 'tiered' means items can have parent-child relationships forming a multi-level tree; 'flat' means all items are at a single level with no hierarchy. e.g. `tiered`
- `tier_depth`: integer - Present only when include[]=tier_depth is requested (list endpoints only). Flat segments (sub_job, line_item_type) return 1; tiered segments return the number of levels. Omitted (not null) when not requested. e.g. `3`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this segment was created. Use to sort or filter segments by creation date. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this segment was last modified. Use to detect whether cached segment data needs to be refreshed. e.g. `2016-08-30T18:11:43Z`
- `wbs_pattern_id`: integer - ID of the WBS Pattern this segment belongs to. Use to correlate this segment with its parent pattern returned by GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns. e.g. `4567`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments

**Create a Company WBS Segment**
Create a new company level WBS Segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `segment`: object (required)
  - `name`: string (required) - Human-readable display name for this segment (e.g. "Phase", "Sub-Job"). Shown in budget code pickers and column headers. e.g. `Phase`
  - `project_can_modify_origin_project`: boolean - Whether project-specific Segment Items are able to be added/edited/removed from a Project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether Segment Items inherited from the company-level are able to be deleted from a Project. e.g. `true`
  - `structure`: string enum[tiered, flat] (required) - Hierarchy structure of this segment. 'tiered' means items can have parent-child relationships forming a multi-level tree; 'flat' means all items are at a single level with no hierarchy. e.g. `flat`
  - `required`: boolean - Whether this segment must have a value assigned when creating a WBS Code. Only settable by users with permission to mark segments as required. Defaults to false. e.g. `false`

Response 201 (application/json): object

- `id`: integer - Unique integer identifier for this WBS Segment. Use as the {id} path parameter in GET/PATCH/DELETE /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{id}. e.g. `4567`
- `type`: string enum[sub_job, cost_code, line_item_type, custom, attribute] - The segment type. One of: 'sub_job' (sub-job dimension), 'cost_code' (cost code dimension), 'line_item_type' (line item type dimension), 'custom' (user-defined custom segment), 'attribute' (attribute dimension). Only ... e.g. `custom`
- `name`: string - Localized display name of this WBS Segment shown in the UI (e.g. "Cost Code", "Phase"). Corresponds to the i18n label, not the internal segment_type value. e.g. `Phase`
- `position`: integer - Ordinal position of this segment within the company WBS pattern. Lower values appear first. Use to determine column order in budget code displays. e.g. `1`
- `segment_items_count`: integer - Total number of segment items belonging to this segment. Use to gauge whether a segment has been populated before attempting to list segment items. e.g. `200`
- `required`: boolean - Whether this segment must have a value assigned when creating a WBS Code. When true, budget codes cannot be created without selecting an item from this segment. e.g. `true`
- `delimiter`: string - Character that separates this segment's value from the next segment's value in a formatted WBS code string (e.g. '.' produces "01.02"). e.g. `.`
- `project_can_modify_origin_project`: boolean - Whether project-specific segment items can be added, edited, or removed from a project. When true, project admins may manage items in this segment independently of the company list. e.g. `true`
- `project_can_delete_origin_company`: boolean - Whether segment items inherited from the company level can be deleted from a project. When true, project admins may remove company-defined items from the project's visible list. e.g. `true`
- `structure`: string enum[tiered, flat] - Hierarchy structure of this segment. 'tiered' means items can have parent-child relationships forming a multi-level tree; 'flat' means all items are at a single level with no hierarchy. e.g. `tiered`
- `tier_depth`: integer - Present only when include[]=tier_depth is requested (list endpoints only). Flat segments (sub_job, line_item_type) return 1; tiered segments return the number of levels. Omitted (not null) when not requested. e.g. `3`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this segment was created. Use to sort or filter segments by creation date. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this segment was last modified. Use to detect whether cached segment data needs to be refreshed. e.g. `2016-08-30T18:11:43Z`
- `wbs_pattern_id`: integer - ID of the WBS Pattern this segment belongs to. Use to correlate this segment with its parent pattern returned by GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/patterns. e.g. `4567`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{id}

**Show Company WBS Segment**
Show a company level segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique integer ID of the WBS Segment to operate on. Retrieve valid IDs from the segments[].id field in the list endpoint response.
- `segment_item_list_id` [query] integer - ID of the Segment Item List to scope the show response to. When provided the response includes list-specific metadata for the segment. Retrieve valid IDs from GET /rest/v1.0/companies/{company_id}/work_breakdown_struc...
- `include[]` [query] array of string enum[action_policy] - Optional sideloads to include in the segment object. Valid values: 'action_policy' (adds the action_policy object with permitted actions for the current user).
- `include_action_policy` [query] boolean - Convenience flag equivalent to passing include[]=action_policy. When true, the segment includes an action_policy object describing permitted actions for the current user.

Response 200 (application/json): object

- `id`: integer - Unique integer identifier for this WBS Segment. Use as the {id} path parameter in GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{id}. e.g. `12345`
- `type`: string enum[sub_job, cost_code, line_item_type, custom, attribute] - The segment type. One of: 'sub_job' (sub-job dimension), 'cost_code' (cost code dimension), 'line_item_type' (line item type dimension), 'custom' (user-defined custom segment), 'attribute' (attribute dimension). Only ... e.g. `custom`
- `name`: string - Localized display name of this WBS Segment shown in the UI (e.g. "Cost Code", "Phase"). Corresponds to the i18n label, not the internal segment_type value. e.g. `Phase`
- `position`: integer - Ordinal position of this segment within the project WBS pattern. Lower values appear first. Use to determine column order in budget code displays. e.g. `1`
- `segment_items_count`: integer - Total number of segment items belonging to this segment. Null when the count has not been computed. Use to gauge whether a segment has been populated before attempting to list segment items. e.g. `200`
- `required`: boolean - Whether this segment must have a value assigned when creating a WBS Code. When true, budget codes cannot be created without selecting an item from this segment. e.g. `true`
- `delimiter`: string - Character that separates this segment's value from the next segment's value in a formatted WBS code string (e.g. '.' produces "01.02"). e.g. `.`
- `project_can_modify_origin_project`: boolean - Whether project-specific segment items can be added, edited, or removed from a project. When true, project admins may manage items in this segment independently of the company list. e.g. `true`
- `project_can_delete_origin_company`: boolean - Whether segment items inherited from the company level can be deleted from a project. When true, project admins may remove company-defined items from the project's visible list. e.g. `true`
- `structure`: string enum[tiered, flat] - Hierarchy structure of this segment. 'tiered' means items can have parent-child relationships forming a multi-level tree; 'flat' means all items are at a single level with no hierarchy. e.g. `tiered`
- `tier_depth`: integer - Present only when include[]=tier_depth is requested (list endpoints only). Flat segments (sub_job, line_item_type) return 1; tiered segments return the number of levels. Omitted (not null) when not requested. e.g. `3`
- `selectable_tiers`: boolean - Whether non-leaf segment items can be selected in the Budget Code picker. Only relevant for tiered segments; when true, intermediate parent nodes are selectable, not just leaf nodes. e.g. `true`
- `is_included_in_project_pattern`: boolean - Whether this segment is included in the project's WBS pattern. When false the segment exists at the company level but is not active for this project. e.g. `true`
- `tiered`: boolean - Convenience boolean indicating whether this segment's structure is tiered. True when structure == 'tiered', false when structure == 'flat'. Equivalent to checking structure directly. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this segment was created. Use to sort or filter segments by creation date. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this segment was last modified. Use to detect whether cached segment data needs to be refreshed. e.g. `2016-08-30T18:11:43Z`
- `wbs_pattern_id`: integer - ID of the WBS Pattern this segment belongs to. Use to correlate this segment with its parent pattern returned by GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns. e.g. `4567`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{id}

**Update Company WBS Segment**
Update company level WBS Segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique integer ID of the WBS Segment to operate on. Retrieve valid IDs from the segments[].id field in the list endpoint response.
- `segment_item_list_id` [query] integer - ID of the Segment Item List to scope the show response to. When provided the response includes list-specific metadata for the segment. Retrieve valid IDs from GET /rest/v1.0/companies/{company_id}/work_breakdown_struc...
- `include[]` [query] array of string enum[action_policy] - Optional sideloads to include in the segment object. Valid values: 'action_policy' (adds the action_policy object with permitted actions for the current user).
- `include_action_policy` [query] boolean - Convenience flag equivalent to passing include[]=action_policy. When true, the segment includes an action_policy object describing permitted actions for the current user.

Request body (application/json) (required):

- `segment`: object (required)
  - `name`: string - Human-readable display name for this segment (e.g. "Phase", "Sub-Job"). Shown in budget code pickers and column headers. e.g. `Phase`
  - `project_can_modify_origin_project`: boolean - Whether project-specific Segment Items are able to be added/edited/removed from a Project. e.g. `true`
  - `project_can_delete_origin_company`: boolean - Whether Segment Items inherited from the company-level are able to be deleted from a Project. e.g. `true`
  - `required`: boolean - Whether this segment must have a value assigned when creating a WBS Code. Only settable by users with permission to mark segments as required. e.g. `false`

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/work_breakdown_structure/segments/{id}

**Delete WBS Segment**
Delete WBS Segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - Unique integer ID of the WBS Segment to operate on. Retrieve valid IDs from the segments[].id field in the list endpoint response.
- `segment_item_list_id` [query] integer - ID of the Segment Item List to scope the show response to. When provided the response includes list-specific metadata for the segment. Retrieve valid IDs from GET /rest/v1.0/companies/{company_id}/work_breakdown_struc...
- `include[]` [query] array of string enum[action_policy] - Optional sideloads to include in the segment object. Valid values: 'action_policy' (adds the action_policy object with permitted actions for the current user).
- `include_action_policy` [query] boolean - Convenience flag equivalent to passing include[]=action_policy. When true, the segment includes an action_policy object describing permitted actions for the current user.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments

**List Project WBS Segments**
All Segments for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `include[]` [query] array of string enum[tier_depth, action_policy] - Optional sideloads to include in each segment object. Valid values: 'tier_depth' (adds the tier_depth integer field), 'action_policy' (adds the action_policy object with permitted actions for the current user).
- `include_action_policy` [query] boolean - Convenience flag equivalent to passing include[]=action_policy. When true, each segment includes an action_policy object describing permitted actions for the current user.

Response 200 (application/json): array of object

- `id`: integer - Unique integer identifier for this WBS Segment. Use as the {id} path parameter in GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{id}. e.g. `12345`
- `type`: string enum[sub_job, cost_code, line_item_type, custom, attribute] - The segment type. One of: 'sub_job' (sub-job dimension), 'cost_code' (cost code dimension), 'line_item_type' (line item type dimension), 'custom' (user-defined custom segment), 'attribute' (attribute dimension). Only ... e.g. `custom`
- `name`: string - Localized display name of this WBS Segment shown in the UI (e.g. "Cost Code", "Phase"). Corresponds to the i18n label, not the internal segment_type value. e.g. `Phase`
- `position`: integer - Ordinal position of this segment within the project WBS pattern. Lower values appear first. Use to determine column order in budget code displays. e.g. `1`
- `segment_items_count`: integer - Total number of segment items belonging to this segment. Null when the count has not been computed. Use to gauge whether a segment has been populated before attempting to list segment items. e.g. `200`
- `required`: boolean - Whether this segment must have a value assigned when creating a WBS Code. When true, budget codes cannot be created without selecting an item from this segment. e.g. `true`
- `delimiter`: string - Character that separates this segment's value from the next segment's value in a formatted WBS code string (e.g. '.' produces "01.02"). e.g. `.`
- `project_can_modify_origin_project`: boolean - Whether project-specific segment items can be added, edited, or removed from a project. When true, project admins may manage items in this segment independently of the company list. e.g. `true`
- `project_can_delete_origin_company`: boolean - Whether segment items inherited from the company level can be deleted from a project. When true, project admins may remove company-defined items from the project's visible list. e.g. `true`
- `structure`: string enum[tiered, flat] - Hierarchy structure of this segment. 'tiered' means items can have parent-child relationships forming a multi-level tree; 'flat' means all items are at a single level with no hierarchy. e.g. `tiered`
- `tier_depth`: integer - Present only when include[]=tier_depth is requested (list endpoints only). Flat segments (sub_job, line_item_type) return 1; tiered segments return the number of levels. Omitted (not null) when not requested. e.g. `3`
- `selectable_tiers`: boolean - Whether non-leaf segment items can be selected in the Budget Code picker. Only relevant for tiered segments; when true, intermediate parent nodes are selectable, not just leaf nodes. e.g. `true`
- `is_included_in_project_pattern`: boolean - Whether this segment is included in the project's WBS pattern. When false the segment exists at the company level but is not active for this project. e.g. `true`
- `tiered`: boolean - Convenience boolean indicating whether this segment's structure is tiered. True when structure == 'tiered', false when structure == 'flat'. Equivalent to checking structure directly. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this segment was created. Use to sort or filter segments by creation date. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this segment was last modified. Use to detect whether cached segment data needs to be refreshed. e.g. `2016-08-30T18:11:43Z`
- `wbs_pattern_id`: integer - ID of the WBS Pattern this segment belongs to. Use to correlate this segment with its parent pattern returned by GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns. e.g. `4567`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{id}

**Show Project WBS Segment**
Show a project level segment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Unique integer ID of the WBS Segment to operate on. Retrieve valid IDs from the segments[].id field in the list endpoint response.
- `legacy_sub_job_id` [query] integer - Legacy sub-job integer ID used to scope the segment response to a specific sub-job context. Pass when querying segments on projects that use sub-jobs.
- `include[]` [query] array of string enum[action_policy] - Optional sideloads to include in the segment object. Valid values: 'action_policy' (adds the action_policy object with permitted actions for the current user).
- `include_action_policy` [query] boolean - Convenience flag equivalent to passing include[]=action_policy. When true, the segment includes an action_policy object describing permitted actions for the current user.

Response 200 (application/json): object

- `id`: integer - Unique integer identifier for this WBS Segment. Use as the {id} path parameter in GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/segments/{id}. e.g. `12345`
- `type`: string enum[sub_job, cost_code, line_item_type, custom, attribute] - The segment type. One of: 'sub_job' (sub-job dimension), 'cost_code' (cost code dimension), 'line_item_type' (line item type dimension), 'custom' (user-defined custom segment), 'attribute' (attribute dimension). Only ... e.g. `custom`
- `name`: string - Localized display name of this WBS Segment shown in the UI (e.g. "Cost Code", "Phase"). Corresponds to the i18n label, not the internal segment_type value. e.g. `Phase`
- `position`: integer - Ordinal position of this segment within the project WBS pattern. Lower values appear first. Use to determine column order in budget code displays. e.g. `1`
- `segment_items_count`: integer - Total number of segment items belonging to this segment. Null when the count has not been computed. Use to gauge whether a segment has been populated before attempting to list segment items. e.g. `200`
- `required`: boolean - Whether this segment must have a value assigned when creating a WBS Code. When true, budget codes cannot be created without selecting an item from this segment. e.g. `true`
- `delimiter`: string - Character that separates this segment's value from the next segment's value in a formatted WBS code string (e.g. '.' produces "01.02"). e.g. `.`
- `project_can_modify_origin_project`: boolean - Whether project-specific segment items can be added, edited, or removed from a project. When true, project admins may manage items in this segment independently of the company list. e.g. `true`
- `project_can_delete_origin_company`: boolean - Whether segment items inherited from the company level can be deleted from a project. When true, project admins may remove company-defined items from the project's visible list. e.g. `true`
- `structure`: string enum[tiered, flat] - Hierarchy structure of this segment. 'tiered' means items can have parent-child relationships forming a multi-level tree; 'flat' means all items are at a single level with no hierarchy. e.g. `tiered`
- `tier_depth`: integer - Present only when include[]=tier_depth is requested (list endpoints only). Flat segments (sub_job, line_item_type) return 1; tiered segments return the number of levels. Omitted (not null) when not requested. e.g. `3`
- `selectable_tiers`: boolean - Whether non-leaf segment items can be selected in the Budget Code picker. Only relevant for tiered segments; when true, intermediate parent nodes are selectable, not just leaf nodes. e.g. `true`
- `is_included_in_project_pattern`: boolean - Whether this segment is included in the project's WBS pattern. When false the segment exists at the company level but is not active for this project. e.g. `true`
- `tiered`: boolean - Convenience boolean indicating whether this segment's structure is tiered. True when structure == 'tiered', false when structure == 'flat'. Equivalent to checking structure directly. e.g. `true`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this segment was created. Use to sort or filter segments by creation date. e.g. `2016-06-30T20:41:58Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this segment was last modified. Use to detect whether cached segment data needs to be refreshed. e.g. `2016-08-30T18:11:43Z`
- `wbs_pattern_id`: integer - ID of the WBS Pattern this segment belongs to. Use to correlate this segment with its parent pattern returned by GET /rest/v1.0/projects/{project_id}/work_breakdown_structure/patterns. e.g. `4567`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Sub Jobs

Resource id: `sub-jobs`. Raw spec: `../openapi-raw/sub-jobs.json`. Web: https://developers.procore.com/reference/rest/sub-jobs?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/sub_jobs

**List Sub Jobs**
Return a list of all Sub Jobs in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `origin_id`: string - Third-party unique identifier assigned by an ERP or external integration system. Null when the sub job has not been synced with an external system. Use to correlate sub jobs with records in an integrated ERP. e.g. `ERP-SUB-001`
- `origin_code`: string - Third-party code assigned by an ERP or external integration system, distinct from origin_id. Null when the sub job has not been synced externally or when the integration does not use a separate code field. e.g. `SJ-CODE-42`
- `origin_data`: string - Arbitrary JSON string containing additional third-party data associated with this sub job by an external integration. Null when not synced externally. Parse as JSON to access individual fields. e.g. `{"data_field":{"is_important":true}}`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this sub job was created. Use to sort or filter sub jobs by creation date. e.g. `2017-08-14T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this sub job was last modified. Use to detect whether cached sub job data needs to be refreshed. e.g. `2017-08-15T21:39:40Z`
- `id`: integer - Unique integer identifier for this sub job. Use as the {id} path parameter in GET/PATCH/DELETE /rest/v1.0/sub_jobs/{id}. e.g. `3483483`
- `name`: string - Display name of the sub job shown in the UI and budget code pickers (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
- `code`: string - Short alphanumeric code identifying the sub job within the project. Unique per project (scoped to project_id). Null when no code has been assigned. Use as a compact identifier in budget code strings. e.g. `18`

Error responses: 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/sub_jobs

**Create Sub Job**
Create a new Sub Job.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `sub_job`: object (required)
  - `name`: string - Display name for the sub job shown in the UI and budget code pickers (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
  - `code`: string - Short alphanumeric code identifying the sub job within the project. Must be unique per project; omit or leave blank if no code is needed. e.g. `18`
  - `origin_id`: string - Third-party unique identifier from an ERP or external integration. Used to associate this sub job with a record in an integrated system.
  - `origin_data`: string - Arbitrary JSON string containing additional third-party data from an external integration. Store ERP-specific metadata here as a serialized JSON object. e.g. `{"data_field":{"is_important":true}}`

Response 201 (application/json): object

- `origin_id`: string - Third-party unique identifier assigned by an ERP or external integration system. Null when the sub job has not been synced with an external system. Use to correlate sub jobs with records in an integrated ERP. e.g. `ERP-SUB-001`
- `origin_code`: string - Third-party code assigned by an ERP or external integration system, distinct from origin_id. Null when the sub job has not been synced externally or when the integration does not use a separate code field. e.g. `SJ-CODE-42`
- `origin_data`: string - Arbitrary JSON string containing additional third-party data associated with this sub job by an external integration. Null when not synced externally. Parse as JSON to access individual fields. e.g. `{"data_field":{"is_important":true}}`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this sub job was created. Use to sort or filter sub jobs by creation date. e.g. `2017-08-14T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this sub job was last modified. Use to detect whether cached sub job data needs to be refreshed. e.g. `2017-08-15T21:39:40Z`
- `id`: integer - Unique integer identifier for this sub job. Use as the {id} path parameter in GET/PATCH/DELETE /rest/v1.0/sub_jobs/{id}. e.g. `3483483`
- `name`: string - Display name of the sub job shown in the UI and budget code pickers (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
- `code`: string - Short alphanumeric code identifying the sub job within the project. Unique per project (scoped to project_id). Null when no code has been assigned. Use as a compact identifier in budget code strings. e.g. `18`

Error responses: 400, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/sub_jobs/{id}

**Show Sub Job**
Return a specified Sub Jobs in a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique integer ID of the sub job to operate on. Retrieve valid IDs from the id field in GET /rest/v1.0/sub_jobs responses.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200 (application/json): object

- `origin_id`: string - Third-party unique identifier assigned by an ERP or external integration system. Null when the sub job has not been synced with an external system. Use to correlate sub jobs with records in an integrated ERP. e.g. `ERP-SUB-001`
- `origin_code`: string - Third-party code assigned by an ERP or external integration system, distinct from origin_id. Null when the sub job has not been synced externally or when the integration does not use a separate code field. e.g. `SJ-CODE-42`
- `origin_data`: string - Arbitrary JSON string containing additional third-party data associated with this sub job by an external integration. Null when not synced externally. Parse as JSON to access individual fields. e.g. `{"data_field":{"is_important":true}}`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this sub job was created. Use to sort or filter sub jobs by creation date. e.g. `2017-08-14T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this sub job was last modified. Use to detect whether cached sub job data needs to be refreshed. e.g. `2017-08-15T21:39:40Z`
- `id`: integer - Unique integer identifier for this sub job. Use as the {id} path parameter in GET/PATCH/DELETE /rest/v1.0/sub_jobs/{id}. e.g. `3483483`
- `name`: string - Display name of the sub job shown in the UI and budget code pickers (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
- `code`: string - Short alphanumeric code identifying the sub job within the project. Unique per project (scoped to project_id). Null when no code has been assigned. Use as a compact identifier in budget code strings. e.g. `18`

### PATCH /rest/v1.0/sub_jobs/{id}

**Update Sub Job**
Update a specified Sub Job.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique integer ID of the sub job to operate on. Retrieve valid IDs from the id field in GET /rest/v1.0/sub_jobs responses.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `sub_job`: object (required)
  - `name`: string - Display name for the sub job shown in the UI and budget code pickers (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
  - `code`: string - Short alphanumeric code identifying the sub job within the project. Must be unique per project; omit or leave blank if no code is needed. e.g. `18`
  - `origin_id`: string - Third-party unique identifier from an ERP or external integration. Used to associate this sub job with a record in an integrated system.
  - `origin_data`: string - Arbitrary JSON string containing additional third-party data from an external integration. Store ERP-specific metadata here as a serialized JSON object. e.g. `{"data_field":{"is_important":true}}`

Response 200 (application/json): object

- `origin_id`: string - Third-party unique identifier assigned by an ERP or external integration system. Null when the sub job has not been synced with an external system. Use to correlate sub jobs with records in an integrated ERP. e.g. `ERP-SUB-001`
- `origin_code`: string - Third-party code assigned by an ERP or external integration system, distinct from origin_id. Null when the sub job has not been synced externally or when the integration does not use a separate code field. e.g. `SJ-CODE-42`
- `origin_data`: string - Arbitrary JSON string containing additional third-party data associated with this sub job by an external integration. Null when not synced externally. Parse as JSON to access individual fields. e.g. `{"data_field":{"is_important":true}}`
- `created_at`: string(date-time) - ISO 8601 timestamp of when this sub job was created. Use to sort or filter sub jobs by creation date. e.g. `2017-08-14T21:39:40Z`
- `updated_at`: string(date-time) - ISO 8601 timestamp of when this sub job was last modified. Use to detect whether cached sub job data needs to be refreshed. e.g. `2017-08-15T21:39:40Z`
- `id`: integer - Unique integer identifier for this sub job. Use as the {id} path parameter in GET/PATCH/DELETE /rest/v1.0/sub_jobs/{id}. e.g. `3483483`
- `name`: string - Display name of the sub job shown in the UI and budget code pickers (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
- `code`: string - Short alphanumeric code identifying the sub job within the project. Unique per project (scoped to project_id). Null when no code has been assigned. Use as a compact identifier in budget code strings. e.g. `18`

### DELETE /rest/v1.0/sub_jobs/{id}  **[DEPRECATED]**

**Delete Sub Job**
Delete a specified Sub Job.
Deprecation Note: Please find the replacement endpoint in the Work Breakdown Structure documents. This endpoint will be replaced with the Delete Project Segment Item Endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Unique integer ID of the sub job to operate on. Retrieve valid IDs from the id field in GET /rest/v1.0/sub_jobs responses.
- `project_id` [query] integer (required) - Unique identifier for the project.

Response 200: OK (no body)

### PATCH /rest/v1.0/sub_jobs/sync

**Sync Sub Jobs**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - Procore integer ID of the sub job to update. Use the id field from GET /rest/v1.0/sub_jobs. Omit to create a new sub job during sync. e.g. `13513`
  - `name`: string - Display name for the sub job (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
  - `code`: string - Short alphanumeric code for the sub job, unique within the project. e.g. `18`
  - `origin_id`: string - Third-party unique identifier from an ERP or external integration used to match this sub job to an external record.
  - `origin_data`: string - Arbitrary JSON string containing additional third-party data from an external integration. e.g. `{"data_field":{"is_important":true}}`

Response 200 (application/json): object

- `entities`: array of object - Array of sub job objects that were successfully created or updated during the sync. Each object conforms to the sub_job schema.
  - `origin_id`: string - Third-party unique identifier assigned by an ERP or external integration system. Null when the sub job has not been synced with an external system. Use to correlate sub jobs with records in an integrated ERP. e.g. `ERP-SUB-001`
  - `origin_code`: string - Third-party code assigned by an ERP or external integration system, distinct from origin_id. Null when the sub job has not been synced externally or when the integration does not use a separate code field. e.g. `SJ-CODE-42`
  - `origin_data`: string - Arbitrary JSON string containing additional third-party data associated with this sub job by an external integration. Null when not synced externally. Parse as JSON to access individual fields. e.g. `{"data_field":{"is_important":true}}`
  - `created_at`: string(date-time) - ISO 8601 timestamp of when this sub job was created. Use to sort or filter sub jobs by creation date. e.g. `2017-08-14T21:39:40Z`
  - `updated_at`: string(date-time) - ISO 8601 timestamp of when this sub job was last modified. Use to detect whether cached sub job data needs to be refreshed. e.g. `2017-08-15T21:39:40Z`
  - `id`: integer - Unique integer identifier for this sub job. Use as the {id} path parameter in GET/PATCH/DELETE /rest/v1.0/sub_jobs/{id}. e.g. `3483483`
  - `name`: string - Display name of the sub job shown in the UI and budget code pickers (e.g. "Floor 2", "Phase 1 - Foundation"). e.g. `Floor 2`
  - `code`: string - Short alphanumeric code identifying the sub job within the project. Unique per project (scoped to project_id). Null when no code has been assigned. Use as a compact identifier in budget code strings. e.g. `18`
- `errors`: array of object - Array of error objects for sub jobs that failed to sync. Each object contains the sub job id, and an errors map keyed by attribute name listing validation messages. e.g. `[{"id": 3, "errors": {"id": ["Entity with this ID not found"]}}]`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

