# Working with the Documents Tool

Source: https://developers.procore.com/documentation/tutorial-documents

---

## Overview

Procore's powerful Documents tool provides robust and sophisticated document management and archiving for mission-critical project documentation.
The Documents tool resources are accessible through the Procore API via the [Company Folders and Files](https://developers.procore.com/reference/rest/v1/company-folders-and-files) and [Project Folders and Files](https://developers.procore.com/reference/rest/v1/project-folders-and-files) endpoints.

## Things to Consider

- Learn about [Company Level Documents](https://support.procore.com/products/online/user-guide/company-level/documents) and [Project Level Documents](https://support.procore.com/products/online/user-guide/project-level/documents).
- [Register for a Developer Account](https://developers.procore.com/signup) through the Procore Developer Portal.
- Gain an understanding of [OAuth 2.0 Authentication](014-oauth-choose-grant-type.md) and view our [API Authentication](064-oauth-endpoints.md) endpoints.

## Example Workflow for Documents Tool Integrations

> **Mind the rate limit when fetching recursively.** Recursively walking every folder and file can burn through Procore's API quota quickly. See [Rate Limiting](015-rate-limiting.md).

This example lists the sequence of API calls for retrieving all project files.

- [List Companies](https://developers.procore.com/reference/rest/v1/companies#list-companies) - GET /rest/v1.0/companies
- [List Projects](https://developers.procore.com/reference/rest/v1/projects#list-projects) - GET /rest/v1.0/projects
- [List Project Folders and Files](https://developers.procore.com/reference/rest/v1/project-folders-and-files#list-project-folders-and-files) - GET /rest/v1.0/folders
- [Show Project Folder](https://developers.procore.com/reference/rest/v1/project-folders-and-files#show-project-folder) - GET /rest/v1.0/folders/{id}

Recursively fetch folders and files by calling the [Show Project Folder](https://developers.procore.com/reference/rest/v1/project-folders-and-files#show-project-folder) endpoint on each previously returned folder.
Repeat this step until all folders and files and been retrieved.

Additional tips for working with Documents tool integrations:

- To retrieve all Company files, use the [Company Folders and Files](https://developers.procore.com/reference/rest/v1/company-folders-and-files) endpoints.
- Use the Procore API to directly upload content to a storage service to streamline uploads and reduce upload latency. See [Working with Direct File Uploads](048-tutorial-uploads.md).
- Usage of Procore's API is subject to rate limits — 3,600 requests per hour, resetting every hour. See [Rate Limiting](015-rate-limiting.md) to learn how to reduce the possibility of exceeding the limit. You can also use [Webhooks](016-webhooks.md) to reduce the risk of exceeding rate limit caps.
- Refer to the [User Permissions](https://support.procore.com/references/user-permissions-matrix-web#Documents-CL) matrix for information on Documents tool permissions.
- Have Procore API questions? Contact our API Support team at <apisupport@procore.com>.

## See Also

- [Working with File Attachments and Image Uploads](047-attachments.md)
- [Working with Direct File Uploads](048-tutorial-uploads.md)
- [Working with Secure File Access](050-secure-file-access-tips.md)
- [Working with Drawings](051-tutorial-drawings.md)
- [Working with Direct Drawing Uploads](052-tutorial-direct-drawing-uploads.md)
