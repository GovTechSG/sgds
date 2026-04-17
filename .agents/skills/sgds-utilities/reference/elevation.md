# SGDS Elevation Utilities Skill

Helps developers apply shadow-based depth and visual hierarchy using SGDS elevation tokens.

## Core Concept

SGDS provides two categories of elevation:

| Category | Classes | Use on |
|----------|---------|--------|
| **Surface** | `sgds:shadow-{1–5}` | Navigation or information temporarily appearing in front of other surfaces (e.g. dropdowns, tooltips), and actionable elements on hover (e.g. cards, tiles) |
| **Edge** | `sgds:shadow-edge-top`, `sgds:shadow-edge-bottom` | Components anchored to the top or bottom of the viewport (e.g. header, action bar) — creates a shadow so other surfaces appear to scroll behind them |

Surface elevation uses progressive depth (1 = lowest, 5 = highest). Edge elevation uses directional shadows for scroll-aware UI. Edge is not for footers.

## Surface Elevation

```html
<div class="sgds:shadow-1">Subtle elevation</div>
<div class="sgds:shadow-2">Light elevation for cards</div>
<div class="sgds:shadow-3">Standard card elevation</div>
<div class="sgds:shadow-4">Prominent for modals</div>
<div class="sgds:shadow-5">Maximum elevation</div>
```

### Size Reference

| Class | CSS Variable | Use for |
|-------|-------------|--------|
| `sgds:shadow-1` | `--sgds-elevation-surface-1` | Container surfaces — cards, panels, tiles |
| `sgds:shadow-2` | `--sgds-elevation-surface-2` | Floating controls — dropdown menus, select menus, mega menus |
| `sgds:shadow-3` | `--sgds-elevation-surface-3` | Contextual overlays — tooltips, toasts |
| `sgds:shadow-4` | `--sgds-elevation-surface-4` | Blocking overlays — modals, drawers |
| `sgds:shadow-5` | `--sgds-elevation-surface-5` | Interaction — hovering card state |

## Edge Elevation

```html
<header class="sgds:shadow-edge-bottom sgds:sticky sgds:top-0">Sticky header</header>
<div class="sgds:shadow-edge-top sgds:sticky sgds:bottom-0">Bottom action bar</div>
```

### Edge Reference

| Class | CSS Variable | Use for |
|-------|-------------|--------|
| `sgds:shadow-edge-bottom` | `--sgds-elevation-edge-bottom` | Sticky headers, top navigation — shadow cast downward |
| `sgds:shadow-edge-top` | `--sgds-elevation-edge-top` | Bottom action bars — shadow cast upward |

## Choosing an Elevation Level

| Context | Recommended |
|---------|-------------|
| Card, panel, tile | `sgds:shadow-1` |
| Dropdown, select menu, mega menu | `sgds:shadow-2` |
| Tooltip, toast | `sgds:shadow-3` |
| Modal, drawer | `sgds:shadow-4` |
| Hovering card (interaction state) | `sgds:shadow-5` |
| Sticky header, top navigation | `sgds:shadow-edge-bottom` |
| Bottom action bar | `sgds:shadow-edge-top` |
| Flat / no elevation | Remove shadow class |

## Common Patterns

### Card with elevation

```html
<div class="sgds:bg-surface-raised sgds:shadow-2 sgds:p-lg sgds:rounded-md">
  <h3 class="sgds:text-heading-default sgds:font-semibold">Card Title</h3>
  <p class="sgds:text-body-default sgds:text-subtle">Card description</p>
</div>
```

### Sticky header with edge shadow

```html
<header class="sgds:bg-default sgds:shadow-edge-bottom sgds:sticky sgds:top-0 sgds:p-md">
  <h1 class="sgds:text-heading-md sgds:font-bold">Page Title</h1>
</header>
```

### Hover elevation transition

```html
<div class="sgds:bg-surface-raised sgds:shadow-2 hover:sgds:shadow-4 sgds:p-lg sgds:rounded-md sgds:transition-shadow">
  Hover to elevate
</div>
```

---

## Usage Guidelines

**1. Use elevation to show hierarchy**
- Higher elevation = closer to the user
- Lower elevation = part of the layout

**2. Avoid over-layering**
- Do not stack too many elevation levels in one view
- Prefer 2–3 levels per screen for clarity

**3. Pair with interaction states**
- Hover: increase elevation slightly (e.g. `shadow-1` → `shadow-2`)
- Active: reduce elevation to simulate press

**4. Use elevation only when needed**
- Not all components need shadows
- Use borders or background contrast when elevation is unnecessary

---

## Do & Don't

**Do**
- Use elevation consistently across components
- Use subtle shadows for most UI
- Increase elevation progressively

**Don't**
- Mix too many shadow styles in one view
- Use strong shadows for small components
- Rely only on elevation for hierarchy — combine with spacing and colour

---

## Accessibility Notes

- Ensure sufficient contrast between elevated surfaces and the background
- Avoid relying on shadows alone to convey meaning
- Support dark mode: reduce shadow opacity or use surface overlays instead of deep shadows

---

**For AI Agents**: Apply elevation by semantic role — `shadow-1` for cards/panels/tiles, `shadow-2` for floating controls (dropdowns, selects, mega menus), `shadow-3` for contextual overlays (tooltips, toasts), `shadow-4` for blocking overlays (modals, drawers), `shadow-5` for interactive hover states on cards and tiles. Use `shadow-edge-bottom` for sticky headers and top navigation bars, `shadow-edge-top` for bottom action bars. Do not apply edge shadows to footers. Always pair elevation with `sgds:bg-surface-raised` or another surface background for proper visual layering. Use `hover:sgds:shadow-5` with `sgds:transition-shadow` for interactive card lift effects.
