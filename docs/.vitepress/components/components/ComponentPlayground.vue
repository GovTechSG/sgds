<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { ConfigurationDemo } from "../../data/component-docs";

type PlaygroundSize = "extra-compact" | "compact" | "default" | "tall";

type EditablePlaygroundField = {
  key: string;
  label: string;
  defaultValue: string;
  multiline: boolean;
  maxLength: number;
};

const props = withDefaults(
  defineProps<{
    title: string;
    demos: ConfigurationDemo[];
    size?: PlaygroundSize;
  }>(),
  { size: "default" },
);

// Map size variant → min-height class applied to both preview + control-rail columns.
// Uses raw numeric utilities because no semantic token matches these preview heights.
const sizeMinHeightClass = computed(() => {
  switch (props.size) {
    case "extra-compact": return "sgds:min-h-[180px]";
    case "compact":       return "sgds:min-h-[240px]";
    case "tall":          return "sgds:min-h-[480px]";
    default:              return "sgds:min-h-[376px]";
  }
});

const controlRailWidth = ref(313);
const playgroundRoot = ref<HTMLElement | null>(null);
const isSingleColumn = ref(false);
const activeControlKey = ref("");

const CONTROL_RAIL_MIN_WIDTH = 280;
const CONTROL_RAIL_MAX_WIDTH = 420;
const PLAYGROUND_TEXT_MAX_LENGTH = 120;
const PLAYGROUND_TEXTAREA_MAX_LENGTH = 240;

const EDITABLE_ATTRIBUTE_LABELS: Record<string, string> = {
  content: "Content",
  label: "Label",
  placeholder: "Placeholder",
  title: "Title",
};

const EDITABLE_ATTRIBUTE_NAMES = new Set(Object.keys(EDITABLE_ATTRIBUTE_LABELS));
const SKIPPED_TEXT_TAGS = new Set(["SCRIPT", "STYLE", "SGDS-ICON"]);

const singleOptionMode = computed(
  () => props.demos.length > 0 && props.demos.every((demo) => demo.options.length === 1),
);

const selectedValues = ref<Record<string, string>>(
  Object.fromEntries(props.demos.map((demo) => [demo.title, demo.defaultValue])),
);

const exampleOptions = computed(() =>
  props.demos.map((demo) => ({
    label: demo.title,
    value: demo.title,
    markup: demo.options[0]?.markup ?? "",
    description: demo.options[0]?.description ?? demo.description,
    note: demo.options[0]?.note,
  })),
);

const sanitisePlaygroundText = (value: string, maxLength: number, multiline: boolean) => {
  const strippedControlChars = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  const normalisedNewlines = strippedControlChars.replace(/\r\n?/g, "\n");
  const flattened = multiline ? normalisedNewlines : normalisedNewlines.replace(/\n+/g, " ");
  return flattened.slice(0, maxLength);
};

const toSentenceCase = (value: string) =>
  value
    .replace(/^sgds-/, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());

const buildEditableFieldLabel = (baseLabel: string, counts: Map<string, number>) => {
  const nextCount = (counts.get(baseLabel) ?? 0) + 1;
  counts.set(baseLabel, nextCount);
  return nextCount === 1 ? baseLabel : `${baseLabel} ${nextCount}`;
};

