# Procore API: Estimating (Preconstruction)

Source: https://developers.procore.com/reference/rest/ (tool category: Estimating)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Estimating Project Line Item Groups](#estimating-project-line-item-groups) - versions 2.0
- [Estimating Project Line Items](#estimating-project-line-items) - versions 2.0
- [Estimating Project Notes](#estimating-project-notes) - versions 2.0
- [Estimating Project Project Tasks](#estimating-project-project-tasks) - versions 2.0
- [Estimating Project Proposals](#estimating-project-proposals) - versions 2.0
- [Estimating Projects](#estimating-projects) - versions 2.0
- [Estimating Settings](#estimating-settings) - versions 2.0

## Estimating Project Line Item Groups

Resource id: `estimating-project-line-item-groups`. Raw spec: `../openapi-raw/estimating-project-line-item-groups.json`. Web: https://developers.procore.com/reference/rest/estimating-project-line-item-groups?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_item_groups/{line_item_group_id}  **[BETA]**

**Retrieve a line item group by Id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_group_id` [path] string(int64) (required) - Line Item Group Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: object
  - `multiplier`: number(decimal)
  - `name`: string (required)
  - `pricing_override`: object
    - `unit_material_cost`: number(decimal)
    - `material_margin`: number(decimal)
    - `unit_labor`: number(decimal)
    - `labor_factor`: number(decimal)
    - `unit_labor_rate`: number(decimal)
    - `unit_labor_cost`: number(decimal)
    - `is_untaxed`: boolean
    - `labor_margin`: number(decimal)
  - `notes`: string
  - `id`: string
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item group was last updated. e.g. `2026-03-25T13:25:00Z`

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_item_groups/{line_item_group_id}  **[BETA]**

**Update a line item group of the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_group_id` [path] string(int64) (required) - Line Item Group Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `multiplier`: number
- `name`: string
- `pricing_override`: object
  - `unit_material_cost`: number(decimal)
  - `material_margin`: number(decimal)
  - `unit_labor`: number(decimal)
  - `labor_factor`: number(decimal)
  - `unit_labor_rate`: number(decimal)
  - `unit_labor_cost`: number(decimal)
  - `is_untaxed`: boolean
  - `labor_margin`: number(decimal)
- `notes`: string

Response 200 (application/json): object

- `data`: object
  - `multiplier`: number(decimal)
  - `name`: string (required)
  - `pricing_override`: object
    - `unit_material_cost`: number(decimal)
    - `material_margin`: number(decimal)
    - `unit_labor`: number(decimal)
    - `labor_factor`: number(decimal)
    - `unit_labor_rate`: number(decimal)
    - `unit_labor_cost`: number(decimal)
    - `is_untaxed`: boolean
    - `labor_margin`: number(decimal)
  - `notes`: string
  - `id`: string
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item group was last updated. e.g. `2026-03-25T13:25:00Z`

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_item_groups/{line_item_group_id}  **[BETA]**

**Delete a line item group from the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_group_id` [path] string(int64) (required) - Line Item Group Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200:  (no body)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_item_groups  **[BETA]**

**Retrieve all line item groups of a proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: array of object (required)
  - `multiplier`: number(decimal)
  - `name`: string (required)
  - `pricing_override`: object
    - `unit_material_cost`: number(decimal)
    - `material_margin`: number(decimal)
    - `unit_labor`: number(decimal)
    - `labor_factor`: number(decimal)
    - `unit_labor_rate`: number(decimal)
    - `unit_labor_cost`: number(decimal)
    - `is_untaxed`: boolean
    - `labor_margin`: number(decimal)
  - `notes`: string
  - `id`: string
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item group was last updated. e.g. `2026-03-25T13:25:00Z`

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_item_groups  **[BETA]**

**Create a line item group in the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `multiplier`: number(decimal)
- `name`: string (required)
- `pricing_override`: object
  - `unit_material_cost`: number(decimal)
  - `material_margin`: number(decimal)
  - `unit_labor`: number(decimal)
  - `labor_factor`: number(decimal)
  - `unit_labor_rate`: number(decimal)
  - `unit_labor_cost`: number(decimal)
  - `is_untaxed`: boolean
  - `labor_margin`: number(decimal)
- `notes`: string

Response 200 (application/json): object

- `data`: object
  - `multiplier`: number(decimal)
  - `name`: string (required)
  - `pricing_override`: object
    - `unit_material_cost`: number(decimal)
    - `material_margin`: number(decimal)
    - `unit_labor`: number(decimal)
    - `labor_factor`: number(decimal)
    - `unit_labor_rate`: number(decimal)
    - `unit_labor_cost`: number(decimal)
    - `is_untaxed`: boolean
    - `labor_margin`: number(decimal)
  - `notes`: string
  - `id`: string
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item group was last updated. e.g. `2026-03-25T13:25:00Z`

## Estimating Project Line Items

Resource id: `estimating-project-line-items`. Raw spec: `../openapi-raw/estimating-project-line-items.json`. Web: https://developers.procore.com/reference/rest/estimating-project-line-items?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_items  **[BETA]**

**Retrieve all line items of a proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: array of object (required)
  - `name`: string - Display name of the line item.
  - `group_id`: string - Line item group ID. Omit or leave empty to use the default group.
  - `cost_item`: object - Cost item associated with the line item. Provide custom pricing or omit to use a generic cost item based on type. When provided, the entire cost item is replaced (no partial updates). At least one of `cost_item.unit` ...
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost item category.
    - `name`: string - Display name of the cost item.
    - `description`: string - Description of the cost item.
    - `unit_cost`: number(decimal) - Unit material cost.
    - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
    - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
    - `unit_labor_cost`: number(decimal) - Unit labor cost.
    - `manufacturer`: string - Manufacturer of the item.
    - `catalog_number`: string - Catalog or product number.
    - `url`: string - URL to product or specification.
    - `supplier`: string - Supplier or vendor name.
    - `waste`: number(decimal) - Waste percentage.
    - `material_waste`: number(decimal) - Material waste percentage.
    - `item_margin`: number(decimal) - Item margin percentage.
    - `labor_margin`: number(decimal) - Labor margin percentage.
    - `unit_labor_rate`: number(decimal) - Labor rate per unit.
    - `is_untaxed`: boolean - Whether the item is excluded from tax.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
    - `notes`: string - Notes.
    - `id`: string - Catalog item ID to link to an existing cost item. Omit or leave empty to create a new custom cost item from the provided fields.
    - `color`: string - Display color. Example: "#00ecff".
    - `symbol_id`: string - Symbol ID for takeoff. Built-in: circle, square, empty. Custom: numeric document ID string.
    - `delivery_unit`: integer(int32) - Delivery unit quantity.
    - `catalog_id`: string - Catalog folder ID.
    - `parts`: array of object - Sub-items (parts) of an assembly cost item. Empty for non-assembly cost items. On create, replaces the parts list copied from any referenced catalog item. Only valid when `type` is `Assembly` — providing parts with an...
  - `labor_factor`: number(decimal) - Labor difficulty factor applied to the cost item.
  - `quantity`: number(decimal) - Quantity from the estimating table (manual entry). Updated when using estimating or takeoff tab.
  - `tag`: string - Optional tag for filtering or grouping.
  - `id`: string - Line item ID.
  - `type`: string enum[UNKNOWN, COUNT, DESIGN, LINEAR, LINEAR_WITH_DROP, LINEAR_AVG_WITH_DROP, LINEAR_EACH, AREA, VERTICAL_AREA, NONE] - How the line item quantity is measured (count, linear, area, etc.). e.g. `COUNT`
  - `takeoff_quantity`: number(decimal) - Quantity measured in the takeoff tab (2D drawing and 3D model measurements combined). Read-only.
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item was last updated. e.g. `2026-03-25T13:25:00Z`

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_items  **[BETA]**

**Create an estimate line item in the proposal**
Provide either `type` (e.g. `LINEAR`, `AREA`) or `cost_item.unit` (e.g. `FT`, `SQ_FT`); the other is inferred from what you supply.
If both are provided, they must be compatible or the request is rejected with 400.
            
Compatibility:
            
| `cost_item.unit`                              | Compatible `type`                                        |
|-----------------------------------------------|----------------------------------------------------------|
| `EA`, `MINUTES`, `HOURS`, `DAYS`, `WEEKS`, `MONTHS` | `COUNT`, `LINEAR_EACH`, `DESIGN`, `NONE`           |
| `LB`, `TON`, `GAL`                            | `COUNT`                                                  |
| `FT`, `YD`                                    | `LINEAR`, `LINEAR_WITH_DROP`, `LINEAR_AVG_WITH_DROP`, `LINEAR_EACH` |
| `SQ_FT`, `SQ_YD`, `SQUARE`, `CU_FT`, `CU_YD`  | `AREA`, `VERTICAL_AREA`                                  |
| `LUMP_SUM`                                    | `NONE`, `COUNT`                                          |

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `name`: string - Display name of the line item.
- `group_id`: string - Line item group ID. Omit or leave empty to use the default group.
- `cost_item`: object - Cost item associated with the line item. Provide custom pricing or omit to use a generic cost item based on type. When provided, the entire cost item is replaced (no partial updates). At least one of `cost_item.unit` ...
  - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost item category.
  - `name`: string - Display name of the cost item.
  - `description`: string - Description of the cost item.
  - `unit_cost`: number(decimal) - Unit material cost.
  - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
  - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
  - `unit_labor_cost`: number(decimal) - Unit labor cost.
  - `manufacturer`: string - Manufacturer of the item.
  - `catalog_number`: string - Catalog or product number.
  - `url`: string - URL to product or specification.
  - `supplier`: string - Supplier or vendor name.
  - `waste`: number(decimal) - Waste percentage.
  - `material_waste`: number(decimal) - Material waste percentage.
  - `item_margin`: number(decimal) - Item margin percentage.
  - `labor_margin`: number(decimal) - Labor margin percentage.
  - `unit_labor_rate`: number(decimal) - Labor rate per unit.
  - `is_untaxed`: boolean - Whether the item is excluded from tax.
  - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
  - `notes`: string - Notes.
  - `id`: string - Catalog item ID to link to an existing cost item. Omit or leave empty to create a new custom cost item from the provided fields.
  - `color`: string - Display color. Example: "#00ecff".
  - `symbol_id`: string - Symbol ID for takeoff. Built-in: circle, square, empty. Custom: numeric document ID string.
  - `delivery_unit`: integer(int32) - Delivery unit quantity.
  - `catalog_id`: string - Catalog folder ID.
  - `parts`: array of object - Sub-items (parts) of an assembly cost item. Empty for non-assembly cost items. On create, replaces the parts list copied from any referenced catalog item. Only valid when `type` is `Assembly` — providing parts with an...
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost item category.
    - `name`: string - Display name of the cost item.
    - `description`: string - Description of the cost item.
    - `unit_cost`: number(decimal) - Unit material cost.
    - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
    - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
    - `unit_labor_cost`: number(decimal) - Unit labor cost.
    - `manufacturer`: string - Manufacturer of the item.
    - `catalog_number`: string - Catalog or product number.
    - `url`: string - URL to product or specification.
    - `supplier`: string - Supplier or vendor name.
    - `waste`: number(decimal) - Waste percentage.
    - `material_waste`: number(decimal) - Material waste percentage.
    - `item_margin`: number(decimal) - Item margin percentage.
    - `labor_margin`: number(decimal) - Labor margin percentage.
    - `unit_labor_rate`: number(decimal) - Labor rate per unit.
    - `is_untaxed`: boolean - Whether the item is excluded from tax.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
    - `notes`: string - Notes.
    - `multiplier`: number(decimal) - Quantity multiplier for this sub-item.
    - `multiplier_string`: string - Formula string for dynamic multiplier.
    - `dynamic_type`: string - Dynamic type for formula-based multipliers.
- `labor_factor`: number(decimal) - Labor difficulty factor applied to the cost item.
- `quantity`: number(decimal) - Quantity from the estimating table (manual entry). Updated when using estimating or takeoff tab.
- `tag`: string - Optional tag for filtering or grouping.
- `type`: string enum[UNKNOWN, COUNT, DESIGN, LINEAR, LINEAR_WITH_DROP, LINEAR_AVG_WITH_DROP, LINEAR_EACH, AREA, VERTICAL_AREA, NONE] - How the line item quantity is measured (count, linear, area, etc.). At least one of `type` or `cost_item.unit` must be provided; the other is inferred when omitted. If both are provided, they must be compatible (see e... e.g. `COUNT`

Response 200 (application/json): object

- `data`: object - Line item response model.
  - `name`: string - Display name of the line item.
  - `group_id`: string - Line item group ID. Omit or leave empty to use the default group.
  - `cost_item`: object - Cost item associated with the line item. Provide custom pricing or omit to use a generic cost item based on type. When provided, the entire cost item is replaced (no partial updates). At least one of `cost_item.unit` ...
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost item category.
    - `name`: string - Display name of the cost item.
    - `description`: string - Description of the cost item.
    - `unit_cost`: number(decimal) - Unit material cost.
    - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
    - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
    - `unit_labor_cost`: number(decimal) - Unit labor cost.
    - `manufacturer`: string - Manufacturer of the item.
    - `catalog_number`: string - Catalog or product number.
    - `url`: string - URL to product or specification.
    - `supplier`: string - Supplier or vendor name.
    - `waste`: number(decimal) - Waste percentage.
    - `material_waste`: number(decimal) - Material waste percentage.
    - `item_margin`: number(decimal) - Item margin percentage.
    - `labor_margin`: number(decimal) - Labor margin percentage.
    - `unit_labor_rate`: number(decimal) - Labor rate per unit.
    - `is_untaxed`: boolean - Whether the item is excluded from tax.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
    - `notes`: string - Notes.
    - `id`: string - Catalog item ID to link to an existing cost item. Omit or leave empty to create a new custom cost item from the provided fields.
    - `color`: string - Display color. Example: "#00ecff".
    - `symbol_id`: string - Symbol ID for takeoff. Built-in: circle, square, empty. Custom: numeric document ID string.
    - `delivery_unit`: integer(int32) - Delivery unit quantity.
    - `catalog_id`: string - Catalog folder ID.
    - `parts`: array of object - Sub-items (parts) of an assembly cost item. Empty for non-assembly cost items. On create, replaces the parts list copied from any referenced catalog item. Only valid when `type` is `Assembly` — providing parts with an...
  - `labor_factor`: number(decimal) - Labor difficulty factor applied to the cost item.
  - `quantity`: number(decimal) - Quantity from the estimating table (manual entry). Updated when using estimating or takeoff tab.
  - `tag`: string - Optional tag for filtering or grouping.
  - `id`: string - Line item ID.
  - `type`: string enum[UNKNOWN, COUNT, DESIGN, LINEAR, LINEAR_WITH_DROP, LINEAR_AVG_WITH_DROP, LINEAR_EACH, AREA, VERTICAL_AREA, NONE] - How the line item quantity is measured (count, linear, area, etc.). e.g. `COUNT`
  - `takeoff_quantity`: number(decimal) - Quantity measured in the takeoff tab (2D drawing and 3D model measurements combined). Read-only.
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item was last updated. e.g. `2026-03-25T13:25:00Z`

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_items/{line_item_id}  **[BETA]**

**Retrieve a line item by Id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_id` [path] string(int64) (required) - Line Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: object - Line item response model.
  - `name`: string - Display name of the line item.
  - `group_id`: string - Line item group ID. Omit or leave empty to use the default group.
  - `cost_item`: object - Cost item associated with the line item. Provide custom pricing or omit to use a generic cost item based on type. When provided, the entire cost item is replaced (no partial updates). At least one of `cost_item.unit` ...
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost item category.
    - `name`: string - Display name of the cost item.
    - `description`: string - Description of the cost item.
    - `unit_cost`: number(decimal) - Unit material cost.
    - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
    - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
    - `unit_labor_cost`: number(decimal) - Unit labor cost.
    - `manufacturer`: string - Manufacturer of the item.
    - `catalog_number`: string - Catalog or product number.
    - `url`: string - URL to product or specification.
    - `supplier`: string - Supplier or vendor name.
    - `waste`: number(decimal) - Waste percentage.
    - `material_waste`: number(decimal) - Material waste percentage.
    - `item_margin`: number(decimal) - Item margin percentage.
    - `labor_margin`: number(decimal) - Labor margin percentage.
    - `unit_labor_rate`: number(decimal) - Labor rate per unit.
    - `is_untaxed`: boolean - Whether the item is excluded from tax.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
    - `notes`: string - Notes.
    - `id`: string - Catalog item ID to link to an existing cost item. Omit or leave empty to create a new custom cost item from the provided fields.
    - `color`: string - Display color. Example: "#00ecff".
    - `symbol_id`: string - Symbol ID for takeoff. Built-in: circle, square, empty. Custom: numeric document ID string.
    - `delivery_unit`: integer(int32) - Delivery unit quantity.
    - `catalog_id`: string - Catalog folder ID.
    - `parts`: array of object - Sub-items (parts) of an assembly cost item. Empty for non-assembly cost items. On create, replaces the parts list copied from any referenced catalog item. Only valid when `type` is `Assembly` — providing parts with an...
  - `labor_factor`: number(decimal) - Labor difficulty factor applied to the cost item.
  - `quantity`: number(decimal) - Quantity from the estimating table (manual entry). Updated when using estimating or takeoff tab.
  - `tag`: string - Optional tag for filtering or grouping.
  - `id`: string - Line item ID.
  - `type`: string enum[UNKNOWN, COUNT, DESIGN, LINEAR, LINEAR_WITH_DROP, LINEAR_AVG_WITH_DROP, LINEAR_EACH, AREA, VERTICAL_AREA, NONE] - How the line item quantity is measured (count, linear, area, etc.). e.g. `COUNT`
  - `takeoff_quantity`: number(decimal) - Quantity measured in the takeoff tab (2D drawing and 3D model measurements combined). Read-only.
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item was last updated. e.g. `2026-03-25T13:25:00Z`

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_items/{line_item_id}  **[BETA]**

**Update an estimate line item of the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_id` [path] string(int64) (required) - Line Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `name`: string - Display name of the line item.
- `group_id`: string - Line item group ID.
- `cost_item`: object - Cost item fields to update. Only provided fields will be updated. Omit to leave unchanged. If the line item has no existing cost item, a new one will be created. Cost item cannot be removed.
  - `id`: string - Catalog item ID to link to an existing cost item. Omit or leave empty to create a new custom cost item from the provided fields.
  - `type`: string - Cost item category.
  - `name`: string - Display name of the cost item.
  - `description`: string - Description of the cost item.
  - `unit_cost`: number - Unit material cost.
  - `unit_labor`: number - Labor time per unit, in the unit specified by labor_time_unit.
  - `labor_time_unit`: string - Unit for labor time.
  - `unit_labor_cost`: number - Unit labor cost.
  - `manufacturer`: string - Manufacturer of the item.
  - `catalog_number`: string - Catalog or product number.
  - `url`: string - URL to product or specification.
  - `supplier`: string - Supplier or vendor name.
  - `waste`: number - Waste percentage.
  - `material_waste`: number - Material waste percentage.
  - `item_margin`: number - Item margin percentage.
  - `labor_margin`: number - Labor margin percentage.
  - `unit_labor_rate`: number - Labor rate per unit.
  - `is_untaxed`: boolean - Whether the item is excluded from tax.
  - `unit`: string - Unit of measurement.
  - `notes`: string - Notes.
  - `color`: string - Display color. Example: "#00ecff".
  - `symbol_id`: string - Symbol ID for takeoff. Built-in: circle, square, empty. Custom: numeric document ID string.
  - `delivery_unit`: integer - Delivery unit quantity.
  - `catalog_id`: string - Catalog folder ID.
  - `parts`: array of object - Sub-items (parts) of an assembly cost item. If provided, replaces the entire parts list. Omit to leave unchanged. When both `type` and a non-empty `parts` are provided, `type` must be `Assembly` or the request is reje...
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost item category.
    - `name`: string - Display name of the cost item.
    - `description`: string - Description of the cost item.
    - `unit_cost`: number(decimal) - Unit material cost.
    - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
    - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
    - `unit_labor_cost`: number(decimal) - Unit labor cost.
    - `manufacturer`: string - Manufacturer of the item.
    - `catalog_number`: string - Catalog or product number.
    - `url`: string - URL to product or specification.
    - `supplier`: string - Supplier or vendor name.
    - `waste`: number(decimal) - Waste percentage.
    - `material_waste`: number(decimal) - Material waste percentage.
    - `item_margin`: number(decimal) - Item margin percentage.
    - `labor_margin`: number(decimal) - Labor margin percentage.
    - `unit_labor_rate`: number(decimal) - Labor rate per unit.
    - `is_untaxed`: boolean - Whether the item is excluded from tax.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
    - `notes`: string - Notes.
    - `multiplier`: number(decimal) - Quantity multiplier for this sub-item.
    - `multiplier_string`: string - Formula string for dynamic multiplier.
    - `dynamic_type`: string - Dynamic type for formula-based multipliers.
- `labor_factor`: number - Labor difficulty factor applied to the cost item.
- `quantity`: number - Quantity from the estimating table (manual entry). Updated when using estimating or takeoff tab.
- `tag`: string - Optional tag for filtering or grouping.

Response 200 (application/json): object

- `data`: object - Line item response model.
  - `name`: string - Display name of the line item.
  - `group_id`: string - Line item group ID. Omit or leave empty to use the default group.
  - `cost_item`: object - Cost item associated with the line item. Provide custom pricing or omit to use a generic cost item based on type. When provided, the entire cost item is replaced (no partial updates). At least one of `cost_item.unit` ...
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost item category.
    - `name`: string - Display name of the cost item.
    - `description`: string - Description of the cost item.
    - `unit_cost`: number(decimal) - Unit material cost.
    - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
    - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
    - `unit_labor_cost`: number(decimal) - Unit labor cost.
    - `manufacturer`: string - Manufacturer of the item.
    - `catalog_number`: string - Catalog or product number.
    - `url`: string - URL to product or specification.
    - `supplier`: string - Supplier or vendor name.
    - `waste`: number(decimal) - Waste percentage.
    - `material_waste`: number(decimal) - Material waste percentage.
    - `item_margin`: number(decimal) - Item margin percentage.
    - `labor_margin`: number(decimal) - Labor margin percentage.
    - `unit_labor_rate`: number(decimal) - Labor rate per unit.
    - `is_untaxed`: boolean - Whether the item is excluded from tax.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
    - `notes`: string - Notes.
    - `id`: string - Catalog item ID to link to an existing cost item. Omit or leave empty to create a new custom cost item from the provided fields.
    - `color`: string - Display color. Example: "#00ecff".
    - `symbol_id`: string - Symbol ID for takeoff. Built-in: circle, square, empty. Custom: numeric document ID string.
    - `delivery_unit`: integer(int32) - Delivery unit quantity.
    - `catalog_id`: string - Catalog folder ID.
    - `parts`: array of object - Sub-items (parts) of an assembly cost item. Empty for non-assembly cost items. On create, replaces the parts list copied from any referenced catalog item. Only valid when `type` is `Assembly` — providing parts with an...
  - `labor_factor`: number(decimal) - Labor difficulty factor applied to the cost item.
  - `quantity`: number(decimal) - Quantity from the estimating table (manual entry). Updated when using estimating or takeoff tab.
  - `tag`: string - Optional tag for filtering or grouping.
  - `id`: string - Line item ID.
  - `type`: string enum[UNKNOWN, COUNT, DESIGN, LINEAR, LINEAR_WITH_DROP, LINEAR_AVG_WITH_DROP, LINEAR_EACH, AREA, VERTICAL_AREA, NONE] - How the line item quantity is measured (count, linear, area, etc.). e.g. `COUNT`
  - `takeoff_quantity`: number(decimal) - Quantity measured in the takeoff tab (2D drawing and 3D model measurements combined). Read-only.
  - `item_cost`: number(decimal) - Calculated item cost.
  - `item_sales`: number(decimal) - Calculated item sales.
  - `labor_cost`: number(decimal) - Calculated labor cost.
  - `labor_sales`: number(decimal) - Calculated labor sales.
  - `profit`: number(decimal) - Calculated profit.
  - `updated_at`: string(date-time) - The date and time when the line item was last updated. e.g. `2026-03-25T13:25:00Z`

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}/line_items/{line_item_id}  **[BETA]**

**Delete an estimate line item from the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_id` [path] string(int64) (required) - Line Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200:  (no body)

## Estimating Project Notes

Resource id: `estimating-project-notes`. Raw spec: `../openapi-raw/estimating-project-notes.json`. Web: https://developers.procore.com/reference/rest/estimating-project-notes?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/notes  **[BETA]**

**Retrieve all notes in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: array of object (required)
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/notes  **[BETA]**

**Create a note in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `value`: string (required) - The content of the note.

Response 200 (application/json): object

- `data`: object
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/notes/{note_id}  **[BETA]**

**Retrieve a note by Id in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `note_id` [path] string(int64) (required) - Note Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: object
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/notes/{note_id}  **[BETA]**

**Update a note of the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `note_id` [path] string(int64) (required) - Note Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `value`: string (required) - The content of the note.

Response 200 (application/json): object

- `data`: object
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/notes/{note_id}  **[BETA]**

**Delete a note from the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `note_id` [path] string(int64) (required) - Note Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/octet-stream): string(binary)


## Estimating Project Project Tasks

Resource id: `estimating-project-project-tasks`. Raw spec: `../openapi-raw/estimating-project-project-tasks.json`. Web: https://developers.procore.com/reference/rest/estimating-project-project-tasks?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/tasks  **[BETA]**

**Get project tasks**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string - The unique identifier of the task.
  - `value`: string - The description of the task.
  - `created_on`: string(date-time) - The date and time when the task was created.
  - `due_date`: string(date-time) - The due date of the task. e.g. `2027-01-22T16:40:00Z`
  - `assigned_to_user_id`: string - The identifier of the user to whom the task is assigned. For getting assigned_to_user_id look "company users" endpoint.
  - `completed_by_user_id`: string - The identifier of the user who completed the task.
  - `completed_on`: string(date-time) - The date and time when the task was completed.
  - `updated_at`: string(date-time) - The date and time when the task was last updated. e.g. `2026-03-25T13:25:00Z`

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/tasks  **[BETA]**

**Create project task**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `value`: string (required) - The description of the task.
- `due_date`: string(date-time) - The due date of the task. e.g. `2027-01-22T16:40:00Z`
- `assigned_to_user_id`: string - The identifier of the user to whom the task is assigned. For getting assigned_to_user_id look "company users" endpoint.

Response 200 (application/json): object

- `data`: object - Represents a task within a bid board project.
  - `id`: string - The unique identifier of the task.
  - `value`: string - The description of the task.
  - `created_on`: string(date-time) - The date and time when the task was created.
  - `due_date`: string(date-time) - The due date of the task. e.g. `2027-01-22T16:40:00Z`
  - `assigned_to_user_id`: string - The identifier of the user to whom the task is assigned. For getting assigned_to_user_id look "company users" endpoint.
  - `completed_by_user_id`: string - The identifier of the user who completed the task.
  - `completed_on`: string(date-time) - The date and time when the task was completed.
  - `updated_at`: string(date-time) - The date and time when the task was last updated. e.g. `2026-03-25T13:25:00Z`

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/tasks/{task_id}  **[BETA]**

**Get project task by id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `task_id` [path] string(int64) (required) - Task Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: object - Represents a task within a bid board project.
  - `id`: string - The unique identifier of the task.
  - `value`: string - The description of the task.
  - `created_on`: string(date-time) - The date and time when the task was created.
  - `due_date`: string(date-time) - The due date of the task. e.g. `2027-01-22T16:40:00Z`
  - `assigned_to_user_id`: string - The identifier of the user to whom the task is assigned. For getting assigned_to_user_id look "company users" endpoint.
  - `completed_by_user_id`: string - The identifier of the user who completed the task.
  - `completed_on`: string(date-time) - The date and time when the task was completed.
  - `updated_at`: string(date-time) - The date and time when the task was last updated. e.g. `2026-03-25T13:25:00Z`

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/tasks/{task_id}  **[BETA]**

**Update project task**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `task_id` [path] string(int64) (required) - Task Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/merge-patch+json) (required):

- `value`: string - The updated description of the task.
- `due_date`: string - The updated due date of the task. e.g. `2027-01-22T16:40:00Z`
- `assigned_to_user_id`: string - The updated identifier of the user to whom the task is assigned. For getting assigned_to_user_id look "company users" endpoint.
- `completed`: boolean - Indicates whether the task is completed. This property is only used for updating completion status via patch request.

Response 200 (application/json): object

- `data`: object - Represents a task within a bid board project.
  - `id`: string - The unique identifier of the task.
  - `value`: string - The description of the task.
  - `created_on`: string(date-time) - The date and time when the task was created.
  - `due_date`: string(date-time) - The due date of the task. e.g. `2027-01-22T16:40:00Z`
  - `assigned_to_user_id`: string - The identifier of the user to whom the task is assigned. For getting assigned_to_user_id look "company users" endpoint.
  - `completed_by_user_id`: string - The identifier of the user who completed the task.
  - `completed_on`: string(date-time) - The date and time when the task was completed.
  - `updated_at`: string(date-time) - The date and time when the task was last updated. e.g. `2026-03-25T13:25:00Z`

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/tasks/{task_id}  **[BETA]**

**Delete project task**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `task_id` [path] string(int64) (required) - Task Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200:  (no body)

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/tasks/bulk_destroy  **[BETA]**

**Bulk delete project tasks**
The request body should be an array of task IDs, representing the tasks to be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- array of string

Response 200:  (no body)

## Estimating Project Proposals

Resource id: `estimating-project-proposals`. Raw spec: `../openapi-raw/estimating-project-proposals.json`. Web: https://developers.procore.com/reference/rest/estimating-project-proposals?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}  **[BETA]**

**Retrieve a project proposal by Id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: object - Represents a proposal within a bid board project.
  - `notes`: string - The notes of the proposal.
  - `scope_of_work`: string - The scope of work of the proposal.
  - `inclusions`: array of string - The inclusions of the proposal.
  - `exclusions`: array of string - The exclusions of the proposal.
  - `id`: string - The unique identifier of the proposal.
  - `name`: string - The name of the proposal.
  - `quote_nr`: integer(int32) - The quote number of the proposal.
  - `order`: integer(int32) - The order of the proposal.
  - `include_in_primary_estimate`: boolean - Indicates whether the proposal should be included in the primary estimate.
  - `is_primary`: boolean - Indicates whether the proposal is the primary proposal of the project.
  - `type`: string enum[ESTIMATE, CHANGE_ORDER] - The type of the proposal.
  - `total`: number(decimal) - The total amount of the proposal.
  - `is_procore_bid_form_alternate`: boolean - Indicates whether the proposal is an alternate Procore bid form.
  - `procore_change_event_id`: string - The change event identifier of the proposal.
  - `updated_at`: string(date-time) - The date and time when the proposal was last updated. e.g. `2026-03-25T13:25:00Z`

### PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}  **[BETA]**

**Update a proposal of the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/merge-patch+json) (required):

- `name`: string - The new name of the proposal, if the name should be updated.
- `type`: string - The new type of the proposal, if the type should be updated.
- `notes`: string - The updated notes for the proposal, if the notes should be changed.
- `scope_of_work`: string - The updated scope of work for the proposal, if it should be changed.
- `inclusions`: array of string - The updated list of inclusions for the proposal, if they should be changed.
- `exclusions`: array of string - The updated list of exclusions for the proposal, if they should be changed.
- `include_in_primary_estimate`: boolean - Indicates whether the proposal should be included in the primary estimate, if this flag should be updated.
- `is_primary`: boolean - Indicates whether the proposal should become primary. Only one primary proposal can exist in a project.

Response 200 (application/json): object

- `data`: object - Represents a proposal within a bid board project.
  - `notes`: string - The notes of the proposal.
  - `scope_of_work`: string - The scope of work of the proposal.
  - `inclusions`: array of string - The inclusions of the proposal.
  - `exclusions`: array of string - The exclusions of the proposal.
  - `id`: string - The unique identifier of the proposal.
  - `name`: string - The name of the proposal.
  - `quote_nr`: integer(int32) - The quote number of the proposal.
  - `order`: integer(int32) - The order of the proposal.
  - `include_in_primary_estimate`: boolean - Indicates whether the proposal should be included in the primary estimate.
  - `is_primary`: boolean - Indicates whether the proposal is the primary proposal of the project.
  - `type`: string enum[ESTIMATE, CHANGE_ORDER] - The type of the proposal.
  - `total`: number(decimal) - The total amount of the proposal.
  - `is_procore_bid_form_alternate`: boolean - Indicates whether the proposal is an alternate Procore bid form.
  - `procore_change_event_id`: string - The change event identifier of the proposal.
  - `updated_at`: string(date-time) - The date and time when the proposal was last updated. e.g. `2026-03-25T13:25:00Z`

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals/{proposal_id}  **[BETA]**

**Delete a proposal from the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200:  (no body)

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals  **[BETA]**

**Retrieve all project proposals**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: array of object (required)
  - `notes`: string - The notes of the proposal.
  - `scope_of_work`: string - The scope of work of the proposal.
  - `inclusions`: array of string - The inclusions of the proposal.
  - `exclusions`: array of string - The exclusions of the proposal.
  - `id`: string - The unique identifier of the proposal.
  - `name`: string - The name of the proposal.
  - `quote_nr`: integer(int32) - The quote number of the proposal.
  - `order`: integer(int32) - The order of the proposal.
  - `include_in_primary_estimate`: boolean - Indicates whether the proposal should be included in the primary estimate.
  - `is_primary`: boolean - Indicates whether the proposal is the primary proposal of the project.
  - `type`: string enum[ESTIMATE, CHANGE_ORDER] - The type of the proposal.
  - `total`: number(decimal) - The total amount of the proposal.
  - `is_procore_bid_form_alternate`: boolean - Indicates whether the proposal is an alternate Procore bid form.
  - `procore_change_event_id`: string - The change event identifier of the proposal.
  - `updated_at`: string(date-time) - The date and time when the proposal was last updated. e.g. `2026-03-25T13:25:00Z`

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/proposals  **[BETA]**

**Create a proposal in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `notes`: string - The notes of the proposal.
- `scope_of_work`: string - The scope of work of the proposal.
- `inclusions`: array of string - The inclusions of the proposal.
- `exclusions`: array of string - The exclusions of the proposal.
- `name`: string (required)
- `type`: string enum[ESTIMATE, CHANGE_ORDER] (required) - The type of the proposal to create. This field is required.

Response 200 (application/json): object

- `data`: object - Represents a proposal within a bid board project.
  - `notes`: string - The notes of the proposal.
  - `scope_of_work`: string - The scope of work of the proposal.
  - `inclusions`: array of string - The inclusions of the proposal.
  - `exclusions`: array of string - The exclusions of the proposal.
  - `id`: string - The unique identifier of the proposal.
  - `name`: string - The name of the proposal.
  - `quote_nr`: integer(int32) - The quote number of the proposal.
  - `order`: integer(int32) - The order of the proposal.
  - `include_in_primary_estimate`: boolean - Indicates whether the proposal should be included in the primary estimate.
  - `is_primary`: boolean - Indicates whether the proposal is the primary proposal of the project.
  - `type`: string enum[ESTIMATE, CHANGE_ORDER] - The type of the proposal.
  - `total`: number(decimal) - The total amount of the proposal.
  - `is_procore_bid_form_alternate`: boolean - Indicates whether the proposal is an alternate Procore bid form.
  - `procore_change_event_id`: string - The change event identifier of the proposal.
  - `updated_at`: string(date-time) - The date and time when the proposal was last updated. e.g. `2026-03-25T13:25:00Z`

### POST /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/import/line_item_groups  **[BETA]**

**Create line items and line item groups in bulk to the Project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Request body (application/json) (required):

- `groups`: array of object
  - `multiplier`: number(decimal)
  - `name`: string (required)
  - `pricing_override`: object
    - `unit_material_cost`: number(decimal)
    - `material_margin`: number(decimal)
    - `unit_labor`: number(decimal)
    - `labor_factor`: number(decimal)
    - `unit_labor_rate`: number(decimal)
    - `unit_labor_cost`: number(decimal)
    - `is_untaxed`: boolean
    - `labor_margin`: number(decimal)
  - `notes`: string
  - `order`: integer(int32)
  - `layers`: array of object
    - `name`: string - Display name of the line item.
    - `group_id`: string - Line item group ID. Omit or leave empty to use the default group.
    - `cost_item`: object - Cost item associated with the line item. Provide custom pricing or omit to use a generic cost item based on type. When provided, the entire cost item is replaced (no partial updates). At least one of `cost_item.unit` ...
      - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Category of the cost item.
      - `name`: string - Display name of the cost item.
      - `description`: string - Description of the cost item.
      - `unit_cost`: number(decimal) - Unit material cost.
      - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
      - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
      - `unit_labor_cost`: number(decimal) - Unit labor cost.
      - `manufacturer`: string - Manufacturer of the item.
      - `catalog_number`: string - Catalog or product number.
      - `url`: string - URL to product or specification.
      - `supplier`: string - Supplier or vendor name.
      - `waste`: number(decimal) - Waste percentage.
      - `material_waste`: number(decimal) - Material waste percentage.
      - `item_margin`: number(decimal) - Item margin percentage.
      - `labor_margin`: number(decimal) - Labor margin percentage.
      - `unit_labor_rate`: number(decimal) - Labor rate per unit.
      - `is_untaxed`: boolean - Whether the item is excluded from tax.
      - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
      - `notes`: string - Notes.
      - `id`: string - Catalog item ID to link to an existing cost item. Omit or leave empty to create a new custom cost item from the provided fields.
      - `color`: string - Display color. Example: "#00ecff".
      - `symbol_id`: string - Symbol ID for takeoff. Built-in: circle, square, empty. Custom: numeric document ID string.
      - `delivery_unit`: integer(int32) - Delivery unit quantity.
      - `catalog_id`: string - Catalog folder ID.
      - `parts`: array of object - Sub-items (parts) of an assembly cost item. Empty for non-assembly cost items. On create, replaces the parts list copied from any referenced catalog item. Only valid when `type` is `Assembly` — providing parts with an...
        - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Category of the cost item.
        - `name`: string - Display name of the cost item.
        - `description`: string - Description of the cost item.
        - `unit_cost`: number(decimal) - Unit material cost.
        - `unit_labor`: number(decimal) - Labor time per unit, in the unit specified by labor_time_unit (e.g. minutes when labor_time_unit is MINUTES).
        - `labor_time_unit`: string enum[MINUTES, HOURS, DAYS, WEEKS, MONTHS] - Unit for labor time.
        - `unit_labor_cost`: number(decimal) - Unit labor cost.
        - `manufacturer`: string - Manufacturer of the item.
        - `catalog_number`: string - Catalog or product number.
        - `url`: string - URL to product or specification.
        - `supplier`: string - Supplier or vendor name.
        - `waste`: number(decimal) - Waste percentage.
        - `material_waste`: number(decimal) - Material waste percentage.
        - `item_margin`: number(decimal) - Item margin percentage.
        - `labor_margin`: number(decimal) - Labor margin percentage.
        - `unit_labor_rate`: number(decimal) - Labor rate per unit.
        - `is_untaxed`: boolean - Whether the item is excluded from tax.
        - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Unit of measurement.
        - `notes`: string - Notes.
        - `multiplier`: number(decimal) - Quantity multiplier for this sub-item.
        - `multiplier_string`: string - Formula string for dynamic multiplier.
        - `dynamic_type`: string - Dynamic type for formula-based multipliers.
    - `labor_factor`: number(decimal) - Labor difficulty factor applied to the cost item.
    - `quantity`: number(decimal) - Quantity from the estimating table (manual entry). Updated when using estimating or takeoff tab.
    - `tag`: string - Optional tag for filtering or grouping.
    - `id`: string - Line item ID.
    - `type`: string enum[UNKNOWN, COUNT, DESIGN, LINEAR, LINEAR_WITH_DROP, LINEAR_AVG_WITH_DROP, LINEAR_EACH, AREA, VERTICAL_AREA, NONE] - How the line item quantity is measured (count, linear, area, etc.). e.g. `COUNT`
    - `takeoff_quantity`: number(decimal) - Quantity measured in the takeoff tab (2D drawing and 3D model measurements combined). Read-only.
    - `item_cost`: number(decimal) - Calculated item cost.
    - `item_sales`: number(decimal) - Calculated item sales.
    - `labor_cost`: number(decimal) - Calculated labor cost.
    - `labor_sales`: number(decimal) - Calculated labor sales.
    - `profit`: number(decimal) - Calculated profit.
    - `updated_at`: string(date-time) - The date and time when the line item was last updated. e.g. `2026-03-25T13:25:00Z`

Response 200:  (no body)

## Estimating Projects

Resource id: `estimating-projects`. Raw spec: `../openapi-raw/estimating-projects.json`. Web: https://developers.procore.com/reference/rest/estimating-projects?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/estimating_projects  **[BETA]**

**Get all estimating projects**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string - The unique identifier of the Bid Board project.
  - `name`: string - The name of the Bid Board project.
  - `description`: string - The description of the Bid Board project.
  - `created_on`: string(date-time) - The creation date of the Bid Board project.
  - `due_date`: string(date-time) - The due date of the Bid Board project. e.g. `2025-01-22T16:40:00Z`
  - `last_status_change`: string(date-time) - The date when the Bid Board project's status was last changed.
  - `status`: string enum[ESTIMATING, BID_SUBMITTED, ACCEPTED, DELAYED, LOST, IN_PROGRESS, COMPLETE, INVITATION, TO_DO] - The current status of the project.
  - `archived`: boolean - Indicates whether the Bid Board project is archived. e.g. `false`
  - `use_metric_units`: boolean - Indicates whether the Bid Board project uses metric units.
  - `use_tax_from_cost`: boolean - Indicates whether the Bid Board project uses tax calculations based on cost.
  - `individual_labor_rates`: boolean - Indicates whether the Bid Board project uses individual labor rates.
  - `stats`: object - The Bid Board project statistics.
    - `total`: number(decimal) - The total cost or value associated with the Bid Board project.
    - `completed_tasks`: integer(int32) - The number of completed tasks in the Bid Board project.
    - `total_tasks`: integer(int32) - The total number of tasks in the Bid Board project.
    - `total_notes`: integer(int32) - The total number of notes associated with the Bid Board project.
  - `project_number`: string - The Bid Board project number.
  - `square_footage`: number(decimal) - The square footage of the Bid Board project. e.g. `0`
  - `pricing_locked`: boolean - Indicates whether the Bid Board project pricing is locked. e.g. `false`
  - `address`: object - The address associated with the Bid Board project.
    - `street`: string - The street address.
    - `city`: string - The city of the address.
    - `state`: string - The state of the address.
    - `zip`: string - The zip code of the address.
    - `country`: string - The country of the address.
  - `is_template`: boolean - Indicates whether the Bid Board project is a template. e.g. `false`
  - `updated_at`: string(date-time) - The date and time when the Bid Board project was last updated. e.g. `2026-03-25T13:25:00Z`
  - `project_id`: string - The Procore Portfolio project identifier linked to this Bid Board project. Null if the Bid Board project is not added to Portfolio. Use this to join Bid Board Project data with the Procore Portfolio Project API data.

### GET /rest/v2.0/companies/{company_id}/projects/{project_id}/estimating/estimating_project  **[BETA]**

**Get estimating project data by Procore project id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] string (required) - Unique project identifier

Response 200 (application/json): object

- `data`: object - Represents a project as returned in portfolio (company-wide) listings.
  - `id`: string - The unique identifier of the Bid Board project.
  - `name`: string - The name of the Bid Board project.
  - `description`: string - The description of the Bid Board project.
  - `created_on`: string(date-time) - The creation date of the Bid Board project.
  - `due_date`: string(date-time) - The due date of the Bid Board project. e.g. `2025-01-22T16:40:00Z`
  - `last_status_change`: string(date-time) - The date when the Bid Board project's status was last changed.
  - `status`: string enum[ESTIMATING, BID_SUBMITTED, ACCEPTED, DELAYED, LOST, IN_PROGRESS, COMPLETE, INVITATION, TO_DO] - The current status of the project.
  - `archived`: boolean - Indicates whether the Bid Board project is archived. e.g. `false`
  - `use_metric_units`: boolean - Indicates whether the Bid Board project uses metric units.
  - `use_tax_from_cost`: boolean - Indicates whether the Bid Board project uses tax calculations based on cost.
  - `individual_labor_rates`: boolean - Indicates whether the Bid Board project uses individual labor rates.
  - `stats`: object - The Bid Board project statistics.
    - `total`: number(decimal) - The total cost or value associated with the Bid Board project.
    - `completed_tasks`: integer(int32) - The number of completed tasks in the Bid Board project.
    - `total_tasks`: integer(int32) - The total number of tasks in the Bid Board project.
    - `total_notes`: integer(int32) - The total number of notes associated with the Bid Board project.
  - `project_number`: string - The Bid Board project number.
  - `square_footage`: number(decimal) - The square footage of the Bid Board project. e.g. `0`
  - `pricing_locked`: boolean - Indicates whether the Bid Board project pricing is locked. e.g. `false`
  - `address`: object - The address associated with the Bid Board project.
    - `street`: string - The street address.
    - `city`: string - The city of the address.
    - `state`: string - The state of the address.
    - `zip`: string - The zip code of the address.
    - `country`: string - The country of the address.
  - `is_template`: boolean - Indicates whether the Bid Board project is a template. e.g. `false`
  - `updated_at`: string(date-time) - The date and time when the Bid Board project was last updated. e.g. `2026-03-25T13:25:00Z`
  - `project_id`: string - The Procore Portfolio project identifier linked to this Bid Board project. Null if the Bid Board project is not added to Portfolio. Use this to join Bid Board Project data with the Procore Portfolio Project API data.

## Estimating Settings

Resource id: `estimating-settings`. Raw spec: `../openapi-raw/estimating-settings.json`. Web: https://developers.procore.com/reference/rest/estimating-settings?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/settings  **[BETA]**

**Get Estimating Settings**
Returns the Estimating Settings for the company, including project status/stage name mappings.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `data`: object - Represents the Estimating Settings for a company.
  - `use_metric_units`: boolean - Indicates whether the company uses metric units for measurements.
  - `use_unit_labor_cost`: boolean - Indicates whether unit labor cost is used instead of hourly labor cost.
  - `use_markup`: boolean - Indicates whether markup is used instead of margin for profit calculations.
  - `currency_symbol`: string - The currency symbol used for monetary values. e.g. `$`
  - `project_stages`: object - A mapping of project stages to their company-defined display names.
    - `estimating`: string
    - `bid_submitted`: string
    - `accepted`: string
    - `delayed`: string
    - `lost`: string
    - `in_progress`: string
    - `complete`: string
    - `invitation`: string
    - `to_do`: string

### PATCH /rest/v2.0/companies/{company_id}/estimating/settings  **[BETA]**

**Update Estimating Settings**
Updates mutable Estimating Settings for the company. Create and Delete are not supported.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/merge-patch+json) (required):

- `use_metric_units`: boolean - Indicates whether the company uses metric units for measurements.
- `use_unit_labor_cost`: boolean - Indicates whether unit labor cost is used instead of hourly labor cost.
- `use_markup`: boolean - Indicates whether markup is used instead of margin for profit calculations.
- `currency_symbol`: string - The currency symbol used for monetary values. e.g. `$`
- `project_stages`: object - A partial mapping of project stages to their company-defined display names. Only the provided fields are updated; omitted fields retain their existing values.
  - `estimating`: string
  - `bid_submitted`: string
  - `accepted`: string
  - `delayed`: string
  - `lost`: string
  - `in_progress`: string
  - `complete`: string
  - `invitation`: string
  - `to_do`: string

Response 200 (application/json): object

- `data`: object - Represents the Estimating Settings for a company.
  - `use_metric_units`: boolean - Indicates whether the company uses metric units for measurements.
  - `use_unit_labor_cost`: boolean - Indicates whether unit labor cost is used instead of hourly labor cost.
  - `use_markup`: boolean - Indicates whether markup is used instead of margin for profit calculations.
  - `currency_symbol`: string - The currency symbol used for monetary values. e.g. `$`
  - `project_stages`: object - A mapping of project stages to their company-defined display names.
    - `estimating`: string
    - `bid_submitted`: string
    - `accepted`: string
    - `delayed`: string
    - `lost`: string
    - `in_progress`: string
    - `complete`: string
    - `invitation`: string
    - `to_do`: string

