<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import PromptBox from "../ui/PromptBox.vue";
import ThemeControls from "../ui/ThemeControls.vue";

type Viewport = "mobile" | "tablet" | "desktop";
type DropdownOption = { key: string; title: string; kind: "template" | "block" };

const props = defineProps<{
  viewport: Viewport;
  templateOptions: DropdownOption[];
  blockOptions: DropdownOption[];
  activeKey: string;
  activeKind: "template" | "block";
}>();

const emit = defineEmits<{
  (e: "update:viewport", value: Viewport): void;
  (e: "navigate", option: DropdownOption): void;
}>();

const viewportOptions: Array<{ value: Viewport; label: string; icon: string }> = [
  { value: "mobile", label: "Mobile", icon: "phone" },
  { value: "tablet", label: "Tablet", icon: "tablet" },
  { value: "desktop", label: "Desktop", icon: "laptop" },
];

const storybookStoryIds: Record<string, string> = {
  "template:about-us": "templates-about-us-basic--basic",
  "template:application-management": "templates-application-management-application-list--application-list",
  "template:blog": "templates-blog-success-story--success-story",
  "template:catalogue": "templates-catalogue-search-filter--search-and-filter",
  "template:form-page": "templates-form-basic--basic",
  "template:landing": "templates-landing-basic--basic",
  "template:multi-step-form": "templates-form-multi-step-form--multi-step-form",
  "template:report-issue": "templates-form-report-issue--report-issue",
  "block:cards": "blocks-cards--cards-3",
  "block:cta": "blocks-call-to-action-contained-primary--default",
  "block:feature": "blocks-feature--feature-image-left-48",
  "block:filter": "blocks-filter--filter-checkboxes",
  "block:form-all-types": "blocks-form--all-types",
  "block:form-basic-center": "blocks-form--basic-center",
  "block:form-basic-left": "blocks-form--basic-left",
  "block:form-basic-right": "blocks-form--basic-right",
  "block:form-fields-checkbox": "blocks-form--form-fields-checkbox",
  "block:form-fields-dates-quantities": "blocks-form--form-fields-dates-quantities",
  "block:form-fields-file-upload": "blocks-form--form-fields-file-upload",
  "block:form-fields-radio": "blocks-form--form-fields-radio",
  "block:form-fields-selects": "blocks-form--form-fields-selects",
  "block:form-fields-textarea": "blocks-form--form-fields-textarea",
  "block:form-multi-step": "blocks-form--form-multistep-stepper",
  "block:form-full-width-only": "blocks-form--fullwidth-only",
  "block:form-paired-only": "blocks-form--paired-only",
  "block:form-sections-single": "blocks-form--sections-single",
  "block:form-sections-three": "blocks-form--sections-three",
  "block:form-sections-two": "blocks-form--sections-two",
  "block:header": "blocks-header--page-header",
  "block:hero": "blocks-hero--hero",
  "block:stats": "blocks-stats--stats-3",
};

const promptOpen = ref(false);
const promptTipRef = ref<HTMLElement | null>(null);

const selectedOption = computed(() =>
  [...props.templateOptions, ...props.blockOptions].find((option) => isActiveOption(option)),
);

const selectedTitle = computed(() => selectedOption.value?.title ?? "Template");

const promptParts = computed(() => {
  const [category, name] = selectedTitle.value.split(" / ");
  return name ? { category, name } : { category: "", name: selectedTitle.value };
});

const promptTitle = computed(() =>
  promptParts.value.category
    ? `${promptParts.value.category} ${promptParts.value.name}`
    : promptParts.value.name,
);

const promptNoun = computed(() => {
  if (props.activeKind === "template") return "page template";
  return promptParts.value.category ? promptParts.value.category.toLowerCase() : "block";
});

const promptExample = computed(() => `Build a ${promptNoun.value} using SGDS ${promptTitle.value}`);

const storybookHref = computed(() => {
  const storyId = storybookStoryIds[`${props.activeKind}:${props.activeKey}`];
  return storyId
    ? `https://www.webcomponent.designsystem.tech.gov.sg/?path=/story/${storyId}`
    : "https://www.webcomponent.designsystem.tech.gov.sg/";
});

