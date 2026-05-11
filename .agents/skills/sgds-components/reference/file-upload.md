# SGDS File Upload Component Skill

`<sgds-file-upload>` renders a styled file upload button or drag-and-drop zone. Selected files appear as a dismissible list. Use `accept` to restrict file types, `multiple` to allow many files, and `variant="drag-and-drop"` for a drop zone UI.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- When users need to attach one or more files as part of a form submission (e.g. uploading supporting documents, photos, or attachments).
- When the form is the primary method of collecting the file and the upload happens on form submit, not instantly on selection.
- When file type restrictions are needed — use `accept` to limit to specific MIME types or extensions.
- When multiple files need to be selected and reviewed before submission — use `multiple`.
- When drag-and-drop is a desired interaction — use `variant="drag-and-drop"`.

### When NOT to use

- When file size validation is required — `<sgds-file-upload>` does not enforce size limits; validate in the `sgds-add-files` event handler.

## Behaviour

- `variant="default"` (default): renders a styled button that opens the browser's native file picker on click.
- `variant="drag-and-drop"`: renders a drop zone with an upload icon and "Drag and drop files here" text, plus a "Choose files" button for non-drag interactions.
- `accept` restricts the file types shown in the picker (MIME types or extensions, comma-separated).
- `multiple` allows selecting more than one file at a time. Each new selection is **combined** with the existing file list, not replaced.
- Selected files appear as a dismissible list below the upload area; users can remove individual files by clicking the dismiss button — this is handled automatically.
- `disabled` disables the button/drop zone and prevents interaction.
- `required` makes the field required for form submission.
- `hasFeedback` enables validation feedback UI; pair with `invalidFeedback` to show an error message.
- `noValidate` disables both native browser and SGDS constraint validation — use when implementing fully custom validation via `setInvalid()`.
- `invalid` manually sets the invalid state without relying on browser constraint validation.
- `hintText` and the error message occupy the same space — when the field is invalid, `hintText` is replaced by the error message.
- Fires `sgds-add-files` when files are added; `sgds-remove-file` when a file is removed; `sgds-change` on any change to the file set.
- If the user opens the file picker and presses Cancel, no events are fired and the existing file list is preserved.

## Advanced Considerations

- **File validation**: file size and count are not enforced by the component — implement validation in the `sgds-add-files` handler and use `setInvalid(true)` to reflect the error state.
- **Upload state tracking**: use `setFileUploadState(index, state, error?)` to reflect per-file upload progress in the UI. `state` is `"loading"` | `"success"` | `"error"`. The close button is disabled while a file is in `"loading"` state.
- **Accessing current files**: read `el.files` (returns `File[]`) to get the current file list at any time.
- **Custom validation**: set `noValidate` and call `setInvalid(true)` with `invalidFeedback` for fully custom validation flows (e.g. after server-side rejection).
- **Manual invalid state**: use `invalid` + `invalidFeedback` to programmatically set the error state, e.g. after server-side validation failure.
- **`accept` syntax**: follows standard HTML `accept` attribute syntax — `"image/*"` for all images, `".pdf"` for a specific extension, or `"image/jpeg,image/png"` for multiple MIME types.
- **Event choice**: prefer `sgds-add-files` for triggering upload logic and `sgds-remove-file` for reacting to removals. Use `sgds-change` to observe any file-set change. `sgds-files-selected` is deprecated since 3.18.0 in favour of `sgds-change` but still fires for backwards compatibility.

## Edge Cases

- **Cancel file picker**: if the user opens the picker and cancels, no events fire and the existing file list is unchanged.
- **Multiple selections accumulate**: when `multiple` is true, each new file picker selection adds to the existing list — files already in the list are not replaced.
- **Duplicate file selection**: the browser may allow selecting the same file twice; deduplicate in the event handler if required.
- **Large file counts**: the component renders all selected filenames in a list — limit `multiple` selections in the handler and provide guidance via `hintText` if a maximum count applies.
- **Unsupported file types**: `accept` guides but does not universally enforce file type restrictions in all browsers — validate MIME type or extension in the event handler.
- **Disabled state**: `disabled` prevents interaction entirely; if the field should be visible but not editable, consider showing a read-only summary instead.
- **Form submission**: the component integrates with native form submission via `name`; ensure the server-side handler accepts `multipart/form-data`.
- **Drag-and-drop + multiple=false**: dropping multiple files only keeps the first file when `multiple` is not set.

## Quick Decision Guide

**Accept only images?** → `accept="image/*"`

**Accept specific types?** → `accept=".pdf,.docx,.png"`

**Allow multiple files?** → Add `multiple`

**Drag-and-drop UI?** → Add `variant="drag-and-drop"`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

