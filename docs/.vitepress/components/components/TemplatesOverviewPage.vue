<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { withBase } from "vitepress";
import { isDarkTheme } from "../../theme/composables/sgds-theming";
import {
  blockTemplateCategoryOrder,
  blockTemplateRecommendedOrder,
  pageTemplateCategoryOrder,
  pageTemplateRecommendedOrder,
  templateOverviewGroups,
  type PatternGroup,
} from "../../data/pattern-docs";

const { group } = defineProps<{
  group: PatternGroup;
}>();

const selectedGroups = ref<string[]>([]);
const selectedSort = ref("recommended");
const mobileFiltersOpen = ref(false);
const isSmallScreen = ref(false);
let removeSmallScreenListener: (() => void) | undefined;

const isBlockOverview = computed(() => group === "block templates");
const filterHeading = computed(() => isBlockOverview.value ? "Block type" : "Template purpose");
const typeSortLabel = computed(() => isBlockOverview.value ? "Block type" : "Template purpose");
const itemNoun = computed(() => isBlockOverview.value ? "block" : "template");
const categoryOrder = computed(() =>
  isBlockOverview.value ? blockTemplateCategoryOrder : pageTemplateCategoryOrder,
);

const templateItems = computed(() =>
  templateOverviewGroups.find((templateGroup) => templateGroup.group === group)?.items ?? [],
);

const getGroupOrder = (label: string) => {
  const index = categoryOrder.value.indexOf(label);
  return index === -1 ? categoryOrder.value.length : index;
};

const getTemplateOrder = (key: string) => {
  const index = pageTemplateRecommendedOrder.indexOf(key);
  return index === -1 ? pageTemplateRecommendedOrder.length : index;
};

const getBlockTemplateOrder = (key: string) => {
  const index = blockTemplateRecommendedOrder.indexOf(key);
  return index === -1 ? blockTemplateRecommendedOrder.length : index;
};

const sortRecommended = (
  current: { key: string; groupLabel: string; title: string },
  next: { key: string; groupLabel: string; title: string },
) => {
  if (!isBlockOverview.value) {
    return getTemplateOrder(current.key) - getTemplateOrder(next.key) || current.title.localeCompare(next.title);
  }

  return getGroupOrder(current.groupLabel) - getGroupOrder(next.groupLabel) ||
    current.groupLabel.localeCompare(next.groupLabel) ||
    getBlockTemplateOrder(current.key) - getBlockTemplateOrder(next.key) ||
    current.title.localeCompare(next.title);
};

const sortByGroup = (current: { groupLabel: string; title: string }, next: { groupLabel: string; title: string }) =>
  getGroupOrder(current.groupLabel) - getGroupOrder(next.groupLabel) ||
  current.groupLabel.localeCompare(next.groupLabel) ||
  current.title.localeCompare(next.title);

const categoryOptions = computed(() => {
  const labels = new Set(templateItems.value.map((item) => item.groupLabel));
  return Array.from(labels)
    .map((label) => ({
      value: label,
      label,
      count: templateItems.value.filter((item) => item.groupLabel === label).length,
    }))
    .sort((current, next) =>
      getGroupOrder(current.label) - getGroupOrder(next.label) || current.label.localeCompare(next.label),
    );
});

const filteredTemplateItems = computed(() => {
  const filtered = templateItems.value.filter((item) => {
    return !selectedGroups.value.length || selectedGroups.value.includes(item.groupLabel);
  });

  return [...filtered].sort((current, next) => {
    if (selectedSort.value === "recommended") return sortRecommended(current, next);
    if (selectedSort.value === "title-asc") return current.title.localeCompare(next.title);
    if (selectedSort.value === "title-desc") return next.title.localeCompare(current.title);
    if (selectedSort.value === "type") return sortByGroup(current, next);
    return 0;
  });
});

const clearFilters = () => {
  selectedGroups.value = [];
};

const selectedGroupValue = computed(() => selectedGroups.value.join(";"));

const syncSelectedGroups = (event: Event) => {
  if (event.target !== event.currentTarget) return;

  const checkboxGroup = event.currentTarget as HTMLInputElement;
  selectedGroups.value = checkboxGroup.value ? checkboxGroup.value.split(";").filter(Boolean) : [];
};

