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

**CONFIRMED 30 Aug 2026** by building Action Plan #14 "Internal Inspection Tracker" on Bondi Rd (plan 598134325853211) — 19 sections, 161 items, 144 links, all read back and verified. Both POSTs take a wrapper object:

```
POST /rest/v1.0/projects/{pid}/action_plans/plan_test_record_requests
     { plan_test_record_request: { plan_id, plan_item_id, type: "checklist",
                                   payload: { checklist_template_id } } }

POST /rest/v1.0/projects/{pid}/action_plans/plan_test_records
     { plan_test_record: { plan_id, plan_item_id, plan_test_record_request_id,
                           type: "checklist",
                           payload: { checklist_id, checklist_template_id } } }
```

`type` is required on both — omitting it returns `400 param is missing or the value is empty or invalid: type`.

### The plan must not be in draft

A newly created plan starts as `draft`. Sections and items can be added to a draft, but test records cannot:

```
409 {"errors":"Unable to modify Action Plan Test Record while its Action Plan's status is draft"}
```

`PATCH /rest/v1.0/projects/{pid}/action_plans/plans/{id}` with `{plan:{status:"in_progress"}}` returns **200 and silently does nothing** — status stays draft. The plan has to be published through the UI. Open `https://us02.procore.com/{pid}/project/action_plans/plans/{planId}` (it redirects to the webclients edit view) and press **Publish**. The page then keeps rendering "Draft" in the status field, but the API reports `in_progress` and the record POSTs start working — trust the API, not that label.

Create everything else first, publish once, then do the links.

### ...but a published plan refuses new SECTIONS

The lock works both ways, and the two locks are opposites:

| Plan status | Sections and items | Test records |
|---|---|---|
| `draft` | allowed | **409** Unable to modify Action Plan Test Record while its Action Plan's status is draft |
| `in_progress` | **409** Unable to modify sections while plan's status is in_progress | allowed |

Items can be added in either state; only *sections* are locked once published.

**Use `status_id`, not `status`.**

```
PATCH /rest/v1.0/projects/{pid}/action_plans/plans/{id}   { plan: { status_id: 1 } }   -> reverts to draft, reliably
```

`{plan:{status:"draft"}}` is unreliable: it worked once and then silently stopped, returning 200 with the plan still `in_progress`. `plan_status`, `plan_status_id` and `status_id: 2` (to publish) all no-op too. Only `status_id: 1` (draft) is dependable, and publishing must still be done from the UI button. Always read the plan back and check `status` before assuming.

**Items cannot be moved between sections.** `PATCH plan_items/{id}` with `plan_section_id`, `section_id`, a flat body, or the v2.0 endpoint all return 200 and change nothing. To move a row, `DELETE` it and recreate it under the new section, then rebuild its request and records. Deleting the item takes its request and records with it, so there are no orphans left behind (verified: 0 orphaned requests, 0 orphaned records).

So to add a section to a live plan: PATCH it back to `draft`, add the section and its items, then re-publish **from the UI** (`https://us02.procore.com/{pid}/project/action_plans/plans/{planId}` → Publish). There is no unpublish/revert endpoint (`/unpublish` and `/revert_to_draft` both 404) and the UI kebab offers only Export PDF and Delete, so the PATCH is the only way down.

**Reverting to draft is non-destructive.** Verified 30 Aug 2026 on a plan carrying 19 sections, 161 items, 144 requests, 144 records and 118 assignees: counts were identical before and after the round trip. Snapshot the counts anyway and compare — never assume.

A plan item can hold **more than one record** against a single request: one request names the template, then one record per inspection. Used on the BASEMENT Internal Waterproofing row to hang both buildings' basement ITP-011s off one row.



## 3b. Setting the responsible contractor on an inspection

Confirmed 30 Aug 2026 on Bondi Rd.

```
PATCH /rest/v1.1/projects/{pid}/checklist/lists/{id}?company_id={cid}
      { list: { responsible_contractor_id: <vendor id> } }
```

`vendor_id` is NOT the field. It returns **200 and silently changes nothing** — the same class of trap as `{plan:{status:"in_progress"}}` on an Action Plan. Read back `responsible_contractor` and confirm before believing it.

