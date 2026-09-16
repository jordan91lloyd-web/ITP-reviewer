# Manage Your Marketplace App

_Learn how to update your app, track usage metrics, and optimize performance on the Procore Marketplace._

Source: https://developers.procore.com/documentation/update-your-marketplace-app

---

## Overview
Launching your app on the Procore Marketplace is just the beginning, your journey evolves from there. Maintaining a high-quality app and continuously improving it based on platform updates, performance insights, and customer feedback is essential for long-term success.

This guide covers how to manage updates to your app, view key metrics, and implement best practices to keep your app relevant and impactful.

***

## Update Your App
You can update your app’s functionality, features, or Marketplace Listing at any time through the [Procore Developer Portal](https://developers.procore.com/developers). Note that some changes may require approval from the Marketplace team.

If you're unable to access the app in the Developer Portal, see [Managing App Collaborators](028-building-apps-manage-collabs.md) to check your role or request access.

<details>
<summary class="collapseListTierOne">Managing Your Marketplace Listing</summary>
    Your Marketplace Listing serves as the public-facing introduction to your app. You can update it at any time through the [Procore Developer Portal](https://developers.procore.com/developers) to reflect the latest branding, features, and value proposition.
  

  <p><b>Access Requirements</b></p>
  To make edits, you must:
  <ul>
    <li>Have access to the app in the Developer Portal</li>
    <li>Be assigned the Admin or Owner role for the app</li>
  </ul>

  If you don’t see the app after logging in, check your role or request access by following the steps in [Managing App Collaborators](028-building-apps-manage-collabs.md).
  

  <p><b>Best Practices</b></p>
  A well-crafted listing helps attract the right audience and improve discoverability. For guidance on optimizing your listing content, see [Marketplace Listing Guidelines](034-marketplace-listing-guidelines.md).
</details>

***
<details>
<summary class="collapseListTierOne">Managing Your App Functionality</summary>
<p>
You can update your app’s technical configuration through the Developer Portal. This includes enhancing functionality, updating embedded experiences, and configuring tool permissions.

Here’s how to manage common updates:

<p><b>Add or Update API Routes</b></p>
To expand your app’s capabilities, integrate additional Procore API routes. Use the [REST API Overview](https://developers.procore.com/reference/rest/docs/rest-api-overview) to identify endpoints for reading, writing, or updating data. If your app uses <b>Service Account Authentication</b>, be sure to update tool permissions accordingly.

<p><b>Update Embedded or Iframe Properties</b></p>
To modify the embedded experience (e.g., iframe URL, added views, interpolation), follow these steps:
<ol> 
  <li>Open your app in the Developer Portal.</li>
  <li>Click the pencil icon next to the embedded component.</li>
  <li>Update the required fields (URL, views, parameters).</li>
  <li>Click <b>Save Component</b>, then <b>Save Version</b>.</li>
  <li>Test via [custom app installation](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app).</li>
  <li>When ready, click <b>Promote Version</b>, then <b>Submit for Review</b>.</li>
</ol>

<p><b>Update App Tool Permissions</b></p>
Tool access varies depending on your authentication type:
<ul>
  <li><b>User-Level Authentication:</b>
    <ul>
      <li>Permissions are tied to the end user and cannot be edited directly. Be sure to reflect any changes in your Marketplace Listing.</li>
    </ul>
  </li>
  <li><b>Service Account Authentication:</b>

    <ol>
      <li>In the Developer Portal, select your app and click <b>Add Components</b> or <b>Edit Permissions</b>.</li>
      <li>Update tool permissions as needed.</li>
      <li>Click <b>Save Component</b> and then <b>Save Version</b>.</li>
      <li>Test via custom app installation.</li>
      <li>Click <b>Promote Version</b>, then <b>Submit for Review</b>.</li>
    </ol>
  </li>
</ul>
If your app uses Service Account Authentication, follow the principle of least privilege: request access only to the tools essential to your app’s functionality.
</p>
</details>

 ***

<details>
<summary class="collapseListTierOne">Managing Your App Metrics</summary>
<p>
Understanding how your app is performing on the Procore Marketplace is key to making informed product decisions and improving user experience. The Developer Portal provides visibility into usage metrics without exposing any personally identifiable information (e.g., names, emails).

<p><b>Where to Find Metrics</b></p>
<p>To access your app's performance data:</p>
<ol>
  <li>Log in to the [Developer Portal](https://developers.procore.com/developers)</li>
  <li>Select your app</li>
  <li>Click the <b>Metrics</b> tab</li>
</ol>

<p><b>What You Can Track</b></p>
Key metrics include:
<ul>
  <li><b>Marketplace Views:</b> Total and time-filtered views of your app's public listing</li>
  <li><b>Installations:</b> Number of company accounts that installed your app, along with install dates</li>
  <li><b>Uninstalls:</b> Number of companies that removed your app, including when it occurred</li>
</ul>
</p>
</details>
***

## Market and Grow Your App
Publishing your app on the Procore Marketplace is just the first step toward scaling adoption and maximizing its impact. This section focuses on the different aspects of growing and maintaining your app, as well as some of the self-service marketing activities.

### Leverage Procore’s Marketing Guides
To support your go-to-market and growth strategies, Procore provides a suite of self-service partner guides that offer actionable tactics and recommendations. Rather than duplicating this guidance, we encourage you to explore the full details in each guide below:
- <b>[Partner How-To: Promote My Application](https://www.procore.com/cdn/downloads/partner-how-to-promote-my-application)</b>: Tips for creating a compelling Marketplace listing, promoting your app across digital channels, and aligning with Procore’s marketing resources.
- <b>[Partner How-To: Increase Integration Adoption & Usage](https://www.procore.com/cdn/downloads/partner-how-to-increase-integration-adoption-usage)</b>: Strategies for training your teams, enabling customer success, and building long-term usage momentum.
- <b>[Partner How-To: Elevate My Integration](https://www.procore.com/cdn/downloads/partner-how-to-elevate-my-integration)</b>: Best practices for enhancing the technical quality, reliability, and user experience of your app.

These resources are designed to help you grow efficiently and successfully within the Procore ecosystem. For questions, contact [techpartners@procore.com](mailto:techpartners@procore.com).

### Best Practices for Growth & Maintenance
Proactively managing your app ensures long-term success and sustained impact.

1. **Regularly Monitor Metrics**

Track engagement trends and installation patterns to stay ahead of changes.

2. **Collect and Act on User Feedback**

Gather insights through support channels, or direct outreach.

3. **Keep Your App Aligned with Platform Changes**

Stay current with Procore API updates and deprecation notices to ensure compatibility.

4. **Communicate Updates to Users**

Release notes, listing updates, and in-app messaging help keep users informed.

5. **Provide Exceptional Support**

Fast, helpful support builds trust and improves customer retention.

<!-- 
***
## Procore API Updates and Deprecation
Stay informed about Procore API changes through Developer Portal announcements, newsletters, and release documentation. 

- Update your app proactively to maintain compatibility.
- Review deprecation notices carefully to avoid service interruptions.
- Take advantage of new platform capabilities as they become available.

 -->

***
## See Also
- [Build & Prepare Your App](031-marketplace-requirements.md)
- [Marketplace Listing Guidelines](034-marketplace-listing-guidelines.md)
- [Marketplace Approval Checklist](033-marketplace-checklist.md)
- [Managing App Collaboration](028-building-apps-manage-collabs.md)

***