const getEditableFields = (markup: string) => {
  if (!markup.trim() || typeof DOMParser === "undefined" || typeof Node === "undefined") return [] as EditablePlaygroundField[];

  const document = new DOMParser().parseFromString(`<div data-playground-root>${markup}</div>`, "text/html");
  const root = document.body.firstElementChild;
  if (!root) return [] as EditablePlaygroundField[];

  const fields: EditablePlaygroundField[] = [];
  const labelCounts = new Map<string, number>();
  let textIndex = 0;
  let attributeIndex = 0;

  const walk = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toUpperCase();
      const readableTag = toSentenceCase(tagName.toLowerCase());

      for (const attributeName of EDITABLE_ATTRIBUTE_NAMES) {
        if (!element.hasAttribute(attributeName)) continue;
        const defaultValue = element.getAttribute(attributeName)?.trim();
        if (!defaultValue) continue;

        const label = buildEditableFieldLabel(
          `${readableTag} ${EDITABLE_ATTRIBUTE_LABELS[attributeName]}`,
          labelCounts,
        );

        fields.push({
          key: `attr-${attributeIndex}`,
          label,
          defaultValue,
          multiline: attributeName === "content" && defaultValue.length > 80,
          maxLength: attributeName === "content" ? PLAYGROUND_TEXTAREA_MAX_LENGTH : PLAYGROUND_TEXT_MAX_LENGTH,
        });

        attributeIndex += 1;
      }
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const rawText = node.textContent ?? "";
      const trimmedText = rawText.trim();
      const parentElement = node.parentElement;

      if (
        !trimmedText
        || !parentElement
        || SKIPPED_TEXT_TAGS.has(parentElement.tagName.toUpperCase())
      ) {
        return;
      }

      const label = buildEditableFieldLabel(
        `${toSentenceCase(parentElement.tagName.toLowerCase())} text`,
        labelCounts,
      );

      fields.push({
        key: `text-${textIndex}`,
        label,
        defaultValue: trimmedText,
        multiline: trimmedText.includes("\n") || trimmedText.length > 80,
        maxLength: trimmedText.includes("\n") || trimmedText.length > 80
          ? PLAYGROUND_TEXTAREA_MAX_LENGTH
          : PLAYGROUND_TEXT_MAX_LENGTH,
      });

      textIndex += 1;
      return;
    }

    node.childNodes.forEach(walk);
  };

  root.childNodes.forEach(walk);
  return fields;
};

const textOverrides = ref<Record<string, string>>({});

const getTextOverrideScope = () =>
  singleOptionMode.value
    ? `${props.title}:${activeControlKey.value || "default"}`
    : props.title;

const getTextOverrideStorageKey = (fieldKey: string) =>
  `${getTextOverrideScope()}:${fieldKey}`;

const buildInlineEditableMarkup = (markup: string, fields: EditablePlaygroundField[], overrides: Record<string, string>) => {
  if (!markup.trim() || typeof DOMParser === "undefined" || typeof Node === "undefined") return markup;

  const document = new DOMParser().parseFromString(`<div data-playground-root>${markup}</div>`, "text/html");
  const root = document.body.firstElementChild;
  if (!root) return markup;

  let textIndex = 0;
  let attributeIndex = 0;

  const walk = (node: Node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      for (const attributeName of EDITABLE_ATTRIBUTE_NAMES) {
        if (!element.hasAttribute(attributeName)) continue;

        const field = fields.find((candidate) => candidate.key === `attr-${attributeIndex}`);
        attributeIndex += 1;
        if (!field) continue;

        const override = overrides[getTextOverrideStorageKey(field.key)];
        element.setAttribute(
          attributeName,
          sanitisePlaygroundText(
            override ?? field.defaultValue,
            field.maxLength,
            false,
          ),
        );
      }
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const parentElement = node.parentElement;
      const rawText = node.textContent ?? "";
      const trimmedText = rawText.trim();

      if (
        !trimmedText
        || !parentElement
        || SKIPPED_TEXT_TAGS.has(parentElement.tagName.toUpperCase())
      ) {
        return;
      }

      const field = fields.find((candidate) => candidate.key === `text-${textIndex}`);
      textIndex += 1;
      if (!field) return;

      const override = overrides[getTextOverrideStorageKey(field.key)];
      const leadingWhitespace = rawText.match(/^\s*/)?.[0] ?? "";
      const trailingWhitespace = rawText.match(/\s*$/)?.[0] ?? "";
      const editableValue = sanitisePlaygroundText(
        override ?? field.defaultValue,
        field.maxLength,
        field.multiline,
      );

      const fragment = document.createDocumentFragment();
      if (leadingWhitespace) {
        fragment.append(document.createTextNode(leadingWhitespace));
      }

      const span = document.createElement("span");
      span.setAttribute("data-playground-field-key", field.key);
      span.setAttribute("contenteditable", "true");
      span.setAttribute("spellcheck", "false");
      span.setAttribute("tabindex", "0");
      span.setAttribute("aria-label", `Edit ${field.label}`);
      span.className = [
        "sgds:inline-block",
        "sgds:max-w-full",
        "sgds:cursor-text",
        "sgds:rounded-sm",
        "sgds:outline-none",
        "focus:sgds:bg-surface-default",
        "focus:sgds:outline",
        "focus:sgds:outline-[var(--sgds-outline-focus)]",
        "focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]",
      ].join(" ");

      if (field.multiline) {
        span.classList.add("sgds:whitespace-pre-line");
      }

      span.textContent = editableValue;
      fragment.append(span);

      if (trailingWhitespace) {
        fragment.append(document.createTextNode(trailingWhitespace));
      }

      node.parentNode?.replaceChild(fragment, node);
      return;
    }

    node.childNodes.forEach(walk);
  };

  root.childNodes.forEach(walk);
  return root.innerHTML;
};

