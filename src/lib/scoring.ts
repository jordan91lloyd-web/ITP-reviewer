// ─── Company scoring content fetcher ─────────────────────────────────────────
// Retrieves the scoring guidelines for a given company, in priority order:
//   1. Supabase Storage — {company_id}/scoring-guidelines.docx (or .pdf)
//   2. Local static file — public/documents/ITP-QA-Scoring-Guidelines-v1.0.docx
//   3. Hardcoded fallback — FALLBACK_SCORING_CONTENT from prompt.ts
//
// Results are cached in memory for 5 minutes per company_id to avoid
// repeated Storage fetches on every review request.
//
// Never throws — always returns *some* content.

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import mammoth from "mammoth";
import { FALLBACK_SCORING_CONTENT } from "./prompt";

const BUCKET = "documents";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  content: string;
  source: "supabase" | "local" | "hardcoded";
  fetchedAt: number;
}

const cache = new Map<string, CacheEntry>();

export type ScoringSource = "supabase" | "local" | "hardcoded";

export interface ScoringContent {
  content: string;
  source: ScoringSource;
}

/**
 * Returns the scoring guidelines text for the given company.
 * Checks the in-memory cache first, then tries Supabase, local file, hardcoded.
 */
export async function getCompanyScoringContent(company_id: string): Promise<ScoringContent> {
  const cached = cache.get(company_id);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    console.log(`[scoring] Cache hit for company "${company_id}" (source: ${cached.source})`);
    return { content: cached.content, source: cached.source };
  }

  // ── 1. Try Supabase Storage ──────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const storagePath = `${company_id}/scoring-guidelines.docx`;

      const { data, error } = await supabase.storage
        .from(BUCKET)
        .download(storagePath);

      if (!error && data) {
        const arrayBuffer = await data.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const text = await extractDocxText(buffer);

        if (text.trim().length > 100) {
          console.log(
            `[scoring] Loaded from Supabase for company "${company_id}" ` +
            `(${text.length} chars)`
          );
          const entry: CacheEntry = { content: text, source: "supabase", fetchedAt: Date.now() };
          cache.set(company_id, entry);
          return { content: text, source: "supabase" };
        }
        console.warn(`[scoring] Supabase file for "${company_id}" was empty or too short — falling through`);
      } else if (error) {
        // Object not found is expected when no doc has been uploaded yet
        const isNotFound = error.message?.toLowerCase().includes("not found") ||
                           error.message?.toLowerCase().includes("does not exist");
        if (!isNotFound) {
          console.warn(`[scoring] Supabase download error for "${company_id}": ${error.message}`);
        }
      }
    } catch (err) {
      console.warn(`[scoring] Supabase fetch failed for "${company_id}":`, err instanceof Error ? err.message : err);
    }
  }

  // ── 2. Try local static file ─────────────────────────────────────────────
  try {
    const localPath = path.join(process.cwd(), "public", "documents", "ITP-QA-Scoring-Guidelines-v1.0.docx");
    if (fs.existsSync(localPath)) {
      const buffer = fs.readFileSync(localPath);
      const text = await extractDocxText(buffer);

      if (text.trim().length > 100) {
        console.log(`[scoring] Loaded from local file for company "${company_id}" (${text.length} chars)`);
        const entry: CacheEntry = { content: text, source: "local", fetchedAt: Date.now() };
        cache.set(company_id, entry);
        return { content: text, source: "local" };
      }
      console.warn(`[scoring] Local file was empty or too short — falling through`);
    }
  } catch (err) {
    console.warn(`[scoring] Local file read failed:`, err instanceof Error ? err.message : err);
  }

  // ── 3. Hardcoded fallback ────────────────────────────────────────────────
  console.log(`[scoring] Using hardcoded fallback for company "${company_id}"`);
  const entry: CacheEntry = { content: FALLBACK_SCORING_CONTENT, source: "hardcoded", fetchedAt: Date.now() };
  cache.set(company_id, entry);
  return { content: FALLBACK_SCORING_CONTENT, source: "hardcoded" };
}

/**
 * Extracts plain text from a .docx Buffer using mammoth.
 * Returns the raw text string.
 */
async function extractDocxText(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

/**
 * Clears the cache entry for a company — call after a new document is uploaded
 * so the next review picks up the fresh content immediately.
 */
export function invalidateScoringCache(company_id: string): void {
  cache.delete(company_id);
  console.log(`[scoring] Cache invalidated for company "${company_id}"`);
}
