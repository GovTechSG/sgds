<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";
import Section from "./foundations/Section.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const principles = [
  {
    title: "Alignment",
    body: "Use consistent spacing to align elements and support the layout structure.",
  },
  {
    title: "Flexibility",
    body: "Let spacing adapt across screen sizes while keeping layouts balanced.",
  },
  {
    title: "Uniformity",
    body: "Use the spacing scale consistently so layouts stay predictable.",
  },
];

const spacingSteps = ["2", "4", "8", "12", "16", "20", "24", "32", "48", "64", "96", "128"];
const spacingStepHeights = [2, 4, 8, 12, 16, 20, 24, 32, 48, 64, 96, 128];
const progressionMethods = [
  {
    title: "Arithmetic progression (AP)",
    description: "Each step increases by 4.",
    formulaTitle: "Formula arithmetic progression (AP)",
    formula: "a_n = a_1 + (n - 1) * d",
    definitions: [
      "a_n = nth term",
      "a_1 = first term",
      "d = common difference",
    ],
    sample: ["4", "8", "12", "16"],
    ariaLabel: "a n equals a one plus open bracket n minus one close bracket multiplied by d",
  },
  {
    title: "Geometric progression (GP)",
    description: "Each step doubles.",
    formulaTitle: "Formula geometric progression (GP)",
    formula: "a_n = a_1 * r^(n - 1)",
    definitions: [
      "a_n = nth term",
      "a_1 = first term",
      "r = common ratio",
    ],
    sample: ["2", "4", "8", "12"],
    ariaLabel: "a n equals a one multiplied by r to the power of n minus one",
  },
];

const chartWidth = 520;
const chartHeight = 164;
const progressionCurvePath = "M 16 144 C 84 142 152 136 226 128 C 292 120 348 108 400 86 C 444 66 480 38 504 12";
</script>

