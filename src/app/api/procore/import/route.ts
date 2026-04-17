// ─── POST /api/procore/import ─────────────────────────────────────────────────
// Imports a Procore inspection into the existing QA review engine.
//
// Flow:
//   1. Fetch full inspection detail (items, responses, attachments) using
//      view=extended so every question + answer + comment + attachment is
//      returned inline
//   2. Fetch the parent project so we can include project name + number in
//      the text bundle (otherwise the reviewer has no way to extract them)
//   3. Build a rich text representation of the inspection form covering
//      every item, answer, comment, and attachment
//   4. Collect attachment references from every location Procore uses
//      (top-level, responses[], items[], items[].response, etc.)
//   5. Download each supported attachment (PDF, JPG, PNG) — skip others
//   6. Pass the assembled file bundle to runBundleReview()
//   7. Save the result to local review history
//   8. Return review result + import summary
//
// If some files fail to download, the review continues with whatever was
// imported. The import only aborts if the inspection itself cannot be loaded.

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getInspectionDetail,
  getInspectionItems,
  getProcoreProject,
  downloadFile,
  type ProcoreInspection,
  type ProcoreInspectionItem,
  type ProcoreAttachment,
  type ProcorePhoto,
  type ProcoreProject,
} from "@/lib/procore";
import { runBundleReview } from "@/lib/claude";
import { appendRecord } from "@/lib/history";
import type { ProcessedFile } from "@/lib/types";

