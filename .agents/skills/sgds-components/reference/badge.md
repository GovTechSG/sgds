# SGDS Badge Component Skill

`<sgds-badge>` is the standard label and status indicator element. Use it to highlight categories, states, or short descriptive text alongside other content.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- To label or categorise content items (e.g. status tags, category chips, count indicators).
- When a short, scannable label helps users identify the type or state of an item at a glance.
- Alongside other elements (cards, list items, table cells) to surface metadata like "New", "Active", or a numeric count.
- When a visual distinction between states is needed in a compact, non-interactive form.

### When NOT to use
- For long or detailed content
- As a primary method of communication
- When the meaning relies only on color without text/icon support
- For critical alerts or important messages — use alert instead
- As a replacement for buttons or interactive elements

## Behaviour

- Badges are non-interactive by default
- Content inside badges should be short and concise
- Badge size adapts to content but maintains consistent height
- Supports different variants (e.g. neutral, success, warning, danger)
- Can include: text only, icon + text, or numeric values
- May support dismissible behaviour (use cautiously)

## Advanced Considerations

**Semantic consistency** — ensure badge variants align with system-wide meaning (e.g. success ≠ completed unless defined)

**Scalability** — badge should work across different components (cards, tables, lists)

**Accessibility** — ensure sufficient color contrast, provide text alternatives for icons, avoid relying solely on color

**Density & layout** — maintain spacing consistency when used in groups; avoid clutter in high-density UI (e.g. tables)

**Tokenisation** — use design tokens for color, spacing, typography, and border radius; ensure alignment with system roles (e.g. surface, text, border)

## Edge Cases

- **Large numbers** — use truncation (e.g. "99+") instead of long values
- **Dynamic content** — ensure layout does not break with changing values
- **Localisation** — handle longer translated text gracefully
- **Icon-only badges** — must include accessible labels (ARIA)
- **Multiple badges together** — avoid visual overload; maintain consistent spacing and hierarchy

## Quick Decision Guide

**Which `variant`?**
- Default / informational → `primary` (default)
- Supporting accent color → `accent`
- Positive / completed → `success`
- Error / invalid → `danger`
- Caution → `warning`
- Teal supplementary tone → `cyan`
- Purple supplementary tone → `purple`
- Subdued / neutral → `neutral`
- Light-on-dark contexts → `white`
- ~~`info`~~ — **deprecated**; use `primary` instead

**Filled or outlined?**
- Filled (default) → omit `outlined`
- Low-emphasis / outlined style → add `outlined`
- **Many badges visible at once** (e.g. a table column full of status badges, or a list of tagged items) → use `outlined` to reduce visual noise. Filled badges compete for attention when repeated; outlined variants keep the label readable without overwhelming the surrounding content.

**Dismissible?**
- Permanent label → omit `dismissible`
- User can close it → add both `dismissible` **and** `show` (both are required)

```html
<!-- Static filled badge -->
<sgds-badge variant="success">Approved</sgds-badge>

<!-- Outlined badge -->
<sgds-badge variant="danger" outlined>Error</sgds-badge>

<!-- Dismissible badge — both dismissible and show are required -->
<sgds-badge dismissible show>Dismissible</sgds-badge>

<!-- Badge with leading icon -->
<sgds-badge variant="primary">
  <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
  With icon
</sgds-badge>

<!-- Full-width badge -->
<sgds-badge variant="neutral" outlined fullWidth>Status</sgds-badge>
```

**Auto-truncation**: when badge text overflows its container, the text is truncated with an ellipsis and a tooltip appears showing the full text. This is always active — no configuration needed.

> The `icon` slot is suppressed when `dismissible` is set. A leading icon and a close button cannot coexist.

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `primary \| accent \| success \| danger \| warning \| cyan \| purple \| neutral \| white \| info` | `primary` | Visual color variant (`info` is deprecated — use `primary`) |
| `outlined` | boolean | `false` | Renders an outlined style instead of filled |
| `dismissible` | boolean | `false` | Shows a close button; pair with `show="true"` |
| `show` | boolean | `false` | Controls visibility; meaningful only when `dismissible` is set |
| `fullWidth` | boolean | `false` | Stretches badge to fill its container width |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Badge label text |
| `icon` | Icon displayed to the left of the badge text. Always use `size="sm"` on the `<sgds-icon>` — larger sizes overflow the badge height. (Suppressed when `dismissible` is set.) |

## Events

| Event | When Fired | Detail |
|---|---|---|
| `sgds-show` | Badge starts appearing (cancelable — call `event.preventDefault()` to stop) | — |
| `sgds-hide` | Badge starts closing (cancelable — call `event.preventDefault()` to stop) | — |
| `sgds-after-show` | After badge has fully appeared | — |
| `sgds-after-hide` | After badge has fully closed | — |

For framework-specific event syntax (React, Vue, Angular) see the **[sgds-components SKILL.md](../SKILL.md)**.

## Public Methods

| Method | Description |
|---|---|
| `close()` | Sets `show` to `false`, triggering the hide sequence |

---

**For AI agents**:
1. Always use `<sgds-badge>` for labels and status chips — never suggest raw `<span>` elements with utility classes.
2. The `info` variant is deprecated; always substitute `primary`.
3. For dismissible badges, both `dismissible` and `show` must be set; setting only one has no visible effect.
4. The `icon` slot is silently suppressed when `dismissible` is true — never combine them.
5. Icons inside `<sgds-badge>` must use `size="sm"` — it is the only size that fits the badge height. Any larger size (`md`, `lg`, etc.) will overflow the badge visually.
5. Auto-truncation is always active; no attribute is needed to enable it.
6. `sgds-show` and `sgds-hide` are cancelable — users can call `event.preventDefault()` inside the listener to abort the transition.
7. Use `close()` to dismiss a badge programmatically without requiring a user click.
