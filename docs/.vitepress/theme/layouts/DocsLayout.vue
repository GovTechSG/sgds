<script setup lang="ts">
import { Content, withBase } from "vitepress";
import { computed } from 'vue';
import { useData } from 'vitepress';
import PageHeader from "../../components/page/PageHeader.vue";
import DocFooter from "../../components/page/DocFooter.vue";
import { isDraft } from "../../utils/page-status";
import { getComponentDoc } from "../../data/component-docs";

const { theme, page } = useData()
const currentPath = computed(() => `/${page.value.relativePath.replace(/\.md$/, '')}`)

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

const getDerivedGroupBase = (base: string, texts: string | string[]) => {
  const segments = Array.isArray(texts) ? texts : [texts]
  const path = segments
    .map((text) =>
      text
        .trim()
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .toLowerCase()
    )
    .join("/")

  return `/${base}/${path}/`
}

const isSideNavGroupActive = (base: string, text: string[], current: string) => {
  return current.startsWith(getDerivedGroupBase(base, text));
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

// Walk the sidebar tree to build a breadcrumb trail for the current page.
// Returns an array of label strings (section → group → sub-group), excluding
// the current page title (which PageHeader already renders as the h1).
const breadcrumbs = computed<string[]>(() => {
  const sidebar = currentSidebar.value as any
  if (!sidebar?.items?.length) return []

  const path = currentPath.value
  const sectionLabel = header.value

  for (const group of sidebar.items) {
    if (!group.items?.length) {
      // Flat top-level leaf
      if (group.link === path) return [sectionLabel]
      continue
    }

    for (const item of group.items) {
      if (!item.items?.length) {
        // 2-level: section → group → leaf
        if (item.link === path) return [sectionLabel, formatSidebarLabel(group.text)]
      } else {
        // 3-level: section → group → sub-group → leaf
        for (const subItem of item.items) {
          if (subItem.link === path) {
            return [sectionLabel, formatSidebarLabel(group.text), formatSidebarLabel(item.text)]
          }
        }
      }
    }
  }

  return [sectionLabel]
})

const pageMetadata = computed(() => {
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

</script>

<template>
  <div class="sgds:mb-[var(--sgds-margin-xl)]">
    <div class="sgds-grid">
      <aside
        class="sgds-col-4 sgds-col-lg-3 sgds:pt-[var(--sgds-padding-xs)] sgds:pr-[var(--sgds-padding-2-xl)] sgds:pb-0 sgds:pl-0"
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
              <sgds-sidenav-item v-if="group.items && group.items.length" :active="isSideNavGroupActive(currentSection, [group.text], currentPath) || null">
                <span slot="title">{{ formatSidebarLabel(group.text) }}</span>
                <template
                  v-for="item in group.items"
                  :key="item.link"
                >
                  <sgds-sidenav-item v-if="item.items && item.items.length" :active="isSideNavGroupActive(currentSection, [group.text, item.text], currentPath) || null">
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
                  <sgds-sidenav-link v-else :active="(currentPath === item.link) || null">
                    <a
                      :href="isDraft(group.text) ? undefined : withBase(item.link)"
                      :class="isDraft(group.text) ? 'sgds:cursor-not-allowed' : ''"
                    >
                    {{ formatSidebarLabel(item.text) }}
                  </a>
                  </sgds-sidenav-link>
                </template>
              </sgds-sidenav-item>
              <sgds-sidenav-link v-else :active="(currentPath === withBase(group.link)) || null">
                <a :href="withBase(group.link)">{{ formatSidebarLabel(group.text) }}</a>
              </sgds-sidenav-link>
            </template>
          </sgds-sidenav>
        </div>
      </aside>
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-9">
        <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
          <sgds-breadcrumb v-if="breadcrumbs.length">
            <sgds-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index">
              <a>{{ crumb }}</a>
            </sgds-breadcrumb-item>
            <sgds-breadcrumb-item>
              <a>{{ page.title }}</a>
            </sgds-breadcrumb-item>
          </sgds-breadcrumb>
          <PageHeader
            :title="page.title"
            :description="page.description"
            :metadata="pageMetadata"
            :bottom-gap-class="pageHeaderBottomGapClass"
            :header-alert="page.frontmatter.headerAlert"
          />
        </div>
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
</style>
