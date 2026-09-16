# Procore API: Cost Catalog (Preconstruction)

Source: https://developers.procore.com/reference/rest/ (tool category: Cost Catalog)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Cost catalogs](#cost-catalogs) - versions 2.0
- [Cost items](#cost-items) - versions 2.0

## Cost catalogs

Resource id: `cost-catalogs`. Raw spec: `../openapi-raw/cost-catalogs.json`. Web: https://developers.procore.com/reference/rest/cost-catalogs?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/catalogs  **[BETA]**

**Get Catalogs**
Returns all Cost Catalogs.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `data`: array of object (required)
  - `name`: string
  - `id`: string
  - `custom`: boolean
  - `sealed`: boolean
  - `catalogs`: array of object - Sub Catalogs
    - `name`: string
    - `id`: string
    - `custom`: boolean
    - `sealed`: boolean

### POST /rest/v2.0/companies/{company_id}/estimating/catalogs  **[BETA]**

**Create Catalog**
Creates new Cost Catalog.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `name`: string

Response 200 (application/json): object

- `data`: object
  - `name`: string
  - `id`: string
  - `custom`: boolean
  - `sealed`: boolean
  - `catalogs`: array of object - Sub Catalogs
    - `name`: string
    - `id`: string
    - `custom`: boolean
    - `sealed`: boolean

### POST /rest/v2.0/companies/{company_id}/estimating/catalogs/{catalog_id}  **[BETA]**

**Create new sub Cost Catalog**
There can be created only one level sub-catalog.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `catalog_id` [path] string(int64) (required) - Parent Catalog Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `name`: string

Response 200 (application/json): object

- `data`: object
  - `name`: string
  - `id`: string
  - `custom`: boolean
  - `sealed`: boolean
  - `catalogs`: array of object - Sub Catalogs
    - `name`: string
    - `id`: string
    - `custom`: boolean
    - `sealed`: boolean

### PATCH /rest/v2.0/companies/{company_id}/estimating/catalogs/{catalog_id}  **[BETA]**

**Update Catalog**
Updates Catalog

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `catalog_id` [path] string(int64) (required) - Catalog Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `name`: string

Response 200 (application/json): object

- `data`: object
  - `name`: string
  - `id`: string
  - `custom`: boolean
  - `sealed`: boolean
  - `catalogs`: array of object - Sub Catalogs
    - `name`: string
    - `id`: string
    - `custom`: boolean
    - `sealed`: boolean

### DELETE /rest/v2.0/companies/{company_id}/estimating/catalogs/{catalog_id}  **[BETA]**

**Delete Catalog**
Deletes Catalog

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `catalog_id` [path] string(int64) (required) - Catalog Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200:  (no body)

### POST /rest/v2.0/companies/{company_id}/estimating/catalogs/{catalog_id}/move/{parent_catalog_id}  **[BETA]**

**Move Catalog**
Moves Catalog under Parent Catalog

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `catalog_id` [path] string(int64) (required) - Catalog Id
- `parent_catalog_id` [path] string(int64) (required) - Parent Catalog Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200:  (no body)

## Cost items

Resource id: `cost-items`. Raw spec: `../openapi-raw/cost-items.json`. Web: https://developers.procore.com/reference/rest/cost-items?version=latest
Product lines: Preconstruction

### GET /rest/v2.0/companies/{company_id}/estimating/catalogs/{catalog_id}/items  **[BETA]**

**Get Cost Items**
Returns Cost Items for a Catalog

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `catalog_id` [path] string(int64) (required) - Catalog Id
- `page` [query] integer(int32) - Page number
- `per_page` [query] integer(int32) - Items per page
- `type` [query] array of string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - Cost Item Type
- `cost_item_unit` [query] array of string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - Cost Item Unit
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `data`: array of object (required)
  - `id`: string - The unique identifier for the cost item.
  - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
  - `name`: string - The name of the cost item.
  - `description`: string - The description of the cost item.
  - `unit_cost`: number(decimal) - The unit cost of the cost item.
  - `unit_labor`: number(decimal) - The unit labor required for the cost item.
  - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
  - `manufacturer`: string - The manufacturer of the cost item.
  - `catalog_number`: string - The catalog number of the cost item.
  - `supplier`: string - The supplier of the cost item.
  - `sub_job_code`: string - The sub-job code associated with the cost item.
  - `sub_job_name`: string - The name of the sub-job associated with the cost item.
  - `cost_code`: string - The cost code associated with the cost item.
  - `cost_name`: string - The name of the cost code associated with the cost item.
  - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `waste`: number(decimal) - The waste percentage associated with the cost item.
  - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
  - `item_margin`: number(decimal) - The margin applied to the cost item.
  - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
  - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
  - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
  - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
  - `notes`: string - Any additional notes about the cost item.
  - `used_by_item_ids`: array of integer(int64) - Array of item IDs that use this cost item.
  - `color`: string - The color associated with the cost item. e.g. `#FF0000`
  - `delivery_unit`: integer(int32) - The delivery unit of the cost item.
  - `catalog_id`: string - The catalog ID associated with the cost item. e.g. `-1`
  - `custom`: boolean - Indicates whether the cost item is custom.
  - `sealed`: boolean - Indicates whether the cost item is sealed.
  - `sub_items`: array of object - Array of sub-items associated with the cost item.
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
    - `name`: string - The name of the cost item.
    - `description`: string - The description of the cost item.
    - `unit_cost`: number(decimal) - The unit cost of the cost item.
    - `unit_labor`: number(decimal) - The unit labor required for the cost item.
    - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
    - `manufacturer`: string - The manufacturer of the cost item.
    - `catalog_number`: string - The catalog number of the cost item.
    - `supplier`: string - The supplier of the cost item.
    - `sub_job_code`: string - The sub-job code associated with the cost item.
    - `sub_job_name`: string - The name of the sub-job associated with the cost item.
    - `cost_code`: string - The cost code associated with the cost item.
    - `cost_name`: string - The name of the cost code associated with the cost item.
    - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `waste`: number(decimal) - The waste percentage associated with the cost item.
    - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
    - `item_margin`: number(decimal) - The margin applied to the cost item.
    - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
    - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
    - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
    - `notes`: string - Any additional notes about the cost item.
    - `multiplier`: number(decimal) (required) - The multiplier applied to the cost sub-item.

### GET /rest/v2.0/companies/{company_id}/estimating/catalogs/items/{item_id}  **[BETA]**

**Get Cost Item**
Returns Cost Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] string(int64) (required) - Cost Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200 (application/json): object

