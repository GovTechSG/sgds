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
  <div :class="$style.page">
    <div :class="$style.sectionStack">
      <div
        v-for="section in sections"
        :key="section.title"
        :class="$style.pageSection"
      >
        <Section :title="section.title" :description="section.description">
          <div :class="$style.practiceGrid">
            <article
              v-for="item in section.items"
              :key="item.title"
              :class="$style.practiceCard"
            >
              <div :class="$style.demoBox">
                <div v-if="item.demo === 'neutral-surfaces'" :class="$style.demoCanvas">
                  <div :class="$style.surfaceStack">
                    <div :class="$style.surfaceHeader"></div>
                    <div :class="$style.surfaceBody">
                      <div :class="$style.surfaceCard"></div>
                      <div :class="[$style.surfaceCard, $style.surfaceCardAccent]"></div>
                    </div>
                  </div>
                </div>
                <div v-else-if="item.demo === 'saturated-panel'" :class="[$style.demoCanvas, $style.panelBad]">
                  <div :class="$style.panelLines">
                    <span v-for="n in 4" :key="n" :class="$style.panelLine"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'emphasis'" :class="$style.demoCanvas">
                  <div :class="$style.emphasisLayout">
                    <span :class="$style.emphasisTag"></span>
                    <span :class="$style.emphasisLine"></span>
                    <span :class="[$style.emphasisButton, $style.emphasisButtonStrong]"></span>
                    <span :class="$style.emphasisButton"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'too-many-hues'" :class="$style.demoCanvas">
                  <div :class="$style.hueGrid">
                    <span v-for="n in 8" :key="n" :class="[$style.hueTile, $style[`hueTile${n}`]]"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'accessible-text'" :class="$style.demoCanvas">
                  <div :class="$style.textPanel">
                    <span :class="$style.textHeading"></span>
                    <span v-for="n in 3" :key="n" :class="$style.textLine"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'accent-body'" :class="$style.demoCanvas">
                  <div :class="$style.textPanel">
                    <span :class="$style.textHeading"></span>
                    <span v-for="n in 3" :key="n" :class="[$style.textLine, $style.textLineAccent]"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'paired-cue'" :class="$style.demoCanvas">
                  <div :class="$style.cueRow">
                    <span :class="$style.cueDot"></span>
                    <span :class="$style.cueLabel"></span>
                    <span :class="$style.cueBadge"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'colour-alone'" :class="$style.demoCanvas">
                  <div :class="$style.cueRow">
                    <span :class="[$style.cueLabel, $style.cueLabelOnly]"></span>
                    <span :class="[$style.cueLabel, $style.cueLabelOnly, $style.cueLabelOnlyMuted]"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-consistent'" :class="$style.demoCanvas">
                  <div :class="$style.semanticStack">
                    <span :class="[$style.semanticChip, $style.semanticSuccess]"></span>
                    <span :class="[$style.semanticChip, $style.semanticWarning]"></span>
                    <span :class="[$style.semanticChip, $style.semanticDanger]"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-reassigned'" :class="$style.demoCanvas">
                  <div :class="$style.semanticStack">
                    <span :class="[$style.semanticChip, $style.semanticWarning]"></span>
                    <span :class="[$style.semanticChip, $style.semanticSuccess]"></span>
                    <span :class="[$style.semanticChip, $style.semanticDanger]"></span>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-pairing'" :class="$style.demoCanvas">
                  <div :class="$style.alertCard">
                    <span :class="$style.alertStripe"></span>
                    <div :class="$style.alertContent">
                      <span :class="$style.alertTitle"></span>
                      <span v-for="n in 2" :key="n" :class="$style.alertLine"></span>
                    </div>
                  </div>
                </div>
                <div v-else-if="item.demo === 'semantic-decorative'" :class="$style.demoCanvas">
                  <div :class="$style.decorativeRow">
                    <span v-for="n in 4" :key="n" :class="[$style.decorativeDot, $style[`decorativeDot${n}`]]"></span>
                  </div>
                </div>
              </div>
              <div :class="$style.practiceDescription">
                <sgds-icon
                  :name="item.tone === 'do' ? 'check-circle-fill' : 'xcircle-fill'"
                  size="lg"
                  :class="item.tone === 'do' ? $style.doIcon : $style.dontIcon"
                ></sgds-icon>
                <p :class="$style.practiceText">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </Section>
      </div>

    </div>
  </div>
</template>

<style module>
.page {
  width: 100%;
}

.sectionStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.pageSection {
  display: flex;
  flex-direction: column;
}

.practiceGrid {
  display: grid;
  gap: var(--sgds-layout-gap-lg) var(--sgds-gap-2-xl);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.practiceCard {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  min-width: 0;
}

.demoBox {
  align-items: center;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-320);
  padding: var(--sgds-component-padding-md);
}

.demoCanvas {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.surfaceStack,
.textPanel {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  width: min(100%, 16rem);
}

.surfaceHeader,
.textHeading,
.cueLabel,
.cueBadge,
.panelLine,
.alertTitle,
.alertLine {
  background: var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-pill);
  display: block;
}

.surfaceHeader,
.textHeading {
  height: 0.875rem;
  width: 48%;
}

