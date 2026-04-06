<script setup lang="ts">
import { ref } from "vue";
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeToken from "./CodeToken.vue";
import CopyCommand from "./CopyCommand.vue";
import PromptBox from "./PromptBox.vue";

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
  <div :class="$style.page">
    <section :class="$style.section">
      <h2 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">What is MCP server?</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        MCP stands for <strong>Model Context Protocol</strong>. It is a standard way for an AI tool to connect to another tool and use real information from it. In the simplest terms, it allows your AI to “see” what you’re working on and respond based on that, rather than just your prompt. Instead of guessing, the AI can pull real context and use it to generate more accurate outputs.
      </p>
    </section>

    <section :class="[$style.section, $style.aboutSection]">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">About Figma MCP</h2>
      <div :class="$style.copy">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          Figma first introduced its MCP server to help teams generate code more accurately from Figma screens. Instead of giving AI only a screenshot, teams could give it real design context from selected Figma frames.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          This meant the server could pass useful information to the AI, such as variables, components, tokens, and design context—guiding it toward correct outputs instead of generating something that only looks similar.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
          More recently, the remote MCP server has expanded beyond generating code from selected frames. It can now let agents write directly to the canvas, generate editable designs from live UI, and bring richer design context into the workflow.
        </p>
      </div>
    </section>

    <section :class="[$style.section, $style.flowSection]">
      <div :class="$style.flowContainer">
        <div :class="$style.flow">
          <div :class="$style.flowCard">
            <div :class="$style.flowContent">
              <p :class="$style.flowTitle" class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">Before Figma MCP</p>
              <div :class="[$style.flowDiagram, $style.flowDiagramBefore]">
                <div :class="[$style.flowNode, $style.flowNodeAccent, $style.flowNodeBox]">
                  <span>Figma screenshot</span>
                </div>
                <div :class="$style.flowInlineArrowBefore" aria-hidden="true">
                  <span :class="$style.flowLongArrow"></span>
                </div>
                <div :class="[$style.flowNode, $style.flowNodePrimary, $style.flowNodeBox]">
                  <span>AI reads screenshot</span>
                </div>
                <div :class="$style.flowInlineArrowBefore" aria-hidden="true">
                  <span :class="$style.flowLongArrow"></span>
                </div>
                <div :class="[$style.flowNode, $style.flowNodeSuccess, $style.flowNodeBox]">
                  <span>Intent gets lost</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                Designers usually handed over screens, notes, and links, while developers or AI tools worked from screenshots and manual explanations. That made it easy for design intent to get lost.
              </p>
            </div>
          </div>

          <sgds-divider :class="$style.flowDivider"></sgds-divider>

          <div :class="$style.flowCard">
            <div :class="$style.flowContent">
              <p :class="$style.flowTitle" class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">When Figma MCP first arrived</p>
              <div :class="[$style.flowDiagram, $style.flowDiagramBefore]">
                <div :class="[$style.flowNode, $style.flowNodeAccent, $style.flowNodeBox]">
                  <span>Figma frame</span>
                </div>
                <div :class="$style.flowInlineArrowBefore" aria-hidden="true">
                  <span :class="$style.flowLongArrow"></span>
                </div>
                <div :class="[$style.flowNode, $style.flowNodePrimary, $style.flowNodeBox]">
                  <span>AI reads design context</span>
                </div>
                <div :class="$style.flowInlineArrowBefore" aria-hidden="true">
                  <span :class="$style.flowLongArrow"></span>
                </div>
                <div :class="[$style.flowNode, $style.flowNodeSuccess, $style.flowNodeBox]">
                  <span>Code</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                With Figma MCP, AI can access design context directly from selected Figma frames instead of guessing from images. With a design system, it can better map components, variables, and layout context—producing more accurate outputs.
              </p>
            </div>
          </div>

          <sgds-divider :class="$style.flowDivider"></sgds-divider>

          <div :class="$style.flowCard">
            <div :class="$style.flowContent">
              <p :class="$style.flowTitle" class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">What it can do now</p>
              <div :class="[$style.flowDiagram, $style.flowDiagramBefore]">
                <div :class="[$style.flowNode, $style.flowNodeAccent, $style.flowNodeBox]">
                  <span>Figma canvas</span>
                </div>
                <div :class="$style.flowInlineArrowBoth" aria-hidden="true">
                  <span :class="$style.flowLongArrow"></span>
                  <span :class="$style.flowLongArrowReverse"></span>
                </div>
                <div :class="[$style.flowNode, $style.flowNodePrimary, $style.flowNodeBox]">
                  <span>AI reads full design context</span>
                </div>
                <div :class="$style.flowInlineArrowBoth" aria-hidden="true">
                  <span :class="$style.flowLongArrow"></span>
                  <span :class="$style.flowLongArrowReverse"></span>
                </div>
                <div :class="[$style.flowNode, $style.flowNodeSuccess, $style.flowNodeBox]">
                  <span>Code</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                AI can work with richer design context, move more fluidly between code and Figma, and even write directly to the Figma canvas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section :class="$style.section">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Before you start — Set up SGDS with Figma MCP</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
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

      <sgds-alert :class="$style.setupAlert" show variant="success" outlined>
        <div>You only need to complete this setup once. Once everything is in place, your AI agent will have the context it needs to work with SGDS — just prompt it and it will know what to do.</div>
      </sgds-alert>
    </section>

    <section :class="$style.section">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Working between Figma and code</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        Use the workflow that matches your starting point.
      </p>

      <sgds-tab-group variant="underlined">
        <sgds-tab ref="figmaToCodeTab" slot="nav" panel="figma-to-code" active>Figma to code</sgds-tab>
        <sgds-tab slot="nav" panel="code-to-figma">Code to Figma</sgds-tab>

        <sgds-tab-panel name="figma-to-code">
          <div :class="$style.panel">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Start here if you already have screens in Figma and want the AI to help turn them into SGDS-aligned code or implementation guidance.
            </p>

            <div :class="$style.workflowSystemDiagram">
              <img
                src="/ai/figma-to-code.svg"
                alt="Diagram showing the Figma to code workflow."
                :class="$style.workflowSystemImage"
              />
            </div>

            <AiInstructionStepper :steps="figmaToCodeSteps">
              <template #step-1>
                <p>Choose the frame or layer you want the AI to work from. Make sure the Figma Dev Mode MCP server plugin is running locally before proceeding.</p>
              </template>

              <template #step-2>
                <p>With the Figma MCP server enabled, give the AI the right Figma context. You can do this in different ways depending on how your MCP setup works:</p>
                <ol :class="$style.orderedList" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li><strong>Desktop MCP:</strong> select the frame or layer directly in Figma, or open <strong>Dev Mode</strong> and copy the relevant Figma link.</li>
                  <li><strong>Remote MCP:</strong> share the relevant Figma link with your AI client so it can pull the design context into the workflow.</li>
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
              <ul :class="$style.alertList" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                <li>Keep your Figma frames clean and well-structured for the best results.</li>
                <li>Name your Figma layers descriptively — the agent uses layer names to infer intent.</li>
                <li>If the output is not accurate, refine your prompt by specifying which section or component to focus on.</li>
                <li>See <sgds-alert-link href="/ai/prompt-tips">Prompt tips</sgds-alert-link> for more effective results.</li>
              </ul>
            </sgds-alert>
          </div>
        </sgds-tab-panel>

        <sgds-tab-panel name="code-to-figma">
          <div :class="$style.panel">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
              Start here if you send your code back to Figma for further design refinement.
            </p>

            <div :class="$style.workflowSystemDiagram">
              <img
                src="/ai/code-to-figma.svg"
                alt="Diagram showing the code to Figma workflow from you, to AI agent, to Figma MCP, to Figma output."
                :class="$style.workflowSystemImage"
              />
            </div>

            <AiInstructionStepper :steps="codeToFigmaSteps">
              <template #step-1>
                <p>Choose the live page, flow, or section you want to bring into Figma. Tell your AI exactly what should be captured, so it can turn that UI into editable Figma layers.</p>
              </template>

              <template #step-2>
                <p>Tell the AI where the captured screen or objects should go in Figma. If you already know the destination, include the relevant Figma link in your prompt. Here are a few ways you can get it:</p>
                <ol :class="$style.orderedList" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li><strong>To get the link of a Figma page:</strong> Click the <strong>Share</strong> button at the top right hand corner and select <strong>Copy link</strong>.</li>
                  <li><strong>To get the link of a frame:</strong> Right click on a frame and choose <strong>Copy/Paste as → Copy link to selection</strong>.</li>
                </ol>
              </template>

              <template #step-3>
                <p>Be explicit about what you want sent and where it should go. Ask the AI to map the result to SGDS components, tokens, and layout rules where possible, and to flag anything that does not have a direct SGDS match.</p>
                <PromptBox prompt="Send my dashboard page to Figma at this place <insert link of figma’s page or frame>. Map to SGDS as closely as possible and flag anything that does not have a direct SGDS match." />
              </template>

              <template #step-4>
                <p>Once the screen is in Figma, tidy the file for future design work. Use clear names, keep the hierarchy clean, and replace temporary UI with SGDS components where possible. When you are ready to turn it back into code, refer to the <a href="#figma-to-code" @click="openFigmaToCodeTab">Figma to code workflow</a>.</p>
              </template>
            </AiInstructionStepper>

            <sgds-alert show variant="info" outlined title="Tips for better output">
              <sgds-icon slot="icon" name="lightbulb"></sgds-icon>
              <ul :class="$style.alertList" class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
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

