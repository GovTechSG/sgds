<script setup lang="ts">
import PortalNumberedItem from "./PortalNumberedItem.vue";
import Section from "./Section.vue";

type PurposeCard = {
  title: string;
  description: string;
};

type AnatomyPart = {
  number: number;
  title: string;
  note?: string;
};

type ConfigurationExample = {
  title: string;
  description: string;
  variant?: "default" | "border";
  density?: "default" | "compact";
  startSlot?: boolean;
  endSlot?: boolean;
};

type MeasurementExample = {
  title: string;
  description: string;
  lightSrc: string;
  darkSrc: string;
  alt: string;
};

type UsageGuidance = {
  title: string;
  tone: "do" | "dont";
  items: string[];
};

type BehaviourExample = {
  title: string;
  description: string;
  kind: "expand" | "density" | "slots" | "initial";
};

type MotionSpec = {
  element: string;
  value: string;
  duration: string;
  easing: string;
};

type BestPractice = {
  title: string;
  description: string;
  tone: "do" | "dont";
  kind: "clear-title" | "long-title" | "group-content" | "nested" | "clear-feedback" | "extra-actions";
};

const purposeCards: PurposeCard[] = [
  {
    title: "Progressive disclosure",
    description:
      "Accordion sections show only essential information upfront and reveal supporting details on demand.",
  },
  {
    title: "Scan and prioritise",
    description:
      "Accordion headings help users compare sections quickly before deciding what to expand.",
  },
  {
    title: "Maintain context",
    description:
      "Expanded content stays grouped beneath its trigger so users can stay oriented while reading.",
  },
];

const anatomyParts: AnatomyPart[] = [
  {
    number: 1,
    title: "Title",
  },
  {
    number: 2,
    title: "Indicator",
    note: "(chevron)",
  },
  {
    number: 3,
    title: "Content panel",
    note: "(slot)",
  },
  {
    number: 4,
    title: "Divider",
  },
  {
    number: 5,
    title: "Leading icon",
    note: "(optional)",
  },
  {
    number: 6,
    title: "Badge",
    note: "(optional)",
  },
];

const configurationExamples: ConfigurationExample[] = [
  {
    title: "Density",
    description:
      "The accordion offers three density options—default, compact, and spacious—to adapt to different contexts.",
    density: "compact",
  },
  {
    title: "Border",
    description:
      "Provides separation from the background or surrounding content.",
    variant: "border",
  },
  {
    title: "Start slot",
    description:
      "The start slot is an optional area placed before the accordion title. It is intended for identifiers or visual anchors that help users quickly recognize the type or context of the content.\n\nThis slot should remain visually balanced and not contain interactive elements.",
    startSlot: true,
  },
  {
    title: "End slot",
    description:
      "The end slot is an optional area placed after the accordion title and before the indicator (chevron). It is used for status, metadata, or supporting information that complements the main label.\n\nThe end slot should remain concise to avoid disrupting header alignment. If no title text is provided, the end slot will not be displayed.",
    endSlot: true,
  },
];

const measurementExamples: MeasurementExample[] = [
  {
    title: "Collapse",
    description: "",
    lightSrc: "/components/accordion-measurement-collapse-light.svg",
    darkSrc: "/components/accordion-measurement-collapse-dark.svg",
    alt: "Accordion collapse measurement diagram",
  },
  {
    title: "Expand",
    description: "",
    lightSrc: "/components/accordion-measurement-expand-light.svg",
    darkSrc: "/components/accordion-measurement-expand-dark.svg",
    alt: "Accordion expand measurement diagram",
  },
];

const usageGuidance: UsageGuidance[] = [
  {
    title: "When to use",
    tone: "do",
    items: [
      "To organise related information.",
      "To shorten pages and reduce scrolling when content is not crucial to read in full.",
      "When space is at a premium and long content cannot be displayed all at once, like on a mobile interface or in a side panel.",
    ],
  },
  {
    title: "When not to use",
    tone: "dont",
    items: [
      "When each section only contains a small amount of text or a few elements, a simple list or heading may work better.",
      "Do not use accordions for content that is essential or required for users to see immediately.",
    ],
  },
];

