<script setup lang="ts">
import { ref } from "vue";
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
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

const copiedSnippetKey = ref<string | null>(null);

const getUtilityValues = (row: { aliases: readonly string[] }) =>
  row.aliases
    .filter((alias) => alias.startsWith("--"))
    .map(aliasToUtility);

const getCombinedUtilityValues = (row: { aliases: readonly string[] }) =>
  getUtilityValues(row).join(" ");

const copySnippet = async (key: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedSnippetKey.value = key;
  setTimeout(() => {
    if (copiedSnippetKey.value === key) copiedSnippetKey.value = null;
  }, 2000);
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
          class="ts-style-section"
        >
          <div class="ts-style-section-copy">
            <h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">
              When to use {{ sectionUsageHeadingLabel[section.key] }}
            </h2>

            <p
              class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal"
              v-html="sectionUsageCopy[section.key]"
            />
          </div>

          <sgds-table
            tableBorder
            headerBackground
            responsive="always"
            class="typography-page-template__utility-table ts-type-token-table"
          >
            <sgds-table-row>
              <sgds-table-head class="typography-page-template__table-style-column">Style name</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-preview-column">Preview</sgds-table-head>
              <sgds-table-head class="typography-page-template__table-usage-column">When to use</sgds-table-head>
              <sgds-table-head>SGDS tailwind token</sgds-table-head>
            </sgds-table-row>

            <sgds-table-row
              v-for="row in section.rows"
              :key="row.tokenNames.join('-')"
              :class="{ 'ts-default-row': Boolean(row.note) }"
            >
              <sgds-table-cell :class="['typography-page-template__table-style-column', section.key === 'display' ? 'ts-style-name-cell--display' : '']">
                <div class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-2-xs">
                  <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                    {{ row.example }}
                  </span>
                  <div
                    v-if="row.note || row.headingLevel"
                    class="sgds:flex sgds:flex-wrap sgds:gap-2-xs"
                  >
                    <sgds-badge v-if="row.note" variant="primary">Default</sgds-badge>
                    <sgds-badge v-if="row.headingLevel" variant="neutral">{{ row.headingLevel }}</sgds-badge>
                  </div>
                </div>
              </sgds-table-cell>
              <sgds-table-cell :class="['ts-preview-cell', section.key === 'display' ? 'ts-preview-cell--display' : '']">
                <p :class="['ts-token-example', 'ts-' + row.exampleClass]">
                  {{ row.example }}
                </p>
              </sgds-table-cell>
              <sgds-table-cell class="typography-page-template__table-usage-column">
                <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:mb-0">
                  {{ row.description }}
                </p>
              </sgds-table-cell>
              <sgds-table-cell>
                <div class="ts-alias-token-list">
                  <div class="ts-snippet-row">
                    <code class="ts-snippet-code">
                      <span
                        v-for="token in getUtilityValues(row)"
                        :key="`${row.tokenNames.join('-')}-snippet-${token}`"
                      >
                        {{ token }}
                      </span>
                    </code>
                    <button
                      :class="[
                        'ts-snippet-copy-btn',
                        copiedSnippetKey === row.tokenNames.join('-') ? 'sgds:text-success-default' : 'sgds:text-default'
                      ]"
                      @click="copySnippet(row.tokenNames.join('-'), getCombinedUtilityValues(row))"
                    >
                      <sgds-icon :name="copiedSnippetKey === row.tokenNames.join('-') ? 'check' : 'copy'" size="sm" />
                    </button>
                  </div>
                </div>
              </sgds-table-cell>
            </sgds-table-row>
          </sgds-table>
        </section>
      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
.ts-style-section {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
}

.ts-style-section-copy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
}

.ts-type-token-table {
  inline-size: max-content;
  max-inline-size: 100%;
  width: auto;
}

.ts-default-row {
  background: var(--sgds-primary-surface-muted);
}

.ts-token-name-cell {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-2-xs);
}

