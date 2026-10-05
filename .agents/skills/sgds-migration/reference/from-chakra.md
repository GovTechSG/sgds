# Migration Mapping: Chakra UI to SGDS Web Components

## Component Mapping

| Chakra Component | SGDS Web Component | React Import Path |
|---|---|---|
| `<Input>` | `<SgdsInput>` | `react/input/index.js` |
| `<Textarea>` | `<SgdsTextarea>` | `react/textarea/index.js` |
| `<Select>` | `<SgdsSelect>` + `<SgdsSelectOption>` | `react/select/index.js` |
| `<Checkbox>` | `<SgdsCheckbox>` | `react/checkbox/index.js` |
| `<Radio>` + `<RadioGroup>` | `<SgdsRadioGroup>` + `<SgdsRadio>` | `react/radio-group/index.js` |
| `<Switch>` | `<SgdsSwitch>` | `react/switch/index.js` |
| `<Button>` | `<SgdsButton>` | `react/button/index.js` |
| `<IconButton>` | `<SgdsIconButton>` | `react/icon-button/index.js` |
| `<Modal>` | `<sgds-modal>` | Use lowercase tag |
| `<Drawer>` | `<SgdsDrawer>` | `react/drawer/index.js` |
| `<Table>` + `<Tr>` + `<Th>` + `<Td>` | `<SgdsTable>` + row/head/cell | `react/table/index.js` |
| `<Tabs>` + `<Tab>` | `<SgdsTab>` | `react/tab/index.js` |
| `<Accordion>` | `<SgdsAccordion>` | `react/accordion/index.js` |
| `<Tooltip>` | `<SgdsTooltip>` | `react/tooltip/index.js` |
| `<Badge>` / `<Tag>` | `<SgdsBadge>` | `react/badge/index.js` |
| `<Alert>` | `<sgds-alert>` | Use lowercase tag |
| `<Breadcrumb>` | `<SgdsBreadcrumb>` + `<SgdsBreadcrumbItem>` | `react/breadcrumb/index.js` |
| `<Menu>` + `<MenuItem>` | `<SgdsOverflowMenu>` | `react/overflow-menu/index.js` |
| `<Skeleton>` | `<SgdsSkeleton>` | `react/skeleton/index.js` |
| `<Spinner>` | `<SgdsSpinner>` | `react/spinner/index.js` |
| `<Progress>` | `<SgdsProgressBar>` | `react/progress-bar/index.js` |
| `<Divider>` | `<SgdsDivider>` | `react/divider/index.js` |
| `<Stepper>` | `<SgdsStepper>` | `react/stepper/index.js` |

---

## Props Mapping

### Input to SgdsInput

| Chakra prop | SGDS prop | Notes |
|---|---|---|
| `value` | `value` | Same |
| `onChange` | `onSgdsInput` | Use `e.target.value` |
| `onBlur` | `onSgdsBlur` | Same concept |
| `isDisabled` | `disabled` | Renamed (no `is` prefix) |
| `isReadOnly` | `readonly` | Renamed |
| `isInvalid` | Set via `ref.setInvalid(true)` | Imperative |
| `placeholder` | `placeholder` | Same |
| `type` | `type` | Same |
| `size="sm"` | `size="sm"` | Same |
| N/A | `label` | Built-in (replaces `<FormLabel>`) |
| N/A | `hintText` | Built-in (replaces `<FormHelperText>`) |
| N/A | `hasFeedback` | Enables validation UI |
| N/A | `invalidFeedback` | Replaces `<FormErrorMessage>` |

### FormControl Pattern to Flat SGDS

```tsx
// BEFORE (Chakra)
<FormControl isInvalid={!!errors.name}>
  <FormLabel>Name</FormLabel>
  <Input placeholder="Enter name" {...register('name')} />
  <FormHelperText>Your display name</FormHelperText>
  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
</FormControl>

// AFTER (SGDS)
<Controller
  control={control}
  name="name"
  render={({ field, fieldState }) => (
    <SgdsInput
      label="Name"
      placeholder="Enter name"
      hintText="Your display name"
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

### Select to SgdsSelect

```tsx
// BEFORE (Chakra)
<Select placeholder="Select option" value={value} onChange={handleChange}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>

// AFTER (SGDS)
<SgdsSelect
  label="Label"
  value={value}
  onSgdsChange={(e: any) => handleChange(e.target.value)}
