# SGDS Switch Component Skill

`<sgds-switch>` is a toggle switch for binary on/off states. Labels can be placed to the right (default slot) or left (`left-label` slot). Use `size` to match it to adjacent UI elements.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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
