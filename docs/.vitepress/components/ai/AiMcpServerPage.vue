<script setup lang="ts">
import { ref } from "vue";
import AiInstructionStepper from "./AiInstructionStepper.vue";
import SectionHeader from "../foundations/SectionHeader.vue";
import CodeToken from "../ui/CodeToken.vue";
import CodeBlock from "../ui/CodeBlock.vue";

import { figmaWorkflowCards } from "../../data/ai-workflow-data";

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
    <div class="sgds:flex sgds:flex-col">
    <section class="sgds:flex sgds:flex-col sgds:gap-text-md" aria-labelledby="figma-workflow-options">
      <SectionHeader id="figma-workflow-options" title="Work from Figma context" />
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          Use Figma MCP when you need AI to work with real Figma context, selected frames, or live UI captures. Use Figma Make when you want to explore interface ideas from prompts before refining them with SGDS guidance.
        </p>

        <div class="sgds-grid sgds:gap-layout-md">
        <a
          v-for="card in figmaWorkflowCards"
          :key="card.title"
          :href="card.href"
          class="sgds-col-4 sgds-col-sm-8 sgds-col-md-4 sgds-col-lg-6 sgds:block sgds:h-full sgds:text-default sgds:no-underline"
          :aria-label="`Go to ${card.title} section`"
        >
          <sgds-icon-card class="sgds:h-full">
            <svg
              v-if="card.icon === 'figma-mcp'"
              slot="icon"
              class="sgds:size-8 sgds:text-primary-default"
              viewBox="0 0 180 180"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 84.8528L85.8822 16.9706C95.2548 7.59798 110.451 7.59798 119.823 16.9706C129.196 26.3431 129.196 41.5391 119.823 50.9117L68.5581 102.177"
                stroke="currentColor"
                stroke-width="12"
                stroke-linecap="round"
              />
              <path
                d="M69.2652 101.47L119.823 50.9117C129.196 41.5391 144.392 41.5391 153.765 50.9117L154.118 51.2652C163.491 60.6378 163.491 75.8338 154.118 85.2063L92.7248 146.6C89.6006 149.724 89.6006 154.789 92.7248 157.913L105.331 170.52"
                stroke="currentColor"
                stroke-width="12"
                stroke-linecap="round"
              />
              <path
                d="M102.853 33.9411L52.6482 84.1457C43.2756 93.5183 43.2756 108.714 52.6482 118.087C62.0208 127.459 77.2167 127.459 86.5893 118.087L136.794 67.8822"
                stroke="currentColor"
                stroke-width="12"
                stroke-linecap="round"
              />
            </svg>
            <svg
              v-else
              slot="icon"
              class="sgds:size-8 sgds:text-primary-default"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect fill="var(--sgds-primary-surface-muted)" rx="4" height="24" width="24" />
              <path fill-opacity="0.9" fill="currentColor" d="M14.6699 11.6376C14.8556 11.6573 15 11.8141 15 12.0009C15 14.382 14.7164 16.5566 14.2471 18.1522C14.0134 18.9465 13.7258 19.626 13.3838 20.1181C13.0519 20.5953 12.592 21.0008 12 21.0009C11.408 21.0008 10.9481 20.5953 10.6162 20.1181C10.2742 19.626 9.98655 18.9465 9.75293 18.1522C9.64937 17.8001 9.55614 17.4192 9.47266 17.0145C9.40742 16.6971 9.66681 16.4119 9.99023 16.4335C10.2176 16.4487 10.4104 16.6148 10.457 16.8378C10.5339 17.2067 10.6185 17.5524 10.7119 17.87C10.9306 18.6136 11.1815 19.1796 11.4375 19.5477C11.7034 19.9301 11.9018 20.0008 12 20.0009C12.0982 20.0008 12.2966 19.9301 12.5625 19.5477C12.8185 19.1796 13.0694 18.6136 13.2881 17.87C13.7236 16.3893 14 14.314 14 12.0009C14 11.7728 14.1899 11.5907 14.417 11.6122C14.5021 11.6203 14.5864 11.6287 14.6699 11.6376ZM6.98438 9.47353C7.30159 9.40798 7.5871 9.66692 7.56641 9.99013C7.55176 10.2174 7.38601 10.4103 7.16309 10.4569C6.79398 10.5341 6.44864 10.6193 6.13086 10.7128C5.38721 10.9315 4.82131 11.1823 4.45312 11.4384C4.07048 11.7045 4 11.9027 4 12.0009C4.00004 12.0991 4.07055 12.2973 4.45312 12.5634C4.82131 12.8194 5.38722 13.0702 6.13086 13.289C7.61162 13.7244 9.68681 14.0009 12 14.0009C12.2275 14.0009 12.4086 14.1895 12.3867 14.4159C12.3782 14.5029 12.3696 14.5894 12.3604 14.6747C12.3403 14.8587 12.185 15.0009 12 15.0009C9.61889 15.0009 7.44426 14.7172 5.84863 14.2479C5.05427 14.0143 4.37485 13.7267 3.88281 13.3847C3.40549 13.0527 3.00004 12.593 3 12.0009C3 11.4087 3.40548 10.949 3.88281 10.6171C4.37485 10.275 5.05425 9.98744 5.84863 9.7538C6.2003 9.65037 6.5803 9.55702 6.98438 9.47353ZM12 9.00087C14.3811 9.00087 16.5557 9.2845 18.1514 9.7538C18.9457 9.98744 19.6252 10.275 20.1172 10.6171C20.5945 10.949 21 11.4087 21 12.0009C21 12.593 20.5945 13.0527 20.1172 13.3847C19.6252 13.7267 18.9457 14.0143 18.1514 14.2479C17.7995 14.3514 17.4191 14.444 17.0146 14.5272C16.6974 14.5925 16.412 14.3338 16.4326 14.0106C16.4473 13.7833 16.613 13.5903 16.8359 13.5438C17.2054 13.4669 17.5511 13.3825 17.8691 13.289C18.6128 13.0702 19.1787 12.8194 19.5469 12.5634C19.9295 12.2973 20 12.0991 20 12.0009C20 11.9027 19.9295 11.7045 19.5469 11.4384C19.1787 11.1823 18.6128 10.9315 17.8691 10.7128C16.3884 10.2773 14.3132 10.0009 12 10.0009C11.7721 10.0009 11.5905 9.81069 11.6123 9.58388C11.6207 9.49759 11.6295 9.41167 11.6387 9.32704C11.6587 9.14254 11.8144 9.00087 12 9.00087ZM12 3.00087C12.592 3.00097 13.0519 3.40644 13.3838 3.88368C13.7258 4.3757 14.0134 5.05519 14.2471 5.8495C14.3505 6.20104 14.4432 6.58128 14.5264 6.98524C14.5916 7.30277 14.3323 7.5881 14.0088 7.56728C13.7815 7.55251 13.5884 7.38692 13.542 7.16396C13.4654 6.79501 13.3815 6.44931 13.2881 6.13173C13.0694 5.38816 12.8185 4.82218 12.5625 4.45399C12.2966 4.07168 12.0982 4.00097 12 4.00087C11.9018 4.00097 11.7034 4.07168 11.4375 4.45399C11.1815 4.82218 10.9306 5.38816 10.7119 6.13173C10.2764 7.61248 10 9.6877 10 12.0009C10 12.2283 9.81042 12.4098 9.58398 12.3886C9.49766 12.3804 9.41181 12.3722 9.32715 12.3632C9.14206 12.3435 9 12.187 9 12.0009C9 9.61978 9.28364 7.44512 9.75293 5.8495C9.98655 5.05519 10.2742 4.3757 10.6162 3.88368C10.9481 3.40644 11.408 3.00097 12 3.00087Z" />
            </svg>
            <span slot="title">{{ card.title }}</span>
            <span slot="description">{{ card.description }}</span>
          </sgds-icon-card>
        </a>
        </div>
      </div>
    </section>

    <sgds-divider class="sgds:my-layout-sm"></sgds-divider>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <SectionHeader id="figma-mcp" title="Figma MCP" />
      <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          MCP stands for <strong>Model Context Protocol</strong>. It is a standard way for an AI tool to connect to another tool and use live information from it.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          Figma MCP gives AI tools real design context from Figma, including selected frames, components, variables, spacing, and tokens. This helps them produce SGDS-aligned output instead of guessing from screenshots or written descriptions.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          Figma MCP supports design-to-code workflows, canvas writing, live UI capture for supported clients, FigJam diagrams, Make resources, and Code Connect context. Pair it with SGDS skills so the AI can use both Figma context and SGDS implementation guidance.
        </p>
      </div>
    </section>
    </div>

    <section class="sgds:flex sgds:flex-col sgds:gap-component-md sgds:w-full">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:min-w-0">
              <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">Before Figma MCP</p>
              <div class="ai-flow-row sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-xs sgds:w-full">
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Figma screenshot</span>
                </div>
                <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>AI reads screenshot</span>
                </div>
                <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Intent gets lost</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                Designers usually handed over screens, notes, and links, while developers or AI tools worked from screenshots and manual explanations. That made it easy for design intent to get lost.
              </p>
            </div>
          </div>

          <sgds-divider class="sgds:m-0"></sgds-divider>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:min-w-0">
              <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">When Figma MCP first arrived</p>
              <div class="ai-flow-row sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-xs sgds:w-full">
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Figma frame</span>
                </div>
                <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>AI reads design context</span>
                </div>
                <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                </div>
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Code</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                With Figma MCP, AI can access design context directly from selected Figma frames instead of guessing from images. With a design system, it can better map components, variables, and layout context to produce more accurate outputs.
              </p>
            </div>
          </div>

          <sgds-divider class="sgds:m-0"></sgds-divider>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:w-full">
            <div class="sgds:flex sgds:flex-col sgds:gap-text-sm sgds:min-w-0">
              <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">What it can do now</p>
              <div class="ai-flow-row sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-xs sgds:w-full">
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Figma canvas</span>
                </div>
                <div class="ai-flow-arrow ai-flow-arrow--bidirectional sgds:inline-flex sgds:items-center sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10 sgds:flex-col sgds:gap-component-xs" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                  <span class="flow-long-arrow-reverse"></span>
                </div>
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>AI reads full design context</span>
                </div>
                <div class="ai-flow-arrow ai-flow-arrow--bidirectional sgds:inline-flex sgds:items-center sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10 sgds:flex-col sgds:gap-component-xs" aria-hidden="true">
                  <span class="flow-long-arrow"></span>
                  <span class="flow-long-arrow-reverse"></span>
                </div>
                <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                  <span>Code</span>
                </div>
              </div>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                AI can work with richer design context, move between code and Figma, and write directly to the Figma canvas when the MCP client supports it.
              </p>
            </div>
          </div>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-text-sm">
      <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Before you start: set up Figma MCP for SGDS workflows</h2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        To turn Figma designs into SGDS-aligned code, set up the Figma MCP server, SGDS package, and SGDS skills first.
      </p>

      <AiInstructionStepper :steps="setupInstructionSteps" class="sgds:mt-layout-xs">
        <template #step-1>
          <p>Choose a supported MCP client, such as Codex, Claude Code, Cursor, or VS Code. Follow your client documentation to install and sign in.</p>
        </template>

        <template #step-2>
          <p>
            Follow Figma's
            <a href="https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/" target="_blank" rel="noreferrer">remote MCP server setup guide</a>
            for your client. Figma recommends the remote server because it connects to Figma files without requiring the Figma desktop app.
          </p>
        </template>

        <template #step-3>
          <p>Run the following command if the SGDS web component package is not installed:</p>
          <CodeBlock code="npm i @govtechsg/sgds-web-component" lang="bash" />
        </template>

        <template #step-4>
          <p>Run the following command to install the skills:</p>
          <CodeBlock code="npx skills add govtechsg/sgds-web-component" lang="bash" />
          <p>Select all SGDS skills from the list. This pulls the latest SGDS guidance into your local <CodeToken label=".agents/" /> directory, where compatible AI tools can read it while generating or reviewing SGDS code.</p>
        </template>
      </AiInstructionStepper>

    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
      <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
        <h2 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">Working between Figma and code</h2>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          Use the workflow that matches your starting point.
        </p>
      </div>

      <sgds-alert show variant="primary" outlined title="Prerequisite: use SGDS v3 components in your Figma file first">
        <div>Your Figma file should use official SGDS v3 components and tokens from the SGDS Figma library before you ask AI to generate SGDS-aligned code.</div>
      </sgds-alert>

      <sgds-tab-group class="sgds:block sgds:w-full" variant="underlined">
        <sgds-tab ref="figmaToCodeTab" slot="nav" panel="figma-to-code" active>Figma to code</sgds-tab>
        <sgds-tab slot="nav" panel="code-to-figma">Code to Figma</sgds-tab>

        <sgds-tab-panel name="figma-to-code">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              Start here if you already have screens in Figma and want the AI to help turn them into SGDS-aligned code or implementation guidance.
            </p>

            <div class="sgds:w-full">
              <img
                src="/ai/figma-to-code.svg"
                alt="Diagram showing the Figma to code workflow."
                class="sgds:block sgds:h-auto sgds:max-w-full"
              />
            </div>

            <AiInstructionStepper :steps="figmaToCodeSteps">
              <template #step-1>
                <p>Choose the frame or layer you want the AI to work from. If you use the remote MCP server, copy the Figma link. If you use the desktop MCP server, make sure the Figma desktop app is running.</p>
              </template>

              <template #step-2>
                <p>Give the AI the right Figma context. The method depends on your MCP setup:</p>
                <ol class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li class="sgds:m-0"><strong>Desktop MCP:</strong> select the frame or layer directly in Figma, or open <strong>Dev Mode</strong> and copy the relevant Figma link.</li>
                  <li class="sgds:m-0"><strong>Remote MCP:</strong> share the relevant Figma link with your AI client. The client can extract the node ID from the link and request design context from Figma MCP.</li>
                </ol>
              </template>

              <template #step-3>
                <p>Be explicit that you want SGDS components and patterns where possible. Ask the AI to flag anything that does not have a direct SGDS match.</p>
                <CodeBlock prompt code="Build this Figma frame using SGDS web components and utility classes. Refer to the SGDS skills for the correct component APIs, utility tokens, and layout patterns. Flag anything that does not have a direct SGDS match." />
              </template>

              <template #step-4>
                <p>The agent reads the selected Figma frame through MCP, then uses the installed SGDS skills to choose suitable components, utilities, and layout patterns. Review the result before using it in production.</p>
              </template>
            </AiInstructionStepper>

          </div>
        </sgds-tab-panel>

        <sgds-tab-panel name="code-to-figma">
          <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
              Start here if you want to capture a running page or section in Figma for further design refinement.
            </p>

            <div class="sgds:w-full">
              <img
                src="/ai/code-to-figma.svg"
                alt="Diagram showing the code to Figma workflow from you, to AI agent, to Figma MCP, to Figma output."
                class="sgds:block sgds:h-auto sgds:max-w-full"
              />
            </div>

            <AiInstructionStepper :steps="codeToFigmaSteps">
              <template #step-1>
                <p>Choose the live page, flow, or section you want to bring into Figma. Tell your AI exactly what should be captured, so it can create editable Figma layers from the live UI.</p>
              </template>

              <template #step-2>
                <p>Tell the AI where the captured screen or objects should go in Figma. If you already know the destination, include the relevant Figma link in your prompt. Here are a few ways you can get it:</p>
                <ol class="sgds:text-subtle sgds:flex sgds:flex-col sgds:gap-text-xs sgds:m-0 sgds:pl-8 sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">
                  <li class="sgds:m-0"><strong>To get a Figma page link:</strong> click the <strong>Share</strong> button in the top-right corner and select <strong>Copy link</strong>.</li>
                  <li class="sgds:m-0"><strong>To get a frame link:</strong> right-click a frame and choose <strong>Copy/Paste as → Copy link to selection</strong>.</li>
                </ol>
              </template>

              <template #step-3>
                <p>Be explicit about what you want sent and where it should go. Ask the AI to use SGDS components, tokens, and layout rules where possible, and to flag anything that does not have a direct SGDS match.</p>
                <CodeBlock prompt code="Send my dashboard page to this Figma page or frame: <insert Figma link>. Use SGDS components, tokens, and layout rules where possible. Flag anything that does not have a direct SGDS match." />
              </template>

              <template #step-4>
                <p>Once the screen is in Figma, tidy the file for future design work. Use clear layer names, keep the hierarchy clean, and replace temporary UI with SGDS components where possible. When you are ready to turn it back into code, refer to the <a href="#figma-to-code" @click="openFigmaToCodeTab">Figma to code workflow</a>.</p>
              </template>
            </AiInstructionStepper>

          </div>
        </sgds-tab-panel>
      </sgds-tab-group>

      <section class="sgds:mt-layout-sm">
        <sgds-alert show variant="neutral" outlined title="Tips for better output">
        <ul class="sgds:m-0 sgds:pl-6 sgds:text-body-sm sgds:font-regular sgds:leading-2-xs">
          <li class="sgds:m-0 sgds:text-body-sm sgds:leading-2-xs">Keep frames and layers clean.</li>
          <li class="sgds:m-0 sgds:text-body-sm sgds:leading-2-xs">Be specific about the section or component.</li>
          <li class="sgds:m-0 sgds:text-body-sm sgds:leading-2-xs">Ask the AI to use Code Connect mappings where available.</li>
          <li class="sgds:m-0 sgds:text-body-sm sgds:leading-2-xs">See <a href="/ai/prompt-tips">Prompt tips</a> for more examples.</li>
        </ul>
        </sgds-alert>
      </section>

      <section class="sgds:mt-layout-sm sgds:flex sgds:flex-col sgds:gap-text-sm">
        <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">What is Figma Code Connect?</h4>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          <a href="https://developers.figma.com/docs/code-connect/" target="_blank" rel="noreferrer">Code Connect</a>
          links Figma components to their real code implementations. Instead of treating a selected component as a generic visual object, Figma can show the component's production code, props, variants, and implementation details in Dev Mode. Figma MCP can also use those connections to give AI agents more accurate code context.
        </p>
        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          SGDS components are already set up with Code Connect. This means that when designers use components from the SGDS Figma library correctly, developers and AI agents can map those designs back to the right SGDS web components and implementation patterns.
        </p>

        <div class="sgds:flex sgds:flex-col sgds:gap-component-md sgds:my-layout-xs">
          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">Not code connected</p>
            <div class="ai-flow-row sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-xs sgds:w-full">
              <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                <span>SGDS Figma component</span>
              </div>
              <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                <span class="flow-long-arrow"></span>
              </div>
              <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                <span>Visual interpretation</span>
              </div>
              <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                <span class="flow-long-arrow"></span>
              </div>
              <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-warning-surface-muted)] sgds:border-[var(--sgds-warning-border-color-muted)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                <span>Possible mismatch</span>
              </div>
            </div>
          </div>

          <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
            <p class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:text-heading-default sgds:m-0">Code connected</p>
            <div class="ai-flow-row sgds:flex sgds:flex-wrap sgds:items-center sgds:gap-component-xs sgds:w-full">
              <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-accent-surface-muted)] sgds:border-[var(--sgds-accent-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                <span>SGDS Figma component</span>
              </div>
              <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                <span class="flow-long-arrow"></span>
              </div>
              <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-primary-surface-muted)] sgds:border-[var(--sgds-primary-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                <span>Code Connect mapping</span>
              </div>
              <div class="ai-flow-arrow sgds:inline-flex sgds:items-center sgds:text-[var(--sgds-border-color-emphasis)] sgds:shrink-0 sgds:grow-0 sgds:basis-10 sgds:w-10" aria-hidden="true">
                <span class="flow-long-arrow"></span>
              </div>
              <div class="flow-node-box sgds:text-fixed-dark sgds:inline-flex sgds:items-center sgds:border sgds:rounded-none sgds:gap-2-xs sgds:py-2 sgds:px-6 sgds:bg-[var(--sgds-success-surface-muted)] sgds:border-[var(--sgds-success-border-color-default)] sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal">
                <span>Correct SGDS implementation</span>
              </div>
            </div>
          </div>
        </div>

        <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
          For the best handoff, designers should build with the official SGDS component library and use its components as intended. When the design uses SGDS components properly and those components are Code Connected, developers and AI agents can implement the matching SGDS web components with more confidence.
        </p>
      </section>
    </section>

    <section class="sgds:flex sgds:flex-col sgds:gap-layout-sm">
      <SectionHeader id="figma-make" title="Figma Make" />
      <div class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
        <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">What is Figma Make?</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            <a href="https://www.figma.com/make/" target="_blank" rel="noreferrer">Figma Make</a>
            is an AI tool for turning prompts, designs, and product context into functional prototypes. You can start from an existing design, prompt changes, edit the output, and bring the result back into Figma Design as editable layers.
          </p>
        </div>

        <div class="sgds:flex sgds:flex-col sgds:gap-text-sm">
          <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">SGDS Make Kit</h4>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            SGDS intends to build a <a href="https://help.figma.com/hc/en-us/articles/39241689698839-Get-started-with-Make-kits" target="_blank" rel="noreferrer">Make kit</a> for SGDS workflows. A Make kit gives Figma Make design system context, such as npm package references, published Figma library styles and variables, and guidelines for how components, tokens, and patterns should be used.
          </p>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            This work is in progress. You can expect the SGDS Make Kit to help Figma Make start from SGDS components and tokens, follow SGDS usage guidance, and produce prototypes that are easier to review before implementation.
          </p>
        </div>
      </div>
    </section>

  </div>
</template>

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

.ai-flow-row {
  flex-wrap: nowrap;
}

@media (max-width: 640px) {
  .ai-flow-row {
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: var(--sgds-gap-xs);
  }

  .ai-flow-row .flow-node-box {
    box-sizing: border-box;
    justify-content: center;
    max-width: var(--sgds-dimension-320);
    width: 100%;
  }

  .ai-flow-arrow {
    align-items: center;
    flex-basis: auto !important;
    height: var(--sgds-dimension-32);
    justify-content: center;
    max-width: var(--sgds-dimension-320);
    width: 100% !important;
  }

  .ai-flow-arrow--bidirectional {
    flex-direction: row !important;
    gap: var(--sgds-gap-md);
  }

  .ai-flow-arrow .flow-long-arrow,
  .ai-flow-arrow .flow-long-arrow-reverse {
    border-left: var(--sgds-border-width-1) solid var(--sgds-border-color-emphasis);
    border-top: 0;
    flex: 0 0 auto;
    height: var(--sgds-dimension-32);
    width: 0;
  }

  .ai-flow-arrow .flow-long-arrow::after {
    border-bottom: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid var(--sgds-border-color-emphasis);
    bottom: -1px;
    right: auto;
    top: auto;
    transform: translateX(-50%);
  }

  .ai-flow-arrow .flow-long-arrow-reverse::before {
    border-bottom: 6px solid var(--sgds-border-color-emphasis);
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 0;
    left: 50%;
    top: -1px;
    transform: translateX(-50%);
  }
}

</style>