<style module>
.page {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
}

.setupAlert {
  margin-top: var(--sgds-layout-gap-sm);
}

.aboutSection {
  margin-bottom: calc(var(--sgds-text-gap-md) * -1);
}

.flowSection {
  gap: var(--sgds-text-gap-xs);
}

.copy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
}

.copy :global(p),
.copy :global(li) {
  color: var(--sgds-body-color-subtle);
}

.panel {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
}

.panel > p {
  margin: 0;
}

.panel :global(p),
.panel :global(li) {
  color: var(--sgds-body-color-subtle);
}

.list {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
  margin: 0;
  padding-left: var(--sgds-padding-lg);
}

.alertList {
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-none);
  margin: 0;
  padding-left: var(--sgds-padding-lg);
}

.alertList li {
  color: inherit;
}

.orderedList {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
  margin: 0;
  padding-left: var(--sgds-padding-2-xl);
}

.orderedList li,
.list li {
  margin: 0;
}

.flow {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-lg);
  width: 100%;
}

.flowContainer {
  background: transparent;
  border-radius: var(--sgds-border-radius-none);
  padding: var(--sgds-padding-lg);
}

.flowCard {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
  width: 100%;
}

.flowDivider {
  margin: 0;
}

.flowContent {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-sm);
  min-width: 0;
}