// Supported MIME types for direct processing.
// Images are intentionally excluded here — Procore site photos frequently
// exceed Claude's 5 MB per-image API limit and cause request failures.
// The inspection text bundle already lists every photo filename and count
// per item, so Claude knows they exist. PDFs are the critical evidence
// (engineer sign-offs, test certificates, compaction reports) and are
// passed natively so Claude sees all embedded content including photos
// and signatures stamped inside the PDF.
const SUPPORTED = new Set([
  "application/pdf",
]);

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("procore_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated with Procore." }, { status: 401 });
  }

  // ── Parse body ─────────────────────────────────────────────────────────────
  let body: { project_id: number; inspection_id: number; company_id: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { project_id, inspection_id, company_id } = body;
  if (!project_id || !inspection_id || !company_id) {
    return NextResponse.json(
      { error: "project_id, inspection_id, and company_id are required." },
      { status: 400 }
    );
  }

  // ── 1. Fetch inspection detail (view=extended) ─────────────────────────────
  let inspection: ProcoreInspection;
  try {
    inspection = await getInspectionDetail(accessToken, project_id, inspection_id, company_id);
    // Log the shape of what Procore returned so we can diagnose future issues
    const topKeys = Object.keys(inspection as unknown as Record<string, unknown>).sort();
    console.log(`[procore/import] Inspection keys: ${topKeys.join(", ")}`);
    console.log(
      `[procore/import] Inspection counts: ` +
      `items=${inspection.items?.length ?? 0} ` +
      `sections=${inspection.sections?.length ?? 0} ` +
      `responses=${inspection.responses?.length ?? 0} ` +
      `attachments=${inspection.attachments?.length ?? 0}`
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[procore/import] Failed to fetch inspection:", msg);
    return NextResponse.json({ error: `Could not load inspection from Procore: ${msg}` }, { status: 502 });
  }

  // ── 1b. Flatten items from whichever shape Procore returned ────────────────
  let allItems: ProcoreInspectionItem[] = [];
  if (inspection.items && inspection.items.length > 0) {
    allItems = inspection.items;
  } else if (inspection.sections && inspection.sections.length > 0) {
    for (const section of inspection.sections) {
      for (const it of section.items ?? []) {
        // Prefix item description with section name for clarity
        allItems.push({
          ...it,
          description: section.name ? `[${section.name}] ${it.description ?? ""}` : it.description,
        });
      }
    }
  }

  // If still empty, fall back to a separate list_items call
  if (allItems.length === 0) {
    console.log(`[procore/import] No items in detail response — trying separate list_items endpoint`);
    allItems = await getInspectionItems(accessToken, project_id, inspection_id, company_id);
    console.log(`[procore/import] Fallback list_items returned ${allItems.length} item(s)`);
  }

  console.log(`[procore/import] Total items to include in text: ${allItems.length}`);

  // ── 2. Fetch project details for name + number ─────────────────────────────
  let project: ProcoreProject | null = null;
  let projectLoadError: string | null = null;
  try {
    project = await getProcoreProject(accessToken, project_id, company_id);
    console.log(`[procore/import] Project: ${project.name} (#${project.project_number ?? "—"})`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    projectLoadError = msg;
    console.warn(`[procore/import] Could not load project details: ${msg}`);
    // Non-fatal — continue without project metadata
  }

  // ── 3. Build text representation of the inspection form ────────────────────
  const inspectionText = buildInspectionText(inspection, allItems, project);
  const safeTitle = inspection.name.replace(/[^a-zA-Z0-9_\-\.]/g, "_");
  const processedFiles: ProcessedFile[] = [
    { kind: "text", filename: `${safeTitle}.txt`, text: inspectionText },
  ];
  const importedFiles: string[] = [`${safeTitle}.txt (inspection form)`];
  const skippedFiles: string[] = [];

  // ── 4. Collect all attachment references from every location ───────────────
  type AttachmentRef = { filename: string; url: string; content_type: string | null; source: string };
  const attachmentRefs: AttachmentRef[] = [];

  // Diagnostic: track attachments we found but couldn't get a URL for, so the
  // UI can tell us the shape we're missing.
  let attachmentsSeenWithoutUrl = 0;
  let firstRawAttachment: unknown = null;

  const resolveAttachmentUrl = (att: ProcoreAttachment): string | null => {
    return (
      att.url ||
      att.file_url ||
      att.download_url ||
      att.view_url ||
      // ⚠ Procore wraps inspection-item file attachments as
      // { id, created_by, attachment: { id, name, filename, url } }
      att.attachment?.url ||
      att.viewable_document?.url ||
      att.prostore_file?.url ||
      att.file?.url ||
      null
    );
  };

  const resolveAttachmentFilename = (att: ProcoreAttachment): string => {
    return (
      att.filename ||
      att.name ||
      att.attachment?.filename ||
      att.attachment?.name ||
      att.prostore_file?.filename ||
      att.prostore_file?.name ||
      att.file?.filename ||
      `attachment_${att.id}`
    );
  };

  const resolveAttachmentContentType = (att: ProcoreAttachment): string | null => {
    return (
      att.content_type ||
      att.attachment?.content_type ||
      att.prostore_file?.content_type ||
      att.file?.content_type ||
      null
    );
  };

  const pushAttachment = (att: ProcoreAttachment | undefined | null, source: string) => {
    if (!att) return;
    if (firstRawAttachment === null) firstRawAttachment = att;
    const url = resolveAttachmentUrl(att);
    if (!url) {
      attachmentsSeenWithoutUrl++;
      return;
    }
    attachmentRefs.push({
      filename: resolveAttachmentFilename(att),
      url,
      content_type: resolveAttachmentContentType(att),
      source,
    });
  };

  // Photos in Procore come back with slightly different shapes — normalise
  // them to the same AttachmentRef shape so we can download them alongside
  // regular attachments.
  const pushPhoto = (photo: ProcorePhoto | undefined | null, source: string) => {
    if (!photo) return;
    const url =
      photo.url ??
      photo.image?.url ??
      photo.attachment?.url ??
      null;
    if (!url) return;
    const filename =
      photo.filename ??
      photo.attachment?.filename ??
      `photo_${photo.id}.jpg`;
    const content_type =
      photo.content_type ??
      photo.image?.content_type ??
      photo.attachment?.content_type ??
      "image/jpeg";
    attachmentRefs.push({ filename, url, content_type, source });
  };

  // Top-level inspection attachments
  for (const att of inspection.attachments ?? []) pushAttachment(att, "inspection");

  // Legacy `responses` structure (older Procore tenants)
  for (const resp of inspection.responses ?? []) {
    for (const att of resp.attachments ?? []) pushAttachment(att, `response ${resp.id}`);
  }

  // Extended `items` structure — attachments + photos may live in many places
  for (const it of allItems) {
    const label = `item ${it.position ?? "?"}`;

    // Direct attachments on the item
    for (const att of it.attachments ?? []) pushAttachment(att, `${label} attachments`);
    // Direct photos on the item (Procore separates photos from attachments)
    for (const p of it.photos ?? []) pushPhoto(p, `${label} photos`);

    // Response sub-object
    for (const att of it.response?.attachments ?? []) pushAttachment(att, `${label} response.attachments`);
    for (const p of it.response?.photos ?? []) pushPhoto(p, `${label} response.photos`);

    // list_item_responses array (newer API)
    for (const r of it.list_item_responses ?? []) {
      for (const att of r.attachments ?? []) pushAttachment(att, `${label} list_item_responses.attachments`);
      for (const p of r.photos ?? []) pushPhoto(p, `${label} list_item_responses.photos`);
    }

    // Linked observations — their own attachments
    for (const obs of it.observations ?? []) {
      for (const att of obs.attachments ?? []) pushAttachment(att, `${label} observation_${obs.id}`);
    }
  }

  // Deduplicate by URL (same file can appear in multiple places)
  const seenUrls = new Set<string>();
  const uniqueAttachmentRefs = attachmentRefs.filter(ref => {
    if (seenUrls.has(ref.url)) return false;
    seenUrls.add(ref.url);
    return true;
  });

  console.log(
    `[procore/import] ${attachmentRefs.length} attachment ref(s) found ` +
    `(${uniqueAttachmentRefs.length} unique). Sources: ` +
    Array.from(new Set(attachmentRefs.map(a => a.source))).join(", ")
  );

  // ── 5. Download and process each attachment ────────────────────────────────
  // Claude's API request size limit is ~32 MB total including base64
  // overhead (~33% bigger than raw bytes). We cap raw attachment bytes at
  // 20 MB so the whole request (text + ~27 MB of base64) stays under the
  // limit with comfortable headroom. PDFs are prioritised first because
  // they're almost always the critical evidence (engineer sign-offs,
  // compaction reports, form data), while item photos are high-count but
  // often redundant — if we have to drop something, drop photos not PDFs.
  const MAX_ATTACHMENT_BYTES_TOTAL = 20 * 1024 * 1024; // 20 MB combined
  // Claude's API enforces a hard 5 MB limit on individual image files.
  // PDFs don't have the same per-file restriction (only the total matters).
  const MAX_IMAGE_BYTES  = 5 * 1024 * 1024;  //  5 MB — Claude API hard limit
  const MAX_PDF_BYTES    = 15 * 1024 * 1024; // 15 MB — generous PDF cap

  // Sort PDFs first so they always get included before we start dropping
  // photos for the budget.
  const prioritisedRefs = [...uniqueAttachmentRefs].sort((a, b) => {
    const aIsPdf = normaliseMime(a.content_type, a.filename) === "application/pdf" ? 0 : 1;
    const bIsPdf = normaliseMime(b.content_type, b.filename) === "application/pdf" ? 0 : 1;
    return aIsPdf - bIsPdf;
  });

  let totalBytes = 0;
  let droppedForSize = 0;

  for (const ref of prioritisedRefs) {
    const mime = normaliseMime(ref.content_type, ref.filename);

    if (!SUPPORTED.has(mime)) {
      const reason = mime ? `unsupported type: ${mime}` : "unknown file type";
      console.log(`[procore/import] Skipping "${ref.filename}" — ${reason}`);
      skippedFiles.push(`${ref.filename} (${reason})`);
      continue;
    }

    try {
      const { buffer, filename, contentType } = await downloadFile(ref.url, accessToken);
      const effectiveMime = normaliseMime(contentType || mime, filename);

      // Per-file cap — Claude's API enforces 5 MB per image (hard limit).
      // PDFs have no per-file restriction but we still cap them at 15 MB to
      // avoid one massive scan-PDF consuming the entire total budget.
      const isPdf = effectiveMime === "application/pdf";
      const perFileCap = isPdf ? MAX_PDF_BYTES : MAX_IMAGE_BYTES;
      if (buffer.length > perFileCap) {
        const sizeMb = (buffer.length / 1024 / 1024).toFixed(1);
        const capMb  = (perFileCap / 1024 / 1024).toFixed(0);
        console.log(`[procore/import] Skipping "${filename}" — ${isPdf ? "PDF" : "image"} too large (${sizeMb} MB > ${capMb} MB cap)`);
        skippedFiles.push(`${filename} (too large: ${sizeMb} MB — ${isPdf ? "PDF" : "image"} limit is ${capMb} MB)`);
        droppedForSize++;
        continue;
      }

      // Total-budget cap — stop adding once we'd exceed the combined limit
      if (totalBytes + buffer.length > MAX_ATTACHMENT_BYTES_TOTAL) {
        const sizeMb = (buffer.length / 1024 / 1024).toFixed(1);
        console.log(
          `[procore/import] Skipping "${filename}" — would exceed total budget ` +
          `(${sizeMb} MB, running total ${(totalBytes / 1024 / 1024).toFixed(1)} MB)`
        );
        skippedFiles.push(`${filename} (skipped: total attachment budget reached — Claude API request size limit)`);
        droppedForSize++;
        continue;
      }

      if (effectiveMime === "application/pdf") {
        // Pass PDF natively to Claude. This is the critical change:
        // pdf-parse used to strip PDFs to text and throw away embedded
        // photos, signatures, and stamps — meaning engineer sign-offs
        // were invisible to the reviewer. Claude's native PDF support
        // sees every page visually, just like a human opening the file.
        processedFiles.push({
          kind: "pdf",
          filename,
          base64: buffer.toString("base64"),
        });
      } else {
        // Image — the ProcessedFile type is constrained to image/jpeg or
        // image/png. For .tif/.heic/.gif/.webp we label as jpeg so they
        // still get sent to the vision model (Claude will decode common
        // variants even if the label doesn't match exactly).
        const mediaType: "image/jpeg" | "image/png" =
          effectiveMime === "image/png" ? "image/png" : "image/jpeg";
        processedFiles.push({
          kind: "image",
          filename,
          base64: buffer.toString("base64"),
          mediaType,
        });
      }

      totalBytes += buffer.length;
      importedFiles.push(filename);
      console.log(
        `[procore/import] Downloaded: ${filename} (${(buffer.length / 1024).toFixed(0)} KB, ` +
        `total ${(totalBytes / 1024 / 1024).toFixed(1)} MB)`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[procore/import] Download failed for "${ref.filename}": ${msg}`);
      skippedFiles.push(`${ref.filename} (download failed: ${msg})`);
    }
  }

  // ── 6. Run QA review ───────────────────────────────────────────────────────
  console.log(
    `[procore/import] Running review on ${processedFiles.length} file(s) ` +
    `(${skippedFiles.length} skipped)`
  );

  let reviewResult;
  try {
    reviewResult = await runBundleReview(processedFiles);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[procore/import] Review failed:", msg);
    return NextResponse.json({ error: `QA review failed: ${msg}` }, { status: 500 });
  }

  // ── 7. Save to history ─────────────────────────────────────────────────────
  await appendRecord({
    source: "procore",
    procore_project_id: project_id,
    procore_inspection_id: inspection_id,
    inspection_title: inspection.name,
    reviewed_at: new Date().toISOString(),
    score: reviewResult.total_score,
    score_band: reviewResult.score_band,
    package_assessment: reviewResult.package_assessment,
    procore_updated_at: inspection.updated_at ?? null,
  });

  console.log(
    `[procore/import] Complete. Score: ${reviewResult.total_score} ` +
    `(${reviewResult.score_band}), assessment: ${reviewResult.package_assessment}`
  );

  // ── 8. Return ──────────────────────────────────────────────────────────────
  // Count attachments by source so the UI can surface exactly where every
  // attachment came from (or didn't come from).
  const attachmentsBySource: Record<string, number> = {};
  for (const ref of attachmentRefs) {
    attachmentsBySource[ref.source] = (attachmentsBySource[ref.source] ?? 0) + 1;
  }

  const topLevelKeys = Object.keys(inspection as unknown as Record<string, unknown>).sort();

  return NextResponse.json({
    success: true,
    result: reviewResult,
    import_summary: {
      inspection_title: inspection.name,
      total_files: processedFiles.length,
      imported_files: importedFiles,
      skipped_files: skippedFiles,
      items_included: allItems.length,
      attachments_found: uniqueAttachmentRefs.length,
    },
    diagnostics: {
      procore_top_level_keys: topLevelKeys,
      counts: {
        items:     inspection.items?.length ?? 0,
        sections:  inspection.sections?.length ?? 0,
        responses: inspection.responses?.length ?? 0,
        topLevelAttachments: inspection.attachments?.length ?? 0,
        flattenedItems: allItems.length,
      },
      attachments_by_source: attachmentsBySource,
      attachments_total: attachmentRefs.length,
      attachments_unique: uniqueAttachmentRefs.length,
      attachments_seen_without_url: attachmentsSeenWithoutUrl,
      attachments_dropped_for_size: droppedForSize,
      attachments_total_bytes: totalBytes,
      first_raw_attachment: firstRawAttachment,
      project_loaded: !!project,
      project_load_error: projectLoadError,
      project_name:   project?.name ?? null,
      project_number: project?.project_number ?? null,
      sample_items: allItems.slice(0, 5).map(it => ({
        id: it.id,
        position: it.position,
        description: it.description?.slice(0, 100) ?? null,
        has_response: !!it.response,
        has_list_item_responses: (it.list_item_responses?.length ?? 0) > 0,
        direct_attachment_count:
          (it.attachments?.length ?? 0) +
          (it.response?.attachments?.length ?? 0) +
          (it.list_item_responses ?? []).reduce((n, r) => n + (r.attachments?.length ?? 0), 0),
        direct_photo_count:
          (it.photos?.length ?? 0) +
          (it.response?.photos?.length ?? 0) +
          (it.list_item_responses ?? []).reduce((n, r) => n + (r.photos?.length ?? 0), 0),
        answer: it.response?.answer ?? it.list_item_responses?.[0]?.answer ?? null,
      })),
    },
  });
}

// ── Helpers ────────────────────────────────────────────────────────────────────

/**
 * Converts the Procore inspection object into a readable text file formatted
 * to mirror the Procore PDF export. This is always the first file in the
 * bundle and serves as the ITP form for Claude's reviewer. It MUST populate
 * every field the reviewer looks up in inspection_header (project_name,
 * project_number, itp_name, itp_number, inspection_number_of_type,
 * closed_by, etc.) so they appear in the final report.
 */
function buildInspectionText(
  insp: ProcoreInspection,
  items: ProcoreInspectionItem[],
  project: ProcoreProject | null
): string {
  const lines: string[] = [];

  // ── Header ───────────────────────────────────────────────────────────────
  lines.push(`PROCORE INSPECTION RECORD — IMPORTED VIA API`);
  lines.push(`═════════════════════════════════════════════════════════════════`);
  lines.push(``);
  lines.push(`This text file is an automatically-generated export of a Procore`);
  lines.push(`Inspection record. Photographs and attached PDFs referenced below`);
  lines.push(`are included as separate files in this same bundle.`);
  lines.push(``);

  // ── Project ──────────────────────────────────────────────────────────────
  const projectNumber = deriveProjectNumber(project);
  const projectName = project?.name ?? project?.display_name ?? "(unknown)";

  lines.push(`PROJECT`);
  lines.push(`───────`);
  lines.push(`Project Name:          ${projectName}`);
  lines.push(`Project Number:        ${projectNumber ?? "(not set in Procore)"}`);
  if (project?.display_name && project.display_name !== project.name) {
    lines.push(`Display Name:          ${project.display_name}`);
  }
  lines.push(``);

  // ── Inspection meta — mirror the fields on the Procore PDF cover page ────
  const numberOfType =
    insp.number ??
    (typeof insp.inspection_number === "number" || typeof insp.inspection_number === "string"
      ? String(insp.inspection_number)
      : null) ??
    (typeof insp.position_of_type === "number" || typeof insp.position_of_type === "string"
      ? String(insp.position_of_type)
      : null);

  lines.push(`INSPECTION / ITP`);
  lines.push(`────────────────`);
  lines.push(`ITP Name:              ${insp.name}`);
  if (insp.list_template_name && insp.list_template_name !== insp.name) {
    lines.push(`Template:              ${insp.list_template_name}`);
  }
  if (insp.identifier) {
    lines.push(`Identifier:            ${insp.identifier}`);
  }
  if (numberOfType) {
    lines.push(`ITP Number of Type:    #${numberOfType}   (the ${ordinal(numberOfType)} inspection of this type on the project)`);
  }
  lines.push(`Status:                ${insp.status}`);
  if (insp.inspection_type?.name) lines.push(`Inspection Type:       ${insp.inspection_type.name}`);
  if (insp.trade?.name)           lines.push(`Trade:                 ${insp.trade.name}`);
  if (insp.location?.name)        lines.push(`Location:              ${insp.location.name}`);

  // Spec section — Procore's current API uses `specification_section`; older
  // tenants used `spec_section`. Support both.
  const specLabel =
    insp.specification_section?.label ??
    insp.specification_section?.number ??
    insp.spec_section?.section_number ??
    null;
  const specDesc =
    insp.specification_section?.description ??
    insp.spec_section?.description ??
    null;
  if (specLabel || specDesc) {
    lines.push(`Spec Section:          ${[specLabel, specDesc].filter(Boolean).join(" ")}`.trim());
  }

  if (insp.inspection_date)            lines.push(`Inspection Date:       ${fmtDate(insp.inspection_date)}`);
  // Procore uses `due_at` on the current API; `due_date` is a legacy fallback
  const dueAt = insp.due_at ?? insp.due_date;
  if (dueAt)                           lines.push(`Due Date:              ${fmtDate(dueAt)}`);
  if (insp.created_at)                 lines.push(`Created At:            ${fmtDate(insp.created_at)}`);
  if (insp.closed_at)                  lines.push(`Closed At:             ${fmtDate(insp.closed_at)}`);
  if (insp.updated_at)                 lines.push(`Last Updated:          ${fmtDate(insp.updated_at)}`);

  if (insp.created_by?.name) lines.push(`Created By:            ${insp.created_by.name}`);
  if (insp.closed_by?.name)  lines.push(`Closed By:             ${insp.closed_by.name}${insp.closed_at ? ` on ${fmtDate(insp.closed_at)}` : ""}`);

  // Inspector(s) — Procore's current API returns `inspectors` plural; we fall
  // back to the singular `inspector` if that's all we have.
  const inspectorNames: string[] = [];
  if (insp.inspectors && insp.inspectors.length > 0) {
    for (const i of insp.inspectors) if (i?.name) inspectorNames.push(i.name);
  } else if (insp.inspector?.name) {
    inspectorNames.push(insp.inspector.name);
  }
  if (inspectorNames.length > 0) {
    lines.push(`Inspector${inspectorNames.length > 1 ? "s" : ""}:            ${inspectorNames.join(", ")}`);
  }

  if (insp.point_of_contact?.name) lines.push(`Point of Contact:      ${insp.point_of_contact.name}`);

  // Responsible party — `responsible_contractor` on older tenants,
  // `responsible_party` on current API
  const responsibleName =
    insp.responsible_contractor?.name ?? insp.responsible_party?.name ?? null;
  if (responsibleName) {
    lines.push(`Responsible Contractor:${responsibleName}`);
  }

  if (insp.assignees && insp.assignees.length > 0) {
    lines.push(`Assignee(s):           ${insp.assignees.map(a => a.name).join(", ")}`);
  }

  // Counts summary (mirrors the bar at the top of the Procore PDF). The
  // current API uses `*_item_count` names; older tenants used `*_count` +
  // `items_count`. Prefer new names, fall back to legacy.
  const conforming  = insp.conforming_item_count ?? insp.conforming_count ?? null;
  const deficient   = insp.deficient_item_count  ?? insp.deficient_count  ?? null;
  const na          = insp.na_item_count         ?? insp.not_applicable_count ?? null;
  const neutral     = insp.neutral_item_count    ?? insp.neutral_count    ?? null;
  const yesCount    = insp.yes_item_count        ?? null;
  const notInspected= insp.not_inspected_item_count ?? null;
  const totalItems  = insp.item_total            ?? insp.item_count       ?? insp.items_count ?? null;

  const counts = [
    totalItems   != null ? `Items: ${totalItems}`        : null,
    conforming   != null ? `Conforming: ${conforming}`   : null,
    deficient    != null ? `Deficient: ${deficient}`     : null,
    na           != null ? `N/A: ${na}`                  : null,
    neutral      != null ? `Neutral: ${neutral}`         : null,
    yesCount     != null ? `Yes: ${yesCount}`            : null,
    notInspected != null ? `Not Inspected: ${notInspected}` : null,
  ].filter(Boolean);
  if (counts.length > 0) {
    lines.push(``);
    lines.push(`Result Counters:       ${counts.join(" · ")}`);
  }

  if (insp.description?.trim()) {
    lines.push(``);
    lines.push(`Description:`);
    lines.push(insp.description.trim());
  }

  // ── Items ────────────────────────────────────────────────────────────────
  lines.push(``);
  lines.push(`═════════════════════════════════════════════════════════════════`);
  lines.push(`INSPECTION ITEMS`);
  lines.push(`═════════════════════════════════════════════════════════════════`);

  if (items.length === 0) {
    lines.push(``);
    lines.push(`(No checklist items were returned by the Procore API for this inspection.`);
    lines.push(`The reviewer should treat this as an incomplete import, not an empty ITP.)`);
  } else {
    for (const it of items) {
      const pos = it.position != null ? `${it.position}. ` : "";
      const desc = it.description?.trim() || it.name?.trim() || "(no description)";
      lines.push(``);
      lines.push(`${pos}${desc}`);

      // Response answers + comments from every shape Procore may use
      const answers: string[] = [];
      const comments: string[] = [];
      let responseAttachmentCount = 0;
      let responsePhotoCount = 0;

      const legacyResp = (insp.responses ?? []).find(r => r.inspection_item?.id === it.id);
      if (legacyResp) {
        if (legacyResp.answer) answers.push(legacyResp.answer);
        if (legacyResp.comment) comments.push(legacyResp.comment);
        responseAttachmentCount += legacyResp.attachments?.length ?? 0;
      }
      if (it.response) {
        if (it.response.answer) answers.push(it.response.answer);
        if (it.response.comment) comments.push(it.response.comment);
        responseAttachmentCount += it.response.attachments?.length ?? 0;
        responsePhotoCount += it.response.photos?.length ?? 0;
      }
      for (const r of it.list_item_responses ?? []) {
        if (r.answer) answers.push(r.answer);
        if (r.comment) comments.push(r.comment);
        responseAttachmentCount += r.attachments?.length ?? 0;
        responsePhotoCount += r.photos?.length ?? 0;
      }

      if (answers.length > 0) lines.push(`   Answer:        ${dedupe(answers).join(" / ")}`);
      for (const c of dedupe(comments)) lines.push(`   Comment:       ${c}`);
      if (it.status) lines.push(`   Status:        ${it.status}`);

      const directAtt = it.attachments?.length ?? 0;
      const directPhotos = it.photos?.length ?? 0;
      const totalAtt = directAtt + responseAttachmentCount;
      const totalPhotos = directPhotos + responsePhotoCount;
      if (totalAtt > 0 || totalPhotos > 0) {
        const parts = [];
        if (totalAtt > 0) parts.push(`${totalAtt} file attachment${totalAtt > 1 ? "s" : ""}`);
        if (totalPhotos > 0) parts.push(`${totalPhotos} photo${totalPhotos > 1 ? "s" : ""}`);
        lines.push(`   Evidence:      ${parts.join(", ")}  (included as separate files in this bundle)`);

        // List filenames so the reviewer can cross-reference which file
        // belongs to which item
        const names: string[] = [];
        for (const a of it.attachments ?? []) names.push(a.filename ?? `attachment_${a.id}`);
        for (const p of it.photos ?? []) names.push(p.filename ?? p.attachment?.filename ?? `photo_${p.id}.jpg`);
        for (const a of it.response?.attachments ?? []) names.push(a.filename ?? `attachment_${a.id}`);
        for (const p of it.response?.photos ?? []) names.push(p.filename ?? `photo_${p.id}.jpg`);
        for (const r of it.list_item_responses ?? []) {
          for (const a of r.attachments ?? []) names.push(a.filename ?? `attachment_${a.id}`);
          for (const p of r.photos ?? []) names.push(p.filename ?? `photo_${p.id}.jpg`);
        }
        for (const n of dedupe(names)) lines.push(`     • ${n}`);
      }

      // Linked observations
      if (it.observations && it.observations.length > 0) {
        lines.push(`   Observations:  ${it.observations.length} linked`);
        for (const o of it.observations) {
          lines.push(`     • ${o.name ?? `observation_${o.id}`}${o.description ? ` — ${o.description}` : ""}`);
        }
      }
    }
  }

  // ── Top-level attachments ────────────────────────────────────────────────
  const topLevelAtt = insp.attachments?.length ?? 0;
  if (topLevelAtt > 0) {
    lines.push(``);
    lines.push(`─── INSPECTION-LEVEL ATTACHMENTS ────────────────────────────────`);
    lines.push(`${topLevelAtt} attachment(s) recorded against the inspection itself.`);
    for (const att of insp.attachments ?? []) {
      lines.push(`  • ${att.filename ?? `attachment_${att.id}`}`);
    }
  }

  return lines.join("\n");
}

// ── Small formatting helpers ───────────────────────────────────────────────

/**
 * Returns Procore's project_number if set, otherwise tries to infer one from
 * the project name. Fleek's convention is that the number is the first token
 * before a space (e.g. "013 222 — 234 Bondi Rd" → "013").
 */
function deriveProjectNumber(project: ProcoreProject | null): string | null {
  if (!project) return null;
  if (project.project_number && project.project_number.trim()) {
    return project.project_number.trim();
  }
  const match = project.name?.match(/^\s*(\d{2,6})(?:\s|[-–—])/);
  return match ? match[1] : null;
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString("en-AU", { timeZone: "Australia/Sydney" });
  } catch {
    return iso;
  }
}

function ordinal(n: string | number): string {
  const num = typeof n === "number" ? n : parseInt(n, 10);
  if (isNaN(num)) return String(n);
  const s = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
}

function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * Resolves the effective MIME type from either the content_type field
 * or by inferring from the file extension. Returns "" if unknown.
 */
function normaliseMime(contentType: string | null | undefined, filename: string): string {
  const ct = (contentType ?? "").toLowerCase().split(";")[0].trim();
  if (ct && ct !== "application/octet-stream") return ct;

  // Fall back to extension
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return "application/pdf";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    default:
      return ct || "";
  }
}
