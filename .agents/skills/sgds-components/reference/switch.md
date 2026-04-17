# SGDS Switch Component Skill

`<sgds-switch>` is a toggle switch for binary on/off states. Labels can be placed to the right (default slot) or left (`left-label` slot). Use `size` to match it to adjacent UI elements.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For binary settings that take effect immediately without requiring a form submission (e.g. enabling notifications, toggling dark mode, activating a feature).
- When the on/off metaphor clearly communicates the effect of the action to users.
- When a single toggle represents a persistent preference or system setting.

### When NOT to use

- When the action requires confirmation before taking effect — use a checkbox with a submit button instead.
- For non-binary choices (more than two states) — use `<sgds-radio>` or `<sgds-select>`.
- When the toggle represents agreement or acceptance (e.g. terms and conditions) — use `<sgds-checkbox>` instead.
- When the switch needs to participate in native form submission directly — `<sgds-switch>` has no `name` attribute; pair with a hidden input if form integration is needed.

## Behaviour

- Clicking or tapping the switch toggles its `checked` state between `true` and `false`.
- `checked` pre-sets the switch to the on state on render.
- `disabled` prevents interaction; the switch is visible but non-togglable.
- `icon` shows X (off) and check (on) icons inside the toggle thumb for additional visual clarity.
- `size` controls the physical size of the switch: `sm`, `md` (default), or `lg`.
- Fires `sgds-change` with `event.detail.checked` (boolean) on each toggle.
- The component has no `name`, `label`, `hintText`, or validation attributes — it is a UI toggle, not a form field.

## Advanced Considerations

- **Form integration**: `<sgds-switch>` has no `name` attribute and does not participate in native form submission. For form-based use, listen to `sgds-change` and sync the value to a hidden `<input type="hidden">`.
- **`icon` prop**: adds X/check icons inside the toggle thumb — useful for colour-blind accessibility or dense layouts where the on/off state may not be obvious from position alone.
- **Label placement**: use the default slot for a right-side label (most common) or `slot="left-label"` for a left-side label when layout requires it. Both can be used simultaneously for labels on both sides.
- **No validation**: `<sgds-switch>` has no `hasFeedback`, `invalid`, or `invalidFeedback` attributes — validation is not applicable to a binary toggle.

## Edge Cases

- **No label**: the switch functions correctly without a label, but ensure accessible context is provided via surrounding text or an `aria-label` attribute on the element.
- **Default state**: `checked` defaults to `false` — if the on state is the expected default, set `checked` explicitly to avoid misleading the user.
- **Disabled with pre-checked state**: a `disabled` switch can be pre-checked — use this to show a non-modifiable setting that is currently on.
- **Rapid toggling**: `sgds-change` fires on every toggle — debounce if the handler performs expensive operations (e.g. API calls).
- **Form submission without hidden input**: if form data must include the switch state, always mirror it to a hidden input on `sgds-change`; omitting this will result in the value not being submitted.

## Quick Decision Guide

**Show X/check icons in the toggle?** → Add `icon`

**Pre-turned-on?** → Add `checked`

**Disabled toggle?** → Add `disabled`

**Label to the left?** → Use `slot="left-label"` instead of the default slot

**Small switch?** → `size="sm"`

```html
<!-- Switch with right label (default) -->
<sgds-switch>Enable notifications</sgds-switch>

<!-- Pre-checked with icon -->
<sgds-switch checked icon>Dark mode</sgds-switch>

<!-- Left label -->
<sgds-switch>
  <span slot="left-label">Auto-save</span>
</sgds-switch>

<!-- Disabled -->
<sgds-switch disabled>Unavailable option</sgds-switch>

<!-- Small size, no label -->
<sgds-switch size="sm"></sgds-switch>

<!-- Listen to change -->
<sgds-switch id="my-switch">Airplane mode</sgds-switch>
<script>
  document.getElementById("my-switch").addEventListener("sgds-change", e => {
    console.log("Checked:", e.detail.checked);
  });
</script>
```

## API Summary

### `<sgds-switch>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `checked` | boolean | `false` | Pre-sets the switch to on |
| `disabled` | boolean | `false` | Disables the switch |
| `icon` | boolean | `false` | Shows X/check icons inside the toggle thumb |
| `size` | `sm \| md \| lg` | `md` | Size of the switch |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Label text displayed to the right of the switch |
| `left-label` | Label text displayed to the left of the switch |

## Events

| Event | Detail | When |
|---|---|---|
| `sgds-change` | `{ checked: boolean }` | Switch is toggled |

---

**For AI agents**:
1. `event.detail.checked` gives the new state (`true` = on, `false` = off).
2. There are no label/hintText/name/validation attributes — `<sgds-switch>` is a simple toggle without form field integration.
3. For form submission, pair with a hidden input element reflecting the switch's checked state.
4. There are no public methods on this component.
