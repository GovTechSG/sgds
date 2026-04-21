<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import Section from "../foundations/Section.vue";
import AnatomySection from "./AnatomySection.vue";
import BehaviourSection from "./BehaviourSection.vue";
import MeasurementsSection from "./MeasurementsSection.vue";
import BestPracticesSection from "./BestPracticesSection.vue";
import AccessibilitySection from "./AccessibilitySection.vue";
import AccordionV2ApiTable from "./AccordionV2ApiTable.vue";
import AccordionV2TokenTable from "./AccordionV2TokenTable.vue";
import CodeBlock from "../ui/CodeBlock.vue";
import { accordionV2Data } from "../../data/accordion-v2";

const tabGroupRef = ref<Element | null>(null);
const TAB_PANELS = ["design", "development"];

const handleTabClick = (panel: string) => {
  history.replaceState(null, "", `${window.location.pathname}#${panel}`);
};

const activateTabFromHash = async () => {
  await nextTick();
  const hash = window.location.hash.slice(1).toLowerCase();
  if (!TAB_PANELS.includes(hash) || hash === "design") return;

  await customElements.whenDefined("sgds-tab-group");
  const tabGroup = (tabGroupRef.value ?? document.querySelector("sgds-tab-group")) as any;
  await tabGroup?.updateComplete;
  tabGroup?.show?.(hash);
};

onMounted(() => {
  void activateTabFromHash();
  window.addEventListener("hashchange", activateTabFromHash);
});

onBeforeUnmount(() => {
  window.removeEventListener("hashchange", activateTabFromHash);
});
</script>

<template>
  <div class="sgds:flex sgds:flex-col" data-component-page="accordion-v2">
    <div class="sgds:mb-layout-md sgds:rounded-xl sgds:border sgds:border-muted sgds:bg-surface-raised sgds:p-component-md">
      <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        Experimental page: this version restructures the existing accordion documentation into separate
        <strong>Design</strong> and <strong>Development</strong> views so we can test a new component-doc template safely.
      </p>
    </div>

    <sgds-tab-group ref="tabGroupRef" class="sgds:block sgds:w-full" variant="underlined">
      <sgds-tab slot="nav" panel="design" active @click="handleTabClick('design')">Design</sgds-tab>
      <sgds-tab slot="nav" panel="development" @click="handleTabClick('development')">Development</sgds-tab>

      <sgds-tab-panel name="design">
        <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Usage" description="What to use, when, and how the accordion should feel in product design.">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:max-w-[var(--sgds-container-max-width-lg)]">
              <article v-for="section in accordionV2Data.usageGuidance" :key="section.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6">
                  <li v-for="item in section.items" :key="item" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item }}</li>
                </ul>
              </article>
            </div>
            <div class="sgds:mt-layout-lg sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Variants</h3>
              <BehaviourSection :items="accordionV2Data.usageVariants" />
            </div>
            <div class="sgds:mt-layout-lg sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:max-w-[var(--sgds-container-max-width-lg)]">
              <article v-for="section in accordionV2Data.usagePatterns" :key="section.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6">
                  <li v-for="item in section.items" :key="item" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section title="Behaviour (UX intent)" description="How the interaction should feel from a user’s point of view.">
            <BehaviourSection :items="accordionV2Data.designBehaviour" />
          </Section>

          <Section title="Best practices" description="Do and don’t guidance for content structure, hierarchy, and edge cases.">
            <BestPracticesSection :best-practices="accordionV2Data.doc.usage.bestPractices || []" />
          </Section>

          <Section title="Measurements" description="Spacing, padding, typography, and target-size guidance for visual consistency.">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <MeasurementsSection :examples="accordionV2Data.doc.measurements || []" />
              <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:max-w-[var(--sgds-container-max-width-lg)]">
                <article v-for="section in accordionV2Data.visualConsistency" :key="section.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                  <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                  <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6">
                    <li v-for="item in section.items" :key="item" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item }}</li>
                  </ul>
                </article>
              </div>
            </div>
          </Section>

          <Section title="Anatomy">
            <AnatomySection
              :anatomy-asset="accordionV2Data.doc.anatomyAsset"
              :anatomy-preview-markup="accordionV2Data.doc.demos[0]?.markup || `<sgds-accordion></sgds-accordion>`"
              :anatomy-callouts="accordionV2Data.doc.anatomyCallouts"
              :resolved-anatomy-parts="accordionV2Data.doc.resolvedAnatomyParts"
            />
          </Section>

          <Section title="States">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl sgds:max-w-[var(--sgds-container-max-width-lg)]">
              <article v-for="section in accordionV2Data.states" :key="section.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6">
                  <li v-for="item in section.items" :key="item" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item }}</li>
                </ul>
              </article>
            </div>
            <div class="sgds:mt-layout-lg">
              <BehaviourSection :items="accordionV2Data.stateDemos" />
            </div>
          </Section>

          <Section title="Accessibility" description="Principles to preserve when adapting the component in design work.">
            <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6 sgds:max-w-[var(--sgds-container-max-width-md)]">
              <li v-for="note in accordionV2Data.accessibilityPrinciples" :key="note" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ note }}</li>
            </ul>
          </Section>
        </div>
      </sgds-tab-panel>

      <sgds-tab-panel name="development">
        <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Behaviour (logic)" description="Implementation rules for state, animation, and single vs multi-open behaviour.">
            <div class="sgds:grid sgds:gap-layout-xl sgds:grid-cols-2 sgds:max-lg:grid-cols-1 sgds:max-w-[var(--sgds-container-max-width-lg)]">
              <article v-for="section in accordionV2Data.developmentBehaviour" :key="section.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6">
                  <li v-for="item in section.items" :key="item" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section title="Measurements (tokens)" description="Tokens and constants that affect spacing, density, and shell styling.">
            <AccordionV2TokenTable :rows="accordionV2Data.measurementTokens" />
          </Section>

          <Section title="Accessibility (implementation)" description="Semantics, keyboard handling, and practical notes for implementation.">
            <div class="sgds:mb-layout-lg sgds:grid sgds:gap-layout-xl sgds:grid-cols-2 sgds:max-lg:grid-cols-1 sgds:max-w-[var(--sgds-container-max-width-lg)]">
              <article v-for="section in accordionV2Data.accessibilityImplementation" :key="section.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6">
                  <li v-for="item in section.items" :key="item" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item }}</li>
                </ul>
              </article>
            </div>
            <AccessibilitySection :accessibility="accordionV2Data.accessibilityContent" />
          </Section>

          <Section title="API / props + code examples">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
              <article v-for="section in accordionV2Data.apiSections" :key="section.title" class="sgds:flex sgds:flex-col sgds:gap-layout-md">
                <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                <AccordionV2ApiTable :rows="section.rows" />
              </article>
              <article v-for="example in accordionV2Data.codeExamples" :key="example.title" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ example.title }}</h3>
                <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ example.description }}</p>
                <CodeBlock :code="example.code" :lang="example.lang ?? 'html'" />
              </article>
            </div>
          </Section>

          <Section title="Missing or generated content">
            <ul class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:pl-6">
              <li v-for="item in accordionV2Data.missingContent" :key="item" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ item }}</li>
            </ul>
          </Section>
        </div>
      </sgds-tab-panel>
    </sgds-tab-group>
  </div>
