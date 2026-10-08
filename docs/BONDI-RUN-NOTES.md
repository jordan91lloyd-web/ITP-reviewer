# Bondi Rd ITP Run Notes

> Extracted from CLAUDE.md on 8 Oct 2026. Reference material for future bulk ITP runs on this project.

## Bondi tiling ITP run — COMPLETE as at 30 Aug 2026

Project 598134326053879. Template `ITP- 018 Tiling` = 598134329344256 (project level).

17 apartments group into **5 sets** by wet-area content. Balconies excluded (external, AS 4654). Room names standardised — `Powder/ Laundry`, `Laundry/ Pantry` and `Pantry/ Laundry` all become `Laundry`; `Ensuit` and `BAth` corrected.

| Set | Wet areas | Apartments | Status |
|-----|-----------|-----------|--------|
| 1 | Bath, Ensuite, Laundry | G.01, G.02, W102, W201, W301, B102, B103, B201, B202, B203, B204 | Done |
| 2 | Bath, Ensuite, Laundry, WC | B301, B302 | Done |
| 3 | Bath, Laundry | B101, B104 | Done |
| 4 | Bath, WC, Laundry | W101 | Done |
| 5 | Ensuite | W202 | Done |

All 17 created and read-back verified. All 17 descriptions set to the apartment code.

Sub-location items go in **PRE-INSTALL CHECKS, INSTALLATION and POST-INSTALLATION** only. Not Documents, not Compliance. Numbering picks up at 2.5, 3.5 and 4.5.

## Joinery / external waterproofing / pre-sheet — done 30 Aug 2026

Modelled on the William Street Alexandria `4 - Internal Inspection Tracker`. Three more straight runs, 17 each:

- `ITP- 017 Joinery ` = 598134329344264 (note the trailing space in the name)
- `ITP- 010 External Waterproofing` = 598134330945839
- `ITP- 022 internal Pre Sheet Inspection` = 598134329344252

**Correction — ITP-011 was already done.** All 17 apartment records exist (numbers 12-28, created 26 Aug 2026, template 598134329484536), with per-wet-area line items and item counts varying 29/32/35/38 by wet-area set. Ten older ITP-011s also sit at building and level locations (numbers 1-11, 26 items) covering basement and common area membrane.

**Real gap: assignee, responsible contractor and due date are blank on every record created on 30 Aug.** The 26 Aug ITP-011 run set all three. `create_inspections` does not set them. They are settable via `PATCH /rest/v1.1/projects/{pid}/checklist/lists/{id}` — `updateInspection` in `src/lib/procore.ts` already takes `due_at`.

Descriptions: 51 PATCH calls in one `javascript_tool` call **times out** (CDP limit is 45s). Split into batches of ~17.

## Flooring and glazing ITPs — done 30 Aug 2026

- `ITP- 016 Timber/ Engineered Floor Finishes` = 598134329344257 — 17 created
- `ITP- 019 Pedestal Floor Covering` = 598134329344251 — 17 created
- `ITP- 014 Windows and Glazing` = 598134329484550 — 17 created

All 51 read-back verified. Glazing is per apartment, not per elevation. Common areas and retail deliberately excluded.

Note: G.01 and G.02 have a `Garden` child, not a `Balcony`. ITP-019 raised against them anyway. If those courtyards turn out not to be pedestal-paved, delete 598134331809291 and 598134331809292.

## Facade cladding ITPs — done 30 Aug 2026

8 created off `ITP- 015 Facade Cladding` = 598134329484524, one per elevation per building, each carrying LVL 1/2/3 as line items.

## Responsible contractors set from commitments (30 Aug 2026)

Set: Capital Choice Waterproofing on ITP-010 and ITP-011, Aluxus on ITP-014, B&C Glass and Aluminium on ITP-015, Addison Joinery on ITP-017.

**Do not infer the facade contractor from the partitions package.** Aluxus holds partitions, metal works AND terracotta cladding. Jordy's answer was B&C — "B&C are doing the cladding, Aluxus are doing glazing."

Blank and unknowable from Procore: ITP-018 Tiling, ITP-019 Pedestal and ITP-016 Timber have no install commitment, only supply POs. ITP-022 Pre Sheet spans five trades.

`responsible_contractor_id` is the PATCH field; `vendor_id` returns 200 and does nothing.

## Attachment and photo requests (31 Aug 2026)

Added to all 163 rows: 163 `attachment` + 163 `photo`, on top of 146 `checklist` links. 472 requests total. Only sections are locked on a published plan.

## Sections lock on publish (30 Aug 2026)

`PATCH {plan:{status_id:1}}` reverts to draft. Use `status_id`, not `status`. Items cannot be moved between sections; delete and recreate. The round trip is non-destructive.

Basement split into three sections: **BASEMENT 1** (598134327094062), **BASEMENT 2** (598134327094115) and **BASEMENTS COMBINED** (598134327094116).

**COMBINED rule**: a row goes there only when the inspection is a single record signed off once across both levels. If the work happens twice, it belongs in the level section.

## Tracker assignees (30 Aug 2026)

118 assignees set. `plan_item_assignees` takes a **`party_id`, not a user id**. Parties come from `/action_plans/parties`.

Roof ITPs: ITP-032 METAL ROOFING at `A Roof>Wellington>W Roof` (598134331810795), ITP-010 External Waterproofing at `A Roof>Bondi>B Roof` (598134331810798, Capital Choice).

## Internal Inspection Tracker — DONE (30 Aug 2026)

Action Plan #14, plan id 598134325853211. 22 sections, 163 items, 144 inspections linked and verified.

Gotchas:
- A draft plan silently rejects test records with 409. Must be published from UI.
- Batch ~50 links per `javascript_tool` call (CDP 45s limit).

## Outstanding items

- **Bondi location tree tidy** — five parallel hierarchies, typos (`bath 1`, `BAth`, `Ensuit`, `Recyling`, `Exausts`)
