<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import CodeToken from "./ui/CodeToken.vue";
import { typographyStyleSections, aliasToUtility } from "../data/typography-style-tokens";

const sectionUsageCopy: Record<string, string> = {
  display:
    "Display styles are used for <strong>the most prominent text on a page</strong>, such as <strong>hero headings, landing page statements, and other moments where strong visual emphasis is needed</strong>.",
  heading:
    "Heading styles are used to <strong>organise page structure and content hierarchy</strong>. They work best for <strong>section titles, page headers, and other navigational or structural headings</strong>.",
  subtitle:
    "Subtitle styles are used for <strong>secondary headings and supporting titles</strong>. They help <strong>introduce a section or group related content without competing with primary headings</strong>.",
  "paragraph-body":
    "Paragraph body styles are used for <strong>reading content</strong> such as <strong>paragraphs, supporting explanations, and longer descriptive text where clarity and reading comfort matter most</strong>.",
  caption:
    "Caption styles are used for <strong>supporting text such as image captions, helper notes, metadata, and other supplementary content</strong> that should stay present but understated.",
  label:
    "Label styles are used for <strong>interface text tied to controls and UI elements</strong>, including <strong>field labels, button labels, chips, and other short functional text</strong>.",
  link:
    "Link styles are used for <strong>interactive text within content and interface patterns</strong>. They should stay <strong>visually aligned with surrounding typography while remaining clearly actionable</strong>.",
  list:
    "List styles are used for <strong>structured content such as bullets, numbered steps, and grouped information</strong>. They should align with <strong>paragraph body styles so lists feel consistent within reading content</strong>.",
  overline:
    "Overline styles are used for <strong>short categorical labels and compact pre-heading text</strong>. They help <strong>introduce a section or content type without taking on the weight of a full heading</strong>.",
};

const sectionUsageHeadingLabel: Record<string, string> = {
  display: "display",
  heading: "heading",
  subtitle: "subtitle",
  "paragraph-body": "paragraph body",
  caption: "caption",
  label: "label",
  link: "link",
  list: "list",
  overline: "overline",
};

const fontSizeValues: Record<string, string> = {
  "--sgds-font-size-display-lg": "40px / 52px / 56px",
  "--sgds-font-size-display-md": "36px / 44px / 48px",
  "--sgds-font-size-display-sm": "32px / 36px / 40px",
  "--sgds-font-size-heading-xl": "32px / 36px / 40px",
  "--sgds-font-size-heading-lg": "28px / 30px / 32px",
  "--sgds-font-size-heading-md": "24px / 26px / 28px",
  "--sgds-font-size-heading-sm": "20px / 22px / 24px",
  "--sgds-font-size-subtitle-md": "18px / 20px / 20px",
  "--sgds-font-size-subtitle-sm": "16px",
  "--sgds-font-size-body-lg": "18px / 20px / 20px",
  "--sgds-font-size-body-md": "16px",
  "--sgds-font-size-body-sm": "14px",
  "--sgds-font-size-label-lg": "18px / 20px / 20px",
  "--sgds-font-size-label-md": "16px",
  "--sgds-font-size-label-sm": "14px",
  "--sgds-font-size-label-xs": "12px",
  "--sgds-font-size-caption-md": "14px",
  "--sgds-font-size-overline-md": "14px",
  "--sgds-font-size-link-lg": "18px / 20px / 20px",
  "--sgds-font-size-link-md": "16px",
  "--sgds-font-size-link-sm": "14px",
  "--sgds-font-size-link-xs": "12px",
};

const fontWeightValues: Record<string, string> = {
  "--sgds-font-weight-light": "300",
  "--sgds-font-weight-regular": "400",
  "--sgds-font-weight-semibold": "600",
  "--sgds-font-weight-bold": "700",
};

const lineHeightValues: Record<string, string> = {
  "--sgds-line-height-3-xs": "16px",
  "--sgds-line-height-2-xs": "20px",
  "--sgds-line-height-xs": "24px",
  "--sgds-line-height-sm": "24px / 28px / 28px",
  "--sgds-line-height-md": "28px / 32px / 32px",
  "--sgds-line-height-lg": "32px / 36px / 40px",
  "--sgds-line-height-xl": "40px / 44px / 48px",
  "--sgds-line-height-2-xl": "44px / 52px / 56px",
  "--sgds-line-height-3-xl": "48px / 60px / 64px",
};

