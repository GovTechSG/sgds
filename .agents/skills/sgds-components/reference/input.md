# SGDS Input Component Skill

`<sgds-input>` is a single-line form text input supporting all standard HTML input types, with built-in label, hint text, validation feedback, prefix/suffix addons, loading state, and an action slot.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For collecting single-line text data from users (e.g. name, email, search query, ID number).
- When the expected input is freeform or not constrained to a predefined set of options.
- When prefix/suffix addons, inline actions, or a loading state are needed alongside the input field.
- For all standard HTML input types (`text`, `email`, `tel`, `number`, `password`, `search`, `url`) within SGDS forms.

### When NOT to use

- For long-form or multi-line input → use `<sgds-textarea>` instead.
- For predefined options → use `<sgds-select>`, `<sgds-radio>`, or `<sgds-checkbox>`.
- For read-only display of data — use `readonly` if the value must be visible but not editable; consider a plain text element for purely decorative display.

## Behaviour

- Accepts keyboard input and supports standard text editing (copy, paste, delete).
- Displays states: default, hover, focus, filled, disabled, and error.
- Supports placeholder text, pre-filled values, prefix/suffix addons, and an action slot.
- Shows an inline loading spinner when `loading` is set.
- Validation can be triggered inline, on blur, or on submit; error state is shown when `hasFeedback` is set and validation fails.
- `hintText` and the error message occupy the same space below the input — when the field is invalid, `hintText` is replaced by the error message. Once the error is resolved, `hintText` reappears.
- `invalid` and `valid` can be set manually to override the validation state programmatically without relying on browser constraint validation.
- `noValidate` disables browser-native constraint validation — use this when implementing fully custom validation logic.
- `disabled` makes the field non-interactive; `readonly` makes it visible but not editable.

## Advanced Considerations

- **Prefix/Suffix**: use `prefix` / `suffix` for text addons (e.g. `$`, `kg`) shown inline inside the input border. For icon addons, use the `action` slot with `<sgds-icon-button>` instead.
- **Action slot**: use the `action` slot with `<sgds-icon-button>` for icon actions after the field (e.g. toggle password visibility, clear).
- **Debounced input**: for search or filtering, debounce the `sgds-input` event to reduce performance load.
- **Input masking / auto-formatting**: not built in — implement externally for structured formats (e.g. phone number, NRIC, credit card spacing).
- **Character limits**: `minlength` and `maxlength` are direct attributes on `<sgds-input>`; show counters when limits are enforced. For numeric/date types, use `min` and `max` to constrain the value range.
- **Pattern validation**: use `pattern` with a regex string to enforce a specific format (e.g. NRIC, postal code). Pair with `invalidFeedback` to explain the expected format to the user.
- **Manual state override**: use `invalid` or `valid` to programmatically set the field's validation state — useful when validation logic lives outside the component (e.g. server-side errors).
- **Custom validation flow**: set `noValidate` to disable browser-native constraint validation and take full control with your own logic; combine with `invalid` and `setInvalid()` for server-driven error states.
- **Autofocus**: use `autofocus` to focus the input on page load — limit to one field per page to avoid disorienting keyboard and screen reader users.

## Edge Cases

- **Long input values**: content scrolls horizontally within the field; keep expected input width in mind when sizing the component.
- **Pasted content**: browsers may paste unexpected formatting — validate or sanitise on blur/submit rather than blocking paste.
- **Browser autofill**: autofill may override styles or values; test autofill behaviour for common fields (email, password, address).
- **Mobile keyboards**: use the correct `type` to trigger the appropriate soft keyboard (e.g. `type="email"` for email keyboards).
- **Validation dependencies**: for fields like "confirm password", validate on blur of the second field and revalidate when the first field changes.
- **Disabled vs read-only**: `disabled` — not interactive and excluded from form submission; `readonly` — visible and submitted but not editable.
- **Special characters and non-Latin scripts**: `<sgds-input>` accepts any Unicode text; validate or sanitise server-side as needed.

## Quick Decision Guide

**Standard text input?** → `type="text"` (default)

**Email validation?** → `type="email" required`

**Number with min/max?** → `type="number"` with `min`, `max`, `step`

**Password field?** → `type="password"`

**Show validation feedback?** → Set `hasFeedback="both"` (border + message), `"style"` (border only), or `"text"` (message only), and `invalidFeedback`

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

## Public Methods

| Method | Description |
|---|---|
| `setInvalid(message)` | Programmatically sets the field to invalid state with a custom message — use for server-driven or cross-field validation errors. Pair with `noValidate` for fully custom validation flows. |

---

**For AI agents**:
1. `hasFeedback` controls how validation is displayed: `"style"` (only border colour changes), `"text"` (only the message), `"both"` (border + message). Always set `invalidFeedback` alongside `hasFeedback`. The default (no attribute) shows no feedback UI at all — setting `required` alone without `hasFeedback` does not display an error message.
2. `prefix` and `suffix` render text inline inside the input border — for icon addons, use the `action` slot with `<sgds-icon-button>` instead.
3. `type="number"` with `min` and `max` enforces numeric bounds natively.
4. For reactive frameworks, listen to `sgds-input` for immediate value tracking and `sgds-change` for committed values.
5. `setInvalid('message')` programmatically marks the field invalid with a custom message — use after server-side validation or for cross-field rules. Pair with `noValidate` to disable browser constraint validation entirely and take full control of the validation flow.