<template>
  <TypographyPageTemplate stacked-examples>
    <FoundationPrincipleTemplate>
      <FoundationPrinciplesList :principles="principles" />

    <Section title="Spacing foundation">
      <div class="spacing-page__body">
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Base size</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              SGDS follows a 4-point system. This allows us to create consistency across the user interface while decreasing
              design complexity.
            </p>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card spacing-page__demo-card spacing-page__base-card sgds:min-h-[20rem] sgds:max-md:min-h-[14rem]">
              <p class="sgds:text-default sgds:text-display-md sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:m-0">
                4-point
              </p>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Progression</h4>

            <div class="typography-page-template__copy-block">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                SGDS combines arithmetic progression (AP) and geometric progression (GP) into 12 spacing sizes. The 28 px
                and 256 px sizes are not included.
              </p>
            </div>

            <div class="spacing-page__formula-group">
              <div
                v-for="method in progressionMethods"
                :key="method.title"
                class="spacing-page__formula-block"
              >
                <div class="spacing-page__formula-header">
                  <h6 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">
                    {{ method.title }}
                  </h6>
                  <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ method.description }}
                  </p>
                </div>

                <div class="spacing-page__formula-card">
                  <h6 class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">
                    {{ method.formulaTitle }}
                  </h6>
                  <div class="spacing-page__formula sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal" :aria-label="method.ariaLabel">
                    <span v-if="method.title.includes('Arithmetic')">
                      a<sub>n</sub> = a<sub>1</sub> + (n - 1) * d
                    </span>
                    <span v-else>
                      a<sub>n</sub> = a<sub>1</sub> * r<sup>n - 1</sup>
                    </span>
                  </div>
                  <p class="spacing-page__formula-definition sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    <span v-for="definition in method.definitions" :key="definition">{{ definition }}</span>
                  </p>
                  <div class="spacing-page__sample">
                    <h6 class="spacing-page__sample-label sgds:text-subtitle-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">Sample</h6>
                    <div class="spacing-page__sample-values">
                      <span
                        v-for="value in method.sample"
                        :key="`${method.title}-${value}`"
                        class="spacing-page__sample-chip sgds:text-body-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal"
                      >
                        {{ value }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card spacing-page__demo-card spacing-page__progression-card sgds:min-h-[20rem] sgds:max-md:min-h-[14rem]">
              <div class="spacing-page__chart" aria-label="Spacing progression from 2 px to 128 px">
                <svg class="spacing-page__chart-line" :viewBox="`0 0 ${chartWidth} ${chartHeight}`" aria-hidden="true">
                  <path :d="progressionCurvePath" />
                </svg>

                <div class="spacing-page__bars">
                  <div v-for="step in spacingSteps" :key="step" class="spacing-page__bar-group">
                    <span :class="['spacing-page__bar', `spacing-page__bar--${step}`]"></span>
                    <span class="spacing-page__bar-label sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                      {{ step }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Section>

    </FoundationPrincipleTemplate>
  </TypographyPageTemplate>
</template>

<style scoped>
.spacing-page__body {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
  width: 100%;
}

.spacing-page__demo-card {
  padding: var(--sgds-component-padding-md);
}

.spacing-page__base-card {
  align-items: center;
  display: flex;
  justify-content: center;
}

.spacing-page__progression-card {
  align-items: center;
  display: flex;
  justify-content: center;
}

.spacing-page__chart {
  box-sizing: border-box;
  inline-size: fit-content;
  min-width: 0;
  overflow-x: auto;
  padding-block-start: var(--sgds-component-padding-sm);
  position: relative;
}

.spacing-page__chart-line {
  inset-block-start: var(--sgds-component-padding-xs);
  inset-inline: var(--sgds-component-padding-xs);
  min-inline-size: 28rem;
  position: absolute;
  width: calc(100% - (var(--sgds-component-padding-xs) * 2));
  z-index: 0;
}

.spacing-page__chart-line path {
  fill: none;
  stroke: var(--sgds-border-color-default);
  stroke-linecap: round;
  stroke-width: 2;
}

.spacing-page__bars {
  align-items: end;
  display: grid;
  gap: var(--sgds-component-gap-xs);
  grid-template-columns: repeat(12, minmax(1.5rem, 1fr));
  min-inline-size: 28rem;
  position: relative;
  z-index: 1;
}

.spacing-page__bar-group {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
  justify-content: end;
}

.spacing-page__bar {
  background: var(--sgds-bg-translucent-subtle);
  border-radius: var(--sgds-border-radius-xs) var(--sgds-border-radius-xs) 0 0;
  display: block;
  inline-size: 100%;
  min-block-size: 0.125rem;
}

.spacing-page__bar--4 {
  background: var(--sgds-body-color-default);
}

.spacing-page__bar--2 {
  block-size: 0.125rem;
}

.spacing-page__bar--4 {
  block-size: 0.25rem;
}

.spacing-page__bar--8 {
  block-size: 0.5rem;
}

.spacing-page__bar--12 {
  block-size: 0.75rem;
}

.spacing-page__bar--16 {
  block-size: 1rem;
}

.spacing-page__bar--20 {
  block-size: 1.25rem;
}

.spacing-page__bar--24 {
  block-size: 1.5rem;
}

.spacing-page__bar--32 {
  block-size: 2rem;
}

.spacing-page__bar--48 {
  block-size: 3rem;
}

.spacing-page__bar--64 {
  block-size: 4rem;
}

.spacing-page__bar--96 {
  block-size: 6rem;
}

.spacing-page__bar--128 {
  block-size: 8rem;
}

.spacing-page__bar-label {
  color: var(--sgds-body-color-default);
}

.spacing-page__formula-group {
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.spacing-page__formula-block {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.spacing-page__formula-header,
.spacing-page__formula-card,
.spacing-page__formula-block h6,
.spacing-page__formula-block h6,
.spacing-page__formula-block p {
  margin: 0;
}

.spacing-page__formula-header {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
}

.spacing-page__formula-card {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
}

.spacing-page__formula {
  background: var(--sgds-bg-translucent-subtle);
  border-radius: var(--sgds-border-radius-md);
  color: var(--sgds-body-color-default);
  display: inline-flex;
  font-family: var(--sgds-font-family-mono);
  padding-block: var(--sgds-spacer-2);
  padding-inline: var(--sgds-spacer-3);
  width: fit-content;
}

.spacing-page__formula-definition {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: 0;
}

.spacing-page__sample {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
}

.spacing-page__sample-values {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-2-xs);
}

.spacing-page__sample-chip {
  background: var(--sgds-bg-translucent-subtle);
  border-radius: var(--sgds-border-radius-pill);
  color: var(--sgds-body-color-default);
  padding: var(--sgds-spacer-1) var(--sgds-spacer-3);
}

@media (max-width: 767px) {
  .spacing-page__formula-group {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
