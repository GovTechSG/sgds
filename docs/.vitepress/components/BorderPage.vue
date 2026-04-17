<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";
import Section from "./foundations/Section.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

type Principle = {
  title: string;
  description: string;
};

type Example = {
  title: string;
  description: string;
  bullets?: string[];
};

const principles: Principle[] = [
  {
    title: "Clarity",
    description: "Borders should provide clear structure, aiding readability and navigation.",
  },
  {
    title: "Subtlety",
    description: "Borders should be minimal and unobtrusive, letting content take priority.",
  },
];

const borderWidthExamples: Example[] = [
  {
    title: "Default - 1 px",
    description:
      "The default border width is used to illustrate the boundary of components and divide content.",
  },
  {
    title: "Medium - 2 px",
    description:
      "Medium borders are used to emphasise elements that primarily use borders for hover interaction, like input field.",
  },
  {
    title: "Strong - 4 px",
    description:
      "Strong borders are used to emphasise elements that primarily use borders for their structure, like tabs.",
  },
];

const radiusExamples: Example[] = [
  {
    title: "None and minimal (0 px, 2 px)",
    description:
      "Used for sharp, structured designs with little to no rounding. Suitable for strict, grid-based layouts where clarity and precision are key.",
    bullets: [
      "Data tables (0 px for a rigid, structured look)",
      "Dividers or separators (2 px for subtle softness)",
    ],
  },
  {
    title: "Compact (4 px)",
    description:
      "Provides slight rounding for a modern but understated look. Enhances usability while keeping a clean and structured appearance.",
    bullets: ["Icon button 24 px and 32 px", "Tags, pills, or badges"],
  },
  {
    title: "Standard (8 px)",
    description:
      "The default radius for most components, balancing smoothness and sharpness. Works well across both functional and decorative elements.",
    bullets: ["Cards and modals", "Tooltips and dropdowns", "Inputs"],
  },
  {
    title: "Expressive (12 px, 16 px, 24 px)",
    description:
      "Larger radius sizes that create a more distinct and friendly visual style. Used to emphasise key components and create a softer, more inviting look.",
    bullets: [
      "Modal and large callout banners (12 px, 16 px)",
      "Feature cards or promotional sections (24 px)",
    ],
  },
  {
    title: "Fully rounded (full)",
    description:
      "Used for completely rounded shapes, ensuring a pill-like or circular appearance. Best for elements that need to stand out or convey a tactile feel.",
    bullets: ["Avatars and profile images", "Floating action buttons (FABs)"],
  },
];
</script>

