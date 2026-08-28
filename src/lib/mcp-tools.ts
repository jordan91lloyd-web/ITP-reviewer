// ─── Holdpoint MCP Tools ──────────────────────────────────────────────────────
// Read-only tools exposed over /api/mcp. All Procore calls reuse the confirmed
// helpers in src/lib/procore.ts — no new endpoint shapes are invented here.
//
// Procore identity (decided 28 Aug 2026):
//   • OAuth path  → acts as the token owner (procore_user_id on the token row)
//   • Static bearer path → no user is attached, so it falls back to the pinned
//     account in MCP_PROCORE_USER_ID.
//
// Every tool returns JSON as text and never throws — failures come back as
// { isError: true } so Claude can read the reason instead of getting a 500.

import { z } from "zod";
import type { createMcpHandler } from "mcp-handler";
import { getValidToken } from "@/lib/token-store";
import {
  getProcoreProjects,
  getInspections,
  getInspectionDetail,
  type ProcoreInspection,
  type ProcoreInspectionItem,
} from "@/lib/procore";

/** The `server` object handed to the createMcpHandler callback. */
type McpServerArg = Parameters<Parameters<typeof createMcpHandler>[0]>[0];

export interface McpToolContext {
  /** Procore user id this request acts as. Null means we could not resolve one. */
  procoreUserId: string | null;
  authPath: "static-bearer" | "oauth";
}

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;
const MAX_ITEMS_IN_DETAIL = 300;

// ── Helpers ──────────────────────────────────────────────────────────────────

function companyId(): number {
  const raw = process.env.FLEEK_COMPANY_ID;
  if (!raw) throw new Error("FLEEK_COMPANY_ID is not set in the environment.");
  return Number(raw);
}

/**
 * Resolves a fresh Procore access token for whoever this request is acting as.
 * Delegates to getValidToken(), which handles refresh. Never modifies it.
 */
async function accessTokenFor(ctx: McpToolContext): Promise<string> {
  if (!ctx.procoreUserId) {
    throw new Error(
      ctx.authPath === "static-bearer"
        ? "No Procore user to act as. Set MCP_PROCORE_USER_ID so the static bearer token has a pinned account."
        : "This OAuth token has no procore_user_id recorded against it. Reconnect the connector."
    );
  }
  const token = await getValidToken(String(companyId()), ctx.procoreUserId);
  if (!token) {
    throw new Error(
      `No valid Procore token for user ${ctx.procoreUserId}. Log in to Holdpoint with that Procore account, then try again.`
    );
  }
  return token;
}

function ok(payload: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
  };
}

function fail(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.error("[mcp-tools] error:", message);
  return {
    content: [{ type: "text" as const, text: `Error: ${message}` }],
    isError: true,
  };
}

function inspectionNumber(insp: ProcoreInspection): string | number | null {
  return insp.number ?? insp.inspection_number ?? insp.position_of_type ?? null;
}

/** Lean summary for list views — deliberately drops items and attachments. */
function trimInspectionSummary(insp: ProcoreInspection) {
  return {
    id: insp.id,
    name: insp.name,
    status: insp.status,
    number: inspectionNumber(insp),
    inspection_type: insp.inspection_type?.name ?? null,
    location: insp.location?.name ?? null,
    inspection_date: insp.inspection_date ?? null,
    updated_at: insp.updated_at,
    closed_at: insp.closed_at,
    item_count: insp.item_count ?? insp.item_total ?? insp.items_count ?? null,
  };
}

function trimItem(item: ProcoreInspectionItem) {
  const response = item.response ?? item.list_item_responses?.[0] ?? null;
  const attachmentCount =
    (item.attachments?.length ?? 0) + (response?.attachments?.length ?? 0);
  const photoCount =
    (item.photos?.length ?? 0) + (response?.photos?.length ?? 0);

  return {
    id: item.id,
    name: item.name ?? null,
    description: item.description ?? null,
    status: item.status ?? null,
    answer: response?.answer ?? null,
    comment: response?.comment ?? null,
    attachment_count: attachmentCount,
    photo_count: photoCount,
  };
}

/**
 * Trims the extended inspection payload down to something readable.
 * Full detail (attachment URLs, photo blobs, comment history) is intentionally
 * dropped — this is a read-only browse tool, not the review pipeline.
 */
function trimInspectionDetail(insp: ProcoreInspection) {
  let itemBudget = MAX_ITEMS_IN_DETAIL;
  let truncated = false;

  const takeItems = (items: ProcoreInspectionItem[] | null | undefined) => {
    const list = items ?? [];
    if (list.length > itemBudget) truncated = true;
    const slice = list.slice(0, itemBudget).map(trimItem);
    itemBudget -= slice.length;
    return slice;
  };

  const sections = insp.sections
    ? insp.sections.map((s) => ({
        id: s.id,
        name: s.name,
        position: s.position,
        items: takeItems(s.items),
      }))
    : null;

  const inspectors =
    insp.inspectors ?? (insp.inspector ? [insp.inspector] : []);

  return {
    id: insp.id,
    name: insp.name,
    status: insp.status,
    number: inspectionNumber(insp),
    description: insp.description,
    inspection_type: insp.inspection_type?.name ?? null,
    trade: insp.trade?.name ?? null,
    location: insp.location?.name ?? null,
    inspectors: inspectors.map((i) => i.name),
    responsible_contractor: insp.responsible_contractor?.name ?? null,
    inspection_date: insp.inspection_date ?? null,
    due_at: insp.due_at ?? insp.due_date ?? null,
    created_at: insp.created_at,
    updated_at: insp.updated_at,
    closed_at: insp.closed_at,
    counts: {
      total: insp.item_count ?? insp.item_total ?? insp.items_count ?? null,
      conforming: insp.conforming_item_count ?? insp.conforming_count ?? null,
      deficient: insp.deficient_item_count ?? insp.deficient_count ?? null,
      na: insp.na_item_count ?? insp.not_applicable_count ?? null,
      not_inspected: insp.not_inspected_item_count ?? null,
    },
    sections,
    items: sections ? null : takeItems(insp.items),
    items_truncated: truncated,
    items_truncated_note: truncated
      ? `Item list capped at ${MAX_ITEMS_IN_DETAIL}. Open the inspection in Procore for the full list.`
      : null,
  };
}

