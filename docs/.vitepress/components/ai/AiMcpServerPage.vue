<script setup lang="ts">
import { ref } from "vue";
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "../ui/CodeToken.vue";
import CopyCommand from "../ui/CopyCommand.vue";
import PromptBox from "../ui/PromptBox.vue";

const figmaToCodeSteps = [
  { number: 1, title: "Go to your Figma screen" },
  { number: 2, title: "Give your AI the Figma context" },
  { number: 3, title: "Ask for SGDS-aligned help" },
  { number: 4, title: "AI generates the code" },
];

const codeToFigmaSteps = [
  { number: 1, title: "Decide which page or section you want to send to Figma" },
  { number: 2, title: "Tell your AI where you want the screen or objects to be sent to" },
  { number: 3, title: "Prompt your AI to send the page or section to Figma" },
  { number: 4, title: "Make changes on your Figma" },
];

const setupInstructionSteps = [
  { number: 1, title: "Install and configure your AI agent" },
  { number: 2, title: "Set up Figma MCP" },
  { number: 3, title: "Install SGDS web component package" },
  { number: 4, title: "Install SGDS agent skills" },
];

const figmaToCodeTab = ref<HTMLElement | null>(null);

const openFigmaToCodeTab = (event: Event) => {
  event.preventDefault();
  figmaToCodeTab.value?.click();
};

