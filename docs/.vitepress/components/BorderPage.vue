<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";
import Section from "./foundations/Section.vue";
import SectionHeader from "./foundations/SectionHeader.vue";
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
    description: "Use borders to show structure and support readability.",
  },
  {
    title: "Subtlety",
    description: "Keep borders minimal so content stays the focus.",
  },
  {
    title: "Separation",
    description: "Use border width to separate content and clarify where areas begin and end.",
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

      <Section title="Characteristics (width)">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
        <section class="sgds:flex sgds:flex-col sgds:gap-text-lg">
          <div class="typography-page-template__body">
            <article class="typography-page-template__split-row">
              <div class="typography-page-template__copy-pane">
                <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
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
                <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
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
                <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
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
        </section>

        <section class="sgds:flex sgds:flex-col sgds:gap-text-lg">
        <SectionHeader title="Characteristics (radius)" />
        <div class="typography-page-template__body">
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
              {{ radiusExamples[0]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[0]?.description }}
            </p>
            <ul class="br-bullet-list sgds:list-disc sgds:pl-6 sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
              <li v-for="bullet in radiusExamples[0]?.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[20rem] sgds:p-layout-md">
              <!-- sgds-table illustrating 0-px radius — sharp corners match the
                   "Data tables (0 px)" bullet on the left. -->
              <div class="br-radius-table-wrap sgds:w-full sgds:max-w-[32rem] sgds:border sgds:border-b-0 sgds:border-muted sgds:rounded-none sgds:overflow-hidden">
                <sgds-table tableBorder responsive="always" class="sgds:w-full">
                  <sgds-table-row>
                    <sgds-table-head>Header</sgds-table-head>
                    <sgds-table-head>Header</sgds-table-head>
                  </sgds-table-row>
                  <sgds-table-row>
                    <sgds-table-cell>Data</sgds-table-cell>
                    <sgds-table-cell>Data</sgds-table-cell>
                  </sgds-table-row>
                  <sgds-table-row>
                    <sgds-table-cell>Data</sgds-table-cell>
                    <sgds-table-cell>Data</sgds-table-cell>
                  </sgds-table-row>
                </sgds-table>
              </div>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
              {{ radiusExamples[1]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[1]?.description }}
            </p>
            <ul class="br-bullet-list sgds:list-disc sgds:pl-6 sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
              <li v-for="bullet in radiusExamples[1]?.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:gap-component-sm sgds:min-h-[20rem] sgds:p-layout-md">
              <sgds-badge variant="primary">Badge label</sgds-badge>
              <!-- Wrapping each action in .br-hover-frozen applies the
                   components' hover background colour to the host (the inner
                   button is transparent by default), and pointer-events:none
                   makes the demo non-interactive. -->
              <span class="br-hover-frozen br-hover-frozen--close">
                <sgds-close-button inert></sgds-close-button>
              </span>
              <span class="br-hover-frozen br-hover-frozen--overflow">
                <sgds-overflow-menu inert></sgds-overflow-menu>
              </span>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
              {{ radiusExamples[2]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[2]?.description }}
            </p>
            <ul class="br-bullet-list sgds:list-disc sgds:pl-6 sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
              <li v-for="bullet in radiusExamples[2]?.bullets" :key="bullet">{{ bullet }}</li>
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
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
              {{ radiusExamples[3]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[3]?.description }}
            </p>
            <ul class="br-bullet-list sgds:list-disc sgds:pl-6 sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
              <li v-for="bullet in radiusExamples[3]?.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:flex-col sgds:items-stretch sgds:justify-center sgds:gap-component-md sgds:min-h-[20rem] sgds:p-layout-md">
              <!-- Inline modal preview — same markup + classes the Modal
                   component page (/components/modal) uses in its anatomy and
                   default demo, with a backdrop added via .br-modal-backdrop
                   so the panel sits on the same overlay tint the real
                   <sgds-modal> renders behind its panel. -->
              <div class="portal-modal-preview br-modal-backdrop sgds:box-border sgds:p-xl">
                <div class="portal-modal-panel">
                  <div class="portal-modal-header">
                    <div class="portal-modal-header-copy">
                      <div class="portal-modal-title">Modal title</div>
                      <div class="portal-modal-description">Modal description</div>
                    </div>
                    <sgds-close-button inert></sgds-close-button>
                  </div>
                  <div class="portal-modal-footer">
                    <sgds-button variant="outline" tabindex="-1">Button</sgds-button>
                    <sgds-button variant="primary" tabindex="-1">Button</sgds-button>
                  </div>
                </div>
              </div>

              <!-- Large callout banner (12 px / 16 px radius) -->
              <sgds-alert variant="info" dismissible>
                <strong>Callout banner</strong> — a long-form informational message for users.
              </sgds-alert>

              <!-- Feature / promotional card (24 px radius) -->
              <sgds-card>
                <span slot="title">Feature card</span>
                <span slot="description">
                  Promotional sections use the largest expressive radius for a softer, friendlier look.
                </span>
              </sgds-card>
            </div>
          </div>
        </article>

        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
              {{ radiusExamples[4]?.title }}
            </h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              {{ radiusExamples[4]?.description }}
            </p>
            <ul class="br-bullet-list sgds:list-disc sgds:pl-6 sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
              <li v-for="bullet in radiusExamples[4]?.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </div>

          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card sgds:flex sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-layout-sm sgds:min-h-[20rem] sgds:p-layout-md">
              <div class="sgds:flex sgds:items-end sgds:gap-component-md">
                <!-- Avatars -->
                <div class="sgds:flex sgds:flex-col sgds:items-center sgds:gap-text-2-xs">
                  <div class="sgds:h-16 sgds:w-16 sgds:rounded-full sgds:bg-primary-surface-muted sgds:border sgds:border-primary-muted sgds:flex sgds:items-center sgds:justify-center">
                    <span class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-primary-default">AB</span>
                  </div>
                  <span class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Avatar</span>
                </div>
                <div class="sgds:flex sgds:flex-col sgds:items-center sgds:gap-text-2-xs">
                  <div class="sgds:h-16 sgds:w-16 sgds:rounded-full sgds:bg-accent-surface-muted sgds:border sgds:border-accent-muted sgds:flex sgds:items-center sgds:justify-center">
                    <sgds-icon name="person" size="xl" class="sgds:text-accent-default"></sgds-icon>
                  </div>
                  <span class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Avatar</span>
                </div>
                <!-- Floating action button -->
                <div class="sgds:flex sgds:flex-col sgds:items-center sgds:gap-text-2-xs">
                  <div class="sgds:flex sgds:h-14 sgds:w-14 sgds:items-center sgds:justify-center sgds:rounded-full sgds:bg-primary-default sgds:shadow-md">
                    <sgds-icon name="plus" size="lg" class="sgds:text-fixed-light"></sgds-icon>
                  </div>
                  <span class="sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">FAB</span>
                </div>
              </div>
            </div>
          </div>
        </article>
        </div>
        </section>
        </div>
      </Section>
    </FoundationPrincipleTemplate>
  </TypographyPageTemplate>
