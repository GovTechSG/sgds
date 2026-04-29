<script setup lang="ts">
import { computed, ref } from "vue";
import { templateOverviewGroups, type PatternGroup } from "../../data/pattern-docs";

const { group } = defineProps<{
  group: PatternGroup;
}>();

const selectedGroup = ref("all");
const selectedSort = ref("recommended");

const getTemplateImage = (key: string) => `/templates/thumbnails/${key}.png`;

const templateItems = computed(() =>
  templateOverviewGroups.find((templateGroup) => templateGroup.group === group)?.items ?? [],
);

const categoryOptions = computed(() => {
  const labels = new Set(templateItems.value.map((item) => item.groupLabel));
  return Array.from(labels).map((label) => ({
    value: label,
    label,
    count: templateItems.value.filter((item) => item.groupLabel === label).length,
  }));
});

const filteredTemplateItems = computed(() => {
  const filtered = templateItems.value.filter((item) => {
    return selectedGroup.value === "all" || item.groupLabel === selectedGroup.value;
  });

  return [...filtered].sort((current, next) => {
    if (selectedSort.value === "title-asc") return current.title.localeCompare(next.title);
    if (selectedSort.value === "title-desc") return next.title.localeCompare(current.title);
    if (selectedSort.value === "type") {
      return current.groupLabel.localeCompare(next.groupLabel) || current.title.localeCompare(next.title);
    }
    return 0;
  });
});

const selectGroup = (value: string) => {
  selectedGroup.value = selectedGroup.value === value ? "all" : value;
};

const clearFilters = () => {
  selectedGroup.value = "all";
};

</script>

<template>
  <div class="sgds:flex sgds:flex-col">
    <section class="sgds:bg-default sgds:pb-layout-md">
      <div class="sgds-container">
        <div class="sgds-grid sgds:items-start">
          <aside class="sgds-col-4 sgds-col-lg-3 sgds:mr-layout-md">
            <div class="sgds:flex sgds:flex-col sgds:gap-2-xl sgds:pt-sm">
              <div class="sgds:flex sgds:items-center sgds:justify-between">
                <span class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Filters</span>
                <sgds-link>
                  <a href="#" @click.prevent="clearFilters">Clear all</a>
                </sgds-link>
              </div>

              <div class="sgds:flex sgds:flex-col sgds:gap-xs">
                <div class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">
                  Category
                </div>
                <sgds-checkbox-group>
                  <sgds-checkbox
                    v-for="option in categoryOptions"
                    :key="option.value"
                    :value="option.value"
                    :checked="selectedGroup === option.value ? '' : null"
                    @sgds-change="selectGroup(option.value)"
                  >
                    {{ option.label }} ({{ option.count }})
                  </sgds-checkbox>
                </sgds-checkbox-group>
              </div>
            </div>
          </aside>

          <div class="sgds-col-4 sgds-col-lg-9">
            <div class="sgds:mb-xl sgds:flex sgds:items-center sgds:justify-between sgds:gap-component-md">
              <h2 class="sgds:m-0 sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
                Showing {{ filteredTemplateItems.length }} result<span v-if="filteredTemplateItems.length !== 1">s</span>
              </h2>
              <sgds-select
                class="sgds:min-w-[var(--sgds-dimension-200)]"
                label=""
                placeholder="Sort by"
                :value="selectedSort"
                @sgds-change="selectedSort = $event.target.value"
              >
                <sgds-select-option value="recommended">Recommended</sgds-select-option>
                <sgds-select-option value="title-asc">Name: A-Z</sgds-select-option>
                <sgds-select-option value="title-desc">Name: Z-A</sgds-select-option>
                <sgds-select-option value="type">Template type</sgds-select-option>
              </sgds-select>
            </div>

            <div class="sgds-grid sgds:items-start">
              <div
                v-for="item in filteredTemplateItems"
                :key="item.key"
                class="sgds-col-4 sgds-col-md-4 sgds-col-lg-4"
              >
                <sgds-link class="sgds:block">
                  <a :href="item.previewHref" class="sgds:flex sgds:flex-col sgds:gap-component-md sgds:no-underline">
                    <div class="sgds:relative sgds:flex sgds:w-full sgds:aspect-[424/300] sgds:overflow-hidden sgds:rounded-[32px]">
                      <img
                        :src="getTemplateImage(item.key)"
                        :alt="`${item.title} template preview`"
                        class="sgds:w-full sgds:h-full sgds:object-cover sgds:object-top"
                      />
                    </div>
                    <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:w-full">
                      <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:flex-1 sgds:mb-0 sgds:text-heading-default sgds:text-left">{{ item.title }}</h4>
                      <sgds-icon name="arrow-right" size="2-xl" class="sgds:text-default sgds:flex-shrink-0"></sgds-icon>
                    </div>
                  </a>
                </sgds-link>
              </div>
            </div>

            <div
              v-if="!filteredTemplateItems.length"
              class="sgds:mt-layout-sm sgds:flex sgds:flex-col sgds:items-start sgds:gap-component-sm sgds:rounded-lg sgds:border sgds:border-muted sgds:bg-surface-raised sgds:p-layout-md"
            >
              <h3 class="sgds:m-0 sgds:text-subtitle-md sgds:font-semibold sgds:text-heading-default">No templates found</h3>
              <p class="sgds:m-0 sgds:text-body-md sgds:text-body-subtle">Try clearing the filters.</p>
              <sgds-button variant="outline" tone="neutral" @click="clearFilters">Clear filters</sgds-button>
            </div>

            <div class="sgds:mt-layout-sm sgds:flex sgds:justify-end">
              <sgds-pagination
                length="1"
                currentPage="1"
                :limit="filteredTemplateItems.length || 1"
                size="sm"
              ></sgds-pagination>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
