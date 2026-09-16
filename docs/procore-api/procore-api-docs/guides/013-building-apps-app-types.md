# Choose an App Type

_Choose the right app type for your integration._

Source: https://developers.procore.com/documentation/building-apps-app-types

---

## Overview

Procore apps are built from two families of capabilities — **Data Connector** and **Embedded** — and you can combine them in a single app. Use this page to choose the best fit for your workflow and users.

Authentication is chosen separately and applies across families — see [Choosing an OAuth 2.0 Grant Type](014-oauth-choose-grant-type.md).

***
## Data Connector Apps

**What it is**  
Move data between Procore and other systems (for example, accounting, ERP, document management, or equipment tracking).

**When to use**
- You need to sync or transform data between Procore and another system.
- Most work happens outside the Procore UI.
- Jobs run on a schedule or respond to events via webhooks.

**How it works**
- Create, update, and read Procore resources with API calls.
- Some endpoints support **Sync** actions for batch create/update. See [Using Sync Actions](072-using-sync-actions.md).
- Use **Webhooks** to receive near real‑time change events. See [Introduction to Webhooks](016-webhooks.md).

![Data Connector Architecture](https://developers.procore.com/documentation/assets/guides/data-connection-diag.png)

See also: [Building Data Connector Apps](019-building-data-connection-apps.md).

***
## Embedded Apps

**What it is**  
Run your app inside Procore’s web UI to keep users in context and reduce app switching.

**Key details**
- The app **manifest** defines behavior and settings.
- Use URL parameter interpolation to pass values from install configuration or user input.

### Fullscreen Apps
Fullscreen apps occupy the main content area. Users launch them from the **Apps** menu.

### Side Panel Apps
A side panel app renders in a fixed 400‑px panel on the right side of the Procore UI. Because side panel apps are installed for specific tools, you can build solutions tailored to a tool or workflow. Users launch side panel apps from the dock on the right edge of the interface.

See [Building Embedded Applications](020-building-embedded-apps.md) to build either placement.

### Optional: Example Images

Use these examples to understand placement and layout.

<details>
<summary class="collapseListTierOne">Fullscreen Example</summary>
<p>Here is an example of the full screen [Procore Integration for Google Sheets™](https://marketplace.procore.com/apps/procore-integration-for-google-sheets) embedded application running in Procore.</p>
[image: https://developers.procore.com/documentation/assets/guides/google-sheets-example.png]
</details>

***
<details>
<summary class="collapseListTierOne">Side Panel Example</summary>
<p>Here is an example of a side panel application (contextual help) running within the Procore web UI.</p>
[image: https://developers.procore.com/documentation/assets/guides/side-panel-example.png]
</details>
***
