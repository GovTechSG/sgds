<script setup lang="ts">
import CodeToken from "./ui/CodeToken.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const spacingSteps = ["2", "4", "8", "12", "16", "20", "24", "32", "48", "64", "96", "128"];
const spacingScaleRows = [
  { multiplier: "1", token: "sgds:m-1", value: "4px" },
  { multiplier: "2", token: "sgds:m-2", value: "8px" },
  { multiplier: "3", token: "sgds:m-3", value: "12px" },
  { multiplier: "4", token: "sgds:m-4", value: "16px" },
  { multiplier: "5", token: "sgds:m-5", value: "20px" },
  { multiplier: "6", token: "sgds:m-6", value: "24px" },
  { multiplier: "8", token: "sgds:m-8", value: "32px" },
  { multiplier: "12", token: "sgds:m-12", value: "48px" },
  { multiplier: "16", token: "sgds:m-16", value: "64px" },
  { multiplier: "24", token: "sgds:m-24", value: "96px" },
];
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Principle</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Alignment</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Ensure proper alignment of elements with consistent spacing to create a clean and organised layout, reinforcing
            the overall structure and flow of the design.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Flexibility</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Allow adaptable spacing to accommodate different screen sizes and contexts while maintaining a harmonious
            design, enabling the system to scale effectively across various devices.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Uniformity</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Use a standardised spacing scale across the design system to ensure uniformity and coherence in layouts, making
            the interface predictable and easier to navigate.
          </p>
        </div>
      </div>
    </section>

    <section class="typography-page-template__section">
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
                SGDS combines arithmetic progression (AP) and geometric progression (GP) into 12 spacing sizes. The 28px
                and 256px sizes are not included.
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
              <div class="spacing-page__chart" aria-label="Spacing progression from 2px to 128px">
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
    </section>

    <section class="typography-page-template__section">
      <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">Spacing system</h2>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Core concept</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            The SGDS spacing system is built on a base unit of <strong>4px</strong>. Every spacing token is a multiple
            of this fundamental unit, creating a consistent and predictable spacing scale throughout your application.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            Every spacing value follows the same rule: <strong>value = multiplier × 4px</strong>.
          </p>
        </div>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Spacing scale</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            The spacing system uses numeric multipliers where each unit equals 4px. Common utilities such as
            <CodeToken label="sgds:m-4" /> or <CodeToken label="sgds:p-6" /> keep layouts on the same rhythm, and the
            scale continues beyond the examples shown here.
          </p>
        </div>

        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="typography-page-template__table-metric-column">Multiplier</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-utility-column">Token</sgds-table-head>
            <sgds-table-head class="typography-page-template__table-value-column">Value</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row v-for="row in spacingScaleRows" :key="row.token">
            <sgds-table-cell class="typography-page-template__table-metric-column">
              {{ row.multiplier }}
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-utility-column">
              <CodeToken :label="row.token" />
            </sgds-table-cell>
            <sgds-table-cell class="typography-page-template__table-value-column">
              {{ row.value }}
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>

        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal spacing-page__table-note">
          The scale continues indefinitely with any numeric multiplier, such as <CodeToken label="sgds:m-32" /> or
          <CodeToken label="sgds:m-40" />.
        </p>

        <div class="typography-page-template__content-block">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            Design considerations
          </h4>
          <h5 class="sgds:text-heading-xs sgds:font-semibold sgds:leading-xs sgds:tracking-tight">
            Best practices
          </h5>
          <ul class="spacing-page__best-practices sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
            <li><strong>Use a consistent scale:</strong> Stick to named tokens rather than arbitrary values.</li>
            <li><strong>Layer spacing:</strong> Combine axis-specific utilities for semantic meaning.</li>
            <li><strong>Maintain vertical rhythm:</strong> Use <CodeToken label="sgds:my-*" /> to keep vertical spacing consistent.</li>
            <li><strong>Use component padding:</strong> Apply <CodeToken label="sgds:p-*" /> for internal component spacing.</li>
            <li><strong>Set layout margins:</strong> Use <CodeToken label="sgds:m-*" />, <CodeToken label="sgds:mx-*" />, and <CodeToken label="sgds:my-*" /> for component spacing.</li>
          </ul>
        </div>
      </div>
    </section>
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

.spacing-page__table-note {
  margin: 0;
}

.spacing-page__best-practices {
  margin: 0;
  padding-inline-start: var(--sgds-spacer-6);
}

.spacing-page__best-practices li + li {
  margin-block-start: var(--sgds-text-gap-sm);
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
