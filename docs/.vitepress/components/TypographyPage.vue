<script setup lang="ts">
import FoundationPrinciplesList from "./foundations/FoundationPrinciplesList.vue";
import FoundationPrincipleTemplate from "./foundations/FoundationPrincipleTemplate.vue";
import Section from "./foundations/Section.vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";

const principles = [
  {
    title: "Legibility",
    body: "The ease with which one letterform can be distinguished from the next. It feeds into, but is not the same as, readability.",
  },
  {
    title: "Readability",
    body: "Readability refers to the ease with which a block of text can be scanned by eye.",
  },
  {
    title: "Scannability",
    body: "Scannability is the aggregate effect of writing and formatting techniques.",
  },
];

const rules = [
  {
    title: "Create contrast, skip one",
    body: "Contrast creates visual order, emphasis, and clarity. It should also be harmoniously different, different enough to create visual interest, but not compete with each other. To achieve that, skip at least one size, weight, and/or colour.",
  },
  {
    title: "Leading & tracking",
    body: "The larger and bolder the type, the smaller the tracking. Vice versa!",
  },
  {
    title: "Line length",
    body: "Line length is how many characters are on a single line of text. For longer body text, the ideal length is between 40 and 60 characters. For shorter lines of text, the ideal length is 20 to 40 characters.",
  },
  {
    title: "Alignment",
    body: "Left-aligned text is the most common setting for left-to-right languages such as English. The F-alignment describes the most common user eye-scanning pattern when it comes to blocks of content.",
  },
];

// Inter character specimen — mirrors the Figma design (SGDS v3 typography guidelines, node 3:8025)
const interSpecimen = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
  ["M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"],
  ["Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  ["k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v"],
  ["w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7"],
  ["8", "9", "!", "?", "@", "#", "%", "&", "{", "}", "+", "="],
];

// Font weight variants — content sourced from Figma (SGDS v3 typography guidelines, node 3:8171)
type DescriptionPart = { text: string; emphasised?: boolean };

type FontWeightVariant = {
  title: string;
  demoLabel: string;
  weightClass: string;
  descriptionParts: DescriptionPart[];
};

const fontWeights: FontWeightVariant[] = [
  {
    title: "Bold",
    demoLabel: "This is Inter Bold 700",
    weightClass: "typography-page__weight-demo-text--bold",
    descriptionParts: [
      { text: "Inter Bold can be used for " },
      { text: "ALL", emphasised: true },
      { text: " displays and headings." },
    ],
  },
  {
    title: "Semi Bold",
    demoLabel: "This is Inter Semi Bold 600",
    weightClass: "typography-page__weight-demo-text--semibold",
    descriptionParts: [
      { text: "Inter Semi Bold can be used for subtitles, labels and buttons but should " },
      { text: "NEVER", emphasised: true },
      { text: " be used for body copy." },
    ],
  },
  {
    title: "Regular",
    demoLabel: "This is Inter Regular 400",
    weightClass: "typography-page__weight-demo-text--regular",
    descriptionParts: [
      { text: "Inter Regular can be used for " },
      { text: "ALL", emphasised: true },
      { text: " body copy, long-form paragraph content, footnotes (such as terms and conditions text), captions and labels." },
    ],
  },
  {
    title: "Light",
    demoLabel: "This is Inter Light 300",
    weightClass: "typography-page__weight-demo-text--light",
    descriptionParts: [
      { text: "Inter Light can be used for displays, headings, subtitles and placeholder text but should " },
      { text: "NEVER", emphasised: true },
      { text: " be used for body copy." },
    ],
  },
];

// Type scale demo values — content sourced from Figma (SGDS v3 typography guidelines, node 3:8203)
const typeScaleSizes = [14, 16, 20, 24, 28, 32, 40, 48, 56];

// Type pairing examples — content sourced from Figma (SGDS v3 typography guidelines, node 3:8254)
type TypePairingExample = {
  title: string;
  description: string;
  formula: string;
  headingClass: string;
  bodyClass: string;
  gapPx: number;
  demoMinHeight: string;
};

const pairingBodyCopy =
  "An agency should consider using the privacy statement template appended below, and to only deviate from it when there are good reasons to do so.";

