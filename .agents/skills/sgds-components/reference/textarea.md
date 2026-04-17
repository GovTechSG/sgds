# SGDS Textarea Component Skill

`<sgds-textarea>` is a multi-line text input with built-in label, hint text, character limit feedback, resize control, spellcheck, and validation support.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For collecting multi-line or long-form text input (e.g. comments, descriptions, feedback, notes).
- When users are expected to write more than one sentence or when the length of input is unpredictable.
- When a character limit should be visible to users — use `maxLength` with `hasFeedback` to show a character counter.

### When NOT to use
- When input is expected to be short or single-line — use `<sgds-input>` instead
- When character count is extremely limited — use `<sgds-input>` with validation
- When formatting or rich text is required — use a Rich Text Editor instead

## Behaviour

- **Resize modes**: defaults to `resize="vertical"` (user can drag to resize vertically); `resize="auto"` grows/shrinks to fit content automatically; `resize="none"` disables all manual resizing.
- **Character counter**: when `maxlength` is set, a live counter appears below the field showing characters remaining — input is blocked once the limit is reached.
- **Validation feedback**: `hasFeedback` is a string enum (`"style"`, `"text"`, `"both"`) that controls whether the error border colour, message text, or both are rendered when the field is invalid. Requires `invalidFeedback` to be set for the message.
- **States**: default, focused, disabled (visually muted, non-interactive), readonly (value visible but not editable), and invalid.
- **`hintText` and error message placement**: they occupy the same space below the textarea — when the field is invalid, `hintText` is replaced by the error message. Once the error is resolved, `hintText` reappears.
- `noValidate` is **not available** on `<sgds-textarea>` — unlike `<sgds-input>`, browser constraint validation cannot be disabled via an attribute. Use `invalid` attribute + `setInvalid()` method for server-driven error flows.

## Advanced Considerations

**Auto-resizing vs fixed height** — use `resize="auto"` for content-driven height; use fixed `rows` for predictable layout

**Character limits** — `maxlength` shows a live counter near the field; use it to set expectations upfront

**Large paste content** — consider truncating or warning when pasted content exceeds `maxlength`

**Accessibility** — ensure screen reader support and high contrast mode compatibility

## Edge Cases

- **Empty submission** — provide validation if field is required
- **Exceeding character limit** — `maxlength` prevents further input and displays a counter
- **Very long single words** — may cause horizontal overflow; handle with CSS `overflow-wrap`
- **Non-printable characters or line breaks** — may cause formatting issues; sanitise on submission
- **Mobile virtual keyboards** — may obscure the field; ensure the page scrolls to keep the textarea visible

## Quick Decision Guide

**Set visible rows?** → `rows="4"` (default is 4)

**Limit character count?** → `maxlength="200"` — displays a counter near the field

**Prevent manual resize?** → `resize="none"`

**Auto-expand to content?** → `resize="auto"`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

```html
<!-- Basic textarea -->
<sgds-textarea
  label="Comments"
  name="comments"
  hintText="Tell us more"
  placeholder="Enter your comments here"
  rows="4"
></sgds-textarea>

<!-- With character limit and validation -->
<sgds-textarea
  label="Description"
  name="description"
  maxlength="300"
  hasFeedback="both"
  invalidFeedback="Description must not be empty"
  required
></sgds-textarea>

<!-- Auto-resize, no vertical grip -->
<sgds-textarea
  label="Notes"
  name="notes"
  rows="2"
  resize="auto"
></sgds-textarea>
```

## API Summary

### `<sgds-textarea>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Field label |
| `hintText` | string | `""` | Hint text shown below the label |
| `name` | string | — | Form field name for submission |
| `value` | string | `""` | Current value |
| `defaultValue` | string | — | Initial value |
| `placeholder` | string | `"Placeholder"` | Placeholder text |
| `rows` | number | `4` | Visible number of text lines |
| `minlength` | number | — | Minimum character length |
| `maxlength` | number | — | Maximum character length; shows counter when set |
| `resize` | `none \| vertical \| auto` | `vertical` | Controls textarea resize behaviour |
| `inputmode` | string | — | Virtual keyboard mode for mobile |
| `autocorrect` | boolean | `false` | Enables autocorrection |
| `spellcheck` | boolean | `false` | Enables spellcheck |
| `hasFeedback` | string | — | Controls validation UI; like `<sgds-input>`, supports `"style"`, `"text"`, `"both"` |
| `invalidFeedback` | string | `""` | Error message shown when invalid |
| `invalid` | boolean | — | Manually sets the invalid state |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the textarea |
| `readonly` | boolean | `false` | Makes the textarea read-only |
| `autofocus` | boolean | `false` | Focuses the textarea on load |

## Events

| Event | When |
|---|---|
| `sgds-change` | Committed value change |
| `sgds-input` | Each keystroke that changes the value |
| `sgds-focus` | Textarea gains focus |
| `sgds-blur` | Textarea loses focus |

## Public Methods

| Method | Description |
|---|---|
| `setInvalid(message)` | Programmatically sets the field to invalid state with a custom message — use after server-side validation or for cross-field errors where browser validation cannot detect the problem. |

---

**For AI agents**:
1. Setting `maxlength` automatically shows a character counter below the textarea.
2. `resize="auto"` makes the textarea grow vertically as the user types; `resize="none"` disables manual resizing.
3. Use `hasFeedback="both"` with `invalidFeedback` to show both the error border colour and the error message.
4. `setInvalid('message')` programmatically marks the textarea invalid with a custom message — use for server-driven or cross-field validation. Unlike `<sgds-input>`, `noValidate` is not available on this component, so use `invalid` + `setInvalid()` to fully control error state.
