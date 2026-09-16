# API Call Activity Report

_Generate a 30-day CSV of your app's production API calls — endpoints, status codes, and timestamps — to investigate observations, troubleshoot issues, and track usage trends._

Source: https://developers.procore.com/documentation/api-activity-export

---

## Overview

The **API Call Activity Report** is a CSV export of the last 30 days of your app's production API activity. It is the primary investigation tool for any observation flagged on the [Integration Health](024-integration-health.md) tab — when a status pill turns red or yellow, this CSV is how you find the offending endpoint.

The report is available for **all apps** in the Procore Developer Portal, including both Custom Apps and Marketplace Apps.

***
## Why the Report Matters

Use the API Call Activity Report to:

- **Investigate Integration Health observations** — filter by status code (401/403/404/429) or by endpoint to identify which calls are triggering a Needs Attention or Review Recommended status.
- **Optimize efficiency** — see which endpoints are called most often and reduce unnecessary calls.
- **Troubleshoot issues faster** — identify failed requests and when they occurred.
- **Validate expected behavior** — confirm your app is making the right calls at the right time.
- **Track usage trends** — monitor daily API activity to spot anomalies or spikes.

***
## How to Generate the Report

1. Log in to the [Procore Developer Portal](https://developers.procore.com/developers).
2. Open **My Apps** and select the app you want to inspect.
3. In the App Management sidebar, click **Integration Health**.
4. Locate the **API Call Activity Report** card near the top of the page and click **Download CSV Report**.

The CSV covers the last 30 days of your app's **production** API calls.

***
## What's in the CSV

| Column | Description |
|--------|-------------|
| Date | The date of activity |
| Response Code | The HTTP status code returned for the call (e.g., 200, 403, 404, 429) |
| HTTP Method | The HTTP method used (GET, POST, PUT, DELETE, etc.) |
| Normalized Route | The standardized API route (e.g., `/v1.0/projects/:project_id/observations`) |
| Count | The total number of calls for that route, method, and status on that day |

***
## Tips for Using This Data

- **Investigating a Needs Attention observation?** Filter by the relevant Response Code (401/403/404/429) and sort by Count descending — the top rows are usually the offenders.
- **Spot errors quickly** — filter by failed calls to identify problem endpoints.
- **Improve performance** — reduce unnecessary calls to high-traffic endpoints.
- **Monitor adoption** — see if your most important features are being used.
- **Detect unusual patterns** — look for spikes or drops in usage that may indicate issues.

By regularly reviewing your app's API activity, you can maintain reliability, improve user experience, and ensure efficient API usage. See [Integration Health](024-integration-health.md) for the recommended monitoring cadence.

***
## See Also

- [Integration Health](024-integration-health.md)
- [Error Code Reference](073-error-reference.md)
- [Troubleshooting](026-troubleshooting.md)
- [API Usage Guidelines](011-api-usage-guidelines.md)
