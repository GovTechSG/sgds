<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { AlertPlaygroundContent } from "../../data/component-docs";

const props = defineProps<{
  content: AlertPlaygroundContent;
}>();

type AlertVariant = AlertPlaygroundContent["defaultVariant"];

const variantOptions: Array<{ label: string; value: AlertVariant }> = [
  { label: "Info", value: "info" },
  { label: "Success", value: "success" },
  { label: "Danger", value: "danger" },
  { label: "Warning", value: "warning" },
  { label: "Neutral", value: "neutral" },
];

const variant = ref<AlertVariant>(props.content.defaultVariant);
const outlined = ref(props.content.defaultOutlined);
const dismissible = ref(props.content.defaultDismissible);
const withIcon = ref(props.content.defaultWithIcon);
const showTitle = ref(props.content.defaultShowTitle);
const title = ref(props.content.defaultTitle);
const description = ref(props.content.defaultDescription);
const controlRailWidth = ref(313);
const playgroundRoot = ref<HTMLElement | null>(null);
const isSingleColumn = ref(false);

const CONTROL_RAIL_MIN_WIDTH = 280;
const CONTROL_RAIL_MAX_WIDTH = 420;

const alertIconName = computed(() => {
  if (variant.value === "success") return "check-circle-fill";
  if (variant.value === "danger") return "exclamation-circle-fill";
  if (variant.value === "warning") return "exclamation-triangle-fill";
  return "info-circle-fill";
});

const alertPreviewKey = computed(
  () =>
    [
      variant.value,
      outlined.value ? "outlined" : "filled",
      dismissible.value ? "dismissible" : "static",
      withIcon.value && showTitle.value ? "icon" : "no-icon",
      showTitle.value ? title.value : "untitled",
      description.value,
    ].join("|"),
);

type SwitchChangeEvent = CustomEvent<{ checked: boolean }>;

const toggleOutlined = (event: SwitchChangeEvent) => {
  outlined.value = event.detail.checked;
};

const toggleDismissible = (event: SwitchChangeEvent) => {
  dismissible.value = event.detail.checked;
};

const toggleWithIcon = (event: SwitchChangeEvent) => {
  withIcon.value = event.detail.checked;
};

const toggleTitle = (event: SwitchChangeEvent) => {
  showTitle.value = event.detail.checked;
  if (!event.detail.checked) {
    withIcon.value = false;
  }
};

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

onBeforeUnmount(() => {
  stopResize();
  window.removeEventListener("resize", syncLayoutMode);
});

onMounted(() => {
  syncLayoutMode();
  window.addEventListener("resize", syncLayoutMode);
});
</script>

<template>
  <div ref="playgroundRoot" class="sgds:box-border sgds:w-full sgds:max-w-full sgds:border sgds:border-muted sgds:rounded-xl sgds:bg-surface-raised sgds:overflow-hidden">
    <div
      class="sgds:grid sgds:w-full sgds:max-w-full sgds:items-stretch sgds:max-xl:grid-cols-1"
      :style="{
        gridTemplateColumns: isSingleColumn ? undefined : `minmax(0,1fr) minmax(0, ${controlRailWidth}px)`,
      }"
    >
      <div class="sgds:min-w-0 sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[376px] sgds:bg-alternate sgds:px-4-xl sgds:py-4-xl">
        <div class="sgds:w-full sgds:max-w-[560px]">
          <sgds-alert
            :key="alertPreviewKey"
            show
            :variant="variant"
            :outlined="outlined || null"
            :dismissible="dismissible || null"
            :title="showTitle ? title : null"
          >
            <sgds-icon v-if="withIcon && showTitle" slot="icon" :name="alertIconName"></sgds-icon>
            <div>{{ description }}</div>
          </sgds-alert>
        </div>
      </div>

      <div class="sgds:relative sgds:min-h-[376px] sgds:h-full sgds:min-w-0 sgds:flex sgds:flex-col sgds:bg-default sgds:border-l sgds:border-muted sgds:max-xl:h-auto sgds:max-xl:min-h-0 sgds:max-xl:border-l-0 sgds:max-xl:border-t">
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
            <div class="sgds:flex sgds:flex-col sgds:gap-xs">
              <label class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
                {{ content.variantLabel }}
              </label>
              <div class="sgds:relative sgds:w-full">
                <select
                  v-model="variant"
                  aria-label="Alert variant"
                  class="sgds:box-border sgds:block sgds:h-10 sgds:w-full sgds:max-w-full sgds:appearance-none sgds:rounded-md sgds:border sgds:border-default sgds:bg-surface-default sgds:px-sm sgds:pr-[32px] sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:outline-none focus:sgds:outline focus:sgds:outline-[var(--sgds-outline-focus)] focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]"
                >
                  <option
                    v-for="option in variantOptions"
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

            <sgds-switch
              size="sm"
              :checked="outlined"
              @sgds-change="toggleOutlined"
            >
              {{ content.outlinedLabel }}
            </sgds-switch>

            <sgds-switch
              size="sm"
              :checked="dismissible"
              @sgds-change="toggleDismissible"
            >
              {{ content.dismissibleLabel }}
            </sgds-switch>

            <sgds-switch
              size="sm"
              :disabled="!showTitle"
              :checked="withIcon"
              @sgds-change="toggleWithIcon"
            >
              {{ content.withIconLabel }}
            </sgds-switch>

            <sgds-switch
              size="sm"
              :checked="showTitle"
              @sgds-change="toggleTitle"
            >
              {{ content.titleToggleLabel }}
            </sgds-switch>

            <div v-if="showTitle" class="sgds:flex sgds:flex-col sgds:gap-xs">
              <label class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
                {{ content.editTitleLabel }}
              </label>
              <input
                v-model="title"
                aria-label="Alert title"
                type="text"
                class="sgds:box-border sgds:block sgds:h-10 sgds:w-full sgds:max-w-full sgds:rounded-md sgds:border sgds:border-default sgds:bg-surface-default sgds:px-sm sgds:font-sans sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:outline-none focus:sgds:outline focus:sgds:outline-[var(--sgds-outline-focus)] focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]"
              />
            </div>

            <div class="sgds:flex sgds:flex-col sgds:gap-xs">
              <label class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default">
                {{ content.editDescriptionLabel }}
              </label>
              <textarea
                v-model="description"
                aria-label="Alert description"
                rows="3"
                class="sgds:box-border sgds:block sgds:min-h-[88px] sgds:w-full sgds:max-w-full sgds:resize-none sgds:rounded-md sgds:border sgds:border-default sgds:bg-surface-default sgds:px-sm sgds:py-sm sgds:font-sans sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-default sgds:[font-family:inherit] sgds:outline-none focus:sgds:outline focus:sgds:outline-[var(--sgds-outline-focus)] focus:sgds:outline-offset-[var(--sgds-outline-offset-focus)]"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