</template>

<style>
/* Tight bullet list used inside .typography-page-template__copy-pane. Native
 * <ul>/<li> preserves list-item bullet rendering (flex containers blockify
 * children and lose markers) and gives a fine-grained, SGDS-token-based
 * margin between items without adding a flex gap.
 *
 * The copy-pane sets a uniform `gap: text-gap-xs` (8px) between its children,
 * which leaves the paragraph twice as far from the first bullet as bullets
 * are from each other. Pulling the list up by the difference aligns the
 * paragraph-to-list gap with the inter-item rhythm, so the description and
 * its bullets read as one block. */
.br-bullet-list {
  display: block;
  margin-block-start: calc(var(--sgds-text-gap-2-xs) - var(--sgds-text-gap-xs));
}

.br-bullet-list > li + li {
  margin-block-start: var(--sgds-text-gap-2-xs);
}


/* Modal backdrop for the expressive-radius demo — mirrors the overlay the
 * real <sgds-modal> renders behind its panel, using the same --sgds-bg-overlay
 * token. Sits on top of the demo card's surface so the modal panel reads as
 * the focused layer. */
.br-modal-backdrop {
  background-color: var(--sgds-bg-overlay);
}

/* Frozen hover state for the compact-radius demo — the inner close/overflow
 * buttons render on a transparent background by default, so applying the
 * component's hover background token on the host wrapper shows through.
 * `pointer-events: none` makes them non-interactive in this demo context. */
.br-hover-frozen {
  border-radius: var(--sgds-border-radius-sm);
  display: inline-flex;
  pointer-events: none;
}

.br-hover-frozen--close {
  background-color: var(--sgds-bg-translucent);
}

.br-hover-frozen--overflow {
  background-color: var(--sgds-bg-translucent-subtle);
}
</style>
