# Migration Mapping: MUI (Material UI) to SGDS Web Components

## Component Mapping

| MUI Component | SGDS Web Component | React Import Path |
|---|---|---|
| `<TextField>` | `<SgdsInput>` or `<SgdsTextarea>` | `react/input/index.js` |
| `<Select>` + `<MenuItem>` | `<SgdsSelect>` + `<SgdsSelectOption>` | `react/select/index.js` |
| `<Autocomplete>` | `<SgdsComboBox>` + `<SgdsComboBoxOption>` | `react/combo-box/index.js` |
| `<Checkbox>` | `<SgdsCheckbox>` | `react/checkbox/index.js` |
| `<Radio>` + `<RadioGroup>` | `<SgdsRadioGroup>` + `<SgdsRadio>` | `react/radio-group/index.js` |
| `<Switch>` | `<SgdsSwitch>` | `react/switch/index.js` |
| `<Button>` | `<SgdsButton>` | `react/button/index.js` |
| `<IconButton>` | `<SgdsIconButton>` | `react/icon-button/index.js` |
| `<Dialog>` | `<sgds-modal>` | Use lowercase tag |
| `<Drawer>` | `<SgdsDrawer>` | `react/drawer/index.js` |
| `<Table>` + `<TableRow>` etc. | `<SgdsTable>` + row/head/cell | `react/table/index.js` |
| `<Tabs>` + `<Tab>` | `<SgdsTab>` | `react/tab/index.js` |
| `<Accordion>` | `<SgdsAccordion>` | `react/accordion/index.js` |
| `<Tooltip>` | `<SgdsTooltip>` | `react/tooltip/index.js` |
| `<Chip>` | `<SgdsBadge>` | `react/badge/index.js` |
| `<Alert>` | `<sgds-alert>` | Use lowercase tag |
| `<Breadcrumbs>` | `<SgdsBreadcrumb>` + `<SgdsBreadcrumbItem>` | `react/breadcrumb/index.js` |
| `<Pagination>` | `<SgdsPagination>` | `react/pagination/index.js` |
| `<Menu>` + `<MenuItem>` | `<SgdsOverflowMenu>` | `react/overflow-menu/index.js` |
| `<Skeleton>` | `<SgdsSkeleton>` | `react/skeleton/index.js` |
| `<CircularProgress>` | `<SgdsSpinner>` | `react/spinner/index.js` |
| `<LinearProgress>` | `<SgdsProgressBar>` | `react/progress-bar/index.js` |
| `<Snackbar>` | `<SgdsToast>` | `react/toast/index.js` |
| `<Stepper>` | `<SgdsStepper>` | `react/stepper/index.js` |
| `<Divider>` | `<SgdsDivider>` | `react/divider/index.js` |

---

## Props Mapping

### TextField to SgdsInput

| MUI prop | SGDS prop | Notes |
|---|---|---|
| `value` | `value` | Same |
| `onChange` | `onSgdsInput` | Use `e.target.value` |
| `onBlur` | `onSgdsBlur` | Same concept |
| `disabled` | `disabled` | Same |
| `placeholder` | `placeholder` | Same |
| `type` | `type` | Same |
| `label` | `label` | Same - built-in label |
| `helperText` | `hintText` | Renamed |
| `error` | Set via `ref.setInvalid(true)` | Imperative in SGDS |
| `helperText` (when error) | `invalidFeedback` | Validation message |
| `multiline` | Use `<SgdsTextarea>` instead | Different component |
| `rows` | `rows` on SgdsTextarea | Same |
| `InputProps.startAdornment` | `prefix` | Simplified |
| `InputProps.endAdornment` | `suffix` | Simplified |
| `variant="outlined"` | Default (SGDS has one style) | N/A |
| `size="small"` | `size="sm"` | Size tokens differ |
| `fullWidth` | `className="sgds:w-full"` | CSS utility |
| `inputProps.maxLength` | `maxlength` | Direct prop |

### Select to SgdsSelect

```tsx
// BEFORE (MUI)
<FormControl fullWidth>
  <InputLabel>Age</InputLabel>
  <Select value={age} label="Age" onChange={handleChange}>
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
  </Select>
  <FormHelperText>Helper text</FormHelperText>
</FormControl>

// AFTER (SGDS)
<SgdsSelect
  label="Age"
  hintText="Helper text"
  value={String(age)}
  onSgdsChange={(e: any) => handleChange(e.target.value)}
>
  <SgdsSelectOption value="10">Ten</SgdsSelectOption>
  <SgdsSelectOption value="20">Twenty</SgdsSelectOption>
</SgdsSelect>
```

