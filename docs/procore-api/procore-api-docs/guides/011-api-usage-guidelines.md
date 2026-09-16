# API Usage Guidelines

_Understand how Procore's REST APIs are designed to be used and what qualifies as permitted usage._

Source: https://developers.procore.com/documentation/api-usage-guidelines

---

## Overview
Procore's REST APIs are designed for **transactional use cases** — creating, reading, updating, and deleting individual records within the Procore platform. These APIs power the day-to-day operations that keep construction projects moving.

This page covers what REST APIs are intended for, what they are not intended for, and best practices for staying in compliance.

If your use case involves AI agents, semantic retrieval, or large-scale analytics, see [Agentic APIs](079-agentic-apis.md) for the intended path.

***
## Permitted Use Cases

REST APIs are built for transactional workflows that complement your app's core integration:

- Creating or updating records such as RFIs, submittals, or daily logs
- Reading project details, user information, or financial data
- Automating workflows triggered by changes in Procore
- Powering embedded apps that surface external data inside Procore

***
## What REST APIs Are Not Designed For

Procore's transactional REST APIs are **not intended for**:

- Large-scale data extraction or bulk export for purposes outside of your app's core integration
- Building datasets for training, fine-tuning, or benchmarking AI/ML models (including LLMs)
- Scraping, harvesting, or creating copies of Procore data
- High-volume data retrieval to power non-complementary analytics or intelligence solutions

These activities can impact platform stability, degrade performance for customers, and violate Procore's [Developer Policy](035-marketplace-policy.md) and [API Terms of Use](https://procore.pactsafe.io/legal.html#contract-hymckkfc9).

***
## Best Practices

To maintain platform performance and stay in compliance:

- **Use APIs for their intended purpose.** REST APIs are built for transactional workflows — use them to create, read, update, and delete records as part of your integration's core functionality.
- **Respect rate limits.** Procore enforces [rate limits](015-rate-limiting.md) to ensure fair access and platform stability for all users.
- **Request only the data you need.** Use filters, pagination, and targeted queries rather than broad data pulls.
- **Store data responsibly.** Only retain Procore data that is necessary for your app's operation. See the [Developer Policy](035-marketplace-policy.md) for data handling requirements.

***
## See Also
- [REST API Reference](https://developers.procore.com/reference/rest/docs/rest-api-overview)
- [Rate Limiting](015-rate-limiting.md)
- [Agentic APIs](079-agentic-apis.md) — for AI agents, semantic retrieval, and advanced analytics use cases
- [Developer Policy](035-marketplace-policy.md)
- [API Terms of Use](https://procore.pactsafe.io/legal.html#contract-hymckkfc9)

***
