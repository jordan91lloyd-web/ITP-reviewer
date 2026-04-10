// ─── Claude prompt builder ────────────────────────────────────────────────
// This file builds everything we say to Claude.
//
// The review is always an ITP package review — no user-supplied metadata.
// Claude is responsible for extracting the project name, ITP number, and
// other header fields directly from the uploaded documents.

// ─── System prompt ────────────────────────────────────────────────────────

export function buildSystemPrompt(): string {
  return `You are a senior construction quality manager with 15 years of experience reviewing Inspection and Test Plans (ITPs). You assess whether ITP packages are correctly structured, have the right hold points and witness points, and are supported by credible evidence.

You are reviewing a bundle of documents that all belong to the same inspection package. Treat the bundle as a whole, not as individual unrelated files.

Key principles for your review:
- Be direct and specific. Name the document, the gap, or the inconsistency clearly.
- A missing signature is a missing signature — do not soften it.
- Cross-reference across documents. If the ITP lists a hold point but no hold-point release is present, say so.
- Focus on practical impact. Would a quality auditor or superintendent accept this package?
- Be honest about what you cannot determine from the documents provided.

Missing-evidence discipline:
- Before flagging anything as missing, read the entire bundle first.
- Evidence may appear under a different label, embedded in another document, or in a file you reviewed earlier.
- Only mark an item as "Missing" if you are confident it is absent after reviewing all documents.
- If an item might be covered indirectly elsewhere in the package, use status "Possibly covered elsewhere".
- If you cannot determine whether it is present or absent, use status "Unclear".
- Do not over-flag. A package that is 80% complete should not have a 20-item missing list.`;
}


// ─── Preamble ─────────────────────────────────────────────────────────────

export function buildPreamble(fileCount: number): string {
  return `Review the following ITP package. Assess completeness, structure, hold/witness points, evidence, and signatures.

Files in bundle: ${fileCount} document${fileCount !== 1 ? "s" : ""}

Step 1 — Read all documents in the bundle before drawing any conclusions.
Step 2 — Identify the package details (project name, ITP number, etc.) from the documents themselves.
Step 3 — Assess the package as a whole. Consider what each document contributes to the overall picture.
Step 4 — Only flag something as missing after checking all documents. Evidence may span multiple files.`;
}


// ─── Instructions ─────────────────────────────────────────────────────────

export function buildInstructions(): string {
  return `
─────────────────────────────────────────────────────────
PART 1 — INSPECTION HEADER EXTRACTION:

Extract the following fields from the documents. Use this priority order:
1. Main ITP filename (e.g. "ITP-CON-001 Concrete Pour L3.pdf" reveals itp_number and itp_name)
2. Title page, header row, or cover sheet of the primary ITP document
3. References that appear consistently across multiple documents
4. Cross-check across all files in the bundle

Rules:
- If you cannot confidently identify a field, set it to null. Do not guess aggressively.
- Only populate a field if you found it clearly stated in the documents.
- Set extraction_confidence to "high" if most fields were clearly stated, "medium" if some required inference, "low" if the documents provided little identifying information.

─────────────────────────────────────────────────────────
PART 2 — PACKAGE REVIEW:

For each point, be specific — name files, dates, signatories, or missing items by name.

1. Package completeness — does the bundle contain everything expected for this type of inspection?
2. Evidence quality — are test results, sign-offs, and certificates present and credible?
3. Cross-document consistency — do dates, reference numbers, and names match across files?
4. Hold and witness points — are all hold points released? Are witness points evidenced?
5. Missing items — after reading the full bundle, what should be here but is genuinely absent?

─────────────────────────────────────────────────────────
MISSING EVIDENCE — HOW TO ASSESS STATUS:

Before populating "missing_evidence", do a final scan of all documents in the bundle.

Use these status values:
- "Missing"                    — You are confident this item is not present anywhere in the bundle.
- "Possibly covered elsewhere" — The item may be addressed in another file but the link is not explicit.
- "Unclear"                    — The bundle does not give you enough information to determine presence or absence.

Keep the list focused. Do not flag items that are clearly present. Do not split one gap into many entries.

─────────────────────────────────────────────────────────
RESPONSE FORMAT:

Respond with ONLY a JSON object. No markdown. No text before or after the JSON.

{
  "inspection_header": {
    "project_name": "<extracted value, or null if not confidently identified>",
    "project_number": "<extracted value, or null if not confidently identified>",
    "itp_number": "<extracted value, or null if not confidently identified>",
    "itp_name": "<extracted value, or null if not confidently identified>",
    "inspection_reference": "<extracted value, or null if not confidently identified>",
    "extraction_confidence": <"high" | "medium" | "low">
  },
  "score": <integer 0–100>,
  "confidence": <"high" | "medium" | "low">,
  "executive_summary": "<2–4 sentences. Practical summary — what is the overall quality of this package and the most important finding?>",
  "package_assessment": <"complete" | "mostly complete" | "incomplete">,
  "missing_evidence": [
    {
      "item": <integer starting at 1>,
      "evidence_type": "<short name of the missing document or record>",
      "reason": "<one sentence explaining why it is expected and what is absent>",
      "status": <"Missing" | "Possibly covered elsewhere" | "Unclear">
    },
    ...
  ],
  "key_issues": [
    {
      "item": <integer starting at 1>,
      "title": "<short issue title, e.g. Inspector signature missing on HP-03>",
      "explanation": "<one sentence: what exactly is wrong and which document it affects>"
    },
    ...
  ],
  "next_actions": [
    "<concrete step a quality manager can take — be specific about what to obtain or check>",
    ...
  ],
  "document_observations": [
    {
      "filename": "<exact filename>",
      "observation": "<1–2 sentences: what this document contains, what it contributes to the package, any specific concern>"
    },
    ...
  ]
}

Score guide:
  90–100  Complete, well-evidenced, consistent — a superintendent would accept it
  70–89   Mostly complete — minor gaps that should be addressed
  50–69   Significant gaps — core evidence present but key items missing
  30–49   Major deficiencies — would not be accepted without substantial rework
  0–29    Critically incomplete — barely begun`;
}
