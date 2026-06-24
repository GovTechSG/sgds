<script setup lang="ts">
import { ref } from "vue";
import CodeBlock from "../ui/CodeBlock.vue";

const markdownModal = ref<HTMLElement & { show: () => void; hide: () => void }>();

const agentSetupMarkdown = `You are helping this project use the Singapore Government Design System (SGDS).

Follow these instructions before generating or editing SGDS code.

1. Check whether @govtechsg/sgds-web-component is installed. If it is missing, run this in the project root:

\`\`\`bash
npm i @govtechsg/sgds-web-component
\`\`\`

2. Install the SGDS agent skills. Choose one install path:

Skills CLI, for most users:

\`\`\`bash
npx skills add govtechsg/sgds-web-component -y
\`\`\`

GovTech CLI, for GovTech Singapore users:

\`\`\`bash
gt apd install gto-desp
\`\`\`

Use the GovTech CLI path only if the user is from GovTech Singapore or the project already uses GT CLI. Otherwise, use the Skills CLI path. Do not run both paths unless the user asks for both.

3. If prompted, select all SGDS skills.

4. After installation, read this file first:

\`\`\`txt
.agents/skills/sgds-workflow/SKILL.md
\`\`\`

5. Follow the SGDS skills when generating or editing code:
- Use @govtechsg/sgds-web-component components where available.
- Use sgds: utility classes for layout, spacing, typography, and colours.
- Do not invent SGDS component names, utility classes, or design tokens.
- Do not use inline styles unless a runtime dynamic value is required.
- For new apps, follow sgds-getting-started before writing UI code.
- For existing apps, use sgds-workflow to pick the right skill for the task.
`;

function showAgentSetup() {
  markdownModal.value?.show();
}

function handleSetupAction(event: CustomEvent<{ item: HTMLElement }>) {
  const action = event.detail.item.getAttribute("data-action");
  if (action === "copy") {
    showAgentSetup();
  }
}
</script>

<template>
  <sgds-dropdown menuAlignRight @sgds-select="handleSetupAction">
    <sgds-button slot="toggler" size="sm" variant="outline" tone="neutral" :ariaLabel.prop="'AI setup'">
      AI setup
      <sgds-icon name="chevron-down" size="sm" slot="rightIcon"></sgds-icon>
    </sgds-button>
    <sgds-dropdown-item data-action="copy">
      <sgds-icon class="sgds:items-center" name="copy" size="sm"></sgds-icon>
      <span>Copy Markdown</span>
    </sgds-dropdown-item>
    <sgds-dropdown-item>
      <a class="agent-setup-markdown-link" href="/ai/agent-setup.md" target="_blank" rel="noopener noreferrer">
        <sgds-icon class="sgds:items-center" name="eye" size="sm"></sgds-icon>
        <span>View Markdown</span>
      </a>
    </sgds-dropdown-item>
  </sgds-dropdown>

  <sgds-modal ref="markdownModal" size="lg">
    <h2 slot="title">Copy Markdown</h2>
    <p slot="description">Copy and paste this Markdown into your AI coding tool before asking it to build with SGDS.</p>
    <CodeBlock :code="agentSetupMarkdown" lang="markdown" wrap code-region-class="sgds:max-h-[14rem] sgds:overflow-y-auto" />
  </sgds-modal>
</template>

<style>
/* The menu label already describes the new-tab Markdown view, so suppress the
   generic external-link glyph added to target-blank anchors. */
.agent-setup-markdown-link::after,
.agent-setup-markdown-link .external-link-icon {
  content: none !important;
  display: none !important;
}
</style>