### Autocomplete to SgdsComboBox

```tsx
// BEFORE (MUI)
<Autocomplete
  multiple
  options={options}
  getOptionLabel={(option) => option.label}
  value={selected}
  onChange={(_, newValue) => setSelected(newValue)}
  renderInput={(params) => <TextField {...params} label="Tags" />}
/>

// AFTER (SGDS)
<SgdsComboBox
  label="Tags"
  multiSelect
  value={selected.map(s => s.value).join(';')}
  onSgdsChange={(e: any) => {
    const values = e.target.value ? e.target.value.split(';') : [];
    setSelected(options.filter(o => values.includes(o.value)));
  }}
>
  {options.map(opt => (
    <SgdsComboBoxOption key={opt.value} value={opt.value}>
      {opt.label}
    </SgdsComboBoxOption>
  ))}
</SgdsComboBox>
```

### Dialog to sgds-modal

```tsx
// BEFORE (MUI)
<Dialog open={open} onClose={handleClose} maxWidth="md">
  <DialogTitle>Title</DialogTitle>
  <DialogContent>
    <DialogContentText>Content</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleConfirm} variant="contained">Confirm</Button>
  </DialogActions>
</Dialog>

// AFTER (SGDS)
{createPortal(
  <sgds-modal open={open} onsgds-close={handleClose} size="md">
    <div slot="title">Title</div>
    <p>Content</p>
    <div slot="footer" className="sgds:flex sgds:gap-2">
      <sgds-button variant="outline" onClick={handleClose}>Cancel</sgds-button>
      <sgds-button variant="primary" onClick={handleConfirm}>Confirm</sgds-button>
    </div>
  </sgds-modal>,
  document.body
)}
```

### Button Variants

| MUI variant | SGDS equivalent |
|---|---|
| `variant="contained"` | `variant="primary"` |
| `variant="outlined"` | `variant="outline"` |
| `variant="text"` | `variant="ghost"` |
| `color="error"` | `tone="danger"` |
| `color="warning"` | `tone="warning"` |
| `color="success"` | `tone="success"` |
| `size="small"` | `size="sm"` |
| `size="large"` | `size="lg"` |
| `startIcon={<Icon />}` | Use `<SgdsIcon>` as child or `name` prop on `<SgdsIconButton>` |

---

## Styling Migration

| MUI approach | SGDS approach |
|---|---|
| `sx={{ p: 2, mb: 1 }}` | `className="sgds:p-component-xs sgds:mb-2"` |
| `<Box sx={{...}}>` | `<div className="sgds:...">` |
| `<Stack spacing={2}>` | `<div className="sgds:flex sgds:flex-col sgds:gap-component-xs">` |
| `<Grid container spacing={2}>` | `<div className="sgds:grid sgds:grid-cols-12 sgds:gap-component-xs">` |
| `<Grid item xs={6}>` | `<div className="sgds:col-span-6">` |
| `theme.palette.error.main` | `sgds:text-danger-default` |
| `theme.spacing(2)` | `sgds:p-component-xs` / layout spacing tokens |
| `<ThemeProvider>` | SGDS CSS variables (no provider needed) |
| `makeStyles` / `styled` | `sgds:` utility classes |

---

## Removed Concepts

| MUI pattern | SGDS replacement |
|---|---|
| `<FormControl>` | Not needed - SGDS components are self-contained |
| `<InputLabel>` | Built-in `label` prop |
| `<FormHelperText>` | Built-in `hintText` / `invalidFeedback` |
| `<Box>` | `<div>` with utility classes |
| `<Stack>` | `<div className="sgds:flex sgds:flex-col sgds:gap-*">` |
| `<Grid>` | `sgds:grid sgds:grid-cols-12` utilities |
| `<Paper>` | `<div className="sgds:shadow sgds:bg-surface-default sgds:p-component-sm">` |
| `<Container>` | `sgds-container-sidebar` class |
| MUI theme object | SGDS CSS variables |
| `sx` prop | `className` with `sgds:` utilities |
| `useTheme()` | Not needed - use CSS variables directly |