.flowContent :global(p) {
  color: var(--sgds-body-color-subtle);
}

.flowContent .flowTitle {
  color: var(--sgds-heading-color-default);
}

.flowDiagram {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-xs);
  width: 100%;
}

.flowDiagramBefore {
  gap: var(--sgds-gap-xs);
}

.flowNode {
  align-items: center;
  border: var(--sgds-border-width-1) solid transparent;
  border-radius: var(--sgds-border-radius-md);
  display: inline-flex;
  gap: var(--sgds-gap-2-xs);
  min-height: var(--sgds-dimension-40);
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-lg);
}

.flowNodeBox {
  border-radius: var(--sgds-border-radius-none);
  color: var(--sgds-color-fixed-dark, #161616);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-2-xs);
  min-height: unset;
  padding: var(--sgds-padding-sm) var(--sgds-padding-xl);
}

.flowNodeBox span {
  color: var(--sgds-color-fixed-dark, #161616);
}

.flowNodeAccent {
  background: var(--sgds-accent-surface-muted);
  border-color: var(--sgds-accent-border-color-default);
}

.flowNodePrimary {
  background: var(--sgds-primary-surface-muted);
  border-color: var(--sgds-primary-border-color-default);
}

.flowNodeSuccess {
  background: var(--sgds-success-surface-muted);
  border-color: var(--sgds-success-border-color-default);
}

.flowInlineArrow {
  align-items: center;
  color: var(--sgds-accent-border-color-default);
  display: inline-flex;
  gap: var(--sgds-gap-2-xs);
}

.flowInlineArrowBefore {
  align-items: center;
  color: var(--sgds-border-color-emphasis);
  display: inline-flex;
  flex: 0 0 var(--sgds-dimension-40);
}

.flowInlineArrowBoth {
  align-items: center;
  display: inline-flex;
  flex: 0 0 var(--sgds-dimension-40);
  flex-direction: column;
  gap: var(--sgds-gap-xs);
}

.flowLongArrow {
  border-top: var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis);
  display: block;
  flex: 1 1 auto;
  height: 0;
  position: relative;
  width: 100%;
}

.flowLongArrow::after {
  border-bottom: 4px solid transparent;
  border-left: 6px solid var(--sgds-border-color-emphasis);
  border-top: 4px solid transparent;
  content: "";
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
}

.flowLongArrowReverse {
  border-top: var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis);
  display: block;
  flex: 1 1 auto;
  height: 0;
  position: relative;
  width: 100%;
}

