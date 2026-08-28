// ─── Location tree helpers ────────────────────────────────────────────────────
// Procore returns locations as a flat list with parent_id and a breadcrumb
// `name` joined with ">". These helpers turn that into a tree the UI can browse.
//
// Deliberately pure — no network, no Procore knowledge beyond the shape.

import type { ProcoreLocation } from "@/lib/procore";

export interface LocationNode {
  id: number;
  /** Just this node, e.g. "G. 01" */
  node_name: string;
  /** Full breadcrumb, e.g. "A Ground Floor>Wellington>G. 01" */
  path: string;
  /** Path split into segments, for rendering. */
  segments: string[];
  /** 0 for a top-level node. */
  depth: number;
  parent_id: number | null;
  children: LocationNode[];
  /** Total nodes beneath this one, at any depth. */
  descendant_count: number;
}

const SEPARATOR = ">";

/** Splits a Procore breadcrumb path into its segments. */
export function pathSegments(name: string): string[] {
  return (name ?? "").split(SEPARATOR).map((s) => s.trim()).filter(Boolean);
}

/**
 * Builds a tree from Procore's flat location list.
 *
 * Nodes whose parent is missing from the input are treated as roots rather than
 * dropped — a truncated or filtered fetch should degrade visibly, not silently
 * lose apartments.
 *
 * Children are sorted by node_name using natural ordering, so "2" sorts before
 * "10" rather than after it. Procore's car spots and unit numbers rely on this.
 */
export function buildLocationTree(locations: ProcoreLocation[]): LocationNode[] {
  const byId = new Map<number, LocationNode>();

  for (const loc of locations) {
    const segments = pathSegments(loc.name);
    byId.set(loc.id, {
      id: loc.id,
      node_name: loc.node_name ?? segments[segments.length - 1] ?? "",
      path: loc.name ?? "",
      segments,
      depth: Math.max(0, segments.length - 1),
      parent_id: loc.parent_id,
      children: [],
      descendant_count: 0,
    });
  }

  const roots: LocationNode[] = [];

  for (const node of byId.values()) {
    const parent = node.parent_id !== null ? byId.get(node.parent_id) : undefined;
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const collator = new Intl.Collator("en-AU", { numeric: true, sensitivity: "base" });
  const sortRecursive = (nodes: LocationNode[]): number => {
    nodes.sort((a, b) => collator.compare(a.node_name, b.node_name));
    let total = 0;
    for (const n of nodes) {
      n.descendant_count = sortRecursive(n.children);
      total += 1 + n.descendant_count;
    }
    return total;
  };
  sortRecursive(roots);

  return roots;
}

/** Depth-first flatten, preserving the sorted order of the tree. */
export function flattenTree(nodes: LocationNode[]): LocationNode[] {
  const out: LocationNode[] = [];
  const walk = (list: LocationNode[]) => {
    for (const n of list) {
      out.push(n);
      walk(n.children);
    }
  };
  walk(nodes);
  return out;
}

/** Finds one node anywhere in the tree by id. */
export function findNode(nodes: LocationNode[], id: number): LocationNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    const hit = findNode(n.children, id);
    if (hit) return hit;
  }
  return null;
}

/**
 * Returns the direct children of a given node id — the usual "pick a parent,
 * tick its children" selection step.
 */
export function childrenOf(nodes: LocationNode[], parentId: number): LocationNode[] {
  return findNode(nodes, parentId)?.children ?? [];
}
