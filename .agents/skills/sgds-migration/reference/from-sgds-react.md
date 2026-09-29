# Migration Mapping: @govtechsg/sgds-react (v2) to SGDS Web Components (v3)

## Component Mapping

| sgds-react (v2) | SGDS Web Component | React Import Path |
|---|---|---|
| `<Form.Control>` | `<SgdsInput>` or `<SgdsTextarea>` | `react/input/index.js` or `react/textarea/index.js` |
| `<Form.Control as="textarea">` | `<SgdsTextarea>` | `react/textarea/index.js` |
| `<Form.Select>` | `<SgdsSelect>` + `<SgdsSelectOption>` | `react/select/index.js` + `react/select-option/index.js` |
| `<Form.Check type="checkbox">` | `<SgdsCheckbox>` | `react/checkbox/index.js` |
| `<Form.Check type="radio">` | `<SgdsRadioGroup>` + `<SgdsRadio>` | `react/radio-group/index.js` + `react/radio/index.js` |
| `<Form.Check type="switch">` | `<SgdsSwitch>` | `react/switch/index.js` |
| `<Dropdown>` | `<SgdsSelect>` or `<SgdsComboBox>` | `react/select/index.js` or `react/combo-box/index.js` |
| `<FormCheck>` | `<SgdsCheckbox>` | `react/checkbox/index.js` |
| `<Button>` | `<SgdsButton>` | `react/button/index.js` |
| `<Modal>` | `<sgds-modal>` | Use lowercase tag (portal-rendered) |
| `<Table>` | `<SgdsTable>` + `<SgdsTableRow>` + `<SgdsTableHead>` + `<SgdsTableCell>` | `react/table/index.js` etc. |
| `<Breadcrumb>` | `<SgdsBreadcrumb>` + `<SgdsBreadcrumbItem>` | `react/breadcrumb/index.js` |
| `<Pagination>` | `<SgdsPagination>` | `react/pagination/index.js` |
| `<Row>` | `<div className="sgds:flex">` or `<div className="sgds-grid">` | N/A (use utilities) |
| `<Col>` | `<div className="sgds-col-*">` or `<div className="sgds:col-span-*">` | N/A (use utilities) |
| `<Badge>` | `<SgdsBadge>` | `react/badge/index.js` |
| `<Alert>` | `<sgds-alert>` | Use lowercase tag |
| `<Tooltip>` | `<SgdsTooltip>` | `react/tooltip/index.js` |
| `<Accordion>` | `<SgdsAccordion>` | `react/accordion/index.js` |
| `<Tab>` / `<Tabs>` | `<SgdsTab>` | `react/tab/index.js` |

---

## Props Mapping

### Form.Control to SgdsInput

| sgds-react prop | SGDS web component prop |
|---|---|
| `value` | `value` |
| `onChange` | `onSgdsInput` (for keystroke) or `onSgdsChange` (for committed value) |
| `onBlur` | `onSgdsBlur` |
| `disabled` | `disabled` |
| `readOnly` | `readonly` (note: lowercase) |
| `placeholder` | `placeholder` |
| `type` | `type` |
| `isInvalid` | Set via `ref.current.setInvalid(true)` |
| `className` | `className` |
| N/A (new) | `label` - built-in label, no separate `<Form.Label>` needed |
| N/A (new) | `hintText` - built-in hint text |
| N/A (new) | `hasFeedback` - enables validation display |
| N/A (new) | `invalidFeedback` - error message text |
| N/A (new) | `prefix` / `suffix` - input adornments |
| N/A (new) | `maxlength` - character limit with counter |
| N/A (new) | `noValidate` - disable native validation |

### Form.Select to SgdsSelect

| sgds-react prop | SGDS web component prop |
|---|---|
| `value` | `value` (string) |
| `onChange` | `onSgdsChange` |
| `disabled` | `disabled` |
| children `<option>` | children `<SgdsSelectOption value={v}>{label}</SgdsSelectOption>` |
| N/A (new) | `label` - built-in label |
| N/A (new) | `hasFeedback` + `invalidFeedback` - validation |