// Heading specs — content sourced from Figma (SGDS v3 typography guidelines, node 3:8341)
type HeadingSpec = {
  tag: string;
  label: string;
  sampleClass: string;
  styleName: string;
  size: string;
  weight: string;
  leading: string;
  tracking: string;
  case: string;
  marginBottom: string;
};

const headingSpecs: HeadingSpec[] = [
  {
    tag: "h1",
    label: "Heading 1 (h1)",
    sampleClass: "sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight sgds:m-0",
    styleName: "Heading extra large bold",
    size: "40/2.5",
    weight: "700",
    leading: "120%",
    tracking: "-0.4",
    case: "Sentence",
    marginBottom: "20/1.25",
  },
  {
    tag: "h2",
    label: "Heading 2 (h2)",
    sampleClass: "sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:m-0",
    styleName: "Heading large bold",
    size: "32/2",
    weight: "700",
    leading: "120%",
    tracking: "-0.4",
    case: "Sentence",
    marginBottom: "16/1",
  },
  {
    tag: "h3",
    label: "Heading 3 (h3)",
    sampleClass: "sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0",
    styleName: "Heading medium bold",
    size: "28/1.75",
    weight: "700",
    leading: "120%",
    tracking: "-0.4",
    case: "Sentence",
    marginBottom: "16/1",
  },
  {
    tag: "h4",
    label: "Heading 4 (h4)",
    sampleClass: "sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0",
    styleName: "Heading small bold",
    size: "24/1.5",
    weight: "700",
    leading: "120%",
    tracking: "-0.4",
    case: "Sentence",
    marginBottom: "16/1",
  },
  {
    tag: "h5",
    label: "Heading 5 (h5)",
    sampleClass: "sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0",
    styleName: "Subtitle medium semi bold",
    size: "20/1.25",
    weight: "600",
    leading: "120%",
    tracking: "0",
    case: "Sentence",
    marginBottom: "8/0.5",
  },
  {
    tag: "h6",
    label: "Heading 6 (h6)",
    sampleClass: "sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:m-0",
    styleName: "Subtitle small semi bold",
    size: "16/1",
    weight: "600",
    leading: "20/1.25",
    tracking: "0",
    case: "Sentence",
    marginBottom: "8/0.5",
  },
];

const typePairingExamples: TypePairingExample[] = [
  {
    title: "Pairing example A",
    description: "Display medium bold + Heading medium light (subheading)",
    formula: "48 / 4 = 12 px",
    headingClass:
      "sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:m-0",
    bodyClass:
      "sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight sgds:m-0",
    gapPx: 12,
    demoMinHeight: "sgds:min-h-[22rem]",
  },
  {
    title: "Pairing example B",
    description: "Heading large bold + Body large regular",
    formula: "32 / 4 = 8 px",
    headingClass:
      "sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight sgds:m-0",
    bodyClass:
      "sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:m-0",
    gapPx: 8,
    demoMinHeight: "sgds:min-h-[20rem]",
  },
  {
    title: "Pairing example C",
    description: "Subtitle small semibold + Body small regular",
    formula: "20 / 4 = 5 px ≈ 4 px",
    headingClass:
      "sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0",
    bodyClass:
      "sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:m-0",
    gapPx: 4,
    demoMinHeight: "sgds:min-h-[18rem]",
  },
  {
    title: "Pairing example D",
    description: "Label medium semibold + caption regular",
    formula: "16 / 4 = 4 px",
    headingClass:
      "sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0",
    bodyClass:
      "sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:m-0",
    gapPx: 4,
    demoMinHeight: "sgds:min-h-[18rem]",
  },
];
</script>

