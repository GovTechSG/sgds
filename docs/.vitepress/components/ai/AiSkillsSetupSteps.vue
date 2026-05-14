<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CodeBlock from "../ui/CodeBlock.vue";
import CodeToken from "../ui/CodeToken.vue";
import { setupSteps as steps, setupStepsGtCli as gtCliSteps } from "../../data/ai-workflow-data";
</script>

<template>
  <sgds-tab-group variant="underlined">
    <sgds-tab slot="nav" panel="npx" active>Skills CLI</sgds-tab>
    <sgds-tab slot="nav" panel="gt-cli">GovTech CLI</sgds-tab>

    <sgds-tab-panel name="gt-cli">
      <AiInstructionStepper :steps="gtCliSteps">
        <template #step-0>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            Install the GovTech developer CLI. This is available to GovTech Singapore only.
          </p>
          <sgds-link>
            <a href="https://software-engineering.gto.tech.gov.sg/handbook/how-to/local-development/developer-cli/" target="_blank" rel="noopener noreferrer">
              GT CLI setup guide
            </a>
          </sgds-link>
        </template>

        <template #step-1>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            Run the GT CLI installer in your project root:
          </p>
          <CodeBlock code="gt apd install sgds" lang="bash" />
        </template>

        <template #step-2>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            When prompted, select all skills from the list. This creates a local <CodeToken label=".agents/" /> folder that your AI tools pick up automatically.
          </p>
        </template>

        <template #step-3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            After upgrading <CodeToken label="@govtechsg/sgds-web-component" />, refresh the SGDS agent skills:
          </p>
          <CodeBlock code="gt apd install sgds" lang="bash" />
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            This keeps the installed SGDS agent skills aligned with the latest workflow, setup guidance, and component instructions.
          </p>
        </template>
      </AiInstructionStepper>
    </sgds-tab-panel>

    <sgds-tab-panel name="npx">
      <AiInstructionStepper :steps="steps">
        <template #step-0>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            Install Node.js (v20 or later) which includes <CodeToken label="npx" />.
          </p>
          <sgds-link>
            <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer">
              Download Node.js
            </a>
          </sgds-link>
        </template>

        <template #step-1>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            Run the SGDS agent skills installer in your project root:
          </p>
          <CodeBlock code="npx skills add govtechsg/sgds-web-component" lang="bash" />
        </template>

        <template #step-2>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            When prompted, select all skills from the list. This creates a local <CodeToken label=".agents/" /> folder that your AI tools pick up automatically.
          </p>
        </template>

        <template #step-3>
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            After upgrading <CodeToken label="@govtechsg/sgds-web-component" />, refresh the SGDS agent skills from the source repository:
          </p>
          <CodeBlock code="npx skills add govtechsg/sgds-web-component -y" lang="bash" />
          <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            This keeps the installed SGDS agent skills aligned with the latest workflow, setup guidance, and component instructions.
          </p>
        </template>
      </AiInstructionStepper>
    </sgds-tab-panel>
  </sgds-tab-group>
</template>
