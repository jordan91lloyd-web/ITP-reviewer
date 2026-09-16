# Procore API: Bid Board (Preconstruction)

Source: https://developers.procore.com/reference/rest/ (tool category: Bid Board)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Bid Board Project Line Item Groups](#bid-board-project-line-item-groups) - versions 2.0
- [Bid Board Project Line Items](#bid-board-project-line-items) - versions 2.0
- [Bid Board Project Notes](#bid-board-project-notes) - versions 2.0
- [Bid Board Project Project Tasks](#bid-board-project-project-tasks) - versions 2.0
- [Bid Board Project Proposals](#bid-board-project-proposals) - versions 2.0
- [Bid Board Projects](#bid-board-projects) - versions 2.0

## Bid Board Project Line Item Groups

Resource id: `bid-board-project-line-item-groups`. Raw spec: `../openapi-raw/bid-board-project-line-item-groups.json`. Web: https://developers.procore.com/reference/rest/bid-board-project-line-item-groups?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_item_groups/{line_item_group_id}  **[BETA]**

**Retrieve a line item group by Id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_group_id` [path] string(int64) (required) - Line Item Group Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### PATCH /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_item_groups/{line_item_group_id}  **[BETA]**

**Update a line item group of the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_group_id` [path] string(int64) (required) - Line Item Group Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### DELETE /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_item_groups/{line_item_group_id}  **[BETA]**

**Delete a line item group from the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_group_id` [path] string(int64) (required) - Line Item Group Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Response 200:  (no body)

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_item_groups  **[BETA]**

**Retrieve all line item groups of a proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_item_groups  **[BETA]**

**Create a line item group in the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

## Bid Board Project Line Items

Resource id: `bid-board-project-line-items`. Raw spec: `../openapi-raw/bid-board-project-line-items.json`. Web: https://developers.procore.com/reference/rest/bid-board-project-line-items?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_items  **[BETA]**

**Retrieve all line items of a proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_items  **[BETA]**

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
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_items/{line_item_id}  **[BETA]**

**Retrieve a line item by Id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_id` [path] string(int64) (required) - Line Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### PATCH /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_items/{line_item_id}  **[BETA]**

**Update an estimate line item of the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_id` [path] string(int64) (required) - Line Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### DELETE /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}/line_items/{line_item_id}  **[BETA]**

**Delete an estimate line item from the proposal**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `line_item_id` [path] string(int64) (required) - Line Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Response 200:  (no body)

## Bid Board Project Notes

Resource id: `bid-board-project-notes`. Raw spec: `../openapi-raw/bid-board-project-notes.json`. Web: https://developers.procore.com/reference/rest/bid-board-project-notes?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/notes  **[BETA]**

**Retrieve all notes in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Response 200 (application/json): object

- `data`: array of object (required)
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/notes  **[BETA]**

**Create a note in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Request body (application/json) (required):

- `value`: string (required) - The content of the note.

Response 200 (application/json): object

- `data`: object
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/notes/{note_id}  **[BETA]**

**Retrieve a note by Id in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `note_id` [path] string(int64) (required) - Note Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Response 200 (application/json): object

- `data`: object
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### PATCH /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/notes/{note_id}  **[BETA]**

**Update a note of the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `note_id` [path] string(int64) (required) - Note Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Request body (application/json) (required):

- `value`: string (required) - The content of the note.

Response 200 (application/json): object

- `data`: object
  - `value`: string (required) - The content of the note.
  - `id`: string - The unique identifier of the note.
  - `updated_at`: string(date-time) - The date and time when the note was last updated. e.g. `2026-03-25T13:25:00Z`

### DELETE /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/notes/{note_id}  **[BETA]**

**Delete a note from the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `note_id` [path] string(int64) (required) - Note Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Response 200 (application/octet-stream): string(binary)


## Bid Board Project Project Tasks

Resource id: `bid-board-project-project-tasks`. Raw spec: `../openapi-raw/bid-board-project-project-tasks.json`. Web: https://developers.procore.com/reference/rest/bid-board-project-project-tasks?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/tasks  **[BETA]**

**Get project tasks**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/tasks  **[BETA]**

**Create project task**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/tasks/{task_id}  **[BETA]**

**Get project task by id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `task_id` [path] string(int64) (required) - Task Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### PATCH /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/tasks/{task_id}  **[BETA]**

**Update project task**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `task_id` [path] string(int64) (required) - Task Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### DELETE /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/tasks/{task_id}  **[BETA]**

**Delete project task**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `task_id` [path] string(int64) (required) - Task Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Response 200:  (no body)

### DELETE /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/tasks/bulk_destroy  **[BETA]**

**Bulk delete project tasks**
The request body should be an array of task IDs, representing the tasks to be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Request body (application/json) (required):

- array of string

Response 200:  (no body)

## Bid Board Project Proposals

Resource id: `bid-board-project-proposals`. Raw spec: `../openapi-raw/bid-board-project-proposals.json`. Web: https://developers.procore.com/reference/rest/bid-board-project-proposals?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}  **[BETA]**

**Retrieve a project proposal by Id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### PATCH /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}  **[BETA]**

**Update a proposal of the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### DELETE /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals/{proposal_id}  **[BETA]**

**Delete a proposal from the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `proposal_id` [path] string(int64) (required) - Proposal Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

Response 200:  (no body)

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals  **[BETA]**

**Retrieve all project proposals**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/proposals  **[BETA]**

**Create a proposal in the project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/import/line_item_groups  **[BETA]**

**Create line items and line item groups in bulk to the Project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string (required) - Unique BidBoard project identifier

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

## Bid Board Projects

Resource id: `bid-board-projects`. Raw spec: `../openapi-raw/bid-board-projects.json`. Web: https://developers.procore.com/reference/rest/bid-board-projects?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}  **[BETA]**

**Get Bid Board project by id**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string(int64) (required) - Unique BidBoard project identifier
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `data`: object - Represents a project with its details and configurations.
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
  - `use_hip_and_valley`: boolean - Indicates whether the Bid Board project includes hip and valley calculations.
  - `deleted`: boolean - Indicates whether the Bid Board project is deleted. e.g. `false`
  - `use_unit_labor_cost`: boolean - Indicates whether the Bid Board project uses unit labor cost.
  - `wbs_validation_enabled`: boolean - Indicates whether WBS validation is enabled for the Bid Board project.
  - `disable_ea_parts_rounding`: boolean - Indicates whether EA parts rounding is disabled for the Bid Board project.
  - `estimator_user_id`: string - The unique identifier for the estimator associated with the project. Use the "Company Users" endpoint to retrieve full user details.
  - `office_id`: string - The unique identifier for the Procore office associated with the project. Use the "Company Offices" endpoint to retrieve office details.
  - `customer_company`: object - Represents the customer company (vendor) associated with the project.
    - `id`: string - The unique identifier for the customer company. Use the "Company Vendors" endpoint to retrieve full vendor details. Can be null if customer company is not integrated with Procore.
    - `name`: string - The name of the customer company.

### PATCH /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}  **[BETA]**

**Update Bid Board project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string(int64) (required) - Unique BidBoard project identifier
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/merge-patch+json) (required):

- `name`: string - The name of the Bid Board project.
- `description`: string - The description of the Bid Board project.
- `due_date`: string - The due date of the Bid Board project. e.g. `2025-01-22T16:40:00Z`
- `status`: string - The current status of the Bid Board project.
- `archived`: boolean - Indicates whether the Bid Board project is archived. e.g. `false`
- `use_metric_units`: boolean - Indicates whether the Bid Board project uses metric units.
- `use_tax_from_cost`: boolean - Indicates whether the Bid Board project uses tax calculations based on cost.
- `individual_labor_rates`: boolean - Indicates whether the Bid Board project uses individual labor rates.
- `project_number`: string - The Bid Board project number.
- `square_footage`: number - The square footage of the Bid Board project. e.g. `0`
- `pricing_locked`: boolean - Indicates whether the Bid Board project pricing is locked. e.g. `false`
- `deleted`: boolean - Indicates whether the Bid Board project is deleted. e.g. `false`
- `address`: object - The address associated with the Bid Board project.
  - `street`: string - The street address.
  - `city`: string - The city of the address.
  - `state`: string - The state of the address.
  - `zip`: string - The zip code of the address.
  - `country`: string - The country of the address.
- `is_template`: boolean - Indicates whether the Bid Board project is a template. e.g. `false`
- `use_unit_labor_cost`: boolean - Indicates whether the Bid Board project uses unit labor cost.
- `wbs_validation_enabled`: boolean - Indicates whether WBS validation is enabled for the Bid Board project.
- `disable_ea_parts_rounding`: boolean - Indicates whether EA parts rounding is disabled for the Bid Board project.
- `office_id`: string - The unique identifier for the Procore office associated with the project. Use the Procore Company Offices endpoint to retrieve office IDs.

Response 200 (application/json): object

- `data`: object - Represents a project with its details and configurations.
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
  - `use_hip_and_valley`: boolean - Indicates whether the Bid Board project includes hip and valley calculations.
  - `deleted`: boolean - Indicates whether the Bid Board project is deleted. e.g. `false`
  - `use_unit_labor_cost`: boolean - Indicates whether the Bid Board project uses unit labor cost.
  - `wbs_validation_enabled`: boolean - Indicates whether WBS validation is enabled for the Bid Board project.
  - `disable_ea_parts_rounding`: boolean - Indicates whether EA parts rounding is disabled for the Bid Board project.
  - `estimator_user_id`: string - The unique identifier for the estimator associated with the project. Use the "Company Users" endpoint to retrieve full user details.
  - `office_id`: string - The unique identifier for the Procore office associated with the project. Use the "Company Offices" endpoint to retrieve office details.
  - `customer_company`: object - Represents the customer company (vendor) associated with the project.
    - `id`: string - The unique identifier for the customer company. Use the "Company Vendors" endpoint to retrieve full vendor details. Can be null if customer company is not integrated with Procore.
    - `name`: string - The name of the customer company.

### DELETE /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}  **[BETA]**

**Delete Bid Board project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string(int64) (required) - Unique BidBoard project identifier
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200:  (no body)

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/custom_fields  **[BETA]**

**Get Bid Board project custom fields**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string(int64) (required) - Unique BidBoard project identifier
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `data`: object - Represents the collection of custom fields associated with the Bid Board project.
  - `custom_fields`: array of object
    - `id`: string
    - `name`: string
    - `data_type`: string enum[STRING, BOOLEAN, DATE_TIME, NUMBER, LOV_ENTRY]
    - `value`: string

### PATCH /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/custom_fields/{custom_field_id}  **[BETA]**

**Update Bid Board project custom field**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string(int64) (required) - Unique BidBoard project identifier
- `custom_field_id` [path] string(int64) (required) - Custom field Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/merge-patch+json) (required):

- `value`: string - The new value for the custom field.

Response 200 (application/json): object

- `data`: object - Represents a Custom Field associated with the Bid Board project.
  - `id`: string
  - `name`: string
  - `data_type`: string enum[STRING, BOOLEAN, DATE_TIME, NUMBER, LOV_ENTRY]
  - `value`: string

### GET /rest/v2.0/companies/{company_id}/estimating/bid_board_projects  **[BETA]**

**Get all Bid Board projects**

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
  - `use_hip_and_valley`: boolean - Indicates whether the Bid Board project includes hip and valley calculations.
  - `deleted`: boolean - Indicates whether the Bid Board project is deleted. e.g. `false`
  - `use_unit_labor_cost`: boolean - Indicates whether the Bid Board project uses unit labor cost.
  - `wbs_validation_enabled`: boolean - Indicates whether WBS validation is enabled for the Bid Board project.
  - `disable_ea_parts_rounding`: boolean - Indicates whether EA parts rounding is disabled for the Bid Board project.
  - `estimator_user_id`: string - The unique identifier for the estimator associated with the project. Use the "Company Users" endpoint to retrieve full user details.
  - `office_id`: string - The unique identifier for the Procore office associated with the project. Use the "Company Offices" endpoint to retrieve office details.
  - `customer_company`: object - Represents the customer company (vendor) associated with the project.
    - `id`: string - The unique identifier for the customer company. Use the "Company Vendors" endpoint to retrieve full vendor details. Can be null if customer company is not integrated with Procore.
    - `name`: string - The name of the customer company.

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects  **[BETA]**

**Create Bid Board project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `name`: string (required) - The name of the Bid Board project.
- `description`: string - The description of the Bid Board project.
- `due_date`: string(date-time) - The due date of the Bid Board project. e.g. `2025-01-22T16:40:00Z`
- `status`: string enum[ESTIMATING, BID_SUBMITTED, ACCEPTED, DELAYED, LOST, IN_PROGRESS, COMPLETE, INVITATION, TO_DO] (required) - The current status of the project.
- `use_metric_units`: boolean - Indicates whether the Bid Board project uses metric units.
- `use_tax_from_cost`: boolean - Indicates whether the Bid Board project uses tax calculations based on cost.
- `individual_labor_rates`: boolean - Indicates whether the Bid Board project uses individual labor rates.
- `project_number`: string - The Bid Board project number.
- `square_footage`: number(decimal) - The square footage of the Bid Board project. e.g. `0`
- `address`: object - The address associated with the Bid Board project.
  - `street`: string - The street address.
  - `city`: string - The city of the address.
  - `state`: string - The state of the address.
  - `zip`: string - The zip code of the address.
  - `country`: string - The country of the address.
- `is_template`: boolean - Indicates whether the Bid Board project is a template. e.g. `false`
- `use_unit_labor_cost`: boolean - Indicates whether the Bid Board project uses unit labor cost.
- `wbs_validation_enabled`: boolean - Indicates whether WBS validation is enabled for the Bid Board project.
- `disable_ea_parts_rounding`: boolean - Indicates whether EA parts rounding is disabled for the Bid Board project.
- `office_id`: string - The unique identifier for the Procore office associated with the project. Use the Procore Company Offices endpoint to retrieve office IDs.

Response 200 (application/json): object

- `data`: object - Represents a project with its details and configurations.
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
  - `use_hip_and_valley`: boolean - Indicates whether the Bid Board project includes hip and valley calculations.
  - `deleted`: boolean - Indicates whether the Bid Board project is deleted. e.g. `false`
  - `use_unit_labor_cost`: boolean - Indicates whether the Bid Board project uses unit labor cost.
  - `wbs_validation_enabled`: boolean - Indicates whether WBS validation is enabled for the Bid Board project.
  - `disable_ea_parts_rounding`: boolean - Indicates whether EA parts rounding is disabled for the Bid Board project.
  - `estimator_user_id`: string - The unique identifier for the estimator associated with the project. Use the "Company Users" endpoint to retrieve full user details.
  - `office_id`: string - The unique identifier for the Procore office associated with the project. Use the "Company Offices" endpoint to retrieve office details.
  - `customer_company`: object - Represents the customer company (vendor) associated with the project.
    - `id`: string - The unique identifier for the customer company. Use the "Company Vendors" endpoint to retrieve full vendor details. Can be null if customer company is not integrated with Procore.
    - `name`: string - The name of the customer company.

### POST /rest/v2.0/companies/{company_id}/estimating/bid_board_projects/{bid_board_project_id}/clone  **[BETA]**

**Clone Bid Board project**

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `bid_board_project_id` [path] string(int64) (required) - Unique BidBoard project identifier
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `name`: string - The name of the new Bid Board project.
- `as_template`: boolean (required) - Indicates whether the new Bid Board project should be created as a template.

Response 200 (application/json): object

- `data`: object - Represents a project with its details and configurations.
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
  - `use_hip_and_valley`: boolean - Indicates whether the Bid Board project includes hip and valley calculations.
  - `deleted`: boolean - Indicates whether the Bid Board project is deleted. e.g. `false`
  - `use_unit_labor_cost`: boolean - Indicates whether the Bid Board project uses unit labor cost.
  - `wbs_validation_enabled`: boolean - Indicates whether WBS validation is enabled for the Bid Board project.
  - `disable_ea_parts_rounding`: boolean - Indicates whether EA parts rounding is disabled for the Bid Board project.
  - `estimator_user_id`: string - The unique identifier for the estimator associated with the project. Use the "Company Users" endpoint to retrieve full user details.
  - `office_id`: string - The unique identifier for the Procore office associated with the project. Use the "Company Offices" endpoint to retrieve office details.
  - `customer_company`: object - Represents the customer company (vendor) associated with the project.
    - `id`: string - The unique identifier for the customer company. Use the "Company Vendors" endpoint to retrieve full vendor details. Can be null if customer company is not integrated with Procore.
    - `name`: string - The name of the customer company.

