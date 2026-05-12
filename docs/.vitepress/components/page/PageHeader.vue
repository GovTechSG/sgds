<script setup lang="ts">
import type { AvailabilityStatus } from "../../data/component-docs";

type MetadataItem = {
  label: string;
  status: AvailabilityStatus;
};

type HeaderLink = {
  label: string;
  href: string;
  path: string;
  icon?: string;
  iconSrc?: string;
};

export type Page = {
  title: string;
  description?: string;
  metadata?: MetadataItem[];
  headerLinks?: HeaderLink[];
  titleClass?: string;
  descriptionClass?: string;
  bottomGapClass?: string;
  headerAlert?: {
    title: string;
    description: string;
    variant?: string;
    outlined?: boolean;
    icon?: string;
  };
}
const { title, description, metadata, headerLinks, titleClass, descriptionClass, bottomGapClass, headerAlert } = defineProps<Page>();

const isMaskedBrandIcon = (label: string) =>
  ["github", "storybook"].includes(label.toLowerCase());

const isStorybookLink = (label: string) => label.toLowerCase() === "storybook";

const brandIconClass = (label: string) =>
  `page-header-brand-icon page-header-brand-icon--${label.toLowerCase()}`;
</script>

<template>
  <div
    :class="[
      'sgds:flex sgds:flex-col',
      metadata?.length || headerLinks?.length ? 'sgds:gap-layout-lg' : '',
      bottomGapClass || 'sgds:mb-layout-md'
    ]"
  >
    <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <sgds-alert
        v-if="headerAlert"
        show
        :variant="headerAlert.variant || 'danger'"
        :outlined="headerAlert.outlined ?? true"
        :title="headerAlert.title"
      >
        <sgds-icon v-if="headerAlert.icon" slot="icon" :name="headerAlert.icon"></sgds-icon>
        <span>{{ headerAlert.description }}</span>
      </sgds-alert>
      <h1 :class="[titleClass || 'sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter', 'sgds:mb-0']">{{ title }}</h1>
      <p
        v-if="description"
        :class="[descriptionClass || 'sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight', 'sgds:text-heading-subtle sgds:mb-0 sgds:max-w-[var(--sgds-container-max-width-md)]']"
      >
        {{ description }}
      </p>
    </div>
    <div v-if="headerLinks?.length" class="sgds:flex sgds:flex-col sgds:gap-text-xs">
      <div
        v-for="link in headerLinks"
        :key="link.label"
        class="sgds:grid sgds:grid-cols-[var(--sgds-dimension-96)_minmax(0,1fr)] sgds:items-center sgds:gap-x-text-xs"
      >
        <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
          {{ link.label }}
        </span>
        <sgds-link tone="neutral">
          <a
            :href="link.href"
            :target="isStorybookLink(link.label) ? '_blank' : undefined"
            :rel="isStorybookLink(link.label) ? 'noreferrer' : undefined"
            :class="[
              'sgds:inline-flex sgds:items-center sgds:gap-text-2-xs',
              isStorybookLink(link.label) ? 'page-header-storybook-link' : ''
            ]"
          >
            <span
              v-if="link.iconSrc && isMaskedBrandIcon(link.label)"
              aria-hidden="true"
              :class="brandIconClass(link.label)"
            ></span>
            <img
              v-else-if="link.iconSrc"
              :src="link.iconSrc"
              :alt="`${link.label} logo`"
              class="sgds:block sgds:h-4 sgds:w-4"
            />
            <sgds-icon v-else-if="link.icon" :name="link.icon"></sgds-icon>
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ link.path }}</span>
          </a>
        </sgds-link>
      </div>
    </div>
    <div
      v-if="metadata?.length"
      class="sgds:flex sgds:flex-wrap sgds:gap-text-lg"
    >
      <div
        v-for="item in metadata"
        :key="item.label"
        class="sgds:flex sgds:gap-text-2-xs sgds:items-center"
      >
        <sgds-icon
          name="check-circle-fill"
          :class="item.status === 'available' ? 'sgds:text-success-default' : 'sgds:text-muted'"
        />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style>
/* Brand SVG masks let the component header icons keep their brand colour in
   day mode and use the SGDS fixed white token in night mode. */
.page-header-brand-icon {
  display: block;
  height: var(--sgds-dimension-16);
  width: var(--sgds-dimension-16);
}

.page-header-brand-icon--github {
  background-color: #181717;
  mask: url("/brands/github.svg") center / contain no-repeat;
}

.page-header-brand-icon--storybook {
  background-color: #ff4785;
  mask: url("/brands/storybook.svg") center / contain no-repeat;
}

.sgds-night-theme .page-header-brand-icon--github,
.sgds-night-theme .page-header-brand-icon--storybook {
  background-color: var(--sgds-color-fixed-light);
}

/* Storybook header links intentionally open in a new tab without rendering
   SGDS link's external-link indicator beside the path. */
.page-header-storybook-link::after,
.page-header-storybook-link .external-link-icon {
  display: none !important;
}
</style>