// ── Registration ─────────────────────────────────────────────────────────────

export function registerHoldpointTools(
  server: McpServerArg,
  ctx: McpToolContext
) {
  // ── ping ───────────────────────────────────────────────────────────────────
  server.registerTool(
    "ping",
    {
      title: "Ping",
      description:
        "Health check. Confirms the Holdpoint MCP server is reachable and reports which Procore account this session is acting as.",
    },
    async () => ({
      content: [
        {
          type: "text" as const,
          text:
            `pong — Holdpoint MCP server is alive. ` +
            `auth=${ctx.authPath} procore_user_id=${ctx.procoreUserId ?? "none"}`,
        },
      ],
    })
  );

  // ── list_projects ──────────────────────────────────────────────────────────
  server.registerTool(
    "list_projects",
    {
      title: "List Procore projects",
      description:
        "Lists Procore projects in the Fleek company that this account can access. Returns id, name, display_name and project_number only.",
      inputSchema: z.object({
        active_only: z
          .boolean()
          .optional()
          .describe("Only return active projects. Defaults to true."),
        limit: z
          .number()
          .int()
          .min(1)
          .max(MAX_LIMIT)
          .optional()
          .describe(`Max projects to return. Defaults to ${DEFAULT_LIMIT}.`),
      }),
    },
    async ({ active_only, limit }) => {
      try {
        const token = await accessTokenFor(ctx);
        const company = companyId();
        const all = await getProcoreProjects(token, company);

        const filtered = active_only === false ? all : all.filter((p) => p.active);
        const cap = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT);

        return ok({
          company_id: company,
          total_matching: filtered.length,
          returned: Math.min(filtered.length, cap),
          projects: filtered.slice(0, cap).map((p) => ({
            id: p.id,
            name: p.name,
            display_name: p.display_name,
            project_number: p.project_number,
          })),
        });
      } catch (err) {
        return fail(err);
      }
    }
  );

  // ── list_inspections ───────────────────────────────────────────────────────
  server.registerTool(
    "list_inspections",
    {
      title: "List inspections on a project",
      description:
        "Lists inspections (Procore checklist lists) on a project. Returns summaries only — use get_inspection_detail for items and responses. Filter by status or by name prefix (e.g. 'itp') to narrow the list.",
      inputSchema: z.object({
        project_id: z
          .number()
          .int()
          .describe("Procore project id. Get this from list_projects."),
        status: z
          .string()
          .optional()
          .describe("Filter by status, case-insensitive. e.g. 'closed' or 'open'."),
        name_starts_with: z
          .string()
          .optional()
          .describe("Filter to inspections whose name starts with this, case-insensitive. e.g. 'itp'."),
        limit: z
          .number()
          .int()
          .min(1)
          .max(MAX_LIMIT)
          .optional()
          .describe(`Max inspections to return. Defaults to ${DEFAULT_LIMIT}.`),
      }),
    },
    async ({ project_id, status, name_starts_with, limit }) => {
      try {
        const token = await accessTokenFor(ctx);
        const company = companyId();
        const all = await getInspections(token, project_id, company);

        const wantStatus = status?.trim().toLowerCase();
        const wantPrefix = name_starts_with?.trim().toLowerCase();

        const filtered = all.filter((insp) => {
          if (wantStatus && (insp.status ?? "").toLowerCase() !== wantStatus) return false;
          if (wantPrefix && !(insp.name ?? "").toLowerCase().startsWith(wantPrefix)) return false;
          return true;
        });

        const cap = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT);

        return ok({
          project_id,
          total_on_project: all.length,
          total_matching: filtered.length,
          returned: Math.min(filtered.length, cap),
          filters: { status: wantStatus ?? null, name_starts_with: wantPrefix ?? null },
          inspections: filtered.slice(0, cap).map(trimInspectionSummary),
        });
      } catch (err) {
        return fail(err);
      }
    }
  );

  // ── get_inspection_detail ──────────────────────────────────────────────────
  server.registerTool(
    "get_inspection_detail",
    {
      title: "Get inspection detail",
      description:
        "Returns one inspection with its sections, items and responses. Attachment and photo URLs are not returned — only counts.",
      inputSchema: z.object({
        project_id: z
          .number()
          .int()
          .describe("Procore project id the inspection belongs to."),
        inspection_id: z
          .number()
          .int()
          .describe("Procore inspection (checklist list) id. Get this from list_inspections."),
      }),
    },
    async ({ project_id, inspection_id }) => {
      try {
        const token = await accessTokenFor(ctx);
        const company = companyId();
        const insp = await getInspectionDetail(token, project_id, inspection_id, company);
        return ok({ project_id, inspection: trimInspectionDetail(insp) });
      } catch (err) {
        return fail(err);
      }
    }
  );
}
