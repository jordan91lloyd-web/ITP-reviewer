# Procore API: Directory (Core)

Source: https://developers.procore.com/reference/rest/ (tool category: Directory)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Company Inactive People](#company-inactive-people) - versions 1.0
- [Company Inactive Users](#company-inactive-users) - versions 1.0
- [Company Inactive Vendors](#company-inactive-vendors) - versions 1.0
- [Company Insurances](#company-insurances) - versions 1.0
- [Company People](#company-people) - versions 2.0, 1.0
- [Company Permission Templates](#company-permission-templates) - versions 1.0
- [Company Users](#company-users) - versions 2.0, 1.3, 1.2, 1.1, 1.0
- [Company Vendor Comments](#company-vendor-comments) - versions 1.0
- [Company Vendor Insurances](#company-vendor-insurances) - versions 1.0
- [Company Vendors](#company-vendors) - versions 1.1, 1.0
- [Crews](#crews) - versions 1.0
- [Departments](#departments) - versions 1.0
- [Distribution Groups](#distribution-groups) - versions 1.0
- [Project Assignable Users](#project-assignable-users) - versions 1.0
- [Project Assignments Filter Options](#project-assignments-filter-options) - versions 1.0
- [Project Directory Filter Options](#project-directory-filter-options) - versions 1.0
- [Project Distribution Groups](#project-distribution-groups) - versions 1.0
- [Project Inactive People](#project-inactive-people) - versions 1.0
- [Project Inactive Users](#project-inactive-users) - versions 1.0
- [Project Inactive Vendors](#project-inactive-vendors) - versions 1.0
- [Project Insurances](#project-insurances) - versions 1.0
- [Project Memberships](#project-memberships) - versions 2.0, 1.0
- [Project People](#project-people) - versions 1.0
- [Project Permission Templates](#project-permission-templates) - versions 1.0
- [Project Permission Templates Assignments](#project-permission-templates-assignments) - versions 1.0
- [Project Users](#project-users) - versions 1.0
- [Project Vendor Insurances](#project-vendor-insurances) - versions 1.0
- [Project Vendors](#project-vendors) - versions 1.1, 1.0

## Company Inactive People

Resource id: `company-inactive-people`. Raw spec: `../openapi-raw/company-inactive-people.json`. Web: https://developers.procore.com/reference/rest/company-inactive-people?version=latest
Product lines: Total Quality and Safety Management, Field Productivity

### GET /rest/v1.0/companies/{company_id}/people/inactive

**List Inactive Company People**
Return a list of People associated with a Company. Includes Users in the Directory and Reference Users.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - ID of the Company
- `view` [query] string enum[normal, extended] - Specifies which view of the resource to return (which attributes should be present in the response). If a valid view is not provided, it will default to normal.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[is_employee]` [query] boolean - If true, returns item(s) where `is_employee` value is true.
- `filters[reference_users_only]` [query] boolean - If true, returns only people who are reference users.
- `filters[without_reference_users]` [query] boolean - If true, returns only people who are not reference users.
- `filters[search]` [query] string - Returns People where the search string matches the Person's name (first, last, or full), email address, mobile phone, business phone, fax number, or job title.
- `filters[connected]` [query] boolean - If true, returns only people who are connected users. If false, returns only people who are not connected users.
- `filters[state_code]` [query] string - Returns only people who have the specified state code.
- `filters[job_title]` [query] string - Returns only people who have the specified job title.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[trade_id]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Inactive Users

Resource id: `company-inactive-users`. Raw spec: `../openapi-raw/company-inactive-users.json`. Web: https://developers.procore.com/reference/rest/company-inactive-users?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/users/inactive

**List company inactive users**
Return a list of all Inactive Users associated with a Company.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - The address of the user. e.g. `6305 Carpinteria Ave`
- `avatar`: string - The URL pointing to the user avatar. e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - The business phone number of the user. e.g. `1-800-555-1234`
- `business_phone_extension`: integer - The business phone extension of the user. e.g. `21`
- `city`: string - The city that applies to the user. e.g. `Carpinteria`
- `country_code`: string - The country code that applies to the user, must be in ISO-3166 Alpha-2 format. e.g. `US`
- `email_address`: string(email) - The email address of the user. e.g. `user-company@example.com`
- `email_signature`: string - The email signature of the user. e.g. `<p>Sent from Example Company.</p>`
- `employee_id`: string - The unique employee identifier of the user. e.g. `123456789`
- `erp_integrated_accountant`: boolean - If this property is set to true, the user is an ERP-integrated accountant, if this property is set to false, the user is not an ERP-integrated accountant. e.g. `true`
- `fax_number`: string - The fax number of the user. e.g. `1-800-555-5678`
- `first_name`: string - The first name of the user. e.g. `Leah`
- `id`: integer - The unique idenfier of the user. e.g. `381006`
- `initials`: string - The initials of the user. e.g. `LR`
- `is_active`: boolean - If this property is set to true, the user status is active. If this property is set to false, the user status is inactive. e.g. `true`
- `is_employee`: boolean - If this property is set to true, the user is an employee. If this property is set to false, the user is not an employee. e.g. `false`
- `job_title`: string - The job title of the user. e.g. `QA Manager`
- `last_login_at`: string(date-time) - The date and time when the user logged in last. e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - The last name of the user. e.g. `Russell`
- `mobile_phone`: string - The mobile phone number of the user. e.g. `1-800-555-1234`
- `name`: string - The full name of the user. e.g. `Leah Russell`
- `notes`: string - The user notes. e.g. `notes`
- `state_code`: string - The state code that applies to the user. Must be in ISO-3166 Alpha-2 format. e.g. `CA`
- `welcome_email_sent_at`: string(date-time) - The date and time when the welcome email was sent to the user. e.g. `2013-05-30T20:41:58Z`
- `zip`: string - The ZIP code of the user. e.g. `93013`
- `origin_id`: string - The unique idenfitier for the user origin. e.g. `foobar`
- `origin_data`: string - User origin data. e.g. `OD-2398273424`
- `created_at`: string(date-time) - The date and time when the user was created in the system. e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - The date and time when the user was updated in the system. e.g. `2020-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `_links`: object - API Links
  - `reactivate`: string - Link to reactivate user e.g. `https://api.procore.com/rest/v1.0/companies/1/users/inactive/1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/users/inactive/{id}

**Reactivate company user**
Reactivate the specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `contact_id`: integer - User Contact ID e.g. `1`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_activated_at`: string(date-time) - User last activated at e.g. `2016-06-30T20:41:58Z`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `party_id`: integer - The Directory Party ID for this user, resolved via Contact → Person → Party. Null when the user has no associated person record. Use this ID when calling endpoints that require a party identifier (e.g. certification a... e.g. `12345`
- `permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `company_permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Inactive Vendors

Resource id: `company-inactive-vendors`. Raw spec: `../openapi-raw/company-inactive-vendors.json`. Web: https://developers.procore.com/reference/rest/company-inactive-vendors?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/vendors/inactive

**List company Inactive Vendors**
Return a list of all Inactive Vendors associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal, erp, extended, directory, summary] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is extended.
- `sort` [query] string enum[name] - Return items with the specified sort

Response 200 (application/json): array of object

- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(800) 555-1234`
- `city`: string - City e.g. `Jeffersonville`
- `connected_to_company_id`: integer - Connected Company ID e.g. `123`
- `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `joe-vendor@example.com`
- `fax_number`: string - Fax number e.g. `(800) 555-5678`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(800) 555-1234`
- `non_union_prevailing_wage`: boolean - Non-union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin unique identifiers e.g. `foobar`
- `origin_code`: string - Origin Code e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `website`: string - Website url e.g. `http://example-vendor.com`
- `zip`: string - Zip code e.g. `47130`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
- `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `bidding_distribution`: array of object - Bidding distribution list
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `project_ids`: array of integer - Array of Project IDs
- `standard_cost_codes`: array of object
  - `id`: integer - ID e.g. `12345`
  - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
  - `parent_id`: integer - Parent ID e.g. `12345`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Description e.g. `Site Work`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `_links`: object - API Links
  - `reactivate`: string - Link to reactivate vendor e.g. `https://api.procore.com/rest/v1.0/companies/1/vendors/inactive/1`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/vendors/inactive/{id}

**Reactivate company vendor**
Reactivate a specified Company Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the vendor
- `view` [query] string enum[compact, normal, erp, extended, directory, summary] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is extended.

Response 200 (application/json): object

- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `connected_to_company_id`: integer - Connected Company ID e.g. `123`
- `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`
- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding distribution list
  - `company_name`: string e.g. `^ Directory Testing Co.`
  - `id`: integer e.g. `6629`
  - `login`: string e.g. `read+gp@example.com`
  - `name`: string e.g. `Read + GPs Test`
- `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
- `legal_name`: string e.g. `1st Choice Glass Inc.`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `project_ids`: array of integer - Array of Project IDs
- `standard_cost_codes`: array of object
  - `id`: integer - ID e.g. `12345`
  - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
  - `parent_id`: integer - Parent ID e.g. `12345`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Description e.g. `Site Work`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Insurances

Resource id: `company-insurances`. Raw spec: `../openapi-raw/company-insurances.json`. Web: https://developers.procore.com/reference/rest/company-insurances?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/insurances

**List Company Insurances**
Return a list of all Insurances associated with the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/insurances

**Create Company Insurance**
Create a new Insurance associated with the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer (required) - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 201 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/insurances/{id}

**Show Company Insurance**
Return detailed information on the specified Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/insurances/{id}

**Update Company Insurance**
Update the specified Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer (required) - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/insurances/{id}

**Delete Company Insurance**
Delete the specified Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/insurances/sync

**Sync Company Insurances**
This endpoint creates or updates a batch of Company Insurances.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Insurance e.g. `348330`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `errors`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/insurances/sync

**Sync Company Insurances (Alternative)**
This endpoint creates or updates a batch of Company Insurances. Must provide Company ID in the request body.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Insurance e.g. `348330`
  - `company_id`: integer (required) - Company ID e.g. `243`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `errors`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company People

Resource id: `company-people`. Raw spec: `../openapi-raw/company-people.json`. Web: https://developers.procore.com/reference/rest/company-people?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Field Productivity

### POST /rest/v2.0/companies/{company_id}/people/bulk_activate  **[BETA]**

**Bulk activation**
Activate up to 1000 people at once

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `ids`: array of integer (required) - Array of people IDs to activate

Response 200 (application/json): object

- `data`: object
  - `ids`: array of integer - People IDs that were activated (excludes any that were already active)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/people/bulk_deactivate  **[BETA]**

**Bulk deactivation**
Deactivate up to 1000 people at once

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `ids`: array of integer (required) - Array of people IDs to deactivate

Response 200 (application/json): object

- `data`: object
  - `ids`: array of integer - People IDs that were deactivated (excludes any that were already inactive)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/people

**List Company People**
Return a list of People associated with a Company. Includes users in the directory and reference users.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - ID of the company
- `view` [query] string enum[normal, extended] - Specifies which view of the resource to return (which attributes should be present in the response). If a valid view is not provided, it will default to normal.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[is_employee]` [query] boolean - If true, returns item(s) where `is_employee` value is true.
- `filters[without_reference_users]` [query] boolean - If true, returns only people who are not reference users.
- `filters[reference_users_only]` [query] boolean - If true, returns only people who are reference users.
- `filters[search]` [query] string - Returns People where the search string matches the Person's name (first, last, or full), email address, mobile phone, business phone, fax number, or job title.
- `filters[connected]` [query] boolean - If true, returns only people who are connected users. If false, returns only people who are not connected users.
- `filters[state_code]` [query] string - Returns only people who have the specified state code.
- `filters[job_title]` [query] string - Returns only people who have the specified job title.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[trade_id]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/people

**Create Company Person**
Create a new Company Person.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - ID of the company
- `view` [query] string enum[normal, extended] - Specifies which view of the resource to return (which attributes should be present in the response). If a valid view is not provided, it will default to normal.

Request body (application/json) (required):

- `person`: object (required)
  - `first_name`: string - The First Name of the Company Person
  - `last_name`: string (required) - The Last Name of the Company Person
  - `is_employee`: boolean - The Employee status of the Company Person
  - `employee_id`: string - The Employee ID of the Company Person
  - `active`: boolean - The active status of the Company Person
  - `origin_id`: string - The Origin ID of the Company User e.g. `OD-3483830-2`
  - `job_title`: string - The Job Title of the Company Person e.g. `Developer`
  - `work_classification_id`: integer - The unique identifier for the work classification of the Company Person. e.g. `398438`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/people/{id}

**Update company person**
Update the specified Company Person.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - ID of the company
- `id` [path] integer (required) - ID of the person
- `view` [query] string enum[normal, extended] - Specifies which view of the resource to return (which attributes should be present in the response). If a valid view is not provided, it will default to normal.

Request body (application/json) (required):

- `person`: object (required)
  - `first_name`: string - The First Name of the Company Person
  - `last_name`: string (required) - The Last Name of the Company Person
  - `is_employee`: boolean - The Employee status of the Company Person
  - `employee_id`: string - The Employee ID of the Company Person
  - `active`: boolean - The active status of the Company Person
  - `origin_id`: string - The Origin ID of the Company User e.g. `OD-3483830-2`
  - `job_title`: string - The Job Title of the Company Person e.g. `Developer`
  - `work_classification_id`: integer - The unique identifier for the work classification of the Company Person. e.g. `398438`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Permission Templates

Resource id: `company-permission-templates`. Raw spec: `../openapi-raw/company-permission-templates.json`. Web: https://developers.procore.com/reference/rest/company-permission-templates?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/permission_templates

**List permission templates**
Returns the Permission Template names and IDs for the specified Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `filters[type]` [query] string - Allows filtering by template type. If none is provided, default is "project_tools". Allowed types = company_tools, project_tools, global. Example - ?filters[type]=company_tools
- `view` [query] string - Returns detailed permission templates if view=with_permissions is specified.

Response 200 (application/json): array of object

- `id`: integer - The ID of the Permission Template e.g. `1`
- `name`: string - The name of the Permission Template e.g. `General Contractor`
- `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
- `type`: string enum[project_specific, company_tools, global] - Permission Template type e.g. `global`
- `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/permission_templates

**Create Permission Template**
Returns the created Permission Template along with its permitted actions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `permission_template`: object (required) e.g. `{"id": 1, "name": "General Contractor", "user_access_levels": {"home": 2, "im...`
  - `id`: integer - The ID of the Permission Template e.g. `1`
  - `company_id`: integer - The ID of the Company the Permission Template belongs to e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `provider_type`: string - 'Project' or 'Company'
  - `type`: string - 'company_tools', 'global' or 'project_specific'
  - `provider_id`: integer - Either the company_id or project_id based on provider_type e.g. `3`
  - `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`
  - `user_access_levels`: object - user access levels for active tools e.g. `{"admin": 2, "images": 3}`
  - `permissions`: object - permitted actions for active tools e.g. `{"admin": {"view_settings": true, "view_wbs_configuration": true}, "images": ...`
  - `project_id`: integer - id of corresponding project if provider_type == Project e.g. `3`

Response 200 (application/json): object

- `id`: integer - The ID of the Permission Template e.g. `1`
- `company_id`: integer - The ID of the Company the Permission Template belongs to e.g. `1`
- `name`: string - The name of the Permission Template e.g. `General Contractor`
- `provider_type`: string - 'Project' or 'Company'
- `type`: string - 'company_tools', 'global' or 'project_specific'
- `provider_id`: integer - Either the company_id or project_id based on provider_type e.g. `3`
- `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`
- `user_access_levels`: object - user access levels for active tools e.g. `{"admin": 2, "images": 3}`
- `permissions`: object - permitted actions for active tools e.g. `{"admin": {"view_settings": true, "view_wbs_configuration": true}, "images": ...`
- `project_id`: integer - id of corresponding project if provider_type == Project e.g. `3`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/permission_templates/{id}

**Returns specific template**
Returns the Permission Template along with its permitted actions.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - The ID of the permission template to be retrieved

Response 200 (application/json): object

- `id`: integer - The ID of the Permission Template e.g. `1`
- `company_id`: integer - The ID of the Company the Permission Template belongs to e.g. `1`
- `name`: string - The name of the Permission Template e.g. `General Contractor`
- `provider_type`: string - 'Project' or 'Company'
- `type`: string - 'company_tools', 'global' or 'project_specific'
- `provider_id`: integer - Either the company_id or project_id based on provider_type e.g. `3`
- `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`
- `user_access_levels`: object - user access levels for active tools e.g. `{"admin": 2, "images": 3}`
- `permissions`: object - permitted actions for active tools e.g. `{"admin": {"view_settings": true, "view_wbs_configuration": true}, "images": ...`
- `project_id`: integer - id of corresponding project if provider_type == Project e.g. `3`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Users

Resource id: `company-users`. Raw spec: `../openapi-raw/company-users.json`. Web: https://developers.procore.com/reference/rest/company-users?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### PATCH /rest/v2.0/companies/{company_id}/users/bulk_update_project_details  **[BETA]**

**Bulk update project details for company users on projects**
This endpoint allows company users to bulk update their project details on multiple projects. Users must already be assigned to the project before their project details (roles, permission templates) can be updated.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a permission template id, project_role_ids, and project id that they want updated. The maximum amount per request is 1000 user_id, project_id, project_role_ids, permission_template...
  - `user_id`: string - The ID of the user update e.g. `12345`
  - `project_id`: string - The ID of user's project to update e.g. `23456`
  - `permission_template_id`: string - The ID of the permission template to update for the user e.g. `34567`
  - `project_role_ids`: array of string - An array of project role IDs to assign to the user for the project

Response 200 (application/json): object

- `data`: array of object
  - `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user that was added to the project e.g. `123`
    - `projects`: array of object - One key for each project ID for the user ID

Response 207 (application/json): object

- `data`: array of object
  - `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user whose project details were updated e.g. `123`
    - `projects`: array of object - One key for each project ID for the user ID
  - `errors`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user whose project details were updated e.g. `123`
    - `errors`: array of object - One key for each project ID for the user ID

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v2.0/companies/{company_id}/users/bulk_remove_project_details  **[BETA]**

**Bulk remove project details for company users on projects**
This endpoint allows company users to bulk remove project details  on multiple projects

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a permission template id, project_role_ids, and project id that they want updated. The maximum amount per request is 1000 user_id, project_id, project_role_ids, permission_template...
  - `user_id`: string - The ID of the user update e.g. `12345`
  - `project_id`: string - The ID of user's project to update e.g. `23456`
  - `permission_template_id`: string - The ID of the permission template to update for the user e.g. `34567`
  - `project_role_ids`: array of string - An array of project role IDs to assign to the user for the project

Response 200 (application/json): object

- `data`: array of object
  - `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user whose project details are removed e.g. `123`
    - `projects`: array of object - One key for each project ID for the user ID

Response 207 (application/json): object

- `data`: array of object
  - `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user whose project details were removed e.g. `123`
    - `projects`: array of object - One key for each project ID for the user ID
  - `errors`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user whose project details were removed e.g. `123`
    - `errors`: array of object - One key for each project ID for the user ID

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/users/bulk_add  **[BETA]**

**Bulk add company users to projects**
This endpoint allows company users to be bulk added to multiple projects with a permission template in one request.
If the user was already part of that project it will not update the assigned permission template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a permission template id and project id that they will be assinged to. The maximum amount per request is 50 user_id, project_id, permission_template_id triplets. If more than 50 ob...
  - `user_id`: string - The ID of the user to add e.g. `12345`
  - `project_id`: string - The ID of project to add the user to e.g. `23456`
  - `permission_template_id`: string - The ID of the permission template to assign to the user e.g. `34567`
  - `project_role_ids`: array of string - An array of project role IDs to assign to the user for the project

Response 200 (application/json): object

- `data`: array of object
  - `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user that was added to the project e.g. `123`
    - `projects`: array of object - One key for each project ID for the user ID

Response 202 (application/json): object

- `data`: array of object
  - `status`: string - Status of the batch job e.g. `accepted`
  - `batch_id`: string - ID of the batch job for checking status e.g. `batch-123abc456def`

Response 207 (application/json): object

- `data`: array of object
  - `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
    - `userId`: string - User Id of the user that was added to the project e.g. `123`
    - `projects`: array of object - One key for each project ID for the user ID
- `errors`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
  - `userId`: string - User Id of the user that was added to the project e.g. `123`
  - `errors`: array of object - One key for each project ID for the user ID
    - `projectId`: string - Project Id of the project the user was added to e.g. `123`
    - `message`: string - Descriptive message of the unsuccessful mutation e.g. `Contact could not be added.`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/users/bulk_remove  **[BETA]**

**Bulk remove company users from projects**
This endpoint allows company users to be bulk removed from multiple projects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a project id that they will be removed from. The maximum amount per request is 50 user_id, project_id duplets. If more than 50 objects are sent then a worker will be triggered to p...
  - `user_id`: string - The ID of the user to remove e.g. `12345`
  - `project_id`: string - The ID of project to add the user to remove from e.g. `23456`

Response 200 (application/json): object

- `data`: array of object
  - `{user_id}`: object - Maps project IDs to operation result status. `skipped_managed` indicates the membership is managed by Groups and was not removed (returned only when the Groups feature is enabled, USER-2168). e.g. `{"1234": "success", "5678": "skipped_managed"}`

Response 202 (application/json): object

- `data`: array of object
  - `status`: string - Status of the batch job e.g. `accepted`
  - `batch_id`: string - ID of the batch job for checking status e.g. `batch-123abc456def`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v2.0/companies/{company_id}/users/bulk/status/{id}  **[BETA]**

**Retrieves the status of the asyncronous job that a bulk users command queued**
Retrieves the status of the asyncronous job that a bulk users command queued.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `id` [path] string (required) - ID of the batch

Response 200 (application/json): object

- `data`: object
  - `is_complete`: boolean
  - `bid`: string - batch id
  - `total`: integer
  - `pending`: integer
  - `description`: string
  - `failures`: integer

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.3/companies/{company_id}/users

**List company users**
Return a list of all active users associated with a company. To retrieve a list of inactive users, see [List Company Inactive Users](/reference/rest/v1/company-inactive-users#list-company-inactive-users).
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `view` [query] string enum[extended, ids_only, normal] - Specifies which view of the resource to return (which attributes should be present in the response). If a valid view is not provided, it will return the default view: normal.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name, projects, email, job_title] - Return items with the specified sort.

Response 200 (application/json): array of oneOf(number | object | object)


Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.3/companies/{company_id}/users

**Create company user**
Create a new User in the specified Company.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `1`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`
  - `bid_contact`: boolean - Sets the user as a bid contact for the vendor it is associated with. `vendor_id` must also be provided for this to be set. e.g. `true`

Response 201 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.3/companies/{company_id}/users/sync

**Sync company users**
This endpoint creates or updates a batch of Company Users.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
Requires Directory Admin permissions.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Company User e.g. `123`
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) - The Email Address of the Company User e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 200 (application/json): object

- `entities`: array of object - Array of updated entities
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
  - `business_phone`: string - User business phone e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - User business phone extension e.g. `123`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `fax_number`: string - User fax number e.g. `1-555-555-1234`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `is_insurance_manager`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
  - `name`: string - User full name e.g. `Leah Russell`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `zip`: string - User zip code e.g. `93013`
  - `locale`: string - User locale e.g. `pt-BR`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `errors`: array of object
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_phone`: string - User business phone e.g. `1234567890`
  - `business_phone_extension`: integer - User business phone extension e.g. `21`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
  - `fax_number`: string - User fax number e.g. `5555555555`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `5555555555`
  - `name`: string - User full name e.g. `Jane Doe`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
  - `zip`: string - User zip code e.g. `93013`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true, "type": "gl...`
    - `id`: integer - Unique identifier for the Permission Template e.g. `1`
    - `name`: string - The name of the Permission Template e.g. `General Contractor`
    - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
    - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.3/companies/{company_id}/users/{id}

**Show company user**
Show detail on a specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.3/companies/{company_id}/users/{id}

**Update company user**
Update the specified User.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Russel`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.russel@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JR`
  - `origin_id`: string - The Origin ID of the Company User e.g. `OD-3483830-2`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `123`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`
  - `add_to_new_projects`: boolean - Whether or not this user is added to all new projects. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `true`

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.3/companies/{company_id}/users/{id}/invite

**Send invite**
Send invite email to specified user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 202 (application/json): object


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.3/companies/{company_id}/me

**Show current company user**
Show detail on the current Company User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_phone`: string - User business phone e.g. `1234567890`
- `business_phone_extension`: integer - User business phone extension e.g. `21`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `5555555555`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `5555555555`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `party_id`: integer - Party id e.g. `15`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true, "type": "gl...`
  - `id`: integer - The ID of the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
  - `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`
- `company_permission_template_id`: integer - User's Company Permission Template id
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `login_information_uuid`: string - Login information uuid e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.3/users  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List company users**
Return a list of all Users associated with a Company.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.3/companies/{company_id}/users/bulk_add  **[BETA / OLDER VERSION - a newer path version exists below/above]**

**Bulk add company users to projects**
This endpoint allows company users to be bulk added to multiple projects with a permission template in one request.
If the user was already part of that project it will not update the assigned permission template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a permission template id and project id that they will be assinged to. The maximum amount per request is 1000 user_id, project_id, permission_template_id triplets. If more than 100...
  - `user_id`: number - The ID of the user to add e.g. `12345`
  - `project_id`: number - The ID of project to add the user to e.g. `23456`
  - `permission_template_id`: number - The ID of the permission template to assign to the user e.g. `34567`

Response 200 (application/json): object

- `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
  - `userId`: string - User Id of the user that was added to the project e.g. `123`
  - `projects`: array of object - One key for each project ID for the user ID
    - `projectId`: string - Project Id of the project the user was added to e.g. `123`
    - `message`: string - Descriptive message of the successful mutation e.g. `user has been successfully added to the project`

Response 207 (application/json): object

- `entities`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
  - `userId`: string - User Id of the user that was added to the project e.g. `123`
  - `projects`: array of object - One key for each project ID for the user ID
    - `projectId`: string - Project Id of the project the user was added to e.g. `123`
    - `message`: string - Descriptive message of the successful mutation e.g. `user has been successfully added to the project`
- `errors`: array of object - One key for each user ID passed in, with an array of project IDs for that nested user ID
  - `userId`: string - User Id of the user that was added to the project e.g. `123`
  - `errors`: array of object - One key for each project ID for the user ID
    - `projectId`: string - Project Id of the project the user was added to e.g. `123`
    - `message`: string - Descriptive message of the unsuccessful mutation e.g. `Contact could not be added.`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.3/companies/{company_id}/users/bulk_remove  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk remove company users from projects**
This endpoint allows company users to be bulk removed from multiple projects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a project id that they will be removed from. The maximum amount per request is 1000 user_id, project_id duplets. If more than 1000 objects are sent then a worker will be triggered ...
  - `user_id`: number - The ID of the user to remove e.g. `12345`
  - `project_id`: number - The ID of project to add the user to remove from e.g. `23456`

Response 200 (application/json): object

- `userId`: object - One key for each project ID for that nested user ID
  - `projectId`: string - Success if the user ID / project ID combination succeeded, failure if not e.g. `success | failure`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.3/users/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show company user**
Show detail on a specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.2/companies/{company_id}/users  **[OLDER VERSION - a newer path version exists below/above]**

**List company users**
Return a list of all active users associated with a company. To retrieve a list of inactive users, see [List Company Inactive Users](/reference/rest/v1/company-inactive-users#list-company-inactive-users).
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name, projects, email, job_title] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `contact_id`: integer - User Contact ID e.g. `1`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_activated_at`: string(date-time) - User last activated at e.g. `2016-06-30T20:41:58Z`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `party_id`: integer - The Directory Party ID for this user, resolved via Contact → Person → Party. Null when the user has no associated person record. Use this ID when calling endpoints that require a party identifier (e.g. certification a... e.g. `12345`
- `permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `company_permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.2/companies/{company_id}/users  **[OLDER VERSION - a newer path version exists below/above]**

**Create company user**
Create a new User in the specified Company.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `1`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 201 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.2/companies/{company_id}/users/sync  **[OLDER VERSION - a newer path version exists below/above]**

**Sync company users**
This endpoint creates or updates a batch of Company Users.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
Requires Directory Admin permissions.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Company User e.g. `123`
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) - The Email Address of the Company User e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 200 (application/json): object

- `entities`: array of object - Array of updated entities
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
  - `business_phone`: string - User business phone e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - User business phone extension e.g. `123`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `fax_number`: string - User fax number e.g. `1-555-555-1234`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `is_insurance_manager`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
  - `name`: string - User full name e.g. `Leah Russell`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `zip`: string - User zip code e.g. `93013`
  - `locale`: string - User locale e.g. `pt-BR`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `errors`: array of object
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_phone`: string - User business phone e.g. `1234567890`
  - `business_phone_extension`: integer - User business phone extension e.g. `21`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
  - `fax_number`: string - User fax number e.g. `5555555555`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `5555555555`
  - `name`: string - User full name e.g. `Jane Doe`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
  - `zip`: string - User zip code e.g. `93013`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true, "type": "gl...`
    - `id`: integer - Unique identifier for the Permission Template e.g. `1`
    - `name`: string - The name of the Permission Template e.g. `General Contractor`
    - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
    - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.2/companies/{company_id}/users/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show company user**
Show detail on a specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.2/companies/{company_id}/users/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update company user**
Update the specified User.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Russel`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.russel@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JR`
  - `origin_id`: string - The Origin ID of the Company User e.g. `OD-3483830-2`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `123`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`
  - `add_to_new_projects`: boolean - Whether or not this user is added to all new projects. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `true`

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.2/users  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List company users**
Return a list of all Users associated with a Company.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.2/companies/{company_id}/users/bulk_add  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk add company users to projects**
This endpoint allows company users to be bulk added to multiple projects with a permission template in one request.
If the user was already part of that project it will not update the assigned permission template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a permission template id and project id that they will be assinged to. The maximum amount per request is 1000 user_id, project_id, permission_template_id triplets. If more than 100...
  - `user_id`: number - The ID of the user to add e.g. `12345`
  - `project_id`: number - The ID of project to add the user to e.g. `23456`
  - `permission_template_id`: number - The ID of the permission template to assign to the user e.g. `34567`

Response 200 (application/json): object

- `userId`: object - One key for each project ID for that nested user ID
  - `projectId`: string - Success if the user ID / project ID combination succeeded, failure if not e.g. `success | failure`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.2/companies/{company_id}/users/bulk_remove  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk remove company users from projects**
This endpoint allows company users to be bulk removed from multiple projects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a project id that they will be removed from. The maximum amount per request is 1000 user_id, project_id duplets. If more than 1000 objects are sent then a worker will be triggered ...
  - `user_id`: number - The ID of the user to remove e.g. `12345`
  - `project_id`: number - The ID of project to add the user to remove from e.g. `23456`

Response 200 (application/json): object

- `userId`: object - One key for each project ID for that nested user ID
  - `projectId`: string - Success if the user ID / project ID combination succeeded, failure if not e.g. `success | failure`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.2/companies/{company_id}/users/{id}/invite  **[OLDER VERSION - a newer path version exists below/above]**

**Send invite**
Send invite email to specified user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 202 (application/json): object


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.2/companies/{company_id}/me  **[OLDER VERSION - a newer path version exists below/above]**

**Show current company user**
Show detail on the current Company User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_phone`: string - User business phone e.g. `1234567890`
- `business_phone_extension`: integer - User business phone extension e.g. `21`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `5555555555`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `5555555555`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `party_id`: integer - Party id e.g. `15`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true, "type": "gl...`
  - `id`: integer - The ID of the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
  - `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`
- `company_permission_template_id`: integer - User's Company Permission Template id
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `login_information_uuid`: string - Login information uuid e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/users  **[OLDER VERSION - a newer path version exists below/above]**

**List company users**
Return a list of all active users associated with a company. To retrieve a list of inactive users, see [List Company Inactive Users](/reference/rest/v1/company-inactive-users#list-company-inactive-users).
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name, projects, email, job_title] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `contact_id`: integer - User Contact ID e.g. `1`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_activated_at`: string(date-time) - User last activated at e.g. `2016-06-30T20:41:58Z`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `party_id`: integer - The Directory Party ID for this user, resolved via Contact → Person → Party. Null when the user has no associated person record. Use this ID when calling endpoints that require a party identifier (e.g. certification a... e.g. `12345`
- `permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `company_permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/companies/{company_id}/users  **[OLDER VERSION - a newer path version exists below/above]**

**Create company user**
Create a new User in the specified Company.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `1`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 201 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/companies/{company_id}/users/sync  **[OLDER VERSION - a newer path version exists below/above]**

**Sync company users**
This endpoint creates or updates a batch of Company Users.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
Requires Directory Admin permissions.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Company User e.g. `123`
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) - The Email Address of the Company User e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 200 (application/json): object

- `entities`: array of object - Array of updated entities
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
  - `business_phone`: string - User business phone e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - User business phone extension e.g. `123`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `fax_number`: string - User fax number e.g. `1-555-555-1234`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `is_insurance_manager`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
  - `name`: string - User full name e.g. `Leah Russell`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `zip`: string - User zip code e.g. `93013`
  - `locale`: string - User locale e.g. `pt-BR`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `errors`: array of object
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_phone`: string - User business phone e.g. `1234567890`
  - `business_phone_extension`: integer - User business phone extension e.g. `21`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
  - `fax_number`: string - User fax number e.g. `5555555555`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `5555555555`
  - `name`: string - User full name e.g. `Jane Doe`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
  - `zip`: string - User zip code e.g. `93013`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true, "type": "gl...`
    - `id`: integer - Unique identifier for the Permission Template e.g. `1`
    - `name`: string - The name of the Permission Template e.g. `General Contractor`
    - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
    - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/users/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show company user**
Show detail on a specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/companies/{company_id}/users/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update company user**
Update the specified User.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Russel`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.russel@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JR`
  - `origin_id`: string - The Origin ID of the Company User e.g. `OD-3483830-2`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `123`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`
  - `add_to_new_projects`: boolean - Whether or not this user is added to all new projects. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `true`

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/users  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List company users**
Return a list of all Users associated with a Company.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/companies/{company_id}/users/bulk_add  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk add company users to projects**
This endpoint allows company users to be bulk added to multiple projects with a permission template in one request.
If the user was already part of that project it will not update the assigned permission template.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a permission template id and project id that they will be assinged to. The maximum amount per request is 1000 user_id, project_id, permission_template_id triplets. If more than 100...
  - `user_id`: number - The ID of the user to add e.g. `12345`
  - `project_id`: number - The ID of project to add the user to e.g. `23456`
  - `permission_template_id`: number - The ID of the permission template to assign to the user e.g. `34567`

Response 200 (application/json): object

- `userId`: object - One key for each project ID for that nested user ID
  - `projectId`: string - Success if the user ID / project ID combination succeeded, failure if not e.g. `success | failure`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/companies/{company_id}/users/bulk_remove  **[OLDER VERSION - a newer path version exists below/above]**

**Bulk remove company users from projects**
This endpoint allows company users to be bulk removed from multiple projects.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `users`: array of object (required) - Array of existing company users with a project id that they will be removed from. The maximum amount per request is 1000 user_id, project_id duplets. If more than 1000 objects are sent then a worker will be triggered ...
  - `user_id`: number - The ID of the user to remove e.g. `12345`
  - `project_id`: number - The ID of project to add the user to remove from e.g. `23456`

Response 200 (application/json): object

- `userId`: object - One key for each project ID for that nested user ID
  - `projectId`: string - Success if the user ID / project ID combination succeeded, failure if not e.g. `success | failure`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/users/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show company user**
Show detail on a specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/companies/{company_id}/users/{id}/invite  **[OLDER VERSION - a newer path version exists below/above]**

**Send invite**
Send invite email to specified user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 202 (application/json): object


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/companies/{company_id}/me  **[OLDER VERSION - a newer path version exists below/above]**

**Show current company user**
Show detail on the current Company User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_phone`: string - User business phone e.g. `1234567890`
- `business_phone_extension`: integer - User business phone extension e.g. `21`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `5555555555`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `5555555555`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer - Unique integer identifier for this vendor/company. e.g. `161072`
  - `name`: string - Display name of the vendor or contractor company. e.g. `SID Architecture`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `party_id`: integer - Party id e.g. `15`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true, "type": "gl...`
  - `id`: integer - The ID of the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
  - `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`
- `company_permission_template_id`: integer - User's Company Permission Template id
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `login_information_uuid`: string - Login information uuid e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users  **[OLDER VERSION - a newer path version exists below/above]**

**List company users**
Return a list of all active users associated with a company. To retrieve a list of inactive users, see [List Company Inactive Users](/reference/rest/v1/company-inactive-users#list-company-inactive-users). 
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name, projects, email, job_title] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `contact_id`: integer - User Contact ID e.g. `1`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_activated_at`: string(date-time) - User last activated at e.g. `2016-06-30T20:41:58Z`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `party_id`: integer - The Directory Party ID for this user, resolved via Contact → Person → Party. Null when the user has no associated person record. Use this ID when calling endpoints that require a party identifier (e.g. certification a... e.g. `12345`
- `permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `company_permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/users  **[OLDER VERSION - a newer path version exists below/above]**

**Create company user**
Create a new User in the specified Company.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `1`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 201 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/users/sync  **[OLDER VERSION - a newer path version exists below/above]**

**Sync company users**
This endpoint creates or updates a batch of Company Users.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
Requires Directory Admin permissions.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Company User e.g. `123`
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) - The Email Address of the Company User e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 200 (application/json): object

- `entities`: array of object - Array of updated entities
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
  - `business_phone`: string - User business phone e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - User business phone extension e.g. `123`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `fax_number`: string - User fax number e.g. `1-555-555-1234`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `is_insurance_manager`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
  - `name`: string - User full name e.g. `Leah Russell`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `zip`: string - User zip code e.g. `93013`
  - `locale`: string - User locale e.g. `pt-BR`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `errors`: array of object
  - `address`: string - User address e.g. `6305 Carpinteria Ave`
  - `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_phone`: string - User business phone e.g. `1234567890`
  - `business_phone_extension`: integer - User business phone extension e.g. `21`
  - `city`: string - User city e.g. `Carpinteria`
  - `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - User email e.g. `jane.doe@example.com`
  - `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - User employee id e.g. `123456789`
  - `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
  - `fax_number`: string - User fax number e.g. `5555555555`
  - `first_name`: string - User first name e.g. `Jane`
  - `id`: integer - User id e.g. `381006`
  - `initials`: string - User initials e.g. `JD`
  - `is_active`: boolean - User active status e.g. `true`
  - `is_employee`: boolean - User employee status e.g. `false`
  - `job_title`: string - User job title e.g. `QA Manager`
  - `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
  - `last_name`: string - User last name e.g. `Doe`
  - `mobile_phone`: string - User mobile phone e.g. `5555555555`
  - `name`: string - User full name e.g. `Jane Doe`
  - `notes`: string - User notes e.g. `notes`
  - `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
  - `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
  - `zip`: string - User zip code e.g. `93013`
  - `origin_id`: string - User origin id e.g. `foobar`
  - `origin_data`: string - User origin data e.g. `OD-2398273424`
  - `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor`: object
    - `id`: integer e.g. `161072`
    - `name`: string e.g. `SID Architecture`
  - `work_classification_id`: integer - Work classification id e.g. `13`
  - `default_permission_template_id`: integer - User default permission template id e.g. `27`
  - `permission_template`: object e.g. `{"id": 1, "name": "General Contractor", "project_specific": true, "type": "gl...`
    - `id`: integer - Unique identifier for the Permission Template e.g. `1`
    - `name`: string - The name of the Permission Template e.g. `General Contractor`
    - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
    - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
  - `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show company user**
Show detail on a specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/users/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update company user**
Update the specified User.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Russel`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.russel@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JR`
  - `origin_id`: string - The Origin ID of the Company User e.g. `OD-3483830-2`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `13`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `123`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`
  - `add_to_new_projects`: boolean - Whether or not this user is added to all new projects. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `true`

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/users  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**List company users**
Return a list of all Users associated with a Company.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[active]` [query] boolean - If true, returns item(s) with a status of 'active'.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Return users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `sort` [query] string enum[name, vendor_name, permission_template, full_name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `contact_id`: integer - User Contact ID e.g. `1`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_activated_at`: string(date-time) - User last activated at e.g. `2016-06-30T20:41:58Z`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `party_id`: integer - The Directory Party ID for this user, resolved via Contact → Person → Party. Null when the user has no associated person record. Use this ID when calling endpoints that require a party identifier (e.g. certification a... e.g. `12345`
- `permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `company_permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/users  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Create company user**
Create a new User in the specified Company.
#### Uploading avatar
To upload avatar you must upload whole payload as `multipart/form-data` content-type and
specify each parameter as form-data together with `user[avatar]` as file.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `first_name`: string - The First Name of the Company User e.g. `Jane`
  - `last_name`: string (required) - The Last Name of the Company User e.g. `Doe`
  - `job_title`: string - The Job Title of the Company User e.g. `QA Manager`
  - `address`: string - The Address of the Company User e.g. `6305 Carpinteria Ave`
  - `city`: string - The City of the Company User e.g. `Carpinteria`
  - `zip`: string - The Zip code of the Company User e.g. `12345`
  - `business_phone`: string - The Business Phone of the Company User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Company User e.g. `123`
  - `mobile_phone`: string - The Mobile Phone of the Company User e.g. `1-555-555-1234`
  - `fax_number`: string - The Fax Number of the Company User e.g. `1-555-555-1234`
  - `email_address`: string(email) (required) - The Email Address of the Company User. Update requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Company User e.g. `<p>Sent from Procore.</p>`
  - `is_active`: boolean - The Active status of the Company User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Company User e.g. `false`
  - `employee_id`: string - The ID of the Employee of the Company User when `user[is_employee]` is set to `true` e.g. `123456789`
  - `notes`: string - The Notes (notes, keywords, tags) of the Company User e.g. `notes`
  - `country_code`: string - The Country Code of the Company User (ISO-3166 Alpha-2 format) e.g. `US`
  - `state_code`: string - The State Code of the Company User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `initials`: string - The Initials of the Company User e.g. `JD`
  - `origin_id`: string - The Origin ID of the Company User e.g. `foobar`
  - `origin_data`: string - The Origin Data of the Company User e.g. `OD-3483830-2`
  - `vendor_id`: integer - The ID of the Vendor of the Company User e.g. `161072`
  - `default_permission_template_id`: integer - The ID of the default Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `27`
  - `company_permission_template_id`: integer - The ID of the Company Permission Template for the Company User. Requests including this parameter will be rejected unless the requesting user has Directory Admin permissions e.g. `1`
  - `work_classification_id`: integer - The ID of the Work Classification for the Company User e.g. `13`
  - `avatar`: string - The Avatar of the Company User. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `avatar.jpg`

Response 201 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `contact_id`: integer - User Contact ID e.g. `1`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `erp_integrated_accountant`: boolean - User ERP integrated accountant status e.g. `true`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_activated_at`: string(date-time) - User last activated at e.g. `2016-06-30T20:41:58Z`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Jane Doe`
- `notes`: string - User notes e.g. `notes`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `welcome_email_sent_at`: string(date-time) - User welcome email sent at e.g. `2013-05-30T20:41:58Z`
- `zip`: string - User zip code e.g. `93013`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `party_id`: integer - The Directory Party ID for this user, resolved via Contact → Person → Party. Null when the user has no associated person record. Use this ID when calling endpoints that require a party identifier (e.g. certification a... e.g. `12345`
- `permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `company_permission_template`: object
  - `id`: integer - Unique identifier for the Permission Template e.g. `1`
  - `name`: string - The name of the Permission Template e.g. `General Contractor`
  - `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
  - `type`: string enum[company_tools, global, project_specific] - The type of the Permission Template
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 400, 401, 403, 409 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/users/{id}  **[DEPRECATED / OLDER VERSION - a newer path version exists below/above]**

**Show company user**
Show detail on a specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `locale`: string - User locale e.g. `pt-BR`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/users/{id}/invite  **[OLDER VERSION - a newer path version exists below/above]**

**Send invite**
Send invite email to specified user.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `id` [path] integer (required) - ID of the user

Response 202 (application/json): object


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/me  **[OLDER VERSION - a newer path version exists below/above]**

**Show current company user**
Show detail on the current Company User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `add_to_new_projects`: boolean - Whether or not an user is added to all new projects e.g. `true`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - User employee status e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `name`: string - User full name e.g. `Leah Russell`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Vendor Comments

Resource id: `company-vendor-comments`. Raw spec: `../openapi-raw/company-vendor-comments.json`. Web: https://developers.procore.com/reference/rest/company-vendor-comments?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/vendors/{vendor_id}/comments

**List company vendor comments**
Return a list of Comments for the specified Company Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `vendor_id` [path] integer (required) - Vendor ID
- `sort` [query] string enum[created_at] - Return items with the specified sort.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Comment ID e.g. `1`
- `body`: string - The text of the Comment e.g. `This is a comment`
- `created_at`: string(date-time) - Comment created at e.g. `2013-11-08T00:00:00Z`
- `rating`: integer - 1-5 e.g. `1`
- `attachments`: array of object - Attachments
  - `id`: integer
  - `name`: string - Base name of the file without its path e.g. `filename.ext`
  - `content_type`: string - A mime type or a file extension e.g. `application/vnd.ext`
  - `url`: string - URL to download the attached file. HTTP client should be prepared to follow redirects to successfully download the file. e.g. `https://storage.procore.com/v3/d/default/procore-files/1ZE258W9K804SAJJZX19JV...`
- `created_by`: object - The creator of the Comment
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
  - `avatar_url`: string - The URL pointing to the user avatar. e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `initials`: string - The initials of the user. e.g. `LR`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Vendor Insurances

Resource id: `company-vendor-insurances`. Raw spec: `../openapi-raw/company-vendor-insurances.json`. Web: https://developers.procore.com/reference/rest/company-vendor-insurances?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/vendors/{vendor_id}/insurances

**List company vendor insurances**
Return a list of Insurances from the specified Company Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `vendor_id` [path] integer (required) - Vendor ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/companies/{company_id}/vendors/{vendor_id}/insurances

**Create company vendor insurance**
Create a new Insurance associated with the specified Company Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `vendor_id` [path] integer (required) - Vendor ID

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 201 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/vendors/{vendor_id}/insurances/{id}

**Show company vendor insurance**
Show detail on the specified Company Vendor Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `vendor_id` [path] integer (required) - Vendor ID
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/vendors/{vendor_id}/insurances/{id}

**Update company vendor insurance**
Update the specified Company Vendor Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `vendor_id` [path] integer (required) - Vendor ID
- `id` [path] integer (required) - ID

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/companies/{company_id}/vendors/{vendor_id}/insurances/{id}

**Delete company vendor insurance**
Delete the specified Company Vendor Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `vendor_id` [path] integer (required) - Vendor ID
- `id` [path] integer (required) - ID

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/companies/{company_id}/vendors/{vendor_id}/insurances/sync

**Sync Company Vendor Insurances**
This endpoint creates or updates a batch of Company Vendor Insurances.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `vendor_id` [path] integer (required) - Vendor ID

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Insurance e.g. `348330`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `errors`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Company Vendors

Resource id: `company-vendors`. Raw spec: `../openapi-raw/company-vendors.json`. Web: https://developers.procore.com/reference/rest/company-vendors?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.1/vendors

**List company vendors**
Return a list of all Vendors associated with a Company.
Adds support for the `minimal` view, which returns a reduced payload (`id`, `name`, `is_active`, `logo`) intended for vendor selector dropdowns. The `minimal` view does **not** require the `view_vendors` Directory permission — it is available to any user authenticated on the Company. All other views continue to require `view_vendors`.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[compact, directory, erp, extended, minimal, normal, summary] - Specifies which view of the resource to return (which attributes should be present in the response). The `minimal` view returns a reduced payload and does not require Directory permissions; all other views require the...
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[search]` [query] string - Return vendors where the search string matches the vendor name, keywords, origin_code, or ABN/EIN number
- `filters[created_at]` [query] string(date-time) - Return items within a specific created at ISO8601 datetime range
- `filters[updated_at]` [query] string - Return items within a specific updated at ISO8601 datetime range
- `filters[standard_cost_code_id][]` [query] array of integer - Returns vendors associated with the specified standard cost code id(s)
- `filters[trade_id][]` [query] array of integer - Returns vendors associated with the specified trade id(s)
- `filters[id][]` [query] array of integer - Returns vendors with the specified id(s)
- `filters[parent_id][]` [query] array of integer - Returns vendors with the specified parent id(s)
- `sort` [query] string enum[name, main_office_name, project_and_bid_counts] - Return items with the specified sort

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/vendors/{id}/business_register

**Create Company Vendor Business Register**
Create a new Business Register associated with a specified Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Company Vendor
- `company_id` [query] integer (required) - Unique identifier for the company.

Request body (application/json) (required):

- `business_register`: object
  - `type`: string enum[abn, ein] (required) - Entity Type e.g. `abn`
  - `identifier`: string (required) - Entity ID. This field ignores spaces and dashes. e.g. `51824753556`

Response 201 (application/json): object

- `id`: integer e.g. `321`
- `type`: string - business register type (ABN, EIN) e.g. `abn`
- `identifier`: string - Identification code e.g. `51824753556`
- `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
- `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`

Error responses: 400, 401, 403, 409, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/vendors/{id}/business_register

**Update Company Vendor Business Register**
Update an existing Business Register associated with a specified Vendor.
The Register must already exist.
Changing the identifier of a verified Business Register will set the following attributes to null:
verification_status,
verified_at

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the Company Vendor
- `company_id` [query] integer (required) - ID of the Company

Request body (application/json) (required):

- `business_register`: object
  - `type`: string enum[abn, ein] (required) - Entity Type e.g. `abn`
  - `identifier`: string (required) - Entity ID. This field ignores spaces and dashes. e.g. `51824753556`

Response 200 (application/json): object

- `id`: integer e.g. `321`
- `type`: string - business register type (ABN, EIN) e.g. `abn`
- `identifier`: string - Identification code e.g. `51824753556`
- `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
- `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`

Error responses: 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/vendors

**List company vendors**
Return a list of all Vendors associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[compact, normal, erp, extended, directory, summary] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is extended.
- `company_id` [query] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[search]` [query] string - Return vendors where the search string matches the vendor name, keywords, origin_code, or ABN/EIN number
- `filters[created_at]` [query] string(date-time) - Return items within a specific created at ISO8601 datetime range
- `filters[updated_at]` [query] string - Return items within a specific updated at ISO8601 datetime range
- `filters[standard_cost_code_id][]` [query] array of integer - Returns vendors associated with the specified standard cost code id(s)
- `filters[trade_id][]` [query] array of integer - Returns vendors associated with the specified trade id(s)
- `filters[id][]` [query] array of integer - Returns vendors with the specified id(s)
- `filters[parent_id][]` [query] array of integer - Returns vendors with the specified parent id(s)
- `sort` [query] string enum[name, main_office_name, project_and_bid_counts] - Return items with the specified sort

Response 200 (application/json): array of object

- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `connected_to_company_id`: integer - Connected Company ID e.g. `123`
- `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`
- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding distribution list
  - `company_name`: string e.g. `^ Directory Testing Co.`
  - `id`: integer e.g. `6629`
  - `login`: string e.g. `read+gp@example.com`
  - `name`: string e.g. `Read + GPs Test`
- `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
- `legal_name`: string e.g. `1st Choice Glass Inc.`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `project_ids`: array of integer - Array of Project IDs
- `standard_cost_codes`: array of object
  - `id`: integer - ID e.g. `12345`
  - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
  - `parent_id`: integer - Parent ID e.g. `12345`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Description e.g. `Site Work`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/vendors

**Create company vendor**
Create a new Vendor associated with a specified Company.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[compact, normal, erp, extended, directory, summary] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is extended.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `123`
- `vendor`: object (required)
  - `name`: string (required) - Name e.g. `Poodle Electric`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `city`: string - City e.g. `Jeffersonville`
  - `zip`: string - Zip code e.g. `47130`
  - `business_phone`: string - Business phone e.g. `(812) 284-8506`
  - `mobile_phone`: string - Mobile phone e.g. `(812) 556-3397`
  - `fax_number`: string - Fax number e.g. `(812) 989-9810`
  - `email_address`: string - Email address e.g. `jane.doe@example.com`
  - `is_active`: boolean - Active status e.g. `true`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `website`: string - Website url e.g. `http://example.com`
  - `union_member`: boolean - Union member status e.g. `true`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `notes`: string - Notes (notes/keywords/tags) e.g. `Owned by a dog`
  - `vendor_group_id`: integer - Vendor Group ID e.g. `1843218`
  - `parent_id`: integer - Parent Vendor ID. Cannot be the same as ID. Only two levels of hierarchy are supported (parent/child). e.g. `1306797`
  - `primary_contact_id`: integer - Primary Contact ID e.g. `1306796`
  - `origin_id`: string - Origin ID e.g. `ref-12345`
  - `origin_data`: string - Origin Data e.g. `{"data_field":{"is_important":true}}`
  - `origin_code`: string - Origin Code e.g. `PE-12345`
  - `trade_ids`: array of integer e.g. `[123, 456]`
  - `bidding_distribution_ids`: array of integer e.g. `[123, 456]`
  - `standard_cost_code_ids`: array of integer e.g. `[123, 456]`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `business_register`: object - Business register details for the vendor. When provided, both type and identifier are required. A 400 error is returned if only one is present.
    - `type`: string enum[abn, ein] - Business register entity type. e.g. `abn`
    - `identifier`: string - Business register identifier (e.g. ABN = 11 digits, EIN = 9 digits). e.g. `51824753556`
  - `bidding`: object - Bidding statuses
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `true`
    - `african_american_business`: boolean e.g. `true`
    - `hispanic_business`: boolean e.g. `true`
    - `womens_business`: boolean e.g. `false`
    - `historically_underutilized_business`: boolean e.g. `true`
    - `sdvo_business`: boolean e.g. `false`
    - `certified_business_enterprise`: boolean e.g. `true`
    - `asian_american_business`: boolean e.g. `true`
    - `native_american_business`: boolean e.g. `true`
    - `disadvantaged_business`: boolean e.g. `true`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `true`

Response 201 (application/json): object

- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `connected_to_company_id`: integer - Connected Company ID e.g. `123`
- `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`
- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding distribution list
  - `company_name`: string e.g. `^ Directory Testing Co.`
  - `id`: integer e.g. `6629`
  - `login`: string e.g. `read+gp@example.com`
  - `name`: string e.g. `Read + GPs Test`
- `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
- `legal_name`: string e.g. `1st Choice Glass Inc.`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `project_ids`: array of integer - Array of Project IDs
- `standard_cost_codes`: array of object
  - `id`: integer - ID e.g. `12345`
  - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
  - `parent_id`: integer - Parent ID e.g. `12345`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Description e.g. `Site Work`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/vendors/sync

**Sync company vendors**
Creates or updates a batch of Company Vendors.
See [Using Sync Actions](/documentation/using-sync-actions) for additional information.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.
#### Documentation
The purpose of this API is to allow one or more vendors to be created or updated.
The caller provides an array of hashes, each hash containing the attributes for
a single vendor. The attribute names in each hash match those used by the Create
and Update Company Vendors APIs. Attributes for a maximum of 1000 vendors may
be passed with each call.
The API will always return an HTTP status of 200.
The response body will contain two attributes entities and errors. The attributes
for each successfully created or updated vendor will appear in the entities list.
The attributes for each vendor will match those returned by the Show Company Vendor
API. For each vendor which could not be created or updated, the attributes supplied
by the caller will be present in the errors list, along with an additional errors
attribute which will provide reasons for the failure.
For each vendor the caller supplies data for, the Sync API uses two different
types of unique identifier to determine whether a new vendor is to be created,
or an existing vendor is to be updated. The unique identifiers are supplied
as the ID and origin_id attributes.
If neither unique identifier is provided, Procore will attempt to create a new
vendor. For example the request below will create two new Vendors.
````json
{
  "company_id": 352361,
  "updates": [
    { "name": "New Vendor 1" },
    { "name": "New Vendor 2" }
  ]
}
````
The response to this request lists all attributes for the vendors which have been created.
The ID attribute is the Procore unique identifier for a particular vendor.
If the caller already knows the Procore unique identifier for a particular
vendor (either through the List Company Vendors API or through the Create Company Vendor API)
this value can be passed to indicate which vendor is to be updated. Note that
if the caller passes an ID value which Procore does not recognise, Procore will report
an error.
The caller does not need to be aware of the unique identifiers assigned by Procore
for each vendor in order to create or update them. Instead the caller can provide
their own unique identifier for the vendor in the `origin_id` attribute.
If Procore cannot find a vendor with the supplied `origin_id` it will create
a new one. If Procore can find a vendor with the supplied `origin_id` it will update it.
Note that alongside the origin_id attribute, Procore also provides an `origin_data`
attribute. Procore does not interpret the contents of this attribute.
The caller can use this to store and retrieve their own contextual
information about this vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `124251`
- `updates`: array of object (required)
  - `id`: integer - ID e.g. `13513`
  - `name`: string - Name e.g. `Poodle Electric`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `city`: string - City e.g. `Jeffersonville`
  - `zip`: string - Zip code e.g. `47130`
  - `business_phone`: string - Business phone e.g. `(812) 284-8506`
  - `mobile_phone`: string - Mobile phone e.g. `(812) 556-3397`
  - `fax_number`: string - Fax number e.g. `(812) 989-9810`
  - `email_address`: string - Email address e.g. `jane.doe@example.com`
  - `is_active`: boolean - Active status e.g. `true`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `website`: string - Website url e.g. `http://poodleparade.com`
  - `union_member`: boolean - Union member status e.g. `true`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `notes`: string - Notes (notes/keywords/tags) e.g. `Owned by a cat`
  - `vendor_group_id`: integer - Vendor Group ID e.g. `1843218`
  - `parent_id`: integer - Parent Vendor ID. Cannot be the same as ID. Only two levels of hierarchy are supported (parent/child). e.g. `1306797`
  - `primary_contact_id`: integer - Primary Contact ID e.g. `1306796`
  - `origin_id`: string - Origin ID e.g. `ref-12345`
  - `origin_data`: string - Origin Data e.g. `{"data_field":{"is_important":true}}`
  - `origin_code`: string - Origin Code e.g. `PE-12345`
  - `trade_ids`: array of integer e.g. `[123, 456]`
  - `bidding_distribution_ids`: array of integer e.g. `[123, 456]`
  - `standard_cost_code_ids`: array of integer e.g. `[123, 456]`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `bidding`: object - Bidding statuses
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `true`
    - `african_american_business`: boolean e.g. `true`
    - `hispanic_business`: boolean e.g. `false`
    - `womens_business`: boolean e.g. `false`
    - `historically_underutilized_business`: boolean e.g. `true`
    - `sdvo_business`: boolean e.g. `false`
    - `certified_business_enterprise`: boolean e.g. `true`
    - `asian_american_business`: boolean e.g. `true`
    - `native_american_business`: boolean e.g. `true`
    - `disadvantaged_business`: boolean e.g. `false`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `true`
  - `business_register_attributes`: object - Business register information (e.g., ABN, EIN). Creates a new business register if one does not exist, or updates the existing one.
    - `type`: string enum[abn, ein] - Entity Type e.g. `abn`
    - `identifier`: string - Entity ID. This field ignores spaces and dashes. e.g. `51824753556`
  - `origin_custom_fields`: object - Third-party custom fields for the vendor associated with the origin fields (id, origin_code, origin_data, etc.). New fields are merged with existing values; existing keys are updated with the new values. e.g. `{"custom_key": "custom_value", "another_key": "another_value"}`

Response 200 (application/json): object

- `entities`: array of object - Array of updated entities
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `name`: string - Filename e.g. `january_receipt_copy.jpg`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
  - `business_phone`: string - Business phone e.g. `(812) 989-9810`
  - `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
    - `id`: integer e.g. `321`
    - `type`: string - business register type (ABN, EIN) e.g. `abn`
    - `identifier`: string - Identification code e.g. `51824753556`
    - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
    - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
  - `city`: string - City e.g. `Jeffersonville`
  - `connected_to_company_id`: integer - Connected Company ID e.g. `123`
  - `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
  - `company`: string - Company e.g. `Stock Construction`
  - `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
  - `fax_number`: string - Fax number e.g. `(812) 989-9810`
  - `is_active`: boolean - Active status e.g. `true`
  - `is_connected`: boolean - Connected status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
  - `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `notes`: string - Notes e.g. `owned by a dog`
  - `origin_code`: string - Origin Code e.g. `foobar`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `foobar`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
    - `id`: integer - ID e.g. `1306796`
    - `first_name`: string - First name e.g. `John`
    - `last_name`: string - Last name e.g. `Doe`
    - `business_phone`: string - Business phone
    - `business_phone_extension`: integer - Business phone extension
    - `fax_number`: string - Fax number
    - `mobile_phone`: string - Mobile phone
    - `email_address`: string(email) - Email e.g. `john.doe@example.com`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `synced_to_erp`: boolean - Synced to ERP e.g. `false`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `false`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
    - `id`: integer e.g. `1`
    - `name`: string (required) e.g. `Otis Elevators`
  - `website`: string - Website url e.g. `http://poodleparade.com`
  - `zip`: string - Zip code e.g. `47130`
  - `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `false`
    - `african_american_business`: boolean e.g. `false`
    - `hispanic_business`: boolean e.g. `false`
    - `womens_business`: boolean e.g. `false`
    - `historically_underutilized_business`: boolean e.g. `false`
    - `sdvo_business`: boolean e.g. `false`
    - `certified_business_enterprise`: boolean e.g. `false`
    - `asian_american_business`: boolean e.g. `false`
    - `native_american_business`: boolean e.g. `false`
    - `disadvantaged_business`: boolean e.g. `false`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `false`
  - `bidding_distribution`: array of object - Bidding distribution list
    - `company_name`: string e.g. `^ Directory Testing Co.`
    - `id`: integer e.g. `6629`
    - `login`: string e.g. `read+gp@example.com`
    - `name`: string e.g. `Read + GPs Test`
  - `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
  - `legal_name`: string e.g. `1st Choice Glass Inc.`
  - `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
    - `id`: integer
    - `name`: string
  - `project_ids`: array of integer - Array of Project IDs
  - `standard_cost_codes`: array of object
    - `id`: integer - ID e.g. `12345`
    - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
    - `parent_id`: integer - Parent ID e.g. `12345`
    - `code`: string - Cost code, not including parent prefix e.g. `300`
    - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
    - `name`: string - Description e.g. `Site Work`
    - `origin_data`: string - Origin data e.g. `OD-2398273424`
    - `origin_id`: string - Origin ID e.g. `ABC123`
  - `trades`: array of object - Trades
    - `id`: integer - Trade ID e.g. `999`
    - `name`: string - Trade name e.g. `09 - acoustical panels`
    - `active`: boolean - Trade availability e.g. `true`
    - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `errors`: array of object e.g. `[{"id": 3, "name": "No vendor has this ID value", "errors": {"id": ["Entity w...`
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone e.g. `(812) 989-9810`
  - `city`: string - City e.g. `Jeffersonville`
  - `contact_count`: integer - Count of active Contacts associated with the vendor record e.g. `5`
  - `company`: string - Company e.g. `Stock Construction`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
  - `fax_number`: string - Fax number e.g. `(812) 989-9810`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
  - `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `notes`: string - Notes e.g. `owned by a dog`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `foobar`
  - `origin_code`: string - Origin Code e.g. `foobar`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `synced_to_erp`: boolean - Synced to ERP e.g. `false`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `false`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `website`: string - Website url e.g. `http://poodleparade.com`
  - `zip`: string - Zip code e.g. `47130`
  - `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
    - `id`: integer e.g. `321`
    - `type`: string - business register type (ABN, EIN) e.g. `abn`
    - `identifier`: string - Identification code e.g. `51824753556`
    - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
    - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
  - `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
    - `id`: integer e.g. `1`
    - `name`: string (required) e.g. `Otis Elevators`
  - `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
    - `id`: integer - ID e.g. `1306796`
    - `first_name`: string - First name e.g. `John`
    - `last_name`: string - Last name e.g. `Doe`
    - `business_phone`: string - Business phone
    - `business_phone_extension`: integer - Business phone extension
    - `fax_number`: string - Fax number
    - `mobile_phone`: string - Mobile phone
    - `email_address`: string(email) - Email e.g. `john.doe@example.com`
    - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
    - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
  - `attachments`: array of object - Attachments
    - `id`: integer - ID e.g. `5324`
    - `url`: string - URL e.g. `http://www.example.com/`
    - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/vendors/{id}

**Show company vendor**
Show detail on a specified Company Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the vendor
- `company_id` [query] integer (required) - Unique identifier for the company.
- `view` [query] string enum[compact, normal, erp, extended, directory, summary] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is extended.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): oneOf(object | object | object | object | object | object)


Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/vendors/{id}

**Update company vendor**
Update a specified Company Vendor.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - ID of the vendor
- `view` [query] string enum[compact, normal, erp, extended, directory, summary] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is extended.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID e.g. `123`
- `vendor`: object (required)
  - `name`: string (required) - Name e.g. `Poodle Electric`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `city`: string - City e.g. `Jeffersonville`
  - `zip`: string - Zip code e.g. `47130`
  - `business_phone`: string - Business phone e.g. `(812) 284-8506`
  - `mobile_phone`: string - Mobile phone e.g. `(812) 556-3397`
  - `fax_number`: string - Fax number e.g. `(812) 989-9810`
  - `email_address`: string - Email address e.g. `jane.doe@example.com`
  - `is_active`: boolean - Active status e.g. `true`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `website`: string - Website url e.g. `http://example.com`
  - `union_member`: boolean - Union member status e.g. `true`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `notes`: string - Notes (notes/keywords/tags) e.g. `Owned by a dog`
  - `vendor_group_id`: integer - Vendor Group ID e.g. `1843218`
  - `parent_id`: integer - Parent Vendor ID. Cannot be the same as ID. Only two levels of hierarchy are supported (parent/child). e.g. `1306797`
  - `primary_contact_id`: integer - Primary Contact ID e.g. `1306796`
  - `origin_id`: string - Origin ID e.g. `ref-12345`
  - `origin_data`: string - Origin Data e.g. `{"data_field":{"is_important":true}}`
  - `origin_code`: string - Origin Code e.g. `PE-12345`
  - `trade_ids`: array of integer e.g. `[123, 456]`
  - `bidding_distribution_ids`: array of integer e.g. `[123, 456]`
  - `standard_cost_code_ids`: array of integer e.g. `[123, 456]`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `business_register`: object - Business register details for the vendor. When provided, both type and identifier are required. A 400 error is returned if only one is present.
    - `type`: string enum[abn, ein] - Business register entity type. e.g. `abn`
    - `identifier`: string - Business register identifier (e.g. ABN = 11 digits, EIN = 9 digits). e.g. `51824753556`
  - `bidding`: object - Bidding statuses
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `true`
    - `african_american_business`: boolean e.g. `true`
    - `hispanic_business`: boolean e.g. `true`
    - `womens_business`: boolean e.g. `false`
    - `historically_underutilized_business`: boolean e.g. `true`
    - `sdvo_business`: boolean e.g. `false`
    - `certified_business_enterprise`: boolean e.g. `true`
    - `asian_american_business`: boolean e.g. `true`
    - `native_american_business`: boolean e.g. `true`
    - `disadvantaged_business`: boolean e.g. `true`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `true`

Response 200 (application/json): object

- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `connected_to_company_id`: integer - Connected Company ID e.g. `123`
- `contact_count`: integer - Count of active Contacts associated with the vendor record. e.g. `5`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`
- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding distribution list
  - `company_name`: string e.g. `^ Directory Testing Co.`
  - `id`: integer e.g. `6629`
  - `login`: string e.g. `read+gp@example.com`
  - `name`: string e.g. `Read + GPs Test`
- `children_count`: integer - Count of vendors whose parent_id is this vendor's unique identifier e.g. `0`
- `legal_name`: string e.g. `1st Choice Glass Inc.`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `project_ids`: array of integer - Array of Project IDs
- `standard_cost_codes`: array of object
  - `id`: integer - ID e.g. `12345`
  - `standard_cost_code_list_id`: integer - Standard Cost Code List ID e.g. `12345`
  - `parent_id`: integer - Parent ID e.g. `12345`
  - `code`: string - Cost code, not including parent prefix e.g. `300`
  - `full_code`: string - Cost code, including parent prefixes e.g. `02-300`
  - `name`: string - Description e.g. `Site Work`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Crews

Resource id: `crews`. Raw spec: `../openapi-raw/crews.json`. Web: https://developers.procore.com/reference/rest/crews?version=latest
Product lines: Field Productivity

### GET /rest/v1.0/projects/{project_id}/crews

**List all Project Crews**
Return a list of all Crews with details for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `serializer_view` [query] string enum[ids_only] - Changes what fields are included in the response.
- `filters[id]` [query] array of integer - Return crew(s) with the specified IDs.
- `filters[deleted_at]` [query] string - Return crew(s) deleted within the specified datetime/date range. Formats: YYYY-MM-DD...YYYY-MM-DD or YYYY-MM-DDTHH:MM:SSZ...YYYY-MM-DDTHH:MM:SSZ.
- `filters[with_search]` [query] string - Filter crews by search text.

Response 200 (application/json): array of object

- `id`: integer
- `name`: string
- `project_id`: integer
- `company_id`: integer
- `employees`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead_party`: object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`

### POST /rest/v1.0/projects/{project_id}/crews

**Create a new Crew**
Create a new Crew associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `crew`: object (required) - Crew Object
  - `lead_party_id`: integer - Party Id of crew leader e.g. `1`
  - `name`: string - Crew Name e.g. `ADL Crew`
  - `party_ids`: array of integer
  - `equipment_ids`: array of integer

Response 201 (application/json): object

- `id`: integer
- `name`: string
- `project_id`: integer
- `company_id`: integer
- `employees`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead_party`: object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/crews/ids

**List all Project Crew Ids**
Return a list of all Crew Ids with details for a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[id]` [query] array of integer - Scope crew IDs to the specified crew IDs.
- `filters[deleted_at]` [query] string - Scope crew IDs by deleted_at datetime/date range.
- `filters[with_search]` [query] string - Scope crew IDs by search text.

Response 200 (application/json): array of integer


### GET /rest/v1.0/projects/{project_id}/crews/{id}

**Show A Crew**
Return Crew detailed information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID

Response 200 (application/json): object

- `id`: integer
- `name`: string
- `project_id`: integer
- `company_id`: integer
- `employees`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead_party`: object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`

Error responses: 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/crews/{id}

**Update a Crew**
Updating a Crew associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Crew

Request body (application/json) (required):

- `crew`: object (required) - Crew Object
  - `lead_party_id`: integer - Party Id of crew leader e.g. `1`
  - `name`: string - Crew Name e.g. `ADL Crew`
  - `party_ids`: array of integer
  - `equipment_ids`: array of integer

Response 200 (application/json): object

- `id`: integer
- `name`: string
- `project_id`: integer
- `company_id`: integer
- `employees`: array of object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `created_by`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead`: object
  - `id`: integer - ID e.g. `160586`
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `name`: string - Name e.g. `Carl Contractor`
- `lead_party`: object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `members`: array of object
  - `id`: integer - ID e.g. `160586`
  - `first_name`: string - First Name e.g. `Carl`
  - `last_name`: string - Surname e.g. `Contractor`
  - `is_employee`: boolean - Is an Employee? e.g. `true`
  - `employee_id`: string - Employee ID if an employee e.g. `1234`
  - `user_id`: integer - User ID if a user e.g. `123`
  - `is_active`: boolean - Is active party? e.g. `true`
- `created_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`
- `updated_at`: string(date-time) - Created at e.g. `2015-05-15T00:00:00Z`

Error responses: 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/crews/{id}

**Delete a Crew**
Deleting a Crew associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - Id of the Crew

Request body (application/json) (required):

- `crew`: object (required) - Crew Object
  - `lead_party_id`: integer - Party Id of crew leader e.g. `1`
  - `name`: string - Crew Name e.g. `ADL Crew`
  - `party_ids`: array of integer
  - `equipment_ids`: array of integer

Response 200: Crew Deleted (no body)

## Departments

Resource id: `departments`. Raw spec: `../openapi-raw/departments.json`. Web: https://developers.procore.com/reference/rest/departments?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/departments

**List Departments**
Return a list of Departments.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): array of object

- `id`: integer - Department ID e.g. `1`
- `name`: string - Department name e.g. `Department A`
- `origin_data`: string - Origin Data e.g. `OD-123456`
- `origin_id`: string - Origin ID e.g. `1234567`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/departments

**Create Department**
Create a new Department.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID
- `department`: object (required)
  - `name`: string (required) - Department name e.g. `Department A`
  - `origin_data`: string - Origin Data e.g. `OD-1234`
  - `origin_id`: string - Origin ID e.g. `OI-5678`

Response 201 (application/json): object

- `id`: integer - Department ID e.g. `1`
- `name`: string - Department name e.g. `Department A`
- `origin_data`: string - Origin Data e.g. `OD-123456`
- `origin_id`: string - Origin ID e.g. `1234567`

Error responses: 400, 401, 403, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/departments/{id}

**Show Department**
Return details for a Department.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Department ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200 (application/json): object

- `id`: integer - Department ID e.g. `1`
- `name`: string - Department name e.g. `Department A`
- `origin_data`: string - Origin Data e.g. `OD-123456`
- `origin_id`: string - Origin ID e.g. `1234567`

Error responses: 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/departments/{id}

**Update Department**
Update a Department.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Department ID

Request body (application/json) (required):

- `company_id`: integer (required) - Company ID
- `department`: object (required)
  - `name`: string (required) - Department name e.g. `Department A`
  - `origin_data`: string - Origin Data e.g. `OD-1234`
  - `origin_id`: string - Origin ID e.g. `OI-5678`

Response 200 (application/json): object

- `id`: integer - Department ID e.g. `1`
- `name`: string - Department name e.g. `Department A`
- `origin_data`: string - Origin Data e.g. `OD-123456`
- `origin_id`: string - Origin ID e.g. `1234567`

Error responses: 400, 401, 403, 404, 422, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/departments/{id}

**Delete Department**
Delete a Department.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `id` [path] integer (required) - Department ID
- `company_id` [query] integer (required) - Unique identifier for the company.

Response 200: OK (no body)

Error responses: 400, 401, 403, 404, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Distribution Groups

Resource id: `distribution-groups`. Raw spec: `../openapi-raw/distribution-groups.json`. Web: https://developers.procore.com/reference/rest/distribution-groups?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/distribution_groups

**List Distribution Groups**
Return a list of all Distribution Groups associated with a Company.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `with_domain_users` [query] object - Return list of user IDs that have permissions to view specified domain.
- `sort` [query] string enum[name] - Return items with the specified sort.
- `view` [query] string enum[extended] - Parameter affecting what level of detail will be returned from the endpoint. 'extended' will include the users included in each distribution group.

Response 200 (application/json): array of oneOf(object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Assignable Users

Resource id: `project-assignable-users`. Raw spec: `../openapi-raw/project-assignable-users.json`. Web: https://developers.procore.com/reference/rest/project-assignable-users?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/assignable_users

**List Assignable Users**
Return a list of assignable users for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[search]` [query] string - Search query

Response 200 (application/json): array of object

- `id`: integer - User ID e.g. `381006`
- `first_name`: string - User first name e.g. `Jane`
- `last_name`: string - User last name e.g. `Doe`
- `name`: string - User full name e.g. `Jane Doe`
- `job_title`: string - User job title e.g. `QA Manager`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
  - `doing_business_as`: string e.g. `SID Architecture`
- `project_permission_template_id`: integer - ID of the Permission Template e.g. `356`
- `project_role_ids`: array of integer - IDs of the user's roles on the project
- `assigned_to_project`: boolean - Denotes whether user is on the given project e.g. `false`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Assignments Filter Options

Resource id: `project-assignments-filter-options`. Raw spec: `../openapi-raw/project-assignments-filter-options.json`. Web: https://developers.procore.com/reference/rest/project-assignments-filter-options?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/names

**List Project Names for a Company User**
This endpoint returns the list of Project Names for the specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID
- `scope` [query] string enum[user, company] - The scope to use when getting the filter options for project assignments. The user scope returns only filter options for projects that the user is currently assigned to. The company scope returns all filter options fo...

Response 200 (application/json): array of object

- `filter_value`: string - Project name e.g. `Project Alpha`
- `label`: string - Project name e.g. `Project Alpha`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/project_numbers

**List Project Numbers for a Company User**
This endpoint returns the list of Project Numbers for the specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID
- `scope` [query] string enum[user, company] - The scope to use when getting the filter options for project assignments. The user scope returns only filter options for projects that the user is currently assigned to. The company scope returns all filter options fo...

Response 200 (application/json): array of object

- `filter_value`: string - Project number e.g. `P12345`
- `label`: string - Project number e.g. `P12345`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/stages

**List Project Stages for a Company User**
This endpoint returns the list of Project Stages for the specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID
- `scope` [query] string enum[user, company] - The scope to use when getting the filter options for project assignments. The user scope returns only filter options for projects that the user is currently assigned to. The company scope returns all filter options fo...

Response 200 (application/json): array of object

- `filter_value`: integer - Project stage ID e.g. `1`
- `label`: string - Project stage name e.g. `Planning`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/permission_templates

**List Permission Templates for a Company User**
This endpoint returns the list of Permission Templates for the specified User. This includes the templates of Projects that the User is currently assigned to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID

Response 200 (application/json): array of object

- `filter_value`: integer - Permission template ID e.g. `1`
- `label`: string - Permission template name e.g. `General Contractor`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/programs

**List Programs for a Company User**
This endpoint returns the list of Programs for the specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID
- `scope` [query] string enum[user, company] - The scope to use when getting the filter options for project assignments. The user scope returns only filter options for projects that the user is currently assigned to. The company scope returns all filter options fo...

Response 200 (application/json): array of object

- `filter_value`: integer - Program ID e.g. `1`
- `label`: string - Program name e.g. `Infrastructure`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/regions

**List Regions for a Company User**
This endpoint returns the list of Regions for the specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID
- `scope` [query] string enum[user, company] - The scope to use when getting the filter options for project assignments. The user scope returns only filter options for projects that the user is currently assigned to. The company scope returns all filter options fo...

Response 200 (application/json): array of object

- `filter_value`: integer - Region ID e.g. `1`
- `label`: string - Region name e.g. `North America`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/roles

**List Roles for a Company User**
This endpoint returns the list of Roles for the specified User. This includes the roles of Projects that the User is currently assigned to.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID

Response 200 (application/json): array of object

- `filter_value`: integer - Role ID e.g. `1`
- `label`: string - Role name e.g. `Project Manager`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/companies/{company_id}/users/{user_id}/project_assignments/filter_options/project_types

**List Project Types for a Company User**
This endpoint returns the list of Project Types for the specified User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] integer (required) - Unique identifier for the company.
- `user_id` [path] integer (required) - User ID
- `scope` [query] string enum[user, company] - The scope to use when getting the filter options for project assignments. The user scope returns only filter options for projects that the user is currently assigned to. The company scope returns all filter options fo...

Response 200 (application/json): array of object

- `filter_value`: integer - Project Type ID e.g. `1`
- `label`: string - Project Type name e.g. `Commercial`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Directory Filter Options

Resource id: `project-directory-filter-options`. Raw spec: `../openapi-raw/project-directory-filter-options.json`. Web: https://developers.procore.com/reference/rest/project-directory-filter-options?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/directory/filter_options/job_titles

**List Project Job Titles**
Return a distinct list of job titles for all contacts on a project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `filter_value`: string - Job title e.g. `Project Manager`
- `label`: string - Job title e.g. `Project Manager`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/directory/filter_options/trades

**List Project Trades**
Return a distinct list of trades in use on vendors for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `filter_value`: integer - Trade ID e.g. `1`
- `label`: string - Trade name e.g. `Drywall`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/directory/filter_options/country_codes

**List Project Country Codes**
Return a distinct list of country codes for a project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `filter_value`: string - Country code e.g. `US`
- `label`: string - Country name e.g. `United States`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/directory/filter_options/permission_templates

**List Project Permission Templates**
Return a distinct list of permission templates in use on a project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `filter_value`: integer - Permission template ID e.g. `1`
- `label`: string - Permission template name e.g. `General Contractor`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/directory/filter_options/state_codes

**List Project State Codes**
Return the list of states for a country

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `country_code` [query] string (required) - Code that identifies a country

Response 200 (application/json): array of object

- `filter_value`: string - State code e.g. `NY`
- `label`: string - State name e.g. `New York`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/directory/filter_options/cost_codes

**List Project Cost Codes**
Return a distinct list of cost codes in use on vendors for a given project

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Response 200 (application/json): array of object

- `filter_value`: integer - Standard cost code ID e.g. `1`
- `label`: string - Cost code sortable code and name e.g. `123 Earthwork`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Distribution Groups

Resource id: `project-distribution-groups`. Raw spec: `../openapi-raw/project-distribution-groups.json`. Web: https://developers.procore.com/reference/rest/project-distribution-groups?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/distribution_groups

**List Project Distribution Groups**
Return a list of all Distribution Groups associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `sort` [query] string enum[name] - Return items with the specified sort.
- `view` [query] string enum[extended] - Parameter affecting what level of detail will be returned from the endpoint. 'extended' will include the users included in each distribution group.
- `include_ancestors` [query] boolean - Parameter affecting what groups will be returned from this endpoint. When 'true', this endpoint will only return distribution groups with users that match the provided (or default) `domain_id` and `min_ual` / `ual`. C...
- `domain_id` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the Domain ID of the Submittals Tool. Will return only Distributions Groups who users that have access to the Tool specified by the domain_id...
- `min_ual` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the 'read' user access level. Will return only Distributions Groups who users that have the min ual specified by the 'min_ual'. Only applies ...
- `ual` [query] integer - Parameter affecting the scope for the Distribution Groups. Will return only Distributions Groups who users that have the exact ual specified by the 'ual'. If provided, this will take precendence over min_ual. Only app...

Response 200 (application/json): array of oneOf(object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/distribution_groups

**Create Project Distribution Group**
Create a new Distribution Group associated with the given Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `Idempotency-Token` [header] string - Unique idempotent token
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `distribution_group`: object (required)
  - `name`: string (required) - The Name of the Distribution Group e.g. `Internal Stakeholders`
  - `description`: string - Description e.g. `Internal stakeholders to notify of any major events`
  - `user_ids`: array of integer - User IDs to associate with the Distribution Group

Response 200 (application/json): object

- `id`: integer e.g. `1`
- `description`: string e.g. `Internal stakeholders to notify of any major events`
- `name`: string e.g. `Internal Stakeholders`
- `users`: array of object
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string - Name of the User e.g. `Carl the Contractor`
  - `company_name`: string - Company Name for the User e.g. `Brickworks`
  - `login`: string - Email of the User e.g. `carl.contractor@example.com`
  - `imageUrl`: string - User Avatar URL e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `initials`: string - Initials of the User e.g. `BS`
  - `job_title`: string - Job Title of the User e.g. `General Contractor`

Response 201 (application/json): object

- `id`: integer e.g. `1`
- `description`: string e.g. `Internal stakeholders to notify of any major events`
- `name`: string e.g. `Internal Stakeholders`
- `users`: array of object
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string - Name of the User e.g. `Carl the Contractor`
  - `company_name`: string - Company Name for the User e.g. `Brickworks`
  - `login`: string - Email of the User e.g. `carl.contractor@example.com`
  - `imageUrl`: string - User Avatar URL e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `initials`: string - Initials of the User e.g. `BS`
  - `job_title`: string - Job Title of the User e.g. `General Contractor`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/distribution_groups/{distribution_group_id}

**Show Project Distribution Group**
Show detail on a specified Project Distribution Group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `distribution_group_id` [path] integer (required) - Unique identifier for the distribution group.
- `view` [query] string enum[extended] - Parameter affecting what level of detail will be returned from the endpoint. 'extended' will include the users in the distribution group.
- `include_ancestors` [query] boolean - Parameter affecting what groups can be returned from this endpoint. When 'true', this endpoint will only return distribution groups with users that match the provided (or default) `domain_id` and `min_ual` / `ual`. Co...
- `domain_id` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the Domain ID of the Submittals Tool. Will return only Distributions Groups who users that have access to the Tool specified by the domain_id...
- `min_ual` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the 'read' user access level. Will return only Distributions Groups who users that have the min ual specified by the 'min_ual'. Only applies ...
- `ual` [query] integer - Parameter affecting the scope for the Distribution Groups. Will return only Distributions Groups who users that have the exact ual specified by the 'ual'. If provided, this will take precendence over min_ual. Only app...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/distribution_groups/{distribution_group_id}

**Update Project Distribution Group**
Update a Distribution Group associated with the given Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `distribution_group_id` [path] integer (required) - Unique identifier for the distribution group.
- `Idempotency-Token` [header] string - Unique idempotent token

Request body (application/json) (required):

- `distribution_group`: object (required)
  - `name`: string - The Name of the Distribution Group e.g. `Internal Stakeholders`
  - `description`: string - Description e.g. `Internal stakeholders to notify of any major events`
  - `user_ids`: array of integer - User IDs to associate with the Distribution Group

Response 200 (application/json): object

- `id`: integer e.g. `1`
- `description`: string e.g. `Internal stakeholders to notify of any major events`
- `name`: string e.g. `Internal Stakeholders`
- `users`: array of object
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string - Name of the User e.g. `Carl the Contractor`
  - `company_name`: string - Company Name for the User e.g. `Brickworks`
  - `login`: string - Email of the User e.g. `carl.contractor@example.com`
  - `imageUrl`: string - User Avatar URL e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `initials`: string - Initials of the User e.g. `BS`
  - `job_title`: string - Job Title of the User e.g. `General Contractor`

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/distribution_groups/{distribution_group_id}

**Delete Project Distribution Group**
Delete a Distribution Group associated with the given Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `distribution_group_id` [path] integer (required) - Unique identifier for the distribution group.

Response 204: No Content (no body)

Error responses: 400, 401, 403, 404, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/distribution_groups_with_ancestors  **[OLDER VERSION - a newer path version exists below/above]**

**List Project Distribution Groups**
Return a list of all Distribution Groups associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Returns item(s) matching the specified search query string.
- `sort` [query] string enum[name] - Return items with the specified sort.
- `view` [query] string enum[extended] - Parameter affecting what level of detail will be returned from the endpoint. 'extended' will include the users included in each distribution group.
- `domain_id` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the Domain ID of the Submittals Tool. Will return only Distributions Groups who users that have access to the Tool specified by the domain_id...
- `min_ual` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the 'read' user access level. Will return only Distributions Groups who users that have the min ual specified by the 'min_ual'. Only applies ...
- `ual` [query] integer - Parameter affecting the scope for the Distribution Groups. Will return only Distributions Groups who users that have the exact ual specified by the 'ual'. If provided, this will take precendence over min_ual. Only app...

Response 200 (application/json): array of oneOf(object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/distribution_groups_with_ancestors/{distribution_group_id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show Project Distribution Group**
Show detail on a specified Project Distribution Group

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `distribution_group_id` [path] integer (required) - Unique identifier for the distribution group.
- `view` [query] string enum[extended] - Parameter affecting what level of detail will be returned from the endpoint. 'extended' will include the users in the distribution group.
- `domain_id` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the Domain ID of the Submittals Tool. Will return only Distributions Groups who users that have access to the Tool specified by the domain_id...
- `min_ual` [query] integer - Parameter affecting the scope for the Distribution Groups, by default it is the 'read' user access level. Will return only Distributions Groups who users that have the min ual specified by the 'min_ual'. Only applies ...
- `ual` [query] integer - Parameter affecting the scope for the Distribution Groups. Will return only Distributions Groups who users that have the exact ual specified by the 'ual'. If provided, this will take precendence over min_ual. Only app...

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Inactive People

Resource id: `project-inactive-people`. Raw spec: `../openapi-raw/project-inactive-people.json`. Web: https://developers.procore.com/reference/rest/project-inactive-people?version=latest
Product lines: Total Quality and Safety Management, Field Productivity

### GET /rest/v1.0/projects/{project_id}/people/inactive

**List Inactive Project People**
Return a list of People associated with a Project. Includes users in the directory and reference users.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - ID of the project
- `view` [query] string enum[extended, normal, web] - Specifies which view of the resource to return (which attributes should be present in the response). Users without read permissions to Directory are limited to the normal and extended views. If a valid view is not pro...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[is_employee]` [query] boolean - If true, returns item(s) where `is_employee` value is true.
- `filters[reference_users_only]` [query] boolean - If true, returns only people who are reference users.
- `filters[without_reference_users]` [query] boolean - If true, returns only people who are not reference users.
- `filters[include_company_people]` [query] boolean - If true, returns people in the Company not just the Project. This option only works if the user has permission to create people in the project directory or permission to read from the company directory.
- `filters[search]` [query] string - Returns People where the search string matches the Person's name (first, last, or full), email address, mobile phone, business phone, fax number, or job title.
- `filters[connected]` [query] boolean - If true, returns only people who are connected users. If false, returns only people who are not connected users.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[job_title]` [query] string - Returns only people who have the specified job title.
- `filters[country_code]` [query] string - Returns only people who have the specified country code.
- `filters[state_code]` [query] string - Returns only people who have the specified state code.
- `filters[trade_id]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.
- `filters[permission_template_id]` [query] array of integer - Array of Permission Template IDs. Returns item(s) with the specified Permission Template IDs.
- `sort` [query] string enum[name, vendor_name, job_title, permission_template] - Return items with the specified sort

Response 200 (application/json): array of oneOf(object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Inactive Users

Resource id: `project-inactive-users`. Raw spec: `../openapi-raw/project-inactive-users.json`. Web: https://developers.procore.com/reference/rest/project-inactive-users?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/users/inactive

**List Project inactive users**
Return a list of all Inactive Users associated with a Project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name] - Return items with the specified sort.

Response 200 (application/json): array of object

- `address`: string - The address of the user. e.g. `6305 Carpinteria Ave`
- `avatar`: string - The URL pointing to the user avatar. e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - The business phone number of the user. e.g. `1-800-555-1234`
- `business_phone_extension`: integer - The business phone extension of the user. e.g. `21`
- `city`: string - The city that applies to the user. e.g. `Carpinteria`
- `country_code`: string - The country code that applies to the user, must be in ISO-3166 Alpha-2 format. e.g. `US`
- `email_address`: string(email) - The email address of the user. e.g. `user-company@example.com`
- `email_signature`: string - The email signature of the user. e.g. `<p>Sent from Example Company.</p>`
- `employee_id`: string - The unique employee identifier of the user. e.g. `123456789`
- `erp_integrated_accountant`: boolean - If this property is set to true, the user is an ERP-integrated accountant, if this property is set to false, the user is not an ERP-integrated accountant. e.g. `true`
- `fax_number`: string - The fax number of the user. e.g. `1-800-555-5678`
- `first_name`: string - The first name of the user. e.g. `Leah`
- `id`: integer - The unique idenfier of the user. e.g. `381006`
- `initials`: string - The initials of the user. e.g. `LR`
- `is_active`: boolean - If this property is set to true, the user status is active. If this property is set to false, the user status is inactive. e.g. `true`
- `is_employee`: boolean - If this property is set to true, the user is an employee. If this property is set to false, the user is not an employee. e.g. `false`
- `job_title`: string - The job title of the user. e.g. `QA Manager`
- `last_login_at`: string(date-time) - The date and time when the user logged in last. e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - The last name of the user. e.g. `Russell`
- `mobile_phone`: string - The mobile phone number of the user. e.g. `1-800-555-1234`
- `name`: string - The full name of the user. e.g. `Leah Russell`
- `notes`: string - The user notes. e.g. `notes`
- `state_code`: string - The state code that applies to the user. Must be in ISO-3166 Alpha-2 format. e.g. `CA`
- `welcome_email_sent_at`: string(date-time) - The date and time when the welcome email was sent to the user. e.g. `2013-05-30T20:41:58Z`
- `zip`: string - The ZIP code of the user. e.g. `93013`
- `origin_id`: string - The unique idenfitier for the user origin. e.g. `foobar`
- `origin_data`: string - User origin data. e.g. `OD-2398273424`
- `created_at`: string(date-time) - The date and time when the user was created in the system. e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - The date and time when the user was updated in the system. e.g. `2020-10-23T21:39:40Z`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`
- `_links`: object - API Links
  - `reactivate`: string - Link to reactivate user e.g. `https://api.procore.com/rest/v1.0/companies/1/users/inactive/1`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/users/inactive/{id}

**Reactivate project user.**
Reactivate the specified User.
#### OK Response
For null values, the key won't be returned

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `name`: string - User full name e.g. `Jane Doe`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - Is user an insurance manager e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Inactive Vendors

Resource id: `project-inactive-vendors`. Raw spec: `../openapi-raw/project-inactive-vendors.json`. Web: https://developers.procore.com/reference/rest/project-inactive-vendors?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/vendors/inactive

**List Project Inactive Vendors**
Return a list of all Inactive Vendors associated with a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `sort` [query] string enum[name] - Return items with the specified sort

Response 200 (application/json): array of object

- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `contact_count`: integer - Count of active Contacts associated with the vendor record e.g. `5`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`
- `_links`: object - API Links
  - `reactivate`: string - Link to reactivate vendor e.g. `https://api.procore.com/rest/v1.0/companies/1/vendors/inactive/1`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/vendors/inactive/{id}

**Reactivate project vendor**
Reactivate a specified Project Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.
- `id` [path] integer (required) - ID of the vendor

Response 200 (application/json): object

- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `contact_count`: integer - Count of active Contacts associated with the vendor record e.g. `5`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Insurances

Resource id: `project-insurances`. Raw spec: `../openapi-raw/project-insurances.json`. Web: https://developers.procore.com/reference/rest/project-insurances?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/insurances

**List project insurances**
Return a list of all Insurances associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - Extended view of data

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/insurances

**Create project insurance**
Create a new Insurance associated with the specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer (required) - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 201 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/insurances/{id}

**Show project insurance**
Return detailed information on the specified Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID
- `view` [query] string enum[default, extended] - Extended view of data

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/insurances/{id}

**Update project insurance**
Update the specified Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID
- `view` [query] string enum[default, extended] - Extended view of data

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer (required) - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/insurances/{id}

**Delete project insurance**
Delete the specified Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID
- `view` [query] string enum[default, extended] - Extended view of data

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/insurances/sync

**Sync Project Insurances**
This endpoint creates or updates a batch of Project Insurances.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Insurance e.g. `348330`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `errors`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Memberships

Resource id: `project-memberships`. Raw spec: `../openapi-raw/project-memberships.json`. Web: https://developers.procore.com/reference/rest/project-memberships?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### DELETE /rest/v2.0/companies/{company_id}/projects/{project_id}/project_memberships/bulk_remove

**Bulk Remove Project Memberships**
Bulk Remove Project Memberships for many parties on the given Project. Currently, the maximum number of party IDs that can be processed in a single request is 1000. If more than 1000 party IDs are provided, only the first 1000 will be processed.
This endpoint can currently only be used to remove reference users from a project. It cannot be used to remove a user who has a login or to remove vendors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - Unique identifier for the company.
- `project_id` [path] string (required) - Unique identifier for the project.

Request body (application/json) (required):

- `party_ids`: array of integer (required)

Response 200 (application/json): object

- `data`: object
  - `processed_ids`: array of integer - Array of processed party ids
  - `skipped_ids`: array of integer - Array of skipped party ids
  - `skipped_managed`: object - Present only when the Groups feature is enabled and one or more requested memberships are managed by Groups. Those memberships are NOT removed; they are reported here instead (USER-2168).
    - `code`: string - Stable machine-readable error code for a group-managed membership. e.g. `MEMBERSHIP_GROUP_MANAGED`
    - `reason_code`: string - Machine-actionable reason; indicates the memberships are group-managed. e.g. `group_managed`
    - `message`: string - Human readable message. e.g. `This project membership is managed by Groups and cannot be modified directly.`
    - `party_ids`: array of integer - Party ids of the managed memberships that were skipped.

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/project_memberships

**List Project Memberships**
List all Project Memberships on a given Project.
This endpoint returns all Memberships, including inactive Users/Vendors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page

Response 200 (application/json): array of object

- `id`: integer - Project Membership id e.g. `381006`
- `party_id`: integer - Party id e.g. `43234`
- `project_id`: integer - Project id e.g. `646261`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/project_memberships

**Create Project Membership**
Create a Project Membership for a party on the given Project.
This endpoint can currently only be used to add reference users to a project. It cannot be used to add a user who has a login or to add vendors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `project_membership`: object (required)
  - `party_id`: integer (required) - The ID of the Party(reference user) to be added to the Project

Response 201 (application/json): array of number


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/project_memberships/bulk_add

**Bulk Create Project Memberships**
Bulk Create Project Memberships for many parties on the given Project.
This endpoint can currently only be used to add reference users to a project. It cannot be used to add a user who has a login or to add vendors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `party_ids`: array of integer (required)

Response 201 (application/json): array of integer


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/project_memberships/{id}

**Delete Project Membership**
Delete a Project Membership for a party on the given Project.
This endpoint can currently only be used to delete reference users from a project. It cannot be used to delete a user who has a login or to delete vendors.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - The ID of the Project Membership
- `party_id` [query] integer (required) - The ID of the Party (reference user)

Response 204: Deleted (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project People

Resource id: `project-people`. Raw spec: `../openapi-raw/project-people.json`. Web: https://developers.procore.com/reference/rest/project-people?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/people

**List Project People**
Return a list of People associated with a Project. Includes users in the directory and reference users.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended, normal, web] - Specifies which view of the resource to return (which attributes should be present in the response). Users without read permissions to Directory are limited to the normal and extended views. If a valid view is not pro...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[is_employee]` [query] boolean - If true, returns item(s) where `is_employee` value is true.
- `filters[reference_users_only]` [query] boolean - If true, returns only people who are reference users.
- `filters[without_reference_users]` [query] boolean - If true, returns only people who are not reference users.
- `filters[include_company_people]` [query] boolean - If true, returns people in the Company not just the Project. This option only works if the user has permission to create people in the project directory or permission to read from the company directory.
- `filters[search]` [query] string - Returns People where the search string matches the Person's name (first, last, or full), email address, mobile phone, business phone, fax number, or job title.
- `filters[connected]` [query] boolean - If true, returns only people who are connected users. If false, returns only people who are not connected users.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[job_title]` [query] string - Returns only people who have the specified job title.
- `filters[country_code]` [query] string - Returns only people who have the specified country code.
- `filters[state_code]` [query] string - Returns only people who have the specified state code.
- `filters[trade_id]` [query] array of integer - Array of Trade IDs. Returns item(s) with the specified Trade IDs.
- `filters[permission_template_id]` [query] array of integer - Array of Permission Template IDs. Returns item(s) with the specified Permission Template IDs.
- `sort` [query] string enum[name, vendor_name, job_title, permission_template] - Return items with the specified sort

Response 200 (application/json): array of oneOf(object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/people

**Create project Person**
Create a new Person in the specified Project.
This endpoint can currently only create reference users. It cannot create a user who can login.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended, normal, web] - Specifies which view of the resource to return (which attributes should be present in the response). Users without read permissions to Directory are limited to the normal and extended views. If a valid view is not pro...

Request body (application/json) (required):

- `person`: object (required)
  - `first_name`: string - The First Name of the Project Person
  - `last_name`: string (required) - The Last Name of the Project Person
  - `is_employee`: boolean - The Employee status of the Project Person
  - `employee_id`: string - The Employee ID of the Project Person
  - `origin_id`: string - The ID of the External Data associated with the Project Person
  - `job_title`: string - The Job Title of the Project Person e.g. `Developer`
  - `work_classification_id`: integer - The unique identifier for the work classification of the Project Person. e.g. `398438`

Response 201 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/people/{id}

**Update project person**
Update the specified Project User.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - ID of the project
- `id` [path] integer (required) - ID of the person
- `view` [query] string enum[extended, normal, web] - Specifies which view of the resource to return (which attributes should be present in the response). Users without read permissions to Directory are limited to the normal and extended views. If a valid view is not pro...

Request body (application/json) (required):

- `person`: object (required)
  - `first_name`: string - The First Name of the Project Person
  - `last_name`: string (required) - The Last Name of the Project Person
  - `is_employee`: boolean - The Employee status of the Project Person
  - `employee_id`: string - The Employee ID of the Project Person
  - `origin_id`: string - The ID of the External Data associated with the Project Person
  - `job_title`: string - The Job Title of the Project Person e.g. `Developer`
  - `work_classification_id`: integer - The unique identifier for the work classification of the Project Person. e.g. `398438`

Response 200 (application/json): oneOf(object | object | object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Permission Templates

Resource id: `project-permission-templates`. Raw spec: `../openapi-raw/project-permission-templates.json`. Web: https://developers.procore.com/reference/rest/project-permission-templates?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/permission_templates

**List all available permission templates for a Project**
Returns the name, id, and project specific status for all Permission Templates available to use on the specified Project for those with Admin Permissions. If a user has access to the Directory Granular Permission of 'Create and Edit Users' they will be able to fetch a list of their assignable templates if they pass the filter `assignables_only` as true

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[assignables_only]` [query] boolean - Returns user's assignable permission templates

Response 200 (application/json): array of object

- `id`: integer - The ID of the Permission Template e.g. `1`
- `name`: string - The name of the Permission Template e.g. `General Contractor`
- `project_specific`: boolean - If the Permission Template is project specific e.g. `true`
- `type`: string enum[project_specific, company_tools, global] - Permission Template type e.g. `global`
- `category`: string enum[internal, external] - The category of the Permission Template e.g. `internal`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Permission Templates Assignments

Resource id: `project-permission-templates-assignments`. Raw spec: `../openapi-raw/project-permission-templates-assignments.json`. Web: https://developers.procore.com/reference/rest/project-permission-templates-assignments?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### PATCH /rest/v1.0/projects/{project_id}/permission_template_assignments

**Update a permission template assignment for a user on a project**
Returns the user_id and permission_template_id for the new permission template assignment

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.

Request body (application/json) (required):

- `permission_template_assignments`: object (required)
  - `user_id`: integer (required) - The ID of the user you wish to update the permission template for e.g. `3461`
  - `permission_template_id`: integer (required) - The ID of the permission template you'd like to assign to the user for the project e.g. `5678`

Response 200 (application/json): object

- `user_id`: integer e.g. `12`
- `permission_template_id`: integer e.g. `157`
- `project_id`: integer e.g. `953`

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Users

Resource id: `project-users`. Raw spec: `../openapi-raw/project-users.json`. Web: https://developers.procore.com/reference/rest/project-users?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/users

**List Project Users**
Returns a list of active users associated with a project.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[compact, normal] - Specifies which view of the resource to return (which attributes should be present in the response). Users without read permissions to Directory are limited to the compact view. Otherwise, the default view is normal.
- `filters[created_at]` [query] string(date) - Return item(s) created within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:00......
- `filters[updated_at]` [query] string(date) - Return item(s) last updated within the specified ISO 8601 datetime range. Formats: `YYYY-MM-DD`...`YYYY-MM-DD` - Date `YYYY-MM-DDTHH:MM:SSZ`...`YYYY-MM-DDTHH:MM:SSZ` - DateTime with UTC Offset `YYYY-MM-DDTHH:MM:SS+XX:...
- `filters[permission_template]` [query] integer - Permission Template ID. Returns item(s) assiociated with the specified Permission Template ID.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[origin_id]` [query] string - Origin ID. Returns item(s) with the specified Origin ID.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `filters[search]` [query] string - Returns users where the search string matches the user's first name, last name, email address, keywords, job title, or company name
- `filters[employee]` [query] boolean - Returns users whose is_employee attribute matches the parameter.
- `filters[id][]` [query] array of integer - Returns users whose id attribute matches the parameter.
- `filters[search_by_full_name]` [query] string - Returns users whose full_name matches the parameter.
- `sort` [query] string enum[name, vendor_name, permission_template] - Returns items with the specified sort.

Response 200 (application/json): array of oneOf(object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/users

**Create project user**
Creates a new user in the specified project.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.
#### Created Response
For null values, the key won't be returned

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `address`: string - The street Address of the Project User e.g. `6305 Carpinteria Ave`
  - `avatar`: string - Project User Avatar. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_phone`: string - The Business Phone number of the Project User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Project User e.g. `123`
  - `city`: string - The City in which the Project User resides e.g. `Carpinteria`
  - `country_code`: string - The Country Code of the Project User (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) (required) - The Email Address of the Project User e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Project User e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - The Employee ID of the Project User e.g. `123456789`
  - `fax_number`: string - The Fax Number of the Project User e.g. `1-555-555-5555`
  - `first_name`: string - The First Name of the Project User e.g. `Jane`
  - `initials`: string - The Initials of the Project User e.g. `LR`
  - `is_active`: boolean - The Active status of the Project User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Project User e.g. `false`
  - `job_title`: string - The Job Title of the Project User e.g. `QA Manager`
  - `last_name`: string (required) - The Last Name of the Project User e.g. `Doe`
  - `mobile_phone`: string - The Mobile Phone number of the Project User e.g. `1-555-555-1234`
  - `notes`: string - The Notes (notes/keywords/tags) of the Project User e.g. `notes`
  - `permission_template_id`: integer - The Permission Template ID of the Project User e.g. `27`
  - `state_code`: string - The State Code of the Project User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `vendor_id`: integer - The Vendor ID of the Project User e.g. `161072`
  - `zip`: string - The Zip Code of the Project User e.g. `93013`

Response 201 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `name`: string - User full name e.g. `Jane Doe`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - Is user an insurance manager e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/users/{id}

**Show project user**
Show detail on a specified Project User.
#### OK Response
For null values, the key won't be returned

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the user

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `name`: string - User full name e.g. `Jane Doe`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - Is user an insurance manager e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/users/{id}

**Update project user**
Updates the specified project user. The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information. For OK responses with null values, the key will not be returned.
Note: The `is_active` parameter value requires
a boolean value to be passed in. Setting this parameter to false deactivates the user.
If you have deactivated a user by setting `is_active` to false and then try to
reactivate the user by setting `is_active` to true, you will receive an error message.
To reactivate the user via API, you need to call the
[Sync Company Users](/reference/rest/v1/company-users#sync-company-users) method.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the user
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `user`: object (required)
  - `abbreviated_name`: string - The Initials of the Project User e.g. `JD`
  - `address`: string - The street Address of the Project User e.g. `6305 Carpinteria Ave`
  - `avatar`: string - Project User Avatar. To upload avatar you must upload whole payload as `multipart/form-data` content-type and specify each parameter as form-data together with `user[avatar]` as file. e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
  - `business_phone`: string - The Business Phone number of the Project User e.g. `1-555-555-1234`
  - `business_phone_extension`: integer - The Business Phone Extension of the Project User e.g. `123`
  - `city`: string - The City in which the Project User resides e.g. `Carpinteria`
  - `country_code`: string - The Country Code of the Project User (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string(email) - The Email Address of the Project User e.g. `jane.doe@example.com`
  - `email_signature`: string - The Email Signature of the Project User e.g. `<p>Sent from Procore.</p>`
  - `employee_id`: string - The Employee ID of the Project User e.g. `123456789`
  - `fax_number`: string - The Fax Number of the Project User e.g. `1-555-555-5555`
  - `first_name`: string - The First Name of the Project User e.g. `Jane`
  - `is_active`: boolean - The Active status of the Project User e.g. `true`
  - `is_employee`: boolean - The Employee status of the Project User e.g. `false`
  - `job_title`: string - The Job Title of the Project User e.g. `QA Manager`
  - `last_name`: string - The Last Name of the Project User e.g. `Doe`
  - `mobile_phone`: string - The Mobile Phone number of the Project User e.g. `1-555-555-1234`
  - `notes`: string - The Notes (notes/keywords/tags) of the Project User e.g. `notes`
  - `state_code`: string - The State Code of the Project User (ISO-3166 Alpha-2 format) e.g. `CA`
  - `vendor_id`: integer - The Vendor ID of the Project User e.g. `161072`
  - `zip`: string - The Zip Code of the Project User e.g. `93013`

Response 200 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `name`: string - User full name e.g. `Jane Doe`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - Is user an insurance manager e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/users/{id}/actions/add

**Add company user to project**
Adds a user from the Company Directory to the Project Directory.
#### Created Response
For null values, the key won't be returned

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the user

Request body (application/json):

- `user`: object
  - `permission_template_id`: integer - User permission template identifier

Response 201 (application/json): object

- `address`: string - User address e.g. `6305 Carpinteria Ave`
- `avatar`: string - User avatar url e.g. `http://s3.amazonaws.com/pro-core.com/prostore/20150713184222_production_74548...`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - User business phone e.g. `1-555-555-1234`
- `business_phone_extension`: integer - User business phone extension e.g. `123`
- `city`: string - User city e.g. `Carpinteria`
- `country_code`: string - User country code (ISO-3166 Alpha-2 format) e.g. `US`
- `email_address`: string(email) - User email e.g. `jane.doe@example.com`
- `email_signature`: string - User email signature e.g. `<p>Sent from Procore.</p>`
- `employee_id`: string - User employee id e.g. `123456789`
- `fax_number`: string - User fax number e.g. `1-555-555-1234`
- `first_name`: string - User first name e.g. `Jane`
- `name`: string - User full name e.g. `Jane Doe`
- `id`: integer - User id e.g. `381006`
- `initials`: string - User initials e.g. `JD`
- `is_active`: boolean - User active status e.g. `true`
- `is_employee`: boolean - User employee status e.g. `false`
- `is_insurance_manager`: boolean - Is user an insurance manager e.g. `false`
- `job_title`: string - User job title e.g. `QA Manager`
- `last_login_at`: string(date-time) - User last login at e.g. `2016-06-30T20:41:58Z`
- `last_name`: string - User last name e.g. `Doe`
- `mobile_phone`: string - User mobile phone e.g. `1-555-555-1234`
- `notes`: string - User notes e.g. `notes`
- `state_code`: string - User state code (ISO-3166 Alpha-2 format) e.g. `CA`
- `zip`: string - User zip code e.g. `93013`
- `default_permission_template_id`: integer - User default permission template id e.g. `27`
- `company_permission_template_id`: integer - User Company Permission Template id e.g. `28`
- `origin_id`: string - User origin id e.g. `foobar`
- `origin_data`: string - User origin data e.g. `OD-2398273424`
- `created_at`: string(date-time) - User created at e.g. `2016-10-23T21:39:40Z`
- `updated_at`: string(date-time) - User updated at e.g. `2016-10-23T21:39:40Z`
- `work_classification_id`: integer - Work classification id e.g. `13`
- `vendor`: object
  - `id`: integer e.g. `161072`
  - `name`: string e.g. `SID Architecture`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/users/{id}/actions/remove

**Remove a user from the project**
Removes a specified user from a project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the user

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/users/pdf

**Generates PDF Document**
Generate PDF Document from a project. The endpoint returns url to PDF file.
See [Filtering on List Actions](https://developers.procore.com/documentation/filtering-on-list-actions) for information on using the filtering capabilities provided by this endpoint.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `filters[permission_template]` [query] integer - Permission Template ID. Returns item(s) assiociated with the specified Permission Template ID.
- `filters[vendor_id]` [query] array of integer - Return item(s) with the specified Vendor IDs.
- `filters[id][]` [query] array of integer - Returns users whose id attribute matches the parameter.
- `filters[except_id]` [query] integer - Returns users except as specified.
- `filters[trade_id][]` [query] array of integer - Returns users whose vendor record is associated with the specified trade id(s).
- `contact` [query] boolean - Indicates whether contacts should be included in PDF document.
- `vendor` [query] boolean - Indicates whether vendor should be included in PDF document.
- `user_role` [query] boolean - Indicates whether user_role should be included in PDF document.
- `grouped_by_vendor` [query] boolean - Indicates whether users should be grouped by vendor.

Response 201 (application/json): object

- `pdf_file_url`: string - URL to PDF file e.g. `http://example.com/pdf_file.pdf`

Response 202: Accepted — the directory exceeds the synchronous size threshold (500 contacts). The PDF is being generated asynchronously and will be emailed to the requesting user when complete. The response body is empty. (no body)

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Vendor Insurances

Resource id: `project-vendor-insurances`. Raw spec: `../openapi-raw/project-vendor-insurances.json`. Web: https://developers.procore.com/reference/rest/project-vendor-insurances?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.0/projects/{project_id}/vendors/{vendor_id}/insurances

**List project vendor insurances**
Return a list of Insurances from the specified Project Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `vendor_id` [path] integer (required) - Vendor ID
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `view` [query] string enum[default, extended] - Extended view of data

Response 200 (application/json): array of object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/vendors/{vendor_id}/insurances

**Create project vendor insurance**
Create a new Insurance associated with the specified Project Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `vendor_id` [path] integer (required) - Vendor ID

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 201 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/vendors/{vendor_id}/insurances/{id}

**Show project vendor insurance**
Show detail on the specified Project Vendor Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `vendor_id` [path] integer (required) - Vendor ID
- `id` [path] integer (required) - ID
- `view` [query] string enum[default, extended] - Extended view of data

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/vendors/{vendor_id}/insurances/{id}

**Update project vendor insurance**
Update the specified Project Vendor Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `vendor_id` [path] integer (required) - Vendor ID
- `id` [path] integer (required) - ID
- `view` [query] string enum[default, extended] - Extended view of data

Request body (application/json) (required):

- `insurance`: object (required)
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `id`: integer - ID e.g. `311823`
- `effective_date`: string(date) - Effective date e.g. `2015-03-03`
- `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
- `exempt`: boolean - Exempt status e.g. `false`
- `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
- `info_received`: boolean - Information received (or not) e.g. `false`
- `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
- `insurance_type`: string - Insurance type e.g. `General Liability`
- `limit`: string - Limit e.g. `1000000.0`
- `notes`: string - Notes e.g. `Meets minimum requirements`
- `policy_number`: string - Policy number e.g. `12345GL`
- `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
- `vendor_id`: integer - Vendor ID e.g. `2627684`
- `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
- `division_template`: string - Division Template e.g. `Template 1`
- `insurance_sets`: string - Insurance Sets e.g. `Set 1`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `ABC123`

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/vendors/{vendor_id}/insurances/{id}

**Delete project vendor insurance**
Delete the specified Project Vendor Insurance.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `vendor_id` [path] integer (required) - Vendor ID
- `id` [path] integer (required) - ID
- `view` [query] string enum[default, extended] - Extended view of data

Response 200: OK (no body)

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/vendors/{vendor_id}/insurances/sync

**Sync Project Vendor Insurances**
This endpoint creates or updates a batch of Project Vendor Insurances.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `vendor_id` [path] integer (required) - Vendor ID

Request body (application/json) (required):

- `updates`: array of object (required)
  - `id`: integer - The ID of the Insurance e.g. `348330`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.00`
  - `name`: string - Provider name e.g. `GL Insurance Inc.`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`

Response 200 (application/json): object

- `entities`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
- `errors`: array of object
  - `id`: integer - ID e.g. `311823`
  - `effective_date`: string(date) - Effective date e.g. `2015-03-03`
  - `enable_expired_insurance_notifications`: boolean - Enable/Disable expired insurance notifications e.g. `false`
  - `exempt`: boolean - Exempt status e.g. `false`
  - `expiration_date`: string(date) - Expiration date e.g. `2016-03-02`
  - `info_received`: boolean - Information received (or not) e.g. `false`
  - `insurance_provider`: string - Insurance provider e.g. `GL Insurance Inc.`
  - `insurance_type`: string - Insurance type e.g. `General Liability`
  - `limit`: string - Limit e.g. `1000000.0`
  - `notes`: string - Notes e.g. `Meets minimum requirements`
  - `policy_number`: string - Policy number e.g. `12345GL`
  - `status`: string enum[compliant, compliant_in_progress, expired, non_compliant, non_compliant_in_progress, undecided, unregistered] - Status e.g. `compliant`
  - `vendor_id`: integer - Vendor ID e.g. `2627684`
  - `additional_insured`: string - Additional Individuals and/or Companies Insured e.g. `John Doe`
  - `division_template`: string - Division Template e.g. `Template 1`
  - `insurance_sets`: string - Insurance Sets e.g. `Set 1`
  - `origin_data`: string - Origin data e.g. `OD-2398273424`
  - `origin_id`: string - Origin ID e.g. `ABC123`
  - `errors`: object
    - `field_name`: array of string

Error responses: 400, 401, 403, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

## Project Vendors

Resource id: `project-vendors`. Raw spec: `../openapi-raw/project-vendors.json`. Web: https://developers.procore.com/reference/rest/project-vendors?version=latest
Product lines: PM Essentials, PM Starter Pack, Total Quality and Safety Management, Construction Financials

### GET /rest/v1.1/projects/{project_id}/vendors

**List project vendors**
Return a list of Vendors associated with a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended, ids_only, list, name, minimal, normal] - Specifies which view of the resource to return (which attributes should be present in the response). Users without read permissions to Directory are limited to ids_only, name, and minimal views. If a valid view is not...
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Return vendors where the search string matches the vendor name, keywords, origin_code, or ABN/EIN number
- `filters[standard_cost_code_id][]` [query] array of integer - Returns vendors associated with the specified standard cost code id(s)
- `filters[trade_id][]` [query] array of integer - Returns vendors associated with the specified trade id(s)
- `filters[id][]` [query] array of integer - Returns vendors with the specified id(s)
- `filters[parent_id][]` [query] array of integer - Returns vendors with the specified parent id(s)
- `sort` [query] string enum[name, main_office_name] - Return items with the specified sort.

Response 200 (application/json): array of oneOf(number | object | object | object | object | object)


Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/vendors

**Create project vendor**
Create a new Project Vendor.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[extended, normal] - Specifies which view of the resource to return (which attributes should be present in the response). The default view is normal.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `vendor`: object (required)
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Street address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone number e.g. `(812) 284-8506`
  - `city`: string - City e.g. `Jeffersonville`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string - Email address e.g. `jane.doe@example.com`
  - `fax_number`: string - Fax number e.g. `(812) 863-2725`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `mobile_phone`: string - Mobile phone number e.g. `(812) 556-3397`
  - `name`: string (required) - Name e.g. `Poodle Electric`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `notes`: string - Notes (notes/keywords/tags) e.g. `owned by a dog`
  - `origin_id`: string - Origin ID e.g. `ref-12345`
  - `origin_data`: string - Origin Data e.g. `{"data_field":{"is_important":true}}`
  - `origin_code`: string - Origin Code e.g. `PE-12345`
  - `parent_id`: integer - Parent Vendor ID. Cannot be the same as ID. Only two levels of hierarchy are supported (parent/child). e.g. `1306797`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `primary_contact_id`: integer - Primary Contact ID e.g. `15316136`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `true`
  - `website`: string - Website url e.g. `http://poodleparade.com`
  - `zip`: string - Zip code e.g. `47130`

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.1/projects/{project_id}/vendors/{id}

**Show project vendor**
Show detail on a specified Project Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.

Response 200 (application/json): oneOf(object | object)


Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.1/projects/{project_id}/vendors/{id}

**Update project vendor**
Update a specified Project Vendor.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `vendor`: object (required)
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone e.g. `(812) 284-8506`
  - `city`: string - City e.g. `Jeffersonville`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string - Email address e.g. `jane.doe@example.com`
  - `fax_number`: string - Fax number e.g. `(812) 863-2725`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `mobile_phone`: string - Mobile phone e.g. `(812) 556-3397`
  - `name`: string - Name e.g. `Poodle Electric`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `notes`: string - Notes (notes/keywords/tags) e.g. `owned by a dog`
  - `origin_id`: string - Origin ID e.g. `ref-12345`
  - `origin_data`: string - Origin Data e.g. `{"data_field":{"is_important":true}}`
  - `origin_code`: string - Origin Code e.g. `PE-12345`
  - `parent_id`: integer - Parent Vendor ID. Cannot be the same as ID. Only two levels of hierarchy are supported (parent/child). e.g. `1306797`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `primary_contact_id`: integer - Primary Contact ID e.g. `15316136`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `true`
  - `website`: string - Website url e.g. `http://poodleparade.com`
  - `zip`: string - Zip code e.g. `47130`
  - `bidding`: object - Bidding statuses
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `true`
    - `african_american_business`: boolean e.g. `true`
    - `hispanic_business`: boolean e.g. `true`
    - `womens_business`: boolean e.g. `true`
    - `historically_underutilized_business`: boolean e.g. `true`
    - `sdvo_business`: boolean e.g. `true`
    - `certified_business_enterprise`: boolean e.g. `true`
    - `asian_american_business`: boolean e.g. `true`
    - `native_american_business`: boolean e.g. `true`
    - `disadvantaged_business`: boolean e.g. `true`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `true`

Response 200 (application/json): oneOf(object | object)


Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.1/projects/{project_id}/vendors/{id}/actions/add

**Add to project**
Add a specified vendor to a Project from the Company Directory.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor

Response 201 (application/json): oneOf(object | object)


Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.1/projects/{project_id}/vendors/{id}/actions/remove

**Delete from project**
Remove a specified Vendor from a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/vendors  **[OLDER VERSION - a newer path version exists below/above]**

**List project vendors**
Return a list of Vendors associated with a specified Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.
- `page` [query] integer - Page
- `per_page` [query] integer - Elements per page
- `filters[search]` [query] string - Return vendors where the search string matches the vendor name, keywords, origin_code, or ABN/EIN number
- `filters[standard_cost_code_id][]` [query] array of integer - Returns vendors associated with the specified standard cost code id(s)
- `filters[trade_id][]` [query] array of integer - Returns vendors associated with the specified trade id(s)
- `filters[id][]` [query] array of integer - Returns vendors with the specified id(s)
- `filters[parent_id][]` [query] array of integer - Returns vendors with the specified parent id(s)
- `filters[abbreviated_name][]` [query] array of string - Return vendors(s) matching any of the specified abbreviated names in the abbreviated_name filter.
- `sort` [query] string enum[name, main_office_name, project_and_bid_counts] - Return items with the specified sort.

Response 200 (application/json): array of object

- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding Distribution List
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `company_name`: string - name of company e.g. `SID Architecture`
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `business`: object
  - `id`: string - UUID for the business e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
  - `name`: string - Name of the Business e.g. `Test Company, Inc.`
  - `dba`: string - Business Name DBA (Doing Business As) e.g. `Test Company`
  - `website`: string - Primary URL for the business website e.g. `www.testcompanyinc.com`
  - `about`: string - About the Business text e.g. `The best test company around.`
  - `published`: boolean - Indicates whether the Business has been publically published on PCN e.g. `true`
  - `primary_slug`: string - Slug for Business e.g. `test-company-carpinteria`
  - `logo_url`: string - URL link to Logo for the Business e.g. `www.storage.com/company_logo.png`
  - `source`: object - Information about where the business information was sourced from
    - `id`: string - Unique identifier for the business in the source data. For example, typeform id in snowflake e.g. `m7pn7civb73iwijcm7wxxpaxniejvyo2`
    - `source`: string - More detailed source information, for example the source field on snowflake records e.g. `ucd/public_data/typeform_Jul2021/responses (1) (2).csv`
    - `type`: string - The high level source this data was pulled from. This is currently always 'snowflake' e.g. `SNOWFLAKE`
    - `record_type`: string - More detailed type information, for example the record type on snowflake records e.g. `Typeform`
  - `addresses`: array of object - Addresses for the Business. These are also reflected in Offices for the Company.
    - `id`: string - UUID for the address e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
    - `name`: string - Address Name e.g. `Main Office`
    - `address1`: string - Business Street Address e.g. `6309 Carpinteria Ave`
    - `address2`: string - Street Address Line 2 e.g. `Suite 100`
    - `city`: string - Address City e.g. `Carpinteria`
    - `latitude`: number - Latitude of the Address e.g. `42.39996`
    - `longitude`: number - Longitude of the Address e.g. `-84.35104`
    - `province`: string - Address State or Province e.g. `CA`
    - `postal_code1`: string - Address Primary Zip Code or Other Postal Code e.g. `93013`
    - `country_code`: string - Country Code e.g. `US`
    - `phone_number`: string - Business Phone Number e.g. `+1-517-936-7923`
    - `fax_number`: string - Business Fax Number e.g. `+1-517-936-7923`
    - `primary`: boolean - Indicates whether this is the primary address for the Business. This is also the Main Office of the company. e.g. `true`
    - `address_types`: array of string - Address Types
  - `provided_services`: array of object - Services the Business Provides
    - `id`: string - Provided Service UUID e.g. `245acd0d-a3e1-4b8d-8891-7fdc364910ec`
    - `key`: string - i18n key for the name of the Provided Service e.g. `existing_material_assessment`
    - `path`: string - The keys of the Provided Service hierarchy, e.g. key1#key2#key3 e.g. `professional_and_business_services#assessments_and_studies#existing_material_...`
    - `level`: string - The name of this Provided Service's level, ex. 'trade' or 'category' e.g. `specialty`
  - `construction_sectors`: array of string - Construction Sectors this Business works in
  - `business_types`: array of string - Business Types this Business falls under
  - `project_types`: array of string - Project Types this Business falls under
  - `classifications`: array of object - Classifications this Business falls under
    - `abbreviation`: string - Abbreviation of the Classification e.g. `SBE`
    - `key`: string - Identifier key of the Classification e.g. `SBE`
    - `name`: string - Name of the Classification e.g. `Small Business`
  - `coverage_areas`: array of object - Business area coverage
    - `country_code`: string - Country Code e.g. `US`
    - `google_place_id`: string - Google Place ID e.g. `ChIJL4iEQEoS6YAR04viVA12TNw`
    - `admin1`: string - State (Province) e.g. `CA`
    - `admin2`: string - County e.g. `Orange County`
    - `admin3`: string - Not used in US
    - `admin4`: string - Not used in US
    - `locality`: string - Locality (City) e.g. `Anaheim Hills`
    - `selected_level`: string - The admin level that was originally chosen by user e.g. `locality`
  - `claimed`: boolean - Indicates whether the Business has been claimed by a user e.g. `true`
  - `Tags`: object - Tags to indicate the current status of business
    - `claim_status`: string enum[PENDING, APPROVED] - Indicates that a claim request was made for the business and request is in consideration
    - `approval_status`: string enum[PENDING, APPROVED, REJECTED] - Indicates that an approval request was made for the business and request is in consideration
    - `publishable`: string enum[true, false] - Indicates that a business can be published
  - `start_of_operations`: string(date) - Date when the business started operations e.g. `2023-10-24`
  - `updated_by`: string - E-mail of last user to update a PCN profile e.g. `samantha@example.com`
  - `published_at`: string(date-time) - Datetime of when the business published its PCN profile e.g. `2024-10-03T20:40:59Z`
  - `published_by`: string - E-mail of last user to publish a business's PCN profile e.g. `samantha@example.com`
- `children_count`: integer - Count of Vendors whose parent_id is this Vendor's ID e.g. `0`
- `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `project_ids`: array of integer - Array of Project IDs
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `uuid`: string(uuid) - UUID associated with the vendor contact record e.g. `550e8400-e29b-41d4-a716-446655440000`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`

Error responses: 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/vendors  **[OLDER VERSION - a newer path version exists below/above]**

**Create project vendor**
Create a new Project Vendor.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `vendor`: object (required)
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Street address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone number e.g. `(812) 284-8506`
  - `city`: string - City e.g. `Jeffersonville`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string - Email address e.g. `jane.doe@example.com`
  - `fax_number`: string - Fax number e.g. `(812) 863-2725`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `mobile_phone`: string - Mobile phone number e.g. `(812) 556-3397`
  - `name`: string (required) - Name e.g. `Poodle Electric`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `notes`: string - Notes (notes/keywords/tags) e.g. `owned by a dog`
  - `origin_id`: string - Origin ID e.g. `ref-12345`
  - `origin_data`: string - Origin Data e.g. `{"data_field":{"is_important":true}}`
  - `origin_code`: string - Origin Code e.g. `PE-12345`
  - `parent_id`: integer - Parent Vendor ID. Cannot be the same as ID. Only two levels of hierarchy are supported (parent/child). e.g. `1306797`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `primary_contact_id`: integer - Primary Contact ID e.g. `15316136`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `true`
  - `website`: string - Website url e.g. `http://poodleparade.com`
  - `zip`: string - Zip code e.g. `47130`

Response 201 (application/json): object

- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding Distribution List
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `company_name`: string - name of company e.g. `SID Architecture`
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `business`: object
  - `id`: string - UUID for the business e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
  - `name`: string - Name of the Business e.g. `Test Company, Inc.`
  - `dba`: string - Business Name DBA (Doing Business As) e.g. `Test Company`
  - `website`: string - Primary URL for the business website e.g. `www.testcompanyinc.com`
  - `about`: string - About the Business text e.g. `The best test company around.`
  - `published`: boolean - Indicates whether the Business has been publically published on PCN e.g. `true`
  - `primary_slug`: string - Slug for Business e.g. `test-company-carpinteria`
  - `logo_url`: string - URL link to Logo for the Business e.g. `www.storage.com/company_logo.png`
  - `source`: object - Information about where the business information was sourced from
    - `id`: string - Unique identifier for the business in the source data. For example, typeform id in snowflake e.g. `m7pn7civb73iwijcm7wxxpaxniejvyo2`
    - `source`: string - More detailed source information, for example the source field on snowflake records e.g. `ucd/public_data/typeform_Jul2021/responses (1) (2).csv`
    - `type`: string - The high level source this data was pulled from. This is currently always 'snowflake' e.g. `SNOWFLAKE`
    - `record_type`: string - More detailed type information, for example the record type on snowflake records e.g. `Typeform`
  - `addresses`: array of object - Addresses for the Business. These are also reflected in Offices for the Company.
    - `id`: string - UUID for the address e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
    - `name`: string - Address Name e.g. `Main Office`
    - `address1`: string - Business Street Address e.g. `6309 Carpinteria Ave`
    - `address2`: string - Street Address Line 2 e.g. `Suite 100`
    - `city`: string - Address City e.g. `Carpinteria`
    - `latitude`: number - Latitude of the Address e.g. `42.39996`
    - `longitude`: number - Longitude of the Address e.g. `-84.35104`
    - `province`: string - Address State or Province e.g. `CA`
    - `postal_code1`: string - Address Primary Zip Code or Other Postal Code e.g. `93013`
    - `country_code`: string - Country Code e.g. `US`
    - `phone_number`: string - Business Phone Number e.g. `+1-517-936-7923`
    - `fax_number`: string - Business Fax Number e.g. `+1-517-936-7923`
    - `primary`: boolean - Indicates whether this is the primary address for the Business. This is also the Main Office of the company. e.g. `true`
    - `address_types`: array of string - Address Types
  - `provided_services`: array of object - Services the Business Provides
    - `id`: string - Provided Service UUID e.g. `245acd0d-a3e1-4b8d-8891-7fdc364910ec`
    - `key`: string - i18n key for the name of the Provided Service e.g. `existing_material_assessment`
    - `path`: string - The keys of the Provided Service hierarchy, e.g. key1#key2#key3 e.g. `professional_and_business_services#assessments_and_studies#existing_material_...`
    - `level`: string - The name of this Provided Service's level, ex. 'trade' or 'category' e.g. `specialty`
  - `construction_sectors`: array of string - Construction Sectors this Business works in
  - `business_types`: array of string - Business Types this Business falls under
  - `project_types`: array of string - Project Types this Business falls under
  - `classifications`: array of object - Classifications this Business falls under
    - `abbreviation`: string - Abbreviation of the Classification e.g. `SBE`
    - `key`: string - Identifier key of the Classification e.g. `SBE`
    - `name`: string - Name of the Classification e.g. `Small Business`
  - `coverage_areas`: array of object - Business area coverage
    - `country_code`: string - Country Code e.g. `US`
    - `google_place_id`: string - Google Place ID e.g. `ChIJL4iEQEoS6YAR04viVA12TNw`
    - `admin1`: string - State (Province) e.g. `CA`
    - `admin2`: string - County e.g. `Orange County`
    - `admin3`: string - Not used in US
    - `admin4`: string - Not used in US
    - `locality`: string - Locality (City) e.g. `Anaheim Hills`
    - `selected_level`: string - The admin level that was originally chosen by user e.g. `locality`
  - `claimed`: boolean - Indicates whether the Business has been claimed by a user e.g. `true`
  - `Tags`: object - Tags to indicate the current status of business
    - `claim_status`: string enum[PENDING, APPROVED] - Indicates that a claim request was made for the business and request is in consideration
    - `approval_status`: string enum[PENDING, APPROVED, REJECTED] - Indicates that an approval request was made for the business and request is in consideration
    - `publishable`: string enum[true, false] - Indicates that a business can be published
  - `start_of_operations`: string(date) - Date when the business started operations e.g. `2023-10-24`
  - `updated_by`: string - E-mail of last user to update a PCN profile e.g. `samantha@example.com`
  - `published_at`: string(date-time) - Datetime of when the business published its PCN profile e.g. `2024-10-03T20:40:59Z`
  - `published_by`: string - E-mail of last user to publish a business's PCN profile e.g. `samantha@example.com`
- `children_count`: integer - Count of Vendors whose parent_id is this Vendor's ID e.g. `0`
- `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `project_ids`: array of integer - Array of Project IDs
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `uuid`: string(uuid) - UUID associated with the vendor contact record e.g. `550e8400-e29b-41d4-a716-446655440000`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### GET /rest/v1.0/projects/{project_id}/vendors/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Show project vendor**
Show detail on a specified Project Vendor.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.

Response 200 (application/json): object

- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding Distribution List
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `company_name`: string - name of company e.g. `SID Architecture`
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `business`: object
  - `id`: string - UUID for the business e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
  - `name`: string - Name of the Business e.g. `Test Company, Inc.`
  - `dba`: string - Business Name DBA (Doing Business As) e.g. `Test Company`
  - `website`: string - Primary URL for the business website e.g. `www.testcompanyinc.com`
  - `about`: string - About the Business text e.g. `The best test company around.`
  - `published`: boolean - Indicates whether the Business has been publically published on PCN e.g. `true`
  - `primary_slug`: string - Slug for Business e.g. `test-company-carpinteria`
  - `logo_url`: string - URL link to Logo for the Business e.g. `www.storage.com/company_logo.png`
  - `source`: object - Information about where the business information was sourced from
    - `id`: string - Unique identifier for the business in the source data. For example, typeform id in snowflake e.g. `m7pn7civb73iwijcm7wxxpaxniejvyo2`
    - `source`: string - More detailed source information, for example the source field on snowflake records e.g. `ucd/public_data/typeform_Jul2021/responses (1) (2).csv`
    - `type`: string - The high level source this data was pulled from. This is currently always 'snowflake' e.g. `SNOWFLAKE`
    - `record_type`: string - More detailed type information, for example the record type on snowflake records e.g. `Typeform`
  - `addresses`: array of object - Addresses for the Business. These are also reflected in Offices for the Company.
    - `id`: string - UUID for the address e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
    - `name`: string - Address Name e.g. `Main Office`
    - `address1`: string - Business Street Address e.g. `6309 Carpinteria Ave`
    - `address2`: string - Street Address Line 2 e.g. `Suite 100`
    - `city`: string - Address City e.g. `Carpinteria`
    - `latitude`: number - Latitude of the Address e.g. `42.39996`
    - `longitude`: number - Longitude of the Address e.g. `-84.35104`
    - `province`: string - Address State or Province e.g. `CA`
    - `postal_code1`: string - Address Primary Zip Code or Other Postal Code e.g. `93013`
    - `country_code`: string - Country Code e.g. `US`
    - `phone_number`: string - Business Phone Number e.g. `+1-517-936-7923`
    - `fax_number`: string - Business Fax Number e.g. `+1-517-936-7923`
    - `primary`: boolean - Indicates whether this is the primary address for the Business. This is also the Main Office of the company. e.g. `true`
    - `address_types`: array of string - Address Types
  - `provided_services`: array of object - Services the Business Provides
    - `id`: string - Provided Service UUID e.g. `245acd0d-a3e1-4b8d-8891-7fdc364910ec`
    - `key`: string - i18n key for the name of the Provided Service e.g. `existing_material_assessment`
    - `path`: string - The keys of the Provided Service hierarchy, e.g. key1#key2#key3 e.g. `professional_and_business_services#assessments_and_studies#existing_material_...`
    - `level`: string - The name of this Provided Service's level, ex. 'trade' or 'category' e.g. `specialty`
  - `construction_sectors`: array of string - Construction Sectors this Business works in
  - `business_types`: array of string - Business Types this Business falls under
  - `project_types`: array of string - Project Types this Business falls under
  - `classifications`: array of object - Classifications this Business falls under
    - `abbreviation`: string - Abbreviation of the Classification e.g. `SBE`
    - `key`: string - Identifier key of the Classification e.g. `SBE`
    - `name`: string - Name of the Classification e.g. `Small Business`
  - `coverage_areas`: array of object - Business area coverage
    - `country_code`: string - Country Code e.g. `US`
    - `google_place_id`: string - Google Place ID e.g. `ChIJL4iEQEoS6YAR04viVA12TNw`
    - `admin1`: string - State (Province) e.g. `CA`
    - `admin2`: string - County e.g. `Orange County`
    - `admin3`: string - Not used in US
    - `admin4`: string - Not used in US
    - `locality`: string - Locality (City) e.g. `Anaheim Hills`
    - `selected_level`: string - The admin level that was originally chosen by user e.g. `locality`
  - `claimed`: boolean - Indicates whether the Business has been claimed by a user e.g. `true`
  - `Tags`: object - Tags to indicate the current status of business
    - `claim_status`: string enum[PENDING, APPROVED] - Indicates that a claim request was made for the business and request is in consideration
    - `approval_status`: string enum[PENDING, APPROVED, REJECTED] - Indicates that an approval request was made for the business and request is in consideration
    - `publishable`: string enum[true, false] - Indicates that a business can be published
  - `start_of_operations`: string(date) - Date when the business started operations e.g. `2023-10-24`
  - `updated_by`: string - E-mail of last user to update a PCN profile e.g. `samantha@example.com`
  - `published_at`: string(date-time) - Datetime of when the business published its PCN profile e.g. `2024-10-03T20:40:59Z`
  - `published_by`: string - E-mail of last user to publish a business's PCN profile e.g. `samantha@example.com`
- `children_count`: integer - Count of Vendors whose parent_id is this Vendor's ID e.g. `0`
- `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `project_ids`: array of integer - Array of Project IDs
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `uuid`: string(uuid) - UUID associated with the vendor contact record e.g. `550e8400-e29b-41d4-a716-446655440000`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`

Error responses: 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### PATCH /rest/v1.0/projects/{project_id}/vendors/{id}  **[OLDER VERSION - a newer path version exists below/above]**

**Update project vendor**
Update a specified Project Vendor.
#### Country and State codes
The `country_code` and `state_code` parameter values must conform to the ISO-3166 Alpha-2 specification.
See [Working with Country Codes](/documentation/country-codes) for additional information.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor
- `view` [query] string enum[normal, extended] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The default view is normal.
- `run_configurable_validations` [query] boolean - If true, validations are run for the corresponding Configurable Field Set.

Request body (application/json) (required):

- `vendor`: object (required)
  - `abbreviated_name`: string - Abbreviated name e.g. `PE`
  - `address`: string - Address e.g. `846 Dogglesworth Drive`
  - `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
  - `business_phone`: string - Business phone e.g. `(812) 284-8506`
  - `city`: string - City e.g. `Jeffersonville`
  - `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
  - `email_address`: string - Email address e.g. `jane.doe@example.com`
  - `fax_number`: string - Fax number e.g. `(812) 863-2725`
  - `is_active`: boolean - Active status e.g. `true`
  - `labor_union`: string - Labor union e.g. `IWW 872`
  - `license_number`: string - License number e.g. `1901XYZ`
  - `mobile_phone`: string - Mobile phone e.g. `(812) 556-3397`
  - `name`: string - Name e.g. `Poodle Electric`
  - `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
  - `notes`: string - Notes (notes/keywords/tags) e.g. `owned by a dog`
  - `origin_id`: string - Origin ID e.g. `ref-12345`
  - `origin_data`: string - Origin Data e.g. `{"data_field":{"is_important":true}}`
  - `origin_code`: string - Origin Code e.g. `PE-12345`
  - `parent_id`: integer - Parent Vendor ID. Cannot be the same as ID. Only two levels of hierarchy are supported (parent/child). e.g. `1306797`
  - `prequalified`: boolean - Prequalified status e.g. `false`
  - `primary_contact_id`: integer - Primary Contact ID e.g. `15316136`
  - `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
  - `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
  - `union_member`: boolean - Union member status e.g. `true`
  - `website`: string - Website url e.g. `http://poodleparade.com`
  - `zip`: string - Zip code e.g. `47130`
  - `bidding`: object - Bidding statuses
    - `affirmative_action`: boolean e.g. `true`
    - `small_business`: boolean e.g. `true`
    - `african_american_business`: boolean e.g. `true`
    - `hispanic_business`: boolean e.g. `true`
    - `womens_business`: boolean e.g. `true`
    - `historically_underutilized_business`: boolean e.g. `true`
    - `sdvo_business`: boolean e.g. `true`
    - `certified_business_enterprise`: boolean e.g. `true`
    - `asian_american_business`: boolean e.g. `true`
    - `native_american_business`: boolean e.g. `true`
    - `disadvantaged_business`: boolean e.g. `true`
    - `minority_business_enterprise`: boolean e.g. `true`
    - `eight_a_business`: boolean e.g. `true`

Response 200 (application/json): object

- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding Distribution List
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `company_name`: string - name of company e.g. `SID Architecture`
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `business`: object
  - `id`: string - UUID for the business e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
  - `name`: string - Name of the Business e.g. `Test Company, Inc.`
  - `dba`: string - Business Name DBA (Doing Business As) e.g. `Test Company`
  - `website`: string - Primary URL for the business website e.g. `www.testcompanyinc.com`
  - `about`: string - About the Business text e.g. `The best test company around.`
  - `published`: boolean - Indicates whether the Business has been publically published on PCN e.g. `true`
  - `primary_slug`: string - Slug for Business e.g. `test-company-carpinteria`
  - `logo_url`: string - URL link to Logo for the Business e.g. `www.storage.com/company_logo.png`
  - `source`: object - Information about where the business information was sourced from
    - `id`: string - Unique identifier for the business in the source data. For example, typeform id in snowflake e.g. `m7pn7civb73iwijcm7wxxpaxniejvyo2`
    - `source`: string - More detailed source information, for example the source field on snowflake records e.g. `ucd/public_data/typeform_Jul2021/responses (1) (2).csv`
    - `type`: string - The high level source this data was pulled from. This is currently always 'snowflake' e.g. `SNOWFLAKE`
    - `record_type`: string - More detailed type information, for example the record type on snowflake records e.g. `Typeform`
  - `addresses`: array of object - Addresses for the Business. These are also reflected in Offices for the Company.
    - `id`: string - UUID for the address e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
    - `name`: string - Address Name e.g. `Main Office`
    - `address1`: string - Business Street Address e.g. `6309 Carpinteria Ave`
    - `address2`: string - Street Address Line 2 e.g. `Suite 100`
    - `city`: string - Address City e.g. `Carpinteria`
    - `latitude`: number - Latitude of the Address e.g. `42.39996`
    - `longitude`: number - Longitude of the Address e.g. `-84.35104`
    - `province`: string - Address State or Province e.g. `CA`
    - `postal_code1`: string - Address Primary Zip Code or Other Postal Code e.g. `93013`
    - `country_code`: string - Country Code e.g. `US`
    - `phone_number`: string - Business Phone Number e.g. `+1-517-936-7923`
    - `fax_number`: string - Business Fax Number e.g. `+1-517-936-7923`
    - `primary`: boolean - Indicates whether this is the primary address for the Business. This is also the Main Office of the company. e.g. `true`
    - `address_types`: array of string - Address Types
  - `provided_services`: array of object - Services the Business Provides
    - `id`: string - Provided Service UUID e.g. `245acd0d-a3e1-4b8d-8891-7fdc364910ec`
    - `key`: string - i18n key for the name of the Provided Service e.g. `existing_material_assessment`
    - `path`: string - The keys of the Provided Service hierarchy, e.g. key1#key2#key3 e.g. `professional_and_business_services#assessments_and_studies#existing_material_...`
    - `level`: string - The name of this Provided Service's level, ex. 'trade' or 'category' e.g. `specialty`
  - `construction_sectors`: array of string - Construction Sectors this Business works in
  - `business_types`: array of string - Business Types this Business falls under
  - `project_types`: array of string - Project Types this Business falls under
  - `classifications`: array of object - Classifications this Business falls under
    - `abbreviation`: string - Abbreviation of the Classification e.g. `SBE`
    - `key`: string - Identifier key of the Classification e.g. `SBE`
    - `name`: string - Name of the Classification e.g. `Small Business`
  - `coverage_areas`: array of object - Business area coverage
    - `country_code`: string - Country Code e.g. `US`
    - `google_place_id`: string - Google Place ID e.g. `ChIJL4iEQEoS6YAR04viVA12TNw`
    - `admin1`: string - State (Province) e.g. `CA`
    - `admin2`: string - County e.g. `Orange County`
    - `admin3`: string - Not used in US
    - `admin4`: string - Not used in US
    - `locality`: string - Locality (City) e.g. `Anaheim Hills`
    - `selected_level`: string - The admin level that was originally chosen by user e.g. `locality`
  - `claimed`: boolean - Indicates whether the Business has been claimed by a user e.g. `true`
  - `Tags`: object - Tags to indicate the current status of business
    - `claim_status`: string enum[PENDING, APPROVED] - Indicates that a claim request was made for the business and request is in consideration
    - `approval_status`: string enum[PENDING, APPROVED, REJECTED] - Indicates that an approval request was made for the business and request is in consideration
    - `publishable`: string enum[true, false] - Indicates that a business can be published
  - `start_of_operations`: string(date) - Date when the business started operations e.g. `2023-10-24`
  - `updated_by`: string - E-mail of last user to update a PCN profile e.g. `samantha@example.com`
  - `published_at`: string(date-time) - Datetime of when the business published its PCN profile e.g. `2024-10-03T20:40:59Z`
  - `published_by`: string - E-mail of last user to publish a business's PCN profile e.g. `samantha@example.com`
- `children_count`: integer - Count of Vendors whose parent_id is this Vendor's ID e.g. `0`
- `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `project_ids`: array of integer - Array of Project IDs
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `uuid`: string(uuid) - UUID associated with the vendor contact record e.g. `550e8400-e29b-41d4-a716-446655440000`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`

Error responses: 400, 401, 403, 404 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v1.0/projects/{project_id}/vendors/{id}/actions/add  **[OLDER VERSION - a newer path version exists below/above]**

**Add to project**
Add a specified vendor to a Project from the Company Directory.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `view` [query] string enum[normal, extended, name] - The normal view provides what is shown below. The extended view is the same as the normal view but includes children_count, legal_name, parent, and bidding. The name view is a minimal view only including the name and ...
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor

Response 201 (application/json): object

- `bidding`: object - Bidding status e.g. `{"affirmative_action": false, "small_business": false, "african_american_busi...`
  - `affirmative_action`: boolean e.g. `true`
  - `small_business`: boolean e.g. `false`
  - `african_american_business`: boolean e.g. `false`
  - `hispanic_business`: boolean e.g. `false`
  - `womens_business`: boolean e.g. `false`
  - `historically_underutilized_business`: boolean e.g. `false`
  - `sdvo_business`: boolean e.g. `false`
  - `certified_business_enterprise`: boolean e.g. `false`
  - `asian_american_business`: boolean e.g. `false`
  - `native_american_business`: boolean e.g. `false`
  - `disadvantaged_business`: boolean e.g. `false`
  - `minority_business_enterprise`: boolean e.g. `true`
  - `eight_a_business`: boolean e.g. `false`
- `bidding_distribution`: array of object - Bidding Distribution List
  - `login`: string - Email e.g. `carl.contractor@example.com`
  - `company_name`: string - name of company e.g. `SID Architecture`
  - `id`: integer - Login Information ID of the User e.g. `161072`
  - `name`: string e.g. `Carl the Contractor`
- `business`: object
  - `id`: string - UUID for the business e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
  - `name`: string - Name of the Business e.g. `Test Company, Inc.`
  - `dba`: string - Business Name DBA (Doing Business As) e.g. `Test Company`
  - `website`: string - Primary URL for the business website e.g. `www.testcompanyinc.com`
  - `about`: string - About the Business text e.g. `The best test company around.`
  - `published`: boolean - Indicates whether the Business has been publically published on PCN e.g. `true`
  - `primary_slug`: string - Slug for Business e.g. `test-company-carpinteria`
  - `logo_url`: string - URL link to Logo for the Business e.g. `www.storage.com/company_logo.png`
  - `source`: object - Information about where the business information was sourced from
    - `id`: string - Unique identifier for the business in the source data. For example, typeform id in snowflake e.g. `m7pn7civb73iwijcm7wxxpaxniejvyo2`
    - `source`: string - More detailed source information, for example the source field on snowflake records e.g. `ucd/public_data/typeform_Jul2021/responses (1) (2).csv`
    - `type`: string - The high level source this data was pulled from. This is currently always 'snowflake' e.g. `SNOWFLAKE`
    - `record_type`: string - More detailed type information, for example the record type on snowflake records e.g. `Typeform`
  - `addresses`: array of object - Addresses for the Business. These are also reflected in Offices for the Company.
    - `id`: string - UUID for the address e.g. `2975a9c3-f28b-4eb6-a29a-2332e73b3ad7`
    - `name`: string - Address Name e.g. `Main Office`
    - `address1`: string - Business Street Address e.g. `6309 Carpinteria Ave`
    - `address2`: string - Street Address Line 2 e.g. `Suite 100`
    - `city`: string - Address City e.g. `Carpinteria`
    - `latitude`: number - Latitude of the Address e.g. `42.39996`
    - `longitude`: number - Longitude of the Address e.g. `-84.35104`
    - `province`: string - Address State or Province e.g. `CA`
    - `postal_code1`: string - Address Primary Zip Code or Other Postal Code e.g. `93013`
    - `country_code`: string - Country Code e.g. `US`
    - `phone_number`: string - Business Phone Number e.g. `+1-517-936-7923`
    - `fax_number`: string - Business Fax Number e.g. `+1-517-936-7923`
    - `primary`: boolean - Indicates whether this is the primary address for the Business. This is also the Main Office of the company. e.g. `true`
    - `address_types`: array of string - Address Types
  - `provided_services`: array of object - Services the Business Provides
    - `id`: string - Provided Service UUID e.g. `245acd0d-a3e1-4b8d-8891-7fdc364910ec`
    - `key`: string - i18n key for the name of the Provided Service e.g. `existing_material_assessment`
    - `path`: string - The keys of the Provided Service hierarchy, e.g. key1#key2#key3 e.g. `professional_and_business_services#assessments_and_studies#existing_material_...`
    - `level`: string - The name of this Provided Service's level, ex. 'trade' or 'category' e.g. `specialty`
  - `construction_sectors`: array of string - Construction Sectors this Business works in
  - `business_types`: array of string - Business Types this Business falls under
  - `project_types`: array of string - Project Types this Business falls under
  - `classifications`: array of object - Classifications this Business falls under
    - `abbreviation`: string - Abbreviation of the Classification e.g. `SBE`
    - `key`: string - Identifier key of the Classification e.g. `SBE`
    - `name`: string - Name of the Classification e.g. `Small Business`
  - `coverage_areas`: array of object - Business area coverage
    - `country_code`: string - Country Code e.g. `US`
    - `google_place_id`: string - Google Place ID e.g. `ChIJL4iEQEoS6YAR04viVA12TNw`
    - `admin1`: string - State (Province) e.g. `CA`
    - `admin2`: string - County e.g. `Orange County`
    - `admin3`: string - Not used in US
    - `admin4`: string - Not used in US
    - `locality`: string - Locality (City) e.g. `Anaheim Hills`
    - `selected_level`: string - The admin level that was originally chosen by user e.g. `locality`
  - `claimed`: boolean - Indicates whether the Business has been claimed by a user e.g. `true`
  - `Tags`: object - Tags to indicate the current status of business
    - `claim_status`: string enum[PENDING, APPROVED] - Indicates that a claim request was made for the business and request is in consideration
    - `approval_status`: string enum[PENDING, APPROVED, REJECTED] - Indicates that an approval request was made for the business and request is in consideration
    - `publishable`: string enum[true, false] - Indicates that a business can be published
  - `start_of_operations`: string(date) - Date when the business started operations e.g. `2023-10-24`
  - `updated_by`: string - E-mail of last user to update a PCN profile e.g. `samantha@example.com`
  - `published_at`: string(date-time) - Datetime of when the business published its PCN profile e.g. `2024-10-03T20:40:59Z`
  - `published_by`: string - E-mail of last user to publish a business's PCN profile e.g. `samantha@example.com`
- `children_count`: integer - Count of Vendors whose parent_id is this Vendor's ID e.g. `0`
- `legal_name`: string - Name of the parent, if one exists. Otherwise same as name. e.g. `Stock Construction`
- `parent`: object e.g. `{"id": 634512, "name": "Poodle Electric Inc."}`
  - `id`: integer
  - `name`: string
- `trades`: array of object - Trades
  - `id`: integer - Trade ID e.g. `999`
  - `name`: string - Trade name e.g. `09 - acoustical panels`
  - `active`: boolean - Trade availability e.g. `true`
  - `updated_at`: string(date-time) - Timestamp of last update to Trade e.g. `2016-08-01T23:33:54Z`
- `id`: integer e.g. `161072`
- `name`: string e.g. `SID Architecture`
- `abbreviated_name`: string - Abbreviated name e.g. `PE`
- `address`: string - Address e.g. `846 Dogglesworth Drive`
- `attachments`: array of object - Attachments
  - `id`: integer - ID e.g. `5324`
  - `url`: string - URL e.g. `http://www.example.com/`
  - `name`: string - Filename e.g. `january_receipt_copy.jpg`
  - `filename`: string - Filename e.g. `january_receipt_copy.jpg`
- `authorized_bidder`: boolean - Authorized bidder status e.g. `true`
- `business_id`: string - Business id e.g. `89cac92d-fbd8-40ec-a1fc-24bbbd035a78`
- `business_phone`: string - Business phone e.g. `(812) 989-9810`
- `business_register`: object - business register e.g. `{"id": 321, "type": "abn", "identifier": "51824753556", "verified_at": "2018-...`
  - `id`: integer e.g. `321`
  - `type`: string - business register type (ABN, EIN) e.g. `abn`
  - `identifier`: string - Identification code e.g. `51824753556`
  - `verified_at`: string(date-time) - Verified at e.g. `2018-06-11T15:56:25Z`
  - `verification_status`: string enum[active, cancelled, does_not_exist, None] - Verification status (active, cancelled, does_not_exist) e.g. `active`
- `city`: string - City e.g. `Jeffersonville`
- `company`: string - Company e.g. `Stock Construction`
- `company_vendor`: boolean - Denotes whether this is the Company's Vendor e.g. `false`
- `country_code`: string - Country code (ISO-3166 Alpha-2 format) e.g. `US`
- `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
- `email_address`: string(email) - Email address e.g. `jane.doe@example.com`
- `fax_number`: string - Fax number e.g. `(812) 989-9810`
- `is_active`: boolean - Active status e.g. `true`
- `is_connected`: boolean - Connected status e.g. `true`
- `labor_union`: string - Labor union e.g. `IWW 872`
- `license_number`: string - License number e.g. `1901XYZ`
- `logo`: string - Logo url e.g. `https://s3.amazonaws.com/pro-core.com/prostore/20160718141208_development_528...`
- `mobile_phone`: string - Mobile phone e.g. `(812) 989-9810`
- `non_union_prevailing_wage`: boolean - Non union prevailing wage status e.g. `false`
- `notes`: string - Notes e.g. `owned by a dog`
- `origin_code`: string - Origin Code e.g. `foobar`
- `origin_data`: string - Origin data e.g. `OD-2398273424`
- `origin_id`: string - Origin ID e.g. `foobar`
- `prequalified`: boolean - Prequalified status e.g. `false`
- `primary_contact`: object - Primary contact e.g. `{"id": 1306796, "first_name": "John", "last_name": "Doe", "business_phone": "...`
  - `id`: integer - ID e.g. `1306796`
  - `first_name`: string - First name e.g. `John`
  - `last_name`: string - Last name e.g. `Doe`
  - `business_phone`: string - Business phone
  - `business_phone_extension`: integer - Business phone extension
  - `fax_number`: string - Fax number
  - `mobile_phone`: string - Mobile phone
  - `email_address`: string(email) - Email e.g. `john.doe@example.com`
  - `created_at`: string(date-time) - Created at e.g. `2016-10-23T21:39:40Z`
  - `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `project_ids`: array of integer - Array of Project IDs
- `state_code`: string - State code (ISO-3166 Alpha-2 format) e.g. `IN`
- `synced_to_erp`: boolean - Synced to ERP e.g. `false`
- `trade_name`: string - Vendor's Trade Name, also known as Doing Business As (DBA). e.g. `Woofer Electric`
- `union_member`: boolean - Union member status e.g. `false`
- `updated_at`: string(date-time) - Updated at e.g. `2016-10-23T21:39:40Z`
- `vendor_group`: object e.g. `{"id": 1, "name": "Otis Elevators"}`
  - `id`: integer e.g. `1`
  - `name`: string (required) e.g. `Otis Elevators`
- `uuid`: string(uuid) - UUID associated with the vendor contact record e.g. `550e8400-e29b-41d4-a716-446655440000`
- `website`: string - Website url e.g. `http://poodleparade.com`
- `zip`: string - Zip code e.g. `47130`

Error responses: 400, 401, 403 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### DELETE /rest/v1.0/projects/{project_id}/vendors/{id}/actions/remove  **[OLDER VERSION - a newer path version exists below/above]**

**Delete from project**
Remove a specified Vendor from a Project.

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `project_id` [path] integer (required) - Unique identifier for the project.
- `id` [path] integer (required) - ID of the vendor

Response 204: No Content (no body)

Error responses: 400, 401, 403, 422 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

