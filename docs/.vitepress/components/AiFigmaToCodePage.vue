<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "./CodeToken.vue";
import { ref } from "vue";

const figmaToCodeSteps = [
  { number: 1, title: "Go to your Figma screen" },
  { number: 2, title: "Give your AI the Figma context" },
  { number: 3, title: "Ask for SGDS-aligned output" },
  { number: 4, title: "Review before handoff" },
];

const codeToFigmaSteps = [
  { number: 1, title: "Start from the real coded page" },
  { number: 2, title: "Ask the AI to move it into Figma" },
  { number: 3, title: "Rebuild with SGDS logic" },
  { number: 4, title: "Tidy the Figma file for reuse" },
];

const copiedPrompt = ref<string | null>(null);

const copyPrompt = async (id: string, text: string) => {
  await navigator.clipboard.writeText(text);
  copiedPrompt.value = id;
  window.setTimeout(() => {
    if (copiedPrompt.value === id) copiedPrompt.value = null;
  }, 2000);
};
</script>

<template>
  <div :class="$style.page">
    <section :class="$style.section">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">What this means in simple terms</h2>
      <div :class="$style.copy">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Figma MCP lets your AI tool read useful information from Figma, not just a screenshot.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Instead of guessing from a flat image, the AI can understand structure like frames, layout, spacing, components, variants, and styles.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          If your team uses SGDS, this gets even more useful because the AI has a proper design system to follow instead of inventing its own patterns.
        </p>
      </div>
    </section>

    <section :class="$style.section">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Why this helps SGDS teams</h2>
      <div :class="$style.copy">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Without SGDS, AI may generate something that looks close but uses the wrong component, the wrong variant, or inconsistent spacing and behaviour.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          With SGDS, the AI can follow a shared source of truth. That means more consistent outputs, less cleanup, and smoother handoff between designers and developers.
        </p>
      </div>
    </section>

    <section :class="$style.section">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Choose your workflow</h2>

      <sgds-tab-group variant="underlined">
        <sgds-tab slot="nav" panel="figma-to-code" active>Figma to code</sgds-tab>
        <sgds-tab slot="nav" panel="code-to-figma">Code to figma</sgds-tab>

        <sgds-tab-panel name="figma-to-code">
          <div :class="$style.panel">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              This is the best starting point if you already have screens in Figma and want the AI to help translate them into SGDS-aligned code.
            </p>

            <AiInstructionStepper :steps="figmaToCodeSteps">
              <template #step-1>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Locate and select your Figma frame.
                </p>
              </template>

              <template #step-2>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  With the Figma MCP server enabled, share a Figma link to the frame or node.
                </p>
                <ol :class="$style.orderedList">
                  <li>Click the <strong>Dev Mode</strong> toggle or use the keyboard shortcut <CodeToken label="Shift + D" />.</li>
                  <li>Under MCP, click <strong>Copy example prompt</strong>.</li>
                </ol>
              </template>

              <template #step-3>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Be explicit that you want SGDS-aligned output.
                </p>
                <div :class="$style.promptCard">
                  <div :class="$style.promptCardHeader">
                    <span class="sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">PROMPT</span>
                    <button
                      :class="$style.promptCopyButton"
                      :aria-label="copiedPrompt === 'figma-to-code' ? 'Copied!' : 'Copy prompt'"
                      @click="copyPrompt('figma-to-code', 'Use this Figma frame and implement it with SGDS components and patterns. Map the layout to SGDS as closely as possible and flag anything that does not have a direct SGDS match.')"
                    >
                      <sgds-icon :name="copiedPrompt === 'figma-to-code' ? 'check' : 'copy'" size="md"></sgds-icon>
                    </button>
                  </div>
                  <p :class="$style.promptText">
                    Use this Figma frame and implement it with SGDS components and patterns. Map the layout to SGDS as closely as possible and flag anything that does not have a direct SGDS match.
                  </p>
                </div>
              </template>

              <template #step-4>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Before handing it off, check that the output uses the right SGDS components and variants, keeps the same hierarchy as the design, and includes any missing states or accessibility considerations.
                </p>
              </template>
            </AiInstructionStepper>

            <sgds-alert show variant="success" outlined>
              <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
              <div>A good practice is to keep your design file high quality with proper naming and SGDS components, so AI can match elements accurately and generate more reliable code.</div>
            </sgds-alert>
          </div>
        </sgds-tab-panel>

        <sgds-tab-panel name="code-to-figma">
          <div :class="$style.panel">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Use this workflow when your team already has working UI in code and you want to bring it into Figma in a way that is still useful for design work.
            </p>

            <AiInstructionStepper :steps="codeToFigmaSteps">
              <template #step-1>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Start from the real implemented page, view, or component. Pick the exact coded screen you want to bring into Figma.
                </p>
              </template>

              <template #step-2>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Ask the AI to capture or recreate the coded screen in Figma.
                </p>
                <div :class="$style.promptCard">
                  <div :class="$style.promptCardHeader">
                    <span class="sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">PROMPT</span>
                    <button
                      :class="$style.promptCopyButton"
                      :aria-label="copiedPrompt === 'code-to-figma' ? 'Copied!' : 'Copy prompt'"
                      @click="copyPrompt('code-to-figma', 'Take this coded page and create a Figma screen that matches it using the design system where possible.')"
                    >
                      <sgds-icon :name="copiedPrompt === 'code-to-figma' ? 'check' : 'copy'" size="md"></sgds-icon>
                    </button>
                  </div>
                  <p :class="$style.promptText">
                    Take this coded page and create a Figma screen that matches it using the design system where possible.
                  </p>
                </div>
              </template>

              <template #step-3>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Do not treat this as just a screenshot exercise. The goal is to rebuild the screen with the right SGDS logic:
                </p>
                <ul :class="$style.list">
                  <li>correct components</li>
                  <li>correct variants</li>
                  <li>correct spacing and tokens</li>
                  <li>reusable design structure where possible</li>
                </ul>
              </template>

              <template #step-4>
                <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Once the screen is in Figma, tidy it up so it is usable for future design work. Rename frames properly, check hierarchy and spacing, and replace anything temporary with the correct SGDS library component if needed.
                </p>
              </template>
            </AiInstructionStepper>
          </div>
        </sgds-tab-panel>
      </sgds-tab-group>
    </section>

    <section :class="$style.section">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Useful skills</h2>
      <div :class="$style.copy">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          These skills are especially helpful in this workflow:
        </p>
        <ul :class="$style.list">
          <li><CodeToken label="figma-implement-design" /> for turning Figma designs into code</li>
          <li><CodeToken label="figma-generate-design" /> for moving code or a live page into Figma</li>
          <li><CodeToken label="figma-use" /> for creating or editing things directly in a Figma file</li>
          <li><CodeToken label="sgds-components" /> for choosing the correct SGDS component</li>
          <li><CodeToken label="sgds-utilities" /> for applying SGDS tokens and spacing correctly</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style module>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-margin-5-xl);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.copy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.panel {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
}

.panel > p {
  margin: 0;
}

.list {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  margin: 0;
  padding-left: var(--sgds-padding-lg);
}

.orderedList {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  margin: 0;
  padding-left: var(--sgds-padding-2-xl);
}

.orderedList li {
  margin: 0;
}

.promptCard {
  background: var(--sgds-surface-default);
  border: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
  min-width: 0;
  max-width: 100%;
  padding: var(--sgds-padding-md) var(--sgds-component-padding-xs);
  width: 100%;
}

.promptCardHeader {
  align-items: center;
  color: var(--sgds-body-color-subtle);
  display: flex;
  justify-content: space-between;
  gap: var(--sgds-gap-md);
  min-width: 0;
}

.promptCopyButton {
  align-items: center;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--sgds-color-default);
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  padding: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.promptCopyButton:hover {
  background-color: var(--sgds-border-color-muted);
}

.promptText {
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: normal;
  width: 100%;
}
</style>