- `data`: object - Represents a model to get cost item details.
  - `id`: string - The unique identifier for the cost item.
  - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
  - `name`: string - The name of the cost item.
  - `description`: string - The description of the cost item.
  - `unit_cost`: number(decimal) - The unit cost of the cost item.
  - `unit_labor`: number(decimal) - The unit labor required for the cost item.
  - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
  - `manufacturer`: string - The manufacturer of the cost item.
  - `catalog_number`: string - The catalog number of the cost item.
  - `supplier`: string - The supplier of the cost item.
  - `sub_job_code`: string - The sub-job code associated with the cost item.
  - `sub_job_name`: string - The name of the sub-job associated with the cost item.
  - `cost_code`: string - The cost code associated with the cost item.
  - `cost_name`: string - The name of the cost code associated with the cost item.
  - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `waste`: number(decimal) - The waste percentage associated with the cost item.
  - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
  - `item_margin`: number(decimal) - The margin applied to the cost item.
  - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
  - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
  - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
  - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
  - `notes`: string - Any additional notes about the cost item.
  - `used_by_item_ids`: array of integer(int64) - Array of item IDs that use this cost item.
  - `color`: string - The color associated with the cost item. e.g. `#FF0000`
  - `delivery_unit`: integer(int32) - The delivery unit of the cost item.
  - `catalog_id`: string - The catalog ID associated with the cost item. e.g. `-1`
  - `custom`: boolean - Indicates whether the cost item is custom.
  - `sealed`: boolean - Indicates whether the cost item is sealed.
  - `sub_items`: array of object - Array of sub-items associated with the cost item.
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
    - `name`: string - The name of the cost item.
    - `description`: string - The description of the cost item.
    - `unit_cost`: number(decimal) - The unit cost of the cost item.
    - `unit_labor`: number(decimal) - The unit labor required for the cost item.
    - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
    - `manufacturer`: string - The manufacturer of the cost item.
    - `catalog_number`: string - The catalog number of the cost item.
    - `supplier`: string - The supplier of the cost item.
    - `sub_job_code`: string - The sub-job code associated with the cost item.
    - `sub_job_name`: string - The name of the sub-job associated with the cost item.
    - `cost_code`: string - The cost code associated with the cost item.
    - `cost_name`: string - The name of the cost code associated with the cost item.
    - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `waste`: number(decimal) - The waste percentage associated with the cost item.
    - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
    - `item_margin`: number(decimal) - The margin applied to the cost item.
    - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
    - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
    - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
    - `notes`: string - Any additional notes about the cost item.
    - `multiplier`: number(decimal) (required) - The multiplier applied to the cost sub-item.

