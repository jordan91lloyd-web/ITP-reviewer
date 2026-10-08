# Driving the Procore Template Editor

> Extracted from CLAUDE.md on 8 Oct 2026. Reference material for browser automation of the Procore checklist template editor.

## Rule 1: Never trust screenshot coordinates

Check the real geometry before clicking anything:

```js
JSON.stringify({dpr:devicePixelRatio, vw:innerWidth, vh:innerHeight})
```

On the run of 30 Aug this returned `dpr 0.75, vw 2560` while the screenshot came back 1568px wide. Screenshot coords were off by ~3.3x.

## Rule 2: Drive the editor from the DOM

Item titles are `<textarea>` elements. The a11y tree does not expose textarea values and misattributes Quick add buttons to the wrong section.

```js
// collapse every section first — collapsed sections are removed from the DOM
const secBtns = () => [...document.querySelectorAll('button')]
  .filter(b => /section/i.test(b.getAttribute('aria-label') || ''));
for (let i = 0; i < 12; i++) {
  const b = secBtns().find(x => x.getAttribute('aria-label') === 'Collapse section');
  if (!b) break; b.click(); await new Promise(r => setTimeout(r, 700));
}

// pick a section by its leading number, not name ("INSTALLATION" matches "POST-INSTALLATION")
const secBtn = n => secBtns().find(b => {
  const r = b.closest('tr') || b.parentElement.parentElement.parentElement;
  return (r.innerText || '').trim().split(/\s+/)[0] === String(n);
});

// delete a row by title
const ta = [...document.querySelectorAll('textarea')].find(t => t.value === 'Ensuite');
const row = ta.parentElement.parentElement.parentElement;
[...row.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === 'Delete').click();
```

## Renaming a row

Use the native setter so React sees it:

```js
const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
set.call(ta, 'Ensuite');
ta.dispatchEvent(new Event('input', {bubbles: true}));
ta.dispatchEvent(new Event('change', {bubbles: true}));
```

Verify with `[...document.querySelectorAll('textarea')].map(t => t.value)` before pressing Update.

## Quick add

Focus the Quick add textarea (the one with no placeholder, lowest on the page), type item names separated by Return, then read the Preview pane numbering before clicking `Add N items`. Pick the right section's Quick add button by y-coordinate, not DOM index.

## Creating locations

The Locations tool (`/tools/locations`) has a tiered picker. The tier list is virtualised — set `scrollTop` AND dispatch a `scroll` event. The value must be typed with real key events after focusing the input via JS.

## Procore REST API via browser session

From a page on `us02.procore.com`, same-origin `fetch` with `credentials:'include'` works without a bearer token:

```js
await fetch(`/rest/v1.1/projects/${pid}/checklist/lists/${id}`, {
  method: 'PATCH', credentials: 'include',
  headers: {'Procore-Company-Id': cid, 'Content-Type': 'application/json'},
  body: JSON.stringify({list: {description: 'W101'}})
});
```
