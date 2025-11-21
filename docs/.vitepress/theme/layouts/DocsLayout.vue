<script setup lang="ts">
import { Content, withBase } from "vitepress";
import { computed } from 'vue';
import { useData } from 'vitepress';
import "@govtechsg/sgds-web-component/components/Sidenav/index.js";
import PageHeader from "../../components/PageHeader.vue";
import DocFooter from "../../components/DocFooter.vue";
import { isDraft } from "../../utils/page-status";

const { theme, page } = useData()
const currentPath = computed(() => `/${page.value.relativePath.replace(/\.md$/, '')}`)

const currentSection = computed(() => {
  const rel = page.value?.relativePath || ""
  return rel.split("/")[0] || "" // e.g. "foundations"
})

const header = computed(() => currentSection.value.charAt(0).toUpperCase() + currentSection.value.slice(1))

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
          <h5 :class="$style.header">{{ header }}</h5>
          <sgds-sidenav>
            <template
              v-for="group in currentSidebar.items"
              :key="group.text"
            >
              <sgds-sidenav-item v-if="group.items && group.items.length" :active="isSideNavGroupActive(currentSection, [group.text], currentPath)">
                <span slot="title">{{ group.text }}</span>
                <template
                  v-for="item in group.items"
                  :key="item.link"
                >
                  <sgds-sidenav-item v-if="item.items && item.items.length" :active="isSideNavGroupActive(currentSection, [group.text, item.text], currentPath)">
                    <span slot="title">{{ item.text }}</span>
                    <template
                      v-for="secondLevelItem in item.items"
                      :key="secondLevelItem.link"
                    >
                    <sgds-sidenav-link :active="currentPath === withBase(`/${currentSection}/${secondLevelItem.link}`)">
                      <a
                        :href="isDraft(group.text) ? 'javascript:void(0)' : withBase(`/${currentSection}/${secondLevelItem.link}`)"
                        :class="isDraft(group.text) ? $style.disabled : ''"
                      >
                      {{ secondLevelItem.text }}
                    </a>
                    </sgds-sidenav-link>
                    </template>
                  </sgds-sidenav-item>
                  <sgds-sidenav-link v-else :active="currentPath === withBase(`/${currentSection}/${item.link}`)">
                    <a
                      :href="isDraft(group.text) ? 'javascript:void(0)' : withBase(`/${currentSection}/${item.link}`)"
                      :class="isDraft(group.text) ? $style.disabled : ''"
                    >
                    {{ item.text }}
                  </a>
                  </sgds-sidenav-link>
                </template>
              </sgds-sidenav-item>
              <sgds-sidenav-item v-else>
                <a :href="group.link">{{ group.text }}</a>
              </sgds-sidenav-item>
            </template>
          </sgds-sidenav>
        </div>
      </aside>
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-9">
        <PageHeader
          :title="page.title"
          :description="page.description"
          :figma="page.frontmatter.figma"
          :responsive="page.frontmatter.figma"
          :storybook="page.frontmatter.storybook"
        />
        <div :class="$style['content-container']">
          <div :class="$style['content']">
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
    margin: var(--sgds-margin-xl) var(--sgds-margin-none);
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

  .content-container {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-spacer-11);
  }

  .content > * > * {
    display: flex;
    flex-direction: column;
    gap: var(--sgds-spacer-11);
    margin-top: var(--sgds-margin-2-xl);
  }
</style>