const letterSpacingValues: Record<string, string> = {
  "--sgds-letter-spacing-tighter": "-1px",
  "--sgds-letter-spacing-tight": "-0.4px",
  "--sgds-letter-spacing-normal": "0px",
  "--sgds-letter-spacing-wide": "1px",
  "--sgds-letter-spacing-wider": "2px",
};

const getUtilityTooltipContent = (alias: string) => {
  if (alias === "sgds:list-disc") {
    return "List style: Bullet marker";
  }

  if (alias === "sgds:list-decimal") {
    return "List style: Numbered marker";
  }

  if (alias === "sgds:list-none") {
    return "List style: No marker";
  }

  if (alias.startsWith("--sgds-font-size-")) {
    return `Font size: ${fontSizeValues[alias] ?? alias}`;
  }

  if (alias.startsWith("--sgds-font-weight-")) {
    return `Font weight: ${fontWeightValues[alias] ?? alias}`;
  }

  if (alias.startsWith("--sgds-line-height-")) {
    return `Line height: ${lineHeightValues[alias] ?? alias}`;
  }

  if (alias.startsWith("--sgds-letter-spacing-")) {
    return `Letter spacing: ${letterSpacingValues[alias] ?? alias}`;
  }

  return "Utility: Applies one part of the typography style";
};

const props = defineProps<{
  sectionKeys: string[];
}>();

const sections = typographyStyleSections.filter((section) => props.sectionKeys.includes(section.key));
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__body typography-page-template__body--prose">
        <section
          v-for="section in sections"
          :key="section.key"
          :id="section.key"
          :class="$style.styleSection"
        >
          <div :class="$style.styleSectionCopy">
            <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">
              When to use {{ sectionUsageHeadingLabel[section.key] }}
            </h2>

            <p
              class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              v-html="sectionUsageCopy[section.key]"
            />
          </div>

          <sgds-table tableBorder headerBackground responsive="always" :class="$style.typeTokenTable">
            <sgds-table-row>
              <sgds-table-head>Token name</sgds-table-head>
              <sgds-table-head>Example</sgds-table-head>
              <sgds-table-head>SGDS utility</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row
              v-for="row in section.rows"
              :key="row.tokenNames.join('-')"
              :class="{ [$style.defaultRow]: Boolean(row.note) }"
            >
              <sgds-table-cell>
                <div :class="$style.tokenNameCell">
                  <sgds-badge v-if="row.note" variant="primary">Default</sgds-badge>
                  <CodeToken
                    v-for="tokenName in row.tokenNames"
                    :key="tokenName"
                    :label="tokenName"
                  />
                </div>
              </sgds-table-cell>
              <sgds-table-cell>
                <p :class="[$style.tokenExample, ($style as Record<string, string>)[row.exampleClass]]">
                  {{ row.example }}
                </p>
              </sgds-table-cell>
              <sgds-table-cell>
                <div :class="$style.aliasList">
                  <sgds-tooltip
                    v-for="alias in row.aliases"
                    :key="`${row.tokenNames.join('-')}-${alias}-utility`"
                    :content="getUtilityTooltipContent(alias)"
                    placement="top"
                  >
                    <span :class="$style.utilityTooltipTarget" tabindex="0">
                      <CodeToken :label="aliasToUtility(alias)" />
                    </span>
                  </sgds-tooltip>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </section>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style module>
.styleSection {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
}

.styleSectionCopy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
}

.typeTokenTable {
  width: 100%;
}

.defaultRow {
  background: var(--sgds-bg-translucent-subtle);
}

.tokenNameCell,
.aliasList {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}

.tokenNameCell {
  gap: var(--sgds-text-gap-xs);
}

.aliasList {
  gap: var(--sgds-gap-xs);
}

.utilityTooltipTarget {
  display: inline-block;
}

.utilityTooltipTarget:focus-visible {
  border-radius: var(--sgds-border-radius-sm);
  outline: var(--sgds-border-width-2) solid var(--sgds-focus-ring-color);
  outline-offset: var(--sgds-focus-ring-offset);
}

.tokenExample {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  letter-spacing: var(--sgds-letter-spacing-tighter);
  margin: 0;
}

.tokenExampleDisplayLgBold {
  font-size: var(--sgds-font-size-display-lg);
  font-weight: var(--sgds-font-weight-bold);
  line-height: var(--sgds-line-height-3-xl);
}

.tokenExampleDisplayLgLight {
  font-size: var(--sgds-font-size-display-lg);
  font-weight: var(--sgds-font-weight-light);
  line-height: var(--sgds-line-height-3-xl);
}