const buttonPlaygroundMarkup = computed(() => {
  if (props.title !== "Button") return "";

  const variant = selectedValues.value.Variants ?? "primary";
  const tone = selectedValues.value.Tone ?? "brand";
  const size = selectedValues.value.Size ?? "md";
  const leadingIcon = selectedValues.value["Leading icon"] ?? "none";
  const trailingIcon = selectedValues.value["Trailing icon"] ?? "none";

  const variantAttr = variant === "primary" ? "" : ` variant="${variant}"`;
  const toneAttr = tone === "brand" ? "" : ` tone="${tone}"`;
  const sizeAttr = size === "md" ? "" : ` size="${size}"`;
  const leftIconMarkup = leadingIcon === "leading"
    ? `<sgds-icon slot="leftIcon" name="house"></sgds-icon>`
    : "";
  const rightIconMarkup = trailingIcon === "trailing"
    ? `<sgds-icon slot="rightIcon" name="chevron-right"></sgds-icon>`
    : "";
  const wrapperClass = tone === "fixed-light" ? "portal-demo-row portal-demo-row-inverse" : "portal-demo-row";

  return `<div class="${wrapperClass}"><sgds-button${variantAttr}${toneAttr}${sizeAttr}>${leftIconMarkup}Button label${rightIconMarkup}</sgds-button></div>`;
});

const baseActiveMarkup = computed(() => {
  if (singleOptionMode.value) {
    const selected = exampleOptions.value.find((option) => option.value === activeControlKey.value);
    return selected?.markup ?? exampleOptions.value[0]?.markup ?? "";
  }

  if (props.title === "Button") {
    return buttonPlaygroundMarkup.value;
  }

  const activeDemo =
    props.demos.find((demo) => demo.title === activeControlKey.value) ??
    props.demos[0];
  if (!activeDemo) return "";

  const selectedValue = selectedValues.value[activeDemo.title] ?? activeDemo.defaultValue;
  return activeDemo.options.find((option) => option.value === selectedValue)?.markup ?? activeDemo.options[0]?.markup ?? "";
});

const editableFields = computed(() => getEditableFields(baseActiveMarkup.value));

watch(
  editableFields,
  (fields) => {
    const nextOverrides = { ...textOverrides.value };

    fields.forEach((field) => {
      const storageKey = getTextOverrideStorageKey(field.key);
      if (nextOverrides[storageKey] !== undefined) return;
      nextOverrides[storageKey] = field.defaultValue;
    });

    textOverrides.value = nextOverrides;
  },
  { immediate: true },
);

const activeMarkup = computed(() =>
  buildInlineEditableMarkup(baseActiveMarkup.value, editableFields.value, textOverrides.value),
);

const editableFieldsByKey = computed(() =>
  new Map(editableFields.value.map((field) => [field.key, field])),
);

// Two-option demos (e.g. Static/Dismissible, No icon/With icon) render as a
// switch instead of a select — the default value is the "off" state, the
// other value is the "on" state.
const isBooleanDemo = (demo: ConfigurationDemo) => demo.options.length === 2;

const isSwitchOn = (demo: ConfigurationDemo) => {
  const selectedValue = selectedValues.value[demo.title] ?? demo.defaultValue;
  return selectedValue !== demo.defaultValue;
};

type SwitchChangeEvent = CustomEvent<{ checked: boolean }>;

