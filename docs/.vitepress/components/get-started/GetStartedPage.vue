<script setup lang="ts">
import {
  designTabs,
  getStartedNavItems,
  getStartedPages,
} from "../../data/get-started";
import GetStartedPageSections from "./GetStartedPageSections.vue";

defineOptions({
  name: "GetStartedPage",
});

const props = defineProps<{
  pageKey: "overview" | "about-sgds" | "design" | "develop";
}>();

const page = props.pageKey === "design" ? designTabs[0].page : getStartedPages[props.pageKey];

const isCurrentNavGroup = (label: string) => {
  if (props.pageKey === "design") return label === "Design";
  if (props.pageKey === "develop") return label === "Develop";
  if (props.pageKey === "about-sgds") return label === "About SGDS";
  return false;
};

</script>

<template>
  <div class="sgds-grid">
    <aside class="sgds-col-4 sgds-col-lg-3 sgds:pt-layout-xs sgds:pr-layout-md sgds:pb-0 sgds:pl-0">
      <div>
        <div class="sgds:mb-text-sm sgds:inline-flex sgds:items-center sgds:gap-text-xs">
          <h5 class="sgds:mb-0">Get Started</h5>
        </div>
        <sgds-sidenav>
          <sgds-sidenav-item
            v-for="item in getStartedNavItems"
            :key="item.label"
            :active="isCurrentNavGroup(item.label) || null"
            :disabled="!item.href || null"
          >
            <a
              :href="item.href || '#'"
              class="sgds:flex sgds:items-center sgds:gap-text-xs"
              @click="!item.href && $event.preventDefault()"
            >
              {{ item.label }}
              <sgds-badge v-if="item.badge" variant="accent" outlined>{{ item.badge }}</sgds-badge>
            </a>
          </sgds-sidenav-item>
        </sgds-sidenav>
      </div>
    </aside>

    <main class="sgds-col-4 sgds-col-lg-9 sgds:flex sgds:max-w-container-md sgds:flex-col sgds:gap-layout-xl">
      <section class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <h1 class="sgds:m-0 sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter">
          {{ page.title }}
        </h1>
        <p
          v-if="page.description"
          class="sgds:m-0 sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle"
        >
          {{ page.description }}
        </p>
        <div v-if="page.headerLinks?.length" class="sgds:flex sgds:flex-col sgds:gap-text-xs">
          <div
            v-for="link in page.headerLinks"
            :key="link.label"
            class="sgds:grid sgds:grid-cols-[var(--sgds-dimension-96)_minmax(0,1fr)] sgds:items-center sgds:gap-x-text-xs"
          >
            <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              {{ link.label }}
            </span>
            <sgds-link tone="neutral">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="get-started-source-link sgds:inline-flex sgds:items-center sgds:gap-text-2-xs"
              >
                <span
                  aria-hidden="true"
                  :class="`get-started-brand-icon get-started-brand-icon--${link.label.toLowerCase()}`"
                ></span>
                <span class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">{{ link.path }}</span>
              </a>
            </sgds-link>
          </div>
        </div>
        <div v-if="page.intro?.length" class="sgds:flex sgds:flex-col sgds:gap-text-md">
          <p
            v-for="paragraph in page.intro"
            :key="paragraph"
            class="sgds:m-0 sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-heading-subtle"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <section v-if="page.reasons?.length" class="sgds:flex sgds:flex-col sgds:gap-text-xl">
        <h2 class="sgds:m-0 sgds:text-heading-lg sgds:font-semibold sgds:leading-lg sgds:tracking-tight">
          Why use SGDS v3?
        </h2>
        <div class="sgds:flex sgds:flex-col sgds:gap-text-lg">
          <div v-for="reason in page.reasons" :key="reason.title" class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
            <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
              {{ reason.title }}
            </h3>
            <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
              {{ reason.description }}
            </p>
          </div>
        </div>
      </section>

      <section v-if="page.table" class="sgds:flex sgds:flex-col sgds:gap-text-lg">
        <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
          <h2 class="sgds:m-0 sgds:text-heading-lg sgds:font-semibold sgds:leading-lg sgds:tracking-tight">
            {{ page.table.title }}
          </h2>
          <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle">
            {{ page.table.description }}
          </p>
        </div>
        <sgds-table tableBorder headerBackground responsive="md">
          <sgds-table-row>
            <sgds-table-head>Feature</sgds-table-head>
            <sgds-table-head>What’s changed?</sgds-table-head>
          </sgds-table-row>
          <sgds-table-row v-for="row in page.table.rows" :key="row.feature">
            <sgds-table-cell>
              <strong>{{ row.feature }}</strong>
            </sgds-table-cell>
            <sgds-table-cell>{{ row.change }}</sgds-table-cell>
          </sgds-table-row>
        </sgds-table>
      </section>

      <template v-if="props.pageKey === 'design'">
        <sgds-tab-group variant="underlined" class="sgds:block sgds:w-full">
          <sgds-tab
            v-for="tab in designTabs"
            :key="tab.key"
            slot="nav"
            :panel="tab.key"
            :active="tab.key === designTabs[0].key || null"
          >
            {{ tab.label }}
          </sgds-tab>
          <sgds-tab-panel v-for="tab in designTabs" :key="tab.key" :name="tab.key">
            <div class="sgds:pt-layout-lg">
              <GetStartedPageSections :page="tab.page" />
            </div>
          </sgds-tab-panel>
        </sgds-tab-group>
      </template>

      <GetStartedPageSections v-else :page="page" />
    </main>
  </div>
</template>

<style>
/* Brand icon masks — reuses the same SVG assets as PageHeader */
.get-started-brand-icon {
  display: block;
  height: var(--sgds-dimension-16);
  width: var(--sgds-dimension-16);
}

.get-started-brand-icon--github {
  background-color: #181717;
  mask: url("/brands/github.svg") center / contain no-repeat;
}

.get-started-brand-icon--storybook {
  background-color: #ff4785;
  mask: url("/brands/storybook.svg") center / contain no-repeat;
}

.sgds-night-theme .get-started-brand-icon--github,
.sgds-night-theme .get-started-brand-icon--storybook {
  background-color: var(--sgds-color-fixed-light);
}

/* Hide redundant external-link icon on source links */
.get-started-source-link::after,
.get-started-source-link .external-link-icon {
  content: none !important;
  display: none !important;
}
</style>
