<template>
  <section class="sgds:flex sgds:w-full sgds:flex-col sgds:gap-component-md">
    <div
      v-for="(item, itemIndex) in flowItems"
      :key="item.title"
      class="sgds:flex sgds:flex-col sgds:gap-component-md"
    >
      <div class="sgds:flex sgds:w-full sgds:flex-col sgds:gap-text-sm">
        <div class="sgds:flex sgds:min-w-0 sgds:flex-col sgds:gap-text-sm">
          <p class="sgds:m-0 sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default">
            {{ item.title }}
          </p>
          <div class="sgds:flex sgds:w-full sgds:flex-col sgds:items-stretch sgds:gap-component-xs sgds:md:flex-row sgds:md:items-center">
            <template
              v-for="(node, nodeIndex) in item.nodes"
              :key="`${item.title}-${node.label}`"
            >
              <div
                :class="[
                  'flow-node-box sgds:inline-flex sgds:w-full sgds:items-center sgds:justify-center sgds:gap-text-2-xs sgds:rounded-none sgds:border sgds:px-component-xs sgds:py-2 sgds:text-center sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-label-default sgds:md:w-auto',
                  node.tone === 'accent'
                    ? 'sgds:border-accent-default sgds:bg-accent-surface-muted'
                    : node.tone === 'primary'
                    ? 'sgds:border-primary-default sgds:bg-primary-surface-muted'
                    : node.tone === 'danger'
                    ? 'sgds:border-danger-default sgds:bg-danger-surface-muted'
                    : 'sgds:border-success-default sgds:bg-success-surface-muted',
                ]"
              >
                <span>{{ node.label }}</span>
              </div>
              <div
                v-if="nodeIndex < item.nodes.length - 1"
                :class="[
                  'sgds:inline-flex sgds:h-8 sgds:w-full sgds:shrink-0 sgds:grow-0 sgds:items-center sgds:justify-center sgds:md:h-auto sgds:md:w-10 sgds:md:basis-10',
                  item.bidirectional ? 'sgds:gap-component-xs sgds:md:flex-col' : '',
                ]"
                aria-hidden="true"
              >
                <span class="flow-mobile-arrow sgds:md:hidden"></span>
                <span v-if="item.bidirectional" class="flow-mobile-arrow-reverse sgds:md:hidden"></span>
                <span class="flow-long-arrow sgds:hidden sgds:md:block"></span>
                <span v-if="item.bidirectional" class="flow-long-arrow-reverse sgds:hidden sgds:md:block"></span>
              </div>
            </template>
          </div>
          <p class="sgds:m-0 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-subtle">
            {{ item.description }}
          </p>
        </div>
      </div>

      <sgds-divider
        v-if="itemIndex < flowItems.length - 1"
        class="sgds:m-0"
      ></sgds-divider>
    </div>
  </section>
</template>

<script setup lang="ts">
const flowItems = [
  {
    title: "Before Figma MCP",
    description:
      "Designers usually handed over screens, notes, and links, while developers or AI tools worked from screenshots and manual explanations. That made it easy for design intent to get lost.",
    bidirectional: false,
    nodes: [
      { label: "Figma screenshot", tone: "accent" },
      { label: "AI reads screenshot", tone: "primary" },
      { label: "Intent gets lost", tone: "danger" },
    ],
  },
  {
    title: "When Figma MCP first arrived",
    description:
      "With Figma MCP, AI can access design context directly from selected Figma frames instead of guessing from images. With a design system, it can better map components, variables, and layout context to produce more accurate outputs.",
    bidirectional: false,
    nodes: [
      { label: "Figma frame", tone: "accent" },
      { label: "AI reads design context", tone: "primary" },
      { label: "Code", tone: "success" },
    ],
  },
  {
    title: "What it can do now",
    description:
      "AI can work with richer design context, move between code and Figma, and write directly to the Figma canvas when the MCP client supports it.",
    bidirectional: true,
    nodes: [
      { label: "Figma canvas", tone: "accent" },
      { label: "AI reads full design context", tone: "primary" },
      { label: "Code", tone: "success" },
    ],
  },
] as const;
</script>

<style>
/* Arrow pseudo-elements: cannot be expressed as utility classes */
.flow-long-arrow {
  border-top: var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis);
  display: block;
  flex: 1 1 auto;
  height: 0;
  position: relative;
  width: 100%;
}

.flow-long-arrow::after {
  border-bottom: 4px solid transparent;
  border-left: 6px solid var(--sgds-border-color-emphasis);
  border-top: 4px solid transparent;
  content: "";
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
}

.flow-long-arrow-reverse {
  border-top: var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis);
  display: block;
  flex: 1 1 auto;
  height: 0;
  position: relative;
  width: 100%;
}

.flow-long-arrow-reverse::before {
  border-bottom: 4px solid transparent;
  border-right: 6px solid var(--sgds-border-color-emphasis);
  border-top: 4px solid transparent;
  content: "";
  left: -1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.flow-mobile-arrow {
  border-left: var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis);
  display: block;
  height: 100%;
  position: relative;
  width: 0;
}

.flow-mobile-arrow::after {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid var(--sgds-border-color-emphasis);
  bottom: -1px;
  content: "";
  left: 50%;
  position: absolute;
  transform: translateX(-50%);
}

.flow-mobile-arrow-reverse {
  border-left: var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis);
  display: block;
  height: 100%;
  position: relative;
  width: 0;
}

.flow-mobile-arrow-reverse::before {
  border-bottom: 6px solid var(--sgds-border-color-emphasis);
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  content: "";
  left: 50%;
  position: absolute;
  top: -1px;
  transform: translateX(-50%);
}
</style>
