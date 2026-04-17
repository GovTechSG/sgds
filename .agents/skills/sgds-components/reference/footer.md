# SGDS Footer Component Skill

`<sgds-footer>` is the standard footer for Singapore Government digital services. It renders a structured footer with mandatory links (Contact, Feedback, Privacy, Terms of Use) and supports optional site columns via `<sgds-footer-item>`.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- On every Singapore Government digital service page as the mandatory site footer.
- When the site requires standard compliance links (Privacy Statement, Terms of Use, Contact, Feedback).
- When the footer needs to include navigational site columns grouped by topic (e.g. Guides, Resources, About).
- When a portal description and brand heading above the footer columns is needed.

### When NOT to use

- As a section divider or content block within a page — it is a page-level structural component only.
- In email templates or non-web contexts where standard HTML footers apply.
- When the footer layout needs to deviate significantly from the SGDS standard — use the *(default)* slot for full control, but remain aligned to government branding guidelines.

## Behaviour

- Renders a two-part footer: an upper section with optional title, description, and site columns, and a lower bar with mandatory compliance links.
- `contactHref`, `feedbackHref`, `privacyHref`, and `termsOfUseHref` are required links — they default to `"#"` if not set.
- `faqHref` and `sitemapHref` are optional — they appear in the lower bar only when a value is provided.
- `<sgds-footer-item slot="items">` renders a column with a heading (`title` slot) and `<sgds-link>` children.
- The `title` and `description` slots render above the columns in the upper section.
- The *(default)* slot replaces the entire column layout — use only when full custom control is needed.
- `copyrightLiner` sets the copyright entity name in the bottom bar; defaults to `"Government of Singapore"`.
- No custom events or public methods.

## Component Composition

**`title` slot** — the site or portal name as a heading element (e.g. `<h2 slot="title">Portal Name</h2>`).

**`description` slot** — a single short paragraph describing the portal's purpose.

**`items` slot** — one `<sgds-footer-item slot="items">` per column. Inside each `<sgds-footer-item>`:
- `title` slot: the column heading (e.g. `<div slot="title">Guides</div>`)
- Default slot: `<sgds-link><a href="...">Label</a></sgds-link>` elements for column navigation links. Do not use bare `<a>` tags.

**Default slot (`<sgds-footer>`)** — full custom column layout that replaces the `items` slot entirely. Use only when the standard grid layout is insufficient; do not mix with `items` slot in the same footer.

**Avoid placing inside a footer:**
- Interactive components beyond navigation links — the footer is a navigation and compliance element
- Content that belongs in the page body — the footer is a page-level structural component, not a content container

## Advanced Considerations

- **`privacyHref` and `termsOfUseHref` are mandatory**: these must always point to the correct pages — Singapore Government standards require these links on every website footer.
- **`faqHref` and `sitemapHref` are optional**: omitting them removes the corresponding link from the footer bar entirely — only set them when the pages exist.
- ***(default)* slot overrides `items`**: placing content in the *(default)* slot replaces the auto-formatted `items` grid — do not mix both; use `items` slot for standard column layouts.
- **`copyrightLiner` override**: only change this for statutory boards or entities where the copyright is not "Government of Singapore" — verify with your agency's legal team.
- **Column link format**: each `<sgds-footer-item>` column uses `<sgds-link><a href="...">Label</a></sgds-link>` — do not use bare `<a>` tags directly.

## Edge Cases

- **Missing `privacyHref` / `termsOfUseHref`**: links default to `"#"` — always provide valid URLs before deploying.
- **No `items` and no *(default)* slot**: renders a footer with only the bottom compliance bar and no columns — valid for minimal footers.
- **`items` and *(default)* slot both provided**: the *(default)* slot wins and the `items` columns are not rendered — use only one approach per implementation.
- **Empty `<sgds-footer-item>`**: renders a column with a heading but no links — always include at least one `<sgds-link>` inside each `<sgds-footer-item>`.
- **Long column link lists**: all links render in a vertical stack; there is no built-in truncation — keep column link counts reasonable for readability.

## Quick Decision Guide

**Minimal footer (just the legal links bar)?** → Use `<sgds-footer>` with no slots

**Add site column links?** → Use `<sgds-footer-item slot="items">` for each column

**Custom title or description above the columns?** → Use the `title` and `description` slots

**Full control over footer layout?** → Use the *(default)* slot — this overrides the `items` slot layout

```html
<!-- Minimal footer with just mandatory links -->
<sgds-footer
  contactHref="https://form.gov.sg/"
  feedbackHref="https://form.gov.sg/"
  faqHref="/faq"
  privacyHref="/privacy"
  termsOfUseHref="/terms-of-use"
  sitemapHref="/sitemap"
></sgds-footer>

<!-- Full footer with title, description, and custom columns -->
<sgds-footer
  contactHref="https://form.gov.sg/"
  feedbackHref="https://form.gov.sg/"
  faqHref="/faq"
  privacyHref="/privacy"
  termsOfUseHref="/terms-of-use"
  sitemapHref="/sitemap"
>
  <h2 slot="title">Name of Portal</h2>
  <p slot="description">Brief description of the portal's purpose.</p>

  <sgds-footer-item slot="items">
    <div slot="title">Guides</div>
    <sgds-link><a href="/guides/getting-started">Getting Started</a></sgds-link>
    <sgds-link><a href="/guides/installation">Installation</a></sgds-link>
    <sgds-link><a href="/guides/migration">Migration Guide</a></sgds-link>
  </sgds-footer-item>

  <sgds-footer-item slot="items">
    <div slot="title">Resources</div>
    <sgds-link><a href="/resources/forms">Forms</a></sgds-link>
    <sgds-link><a href="/resources/templates" target="_blank">Templates</a></sgds-link>
  </sgds-footer-item>
</sgds-footer>
```

## API Summary

### `<sgds-footer>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `contactHref` | string | `"#"` | URL for the Contact link |
| `feedbackHref` | string | `"#"` | URL for the Feedback link |
| `faqHref` | string | `""` | URL for the FAQ link |
| `sitemapHref` | string | `""` | URL for the Sitemap link |
| `privacyHref` | string | `"#"` | URL for the Privacy Statement link |
| `termsOfUseHref` | string | `"#"` | URL for the Terms of Use link |
| `copyrightLiner` | string | `"Government of Singapore"` | Copyright entity name shown in the footer bottom bar |

## Slots

### `<sgds-footer>`

| Slot | Purpose |
|---|---|
| `title` | Site or portal name heading |
| `description` | Brief portal description |
| `items` | `<sgds-footer-item>` column elements (auto-formatted in a grid) |
| *(default)* | Full custom footer body — overrides the `items` slot layout |

### `<sgds-footer-item>`

| Slot | Purpose |
|---|---|
| `title` | Column heading (e.g. `<div slot="title">Column Name</div>`) |
| *(default)* | `<sgds-link>` elements for the column links |

## Events

None.

---

**For AI agents**:
1. Always set `privacyHref` and `termsOfUseHref` to the correct pages — these are mandatory links on Singapore Government footers.
2. Use `<sgds-footer-item slot="items">` for each column; place `<sgds-link>` elements inside for navigation links.
3. The *(default)* slot replaces the entire `items` layout — use only when custom column styling is required.
4. `copyrightLiner` defaults to `"Government of Singapore"` — override only for statutory boards with different copyright entities.
5. There are no custom events or public methods on this component.
