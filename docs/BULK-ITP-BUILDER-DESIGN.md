# Bulk ITP Builder — design brief

Written 28 Aug 2026 from a working session with Jordy. API facts live in `PROCORE-BULK-ITP-API.md`; this file is the design, not the endpoints.

## The problem

On a multi-unit project, every apartment needs its own ITP inspection, created from the same template, attached to its own location, and linked to its row in the project's Action Plan tracker.

Bondi Rd / Wellington St is 17 apartments. That is 17 inspections to create, 17 locations to set, and 17 tracker links to make, all by hand in the Procore UI. It takes an afternoon, so it does not always get done, and the apartment-by-apartment record is the whole point of doing it.

The same shape recurs on every project with a different subject: elevations on a glazing ITP, car spots in a basement, zones on a slab.

## What it does and does not do

**Automates:** the repetition. Create, set location, link to tracker, repeat.

**Leaves alone:** all of the judgement. Which template, how the tracker is laid out, which project-specific areas go on the template, which locations matter. Jordy sets that up in Procore as he does now.

The tool is a fast pair of hands, not a decision maker.

## Non-negotiable design principles

### 1. Nothing about a project's structure is hard-coded

Locations, templates and tracker layout differ on every project. The tool reads what is actually there at run time and presents it. It never assumes a depth, a naming pattern, or a shape.

This is what makes it work on the next project without a code change.

### 2. Select by id, never match by name

Template and location names were entered by hand over years and the formatting has drifted — `ITP- 011` vs `ITP - 023`, `B-G 08` vs `B.G 09`, `G. 01` with a space after the dot. There are also duplicate template names and duplicate numbers.

Every selection is made from a presented list and carried as an id. No parsing, no regex, no fuzzy string matching in the write path.

### 3. Claude proposes, the user decides

Pairing a location to its tracker row is fuzzy work — `A Ground Floor>Wellington>G. 01` needs to match a section called `G.01 Wellington`. Rigid code fails on that; Claude handles it well.

But Claude will get some wrong, and a wrong pairing is worse than no pairing: an ITP linked to the wrong apartment's row looks correct until somebody checks it. That is a bad failure mode for a quality record.

So Claude produces the proposed pairing with its reasoning. The user reviews every line and corrects before anything writes.

### 4. The preview is the safety control, not decoration

Nothing writes to Procore until the user has seen the full list of intended actions and approved it. This mirrors the existing Action Plans converter, which already works this way and is proven.

### 5. Never trust a 2xx

After writing, read everything back and report what actually exists. This bit us on Action Plan attachments, where every strategy returned success and the assets array stayed empty. Rule 16 in CLAUDE.md.

### 6. Page through everything

Bondi has well over 100 locations. A single unpaginated request truncates part way through the first apartment. Silently creating 12 inspections when 17 were wanted is worse than failing outright.

## The flow

1. **Pick the project.**
2. **Pick the template** — from the list of *project-level* templates on that project. Not company templates; the project copy is the one carrying the project-specific areas.
3. **Pick the locations** — browse the project's location tree, pick a parent node, tick the children to build against. Explicit and visible, no guessing.
4. **Pair each location to its tracker row** — Claude proposes, user confirms and corrects.
5. **Preview** — one line per location: this inspection, from this template, at this location, linked to this row. Nothing has been written yet.
6. **Execute** — for each location, in order:
   - create the inspection from the template with the location set
   - create the test record request on the plan item if one does not already exist
   - create the test record linking the new inspection to that request
7. **Verify** — read all of it back and show what landed, per line, including anything that failed.

Step 4 is where the design effort goes. Steps 1-3 and 5-7 are mechanical.

## Where it lives

A tab in Holdpoint. **Not** an MCP tool.

Reasoning: this is the same structured operation repeated 17 times, and the user needs to eyeball the whole set before it fires. A table does that well; a chat does not. The Action Plans converter already proves the pattern in this codebase.

The MCP server stays read-only. See rule 34.

## Open questions

- **Does the test record request's `checklist_template_id` refer to the project template or the company template?** Check against live data before coding step 6. Getting it wrong breaks the link.
- **Exact POST body wrappers** for `plan_test_record_requests` and `plan_test_records`. Response shapes are confirmed; request shapes are not. Other Procore endpoints use a singular wrapper (`plan_item`, `plan_reference`) so assume the same, but verify.
- **Can items be added to a project template via the API?** Only matters if template customisation is ever automated too. Not needed for v1 — the user customises the template in Procore first.
- **Partial failure handling.** If inspection 9 of 17 fails, what happens to 1-8? Leaning towards: continue, report per line, allow a retry of just the failures. Do not roll back — a created inspection is not harmful, and deleting things is riskier than leaving them.

## Explicitly out of scope for v1

- Generating the Action Plan itself. The user lays out the tracker.
- Customising templates. Done in Procore beforehand.
- Filling in inspection results. These are created blank and answered on site.
- Anything that deletes.