### Form.Check (checkbox) to SgdsCheckbox

| sgds-react prop | SGDS web component prop |
|---|---|
| `checked` | `checked` |
| `onChange` | `onSgdsChange` with `e.target.checked` |
| `disabled` | `disabled` |
| `label` | Pass as children: `<SgdsCheckbox>{label}</SgdsCheckbox>` |
| `id` | Not needed (web component manages internally) |

### Form.Check (switch) to SgdsSwitch

| sgds-react prop | SGDS web component prop |
|---|---|
| `checked` | `checked` |
| `onChange` | `onSgdsChange` with `e.target.checked` |
| `disabled` | `disabled` |
| `label` | Pass as children: `<SgdsSwitch>{label}</SgdsSwitch>` |
| N/A (new) | `size` - `'sm' | 'md' | 'lg'` |

### Button to SgdsButton

| sgds-react prop | SGDS web component prop |
|---|---|
| `variant="primary"` | `variant="primary"` |
| `variant="outline-primary"` | `variant="outline"` |
| `variant="danger"` | `variant="primary" tone="danger"` |
| `onClick` | `onClick` (standard) |
| `disabled` | `disabled` |
| `size="sm"` | `size="sm"` |
| `type="submit"` | `type="submit"` |

---

## Layout Migration

### Row/Col Grid to SGDS Utilities

```tsx
// BEFORE (sgds-react)
<Row>
  <Col xs="12" md="4">{content}</Col>
  <Col xs="12" md="8">{content}</Col>
</Row>

// AFTER (SGDS web components + utilities)
<div className="sgds:grid sgds:grid-cols-12 sgds:gap-component-xs">
  <div className="sgds:col-span-12 sgds:md:col-span-4">{content}</div>
  <div className="sgds:col-span-12 sgds:md:col-span-8">{content}</div>
</div>
```

### OR use SGDS grid classes for card layouts:

```tsx
// BEFORE
<Row>
  <Col xs="4">{card}</Col>
  <Col xs="4">{card}</Col>
</Row>

// AFTER
<div className="sgds-grid sgds:gap-layout-xs">
  <div className="sgds-col-4">{card}</div>
  <div className="sgds-col-4">{card}</div>
</div>
```

---

## Form Integration Pattern

### BEFORE (sgds-react with React Hook Form)

```tsx
import { Form } from '@govtechsg/sgds-react/Form';

<Form.Group>
  <Form.Label>Name</Form.Label>
  <Form.Control
    {...register('name')}
    isInvalid={!!errors.name}
  />
  <Form.Control.Feedback type="invalid">
    {errors.name?.message}
  </Form.Control.Feedback>
</Form.Group>
```

### AFTER (SGDS web component with Controller)

```tsx
import SgdsInput from '@govtechsg/sgds-web-component/react/input/index.js';
import { Controller, useFormContext } from 'react-hook-form';

const { control } = useFormContext();

<Controller
  control={control}
  name="name"
  render={({ field, fieldState }) => (
    <SgdsInput
      label="Name"
      value={field.value ?? ''}
      onSgdsInput={(e: any) => field.onChange(e.target.value)}
      onSgdsBlur={() => field.onBlur()}
      hasFeedback="both"
      noValidate
      ref={(el) => {
        if (el) {
          el.setInvalid(!!fieldState.error);
          el.invalidFeedback = fieldState.error?.message ?? '';
        }
      }}
    />
  )}
/>
```

---

## Removed Concepts

These sgds-react patterns no longer exist in web components:

| Removed | Replacement |
|---|---|
| `<Form.Group>` | Not needed - label is built into the component |
| `<Form.Label>` | Use `label` prop on the component |
| `<Form.Control.Feedback>` | Use `hasFeedback` + `invalidFeedback` props |
| `<Form.Text>` | Use `hintText` prop |
| `<Row>` / `<Col>` | Use `sgds:grid` / `sgds:flex` utilities |
| `<Container>` | Use `sgds-container-sidebar` or `sgds:max-w-*` |
| Bootstrap utility classes | Use `sgds:` prefixed Tailwind v4 utilities |
