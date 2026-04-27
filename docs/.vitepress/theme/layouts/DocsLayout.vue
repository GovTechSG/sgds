<script setup lang="ts">
import { Content, withBase } from "vitepress";
import { computed, ref, watch } from 'vue';
import { useData } from 'vitepress';
import PageHeader from "../../components/page/PageHeader.vue";
import DocFooter from "../../components/page/DocFooter.vue";
import { isDraft } from "../../utils/page-status";
import { getComponentDoc, getComponentHeaderLinks } from "../../data/component-docs";

const { theme, page } = useData()
const mobileSideNavOpen = ref(false)
const currentPath = computed(() =>
  `/${page.value.relativePath.replace(/\.md$/, '')}`
)

const currentSection = computed(() => {
  const rel = page.value?.relativePath || ""
  return rel.split("/")[0] || "" // e.g. "foundations"
})

const currentComponentKey = computed(() => {
  if (currentSection.value !== "components") return "";
  const [, componentKey] = (page.value?.relativePath || "").split("/");
  return componentKey?.replace(/\.md$/, "") || "";
})

const currentComponentDoc = computed(() => {
  if (!currentComponentKey.value) return null;
  return getComponentDoc(currentComponentKey.value);
})

const sectionLabels: Record<string, string> = {
  ai: "AI",
}

const header = computed(() => {
  const section = currentSection.value
  if (!section) return ""
  return sectionLabels[section] || (section.charAt(0).toUpperCase() + section.slice(1))
})

const showHeaderBadge = computed(() => currentSection.value === "ai")
const pageHeaderBottomGapClass = computed(() => "sgds:mb-layout-lg")

const currentSidebar = computed(() => {
  const sidebars = theme.value?.sidebar || {}
  const section = currentSection.value
  if (!section) return []

  const entry = sidebars[`/${section}/`]
  if (!entry) return []

  return entry || []
})

// Returns true if the current path matches any leaf link within a sidebar item tree.
// Walks recursively so active state is determined by actual link values, not derived URLs.
const isSideNavGroupActive = (group: any, current: string): boolean => {
  if (!group?.items?.length) return false
  for (const item of group.items) {
    if (item.link === current) return true
    if (item.items?.length && isSideNavGroupActive(item, current)) return true
  }
  return false
}

const acronymMap: Record<string, string> = {
  ai: "AI",
  api: "API",
  mcp: "MCP",
  sgds: "SGDS",
}

const formatSidebarLabel = (text?: string) => {
  if (!text) return ""

  const trimmed = text.trim()
  if (!trimmed) return ""

  if (/[.]/.test(trimmed)) return trimmed

  const words = trimmed.split(/\s+/)

  return words
    .map((word, index) => {
      const lowerWord = word.toLowerCase()
      if (acronymMap[lowerWord]) return acronymMap[lowerWord]
      if (index === 0) return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1)
      return lowerWord
    })
    .join(" ")
}

// Component pages auto-derive GitHub + Storybook header links from the doc key.
// Frontmatter-supplied `headerLinks` still win, so individual pages can
// override (e.g. to point at a specific branch) without losing the default.
const resolvedHeaderLinks = computed(() => {
  const fromFrontmatter = page.value.frontmatter.headerLinks;
  if (fromFrontmatter?.length) return fromFrontmatter;
  if (currentSection.value === "components" && currentComponentKey.value) {
    return getComponentHeaderLinks(currentComponentKey.value);
  }
  return undefined;
});

const pageMetadata = computed(() => {
  if (resolvedHeaderLinks.value?.length) {
    return [];
  }

  if (currentSection.value === "components" && currentComponentDoc.value) {
    const { metadataStatus } = currentComponentDoc.value;
    return [
      { label: "Figma", status: metadataStatus.figma },
      // Keep responsive status data in place, but hide it in the UI for now.
      // We may bring this back once component responsiveness has been fully reviewed.
      null,
      { label: "Storybook", status: metadataStatus.storybook },
    ].filter(Boolean);
  }

  const items = [
    page.value.frontmatter.figma ? { label: "Figma", status: "available" as const } : null,
    page.value.frontmatter.responsive ? { label: "Responsive", status: "available" as const } : null,
    page.value.frontmatter.storybook ? { label: "Storybook", status: "available" as const } : null,
  ].filter(Boolean);

  return items;
})

watch(currentPath, () => {
  mobileSideNavOpen.value = false
})

</script>

