# Building Data Connector Applications

_Learn how to build a data connector app using either User Level Authentication or Service Account Authentication._

Source: https://developers.procore.com/documentation/building-data-connection-apps

---

## Overview

Data connector apps enable secure data exchange between Procore and external platforms. Procore supports two authentication methods for data connector apps:

- **User Level Authentication** — Uses OAuth 2.0 Authorization Code Flow to act on behalf of a specific user. API responses are limited by that user's permissions in Procore.
- **Service Account Authentication** — Uses a Developer Managed Service Account (DMSA) and the OAuth 2.0 Client Credentials Flow for automated, system-to-system communication without requiring user login.

Because data connector apps work entirely through the Procore REST API, review the [API Usage Guidelines](011-api-usage-guidelines.md) — including rate limits and permitted usage — before you build. To get started, first [create a Developer Portal account and app](018-building-apps-create-new.md).

***
## Choose an Authentication Method

| | User Level Authentication | Service Account Authentication |
| --- | --- | --- |
| **OAuth Flow** | Authorization Code | Client Credentials |
| **Acts as** | A specific Procore user | A generic service account user |
| **Permissions** | Inherited from the logged-in user | Defined by the developer via Permissions Builder |
| **Best for** | Apps that need user context | Server-to-server data sync |

For help choosing, see [Choosing an OAuth 2.0 Grant Type](014-oauth-choose-grant-type.md).

***
## Add a Data Connector Component

### User Level Authentication

1. In your Developer Portal app, expand the **Data Connector Components** section.
2. Click **Add Components**.
3. Select **User Level Authentication**.
   - This option uses OAuth 2.0 Authorization Code Flow to act on behalf of a user.
4. Click **Save Component**.

### Service Account Authentication

1. In your Developer Portal app, expand the **Data Connector Components** section.
2. Click **Add Components**.
3. Select **Service Account Authentication** and **User Level Authentication**.
   - This option uses a Developer Managed Service Account (DMSA) and the OAuth 2.0 Client Credentials Flow for system-level access.
4. Use the **Permissions Builder** to define the required company- and project-level tool permissions your app needs.
   - Refer to the [User Permissions Matrix](https://support.procore.com/references/user-permissions-matrix-web) for more details.
5. Click **Save Component**.
<!-- ![Permission Builder](https://developers.procore.com/documentation/assets/guides/form-based-manifest-dmsa-perms-builder.png) -->

***
<a name="define-setup-instructions"></a>

***
## Create the Initial App Manifest Version

After configuring your component, you're ready to save your first app version.

1. In the Configuration Builder, click **Create Version**.
2. Enter a semantic version number (e.g., `0.1.0`).  
   - For details, see [Managing App Versions & Update Notifications](023-building-apps-promote-manifest.md).
3. Click **Create**.

The version will be saved with the status **Ready for Testing**. As you continue development, click **Save Version** to capture changes.

***
## Test and Validate in the Developer Sandbox
Test and validate each version of your app in your Developer Sandbox before releasing it to production.
For details on setting up your sandbox, see the [Quick Start Guide](003-quick-start-guide.md).

***
## Promote the Updated Sandbox Manifest to Production
Once you're satisfied with testing, promote your sandbox version to production. See [Managing App Versions & Update Notifications](023-building-apps-promote-manifest.md) to learn how.

***
## Next Steps
- [API Usage Guidelines](011-api-usage-guidelines.md) — rate limits, permitted usage, and when to use REST vs. Agentic APIs.
- [Choosing an OAuth 2.0 Grant Type](014-oauth-choose-grant-type.md) — pick User Level vs. Service Account authentication.
- [Developer Managed Service Accounts (DMSA)](017-developer-managed-service-accounts.md) — set up Service Account authentication.