const handleSwitchChange = (demo: ConfigurationDemo, event: Event) => {
  const checked = (event as SwitchChangeEvent).detail.checked;
  const onValue = demo.options.find((opt) => opt.value !== demo.defaultValue)?.value;
  const nextValue = checked ? onValue : demo.defaultValue;
  if (!nextValue) return;
  syncLinkedPlaygroundValues(demo.title, nextValue);
};

const activePreviewKey = computed(
  () =>
    [
      activeControlKey.value,
      ...Object.entries(selectedValues.value).flat(),
    ].join("|"),
);

const clampControlRailWidth = (value: number) =>
  Math.min(CONTROL_RAIL_MAX_WIDTH, Math.max(CONTROL_RAIL_MIN_WIDTH, value));

const syncLayoutMode = () => {
  isSingleColumn.value = window.innerWidth < 1280;
};

const handlePointerMove = (event: PointerEvent) => {
  if (!playgroundRoot.value) return;
  const { right } = playgroundRoot.value.getBoundingClientRect();
  const nextWidth = right - event.clientX;
  controlRailWidth.value = clampControlRailWidth(nextWidth);
};

const stopResize = () => {
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerup", stopResize);
};

const startResize = (event: PointerEvent) => {
  event.preventDefault();
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", stopResize);
};

const handleExampleChange = (event: Event) => {
  activeControlKey.value = (event.target as HTMLSelectElement).value;
};

const syncLinkedPlaygroundValues = (demoTitle: string, nextValue: string) => {
  const nextValues = {
    ...selectedValues.value,
    [demoTitle]: nextValue,
  };

  if (props.title === "Breadcrumb") {
    if (demoTitle === "Overflow") {
      if (nextValue === "on") {
        nextValues["Number of links"] = "5";
      } else {
        const currentCount = Number(selectedValues.value["Number of links"] ?? nextValues["Number of links"] ?? "4");
        nextValues["Number of links"] = currentCount >= 5 ? "4" : String(currentCount || 4);
      }
    }

    if (demoTitle === "Number of links") {
      nextValues.Overflow = Number(nextValue) >= 5 ? "on" : "off";
    }
  }

  selectedValues.value = nextValues;
  activeControlKey.value = demoTitle;
};

const handleDemoChange = (demoTitle: string, event: Event) => {
  syncLinkedPlaygroundValues(demoTitle, (event.target as HTMLSelectElement).value);
};

const getEditableFieldFromTarget = (eventTarget: EventTarget | null) => {
  if (!(eventTarget instanceof HTMLElement)) return null;
  const fieldTarget = eventTarget.closest<HTMLElement>("[data-playground-field-key]");
  if (!fieldTarget) return null;
  const fieldKey = fieldTarget.dataset.playgroundFieldKey;
  if (!fieldKey) return null;
  const field = editableFieldsByKey.value.get(fieldKey);
  if (!field) return null;
  return { field, fieldTarget };
};

const updateInlineEditableText = (field: EditablePlaygroundField, fieldTarget: HTMLElement) => {
  const sanitisedValue = sanitisePlaygroundText(
    fieldTarget.textContent ?? "",
    field.maxLength,
    field.multiline,
  );

  fieldTarget.textContent = sanitisedValue;
  textOverrides.value = {
    ...textOverrides.value,
    [getTextOverrideStorageKey(field.key)]: sanitisedValue,
  };
};

const handlePreviewInput = (event: Event) => {
  const editableField = getEditableFieldFromTarget(event.target);
  if (!editableField) return;
  updateInlineEditableText(editableField.field, editableField.fieldTarget);
};

const handlePreviewPaste = (event: ClipboardEvent) => {
  const editableField = getEditableFieldFromTarget(event.target);
  if (!editableField) return;

  event.preventDefault();
  const pastedText = event.clipboardData?.getData("text/plain") ?? "";
  const selection = window.getSelection();
  if (!selection?.rangeCount) return;

  selection.deleteFromDocument();
  selection.getRangeAt(0).insertNode(document.createTextNode(pastedText));
  selection.collapseToEnd();

  updateInlineEditableText(editableField.field, editableField.fieldTarget);
};

const handlePreviewBlur = (event: FocusEvent) => {
  const editableField = getEditableFieldFromTarget(event.target);
  if (!editableField) return;
  updateInlineEditableText(editableField.field, editableField.fieldTarget);
};

