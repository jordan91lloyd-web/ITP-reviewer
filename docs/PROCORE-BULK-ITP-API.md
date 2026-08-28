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

### Test record requests and test records — this is the ITP link

Confirmed 28 Aug 2026 by reading live data from the 15-17 William Street "4: Internal Inspection Tracker" plan (id 598134325785409). Payload shapes below are real responses, not doc examples.

Linking an ITP to a tracker row is **two records, not one**.

**Step A — the request.** Says "an inspection of this template is required on this plan item."

```
POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests
```

Live response shape:

```json
{
  "id": 598134328144035,
  "plan_id": 598134325785409,
  "plan_item_id": 598134331193213,
  "payload": { "checklist_template_id": 598134329008618 },
  "plan_test_records_count": 1,
  "type": "checklist",
  "type_id": 1
}
```

Note the payload carries only the **template** id. The request does not name a specific inspection.

**Step B — the record.** Says "this specific inspection satisfies that request."

```
POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_records
```

Live response shape:

```json
{
  "id": 598134327444082,
  "plan_id": 598134325785409,
  "plan_item_id": 598134331193213,
  "plan_test_record_request_id": 598134328144035,
  "payload": {
    "checklist_id": 598134330940428,
    "checklist_template_id": 598134329008618
  },
  "type": "checklist"
}
```

`checklist_id` is the individual inspection. This is the link that was the open question.

Both also support GET (list and show) and DELETE.

**Confirmed by observation:** two different plan items on the William St plan each carry their own request pointing at the *same* `checklist_template_id` (598134329008618). So one template can serve many plan items, each with its own request and its own record. That is exactly the 17-apartments-one-template case.

## 3a. The full recipe per apartment

For each apartment, given a project, a customised template, a location and a target plan item:

1. `POST /rest/v1.1/projects/{project_id}/checklist/lists`
   with `list_template_id` and `list.location_id` → returns the new inspection, keep its `id`
2. `POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_record_requests`
   with `plan_item_id` and payload `{ checklist_template_id }` → keep its `id`
   (skip if a request already exists on that plan item for that template — check the GET first)
3. `POST /rest/v1.0/projects/{project_id}/action_plans/plan_test_records`
   with `plan_item_id`, `plan_test_record_request_id`, and payload `{ checklist_id, checklist_template_id }`

Then read it all back and verify. Never trust the 2xx.

**Still not confirmed:** the exact request body wrappers for steps 2 and 3. The response shapes above are certain; whether the POST body wants a `plan_test_record_request` / `plan_test_record` wrapper object (as `plan_reference` and `plan_item` do elsewhere) needs reading off the docs page before coding. Assume it does, verify first.

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

## 6. Fleek's template setup (confirmed with Jordy 28 Aug 2026)

**Two levels of template, and only one of them gets edited.**

- **Company templates** — 84 of them as at Aug 2026, ITP-000 through ITP-066 plus safety and site forms. Most are assigned to all 19 projects. **These are never edited.** Treat them as read-only masters.
- **Project templates** — the per-project copy. This is what gets customised: the project-specific wet areas on ITP-011, the elevations on ITP-014, and so on. **This is the template inspections must be created from.**

Creating an inspection from the company template instead of the project template would produce ITPs without the project-specific areas. Use the project-level `list_template_id`.

Relevant endpoints:

```
GET  /rest/v1.1/projects/{project_id}/checklist/list_templates
POST /rest/v1.0/projects/{project_id}/checklist/list_templates/create_from_company_template
```

**Not confirmed:** whether the `checklist_template_id` in a test record request refers to the project template or the company template. Check against live data before coding step 2 of the recipe.

## 7. Never match templates by name

Template names were entered by hand and the formatting has drifted:

- `ITP- 011 Internal Waterproofing` — space after the dash
- `ITP - 023 Mechanical Pre Sheet check` — spaces both sides
- `ITP- 066 - Stone Installation` — trailing description after the number

There are also two templates named `Close-out ITPs`, and two numbered 066 (`Car Stackker` and `Stone Installation`).

**Rule: always select a template by id, never by parsing or matching its name.** The UI should present a list of project templates and pass the chosen id through. Any name-matching logic will break on the spacing variants and on the duplicate numbers.

The intended convention is `ITP - xxx Name`, but do not rely on it.

## 8. Project locations

```
GET /rest/v1.0/projects/{project_id}/locations?per_page=100
```

Confirmed 28 Aug 2026 against the Bondi Rd / Wellington St project (id 598134326053879).

Locations are a **tree**. Each row:

```json
{
  "id": 598134331267124,
  "name": "A Ground Floor>Wellington>G. 01>Bath",
  "node_name": "Bath",
  "parent_id": 598134331266968,
  "code": null
}
```

- `name` is the full breadcrumb path, joined with `>` and **no spaces around the separator**
- `node_name` is just the leaf
- `parent_id` is null at the top level
- `code` was null on every row seen

### Bondi's shape

```
A Ground Floor          (level)
  Wellington            (building)
    G. 01               (apartment)   ← ITP-011 attaches here
      Bath              (room)
      Bed 1
      Ensuite
      Kitchen
      Dining
      Garden
```

Four levels: level → building → apartment → room.

**The inspection attaches at apartment level**, not room level. The wet areas exist both as rooms in this tree and as line items on the customised project template. Those are two separate representations of the same thing — do not confuse them.

Basements use the same tree with different leaves (car spots numbered 1-24, plant rooms, wall elevations N/S/E/W).

### Two traps

**1. Pagination.** A `per_page=100` request on Bondi truncated part-way through the first apartment. There are well over 100 locations. Any bulk operation must page through every result — use `procoreGetAllPages` or equivalent. Missing a page silently produces fewer inspections than intended, which is worse than failing outright.

**2. Naming has drifted here too.** Seen on Bondi: `B-G 08`, `B.G 09`, `B.G 10` — a hyphen on one and a full stop on the next two. Apartments render as `G. 01` with a space after the dot.

**Rule: select locations by id from a presented list. Never parse or pattern-match location names.** Same rule as templates.

### Design implication

The UI should let the user pick a parent node (e.g. `A Ground Floor>Wellington`) and then tick the apartment-level children under it. That gives an explicit, visible selection rather than a guess, and it works for any project shape — apartments, elevations, car spots, zones.
