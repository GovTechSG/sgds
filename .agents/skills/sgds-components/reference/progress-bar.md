# SGDS Progress Bar Component Skill

`<sgds-progress-bar>` renders a horizontal progress bar. Always provide `ariamin`, `ariamax`, and `arialabel` for accessibility.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Primary/brand coloured bar?** → `variant="primary"` (default)

**Neutral grey bar?** → `variant="neutral"`

**Show a visible label inside the bar?** → Set `label`

**Accessible label for screen readers?** → Always set `arialabel`

```html
<!-- Basic progress bar at 60% -->
<sgds-progress-bar
  value="60"
  ariamin="0"
  ariamax="100"
  arialabel="Profile completion"
></sgds-progress-bar>

<!-- Primary variant with visible label -->
<sgds-progress-bar
  value="60"
  ariamin="0"
  ariamax="100"
  arialabel="File upload progress"
  label="60%"
></sgds-progress-bar>

<!-- Neutral variant -->
<sgds-progress-bar
  value="30"
  ariamin="0"
  ariamax="100"
  arialabel="Step 3 of 10"
  variant="neutral"
  label="30%"
></sgds-progress-bar>
```

## API Summary

### `<sgds-progress-bar>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `value` | number | — | **Required** — current progress value |
| `ariamin` | number | — | Minimum value for `aria-valuemin` accessibility attribute |
| `ariamax` | number | — | Maximum value for `aria-valuemax` accessibility attribute |
| `arialabel` | string | `""` | Accessible label for the progress bar (for screen readers) |
| `label` | string | `""` | Visible text displayed inside the progress bar |
| `variant` | `primary \| neutral` | `primary` | Colour variant of the bar |

## Events

None.

---

**For AI agents**:
1. Always set `ariamin`, `ariamax`, and `arialabel` for screen reader accessibility.
2. `value` is required and should be between `ariamin` and `ariamax`.
3. Use `label` to show progress text (e.g. `"60%"` or `"Step 3 of 5"`) inside the bar.
4. There are no custom events or public methods on this component.
