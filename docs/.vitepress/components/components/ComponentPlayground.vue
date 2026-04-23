<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { ConfigurationDemo } from "../../data/component-docs";

type PlaygroundSize = "extra-compact" | "compact" | "default" | "tall";

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

const activeMarkup = computed(() => {
  if (singleOptionMode.value) {
    const selected = exampleOptions.value.find((option) => option.value === activeControlKey.value);
    return selected?.markup ?? exampleOptions.value[0]?.markup ?? "";
  }

  const activeDemo =
    props.demos.find((demo) => demo.title === activeControlKey.value) ??
    props.demos[0];
  if (!activeDemo) return "";

  const selectedValue = selectedValues.value[activeDemo.title] ?? activeDemo.defaultValue;
  return activeDemo.options.find((option) => option.value === selectedValue)?.markup ?? activeDemo.options[0]?.markup ?? "";
});

const activeSupportingText = computed(() => {
  if (singleOptionMode.value) {
    const selected = exampleOptions.value.find((option) => option.value === activeControlKey.value);
    return {
      description: selected?.description ?? "",
      note: selected?.note ?? "",
    };
  }

  const activeDemo =
    props.demos.find((demo) => demo.title === activeControlKey.value) ??
    props.demos[0];
  if (!activeDemo) return { description: "", note: "" };

  const selectedValue = selectedValues.value[activeDemo.title] ?? activeDemo.defaultValue;
  const selectedOption = activeDemo.options.find((option) => option.value === selectedValue) ?? activeDemo.options[0];

  return {
    description: selectedOption?.description ?? activeDemo.description,
    note: selectedOption?.note ?? "",
  };
});

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

const handleDemoChange = (demoTitle: string, event: Event) => {
  selectedValues.value = {
    ...selectedValues.value,
    [demoTitle]: (event.target as HTMLSelectElement).value,
  };
  activeControlKey.value = demoTitle;
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
          <div :key="activePreviewKey" class="component-playground-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="activeMarkup"></div>
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
            <div v-if="singleOptionMode" class="sgds:flex sgds:flex-col sgds:gap-xs">
              <label class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
                Example
              </label>
              <div class="sgds:relative sgds:w-full">
                <select
                  :value="activeControlKey"
                  :aria-label="`${title} playground example`"
                  class="sgds:box-border sgds:block sgds:h-10 sgds:w-full sgds:max-w-full sgds:appearance-none sgds:rounded-md sgds:border sgds:border-default sgds:bg-surface-default sgds:px-sm sgds:pr-[32px] sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:outline-none focus:sgds:outline focus:sgds:outline-[var(--sgds-outline-focus)] focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]"
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
              <div
                v-for="demo in demos"
                :key="demo.title"
                class="sgds:flex sgds:flex-col sgds:gap-xs"
              >
                <label class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
                  {{ demo.title }}
                </label>
                <div class="sgds:relative sgds:w-full">
                  <select
                    :value="selectedValues[demo.title]"
                    :aria-label="demo.controlLabel || `${title} ${demo.title}`"
                    class="sgds:box-border sgds:block sgds:h-10 sgds:w-full sgds:max-w-full sgds:appearance-none sgds:rounded-md sgds:border sgds:border-default sgds:bg-surface-default sgds:px-sm sgds:pr-[32px] sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:outline-none focus:sgds:outline focus:sgds:outline-[var(--sgds-outline-focus)] focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]"
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

            <div v-if="activeSupportingText.description || activeSupportingText.note" class="sgds:flex sgds:flex-col sgds:gap-xs">
              <p v-if="activeSupportingText.description" class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">
                {{ activeSupportingText.description }}
              </p>
              <p v-if="activeSupportingText.note" class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">
                {{ activeSupportingText.note }}
              </p>
            </div>
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
