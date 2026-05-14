<script setup lang="ts">
import Section from "./foundations/Section.vue";

type PracticeItem = {
  title: string;
  tone: "do" | "dont";
  description: string;
  demo:
    | "neutral-surfaces"
    | "saturated-panel"
    | "emphasis"
    | "too-many-hues"
    | "accessible-text"
    | "accent-body"
    | "paired-cue"
    | "colour-alone"
    | "semantic-consistent"
    | "semantic-reassigned"
    | "semantic-pairing"
    | "semantic-decorative";
};

type PracticeSection = {
  title: string;
  description: string;
  items: PracticeItem[];
};

const sections: PracticeSection[] = [
  {
    title: "Colour with background",
    description:
      "Use background colour to support hierarchy and focus, not to compete with content. Strong colour works best when it is deliberate, limited, and paired with enough neutral space around it.",
    items: [
      {
        title: "Use neutral surfaces",
        tone: "do",
        description:
          "Keep most page surfaces neutral so content, actions, and status colours remain easy to spot.",
        demo: "neutral-surfaces",
      },
      {
        title: "Avoid large saturated panels",
        tone: "dont",
        description:
          "Do not use strong brand or accent colour across large background areas when readability is the main task.",
        demo: "saturated-panel",
      },
      {
        title: "Reserve colour for emphasis",
        tone: "do",
        description:
          "Use stronger colour on key actions, active states, or important highlights rather than across the whole interface.",
        demo: "emphasis",
      },
      {
        title: "Avoid too many hues at once",
        tone: "dont",
        description:
          "Too many competing colours weaken visual hierarchy and make interfaces feel noisy and inconsistent.",
        demo: "too-many-hues",
      },
    ],
  },
  {
    title: "Colour with typography",
    description:
      "Text colour should prioritise legibility first. Use semantic text colours and accessible contrast pairings, and avoid relying on decorative colour to carry meaning on its own.",
    items: [
      {
        title: "Use accessible text pairings",
        tone: "do",
        description:
          "Choose text and background combinations that remain readable across themes, states, and surface levels.",
        demo: "accessible-text",
      },
      {
        title: "Avoid accent-coloured body copy",
        tone: "dont",
        description:
          "Do not use vivid brand or semantic colours for long-form body text when a neutral text token would read more clearly.",
        demo: "accent-body",
      },
      {
        title: "Pair colour with another cue",
        tone: "do",
        description:
          "Use icons, labels, or weight changes alongside colour so links, emphasis, and state changes are still understandable.",
        demo: "paired-cue",
      },
      {
        title: "Do not rely on colour alone",
        tone: "dont",
        description:
          "If colour is the only signal, users can miss meaning in low-contrast conditions or with colour-vision differences.",
        demo: "colour-alone",
      },
    ],
  },
  {
    title: "Semantic colours",
    description:
      "Semantic colours should communicate a stable meaning across products. Use them consistently for states such as success, warning, danger, and informational feedback rather than as general decoration.",
    items: [
      {
        title: "Keep state meaning consistent",
        tone: "do",
        description:
          "Use the same semantic meaning for success, warning, danger, and information wherever those states appear.",
        demo: "semantic-consistent",
      },
      {
        title: "Avoid reassigning meanings",
        tone: "dont",
        description:
          "Do not use warning colour for confirmation or success colour for neutral emphasis, even if it looks visually pleasing.",
        demo: "semantic-reassigned",
      },
      {
        title: "Use complete semantic pairings",
        tone: "do",
        description:
          "Apply semantic colour through the right text, border, and surface tokens together so states remain clear and accessible.",
        demo: "semantic-pairing",
      },
      {
        title: "Avoid decorative status colour",
        tone: "dont",
        description:
          "Do not use semantic colours as ornament when no real status, feedback, or meaning needs to be conveyed.",
        demo: "semantic-decorative",
      },
    ],
  },
];

const references = [
  { label: "Ant Design colours", href: "https://4x.ant.design/docs/spec/colors" },
  { label: "Mantine colours", href: "https://mantine.dev/theming/colors" },
  { label: "Carbon accessibility and colour", href: "https://carbondesignsystem.com/guidelines/accessibility/color/" },
  { label: "Material Design 3 theming", href: "https://developer.android.com/develop/ui/compose/designsystems/material3" },
];
</script>