const behaviourExamples: BehaviourExample[] = [
  {
    title: "Expand / Collapse",
    description: "Clicking the header toggles visibility of the content.",
    kind: "expand",
  },
  {
    title: "Density",
    description: "Use compact or default density depending on the surrounding layout and information density.",
    kind: "density",
  },
  {
    title: "Slots",
    description: "Start and end slots support identifiers, metadata, and supporting context while keeping the title readable.",
    kind: "slots",
  },
  {
    title: "Initial state",
    description: "Keep items collapsed by default unless one section needs to be surfaced immediately.",
    kind: "initial",
  },
];

const motionSpecs: MotionSpec[] = [
  {
    element: "Accordion title",
    value: "100% → 0%",
    duration: "motion-duration-fast-2",
    easing: "motion-easing-standard",
  },
  {
    element: "Accordion body",
    value: "0% → 100%",
    duration: "motion-duration-fast-2",
    easing: "motion-easing-standard",
  },
  {
    element: "Chevron",
    value: "0° → 180°",
    duration: "motion-duration-fast-1",
    easing: "-",
  },
];

const bestPractices: BestPractice[] = [
  {
    title: "Keep titles concise",
    description: "Write headers as short, clear phrases so users can scan and choose quickly.",
    tone: "do",
    kind: "clear-title",
  },
  {
    title: "Avoid long titles",
    description: "Long headers weaken hierarchy and make the accordion harder to scan.",
    tone: "dont",
    kind: "long-title",
  },
  {
    title: "Group related information",
    description: "Use accordions when items belong together and benefit from progressive disclosure.",
    tone: "do",
    kind: "group-content",
  },
  {
    title: "Do not nest accordions",
    description: "Multiple layers of accordions make scanning and orientation harder.",
    tone: "dont",
    kind: "nested",
  },
  {
    title: "Provide clear feedback",
    description: "Use the chevron and open state consistently so users know what changed.",
    tone: "do",
    kind: "clear-feedback",
  },
  {
    title: "Avoid extra actions in the header",
    description: "Unrelated controls in the clickable header create confusion and competing interactions.",
    tone: "dont",
    kind: "extra-actions",
  },
];
</script>