### PUT /rest/v2.0/companies/{company_id}/estimating/catalogs/items/{item_id}  **[BETA]**

**Update Cost Item**
Updates Cost Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] string(int64) (required) - Cost Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] (required) - The type of the cost item.
- `name`: string (required) - The name of the cost item.
- `description`: string - The description of the cost item.
- `unit_cost`: number(decimal) - The unit cost of the cost item.
- `unit_labor`: number(decimal) - The unit labor required for the cost item.
- `unit_labor_cost`: number(decimal) - The cost of the unit labor.
- `manufacturer`: string - The manufacturer of the cost item.
- `catalog_number`: string - The catalog number of the cost item.
- `supplier`: string - The supplier of the cost item.
- `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
- `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
- `waste`: number(decimal) - The waste percentage associated with the cost item.
- `material_waste`: number(decimal) - The waste percentage associated with the cost item.
- `item_margin`: number(decimal) - The margin applied to the cost item.
- `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
- `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
- `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
- `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] (required) - The unit of measurement for the cost item.
- `notes`: string - Any additional notes about the cost item.
- `color`: string - The color associated with the cost item. e.g. `#FF0000`
- `catalog_id`: string (required) - The catalog ID associated with the cost item. e.g. `-1`
- `sub_items`: array of object - Array of sub-items associated with the cost item. Ignore unless you are creating an Assembly.
  - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
  - `item_id`: string - The ID of the existing item this cost item. Ignore if creating a new item.
  - `name`: string - The name of the cost item.
  - `description`: string - The description of the cost item.
  - `unit_cost`: number(decimal) - The unit cost of the cost item.
  - `unit_labor`: number(decimal) - The unit labor required for the cost item.
  - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
  - `manufacturer`: string - The manufacturer of the cost item.
  - `catalog_number`: string - The catalog number of the cost item.
  - `supplier`: string - The supplier of the cost item.
  - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `waste`: number(decimal) - The waste percentage associated with the cost item.
  - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
  - `item_margin`: number(decimal) - The margin applied to the cost item.
  - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
  - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
  - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
  - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
  - `notes`: string - Any additional notes about the cost item.
  - `multiplier`: number(decimal) (required) - The multiplier applied to the cost sub-item.

Response 200 (application/json): object

