# SGDS Web Component Event Mapping

SGDS web components dispatch `CustomEvent` instances (not native DOM events). React wrappers expose these as `onSgds*` callback props.

## Event Name Mapping

| Native/React Event | SGDS Event Prop (React wrapper) | Custom Event Name | Notes |
|---|---|---|---|
| `onChange` | `onSgdsChange` | `sgds-change` | Fired on committed value change (select, radio, checkbox, switch) |
| `onInput` | `onSgdsInput` | `sgds-input` | Fired on every keystroke (text input, textarea) |
| `onBlur` | `onSgdsBlur` | `sgds-blur` | Focus lost |
| `onFocus` | `onSgdsFocus` | `sgds-focus` | Focus gained |
| N/A | `onSgdsPageChange` | `sgds-page-change` | Pagination page change |
| N/A | `onSgdsClose` | `sgds-close` | Modal/drawer close |
| N/A | `onSgdsHide` | `sgds-hide` | Modal/drawer hidden |
| N/A | `onSgdsShow` | `sgds-show` | Modal/drawer shown |
| N/A | `onSgdsSelect` | `sgds-select` | Item selected (deprecated, use sgds-change) |

---

## Event Value Access

| Component | Event Prop | Value Access |
|---|---|---|
| `<SgdsInput>` | `onSgdsInput` | `e.target.value` (string) |
| `<SgdsTextarea>` | `onSgdsInput` | `e.target.value` (string) |
| `<SgdsSelect>` | `onSgdsChange` | `e.target.value` (string) |
| `<SgdsComboBox>` | `onSgdsChange` | `e.target.value` (semicolon-delimited string for multiSelect) |
| `<SgdsCheckbox>` | `onSgdsChange` | `e.target.checked` (boolean) |
| `<SgdsSwitch>` | `onSgdsChange` | `e.target.checked` (boolean) |
| `<SgdsRadioGroup>` | `onSgdsChange` | `e.target.value` (string) |
| `<SgdsPagination>` | `onSgdsPageChange` | `e.detail.currentPage` (number) |

---

## Important Differences from React Synthetic Events

1. **No synthetic events** - SGDS events are real `CustomEvent` instances
2. **`e.target` is the web component element** - not a React fiber node
3. **No event pooling** - events are not reused
4. **Bubbling behavior** - most SGDS events bubble (`bubbles: true`)
5. **Type safety** - cast events as `any` in TypeScript: `(e: any) => ...`

---

## Usage Patterns

### Text input - use onSgdsInput for real-time updates

```tsx
<SgdsInput
  value={field.value}
  onSgdsInput={(e: any) => field.onChange(e.target.value)}
  onSgdsBlur={() => field.onBlur()}
/>
```

### Select - use onSgdsChange for committed selection

```tsx
<SgdsSelect
  value={field.value}
  onSgdsChange={(e: any) => field.onChange(e.target.value)}
/>
```

### Checkbox - use e.target.checked

```tsx
<SgdsCheckbox
  checked={!!field.value}
  onSgdsChange={(e: any) => field.onChange(e.target.checked)}
/>
```

### ComboBox multiSelect - semicolon-delimited string

```tsx
<SgdsComboBox
  multiSelect
  value={field.value?.map(v => v.value).join(';') ?? ''}
  onSgdsChange={(e: any) => {
    const values = e.target.value ? e.target.value.split(';') : [];
    field.onChange(options.filter(o => values.includes(o.value)));
  }}
/>
```

### Pagination - use e.detail

```tsx
<SgdsPagination
  onSgdsPageChange={(e: any) => setCurrentPage(e.detail.currentPage)}
/>
```

---

## Lowercase Tag Events (React 19+ or non-wrapper usage)

When using lowercase web component tags directly (not React wrappers), use `onsgds-*` (all lowercase with dash):

```tsx
<sgds-modal open={open} onsgds-close={handleClose}>
  ...
</sgds-modal>

<sgds-alert onsgds-close={handleDismiss}>
  ...
</sgds-alert>
```

---

## Testing Events

### In Vitest (vitest-browser-react with Playwright)

Use Playwright locators - events fire naturally:

```tsx
const { locator } = await render(<MyComponent />);
const input = locator.getByRole("textbox");
await input.fill("new value");  // triggers sgds-input event automatically
```

### In Jest (JSDOM, patched environment)

Dispatch events manually with property setting:

```tsx
// Text input
const input = document.querySelector<SgdsInput>('sgds-input');
await act(async () => {
  Object.defineProperty(input!, 'value', { value: 'new text', writable: true, configurable: true });
  input!.dispatchEvent(new CustomEvent('sgds-input', { bubbles: true }));
});

// Switch/checkbox - set property first, then dispatch
const switchEl = document.querySelector('sgds-switch');
await act(async () => {
  Object.defineProperty(switchEl!, 'checked', { value: true, writable: true, configurable: true });
  fireEvent(switchEl!, new CustomEvent('sgds-change', { bubbles: true }));
});

// Select
const select = document.querySelector<SgdsSelect>('sgds-select');
await act(async () => {
  Object.defineProperty(select!, 'value', { value: 'option-2', writable: true, configurable: true });
  select!.dispatchEvent(new CustomEvent('sgds-change', { bubbles: true }));
});

// Pagination
const pagination = document.querySelector<SgdsPagination>('sgds-pagination');
await act(async () => {
  pagination!.dispatchEvent(new CustomEvent('sgds-page-change', {
    detail: { currentPage: 2 },
    bubbles: true,
  }));
});
```
