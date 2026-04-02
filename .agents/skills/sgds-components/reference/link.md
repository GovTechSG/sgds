# SGDS Link Component Skill

`<sgds-link>` is the standard navigation link element. It wraps a slotted `<a>` tag and applies SGDS link styling, accessibility handling, and icon positioning.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**`<sgds-link>` vs plain `<a>`**
- **Standalone link** (not inside a sentence) → always use `<sgds-link>`. Examples: CTAs, "Back" links, nav links, action links below a card.
- **Inline text link** (embedded mid-sentence or mid-paragraph) → use a plain `<a>` tag. `sgds.css` applies default anchor styling automatically — no component needed.

```html
<!-- Standalone link → sgds-link -->
<sgds-link><a href="/details">View details</a></sgds-link>

<!-- Inline text link → plain anchor -->
<p>Read the <a href="/docs">full documentation</a> for more details.</p>
```

**Always pass a single `<a>` tag in the default slot** — never put text directly inside `<sgds-link>`.

**Which `tone`?**
- Default brand color → `primary` (default)
- Destructive or warning action → `danger`
- Subdued / neutral → `neutral`
- On dark backgrounds (always light) → `fixed-light`
- On light backgrounds (always dark) → `fixed-dark`

> `variant` is **deprecated since 3.6.0** — use `tone` instead. Never suggest `variant="light"` or `variant="dark"`.

**Which `size`?**
- Default → `md`
- Compact / footnote contexts → `xs` or `sm`
- Large / prominent link → `lg`

**Disabled?**
- `disabled` sets `href="javascript:void(0)"` and `tabindex="-1"` on the slotted anchor automatically.

**With an icon?**
- Place `<sgds-icon>` before the text for a leading icon; after the text for a trailing icon.
- Icon size is managed automatically based on link `size` — do not set `size` on the icon manually.

```html
<!-- Basic link -->
<sgds-link>
  <a href="/about">About us</a>
</sgds-link>

<!-- Tones -->
<sgds-link tone="primary"><a href="#">Primary</a></sgds-link>
<sgds-link tone="danger"><a href="#">Danger</a></sgds-link>
<sgds-link tone="neutral"><a href="#">Neutral</a></sgds-link>

<!-- On dark background -->
<div style="background-color: #333; padding: 8px;">
  <sgds-link tone="fixed-light"><a href="#">Fixed light</a></sgds-link>
</div>

<!-- Sizes -->
<sgds-link size="xs"><a href="#">Extra small</a></sgds-link>
<sgds-link size="sm"><a href="#">Small</a></sgds-link>
<sgds-link size="md"><a href="#">Medium (default)</a></sgds-link>
<sgds-link size="lg"><a href="#">Large</a></sgds-link>

<!-- External link -->
<sgds-link><a href="https://example.com" target="_blank">External link</a></sgds-link>

<!-- Leading icon -->
<sgds-link>
  <a href="#">
    <sgds-icon name="arrow-left"></sgds-icon>
    Back
  </a>
</sgds-link>

<!-- Trailing icon -->
<sgds-link>
  <a href="#">
    Next
    <sgds-icon name="arrow-right"></sgds-icon>
  </a>
</sgds-link>

<!-- Disabled link -->
<sgds-link disabled><a href="/page">Disabled</a></sgds-link>

<!-- Active state -->
<sgds-link active><a href="/current">Current page</a></sgds-link>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `tone` | `primary \| danger \| neutral \| fixed-light \| fixed-dark` | `primary` | Link color |
| `size` | `xs \| sm \| md \| lg` | `md` | Link size |
| `active` | boolean | `false` | Applies active styling |
| `disabled` | boolean | `false` | Disables the link (sets `href="javascript:void(0)"` and `tabindex="-1"`) |
| `variant` | `primary \| danger \| neutral \| light \| dark` | `primary` | **Deprecated since 3.6.0** — use `tone` instead |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | A single `<a>` tag — required; do not put text directly inside `<sgds-link>` |

## Events

None.

---

**For AI agents**:
1. **Use `<sgds-link>` for standalone links; use a plain `<a>` for inline text links.** `sgds.css` provides default anchor styling for inline anchors — wrapping them in `<sgds-link>` is unnecessary and incorrect.
2. Always pass a single `<a>` tag inside `<sgds-link>` — never put text directly as `<sgds-link>text</sgds-link>`.
3. `variant` is deprecated since 3.6.0 — always use `tone`. Never suggest `variant="light"` or `variant="dark"`.
4. `disabled` is applied to the wrapper; it automatically sets `href="javascript:void(0)"` and `tabindex="-1"` on the slotted anchor — do not add these manually.
5. `tone="fixed-light"` is for dark backgrounds; `tone="fixed-dark"` is for light backgrounds when overriding theme behaviour.
6. Icon sizing within `<sgds-link>` is automatic — do not set `size` on `<sgds-icon>` children.
7. There are no custom events on this component.