<template>
  <TypographyPageTemplate stacked-examples>
    <FoundationPrincipleTemplate>
      <FoundationPrinciplesList :principles="principles" />
      <FoundationPrinciplesList title="Rules and guide" :principles="rules" />

      <Section title="Typeface">
        <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
            Inter is a typeface carefully crafted &amp; designed for computer screens. Inter features a tall x-height to aid in readability of mixed-case and lower-case text.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
            Each set of weights serve a different purpose.
          </p>
          <a
            class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal"
            href="https://rsms.me/inter/"
            target="_blank"
            rel="noreferrer"
          >
            Download Inter
          </a>
          <figure
            class="typography-page__specimen sgds:mt-layout-sm"
            aria-label="Inter character specimen — uppercase, lowercase, numerals, and punctuation"
          >
            <div class="typography-page__specimen-grid">
              <div
                v-for="char in interSpecimen.flat()"
                :key="char"
                class="typography-page__specimen-cell"
              >
                <span class="typography-page__specimen-char">{{ char }}</span>
              </div>
            </div>
          </figure>
        </div>
      </Section>

      <Section title="Font weight">
        <div class="typography-page-template__body">
          <article
            v-for="variant in fontWeights"
            :key="variant.title"
            class="typography-page-template__split-row"
          >
            <div class="typography-page-template__copy-pane">
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                {{ variant.title }}
              </h5>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <template v-for="(part, index) in variant.descriptionParts" :key="index">
                  <strong v-if="part.emphasised" class="sgds:font-semibold sgds:text-default">{{ part.text }}</strong>
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
            </div>

            <div class="typography-page-template__demo-pane">
              <div
                class="typography-page-template__card typography-page__weight-demo sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[15rem] sgds:p-layout-md"
              >
                <p
                  :class="[
                    'typography-page__weight-demo-text',
                    variant.weightClass,
                    'sgds:text-heading-lg sgds:leading-lg sgds:tracking-tight sgds:m-0',
                  ]"
                >
                  {{ variant.demoLabel }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Section title="Type system">
        <div class="typography-page-template__body">
          <div class="typography-page-template__copy-block">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              The type system includes a range of contrasting styles that support the needs of your product and its content.
            </p>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              The type scale is a combination of 40 styles that are supported by the type system. It contains reusable categories of text, each with an intended application and meaning.
            </p>
          </div>

          <article class="typography-page-template__split-row">
            <div class="typography-page-template__copy-pane">
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                Base size
              </h5>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                The default text size in browsers is 16px/1rem.
              </p>
            </div>
            <div class="typography-page-template__demo-pane">
              <div
                class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[15rem] sgds:p-layout-md"
              >
                <div class="typography-page__base-size-band">
                  <div class="typography-page__base-size-group">
                    <span class="typography-page__base-size-number">16</span>
                    <span class="typography-page__base-size-tick" aria-hidden="true"></span>
                    <span class="typography-page__base-size-label sgds:text-label-sm sgds:font-regular sgds:tracking-normal">
                      16 px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article class="typography-page-template__split-row">
            <div class="typography-page-template__copy-pane">
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                Type scale aspect ratio
              </h5>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                The aspect ratio of the type system is Minor Third (1.200).
              </p>
            </div>
            <div class="typography-page-template__demo-pane">
              <div
                class="typography-page-template__card typography-page__scale-card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[15rem] sgds:p-layout-md"
              >
                <div class="typography-page__scale-row">
                  <span
                    v-for="size in typeScaleSizes"
                    :key="size"
                    class="typography-page__scale-value sgds:text-default sgds:font-bold sgds:tracking-tight"
                    :style="{ fontSize: size + 'px' }"
                  >
                    {{ size }}
                  </span>
                </div>
              </div>
            </div>
          </article>

          <article class="typography-page-template__split-row">
            <div class="typography-page-template__copy-pane">
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                Line height aspect ratio
              </h5>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                In the type system there is 2 aspect ratio for the line height:
              </p>
              <ol class="sgds:list-decimal sgds:pl-6 sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-2-xs">
                <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:mt-0">
                  Minor third (1.200) for Displays, Headings and Subtitles
                </li>
                <li class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:mt-0">
                  Perfect Fifth (1.500) for Bodys, Labels, Caption and Overline
                </li>
              </ol>
            </div>
            <div class="typography-page-template__demo-pane">
              <div
                class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[15rem] sgds:p-layout-md"
              >
                <div class="typography-page__heading-band">
                  <div class="typography-page__heading-rules" aria-hidden="true">
                    <span class="typography-page__heading-rule typography-page__heading-rule--cap"></span>
                    <span class="typography-page__heading-rule typography-page__heading-rule--baseline"></span>
                    <span class="typography-page__heading-rule typography-page__heading-rule--foot"></span>
                  </div>
                  <div class="typography-page__heading-row">
                    <span class="typography-page__heading-small-label">Baseline</span>
                    <span class="typography-page__heading-text">Heading</span>
                    <span class="typography-page__heading-tick" aria-hidden="true"></span>
                    <span class="typography-page__heading-small-label">52 px</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Section title="Type pairing">
        <div class="typography-page-template__body">
          <div class="typography-page-template__copy-block">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              SGDS has developed a pairing formula and the formula is the only pairing option that is allowed in system communications.
            </p>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
              Never pair two weights that are one grade away from each other. For example, Bold and Regular.
            </p>
          </div>

          <article class="typography-page-template__split-row">
            <div class="typography-page-template__copy-pane">
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                Spacing formula
              </h5>
              <div class="typography-page__formula-chip">
                <code class="sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Font size / 4
                </code>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Example: 28 / 4 = 7 ≈ 8 px (round up to nearest system spacing)
              </p>
            </div>
            <div class="typography-page-template__demo-pane">
              <div
                class="typography-page-template__card sgds:flex sgds:items-center sgds:justify-center sgds:min-h-[15rem] sgds:p-layout-md"
              >
                <div class="typography-page__pairing">
                  <span class="typography-page__pairing-side-label">font size 28px</span>
                  <p class="typography-page__pairing-heading sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">
                    This is a header
                  </p>

                  <div class="typography-page__pairing-meter">
                    <span class="typography-page__pairing-meter-label">8 px</span>
                    <span
                      class="typography-page__pairing-tick"
                      aria-hidden="true"
                      :style="{ height: '8px' }"
                    ></span>
                  </div>
                  <div
                    class="typography-page__pairing-bar"
                    aria-hidden="true"
                    :style="{ height: '8px' }"
                  ></div>

                  <p class="typography-page__pairing-body sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    This is a body
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Section title="Type pairing example" heading-level="h4">
        <div class="typography-page-template__body">
          <article
            v-for="example in typePairingExamples"
            :key="example.title"
            class="typography-page-template__split-row"
          >
            <div class="typography-page-template__copy-pane">
              <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                {{ example.title }}
              </h5>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                {{ example.description }}
              </p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
                {{ example.formula }}
              </p>
            </div>
            <div class="typography-page-template__demo-pane">
              <div
                :class="[
                  'typography-page-template__card',
                  'typography-page__pairing-demo',
                  'sgds:flex sgds:items-center sgds:justify-center sgds:p-layout-lg',
                  example.demoMinHeight,
                ]"
              >
                <div class="typography-page__pairing">
                  <span></span>
                  <p :class="['typography-page__pairing-heading', example.headingClass]">Introduction</p>

                  <div class="typography-page__pairing-meter">
                    <span class="typography-page__pairing-meter-label">{{ example.gapPx }} px</span>
                    <span
                      class="typography-page__pairing-tick"
                      aria-hidden="true"
                      :style="{ height: example.gapPx + 'px' }"
                    ></span>
                  </div>
                  <div
                    class="typography-page__pairing-bar"
                    aria-hidden="true"
                    :style="{ height: example.gapPx + 'px' }"
                  ></div>

                  <p :class="['typography-page__pairing-body', example.bodyClass]">{{ pairingBodyCopy }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Section title="Heading">
        <div class="typography-heading-table">
          <div class="typography-heading-table__header">
            <div class="typography-heading-table__col-sample" aria-hidden="true"></div>
            <div class="typography-heading-table__col-style">Style name</div>
            <div class="typography-heading-table__col-cell">
              <span>Size</span>
              <span>(px/em)</span>
            </div>
            <div class="typography-heading-table__col-cell">Weight</div>
            <div class="typography-heading-table__col-cell">
              <span>Leading</span>
              <span>(px/rem)</span>
            </div>
            <div class="typography-heading-table__col-cell">
              <span>Tracking</span>
              <span>(px)</span>
            </div>
            <div class="typography-heading-table__col-cell">Case</div>
            <div class="typography-heading-table__col-margin">
              <span>Margin (bottom)</span>
              <span>(px/em)</span>
            </div>
          </div>
          <div
            v-for="row in headingSpecs"
            :key="row.tag"
            class="typography-heading-table__row"
          >
            <div class="typography-heading-table__col-sample">
              <component :is="row.tag" :class="row.sampleClass">{{ row.label }}</component>
            </div>
            <div class="typography-heading-table__col-style typography-heading-table__cell-text">{{ row.styleName }}</div>
            <div class="typography-heading-table__col-cell typography-heading-table__cell-text">{{ row.size }}</div>
            <div class="typography-heading-table__col-cell typography-heading-table__cell-text">{{ row.weight }}</div>
            <div class="typography-heading-table__col-cell typography-heading-table__cell-text">{{ row.leading }}</div>
            <div class="typography-heading-table__col-cell typography-heading-table__cell-text">{{ row.tracking }}</div>
            <div class="typography-heading-table__col-cell typography-heading-table__cell-text">{{ row.case }}</div>
            <div class="typography-heading-table__col-margin typography-heading-table__cell-text">{{ row.marginBottom }}</div>
          </div>
        </div>
      </Section>
    </FoundationPrincipleTemplate>
  </TypographyPageTemplate>
</template>

<style scoped>
/* Inter character specimen — dark-panel grid that mirrors the Figma design.
 * Raw CSS is used for the fixed dark colour values (#222 panel, #565656 cell borders)
 * because this is a designed specimen surface that should render the same in day and
 * night themes (no token equivalents exist for "always-dark specimen chrome"). */
.typography-page__specimen {
  background: #222222;
  border-radius: var(--sgds-border-radius-2-xl);
  box-sizing: border-box;
  margin: 0;
  padding: var(--sgds-layout-padding-lg);
  width: 100%;
}

.typography-page__specimen-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  outline: 1px solid #565656;
}