<template>
  <div class="cbp-page">
    <div class="cbp-section-stack">
      <div
        v-for="section in sections"
        :key="section.title"
        class="cbp-page-section"
      >
        <Section :title="section.title" :description="section.description">
          <div class="cbp-practice-grid">
            <article
              v-for="item in section.items"
              :key="item.title"
              class="cbp-practice-card"
            >
              <div class="cbp-demo-box">
                <div v-if="item.demo === 'neutral-surfaces'" class="cbp-demo-canvas">
                  <div class="cbp-surface-stack">
                    <div class="cbp-surface-header"></div>
                    <div class="cbp-surface-body">
                      <div class="cbp-surface-card"></div>
                      <div class="cbp-surface-card cbp-surface-card-accent"></div>
                    </div>
                  </div>
                </div>
                <div v-else-if="item.demo === 'saturated-panel'" class="cbp-demo-canvas cbp-panel-bad">
                  <div class="cbp-panel-lines">
                    <span v-for="n in 4" :key="n" class="cbp-panel-line"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'emphasis'" class="cbp-demo-canvas">
                  <div class="cbp-emphasis-layout">
                    <span class="cbp-emphasis-tag"></span>
                    <span class="cbp-emphasis-line"></span>
                    <span class="cbp-emphasis-button cbp-emphasis-button-strong"></span>
                    <span class="cbp-emphasis-button"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'too-many-hues'" class="cbp-demo-canvas">
                  <div class="cbp-hue-grid">
                    <span v-for="n in 8" :key="n" :class="['cbp-hue-tile', `cbp-hue-tile-${n}`]"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'accessible-text'" class="cbp-demo-canvas">
                  <div class="cbp-text-panel">
                    <span class="cbp-text-heading"></span>
                    <span v-for="n in 3" :key="n" class="cbp-text-line"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'accent-body'" class="cbp-demo-canvas">
                  <div class="cbp-text-panel">
                    <span class="cbp-text-heading"></span>
                    <span v-for="n in 3" :key="n" class="cbp-text-line cbp-text-line-accent"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'paired-cue'" class="cbp-demo-canvas">
                  <div class="cbp-cue-row">
                    <span class="cbp-cue-dot"></span>
                    <span class="cbp-cue-label"></span>
                    <span class="cbp-cue-badge"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'colour-alone'" class="cbp-demo-canvas">
                  <div class="cbp-cue-row">
                    <span class="cbp-cue-label cbp-cue-label-only"></span>
                    <span class="cbp-cue-label cbp-cue-label-only cbp-cue-label-only-muted"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-consistent'" class="cbp-demo-canvas">
                  <div class="cbp-semantic-stack">
                    <span class="cbp-semantic-chip cbp-semantic-success"></span>
                    <span class="cbp-semantic-chip cbp-semantic-warning"></span>
                    <span class="cbp-semantic-chip cbp-semantic-danger"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-reassigned'" class="cbp-demo-canvas">
                  <div class="cbp-semantic-stack">
                    <span class="cbp-semantic-chip cbp-semantic-warning"></span>
                    <span class="cbp-semantic-chip cbp-semantic-success"></span>
                    <span class="cbp-semantic-chip cbp-semantic-danger"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-pairing'" class="cbp-demo-canvas">
                  <div class="cbp-alert-card">
                    <span class="cbp-alert-stripe"></span>
                    <div class="cbp-alert-content">
                      <span class="cbp-alert-title"></span>
                      <span v-for="n in 2" :key="n" class="cbp-alert-line"></span>
                    </div>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-decorative'" class="cbp-demo-canvas">
                  <div class="cbp-decorative-row">
                    <span v-for="n in 4" :key="n" :class="['cbp-decorative-dot', `cbp-decorative-dot-${n}`]"></span>
                  </div>
                </div>
              </div>
              <div class="cbp-practice-description">
                <sgds-icon
                  :name="item.tone === 'do' ? 'check-circle-fill' : 'xcircle-fill'"
                  size="lg"
                  :class="item.tone === 'do' ? 'cbp-do-icon' : 'cbp-dont-icon'"
                ></sgds-icon>
                <p class="cbp-practice-text">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </Section>
      </div>

    </div>
  </div>
</template>

<style>
.cbp-page {
  width: 100%;
}

.cbp-section-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.cbp-page-section {
  display: flex;
  flex-direction: column;
}

.cbp-practice-grid {
  display: grid;
  gap: var(--sgds-layout-gap-lg) var(--sgds-gap-2-xl);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cbp-practice-card {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  min-width: 0;
}

.cbp-demo-box {
  align-items: center;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-320);
  padding: var(--sgds-component-padding-md);
}

.cbp-demo-canvas {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.cbp-surface-stack,
.cbp-text-panel {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  width: min(100%, 16rem);
}

.cbp-surface-header,
.cbp-text-heading,
.cbp-cue-label,
.cbp-cue-badge,
.cbp-panel-line,
.cbp-alert-title,
.cbp-alert-line {
  background: var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-pill);
  display: block;
}

.cbp-surface-header,
.cbp-text-heading {
  height: 0.875rem;
  width: 48%;
}

