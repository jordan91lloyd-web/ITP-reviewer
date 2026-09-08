# Drawing Revision Changes — Design Brief

## Purpose

Detect scope and specification changes between drawing revisions to prevent missed variations. When a drawing is revised in Procore, Claude compares old vs new revision and flags changes that may require pricing as a variation.

## Core flow

1. User selects a project on the "Drawing Revision Changes" tab
2. System pulls the drawings register and disciplines from Procore
3. System identifies drawings with multiple revisions
4. User triggers "Scan for changes" on selected drawings
5. For each drawing pair: download previous + current revision PDFs, send both to Claude vision
6. Claude identifies scope/specification changes (ignores cosmetic annotation changes)
7. Results grouped by discipline (Architectural, Structural, Mechanical, Hydraulic, Electrical, etc.)
8. Exportable as PDF or CSV

## What it detects

| Change type | Description |
|-------------|-------------|
| Addition | New elements, rooms, features, specifications added |
| Deletion | Elements, rooms, features removed |
| Spec change | Material, dimension, finish, rating altered |
| Relocation | Elements moved to a different position |

## What it ignores

- Revision clouds, date stamps, title block updates
- Drawing border or revision history table changes
- Minor text reformatting with no meaning change

## API routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/drawing-changes/drawings` | GET | Fetch drawings register + disciplines, identify revision pairs |
| `/api/drawing-changes/scan` | POST | Run Claude comparison on selected drawing pairs |
| `/api/drawing-changes/results` | GET | Retrieve stored scan results |
| `/api/drawing-changes/export` | GET | CSV or PDF export of a scan |

## Supabase tables

### `drawing_revision_scans`
One row per scan run. Tracks status (pending/running/completed/failed), progress, timestamps.

### `drawing_revision_changes`
One row per detected change. Links to scan. Stores discipline, drawing info, change type, description, location, severity.

## Key rules

1. **No cost estimates.** Claude categorises changes; humans price them.
2. **No tender comparison in v1.** Future phase.
3. **Manual trigger only.** No auto-scanning.
4. **Group by discipline.** Use Procore's `drawing_disciplines` endpoint, fall back to drawing number prefix.
5. **600ms pacing** between Procore API calls. Retry on 429 with exponential backoff.
6. **No Auth header on S3 URLs.** Presigned URLs return 400 with Authorization.
7. **Partial results on failure.** If one drawing fails, continue and report the failure count.
8. **Compare consecutive revisions.** Rev B vs Rev C, not A vs C.
9. **maxDuration = 300** on the scan route.
