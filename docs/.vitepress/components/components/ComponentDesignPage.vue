<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Section from "../foundations/Section.vue";
import AnatomySection from "./AnatomySection.vue";
import BehaviourSection from "./BehaviourSection.vue";
import InteractivePropertyDemo from "./InteractivePropertyDemo.vue";
import MeasurementsSection from "./MeasurementsSection.vue";
import StructureSection from "./StructureSection.vue";
import BestPracticesSection from "./BestPracticesSection.vue";
import MotionSection from "./MotionSection.vue";
import AccessibilitySection from "./AccessibilitySection.vue";
import UpdatesSection from "./UpdatesSection.vue";
import CodeToken from "../ui/CodeToken.vue";
import { getComponentDoc } from "../../data/component-docs";
import { accordionV2Data } from "../../data/accordion-v2";

const props = defineProps<{
  componentKey: string;
  docOverride?: ReturnType<typeof getComponentDoc>;
}>();

const doc = computed(() => props.docOverride ?? getComponentDoc(props.componentKey));
const currentPageKey = computed(() => doc.value?.key ?? props.componentKey);

const toOptionValue = (label: string, index: number) => {
  const normalised = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalised || `option-${index + 1}`;
};

// Configuration demos: prefer the doc's own configurationDemos; fall back to
// accordion-v2's variantPropertyDemos for the accordion page until that data is
// migrated into component-docs.ts. For all other components, wrap flat demos
// into the same stacked InteractivePropertyDemo shell so the configuration
// section matches the accordion page template.
const configurationDemos = computed(() => {
  if (doc.value?.configurationDemos?.length) return doc.value.configurationDemos;
  if (currentPageKey.value === "accordion") return accordionV2Data.variantPropertyDemos;
  return (doc.value?.demos ?? []).map((demo, index) => ({
    title: demo.title,
    description: demo.description,
    controlLabel: `${doc.value?.title || "Component"} ${demo.title}`,
    defaultValue: toOptionValue(demo.title, index),
    options: [
      {
        label: demo.title,
        value: toOptionValue(demo.title, index),
        markup: demo.markup,
      },
    ],
  }));
});

const measurementExamples = computed(() => {
  if (!doc.value) return [];
  if (doc.value.measurements) return doc.value.measurements;
  return doc.value.demos.slice(0, 2);
});
const measurementTokens = computed(() => doc.value?.measurementTokens ?? []);
const measurementTokenGroups = computed(() => doc.value?.measurementTokenGroups ?? []);
const globalTokens = computed(() => doc.value?.globalTokens ?? []);
const hasElementColumn = (rows: { element?: string }[]) =>
  rows.some((row) => Boolean(row.element?.trim()));
const structurePreviewMarkup = computed(() => {
  const first = measurementExamples.value[0];
  if (first && "markup" in first && first.markup) return first.markup;
  return "";
});

const anatomyPreviewMarkup = computed(() => {
  if (!doc.value) return "";
  if (doc.value.anatomyMarkup) return doc.value.anatomyMarkup;
  if (doc.value.demos.length <= 1) {
    return doc.value.demos[0]?.markup || `<${doc.value.tag}></${doc.value.tag}>`;
  }
  return `<div class="portal-demo-stack">${doc.value.demos
    .map((example) => `<div class="portal-anatomy-demo-block">${example.markup}</div>`)
    .join("")}</div>`;
});

const initSteppers = async () => {
  await nextTick();
  const root = document.querySelector(`[data-component-page="${currentPageKey.value}"]`);
  if (!root) return;

  root.querySelectorAll<HTMLElement>('sgds-stepper[data-portal-stepper="default"]').forEach((el) => {
    (el as HTMLElement & { steps?: unknown[] }).steps = [
      { stepHeader: "Start", component: "Step one" },
      { stepHeader: "Review", component: "Step two" },
      { stepHeader: "Confirm", component: "Step three" },
    ];
  });
};