.cbp-surface-body {
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.cbp-surface-card {
  background: var(--sgds-bg-color-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  height: 6rem;
}

.cbp-surface-card-accent {
  background: var(--sgds-primary-surface-muted);
  border-color: var(--sgds-primary-border-color-default);
}

.cbp-panel-bad {
  background: var(--sgds-primary-surface-default);
  border-radius: var(--sgds-border-radius-lg);
  min-height: 100%;
}

.cbp-panel-lines {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  width: min(100%, 14rem);
}

.cbp-panel-line {
  background: var(--sgds-body-color-fixed-light);
  height: 0.75rem;
}

.cbp-emphasis-layout {
  align-items: center;
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: auto 1fr;
  width: min(100%, 14rem);
}

.cbp-emphasis-tag {
  background: var(--sgds-accent-surface-muted);
  border-radius: var(--sgds-border-radius-pill);
  height: 1rem;
  width: 3rem;
}

.cbp-emphasis-line {
  background: var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-pill);
  height: 0.75rem;
  width: 100%;
}

.cbp-emphasis-button,
.cbp-emphasis-button-strong {
  border-radius: var(--sgds-border-radius-pill);
  grid-column: span 2;
  height: 2rem;
}

.cbp-emphasis-button {
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
}

.cbp-emphasis-button-strong {
  background: var(--sgds-primary-color-default);
}

.cbp-hue-grid {
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: min(100%, 14rem);
}

.cbp-hue-tile {
  aspect-ratio: 1;
  border-radius: var(--sgds-border-radius-lg);
}

.cbp-hue-tile-1 { background: var(--sgds-primary-surface-default); }
.cbp-hue-tile-2 { background: var(--sgds-success-surface-default); }
.cbp-hue-tile-3 { background: var(--sgds-warning-surface-default); }
.cbp-hue-tile-4 { background: var(--sgds-danger-surface-default); }
.cbp-hue-tile-5 { background: var(--sgds-accent-surface-default); }
.cbp-hue-tile-6 { background: var(--sgds-primary-surface-muted); }
.cbp-hue-tile-7 { background: var(--sgds-success-surface-muted); }
.cbp-hue-tile-8 { background: var(--sgds-warning-surface-muted); }

.cbp-text-line {
  background: var(--sgds-body-color-default);
  border-radius: var(--sgds-border-radius-pill);
  height: 0.75rem;
}

.cbp-text-line-accent {
  background: var(--sgds-primary-color-default);
}

.cbp-cue-row {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
  width: min(100%, 14rem);
}

.cbp-cue-dot,
.cbp-decorative-dot {
  background: var(--sgds-primary-color-default);
  border-radius: var(--sgds-border-radius-pill);
  display: block;
  flex-shrink: 0;
  height: 0.875rem;
  width: 0.875rem;
}

.cbp-cue-label {
  background: var(--sgds-body-color-default);
  flex: 1;
  height: 0.875rem;
}

.cbp-cue-badge {
  background: var(--sgds-primary-surface-muted);
  width: 3rem;
  height: 1.25rem;
}

.cbp-cue-label-only {
  background: var(--sgds-success-color-default);
}

.cbp-cue-label-only-muted {
  background: var(--sgds-danger-color-default);
}

.cbp-semantic-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  width: min(100%, 12rem);
}

.cbp-semantic-chip {
  border-radius: var(--sgds-border-radius-pill);
  height: 2rem;
}

.cbp-semantic-success { background: var(--sgds-success-surface-muted); }
.cbp-semantic-warning { background: var(--sgds-warning-surface-muted); }
.cbp-semantic-danger { background: var(--sgds-danger-surface-muted); }

.cbp-alert-card {
  align-items: stretch;
  background: var(--sgds-success-surface-muted);
  border: 1px solid var(--sgds-success-border-color-default);
  border-radius: var(--sgds-border-radius-lg);
  display: flex;
  overflow: hidden;
  width: min(100%, 15rem);
}

.cbp-alert-stripe {
  background: var(--sgds-success-color-default);
  width: 0.375rem;
}

.cbp-alert-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  padding: var(--sgds-padding-md);
}

.cbp-alert-title {
  background: var(--sgds-body-color-default);
  height: 0.875rem;
  width: 40%;
}

.cbp-alert-line {
  background: var(--sgds-body-color-subtle);
  height: 0.75rem;
}

.cbp-decorative-row {
  display: flex;
  gap: var(--sgds-gap-md);
}

.cbp-decorative-dot-1 { background: var(--sgds-success-color-default); }
.cbp-decorative-dot-2 { background: var(--sgds-warning-color-default); }
.cbp-decorative-dot-3 { background: var(--sgds-danger-color-default); }
.cbp-decorative-dot-4 { background: var(--sgds-accent-color-default); }

.cbp-decorative-dot {
  height: 2rem;
  width: 2rem;
}

.cbp-practice-description {
  align-items: flex-start;
  display: flex;
  gap: var(--sgds-gap-sm);
}

.cbp-do-icon {
  color: var(--sgds-success-color-default);
  flex-shrink: 0;
}

.cbp-dont-icon {
  color: var(--sgds-danger-color-default);
  flex-shrink: 0;
}

.cbp-practice-text {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}

.cbp-resources-card {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-2-xl);
  min-height: var(--sgds-dimension-320);
  padding: var(--sgds-component-padding-md);
}

.cbp-resource-list {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
  list-style: none;
  margin: 0;
  padding: 0;
}

.cbp-resource-link {
  color: var(--sgds-link-color-default);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}

@media (max-width: 1023px) {
  .cbp-practice-grid {
    gap: var(--sgds-layout-gap-md);
  }
}

@media (max-width: 767px) {
  .cbp-practice-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .cbp-demo-box {
    min-height: 14rem;
  }

  .cbp-resources-card {
    border-radius: var(--sgds-border-radius-xl);
  }
}
</style>