.tokenExampleDisplayMdBold {
  font-size: var(--sgds-font-size-display-md);
  font-weight: var(--sgds-font-weight-bold);
  line-height: var(--sgds-line-height-2-xl);
}

.tokenExampleDisplayMdLight {
  font-size: var(--sgds-font-size-display-md);
  font-weight: var(--sgds-font-weight-light);
  line-height: var(--sgds-line-height-2-xl);
}

.tokenExampleDisplaySmBold {
  font-size: var(--sgds-font-size-display-sm);
  font-weight: var(--sgds-font-weight-bold);
  line-height: var(--sgds-line-height-xl);
}

.tokenExampleDisplaySmLight {
  font-size: var(--sgds-font-size-display-sm);
  font-weight: var(--sgds-font-weight-light);
  line-height: var(--sgds-line-height-xl);
}

.tokenExampleHeadingXlBold {
  font-size: var(--sgds-font-size-heading-xl);
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-xl);
}

.tokenExampleHeadingXlLight {
  font-size: var(--sgds-font-size-heading-xl);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-xl);
}

.tokenExampleHeadingLgBold {
  font-size: var(--sgds-font-size-heading-lg);
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-lg);
}

.tokenExampleHeadingLgLight {
  font-size: var(--sgds-font-size-heading-lg);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-lg);
}

.tokenExampleHeadingMdSemibold {
  font-size: var(--sgds-font-size-heading-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-md);
}

.tokenExampleHeadingMdLight {
  font-size: var(--sgds-font-size-heading-md);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-md);
}

.tokenExampleHeadingSmSemibold {
  font-size: var(--sgds-font-size-heading-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-sm);
}

.tokenExampleHeadingSmLight {
  font-size: var(--sgds-font-size-heading-sm);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-sm);
}

.tokenExampleSubtitleMdSemibold {
  font-size: var(--sgds-font-size-subtitle-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleSubtitleMdLight {
  font-size: var(--sgds-font-size-subtitle-md);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleSubtitleSmSemibold {
  font-size: var(--sgds-font-size-subtitle-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.tokenExampleSubtitleSmLight {
  font-size: var(--sgds-font-size-subtitle-sm);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.tokenExampleBodyLgSemibold {
  font-size: var(--sgds-font-size-body-lg);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.tokenExampleBodyLgRegular {
  font-size: var(--sgds-font-size-body-lg);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.tokenExampleBodyMdSemibold {
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleBodyMdRegular {
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleBodySmSemibold {
  font-size: var(--sgds-font-size-body-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.tokenExampleBodySmRegular {
  font-size: var(--sgds-font-size-body-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.tokenExampleLabelLgSemibold {
  font-size: var(--sgds-font-size-label-lg);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.tokenExampleLabelLgRegular {
  font-size: var(--sgds-font-size-label-lg);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.tokenExampleLabelMdSemibold {
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleLabelMdRegular {
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleLabelMdLight {
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleLabelSmSemibold {
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.tokenExampleLabelSmRegular {
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.tokenExampleLabelXsSemibold {
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.tokenExampleLabelXsRegular {
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.tokenExampleCaptionSemibold {
  font-size: var(--sgds-font-size-caption);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.tokenExampleCaptionRegular {
  font-size: var(--sgds-font-size-caption);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.tokenExampleOverlineSemibold {
  font-size: var(--sgds-font-size-overline);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
  text-transform: uppercase;
}

.tokenExampleOverlineRegular {
  font-size: var(--sgds-font-size-overline);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
  text-transform: uppercase;
}

.tokenExampleLinkLgRegular {
  font-size: var(--sgds-font-size-link-lg);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.tokenExampleLinkMdRegular {
  font-size: var(--sgds-font-size-link-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleLinkSmRegular {
  font-size: var(--sgds-font-size-link-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.tokenExampleLinkXsRegular {
  font-size: var(--sgds-font-size-link-xs);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.tokenExampleListUnordered,
.tokenExampleListOrdered,
.tokenExampleListUnstyled {
  display: list-item;
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.tokenExampleListUnordered {
  list-style-type: disc;
  margin-inline-start: var(--sgds-gap-lg);
}

.tokenExampleListOrdered {
  list-style-type: decimal;
  margin-inline-start: var(--sgds-gap-lg);
}

.tokenExampleListUnstyled {
  list-style-type: none;
}
</style>