const handlePreviewKeydown = (event: KeyboardEvent) => {
  const editableField = getEditableFieldFromTarget(event.target);
  if (!editableField) return;

  if (event.key === "Escape") {
    event.preventDefault();
    const storedValue = textOverrides.value[getTextOverrideStorageKey(editableField.field.key)]
      ?? editableField.field.defaultValue;
    editableField.fieldTarget.textContent = storedValue;
    editableField.fieldTarget.blur();
    return;
  }

  if (!editableField.field.multiline && event.key === "Enter") {
    event.preventDefault();
    editableField.fieldTarget.blur();
  }
};

onMounted(() => {
  syncLayoutMode();
  window.addEventListener("resize", syncLayoutMode);
  activeControlKey.value = singleOptionMode.value ? props.demos[0]?.title ?? "" : props.demos[0]?.title ?? "";
});

onBeforeUnmount(() => {
  stopResize();
  window.removeEventListener("resize", syncLayoutMode);
});
</script>

<template>
  <div
    ref="playgroundRoot"
    class="sgds:box-border sgds:w-full sgds:max-w-full sgds:border sgds:border-muted sgds:rounded-xl sgds:bg-surface-raised sgds:overflow-hidden"
  >
    <div
      class="sgds:grid sgds:w-full sgds:max-w-full sgds:items-stretch sgds:max-xl:grid-cols-1"
      :style="{
        gridTemplateColumns: isSingleColumn ? undefined : `minmax(0,1fr) minmax(0, ${controlRailWidth}px)`,
      }"
    >
      <div :class="['sgds:min-w-0 sgds:flex sgds:items-center sgds:justify-center sgds:bg-alternate sgds:px-4-xl sgds:py-4-xl', sizeMinHeightClass]">
        <div class="sgds:w-full sgds:max-w-[560px]">
          <div
            :key="activePreviewKey"
            class="component-playground-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full"
            v-html="activeMarkup"
            @input="handlePreviewInput"
            @paste="handlePreviewPaste"
            @focusout="handlePreviewBlur"
            @keydown="handlePreviewKeydown"
          ></div>
        </div>
      </div>

      <div :class="['sgds:relative sgds:h-full sgds:min-w-0 sgds:flex sgds:flex-col sgds:bg-default sgds:border-l sgds:border-muted sgds:max-xl:h-auto sgds:max-xl:min-h-0 sgds:max-xl:border-l-0 sgds:max-xl:border-t', sizeMinHeightClass]">
        <button
          type="button"
          aria-label="Resize playground controls"
          class="sgds:absolute sgds:left-0 sgds:top-0 sgds:h-full sgds:w-component-sm sgds:-translate-x-1/2 sgds:cursor-col-resize sgds:bg-transparent sgds:border-0 sgds:p-0 sgds:max-xl:hidden"
          @pointerdown="startResize"
        >
          <span class="sgds:absolute sgds:left-1/2 sgds:top-1/2 sgds:h-12 sgds:w-[var(--sgds-border-width-2)] sgds:-translate-x-1/2 sgds:-translate-y-1/2 sgds:rounded-full sgds:bg-border-subtle"></span>
        </button>

        <div class="sgds:min-h-0 sgds:flex-1 sgds:overflow-y-auto sgds:px-xl sgds:py-2-xl sgds:max-xl:overflow-visible">
          <div class="sgds:flex sgds:flex-col sgds:gap-md">
            <p v-if="editableFields.length" class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">
              Click text in the preview to edit it inline.
            </p>

            <div v-if="singleOptionMode" class="sgds:flex sgds:flex-col sgds:gap-xs">
              <label class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
                Example
              </label>
              <div class="sgds:relative sgds:w-full">
                <select
                  :value="activeControlKey"
                  :aria-label="`${title} playground example`"
                  class="sgds:box-border sgds:block sgds:h-[var(--sgds-dimension-40)] sgds:w-full sgds:max-w-full sgds:appearance-none sgds:rounded-md sgds:border sgds:border-default sgds:bg-surface-default sgds:px-sm sgds:pr-2-xl sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:outline-none focus:sgds:outline focus:sgds:outline-[var(--sgds-outline-focus)] focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]"
                  @change="handleExampleChange"
                >
                  <option
                    v-for="option in exampleOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <sgds-icon
                  name="chevron-down"
                  size="sm"
                  class="sgds:pointer-events-none sgds:absolute sgds:right-sm sgds:top-1/2 sgds:-translate-y-1/2 sgds:text-subtle"
                ></sgds-icon>
              </div>
            </div>

            <template v-else>
              <template
                v-for="demo in demos"
                :key="demo.title"
              >
                <!-- Two-option demos render as a switch (y/n pattern) -->
                <sgds-switch
                  v-if="isBooleanDemo(demo)"
                  size="sm"
                  :checked="isSwitchOn(demo)"
                  :aria-label="demo.controlLabel || `${title} ${demo.title}`"
                  @sgds-change="handleSwitchChange(demo, $event)"
                >
                  {{ demo.title }}
                </sgds-switch>

                <!-- Multi-option demos render as a select -->
                <div v-else class="sgds:flex sgds:flex-col sgds:gap-xs">
                  <label class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
                    {{ demo.title }}
                  </label>
                  <div class="sgds:relative sgds:w-full">
                    <select
                      :value="selectedValues[demo.title]"
                      :aria-label="demo.controlLabel || `${title} ${demo.title}`"
                      class="sgds:box-border sgds:block sgds:h-[var(--sgds-dimension-40)] sgds:w-full sgds:max-w-full sgds:appearance-none sgds:rounded-md sgds:border sgds:border-default sgds:bg-surface-default sgds:px-sm sgds:pr-2-xl sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:outline-none focus:sgds:outline focus:sgds:outline-[var(--sgds-outline-focus)] focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]"
                      @change="handleDemoChange(demo.title, $event)"
                    >
                      <option
                        v-for="option in demo.options"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                    <sgds-icon
                      name="chevron-down"
                      size="sm"
                      class="sgds:pointer-events-none sgds:absolute sgds:right-sm sgds:top-1/2 sgds:-translate-y-1/2 sgds:text-subtle"
                    ></sgds-icon>
                  </div>
                </div>
              </template>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.component-playground-markup > sgds-accordion,
