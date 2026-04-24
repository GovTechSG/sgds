<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import type { ConfigurationDemo } from "../../data/component-docs";
import CardContentSlotsDemo from "./CardContentSlotsDemo.vue";
import SegmentedControl from "./SegmentedControl.vue";

const props = defineProps<{ demo: ConfigurationDemo }>();

const rootRef = ref<HTMLElement | null>(null);

const activeValue = ref<string>(
  props.demo.defaultValue || props.demo.options[0]?.value || "",
);

// sgds-select emits `sgds-change` with the new value exposed on the element
// itself (event.target.value). Mirror that into activeValue so the rest of
// the demo (tabpanel visibility, state-effect application) reacts the same
// way it does for the segmented control.
const onSelectChange = (event: Event) => {
  const target = event.target as HTMLElement & { value?: string };
  if (typeof target.value === "string") {
    activeValue.value = target.value;
  }
};

const applyStateEffects = async () => {
  await nextTick();
  await customElements.whenDefined("sgds-accordion-item");

  const root = rootRef.value;
  if (!root) return;

  root.querySelectorAll<HTMLElement>("[data-state-effect]").forEach((panel) => {
    const effect = panel.dataset.stateEffect;
    const button = panel.querySelector("sgds-accordion-item")?.shadowRoot?.querySelector(".accordion-btn") as HTMLElement | null;
    if (!button || (effect !== "hover" && effect !== "focus")) return;

    button.style.backgroundColor = "var(--sgds-bg-translucent-subtle)";
    button.style.zIndex = effect === "focus" ? "3" : "2";

    if (effect === "focus") {
      button.style.outline = "var(--sgds-outline-focus)";
      button.style.outlineOffset = "var(--sgds-outline-offset-focus)";
    }
  });
};

onMounted(() => {
  void applyStateEffects();
});

watch(activeValue, () => {
  void applyStateEffects();
});
</script>

<template>
  <article ref="rootRef" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
    <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
      <component :is="demo.titleTag || 'h3'" class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ demo.title }}</component>
      <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ demo.description }}</p>
    </div>

    <div class="interactive-demo sgds:flex sgds:flex-col sgds:min-h-[var(--sgds-dimension-320)] sgds:border sgds:border-muted sgds:rounded-xl sgds:overflow-clip sgds:px-component-md sgds:py-component-xs sgds:gap-component-md">
      <CardContentSlotsDemo v-if="demo.interactionMode === 'content-slots'" :demo="demo" />
      <template v-else>
        <!-- Select variant: rendered when option count is too high for a
             comfortable segmented control (see ConfigurationDemo.controlType).
             Wrapped in a max-w container so the select stays compact and
             left-aligned instead of stretching across the demo width. No
             visible label — the aria-label carries the accessible name. -->
        <div
          v-if="demo.controlType === 'select'"
          class="sgds:max-w-[var(--sgds-dimension-120)]"
        >
          <sgds-select
            :value="activeValue"
            :aria-label="demo.controlLabel || demo.title"
            @sgds-change="onSelectChange"
          >
            <sgds-select-option
              v-for="opt in demo.options"
              :key="opt.value"
              :value="opt.value"
              :selected="opt.value === activeValue ? 'true' : undefined"
            >{{ opt.label }}</sgds-select-option>
          </sgds-select>
        </div>
        <SegmentedControl
          v-else
          v-model="activeValue"
          :options="demo.options"
          :aria-label="demo.controlLabel || demo.title"
        />

        <div
          v-for="opt in demo.options"
          v-show="opt.value === activeValue"
          :key="opt.value"
          :data-state-effect="opt.stateEffect"
          class="sgds:flex sgds:flex-1"
          role="tabpanel"
        >
          <div class="sgds:flex sgds:flex-1 sgds:flex-col sgds:justify-center sgds:gap-component-md">
            <div class="sgds:flex sgds:flex-1 sgds:items-center sgds:justify-center">
              <div class="sgds:w-full sgds:max-w-[var(--sgds-dimension-768)] sgds:mx-auto">
                <div class="behaviour-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="opt.markup"></div>
              </div>
            </div>
            <p v-if="opt.description" class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              {{ opt.description }}
            </p>
            <p v-if="opt.note" class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              {{ opt.note }}
            </p>
          </div>
        </div>
      </template>
    </div>
  </article>
</template>

<style>
.interactive-demo {
  background: var(--sgds-bg-alternate);
}

/* Global selectors targeting slotted web component elements in v-html markup.
   These SGDS web components are inline by default; force them to fill the demo
   wrapper so the max-width on the parent is respected. */
.behaviour-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: block;
  overflow: hidden;
  width: 100%;
}

.behaviour-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.behaviour-demo-markup sgds-alert-link {
  vertical-align: baseline;
}
</style>
