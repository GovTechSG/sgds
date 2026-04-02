# SGDS File Upload Component Skill

`<sgds-file-upload>` renders a styled file upload button. Selected files appear as a list with dismiss (remove) buttons. Use `accept` to restrict file types and `multiple` to allow many files.

## Quick Decision Guide

**Accept only images?** → `accept="image/*"`

**Accept specific types?** → `accept=".pdf,.docx,.png"`

**Allow multiple files?** → Add `multiple`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

**Button label?** → Place text in the default slot

```html
<!-- Basic file upload (single file) -->
<sgds-file-upload
  label="Upload Document"
  hintText="PDF only, max 10MB"
  name="document"
  accept=".pdf"
>
  Choose File
</sgds-file-upload>

<!-- Multiple files with image filter -->
<sgds-file-upload
  label="Upload Images"
  hintText="JPEG or PNG, max 5MB each"
  name="photos"
  accept="image/jpeg,image/png"
  multiple
>
  Choose Files
</sgds-file-upload>

<!-- With validation -->
<sgds-file-upload
  label="Proof of Identity"
  name="id"
  accept=".pdf,.jpg,.png"
  required
  hasFeedback
  invalidFeedback="Please upload a valid document"
>
  Upload Document
</sgds-file-upload>

<!-- Listen to file selection -->
<sgds-file-upload id="my-upload" name="files" multiple>
  Select Files
</sgds-file-upload>
<script>
  document.getElementById("my-upload").addEventListener("sgds-files-selected", e => {
    const files = e.detail; // FileList
    console.log("Files selected:", files.length);
  });
</script>
```

## API Summary

### `<sgds-file-upload>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | — | Field label above the button |
| `hintText` | string | — | Hint text below the label |
| `name` | string | — | Form field name for submission |
| `accept` | string | `""` | Comma-separated list of accepted MIME types or extensions |
| `multiple` | boolean | `false` | Allows selecting multiple files |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the upload button |
| `hasFeedback` | boolean | `false` | Enables validation feedback UI |
| `invalid` | boolean | `false` | Manually sets the invalid state |
| `invalidFeedback` | string | — | Error message when validation fails |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Label text shown on the upload button (e.g. `"Choose File"`) |

## Events

| Event | Detail | When |
|---|---|---|
| `sgds-files-selected` | `FileList` | Files are selected (access via `event.detail`) |

---

**For AI agents**:
1. `event.detail` on `sgds-files-selected` is a `FileList` object — iterate with `for...of` or index access.
2. `accept` values follow standard HTML `accept` syntax: `"image/*"`, `".pdf"`, `"image/jpeg,image/png"`.
3. The component renders selected filenames with close buttons for removal; this UI is handled automatically.
4. There are no public methods on this component.