>
  <SgdsSelectOption value="">Select option</SgdsSelectOption>
  <SgdsSelectOption value="option1">Option 1</SgdsSelectOption>
  <SgdsSelectOption value="option2">Option 2</SgdsSelectOption>
</SgdsSelect>
```

### Modal to sgds-modal

```tsx
// BEFORE (Chakra)
<Modal isOpen={isOpen} onClose={onClose} size="md">
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
      <Button colorScheme="blue" onClick={handleConfirm}>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

// AFTER (SGDS)
{createPortal(
  <sgds-modal open={isOpen} onsgds-close={onClose} size="md">
    <div slot="title">Title</div>
    <p>Content</p>
    <div slot="footer" className="sgds:flex sgds:gap-2">
      <sgds-button variant="outline" onClick={onClose}>Cancel</sgds-button>
      <sgds-button variant="primary" onClick={handleConfirm}>Confirm</sgds-button>
    </div>
  </sgds-modal>,
  document.body
)}
```

### Button Variants

| Chakra variant/colorScheme | SGDS equivalent |
|---|---|
| `colorScheme="blue"` (default) | `variant="primary"` |
| `variant="outline"` | `variant="outline"` |
| `variant="ghost"` | `variant="ghost"` |
| `variant="link"` | `variant="ghost"` + link styling |
| `colorScheme="red"` | `tone="danger"` |
| `colorScheme="green"` | `tone="success"` |
| `colorScheme="yellow"` | `tone="warning"` |
| `size="sm"` | `size="sm"` |
| `size="lg"` | `size="lg"` |
| `isLoading` | `loading` on `<SgdsButton>` |
| `leftIcon` | Use `<SgdsIcon>` as child |

---

## Styling Migration (Style Props to Utility Classes)

| Chakra style prop | SGDS utility class |
|---|---|
| `p={4}` | `sgds:p-component-sm` |
| `px={4}` | `sgds:px-component-sm` |
| `mt={2}` | `sgds:mt-2` |
| `mb={4}` | `sgds:mb-4` |
| `gap={2}` | `sgds:gap-component-xs` |
| `w="full"` | `sgds:w-full` |
| `h="100%"` | `sgds:h-full` |
| `display="flex"` | `sgds:flex` |
| `flexDirection="column"` | `sgds:flex-col` |
| `alignItems="center"` | `sgds:items-center` |
| `justifyContent="space-between"` | `sgds:justify-between` |
| `fontSize="sm"` | `sgds:text-body-sm` |
| `fontWeight="bold"` | `sgds:font-bold` |
| `color="red.500"` | `sgds:text-danger-default` |
| `bg="gray.100"` | `sgds:bg-alternate` |
| `borderRadius="md"` | `sgds:rounded-md` |
| `shadow="md"` | `sgds:shadow` |

### Layout Components to Utilities

| Chakra layout | SGDS replacement |
|---|---|
| `<Box>` | `<div>` with utilities |
| `<Flex>` | `<div className="sgds:flex">` |
| `<Stack>` / `<VStack>` | `<div className="sgds:flex sgds:flex-col sgds:gap-component-xs">` |
| `<HStack>` | `<div className="sgds:flex sgds:gap-component-xs">` |
| `<Grid templateColumns="repeat(3, 1fr)">` | `<div className="sgds:grid sgds:grid-cols-3">` |
| `<GridItem colSpan={2}>` | `<div className="sgds:col-span-2">` |
| `<Container>` | `<div className="sgds-container-sidebar">` |
| `<Center>` | `<div className="sgds:flex sgds:items-center sgds:justify-center">` |
| `<Spacer>` | `sgds:flex-1` on a div or `sgds:gap-*` |

---

## Removed Concepts

| Chakra pattern | SGDS replacement |
|---|---|
| `<ChakraProvider>` | Not needed - import SGDS CSS once |
| `useColorMode()` | SGDS handles via CSS variables / `data-theme` attribute |
| `<FormControl>` | Not needed - SGDS components are self-contained |
| `<FormLabel>` | Built-in `label` prop |
| `<FormHelperText>` | Built-in `hintText` prop |
| `<FormErrorMessage>` | Built-in `invalidFeedback` prop |
| `useDisclosure()` | Use React `useState` directly |
| `useToast()` | Use SGDS toast component imperatively |
| Style props (`p`, `m`, `bg`, etc.) | `sgds:` utility classes |
| `extendTheme()` | Override SGDS CSS variables |
| `as` prop | Not applicable - SGDS components render their own DOM |