const isActiveOption = (option: DropdownOption) =>
  option.kind === props.activeKind && option.key === props.activeKey;

const handleOutsidePromptClick = (event: PointerEvent) => {
  const target = event.target;
  if (!(target instanceof Node) || promptTipRef.value?.contains(target)) return;
  promptOpen.value = false;
  document.removeEventListener("pointerdown", handleOutsidePromptClick);
};

const togglePrompt = () => {
  promptOpen.value = !promptOpen.value;
  if (promptOpen.value) {
    document.addEventListener("pointerdown", handleOutsidePromptClick);
    return;
  }
  document.removeEventListener("pointerdown", handleOutsidePromptClick);
};

const closePrompt = () => {
  promptOpen.value = false;
  document.removeEventListener("pointerdown", handleOutsidePromptClick);
};

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleOutsidePromptClick);
});
</script>

<template>
  <div class="template-preview-toolbar" aria-label="Live preview toolbar">
    <button
      v-if="promptOpen"
      type="button"
      class="sgds:fixed sgds:inset-0 sgds:z-[55] sgds:cursor-default sgds:border-0 sgds:bg-transparent sgds:p-0"
      aria-label="Close prompt example"
      @click="closePrompt"
    ></button>

    <sgds-dropdown menuAlignRight class="template-preview-template-menu">
      <sgds-button
        slot="toggler"
        role="button"
        variant="primary"
        tone="fixed-light"
        size="sm"
        class="template-preview-template-button"
      >
        <span class="template-preview-toolbar-label">More templates</span>
        <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
      </sgds-button>
      <sgds-dropdown-item disabled class="template-preview-dropdown-section">Page templates</sgds-dropdown-item>
      <sgds-dropdown-item
        v-for="option in templateOptions"
        :key="`template-${option.key}`"
        :active="isActiveOption(option) ? '' : null"
        @click="emit('navigate', option)"
      >
        {{ option.title }}
      </sgds-dropdown-item>
      <sgds-dropdown-item disabled class="template-preview-dropdown-section">Block templates</sgds-dropdown-item>
      <sgds-dropdown-item
        v-for="option in blockOptions"
        :key="`block-${option.key}`"
        :active="isActiveOption(option) ? '' : null"
        @click="emit('navigate', option)"
      >
        {{ option.title }}
      </sgds-dropdown-item>
    </sgds-dropdown>

    <div class="template-preview-toolbar-actions">
      <sgds-tooltip content="Open in Storybook" placement="bottom" trigger="hover focus">
        <a
          class="template-preview-storybook-button sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-transparent sgds:border sgds:border-transparent sgds:rounded-sm sgds:text-default sgds:cursor-pointer sgds:h-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)] sgds:p-0 sgds:hover:bg-translucent-subtle sgds:focus:outline-none sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]"
          :href="storybookHref"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in Storybook"
          title="Open in Storybook"
        >
          <span aria-hidden="true" class="template-preview-storybook-icon"></span>
        </a>
      </sgds-tooltip>

      <div ref="promptTipRef" class="sgds:inline-flex sgds:relative sgds:z-[60]">
        <sgds-tooltip content="Prompt tip" placement="bottom" trigger="hover focus">
          <button
            type="button"
            class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-transparent sgds:border sgds:border-transparent sgds:rounded-sm sgds:text-warning-fixed-light sgds:cursor-pointer sgds:h-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)] sgds:p-0 sgds:hover:bg-translucent-subtle sgds:focus:outline-none sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]"
            aria-label="Prompt tip"
            :aria-expanded="promptOpen ? 'true' : 'false'"
            title="Prompt tip"
            @click="togglePrompt"
          >
            <svg
              aria-hidden="true"
              class="sgds:block sgds:h-6 sgds:w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.4 2.8 12.5 8l5.2 2.1-5.2 2.1-2.1 5.2-2.1-5.2-5.2-2.1L8.3 8l2.1-5.2Z"
                fill="currentColor"
              />
              <path
                d="m18.2 3.4.9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2Z"
                fill="currentColor"
              />
              <path
                d="m5.7 15.2.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </sgds-tooltip>
        <div
          v-if="promptOpen"
          class="sgds:absolute sgds:z-[60] sgds:top-[calc(100%+var(--sgds-gap-xs))] sgds:right-0 sgds:w-[min(var(--sgds-dimension-400),calc(100vw-var(--sgds-padding-xl)))]"
        >
          <PromptBox label="Prompt example" :prompt="promptExample" />
        </div>
      </div>

      <sgds-divider orientation="vertical" class="template-preview-toolbar-divider"></sgds-divider>

      <div class="template-preview-viewport-controls" role="tablist" aria-label="Viewport size">
        <sgds-tooltip
          v-for="option in viewportOptions"
          :key="option.value"
          :content="option.label"
          placement="bottom"
          trigger="hover focus"
        >
          <button
            type="button"
            class="template-preview-viewport-button"
            :class="{ 'template-preview-viewport-button--active': viewport === option.value }"
            role="tab"
            :aria-selected="viewport === option.value ? 'true' : 'false'"
            :aria-label="option.label"
            :title="option.label"
            @click="emit('update:viewport', option.value)"
          >
            <sgds-icon :name="option.icon" size="md"></sgds-icon>
          </button>
        </sgds-tooltip>
      </div>

      <sgds-divider orientation="vertical" class="template-preview-toolbar-divider"></sgds-divider>

      <ThemeControls variant="ghost" tone="neutral" size="sm" class="template-preview-toolbar-theme" />
    </div>
  </div>
