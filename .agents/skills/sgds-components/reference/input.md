# SGDS Input Component Skill

`<sgds-input>` is a single-line form text input supporting all standard HTML input types, with built-in label, hint text, validation feedback, prefix/suffix addons, loading state, and an action slot.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Standard text input?** → `type="text"` (default)

**Email validation?** → `type="email" required`

**Number with min/max?** → `type="number"` with `min`, `max`, `step`

**Password field?** → `type="password"`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

**Show inline loading spinner?** → `loading`

**Icon action button after the field?** → Use the `action` slot with `<sgds-icon-button>`

```html
<!-- Basic text input -->
<sgds-input
  type="text"
  label="Full Name"
  hintText="Enter your full name as per NRIC"
  name="fullName"
  placeholder="e.g. Tan Ah Kow"
  required
></sgds-input>

<!-- Email input with validation -->
<sgds-input
  type="email"
  label="Email Address"
  name="email"
  placeholder="you@example.com"
  required
  hasFeedback="both"
  invalidFeedback="Please enter a valid email address"
></sgds-input>

<!-- Number input with constraints -->
<sgds-input
  type="number"
  label="Age"
  name="age"
  min="0"
  max="120"
  step="1"
  placeholder="0"
></sgds-input>

<!-- Input with prefix and suffix text -->
<sgds-input
  type="text"
  label="Amount"
  name="amount"
  prefix="$"
  suffix=".00"
  placeholder="0"
></sgds-input>

<!-- Input with action button slot -->
<sgds-input
  type="search"
  label="Search"
  name="search"
  placeholder="Enter search term"
>
  <sgds-icon-button slot="action" variant="ghost" name="search"></sgds-icon-button>
</sgds-input>

<!-- Loading state -->
<sgds-input type="text" label="Lookup" loading></sgds-input>
```

## API Summary

### `<sgds-input>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `type` | `text \| email \| number \| tel \| password \| search \| date \| time \| url \| datetime-local \| month \| week \| color` | `text` | Input type |
| `label` | string | `""` | Field label |
| `hintText` | string | `""` | Hint text shown below the label |
| `name` | string | — | Form field name for submission |
| `value` | string | `""` | Current value |
| `placeholder` | string | `"placeholder"` | Placeholder text |
| `prefix` | string | — | Text addon shown before the input |
| `suffix` | string | — | Text addon shown after the input |
| `minlength` | number | — | Minimum character length |
| `maxlength` | number | — | Maximum character length |
| `min` | number | — | Minimum value (numeric/date types) |
| `max` | number | — | Maximum value (numeric/date types) |
| `step` | number \| `"any"` | — | Step value for numeric inputs |
| `pattern` | string | — | Regex pattern for validation |
| `hasFeedback` | `style \| text \| both` | — | Controls validation UI feedback: `style` (border colour only), `text` (message only), `both` (border + message) |
| `invalidFeedback` | string | — | Error message shown when invalid |
| `invalid` | boolean | `false` | Manually sets the invalid state |
| `valid` | boolean | `false` | Manually sets the valid state |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the input |
| `readonly` | boolean | `false` | Makes the input read-only |
| `autofocus` | boolean | `false` | Focuses the input on load |
| `loading` | boolean | `false` | Shows a loading spinner inside the input |
| `noValidate` | boolean | `false` | Disables browser-native validation |

## Slots

| Slot | Purpose |
|---|---|
| `action` | Call-to-action element after the input (use `<sgds-icon-button>`) |

## Events

| Event | When |
|---|---|
| `sgds-change` | Committed value change (on blur / Enter) |
| `sgds-input` | Each keystroke that changes the value |
| `sgds-focus` | Input gains focus |
| `sgds-blur` | Input loses focus |
| `sgds-invalid` | Input fails validation |
| `sgds-valid` | Input passes validation |

---

**For AI agents**:
1. `hasFeedback` controls how validation is displayed: `"style"` (only border colour changes), `"text"` (only the message), `"both"` (border + message). Always set `invalidFeedback` alongside `hasFeedback`.
2. `prefix` and `suffix` render text inline inside the input border — for icon addons, use the `action` slot with `<sgds-icon-button>` instead.
3. `type="number"` with `min` and `max` enforces numeric bounds natively.
4. For reactive frameworks, listen to `sgds-input` for immediate value tracking and `sgds-change` for committed values.
