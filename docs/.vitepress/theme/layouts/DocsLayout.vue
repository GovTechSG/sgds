<script setup lang="ts">
import { Content, withBase } from "vitepress";
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import PageHeader from "../../components/page/PageHeader.vue";
import DocFooter from "../../components/page/DocFooter.vue";
import AiAgentSetupCopy from "../../components/ai/AiAgentSetupCopy.vue";
import { isDraft } from "../../utils/page-status";
import { getComponentDoc, getComponentHeaderLinks } from "../../data/component-docs";
import { getFoundationHeaderLinks } from "../../data/foundation-docs";

const { theme, page } = useData()
const mobileSideNavOpen = ref(false)
const navigationGuard = ref(false)
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
  templates: "Templates",
  blocks: "Blocks",
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
  if (/[A-Z]/.test(trimmed.slice(1))) return trimmed

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
  if (currentSection.value === "foundations") {
    return getFoundationHeaderLinks(page.value.relativePath);
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
  navigationGuard.value = true
  setTimeout(() => { navigationGuard.value = false }, 300)
})

type SgdsSidenavItemElement = HTMLElement & {
  ariaLabel?: string;
  updateComplete?: Promise<unknown>;
}

const getSidenavItemLabel = (item: SgdsSidenavItemElement) => {
  const propLabel = item.ariaLabel?.trim()
  if (propLabel) return propLabel

  const attrLabel =
    item.getAttribute("ariaLabel")?.trim() ||
    item.getAttribute("arialabel")?.trim() ||
    item.getAttribute("aria-label")?.trim()
  if (attrLabel) return attrLabel

  return item.querySelector<HTMLElement>('[slot="title"]')?.textContent?.trim() ?? ""
}

const syncSidenavButtonLabels = async () => {
  if (typeof document === "undefined") return

  await nextTick()

  const items = Array.from(
    document.querySelectorAll<SgdsSidenavItemElement>("sgds-sidenav-item"),
  )

  for (const item of items) {
    if (!item.querySelector('[slot="title"]')) continue

    const label = getSidenavItemLabel(item)
    if (!label) continue

    item.ariaLabel = label
    item.setAttribute("ariaLabel", label)

    await item.updateComplete?.catch(() => {})

    const button = item.shadowRoot?.querySelector<HTMLButtonElement>("button.sidenav-btn")
    if (!button || button.getAttribute("aria-label")) continue

    button.setAttribute("aria-label", label)
  }
}

const slugifyHeading = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

const addAiHeadingAnchors = async () => {
  if (currentSection.value !== "ai" || typeof document === "undefined") return

  await nextTick()

  document
    .querySelectorAll<HTMLHeadingElement>(".docs-layout-content-ai h2")
    .forEach((heading) => {
      if (heading.dataset.aiAnchorEnhanced === "true") return
      if (!heading.classList.contains("sgds:text-heading-lg")) return

      const title = heading.textContent?.trim() ?? ""
      const closestSection = heading.closest("section")
      const sectionId = closestSection?.id ?? ""
      const sectionFirstHeading = closestSection?.querySelector("h2") === heading
      const targetId = heading.id || (sectionFirstHeading ? sectionId : "") || slugifyHeading(title)
      if (!targetId) return
      if (!heading.id && targetId !== sectionId) heading.id = targetId

      const existingAnchor = Array.from(heading.querySelectorAll("a")).some(
        (anchor) => anchor.getAttribute("href") === `#${targetId}`,
      )
      const siblingAnchor = Array.from(heading.parentElement?.querySelectorAll("a") ?? []).some(
        (anchor) => anchor.getAttribute("href") === `#${targetId}`,
      )
      if (existingAnchor || siblingAnchor) return

      const anchor = document.createElement("a")
      anchor.href = `#${targetId}`
      anchor.className = "sgds:ml-2 sgds:inline-flex sgds:h-8 sgds:w-8 sgds:items-center sgds:justify-center sgds:rounded-sm sgds:align-middle sgds:text-subtle sgds:no-underline sgds:hover:text-default sgds:focus:text-default sgds:focus-visible:text-default sgds:focus-visible:outline sgds:focus-visible:outline-[var(--sgds-outline-focus)] sgds:focus-visible:outline-offset-[var(--sgds-outline-offset-focus)]"
      anchor.setAttribute("aria-label", `Link to ${title}`)

      const icon = document.createElement("sgds-icon")
      icon.setAttribute("name", "link")
      icon.setAttribute("size", "sm")
      anchor.appendChild(icon)

      const wrapper = document.createElement("div")
      wrapper.className = "sgds:flex sgds:gap-2 sgds:items-center"
      heading.before(wrapper)
      wrapper.appendChild(heading)
      wrapper.appendChild(anchor)
      heading.dataset.aiAnchorEnhanced = "true"
    })
}

watch(
  () => page.value.relativePath,
  () => {
    void addAiHeadingAnchors()
    void syncSidenavButtonLabels()
  },
  { immediate: true, flush: "post" },
)

onMounted(() => {
  void syncSidenavButtonLabels()
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
              <sgds-sidenav-item v-if="group.items && group.items.length" :active="isSideNavGroupActive(group, currentPath) || null" :ariaLabel.prop="group.text">
                <span slot="title">{{ formatSidebarLabel(group.text) }}</span>
                <template
                  v-for="item in group.items"
                  :key="item.link ?? item.text"
                >
                  <sgds-sidenav-item v-if="item.items && item.items.length" :active="isSideNavGroupActive(item, currentPath) || null" :ariaLabel.prop="item.text">
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
              <sgds-sidenav-item v-else-if="group.link" :active="(currentPath === withBase(group.link)) || null" :ariaLabel.prop="group.text">
                <a :href="withBase(group.link)">{{ formatSidebarLabel(group.text) }}</a>
              </sgds-sidenav-item>
            </template>
          </sgds-sidenav>
        </div>
      </aside>
      <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-9">
        <div
          v-show="currentSidebar.items.length"
          class="docs-layout-mobile-sidenav-trigger sgds:mb-component-md"
        >
          <sgds-button
            variant="outline"
            tone="neutral"
            :ariaLabel.prop="`Browse ${header}`"
            @click="!navigationGuard && (mobileSideNavOpen = true)"
          >
            <sgds-icon slot="leftIcon" name="menu"></sgds-icon>
            Browse <span class="sgds:font-semibold">{{ header }}</span>
          </sgds-button>
        </div>

        <sgds-drawer
          v-show="currentSidebar.items.length"
          class="docs-layout-mobile-sidenav"
          placement="start"
          size="sm"
          :ariaLabel.prop="header"
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
                <sgds-sidenav-item v-if="group.items && group.items.length" :active="isSideNavGroupActive(group, currentPath) || null" :ariaLabel.prop="group.text">
                  <span slot="title">{{ formatSidebarLabel(group.text) }}</span>
                  <template
                    v-for="item in group.items"
                    :key="item.link ?? item.text"
                  >
                    <sgds-sidenav-item v-if="item.items && item.items.length" :active="isSideNavGroupActive(item, currentPath) || null" :ariaLabel.prop="item.text">
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
                    <sgds-sidenav-link v-else-if="item.link" :active="(currentPath === item.link) || null">
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
                <sgds-sidenav-item v-else-if="group.link" :active="(currentPath === withBase(group.link)) || null" :ariaLabel.prop="group.text">
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
        >
          <template v-if="currentPath === '/ai/skills'" #action>
            <AiAgentSetupCopy />
          </template>
        </PageHeader>
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