<template>
  <div :class="$style.page">
    <sgds-tab-group :class="$style.tabGroup" variant="underlined">
      <sgds-tab slot="nav" panel="design" active>Design</sgds-tab>
      <sgds-tab slot="nav" panel="usage">Usage</sgds-tab>
      <sgds-tab slot="nav" panel="code">Code</sgds-tab>
      <sgds-tab slot="nav" panel="accessibility">Accessibility</sgds-tab>
      <sgds-tab slot="nav" panel="updates">Updates</sgds-tab>

      <sgds-tab-panel name="design">
        <div :class="$style.sectionStack">
          <Section title="Purpose">
            <div :class="$style.purposeGrid">
              <article
                v-for="card in purposeCards"
                :key="card.title"
                :class="$style.purposeCard"
              >
                <h3 :class="[$style.cardTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ card.title }}</h3>
                <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ card.description }}</p>
              </article>
            </div>
          </Section>

          <Section title="Anatomy">
            <div :class="$style.anatomyStack">
              <div :class="$style.showcaseCard">
                <div :class="$style.anatomyPreview">
                  <img
                    :class="[$style.anatomyImage, $style.anatomyImageLight]"
                    src="/components/accordion-anatomy-light.svg"
                    alt="Accordion anatomy diagram with numbered callouts"
                  />
                  <img
                    :class="[$style.anatomyImage, $style.anatomyImageDark]"
                    src="/components/accordion-anatomy-dark.svg"
                    alt="Accordion anatomy diagram with numbered callouts in dark mode"
                  />
                </div>
              </div>

              <div :class="$style.anatomyGrid">
                <div :class="$style.anatomyColumn">
                  <PortalNumberedItem
                    v-for="part in anatomyParts.slice(0, 3)"
                    :key="part.number"
                    :number="part.number"
                    :title="part.title"
                    :note="part.note"
                  />
                </div>

                <div :class="$style.anatomyColumn">
                  <PortalNumberedItem
                    v-for="part in anatomyParts.slice(3)"
                    :key="part.number"
                    :number="part.number"
                    :title="part.title"
                    :note="part.note"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section title="Configuration">
            <div :class="$style.configurationStack">
              <article
                v-for="example in configurationExamples"
                :key="example.title"
                :class="$style.configurationRow"
              >
                <div :class="$style.configurationCopy">
                  <h3
                    :class="[
                      'sgds:text-heading-sm',
                      'sgds:font-semibold',
                      'sgds:leading-sm',
                      'sgds:tracking-tight',
                      $style.configurationTitle,
                    ]"
                  >
                    {{ example.title }}
                  </h3>
                  <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ example.description }}</p>
                </div>

                <div :class="$style.configurationPreview">
                  <div
                    :class="[
                      example.title === 'Density'
                        ? $style.accordionSurfaceFlush
                        : $style.accordionSurface,
                    ]"
                  >
                    <div v-if="example.title === 'Density'" :class="$style.densityDemoStack">
                      <div :class="$style.densityExample">
                        <sgds-accordion :class="$style.demoAccordion" density="compact">
                          <sgds-accordion-item>
                            <span slot="header">Compact</span>
                            <div slot="content">Accordion content</div>
                          </sgds-accordion-item>
                        </sgds-accordion>
                      </div>

                      <div :class="$style.densityExample">
                        <sgds-accordion :class="$style.demoAccordion">
                          <sgds-accordion-item>
                            <span slot="header">Default</span>
                            <div slot="content">Accordion content</div>
                          </sgds-accordion-item>
                        </sgds-accordion>
                      </div>
                    </div>

                    <sgds-accordion
                      v-else
                      :class="$style.demoAccordion"
                      :variant="example.variant || 'default'"
                      :density="example.density || 'default'"
                    >
                      <sgds-accordion-item>
                        <template v-if="example.startSlot">
                          <div slot="header" :class="$style.headerWithLead">
                            <sgds-icon name="info-circle" size="sm" />
                            <span>Accordion title</span>
                          </div>
                        </template>
                        <template v-else-if="example.endSlot">
                          <div slot="header" :class="$style.headerWithMeta">
                            <span>Accordion title</span>
                            <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
                          </div>
                        </template>
                        <template v-else>
                          <span slot="header">Accordion title</span>
                        </template>
                        <div slot="content">
                          Accordion content
                        </div>
                      </sgds-accordion-item>
                      <sgds-accordion-item>
                        <template v-if="example.startSlot">
                          <div slot="header" :class="$style.headerWithLead">
                            <sgds-icon name="info-circle" size="sm" />
                            <span>Accordion title</span>
                          </div>
                        </template>
                        <template v-else-if="example.endSlot">
                          <div slot="header" :class="$style.headerWithMeta">
                            <span>Accordion title</span>
                            <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
                          </div>
                        </template>
                        <template v-else>
                          <span slot="header">Accordion title</span>
                        </template>
                        <div slot="content">
                          Accordion content
                        </div>
                      </sgds-accordion-item>
                      <sgds-accordion-item v-if="example.title !== 'Border'">
                        <template v-if="example.startSlot">
                          <div slot="header" :class="$style.headerWithLead">
                            <sgds-icon name="info-circle" size="sm" />
                            <span>Accordion title</span>
                          </div>
                        </template>
                        <template v-else-if="example.endSlot">
                          <div slot="header" :class="$style.headerWithMeta">
                            <span>Accordion title</span>
                            <sgds-badge variant="neutral" outlined>Badge</sgds-badge>
                          </div>
                        </template>
                        <template v-else>
                          <span slot="header">Accordion title</span>
                        </template>
                        <div slot="content">
                          Accordion content
                        </div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>
                </div>
              </article>
            </div>
          </Section>

          <Section title="Measurements">
            <div :class="$style.measurementsGrid">
              <article
                v-for="(measurement, index) in measurementExamples"
                :key="index"
                :class="$style.measurementCard"
              >
                <div
                  v-if="measurement.title || measurement.description"
                  :class="$style.measurementHeader"
                >
                  <h3
                    v-if="measurement.title"
                    :class="[$style.measurementTitle, 'sgds:text-label-sm sgds:font-regular sgds:leading-20 sgds:tracking-normal']"
                  >
                    {{ measurement.title }}
                  </h3>
                  <p v-if="measurement.description" :class="$style.measurementDescription">{{ measurement.description }}</p>
                </div>

                <div :class="$style.measurementPreview">
                  <img
                    :class="[$style.measurementImage, $style.measurementImageLight]"
                    :src="measurement.lightSrc"
                    :alt="measurement.alt"
                  />
                  <img
                    :class="[$style.measurementImage, $style.measurementImageDark]"
                    :src="measurement.darkSrc"
                    :alt="`${measurement.alt} in dark mode`"
                  />
                </div>
              </article>
            </div>
          </Section>
        </div>
      </sgds-tab-panel>

      <sgds-tab-panel name="usage">
        <div :class="$style.sectionStack">
          <Section title="Usage">
            <div :class="$style.usageGuidanceStack">
              <article
                v-for="section in usageGuidance"
                :key="section.title"
                :class="$style.usageGuidanceBlock"
              >
                <div :class="$style.usageGuidanceHeader">
                  <sgds-icon
                    :name="section.tone === 'do' ? 'check-circle-fill' : 'x-circle-fill'"
                    size="lg"
                  ></sgds-icon>
                  <h3 :class="[$style.usageGuidanceTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ section.title }}</h3>
                </div>
                <ul :class="$style.list">
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section title="Behaviours">
            <div :class="$style.configurationStack">
              <article
                v-for="example in behaviourExamples"
                :key="example.title"
                :class="$style.configurationRow"
              >
                <div :class="$style.configurationCopy">
                  <h3
                    :class="[
                      'sgds:text-heading-sm',
                      'sgds:font-semibold',
                      'sgds:leading-sm',
                      'sgds:tracking-tight',
                      $style.configurationTitle,
                    ]"
                  >
                    {{ example.title }}
                  </h3>
                  <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ example.description }}</p>
                </div>

                <div :class="$style.configurationPreview">
                  <div
                    :class="[
                      example.kind === 'density'
                        ? $style.accordionSurfaceFlush
                        : $style.accordionSurface,
                    ]"
                  >
                    <div v-if="example.kind === 'expand'" :class="$style.accordionSurface">
                      <sgds-accordion class="demoAccordion">
                        <sgds-accordion-item open>
                          <span slot="header">What is design system?</span>
                          <div slot="content">
                            It is a shared set of principles, tokens, and components used to build consistent interfaces.
                          </div>
                        </sgds-accordion-item>
                        <sgds-accordion-item>
                          <span slot="header">How does the accordion behave?</span>
                          <div slot="content">Accordion content</div>
                        </sgds-accordion-item>
                        <sgds-accordion-item>
                          <span slot="header">Can multiple items open?</span>
                          <div slot="content">Accordion content</div>
                        </sgds-accordion-item>
                      </sgds-accordion>
                    </div>

                    <div v-else-if="example.kind === 'density'" :class="$style.densityDemoStack">
                      <div :class="$style.densityExample">
                        <sgds-accordion density="compact" class="demoAccordion">
                          <sgds-accordion-item>
                            <span slot="header">Compact</span>
                            <div slot="content">Accordion content</div>
                          </sgds-accordion-item>
                        </sgds-accordion>
                      </div>
                      <div :class="$style.densityExample">
                        <sgds-accordion class="demoAccordion">
                          <sgds-accordion-item>
                            <span slot="header">Default</span>
                            <div slot="content">Accordion content</div>
                          </sgds-accordion-item>
                        </sgds-accordion>
                      </div>
                    </div>

                    <div v-else-if="example.kind === 'slots'" :class="$style.densityDemoStack">
                      <div :class="$style.densityExample">
                        <sgds-accordion class="demoAccordion">
                          <sgds-accordion-item>
                            <div slot="header" :class="$style.headerWithLead">
                              <sgds-icon name="grid"></sgds-icon>
                              <span>With start slot</span>
                            </div>
                            <div slot="content">Accordion content</div>
                          </sgds-accordion-item>
                        </sgds-accordion>
                      </div>
                      <div :class="$style.densityExample">
                        <sgds-accordion class="demoAccordion">
                          <sgds-accordion-item>
                            <div slot="header" :class="$style.headerWithMeta">
                              <span>With end slot</span>
                              <sgds-badge variant="neutral">Badge</sgds-badge>
                            </div>
                            <div slot="content">Accordion content</div>
                          </sgds-accordion-item>
                        </sgds-accordion>
                      </div>
                    </div>

                    <div v-else :class="$style.accordionSurface">
                      <sgds-accordion class="demoAccordion">
                        <sgds-accordion-item>
                          <span slot="header">First item</span>
                          <div slot="content">Accordion content</div>
                        </sgds-accordion-item>
                        <sgds-accordion-item>
                          <span slot="header">Second item</span>
                          <div slot="content">Accordion content</div>
                        </sgds-accordion-item>
                        <sgds-accordion-item>
                          <span slot="header">Third item</span>
                          <div slot="content">Accordion content</div>
                        </sgds-accordion-item>
                      </sgds-accordion>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </Section>

          <Section title="Motion">
            <div :class="$style.measurementsGrid">
              <article :class="$style.measurementCard">
                <div :class="$style.measurementPreview">
                  <div :class="$style.motionDemoSurface">
                    <sgds-accordion class="demoAccordion">
                      <sgds-accordion-item>
                        <span slot="header">Accordion title 01</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                      <sgds-accordion-item open>
                        <span slot="header">Accordion title 02</span>
                        <div slot="content">
                          Accordion content. Use the built-in SGDS interaction so the height transition and chevron rotation stay consistent.
                        </div>
                      </sgds-accordion-item>
                      <sgds-accordion-item>
                        <span slot="header">Accordion title 03</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>
                </div>
              </article>

              <article :class="$style.infoCard">
                <div :class="$style.motionSpecsTable">
                  <div :class="[$style.motionSpecsRow, $style.motionSpecsHeader, 'sgds:font-semibold']">
                    <span>Element</span>
                    <span>Value</span>
                    <span>Duration</span>
                    <span>Easing</span>
                  </div>
                  <div
                    v-for="spec in motionSpecs"
                    :key="spec.element"
                    :class="$style.motionSpecsRow"
                  >
                    <span>{{ spec.element }}</span>
                    <span>{{ spec.value }}</span>
                    <span>{{ spec.duration }}</span>
                    <span>{{ spec.easing }}</span>
                  </div>
                </div>
              </article>
            </div>
          </Section>

          <Section title="Best practices">
            <div :class="$style.bestPracticesGrid">
              <article
                v-for="practice in bestPractices"
                :key="practice.title"
                :class="$style.bestPracticeCard"
              >
                <div :class="$style.bestPracticePreview">
                  <div v-if="practice.kind === 'clear-title'" :class="$style.accordionSurface">
                    <sgds-accordion class="demoAccordion">
                      <sgds-accordion-item>
                        <span slot="header">Application eligibility</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                      <sgds-accordion-item>
                        <span slot="header">Required documents</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>

                  <div v-else-if="practice.kind === 'long-title'" :class="$style.accordionSurface">
                    <sgds-accordion class="demoAccordion">
                      <sgds-accordion-item>
                        <span slot="header">This is a very long accordion title that makes the list harder to scan and understand quickly</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>

                  <div v-else-if="practice.kind === 'group-content'" :class="$style.accordionSurface">
                    <sgds-accordion class="demoAccordion">
                      <sgds-accordion-item>
                        <span slot="header">Payment details</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                      <sgds-accordion-item>
                        <span slot="header">Supporting information</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                      <sgds-accordion-item>
                        <span slot="header">Declarations</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>

                  <div v-else-if="practice.kind === 'nested'" :class="$style.accordionSurface">
                    <sgds-accordion class="demoAccordion">
                      <sgds-accordion-item open>
                        <span slot="header">Parent accordion</span>
                        <div slot="content">
                          <sgds-accordion class="demoAccordion">
                            <sgds-accordion-item>
                              <span slot="header">Nested accordion</span>
                              <div slot="content">Nested content</div>
                            </sgds-accordion-item>
                          </sgds-accordion>
                        </div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>

                  <div v-else-if="practice.kind === 'clear-feedback'" :class="$style.accordionSurface">
                    <sgds-accordion class="demoAccordion">
                      <sgds-accordion-item open>
                        <span slot="header">Expanded state</span>
                        <div slot="content">Visible content confirms the current state.</div>
                      </sgds-accordion-item>
                      <sgds-accordion-item>
                        <span slot="header">Collapsed state</span>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>

                  <div v-else :class="$style.accordionSurface">
                    <sgds-accordion class="demoAccordion">
                      <sgds-accordion-item>
                        <div slot="header" :class="$style.headerWithActions">
                          <span>Accordion title</span>
                          <div :class="$style.headerActions">
                            <sgds-icon-button name="pencil"></sgds-icon-button>
                            <sgds-icon-button name="trash"></sgds-icon-button>
                          </div>
                        </div>
                        <div slot="content">Accordion content</div>
                      </sgds-accordion-item>
                    </sgds-accordion>
                  </div>
                </div>

                <div :class="$style.bestPracticeCopy">
                  <div :class="$style.bestPracticeTone">
                    <sgds-icon
                      :name="practice.tone === 'do' ? 'check-circle-fill' : 'x-circle-fill'"
                      size="lg"
                    ></sgds-icon>
                    <h3 :class="[$style.bestPracticeTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ practice.title }}</h3>
                  </div>
                  <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ practice.description }}</p>
                </div>
              </article>
            </div>
          </Section>
        </div>
      </sgds-tab-panel>

      <sgds-tab-panel name="code">
        <article :class="$style.codeCard">
          <h3 :class="$style.cardTitle">Code example</h3>
          <pre :class="[$style.codeBlock, 'sgds:text-body-sm sgds:font-regular sgds:leading-20']"><code>&lt;sgds-accordion variant="border"&gt;
  &lt;sgds-accordion-item open&gt;
    &lt;span slot="header"&gt;Accordion title&lt;/span&gt;
    &lt;div slot="content"&gt;Accordion content&lt;/div&gt;
  &lt;/sgds-accordion-item&gt;
  &lt;sgds-accordion-item&gt;
    &lt;span slot="header"&gt;Accordion title&lt;/span&gt;
    &lt;div slot="content"&gt;Accordion content&lt;/div&gt;
  &lt;/sgds-accordion-item&gt;
