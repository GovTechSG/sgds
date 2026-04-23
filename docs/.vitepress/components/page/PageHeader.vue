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
          <a :href="link.href" class="sgds:inline-flex sgds:items-center sgds:gap-text-2-xs">
            <img
              v-if="link.iconSrc"
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
