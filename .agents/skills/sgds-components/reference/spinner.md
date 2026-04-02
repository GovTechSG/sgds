# SGDS Spinner Component Skill

`<sgds-spinner>` is the standard loading indicator. Use it to communicate that content is loading or an action is in progress.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Which `tone`?**
- Default brand color (light backgrounds) → `brand` (default)
- Neutral / subdued → `neutral`
- On dark backgrounds → `inverse`
- Always light regardless of theme → `fixed-light`
- Always dark regardless of theme → `fixed-dark`

> `variant` is **deprecated** — use `tone` instead. Never suggest `variant="primary"` or `variant="neutral"`.

**Which `size`?**
- Inline within text or compact UI → `xs` or `sm`
- Default → `md`
- Prominent loading state → `lg` or `xl`

**With a label?**
- Label below spinner (default) → set `label` + omit `orientation`
- Label beside spinner → set `label` + `orientation="horizontal"`

```html
<!-- Default spinner -->
<sgds-spinner></sgds-spinner>

<!-- With label -->
<sgds-spinner label="Loading..."></sgds-spinner>

<!-- Horizontal label layout -->
<sgds-spinner label="Loading..." orientation="horizontal"></sgds-spinner>

<!-- On a dark background -->
<div style="background-color: #222; padding: 12px;">
  <sgds-spinner tone="inverse"></sgds-spinner>
  <sgds-spinner tone="fixed-light"></sgds-spinner>
</div>

<!-- Size variants -->
<sgds-spinner size="xs"></sgds-spinner>
<sgds-spinner size="sm"></sgds-spinner>
<sgds-spinner size="md"></sgds-spinner>
<sgds-spinner size="lg"></sgds-spinner>
<sgds-spinner size="xl"></sgds-spinner>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `tone` | `brand \| neutral \| inverse \| fixed-light \| fixed-dark` | `brand` | Color tone |
| `size` | `xs \| sm \| md \| lg \| xl` | `md` | Spinner size |
| `label` | string | — | Visible text label accompanying the spinner |
| `orientation` | `horizontal \| vertical` | `vertical` | Label position relative to the spinner |
| `variant` | `primary \| neutral` | — | **Deprecated** — use `tone` instead |

## Slots

None.

## Events

None.

---

**For AI agents**:
1. Always use `tone` — never suggest the deprecated `variant` attribute.
2. `tone="inverse"` and `tone="fixed-light"` are for dark background contexts; always note the background color requirement.
3. There are no slots, events, or public methods on this component.
4. When a label is provided, use `orientation="horizontal"` for inline contexts and `orientation="vertical"` (default) for centered loading states.
5. `<sgds-spinner>` is used internally by `<sgds-button loading>`, `<sgds-input loading>`, and `<sgds-select loading>` — advise users to use the `loading` attribute on those components rather than inserting a standalone spinner.
