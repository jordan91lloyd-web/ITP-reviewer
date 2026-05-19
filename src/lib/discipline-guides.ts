// ─── Discipline-specific scoring guides ───────────────────────────────────────
// Each guide provides targeted evidence requirements and scoring cues for a
// specific construction discipline. The correct guide is appended to the base
// scoring guidelines before each review so Claude has discipline-aware context.
//
// detectDiscipline(itpName) uses keyword matching against the ITP name/title
// to pick the most relevant guide. Returns null when no confident match exists
// (the base scoring guidelines alone are used in that case).
//
// Guide list (15 total) maps to the project's ITP schedule:
//  1. Concrete & Structural   — ITP-002, 006, 012, 051
//  2. Piling & Earthworks     — ITP-003, 027, 028, 001, 029, 026
//  3. Shotcrete               — ITP-005
//  4. Inground Services       — ITP-004, 035
//  5. Waterproofing           — ITP-010, 011, 043, 044, 021
//  6. Structural Steel        — ITP-053
//  7. Facade & Enclosure      — ITP-015, 033, 014
//  8. Pre-Sheet & Services    — ITP-022, 025
//  9. Hydraulics              — ITP-034, 036, 037
// 10. Electrical              — ITP-038, 039, 040
// 11. Fire Services           — ITP-041, 042, 046
// 12. Mechanical              — ITP-047, 048, 049
// 13. Roofing                 — ITP-031, 032, 045
// 14. Masonry                 — ITP-007, 008, 030
// 15. Lift & Elevator         — ITP-050

export interface DisciplineGuide {
  id:       string;
  name:     string;
  keywords: string[];   // matched case-insensitively against ITP name
  content:  string;     // plain text injected into the system prompt
}

// ── Guide content ─────────────────────────────────────────────────────────────

