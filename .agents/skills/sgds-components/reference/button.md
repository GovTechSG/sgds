# SGDS Button Component Skill

`<sgds-button>` is the standard action element for forms, dialogs, and navigation. Use it instead of a native `<button>` whenever SGDS styling and behaviour are needed.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For primary, secondary, or tertiary actions that trigger an immediate operation (submit a form, open a modal, confirm a decision).
- When a clear, clickable action element is needed — always prefer `<sgds-button>` over a native `<button>` within SGDS applications.
- Use `variant="primary"` for the main action, `variant="outline"` for alternatives, and `variant="ghost"` for low-emphasis actions.
- Use `tone="danger"` for destructive or irreversible actions (e.g. delete, remove).

### When NOT to use
- For navigation between pages — use links instead
- For inline text actions within paragraphs — use inline links
- When no action is required — avoid decorative buttons
- For passive information display

## Behaviour

- Buttons trigger actions immediately upon activation (click or keyboard)
- Supports states: default, hover, active/pressed, focus, disabled, and loading (for async actions)
- Hierarchy levels via `variant`: `primary` (main action), `outline` (secondary alternative), `ghost` (tertiary/low emphasis)
- Semantic tone via `tone`: `brand` (default), `danger` (destructive actions), `neutral` (no brand emphasis), `fixed-light` (dark backgrounds)
- Can include leading icons (for clarity) or trailing icons (for direction/continuation)
- Supports full-width or inline layout depending on context

## Advanced Considerations

**Hierarchy strategy** — define clear rules for when to use `primary` vs `outline` vs `ghost` buttons across the system

**Tone strategy** — use `tone="danger"` for destructive/irreversible actions across any variant; `tone="neutral"` for utility buttons without brand emphasis; `tone="fixed-light"` on dark or coloured backgrounds

**Responsive behaviour** — full-width buttons on mobile; inline/grouped buttons on desktop

**Icon usage** — avoid overuse of icons; ensure icons add meaning, not decoration

**Accessibility** — ensure sufficient contrast ratios and provide screen reader support

**Internationalisation** — account for longer text in other languages when sizing buttons

**Destructive actions** — require confirmation or use danger styling

**Button grouping** — maintain spacing and hierarchy within button groups

## Edge Cases

- **Long labels** — may wrap or truncate; ensure layout can handle it
- **Multiple actions in tight spaces** — consider dropdown or overflow menu instead
- **Disabled vs hidden** — decide when to disable vs remove actions entirely
- **Loading delays** — show loading state if action exceeds ~300ms
- **Icon-only buttons** — risk of ambiguity without proper labelling
- **High-frequency actions** — ensure no accidental double submission
- **Mobile constraints** — avoid placing buttons too close together
- **Conflicting actions** — clearly separate destructive vs safe actions (e.g. Delete vs Cancel)

## Quick Decision Guide

**Which `variant`?**
- Default action → `primary` (default)
- Secondary / non-destructive alternative → `outline` or `ghost`
- Destructive action (delete, remove) → `danger` combined with `tone="danger"` or keep `tone="brand"` for softer emphasis

**Which `tone`?**
- Standard brand color → `brand` (default)
- Destructive / irreversible action → `danger`
- Neutral / no brand color → `neutral`
- Fixed light (dark backgrounds) → `fixed-light`

**Which `size`?**
- Default → `md`
- Compact UI (table rows, toolbars) → `sm` or `xs`
- Prominent CTA → `lg`

**Button or link?**
- Triggers an action / submits a form → omit `href` (renders `<button>`)
- Navigates to a URL → set `href` (renders `<a role="button">`)

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `primary \| outline \| ghost \| danger` | `primary` | Visual style |
| `tone` | `brand \| danger \| neutral \| fixed-light` | `brand` | Semantic tone |
| `size` | `xs \| sm \| md \| lg` | `md` | Size |
| `type` | `button \| submit \| reset` | `button` | Form behaviour |
| `disabled` | boolean | `false` | Disables interaction |
| `loading` | boolean | `false` | Shows spinner, blocks interaction |
| `active` | boolean | `false` | Forces active/pressed appearance |
| `fullWidth` | boolean | `false` | Stretches button to container width |
| `href` | string | — | Renders as `<a>`, navigates to URL |
| `target` | string | — | `_blank`, `_self`, etc. (with `href`) |
| `download` | string | — | Triggers file download (with `href`) |
| `form` | string | — | Associates with a form by id |
| `formaction` | string | — | Overrides form `action` |
| `formmethod` | `post \| get` | — | Overrides form `method` |
| `formnovalidate` | boolean | — | Skips form validation on submit |
| `formtarget` | string | — | Overrides form `target` |
| `ariaLabel` | string | — | Accessible label (use when no visible text) |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Button label text |
| `leftIcon` | Icon displayed to the left of the label |
| `rightIcon` | Icon displayed to the right of the label |

