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
        Run the SGDS agent skills installer from your project root:
      </p>
      <CopyCommand command="npx skills add govtechsg/sgds-web-component" />
    </template>

    <template #step-2>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        When prompted, select all SGDS skills from the list. This creates a local <CodeToken label=".agents/" /> folder that compatible AI coding tools can read from your project.
      </p>
    </template>

    <template #step-3>
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        After upgrading <CodeToken label="@govtechsg/sgds-web-component" />, refresh the SGDS agent skills installed in your project:
      </p>
      <CopyCommand command="npx skills update --project -y" />
      <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
        This keeps the installed SGDS agent skills aligned with the latest workflow, setup guidance, and component instructions.
      </p>
    </template>
  </AiInstructionStepper>
</template>