.typography-page__specimen-cell {
  align-items: center;
  aspect-ratio: 1 / 1;
  box-shadow: 0 0 0 1px #565656;
  display: flex;
  justify-content: center;
}

.typography-page__specimen-char {
  color: #ffffff;
  font-family: var(--sgds-font-family-primary, "Inter", sans-serif);
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

@media (max-width: 1023px) {
  .typography-page__specimen {
    padding: var(--sgds-layout-padding-md);
  }

  .typography-page__specimen-char {
    font-size: 1.75rem;
  }
}

@media (max-width: 600px) {
  .typography-page__specimen-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .typography-page__specimen-char {
    font-size: 1.5rem;
  }
}

/* Font weight demo — fixed font-weight values sit outside the sgds: utility set,
 * so they are expressed as raw CSS. Visual surface still uses SGDS tokens. */
.typography-page__weight-demo {
  text-align: center;
}

.typography-page__weight-demo-text {
  color: var(--sgds-body-color-default);
}

.typography-page__weight-demo-text--bold {
  font-weight: 700;
}

.typography-page__weight-demo-text--semibold {
  font-weight: 600;
}

.typography-page__weight-demo-text--regular {
  font-weight: 400;
}

.typography-page__weight-demo-text--light {
  font-weight: 300;
}

/* Type system: Base size demo — replicates the Figma measurement diagram:
 * a "16" glyph sitting between two full-width dashed baseline guides, with a
 * vertical tick + "16 px" size label to its right. Raw CSS is used because
 * dashed borders, pseudo-element ticks, and the pass-through baseline band
 * have no sgds: utility equivalents. */
.typography-page__base-size-band {
  align-items: center;
  border-bottom: 1px dashed var(--sgds-border-color-muted);
  border-top: 1px dashed var(--sgds-border-color-muted);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
}

.typography-page__base-size-group {
  align-items: center;
  display: flex;
  gap: 0.75rem;
}

.typography-page__base-size-number {
  color: var(--sgds-body-color-default);
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  /* Negative vertical margins trim the glyph's built-in line-box so the dashed
   * baseline guides hug the cap-height and baseline of the "16" exactly. */
  margin-block: -0.125em;
}

.typography-page__base-size-tick {
  display: inline-block;
  height: 3.5rem;
  position: relative;
  width: 7px;
}

.typography-page__base-size-tick::before {
  background: var(--sgds-body-color-default);
  content: "";
  inset-block: 0;
  left: calc(50% - 0.5px);
  position: absolute;
  width: 1px;
}

.typography-page__base-size-tick::after {
  border-bottom: 1px solid var(--sgds-body-color-default);
  border-top: 1px solid var(--sgds-body-color-default);
  content: "";
  inset: 0;
  position: absolute;
}

.typography-page__base-size-label {
  color: var(--sgds-body-color-default);
}

/* Type system: Type scale demo — 9 bold glyphs (14–56 px) baseline-aligned in a
 * single row with a 12 px gap, matching the Figma specimen. The card allows
 * horizontal scrolling on narrow viewports instead of wrapping so the progression
 * reads as one continuous ramp. */
.typography-page__scale-card {
  overflow-x: auto;
}

.typography-page__scale-row {
  align-items: baseline;
  display: inline-flex;
  gap: 12px;
  justify-content: center;
  white-space: nowrap;
}

.typography-page__scale-value {
  line-height: 1;
}

/* Type system: Line height demo — "Heading" sample flanked by three dashed rules
 * (cap-top, baseline, descender), a left-side "Baseline" label, and a right-side
 * vertical tick + "52 px" label. Mirrors the Figma measurement diagram. Raw CSS is
 * used because dashed borders, pseudo-element ticks, and percentage-offset rules
 * have no sgds: utility equivalents. */
.typography-page__heading-band {
  /* Baseline ratio for Inter at the sample font-size/line-height. 65 / 84 ≈ 0.774 */
  --heading-baseline: 77.4%;
  position: relative;
  width: 100%;
}

.typography-page__heading-rules {
  inset: 0;
  pointer-events: none;
  position: absolute;
}

.typography-page__heading-rule {
  border-top: 1px dashed var(--sgds-border-color-muted);
  left: 0;
  position: absolute;
  right: 0;
}

.typography-page__heading-rule--cap {
  top: 0;
}

.typography-page__heading-rule--baseline {
  top: var(--heading-baseline);
}

.typography-page__heading-rule--foot {
  bottom: 0;
}

.typography-page__heading-row {
  align-items: baseline;
  column-gap: 1rem;
  display: flex;
  justify-content: center;
  position: relative;
}

.typography-page__heading-text {
  color: var(--sgds-body-color-default);
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3125; /* 84 / 64 — matches the Figma Heading sample */
  margin: 0;
}

.typography-page__heading-small-label {
  color: var(--sgds-body-color-default);
  font-size: 0.75rem;
  letter-spacing: normal;
  line-height: 1;
}

.typography-page__heading-tick {
  align-self: center;
  display: inline-block;
  height: 4.59375rem; /* = 3.5rem font-size × 1.3125 line-height */
  position: relative;
  width: 7px;
}

.typography-page__heading-tick::before {
  background: var(--sgds-body-color-default);
  content: "";
  inset-block: 0;
  left: calc(50% - 0.5px);
  position: absolute;
  width: 1px;
}

.typography-page__heading-tick::after {
  border-bottom: 1px solid var(--sgds-body-color-default);
  border-top: 1px solid var(--sgds-body-color-default);
  content: "";
  inset: 0;
  position: absolute;
}

/* Type pairing: spacing-formula chip — translucent-subtle backgrounded code token.
 * Raw CSS is used for the translucent token fill because no sgds: utility maps
 * directly to `--sgds-bg-translucent-subtle`. */
.typography-page__formula-chip {
  align-self: flex-start;
  background: var(--sgds-bg-translucent-subtle);
  border-radius: var(--sgds-border-radius-sm);
  display: inline-flex;
  padding: var(--sgds-spacer-2) var(--sgds-spacer-3);
}

.typography-page__formula-chip code {
  font-family: var(--sgds-font-family-mono);
}

/* Type pairing demos — centre-align the sample column inside the card so long
 * body copy wraps gracefully without stretching across the full card width. */
.typography-page__pairing-demo {
  box-sizing: border-box;
}

/* Shared pairing sample — two-column grid where the left column carries the
 * annotations ("font size 28px" / "N px" labels and the vertical tick) and
 * the right column carries the text pair with a gray translucent gap bar in
 * between. Mirrors the Figma measurement diagram for Spacing formula and
 * Pairing examples A–D. */
.typography-page__pairing {
  box-sizing: border-box;
  column-gap: 8px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  max-width: 32rem;
  width: 100%;
}

.typography-page__pairing > p {
  margin: 0;
}

/* Row 1: optional side-label (col 1) + heading (col 2), baseline-aligned. */
.typography-page__pairing-side-label {
  align-self: baseline;
  color: var(--sgds-body-color-default);
  font-size: 12px;
  grid-column: 1;
  grid-row: 1;
  justify-self: end;
  line-height: 1;
  white-space: nowrap;
}

.typography-page__pairing-heading {
  align-self: baseline;
  grid-column: 2;
  grid-row: 1;
}

/* Row 2: gap meter (col 1) + gray gap bar (col 2), centre-aligned vertically. */
.typography-page__pairing-meter {
  align-items: center;
  align-self: center;
  column-gap: 6px;
  display: inline-flex;
  grid-column: 1;
  grid-row: 2;
  justify-self: end;
  white-space: nowrap;
}

.typography-page__pairing-meter-label {
  color: var(--sgds-body-color-default);
  font-size: 12px;
  line-height: 1;
}

.typography-page__pairing-tick {
  display: inline-block;
  flex-shrink: 0;
  position: relative;
  width: 7px;
}

.typography-page__pairing-tick::before {
  background: var(--sgds-body-color-default);
  content: "";
  inset-block: 0;
  left: calc(50% - 0.5px);
  position: absolute;
  width: 1px;
}

.typography-page__pairing-tick::after {
  border-bottom: 1px solid var(--sgds-body-color-default);
  border-top: 1px solid var(--sgds-body-color-default);
  content: "";
  inset: 0;
  position: absolute;
}

.typography-page__pairing-bar {
  background: rgba(217, 217, 217, 0.25);
  grid-column: 2;
  grid-row: 2;
  width: 100%;
}

/* Row 3: body only in col 2. */
.typography-page__pairing-body {
  grid-column: 2;
  grid-row: 3;
}

@media (max-width: 767px) {
  .typography-page__base-size-number {
    font-size: 3rem;
  }

  .typography-page__base-size-tick {
    height: 2.5rem;
  }

  .typography-page__heading-text {
    font-size: 2.75rem;
  }

  .typography-page__heading-tick {
    height: calc(2.75rem * 1.3125);
  }
}

/* ── Heading specs table ─────────────────────────────────────────────────
 * Renders the h1–h6 specification from the Figma reference
 * (SGDS v3 typography guidelines, node 3:8341). Custom grid table — each
 * column has a fixed/flex width that mirrors the design, with a rounded
 * translucent header row and dotted-grey row dividers. */
.typography-heading-table {
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
}

.typography-heading-table__header,
.typography-heading-table__row {
  box-sizing: border-box;
  display: grid;
  gap: var(--sgds-gap-lg);
  grid-template-columns: minmax(12rem, 17.5rem) minmax(10rem, 15rem) repeat(5, minmax(4.5rem, 5rem)) minmax(6rem, 1fr);
  padding: var(--sgds-padding-lg);
  width: 100%;
}

.typography-heading-table__header {
  background: var(--sgds-bg-translucent-subtle);
  color: var(--sgds-body-color-subtle);
  font-family: var(--sgds-font-family-base);
  font-size: var(--sgds-font-size-overline-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-wide);
  line-height: var(--sgds-line-height-2-xs);
  text-transform: uppercase;
}

.typography-heading-table__row {
  align-items: center;
  background: var(--sgds-bg-default);
  border-top: 1px solid var(--sgds-border-color-muted);
  min-block-size: 6rem;
}

.typography-heading-table__cell-text {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-base);
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.typography-heading-table__col-cell,
.typography-heading-table__col-margin,
.typography-heading-table__col-style,
.typography-heading-table__col-sample {
  display: flex;
  flex-direction: column;
  min-inline-size: 0;
}

.typography-heading-table__col-cell span,
.typography-heading-table__col-margin span {
  display: block;
}

@media (max-width: 1023px) {
  .typography-heading-table__header,
  .typography-heading-table__row {
    grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr);
    gap: var(--sgds-gap-sm) var(--sgds-gap-md);
    padding: var(--sgds-padding-md);
  }

  .typography-heading-table__header > * + * {
    display: none;
  }

  .typography-heading-table__row > * + * {
    min-width: 0;
  }
}
</style>