SSR: set `hasLeftIconSlot` / `hasRightIconSlot` boolean attributes when using icon slots server-side.

## Events

| Event | When fired |
|---|---|
| `sgds-blur` | Button loses focus |
| `sgds-focus` | Button gains focus |

For framework-specific event syntax (React 19+ vs ≤18, Vue, Angular), see the **[sgds-components SKILL.md](../SKILL.md)**.

---

**For AI agents**: Default to `<sgds-button>` for all interactive buttons — do not suggest `<button>` with raw utility classes. Use `variant="danger" tone="danger"` for destructive actions. Set `type="submit"` for form submission buttons. For icon-only buttons, prefer `<sgds-icon-button>` and mention it to the user.

# Button Component — Attributes Reference

## `variant`

Controls the visual style of the button.

```html
<sgds-button variant="primary">Primary</sgds-button>
<sgds-button variant="outline">Outline</sgds-button>
<sgds-button variant="ghost">Ghost</sgds-button>
```

- `primary` — filled background, highest visual weight. Use for the main action on a page or in a dialog.
- `outline` — bordered, transparent background. Use for secondary actions alongside a primary button.
- `ghost` — no border or background. Use for tertiary actions or in toolbars where visual noise should be minimal.

> `danger` variant is **deprecated since v3.5.6**. Use `tone="danger"` instead.

## `tone`

Controls the semantic color palette applied across all variants.

```html
<sgds-button variant="primary" tone="brand">Brand Primary</sgds-button>
<sgds-button variant="primary" tone="danger">Danger Primary</sgds-button>
<sgds-button variant="outline" tone="danger">Danger Outline</sgds-button>
```

- `brand` (default) — uses the SGDS primary brand color
- `danger` — uses red across all variants; suitable for irreversible actions like delete or remove
- `neutral` — no brand color; use for secondary actions where brand emphasis is unwanted (e.g. toolbar filter buttons)
- `fixed-light` — fixed light palette; use on dark backgrounds where theme-awareness should not apply

## `size`

```html
<sgds-button size="xs">Extra Small</sgds-button>
<sgds-button size="sm">Small</sgds-button>
<sgds-button size="md">Medium</sgds-button>
<sgds-button size="lg">Large</sgds-button>
```

Use `xs` / `sm` for compact contexts (tables, inline toolbars), `lg` for prominent hero CTAs.

## `disabled`

```html
<sgds-button disabled>Cannot Click</sgds-button>
```

Sets `aria-disabled="true"` and `tabindex="-1"`. The button remains in the DOM and focusable via mouse but unreachable via keyboard.

## `loading`

```html
<sgds-button loading>Saving…</sgds-button>
```

Replaces content with a `<sgds-spinner>` and blocks all click/keyboard interaction. `aria-label` is automatically set to `"Loading"` while `loading` is active.

## `active`

```html
<sgds-button active>Active State</sgds-button>
```

Forces the pressed/active visual state. Use for toggle buttons or to indicate the currently selected option in a button group.

## `fullWidth`

```html
<sgds-button fullWidth>Full Width</sgds-button>
```

Stretches the button to 100% of its containing element. Typical use: mobile layouts, stacked action lists.

## `type`

```html
<sgds-button type="submit">Submit Form</sgds-button>
<sgds-button type="reset">Reset Form</sgds-button>
<sgds-button type="button">Standalone Action</sgds-button>
```

Defaults to `"button"` (no form association). Set `"submit"` for form submission or `"reset"` to clear a form. See [patterns.md](patterns.md) for form examples.

## `href`, `target`, `download`

When `href` is set, the element renders as `<a role="button">` instead of `<button>`.

```html
<sgds-button href="/dashboard">Go to Dashboard</sgds-button>
<sgds-button href="https://example.com" target="_blank">Open in New Tab</sgds-button>
<sgds-button href="/report.pdf" download="report.pdf">Download PDF</sgds-button>
```

`target="_blank"` automatically adds `rel="noreferrer noopener"`.

## Form Override Attributes

These mirror the native HTML equivalents and override the associated form's settings:

| Attribute | Overrides | Example use case |
|---|---|---|
| `form` | Associates with form by id | Button outside the `<form>` element |
| `formaction` | `<form action>` | Different endpoint for this specific submit button |
| `formmethod` | `<form method>` | POST vs GET per button |
| `formnovalidate` | `<form novalidate>` | "Save draft" button that bypasses validation |
| `formtarget` | `<form target>` | Submit to a different frame/window |