.flowLongArrowReverse::before {
  border-bottom: 4px solid transparent;
  border-right: 6px solid var(--sgds-border-color-emphasis);
  border-top: 4px solid transparent;
  content: "";
  left: -1px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.flowInlineArrowStack {
  align-items: center;
  color: var(--sgds-accent-border-color-default);
  display: inline-flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
}

.flowInlineArrowRow {
  align-items: center;
  display: inline-flex;
  gap: var(--sgds-gap-none);
}

.flowEmoji {
  line-height: 1;
}


.workflowDiagram {
  border-radius: var(--sgds-border-radius-xl);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  padding: 0;
}

.workflowSystemDiagram {
  margin-bottom: 0;
  width: 100%;
}

.workflowSystemImage {
  display: block;
  height: auto;
  max-width: 100%;
}

.workflowLegend {
  align-items: center;
  column-gap: var(--sgds-gap-xl);
  display: flex;
  flex-wrap: wrap;
  row-gap: var(--sgds-gap-xs);
}

.legendItem {
  align-items: center;
  color: var(--sgds-body-color-subtle);
  display: inline-flex;
  font-size: var(--sgds-font-size-label-xs);
  gap: var(--sgds-gap-2-xs);
  line-height: var(--sgds-line-height-16);
}

.legendDot {
  border-radius: var(--sgds-border-radius-full);
  display: inline-flex;
  height: var(--sgds-dimension-8);
  width: var(--sgds-dimension-8);
}

.legendDotAction {
  background: var(--sgds-accent-surface-default);
}

.legendDotAuto {
  background: var(--sgds-primary-color-default);
}

.legendDotOutput {
  background: var(--sgds-success-surface-default);
}

.workflowLegendMeta {
  align-items: center;
  column-gap: var(--sgds-gap-xl);
  display: flex;
  flex-wrap: wrap;
  row-gap: var(--sgds-gap-xs);
}

.legendMetaItem {
  align-items: center;
  color: var(--sgds-body-color-subtle);
  display: inline-flex;
  font-size: var(--sgds-font-size-label-xs);
  gap: var(--sgds-gap-2-xs);
  line-height: var(--sgds-line-height-16);
}

.legendMetaItem :global(code) {
  font-size: var(--sgds-font-size-label-xs);
  line-height: var(--sgds-line-height-16);
}

.workflowMain {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-none);
  width: 100%;
}

.workflowCard {
  min-width: 0;
}

.workflowCardAction,
.workflowCardOutput {
  align-items: center;
  border-radius: var(--sgds-border-radius-none);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
  justify-content: center;
  justify-self: start;
  padding: var(--sgds-padding-sm) var(--sgds-padding-lg);
  text-align: center;
  width: fit-content;
}

.workflowCardAction {
  background: var(--sgds-accent-surface-muted, #ecf5fe);
  border: var(--sgds-border-width-1) solid var(--sgds-accent-border-color-default);
}

.workflowCardAuto {
  align-items: center;
  background: var(--sgds-primary-surface-muted, #f4f2fe);
  border: var(--sgds-border-width-1) solid var(--sgds-primary-border-color-default);
  border-radius: var(--sgds-border-radius-none);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
  letter-spacing: normal;
  padding: var(--sgds-padding-sm) var(--sgds-padding-lg);
}

.workflowCardOutput {
  background: var(--sgds-success-surface-muted, #e3f9ed);
  border: var(--sgds-border-width-1) solid var(--sgds-success-border-color-default);
}

.workflowEyebrow,
.workflowEyebrowOutput,
.workflowAutoTitle {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-16);
}

.workflowEyebrowOutput {
  color: var(--sgds-success-color-default);
}

.workflowAutoTitle {
  color: var(--sgds-primary-color-default);
}

.workflowCardAction .workflowEyebrow {
  color: var(--sgds-accent-color-default);
}

.workflowActionText,
.workflowOutputText {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-16);
  margin: 0;
}

.workflowArrow {
  align-items: center;
  color: var(--sgds-accent-color-default);
  display: flex;
  flex: 0 0 var(--sgds-dimension-40);
  min-width: var(--sgds-dimension-40);
}

.workflowArrowLong {
  border-top: var(--sgds-border-width-1) solid var(--sgds-border-color-muted);
  display: block;
  flex: 1 1 100%;
  height: 0;
  position: relative;
}

.workflowArrowLong::after {
  border-bottom: 6px solid transparent;
  border-left: 8px solid var(--sgds-border-color-muted);
  border-top: 6px solid transparent;
  content: "";
  position: absolute;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);
}

.workflowSteps {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  align-items: flex-start;
}

.workflowStep {
  display: flex;
  min-width: 0;
}

.workflowStepBody {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
  min-width: 0;
}

.workflowStepInline {
  align-items: center;
  column-gap: var(--sgds-gap-2-xs);
  display: flex;
  flex-wrap: nowrap;
  min-width: 0;
  row-gap: var(--sgds-gap-none);
}

.workflowStepTitle {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-label-xs);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: 0;
  line-height: 20px;
  margin: 0;
}

.workflowTokenRow {
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  gap: var(--sgds-gap-2-xs);
  min-width: 0;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .workflowMain {
    align-items: stretch;
    flex-direction: column;
    gap: var(--sgds-gap-sm);
  }

  .workflowArrow {
    min-width: 0;
    transform: rotate(90deg);
    transform-origin: center;
  }

  .workflowCardAction,
  .workflowCardOutput {
    min-height: unset;
  }
}

.section :global(p),
.section :global(h2),
.section :global(h3) {
  margin: 0;
}

</style>
