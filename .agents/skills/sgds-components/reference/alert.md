# SGDS Alert Component Skill

`<sgds-alert>` displays short, contextual feedback messages — info, success, warnings, or errors. `<sgds-alert-link>` renders a styled inline link inside the alert body. Use this instead of building custom notification banners.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- To provide contextual feedback about an action, event, or system state — success, warning, error, or informational.
- When feedback is directly related to content on the current page and should appear inline near the relevant section.
- For form-level validation summaries (e.g. "Please fix the errors below before submitting").
- When a temporary or persistent message needs to be visible within the page layout without blocking the user.

### When NOT to use
- For interruptive or critical decisions → use modal/dialog
- For passive or static information → use text
- For global messaging across pages → use banner
- For inline validation → use form field error

## Behaviour

**Visibility**
- Appears inline within layout
- Should be placed near relevant content or action

**Dismissibility**
- Optional dismiss button
- User-initiated dismissal
- Should not reappear unless re-triggered

**Persistence**
- Temporary → tied to session or action
- Persistent → remains until resolved or dismissed

**Stacking**
- Multiple alerts stack vertically
- Limit number to avoid overload
- Prioritise by severity: Danger > Warning > Info > Success > Neutral

## Component Composition

**`icon` slot** — a single `<sgds-icon size="md">` that matches the alert's semantic variant:
- `info` → `<sgds-icon name="info-circle-fill" size="md">`
- `success` → `<sgds-icon name="check-circle-fill" size="md">`
- `danger` → `<sgds-icon name="exclamation-circle-fill" size="md">`
- `warning` → `<sgds-icon name="exclamation-triangle-fill" size="md">`
- Omit the slot entirely for a text-only (no icon) alert.
- Always set `size="md"` on the icon — this is the required size for alert icons.

**Default slot (body)** — paragraph text and `<sgds-alert-link>` elements for inline links. Basic HTML is permitted (`<strong>`, `<em>`, `<p>`). Avoid placing interactive components in the body — alerts are informational only.

**`<sgds-alert-link>`** — use this instead of a plain `<a>` tag for any link inside the alert body; it applies the correct variant-matched link style automatically.

**Avoid placing inside an alert:**
- `<sgds-button>` elements — use `<sgds-alert-link>` for all in-alert call-to-action links
- Form inputs or complex interactive components
- Long multi-paragraph content — keep alerts concise; link out for details

## Advanced Considerations

**Variant Strategy**
- Filled → high emphasis, critical or important messages
- Outlined → lower emphasis, supportive messaging
- Neutral → use when semantic meaning is not required

**Alert vs Toast vs System Banner**

| Component | Usage |
|---|---|
| Alert | Inline, persistent, contextual |
| Toast | Temporary, overlay, passive |
| System Banner | Global, page-level messaging |

**Placement Strategy**
- Place close to triggering action or relevant content
- Avoid placing at unrelated sections of the page
- For forms: top of form → summary errors; inline → contextual guidance

## Edge Cases

- **Multiple alerts** — risk of cognitive overload; prioritise and consolidate
- **Long content** — reduces readability; keep concise or link out
- **Missing actions** — user unsure what to do; always provide next step if needed
- **Auto-dismiss behaviour** — may cause users to miss important info; avoid auto-dismiss for critical alerts
- **Repeated alerts** — same alert appearing multiple times; deduplicate or persist state
- **Accessibility gaps** — alerts not announced or not focusable; apply correct ARIA roles and keyboard support

## Quick Decision Guide

**Which `variant`?**
- Informational → `info` (default)
- Positive / completed → `success`
- Error / destructive → `danger`
- Caution → `warning`
- Neutral / subdued → `neutral`

**Filled or outlined?**
- Solid colored background (default) → omit `outlined`
- Lighter outline style → add `outlined`

**Dismissible?**
- Permanent message → omit `dismissible`
- User can close it → add `dismissible` (close button appears automatically)

**Visible on first render?**
- Set `show` to control visibility. Both dismissible and non-dismissible alerts require `show` to be visible.

```html
<!-- Basic alert with icon -->
<sgds-alert show variant="info" title="Title">
  <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
  <div>Description with <sgds-alert-link href="#">link</sgds-alert-link></div>
</sgds-alert>

<!-- All variants -->
<sgds-alert show variant="success" title="Success alert">
  <sgds-icon slot="icon" name="check-circle-fill" size="md"></sgds-icon>
  <div>Operation completed.</div>
</sgds-alert>

<sgds-alert show variant="danger" title="Error alert">
  <sgds-icon slot="icon" name="exclamation-circle-fill" size="md"></sgds-icon>
  <div>Something went wrong.</div>
</sgds-alert>

<sgds-alert show variant="warning" title="Warning alert">
  <sgds-icon slot="icon" name="exclamation-triangle-fill" size="md"></sgds-icon>
  <div>Proceed with caution.</div>
</sgds-alert>

<sgds-alert show variant="neutral" title="Neutral alert">
  <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
  <div>Here is some information.</div>
</sgds-alert>

<!-- Outlined variant -->
<sgds-alert show variant="info" title="Title" outlined>
  <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
  <div>Outlined alert.</div>
</sgds-alert>

<!-- Dismissible alert -->
<sgds-alert show variant="info" title="Title" dismissible>
  <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
  <div>This alert can be closed.</div>
</sgds-alert>

<!-- Alert without icon -->
<sgds-alert show title="Title">
  <div>Alert with no icon.</div>
</sgds-alert>
```

## API Summary — `<sgds-alert>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `show` | boolean | `false` | Controls visibility of the alert |
| `variant` | `info \| success \| danger \| warning \| neutral` | `info` | Visual theme variant |
| `outlined` | boolean | `false` | Lighter outlined style instead of solid filled |
| `dismissible` | boolean | `false` | Shows a close button so the user can dismiss the alert |
| `title` | string | — | Alert title text (plain text only, no HTML) |

## API Summary — `<sgds-alert-link>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `href` | string | — | URL the link navigates to |
| `target` | `_blank \| _parent \| _self \| _top` | — | Browser open target |

## Slots — `<sgds-alert>`

| Slot | Purpose |
|---|---|
| *(default)* | Main alert body content (HTML allowed — paragraphs, links via `sgds-alert-link`) |
| `icon` | Icon displayed to the left of the title; pass a single `<sgds-icon>` or SVG element |

## Slots — `<sgds-alert-link>`

| Slot | Purpose |
|---|---|
| *(default)* | The link label text |

## Events — `<sgds-alert>`

| Event | When Fired | Detail |
|---|---|---|
| `sgds-show` | When the alert becomes visible (`show` set to `true`) | — |
| `sgds-hide` | After the alert closes (`show` set to `false`) | — |

For framework-specific event syntax (React, Vue, Angular) see the **[sgds-components SKILL.md](../SKILL.md)**.

## Public Methods — `<sgds-alert>`

| Method | Description |
|---|---|
| `close()` | Sets `show` to `false`, closing the alert |

---

**For AI agents**:
1. Always use `<sgds-alert>` for feedback messages — never suggest custom `<div>` banners.
2. `show` must be set to `true` for the alert to be visible regardless of whether it is `dismissible`.
3. The `icon` slot is optional; omit it for a text-only alert. When using it, always set `size="md"` on the `<sgds-icon>`.
4. Use `<sgds-alert-link>` (not a plain `<a>` tag) for any link inside the alert body.
5. `title` accepts plain text only — do not pass HTML into the `title` attribute.
6. `close()` programmatically dismisses the alert; listening for `sgds-hide` confirms it has closed.
7. `outlined` and `dismissible` can be combined freely with any `variant`.