<template>
  <div class="sgds:mb-[var(--sgds-margin-xl)]">
    <div class="sgds-grid">
      <aside
        class="docs-layout-desktop-sidenav sgds-col-4 sgds-col-lg-3 sgds:pt-[var(--sgds-padding-xs)] sgds:pr-[var(--sgds-padding-2-xl)] sgds:pb-0 sgds:pl-0"
        v-if="currentSidebar.items.length"
      >
        <div>
          <div class="sgds:inline-flex sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:mb-[var(--sgds-margin-sm)]">
            <h5 class="sgds:mb-0">{{ header }}</h5>
            <sgds-badge v-if="showHeaderBadge" variant="accent" outlined>NEW</sgds-badge>
          </div>
          <sgds-sidenav>
            <template
              v-for="group in currentSidebar.items"
              :key="group.text"
            >
              <sgds-sidenav-item v-if="group.items && group.items.length" :active="isSideNavGroupActive(group, currentPath) || null">
                <span slot="title">{{ formatSidebarLabel(group.text) }}</span>
                <template
                  v-for="item in group.items"
                  :key="item.link ?? item.text"
                >
                  <sgds-sidenav-item v-if="item.items && item.items.length" :active="isSideNavGroupActive(item, currentPath) || null">
                    <span slot="title">{{ formatSidebarLabel(item.text) }}</span>
                    <template
                      v-for="secondLevelItem in item.items"
                      :key="secondLevelItem.link"
                    >
                    <sgds-sidenav-link :active="(currentPath === secondLevelItem.link) || null">
                      <a
                        :href="isDraft(group.text) ? undefined : withBase(secondLevelItem.link)"
                        :class="isDraft(group.text) ? 'sgds:cursor-not-allowed' : ''"
                      >
                      {{ formatSidebarLabel(secondLevelItem.text) }}
                    </a>
                    </sgds-sidenav-link>
                    </template>
                  </sgds-sidenav-item>
                  <sgds-sidenav-link v-else-if="item.link" :active="(currentPath === item.link) || null">
                    <a
                      :href="isDraft(group.text) ? undefined : withBase(item.link)"
                      :class="isDraft(group.text) ? 'sgds:cursor-not-allowed' : ''"
                    >
                    {{ formatSidebarLabel(item.text) }}
                  </a>
                  </sgds-sidenav-link>
                </template>
              </sgds-sidenav-item>
              <sgds-sidenav-item v-else :active="(currentPath === withBase(group.link)) || null">
                <a :href="withBase(group.link)">{{ formatSidebarLabel(group.text) }}</a>
              </sgds-sidenav-item>
            </template>
          </sgds-sidenav>
        </div>
      </aside>
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-9">
        <div
          v-if="currentSidebar.items.length"
          class="docs-layout-mobile-sidenav-trigger sgds:mb-component-md"
        >
          <sgds-button
            variant="outline"
            tone="neutral"
            @click="mobileSideNavOpen = true"
          >
            <sgds-icon slot="leftIcon" name="menu"></sgds-icon>
            Browse {{ header }}
          </sgds-button>
        </div>

        <sgds-drawer
          v-if="currentSidebar.items.length"
          class="docs-layout-mobile-sidenav"
          placement="start"
          size="sm"
          :open="mobileSideNavOpen || null"
          @sgds-request-close="mobileSideNavOpen = false"
        >
          <h2 slot="title" class="sgds:text-heading-md sgds:mb-0">
            {{ header }}
          </h2>
          <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
            <div
              v-if="showHeaderBadge"
              class="sgds:flex sgds:items-center"
            >
              <sgds-badge variant="accent" outlined>NEW</sgds-badge>
            </div>
            <sgds-sidenav>
              <template
                v-for="group in currentSidebar.items"
                :key="group.text"
              >
                <sgds-sidenav-item v-if="group.items && group.items.length" :active="isSideNavGroupActive(group, currentPath) || null">
                  <span slot="title">{{ formatSidebarLabel(group.text) }}</span>
                  <template
                    v-for="item in group.items"
                    :key="item.link ?? item.text"
                  >
                    <sgds-sidenav-item v-if="item.items && item.items.length" :active="isSideNavGroupActive(item, currentPath) || null">
                      <span slot="title">{{ formatSidebarLabel(item.text) }}</span>
                      <template
                        v-for="secondLevelItem in item.items"
                        :key="secondLevelItem.link"
                      >
                        <sgds-sidenav-link :active="(currentPath === secondLevelItem.link) || null">
                          <a
                            :href="isDraft(group.text) ? undefined : withBase(secondLevelItem.link)"
                            :class="isDraft(group.text) ? 'sgds:cursor-not-allowed' : ''"
                            @click="mobileSideNavOpen = false"
                          >
                            {{ formatSidebarLabel(secondLevelItem.text) }}
                          </a>
                        </sgds-sidenav-link>
                      </template>
                    </sgds-sidenav-item>
                    <sgds-sidenav-link v-else :active="(currentPath === item.link) || null">
                      <a
                        :href="isDraft(group.text) ? undefined : withBase(item.link)"
                        :class="isDraft(group.text) ? 'sgds:cursor-not-allowed' : ''"
                        @click="mobileSideNavOpen = false"
                      >
                        {{ formatSidebarLabel(item.text) }}
                      </a>
                    </sgds-sidenav-link>
                  </template>
                </sgds-sidenav-item>
                <sgds-sidenav-item v-else :active="(currentPath === withBase(group.link)) || null">
                  <a :href="withBase(group.link)" @click="mobileSideNavOpen = false">{{ formatSidebarLabel(group.text) }}</a>
                </sgds-sidenav-item>
              </template>
            </sgds-sidenav>
          </div>
        </sgds-drawer>

        <PageHeader
          :title="page.title"
          :description="page.description"
          :metadata="pageMetadata"
          :header-links="resolvedHeaderLinks"
          :bottom-gap-class="pageHeaderBottomGapClass"
          :header-alert="page.frontmatter.headerAlert"
        />
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-xl">
          <div :class="currentSection === 'ai' ? 'docs-layout-content-ai' : 'docs-layout-content'">
            <Content />
          </div>
          <DocFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Heading spacing for markdown-rendered content — requires descendant combinator */
.docs-layout-content > * > * + h2,
.docs-layout-content > * > * + h3,
.docs-layout-content > * > * + h4 {
  margin-top: var(--sgds-layout-gap-md);
}

/* AI section uses wider heading spacing */
.docs-layout-content-ai > * > * + h2,
.docs-layout-content-ai > * > * + h3,
.docs-layout-content-ai > * > * + h4 {
  margin-top: var(--sgds-layout-gap-lg);
}

/* Temporary mobile sidenav trigger until SGDS ships an official mobile sidenav pattern */
.docs-layout-mobile-sidenav-trigger {
  display: none;
}

@media screen and (max-width: 1023px) {
  .docs-layout-desktop-sidenav {
    display: none;
  }

  .docs-layout-mobile-sidenav-trigger {
    display: block;
  }
}
</style>