<template>
  <TypographyPageTemplate stacked-examples>
    <FoundationPrincipleTemplate>
      <FoundationPrinciplesList :principles="principles" />

      <Section
        title="Border"
        description="SGDS border width is used to define structure and separation."
      >
      <div class="typography-page-template__body">
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ borderWidthExamples[0]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ borderWidthExamples[0]?.description }}
            </p>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:flex sgds:w-full sgds:max-w-[20rem] sgds:flex-col sgds:gap-text-xs">
                <span class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Label</span>
                <div class="sgds:flex sgds:h-12 sgds:items-center sgds:rounded-[8px] sgds:border sgds:border-default sgds:bg-surface-default sgds:px-component-xs">
                  <span class="sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
                    Placeholder text
                  </span>
                </div>
                <div class="sgds:h-px sgds:w-full sgds:bg-muted"></div>
              </div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ borderWidthExamples[1]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ borderWidthExamples[1]?.description }}
            </p>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:flex sgds:w-full sgds:max-w-[20rem] sgds:flex-col sgds:gap-text-xs">
                <span class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Label</span>
                <div class="sgds:flex sgds:h-12 sgds:items-center sgds:rounded-[8px] sgds:border-2 sgds:border-emphasis sgds:bg-surface-default sgds:px-component-xs">
                  <span class="sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
                    Placeholder text
                  </span>
                </div>
                <div class="sgds:h-px sgds:w-full sgds:bg-muted"></div>
              </div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ borderWidthExamples[2]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ borderWidthExamples[2]?.description }}
            </p>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:w-full sgds:max-w-[16rem] sgds:border-b-4 sgds:border-default"></div>
            </div>
          </div>
        </article>
      </div>
      </Section>

      <Section
        title="Radius"
        description="SGDS radius is used widely throughout our system. Each radius size is intentionally applied to select elements."
      >
      <div class="typography-page-template__body">
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ radiusExamples[0]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[0]?.description }}
            </p>
            <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs">
              <li
                v-for="bullet in radiusExamples[0]?.bullets"
                :key="bullet"
                class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              >
                {{ bullet }}
              </li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:flex-col sgds:justify-center sgds:gap-layout-sm sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:grid sgds:grid-cols-2 sgds:overflow-hidden sgds:rounded-none sgds:border sgds:border-muted">
                <div
                  v-for="(cell, index) in ['Header', 'Header', 'Data', 'Data', 'Data', 'Data']"
                  :key="`${cell}-${index}`"
                  class="sgds:flex sgds:h-14 sgds:items-center sgds:border-b sgds:border-r sgds:border-muted sgds:px-component-xs"
                >
                  <span class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">{{ cell }}</span>
                </div>
              </div>
              <div class="sgds:w-full sgds:max-w-[10rem] sgds:self-center sgds:rounded-[2px] sgds:border-b-2 sgds:border-muted"></div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ radiusExamples[1]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[1]?.description }}
            </p>
            <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs">
              <li
                v-for="bullet in radiusExamples[1]?.bullets"
                :key="bullet"
                class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              >
                {{ bullet }}
              </li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:gap-component-sm sgds:min-h-[20rem] sgds:p-layout-md">
              <sgds-badge variant="primary">Badge label</sgds-badge>
              <div class="sgds:flex sgds:h-8 sgds:w-8 sgds:items-center sgds:justify-center sgds:rounded sgds:border sgds:border-muted">
                <sgds-icon name="three-dots" size="sm" class="sgds:text-muted"></sgds-icon>
              </div>
              <div class="sgds:flex sgds:h-8 sgds:w-8 sgds:items-center sgds:justify-center sgds:rounded sgds:border sgds:border-muted">
                <sgds-icon name="x-lg" size="sm" class="sgds:text-muted"></sgds-icon>
              </div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ radiusExamples[2]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[2]?.description }}
            </p>
            <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs">
              <li
                v-for="bullet in radiusExamples[2]?.bullets"
                :key="bullet"
                class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              >
                {{ bullet }}
              </li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-layout-sm sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:flex sgds:w-full sgds:max-w-[20rem] sgds:flex-col sgds:gap-text-xs">
                <span class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Label</span>
                <div class="sgds:flex sgds:h-12 sgds:items-center sgds:rounded-[8px] sgds:border sgds:border-default sgds:bg-surface-default sgds:px-component-xs">
                  <span class="sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
                    Placeholder text
                  </span>
                </div>
              </div>
              <sgds-button variant="primary">Button label</sgds-button>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ radiusExamples[3]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[3]?.description }}
            </p>
            <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs">
              <li
                v-for="bullet in radiusExamples[3]?.bullets"
                :key="bullet"
                class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              >
                {{ bullet }}
              </li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:gap-component-sm sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:h-20 sgds:w-24 sgds:rounded-[12px] sgds:border sgds:border-muted sgds:bg-surface-raised"></div>
              <div class="sgds:h-24 sgds:w-32 sgds:rounded-[16px] sgds:border sgds:border-muted sgds:bg-surface-raised"></div>
              <div class="sgds:h-28 sgds:w-40 sgds:rounded-[24px] sgds:border sgds:border-muted sgds:bg-surface-raised"></div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ radiusExamples[4]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[4]?.description }}
            </p>
            <ul class="sgds:list-disc sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs">
              <li
                v-for="bullet in radiusExamples[4]?.bullets"
                :key="bullet"
                class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              >
                {{ bullet }}
              </li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:gap-component-md sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:h-16 sgds:w-16 sgds:rounded-full sgds:bg-primary-surface-muted sgds:border sgds:border-primary-muted"></div>
              <div class="sgds:h-16 sgds:w-16 sgds:rounded-full sgds:bg-accent-surface-muted sgds:border sgds:border-accent-muted"></div>
              <div class="sgds:flex sgds:h-14 sgds:min-w-14 sgds:items-center sgds:justify-center sgds:rounded-full sgds:bg-primary-default sgds:px-component-sm">
                <sgds-icon name="plus" class="sgds:text-fixed-light"></sgds-icon>
              </div>
            </div>
          </div>
        </article>
      </div>
      </Section>
    </FoundationPrincipleTemplate>
  </TypographyPageTemplate>
</template>
