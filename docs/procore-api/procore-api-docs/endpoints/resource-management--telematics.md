# Procore API: Telematics (Resource Management)

Source: https://developers.procore.com/reference/rest/ (tool category: Telematics)

Flags: BETA = beta endpoint, may change. DEPRECATED = avoid, use the newer version listed nearby. OLDER VERSION = still live but Procore lists a newer path version for this resource; prefer the newer one for new code.
Path version (v1.0 / v1.1 / v2.0) is part of the URL. Prefer the highest non-deprecated version.

## Resources in this file

- [Telematics](#telematics) - versions 2.1, 2.0

## Telematics

Resource id: `telematics`. Raw spec: `../openapi-raw/telematics.json`. Web: https://developers.procore.com/reference/rest/telematics?version=latest
Product lines: equipment-register

### POST /rest/v2.1/companies/{company_id}/telematics/aemp

**Save AEMP 2.0 telematics data**
Api allow to post AEMP 2.0 telematics data with equipment creation and identifier mapping creation

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The ID of the company.

Request body (application/json) (required):

- `snapshotTime`: string (required) e.g. `2025-01-15T12:00:00Z`
- `Equipment`: array of object (required)
  - `EquipmentHeader`: object (required)
    - `UnitInstallDateTime`: string (required) e.g. `2024-01-01T08:00:00Z`
    - `OEMName`: string (required) e.g. `Manufacturer`
    - `Model`: string (required) e.g. `Model-X`
    - `EquipmentID`: string (required) e.g. `SN123456789012345`
    - `SerialNumber`: string (required) e.g. `SN123456789012345`
    - `PIN`: string (required) e.g. `PIN1234567890123`
  - `AverageLoadFactorLast24`: object
    - `Percent`: number(double) (required) e.g. `75.25`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `Location`: object
    - `Latitude`: number(double) (required) e.g. `-33.86543`
    - `Longitude`: number(double) (required) e.g. `151.203849`
    - `Altitude`: number(double) (required) e.g. `45.5`
    - `AltitudeUnits`: string (required) e.g. `metre`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeActiveRegenerationHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeIdleHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeIdleNonOperatingHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeLoadCount`: object
    - `Count`: integer(int32) (required) e.g. `500`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeOperatingHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativePowerTakeOffHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativePayloadTotals`: object
    - `PayloadUnits`: string (required) e.g. `kilogram`
    - `Payload`: number(double) (required) e.g. `1500.5`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `DEFRemaining`: object
    - `Percent`: number(double) (required) e.g. `85.75`
    - `DEFTankCapacityUnits`: string e.g. `litre`
    - `DEFTankCapacity`: number(double) e.g. `50`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `Distance`: object
    - `OdometerUnits`: string (required) e.g. `kilometre`
    - `Odometer`: number(double) (required) e.g. `500.4`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `EngineStatus`: object
    - `EngineNumber`: string (required) e.g. `EN12345`
    - `Running`: boolean (required) e.g. `true`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `FuelUsed`: object
    - `FuelUnits`: string (required) e.g. `litre`
    - `FuelConsumed`: number(double) (required) e.g. `50`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `FuelUsedLast24`: object
    - `FuelUnits`: string (required) e.g. `litre`
    - `FuelConsumed`: number(double) (required) e.g. `50`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `FuelRemaining`: object
    - `Percent`: number(double) (required) e.g. `50.4`
    - `FuelTankCapacityUnits`: string e.g. `litre`
    - `FuelTankCapacity`: number(double) e.g. `100`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `MaximumSpeedLast24`: object
    - `SpeedUnits`: string (required) e.g. `kilometres per hour`
    - `Speed`: number(double) (required) e.g. `120.5`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`

Response 200: Request processed successfully. (no body)

Error responses: 301, 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/telematics/stats

**Save telematics stats data**
Api allow to post telematic diagnostic data

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The ID of the company.

Request body (application/json) (required):

- `header`: object
  - `resource_id`: string - Unique identifier assigned to resources (equipment/labour/material) in Procore. This field is optional if oem_id is provided. e.g. `01JFZBBYQK7H9Z0RNCTM58WDFY`
  - `resource_type`: string enum[EQUIPMENT, LABOUR, MATERIAL] - Resource type against which you want to send data (equipment/labour/material) in Procore. Default value is equipment e.g. `EQUIPMENT`
  - `oem_name`: string - Equipment Make e.g. `CAT`
  - `oem_id`: string - Unique equipment identifier can be VIN, Serial#. This field is optional if target_id is provided. e.g. `QK7H9Z0RNCTM58SN01`
  - `model`: string - Equipment Model e.g. `306`
  - `pin`: string - OEM ISO Number, can be same as oem_id as per AEMP 2.0 standard. e.g. `QK7H9Z0RNCTM58SN01`
- `location`: object
  - `latitude`: number(double) - Latitude e.g. `45.781`
  - `longitude`: number(double) - Longitude e.g. `-108.503`
  - `altitude`: number(double) - Altitude e.g. `189`
  - `altitude_unit`: string - Altitude unit e.g. `meters`
  - `datetime`: string(date-time) - location date- time (ISO 8601 format) e.g. `2021-08-10T10:00:00Z`
  - `properties`: array of object - Properties are key value pair which is used to capture any additional information
    - `key`: string e.g. `Address`
    - `value`: string e.g. `625`
- `diagnostics`: array of object
  - `key`: string - diagnostic key e.g. `distance`
  - `name`: string - diagnostic name e.g. `Distance`
  - `value`: string - location coordinates format (longitude, latitude) e.g. `1500`
  - `unit`: string - Units are acceptable as per AEMP 2.0(ISO 15143-3 standard) e.g. `km`
  - `datetime`: string(date-time) - diagnostic time (ISO 8601 format) e.g. `2021-08-10T10:00:00Z`
  - `properties`: array of object - Properties are key value pair which is used to capture any additional information
    - `key`: string e.g. `Address`
    - `value`: string e.g. `625`

Response 200: Request processed successfully. (no body)

Error responses: 301, 400, 401, 403, 404, 422, 500, default (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

### POST /rest/v2.0/companies/{company_id}/telematics/aemp  **[OLDER VERSION - a newer path version exists below/above]**

**Save AEMP 2.0 telematics data**
Api allow to post AEMP 2.0 telematics data

Parameters:

- `Procore-Company-Id` [header] integer (required) - Unique company identifier associated with the Procore User Account.
- `company_id` [path] string (required) - The ID of the company.

Request body (application/json) (required):

- `snapshotTime`: string (required) e.g. `2025-01-15T12:00:00Z`
- `Equipment`: array of object (required)
  - `EquipmentHeader`: object (required)
    - `UnitInstallDateTime`: string (required) e.g. `2024-01-01T08:00:00Z`
    - `OEMName`: string (required) e.g. `Manufacturer`
    - `Model`: string (required) e.g. `Model-X`
    - `EquipmentID`: string (required) e.g. `SN123456789012345`
    - `SerialNumber`: string (required) e.g. `SN123456789012345`
    - `PIN`: string (required) e.g. `PIN1234567890123`
  - `AverageLoadFactorLast24`: object
    - `Percent`: number(double) (required) e.g. `75.25`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `Location`: object
    - `Latitude`: number(double) (required) e.g. `-33.86543`
    - `Longitude`: number(double) (required) e.g. `151.203849`
    - `Altitude`: number(double) (required) e.g. `45.5`
    - `AltitudeUnits`: string (required) e.g. `metre`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeActiveRegenerationHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeIdleHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeIdleNonOperatingHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeLoadCount`: object
    - `Count`: integer(int32) (required) e.g. `500`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativeOperatingHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativePowerTakeOffHours`: object
    - `Hour`: number(double) (required) e.g. `12`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `CumulativePayloadTotals`: object
    - `PayloadUnits`: string (required) e.g. `kilogram`
    - `Payload`: number(double) (required) e.g. `1500.5`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `DEFRemaining`: object
    - `Percent`: number(double) (required) e.g. `85.75`
    - `DEFTankCapacityUnits`: string e.g. `litre`
    - `DEFTankCapacity`: number(double) e.g. `50`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `Distance`: object
    - `OdometerUnits`: string (required) e.g. `kilometre`
    - `Odometer`: number(double) (required) e.g. `500.4`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `EngineStatus`: object
    - `EngineNumber`: string (required) e.g. `EN12345`
    - `Running`: boolean (required) e.g. `true`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `FuelUsed`: object
    - `FuelUnits`: string (required) e.g. `litre`
    - `FuelConsumed`: number(double) (required) e.g. `50`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `FuelUsedLast24`: object
    - `FuelUnits`: string (required) e.g. `litre`
    - `FuelConsumed`: number(double) (required) e.g. `50`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `FuelRemaining`: object
    - `Percent`: number(double) (required) e.g. `50.4`
    - `FuelTankCapacityUnits`: string e.g. `litre`
    - `FuelTankCapacity`: number(double) e.g. `100`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`
  - `MaximumSpeedLast24`: object
    - `SpeedUnits`: string (required) e.g. `kilometres per hour`
    - `Speed`: number(double) (required) e.g. `120.5`
    - `datetime`: string (required) e.g. `2025-01-15T12:00:00Z`

Response 200: Request processed successfully. (no body)

Error responses: 301, 400, 401, 403, 404, 422, 500 (standard Procore error body: `{"errors": ...}` or `{"error": {code, message, details}}`)

