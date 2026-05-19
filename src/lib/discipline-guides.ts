// ─── Discipline-specific scoring guides ───────────────────────────────────────
// Each guide provides targeted evidence requirements and scoring cues for a
// specific construction discipline. The correct guide is appended to the base
// scoring guidelines before each review so Claude has discipline-aware context.
//
// detectDiscipline(itpName) uses keyword matching against the ITP name/title
// to pick the most relevant guide. Returns null when no confident match exists
// (the base scoring guidelines alone are used in that case).

export interface DisciplineGuide {
  id:       string;
  name:     string;
  keywords: string[];   // matched case-insensitively against ITP name
  content:  string;     // plain text injected into the system prompt
}

// ── Guide content ─────────────────────────────────────────────────────────────

export const DISCIPLINE_GUIDES: DisciplineGuide[] = [
  // ── 1. Reinforcement / Rebar ────────────────────────────────────────────────
  {
    id:       "reinforcement",
    name:     "Reinforcement / Rebar",
    keywords: ["reinforc", "rebar", "reo ", "re bar", "bar schedule", "bar placement", "bending schedule", "lapping", "cover block"],
    content: `
## Discipline-Specific Scoring Guide: Reinforcement / Rebar (Tier 1)

### Critical evidence for full D1 (Engineer Verification)
- Signed-off engineer inspection checklist or RFI response covering bar size, spacing, cover, laps, and anchorage
- Qualified inspector (NATA, RMS-accredited, or equivalent) sign-off on completed reinforcement layout
- Pre-pour inspection certificate issued by the certifying engineer

### Critical evidence for full D2 (Technical Testing)
- Mill certificates (heat/batch numbers) for all steel used — certificates must reference bar grade (e.g., 500N) and match quantities in the bar schedule
- Bending and bar schedules signed by the responsible structural engineer
- Documented hold point or witness point sign-off before pour

### Critical evidence for full D3 (Form Completeness)
- Completed ITP checklist with every line item answered (Yes/Pass/N/A — no blanks)
- Reference to approved structural drawings (drawing numbers and revisions noted)
- Cover measurement records or spacer block records

### Critical evidence for full D4 (Material Traceability)
- Mill certificate heat numbers cross-referenced to delivery docket numbers
- Delivery dockets retained and referenced in the ITP

### Critical evidence for full D5 (Physical Evidence)
- Dated photographs of completed reinforcement from at least two angles (plan and elevation)
- Photos showing cover blocks / chairs in place
- Photo showing bar laps, starters, and any coupler locations

### Common scoring triggers
- MISSING mill certificates → apply "Missing" to D2 (not Partial) — mill certs are non-negotiable for Tier 1
- Engineer inspection present but cover not measured → D3 Partial, not Full
- Photos present but taken after concrete has been poured → note but do not penalise if the pre-pour certificate is present
- Unsigned bar schedule → D3 Partial
- Structural engineer sign-off is the key D1 criterion — inspector sign-off alone is D1 Partial for Tier 1
`,
  },

  // ── 2. Concrete Pour ────────────────────────────────────────────────────────
  {
    id:       "concrete",
    name:     "Concrete Pour",
    keywords: ["concrete", "pour", "slab pour", "column pour", "beam pour", "foundation pour", "footing pour", "soffit", "placement of concrete"],
    content: `
## Discipline-Specific Scoring Guide: Concrete Pour (Tier 1)

### Critical evidence for full D1 (Engineer Verification)
- Pre-pour inspection release signed by the certifying structural engineer or their nominated representative
- Concrete batch plant approval or plant NATA accreditation reference
- Concrete pump or truck delivery certificates signed off by supervisor

### Critical evidence for full D2 (Technical Testing)
- Concrete mix design / mix approval certificates for the specific grade (e.g., 32 MPa, 40 MPa)
- Slump test records (at point of discharge) — each truck or every 50 m³ minimum
- Concrete cylinder / cube sample sets: cure dates, break dates, 7-day and 28-day results
- Temperature records where early-strength or cold-weather pouring applies

### Critical evidence for full D3 (Form Completeness)
- Completed ITP checklist referencing approved formwork, reinforcement, and concrete grade
- Pour sequence documentation where multiple lifts or pours are involved
- Admixture or additive details if used

### Critical evidence for full D4 (Material Traceability)
- Batch delivery dockets for every truck (batch number, water/cement ratio, actual slump at batch plant)
- Mix design approval from the certifying engineer referenced in the ITP

### Critical evidence for full D5 (Physical Evidence)
- Dated photographs of formwork before pour, placement in progress, and finished surface
- Cylinder/cube sampling photo (samples being taken on site)

### Common scoring triggers
- No 28-day break results yet → acceptable if 7-day results are present and pour date is recent; note it
- Slump test records missing → D2 Partial (significant deduction — slump is a key QC measure)
- Mix design approval absent but delivery dockets present → D4 Partial
- No pre-pour sign-off at all → D1 Missing for Tier 1 — this is a critical gap
`,
  },

  // ── 3. Formwork ─────────────────────────────────────────────────────────────
  {
    id:       "formwork",
    name:     "Formwork",
    keywords: ["formwork", "falsework", "shoring", "propping", "prop design", "form stripping"],
    content: `
## Discipline-Specific Scoring Guide: Formwork (Tier 1)

### Critical evidence for full D1 (Engineer Verification)
- Formwork design by a licensed structural engineer (brief + calculations or standard company-approved system)
- Site engineer inspection of erected formwork before pour sign-off
- Independent or third-party check where propping loads exceed typical residential spans

### Critical evidence for full D2 (Technical Testing)
- Load calculations or proprietary system engineering certificates (e.g., Hünnebeck, Doka, Peri approval)
- Formwork stripping criteria referencing minimum concrete strength (cylinder break result)
- Stripping inspection sign-off noting achieved concrete strength at time of strip

### Critical evidence for full D3 (Form Completeness)
- Completed ITP checklist: formwork plumb and level, ties correctly spaced, penetrations sealed
- Reference to approved drawings (section and plan showing form arrangement)
- Chamfer strips, form release agent, and penetration sleeve records

### Critical evidence for full D4 (Material Traceability)
- Proprietary product specs (ply thickness, tie rod grade) referenced or attached

### Critical evidence for full D5 (Physical Evidence)
- Photographs of erected formwork from multiple angles before concrete placement
- Photo of any temporary works engineer inspection tag or sign-off notice

### Common scoring triggers
- No formwork design at all for suspended elements → D1 Missing
- Standard company-approved system with inspection sign-off → D1 Full
- Strip certificate present but no cylinder break reference → D2 Partial
`,
  },

  // ── 4. Piling / Foundations ─────────────────────────────────────────────────
  {
    id:       "piling",
    name:     "Piling / Foundations",
    keywords: ["pil", "pile", "bored pile", "driven pile", "micropile", "helical pier", "caisson", "raft", "pad footing", "strip footing", "foundation"],
    content: `
## Discipline-Specific Scoring Guide: Piling / Foundations (Tier 1)

### Critical evidence for full D1 (Engineer Verification)
- Geotechnical report or bore log confirming founding conditions match design assumptions
- Structural engineer sign-off on pile layout, founding depth, set criteria (driven) or socket length (bored)
- Third-party geotechnical inspector attendance and report for each pile/group

### Critical evidence for full D2 (Technical Testing)
- Pile integrity test (PIT/PDA) or static load test results for nominated test piles
- Concrete mix design and cylinder results for cast-in-situ piles
- Weld inspection / NDT records for steel tube piles
- Dynamic monitoring reports (CAPWAP analysis) for driven piles

### Critical evidence for full D3 (Form Completeness)
- Pile schedule showing ID, location RL, design length, actual founding depth, set/refusal
- Completed ITP per pile or pile group (all rows answered)
- Reinforcement cage inspection sign-off before concrete placement

### Critical evidence for full D4 (Material Traceability)
- Mill certificates for reinforcement cages and structural steel
- Concrete batch delivery dockets referenced to pile ID

### Critical evidence for full D5 (Physical Evidence)
- Photos of cage inspection, concrete placement, and rig setup
- Survey setout record for pile positions

### Common scoring triggers
- No geotechnical report → D1 Partial at best (fundamental gap for Tier 1)
- PDA results pending → acceptable if static load test or PIT is present; note status
`,
  },

  // ── 5. Waterproofing (Basement / Below-Grade) ───────────────────────────────
  {
    id:       "waterproofing-basement",
    name:     "Waterproofing – Basement / Below-Grade",
    keywords: ["basement waterproof", "below slab waterproof", "podium waterproof", "tanking", "sub-slab waterproof", "retaining wall waterproof", "external waterproof"],
    content: `
## Discipline-Specific Scoring Guide: Waterproofing – Basement / Below-Grade (Tier 2)

### Critical evidence for full D1 (Engineer Verification)
- Waterproofing subcontractor pre-start meeting record and approved method statement
- Specialist waterproofing inspector (ACRA-certified or manufacturer-approved) attendance record for critical stages
- Building surveyor or engineer inspection at substrate approval, application, and protection stages

### Critical evidence for full D2 (Technical Testing)
- Flood test / hose test results for all trafficable deck or planter areas above basement
- Membrane sample or material test certificates (DPC thickness, tensile strength per AS 4858 or AS 3740)
- Primer adhesion pull-off test records where epoxy or cementitious coating applied

### Critical evidence for full D3 (Form Completeness)
- Completed ITP with substrate preparation, primer application, membrane application, and protection layer all signed off
- Approved product data sheet and method statement referenced
- Hold point releases for each stage (substrate, primer, membrane, protection board)

### Critical evidence for full D4 (Material Traceability)
- Product batch numbers on installation report or delivery dockets
- Certificate of compliance from manufacturer or certified applicator

### Critical evidence for full D5 (Physical Evidence)
- Photographs of substrate prepared, primer applied, membrane applied (including upstands and details), and protection board installed
- Flood test photos showing water level and duration (minimum 24 hours for most authorities)

### Common scoring triggers
- No flood test at all → D2 Missing (critical for Tier 2 waterproofing)
- Manufacturer-approved applicator certificate → upgrades D1 to Full if combined with inspection records
- Protection layer installed before inspection photo → D5 Partial, flag for clarification
`,
  },

  // ── 6. Waterproofing (Wet Areas) ────────────────────────────────────────────
  {
    id:       "waterproofing-wetarea",
    name:     "Waterproofing – Wet Areas",
    keywords: ["wet area waterproof", "bathroom waterproof", "laundry waterproof", "shower waterproof", "balcony waterproof", "planter box waterproof"],
    content: `
## Discipline-Specific Scoring Guide: Waterproofing – Wet Areas (Tier 2)

### Critical evidence for full D1 (Engineer Verification)
- Licensed waterproofer certificate (state waterproofing licence) on file
- Certifying inspector (building surveyor, private certifier, or licensed inspector) sign-off at pre-tile inspection
- Approved method statement and product data sheet submitted and accepted

### Critical evidence for full D2 (Technical Testing)
- Flood/ponding test result — 25 mm depth for 24 hours per AS 3740 (or authority equivalent)
- Membrane thickness wet film records (comb gauge readings per room)
- Curing period confirmed before tiling

### Critical evidence for full D3 (Form Completeness)
- Completed ITP per apartment/room/level (not one ITP for the whole building)
- Reference to approved drawings showing extent of waterproofing and upstand heights
- All substrate, primer, membrane, and test rows answered

### Critical evidence for full D4 (Material Traceability)
- Product batch numbers on installation report or delivery dockets
- Warranty or applicator compliance certificate

### Critical evidence for full D5 (Physical Evidence)
- Photos of each wet area before tiling (membrane visible, upstands to height)
- Flood test photos with date visible

### Common scoring triggers
- One ITP for 200 apartments → D3 Partial (insufficient granularity)
- Licensed waterproofer certificate present without flood test → D2 Missing (test is mandatory per AS 3740)
- Flood test positive (pass) but no photo/record → D2 Partial
`,
  },

  // ── 7. Structural Steel ─────────────────────────────────────────────────────
  {
    id:       "structural-steel",
    name:     "Structural Steel",
    keywords: ["structural steel", "steel erection", "steel frame", "steel column", "steel beam", "hss", "rhs", "chs", "hollow section", "bolted connection", "welded connection", "steel fabrication"],
    content: `
## Discipline-Specific Scoring Guide: Structural Steel (Tier 1)

### Critical evidence for full D1 (Engineer Verification)
- Structural engineer inspection of connections (bolting / welding) before grouting or covering
- Third-party NDT/weld inspection for full-penetration butt welds
- Survey of installed steel for verticality and level

### Critical evidence for full D2 (Technical Testing)
- Weld visual inspection reports and any required NDT (UT/MT/PT) results
- High-strength bolt torque inspection records (friction grip or direct tension indicator results)
- Mill certificates for all structural steel members (grade 350/350L0 or specified)

### Critical evidence for full D3 (Form Completeness)
- Completed ITP referencing steel mark list and approved erection drawings
- Shop drawing approval record (submitted and approved revisions noted)
- Hold point release for pre-grouting and pre-fireproofing stages

### Critical evidence for full D4 (Material Traceability)
- Mill certificates referenced to member marks or delivery batches
- Bolt batch and lot certificates (grade 8.8 or specified)

### Critical evidence for full D5 (Physical Evidence)
- Photographs of completed connections, welds, and bolt installations
- Survey mark-up or plumb/level check record

### Common scoring triggers
- Weld inspection by tradesperson only (no third-party) → D2 Partial for full-pen welds
- All mill certs present and cross-referenced → D4 Full
- Fireproofing applied before engineer inspection → D1 Partial, flag
`,
  },

  // ── 8. Mechanical / HVAC ────────────────────────────────────────────────────
  {
    id:       "mechanical",
    name:     "Mechanical / HVAC",
    keywords: ["mechanical", "hvac", "ductwork", "air conditioning", "air handling", "chiller", "boiler", "ventilation", "exhaust fan", "condensing unit", "fan coil", "vrf", "vav", "cooling tower"],
    content: `
## Discipline-Specific Scoring Guide: Mechanical / HVAC (Tier 3C)

### Critical evidence for full D1 (Engineer Verification)
- Mechanical services engineer or building services consultant commissioning sign-off
- Third-party TAB (Testing, Adjusting, and Balancing) report for air systems
- Certifying engineer sign-off on pressure test for refrigerant piping

### Critical evidence for full D2 (Technical Testing)
- Duct pressure test results per AS 4254 (leakage class achieved)
- Refrigerant leak test / pressure test records
- TAB report showing achieved air flows vs design (all zones)
- Thermal performance test or BMS integration test report

### Critical evidence for full D3 (Form Completeness)
- Completed ITP with all mechanical systems (supply, return, exhaust, OA, refrigerant, controls) covered
- Reference to approved mechanical services drawings and specifications
- Defect list/punch list record and close-out confirmation

### Critical evidence for full D4 (Material Traceability)
- Equipment data sheets and model numbers matching approved submittal
- Refrigerant type and charge weight recorded

### Critical evidence for full D5 (Physical Evidence)
- Photos of duct pressure test setup, equipment installation, and any hanger/support inspections
- TAB report with instrument calibration certificate attached

### Common scoring triggers
- TAB report present with deviations noted and resolved → D2 Full
- TAB pending / in progress → D2 Partial (note status)
- BMS integration not documented → acceptable if purely mechanical items are complete
`,
  },

  // ── 9. Electrical ───────────────────────────────────────────────────────────
  {
    id:       "electrical",
    name:     "Electrical",
    keywords: ["electrical", "switchboard", "mssb", "msb", "distribution board", "db ", "cable install", "cable pull", "conduit", "trunking", "earthing", "bonding", "hv cable", "lv cable", "transformer", "generator", "ups"],
    content: `
## Discipline-Specific Scoring Guide: Electrical (Tier 3A Licensed Services)

### Critical evidence for full D1 (Engineer Verification)
- Licensed electrical inspector (ASP/2 or equivalent) test and inspection certificate
- Electrical services engineer sign-off on protection settings and switchboard testing
- Utility company (DNSP) approval/acceptance for mains connection

### Critical evidence for full D2 (Technical Testing)
- Insulation resistance (IR) test results for all circuits (megger testing records)
- Earth loop impedance and RCD trip time test results
- Hi-pot test results for HV cables where applicable
- Protection relay coordination settings sheet signed off by protection engineer

### Critical evidence for full D3 (Form Completeness)
- Completed ITP per system or floor (not one ITP for the entire building)
- Reference to approved single-line diagram (SLD) revision
- As-built drawings submitted or in progress

### Critical evidence for full D4 (Material Traceability)
- Cable test certificates from manufacturer
- Switchboard factory test certificates (FAT)

### Critical evidence for full D5 (Physical Evidence)
- Photos of cable installation, terminated switchboard, and earth bar connections
- Photo of RCD test certificate physically attached to board

### Common scoring triggers
- Licensed inspector certificate (Certificate of Compliance) present → D1 Full
- IR test results present but no earth loop impedance test → D2 Partial
- FAT certificate for switchboard → upgrades D2 score
`,
  },

  // ── 10. Plumbing / Hydraulics ────────────────────────────────────────────────
  {
    id:       "plumbing",
    name:     "Plumbing / Hydraulics",
    keywords: ["plumb", "hydraulic", "drainage", "waste pipe", "soil pipe", "vent pipe", "water supply", "hot water", "cold water", "fire hydrant", "sprinkler riser", "grease trap", "sewer", "stormwater", "pump room"],
    content: `
## Discipline-Specific Scoring Guide: Plumbing / Hydraulics (Tier 3A Licensed Services)

### Critical evidence for full D1 (Engineer Verification)
- Licensed plumber's certificate of compliance or Certificate of Compliance (CoC) for relevant authority
- Hydraulic engineer or consultant sign-off for commercial systems
- Water authority approval/connection notice

### Critical evidence for full D2 (Technical Testing)
- Hydrostatic pressure test results for domestic water supply (1.5× working pressure for 30 min minimum)
- Air pressure test or water test for drainage (AS/NZS 3500)
- CCTV drain inspection report for below-slab drainage (defects noted and resolved)
- Backflow prevention device test certificates

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering all systems: cold water, hot water, sanitary drainage, stormwater, and gas (if applicable)
- Reference to approved hydraulic drawings and specifications
- Insulation, supports, and penetration sealing checklist items answered

### Critical evidence for full D4 (Material Traceability)
- Pipe materials and fittings listed and conformance noted (AS/NZS 3500 compliance)
- Backflow prevention device model and serial numbers recorded

### Critical evidence for full D5 (Physical Evidence)
- Pressure test gauge photos (gauge reading visible, date visible)
- CCTV report or photos of drainage inspection

### Common scoring triggers
- CoC present → D1 Full
- No pressure test records at all → D2 Missing
- CCTV not yet done → D2 Partial if pressure test records are present
`,
  },

  // ── 11. Façade / Cladding ────────────────────────────────────────────────────
  {
    id:       "facade",
    name:     "Façade / Cladding",
    keywords: ["façade", "facade", "cladding", "curtain wall", "curtain-wall", "glazing", "spandrel", "rainscreen", "aluminium panel", "alucobond", "fire panel", "acm", "alu panel", "window install", "unitised"],
    content: `
## Discipline-Specific Scoring Guide: Façade / Cladding (Tier 3B Envelope)

### Critical evidence for full D1 (Engineer Verification)
- Façade engineer or structural engineer approval for bracket/anchor design and installation
- Independent third-party façade inspection for fire-resistant material substitutions (NCC Spec C1.13 or similar)
- Certifying authority sign-off for non-standard or innovative façade systems

### Critical evidence for full D2 (Technical Testing)
- Water penetration test results for representative panel sections (AS 4284 or equivalent)
- Pull-out test results for anchors/fixings (minimum 3 per system or as per engineer spec)
- Fire test certificates for cladding composite material (AS 1530.3, ISO 9705, or codemark/PSW)
- Where ACM/ACP used: product fire test certificates AND engineer sign-off confirming acceptable use (post-Grenfell requirements)

### Critical evidence for full D3 (Form Completeness)
- Completed ITP per level or section (not one ITP for the entire façade)
- Reference to approved shop drawings, façade drawings, and engineering calculations
- Sealant inspection and sealant type recorded (manufacturer recommendation noted)

### Critical evidence for full D4 (Material Traceability)
- Panel product and fire test certificate reference numbers recorded
- Extrusion or panel batch numbers where traceable

### Critical evidence for full D5 (Physical Evidence)
- Photos of bracket installation, panel installation, and sealed joints
- Water penetration test setup photos with date

### Common scoring triggers
- ACM without fire test certificate → D2 Missing (critical — non-negotiable post-Grenfell)
- Water penetration test present → strong D2 evidence
- Pull-out test results → D2 Full for Tier 3B
`,
  },

  // ── 12. Roofing ─────────────────────────────────────────────────────────────
  {
    id:       "roofing",
    name:     "Roofing",
    keywords: ["roof", "roofing", "metal roof", "colorbond roof", "membrane roof", "torch-on", "torch on", "liquid membrane", "roof sheet", "skylight", "gutter", "downpipe", "parapet flashing"],
    content: `
## Discipline-Specific Scoring Guide: Roofing (Tier 3B Envelope)

### Critical evidence for full D1 (Engineer Verification)
- Licensed roof plumber certificate of compliance (for metal roofing with plumbing elements)
- Structural engineer sign-off for penetrations in structural deck
- Building surveyor inspection at waterproof membrane installation (if over occupied space)

### Critical evidence for full D2 (Technical Testing)
- Water / hose test result for completed roof sections before handover
- Membrane manufacturer's installation verification for torch-on or liquid membrane systems
- Pull-out or uplift test for roof sheet fasteners (cyclonic or high-wind zones)

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering: substrate, membrane / sheeting, flashings, penetrations, gutters, downpipes, and overflow relief
- Reference to approved roof drawings and specifications
- Warranty registration or certificate of installation noted

### Critical evidence for full D4 (Material Traceability)
- Material batch or product certificates for membrane
- Fastener specification and pattern confirmed

### Critical evidence for full D5 (Physical Evidence)
- Photos of completed roof sections, flashings, and penetration details
- Water test photos with date

### Common scoring triggers
- Warranty certificate from installer → can substitute for testing record in lower-risk Tier 3
- No water test and no inspector sign-off → D2 Missing
`,
  },

  // ── 13. Tiling / Finishes ───────────────────────────────────────────────────
  {
    id:       "tiling",
    name:     "Tiling / Finishes",
    keywords: ["tile", "tiling", "stone", "render", "plaster", "screed", "floor finish", "wall finish", "paint", "coating", "epoxy floor", "polished concrete"],
    content: `
## Discipline-Specific Scoring Guide: Tiling / Finishes (Tier 3D Finishes)

### Critical evidence for full D1 (Engineer Verification)
- Certifying engineer or building surveyor inspection is not typically required for Tier 3D finishes unless specified in the contract. Foreman/supervisor sign-off is generally sufficient.
- For large-format tiles or stone over suspended slabs: structural engineer confirmation that slab can take additional dead load

### Critical evidence for full D2 (Technical Testing)
- Adhesive bond strength test (pull-off test) for large-format tiles, commercial areas, or external applications
- Substrate moisture content reading before tile/screed application where required by manufacturer
- Slab flatness (F-number or 3 m straightedge) records for screeds

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering: substrate approval, waterproofing sign-off (if wet area), adhesive type, tile size/layout, grout type, expansion joint placement
- Reference to approved finishes schedule (tile code, grout colour)
- Punch list / defect inspection completed and signed off

### Critical evidence for full D4 (Material Traceability)
- Tile batch number recorded to confirm colour consistency across deliveries
- Adhesive and grout product certificates

### Critical evidence for full D5 (Physical Evidence)
- Photos of completed tiled areas
- Any adhesion pull-off test photo showing result

### Common scoring triggers
- Tile batch number consistency critical on aesthetic installs — flag if absent
- Waterproofing sign-off must precede tiling checklist in wet areas
- Substrate moisture record only required where manufacturer specification demands it
`,
  },

  // ── 14. Insulation ──────────────────────────────────────────────────────────
  {
    id:       "insulation",
    name:     "Insulation",
    keywords: ["insulat", "insulation", "thermal batt", "glasswool", "rockwool", "kingspan", "insul board", "foil insulation", "bulk insulation", "r-value", "vapor barrier", "vapour barrier"],
    content: `
## Discipline-Specific Scoring Guide: Insulation (Tier 3D Finishes / Tier 3B Envelope)

### Critical evidence for full D1 (Engineer Verification)
- For NCC Section J compliance: building surveyor or energy assessor sign-off confirming correct R-value and installation
- For acoustic-rated assemblies: acoustic consultant inspection of installed batts/boards

### Critical evidence for full D2 (Technical Testing)
- Thermal performance compliance certificate (NCC Section J or BASIX/NABERS as applicable)
- Where acoustic performance is contractual: acoustic test result post-installation

### Critical evidence for full D3 (Form Completeness)
- Completed ITP per area or level showing product R-value, manufacturer, thickness, and installation method
- Reference to approved specification and NCC Section J report
- Inspection confirming no gaps, voids, or compression before lining installed

### Critical evidence for full D4 (Material Traceability)
- Product data sheet confirming R-value
- Batch or lot numbers from delivery dockets

### Critical evidence for full D5 (Physical Evidence)
- Photos of installed insulation before lining is fixed (batts in place, foil taped, no voids visible)

### Common scoring triggers
- NCC compliance certificate → strong D2 evidence
- Photos taken after lining installed (insulation not visible) → D5 Partial; acceptable if pre-lining inspection sign-off is present
- No pre-lining inspection sign-off at all → D3 Partial
`,
  },

  // ── 15. Fire Protection ─────────────────────────────────────────────────────
  {
    id:       "fire-protection",
    name:     "Fire Protection",
    keywords: ["fire protection", "sprinkler", "fire suppression", "fm200", "gaseous suppression", "fire hydrant", "fire hose reel", "fire pump", "fire main", "fire detection", "smoke detection", "passive fire", "fire stop", "fire collar", "intumescent", "fire rated"],
    content: `
## Discipline-Specific Scoring Guide: Fire Protection (Tier 3A Licensed Services)

### Critical evidence for full D1 (Engineer Verification)
- AFSS (Annual Fire Safety Statement) relevant installation certificate from licensed fire protection contractor
- Fire engineer or certifying authority (FCC/FCA/FSC) sign-off on deviation from standard or performance solution
- Authority Having Jurisdiction (AHJ) / fire brigade acceptance or notification for hydrant/sprinkler commissioning

### Critical evidence for full D2 (Technical Testing)
- Hydraulic acceptance test results for sprinkler systems (trip test, flow test per AS 2118)
- Hydrostatic pressure test results for pipework (typically 1200 kPa or 1.5× working pressure)
- Fire pump performance test results (flow vs head curve)
- Alarm simulation and zone test records for detection systems
- Smoke and heat detector sensitivity test records

### Critical evidence for full D3 (Form Completeness)
- Completed ITP per system: sprinklers, hydrants, hose reels, detection, FM200/gaseous, passive fire stopping
- Reference to approved fire protection drawings (FHR, sprinkler layout, fire stop schedule)
- Defect / punch list completed and closed out

### Critical evidence for full D4 (Material Traceability)
- Sprinkler head product data sheet and listing certificate (UL or FM)
- Pipe material certification (galvanised steel pipe compliance)
- Fire stopping product certificates (hourly rating matching required FRL)

### Critical evidence for full D5 (Physical Evidence)
- Photos of pressure test gauge, trip test in progress, head installation
- Fire stopping photos per penetration location (slab, wall, service shaft)

### Common scoring triggers
- Hydraulic acceptance test present → D2 Full for active systems
- Fire stopping photos present but no schedule → D3 Partial
- AHJ sign-off absent but contractor certificate present → D1 Partial (AHJ acceptance is gold standard)
- Detection/alarm test records separate from sprinkler ITP → acceptable, reference the companion ITP
`,
  },
];

// ── Detection ─────────────────────────────────────────────────────────────────

/**
 * Matches an ITP name/title to the most relevant discipline guide.
 * Returns null when no keyword match is found — the base scoring guidelines
 * will be used without discipline-specific context.
 *
 * Match priority: first keyword match wins (guides are ordered by specificity
 * so that, e.g., "basement waterproofing" matches waterproofing-basement before
 * the generic waterproofing entries).
 */
export function detectDiscipline(itpName: string): DisciplineGuide | null {
  if (!itpName) return null;
  const lower = itpName.toLowerCase();

  for (const guide of DISCIPLINE_GUIDES) {
    for (const kw of guide.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return guide;
      }
    }
  }

  return null;
}