&lt;/sgds-accordion&gt;</code></pre>
        </article>
      </sgds-tab-panel>

      <sgds-tab-panel name="accessibility">
        <article :class="$style.infoCard">
          <h3 :class="$style.cardTitle">Accessibility guidance</h3>
          <ul :class="$style.list">
            <li>Write headings that describe the hidden content clearly and uniquely.</li>
            <li>Keep interactive content inside expanded panels keyboard accessible.</li>
            <li>Use the built-in SGDS tab and accordion semantics so focus, ARIA, and keyboard handling stay consistent.</li>
          </ul>
        </article>
      </sgds-tab-panel>

      <sgds-tab-panel name="updates">
        <article :class="$style.infoCard">
          <h3 :class="$style.cardTitle">Latest updates</h3>
          <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">
            This page uses the current SGDS accordion and tab components, with examples aligned to the portal design reference.
          </p>
        </article>
      </sgds-tab-panel>
    </sgds-tab-group>
  </div>
</template>

<style module>
.page {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.tabGroup {
  display: block;
  position: relative;
  width: 100%;
}

.tabGroup::after {
  border-bottom: 1px solid var(--sgds-border-color-muted);
  bottom: 0;
  content: "";
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
}

.sectionStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-margin-5-xl);
  padding-top: var(--sgds-layout-gap-lg);
}

.panelStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
  padding-top: var(--sgds-layout-gap-lg);
}

.usageGuidanceStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
  max-width: var(--sgds-container-max-width-md);
}

.usageGuidanceBlock {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.usageGuidanceHeader {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xs);
}

.usageGuidanceTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
}

.purposeGrid {
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.measurementsGrid {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.configurationPreview,
.infoCard,
.codeCard,
.measurementCard,
.showcaseCard {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
}

.infoCard,
.codeCard,
.measurementCard {
  padding: var(--sgds-component-padding-md);
}

.cardTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
}

.measurementTitle {
  color: var(--sgds-body-color-subtle);
  margin: 0;
}

.cardBody,
.measurementDescription {
  color: var(--sgds-body-color-subtle);
  margin: 0;
  white-space: pre-line;
}

.purposeCard {
  display: flex;
  flex-direction: column;
  display: flex;
  gap: var(--sgds-gap-md);
  min-width: 0;
  padding: var(--sgds-padding-none);
}

.anatomyStack,
.configurationStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.showcaseCard {
  padding: var(--sgds-component-padding-md);
}

.anatomyPreview {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-inline: auto;
  width: 100%;
}

.anatomyImage {
  display: block;
  height: auto;
  max-width: 100%;
  width: min(100%, var(--sgds-dimension-512));
}

.anatomyImageDark {
  display: none;
}

:global(.sgds-night-theme) .anatomyImageLight {
  display: none;
}

:global(.sgds-night-theme) .anatomyImageDark {
  display: block;
}

.anatomyGrid {
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.anatomyColumn {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.configurationRow {
  align-items: start;
  display: grid;
  gap: var(--sgds-layout-gap-lg);
  grid-template-columns: minmax(0, 3fr) minmax(0, 5fr);
}

.configurationCopy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.configurationTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
}

.configurationPreview {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-288);
  padding: var(--sgds-component-padding-md);
}

.accordionSurface {
  background: transparent;
  max-width: var(--sgds-dimension-400);
  width: 100%;
  padding: var(--sgds-padding-none);
}

.accordionSurfaceFlush {
  background: transparent;
  max-width: var(--sgds-dimension-400);
  width: 100%;
}

.densityDemoStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
  width: 100%;
}

