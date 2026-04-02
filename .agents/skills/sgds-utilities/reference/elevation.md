# SGDS Elevation Utilities Skill

Helps developers apply shadow-based depth and visual hierarchy using SGDS elevation tokens.

## Core Concept

SGDS provides two categories of elevation:

| Category | Classes | Use on |
|----------|---------|--------|
| **Surface** | `sgds:shadow-{1–5}` | Cards, panels, modals, dialogs — elements that float above the page |
| **Edge** | `sgds:shadow-edge-top`, `sgds:shadow-edge-bottom` | Sticky headers, sticky footers — elements anchored to a viewport edge |

Surface elevation uses progressive depth (1 = subtle, 5 = maximum). Edge elevation uses directional shadows for scroll-aware UI.

## Surface Elevation

```html
<div class="sgds:shadow-1">Subtle elevation</div>
<div class="sgds:shadow-2">Light elevation for cards</div>
<div class="sgds:shadow-3">Standard card elevation</div>
<div class="sgds:shadow-4">Prominent for modals</div>
<div class="sgds:shadow-5">Maximum elevation</div>
```

### Size Reference

| Class | CSS Variable | Typical use |
|-------|-------------|-------------|
| `sgds:shadow-1` | `--sgds-elevation-surface-1` | Subtle depth — inputs, inline controls |
| `sgds:shadow-2` | `--sgds-elevation-surface-2` | Cards, tiles, raised surfaces |
| `sgds:shadow-3` | `--sgds-elevation-surface-3` | Active cards, expanded sections |
| `sgds:shadow-4` | `--sgds-elevation-surface-4` | Modals, dialogs, popovers |
| `sgds:shadow-5` | `--sgds-elevation-surface-5` | Top-level overlays, drawers |

## Edge Elevation

```html
<header class="sgds:shadow-edge-bottom sgds:sticky sgds:top-0">Sticky header</header>
<footer class="sgds:shadow-edge-top sgds:sticky sgds:bottom-0">Sticky footer</footer>
```

### Edge Reference

| Class | CSS Variable | Typical use |
|-------|-------------|-------------|
| `sgds:shadow-edge-top` | `--sgds-elevation-edge-top` | Sticky footers — shadow cast upward |
| `sgds:shadow-edge-bottom` | `--sgds-elevation-edge-bottom` | Sticky headers — shadow cast downward |

## Choosing an Elevation Level

| Context | Recommended |
|---------|-------------|
| Resting card or tile | `sgds:shadow-2` |
| Hovered or active card | `sgds:shadow-3` |
| Modal or dialog | `sgds:shadow-4` |
| Drawer or sheet overlay | `sgds:shadow-5` |
| Sticky header | `sgds:shadow-edge-bottom` |
| Sticky footer | `sgds:shadow-edge-top` |
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

**For AI Agents**: Recommend elevation by context — `shadow-2` for resting cards, `shadow-4` for modals, edge shadows for sticky elements. Always pair elevation with `sgds:bg-surface-raised` or another surface background for proper visual layering. Combine with `sgds:rounded-*` for polished surfaces. Use `hover:sgds:shadow-*` with `sgds:transition-shadow` for interactive lift effects.