- `data`: object - Represents a model to get cost item details.
  - `id`: string - The unique identifier for the cost item.
  - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
  - `name`: string - The name of the cost item.
  - `description`: string - The description of the cost item.
  - `unit_cost`: number(decimal) - The unit cost of the cost item.
  - `unit_labor`: number(decimal) - The unit labor required for the cost item.
  - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
  - `manufacturer`: string - The manufacturer of the cost item.
  - `catalog_number`: string - The catalog number of the cost item.
  - `supplier`: string - The supplier of the cost item.
  - `sub_job_code`: string - The sub-job code associated with the cost item.
  - `sub_job_name`: string - The name of the sub-job associated with the cost item.
  - `cost_code`: string - The cost code associated with the cost item.
  - `cost_name`: string - The name of the cost code associated with the cost item.
  - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `waste`: number(decimal) - The waste percentage associated with the cost item.
  - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
  - `item_margin`: number(decimal) - The margin applied to the cost item.
  - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
  - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
  - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
  - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
  - `notes`: string - Any additional notes about the cost item.
  - `used_by_item_ids`: array of integer(int64) - Array of item IDs that use this cost item.
  - `color`: string - The color associated with the cost item. e.g. `#FF0000`
  - `delivery_unit`: integer(int32) - The delivery unit of the cost item.
  - `catalog_id`: string - The catalog ID associated with the cost item. e.g. `-1`
  - `custom`: boolean - Indicates whether the cost item is custom.
  - `sealed`: boolean - Indicates whether the cost item is sealed.
  - `sub_items`: array of object - Array of sub-items associated with the cost item.
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
    - `name`: string - The name of the cost item.
    - `description`: string - The description of the cost item.
    - `unit_cost`: number(decimal) - The unit cost of the cost item.
    - `unit_labor`: number(decimal) - The unit labor required for the cost item.
    - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
    - `manufacturer`: string - The manufacturer of the cost item.
    - `catalog_number`: string - The catalog number of the cost item.
    - `supplier`: string - The supplier of the cost item.
    - `sub_job_code`: string - The sub-job code associated with the cost item.
    - `sub_job_name`: string - The name of the sub-job associated with the cost item.
    - `cost_code`: string - The cost code associated with the cost item.
    - `cost_name`: string - The name of the cost code associated with the cost item.
    - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `waste`: number(decimal) - The waste percentage associated with the cost item.
    - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
    - `item_margin`: number(decimal) - The margin applied to the cost item.
    - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
    - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
    - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
    - `notes`: string - Any additional notes about the cost item.
    - `multiplier`: number(decimal) (required) - The multiplier applied to the cost sub-item.

### DELETE /rest/v2.0/companies/{company_id}/estimating/catalogs/items/{item_id}  **[BETA]**

**Delete Cost Item**
Deletes Cost Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `item_id` [path] string(int64) (required) - Cost Item Id
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Response 200:  (no body)

### POST /rest/v2.0/companies/{company_id}/estimating/catalogs/items  **[BETA]**

**Create Cost Item**
Creates new Cost Item

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] (required) - The type of the cost item.
- `name`: string (required) - The name of the cost item.
- `description`: string - The description of the cost item.
- `unit_cost`: number(decimal) - The unit cost of the cost item.
- `unit_labor`: number(decimal) - The unit labor required for the cost item.
- `unit_labor_cost`: number(decimal) - The cost of the unit labor.
- `manufacturer`: string - The manufacturer of the cost item.
- `catalog_number`: string - The catalog number of the cost item.
- `supplier`: string - The supplier of the cost item.
- `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
- `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
- `waste`: number(decimal) - The waste percentage associated with the cost item.
- `material_waste`: number(decimal) - The waste percentage associated with the cost item.
- `item_margin`: number(decimal) - The margin applied to the cost item.
- `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
- `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
- `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
- `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] (required) - The unit of measurement for the cost item.
- `notes`: string - Any additional notes about the cost item.
- `color`: string - The color associated with the cost item. e.g. `#FF0000`
- `catalog_id`: string (required) - The catalog ID associated with the cost item. e.g. `-1`
- `sub_items`: array of object - Array of sub-items associated with the cost item. Ignore unless you are creating an Assembly.
  - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
  - `item_id`: string - The ID of the existing item this cost item. Ignore if creating a new item.
  - `name`: string - The name of the cost item.
  - `description`: string - The description of the cost item.
  - `unit_cost`: number(decimal) - The unit cost of the cost item.
  - `unit_labor`: number(decimal) - The unit labor required for the cost item.
  - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
  - `manufacturer`: string - The manufacturer of the cost item.
  - `catalog_number`: string - The catalog number of the cost item.
  - `supplier`: string - The supplier of the cost item.
  - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `waste`: number(decimal) - The waste percentage associated with the cost item.
  - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
  - `item_margin`: number(decimal) - The margin applied to the cost item.
  - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
  - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
  - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
  - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
  - `notes`: string - Any additional notes about the cost item.
  - `multiplier`: number(decimal) (required) - The multiplier applied to the cost sub-item.

