<script setup lang="ts">
import type {
  GetStartedLink,
  GetStartedPageData,
  GetStartedSection,
} from "../../data/get-started";

defineProps<{
  page: GetStartedPageData;
}>();

const visibleLinks = (section: GetStartedSection) => section.links ?? [];

const linkForItem = (section: GetStartedSection, index: number): GetStartedLink | undefined =>
  visibleLinks(section)[index];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
    <section
      v-for="section in page.sections"
      :key="section.title"
      class="sgds:flex sgds:flex-col sgds:gap-text-md"
    >
      <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
        <h2 class="sgds:m-0 sgds:text-heading-lg sgds:font-semibold sgds:leading-lg sgds:tracking-tight">
          {{ section.title }}
        </h2>
        <p
          v-if="section.description"
          class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle"
        >
          {{ section.description }}
        </p>
      </div>

      <div
        v-if="section.video"
        class="sgds:flex sgds:aspect-video sgds:w-full sgds:flex-col sgds:items-center sgds:justify-center sgds:gap-component-md sgds:rounded-lg sgds:border sgds:border-muted sgds:bg-surface-raised sgds:p-layout-md"
      >
        <p class="sgds:m-0 sgds:text-center sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
          Placeholder video.
        </p>
      </div>

      <div v-if="section.eyebrow || section.paragraphs?.length" class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <h3
          v-if="section.eyebrow"
          class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight"
        >
          {{ section.eyebrow }}
        </h3>
        <p
          v-for="paragraph in section.paragraphs"
          :key="paragraph"
          class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle"
        >
          {{ paragraph }}
        </p>
      </div>

      <ol v-if="section.orderedItems?.length" class="sgds:m-0 sgds:flex sgds:flex-col sgds:gap-text-sm sgds:pl-layout-xs">
        <li v-for="(item, index) in section.orderedItems" :key="item.title">
          <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
            <strong>{{ item.title }}:</strong>
            {{ item.description }}
          </p>
          <sgds-link v-if="linkForItem(section, index)" class="sgds:mt-text-2-xs">
            <a :href="linkForItem(section, index)?.href">
              {{ linkForItem(section, index)?.label }}
              <sgds-icon name="arrow-right"></sgds-icon>
            </a>
          </sgds-link>
        </li>
      </ol>

      <div v-if="section.subsections?.length" class="sgds:flex sgds:flex-col sgds:gap-text-xl">
        <div v-for="(item, index) in section.subsections" :key="item.title" class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-text-xs">
          <h4 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
            {{ item.title }}
          </h4>
          <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
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

      <div v-if="visibleLinks(section).length && !section.orderedItems?.length && !section.subsections?.length" class="sgds:flex sgds:flex-col sgds:items-start sgds:gap-text-xs">
        <sgds-link v-for="link in visibleLinks(section)" :key="link.label">
          <a :href="link.href">
            {{ link.label }}
            <sgds-icon name="arrow-right"></sgds-icon>
          </a>
        </sgds-link>
      </div>
    </section>

    <nav
      v-if="page.pager?.length"
      class="sgds:grid sgds:grid-cols-2 sgds:gap-layout-md sgds:max-md:grid-cols-1"
      aria-label="Get started pagination"
    >
      <a
        v-for="item in page.pager"
        :key="item.href"
        :href="item.href"
        :class="[
          'sgds:flex sgds:items-start sgds:gap-component-sm sgds:rounded-lg sgds:bg-surface-raised sgds:p-component-xs sgds:text-default sgds:no-underline sgds:hover:text-default sgds:focus:text-default sgds:focus-visible:text-default sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]',
          item.direction === 'next' ? 'sgds:col-start-2 sgds:justify-between sgds:max-md:col-start-auto' : ''
        ]"
      >
        <sgds-icon v-if="item.direction === 'previous'" name="arrow-circle-left" size="2-xl"></sgds-icon>
        <span class="sgds:flex sgds:min-w-0 sgds:flex-1 sgds:flex-col sgds:gap-text-2-xs">
          <span class="sgds:mb-0 sgds:text-1 sgds:font-regular sgds:leading-20 sgds:tracking-normal sgds:text-subtle">
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
