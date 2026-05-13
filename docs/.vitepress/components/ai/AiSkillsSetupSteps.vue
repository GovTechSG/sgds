<script setup lang="ts">
import AiInstructionStepper from "./AiInstructionStepper.vue";
import CopyCommand from "../ui/CopyCommand.vue";
import CodeToken from "../ui/CodeToken.vue";
import { setupSteps as steps } from "../../data/ai-workflow-data";
</script>

<template>
  <AiInstructionStepper :steps="steps">
    <template #step-1>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        Run the SGDS agent skills installer in your project root:
      </p>
      <CopyCommand command="npx skills add govtechsg/sgds-web-component" />
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
      <CopyCommand command="npx skills add https://github.com/govtechsg/sgds-web-component.git -g -y" />
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        This keeps the installed SGDS agent skills aligned with the latest workflow, setup guidance, and component instructions.
      </p>
    </template>
  </AiInstructionStepper>
</template>