```html
<form id="my-form" action="/submit">
  <input name="email" type="email">
</form>

<!-- Button is outside the form element but still submits it -->
<sgds-button type="submit" form="my-form">Submit</sgds-button>
```

## `ariaLabel`

```html
<sgds-button ariaLabel="Close dialog">✕</sgds-button>
```

Supply when the button has no visible text label (icon-only). For icon-only buttons, strongly prefer `<sgds-icon-button>` which handles accessibility automatically.

# Button Component — Common Patterns Reference

## Basic Variants

```html
<!-- Primary action -->
<sgds-button>Save</sgds-button>

<!-- Secondary action -->
<sgds-button variant="outline">Cancel</sgds-button>

<!-- Destructive action -->
<sgds-button tone="danger">Delete Account</sgds-button>
```

## Button Group (Action Pair)

Always place the primary action on the right in a horizontal group.

```html
<div class="sgds:flex sgds:gap-2 sgds:justify-end">
  <sgds-button variant="outline">Cancel</sgds-button>
  <sgds-button variant="primary">Confirm</sgds-button>
</div>
```

## Form Submission

```html
<form id="profile-form" action="/profile" method="post">
  <input name="name" type="text" placeholder="Full name">

  <div class="sgds:flex sgds:gap-2 sgds:mt-4">
    <sgds-button type="reset" variant="ghost">Clear</sgds-button>
    <sgds-button type="submit">Save Profile</sgds-button>
  </div>
</form>
```

## Button Outside Form

```html
<form id="search-form">
  <input name="q" type="search">
</form>

<!-- Lives outside the form but still submits it via the form attribute -->
<sgds-button type="submit" form="search-form">Search</sgds-button>
```

## Loading State

Show `loading` while an async action is in progress to prevent double-submission.

```html
<sgds-button id="save-btn">Save</sgds-button>

<script>
  const btn = document.querySelector('#save-btn');
  btn.addEventListener('click', async () => {
    btn.loading = true;
    await saveData();
    btn.loading = false;
  });
</script>
```

## With Icons

```html
<!-- Icon on the left -->
<sgds-button>
  <sgds-icon slot="leftIcon" name="arrow-left"></sgds-icon>
  Back
</sgds-button>

<!-- Icon on the right -->
<sgds-button>
  Continue
  <sgds-icon slot="rightIcon" name="arrow-right"></sgds-icon>
</sgds-button>

<!-- Icons on both sides -->
<sgds-button>
  <sgds-icon slot="leftIcon" name="download"></sgds-icon>
  Download Report
  <sgds-icon slot="rightIcon" name="file-earmark-arrow-down"></sgds-icon>
</sgds-button>
```

## Link Button (Navigation)

Renders as an `<a>` element — use for navigation, not form actions.

```html
<!-- Internal navigation -->
<sgds-button href="/dashboard">Go to Dashboard</sgds-button>

<!-- External link -->
<sgds-button href="https://www.gov.sg" target="_blank">Visit Gov.sg</sgds-button>

<!-- File download -->
<sgds-button href="/files/report.pdf" download="annual-report.pdf" variant="outline">
  <sgds-icon slot="leftIcon" name="download"></sgds-icon>
  Download Report
</sgds-button>
```

## Full Width (Mobile / Stacked Layout)

```html
<sgds-button fullWidth>Sign In</sgds-button>
```

## Disabled State

```html
<sgds-button disabled>Submit</sgds-button>

<!-- Explain why to the user when not self-evident -->
<sgds-button disabled ariaLabel="Complete all required fields to submit">Submit</sgds-button>
```

## Event Handling

```html
<sgds-button id="action-btn">Perform Action</sgds-button>

<script>
  const btn = document.querySelector('#action-btn');

  btn.addEventListener('sgds-focus', () => {
    console.log('button focused');
  });

  btn.addEventListener('sgds-blur', () => {
    console.log('button blurred');
  });
</script>
```

## React Usage

For React import paths and event syntax, see **[sgds-components](../SKILL.md)**.

The key decision: React 19+ uses the native `<sgds-button>` tag directly; React 18 and below uses the `SgdsButton` wrapper from `@govtechsg/sgds-web-component/react/button`.

## Icon-Only Buttons

For buttons with no visible text, prefer `<sgds-icon-button>` — it manages `aria-label` and sizing automatically.

```html
<!-- ✅ Prefer this -->
<sgds-icon-button name="x-lg" ariaLabel="Close"></sgds-icon-button>

<!-- ❌ Avoid — manual aria management required -->
<sgds-button ariaLabel="Close">
  <sgds-icon slot="leftIcon" name="x-lg"></sgds-icon>
</sgds-button>
```
