<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Section from "../foundations/Section.vue";
import AnatomySection from "./AnatomySection.vue";
import BehaviourSection from "./BehaviourSection.vue";
import MeasurementsSection from "./MeasurementsSection.vue";
import BestPracticesSection from "./BestPracticesSection.vue";
import MotionSection from "./MotionSection.vue";
import AccessibilitySection from "./AccessibilitySection.vue";
import UpdatesSection from "./UpdatesSection.vue";
import { getComponentDoc } from "../../data/component-docs";

const props = defineProps<{
  componentKey: string;
  docOverride?: ReturnType<typeof getComponentDoc>;
}>();

const doc = computed(() => props.docOverride ?? getComponentDoc(props.componentKey));
const currentPageKey = computed(() => doc.value?.key ?? props.componentKey);

const measurementExamples = computed(() => {
  if (!doc.value) return [];
  if (doc.value.measurements) return doc.value.measurements;
  return doc.value.demos.slice(0, 2);
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

const codePreviewMarkup = computed(() => {
  if (!doc.value) return "";
  return doc.value.anatomyMarkup || doc.value.demos[0]?.markup || `<${doc.value.tag}></${doc.value.tag}>`;
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

// Tab hash sync
const TAB_PANELS = ["design", "usage", "code", "accessibility", "updates"];
const tabGroupRef = ref<Element | null>(null);

const handleTabClick = (panel: string) => {
  history.replaceState(null, "", `${window.location.pathname}#${panel}`);
};

const activateTabFromHash = async () => {
  await nextTick();
  const hash = window.location.hash.slice(1).toLowerCase();
  if (!TAB_PANELS.includes(hash) || hash === "design") return;

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
      <sgds-tab slot="nav" panel="code" @click="handleTabClick('code')">Code</sgds-tab>
      <sgds-tab slot="nav" panel="accessibility" @click="handleTabClick('accessibility')">Accessibility</sgds-tab>
      <sgds-tab slot="nav" panel="updates" @click="handleTabClick('updates')">Updates</sgds-tab>

      <!-- Design tab -->
      <sgds-tab-panel name="design">
        <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Purpose">
            <div class="sgds:grid sgds:gap-layout-md sgds:grid-cols-3 sgds:max-lg:grid-cols-1">
              <article v-for="card in doc.purposeCards" :key="card.title" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:min-w-0 sgds:p-0">
                <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">{{ card.title }}</h3>
                <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ card.description }}</p>
              </article>
            </div>
          </Section>

          <Section title="Anatomy">
            <AnatomySection
              :anatomy-asset="doc.anatomyAsset"
              :anatomy-preview-markup="anatomyPreviewMarkup"
              :anatomy-callouts="doc.anatomyCallouts"
              :resolved-anatomy-parts="doc.resolvedAnatomyParts"
            />
          </Section>

          <Section title="Configuration">
            <BehaviourSection :items="doc.demos" />
          </Section>

          <Section v-if="measurementExamples.length" title="Measurements">
            <MeasurementsSection :examples="measurementExamples" />
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

      <!-- Code tab -->
      <sgds-tab-panel name="code">
        <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Live demo">
            <article class="sgds:flex sgds:flex-col sgds:justify-start sgds:min-h-[var(--sgds-dimension-280)] sgds:relative sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
              <div class="sgds:flex sgds:items-center sgds:justify-center sgds:flex-1 sgds:relative sgds:w-full">
                <div class="sgds:flex sgds:items-center sgds:justify-center sgds:flex-1 sgds:w-full">
                  <div class="live-demo-markup sgds:flex sgds:items-center sgds:justify-center sgds:min-w-0 sgds:w-full" v-html="codePreviewMarkup"></div>
                </div>
              </div>
            </article>
          </Section>

          <Section v-if="doc.props?.length" title="Props">
            <sgds-table tableBorder headerBackground>
              <sgds-table-row>
                <sgds-table-head>Property</sgds-table-head>
                <sgds-table-head>Type</sgds-table-head>
                <sgds-table-head>Default</sgds-table-head>
                <sgds-table-head>Description</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="prop in doc.props || []" :key="prop.name">
                <sgds-table-cell>{{ prop.name }}</sgds-table-cell>
                <sgds-table-cell>{{ prop.type }}</sgds-table-cell>
                <sgds-table-cell>{{ prop.defaultValue }}</sgds-table-cell>
                <sgds-table-cell>{{ prop.description }}</sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </Section>
        </div>
      </sgds-tab-panel>

      <!-- Accessibility tab -->
      <sgds-tab-panel name="accessibility">
        <div v-if="doc.accessibility?.sections?.length || doc.accessibility?.keyboardInteractions?.length" class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
          <Section title="Accessibility">
            <AccessibilitySection :accessibility="doc.accessibility" />
          </Section>
        </div>
        <article v-else class="sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:p-component-md">
          <h3 class="sgds:text-heading-default sgds:m-0">Accessibility notes</h3>
          <ul v-if="doc.accessibilityNotes?.length" class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
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
/* Global selectors targeting slotted web component elements in v-html markup */
.live-demo-markup > sgds-accordion {
  background: var(--sgds-surface-default);
  display: block;
  width: 100%;
}

.live-demo-markup > sgds-alert {
  display: block;
  width: 100%;
}

.live-demo-markup sgds-alert-link {
  vertical-align: baseline;
}

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
  max-width: var(--sgds-dimension-320);
  width: 100%;
}

.portal-slot-example {
  align-items: center;
  background: var(--sgds-accent-surface-muted);
  border: var(--sgds-border-width-1) dashed var(--sgds-link-color-default);
  border-radius: var(--sgds-border-radius-none);
  color: var(--sgds-link-color-default);
  display: flex;
  gap: var(--sgds-gap-sm);
  justify-content: flex-start;
  padding: var(--sgds-padding-md);
  width: 100%;
}

.portal-slot-example span {
  color: inherit;
  text-align: left;
}

.portal-slot-example sgds-icon {
  color: inherit;
  flex-shrink: 0;
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
</style>
