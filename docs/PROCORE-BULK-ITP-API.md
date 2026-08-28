# Procore API — bulk ITP creation and Action Plan linking

Research done 28 Aug 2026 against developers.procore.com (latest) plus a network trace of Procore's own Action Plans UI on the 15-17 William Street project. Endpoints below were read off the docs, not recalled. Confirm again before coding — Procore changes these.

## The question this answers

Can Holdpoint bulk-create ITP inspections from a template and link them to an Action Plan item, or is any of it UI-only?

Answer: both halves are supported by the public REST API.

## 1. Create an inspection from a template

```
POST /rest/v1.1/projects/{project_id}/checklist/lists
```

Body:

```json
{
  "list_template_id": 12,
  "list": {
    "location_id": 1,
    "inspection_date": "2019-10-31",
    "inspection_type_id": 34,
    "inspector_ids": [12, 13],
    "responsible_contractor_id": 123,
    "trade_id": 123,
    "due_at": "2019-08-18T23:36:30Z",
    "identifier": "W-123",
    "status": "open"
  }
}
```

- `list_template_id` is required. It is the Checklist List Template (Inspection Template) the inspection is created from.
- There is **no name field**. The inspection inherits the template's name. This is why the register groups them under one heading, and why the template name must never be edited mid-run.
- `location_id` is what makes each ITP land against its apartment.

## 2. Items cannot be added after creation

On a live inspection the API offers:

| Operation | Endpoint |
|-----------|----------|
| Read item | `GET /rest/v1.0/checklist/lists/{list_id}/items/{id}` |
| Update item | `PATCH /rest/v1.0/checklist/lists/{list_id}/items/{id}` |
| Answer item | `POST /rest/v1.0/projects/{project_id}/checklist/items/{item_id}/item_response` |
| Attach to item | `POST /rest/v1.0/checklist/lists/{list_id}/items/{item_id}/item_attachments` |

There is **no endpoint to add a new item to an existing inspection**. The item structure has to be correct in the template at the moment of creation.

Templates themselves support create, update and delete:

```
GET    /rest/v1.1/projects/{project_id}/checklist/list_templates
POST   /rest/v1.0/projects/{project_id}/checklist/list_templates
PATCH  /rest/v1.0/projects/{project_id}/checklist/list_templates/{id}
DELETE /rest/v1.0/projects/{project_id}/checklist/list_templates/{id}
POST   /rest/v1.0/projects/{project_id}/checklist/list_templates/create_from_company_template
```

**Not confirmed:** whether individual items can be added to or removed from a project template via the API. Only needed if the template customisation is to be automated too. Check before relying on it.

## 3. Linking to an Action Plan item

Two different mechanisms. Do not confuse them.

### References — supporting documents only

```
POST /rest/v1.0/projects/{project_id}/action_plans/plan_references
POST /rest/v1.0/projects/{project_id}/action_plans/plan_references/bulk_create
```

`type` allowed values: `attachment`, `drawing`, `specification_section`, `submittal_log`, `document`, `document_management_document_reference`, `generic_tool_item`, `form`, `meeting`, `observation_item`, `image`.

**No inspection or checklist type.** References are for attaching supporting docs, not for the record.

### Test record requests — this is the ITP link

```
POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests
```

The payload object carries `checklist_template_id`. This is what ties an Action Plan item to an inspection template — the "record" in the Procore UI.

Confirmed present in the docs and confirmed in use: Procore's own Action Plans UI calls
`GET /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests?filters[plan_id]={plan_id}&per_page=5000`
when a plan loads.

`plan_items` also exposes `filters[plan_test_record_request_id]` and `filters[record_checklist_template_id]`, which confirms the same relationship from the other side.

**Not confirmed:** whether the record binds to a specific inspection instance or only to the template, with Procore matching inspections to it afterwards. This matters for whether each of 17 ITPs can be tied to its own plan item. Read the full POST body spec before designing.

## 4. Endpoints already in use by Holdpoint

For reference, the Action Plans converter already POSTs to:

```
POST /rest/v1.0/projects/{project_id}/action_plans/plans
POST /rest/v1.0/projects/{project_id}/action_plans/plan_sections
POST /rest/v1.0/projects/{project_id}/action_plans/plan_items
```

## 5. Deprecations to watch

As at Aug 2026 Procore deprecated the v1.0 Action Plan Item list and update endpoints in favour of v2.0:

```
GET   /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plan_items
PATCH /rest/v2.0/companies/{company_id}/projects/{project_id}/action_plans/plan_items/{id}
```

Company-custom item statuses only come back in full on v2. Worth moving to v2 for anything new.

## Standing rules that apply here

- `company_id` as both query param and `Procore-Company-Id` header on project endpoints.
- Never trust a 2xx as proof a write landed. Read it back and count. This bit us on Action Plan attachments.
