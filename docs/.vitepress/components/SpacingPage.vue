<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";
import Section from "./foundations/Section.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const principles = [
  {
    title: "Alignment",
    body: "Ensure proper alignment of elements with consistent spacing to create a clean and organised layout, reinforcing the overall structure and flow of the design.",
  },
  {
    title: "Flexibility",
    body: "Allow adaptable spacing to accommodate different screen sizes and contexts while maintaining a harmonious design, enabling the system to scale effectively across various devices.",
  },
  {
    title: "Uniformity",
    body: "Use a standardised spacing scale across the design system to ensure uniformity and coherence in layouts, making the interface predictable and easier to navigate.",
  },
];

const spacingSteps = ["2", "4", "8", "12", "16", "20", "24", "32", "48", "64", "96", "128"];
</script>

<template>
  <TypographyPageTemplate>
    <FoundationPrincipleTemplate>
      <FoundationPrinciplesList :principles="principles" />

    <Section title="Spacing foundation">
      <div class="spacing-page__body">
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Base size</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              SGDS follows a 4-point system. This allows us to create consistency across the user interface while decreasing
              design complexity.
            </p>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card spacing-page__demo-card spacing-page__base-card">
              <p class="sgds:text-default sgds:text-display-md sgds:font-bold sgds:leading-lg sgds:tracking-tight">
                4-point
              </p>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Progression</h4>

            <div class="typography-page-template__copy-block">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                SGDS combines arithmetic progression (AP) and geometric progression (GP) into 12 spacing sizes. The 28 px
                and 256 px sizes are not included.
              </p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <strong>Arithmetic progression (AP)</strong>: each step increases by 4.
              </p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <strong>Geometric progression (GP)</strong>: each step doubles.
              </p>
            </div>

            <div class="spacing-page__formula-group">
              <div class="spacing-page__formula-block">
                <h5 class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                  Formula arithmetic progression (AP)
                </h5>
                <div class="spacing-page__formula" aria-label="a n equals a one plus open bracket n minus one close bracket multiplied by d">
                  a<sub>n</sub> = a<sub>1</sub> + (n - 1) * d
                </div>
                <p class="spacing-page__formula-definition sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <span>a<sub>n</sub> = nth term</span>
                  <span>a<sub>1</sub> = first term</span>
                  <span>d = common difference</span>
                </p>
              </div>

              <div class="spacing-page__formula-block">
                <h5 class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                  Formula geometric progression (GP)
                </h5>
                <div class="spacing-page__formula" aria-label="a n equals a one multiplied by r to the power of n minus one">
                  a<sub>n</sub> = a<sub>1</sub> * r<sup>n - 1</sup>
                </div>
                <p class="spacing-page__formula-definition sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <span>a<sub>n</sub> = nth term</span>
                  <span>a<sub>1</sub> = first term</span>
                  <span>r = common ratio</span>
                </p>
              </div>
            </div>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card spacing-page__demo-card spacing-page__progression-card">
              <div class="spacing-page__chart" aria-label="Spacing progression from 2 px to 128 px">
                <svg class="spacing-page__chart-line" viewBox="0 0 520 164" aria-hidden="true">
                  <path d="M16 142 C 96 124, 168 96, 232 72 S 392 22, 504 16" />
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
  min-block-size: 16rem;
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
}

.spacing-page__chart {
  box-sizing: border-box;
  min-width: 0;
  overflow-x: auto;
  padding-block-start: var(--sgds-component-padding-sm);
  position: relative;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  gap: var(--sgds-component-gap-sm);
}

.spacing-page__formula-block {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

.spacing-page__formula-block h5,
.spacing-page__formula-block p {
  margin: 0;
}

.spacing-page__formula {
  background: var(--sgds-bg-translucent-subtle);
  border-radius: var(--sgds-border-radius-md);
  color: var(--sgds-body-color-default);
  display: inline-flex;
  font-family: var(--sgds-font-family-mono);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-xs);
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

</style>