</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight sgds:m-0">What is MCP server?</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        MCP stands for <strong>Model Context Protocol</strong>. It is a standard way for an AI tool to connect to another tool and use real information from it. In the simplest terms, it allows your AI to "see" what you're working on and respond based on that, rather than just your prompt. Instead of guessing, the AI can pull real context and use it to generate more accurate outputs.
      </p>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:-mb-[var(--sgds-text-gap-md)]">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">About Figma MCP</h2>
      <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          Figma first introduced its MCP server to help teams generate code more accurately from Figma screens. Instead of giving AI only a screenshot, teams could give it real design context from selected Figma frames.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          This meant the server could pass useful information to the AI, such as variables, components, tokens, and design context—guiding it toward correct outputs instead of generating something that only looks similar.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          More recently, the remote MCP server has expanded beyond generating code from selected frames. It can now let agents write directly to the canvas, generate editable designs from live UI, and bring richer design context into the workflow.
        </p>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)]">
      <div class="sgds:p-[var(--sgds-padding-lg)]">
        <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-gap-lg)] sgds:w-full">
          <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:min-w-0">
              <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">Before Figma MCP</p>
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:w-full">
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Figma screenshot</span>
                </div>
                <div class="sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)]" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>AI reads screenshot</span>
                </div>
                <div class="sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)]" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Intent gets lost</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Designers usually handed over screens, notes, and links, while developers or AI tools worked from screenshots and manual explanations. That made it easy for design intent to get lost.
              </p>
            </div>
          </div>

          <sgds-divider class="sgds:m-0"></sgds-divider>

          <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:min-w-0">
              <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">When Figma MCP first arrived</p>
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:w-full">
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Figma frame</span>
                </div>
                <div class="sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)]" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>AI reads design context</span>
                </div>
                <div class="sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)]" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Code</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                With Figma MCP, AI can access design context directly from selected Figma frames instead of guessing from images. With a design system, it can better map components, variables, and layout context—producing more accurate outputs.
              </p>
            </div>
          </div>

          <sgds-divider class="sgds:m-0"></sgds-divider>

          <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:w-full">
            <div class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)] sgds:min-w-0">
              <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">What it can do now</p>
              <div class="sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-[var(--sgds-gap-xs)] sgds:w-full">
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Figma canvas</span>
                </div>
                <div class="sgds:inline-flex sgds:items-center sgds:shrink-0 sgds:grow-0 sgds:basis-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)] sgds:flex-col sgds:gap-[var(--sgds-gap-xs)]" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                  <span class="flow-long-arrow-reverse"></span>
                </div>
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>AI reads full design context</span>
                </div>
                <div class="sgds:inline-flex sgds:items-center sgds:shrink-0 sgds:grow-0 sgds:basis-[var(--sgds-dimension-40)] sgds:w-[var(--sgds-dimension-40)] sgds:flex-col sgds:gap-[var(--sgds-gap-xs)]" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                  <span class="flow-long-arrow-reverse"></span>
                </div>
                <div class="flow-node-box sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-[var(--sgds-gap-2-xs)] sgds:py-[var(--sgds-padding-sm)] sgds:px-[var(--sgds-padding-xl)] sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Code</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                AI can work with richer design context, move more fluidly between code and Figma, and even write directly to the Figma canvas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Before you start — Set up SGDS with Figma MCP</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        To set up your Figma MCP server and to turn your Figma designs into working code powered by SGDS components and utilities, you need these things:
      </p>

      <AiInstructionStepper :steps="setupInstructionSteps">
        <template #step-1>
          <p>Choose your AI agent (Claude Code, Codex, Cursor, etc) and follow their documentation for their installation steps.</p>
        </template>

        <template #step-2>
          <p>
            Read their
            <a href="https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/" target="_blank" rel="noreferrer">documentation</a>
            for the latest installation steps as their setup instructions are updated frequently. The necessary Figma skills will be installed automatically when you set up the Figma MCP plugin.
          </p>
        </template>

        <template #step-3>
          <p>Run the following command if you have not have SGDS components installed:</p>
          <CopyCommand command="npm i @govtechsg/sgds-web-component" />
        </template>

        <template #step-4>
          <p>Run the following command to install the skills:</p>
          <CopyCommand command="npx skills add govtechsg/sgds-web-component" />
          <p>Select all existing skills from the list. This pulls the latest skills from the <CodeToken label="skills/" /> folder of this repository into your local <CodeToken label=".agents/" /> directory, where compatible AI tools automatically pick them up.</p>
        </template>
      </AiInstructionStepper>

      <sgds-alert class="sgds:mt-layout-sm" show variant="success" outlined>
        <div>You only need to complete this setup once. Once everything is in place, your AI agent will have the context it needs to work with SGDS — just prompt it and it will know what to do.</div>
      </sgds-alert>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-sm)]">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Working between Figma and code</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Use the workflow that matches your starting point.
      </p>

      <sgds-tab-group variant="underlined">
        <sgds-tab ref="figmaToCodeTab" slot="nav" panel="figma-to-code" active>Figma to code</sgds-tab>
        <sgds-tab slot="nav" panel="code-to-figma">Code to Figma</sgds-tab>

        <sgds-tab-panel name="figma-to-code">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              Start here if you already have screens in Figma and want the AI to help turn them into SGDS-aligned code or implementation guidance.
            </p>

            <div class="sgds:mb-0 sgds:w-full">
              <img
                src="/ai/figma-to-code.svg"
                alt="Diagram showing the Figma to code workflow."
                class="sgds:block sgds:h-auto sgds:max-w-full"
              />
            </div>

            <AiInstructionStepper :steps="figmaToCodeSteps">
              <template #step-1>
                <p>Choose the frame or layer you want the AI to work from. Make sure the Figma Dev Mode MCP server plugin is running locally before proceeding.</p>
              </template>

              <template #step-2>
                <p>With the Figma MCP server enabled, give the AI the right Figma context. You can do this in different ways depending on how your MCP setup works:</p>
                <ol class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-2-xl)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li class="sgds:m-0"><strong>Desktop MCP:</strong> select the frame or layer directly in Figma, or open <strong>Dev Mode</strong> and copy the relevant Figma link.</li>
                  <li class="sgds:m-0"><strong>Remote MCP:</strong> share the relevant Figma link with your AI client so it can pull the design context into the workflow.</li>
                </ol>
              </template>

              <template #step-3>
                <p>Be explicit that you want the AI to implement the design using SGDS components and patterns where possible, not just produce generic front-end output.</p>
                <PromptBox prompt="Build this Figma frame using SGDS web components and utility classes. Refer to the SGDS skills for the correct component APIs, utility tokens, and layout pattern." />
              </template>

              <template #step-4>
                <p>The agent will read the selected Figma frame via the MCP server, reference the installed SGDS skills to identify the right components and utilities and generate code that replicates the design using <CodeToken label="<sgds-*>" /> components and SGDS CSS utility classes.</p>
              </template>
            </AiInstructionStepper>

            <sgds-alert show variant="info" outlined title="Tips for better output">
              <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
              <ul class="sgds:flex sgds:flex-col sgds:gap-0 sgds:m-0 sgds:pl-[var(--sgds-padding-lg)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li>Keep your Figma frames clean and well-structured for the best results.</li>
                <li>Name your Figma layers descriptively — the agent uses layer names to infer intent.</li>
                <li>If the output is not accurate, refine your prompt by specifying which section or component to focus on.</li>
                <li>See <sgds-alert-link href="/ai/prompt-tips">Prompt tips</sgds-alert-link> for more effective results.</li>
              </ul>
            </sgds-alert>
          </div>
        </sgds-tab-panel>

        <sgds-tab-panel name="code-to-figma">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              Start here if you send your code back to Figma for further design refinement.
            </p>

            <div class="sgds:mb-0 sgds:w-full">
              <img
                src="/ai/code-to-figma.svg"
                alt="Diagram showing the code to Figma workflow from you, to AI agent, to Figma MCP, to Figma output."
                class="sgds:block sgds:h-auto sgds:max-w-full"
              />
            </div>

            <AiInstructionStepper :steps="codeToFigmaSteps">
              <template #step-1>
                <p>Choose the live page, flow, or section you want to bring into Figma. Tell your AI exactly what should be captured, so it can turn that UI into editable Figma layers.</p>
              </template>

              <template #step-2>
                <p>Tell the AI where the captured screen or objects should go in Figma. If you already know the destination, include the relevant Figma link in your prompt. Here are a few ways you can get it:</p>
                <ol class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-[var(--sgds-text-gap-xs)] sgds:m-0 sgds:pl-[var(--sgds-padding-2-xl)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li class="sgds:m-0"><strong>To get the link of a Figma page:</strong> Click the <strong>Share</strong> button at the top right hand corner and select <strong>Copy link</strong>.</li>
                  <li class="sgds:m-0"><strong>To get the link of a frame:</strong> Right click on a frame and choose <strong>Copy/Paste as → Copy link to selection</strong>.</li>
                </ol>
              </template>

              <template #step-3>
                <p>Be explicit about what you want sent and where it should go. Ask the AI to map the result to SGDS components, tokens, and layout rules where possible, and to flag anything that does not have a direct SGDS match.</p>
                <PromptBox prompt="Send my dashboard page to Figma at this place <insert link of figma's page or frame>. Map to SGDS as closely as possible and flag anything that does not have a direct SGDS match." />
              </template>

              <template #step-4>
                <p>Once the screen is in Figma, tidy the file for future design work. Use clear names, keep the hierarchy clean, and replace temporary UI with SGDS components where possible. When you are ready to turn it back into code, refer to the <a href="#figma-to-code" @click="openFigmaToCodeTab">Figma to code workflow</a>.</p>
              </template>
            </AiInstructionStepper>

            <sgds-alert show variant="info" outlined title="Tips for better output">
              <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
              <ul class="sgds:flex sgds:flex-col sgds:gap-0 sgds:m-0 sgds:pl-[var(--sgds-padding-lg)] sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li>Keep your Figma frames clean and well-structured for the best results.</li>
                <li>Name your Figma layers descriptively — the agent uses layer names to infer intent.</li>
                <li>If the output is not accurate, refine your prompt by specifying which section or component to focus on.</li>
                <li>See <sgds-alert-link href="/ai/prompt-tips">Prompt tips</sgds-alert-link> for more effective results.</li>
              </ul>
            </sgds-alert>

          </div>
        </sgds-tab-panel>
      </sgds-tab-group>
    </section>

  </div>
</template>

<style>
/* Arrow pseudo-elements — cannot be expressed as utility classes */
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

/* Descendant combinator for flow node box text — requires fallback color value */
.flow-node-box > span {
  color: var(--sgds-color-fixed-dark, #161616);
}
</style>
