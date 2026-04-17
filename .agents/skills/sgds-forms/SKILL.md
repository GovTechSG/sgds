---
name: "sgds-forms"
description: "Use this skill when users ask about form validation in SGDS, hasFeedback prop, constraint validation, custom validation, noValidate, setInvalid, form submission, or reading FormData from SGDS form components."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: pattern
---

# SGDS Form Validation Pattern

SGDS form components integrate with the browser's [ElementInternals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) so they behave like native HTML form controls — they participate in `<form>` submission, `FormData`, and constraint validation automatically.

## Prerequisites

See **[sgds-components](../sgds-components/SKILL.md)** for installation and framework integration.

All form components must be placed inside a `<form>` element and given a `name` attribute to participate in form submission.

## Quick Decision Guide

**Show native HTML validation messages?** → Add `hasFeedback` to each form component

**Prevent submit when fields are invalid?** → Built-in — no extra code needed

**Read submitted field values?** → Use `new FormData(event.target)` in the submit handler

**Disable SGDS validation per component?** → `noValidate` prop on `<sgds-input>` or `<sgds-textarea>` (others WIP)

**Disable SGDS validation for the whole form?** → `novalidate` on the `<form>` element

**Run 3rd-party validation (e.g. Zod)?** → Disable SGDS validation first, then call `setInvalid(bool)` and set `invalidFeedback` programmatically

## How Validation Is Triggered

SGDS validation is layered:

1. **onChange (after blur)** — validates when the user leaves a field; shows feedback if `hasFeedback` is set
2. **onSubmit** — final validation pass fires before submission; blocks the form if any field is invalid
3. **onReset** — clears all validity states and field values when the form is reset

Disabled components skip validation entirely.

## `hintText` and Error Message Placement

On most form components (`<sgds-input>`, `<sgds-textarea>`, `<sgds-select>`, `<sgds-combo-box>`, `<sgds-quantity-toggle>`, `<sgds-file-upload>`), `hintText` and the error message **share the same space** below the input container:

- When the field is **invalid** (and `hasFeedback` is set), the error message replaces `hintText`.
- When the error is **resolved**, `hintText` reappears.

`<sgds-checkbox-group>` and `<sgds-radio-group>` behave differently — `hintText` is rendered in the label row above the options and remains visible at all times. The error message appears separately below the options.

## Activating Feedback Display

Constraint validation runs regardless of `hasFeedback`, but the **visible error message only renders when `hasFeedback` is present**. The `hasFeedback` prop accepts:

| Value | Behaviour |
|-------|-----------|
| `hasFeedback` (boolean) | Shows the native HTML validation message as error text |
| `hasFeedback="text"` | Same as boolean — shows text feedback only |
| `hasFeedback="style"` | Shows invalid border/colour styling only, no text |
| `hasFeedback="both"` | Shows both invalid styling and text feedback |

You can also override the displayed message with `invalidFeedback`:

```html
<sgds-input
  name="email"
  label="Email"
  type="email"
  required
  hasFeedback="both"
  invalidFeedback="Please enter a valid email address"
></sgds-input>
```

## Constraint Validations by Component

| Component | Supported constraints |
|-----------|----------------------|
| `<sgds-input>` | `required`, `pattern`, `min`, `max`, `minlength`, `maxlength` |
| `<sgds-textarea>` | `required`, `minlength`, `maxlength` |
| `<sgds-quantity-toggle>` | `min`, `max` |
| `<sgds-datepicker>` | `required`, `minDate`, `maxDate` |
| `<sgds-select>` | `required` |
| `<sgds-combo-box>` | `required` |
| `<sgds-radio-group>` | `required` |
| `<sgds-checkbox-group>` | `required` |
| `<sgds-checkbox>` (standalone) | `required` |
| `<sgds-file-upload>` | `required` (file size limit WIP) |

## Full Form Example

```html
<form id="my-form" class="d-flex-column">
  <sgds-input
    label="First Name"
    name="firstName"
    required
    hasFeedback="both"
    pattern="[A-Za-z ]+"
    invalidFeedback="Letters only"
  ></sgds-input>

  <sgds-datepicker
    label="Appointment Date"
    name="appointmentDate"
    required
    hasFeedback
  ></sgds-datepicker>

  <sgds-radio-group label="Gender" name="gender" required hasFeedback>
    <sgds-radio value="female">Female</sgds-radio>
    <sgds-radio value="male">Male</sgds-radio>
  </sgds-radio-group>

  <sgds-checkbox-group
    label="Food Preference"
    name="food"
    required
    hasFeedback
    hintText="Select at least one option"
  >
    <sgds-checkbox value="vegetarian">Vegetarian</sgds-checkbox>
    <sgds-checkbox value="halal">Halal</sgds-checkbox>
  </sgds-checkbox-group>

  <sgds-textarea
    label="Comments"
    name="comments"
    required
    minlength="3"
    hasFeedback
  ></sgds-textarea>

  <sgds-button type="submit">Submit</sgds-button>
  <sgds-button type="reset" variant="ghost">Reset</sgds-button>
</form>
```

