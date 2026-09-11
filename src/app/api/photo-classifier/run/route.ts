// POST /api/photo-classifier/run
// Body: { company_id, project_id, album_id? }
// Classifies photos in Procore albums. Read-only against Procore.
// Uses the pinned integration user (MCP_PROCORE_USER_ID), not session.

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import { getValidToken } from "@/lib/token-store";
import { getProjectLocations } from "@/lib/procore";
import {
  CLASSIFIER_SYSTEM_PROMPT,
  PROMPT_VERSION,
  SUBJECTS,
  CONFIDENCE_THRESHOLD_CONFIDENT,
  CONFIDENCE_THRESHOLD_REVIEW,
  type Subject,
  type PhotoClassification,
} from "@/lib/photo-classifier-prompt";

export const maxDuration = 300;

const PROCORE_BASE =
  process.env.PROCORE_ENV === "production"
    ? "https://api.procore.com"
    : "https://sandbox.procore.com";

const BATCH_SIZE = 10; // photos per Claude call

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Procore helpers ──────────────────────────────────────────────────────────

interface ProcoreAlbum {
  id: number;
  name: string;
  count: number;
}

interface ProcoreImage {
  id: number;
  url: string | null;
  thumbnail_url: string | null;
  filename: string | null;
  description: string;
  image_category_id: number;
  image_category_name: string;
  location: { id: number; name: string; node_name: string } | null;
  prostore_file?: { id: number } | null;
}

async function fetchAlbums(
  token: string,
  companyId: string,
  projectId: string
): Promise<ProcoreAlbum[]> {
  const all: ProcoreAlbum[] = [];
  let page = 1;
  while (true) {
    const url = `${PROCORE_BASE}/rest/v1.0/image_categories?project_id=${projectId}&per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": companyId },
    });
    if (!res.ok) break;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < 100) break;
    page++;
    await sleep(300);
  }
  return all;
}

async function fetchPhotosInAlbum(
  token: string,
  companyId: string,
  projectId: string,
  albumId: number
): Promise<ProcoreImage[]> {
  const all: ProcoreImage[] = [];
  let page = 1;
  while (true) {
    const url = `${PROCORE_BASE}/rest/v1.0/images?project_id=${projectId}&image_category_id=${albumId}&serializer_view=prostore_file&per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, "Procore-Company-Id": companyId },
    });
    if (!res.ok) break;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < 100) break;
    page++;
    await sleep(300);
  }
  return all;
}

async function downloadThumbnail(url: string): Promise<string | null> {
  if (!url) return null;
  try {
    // Procore thumbnail URLs are presigned S3 — no auth header
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    // Skip if too large (> 4MB)
    if (buf.length > 4 * 1024 * 1024) return null;
    return buf.toString("base64");
  } catch {
    return null;
  }
}

// ── Album to location matching ───────────────────────────────────────────────

interface LocationNode {
  id: number;
  name: string;      // full path: "A Ground Floor>Wellington>G. 01"
  node_name: string;  // leaf: "G. 01"
}

function normalise(s: string): string {
  return s.replace(/[\s\-_.,:;()]/g, "").toLowerCase();
}

function resolveAlbumToLocation(
  albumName: string,
  locations: LocationNode[]
): { locationId: number; locationPath: string } | null {
  const normAlbum = normalise(albumName);

  // Try to find a location code inside the album name
  const matches: LocationNode[] = [];
  for (const loc of locations) {
    const normNode = normalise(loc.node_name);
    if (normNode.length >= 2 && normAlbum.includes(normNode)) {
      matches.push(loc);
    }
  }

  // Exactly one match: resolved
  if (matches.length === 1) {
    return { locationId: matches[0].id, locationPath: matches[0].name };
  }

  // Multiple matches: try to find the longest (most specific) match
  if (matches.length > 1) {
    const sorted = [...matches].sort(
      (a, b) => normalise(b.node_name).length - normalise(a.node_name).length
    );
    // If the longest match is strictly longer than the second, use it
    if (
      normalise(sorted[0].node_name).length >
      normalise(sorted[1].node_name).length
    ) {
      return { locationId: sorted[0].id, locationPath: sorted[0].name };
    }
  }

  // Zero or ambiguous matches: unresolved
  return null;
}

// ── Classification ───────────────────────────────────────────────────────────