.component-playground-markup > sgds-alert,
.component-playground-markup > sgds-breadcrumb,
.component-playground-markup > sgds-button,
.component-playground-markup > sgds-checkbox,
.component-playground-markup > sgds-combo-box,
.component-playground-markup > sgds-datepicker,
.component-playground-markup > sgds-description-list,
.component-playground-markup > sgds-dropdown,
.component-playground-markup > sgds-file-upload,
.component-playground-markup > sgds-input,
.component-playground-markup > sgds-link,
.component-playground-markup > sgds-mainnav,
.component-playground-markup > sgds-overflow-menu,
.component-playground-markup > sgds-pagination,
.component-playground-markup > sgds-progress-bar,
.component-playground-markup > sgds-quantity-toggle,
.component-playground-markup > sgds-radio-group,
.component-playground-markup > sgds-radio,
.component-playground-markup > sgds-select,
.component-playground-markup > sgds-sidebar,
.component-playground-markup > sgds-sidenav,
.component-playground-markup > sgds-skeleton,
.component-playground-markup > sgds-spinner,
.component-playground-markup > sgds-stepper,
.component-playground-markup > sgds-subnav,
.component-playground-markup > sgds-switch,
.component-playground-markup > sgds-system-banner,
.component-playground-markup > sgds-table,
.component-playground-markup > sgds-tabs,
.component-playground-markup > sgds-textarea,
.component-playground-markup > sgds-toast,
.component-playground-markup > sgds-tooltip {
  display: block;
  width: 100%;
}

.component-playground-markup > sgds-breadcrumb,
.component-playground-markup > sgds-button,
.component-playground-markup > sgds-badge,
.component-playground-markup > sgds-link,
.component-playground-markup > sgds-overflow-menu,
.component-playground-markup > sgds-spinner,
.component-playground-markup > sgds-switch {
  width: auto;
}

.component-playground-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  overflow: hidden;
}

.component-playground-markup sgds-alert-link {
  vertical-align: baseline;
}

</style>
