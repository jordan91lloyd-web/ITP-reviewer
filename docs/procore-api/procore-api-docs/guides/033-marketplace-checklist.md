# Marketplace Approval Checklist

_Learn the app validation process, key review items, and how to submit your app for publication._

Source: https://developers.procore.com/documentation/marketplace-checklist

---

## Overview
Before submitting your app for approval, review this Marketplace Approval Checklist to ensure your integration meets Procore's standards. By this point in the [Technology Partner journey](030-procore-partner-overview.md), you've been approved as a partner, passed Technical Feasibility, certified your app, and signed the Partner Agreement — so this checklist focuses on the final step: confirming those prerequisites and preparing your listing for submission. It shows you where you are and what's left.

***
<details>
<summary class="collapseListH2">Step 1: Confirm You Are a Procore Partner</summary>
<p>
    To list on the Marketplace, you must be a <b>full Procore Technology Partner</b> — meaning you have signed the <b>Procore Framework Agreement</b> and <b>Technology Partner Addendum</b> (Step 4 of the partner journey). If you completed that step, you are eligible to list.
    

    If you're unsure of your partner status, contact [techpartners@procore.com](mailto:techpartners@procore.com). To start the partner journey, see the [Technology Partner Overview](030-procore-partner-overview.md).
</p>
</details>

***
<details>
<summary class="collapseListH2">Step 2: Validate with a Customer (Recommended)</summary>
<p>
    We <b>strongly encourage</b> validating your app with at least one beta or active customer before listing — most partners do this during certification, using their temporary-status production access. Real-world use validates onboarding, functionality, and performance, but is not required to submit.
    

    Customer validation builds confidence with both the Marketplace review team and future users.
</p>
</details>

***
<details>
<summary class="collapseListH2">Step 3: Confirm Production Readiness</summary>
<p>
    Your app must have passed the <b>Certification Assessment</b> — Procore's production-readiness review completed during the Build, Test & Certify step of the partner journey. If your app is certified and running in production, you've cleared this step; if not, complete certification before listing.
</p>
<p>
    Certification confirmed your app handles:
</p>
<ul>
    <li>Installation and configuration workflows (both in your service and in Procore)</li>
    <li>The onboarding experience from a customer’s perspective</li>
    <li>Core feature functionality across use cases</li>
    <li>Support for multi-company Procore accounts (if applicable)</li>
</ul>
<p>
    It also confirmed correct handling of:
</p>
<ul>
    <li>OAuth authentication correctly</li>
    <li>Procore’s rate limits without performance degradation</li>
</ul>
<p>
    Before submitting your listing, double-check your production configuration:
</p>
<h4>General Requirements:</h4>
<ul>
    <li>Post Installation Notes updated in the <b>Configuration Builder</b></li>
    <li>App promoted to production via the [Procore Developer Portal](https://developers.procore.com/developers)</li>
</ul>
<h4>For Embedded Apps:</h4>
<ul>
    <li>Correct cross-origin security settings for rendering in Procore</li>
</ul>
<h4>For OAuth-Based Apps:</h4>
<ul>
    <li>Base URLs: token management to <code>https://login.procore.com</code>, API calls to <code>https://api.procore.com</code></li>
    <li>Production Client ID and Secret in use</li>
    <li>Correct callback URL and Procore-Company-Id header handling</li>
    <li>Least privilege applied to access scopes</li>
</ul>

</details>

***
<details>
<summary class="collapseListH2">Step 4: Complete & Verify Your Marketplace Listing</summary>
<p>
    With full partner status, the <b>Marketplace Listing</b> section is automatically available in your app in the Developer Portal — there is no separate enablement step. 
    

    Complete your listing, then review the whole thing for accuracy before submitting.
    

    Make sure it includes:
    <ul>
        <li>Accurate feature descriptions and functionality highlights</li>
        <li>Clear onboarding instructions and any customer-side setup requirements</li>
        <li>Correct links, permissions, and a clear value proposition</li>
        <li>Accessible, actionable instructions if you offer a free trial</li>
    </ul>
    Be transparent about what your app does and how it benefits customers. Refer to the [Marketplace Listing Guidelines](034-marketplace-listing-guidelines.md) for formatting and submission details.
</p>
</details>

***
<details>
<summary class="collapseListH2">Step 5: Submit Your App</summary>
<p>
    When all steps are complete, submit your app via the <b>Marketplace Listing</b> tab in the [Developer Portal](https://developers.procore.com/developers). If you don't see the Marketplace Listing tab, confirm your partner status — the tab is available once you're a full partner.
    

    The Marketplace Team will review your app against the [Marketplace Requirements](031-marketplace-requirements.md).
</p>
</details>

***

## Additional Considerations
### Support Documentation
You are responsible for supporting your integration. Procore does not provide end-user support for third-party Marketplace apps.

Your support setup must include:
- Up-to-date content
- A public documentation link
- A getting started guide
- A clear explanation of how your app works with Procore

### Supporting the Monthly Sandbox
Many customers test integrations using the <b>Monthly Sandbox</b>, which uses different base URLs:
- Token management: <code>https://login-sandbox-monthly.procore.com/</code>
- API calls: <code>https://api-monthly.procore.com/</code>

To support this environment:
- Provide your App Version Key to the customer to perform a [custom app install](https://support.procore.com/products/online/user-guide/company-level/admin/tutorials/install-a-custom-app)
- Adjust any hard-coded URLs accordingly

For more details about the Monthly Sandbox, including the refresh schedule and additional guidelines, refer to the [Sandbox Environments](006-development-environments.md).

***
## See Also
- [Technology Partner Overview](030-procore-partner-overview.md)
- [Build & Prepare Your App](031-marketplace-requirements.md)
- [Marketplace Listing Guidelines](034-marketplace-listing-guidelines.md)
- [Manage & Improve Your Marketplace App](032-update-your-marketplace-app.md)

***