</template>

<style>
/* Global selectors used by accordion demo markup rendered through v-html */
.portal-demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  width: 100%;
}

.portal-demo-list-item {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
}

.accordion-v2-static-demo {
  pointer-events: none;
}

.accordion-v2-static-demo > sgds-accordion {
  background: var(--sgds-surface-default);
  display: block;
  width: 100%;
}

.portal-accessibility-preview {
  min-height: var(--sgds-dimension-400);
  position: relative;
  width: 100%;
}

.portal-accessibility-frame {
  left: 50%;
  max-width: var(--sgds-dimension-400);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.portal-accessibility-accordion {
  background: var(--sgds-surface-default);
  display: block;
  position: relative;
  width: 100%;
  z-index: 1;
}

.portal-accessibility-link {
  margin-top: var(--sgds-gap-sm);
}

.portal-accessibility-callout {
  left: 0;
  position: absolute;
  width: var(--sgds-dimension-80);
  z-index: 3;
}

.portal-accessibility-callout::before {
  border-color: var(--sgds-primary-border-color-default);
  border-style: solid;
  border-width: 0 0 var(--sgds-border-width-1) var(--sgds-border-width-1);
  border-bottom-left-radius: var(--sgds-border-radius-xl);
  content: "";
  height: var(--sgds-dimension-24);
  left: var(--sgds-dimension-24);
  position: absolute;
  top: 50%;
  width: var(--sgds-dimension-40);
}

.portal-accessibility-badge {
  align-items: center;
  background: var(--sgds-surface-inverse);
  border-radius: 50%;
  color: var(--sgds-color-inverse);
  display: inline-flex;
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  height: var(--sgds-dimension-24);
  justify-content: center;
  line-height: var(--sgds-line-height-16);
  width: var(--sgds-dimension-24);
}

.portal-accessibility-callout-1 { top: 22%; }
.portal-accessibility-callout-2 { top: 35%; }
.portal-accessibility-callout-3 { top: 57%; }
.portal-accessibility-callout-4 { top: 80%; }

@media (max-width: 1023px) {
  .portal-accessibility-preview {
    min-height: var(--sgds-dimension-360);
  }
}
</style>