onMounted(() => {
  const mediaQuery = window.matchMedia("(max-width: 1023px)");
  const syncSmallScreen = () => {
    isSmallScreen.value = mediaQuery.matches;
  };

  syncSmallScreen();
  mediaQuery.addEventListener("change", syncSmallScreen);
  removeSmallScreenListener = () => {
    mediaQuery.removeEventListener("change", syncSmallScreen);
  };
});

onBeforeUnmount(() => {
  removeSmallScreenListener?.();
});

watch(isSmallScreen, (smallScreen) => {
  if (!smallScreen) {
    mobileFiltersOpen.value = false;
  }
});

const blockThumbnailKeys = new Set([
  "cards",
  "cards-3-per-column",
  "cards-4-per-column",
  "cta",
  "cta-contained-primary-center",
  "cta-contained-primary",
  "cta-contained-raised-center",
  "cta-contained-raised",
  "cta-full-bleed-alternate-center",
  "cta-full-bleed-alternate",
  "cta-full-bleed-primary-center",
  "cta-full-bleed-primary",
  "feature",
  "feature-image-left-4-8",
  "feature-image-right-4-8",
  "feature-component-left-6-6",
  "feature-component-right-6-6",
  "feature-image-left-6-6",
  "feature-image-right-6-6",
  "feature-image-left-8-4",
  "feature-image-right-8-4",
  "feature-cards-below",
  "feature-no-image-center",
  "feature-no-image-left",
  "filter",
  "filter-checkboxes",
  "form",
  "header",
  "header-page-header-with-breadcrumb",
  "header-page-header",
  "hero",
  "hero-background-image-light",
  "hero-background-image",
  "hero-center",
  "hero-fullbleed",
  "hero-image",
  "hero-basic",
  "stats",
  "stats-3-statistics",
  "stats-4-statistics",
  "stats-5-statistics",
  "stats-right-6-column",
  "stats-right-8-columns",
]);

const placeholderThumbnailKeys = new Set<string>();

const hasThumbnail = (key: string) =>
  !placeholderThumbnailKeys.has(key) &&
  (!isBlockOverview.value || blockThumbnailKeys.has(key) || key.startsWith("form-"));

const thumbnailVersion = "20260514-blog-dark";

const getThumbnailSrc = (key: string) => {
  const themeSuffix = isDarkTheme.value ? "-dark" : "";
  return `${withBase(`/templates/thumbnails/${key}${themeSuffix}.png`)}?v=${thumbnailVersion}`;
};
</script>

