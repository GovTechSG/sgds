<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import FontSizeGroupTable from "./FontSizeGroupTable.vue";
import { computed, ref } from "vue";

const fontSizeGroups = [
  {
    key: "display",
    label: "Display",
    description: "Used for large expressive titles. Responsive — scales up on larger screens.",
    sizes: [
      { name: "Large",  utilityClass: "sgds:text-display-lg", token: "--sgds-font-size-display-lg", mobile: "40", tablet: "52", desktop: "56" },
      { name: "Medium", utilityClass: "sgds:text-display-md", token: "--sgds-font-size-display-md", mobile: "36", tablet: "44", desktop: "48" },
      { name: "Small",  utilityClass: "sgds:text-display-sm", token: "--sgds-font-size-display-sm", mobile: "32", tablet: "36", desktop: "40" },
    ],
  },
  {
    key: "heading",
    label: "Heading",
    description: "Used for section and content headings. Responsive — scales up on larger screens.",
    sizes: [
      { name: "XL",     utilityClass: "sgds:text-heading-xl", token: "--sgds-font-size-heading-xl", mobile: "32", tablet: "36", desktop: "40" },
      { name: "Large",  utilityClass: "sgds:text-heading-lg", token: "--sgds-font-size-heading-lg", mobile: "28", tablet: "30", desktop: "32" },
      { name: "Medium", utilityClass: "sgds:text-heading-md", token: "--sgds-font-size-heading-md", mobile: "24", tablet: "26", desktop: "28" },
      { name: "Small",  utilityClass: "sgds:text-heading-sm", token: "--sgds-font-size-heading-sm", mobile: "20", tablet: "22", desktop: "24" },
    ],
  },
  {
    key: "subtitle",
    label: "Subtitle",
    description: "Used for supporting headings and UI labels.",
    sizes: [
      { name: "Medium", utilityClass: "sgds:text-subtitle-md", token: "--sgds-font-size-subtitle-md", mobile: "18", tablet: "20", desktop: "20" },
      { name: "Small",  utilityClass: "sgds:text-subtitle-sm", token: "--sgds-font-size-subtitle-sm", mobile: "16", tablet: "16", desktop: "16" },
    ],
  },
  {
    key: "body",
    label: "Body",
    description: "Used for paragraph and descriptive content.",
    sizes: [
      { name: "Large",  utilityClass: "sgds:text-body-lg", token: "--sgds-font-size-body-lg", mobile: "18", tablet: "20", desktop: "20" },
      { name: "Medium", utilityClass: "sgds:text-body-md", token: "--sgds-font-size-body-md", mobile: "16", tablet: "16", desktop: "16" },
      { name: "Small",  utilityClass: "sgds:text-body-sm", token: "--sgds-font-size-body-sm", mobile: "14", tablet: "14", desktop: "14" },
    ],
  },
  {
    key: "label",
    label: "Label",
    description: "Used for UI labels, form fields, and controls.",
    sizes: [
      { name: "Large",  utilityClass: "sgds:text-label-lg", token: "--sgds-font-size-label-lg", mobile: "18", tablet: "20", desktop: "20" },
      { name: "Medium", utilityClass: "sgds:text-label-md", token: "--sgds-font-size-label-md", mobile: "16", tablet: "16", desktop: "16" },
      { name: "Small",  utilityClass: "sgds:text-label-sm", token: "--sgds-font-size-label-sm", mobile: "14", tablet: "14", desktop: "14" },
      { name: "XS",     utilityClass: "sgds:text-label-xs", token: "--sgds-font-size-label-xs", mobile: "12", tablet: "12", desktop: "12" },
    ],
  },
  {
    key: "caption",
    label: "Caption",
    description: "Used for supplementary information beneath content.",
    sizes: [
      { name: "Medium", utilityClass: "sgds:text-caption-md", token: "--sgds-font-size-caption-md", mobile: "14", tablet: "14", desktop: "14" },
    ],
  },
  {
    key: "overline",
    label: "Overline",
    description: "Used above headings for labelling or categorisation.",
    sizes: [
      { name: "Medium", utilityClass: "sgds:text-overline-md", token: "--sgds-font-size-overline-md", mobile: "14", tablet: "14", desktop: "14" },
    ],
  },
  {
    key: "link",
    label: "Link",
    description: "Used for inline hyperlinks.",
    sizes: [
      { name: "Large",  utilityClass: "sgds:text-link-lg", token: "--sgds-font-size-link-lg", mobile: "18", tablet: "20", desktop: "20" },
      { name: "Medium", utilityClass: "sgds:text-link-md", token: "--sgds-font-size-link-md", mobile: "16", tablet: "16", desktop: "16" },
      { name: "Small",  utilityClass: "sgds:text-link-sm", token: "--sgds-font-size-link-sm", mobile: "14", tablet: "14", desktop: "14" },
      { name: "XS",     utilityClass: "sgds:text-link-xs", token: "--sgds-font-size-link-xs", mobile: "12", tablet: "12", desktop: "12" },
    ],
  },
] as const;

const activeGroupKey = ref<(typeof fontSizeGroups)[number]["key"]>("display");

const activeGroup = computed(
  () => fontSizeGroups.find((group) => group.key === activeGroupKey.value) ?? fontSizeGroups[0],
);

const onFontSizeTabShow = (e: Event) => {
  const nextGroup = (e as CustomEvent).detail.name as (typeof fontSizeGroups)[number]["key"];
  if (fontSizeGroups.some((group) => group.key === nextGroup)) activeGroupKey.value = nextGroup;
};
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__content-block">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Font size utilities</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Semantic font size utility classes control text size using tokens mapped to the SGDS type scale. These sizes are responsive by default, automatically scaling at tablet (1024px) and desktop (1440px) breakpoints to ensure consistent and readable typography across devices.
        </p>
      </div>
    </section>

    <section id="responsive-tokens" class="typography-page-template__section">
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <sgds-tab-group variant="underlined" @sgds-tab-show="onFontSizeTabShow">
          <sgds-tab
            v-for="group in fontSizeGroups"
            :key="group.key"
            slot="nav"
            :panel="group.key"
            :active="activeGroupKey === group.key || null"
          >{{ group.label }}</sgds-tab>
          <sgds-tab-panel
            v-for="group in fontSizeGroups"
            :key="`font-size-panel-${group.key}`"
            :name="group.key"
          ></sgds-tab-panel>
        </sgds-tab-group>

        <FontSizeGroupTable
          :key="activeGroup.key"
          :group="activeGroup"
          :show-header="false"
        />
      </div>
    </section>
  </TypographyPageTemplate>
</template>