</template>

<style>
/* Preview toolbar controls use SGDS spacing and colour tokens so they flip
   with night mode inside the sticky preview bar. */
.template-preview-toolbar {
  display: contents;
}

.template-preview-template-menu {
  grid-column: 2;
  justify-self: center;
}

.template-preview-template-button {
  min-inline-size: var(--sgds-dimension-280);
}

.template-preview-toolbar-label {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-label-sm);
}

.template-preview-toolbar-theme {
  gap: var(--sgds-gap-2-xs);
}

.template-preview-toolbar-divider {
  align-self: center;
  block-size: var(--sgds-dimension-40);
  display: inline-flex;
  flex: 0 0 auto;
}

.template-preview-toolbar-actions {
  align-items: center;
  display: inline-flex;
  gap: var(--sgds-gap-xs);
  grid-column: 3;
  margin-inline-start: auto;
  justify-self: end;
}

/* External Storybook links should open in a new tab without rendering a
   secondary external-link glyph inside the icon-only toolbar control. */
.template-preview-storybook-button::after,
.template-preview-storybook-button .external-link-icon {
  content: none !important;
  display: none !important;
}

.template-preview-storybook-icon {
  background-color: #ff4785;
  display: block;
  height: var(--sgds-dimension-24);
  mask: url("/brands/storybook.svg") center / contain no-repeat;
  width: var(--sgds-dimension-24);
}

.sgds-night-theme .template-preview-storybook-icon {
  background-color: var(--sgds-color-fixed-light);
}

.template-preview-viewport-controls {
  align-items: center;
  display: inline-flex;
  gap: var(--sgds-gap-2-xs);
}

.template-preview-viewport-button {
  align-items: center;
  appearance: none;
  background: transparent;
  border: var(--sgds-border-width-1) solid transparent;
  border-radius: var(--sgds-border-radius-sm);
  color: var(--sgds-color-default);
  cursor: pointer;
  display: inline-flex;
  height: var(--sgds-dimension-40);
  justify-content: center;
  padding: var(--sgds-padding-none);
  width: var(--sgds-dimension-40);
}

.template-preview-viewport-button:hover,
.template-preview-viewport-button--active {
  background: var(--sgds-bg-translucent-subtle);
}

.template-preview-viewport-button--active {
  color: var(--sgds-color-default);
}

.template-preview-viewport-button:focus {
  outline: none;
}

.template-preview-viewport-button:focus-visible {
  outline: var(--sgds-outline-focus);
  outline-offset: var(--sgds-outline-offset-focus);
}

.template-preview-dropdown-section {
  color: var(--sgds-body-color-subtle);
  cursor: default;
  font-size: var(--sgds-font-size-1);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-wide);
  opacity: 1;
  pointer-events: none;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .template-preview-toolbar {
    align-items: center;
    display: inline-flex;
    gap: var(--sgds-gap-xs);
  }

  .template-preview-template-button {
    min-inline-size: auto;
  }
}
</style>