.ts-alias-cell {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.ts-alias-token-list {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  min-width: 0;
}

.ts-alias-token-list code {
  max-inline-size: none;
  white-space: nowrap;
}

.ts-snippet-row {
  align-items: flex-start;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  display: flex;
  gap: var(--sgds-gap-2-xs);
  justify-content: space-between;
  padding: 0.375rem var(--sgds-padding-sm);
}

.ts-snippet-code {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  flex: 1;
  font-family: var(--sgds-font-family-mono, monospace);
  font-size: var(--sgds-font-size-body-sm);
  gap: var(--sgds-gap-2-xs);
  line-height: var(--sgds-line-height-xs);
  min-width: 0;
  overflow: visible;
  white-space: normal;
}

.ts-snippet-code span {
  align-self: flex-start;
  color: var(--sgds-body-color-default);
  white-space: nowrap;
}

.ts-snippet-copy-btn {
  background: transparent;
  border: 0;
  border-radius: var(--sgds-border-radius-sm);
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  padding: var(--sgds-spacer-1);
}

.ts-snippet-copy-btn:hover {
  background: var(--sgds-bg-translucent-subtle);
}

.ts-preview-cell {
  overflow: visible;
}

.ts-preview-cell--display {
  min-width: 16rem;
}

.ts-style-name-cell--display {
  width: 13rem;
}

.ts-token-example {
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  letter-spacing: var(--sgds-letter-spacing-tighter);
  margin: 0;
  overflow-wrap: anywhere;
  white-space: normal;
  word-break: break-word;
}

.ts-tokenExampleDisplayLgBold {
  font-size: var(--sgds-font-size-display-lg);
  font-weight: var(--sgds-font-weight-bold);
  line-height: var(--sgds-line-height-3-xl);
}

.ts-tokenExampleDisplayLgLight {
  font-size: var(--sgds-font-size-display-lg);
  font-weight: var(--sgds-font-weight-light);
  line-height: var(--sgds-line-height-3-xl);
}

.ts-tokenExampleDisplayMdBold {
  font-size: var(--sgds-font-size-display-md);
  font-weight: var(--sgds-font-weight-bold);
  line-height: var(--sgds-line-height-2-xl);
}

.ts-tokenExampleDisplayMdLight {
  font-size: var(--sgds-font-size-display-md);
  font-weight: var(--sgds-font-weight-light);
  line-height: var(--sgds-line-height-2-xl);
}

.ts-tokenExampleDisplaySmBold {
  font-size: var(--sgds-font-size-display-sm);
  font-weight: var(--sgds-font-weight-bold);
  line-height: var(--sgds-line-height-xl);
}

.ts-tokenExampleDisplaySmLight {
  font-size: var(--sgds-font-size-display-sm);
  font-weight: var(--sgds-font-weight-light);
  line-height: var(--sgds-line-height-xl);
}

.ts-tokenExampleHeadingXlBold {
  font-size: var(--sgds-font-size-heading-xl);
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-xl);
}

.ts-tokenExampleHeadingXlLight {
  font-size: var(--sgds-font-size-heading-xl);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-xl);
}

.ts-tokenExampleHeadingLgBold {
  font-size: var(--sgds-font-size-heading-lg);
  font-weight: var(--sgds-font-weight-bold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-lg);
}

.ts-tokenExampleHeadingLgLight {
  font-size: var(--sgds-font-size-heading-lg);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-lg);
}

.ts-tokenExampleHeadingMdSemibold {
  font-size: var(--sgds-font-size-heading-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-md);
}

.ts-tokenExampleHeadingMdLight {
  font-size: var(--sgds-font-size-heading-md);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-md);
}

.ts-tokenExampleHeadingSmSemibold {
  font-size: var(--sgds-font-size-heading-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-sm);
}

.ts-tokenExampleHeadingSmLight {
  font-size: var(--sgds-font-size-heading-sm);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-sm);
}

.ts-tokenExampleSubtitleMdSemibold {
  font-size: var(--sgds-font-size-subtitle-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleSubtitleMdLight {
  font-size: var(--sgds-font-size-subtitle-md);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleSubtitleSmSemibold {
  font-size: var(--sgds-font-size-subtitle-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.ts-tokenExampleSubtitleSmLight {
  font-size: var(--sgds-font-size-subtitle-sm);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.ts-tokenExampleBodyLgSemibold {
  font-size: var(--sgds-font-size-body-lg);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.ts-tokenExampleBodyLgRegular {
  font-size: var(--sgds-font-size-body-lg);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.ts-tokenExampleBodyMdSemibold {
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleBodyMdRegular {
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleBodySmSemibold {
  font-size: var(--sgds-font-size-body-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.ts-tokenExampleBodySmRegular {
  font-size: var(--sgds-font-size-body-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.ts-tokenExampleLabelLgSemibold {
  font-size: var(--sgds-font-size-label-lg);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.ts-tokenExampleLabelLgRegular {
  font-size: var(--sgds-font-size-label-lg);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.ts-tokenExampleLabelMdSemibold {
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleLabelMdRegular {
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleLabelMdLight {
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-light);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleLabelSmSemibold {
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.ts-tokenExampleLabelSmRegular {
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.ts-tokenExampleLabelXsSemibold {
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.ts-tokenExampleLabelXsRegular {
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.ts-tokenExampleCaptionSemibold {
  font-size: var(--sgds-font-size-caption-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.ts-tokenExampleCaptionRegular {
  font-size: var(--sgds-font-size-caption-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.ts-tokenExampleOverlineSemibold {
  font-size: var(--sgds-font-size-overline-md);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
  text-transform: uppercase;
}

.ts-tokenExampleOverlineRegular {
  font-size: var(--sgds-font-size-overline-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
  text-transform: uppercase;
}

.ts-tokenExampleLinkLgRegular {
  font-size: var(--sgds-font-size-link-lg);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-md);
}

.ts-tokenExampleLinkMdRegular {
  font-size: var(--sgds-font-size-link-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleLinkSmRegular {
  font-size: var(--sgds-font-size-link-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
}

.ts-tokenExampleLinkXsRegular {
  font-size: var(--sgds-font-size-link-xs);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-3-xs);
}

.ts-tokenExampleListUnordered,
.ts-tokenExampleListOrdered,
.ts-tokenExampleListUnstyled {
  display: list-item;
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
}

.ts-tokenExampleListUnordered {
  list-style-type: disc;
  margin-inline-start: var(--sgds-gap-lg);
}

.ts-tokenExampleListOrdered {
  list-style-type: decimal;
  margin-inline-start: var(--sgds-gap-lg);
}

.ts-tokenExampleListUnstyled {
  list-style-type: none;
}
</style>