Response 200 (application/json): object

- `data`: object - Represents a model to get cost item details.
  - `id`: string - The unique identifier for the cost item.
  - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
  - `name`: string - The name of the cost item.
  - `description`: string - The description of the cost item.
  - `unit_cost`: number(decimal) - The unit cost of the cost item.
  - `unit_labor`: number(decimal) - The unit labor required for the cost item.
  - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
  - `manufacturer`: string - The manufacturer of the cost item.
  - `catalog_number`: string - The catalog number of the cost item.
  - `supplier`: string - The supplier of the cost item.
  - `sub_job_code`: string - The sub-job code associated with the cost item.
  - `sub_job_name`: string - The name of the sub-job associated with the cost item.
  - `cost_code`: string - The cost code associated with the cost item.
  - `cost_name`: string - The name of the cost code associated with the cost item.
  - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
  - `waste`: number(decimal) - The waste percentage associated with the cost item.
  - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
  - `item_margin`: number(decimal) - The margin applied to the cost item.
  - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
  - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
  - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
  - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
  - `notes`: string - Any additional notes about the cost item.
  - `used_by_item_ids`: array of integer(int64) - Array of item IDs that use this cost item.
  - `color`: string - The color associated with the cost item. e.g. `#FF0000`
  - `delivery_unit`: integer(int32) - The delivery unit of the cost item.
  - `catalog_id`: string - The catalog ID associated with the cost item. e.g. `-1`
  - `custom`: boolean - Indicates whether the cost item is custom.
  - `sealed`: boolean - Indicates whether the cost item is sealed.
  - `sub_items`: array of object - Array of sub-items associated with the cost item.
    - `type`: string enum[PART, ASSEMBLY, CUSTOM, EQUIPMENT, SUBCONTRACTOR, TRAVEL, LABOR] - The type of the cost item.
    - `name`: string - The name of the cost item.
    - `description`: string - The description of the cost item.
    - `unit_cost`: number(decimal) - The unit cost of the cost item.
    - `unit_labor`: number(decimal) - The unit labor required for the cost item.
    - `unit_labor_cost`: number(decimal) - The cost of the unit labor.
    - `manufacturer`: string - The manufacturer of the cost item.
    - `catalog_number`: string - The catalog number of the cost item.
    - `supplier`: string - The supplier of the cost item.
    - `sub_job_code`: string - The sub-job code associated with the cost item.
    - `sub_job_name`: string - The name of the sub-job associated with the cost item.
    - `cost_code`: string - The cost code associated with the cost item.
    - `cost_name`: string - The name of the cost code associated with the cost item.
    - `cost_type_code`: string - The cost type code associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `cost_type_name`: string - The name of the cost type associated with the cost item. Applicable only for items categorized under a Custom cost type.
    - `waste`: number(decimal) - The waste percentage associated with the cost item.
    - `material_waste`: number(decimal) - The waste percentage associated with the cost item.
    - `item_margin`: number(decimal) - The margin applied to the cost item.
    - `labor_margin`: number(decimal) - The margin applied to the labor for the cost item.
    - `unit_labor_rate`: number(decimal) - The unit labor rate for the cost item.
    - `is_untaxed`: boolean - Indicates whether the cost item is untaxed.
    - `unit`: string enum[EA, FT, SQ_FT, CU_FT, GAL, LB, YD, SQ_YD, CU_YD, SQUARE, NONE, MINUTES, ...] - The unit of measurement for the cost item.
    - `notes`: string - Any additional notes about the cost item.
    - `multiplier`: number(decimal) (required) - The multiplier applied to the cost sub-item.

### DELETE /rest/v2.0/companies/{company_id}/estimating/catalogs/items/bulk_destroy  **[BETA]**

**Delete Cost Items**
The request body should be an array of item IDs, representing the items to be deleted.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- array of string

Response 200:  (no body)