.demoAccordion {
  background: var(--sgds-surface-default);
  display: block;
}

.densityExample {
  background: transparent;
  padding: var(--sgds-padding-none);
  width: 100%;
}

.headerWithLead,
.headerWithMeta {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
  width: 100%;
}

.headerWithLead {
  color: var(--sgds-color-default);
}

.headerWithMeta {
  justify-content: space-between;
}

.headerWithActions {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.headerActions {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-2-xs);
}

.measurementCard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: var(--sgds-dimension-280);
  position: relative;
}

.infoCard,
.codeCard {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.list {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
  margin: 0;
  padding-left: var(--sgds-padding-lg);
}

.codeBlock {
  background: var(--sgds-bg-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  color: var(--sgds-body-color-default);
  margin: 0;
  overflow-x: auto;
  padding: var(--sgds-component-padding-md);
}

.measurementHeader {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  left: var(--sgds-component-padding-md);
  position: absolute;
  top: var(--sgds-component-padding-md);
  z-index: 1;
}

.measurementPreview {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  width: 100%;
}

.measurementImage {
  display: block;
  height: auto;
  max-width: 100%;
  width: min(100%, var(--sgds-dimension-688));
}

.measurementImageDark {
  display: none;
}

:global(.sgds-night-theme) .measurementImageLight {
  display: none;
}

:global(.sgds-night-theme) .measurementImageDark {
  display: block;
}

.motionDemoSurface {
  max-width: var(--sgds-dimension-400);
  width: 100%;
}

.motionSpecsTable {
  background: var(--sgds-bg-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  overflow: hidden;
}

.motionSpecsRow {
  color: var(--sgds-label-color-subtle);
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
  padding: var(--sgds-component-padding-md);
}

.motionSpecsRow + .motionSpecsRow {
  border-top: 1px solid var(--sgds-border-color-muted);
}

.motionSpecsHeader {
  background: var(--sgds-surface-default);
  color: var(--sgds-body-color-default);
}

.bestPracticesGrid {
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.bestPracticeCard {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
  overflow: hidden;
  padding: var(--sgds-component-padding-md);
}

.bestPracticePreview {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-320);
}

.bestPracticeCopy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.bestPracticeTone {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xs);
}

.bestPracticeTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
}

@media (max-width: 767px) {
  .purposeGrid {
    grid-template-columns: minmax(0, 1fr);
  }

  .anatomyGrid {
    grid-template-columns: minmax(0, 1fr);
  }

  .configurationRow {
    grid-template-columns: minmax(0, 1fr);
  }

  .configurationPreview {
    min-height: var(--sgds-dimension-320);
  }

  .motionSpecsRow,
  .bestPracticesGrid {
    grid-template-columns: minmax(0, 1fr);
  }

}

@media (min-width: 768px) and (max-width: 1023px) {
  .purposeGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
