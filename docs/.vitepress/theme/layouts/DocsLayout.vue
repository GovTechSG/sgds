<script setup lang="ts">
import { Content, withBase } from "vitepress";
import { computed } from 'vue';
import { useData } from 'vitepress';
import PageHeader from "../../components/PageHeader.vue";
import DocFooter from "../../components/DocFooter.vue";
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
const pageHeaderBottomGapClass = computed(() => "bottomGapXl")

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
  <div :class="$style['layout-container']">
    <div class="sgds-grid">
      <aside
        :class="$style.aside"
        class="sgds-col-4 sgds-col-lg-3"
        v-if="currentSidebar.items.length"
      >
        <div>
          <div :class="$style.headerRow">
            <h5 :class="$style.header">{{ header }}</h5>
            <sgds-badge v-if="showHeaderBadge" variant="accent" outlined>NEW</sgds-badge>
          </div>
          <sgds-sidenav>
            <template
              v-for="group in currentSidebar.items"
              :key="group.text"
            >
              <sgds-sidenav-item v-if="group.items && group.items.length" :active="isSideNavGroupActive(currentSection, [group.text], currentPath)">
                <span slot="title">{{ formatSidebarLabel(group.text) }}</span>
                <template
                  v-for="item in group.items"
                  :key="item.link"
                >
                  <sgds-sidenav-item v-if="item.items && item.items.length" :active="isSideNavGroupActive(currentSection, [group.text, item.text], currentPath)">
                    <span slot="title">{{ formatSidebarLabel(item.text) }}</span>
                    <template
                      v-for="secondLevelItem in item.items"
                      :key="secondLevelItem.link"
                    >
                    <sgds-sidenav-link :active="currentPath === secondLevelItem.link">
                      <a
                        :href="isDraft(group.text) ? 'javascript:void(0)' : withBase(secondLevelItem.link)"
                        :class="isDraft(group.text) ? $style.disabled : ''"
                      >
                      {{ formatSidebarLabel(secondLevelItem.text) }}
                    </a>
                    </sgds-sidenav-link>
                    </template>
                  </sgds-sidenav-item>
                  <sgds-sidenav-link v-else :active="currentPath === item.link">
                    <a
                      :href="isDraft(group.text) ? 'javascript:void(0)' : withBase(item.link)"
                      :class="isDraft(group.text) ? $style.disabled : ''"
                    >
                    {{ formatSidebarLabel(item.text) }}
                  </a>
                  </sgds-sidenav-link>
                </template>
              </sgds-sidenav-item>
              <sgds-sidenav-link v-else :active="currentPath === withBase(group.link)">
                <a :href="withBase(group.link)">{{ formatSidebarLabel(group.text) }}</a>
              </sgds-sidenav-link>
            </template>
          </sgds-sidenav>
        </div>
      </aside>
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-9">
        <PageHeader
          :title="page.title"
          :description="page.description"
          :metadata="pageMetadata"
          :bottom-gap-class="pageHeaderBottomGapClass"
          :header-alert="page.frontmatter.headerAlert"
        />
        <div :class="$style['content-container']">
          <div :class="[$style.content, currentSection === 'ai' && $style.contentAi]">
            <Content />
          </div>
          <DocFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
  .layout-container {
    margin: var(--sgds-margin-none) var(--sgds-margin-none) var(--sgds-margin-xl);
  }

  .aside {
    padding: var(--sgds-padding-xs) var(--sgds-padding-2-xl) var(--sgds-padding-none) var(--sgds-padding-none);
  }

  .disabled {
    cursor: not-allowed;
  }

  .header {
    margin-bottom: var(--sgds-margin-none);
  }

  .headerRow {
    align-items: center;
    display: inline-flex;
    gap: var(--sgds-gap-xs);
    margin-bottom: var(--sgds-margin-sm);
  }

  .content-container {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-layout-gap-xl);
  }

  .content > * > * + h2,
  .content > * > * + h3,
  .content > * > * + h4 {
    margin-top: var(--sgds-layout-gap-md);
  }

  .contentAi > * > * + h2,
  .contentAi > * > * + h3,
  .contentAi > * > * + h4 {
    margin-top: var(--sgds-layout-gap-lg);
  }
</style>
