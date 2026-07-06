---
name: semantic-html
description: Write accessible, semantic HTML markup using the correct elements for structure, landmarks, headings, lists, forms, and interactive controls. Use when building or reviewing UI/JSX, fixing div-soup, improving accessibility (a11y), SEO, or screen-reader support. Activates for new components, page layouts, navigation, forms, and accessibility audits.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Semantic HTML

## Overview

Use HTML elements for their meaning, not their default appearance. Semantic markup gives screen readers, search engines, and browsers a correct model of the page: landmarks to navigate by, headings to outline, and controls that are keyboard-operable for free. Reach for a `div`/`span` only when no semantic element fits.

## Project Note: UI Component Wrappers

This codebase exposes wrapper components in `components/ui/` (`Text`, `Button`, `Image`, `Input`, etc.) that you must use instead of raw HTML (see AGENTS.md). Semantic HTML still applies **through** them:

- `Text` should render the right element via its `as`/`tag` prop (`h1`–`h6`, `p`, `span`, `label`). A heading must be a real heading element, not a styled `span`.
- `Button` must output a `<button>` (or `<a>` for navigation), never a clickable `<div>`.
- Structural landmarks (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `ul`/`li`) have no wrapper — use the real elements directly in JSX.

Before adding a raw element, check whether a `components/ui/` wrapper exists for it. Before assuming a wrapper is non-semantic, read its props — pass the correct element type.

## Document Landmarks

Every page should be navigable by landmark. Use each region element for its role:

```tsx
<header>      {/* banner: logo, top-level nav */}
  <nav aria-label="Primary">…</nav>
</header>
<main>        {/* exactly ONE per page; the primary content */}
  <article>…</article>   {/* self-contained, syndicatable content */}
  <section aria-labelledby="…">…</section>  {/* thematic grouping, needs a heading */}
  <aside>…</aside>        {/* tangential: sidebars, related links */}
</main>
<footer>…</footer>   {/* contentinfo: copyright, secondary nav */}
```

Rules:
- Exactly **one `<main>`** per page. In App Router, place it in the page/layout, not nested in components.
- `<section>` is only semantic when it has an accessible name — give it a heading or `aria-labelledby`. Otherwise use a `<div>`.
- Multiple `<nav>`s need distinct `aria-label`s (e.g. "Primary", "Footer", "Breadcrumb").

## Headings

Headings form the document outline screen-reader users navigate by.

- One `<h1>` per page describing its purpose.
- Do not skip levels (`h2` → `h4`). Nest by structure, not by font size.
- Never fake a heading with a styled `<p>`/`<span>`/`<div>`. Use the real tag and style it.

```tsx
// ❌ WRONG — looks like a heading, means nothing
<Text as="span" className="text-3xl font-bold">Dashboard</Text>

// ✅ CORRECT
<Text as="h1" className="text-3xl font-bold">Dashboard</Text>
```

## Lists

Any repeated/enumerable collection is a list — screen readers announce item counts.

```tsx
// ❌ WRONG
<div>{items.map(i => <div key={i.id}>{i.name}</div>)}</div>

// ✅ CORRECT
<ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
```

Use `<ol>` for ordered/ranked sequences, `<dl>`/`<dt>`/`<dd>` for key-value pairs (specs, metadata).

## Interactive Elements

Use the element that already has the behavior, focus, and keyboard support built in.

| Intent | Use | Never |
|---|---|---|
| Trigger an action (submit, toggle, open) | `<button type="button">` | `<div onClick>` |
| Navigate to a URL | `<a href>` / Next `<Link>` | `<button onClick={router.push}>` for plain links |
| Single choice | `<input type="radio">` | clickable divs |
| On/off | `<input type="checkbox">` | styled div toggles |

```tsx
// ❌ WRONG — not focusable, no Enter/Space, no role
<div className="btn" onClick={handleSave}>Save</div>

// ✅ CORRECT
<Button type="button" onClick={handleSave}>Save</Button>  // renders <button>
```

A clickable `<div>` requires you to re-add `role`, `tabIndex`, and `onKeyDown` by hand — and you'll get it wrong. Use the native control.

## Forms

```tsx
<form onSubmit={handleSubmit}>
  <label htmlFor="email">Email</label>
  <input id="email" name="email" type="email" autoComplete="email" required />

  <fieldset>
    <legend>Notifications</legend>
    <label><input type="radio" name="freq" value="daily" /> Daily</label>
    <label><input type="radio" name="freq" value="weekly" /> Weekly</label>
  </fieldset>

  <Button type="submit">Subscribe</Button>
</form>
```

Rules:
- Every input has an associated `<label>` (via `htmlFor`/`id`, or wrapping). Placeholder is **not** a label.
- Wrap actual forms in `<form>` so Enter submits and browser autofill works.
- Group related radios/checkboxes in `<fieldset>` + `<legend>`.
- Use specific `type`s (`email`, `tel`, `url`, `number`, `password`) and `autoComplete` tokens for better mobile keyboards and autofill.
- The submit control is `type="submit"` inside the form.

## Other Meaningful Elements

- `<figure>` + `<figcaption>` — images/diagrams with captions.
- `<time dateTime="2026-06-15">` — machine-readable dates.
- `<address>` — contact info for its nearest article/page.
- `<details>`/`<summary>` — native disclosure/accordion (no JS needed).
- `<table>` with `<thead>`/`<tbody>`/`<th scope>` — tabular data only, never layout.
- `<blockquote>`/`<cite>`, `<code>`/`<pre>`, `<strong>` (importance) vs `<b>` (stylistic), `<em>` (emphasis) vs `<i>`.

## When a `<div>`/`<span>` Is Correct

They are the right tool for purely presentational grouping with no semantic meaning: fl/grid layout wrappers, styling hooks, animation containers. Don't force semantics where there is none — but don't reach for them first either.

## ARIA: Last Resort

> "No ARIA is better than bad ARIA."

Prefer a native element over an ARIA-bolted `<div>`. Use ARIA only to fill gaps:
- `aria-label` / `aria-labelledby` to name landmarks and icon-only buttons.
- `aria-current="page"` on the active nav link.
- `aria-expanded` / `aria-controls` on custom disclosure triggers.
- Never set a `role` that contradicts the element (`<button role="link">`), and never add `aria-*` that duplicates native semantics.

## Review Checklist

- [ ] Page has exactly one `<main>` and a logical landmark structure (`header`/`nav`/`main`/`footer`).
- [ ] Single `<h1>`; heading levels don't skip; no fake headings via styled text.
- [ ] Repeated collections use `<ul>`/`<ol>`/`<li>`, not div stacks.
- [ ] Clickable things are `<button>`; navigation is `<a>`/`<Link>` — no `onClick` divs.
- [ ] Every input has a real `<label>`; forms wrapped in `<form>`; related controls in `<fieldset>`.
- [ ] `Text`/`Button` wrappers render the correct underlying element (`as`/`tag` prop set).
- [ ] `<section>`s have accessible names; multiple `<nav>`s are labeled.
- [ ] `<div>`/`<span>` used only for presentation, not to replace a semantic element.
- [ ] ARIA used only where native semantics fall short, and never contradicts the element.