.surfaceBody {
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.surfaceCard {
  background: var(--sgds-bg-color-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  height: 6rem;
}

.surfaceCardAccent {
  background: var(--sgds-primary-surface-muted);
  border-color: var(--sgds-primary-border-color-default);
}

.panelBad {
  background: var(--sgds-primary-surface-default);
  border-radius: var(--sgds-border-radius-lg);
  min-height: 100%;
}

.panelLines {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  width: min(100%, 14rem);
}

.panelLine {
  background: var(--sgds-body-color-fixed-light);
  height: 0.75rem;
}

.emphasisLayout {
  align-items: center;
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: auto 1fr;
  width: min(100%, 14rem);
}

.emphasisTag {
  background: var(--sgds-accent-surface-muted);
  border-radius: var(--sgds-border-radius-pill);
  height: 1rem;
  width: 3rem;
}

.emphasisLine {
  background: var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-pill);
  height: 0.75rem;
  width: 100%;
}

.emphasisButton,
.emphasisButtonStrong {
  border-radius: var(--sgds-border-radius-pill);
  grid-column: span 2;
  height: 2rem;
}

.emphasisButton {
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
}

.emphasisButtonStrong {
  background: var(--sgds-primary-color-default);
}

.hueGrid {
  display: grid;
  gap: var(--sgds-gap-sm);
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: min(100%, 14rem);
}

.hueTile {
  aspect-ratio: 1;
  border-radius: var(--sgds-border-radius-lg);
}

.hueTile1 { background: var(--sgds-primary-surface-default); }
.hueTile2 { background: var(--sgds-success-surface-default); }
.hueTile3 { background: var(--sgds-warning-surface-default); }
.hueTile4 { background: var(--sgds-danger-surface-default); }
.hueTile5 { background: var(--sgds-accent-surface-default); }
.hueTile6 { background: var(--sgds-primary-surface-muted); }
.hueTile7 { background: var(--sgds-success-surface-muted); }
.hueTile8 { background: var(--sgds-warning-surface-muted); }

.textLine {
  background: var(--sgds-body-color-default);
  border-radius: var(--sgds-border-radius-pill);
  height: 0.75rem;
}

.textLineAccent {
  background: var(--sgds-primary-color-default);
}

.cueRow {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
  width: min(100%, 14rem);
}

.cueDot,
.decorativeDot {
  background: var(--sgds-primary-color-default);
  border-radius: var(--sgds-border-radius-pill);
  display: block;
  flex-shrink: 0;
  height: 0.875rem;
  width: 0.875rem;
}

.cueLabel {
  background: var(--sgds-body-color-default);
  flex: 1;
  height: 0.875rem;
}

.cueBadge {
  background: var(--sgds-primary-surface-muted);
  width: 3rem;
  height: 1.25rem;
}

.cueLabelOnly {
  background: var(--sgds-success-color-default);
}

.cueLabelOnlyMuted {
  background: var(--sgds-danger-color-default);
}

.semanticStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  width: min(100%, 12rem);
}

.semanticChip {
  border-radius: var(--sgds-border-radius-pill);
  height: 2rem;
}

.semanticSuccess { background: var(--sgds-success-surface-muted); }
.semanticWarning { background: var(--sgds-warning-surface-muted); }
.semanticDanger { background: var(--sgds-danger-surface-muted); }

.alertCard {
  align-items: stretch;
  background: var(--sgds-success-surface-muted);
  border: 1px solid var(--sgds-success-border-color-default);
  border-radius: var(--sgds-border-radius-lg);
  display: flex;
  overflow: hidden;
  width: min(100%, 15rem);
}

.alertStripe {
  background: var(--sgds-success-color-default);
  width: 0.375rem;
}

.alertContent {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  padding: var(--sgds-padding-md);
}

.alertTitle {
  background: var(--sgds-body-color-default);
  height: 0.875rem;
  width: 40%;
}

.alertLine {
  background: var(--sgds-body-color-subtle);
  height: 0.75rem;
}

.decorativeRow {
  display: flex;
  gap: var(--sgds-gap-md);
}

.decorativeDot1 { background: var(--sgds-success-color-default); }
.decorativeDot2 { background: var(--sgds-warning-color-default); }
.decorativeDot3 { background: var(--sgds-danger-color-default); }
.decorativeDot4 { background: var(--sgds-accent-color-default); }

.decorativeDot {
  height: 2rem;
  width: 2rem;
}

.practiceDescription {
  align-items: flex-start;
  display: flex;
  gap: var(--sgds-gap-sm);
}

.doIcon {
  color: var(--sgds-success-color-default);
  flex-shrink: 0;
}

.dontIcon {
  color: var(--sgds-danger-color-default);
  flex-shrink: 0;
}

.practiceText {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
}

.resourcesCard {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-2-xl);
  min-height: var(--sgds-dimension-320);
  padding: var(--sgds-component-padding-md);
}

.resourceList {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
  list-style: none;
  margin: 0;
  padding: 0;
}

.resourceLink {
  color: var(--sgds-link-color-default);
  font-size: var(--sgds-font-size-2);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  text-decoration: underline;
  text-underline-offset: 0.125rem;
}

@media (max-width: 1023px) {
  .practiceGrid {
    gap: var(--sgds-layout-gap-md);
  }
}

@media (max-width: 767px) {
  .practiceGrid {
    grid-template-columns: minmax(0, 1fr);
  }

  .demoBox {
    min-height: 14rem;
  }

  .resourcesCard {
    border-radius: var(--sgds-border-radius-xl);
  }
}
</style>