## Reading Form Values via FormData

Use the native `FormData` API in the submit handler. Access `sgds-file-upload` files separately via the component's `selectedFiles` property:

```html
<script>
  const form = document.getElementById("my-form");

  form.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const firstName = formData.get("firstName");
    const gender = formData.get("gender");
    const comments = formData.get("comments");

    // File upload files are not in FormData automatically
    const fileUpload = document.querySelector("sgds-file-upload");
    for (let i = 0; i < fileUpload.selectedFiles.length; i++) {
      formData.append("file" + i, fileUpload.selectedFiles[i]);
    }

    // Submit formData to server
  });
</script>
```

## Custom Validation (Disabling SGDS Validation)

For 3rd-party validation libraries (e.g. Zod) or fully custom logic, disable SGDS's built-in validation first, then call `setInvalid(bool)` and update `invalidFeedback` in response to input events.

### Option 1 — Disable per component with `noValidate`

Currently supported on **`<sgds-input>`** and **`<sgds-textarea>`** only. Other components are WIP.

```html
<sgds-input
  noValidate
  id="keys-input"
  name="keys"
  label="Keys"
  hintText="Cannot start with special characters"
  hasFeedback="both"
></sgds-input>

<script>
  const input = document.getElementById("keys-input");

  input.addEventListener("sgds-input", e => {
    if (/^[^a-zA-Z0-9]/.test(e.target.value)) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Keys cannot start with special characters";
    } else {
      e.target.setInvalid(false);
    }
  });
</script>
```

### Option 2 — Disable at form level with `novalidate`

Adding `novalidate` to the `<form>` element disables constraint validation and SGDS validation for **all child components**. Then apply `setInvalid` logic per field.

```html
<form id="custom-form" novalidate class="d-flex-column">
  <sgds-input
    id="keys-input"
    name="keys"
    label="Keys"
    hasFeedback="both"
  ></sgds-input>

  <sgds-textarea
    id="bio-textarea"
    name="bio"
    label="Bio"
    hasFeedback
  ></sgds-textarea>
</form>

<script>
  document.getElementById("keys-input").addEventListener("sgds-input", e => {
    if (/^[^a-zA-Z0-9]/.test(e.target.value)) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Invalid key format";
    } else {
      e.target.setInvalid(false);
    }
  });

  document.getElementById("bio-textarea").addEventListener("sgds-input", e => {
    if (e.target.value.length < 10) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Bio must be at least 10 characters";
    } else {
      e.target.setInvalid(false);
    }
  });
</script>
```

### `setInvalid(bool)` Method

| Parameter | Type | Description |
|-----------|------|-------------|
| `bool` | `boolean` | `true` marks the component invalid and shows `invalidFeedback`; `false` clears the invalid state |

Pair `setInvalid(true)` with setting the `invalidFeedback` property on the element to control the displayed message.

## Custom Validation Support Status

| Component | Status |
|-----------|--------|
| `<sgds-input>` | ✅ Implemented |
| `<sgds-textarea>` | ✅ Implemented |
| `<sgds-checkbox>` / `<sgds-checkbox-group>` | WIP |
| `<sgds-datepicker>` | WIP |
| `<sgds-quantity-toggle>` | WIP |
| `<sgds-radio-group>` | WIP |
| `<sgds-file-upload>` | WIP |
| `<sgds-select>` | WIP |
| `<sgds-combo-box>` | WIP |

---

## For AI agents

1. Always place SGDS form components inside a `<form>` element with `name` attributes for them to participate in form submission and `FormData`.
2. `hasFeedback` must be present on a form component for the error message to visually appear — constraint validation alone does not show UI feedback.
3. To show both the invalid border style and the error message text, use `hasFeedback="both"`. A plain boolean `hasFeedback` shows the message text only.
4. Use `invalidFeedback` to override the browser's native constraint validation message with a custom string.
5. Constraint validation and form submission blocking are built-in — do not add extra submit event listeners to replicate this behaviour.
6. Use `new FormData(event.target)` in the submit handler to read values. For file uploads, read `selectedFiles` directly from the `<sgds-file-upload>` element.
7. When using custom/3rd-party validation on `<sgds-input>` or `<sgds-textarea>`, add `noValidate` on the component (or `novalidate` on the form), then call `element.setInvalid(true/false)` and set `element.invalidFeedback` inside the `sgds-input` event listener.
8. Only `<sgds-input>` and `<sgds-textarea>` fully support custom validation via `noValidate` + `setInvalid`. All other form components have this feature as WIP.
9. The reset button (`type="reset"`) automatically clears all validity states and values — no extra reset logic is needed.
10. Disabled components are excluded from constraint validation and will never block form submission.
