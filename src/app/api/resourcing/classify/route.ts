// ─── POST /api/resourcing/classify ────────────────────────────────────────────
// Classifies construction contract titles into trade categories using keyword
// matching. No AI call — pure synchronous string matching.
//
// Body: { items: Array<{ id: string, title: string }> }
// Returns: { classifications: Record<string, string> }

import { NextRequest, NextResponse } from "next/server";

const TRADE_RULES: Array<{ trade: string; keywords: string[] }> = [
  { trade: "Demolition", keywords: [
    "demo", "demolition", "excavat",
    "earthwork", "bulk excav", "rock break",
    "bulk earth",
  ]},
  { trade: "Piling", keywords: [
    "pil", "micropile", "bored pier",
    "screw pile", "ground anchor",
  ]},
  { trade: "Concrete", keywords: [
    "concrete", "formwork", "reinforc",
    " reo ", "shotcrete", "post tension",
    "slip form", "in-situ", "precast",
    "pour", "footing", "slab",
  ]},
  { trade: "Waterproofing", keywords: [
    "waterproof", "tanking", "membrane",
    "wet area", "proseal", "liquid",
  ]},
  { trade: "Structural Steel", keywords: [
    "structural steel", "steel fabricat",
    "steel erect", "steel sub", "steel work",
    "intumescent",
  ]},
  { trade: "Facade", keywords: [
    "facade", "cladding", "curtain wall",
    "aluminium window", "aluminum window",
    "glazing", "render", "external render",
    "window", "roofing", "roof",
  ]},
  { trade: "Carpentry", keywords: [
    "carpentry", "carpenter", "joinery",
    "timber floor", "flooring install",
    "floor sand", "door frame", "barn door",
    "walls and ceil", "partition",
    "wall and part", "framing", "fix out",
    "fitout", "fit out", "fit-out",
    "timber window", "door supply",
    "change of hand door", "ezy jamb",
  ]},
  { trade: "Tiling", keywords: [
    "tile", "tiling", "tiler",
  ]},
  { trade: "Painting", keywords: [
    "paint", "coating",
  ]},
  { trade: "Electrical", keywords: [
    "electric", "power install",
    "data install", "comms", "ev charg",
    "switchboard", "lighting install",
  ]},
  { trade: "Mechanical", keywords: [
    "mechanical", "hvac", "aircon",
    "air con", "ventilat", "air condition",
    "ductwork",
  ]},
  { trade: "Plumbing", keywords: [
    "plumb", "hydraulic", "stormwater",
    "drainage", "sewer", "sanitary",
  ]},
  { trade: "Fire Services", keywords: [
    "fire", "sprinkler", "fyrebox",
    "firemaster", "smoke curtain",
    "fire curtain", "fire shutter",
    "ignis", "wet fire", "dry fire",
  ]},
  { trade: "Lift", keywords: [
    "lift", "elevator", "car stacker",
    "spacepark", "hoist", "escalator",
  ]},
  { trade: "Scaffolding", keywords: [
    "scaffold", "edge protect",
    "temporary works", "falsework",
  ]},
  { trade: "Metal & Balustrades", keywords: [
    "balustrade", "handrail",
    "metal stair", "metalwork",
    "stair supply", "stair install",
    "roller shutter", "steel stair",
    "glass balustrade", "shower screen",
    "webforge", "louvre",
  ]},
  { trade: "Consulting", keywords: [
    "consult", "engineer", "engineering",
    "architect", "bca", "access consult",
    "acoustic", "survey", "geotechni",
    "environmental", "assessment",
    "inspection", "testing", "report",
    "validation", "certif", "design",
    "hydraulic engineer", "structural eng",
    "civil eng", "fire eng", "facade eng",
    "moisture", "mould", "contamina",
    "remediat", "window test", "forma eng",
  ]},
  { trade: "Cleaning", keywords: [
    "clean", "csia", "wash",
  ]},
];

function classifyTitle(title: string): string {
  const lower = title.toLowerCase();
  for (const rule of TRADE_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      return rule.trade;
    }
  }
  return "Other";
}

export async function POST(request: NextRequest) {
  let items: Array<{ id: string; title: string }>;
  try {
    const body = await request.json() as { items?: unknown };
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ classifications: {} });
    }
    items = body.items as Array<{ id: string; title: string }>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const classifications = Object.fromEntries(
    items.map(item => [item.id, classifyTitle(item.title)]),
  );

  return NextResponse.json({ classifications });
}
