<script setup lang="ts">
import type {
  GetStartedDemoExample,
  GetStartedLink,
  GetStartedPageData,
  GetStartedSection,
} from "../../data/get-started";
import type { BestPractice } from "../../data/component-docs";
import BestPracticesSection from "../components/BestPracticesSection.vue";
import SectionHeader from "../foundations/SectionHeader.vue";
import CodeToken from "../ui/CodeToken.vue";
import { textParts } from "../../utils/text-parts";

const props = defineProps<{
  page: GetStartedPageData;
}>();

const visibleLinks = (section: GetStartedSection) => section.links ?? [];

const linkForItem = (section: GetStartedSection, index: number): GetStartedLink | undefined =>
  visibleLinks(section)[index];

const hasStandaloneLinks = (section: GetStartedSection) =>
  visibleLinks(section).length > 0 &&
  !section.orderedItems?.length &&
  !section.unorderedItems?.length &&
  !section.demoExamples?.length &&
  !section.copyPatterns?.length &&
  !section.subsections?.length;

const contentGapClass = (section: GetStartedSection) =>
  section.contentGap ??
  props.page.sectionGap ??
  (section.orderedItems?.length || section.unorderedItems?.length || section.paragraphs?.length || hasStandaloneLinks(section)
    ? "sgds:gap-sm"
    : "sgds:gap-layout-lg");

const subsectionGapClass = (section: GetStartedSection) =>
  section.subsectionGap ?? "sgds:gap-layout-lg";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const demoExampleMarkup = (example: GetStartedDemoExample) => {
  const title = escapeHtml(example.demoTitle);
  const text = escapeHtml(example.demoText);

  if (example.kind === "alert") {
    return `<sgds-alert show variant="${example.alertVariant ?? "info"}" title="${title}"><div>${text}</div></sgds-alert>`;
  }

  if (example.kind === "button") {
    return `<div class="sgds:flex sgds:w-full sgds:items-center sgds:justify-center">
      <sgds-button>${text}</sgds-button>
    </div>`;
  }

  if (example.kind === "empty-state") {
    const button = example.demoButtonLabel
      ? `<sgds-button size="sm">${escapeHtml(example.demoButtonLabel)}</sgds-button>`
      : "";

    return `<div class="sgds:flex sgds:w-full sgds:flex-col sgds:items-center sgds:gap-component-sm sgds:rounded-lg sgds:border sgds:border-muted sgds:bg-default sgds:p-layout-sm sgds:text-center">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
        <p class="sgds:m-0 sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">${title}</p>
        <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">${text}</p>
      </div>
      ${button}
    </div>`;
  }

  return `<div class="sgds:flex sgds:w-full sgds:flex-col sgds:gap-text-xs sgds:rounded-lg sgds:border sgds:border-muted sgds:bg-default sgds:p-component-md">
    <p class="sgds:m-0 sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">${title}</p>
    <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">${text}</p>
  </div>`;
};

const bestPracticesForExamples = (examples: GetStartedDemoExample[] = []): BestPractice[] =>
  examples.map((example) => ({
    title: example.title,
    description: example.description,
    tone: example.tone === "avoid" ? "dont" : "do",
    markup: demoExampleMarkup(example),
  }));
</script>

