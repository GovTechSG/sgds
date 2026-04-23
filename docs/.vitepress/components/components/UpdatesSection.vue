<script setup lang="ts">
import { computed } from "vue";
import type { UpdatesContent } from "../../data/component-docs";
import { useComponentUpdates } from "../../composables/useComponentUpdates";
import Section from "../foundations/Section.vue";

const props = defineProps<{
  updates: UpdatesContent;
  componentKey: string;
}>();

const { rows, loading, error } = useComponentUpdates(props.componentKey);

// Use GitHub API rows when available; fall back to static rows from component-docs
const displayRows = computed(() =>
  !loading.value && !error.value && rows.value.length > 0
    ? rows.value
    : props.updates.updates.rows,
);
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)] sgds:pt-[var(--sgds-layout-gap-lg)]">
    <Section :title="updates.updates.title" gap="sgds:gap-[var(--sgds-gap-xl)]">
      <sgds-table tableBorder headerBackground>
        <sgds-table-row>
          <sgds-table-head v-for="column in updates.updates.columns" :key="column">
            <span :class="['sgds:inline-block', column === 'Date' ? 'sgds:min-w-[var(--sgds-dimension-80)] sgds:whitespace-nowrap' : '']">
              {{ column }}
            </span>
          </sgds-table-head>
        </sgds-table-row>

        <!-- Loading state -->
        <sgds-table-row v-if="loading">
          <sgds-table-cell :colspan="updates.updates.columns.length">
            <span class="sgds:text-subtle">Loading updates…</span>
          </sgds-table-cell>
        </sgds-table-row>

        <!-- Data rows -->
        <template v-else>
          <sgds-table-row
            v-for="(row, index) in displayRows"
            :key="`${updates.updates.title}-${index}`"
          >
            <sgds-table-cell v-for="column in updates.updates.columns" :key="column">
              <span :class="['sgds:inline-block', column === 'Date' ? 'sgds:min-w-[var(--sgds-dimension-80)] sgds:whitespace-nowrap' : '']">
                <span v-if="column === 'Description'" class="updates-desc-cell" v-html="row[column]"></span>
                <template v-else>{{ row[column] }}</template>
              </span>
            </sgds-table-cell>
          </sgds-table-row>
        </template>
      </sgds-table>
    </Section>

    <Section :title="updates.roadmap.title" gap="sgds:gap-[var(--sgds-gap-xl)]">
      <sgds-table tableBorder headerBackground>
        <sgds-table-row>
          <sgds-table-head v-for="column in updates.roadmap.columns" :key="column">{{ column }}</sgds-table-head>
        </sgds-table-row>
        <sgds-table-row
          v-for="(row, index) in updates.roadmap.rows"
          :key="`${updates.roadmap.title}-${index}`"
        >
          <sgds-table-cell v-for="column in updates.roadmap.columns" :key="column">
            {{ row[column] }}
          </sgds-table-cell>
        </sgds-table-row>
      </sgds-table>
    </Section>

    <Section :title="updates.feedback.title" gap="sgds:gap-[var(--sgds-gap-xl)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:max-w-[var(--sgds-container-max-width-md)]">
        <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
          {{ updates.feedback.heading }}
        </h3>
        <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          {{ updates.feedback.prefix }}
          <sgds-link><a :href="updates.feedback.href">{{ updates.feedback.linkLabel }}</a></sgds-link>
        </p>
      </div>
    </Section>

    <Section :title="updates.bugReports.title" gap="sgds:gap-[var(--sgds-gap-xl)]">
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)] sgds:max-w-[var(--sgds-container-max-width-md)]">
        <h3 class="sgds:text-heading-default sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
          {{ updates.bugReports.heading }}
        </h3>
        <p class="sgds:text-subtle sgds:m-0 sgds:whitespace-pre-line sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          {{ updates.bugReports.prefix }}
          <sgds-link><a :href="updates.bugReports.href">{{ updates.bugReports.linkLabel }}</a></sgds-link>
        </p>
      </div>
    </Section>
  </div>
</template>
