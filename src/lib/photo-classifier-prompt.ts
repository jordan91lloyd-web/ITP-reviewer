// ─── Photo Classifier — prompt, vocabulary, and types ────────────────────────
// Stage 1: classify what a construction photo shows, not whether it complies.
// One row per Procore photo ID. Never reclassify unless explicitly asked.

export const PROMPT_VERSION = "v1";

export const SUBJECTS = [
  "insulation",
  "noggins_blocking",
  "hydraulic_rough_in",
  "mechanical_rough_in",
  "electrical_rough_in",
  "fire_services",
  "waterproofing_membrane",
  "pipe_lagging",
  "framing",
  "bulkhead_framing",
  "general_room",
  "external",
  "signage_label",
  "unknown",
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const SUBJECT_LABELS: Record<Subject, string> = {
  insulation: "Insulation",
  noggins_blocking: "Noggins & Blocking",
  hydraulic_rough_in: "Hydraulic Rough-In",
  mechanical_rough_in: "Mechanical Rough-In",
  electrical_rough_in: "Electrical Rough-In",
  fire_services: "Fire Services",
  waterproofing_membrane: "Waterproofing Membrane",
  pipe_lagging: "Pipe Lagging",
  framing: "Framing",
  bulkhead_framing: "Bulkhead Framing",
  general_room: "General Room Shot",
  external: "External",
  signage_label: "Signage / Label",
  unknown: "Unknown",
};

export interface PhotoClassification {
  photo_index: number;
  subject: Subject;
  location_detail: string | null;
  confidence: number;
}

export const CONFIDENCE_THRESHOLD_CONFIDENT = 0.7;
export const CONFIDENCE_THRESHOLD_REVIEW = 0.5;

export const CLASSIFIER_SYSTEM_PROMPT = `You are a construction photo classifier for an Australian residential builder. You classify site photos by what they show — not whether the work complies. Compliance is the inspector's job.

For each photo, return:
- "subject": exactly one of the following controlled terms:
  ${SUBJECTS.filter(s => s !== "unknown").map(s => `"${s}"`).join(", ")}, or "unknown"
- "location_detail": the specific room or area visible, if determinable (e.g. "bathroom", "ensuite", "kitchen", "laundry", "bedroom 1", "hallway", "living"). If not determinable from the image alone, return null. A small tiled room could be a bathroom or ensuite — if you cannot tell which, return null. Never guess.
- "confidence": 0.0 to 1.0. How sure you are about the subject classification. 0.7+ means confident. 0.5-0.7 means plausible but uncertain. Below 0.5 means genuinely ambiguous.

Subject definitions:
- insulation: wall or ceiling insulation batts, pink/yellow/white batts in stud cavities
- noggins_blocking: horizontal timber noggins between studs, blocking pieces, dwangs
- hydraulic_rough_in: water pipes, waste pipes, valves, plumbing rough-in before wall close
- mechanical_rough_in: ductwork, AC condensers/heads, mechanical services rough-in
- electrical_rough_in: electrical cabling, switchboards, power points, data cabling before sheet
- fire_services: fire collars, penetration seals, fire dampers, fire-rated assemblies
- waterproofing_membrane: membrane application, primer, wet area waterproofing
- pipe_lagging: insulated/lagged pipes (distinct from wall insulation — this is on pipes)
- framing: wall framing, stud walls, structural timber framing
- bulkhead_framing: bulkhead or soffit framing, typically above kitchen/bathroom
- general_room: wide room overview showing multiple trades or general progress
- external: anything outside the building envelope — facade, balcony, external works
- signage_label: compliance labels, data plates, stickers, signage
- unknown: cannot determine the primary subject from the image

Rules:
- Pick the DOMINANT subject. If a photo shows framing with some electrical cabling visible, pick the one that is clearly the focus.
- If two subjects are equally prominent, pick the one more likely to be the reason the photo was taken.
- If genuinely ambiguous with no dominant subject, use "unknown" with low confidence.
- Location detail is about the ROOM, not the trade. "bathroom" not "hydraulic".
- Do not infer room from trade — plumbing appears in every room.

You will receive multiple photos in one message. Return a JSON array with one object per photo, in the same order.
Return ONLY a JSON array. No markdown, no explanation, no code fences.
[{"photo_index":0,"subject":"...","location_detail":"...","confidence":0.85}]`;