<template>
  <div :class="['sgds:flex sgds:flex-col', props.page.sectionsGap ?? 'sgds:gap-layout-xl']">
    <section
      v-for="section in props.page.sections"
      :key="section.title"
      :class="['sgds:flex sgds:flex-col', contentGapClass(section)]"
    >
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <SectionHeader
          :title="section.title"
          :heading-level="section.headingLevel"
          header-gap="sgds:gap-text-xs"
        />
        <p
          v-if="section.descriptionHtml"
          class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle"
          v-html="section.descriptionHtml"
        ></p>
        <p
          v-else-if="section.description"
          class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle"
        >
          <template
            v-for="(part, index) in textParts(section.description)"
            :key="`${part.text}-${index}`"
          >
            <CodeToken v-if="part.isCode" :label="part.text" />
            <template v-else>{{ part.text }}</template>
          </template>
        </p>
      </div>

      <div v-if="section.codeTabs?.length">
        <sgds-tab-group variant="underlined">
          <sgds-tab
            v-for="(tab, i) in section.codeTabs"
            :key="tab.label"
            slot="nav"
            :panel="tab.label"
            :active="i === 0 || null"
          >
            {{ tab.label }}
          </sgds-tab>
          <sgds-tab-panel v-for="tab in section.codeTabs" :key="tab.label" :name="tab.label">
            <CodeBlock v-if="tab.code" :code="tab.code" :lang="tab.lang ?? 'bash'" :hide-line-numbers="!section.codeTabsShowLineNumbers" />
            <div v-if="tab.steps?.length" class="sgds:flex sgds:flex-col sgds:gap-text-md">
              <div v-for="(step, i) in tab.steps" :key="i" class="sgds:flex sgds:flex-col sgds:gap-text-xs">
                <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                  <strong>Step {{ i + 1 }}:</strong> {{ step.description }}
                </p>
                <CodeBlock :code="step.code" :lang="step.lang ?? 'ts'" :filename="step.filename" />
              </div>
            </div>
            <div v-if="tab.stepGroups?.length" class="sgds:flex sgds:flex-col sgds:gap-text-xl">
              <div v-for="group in tab.stepGroups" :key="group.title" class="sgds:flex sgds:flex-col sgds:gap-text-md">
                <h4 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
                  {{ group.title }}
                </h4>
                <div v-for="(step, i) in group.steps" :key="i" class="sgds:flex sgds:flex-col sgds:gap-text-xs">
                  <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                    <strong>Step {{ i + 1 }}:</strong> {{ step.description }}
                  </p>
                  <CodeBlock :code="step.code" :lang="step.lang ?? 'ts'" :filename="step.filename" />
                </div>
              </div>
            </div>
            <div v-if="tab.message" class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                {{ tab.message }}
              </p>
              <sgds-link v-if="tab.messageLink">
                <a :href="tab.messageLink.href" target="_blank" rel="noopener noreferrer">
                  {{ tab.messageLink.label }}
                </a>
              </sgds-link>
            </div>
          </sgds-tab-panel>
        </sgds-tab-group>
      </div>

      <CodeBlock
        v-if="section.codeBlock"
        :code="section.codeBlock.code"
        :lang="section.codeBlock.lang ?? 'html'"
        :filename="section.codeBlock.filename"
      />

      <div v-if="section.eyebrow || section.paragraphs?.length" class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <h3
          v-if="section.eyebrow"
          class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default"
        >
          {{ section.eyebrow }}
        </h3>
        <p
          v-for="paragraph in section.paragraphs"
          :key="paragraph"
          class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle"
        >
          {{ paragraph }}
        </p>
      </div>

      <ol v-if="section.orderedItems?.length" class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-layout-xs">
        <li v-for="(item, index) in section.orderedItems" :key="item.title">
          <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
            <strong>{{ item.title }}:</strong>{{ " " }}
            <span v-if="item.descriptionHtml" v-html="item.descriptionHtml"></span>
            <template v-else>
              {{ item.description }}
            </template>
          </p>
          <sgds-link v-if="linkForItem(section, index)" class="sgds:mt-text-2-xs">
            <a :href="linkForItem(section, index)?.href">
              {{ linkForItem(section, index)?.label }}
              <sgds-icon name="arrow-right"></sgds-icon>
            </a>
          </sgds-link>
        </li>
      </ol>

      <ul v-if="section.unorderedItems?.length" class="sgds:list-disc sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-xs sgds:pl-6 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
        <li v-for="(item, index) in section.unorderedItems" :key="item.title" class="sgds:m-0">
          <span>
            <strong>{{ item.title }}:</strong>{{ " " }}
            <span v-if="item.descriptionHtml" v-html="item.descriptionHtml"></span>
            <template v-else>
              {{ item.description }}
            </template>
          </span>
          <sgds-link v-if="linkForItem(section, index)" class="sgds:mt-text-2-xs">
            <a :href="linkForItem(section, index)?.href">
              {{ linkForItem(section, index)?.label }}
              <sgds-icon name="arrow-right"></sgds-icon>
            </a>
          </sgds-link>
        </li>
      </ul>

      <div v-if="section.subsections?.length" :class="['sgds:flex sgds:flex-col', subsectionGapClass(section)]">
        <div v-for="(item, index) in section.subsections" :key="item.title" class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-text-xs">
          <h4 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
            {{ item.title }}
          </h4>
          <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
            {{ item.description }}
          </p>
          <sgds-link v-if="linkForItem(section, index)">
            <a :href="linkForItem(section, index)?.href">
              {{ linkForItem(section, index)?.label }}
              <sgds-icon name="arrow-right"></sgds-icon>
            </a>
          </sgds-link>
        </div>
      </div>

      <BestPracticesSection
        v-if="section.demoExamples?.length"
        :best-practices="bestPracticesForExamples(section.demoExamples)"
        show-titles
        icons-in-box
        title-tag="h6"
        compact-titles
        compact-side-padding
      />

      <div v-if="section.copyPatterns?.length" class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
        <article
          v-for="pattern in section.copyPatterns"
          :key="pattern.title"
          class="sgds:flex sgds:flex-col sgds:gap-text-md"
        >
          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <h4 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
              {{ pattern.title }}
            </h4>
            <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
              {{ pattern.description }}
            </p>
          </div>
          <BestPracticesSection
            :best-practices="bestPracticesForExamples(pattern.examples)"
            show-titles
            icons-in-box
            title-tag="h6"
            compact-titles
            compact-side-padding
          />
        </article>
      </div>

      <p
        v-if="section.footerHtml"
        class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle"
        v-html="section.footerHtml"
      ></p>

      <div v-if="hasStandaloneLinks(section)" class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-text-xs">
        <sgds-link v-for="link in visibleLinks(section)" :key="link.label">
          <a
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            {{ link.label }}
            <sgds-icon v-if="!link.external" name="arrow-right"></sgds-icon>
          </a>
        </sgds-link>
      </div>
    </section>

    <nav
      v-if="props.page.pager?.length"
      class="sgds:grid sgds:grid-cols-2 sgds:gap-layout-md sgds:max-md:grid-cols-1"
      aria-label="Get started pagination"
    >
      <a
        v-for="item in props.page.pager"
        :key="item.href"
        :href="item.href"
        :class="[
          'sgds:flex sgds:items-start sgds:gap-component-sm sgds:rounded-lg sgds:bg-surface-raised sgds:p-component-xs sgds:text-default sgds:no-underline sgds:hover:text-default sgds:focus:text-default sgds:focus-visible:text-default sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]',
          item.direction === 'next' ? 'sgds:col-start-2 sgds:justify-between sgds:max-md:col-start-auto' : ''
        ]"
      >
        <sgds-icon v-if="item.direction === 'previous'" name="arrow-circle-left" size="2-xl"></sgds-icon>
        <span class="sgds:flex sgds:min-w-0 sgds:flex-1 sgds:flex-col sgds:gap-text-2-xs">
          <span class="sgds:mb-0 sgds:text-1 sgds:font-regular sgds:leading-20 sgds:tracking-normal sgds:text-body-subtle">
            {{ item.label }}
          </span>
          <span class="sgds:mb-0 sgds:text-heading-default sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-normal">
            {{ item.title }}
          </span>
        </span>
        <sgds-icon v-if="item.direction === 'next'" name="arrow-circle-right" size="2-xl"></sgds-icon>
      </a>
    </nav>
  </div>
</template>
