# Procore API: Reports (Procore Helix)

Source: https://developers.procore.com/reference/rest/ (tool category: Reports)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Field Production Report](#field-production-report) - versions 1.0

## Field Production Report

Resource id: `field-production-report`. Raw spec: `../openapi-raw/field-production-report.json`. Web: https://developers.procore.com/reference/rest/field-production-report?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/field_production_report

**List Field Production Report Summary**
Returns an array calculated production rates across cost codes with an associated Budgeted Production Quantity

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [query] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `cost_code_id`: integer - ID of associated cost code e.g. `302323`
- `cost_code`: string - Code and description of associated cost code e.g. `03 - Instructions`
- `budgeted_hours`: number - Number of labor hours budgeted for the given cost code e.g. `100`
- `actual_hours`: number - Number of labor hours logged for the given cost code to date e.g. `46.5`
- `remaining_hours`: number - Budgeted Hours - Actual Hours e.g. `53.5`
- `hours_utilization`: string - (Actual Hours / Budgeted Hours) * 100 e.g. `46.5%`
- `projected_hours_at_completion`: number - (Actual Hours / Actual Quantities) * Remaining Quantities e.g. `108.5`
- `earned_hours`: number - (Budgeted Hours * Actual Quantities) / Budgeted Quantities e.g. `30`
- `budgeted_quantity`: number - Budgeted amount of a unit to install for the given cost code e.g. `100`
- `actual_quantity`: number - Actual amount of a unit installed for the given cost code to date e.g. `30`
- `remaining_quantities`: number - Budgeted Quantity - Actual Quantity e.g. `70`
- `unit_of_measure`: string - One of the following (ea, ls, lf, sf, sy, cy, mm, m, m^2, m^3, lbs, t, kg, ton) e.g. `ea`
- `percent_complete`: string - (Actual Quantity / Budgeted Quantity) * 100 e.g. `30%`
- `budgeted_production_rate`: number - Budgeted Quantity / Budgeted Hours e.g. `1`
- `actual_production_rate`: number - Actual Quantity / Actual Hours e.g. `0.65`
- `production_rate_variance`: number - Actual Production Rate - Budgeted Production Rate e.g. `-0.35`
- `is_budgeted`: string - Cost code budgeted (yes/no) e.g. `Yes`
- `sub_job_name`: string - Name of the associated sub job e.g. `Building 1`
- `sub_job_id`: integer - ID of the associated sub job e.g. `392483`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

