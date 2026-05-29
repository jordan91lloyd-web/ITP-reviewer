// ─── POST /api/resourcing/classify ────────────────────────────────────────────
// Classifies construction contract titles into construction programme stages
// using keyword matching. No AI call — pure synchronous string matching.
//
// Body: { items: Array<{ id: string, title: string }> }
// Returns: { classifications: Record<string, string> }

import { NextRequest, NextResponse } from "next/server";

const STAGE_RULES: Array<{ stage: string; keywords: string[] }> = [
  { stage: "Demolition", keywords: [
    "demo", "demolition",
  ]},
  { stage: "Excavation", keywords: [
    "excavat", "earthwork", "bulk earth", "rock break",
    "civil king", "civil work",
  ]},
  { stage: "Piling & Retention", keywords: [
    "pil", "micropile", "bored pier", "screw pile",
    "retention", "retaining", "shoring", "ground anchor",
  ]},
  { stage: "In-Ground Services", keywords: [
    "in-ground", "underground", "sewer", "drainage",
    "stormwater", "hydraulic", "conduit",
  ]},
  { stage: "Basement Construction", keywords: [
    "basement", "raft", "podium slab",
    "post tension", "shotcrete", "formwork",
    "concrete", "reinforc", " reo ", "footing", "slab",
  ]},
  { stage: "Structure", keywords: [
    "structural steel", "steel fabricat", "steel erect",
    "steel sub", "intumescent", "structure", "framing steel",
  ]},
  { stage: "Facade & Windows", keywords: [
    "facade", "cladding", "curtain wall",
    "aluminium window", "aluminum window", "glazing",
    "render", "external render", "window", "louvre",
    "external wall",
  ]},
  { stage: "Roofing", keywords: [
    "roof", "roofing",
  ]},
  { stage: "Services Rough-In", keywords: [
    "rough-in", "rough in", "first fix",
    "mechanical", "hvac", "aircon", "air con",
    "ventilat", "air condition", "ductwork",
    "electric", "switchboard", "conduit rough",
    "plumb rough", "fire rough", "sprinkler rough",
    "sprinkler", "fire", "wet fire", "dry fire",
    "plumb", "fyrebox", "firemaster",
  ]},
  { stage: "Partitions & Framing", keywords: [
    "partition", "framing", "stud wall",
    "light gauge", "metal stud",
  ]},
  { stage: "Sheeting", keywords: [
    "sheet", "plasterboard", "gyprock",
    "gyproc", "drywall", "shadowline",
  ]},
  { stage: "Waterproofing", keywords: [
    "waterproof", "tanking", "membrane",
    "wet area", "proseal", "liquid applied",
  ]},
  { stage: "Tiling", keywords: [
    "tile", "tiling", "tiler",
  ]},
  { stage: "Joinery", keywords: [
    "joinery", "cabinet", "kitchen",
    "vanity", "wardrobe", "joiner",
  ]},
  { stage: "Ceilings", keywords: [
    "ceiling", "soffit", "bulkhead",
    "suspended ceiling", "plaster ceiling",
  ]},
  { stage: "Painting", keywords: [
    "paint", "coating",
  ]},
  { stage: "Flooring", keywords: [
    "floor", "flooring", "timber floor",
    "carpet", "vinyl", "epoxy floor",
    "concrete polish", "floor sand",
    "floor finish", "screed",
  ]},
  { stage: "Services Fit-Off", keywords: [
    "fit-off", "fit off", "second fix",
    "final fix", "services fit",
  ]},
  { stage: "Fixtures & Appliances", keywords: [
    "fixture", "appliance", "tapware",
    "toilet", "basin", "sink", "oven",
    "dishwasher", "supply of appliance",
    "door hardware", "hardware supply",
  ]},
  { stage: "External Works", keywords: [
    "external", "landscap", "paving",
    "driveway", "fence", "gate", "pool",
    "external civil", "carpark", "line mark",
    "scaffold", "edge protect",
    "temporary works", "falsework",
    "balustrade", "handrail",
    "metal stair", "metalwork",
    "stair supply", "stair install",
    "roller shutter", "steel stair",
    "glass balustrade", "shower screen",
    "webforge",
  ]},
  { stage: "Testing & Commissioning", keywords: [
    "test", "commission", "inspect", "certif",
    "bca", "access consult", "acoustic",
    "survey", "geotechni", "assessment",
    "validation", "report", "consult",
    "engineer", "engineering", "architect",
    "moisture", "mould", "contamina", "remediat",
    "window test", "facade eng", "clean", "csia", "wash",
  ]},
  { stage: "Defects & Handover", keywords: [
    "defect", "handover", "rectif",
    "make good", "completion", "pc items",
    "practical completion",
  ]},
];

function classifyTitle(title: string): string {
  const lower = title.toLowerCase();
  for (const rule of STAGE_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw.toLowerCase()))) {
      return rule.stage;
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
