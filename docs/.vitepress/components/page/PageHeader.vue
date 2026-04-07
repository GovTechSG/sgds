<script setup lang="ts">
import type { AvailabilityStatus } from "../../data/component-docs";

type MetadataItem = {
  label: string;
  status: AvailabilityStatus;
};

export type Page = {
  title: string;
  description?: string;
  metadata?: MetadataItem[];
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
const { title, description, metadata, titleClass, descriptionClass, bottomGapClass, headerAlert } = defineProps<Page>();
</script>

<template>
  <div :class="['sgds:flex sgds:flex-col sgds:gap-layout-md', bottomGapClass || 'sgds:mb-layout-md']">
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
  <div class="sgds:flex sgds:flex-wrap sgds:gap-layout-md sgds:my-layout-lg" v-if="metadata?.length">
    <div
      v-for="item in metadata"
      :key="item.label"
      class="sgds:flex sgds:gap-2 sgds:items-center"
    >
      <sgds-icon
        name="check-circle-fill"
        :class="item.status === 'available' ? 'sgds:text-success-default' : 'sgds:text-muted'"
      />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
