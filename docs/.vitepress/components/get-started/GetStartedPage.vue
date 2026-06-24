<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useData, withBase } from "vitepress";
import {
  designTabs,
  getStartedNavItems,
  getStartedPages,
} from "../../data/get-started";
import SectionHeader from "../foundations/SectionHeader.vue";
import PageHeader from "../page/PageHeader.vue";
import GetStartedPageSections from "./GetStartedPageSections.vue";

defineOptions({
  name: "GetStartedPage",
});

const props = defineProps<{
  pageKey: "overview" | "about-sgds" | "design" | "develop" | "content";
}>();

const { page: vitePressPage } = useData();
const mobileSideNavOpen = ref(false);

const page = props.pageKey === "design" ? designTabs[0].page : getStartedPages[props.pageKey];

const headerLinks = computed(() =>
  page.headerLinks?.map((link) => ({
    ...link,
    iconSrc: `/brands/${link.label.toLowerCase()}.svg`,
  })),
);

const pageHeaderDescription = computed(() =>
  page.description ?? (page.introHtml ? undefined : page.intro?.join(" ")),
);

const pageHeaderDescriptionHtml = computed(() =>
  page.introHtml,
);

const bodyIntro = computed(() =>
  page.description ? page.intro : undefined,
);

const currentPath = computed(() =>
  `/${vitePressPage.value.relativePath.replace(/\.md$/, "")}`.replace(/\/index$/, "/"),
);

const isCurrentNavItem = (href: string) => currentPath.value === href;

watch(currentPath, () => {
  mobileSideNavOpen.value = false;
});

</script>

<template>
  <div class="sgds-grid">
    <aside class="get-started-desktop-sidenav sgds-col-4 sgds-col-lg-3 sgds:pt-[var(--sgds-padding-xs)] sgds:pr-[var(--sgds-padding-2-xl)] sgds:pb-0 sgds:pl-0">
      <div>
        <div class="sgds:inline-flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:mb-[var(--sgds-margin-sm)]">
          <h5 class="sgds:mb-0 sgds:text-heading-default">Get started</h5>
        </div>
        <sgds-sidenav>
          <sgds-sidenav-item
            v-for="item in getStartedNavItems"
            :key="item.label"
            :active="isCurrentNavItem(item.href) || null"
            :disabled="!item.href || null"
          >
            <a
              :href="item.href ? withBase(item.href) : '#'"
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

    <main class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-9">
      <div class="get-started-mobile-sidenav-trigger sgds:mb-component-md">
        <sgds-button
          variant="outline"
          tone="neutral"
          :ariaLabel.prop="'Browse Get started'"
          @click="mobileSideNavOpen = true"
        >
          <sgds-icon slot="leftIcon" name="menu"></sgds-icon>
          Browse <span class="sgds:font-semibold">Get started</span>
        </sgds-button>
      </div>

      <sgds-drawer
        class="get-started-mobile-sidenav"
        placement="start"
        size="sm"
        :open="mobileSideNavOpen || null"
        @sgds-request-close="mobileSideNavOpen = false"
      >
        <h2 slot="title" class="sgds:text-heading-md sgds:text-heading-default sgds:mb-0">
          Get started
        </h2>
        <sgds-sidenav>
          <sgds-sidenav-item
            v-for="item in getStartedNavItems"
            :key="item.label"
            :active="isCurrentNavItem(item.href) || null"
            :disabled="!item.href || null"
          >
            <a
              :href="item.href ? withBase(item.href) : '#'"
              class="sgds:flex sgds:items-center sgds:gap-text-xs"
              @click="item.href ? mobileSideNavOpen = false : $event.preventDefault()"
            >
              {{ item.label }}
              <sgds-badge v-if="item.badge" variant="accent" outlined>{{ item.badge }}</sgds-badge>
            </a>
          </sgds-sidenav-item>
        </sgds-sidenav>
      </sgds-drawer>

      <PageHeader
        :title="page.title"
        :description="pageHeaderDescription"
        :description-html="pageHeaderDescriptionHtml"
        title-class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter sgds:text-display-default"
        description-class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-body-subtle"
        :header-links="headerLinks"
        bottom-gap-class="sgds:mb-layout-md"
      />

      <div class="sgds:flex sgds:w-full sgds:flex-col sgds:gap-layout-xl">
        <section v-if="bodyIntro?.length" class="sgds:flex sgds:flex-col sgds:gap-text-md">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
            <p
              v-for="paragraph in bodyIntro"
              :key="paragraph"
              class="sgds:m-0 sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight sgds:text-body-subtle"
            >
              {{ paragraph }}
            </p>
          </div>
        </section>

        <section v-if="page.reasons?.length" class="sgds:flex sgds:flex-col sgds:gap-text-xl">
          <SectionHeader title="Why use SGDS v3?" />
          <div class="sgds:flex sgds:flex-col sgds:gap-text-lg">
            <div v-for="reason in page.reasons" :key="reason.title" class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
              <h3 class="sgds:m-0 sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default">
                {{ reason.title }}
              </h3>
              <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
                {{ reason.description }}
              </p>
            </div>
          </div>
        </section>

        <section v-if="page.table" class="sgds:flex sgds:flex-col sgds:gap-text-lg">
          <SectionHeader :title="page.table.title" :description="page.table.description" header-gap="sgds:gap-text-xs" />
          <sgds-table tableBorder headerBackground responsive="md">
            <sgds-table-row>
              <sgds-table-head class="sgds:w-[14rem] sgds:min-w-[14rem] sgds:whitespace-nowrap">Feature</sgds-table-head>
              <sgds-table-head>What’s changed?</sgds-table-head>
            </sgds-table-row>
            <sgds-table-row v-for="row in page.table.rows" :key="row.feature">
              <sgds-table-cell class="sgds:w-[14rem] sgds:min-w-[14rem] sgds:whitespace-nowrap">
                <span class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:text-label-default">
                  {{ row.feature }}
                </span>
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
              :ariaLabel.prop="tab.label"
            >
              {{ tab.label }}
            </sgds-tab>
            <sgds-tab-panel v-for="tab in designTabs" :key="tab.key" :name="tab.key">
              <div class="sgds:pt-[var(--sgds-text-gap-2-xl)]">
                <GetStartedPageSections :page="tab.page" />
              </div>
            </sgds-tab-panel>
          </sgds-tab-group>
        </template>

        <GetStartedPageSections v-else :page="page" />
      </div>
    </main>
  </div>
</template>

<style>
/* Match the docs layout sidenav behaviour until SGDS ships an official mobile sidenav pattern. */
.get-started-mobile-sidenav-trigger {
  display: none;
}

@media screen and (max-width: 1023px) {
  .get-started-desktop-sidenav {
    display: none;
  }

  .get-started-mobile-sidenav-trigger {
    display: block;
  }
}
</style>