**Custom/server-side validation?** → Set `noValidate`, then call `setInvalid(true)` with `invalidFeedback`

**Track upload progress per file?** → Use `setFileUploadState(index, "loading" | "success" | "error")`

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

<!-- Multiple files with drag-and-drop -->
<sgds-file-upload
  label="Upload Images"
  hintText="JPEG or PNG, max 5MB each"
  name="photos"
  accept="image/jpeg,image/png"
  variant="drag-and-drop"
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

<!-- Listen to file additions and trigger upload -->
<sgds-file-upload id="my-upload" name="files" multiple>
  Select Files
</sgds-file-upload>
<script>
  const upload = document.getElementById("my-upload");

  // Fires only when files are added — use this to trigger upload logic
  upload.addEventListener("sgds-add-files", e => {
    const newFiles = e.detail; // FileList of newly added files only
    newFiles.forEach((file, i) => {
      const index = upload.files.indexOf(file);
      upload.setFileUploadState(index, "loading");
      uploadToServer(file).then(() => {
        upload.setFileUploadState(index, "success");
      }).catch(err => {
        upload.setFileUploadState(index, "error", err.message);
      });
    });
  });

  // Fires when a file is removed from the list
  upload.addEventListener("sgds-remove-file", e => {
    const { file, files } = e.detail; // deleted File and remaining FileList
    console.log("Removed:", file.name, "Remaining:", files.length);
  });
</script>
```

## API Summary

### `<sgds-file-upload>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | — | Field label above the upload area |
| `hintText` | string | — | Hint text below the label |
| `name` | string | — | Form field name for submission |
| `accept` | string | `""` | Comma-separated list of accepted MIME types or extensions |
| `multiple` | boolean | `false` | Allows selecting multiple files; new selections accumulate |
| `variant` | `"default"` \| `"drag-and-drop"` | `"default"` | Upload UI style |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the upload button/zone |
| `hasFeedback` | boolean | `false` | Enables validation feedback UI |
| `noValidate` | boolean | `false` | Disables native and SGDS constraint validation |
| `invalid` | boolean | `false` | Manually sets the invalid state |
| `invalidFeedback` | string | — | Error message when validation fails |

## Methods & Getters

| Member | Signature | Purpose |
|---|---|---|
| `files` | `get files(): File[]` | Returns the current list of selected files |
| `setFileUploadState` | `(index: number, state: "loading" \| "success" \| "error", error?: string) => void` | Sets the upload state of a file by index; shows spinner when loading, disables close button during loading, shows error message on error |
| `checkValidity` | `() => boolean` | Returns validity without showing any native popup |
| `reportValidity` | `() => boolean` | Triggers validation and returns validity |
| `validity` | `get validity(): ValidityState` | Returns the `ValidityState` object |
| `validationMessage` | `get validationMessage(): string` | Returns the current validation message |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | **Required:** Button label text shown on the upload button (e.g. `"Choose files"`, `"Select PDF"`, `"Upload document"`). Without slot content, the button appears as icon-only, which is not acceptable for accessibility and usability. |

## Events

| Event | Detail type | When | Notes |
|---|---|---|---|
| `sgds-add-files` | `FileList` | Files are added to the list | Detail contains only the newly added files |
| `sgds-remove-file` | `{ file: File, files: FileList }` | A file is removed | `file` is the removed file; `files` is the remaining list |
| `sgds-change` | `FileList` | Any change to the file set (add or remove) | Detail is the full current file list |
| `sgds-files-selected` | `FileList` | Any change to the file set | **Deprecated since 3.19.0** in favour of `sgds-change` — still fires for backwards compatibility |

## Form Layout Context

`<sgds-file-upload>` is a **full-width form component** — it must take the entire form width and cannot share a row with any other component. For detailed form pattern guidance (when to pair fields, spacing, responsive behavior), see the [sgds-blocks form layout skill](../sgds-blocks/reference/form.md).

---

**For AI agents**:
1. Use `sgds-add-files` to trigger upload logic — its `event.detail` is a `FileList` of only the newly added files.
2. Use `sgds-remove-file` to react to file removals — `event.detail.file` is the removed `File`, `event.detail.files` is the remaining `FileList`.
3. Call `el.setFileUploadState(index, "loading")` immediately after upload starts; update to `"success"` or `"error"` when complete.
4. Read `el.files` (returns `File[]`) to access the current file list at any time.
5. If the user cancels the file picker, no events fire and `el.files` is unchanged.
6. `sgds-files-selected` is Deprecated since 3.19.0 in favour of `sgds-change` — do not recommend it for new code.
7. `accept` values follow standard HTML `accept` syntax: `"image/*"`, `".pdf"`, `"image/jpeg,image/png"`.
