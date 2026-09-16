# Procore API: Currency Configurations (Construction Financials)

Source: https://developers.procore.com/reference/rest/ (tool category: Currency Configurations)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Company Currency Configurations](#company-currency-configurations) - versions 2.0, 1.0
- [Company Exchange Rates](#company-exchange-rates) - versions 1.0
- [Project Currency Configurations](#project-currency-configurations) - versions 1.0
- [Project Exchange Rates](#project-exchange-rates) - versions 1.0

## Company Currency Configurations

Resource id: `company-currency-configurations`. Raw spec: `../openapi-raw/company-currency-configurations.json`. Web: https://developers.procore.com/reference/rest/company-currency-configurations?version=latest
Product lines: Construction Financials

### POST /rest/v2.0/companies/{company_id}/currency_configuration

**Create Company Currency Configuration**
Creates the initial currency configuration for the specified company. The supplied `currency_iso_code` becomes the company's base currency. Setting `multicurrency_enabled=true` requires a signed multicurrency beta agreement, otherwise the API returns 400 MISSING_BETA_AGREEMENT. Returns the created configuration wrapped under a `data` key (V2 convention).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - String ID of the Procore company for which to create the currency configuration. Obtainable from GET /rest/v1.0/companies (cast to string).

Request body (application/json) (required):

- `currency_iso_code`: string (required) - ISO 4217 three-letter code for the company's base currency (e.g., 'USD', 'EUR', 'JPY'). Required. Determines the default currency for all company-level financial objects. Cannot be changed via the v1 PATCH endpoint, s... e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). Omit to leave unset. e.g. `symbol`
- `multicurrency_enabled`: boolean - Whether to enable multicurrency for the company on creation. When true, projects under this company may be configured with their own currency and exchange rates; requires a signed multicurrency beta agreement, otherwi... e.g. `false`

Response 201 (application/json): object

- `data`: object - The created company currency configuration.
  - `company_id`: string - String identifier of the Procore company this configuration belongs to. Matches the {company_id} path parameter (V2 returns IDs as strings). e.g. `43`
  - `currency_iso_code`: string - ISO 4217 three-letter currency code for the company's base currency (e.g., 'USD', 'EUR', 'JPY'). All company-scoped monetary amounts in Procore are denominated in this currency. e.g. `USD`
  - `currency_display`: string enum[symbol, code] - How currency amounts should be rendered. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). Returned as null when not specified in the create request. e.g. `symbol`
  - `multicurrency_enabled`: boolean - Whether multicurrency support is enabled for the company at the time of creation. Returned as null when not specified in the create request (treated as false until explicitly enabled). e.g. `false`
  - `multicurrency_enabled_effective_date`: string(date-time) - ISO 8601 timestamp marking when multicurrency was first enabled for the company. Null when multicurrency was not enabled in the create request. e.g. `2023-08-24T18:27:44Z`

Error responses: 400, 401, 403, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/currency_configuration

**Get Company Currency Configuration**
Returns the currency configuration for the specified company. When no configuration has been created yet, currency-related fields are returned as null while company eligibility and toggle defaults are still populated, so consumers can detect the unconfigured state without a 404.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company. Obtainable from GET /rest/v1.0/companies. Identifies which company's currency configuration to act on.

Response 200 (application/json): object

- `company_id`: integer - Procore company ID this configuration belongs to. Matches the {company_id} path parameter and is the foreign key to use for all company-scoped multicurrency requests. e.g. `43`
- `currency_iso_code`: string - ISO 4217 three-letter currency code for the company's base currency (e.g., 'USD', 'EUR', 'JPY'). All company-scoped monetary amounts in Procore are denominated in this currency. Null when no currency configuration has... e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). Null when no currency configuration has been created for the company. e.g. `code`
- `multicurrency_enabled`: boolean - Whether multicurrency support is enabled for the company. When true, projects under this company may be configured with their own currency and exchange rates. Returns false (and effective date null) when no configurat... e.g. `false`
- `multicurrency_enabled_effective_date`: string(date-time) - ISO 8601 timestamp marking when multicurrency was first enabled for the company. Null if multicurrency has never been enabled or no currency configuration exists. Use to audit when multicurrency went live. e.g. `2023-08-24T18:27:44Z`
- `eligible_for_multicurrency`: boolean - Whether the company satisfies the prerequisites to enable multicurrency (e.g., compatible ERP integration). When false, attempts to enable multicurrency will be rejected; use this to decide whether to surface the mult... e.g. `true`
- `multicurrency_phase_two_flag_enabled`: boolean - Whether the company has access to the extended multicurrency capabilities (separate base/quote currency tracking and per-record exchange rate fields used by multicurrency-aware downstream resources). When false, the c... e.g. `false`

Error responses: 400, 401, 403, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/currency_configuration

**Update Company Currency Configuration**
Updates the company's currency configuration. Send only the fields you want to change; omitted fields are left unchanged. Note that `currency_iso_code` cannot be changed via this endpoint — the base currency is fixed once set. Enabling multicurrency for the first time requires a signed beta agreement (returns 400 MISSING_BETA_AGREEMENT otherwise).

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company. Obtainable from GET /rest/v1.0/companies. Identifies which company's currency configuration to act on.

Request body (application/json) (required):

- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). Defaults to 'symbol' on first configuration. Omit to leave the existing... e.g. `symbol`
- `multicurrency_enabled`: boolean - Whether to enable multicurrency for the company. When true, projects under this company may be configured with their own currency and exchange rates. The first time you set this to true the company must have a signed ... e.g. `false`

Response 200 (application/json): object

- `company_id`: integer - Procore company ID this configuration belongs to. Matches the {company_id} path parameter and is the foreign key to use for all company-scoped multicurrency requests. e.g. `43`
- `currency_iso_code`: string - ISO 4217 three-letter currency code for the company's base currency (e.g., 'USD', 'EUR', 'JPY'). All company-scoped monetary amounts in Procore are denominated in this currency. e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). e.g. `code`
- `multicurrency_enabled`: boolean - Whether multicurrency support is enabled for the company. When true, projects under this company may be configured with their own currency and exchange rates. e.g. `false`
- `multicurrency_enabled_effective_date`: string(date-time) - ISO 8601 timestamp marking when multicurrency was first enabled for the company. Null if multicurrency has never been enabled. Use to audit when multicurrency went live. e.g. `2023-08-24T18:27:44Z`
- `eligible_for_multicurrency`: boolean - Whether the company satisfies the prerequisites to enable multicurrency (e.g., compatible ERP integration). When false, attempts to enable multicurrency will be rejected. e.g. `true`
- `multicurrency_phase_two_flag_enabled`: boolean - Whether the company has access to the extended multicurrency capabilities (separate base/quote currency tracking and per-record exchange rate fields used by multicurrency-aware downstream resources). When false, the c... e.g. `false`

Error responses: 400, 401, 403, 404, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/currency_configuration

**Delete Company Currency Configuration**
Deletes the company's currency configuration. Returns the deleted configuration in the 200 response body. After deletion, subsequent GETs return null currency fields until a new configuration is created. Returns 404 if no configuration exists.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company. Obtainable from GET /rest/v1.0/companies. Identifies which company's currency configuration to act on.

Response 200 (application/json): object

- `company_id`: integer - Procore company ID this configuration belongs to. Matches the {company_id} path parameter and is the foreign key to use for all company-scoped multicurrency requests. e.g. `43`
- `currency_iso_code`: string - ISO 4217 three-letter currency code for the company's base currency (e.g., 'USD', 'EUR', 'JPY'). All company-scoped monetary amounts in Procore are denominated in this currency. e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). e.g. `code`
- `multicurrency_enabled`: boolean - Whether multicurrency support is enabled for the company. When true, projects under this company may be configured with their own currency and exchange rates. e.g. `false`
- `multicurrency_enabled_effective_date`: string(date-time) - ISO 8601 timestamp marking when multicurrency was first enabled for the company. Null if multicurrency has never been enabled. Use to audit when multicurrency went live. e.g. `2023-08-24T18:27:44Z`
- `eligible_for_multicurrency`: boolean - Whether the company satisfies the prerequisites to enable multicurrency (e.g., compatible ERP integration). When false, attempts to enable multicurrency will be rejected. e.g. `true`
- `multicurrency_phase_two_flag_enabled`: boolean - Whether the company has access to the extended multicurrency capabilities (separate base/quote currency tracking and per-record exchange rate fields used by multicurrency-aware downstream resources). When false, the c... e.g. `false`

Error responses: 400, 401, 403, 404, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Exchange Rates

Resource id: `company-exchange-rates`. Raw spec: `../openapi-raw/company-exchange-rates.json`. Web: https://developers.procore.com/reference/rest/company-exchange-rates?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/currency_configuration/exchange_rates

**Get Company Exchange Rates**
Returns the collection of active company-level exchange rates. Each rate quotes how many units of `quote_currency_iso_code` equal one unit of the company base currency. Returns an empty array when no rates have been configured.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company whose exchange rates are being queried or modified. Obtainable from GET /rest/v1.0/companies.

Response 200 (application/json): object

- `exchange_rates`: array of object - Array of company-level exchange rates. Empty when no rates have been configured for the company. Only active rates are returned (this V1 GET does not accept an include_inactive query parameter).
  - `id`: integer - Integer identifier of the exchange rate. Pass this value as `exchange_rates[].id` in the PATCH body to update or activate/deactivate this rate. e.g. `1`
  - `company_id`: integer - Procore company ID that owns this exchange rate. Matches the {company_id} path parameter. e.g. `43`
  - `base_currency_iso_code`: string - ISO 4217 three-letter code of the company's base currency. All rates in this collection share the same base. One unit of this currency equals `exchange_rate` units of `quote_currency_iso_code`. e.g. `USD`
  - `quote_currency_iso_code`: string - ISO 4217 three-letter code of the quote currency. `(base_currency_iso_code, quote_currency_iso_code)` uniquely identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string - Decimal exchange rate, returned as a string to preserve precision. Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code` at the rate's effective date. e.g. `1.0`
  - `is_active`: boolean - Whether this exchange rate is currently active. Active rates are used to convert between the currency pair at runtime. Inactive rates are retained for audit history but not used for new conversions. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was last updated. e.g. `2023-07-10T00:00:00Z`
  - `created_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was created. e.g. `2023-07-10T00:00:00Z`

Error responses: 400, 401, 403, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/currency_configuration/exchange_rates

**Create Company Exchange Rates**
Creates one or more exchange rates for the company. Every rate is created against the supplied `base_currency_iso_code`, which must match the company's existing base currency. Returns 400 if any (base, quote) pair already exists for this company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company whose exchange rates are being queried or modified. Obtainable from GET /rest/v1.0/companies.

Request body (application/json) (required):

- `base_currency_iso_code`: string (required) - ISO 4217 three-letter code of the company's base currency (e.g., 'USD'). Required. Every rate in the `exchange_rates` array will be created against this base. Must match the company's existing currency_iso_code. e.g. `USD`
- `exchange_rates`: array of object (required) - Array of new exchange rates to create. Each item must specify a unique `quote_currency_iso_code` (the currency pair must not already exist for this company).
  - `quote_currency_iso_code`: string (required) - ISO 4217 three-letter code of the quote currency (e.g., 'CAD'). Required. Combined with `base_currency_iso_code` it identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string (required) - Decimal exchange rate, sent as a string to preserve precision. Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code`. Required. e.g. `1.0`

Response 201 (application/json): object

- `exchange_rates`: array of object - Array of company-level exchange rates. Empty when no rates have been configured for the company. Only active rates are returned (this V1 GET does not accept an include_inactive query parameter).
  - `id`: integer - Integer identifier of the exchange rate. Pass this value as `exchange_rates[].id` in the PATCH body to update or activate/deactivate this rate. e.g. `1`
  - `company_id`: integer - Procore company ID that owns this exchange rate. Matches the {company_id} path parameter. e.g. `43`
  - `base_currency_iso_code`: string - ISO 4217 three-letter code of the company's base currency. All rates in this collection share the same base. One unit of this currency equals `exchange_rate` units of `quote_currency_iso_code`. e.g. `USD`
  - `quote_currency_iso_code`: string - ISO 4217 three-letter code of the quote currency. `(base_currency_iso_code, quote_currency_iso_code)` uniquely identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string - Decimal exchange rate, returned as a string to preserve precision. Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code` at the rate's effective date. e.g. `1.0`
  - `is_active`: boolean - Whether this exchange rate is currently active. Active rates are used to convert between the currency pair at runtime. Inactive rates are retained for audit history but not used for new conversions. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was last updated. e.g. `2023-07-10T00:00:00Z`
  - `created_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was created. e.g. `2023-07-10T00:00:00Z`

Error responses: 400, 401, 403, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/currency_configuration/exchange_rates

**Update Company Exchange Rates**
Updates existing company exchange rates in bulk. Each item in the `exchange_rates` array must include an integer `id` from a prior GET response; other fields are optional and only modified when present. Use `is_active` to soft-delete or reactivate a rate without losing its audit history.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company whose exchange rates are being queried or modified. Obtainable from GET /rest/v1.0/companies.

Request body (application/json) (required):

- `exchange_rates`: array of object (required) - Array of existing exchange rates to update. Each item must include the integer `id` of the rate being updated; other fields are optional and only updated if present.
  - `id`: integer (required) - Integer ID of the exchange rate to update. Required. Obtain from a prior GET /rest/v1.0/companies/{company_id}/currency_configuration/exchange_rates response. e.g. `1`
  - `quote_currency_iso_code`: string - Optional. ISO 4217 three-letter code of the new quote currency for this rate. Must not match the base currency. Must not conflict with an existing rate for the same base currency pair — returns 400 if a rate for that ... e.g. `CAD`
  - `exchange_rate`: string - Optional decimal exchange rate (sent as a string for precision). Updated rate value, expressed as number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code`. e.g. `1.0`
  - `is_active`: boolean - Optional. Set to false to deactivate this rate. Set to true to reactivate a previously inactive rate. e.g. `true`

Response 200 (application/json): object

- `exchange_rates`: array of object - Array of company-level exchange rates. Empty when no rates have been configured for the company. Only active rates are returned (this V1 GET does not accept an include_inactive query parameter).
  - `id`: integer - Integer identifier of the exchange rate. Pass this value as `exchange_rates[].id` in the PATCH body to update or activate/deactivate this rate. e.g. `1`
  - `company_id`: integer - Procore company ID that owns this exchange rate. Matches the {company_id} path parameter. e.g. `43`
  - `base_currency_iso_code`: string - ISO 4217 three-letter code of the company's base currency. All rates in this collection share the same base. One unit of this currency equals `exchange_rate` units of `quote_currency_iso_code`. e.g. `USD`
  - `quote_currency_iso_code`: string - ISO 4217 three-letter code of the quote currency. `(base_currency_iso_code, quote_currency_iso_code)` uniquely identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string - Decimal exchange rate, returned as a string to preserve precision. Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code` at the rate's effective date. e.g. `1.0`
  - `is_active`: boolean - Whether this exchange rate is currently active. Active rates are used to convert between the currency pair at runtime. Inactive rates are retained for audit history but not used for new conversions. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was last updated. e.g. `2023-07-10T00:00:00Z`
  - `created_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was created. e.g. `2023-07-10T00:00:00Z`

Error responses: 400, 401, 403, 404, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Currency Configurations

Resource id: `project-currency-configurations`. Raw spec: `../openapi-raw/project-currency-configurations.json`. Web: https://developers.procore.com/reference/rest/project-currency-configurations?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration

**Get Project Currency Configuration**
Returns the currency configuration for the specified project. When no configuration has been created yet, currency-related fields are returned as null while company eligibility and toggle defaults are still populated, so consumers can detect the unconfigured state without a 404.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company that owns the project. Obtainable from GET /rest/v1.0/companies.
- `project_id` [path] integer (required) - Integer ID of the Procore project. Obtainable from GET /rest/v1.0/companies/{company_id}/projects. Identifies which project's currency configuration to act on.

Response 200 (application/json): object

- `company_id`: integer - Procore company ID that owns this project. Matches the {company_id} path parameter. e.g. `43`
- `project_id`: integer - Procore project ID this configuration belongs to. Matches the {project_id} path parameter and is the foreign key to use for all project-scoped multicurrency requests. e.g. `56`
- `currency_iso_code`: string - ISO 4217 three-letter currency code for the project's currency (e.g., 'USD', 'EUR'). May differ from the company base currency when company-level multicurrency is enabled. Null when no project currency configuration h... e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered for this project. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). Null when no project currency configuration has been c... e.g. `code`
- `company_currency_exchange_rate_override`: string - Decimal override (sent as a string for precision) that supersedes the company-level exchange rate when converting between the project currency and the company base currency. Null to use the company exchange rate. e.g. `1.2`
- `currency_iso_code_eligible_for_update`: boolean - Whether the project's `currency_iso_code` can still be changed. Currently always returns true; will reflect exchange-rate / multicurrency-record presence once project exchange-rate APIs are GA. e.g. `true`
- `multicurrency_enabled`: boolean - Whether multicurrency settings apply to this project's financial objects. Defaults to false. When true, financial objects can use a different currency from the company base. Requires the parent company to also have mu... e.g. `true`
- `eligible_for_financial_objs_multicurrency`: boolean - Whether the parent company satisfies the prerequisites (e.g., ERP integration compatibility) to apply project-level multicurrency to financial objects. When false, attempts to enable `multicurrency_enabled` on the pro... e.g. `true`
- `multicurrency_phase_two_flag_enabled`: boolean - Inherited from the parent company. Indicates whether the project has access to the extended multicurrency capabilities (separate base/quote currency tracking and per-record exchange rate fields used by multicurrency-a... e.g. `false`

Error responses: 400, 401, 403, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration

**Create Project Currency Configuration**
Creates a project currency configuration. Requires the parent company to have multicurrency enabled, otherwise the API returns 400. The project currency may differ from the company base currency. Returns 400 if a configuration already exists for the project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company that owns the project. Obtainable from GET /rest/v1.0/companies.
- `project_id` [path] integer (required) - Integer ID of the Procore project. Obtainable from GET /rest/v1.0/companies/{company_id}/projects. Identifies which project's currency configuration to act on.

Request body (application/json) (required):

- `currency_iso_code`: string (required) - ISO 4217 three-letter code for the project's currency (e.g., 'EUR'). Required. May differ from the company base currency when company-level multicurrency is enabled. Check `currency_iso_code_eligible_for_update` in th... e.g. `USD`
- `company_currency_exchange_rate_override`: string - Optional decimal override (sent as a string for precision). When set, overrides the company-level exchange rate when converting between this project's currency and the company base currency. Omit to use the company ex... e.g. `1.2`
- `currency_display`: string enum[symbol, code] - Controls how currency amounts are formatted in responses and rendered to end users. 'symbol' uses the locale currency glyph (e.g., $); 'code' uses the ISO code (e.g., USD). Defaults to 'symbol'. e.g. `symbol`
- `multicurrency_enabled`: boolean - Whether to apply project-level currency settings to this project's financial objects. Defaults to false. Requires the parent company to also have multicurrency enabled; otherwise the API returns 400. e.g. `true`

Response 201 (application/json): object

- `company_id`: integer - Procore company ID that owns this project. Matches the {company_id} path parameter. e.g. `43`
- `project_id`: integer - Procore project ID this configuration belongs to. Matches the {project_id} path parameter and is the foreign key to use for all project-scoped multicurrency requests. e.g. `56`
- `currency_iso_code`: string - ISO 4217 three-letter currency code for the project's currency (e.g., 'USD', 'EUR'). May differ from the company base currency when company-level multicurrency is enabled. e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered for this project. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). e.g. `code`
- `company_currency_exchange_rate_override`: string - Decimal override (sent as a string for precision) that supersedes the company-level exchange rate when converting between the project currency and the company base currency. Null to use the company exchange rate. e.g. `1.2`
- `currency_iso_code_eligible_for_update`: boolean - Whether the project's `currency_iso_code` can still be changed. Currently always returns true; will reflect exchange-rate / multicurrency-record presence once project exchange-rate APIs are GA. e.g. `true`
- `multicurrency_enabled`: boolean - Whether multicurrency settings apply to this project's financial objects. When true, financial objects can use a different currency from the company base. Requires the parent company to also have multicurrency enabled. e.g. `true`
- `eligible_for_financial_objs_multicurrency`: boolean - Whether the parent company satisfies the prerequisites (e.g., ERP integration compatibility) to apply project-level multicurrency to financial objects. When false, attempts to enable `multicurrency_enabled` on the pro... e.g. `true`
- `multicurrency_phase_two_flag_enabled`: boolean - Inherited from the parent company. Indicates whether the project has access to the extended multicurrency capabilities (separate base/quote currency tracking and per-record exchange rate fields used by multicurrency-a... e.g. `false`

Error responses: 400, 401, 403, 422, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration

**Update Project Currency Configuration**
Updates the project's currency configuration. Send only the fields you want to change; omitted fields are left unchanged. `currency_iso_code` can only be updated while `currency_iso_code_eligible_for_update` is true.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company that owns the project. Obtainable from GET /rest/v1.0/companies.
- `project_id` [path] integer (required) - Integer ID of the Procore project. Obtainable from GET /rest/v1.0/companies/{company_id}/projects. Identifies which project's currency configuration to act on.

Request body (application/json) (required):

- `currency_iso_code`: string - Optional. ISO 4217 three-letter code for the project's currency (e.g., 'EUR'). Only updatable while `currency_iso_code_eligible_for_update` is true in the GET response. Returns 400 if an update is attempted when the f... e.g. `USD`
- `company_currency_exchange_rate_override`: string - Optional decimal override (sent as a string for precision). When set, supersedes the company-level exchange rate when converting between this project's currency and the company base currency. Send null to clear the ov... e.g. `1.2`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered for this project. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). Omit to leave unchanged. e.g. `symbol`
- `multicurrency_enabled`: boolean - Whether to apply project-level currency settings to this project's financial objects. Requires the parent company to also have multicurrency enabled; otherwise the API returns 400. Omit to leave the existing value unc... e.g. `true`

Response 200 (application/json): object

- `company_id`: integer - Procore company ID that owns this project. Matches the {company_id} path parameter. e.g. `43`
- `project_id`: integer - Procore project ID this configuration belongs to. Matches the {project_id} path parameter and is the foreign key to use for all project-scoped multicurrency requests. e.g. `56`
- `currency_iso_code`: string - ISO 4217 three-letter currency code for the project's currency (e.g., 'USD', 'EUR'). May differ from the company base currency when company-level multicurrency is enabled. e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered for this project. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). e.g. `code`
- `company_currency_exchange_rate_override`: string - Decimal override (sent as a string for precision) that supersedes the company-level exchange rate when converting between the project currency and the company base currency. Null to use the company exchange rate. e.g. `1.2`
- `currency_iso_code_eligible_for_update`: boolean - Whether the project's `currency_iso_code` can still be changed. Currently always returns true; will reflect exchange-rate / multicurrency-record presence once project exchange-rate APIs are GA. e.g. `true`
- `multicurrency_enabled`: boolean - Whether multicurrency settings apply to this project's financial objects. When true, financial objects can use a different currency from the company base. Requires the parent company to also have multicurrency enabled. e.g. `true`
- `eligible_for_financial_objs_multicurrency`: boolean - Whether the parent company satisfies the prerequisites (e.g., ERP integration compatibility) to apply project-level multicurrency to financial objects. When false, attempts to enable `multicurrency_enabled` on the pro... e.g. `true`
- `multicurrency_phase_two_flag_enabled`: boolean - Inherited from the parent company. Indicates whether the project has access to the extended multicurrency capabilities (separate base/quote currency tracking and per-record exchange rate fields used by multicurrency-a... e.g. `false`

Error responses: 400, 401, 403, 404, 422, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration

**Delete Project Currency Configuration**
Deletes the project's currency configuration. Returns the deleted configuration in the 200 response body. After deletion, subsequent GETs return null currency fields until a new configuration is created. Returns 404 if no configuration exists.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company that owns the project. Obtainable from GET /rest/v1.0/companies.
- `project_id` [path] integer (required) - Integer ID of the Procore project. Obtainable from GET /rest/v1.0/companies/{company_id}/projects. Identifies which project's currency configuration to act on.

Response 200 (application/json): object

- `company_id`: integer - Procore company ID that owns this project. Matches the {company_id} path parameter. e.g. `43`
- `project_id`: integer - Procore project ID this configuration belongs to. Matches the {project_id} path parameter and is the foreign key to use for all project-scoped multicurrency requests. e.g. `56`
- `currency_iso_code`: string - ISO 4217 three-letter currency code for the project's currency (e.g., 'USD', 'EUR'). May differ from the company base currency when company-level multicurrency is enabled. e.g. `USD`
- `currency_display`: string enum[symbol, code] - How currency amounts should be rendered for this project. 'symbol' renders with the locale currency glyph (e.g., $); 'code' renders with the ISO code (e.g., USD). e.g. `code`
- `company_currency_exchange_rate_override`: string - Decimal override (sent as a string for precision) that supersedes the company-level exchange rate when converting between the project currency and the company base currency. Null to use the company exchange rate. e.g. `1.2`
- `currency_iso_code_eligible_for_update`: boolean - Whether the project's `currency_iso_code` can still be changed. Currently always returns true; will reflect exchange-rate / multicurrency-record presence once project exchange-rate APIs are GA. e.g. `true`
- `multicurrency_enabled`: boolean - Whether multicurrency settings apply to this project's financial objects. When true, financial objects can use a different currency from the company base. Requires the parent company to also have multicurrency enabled. e.g. `true`
- `eligible_for_financial_objs_multicurrency`: boolean - Whether the parent company satisfies the prerequisites (e.g., ERP integration compatibility) to apply project-level multicurrency to financial objects. When false, attempts to enable `multicurrency_enabled` on the pro... e.g. `true`
- `multicurrency_phase_two_flag_enabled`: boolean - Inherited from the parent company. Indicates whether the project has access to the extended multicurrency capabilities (separate base/quote currency tracking and per-record exchange rate fields used by multicurrency-a... e.g. `false`

Error responses: 401, 403, 404, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Exchange Rates

Resource id: `project-exchange-rates`. Raw spec: `../openapi-raw/project-exchange-rates.json`. Web: https://developers.procore.com/reference/rest/project-exchange-rates?version=latest
Product lines: Construction Financials

### GET /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration/exchange_rates

**Get Project Exchange Rates**
Returns the collection of project-level exchange rates. By default only active rates are returned; pass `include_inactive=true` to also include inactive rates (useful for audit views). Returns an empty array when no rates have been configured.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company that owns the project. Obtainable from GET /rest/v1.0/companies.
- `project_id` [path] integer (required) - Integer ID of the Procore project whose exchange rates are being queried or modified. Obtainable from GET /rest/v1.0/companies/{company_id}/projects.
- `include_inactive` [query] boolean - When true, includes inactive (soft-deleted) exchange rates in the response alongside active ones. Defaults to false (only active rates returned). Useful for audit views and managing rate lifecycle. The string values "...

Response 200 (application/json): object

- `exchange_rates`: array of object - Array of project-level exchange rates. Empty when no rates have been configured. By default only active rates are returned; pass `include_inactive=true` to include inactive rates as well.
  - `id`: integer - Integer identifier of the exchange rate. Pass this value as `exchange_rates[].id` in the PATCH body to update or activate/deactivate this rate. e.g. `1`
  - `company_id`: integer - Procore company ID that owns the project this rate belongs to. Matches the {company_id} path parameter. e.g. `43`
  - `project_id`: integer - Procore project ID this rate belongs to. Matches the {project_id} path parameter. e.g. `44`
  - `base_currency_iso_code`: string - ISO 4217 three-letter code of the project base currency. All rates in this collection share the same base. One unit of this currency equals `exchange_rate` units of `quote_currency_iso_code`. e.g. `USD`
  - `quote_currency_iso_code`: string - ISO 4217 three-letter code of the quote currency. `(base_currency_iso_code, quote_currency_iso_code)` uniquely identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string - Decimal exchange rate, returned as a string to preserve precision. Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code` at the rate's effective date. When the project is synced with co... e.g. `1.0`
  - `is_active`: boolean - Whether this exchange rate is currently active. Active rates are used to convert between the currency pair at runtime. Inactive rates are retained for audit history but not used for new conversions. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was last updated. e.g. `2023-07-10T00:00:00Z`
  - `created_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was created. e.g. `2023-07-10T00:00:00Z`

Error responses: 401, 403, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration/exchange_rates

**Create Project Exchange Rates**
Creates one or more exchange rates for the project. Requires the project to have multicurrency enabled, otherwise the API returns 400. Every rate is created against the supplied `base_currency_iso_code`, which must match the project's existing currency. When project rates are synced with company rates, the rate values are computed automatically and the API-supplied `exchange_rate` is ignored.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company that owns the project. Obtainable from GET /rest/v1.0/companies.
- `project_id` [path] integer (required) - Integer ID of the Procore project whose exchange rates are being queried or modified. Obtainable from GET /rest/v1.0/companies/{company_id}/projects.

Request body (application/json) (required):

- `base_currency_iso_code`: string (required) - ISO 4217 three-letter code of the project base currency (e.g., 'USD'). Required. Every rate in the `exchange_rates` array will be created against this base. Must match the project's existing `currency_iso_code`. e.g. `USD`
- `exchange_rates`: array of object (required) - Array of new exchange rates to create. Each item must specify a unique `quote_currency_iso_code` (the currency pair must not already exist for this project).
  - `quote_currency_iso_code`: string (required) - ISO 4217 three-letter code of the quote currency (e.g., 'CAD'). Required. Combined with `base_currency_iso_code` it identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string - Decimal exchange rate (sent as a string to preserve precision). Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code`. **Note:** If project exchange rates are synced with company rates,... e.g. `1.0`
  - `is_active`: boolean - Whether the new rate should be created in the active state. Defaults to true if omitted. Set to false to pre-stage an inactive rate that won't be used for conversions until activated via PATCH. e.g. `true`

Response 201 (application/json): object

- `exchange_rates`: array of object - Array of project-level exchange rates. Empty when no rates have been configured. By default only active rates are returned; pass `include_inactive=true` to include inactive rates as well.
  - `id`: integer - Integer identifier of the exchange rate. Pass this value as `exchange_rates[].id` in the PATCH body to update or activate/deactivate this rate. e.g. `1`
  - `company_id`: integer - Procore company ID that owns the project this rate belongs to. Matches the {company_id} path parameter. e.g. `43`
  - `project_id`: integer - Procore project ID this rate belongs to. Matches the {project_id} path parameter. e.g. `44`
  - `base_currency_iso_code`: string - ISO 4217 three-letter code of the project base currency. All rates in this collection share the same base. One unit of this currency equals `exchange_rate` units of `quote_currency_iso_code`. e.g. `USD`
  - `quote_currency_iso_code`: string - ISO 4217 three-letter code of the quote currency. `(base_currency_iso_code, quote_currency_iso_code)` uniquely identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string - Decimal exchange rate, returned as a string to preserve precision. Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code` at the rate's effective date. When the project is synced with co... e.g. `1.0`
  - `is_active`: boolean - Whether this exchange rate is currently active. Active rates are used to convert between the currency pair at runtime. Inactive rates are retained for audit history but not used for new conversions. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was last updated. e.g. `2023-07-10T00:00:00Z`
  - `created_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was created. e.g. `2023-07-10T00:00:00Z`

Error responses: 400, 401, 403, 404, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration/exchange_rates

**Update Project Exchange Rates**
Updates existing project exchange rates in bulk. Requires the project to have multicurrency enabled. Each item in the `exchange_rates` array must include an integer `id` from a prior GET response; other fields are optional and only modified when present. Use `is_active` to soft-delete or reactivate a rate without losing its audit history. When project rates are synced with company rates, the rate values are computed automatically and the API-supplied `exchange_rate` is ignored.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Integer ID of the Procore company that owns the project. Obtainable from GET /rest/v1.0/companies.
- `project_id` [path] integer (required) - Integer ID of the Procore project whose exchange rates are being queried or modified. Obtainable from GET /rest/v1.0/companies/{company_id}/projects.

Request body (application/json) (required):

- `exchange_rates`: array of object (required) - Array of existing exchange rates to update. Each item must include the integer `id` of the rate being updated; other fields are optional and only updated if present.
  - `id`: integer (required) - Integer ID of the exchange rate to update. Required. Obtain from a prior GET /rest/v1.0/companies/{company_id}/projects/{project_id}/currency_configuration/exchange_rates response. e.g. `1`
  - `quote_currency_iso_code`: string - Optional. ISO 4217 three-letter code of the new quote currency for this rate. Must not match the base currency. Must not conflict with an existing rate for the same base currency pair — returns 400 if a rate for that ... e.g. `CAD`
  - `exchange_rate`: string - Optional decimal exchange rate (sent as a string for precision). Updated rate value, expressed as number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code`. **Note:** If project exchange ra... e.g. `1.0`
  - `is_active`: boolean - Optional. Set to false to deactivate this rate. Set to true to reactivate a previously inactive rate. e.g. `true`

Response 200 (application/json): object

- `exchange_rates`: array of object - Array of project-level exchange rates. Empty when no rates have been configured. By default only active rates are returned; pass `include_inactive=true` to include inactive rates as well.
  - `id`: integer - Integer identifier of the exchange rate. Pass this value as `exchange_rates[].id` in the PATCH body to update or activate/deactivate this rate. e.g. `1`
  - `company_id`: integer - Procore company ID that owns the project this rate belongs to. Matches the {company_id} path parameter. e.g. `43`
  - `project_id`: integer - Procore project ID this rate belongs to. Matches the {project_id} path parameter. e.g. `44`
  - `base_currency_iso_code`: string - ISO 4217 three-letter code of the project base currency. All rates in this collection share the same base. One unit of this currency equals `exchange_rate` units of `quote_currency_iso_code`. e.g. `USD`
  - `quote_currency_iso_code`: string - ISO 4217 three-letter code of the quote currency. `(base_currency_iso_code, quote_currency_iso_code)` uniquely identifies the currency pair this rate covers. e.g. `CAD`
  - `exchange_rate`: string - Decimal exchange rate, returned as a string to preserve precision. Number of units of `quote_currency_iso_code` per one unit of `base_currency_iso_code` at the rate's effective date. When the project is synced with co... e.g. `1.0`
  - `is_active`: boolean - Whether this exchange rate is currently active. Active rates are used to convert between the currency pair at runtime. Inactive rates are retained for audit history but not used for new conversions. e.g. `true`
  - `updated_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was last updated. e.g. `2023-07-10T00:00:00Z`
  - `created_at`: string(date-time) - ISO 8601 timestamp marking when the exchange rate was created. e.g. `2023-07-10T00:00:00Z`

Error responses: 400, 401, 403, 404, 500, 503, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