// Tab hash sync — universal 4-tab layout (design / usage / accessibility / updates).
// The Code tab is intentionally hidden on every component page to mirror the
// accordion v1 pattern; code snippets live in the Storybook/repo reference
// instead.
const TAB_PANELS = ["design", "usage", "accessibility", "updates"];
const visibleTabPanels = computed(() => TAB_PANELS);
const tabGroupRef = ref<Element | null>(null);

const handleTabClick = (panel: string) => {
  history.replaceState(null, "", `${window.location.pathname}#${panel}`);
};

const activateTabFromHash = async () => {
  await nextTick();
  const hash = window.location.hash.slice(1).toLowerCase();
  if (!visibleTabPanels.value.includes(hash) || hash === "design") return;

  // Wait for the Lit element to be defined and finish its first update cycle
  await customElements.whenDefined("sgds-tab-group");
  const tabGroup = (tabGroupRef.value ?? document.querySelector("sgds-tab-group")) as any;
  await tabGroup?.updateComplete;
  tabGroup?.show?.(hash);
};

onMounted(() => {
  void initSteppers();
  void activateTabFromHash();
  window.addEventListener("hashchange", activateTabFromHash);
});
watch(() => props.componentKey, () => {
  void initSteppers();
  void activateTabFromHash();
});
onBeforeUnmount(() => {
  window.removeEventListener("hashchange", activateTabFromHash);
});
</script>

