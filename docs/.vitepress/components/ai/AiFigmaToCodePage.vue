<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "../ui/CodeToken.vue";
import { ref } from "vue";
import { figmaToCodeSteps, codeToFigmaSteps } from "../../data/ai-workflow-data";

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
  <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-margin-5-xl)]">
    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)]">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">What this means in simple terms</h2>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Figma MCP lets your AI tool read useful information from Figma, not just a screenshot.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Instead of guessing from a flat image, the AI can understand structure like frames, layout, spacing, components, variants, and styles.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          If your team uses SGDS, this gets even more useful because the AI has a proper design system to follow instead of inventing its own patterns.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)]">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Why this helps SGDS teams</h2>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          Without SGDS, AI may generate something that looks close but uses the wrong component, the wrong variant, or inconsistent spacing and behaviour.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          With SGDS, the AI can follow a shared source of truth. That means more consistent outputs, less cleanup, and smoother handoff between designers and developers.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)]">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Choose your workflow</h2>

      <sgds-tab-group variant="underlined">
        <sgds-tab slot="nav" panel="figma-to-code" active>Figma to code</sgds-tab>
        <sgds-tab slot="nav" panel="code-to-figma">Code to figma</sgds-tab>

        <sgds-tab-panel name="figma-to-code">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
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
                <ol class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-2-xl)]">
                  <li class="sgds:m-0">Click the <strong>Dev Mode</strong> toggle or use the keyboard shortcut <CodeToken label="Shift + D" />.</li>
                  <li class="sgds:m-0">Under MCP, click <strong>Copy example prompt</strong>.</li>
                </ol>
              </template>

              <template #step-3>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Be explicit that you want SGDS-aligned output.
                </p>
                <div class="sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xs)] sgds:min-w-0 sgds:max-w-full sgds:py-[var(--sgds-padding-md)] sgds:px-[var(--sgds-component-padding-xs)] sgds:w-full">
                  <div class="sgds:flex sgds:items-center sgds:justify-between sgds:gap-[var(--sgds-gap-md)] sgds:text-subtle sgds:min-w-0">
                    <span class="sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">PROMPT</span>
                    <button
                      class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-transparent sgds:border-0 sgds:rounded sgds:text-default sgds:cursor-pointer sgds:flex-none sgds:p-1 sgds:transition sgds:duration-200 sgds:ease-in-out sgds:hover:bg-[var(--sgds-border-color-muted)]"
                      :aria-label="copiedPrompt === 'figma-to-code' ? 'Copied!' : 'Copy prompt'"
                      @click="copyPrompt('figma-to-code', 'Use this Figma frame and implement it with SGDS components and patterns. Map the layout to SGDS as closely as possible and flag anything that does not have a direct SGDS match.')"
                    >
                      <sgds-icon :name="copiedPrompt === 'figma-to-code' ? 'check' : 'copy'" size="md"></sgds-icon>
                    </button>
                  </div>
                  <p class="sgds:text-default sgds:text-body-md sgds:font-regular sgds:tracking-normal sgds:leading-xs sgds:m-0 sgds:min-w-0 sgds:break-words sgds:w-full">
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
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
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
                <div class="sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-xl sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-2-xs)] sgds:min-w-0 sgds:max-w-full sgds:py-[var(--sgds-padding-md)] sgds:px-[var(--sgds-component-padding-xs)] sgds:w-full">
                  <div class="sgds:flex sgds:items-center sgds:justify-between sgds:gap-[var(--sgds-gap-md)] sgds:text-subtle sgds:min-w-0">
                    <span class="sgds:text-label-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">PROMPT</span>
                    <button
                      class="sgds:inline-flex sgds:items-center sgds:justify-center sgds:bg-transparent sgds:border-0 sgds:rounded sgds:text-default sgds:cursor-pointer sgds:flex-none sgds:p-1 sgds:transition sgds:duration-200 sgds:ease-in-out sgds:hover:bg-[var(--sgds-border-color-muted)]"
                      :aria-label="copiedPrompt === 'code-to-figma' ? 'Copied!' : 'Copy prompt'"
                      @click="copyPrompt('code-to-figma', 'Take this coded page and create a Figma screen that matches it using the design system where possible.')"
                    >
                      <sgds-icon :name="copiedPrompt === 'code-to-figma' ? 'check' : 'copy'" size="md"></sgds-icon>
                    </button>
                  </div>
                  <p class="sgds:text-default sgds:text-body-md sgds:font-regular sgds:tracking-normal sgds:leading-xs sgds:m-0 sgds:min-w-0 sgds:break-words sgds:w-full">
                    Take this coded page and create a Figma screen that matches it using the design system where possible.
                  </p>
                </div>
              </template>

              <template #step-3>
                <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  Do not treat this as just a screenshot exercise. The goal is to rebuild the screen with the right SGDS logic:
                </p>
                <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
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

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-md)]">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">Useful skills</h2>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-sm)]">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0">
          These skills are especially helpful in this workflow:
        </p>
        <ul class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-lg)]">
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
