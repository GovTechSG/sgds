# SGDS Progress Bar Component Skill

`<sgds-progress-bar>` renders a horizontal progress bar. Always provide `ariamin`, `ariamax`, and `arialabel` for accessibility.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When the total duration or steps of a task are known and measurable.
- For file uploads, data processing, form completion, or multi-step flows where progress can be quantified.

### When NOT to use

- When the duration is unknown and indeterminate — use `<sgds-spinner>` instead.
- For step navigation in a multi-step wizard — use `<sgds-stepper>` instead.

## Behaviour

- Renders a filled horizontal bar whose width reflects `value` relative to the `ariamin`–`ariamax` range.
- `value` is required; it should always fall within the `ariamin` to `ariamax` range.
- `ariamin` and `ariamax` set the `aria-valuemin` and `aria-valuemax` ARIA attributes respectively.
- `arialabel` sets the accessible label for screen readers — describe what is being measured (e.g. "File upload progress"), not the value itself.
- `label` renders visible text inside the bar (e.g. `"60%"`, `"Step 3 of 5"`).
- `variant` controls the bar colour: `primary` (default, brand colour) or `neutral` (grey).
- The component has no events or public methods — progress updates must be driven by the host application by updating `value`.

## Advanced Considerations

- **Custom range**: `ariamin` and `ariamax` do not have to be `0` and `100` — use any range that reflects the task's natural units. The bar width is calculated proportionally.
- **No animation**: the component does not animate bar transitions — update `value` incrementally for a smooth perceived experience rather than jumping to the final value.
- **Throttle rapid updates**: updating `value` on every byte of a file upload can be expensive — throttle to a reasonable interval (e.g. every 1% or every 500ms).
- **Completion state**: when `value === ariamax`, the bar is full but no completion UI is triggered — handle completion feedback in the host application.

## Edge Cases

- **`value` out of range**: values below `ariamin` may render as empty; values above `ariamax` may overflow — always clamp `value` within the valid range.
- **Missing `ariamin` / `ariamax`**: screen readers cannot accurately announce progress without these attributes — always set both.
- **Value regression** (decreasing `value`): the bar instantly snaps back to the lower value with no animation — implement smooth transitions externally if a decreasing animation is required.
- **`value` at `ariamax`**: the bar appears full but no completion event is fired — always handle the completion state in the host application.

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