export const DISCIPLINE_GUIDES: DisciplineGuide[] = [

  // ── 1. Concrete & Structural ─────────────────────────────────────────────────
  {
    id:       "concrete-structural",
    name:     "Concrete & Structural",
    keywords: [
      "concrete", "pre pour", "prepour", "pre-pour",
      "form reo", "formwork", "falsework", "backprop", "back prop", "back-prop",
      "reinforcement", "rebar", "reo", "frp",
      "pre-cast", "precast", "pre cast",
      "slab", "column pour", "beam pour", "footing pour", "foundation pour",
      "soffit", "pour",
    ],
    content: `
## Discipline-Specific Scoring Guide: Concrete & Structural (Tier 1)
Applies to: formwork, reinforcement installation, concrete pours, pre-cast elements, backpropping.

### Critical evidence for full D1 (Engineer Verification)
- Formwork design certificate or temporary works engineer approval for suspended formwork and backpropping layouts
- Structural engineer or accredited inspector sign-off on reinforcement layout — covering bar size, spacing, cover, laps, and anchorage — before each pour
- Pre-pour inspection release signed by the certifying structural engineer (or their nominated representative) for every pour
- Where pre-cast: factory production quality certificate and site installation sign-off

### Critical evidence for full D2 (Technical Testing)
- Reinforcement mill certificates (heat/batch numbers, grade 500N or specified) cross-referenced to delivery dockets and bar schedule quantities
- Signed bending and bar schedules from the responsible structural engineer
- Concrete mix design / mix approval certificates for the specific grade (e.g., 32 MPa, 40 MPa, 50 MPa)
- Slump test records at point of discharge — every truck or every 50 m³ minimum
- Concrete cylinder/cube sample sets: cure dates, break dates, 7-day and 28-day compressive strength results
- Formwork stripping criteria referencing minimum concrete strength (cylinder break result at time of strip)
- Temperature records where early-strength or cold-weather conditions apply

### Critical evidence for full D3 (Form Completeness)
- Completed ITP checklist for each stage: formwork/backpropping, reinforcement, and concrete pour — all rows answered (no blanks)
- Reference to approved structural drawings with drawing numbers and revision noted
- Cover measurement records or spacer block/chair confirmation
- Pour sequence documentation where multiple lifts or elements are involved
- Admixture or additive details if used

### Critical evidence for full D4 (Material Traceability)
- Mill certificate heat numbers cross-referenced to delivery docket numbers and bar mark/location
- Concrete batch delivery dockets for every truck (batch number, w/c ratio, actual slump at batch plant)
- Mix design approval from the certifying engineer referenced in the ITP

### Critical evidence for full D5 (Physical Evidence)
- Dated photographs of completed reinforcement from at least two angles (plan and elevation) showing cover blocks/chairs in place, laps, starters, and coupler locations
- Photos of erected formwork from multiple angles before concrete placement
- Photos of concrete placement in progress (truck discharge, vibration, screeding)
- Cylinder/cube sampling photo with samples being taken on site
- Finished surface or stripped element photos

### Common scoring triggers
- MISSING mill certificates → apply "Missing" to D2 — mill certs are non-negotiable for Tier 1 structural elements
- No pre-pour sign-off at all → D1 Missing for Tier 1 — critical gap
- Engineer inspection present but cover measurements absent → D3 Partial
- 28-day break results not yet available → acceptable if 7-day results present and pour date is recent; note it, do not penalise
- Slump test records missing → D2 Partial (significant deduction)
- Photos taken after pour → note but do not penalise if pre-pour certificate is present
- Standard company-approved formwork system with site engineer inspection sign-off → D1 Full for formwork element
- No temporary works engineer approval for suspended backpropping → D1 Partial
`,
  },

  // ── 2. Piling & Earthworks ───────────────────────────────────────────────────
  {
    id:       "piling-earthworks",
    name:     "Piling & Earthworks",
    keywords: [
      "piling", "pile", "bored pile", "driven pile", "micropile", "helical pier",
      "caisson", "earthwork", "excavat", "fill compaction", "compaction",
      "dewatering", "tieback", "tie back", "ground anchor", "retaining wall",
      "sheet pile", "soldier pile", "secant pile", "contiguous pile",
      "pad footing", "strip footing", "raft slab", "raft foundation",
    ],
    content: `
## Discipline-Specific Scoring Guide: Piling & Earthworks (Tier 1)
Applies to: bored/driven/CFA/screw piles, excavation, fill, compaction, retaining systems, dewatering.

### Critical evidence for full D1 (Engineer Verification)
- Geotechnical report or bore log confirming founding conditions match design assumptions (same stratum as design)
- Structural engineer sign-off on pile layout, founding depth, set criteria (driven) or socket length (bored)
- Third-party geotechnical inspector attendance and written report for each pile or pile group
- For retaining / tieback systems: temporary works engineer or geotechnical engineer approval at each stage (install, stress, lock-off)
- Dewatering plan approved by geotechnical engineer where required

### Critical evidence for full D2 (Technical Testing)
- Pile integrity test (PIT) or pile driving analysis (PDA/CAPWAP) for nominated test piles
- Static load test results where specified
- Concrete mix design and cylinder break results for cast-in-situ piles
- Weld inspection / NDT records for steel tube piles
- Compaction test results (Modified Proctor, field density tests) at specified intervals and lift heights
- Settlement monitoring records where required by specification

### Critical evidence for full D3 (Form Completeness)
- Pile schedule: ID, location RL, design length, actual founding depth, set/refusal, concrete volume
- Completed ITP per pile or pile group (all rows answered)
- Reinforcement cage inspection sign-off before concrete placement
- Fill placement and compaction log showing lift thickness, passes, and test frequency

### Critical evidence for full D4 (Material Traceability)
- Mill certificates for reinforcement cages and structural steel tube piles
- Concrete batch delivery dockets referenced to pile ID
- Fill source documentation and material conformance (particle size, plasticity index)

### Critical evidence for full D5 (Physical Evidence)
- Photos of cage inspection, concrete placement, rig setup, and founding stratum at base of excavation
- Survey setout record and as-built pile head levels
- Compaction test location plan or marked-up drawing

### Common scoring triggers
- No geotechnical report → D1 Partial at best — fundamental gap for Tier 1
- PDA/PIT results pending → acceptable if static load test is present; note status
- Founding level not confirmed by inspector → D1 Partial (inspector must verify stratum)
- Compaction test results for fill absent → D2 Missing for earthworks ITPs
`,
  },

  // ── 3. Shotcrete ─────────────────────────────────────────────────────────────
  {
    id:       "shotcrete",
    name:     "Shotcrete",
    keywords: [
      "shotcrete", "gunite", "sprayed concrete", "sprayed shotcrete",
      "wet mix shotcrete", "dry mix shotcrete",
    ],
    content: `
## Discipline-Specific Scoring Guide: Shotcrete (Tier 1)
Applies to: wet-mix and dry-mix sprayed concrete for retaining walls, tunnel linings, slope stabilisation.

### Critical evidence for full D1 (Engineer Verification)
- Structural or geotechnical engineer approval of nozzleman qualifications (ACI 506 or equivalent)
- Pre-application test panel approval — thickness, strength, bond, and surface quality verified by engineer
- Engineer or accredited inspector attendance during application for critical elements

### Critical evidence for full D2 (Technical Testing)
- Mix design approval and pre-construction trial panel core results (minimum 3 cores per panel)
- In-place core samples taken at specified frequency — typically one set per 50 m² or as specified
- Core compressive strength results at 7-day and 28-day (minimum 25 MPa at 28 days or as specified)
- Fibre dosage records where steel or polypropylene fibre reinforcement is specified
- Thickness verification records (pins or probes at specified grid spacing)

### Critical evidence for full D3 (Form Completeness)
- Completed ITP checklist: substrate preparation, reinforcement/mesh, application, curing
- Reference to approved drawings showing zone, thickness, and reinforcement requirements
- Nozzleman certification attached or referenced

### Critical evidence for full D4 (Material Traceability)
- Cement and admixture batch certificates
- Fibre product data sheet and batch certificate if used

### Critical evidence for full D5 (Physical Evidence)
- Photos of substrate prepared, mesh/reinforcement in place, application in progress, and finished surface
- Photos of core samples being taken with location marked on drawing

### Common scoring triggers
- No nozzleman certification → D1 Partial (operator qualification is the primary quality control)
- Trial panel cores not achieved minimum strength → D2 Missing (production cannot proceed until resolved)
- Thickness not verified by probes → D3 Partial
`,
  },

  // ── 4. Inground Services ─────────────────────────────────────────────────────
  {
    id:       "inground-services",
    name:     "Inground Services",
    keywords: [
      "inground", "in-ground", "in ground",
      "underground service", "underground pipe", "sub-slab service",
      "drainage pit", "junction pit", "pit installation",
      "sewer lateral", "water main", "gas main", "underground conduit",
      "duct bank", "cable conduit", "pressure main",
    ],
    content: `
## Discipline-Specific Scoring Guide: Inground Services (Tier 1 / Tier 3A)
Applies to: underground drainage, water mains, gas mains, electrical and communications conduit, pit installation.

### Critical evidence for full D1 (Engineer Verification)
- Services authority approval or dial-before-you-dig (DBYD) clearance prior to excavation
- Licensed tradesperson (plumber, gas fitter, or electrician) supervision of installation
- Certifying engineer or authority inspector sign-off on pressure main connections and pit installations
- Council or water authority inspection for sewer and stormwater connections

### Critical evidence for full D2 (Technical Testing)
- Pressure test results for pressurised mains (water, gas, pressure sewer) — test pressure, duration, and pass/fail
- CCTV inspection report for gravity drainage (sewer and stormwater) — defects noted and resolved
- Mandrel/deflection test for flexible pipelines where specified
- Electrical continuity and insulation test for underground HV or LV conduit runs

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering: bedding, pipe laying, jointing, backfill, compaction, and surface reinstatement
- Reference to approved services drawings and specifications
- Depth of cover measurement records (minimum cover confirmed at inspection)
- Warning tape or marker tape installation confirmed

### Critical evidence for full D4 (Material Traceability)
- Pipe material conformance certificates (AS/NZS standards for pipe class and grade)
- Pit product data sheets and structural certification where precast pits are used

### Critical evidence for full D5 (Physical Evidence)
- Photos of excavation, pipe bedding, laid pipe, jointing, and backfill stages
- As-constructed survey or mark-up drawing showing final pipe invert levels and alignment
- CCTV report screen captures for drainage

### Common scoring triggers
- DBYD clearance absent → D1 Missing (safety-critical prerequisite)
- Pressure test absent for pressurised mains → D2 Missing
- CCTV absent for gravity drainage → D2 Partial if visual inspection sign-off is present
- Depth of cover not recorded → D3 Partial
`,
  },

  // ── 5. Waterproofing ─────────────────────────────────────────────────────────
  {
    id:       "waterproofing",
    name:     "Waterproofing",
    keywords: [
      "waterproof", "waterproofing",
      "tanking", "membrane", "flood test", "ponding test",
      "wet area", "bathroom", "shower", "laundry", "balcony",
      "basement", "podium", "planter box", "below slab",
      "sub-slab", "retaining waterproof", "external waterproof",
      "torch-on", "torch on", "liquid membrane",
    ],
    content: `
## Discipline-Specific Scoring Guide: Waterproofing (Tier 2)
Applies to: basement/below-grade membranes, wet area membranes (bathrooms, showers, balconies), podium/planter box waterproofing.

### Critical evidence for full D1 (Engineer Verification)
- Licensed waterproofer certificate (state waterproofing licence) on file
- Manufacturer-approved or ACRA-certified applicator record for specialist systems
- Building surveyor or certifying inspector sign-off at substrate approval, membrane application, and protection stages
- Pre-start meeting record and approved method statement submitted and accepted

### Critical evidence for full D2 (Technical Testing)
FLOOD/PONDING TESTS — mandatory for all wet areas and podium/planter decks:
- Wet area flood test: 25 mm depth for 24 hours minimum (AS 3740 or authority equivalent)
- Below-grade/podium: flood test or hose test with documented duration and result
- Membrane thickness wet film records (comb gauge readings per room/zone)
- Primer adhesion pull-off test records where epoxy or cementitious coating applied
- Material test certificates: membrane DPC thickness, tensile strength per AS 4858 or AS 3740

### Critical evidence for full D3 (Form Completeness)
- Completed ITP per apartment/room/level (not one ITP for an entire building or floor — granularity matters)
- Reference to approved drawings showing extent of waterproofing and upstand heights
- All substrate, primer, membrane, and protection-layer rows answered
- Hold point releases for each stage: substrate, primer, membrane, protection board

### Critical evidence for full D4 (Material Traceability)
- Product batch numbers on installation report or delivery dockets
- Certificate of compliance from manufacturer or certified applicator
- Warranty certificate and warranty registration details

### Critical evidence for full D5 (Physical Evidence)
- Photos of substrate prepared, primer applied, membrane applied (including upstands to height), and protection board installed
- Flood test photos showing water level and date
- Photos at each stage before next layer is applied (substrate visible, then primer, then membrane)

### Common scoring triggers
- No flood test at all → D2 Missing (critical — flood test is mandatory for all wet areas per AS 3740)
- Licensed waterproofer certificate present without flood test → D2 Missing
- One ITP for 200 apartments → D3 Partial (insufficient granularity)
- Flood test done but no photo/record → D2 Partial
- Manufacturer-approved applicator certificate combined with flood test and inspection records → D1 Full
- Protection layer installed before inspection photo → D5 Partial; flag for clarification
`,
  },

  // ── 6. Structural Steel ──────────────────────────────────────────────────────
  {
    id:       "structural-steel",
    name:     "Structural Steel",
    keywords: [
      "structural steel", "steel erection", "steel frame", "steel column", "steel beam",
      "hss", "rhs", "chs", "hollow section",
      "bolted connection", "welded connection", "steel fabrication",
    ],
    content: `
## Discipline-Specific Scoring Guide: Structural Steel (Tier 1)
Applies to: structural steel fabrication, erection, bolted and welded connections.

### Critical evidence for full D1 (Engineer Verification)
- Structural engineer inspection of connections (bolting / welding) before grouting or covering
- Third-party NDT/weld inspection report for full-penetration butt welds (UT or RT)
- Survey of installed steel for verticality and level (plumb and level mark-up)

### Critical evidence for full D2 (Technical Testing)
- Weld visual inspection reports and NDT results (UT/MT/PT as specified)
- High-strength bolt torque inspection records (friction grip or direct tension indicator results)
- Mill certificates for all structural steel members (grade 350/350L0 or as specified)

### Critical evidence for full D3 (Form Completeness)
- Completed ITP referencing steel mark list and approved erection drawings
- Shop drawing approval record (submitted and approved revisions noted)
- Hold point release for pre-grouting and pre-fireproofing stages

### Critical evidence for full D4 (Material Traceability)
- Mill certificates referenced to member marks or delivery batches
- Bolt batch and lot certificates (grade 8.8 or as specified)

### Critical evidence for full D5 (Physical Evidence)
- Photographs of completed connections, welds, and bolt installations
- Survey mark-up or plumb/level check record

### Common scoring triggers
- Weld inspection by tradesperson only (no third-party) → D2 Partial for full-pen welds
- All mill certs present and cross-referenced → D4 Full
- Fireproofing applied before engineer inspection → D1 Partial; flag
`,
  },

  // ── 7. Facade & Enclosure ────────────────────────────────────────────────────
  {
    id:       "facade-enclosure",
    name:     "Facade & Enclosure",
    keywords: [
      "façade", "facade", "enclosure",
      "cladding", "curtain wall", "curtain-wall", "glazing", "spandrel",
      "rainscreen", "aluminium panel", "alucobond", "fire panel", "acm", "alu panel",
      "window install", "unitised",
      "external wall", "external cladding",
    ],
    content: `
## Discipline-Specific Scoring Guide: Facade & Enclosure (Tier 3B Envelope)
Applies to: curtain wall, unitised cladding, aluminium composite panels, glazing, external wall enclosure.

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

  // ── 8. Pre-Sheet & Services ──────────────────────────────────────────────────
  {
    id:       "pre-sheet-services",
    name:     "Pre-Sheet & Services",
    keywords: [
      "pre-sheet", "presheet", "pre sheet",
      "services rough-in", "rough in", "rough-in", "roughin",
      "first fix", "framing", "stud wall", "partition",
      "top plate", "bottom plate", "wall framing", "ceiling framing",
      "services installation", "pre-plaster", "pre plaster",
    ],
    content: `
## Discipline-Specific Scoring Guide: Pre-Sheet & Services (Tier 3)
Applies to: wall/ceiling framing inspection, services rough-in (electrical, hydraulic, mechanical, fire) before lining/sheeting.

### Critical evidence for full D1 (Engineer Verification)
- Building surveyor or private certifier inspection of framing before sheeting where required by permit conditions
- For load-bearing or bracing walls: structural engineer sign-off confirming compliance with framing drawings
- Services coordinator or BCA consultant sign-off on services penetrations through fire-rated elements before sealing

### Critical evidence for full D2 (Technical Testing)
- Straightness and plumb check records for framing (max deflection per AS 3623 or specification)
- Acoustic performance check — confirm resilient mounts or isolation strips installed per acoustic spec before sheeting
- Fire stopping product certificates and installer sign-off for all penetrations through fire-rated walls/floors

### Critical evidence for full D3 (Form Completeness)
- Completed ITP checklist covering: framing, noggins, blocking, services rough-in, penetration sealing, insulation batts, and pre-sheet inspection sign-off
- Reference to approved drawings (architectural, structural, and services coordination drawings)
- Check that all services (electrical, hydraulic, HVAC, fire) have been signed off before lining goes up
- Defect list from pre-sheet inspection with all items resolved

### Critical evidence for full D4 (Material Traceability)
- Stud and track product specification and gauge confirmed
- Fire stopping product data sheet and codemark number for rated penetrations

### Critical evidence for full D5 (Physical Evidence)
- Photos of framing completed (before sheeting) from representative areas
- Photos of services installed within framing (electrical conduit, hydraulic pipe, HVAC ducts)
- Photos of fire stopping at penetrations with product label visible

### Common scoring triggers
- Pre-sheet inspection sign-off missing → D1 Partial (this is the primary hold point for this ITP type)
- Fire penetration sealing not signed off before sheeting → D1 Missing for fire-stopping component
- Services not visible in photos (sheeting already up) → D5 Partial; acceptable if pre-sheet inspection record is present
`,
  },

  // ── 9. Hydraulics ────────────────────────────────────────────────────────────
  {
    id:       "hydraulics",
    name:     "Hydraulics",
    keywords: [
      "hydraulic", "plumb", "drainage", "waste pipe", "soil pipe", "vent pipe",
      "water supply", "hot water", "cold water",
      "grease trap", "sewer", "stormwater", "pump room",
      "backflow", "tempering valve", "tap ware", "sanitary",
    ],
    content: `
## Discipline-Specific Scoring Guide: Hydraulics (Tier 3A Licensed Services)
Applies to: internal hydraulic services — cold water, hot water, sanitary drainage, stormwater, gas, pump rooms.

### Critical evidence for full D1 (Engineer Verification)
- Licensed plumber's Certificate of Compliance (CoC) from the relevant authority — the primary sign-off for all hydraulic work
- Hydraulic engineer or consultant sign-off for commercial-scale systems
- Water authority approval/connection notice for mains connection

### Critical evidence for full D2 (Technical Testing)
- Hydrostatic pressure test results for domestic water supply (1.5× working pressure for 30 min minimum per AS/NZS 3500)
- Air or water pressure test for sanitary drainage
- CCTV drain inspection report for below-slab drainage (defects noted and resolved)
- Backflow prevention device test certificates (annual or commissioning)
- Tempering valve set point test record where required

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
- CCTV absent → D2 Partial if pressure test records are present
- Backflow prevention test absent → D2 Partial for commercial systems
`,
  },

  // ── 10. Electrical ───────────────────────────────────────────────────────────
  {
    id:       "electrical",
    name:     "Electrical",
    keywords: [
      "electrical", "switchboard", "mssb", "msb", "distribution board", "db ",
      "cable install", "cable pull", "conduit", "trunking",
      "earthing", "bonding", "hv cable", "lv cable", "transformer", "generator", "ups",
    ],
    content: `
## Discipline-Specific Scoring Guide: Electrical (Tier 3A Licensed Services)
Applies to: LV/HV cable installation, switchboards, distribution boards, earthing, generators.

### Critical evidence for full D1 (Engineer Verification)
- Licensed electrical inspector (ASP/2 or equivalent) Certificate of Compliance — primary sign-off for all electrical work
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
- Certificate of Compliance present → D1 Full
- IR test results present but no earth loop impedance test → D2 Partial
- FAT certificate for switchboard → upgrades D2 score
`,
  },

  // ── 11. Fire Services ─────────────────────────────────────────────────────────
  {
    id:       "fire-services",
    name:     "Fire Services",
    keywords: [
      "fire service", "fire protection", "sprinkler",
      "fire suppression", "fm200", "gaseous suppression",
      "fire hydrant", "fire hose reel", "fire pump", "fire main",
      "fire detection", "smoke detection", "smoke detector",
      "passive fire", "fire stop", "fire collar", "intumescent", "fire rated",
      "afss", "exit light", "emergency light",
    ],
    content: `
## Discipline-Specific Scoring Guide: Fire Services (Tier 3A Licensed Services)
Applies to: active fire suppression (sprinklers, FM200), detection/alarm, fire hydrant/hose reel, passive fire stopping.

### Critical evidence for full D1 (Engineer Verification)
- AFSS-relevant installation certificate from licensed fire protection contractor
- Fire engineer or certifying authority (FCC/FCA/FSC) sign-off on any deviation from standard or performance solution
- Authority Having Jurisdiction (AHJ) / fire brigade acceptance for hydrant/sprinkler commissioning

### Critical evidence for full D2 (Technical Testing)
- Hydraulic acceptance test for sprinkler systems: trip test and flow test per AS 2118
- Hydrostatic pressure test results for pipework (1200 kPa or 1.5× working pressure)
- Fire pump performance test results (flow vs head curve)
- Alarm simulation and zone test records for detection systems
- Smoke and heat detector sensitivity test records

### Critical evidence for full D3 (Form Completeness)
- Completed ITP per system: sprinklers, hydrants, hose reels, detection, FM200/gaseous, passive fire stopping
- Reference to approved fire protection drawings (FHR drawing, sprinkler layout, fire stop schedule)
- Defect/punch list completed and closed out

### Critical evidence for full D4 (Material Traceability)
- Sprinkler head product data sheet and listing certificate (UL or FM listed)
- Pipe material certification (galvanised steel pipe conformance)
- Fire stopping product certificates (hourly FRL rating matching specification)

### Critical evidence for full D5 (Physical Evidence)
- Photos of pressure test gauge, trip test in progress, head installation
- Fire stopping photos per penetration location (slab, wall, service shaft) with product label visible

### Common scoring triggers
- Hydraulic acceptance test present → D2 Full for active suppression systems
- Fire stopping photos present but no schedule/register → D3 Partial
- AHJ sign-off absent but contractor certificate present → D1 Partial (AHJ is the gold standard)
- Detection/alarm test records in a separate companion ITP → acceptable; reference the companion ITP
`,
  },

  // ── 12. Mechanical ───────────────────────────────────────────────────────────
  {
    id:       "mechanical",
    name:     "Mechanical",
    keywords: [
      "mechanical", "hvac", "ductwork", "air conditioning", "air handling",
      "chiller", "boiler", "ventilation", "exhaust fan",
      "condensing unit", "fan coil", "vrf", "vav", "cooling tower",
    ],
    content: `
## Discipline-Specific Scoring Guide: Mechanical (Tier 3C)
Applies to: HVAC, ductwork, air handling units, chillers, boilers, ventilation systems.

### Critical evidence for full D1 (Engineer Verification)
- Mechanical services engineer or building services consultant commissioning sign-off
- Third-party TAB (Testing, Adjusting, and Balancing) report for air systems
- Certifying engineer sign-off on pressure test for refrigerant piping

### Critical evidence for full D2 (Technical Testing)
- Duct pressure test results per AS 4254 (leakage class achieved)
- Refrigerant leak test / pressure test records
- TAB report showing achieved air flows vs design for all zones
- Thermal performance test or BMS integration test report

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering all mechanical systems: supply, return, exhaust, OA, refrigerant, and controls
- Reference to approved mechanical services drawings and specifications
- Defect/punch list record and close-out confirmation

### Critical evidence for full D4 (Material Traceability)
- Equipment data sheets and model numbers matching approved submittal
- Refrigerant type and charge weight recorded

### Critical evidence for full D5 (Physical Evidence)
- Photos of duct pressure test setup, equipment installation, and hanger/support inspections
- TAB report with instrument calibration certificate attached

### Common scoring triggers
- TAB report present with deviations noted and resolved → D2 Full
- TAB pending/in progress → D2 Partial (note status)
- BMS integration not documented → acceptable if purely mechanical items are complete
`,
  },

  // ── 13. Roofing ──────────────────────────────────────────────────────────────
  {
    id:       "roofing",
    name:     "Roofing",
    keywords: [
      "roof", "roofing", "metal roof", "colorbond roof", "membrane roof",
      "torch-on", "torch on", "liquid membrane",
      "roof sheet", "skylight", "gutter", "downpipe", "parapet flashing",
    ],
    content: `
## Discipline-Specific Scoring Guide: Roofing (Tier 3B Envelope)
Applies to: metal roofing, membrane roofing, torch-on, liquid applied membrane, flashings, gutters.

### Critical evidence for full D1 (Engineer Verification)
- Licensed roof plumber certificate of compliance (for metal roofing with plumbing elements)
- Structural engineer sign-off for penetrations in structural deck
- Building surveyor inspection at waterproof membrane installation (if over occupied space)

### Critical evidence for full D2 (Technical Testing)
- Water/hose test result for completed roof sections before handover
- Membrane manufacturer's installation verification for torch-on or liquid membrane systems
- Pull-out or uplift test for roof sheet fasteners (cyclonic or high-wind zones)

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering: substrate, membrane/sheeting, flashings, penetrations, gutters, downpipes, and overflow relief
- Reference to approved roof drawings and specifications
- Warranty registration or certificate of installation noted

### Critical evidence for full D4 (Material Traceability)
- Material batch or product certificates for membrane
- Fastener specification and pattern confirmed

### Critical evidence for full D5 (Physical Evidence)
- Photos of completed roof sections, flashings, and penetration details
- Water test photos with date

### Common scoring triggers
- Warranty certificate from installer → can substitute for testing record in lower-risk Tier 3 situations
- No water test and no inspector sign-off → D2 Missing
`,
  },

  // ── 14. Masonry ──────────────────────────────────────────────────────────────
  {
    id:       "masonry",
    name:     "Masonry",
    keywords: [
      "masonry", "brick", "brickwork", "blockwork", "block work",
      "cmu", "concrete block", "rendered masonry", "rendered wall",
      "masonry wall", "besser block", "aac block", "hebel",
      "wall ties", "cavity wall", "veneer",
    ],
    content: `
## Discipline-Specific Scoring Guide: Masonry (Tier 1 / Tier 3)
Applies to: structural masonry walls, brick veneer, blockwork, AAC panel/block, rendered masonry.

### Critical evidence for full D1 (Engineer Verification)
- Structural engineer inspection sign-off for load-bearing masonry (bond pattern, mortar bed, lintels, wall ties)
- For non-loadbearing partitions: foreman/supervisor sign-off is generally sufficient
- Building surveyor inspection where masonry forms part of a fire-rated assembly

### Critical evidence for full D2 (Technical Testing)
- Mortar cube/prism test results (ASTM C270 or AS 3700 — minimum 7-day and 28-day compressive strength)
- Wall tie type and spacing confirmation against structural drawings
- Acoustic test result post-construction where acoustic-rated masonry assembly is specified
- Render pull-off test (adhesion) for applied render systems

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering: substrate, bed joint, perpend joint, wall ties, lintels, control joints, and damp proof course
- Reference to approved structural drawings showing wall type, bond, and tie pattern
- Lintel bearing length and bedding confirmed
- Control/expansion joint location confirmed against drawing

### Critical evidence for full D4 (Material Traceability)
- Brick/block supplier delivery dockets and product conformance certificates
- Mortar mix design and/or pre-bagged mortar batch certificates
- Wall tie product specification and corrosion class confirmed

### Critical evidence for full D5 (Physical Evidence)
- Photos of masonry in progress showing tie installation, joint filling, and coursing
- Photos of lintels bearing and DPC/flashing installation
- Photos of completed wall(s) at key stages

### Common scoring triggers
- Structural engineer sign-off for load-bearing elements absent → D1 Partial
- Mortar test results absent → D2 Partial (tests are required for load-bearing per AS 3700)
- Wall tie type/spacing not confirmed → D3 Partial
- Non-loadbearing partition with foreman sign-off and completed ITP → D1 Full for Tier 3
`,
  },

  // ── 15. Lift & Elevator ──────────────────────────────────────────────────────
  {
    id:       "lift-elevator",
    name:     "Lift & Elevator",
    keywords: [
      "lift", "elevator", "escalator",
      "lift shaft", "lift installation", "hydraulic lift",
      "traction lift", "machine room", "lift pit",
    ],
    content: `
## Discipline-Specific Scoring Guide: Lift & Elevator (Tier 3A Licensed Services)
Applies to: passenger lifts, goods lifts, hydraulic lifts, escalators, dumbwaiters.

### Critical evidence for full D1 (Engineer Verification)
- WorkSafe / SafeWork (state authority) registration of the lift as a plant item before commissioning
- Licensed lift mechanic or elevator contractor commissioning sign-off
- Third-party inspection report from an accredited lift inspector (required before public use in most states)
- Structural engineer sign-off on lift pit and shaft structure if designed as part of the main contract

### Critical evidence for full D2 (Technical Testing)
- Full load test results (125% rated capacity) with documented test weights and pass criteria
- Safety gear test (governor trip, buffer test) records
- Levelling accuracy test records (door zone tolerance at each level)
- Electrical safety inspection: earthing, RCD protection, emergency lighting in machine room
- Hydraulic system pressure test for hydraulic lifts

### Critical evidence for full D3 (Form Completeness)
- Completed ITP covering: shaft installation, guide rails, car frame, doors, controls, machine room, and commissioning
- Reference to approved lift specification and manufacturer documentation
- Final inspection punch list resolved and closed out before handover

### Critical evidence for full D4 (Material Traceability)
- Manufacturer's data sheets and serial numbers for all major components (drive, controller, safety gear)
- Hydraulic fluid type and volume recorded for hydraulic systems

### Critical evidence for full D5 (Physical Evidence)
- Photos of pit installation, guide rail erection, car installation, and machine room
- Load test photos (weights on car, test date visible)
- Authority registration certificate copy

### Common scoring triggers
- Authority plant registration absent → D1 Missing (legal requirement — lift cannot operate without it)
- Third-party inspection report present → D1 Full
- Load test records absent → D2 Missing
- Levelling accuracy not documented → D2 Partial
`,
  },
];

// ── Detection ─────────────────────────────────────────────────────────────────

/**
 * Matches an ITP name/title to the most relevant discipline guide.
 * Returns null when no keyword match is found — the base scoring guidelines
 * will be used without discipline-specific context.
 *
 * Match priority: first keyword match wins. Guides are ordered so that more
 * specific terms appear in earlier guides (e.g. "structural steel" keywords
 * appear before the generic "steel" keyword in later guides, preventing
 * false matches).
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
