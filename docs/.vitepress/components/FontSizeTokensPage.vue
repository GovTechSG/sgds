<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
import SectionHeader from "./foundations/SectionHeader.vue";
import CodeToken from "./ui/CodeToken.vue";

type FontSizeToken = {
  token: string;
  value: string;
  px: number;
  utilityClass: string;
  note?: string;
};

const fontSizeTokens: FontSizeToken[] = [
  { token: "--sgds-font-size-12", value: "12px / 0.75rem",   px: 12, utilityClass: "sgds:text-12" },
  { token: "--sgds-font-size-14", value: "14px / 0.875rem",  px: 14, utilityClass: "sgds:text-14" },
  { token: "--sgds-font-size-16", value: "16px / 1rem",      px: 16, utilityClass: "sgds:text-16", note: "Base" },
  { token: "--sgds-font-size-18", value: "18px / 1.125rem",  px: 18, utilityClass: "sgds:text-18", note: "Responsive" },
  { token: "--sgds-font-size-20", value: "20px / 1.25rem",   px: 20, utilityClass: "sgds:text-20" },
  { token: "--sgds-font-size-22", value: "22px / 1.375rem",  px: 22, utilityClass: "sgds:text-22", note: "Responsive" },
  { token: "--sgds-font-size-24", value: "24px / 1.5rem",    px: 24, utilityClass: "sgds:text-24" },
  { token: "--sgds-font-size-26", value: "26px / 1.625rem",  px: 26, utilityClass: "sgds:text-26", note: "Responsive" },
  { token: "--sgds-font-size-28", value: "28px / 1.75rem",   px: 28, utilityClass: "sgds:text-28" },
  { token: "--sgds-font-size-30", value: "30px / 1.875rem",  px: 30, utilityClass: "sgds:text-30", note: "Responsive" },
  { token: "--sgds-font-size-32", value: "32px / 2rem",      px: 32, utilityClass: "sgds:text-32" },
  { token: "--sgds-font-size-36", value: "36px / 2.25rem",   px: 36, utilityClass: "sgds:text-36", note: "Responsive" },
  { token: "--sgds-font-size-40", value: "40px / 2.5rem",    px: 40, utilityClass: "sgds:text-40" },
  { token: "--sgds-font-size-44", value: "44px / 2.75rem",   px: 44, utilityClass: "sgds:text-44", note: "Responsive" },
  { token: "--sgds-font-size-48", value: "48px / 3rem",      px: 48, utilityClass: "sgds:text-48" },
  { token: "--sgds-font-size-52", value: "52px / 3.25rem",   px: 52, utilityClass: "sgds:text-52", note: "Responsive" },
  { token: "--sgds-font-size-56", value: "56px / 3.5rem",    px: 56, utilityClass: "sgds:text-56" },
];
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section typography-page-template__section--spaced">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <SectionHeader title="Font size tokens" />
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">Font size tokens define every step of the type scale. Use these tokens to build custom text styles that remain in sync with system typography.</p>
      </div>
      <div class="typography-page-template__body typography-page-template__body--prose">
        <sgds-table tableBorder headerBackground responsive="always" class="typography-page-template__utility-table">
          <sgds-table-row>
            <sgds-table-head class="sgds:box-border sgds:w-max sgds:min-w-[13rem] sgds:max-w-[18rem]">Token</sgds-table-head>
            <sgds-table-head class="sgds:box-border sgds:w-max sgds:min-w-28 sgds:max-w-40">Value (px/rem)</sgds-table-head>
            <sgds-table-head class="sgds:box-border sgds:w-max sgds:min-w-32 sgds:max-w-40">Preview</sgds-table-head>
          </sgds-table-row>

          <sgds-table-row
            v-for="row in fontSizeTokens"
            :key="row.token"
            :class="row.note ? 'sgds:bg-translucent-subtle' : undefined"
          >
            <sgds-table-cell class="sgds:box-border sgds:w-max sgds:min-w-[13rem] sgds:max-w-[18rem]">
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-2-xs">
                <CodeToken :label="row.token" />
                <sgds-badge v-if="row.note" variant="primary">{{ row.note }}</sgds-badge>
              </div>
            </sgds-table-cell>
            <sgds-table-cell class="sgds:box-border sgds:w-max sgds:min-w-28 sgds:max-w-40">
              <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ row.value }}</span>
            </sgds-table-cell>
            <sgds-table-cell class="sgds:box-border sgds:w-max sgds:min-w-32 sgds:max-w-40">
              <div :class="[row.utilityClass, 'sgds:leading-[1.2]']">Ag</div>
            </sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </div>
    </section>
  </TypographyPageTemplate>
</template>