<template>
  <div v-if="doc" class="sgds:flex sgds:flex-col" :data-component-page="currentPageKey">
    <sgds-tab-group ref="tabGroupRef" class="sgds:block sgds:w-full" variant="underlined">
      <sgds-tab slot="nav" panel="design" active @click="handleTabClick('design')">Design</sgds-tab>
      <sgds-tab slot="nav" panel="usage" @click="handleTabClick('usage')">Usage</sgds-tab>
      <sgds-tab slot="nav" panel="accessibility" @click="handleTabClick('accessibility')">Accessibility</sgds-tab>
      <sgds-tab slot="nav" panel="updates" @click="handleTabClick('updates')">Updates</sgds-tab>

      <!-- Design tab -->
      <sgds-tab-panel name="design">
        <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Purpose" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <div class="sgds:grid sgds:gap-layout-md sgds:grid-cols-3 sgds:max-sm:grid-cols-1">
              <article v-for="card in doc.purposeCards" :key="card.title" class="sgds:flex sgds:flex-col sgds:gap-text-xs sgds:min-w-0 sgds:p-0">
                <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ card.title }}</h3>
                <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ card.description }}</p>
              </article>
            </div>
          </Section>

          <Section title="Anatomy" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <AnatomySection
              :anatomy-asset="doc.anatomyAsset"
              :anatomy-preview-markup="anatomyPreviewMarkup"
              :anatomy-callouts="doc.anatomyCallouts"
              :resolved-anatomy-parts="doc.resolvedAnatomyParts"
            />
          </Section>

          <Section title="Configuration" gap="sgds:gap-[var(--sgds-gap-xl)]">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <InteractivePropertyDemo
                v-for="demo in configurationDemos"
                :key="demo.title"
                :demo="demo"
              />
            </div>
          </Section>

          <Section v-if="measurementExamples.length || measurementTokens.length || measurementTokenGroups.length || globalTokens.length" title="Structure">
            <StructureSection
              v-if="currentPageKey === 'accordion' || currentPageKey === 'card'"
              :preview-markup="structurePreviewMarkup"
              :tokens="measurementTokens"
              :token-groups="measurementTokenGroups"
              :global-tokens="globalTokens"
            />
            <div v-else class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
              <MeasurementsSection v-if="measurementExamples.length" :examples="measurementExamples" />
              <sgds-table v-if="measurementTokens.length" tableBorder headerBackground responsive="always">
                <sgds-table-row>
                  <sgds-table-head v-if="hasElementColumn(measurementTokens)">Element</sgds-table-head>
                  <sgds-table-head>Component token</sgds-table-head>
                  <sgds-table-head>Semantic token</sgds-table-head>
                  <sgds-table-head>Value</sgds-table-head>
                </sgds-table-row>
                <sgds-table-row
                  v-for="row in measurementTokens"
                  :key="`${row.element}-${row.property}-${row.designToken}`"
                >
                  <sgds-table-cell v-if="hasElementColumn(measurementTokens)">{{ row.element }}</sgds-table-cell>
                  <sgds-table-cell>{{ row.property }}</sgds-table-cell>
                  <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
                  <sgds-table-cell>{{ row.rawValue || "—" }}</sgds-table-cell>
                </sgds-table-row>
              </sgds-table>
              <div
                v-for="group in measurementTokenGroups"
                :key="group.title"
                class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]"
              >
                <h5 class="sgds:m-0 sgds:text-heading-xs sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ group.title }}</h5>
                <sgds-table tableBorder headerBackground responsive="always">
                  <sgds-table-row>
                    <sgds-table-head v-if="hasElementColumn(group.tokens)">Element</sgds-table-head>
                    <sgds-table-head>Component token</sgds-table-head>
                    <sgds-table-head>Semantic token</sgds-table-head>
                    <sgds-table-head>Value</sgds-table-head>
                  </sgds-table-row>
                  <sgds-table-row
                    v-for="row in group.tokens"
                    :key="`${group.title}-${row.element}-${row.property}-${row.designToken}`"
                  >
                    <sgds-table-cell v-if="hasElementColumn(group.tokens)">{{ row.element }}</sgds-table-cell>
                    <sgds-table-cell>{{ row.property }}</sgds-table-cell>
                    <sgds-table-cell><CodeToken :label="row.designToken" /></sgds-table-cell>
                    <sgds-table-cell>{{ row.rawValue || "—" }}</sgds-table-cell>
                  </sgds-table-row>
                </sgds-table>
              </div>
            </div>
          </Section>
        </div>
      </sgds-tab-panel>

      <!-- Usage tab -->
      <sgds-tab-panel name="usage">
        <div v-if="doc.usage" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section v-if="doc.usage.guidance?.length" title="Usage">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:max-w-[var(--sgds-container-max-width-md)]">
              <article
                v-for="section in doc.usage.guidance"
                :key="section.title"
                class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]"
              >
                <div class="sgds:flex sgds:items-center sgds:gap-[var(--sgds-gap-2-xs)]">
                  <span :class="['sgds:self-start sgds:inline-flex sgds:items-center sgds:justify-center sgds:flex-none sgds:h-8 sgds:w-8', section.tone === 'do' ? 'sgds:text-success-default' : 'sgds:text-danger-default']">
                    <sgds-icon :name="section.tone === 'do' ? 'check-circle-fill' : 'xcircle-fill'" size="lg"></sgds-icon>
                  </span>
                  <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                </div>
                <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section v-if="doc.usage.behaviours?.length" title="Behaviours">
            <BehaviourSection :items="doc.usage.behaviours" />
          </Section>

          <Section v-if="doc.usage.content?.length" title="Content">
            <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg sgds:max-w-[var(--sgds-container-max-width-md)]">
              <article
                v-for="section in doc.usage.content"
                :key="section.title"
                class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]"
              >
                <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ section.title }}</h3>
                <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section v-if="doc.usage.motion" title="Motion">
            <MotionSection
              :preview-markup="doc.usage.motion.previewMarkup"
              :specs="doc.usage.motion.specs"
            />
          </Section>

          <Section v-if="doc.usage.bestPractices?.length" title="Best practices">
            <BestPracticesSection :best-practices="doc.usage.bestPractices" />
          </Section>
        </div>

        <article v-else class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
          <h3 class="sgds:text-heading-default sgds:m-0">Usage guidance</h3>
          <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line">
            Use <code>{{ doc.title }}</code> when its built-in SGDS pattern matches the task, instead of recreating the same interaction with custom markup.
          </p>
        </article>
      </sgds-tab-panel>

      <!-- Accessibility tab -->
      <sgds-tab-panel name="accessibility">
        <div v-if="doc.accessibility?.sections?.length || doc.accessibility?.keyboardInteractions?.length" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <AccessibilitySection :accessibility="doc.accessibility" />
        </div>
        <article v-else class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
          <h3 class="sgds:text-heading-default sgds:m-0">Accessibility notes</h3>
          <ul v-if="doc.accessibilityNotes?.length" class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
            <li v-for="note in doc.accessibilityNotes" :key="note">{{ note }}</li>
          </ul>
          <p v-else class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line">
            Use the component with clear labels, meaningful text, and the SGDS interaction states that come with the component. Validate keyboard flow and screen reader behaviour in the surrounding page context.
          </p>
        </article>
      </sgds-tab-panel>

      <!-- Updates tab -->
      <sgds-tab-panel name="updates">
        <UpdatesSection :updates="doc.updates" :component-key="currentPageKey" />
      </sgds-tab-panel>
    </sgds-tab-group>
  </div>
