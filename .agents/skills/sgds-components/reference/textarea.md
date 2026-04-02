# SGDS Textarea Component Skill

`<sgds-textarea>` is a multi-line text input with built-in label, hint text, character limit feedback, resize control, spellcheck, and validation support.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

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

---

**For AI agents**:
1. Setting `maxlength` automatically shows a character counter below the textarea.
2. `resize="auto"` makes the textarea grow vertically as the user types; `resize="none"` disables manual resizing.
3. Use `hasFeedback="both"` with `invalidFeedback` to show both the error border colour and the error message.
4. There are no public methods on this component.