function parseClassifications(raw: string): PhotoClassification[] {
  let parsed: unknown;
  try { parsed = JSON.parse(raw); } catch {
    const fenceMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fenceMatch) try { parsed = JSON.parse(fenceMatch[1].trim()); } catch { /* */ }
    if (!parsed) {
      const start = raw.indexOf("[");
      const end = raw.lastIndexOf("]");
      if (start !== -1 && end > start) try { parsed = JSON.parse(raw.slice(start, end + 1)); } catch { return []; }
    }
  }
  if (!Array.isArray(parsed)) return [];

  const validSubjects = new Set<string>(SUBJECTS);

  return parsed
    .filter(
      (item: unknown): item is Record<string, unknown> =>
        typeof item === "object" && item !== null
    )
    .map((item) => ({
      photo_index: typeof item.photo_index === "number" ? item.photo_index : 0,
      subject: (validSubjects.has(item.subject as string) ? item.subject : "unknown") as Subject,
      location_detail: typeof item.location_detail === "string" ? item.location_detail : null,
      confidence: typeof item.confidence === "number" ? Math.max(0, Math.min(1, item.confidence)) : 0.5,
    }));
}

async function classifyBatch(
  client: Anthropic,
  photos: { index: number; base64: string; filename: string }[]
): Promise<PhotoClassification[]> {
  const contentBlocks: Anthropic.ContentBlockParam[] = [];

  for (const photo of photos) {
    contentBlocks.push({
      type: "text",
      text: `Photo ${photo.index}: ${photo.filename}`,
    });
    contentBlocks.push({
      type: "image",
      source: {
        type: "base64",
        media_type: "image/jpeg",
        data: photo.base64,
      },
    });
  }

  contentBlocks.push({
    type: "text",
    text: `Classify these ${photos.length} photos. Return a JSON array with ${photos.length} objects.`,
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    system: CLASSIFIER_SYSTEM_PROMPT,
    messages: [{ role: "user", content: contentBlocks }],
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  return parseClassifications(text);
}

// ── Main handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: { company_id: string; project_id: string; album_id?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { company_id, project_id, album_id } = body;
  if (!company_id || !project_id) {
    return NextResponse.json({ error: "company_id and project_id required" }, { status: 400 });
  }

  // Get token for pinned integration user
  const userId = process.env.MCP_PROCORE_USER_ID;
  if (!userId) {
    return NextResponse.json({ error: "MCP_PROCORE_USER_ID not configured" }, { status: 500 });
  }

  const token = await getValidToken(company_id, userId);
  if (!token) {
    return NextResponse.json({ error: "No valid Procore token for integration user" }, { status: 401 });
  }

  const supabase = getSupabase();
  const claude = new Anthropic();

  // ── 1. Fetch albums ────────────────────────────────────────────────────────
  console.log(`[photo-classifier] Fetching albums for project ${project_id}`);
  const allAlbums = await fetchAlbums(token, company_id, project_id);
  const albums = album_id
    ? allAlbums.filter((a) => a.id === album_id)
    : allAlbums.filter((a) => a.count > 0);

  if (albums.length === 0) {
    return NextResponse.json({ error: "No albums found" }, { status: 404 });
  }

  // ── 2. Fetch location tree ─────────────────────────────────────────────────
  console.log(`[photo-classifier] Fetching location tree`);
  const locations = await getProjectLocations(token, parseInt(project_id), parseInt(company_id));
  const locationNodes: LocationNode[] = locations.map((l) => ({
    id: l.id,
    name: l.name ?? "",
    node_name: l.node_name ?? "",
  }));

  // ── 3. Process each album ──────────────────────────────────────────────────
  const results: {
    album_id: number;
    album_name: string;
    resolved_location: { id: number; path: string } | null;
    total_photos: number;
    already_classified: number;
    newly_classified: number;
    skipped: number;
    classifications: {
      photo_id: number;
      filename: string;
      subject: string;
      location_detail: string | null;
      confidence: number;
    }[];
  }[] = [];

  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalAlreadyDone = 0;

  for (const album of albums) {
    console.log(`[photo-classifier] Processing album "${album.name}" (${album.count} photos)`);

    // Resolve album to location
    const resolved = resolveAlbumToLocation(album.name, locationNodes);

    // Fetch photos in this album
    const photos = await fetchPhotosInAlbum(token, company_id, project_id, album.id);

    // Check which photos are already classified
    const { data: existing } = await supabase
      .from("photo_classifications")
      .select("procore_photo_id")
      .eq("company_id", company_id)
      .eq("project_id", project_id)
      .in("procore_photo_id", photos.map((p) => p.id));

    const existingIds = new Set((existing ?? []).map((e) => e.procore_photo_id));
    const newPhotos = photos.filter((p) => !existingIds.has(p.id));

    const albumResult = {
      album_id: album.id,
      album_name: album.name,
      resolved_location: resolved ? { id: resolved.locationId, path: resolved.locationPath } : null,
      total_photos: photos.length,
      already_classified: existingIds.size,
      newly_classified: 0,
      skipped: 0,
      classifications: [] as typeof results[0]["classifications"],
    };

    totalAlreadyDone += existingIds.size;

    if (newPhotos.length === 0) {
      results.push(albumResult);
      continue;
    }

    // Process in batches
    for (let i = 0; i < newPhotos.length; i += BATCH_SIZE) {
      const batch = newPhotos.slice(i, i + BATCH_SIZE);

      // Download thumbnails
      const batchPhotos: { index: number; base64: string; filename: string; photo: ProcoreImage }[] = [];
      for (let j = 0; j < batch.length; j++) {
        const photo = batch[j];
        const imgUrl = photo.thumbnail_url ?? photo.url;
        if (!imgUrl) {
          albumResult.skipped++;
          totalSkipped++;
          continue;
        }

        const base64 = await downloadThumbnail(imgUrl);
        if (!base64) {
          albumResult.skipped++;
          totalSkipped++;
          continue;
        }

        batchPhotos.push({
          index: j,
          base64,
          filename: photo.filename ?? `photo-${photo.id}`,
          photo,
        });
      }

      if (batchPhotos.length === 0) continue;

      // Classify batch
      try {
        const classifications = await classifyBatch(
          claude,
          batchPhotos.map((bp) => ({ index: bp.index, base64: bp.base64, filename: bp.filename }))
        );

        // Store results
        for (let k = 0; k < batchPhotos.length; k++) {
          const bp = batchPhotos[k];
          const cls = classifications[k] ?? {
            photo_index: k,
            subject: "unknown" as Subject,
            location_detail: null,
            confidence: 0,
          };

          const row = {
            company_id,
            project_id,
            procore_photo_id: bp.photo.id,
            prostore_file_id: bp.photo.prostore_file?.id ?? null,
            album_id: album.id,
            album_name: album.name,
            resolved_location_id: resolved?.locationId ?? null,
            resolved_location_path: resolved?.locationPath ?? null,
            subject: cls.subject,
            location_detail: cls.location_detail,
            confidence: cls.confidence,
            model: "claude-sonnet-4-6",
            prompt_version: PROMPT_VERSION,
            raw_response: cls,
          };

          const { error: insertErr } = await supabase
            .from("photo_classifications")
            .upsert(row, { onConflict: "company_id,project_id,procore_photo_id" });

          if (insertErr) {
            console.error(`[photo-classifier] Insert error for photo ${bp.photo.id}:`, insertErr);
          }

          albumResult.classifications.push({
            photo_id: bp.photo.id,
            filename: bp.filename,
            subject: cls.subject,
            location_detail: cls.location_detail,
            confidence: cls.confidence,
          });

          albumResult.newly_classified++;
          totalProcessed++;
        }
      } catch (err) {
        console.error(`[photo-classifier] Batch classification error:`, err);
      }

      await sleep(600);
    }

    results.push(albumResult);
  }

  // ── 4. Build review summary ────────────────────────────────────────────────
  const allClassifications = results.flatMap((r) => r.classifications);

  // Count by subject
  const byCounts: Record<string, number> = {};
  for (const c of allClassifications) {
    byCounts[c.subject] = (byCounts[c.subject] ?? 0) + 1;
  }

  // Low confidence
  const lowConfidence = allClassifications.filter(
    (c) => c.confidence < CONFIDENCE_THRESHOLD_REVIEW
  );
  const needsReview = allClassifications.filter(
    (c) => c.confidence >= CONFIDENCE_THRESHOLD_REVIEW && c.confidence < CONFIDENCE_THRESHOLD_CONFIDENT
  );
  const confident = allClassifications.filter(
    (c) => c.confidence >= CONFIDENCE_THRESHOLD_CONFIDENT
  );

  // Unresolved albums
  const unresolvedAlbums = results.filter((r) => !r.resolved_location);

  // Unknown location detail
  const unknownLocationDetail = allClassifications.filter(
    (c) => c.location_detail === null
  );

  const summary = {
    total_albums: results.length,
    total_photos: results.reduce((sum, r) => sum + r.total_photos, 0),
    already_classified: totalAlreadyDone,
    newly_classified: totalProcessed,
    skipped: totalSkipped,
    by_subject: byCounts,
    confidence: {
      confident: confident.length,
      needs_review: needsReview.length,
      low: lowConfidence.length,
    },
    unresolved_albums: unresolvedAlbums.map((r) => ({
      album_id: r.album_id,
      album_name: r.album_name,
      photo_count: r.total_photos,
    })),
    unknown_location_detail_count: unknownLocationDetail.length,
    low_confidence_items: lowConfidence.map((c) => ({
      photo_id: c.photo_id,
      filename: c.filename,
      subject: c.subject,
      confidence: c.confidence,
    })),
    needs_review_items: needsReview.map((c) => ({
      photo_id: c.photo_id,
      filename: c.filename,
      subject: c.subject,
      confidence: c.confidence,
    })),
  };

  return NextResponse.json({
    success: true,
    summary,
    albums: results,
  });
}