</template>

<style>
/* Global portal utility classes used in component markup strings */
.portal-demo-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-sm);
}

.portal-demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  width: 100%;
}

.portal-anatomy-demo-block {
  width: 100%;
}

.portal-demo-stack-sm {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
}

.portal-demo-card {
  display: block;
  max-width: var(--sgds-dimension-360);
  margin-inline: auto;
  width: 100%;
}

.portal-slot-example {
  align-items: center;
  background: var(--sgds-accent-surface-muted);
  border: var(--sgds-border-width-1) dashed var(--sgds-link-color-default);
  border-radius: var(--sgds-border-radius-none);
  box-sizing: border-box;
  color: var(--sgds-link-color-default);
  display: flex;
  gap: var(--sgds-gap-sm);
  justify-content: flex-start;
  padding: var(--sgds-padding-md);
}

.portal-slot-example span {
  color: inherit;
  text-align: left;
}

.portal-slot-example sgds-icon {
  color: inherit;
  flex-shrink: 0;
}

.portal-card-title-h4 {
  font-size: var(--sgds-font-size-heading-sm) !important;
  font-weight: var(--sgds-font-weight-semibold) !important;
  letter-spacing: var(--sgds-letter-spacing-tight) !important;
  line-height: var(--sgds-line-height-heading-sm) !important;
}

.portal-card-title-h5 {
  font-size: var(--sgds-font-size-subtitle-md) !important;
  font-weight: var(--sgds-font-weight-semibold) !important;
  letter-spacing: var(--sgds-letter-spacing-normal) !important;
  line-height: var(--sgds-line-height-xs) !important;
}

.portal-card-footer-full-width {
  display: block;
  width: 100% !important;
}

/* Card titles are styled inside shadow DOM with the 24px title token.
   Override that token per demo so the hierarchy examples can reflect SGDS H4/H5 typography. */
.portal-card-title-h4-demo {
  --sgds-font-size-24: var(--sgds-font-size-heading-sm);
}

.portal-card-title-h5-demo {
  --sgds-font-size-24: var(--sgds-font-size-subtitle-md);
}

.portal-demo-overlay {
  min-height: var(--sgds-dimension-288);
  position: relative;
  width: 100%;
}

.portal-modal-preview {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-288);
  width: 100%;
}

.portal-modal-panel {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xl);
  max-width: var(--sgds-dimension-480);
  padding: var(--sgds-padding-xl);
  width: 100%;
}

.portal-modal-header {
  display: flex;
  gap: var(--sgds-gap-md);
  justify-content: space-between;
}

.portal-modal-header-copy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.portal-modal-title {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-24);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-40);
}

.portal-modal-description {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
}

.portal-modal-body {
  color: var(--sgds-body-color-default);
}

.portal-modal-body p {
  margin: 0;
}

.portal-modal-footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-md);
  justify-content: flex-end;
}

.portal-demo-nav {
  max-width: var(--sgds-dimension-688);
  width: 100%;
}

.portal-demo-nav-sm {
  max-width: var(--sgds-dimension-320);
  width: 100%;
}

