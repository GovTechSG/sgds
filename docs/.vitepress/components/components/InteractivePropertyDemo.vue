<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import type { ConfigurationDemo } from "../../data/component-docs";
import CardContentSlotsDemo from "./CardContentSlotsDemo.vue";

const props = defineProps<{ demo: ConfigurationDemo }>();

const rootRef = ref<HTMLElement | null>(null);

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
</script>

<template>
  <article ref="rootRef" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
    <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
      <component :is="demo.titleTag || 'h3'" class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ demo.title }}</component>
      <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ demo.description }}</p>
    </div>

    <div class="interactive-demo sgds:flex sgds:flex-col sgds:border sgds:border-muted sgds:rounded-xl sgds:overflow-clip sgds:px-component-md sgds:py-component-sm">
      <CardContentSlotsDemo v-if="demo.interactionMode === 'content-slots'" :demo="demo" />
      <sgds-tab-group v-else variant="solid" density="compact" :aria-label="demo.controlLabel || demo.title">
        <sgds-tab
          v-for="opt in demo.options"
          :key="opt.value"
          slot="nav"
          :panel="opt.value"
          :active="opt.value === demo.defaultValue || null"
        >{{ opt.label }}</sgds-tab>
        <sgds-tab-panel
          v-for="opt in demo.options"
          :key="opt.value"
          :name="opt.value"
          :data-state-effect="opt.stateEffect"
        >
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <div class="sgds:flex sgds:items-center sgds:justify-center">
              <div class="sgds:w-full sgds:max-w-[var(--sgds-dimension-560)] sgds:mx-auto">
                <div class="behaviour-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="opt.markup"></div>
              </div>
            </div>
            <p v-if="opt.description" class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">
              {{ opt.description }}
            </p>
            <p v-if="opt.note" class="sgds:m-0 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">
              {{ opt.note }}
            </p>
          </div>
        </sgds-tab-panel>
      </sgds-tab-group>
    </div>
  </article>
</template>

<style>
.interactive-demo {
  background: var(--sgds-bg-alternate);
}
</style>
