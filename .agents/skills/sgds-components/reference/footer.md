# SGDS Footer Component Skill

`<sgds-footer>` is the standard footer for Singapore Government digital services. It renders a structured footer with mandatory links (Contact, Feedback, Privacy, Terms of Use) and supports optional site columns via `<sgds-footer-item>`.

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