Vendor ids come from `GET /rest/v1.0/projects/{pid}/vendors` (paged, 200+ on this project) or from the `vendor` object on a commitment — they are the same ids.

Commitments, for deriving who belongs on which ITP:

```
GET /rest/v1.0/work_order_contracts?project_id={pid}&company_id={cid}      (subcontracts)
GET /rest/v1.0/purchase_order_contracts?project_id={pid}&company_id={cid}  (POs)
```

There is no `/projects/{pid}/commitments` endpoint — it 404s. The vendor's name is at `vendor.company`, not `vendor.name`.

## 3d. Attachment and photo requests on a row

A person cannot attach a file or a photo to an Action Plan row until a *request* of that type exists on it. Same endpoint as the ITP link, different `type`, and **no payload**:

```
POST /rest/v1.0/projects/{pid}/action_plans/plan_test_record_requests?company_id={cid}
     { plan_test_record_request: { plan_id, plan_item_id, type: "attachment" } }
     { plan_test_record_request: { plan_id, plan_item_id, type: "photo" } }
```

The three request types on this company:

| type | type_id | payload |
|---|---|---|
| checklist | 1 | `{ checklist_template_id }` |
| attachment | 2 | none |
| photo | 3 | none |

They render in the Records column as `Attachments requested` and `Photos requested`, matching the William Street tracker.

Requests do **not** need the plan in draft. Only sections are locked once a plan is published — items, requests, records and assignees all work on a live plan.

Run at ~55 per `javascript_tool` call; 324 in one call exceeds the 45s CDP limit.

## 3c. Assignees on an Action Plan row

Confirmed 30 Aug 2026.

```
POST /rest/v1.0/projects/{pid}/action_plans/plan_item_assignees?company_id={cid}
     { plan_item_assignee: { plan_item_id, party_id, verification_method_id } }
```

One call per person per row. `verification_method_id` is required — omitting it returns 400.

**`party_id` is NOT a user id.** This is the trap. A plan item assignee references a *party*:

```
GET /rest/v1.0/projects/{pid}/action_plans/parties?company_id={cid}   (paged; 301 on Bondi Rd)
```

Each party has its own `id` plus a separate `user_id`, and carries a `vendor` object — that is how a person is matched to a subcontractor. Passing the `id` from `/projects/{pid}/users` (which is the user id) returns a **bare 400 with an empty body**. Passing `user_id` as the key instead returns the useful `param is missing or the value is empty or invalid: party_id or role`, which is how the right shape was found.

`/action_plans/verification_methods` does not exist (404). Read a `verification_method.id` off an existing assignee on any other plan on the project — "Written Confirmation" was 598134325523360 on this company.

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

## 9. Field naming gotcha — Action Plans use `title`, never `name`

Confirmed against live data 28 Aug 2026.

An Action Plan, its sections and its items all carry their display text in **`title`**. There is no `name` field on any of them. Reading `name` returns undefined and the UI renders blank rows, which is how this was found.

```
plan.title          "CC - Bondi-Wellington"
plan_section.title  "WILLIAM STREET Elevation ITP's- Multi Unit Inspections"
plan_item.title     "ITP- 014 Windows and Glazing"
```

Contrast with the resources that *do* use `name`: projects, checklist templates, locations, trades, inspection types.

The plans list endpoint also returns `number` (the tracker's display number), `total_item_count`, `closed_item_count`, `location`, `manager`, `plan_type` and `template_id`. `number` is the natural sort order for a picker.

## 10. Verified against Bondi (28 Aug 2026)

`GET /api/bulk-itp/locations` for the Bondi Rd / Wellington St project returned:

```
412 locations, 18 root nodes, max depth 3
```

412 confirms pagination is working — a single `per_page=100` call would have returned a quarter of the tree and silently lost apartments. Max depth 3 matches the level → building → apartment → room shape.

`GET /api/bulk-itp/templates` returned 76 project templates against 84 at company level, confirming the route reads project copies rather than company masters.

`GET /api/bulk-itp/action-plans` returned 12 plans. Note that Bondi has no ITP tracker yet — the existing plans are consultant matrices, DA items and inspection reports.