<template>
  <div class="sgds:flex sgds:flex-col">
    <section class="sgds:bg-default sgds:pb-layout-md">
      <div class="sgds-container">
        <div class="sgds-grid sgds:items-start">
          <aside v-if="!isSmallScreen" class="sgds-col-lg-3">
            <div class="sgds:flex sgds:flex-col sgds:gap-2-xl sgds:pt-sm">
              <div class="sgds:flex sgds:items-center sgds:justify-between">
                <span class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">Filters</span>
                <sgds-link>
                  <a href="#" @click.prevent="clearFilters">Clear all</a>
                </sgds-link>
              </div>

              <div class="sgds:flex sgds:flex-col sgds:gap-xs">
                <div class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">
                  {{ filterHeading }}
                </div>
                <sgds-checkbox-group
                  :value="selectedGroupValue"
                  @sgds-change="syncSelectedGroups"
                >
                  <sgds-checkbox
                    v-for="option in categoryOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }} ({{ option.count }})
                  </sgds-checkbox>
                </sgds-checkbox-group>
              </div>
            </div>
          </aside>

          <div class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-9">
            <div
              :class="[
                'sgds:mb-xl sgds:items-center',
                isSmallScreen ? 'sgds-grid' : 'sgds:flex sgds:justify-between sgds:gap-component-md',
              ]"
            >
              <div v-if="isSmallScreen" class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds:flex sgds:items-center sgds:gap-component-sm">
                <sgds-button
                  variant="outline"
                  tone="neutral"
                  class="sgds:flex-none"
                  :aria-expanded="mobileFiltersOpen ? 'true' : 'false'"
                  aria-controls="template-overview-filter-drawer"
                  @click="mobileFiltersOpen = !mobileFiltersOpen"
                >
                  <sgds-icon slot="leftIcon" name="bi-funnel"></sgds-icon>
                  Filters
                </sgds-button>
                <sgds-select
                  class="sgds:min-w-0 sgds:flex-1"
                  label=""
                  placeholder="Sort by"
                  :value="selectedSort"
                  @sgds-change="selectedSort = $event.target.value"
                >
                  <sgds-select-option value="recommended">Recommended</sgds-select-option>
                  <sgds-select-option value="title-asc">Name: A-Z</sgds-select-option>
                  <sgds-select-option value="title-desc">Name: Z-A</sgds-select-option>
                  <sgds-select-option value="type">{{ typeSortLabel }}</sgds-select-option>
                </sgds-select>
              </div>
              <sgds-drawer
                v-if="isSmallScreen"
                id="template-overview-filter-drawer"
                placement="end"
                size="sm"
                ariaLabel="Filter templates"
                :open="mobileFiltersOpen"
                @sgds-request-close="mobileFiltersOpen = false"
                @sgds-after-hide="mobileFiltersOpen = false"
              >
                <span slot="title" class="sgds:text-heading-xs sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Filters</span>
                <span slot="description" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">{{ filterHeading }}</span>
                <div class="sgds:flex sgds:flex-col sgds:gap-component-md">
                  <sgds-checkbox-group
                    :value="selectedGroupValue"
                    @sgds-change="syncSelectedGroups"
                  >
                    <sgds-checkbox
                      v-for="option in categoryOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }} ({{ option.count }})
                    </sgds-checkbox>
                  </sgds-checkbox-group>
                </div>
                <div slot="footer" class="sgds:flex sgds:justify-between sgds:gap-component-sm">
                  <sgds-button variant="ghost" tone="neutral" @click="clearFilters">Clear all</sgds-button>
                  <sgds-button @click="mobileFiltersOpen = false">Done</sgds-button>
                </div>
              </sgds-drawer>
              <h2 class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-5 sgds:m-0 sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-heading-default">
                Showing {{ filteredTemplateItems.length }} result<span v-if="filteredTemplateItems.length !== 1">s</span>
              </h2>
              <sgds-select
                v-if="!isSmallScreen"
                class="sgds:min-w-[var(--sgds-dimension-200)]"
                label=""
                placeholder="Sort by"
                :value="selectedSort"
                @sgds-change="selectedSort = $event.target.value"
              >
                <sgds-select-option value="recommended">Recommended</sgds-select-option>
                <sgds-select-option value="title-asc">Name: A-Z</sgds-select-option>
                <sgds-select-option value="title-desc">Name: Z-A</sgds-select-option>
                <sgds-select-option value="type">{{ typeSortLabel }}</sgds-select-option>
              </sgds-select>
            </div>

            <div class="sgds-grid sgds:items-start">
              <div
                v-for="item in filteredTemplateItems"
                :key="item.key"
                class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-4"
              >
                <sgds-link class="sgds:block">
                  <a :href="item.previewHref" class="sgds:flex sgds:flex-col sgds:gap-component-sm">
                    <div class="sgds:relative sgds:flex sgds:w-full sgds:aspect-[424/300] sgds:overflow-hidden sgds:rounded-[32px] sgds:bg-alternate" aria-hidden="true">
                      <img
                        v-if="hasThumbnail(item.key)"
                        :src="getThumbnailSrc(item.key)"
                        alt=""
                        loading="lazy"
                        class="sgds:h-full sgds:w-full sgds:object-cover"
                      />
                      <div
                        v-else
                        class="sgds:h-full sgds:w-full sgds:bg-muted"
                      ></div>
                    </div>
                    <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:w-full">
                      <h4 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:flex-1 sgds:mb-0 sgds:text-heading-default sgds:text-left">{{ item.title }}</h4>
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
              <h3 class="sgds:m-0 sgds:text-subtitle-md sgds:font-semibold sgds:text-heading-default">No {{ itemNoun }}s found</h3>
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
