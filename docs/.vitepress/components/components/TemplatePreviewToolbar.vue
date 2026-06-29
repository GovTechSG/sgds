<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import CodeBlock from "../ui/CodeBlock.vue";
import { getStorybookPageUrl } from "../../data/storybook-ids";

type Viewport = "mobile" | "tablet" | "desktop";
type DropdownOption = { key: string; title: string; kind: "template" | "block"; groupLabel?: string };

const props = defineProps<{
  // viewport: Viewport;
  templateOptions: DropdownOption[];
  blockOptions: DropdownOption[];
  activeKey: string;
  activeKind: "template" | "block";
}>();

const emit = defineEmits<{
  // (e: "update:viewport", value: Viewport): void;
  (e: "navigate", option: DropdownOption): void;
}>();

// Hidden for now — may re-enable when viewport controls are needed again.
// const viewportOptions: Array<{ value: Viewport; label: string; icon: string }> = [
//   { value: "mobile", label: "Mobile", icon: "phone" },
//   { value: "tablet", label: "Tablet", icon: "tablet" },
//   { value: "desktop", label: "Desktop", icon: "laptop" },
// ];

const promptOpen = ref(false);
const promptTipRef = ref<HTMLElement | null>(null);
const pageTemplateMenuRef = ref<HTMLElement | null>(null);
const blockTemplateMenuRef = ref<HTMLElement | null>(null);

const selectedOption = computed(() =>
  [...props.templateOptions, ...props.blockOptions].find((option) => isActiveOption(option)),
);

const selectedTitle = computed(
  () => selectedOption.value?.title ?? (props.activeKind === "template" ? "Page templates" : "Block templates"),
);

const selectedGroupLabel = computed(() => selectedOption.value?.groupLabel ?? "");

const promptExample = computed(() => {
  if (props.activeKind === "template") return `Build a page template using SGDS ${selectedTitle.value}`;
  if (selectedGroupLabel.value.startsWith("Form")) return `Build a form block using SGDS ${selectedTitle.value}`;
  return `Build a ${selectedTitle.value.toLowerCase()} block using SGDS`;
});

const blockOptionGroups = computed(() => {
  const groups = new Map<string, DropdownOption[]>();

  props.blockOptions.forEach((option) => {
    const label = option.groupLabel ?? "Other blocks";
    groups.set(label, [...(groups.get(label) ?? []), option]);
  });

  return Array.from(groups, ([label, options]) => ({ label, options }));
});

const storybookHref = computed(() =>
  getStorybookPageUrl(props.activeKind, props.activeKey),
);

const isActiveOption = (option: DropdownOption) =>
  option.kind === props.activeKind && option.key === props.activeKey;

const injectPreviewDropdownMenuWidth = (host: HTMLElement | null) => {
  const root = host?.shadowRoot;
  if (!root || root.querySelector('style[data-preview-style="dropdown-menu-width"]')) return;

  const style = document.createElement("style");
  style.setAttribute("data-preview-style", "dropdown-menu-width");
  style.textContent = `
    .dropdown-menu {
      width: min(var(--sgds-dimension-400), calc(100vw - var(--sgds-dimension-32))) !important;
    }
  `;
  root.appendChild(style);
};

const scrollActiveMenuItem = async (menuRef: typeof pageTemplateMenuRef) => {
  await nextTick();
  requestAnimationFrame(() => {
    injectPreviewDropdownMenuWidth(menuRef.value);

    const menu = menuRef.value?.shadowRoot?.querySelector(".dropdown-menu") as HTMLElement | null;
    const activeItem = menuRef.value?.querySelector(
      '[data-template-preview-active="true"]',
    ) as HTMLElement | null;

    if (!menu || !activeItem) return;

    const menuRect = menu.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const anchorOffset = itemRect.top - menuRect.top - menu.clientHeight / 3;
    menu.scrollTop += anchorOffset;
  });
};

