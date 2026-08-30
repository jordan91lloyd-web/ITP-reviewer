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
  getProjectChecklistTemplates,
  getProjectLocations,
  createInspectionFromTemplate,
  updateInspection,
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

/**
 * Hard cap on how many inspections one call may create.
 *
 * Not a performance limit — a blast-radius limit. A mistake caps out at 25
 * records to unpick rather than hundreds, and a run this size stays reviewable
 * line by line before it fires.
 */
const MAX_CREATE_PER_CALL = 25;

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

  // ── list_templates ─────────────────────────────────────────────────────────
  server.registerTool(
    "list_templates",
    {
      title: "List project inspection templates",
      description:
        "Lists the PROJECT-level inspection templates on a project — the copies carrying any project-specific areas. Use these ids when creating inspections; company-level templates would produce ITPs without the project's areas.",
      inputSchema: z.object({
        project_id: z.number().int().describe("Procore project id. Get this from list_projects."),
        contains: z
          .string()
          .optional()
          .describe("Case-insensitive substring filter on the template name, e.g. '011' or 'waterproofing'."),
        limit: z.number().int().min(1).max(MAX_LIMIT).optional(),
      }),
    },
    async ({ project_id, contains, limit }) => {
      try {
        const token = await accessTokenFor(ctx);
        const company = companyId();
        const all = await getProjectChecklistTemplates(token, project_id, company);

        const needle = contains?.trim().toLowerCase();
        const filtered = needle
          ? all.filter((t) => (t.name ?? "").toLowerCase().includes(needle))
          : all;

        const cap = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT);

        return ok({
          project_id,
          total_on_project: all.length,
          total_matching: filtered.length,
          returned: Math.min(filtered.length, cap),
          templates: filtered.slice(0, cap).map((t) => ({
            id: t.id,
            name: (t.name ?? "").trim(),
            inspection_type: t.inspection_type?.name ?? null,
            trade: t.trade?.name?.trim() ?? null,
          })),
        });
      } catch (err) {
        return fail(err);
      }
    }
  );

  // ── list_locations ─────────────────────────────────────────────────────────
  server.registerTool(
    "list_locations",
    {
      title: "List project locations",
      description:
        "Lists a project's locations. Locations are a tree; each row's `path` is the full breadcrumb joined with '>' (e.g. 'A Ground Floor>Wellington>G. 01'). Filter with path_contains to narrow to one building or level. Fully paged — a project can have hundreds.",
      inputSchema: z.object({
        project_id: z.number().int().describe("Procore project id."),
        path_contains: z
          .string()
          .optional()
          .describe("Case-insensitive substring filter on the full path, e.g. 'Wellington'."),
        depth: z
          .number()
          .int()
          .min(0)
          .optional()
          .describe("Only return nodes at this depth. 0 is top level. Apartments on a level>building>apartment>room tree are depth 2."),
        limit: z.number().int().min(1).max(MAX_LIMIT).optional(),
      }),
    },
    async ({ project_id, path_contains, depth, limit }) => {
      try {
        const token = await accessTokenFor(ctx);
        const company = companyId();
        const all = await getProjectLocations(token, project_id, company);

        const needle = path_contains?.trim().toLowerCase();

        const withDepth = all.map((l) => ({
          id: l.id,
          path: l.name ?? "",
          node_name: l.node_name ?? "",
          depth: Math.max(0, (l.name ?? "").split(">").length - 1),
          parent_id: l.parent_id,
        }));

        const filtered = withDepth.filter((l) => {
          if (needle && !l.path.toLowerCase().includes(needle)) return false;
          if (depth !== undefined && l.depth !== depth) return false;
          return true;
        });

        const collator = new Intl.Collator("en-AU", { numeric: true, sensitivity: "base" });
        filtered.sort((a, b) => collator.compare(a.path, b.path));

        const cap = Math.min(limit ?? DEFAULT_LIMIT, MAX_LIMIT);

        return ok({
          project_id,
          total_on_project: all.length,
          total_matching: filtered.length,
          returned: Math.min(filtered.length, cap),
          filters: { path_contains: needle ?? null, depth: depth ?? null },
          locations: filtered.slice(0, cap),
        });
      } catch (err) {
        return fail(err);
      }
    }
  );

  // ── create_inspections ─────────────────────────────────────────────────────
  // The only tool here that writes. Read the description before changing it.
  server.registerTool(
    "create_inspections",
    {
      title: "Create inspections from a template",
      description:
        "WRITES TO LIVE PROCORE. Creates one inspection per location from a project template, then reads them back to confirm what actually landed. " +
        "The inspection inherits the template's name — there is no name to set. " +
        "Only call this after the person has seen the exact list of locations and agreed to it. " +
        `Capped at ${MAX_CREATE_PER_CALL} per call. Creating is not reversible from here — inspections must be deleted in Procore.`,
      inputSchema: z.object({
        project_id: z.number().int().describe("Procore project id."),
        list_template_id: z
          .number()
          .int()
          .describe("PROJECT-level template id from list_templates. Not a company template."),
        location_ids: z
          .array(z.number().int())
          .min(1)
          .max(MAX_CREATE_PER_CALL)
          .describe("One inspection is created per location id, in order."),
        inspection_date: z
          .string()
          .optional()
          .describe("ISO date for all of them, e.g. '2026-08-28'. Omit to leave blank."),
        description_from_location: z
          .boolean()
          .optional()
          .describe(
            "Set each inspection's description to its location's leaf name — the apartment code, e.g. 'B201'. " +
            "This is how one inspection is told apart from another in the register, since they all share the template's name."
          ),
        description: z
          .string()
          .optional()
          .describe("A fixed description for all of them. Ignored if description_from_location is true."),
      }),
    },
    async ({ project_id, list_template_id, location_ids, inspection_date, description_from_location, description }) => {
      try {
        const token = await accessTokenFor(ctx);
        const company = companyId();

        if (location_ids.length > MAX_CREATE_PER_CALL) {
          throw new Error(
            `Refusing to create ${location_ids.length} inspections in one call. The cap is ${MAX_CREATE_PER_CALL}.`
          );
        }

        const unique = Array.from(new Set(location_ids));
        if (unique.length !== location_ids.length) {
          throw new Error(
            "location_ids contains duplicates. Deduplicate first — a duplicate would silently create two inspections on the same location."
          );
        }

        // Resolve names up front so the result is readable, and so a bad
        // location id fails before anything is written.
        const allLocations = await getProjectLocations(token, project_id, company);
        const locById = new Map(allLocations.map((l) => [l.id, l]));
        const missing = unique.filter((id) => !locById.has(id));
        if (missing.length > 0) {
          throw new Error(
            `These location ids are not on project ${project_id}: ${missing.join(", ")}. Nothing was created.`
          );
        }

        const created: Array<{
          location_id: number;
          location_path: string;
          inspection_id: number | null;
          inspection_name: string | null;
          error: string | null;
        }> = [];

        // Serial, not parallel. Procore rate-limits this project hard enough
        // that the report tab had to drop to batches of 2 with a pause.
        for (const locationId of unique) {
          const loc = locById.get(locationId)!;
          try {
            const thisDescription = description_from_location
              ? (loc.node_name ?? "").trim() || undefined
              : description;

            const insp = await createInspectionFromTemplate(token, project_id, company, {
              list_template_id,
              location_id: locationId,
              inspection_date,
              description: thisDescription,
            });
            created.push({
              location_id: locationId,
              location_path: loc.name ?? "",
              inspection_id: insp?.id ?? null,
              inspection_name: insp?.name ?? null,
              error: insp?.id ? null : "Procore returned 2xx but no inspection id.",
            });
          } catch (err) {
            created.push({
              location_id: locationId,
              location_path: loc.name ?? "",
              inspection_id: null,
              inspection_name: null,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          await new Promise((r) => setTimeout(r, 600));
        }

        // Never trust a 2xx. Read the project back and confirm each id exists.
        const createdIds = created
          .map((c) => c.inspection_id)
          .filter((id): id is number => typeof id === "number");

        let confirmedIds = new Set<number>();
        let verifyError: string | null = null;
        try {
          const onProject = await getInspections(token, project_id, company);
          const present = new Set(onProject.map((i) => i.id));
          confirmedIds = new Set(createdIds.filter((id) => present.has(id)));
        } catch (err) {
          verifyError = err instanceof Error ? err.message : String(err);
        }

        const succeeded = created.filter((c) => c.inspection_id && confirmedIds.has(c.inspection_id));
        const failed = created.filter((c) => c.error !== null);
        const unverified = created.filter(
          (c) => c.error === null && c.inspection_id !== null && !confirmedIds.has(c.inspection_id)
        );

        return ok({
          project_id,
          list_template_id,
          requested: unique.length,
          confirmed_created: succeeded.length,
          failed: failed.length,
          created_but_not_confirmed: unverified.length,
          verify_error: verifyError,
          results: created.map((c) => ({
            ...c,
            confirmed: c.inspection_id !== null && confirmedIds.has(c.inspection_id),
          })),
        });
      } catch (err) {
        return fail(err);
      }
    }
  );

  // ── set_inspection_descriptions ────────────────────────────────────────────
  server.registerTool(
    "set_inspection_descriptions",
    {
      title: "Set descriptions on existing inspections",
      description:
        "WRITES TO LIVE PROCORE. Sets the description on inspections that already exist — typically the apartment code, so they can be told apart in the register. " +
        "Does not touch items, responses or anything else. Reads each one back afterwards to confirm the description actually changed.",
      inputSchema: z.object({
        project_id: z.number().int(),
        updates: z
          .array(
            z.object({
              inspection_id: z.number().int(),
              description: z.string().min(1),
            })
          )
          .min(1)
          .max(MAX_CREATE_PER_CALL),
      }),
    },
    async ({ project_id, updates }) => {
      try {
        const token = await accessTokenFor(ctx);
        const company = companyId();

        const results: Array<{
          inspection_id: number;
          description: string;
          confirmed: boolean;
          actual_description: string | null;
          error: string | null;
        }> = [];

        for (const u of updates) {
          try {
            const updated = await updateInspection(token, project_id, company, u.inspection_id, {
              description: u.description,
            });
            const actual = (updated?.description ?? "").trim();
            results.push({
              inspection_id: u.inspection_id,
              description: u.description,
              confirmed: actual === u.description.trim(),
              actual_description: actual || null,
              error: null,
            });
          } catch (err) {
            results.push({
              inspection_id: u.inspection_id,
              description: u.description,
              confirmed: false,
              actual_description: null,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          await new Promise((r) => setTimeout(r, 500));
        }

        return ok({
          project_id,
          requested: updates.length,
          confirmed: results.filter((r) => r.confirmed).length,
          failed: results.filter((r) => r.error !== null).length,
          results,
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
