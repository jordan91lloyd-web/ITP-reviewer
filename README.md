# ITP Package Reviewer

AI-powered review of construction Inspection and Test Plan (ITP) packages, built with Next.js and Claude.

---

## How it works

**1. Upload documents**
Drag and drop (or browse for) the PDF, JPG, or PNG files that make up your inspection package — ITP, hold point releases, test certificates, sign-off sheets, photos, etc. No forms to fill in.

**2. Run the review**
Click **Run ITP Package Review**. That's it.

**3. Review the results**
Claude reads all documents together as one bundle and returns:
- **Inspection Header** — project name, project number, ITP number, ITP name, and inspection reference, extracted automatically from your documents
- **Score** (0–100) and package assessment
- **Missing evidence** — items absent from the bundle, each with a status of *Missing*, *Possibly covered elsewhere*, or *Unclear*
- **Key issues** — specific problems or inconsistencies found
- **Next actions** — concrete steps a quality manager can take
- **Document observations** — per-file notes

**4. Download the report**
Click **Download Report PDF** to save the results via the browser print dialog.

---

## How Claude extracts the inspection header

Claude identifies the package metadata automatically using this priority order:

1. **Main ITP filename** — e.g. `ITP-CON-001 Concrete Pour L3.pdf` signals the ITP number and name
2. **Title page or header row** of the primary ITP document
3. **Repeated references** across multiple documents in the bundle
4. **Cross-check** — values must appear consistently across files to be reported with high confidence

If a field cannot be confidently identified from the documents, it is shown as *Not confidently identified* rather than a guess.

---

## Setup

### Step 1 — Check Node.js is installed

```bash
node --version
```

You should see `v18.x.x` or higher. If not, download Node.js from https://nodejs.org.

### Step 2 — Install dependencies

```bash
npm install
```

### Step 3 — Set up your API key

Copy the example environment file:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key from: https://console.anthropic.com

> The `.gitignore` file already blocks `.env.local` from being committed to git.

### Step 4 — Start the dev server

```bash
npm run dev
```

Open your browser and go to **http://localhost:3000**.

---

## Supported file types

| Type | Notes |
|------|-------|
| PDF (text-based) | Text is extracted and sent to Claude |
| PDF (scanned image) | Accepted, but Claude cannot read the content — upload as JPG/PNG instead |
| JPG / JPEG | Sent directly to Claude's vision API |
| PNG | Sent directly to Claude's vision API |

**Limits:** 20 MB per file · 50 MB total bundle · 20 files per review

---

## Troubleshooting

**"ANTHROPIC_API_KEY is not set"** — Check that `.env.local` exists and contains your key, then restart the dev server (`Ctrl+C`, then `npm run dev`).

**"Claude returned a response that could not be read as JSON"** — This is rare. Click Run Review again.

**"This PDF contains no extractable text"** — The PDF is a scanned image. Take a screenshot or export as JPG/PNG and upload that instead.

**Review takes too long or times out** — Keep files reasonably sized. Claude typically responds in 30–90 seconds for a standard inspection package.

---

## Project structure

```
src/
  app/
    page.tsx                  # Home page
    layout.tsx                # Root layout
    api/review/route.ts       # POST endpoint — processes files and calls Claude
  components/
    UploadPortal.tsx           # Upload form (files only — no manual metadata)
    ReviewResults.tsx          # Results display including Inspection Header
    DropZone.tsx               # Drag-and-drop file input
  lib/
    claude.ts                 # Anthropic API client and response validation
    prompt.ts                 # System prompt, preamble, and instructions
    types.ts                  # Shared TypeScript interfaces
    validation.ts             # File type and size checks
```

The most important files for understanding how the app works:
1. `src/lib/prompt.ts` — what we ask Claude to do
2. `src/lib/claude.ts` — how we send files to Claude and parse the response
3. `src/app/api/review/route.ts` — the server-side logic

---

## Extending the app

The review logic in `src/lib/claude.ts` accepts any `ProcessedFile[]` regardless of where the files came from. To add Procore import:

1. Add a route: `src/app/api/procore/route.ts`
2. That route fetches documents from the Procore REST API
3. Process each file (extract PDF text, pass images as base64)
4. Call `runBundleReview(processedFiles)` — no other changes needed

---

## Environment variables

| Variable | Required | Where to get it |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes | https://console.anthropic.com |