const scrollActivePageMenuItem = () => scrollActiveMenuItem(pageTemplateMenuRef);
const scrollActiveBlockMenuItem = () => scrollActiveMenuItem(blockTemplateMenuRef);

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
  <div class="template-preview-toolbar">
    <button
      v-if="promptOpen"
      type="button"
      class="sgds:fixed sgds:inset-0 sgds:z-[55] sgds:cursor-default sgds:border-0 sgds:bg-transparent sgds:p-0"
      aria-label="Close prompt example"
      @click="closePrompt"
    ></button>

    <div class="template-preview-template-menu sgds:flex sgds:items-center">
      <sgds-dropdown
        v-if="activeKind === 'template'"
        ref="pageTemplateMenuRef"
        @sgds-after-show="scrollActivePageMenuItem"
      >
        <sgds-button
          slot="toggler"
          variant="primary"
          tone="fixed-light"
          size="sm"
          class="template-preview-template-button"
          :ariaLabel.prop="'Select template'"
        >
          <span class="template-preview-toolbar-label">{{ selectedTitle }}</span>
          <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
        </sgds-button>
        <sgds-dropdown-item
          v-for="option in templateOptions"
          :key="`template-${option.key}`"
          :active="isActiveOption(option) ? '' : null"
          :aria-current="isActiveOption(option) ? 'page' : null"
          :data-template-preview-active="isActiveOption(option) ? 'true' : null"
          :ariaLabel.prop="option.title"
          @click="emit('navigate', option)"
        >
          {{ option.title }}
        </sgds-dropdown-item>
      </sgds-dropdown>

      <sgds-dropdown
        v-else
        ref="blockTemplateMenuRef"
        @sgds-after-show="scrollActiveBlockMenuItem"
      >
        <sgds-button
          slot="toggler"
          variant="primary"
          tone="fixed-light"
          size="sm"
          class="template-preview-template-button"
          :ariaLabel.prop="'Select block'"
        >
          <span class="template-preview-toolbar-label">{{ selectedTitle }}</span>
          <sgds-icon name="chevron-down" slot="rightIcon"></sgds-icon>
        </sgds-button>
        <template v-for="blockGroup in blockOptionGroups" :key="blockGroup.label">
          <li
            class="empty-menu sgds:px-lg sgds:py-sm sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:text-subtle sgds:uppercase"
            role="presentation"
          >
            {{ blockGroup.label }}
          </li>
          <sgds-dropdown-item
            v-for="option in blockGroup.options"
            :key="`block-${option.key}`"
            :active="isActiveOption(option) ? '' : null"
            :aria-current="isActiveOption(option) ? 'page' : null"
            :data-template-preview-active="isActiveOption(option) ? 'true' : null"
            :ariaLabel.prop="option.title"
            @click="emit('navigate', option)"
          >
            {{ option.title }}
          </sgds-dropdown-item>
        </template>
      </sgds-dropdown>
    </div>

    <div class="template-preview-toolbar-actions">
      <sgds-tooltip content="View code in Storybook" placement="bottom" trigger="hover focus">
        <a
          class="template-preview-storybook-button sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-transparent sgds:border sgds:border-transparent sgds:rounded-sm sgds:text-default sgds:cursor-pointer sgds:h-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)] sgds:p-0 sgds:hover:bg-translucent-subtle sgds:focus:outline-none sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]"
          :href="storybookHref"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View code in Storybook"
          title="View code in Storybook"
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
          <CodeBlock prompt :code="promptExample" />
        </div>
      </div>

      <!-- Hidden for now — viewport controls may be re-enabled later.
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
      -->
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
  width: var(--sgds-dimension-280);
}

.template-preview-toolbar-label {
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-label-sm);
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

/* Hidden for now — viewport control styles preserved for future use.
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
*/

@media (max-width: 640px) {
  .template-preview-toolbar {
    align-items: center;
    display: inline-flex;
    gap: var(--sgds-gap-xs);
  }

  .template-preview-template-button {
    width: auto;
  }

  .template-preview-template-menu {
    grid-column: 1 / -1;
  }
}
</style>