.portal-demo-list-item {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
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

.portal-demo-stepper {
  max-width: var(--sgds-dimension-688);
  width: 100%;
}

@media (max-width: 1023px) {
  .portal-accessibility-preview {
    min-height: var(--sgds-dimension-360);
  }
}

/* Accordion button measurement diagram — global classes for v-html markup */
.accordion-m-bubble {
  background: #6b4feb;
  border-radius: 3.5px;
  color: #fff;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  padding: 2px 4px;
  white-space: nowrap;
}
.accordion-m-bubble--w {
  padding-left: 8px;
  padding-right: 8px;
}
.accordion-m-outer {
  --accordion-measure-fill: rgba(107, 79, 235, 0.05);
  --accordion-measure-line: #6b4feb;
  display: flex;
  flex-direction: column;
  max-width: 688px;
  width: 100%;
}
.accordion-m-inspector {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-lg);
  width: 100%;
}
.accordion-m-preview {
  max-width: 688px;
  position: relative;
  width: 100%;
}
.accordion-m-main {
  align-items: flex-start;
  display: flex;
  gap: 8px;
}
.accordion-m-left {
  align-items: center;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  height: 64px;
  margin-top: 32px;
}
.accordion-m-v-bracket {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2px;
  height: 100%;
}
.accordion-m-h-tick-h {
  background: var(--accordion-measure-line);
  height: 1px;
  width: 6px;
}
.accordion-m-v-line-seg {
  background: var(--accordion-measure-line);
  flex: 1;
  width: 1px;
}
.accordion-m-col {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}
.accordion-m-anns {
  display: flex;
  height: 32px;
}
.accordion-m-a {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.accordion-m-stem {
  background: var(--accordion-measure-line);
  height: 6px;
  width: 1px;
}
.accordion-m-p {
  flex: 0 0 20px;
}
.accordion-m-i {
  flex: 0 0 16px;
}
.accordion-m-g {
  flex: 0 0 16px;
}
.accordion-m-t {
  flex: 1;
  min-width: 0;
}
.accordion-m-b {
  flex: 0 0 64px;
}
.accordion-m-btn {
  background: var(--sgds-surface-default);
  height: 64px;
  overflow: hidden;
  position: relative;
}
.accordion-m-live {
  background: var(--sgds-surface-default);
  height: 100%;
  width: 100%;
}
.accordion-m-live-border {
  position: relative;
}
.accordion-m-live > sgds-accordion {
  background: var(--sgds-surface-default);
  display: block;
  width: 100%;
}
.accordion-m-header-copy {
  align-items: center;
  color: var(--sgds-heading-color-default);
  display: inline-flex;
  font-size: var(--sgds-font-size-5);
  font-weight: var(--sgds-font-weight-semibold);
  gap: var(--sgds-gap-md);
  line-height: var(--sgds-line-height-40);
  min-width: 0;
  position: relative;
}
.accordion-m-header-icon {
  color: var(--sgds-color-subtle);
  flex: 0 0 auto;
}
.accordion-m-hover-target {
  inset: 0 auto auto 0;
  height: 64px;
  position: absolute;
  right: 0;
  z-index: 2;
}
.accordion-m-gap-overlay {
  height: 24px;
  left: 44px;
  position: absolute;
  top: 20px;
  width: 16px;
  z-index: 3;
}
.accordion-m-title-target {
  color: inherit;
  display: inline-block;
  font: inherit;
  line-height: inherit;
}
.accordion-m-title-tooltip {
  align-items: center;
  color: inherit;
  display: inline-flex;
  font: inherit;
  line-height: inherit;
}
.accordion-m-border-target {
  inset: 0;
  position: absolute;
  z-index: 1;
}
.accordion-m-panel-target {
  left: 20px;
  position: absolute;
  right: 20px;
  z-index: 3;
}
.accordion-m-panel-target-x {
  top: 0;
  bottom: 0;
}
.accordion-m-panel-target-y {
  top: 20px;
  height: 44px;
}
.accordion-m-inspectable {
  cursor: pointer;
  font: inherit;
  position: relative;
}
.accordion-m-content {
  color: var(--sgds-body-color-default);
}
.accordion-m-content-copy {
  display: inline-block;
  font: inherit;
}
.accordion-m-inspectable:hover {
  background: rgba(107, 79, 235, 0.12);
  box-shadow: inset 0 0 0 1px rgba(107, 79, 235, 0.28);
}
.accordion-m-border-target:hover {
  background: rgba(107, 79, 235, 0.06);
  box-shadow: inset 0 0 0 1px rgba(107, 79, 235, 0.28);
}
.accordion-m-map {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  max-width: 688px;
  width: 100%;
}
.accordion-m-map-section {
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  overflow: hidden;
}
.accordion-m-map-heading {
  background: var(--sgds-surface-raised);
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-3);
  font-weight: var(--sgds-font-weight-semibold);
  line-height: var(--sgds-line-height-24);
  padding: var(--sgds-padding-md);
}
.accordion-m-map-row {
  align-items: center;
  border-top: 1px solid var(--sgds-border-color-muted);
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1.5fr) auto;
  padding: var(--sgds-padding-md);
}
.accordion-m-map-name,
.accordion-m-map-prop,
.accordion-m-map-value {
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-24);
}
.accordion-m-map-token {
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  color: var(--sgds-color-default);
  display: inline-block;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: var(--sgds-font-size-2);
  line-height: var(--sgds-line-height-24);
  padding: 4px 10px;
  width: fit-content;
}
@media (max-width: 767px) {
  .accordion-m-map-row {
    grid-template-columns: 1fr;
  }
}
.accordion-m-stage .accordion-m-token-row {
  transition: background-color 120ms ease;
}
.accordion-m-stage .accordion-m-token-row[data-map="title-color"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="title-color"]:hover) .accordion-m-token-row[data-map="title-color"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="title-color"]:hover) .accordion-m-inspectable[data-map="title-color"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="border-color"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="border-color"]:hover) .accordion-m-token-row[data-map="border-color"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="border-color"]:hover) .accordion-m-inspectable[data-map="border-color"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="border-color"]:hover) .accordion-m-border-target,
.accordion-m-stage:has(.accordion-m-border-target:hover) .accordion-m-token-row[data-map="border-color"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="padding-x-default"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="padding-x-default"]:hover) .accordion-m-token-row[data-map="padding-x-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-x-default"]:hover) .accordion-m-inspectable[data-map="padding-x-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-x-default"]:hover) .accordion-m-panel-target-x,
.accordion-m-stage:has(.accordion-m-panel-target-x:hover) .accordion-m-token-row[data-map="padding-x-default"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="padding-y-default"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="padding-y-default"]:hover) .accordion-m-token-row[data-map="padding-y-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-y-default"]:hover) .accordion-m-inspectable[data-map="padding-y-default"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="padding-y-default"]:hover) .accordion-m-panel-target-y,
.accordion-m-stage:has(.accordion-m-panel-target-y:hover) .accordion-m-token-row[data-map="padding-y-default"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-stage .accordion-m-token-row[data-map="content-padding"]:hover,
.accordion-m-stage:has(.accordion-m-inspectable[data-map="content-padding"]:hover) .accordion-m-token-row[data-map="content-padding"],
.accordion-m-stage:has(.accordion-m-token-row[data-map="content-padding"]:hover) .accordion-m-inspectable[data-map="content-padding"] {
  background: rgba(107, 79, 235, 0.12);
}
.accordion-m-hl {
  background: var(--accordion-measure-line);
  flex: 1;
  height: 1px;
}
.accordion-m-right {
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  height: 64px;
  margin-top: 32px;
  min-width: 36px;
}
.accordion-m-va {
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 4px;
}
.accordion-m-vm {
  flex: 1;
}
.accordion-m-vr {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 20px;
}
.accordion-m-ht {
  background: var(--accordion-measure-line);
  height: 1px;
  width: 6px;
}
.accordion-m-vl {
  background: var(--accordion-measure-line);
  flex: 1;
  width: 1px;
}
</style>
