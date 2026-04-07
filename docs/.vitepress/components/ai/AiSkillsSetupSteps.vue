<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CopyCommand from "../ui/CopyCommand.vue";
import CodeToken from "../ui/CodeToken.vue";
import { setupSteps as steps } from "../../data/ai-workflow-data";
</script>

<template>
  <AiInstructionStepper :steps="steps">
    <template #step-1>
      <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        Run the SGDS skills installer in your project root:
      </p>
      <CopyCommand command="npx skills add govtechsg/sgds-web-component" />
    </template>

    <template #step-2>
      <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        When prompted, select all skills from the list. This creates a local <CodeToken label=".agents/" /> folder that your AI tools pick up automatically.
      </p>
    </template>

    <template #step-3>
      <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        Run the following command to pull the latest skill updates:
      </p>
      <CopyCommand command="npx skills update" />
      <p class="sgds:text-label-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal">
        Skills follow the library version. After upgrading <CodeToken label="@govtechsg/sgds-web-component" />, update skills to ensure the AI agent's knowledge matches the installed version.
      </p>
    </template>
  </AiInstructionStepper>
</template>
