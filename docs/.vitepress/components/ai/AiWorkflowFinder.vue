<script setup lang="ts">
import { ref, computed } from "vue";
import "@govtechsg/sgds-web-component/components/Icon/index.js";
import "@govtechsg/sgds-web-component/components/Button/index.js";
import "@govtechsg/sgds-web-component/components/Badge/index.js";

type Role = "designer" | "developer" | "pm";
type Stage = "new" | "migration";
type StartKey = "figma" | "prompt" | "code";
type NodeType = "user" | "figma" | "ai" | "code";

interface FlowNode {
  label: string;
  sublabel: string;
  type: NodeType;
}

interface FlowStep {
  node: FlowNode;
  connector?: string;
}

interface WorkflowPath {
  id: string;
  title: string;
  description: string;
  approachLabel: string;
  personas: string[];
  stages: string[];
  starts: string[];
  steps: FlowStep[];
  note: string;
}

const workflowPaths: WorkflowPath[] = [
  {
    id: "figma-new",
    title: "Start from Figma, implement to code",
    description:
      "Design in Figma first, then push to code — return to Figma anytime.",
    approachLabel: "Figma-first",
    personas: ["designer", "developer"],
    stages: ["new"],
    starts: ["figma"],
    steps: [
      {
        node: { label: "You", sublabel: "in Figma", type: "user" },
        connector: "design",
      },
      {
        node: {
          label: "Figma canvas",
          sublabel: "SGDS components",
          type: "figma",
        },
        connector: "prompt Claude",
      },
      {
        node: { label: "AI agent", sublabel: "reads skills", type: "ai" },
        connector: "implement",
      },
      {
        node: {
          label: "Code in IDE",
          sublabel: "SGDS components",
          type: "code",
        },
        connector: "iterate ⟷",
      },
      {
        node: {
          label: "Figma canvas",
          sublabel: "edit + refine",
          type: "figma",
        },
      },
    ],
    note: "Fluid loop — move back to Figma whenever visual editing is easier. Code Connect keeps components mapped. Once done, push back to code and continue.",
  },
  {
    id: "prompt-new",
    title: "Start from a text prompt",
    description:
      "Describe what you want — AI generates code directly, send to Figma if needed.",
    approachLabel: "Prompt-first",
    personas: ["designer", "developer", "pm"],
    stages: ["new"],
    starts: ["prompt"],
    steps: [
      {
        node: { label: "You", sublabel: "describe idea", type: "user" },
        connector: "text prompt",
      },
      {
        node: { label: "AI agent", sublabel: "reads skills", type: "ai" },
        connector: "generate",
      },
      {
        node: {
          label: "Code in IDE",
          sublabel: "SGDS components",
          type: "code",
        },
        connector: "send to Figma",
      },
      {
        node: {
          label: "Figma canvas",
          sublabel: "edit visually",
          type: "figma",
        },
        connector: "back to code",
      },
      {
        node: { label: "Code in IDE", sublabel: "continue", type: "code" },
      },
    ],
    note: "Good for PMs and anyone who lives in ideas — no need to open Figma to get started. Jump into Figma only when visual refinement is needed.",
  },
  {
    id: "code-migrate",
    title: "Start from existing codebase",
    description:
      "Let Claude analyse your existing code and migrate to SGDS v3.",
    approachLabel: "Code-first",
    personas: ["developer"],
    stages: ["migration"],
    starts: ["code"],
    steps: [
      {
        node: { label: "You", sublabel: "in IDE", type: "user" },
        connector: "prompt Claude",
      },
      {
        node: { label: "AI agent", sublabel: "scans codebase", type: "ai" },
        connector: "migrate",
      },
      {
        node: { label: "Code in IDE", sublabel: "SGDS v3", type: "code" },
        connector: "if needed",
      },
      {
        node: {
          label: "Figma canvas",
          sublabel: "visual review",
          type: "figma",
        },
        connector: "back to code",
      },
      {
        node: { label: "Code in IDE", sublabel: "finalise", type: "code" },
      },
    ],
    note: 'Tell Claude: "Look at my existing codebase and migrate components to SGDS v3." Jump into Figma only when a visual check is easier than reading code.',
  },
  {
    id: "figma-migrate",
    title: "Start from an existing Figma file",
    description:
      "Convert old Figma designs to SGDS, implement to code, use Code Connect to map components.",
    approachLabel: "Figma-first",
    personas: ["designer", "developer"],
    stages: ["migration"],
    starts: ["figma"],
    steps: [
      {
        node: { label: "You", sublabel: "old Figma file", type: "user" },
        connector: "convert",
      },
      {
        node: {
          label: "Figma canvas",
          sublabel: "SGDS components",
          type: "figma",
        },
        connector: "implement",
      },
      {
        node: { label: "AI agent", sublabel: "reads skills", type: "ai" },
        connector: "generate",
      },
      {
        node: {
          label: "Code in IDE",
          sublabel: "Code Connect",
          type: "code",
        },
        connector: "maps back",
      },
      {
        node: {
          label: "Figma canvas",
          sublabel: "templates",
          type: "figma",
        },
      },
    ],
    note: "Once converted to code with Code Connect, ask Figma to populate other screens using templates that have been sent back. Components stay mapped to your codebase throughout.",
  },
];

interface Option {
  value: string;
  label: string;
  description: string;
  icon: string;
}

interface Question {
  id: string;
  text: string;
  subtext: string;
  options: Option[];
}

const roleQuestion: Question = {
  id: "role",
  text: "What best describes your role?",
  subtext: "This helps us tailor the workflow to what you'll actually do.",
  options: [
    {
      value: "designer",
      label: "Designer",
      description: "I work primarily in Figma and design tools",
      icon: "pencil",
    },
    {
      value: "developer",
      label: "Developer",
      description: "I write code and build in the IDE",
      icon: "code-square",
    },
    {
      value: "pm",
      label: "Product Manager",
      description: "I define requirements and oversee the product",
      icon: "speedometer",
    },
  ],
};

const stageQuestion: Question = {
  id: "stage",
  text: "What are you working on?",
  subtext: "Different project stages call for different approaches.",
  options: [
    {
      value: "new",
      label: "New project",
      description: "Starting a fresh project with SGDS v3",
      icon: "rocket",
    },
    {
      value: "migration",
      label: "Migration",
      description: "Moving an existing project or design to SGDS v3",
      icon: "arrow-repeat",
    },
  ],
};

const startQuestions: Record<string, Record<string, Question>> = {
  new: {
    designer: {
      id: "start",
      text: "Where does your work usually start?",
      subtext:
        "Pick your natural entry point — you can always switch tools later.",
      options: [
        {
          value: "figma",
          label: "In Figma",
          description: "Design the screens first, then push to code",
          icon: "layout",
        },
        {
          value: "prompt",
          label: "From a prompt",
          description: "Describe what you want and let AI generate first",
          icon: "chat-dots",
        },
      ],
    },
    developer: {
      id: "start",
      text: "Where does your work usually start?",
      subtext:
        "Pick your natural entry point — you can always switch tools later.",
      options: [
        {
          value: "prompt",
          label: "From a prompt",
          description: "Describe what to build, then iterate in the IDE",
          icon: "chat-dots",
        },
        {
          value: "figma",
          label: "From a Figma file",
          description: "Work from designs shared by a designer",
          icon: "layout",
        },
      ],
    },
    pm: {
      id: "start",
      text: "How do you usually kick things off?",
      subtext:
        "Pick your natural entry point — you can always switch tools later.",
      options: [
        {
          value: "prompt",
          label: "With a description",
          description: "Write what you want and have AI generate a prototype",
          icon: "chat-dots",
        },
        {
          value: "figma",
          label: "From a Figma file",
          description: "Work from an existing design or wireframe",
          icon: "layout",
        },
      ],
    },
  },
  migration: {
    designer: {
      id: "start",
      text: "Where is your existing project?",
      subtext: "The migration path depends on where your current work lives.",
      options: [
        {
          value: "figma",
          label: "In Figma",
          description:
            "I have an old Figma file to convert to SGDS components",
          icon: "layout",
        },
        {
          value: "code",
          label: "In the codebase",
          description: "The designs are coded but not yet using SGDS v3",
          icon: "code-square",
        },
      ],
    },
    developer: {
      id: "start",
      text: "Where is your existing project?",
      subtext: "The migration path depends on where your current work lives.",
      options: [
        {
          value: "code",
          label: "In the codebase",
          description: "Existing code that needs migrating to SGDS v3",
          icon: "code-square",
        },
        {
          value: "figma",
          label: "In Figma",
          description: "Working from a designer's Figma file migration",
          icon: "layout",
        },
      ],
    },
    pm: {
      id: "start",
      text: "Where does your current project live?",
      subtext: "The migration path depends on where your current work lives.",
      options: [
        {
          value: "figma",
          label: "In Figma",
          description: "We have an existing Figma design to migrate to SGDS",
          icon: "layout",
        },
        {
          value: "code",
          label: "In the codebase",
          description: "We have existing code to migrate to SGDS v3",
          icon: "code-square",
        },
      ],
    },
  },
};

const answers = ref<{
  role?: Role;
  stage?: Stage;
  start?: StartKey;
}>({});

const currentQuestion = computed<Question | null>(() => {
  if (!answers.value.role) return roleQuestion;
  if (!answers.value.stage) return stageQuestion;
  if (!answers.value.start) {
    return (
      startQuestions[answers.value.stage]?.[answers.value.role] ?? null
    );
  }
  return null;
});

const isComplete = computed(
  () => !!(answers.value.role && answers.value.stage && answers.value.start)
);

const primaryWorkflow = computed<WorkflowPath | null>(() => {
  if (!isComplete.value) return null;
  return (
    workflowPaths.find(
      (p) =>
        p.stages.includes(answers.value.stage!) &&
        p.starts.includes(answers.value.start!)
    ) ?? null
  );
});

const otherWorkflows = computed<WorkflowPath[]>(() => {
  if (!primaryWorkflow.value) return [];
  return workflowPaths.filter((p) => p.id !== primaryWorkflow.value!.id);
});

const questionStep = computed(() => {
  if (!answers.value.role) return 1;
  if (!answers.value.stage) return 2;
  if (!answers.value.start) return 3;
  return 4;
});

const roleLabelMap: Record<string, string> = {
  designer: "Designer",
  developer: "Developer",
  pm: "Product Manager",
};

const stageLabelMap: Record<string, string> = {
  new: "New project",
  migration: "Migration",
};

const startLabelMap: Record<string, string> = {
  figma: "Starting in Figma",
  prompt: "Starting from a prompt",
  code: "Starting in codebase",
};

const answeredLabels = computed(() => {
  const items: { key: string; label: string }[] = [];
  if (answers.value.role)
    items.push({ key: "role", label: roleLabelMap[answers.value.role] });
  if (answers.value.stage)
    items.push({ key: "stage", label: stageLabelMap[answers.value.stage] });
  if (answers.value.start)
    items.push({ key: "start", label: startLabelMap[answers.value.start] });
  return items;
});

function selectAnswer(questionId: string, value: string) {
  if (questionId === "role") {
    answers.value = { role: value as Role };
  } else if (questionId === "stage") {
    answers.value = {
      ...answers.value,
      stage: value as Stage,
      start: undefined,
    };
  } else if (questionId === "start") {
    answers.value = { ...answers.value, start: value as StartKey };
  }
}

function goBack() {
  if (answers.value.start !== undefined) {
    answers.value = { role: answers.value.role, stage: answers.value.stage };
  } else if (answers.value.stage !== undefined) {
    answers.value = { role: answers.value.role };
  } else {
    answers.value = {};
  }
}

function reset() {
  answers.value = {};
}

const personaLabelMap: Record<string, string> = {
  designer: "Designer",
  developer: "Developer",
  pm: "PM",
  new: "New project",
  migration: "Migration",
};

const personaVariantMap: Record<string, string> = {
  designer: "purple",
  developer: "primary",
  pm: "cyan",
  new: "success",
  migration: "warning",
};

function tagVariant(key: string): string {
  return personaVariantMap[key] ?? "neutral";
}

function tagLabel(key: string): string {
  return personaLabelMap[key] ?? key;
}

const nodeClass: Record<NodeType, string> = {
  user: "wf-node--user",
  figma: "wf-node--figma",
  ai: "wf-node--ai",
  code: "wf-node--code",
};
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-md sgds:w-full">

    <!-- ── Questionnaire phase ── -->
    <div
      v-if="!isComplete"
      class="sgds:border-1 sgds:border-default sgds:rounded-lg sgds:overflow-hidden"
    >
      <!-- Header bar -->
      <div
        class="sgds:bg-surface-raised sgds:border-b sgds:border-default sgds:px-component-lg sgds:py-component-sm sgds:flex sgds:items-center sgds:justify-between sgds:flex-wrap sgds:gap-component-sm"
      >
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:flex-wrap">
          <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">
            Step {{ questionStep }} of 3
          </span>
          <template v-for="item in answeredLabels" :key="item.key">
            <sgds-icon name="chevron-right" size="xs" class="sgds:text-subtle"></sgds-icon>
            <sgds-badge variant="neutral" outlined>{{ item.label }}</sgds-badge>
          </template>
        </div>
        <sgds-button v-if="questionStep > 1" variant="ghost" tone="neutral" size="sm" @click="goBack">
          <sgds-icon slot="leftIcon" name="arrow-left" size="xs"></sgds-icon>
          Back
        </sgds-button>
      </div>

      <!-- Question body -->
      <div
        class="sgds:bg-surface-default sgds:p-component-lg sgds:flex sgds:flex-col sgds:gap-layout-sm"
      >
        <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
          <p class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
            {{ currentQuestion?.text }}
          </p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            {{ currentQuestion?.subtext }}
          </p>
        </div>

        <!-- Answer options -->
        <div
          :class="[
            'sgds:grid sgds:gap-component-sm',
            (currentQuestion?.options.length ?? 0) === 3
              ? 'wf-options-grid-3'
              : 'wf-options-grid-2',
          ]"
        >
          <button
            v-for="opt in currentQuestion?.options"
            :key="opt.value"
            class="wf-option-card"
            @click="selectAnswer(currentQuestion!.id, opt.value)"
          >
            <div class="sgds:flex sgds:items-start sgds:gap-component-sm">
              <div class="wf-option-icon-wrap">
                <sgds-icon :name="opt.icon" size="md"></sgds-icon>
              </div>
              <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs sgds:text-left">
                <span class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
                  {{ opt.label }}
                </span>
                <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">
                  {{ opt.description }}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- ── Result phase ── -->
    <template v-if="isComplete && primaryWorkflow">

      <!-- Answers summary + reset -->
      <div class="sgds:flex sgds:items-center sgds:justify-between sgds:flex-wrap sgds:gap-component-sm">
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs sgds:flex-wrap">
          <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Your answers:</span>
          <sgds-badge
            v-for="item in answeredLabels"
            :key="item.key"
            variant="neutral"
            outlined
          >{{ item.label }}</sgds-badge>
        </div>
        <sgds-button variant="ghost" tone="neutral" size="sm" @click="reset">
          <sgds-icon slot="leftIcon" name="arrow-repeat" size="xs"></sgds-icon>
          Start over
        </sgds-button>
      </div>

      <!-- Primary workflow card -->
      <div class="wf-primary-card">
        <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
          <p class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase sgds:text-primary-default sgds:m-0">
            Recommended for you
          </p>
          <p class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
            {{ primaryWorkflow.title }}
          </p>
          <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
            {{ primaryWorkflow.description }}
          </p>
          <!-- Tags -->
          <div class="sgds:flex sgds:flex-wrap sgds:gap-2-xs sgds:mt-[2px]">
            <sgds-badge
              v-for="p in primaryWorkflow.personas"
              :key="p"
              :variant="tagVariant(p)"
              outlined
            >{{ tagLabel(p) }}</sgds-badge>
            <sgds-badge
              v-for="s in primaryWorkflow.stages"
              :key="s"
              :variant="tagVariant(s)"
              outlined
            >{{ tagLabel(s) }}</sgds-badge>
            <sgds-badge variant="neutral" outlined>{{ primaryWorkflow.approachLabel }}</sgds-badge>
          </div>
        </div>

        <!-- Flow diagram -->
        <div class="sgds:overflow-x-auto sgds:mt-lg sgds:pb-[4px]">
          <div class="sgds:flex sgds:items-center sgds:min-w-max">
            <template v-for="(step, idx) in primaryWorkflow.steps" :key="idx">
              <div :class="['wf-node', nodeClass[step.node.type]]">
                <span class="sgds:text-body-sm sgds:font-semibold sgds:leading-xs sgds:tracking-normal">{{ step.node.label }}</span>
                <span class="sgds:text-label-xs sgds:font-regular sgds:leading-2-xs sgds:tracking-normal wf-node-sublabel">{{ step.node.sublabel }}</span>
              </div>
              <div
                v-if="step.connector"
                class="sgds:flex sgds:items-center sgds:gap-[4px] sgds:px-[6px] sgds:flex-shrink-0"
              >
                <span class="sgds:text-label-xs sgds:font-regular sgds:leading-2-xs sgds:text-subtle sgds:whitespace-nowrap">{{ step.connector }}</span>
                <sgds-icon name="arrow-right" size="xs" class="sgds:text-subtle"></sgds-icon>
              </div>
            </template>
          </div>
        </div>

        <!-- Note -->
        <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle sgds:italic sgds:m-0 sgds:mt-md sgds:pt-md sgds:border-t sgds:border-default">
          {{ primaryWorkflow.note }}
        </p>
      </div>

      <!-- Other paths -->
      <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
        <p class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:m-0">
          Other paths you can explore
        </p>
        <div class="wf-other-grid">
          <div
            v-for="path in otherWorkflows"
            :key="path.id"
            class="wf-other-card"
          >
            <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
              <p class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:m-0">
                {{ path.title }}
              </p>
              <p class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle sgds:m-0">
                {{ path.description }}
              </p>
              <!-- Tags -->
              <div class="sgds:flex sgds:flex-wrap sgds:gap-2-xs">
                <sgds-badge
                  v-for="p in path.personas"
                  :key="p"
                  :variant="tagVariant(p)"
                  outlined
                >{{ tagLabel(p) }}</sgds-badge>
                <sgds-badge
                  v-for="s in path.stages"
                  :key="s"
                  :variant="tagVariant(s)"
                  outlined
                >{{ tagLabel(s) }}</sgds-badge>
                <sgds-badge variant="neutral" outlined>{{ path.approachLabel }}</sgds-badge>
              </div>
            </div>

            <!-- Compact flow diagram — vertical stack to avoid overflow -->
            <div class="sgds:mt-sm sgds:flex sgds:flex-col sgds:gap-[2px]">
              <template v-for="(step, idx) in path.steps" :key="idx">
                <div :class="['wf-node', 'wf-node--sm', 'wf-node--full', nodeClass[step.node.type]]">
                  <span class="sgds:text-label-xs sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">{{ step.node.label }}</span>
                  <span class="sgds:text-label-xs sgds:font-regular sgds:leading-2-xs sgds:tracking-normal wf-node-sublabel">{{ step.node.sublabel }}</span>
                </div>
                <div
                  v-if="step.connector"
                  class="sgds:flex sgds:items-center sgds:gap-[3px] sgds:pl-[10px]"
                >
                  <sgds-icon name="arrow-down" size="xs" class="sgds:text-subtle"></sgds-icon>
                  <span class="sgds:text-label-xs sgds:font-regular sgds:leading-2-xs sgds:text-subtle">{{ step.connector }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Legend -->
      <div class="sgds:flex sgds:items-center sgds:flex-wrap sgds:gap-component-md">
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs">
          <span class="wf-legend-dot wf-legend-dot--user"></span>
          <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">You / your action</span>
        </div>
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs">
          <span class="wf-legend-dot wf-legend-dot--figma"></span>
          <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Figma canvas</span>
        </div>
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs">
          <span class="wf-legend-dot wf-legend-dot--ai"></span>
          <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">AI agent</span>
        </div>
        <div class="sgds:flex sgds:items-center sgds:gap-component-xs">
          <span class="wf-legend-dot wf-legend-dot--code"></span>
          <span class="sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:text-subtle">Code / IDE</span>
        </div>
      </div>

    </template>
  </div>
</template>

<style>
/* ── Option cards — hover/focus states require :pseudo selectors not available via sgds: utilities ── */
.wf-option-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--sgds-component-padding-md);
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease;
  text-align: left;
}
.wf-option-card:hover {
  border-color: var(--sgds-border-color-default);
  background: var(--sgds-surface-raised);
}
.wf-option-card:focus-visible {
  outline: 2px solid var(--sgds-primary-color-default);
  outline-offset: 2px;
}

/* Option icon wrapper */
.wf-option-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  flex-shrink: 0;
  color: var(--sgds-body-color-default);
}

/* Option grids — CSS grid with responsive breakpoints not expressible via sgds: utilities alone */
.wf-options-grid-2 { grid-template-columns: repeat(2, 1fr); }
.wf-options-grid-3 { grid-template-columns: repeat(3, 1fr); }
@media (max-width: 600px) {
  .wf-options-grid-2,
  .wf-options-grid-3 { grid-template-columns: 1fr; }
}

/* Primary workflow card — highlighted with SGDS primary border token */
.wf-primary-card {
  padding: var(--sgds-component-padding-lg);
  border: 2px solid var(--sgds-primary-border-color-default);
  border-radius: var(--sgds-border-radius-lg);
  background: var(--sgds-surface-default);
}

/* Other workflows grid — responsive 2-col layout; align-items: start so cards don't stretch to equal height */
.wf-other-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sgds-gap-sm);
  align-items: start;
}
@media (max-width: 640px) {
  .wf-other-grid { grid-template-columns: 1fr; }
}

/* Other workflow card */
.wf-other-card {
  padding: var(--sgds-component-padding-md);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-md);
  background: var(--sgds-surface-default);
}

/* Workflow node */
.wf-node {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 10px;
  border: 1px solid;
  border-radius: var(--sgds-border-radius-sm);
  min-width: 88px;
}
.wf-node--sm {
  padding: 4px 8px;
  min-width: 72px;
}
.wf-node--full {
  width: 100%;
  min-width: 0;
}
.wf-node-sublabel {
  opacity: 0.75;
}

/* Node type colours — semantic surface/border/text tokens per actor type */
.wf-node--user  {
  background: var(--sgds-accent-surface-muted);
  border-color: var(--sgds-accent-border-color-muted);
  color: var(--sgds-accent-color-default);
}
.wf-node--figma {
  background: var(--sgds-purple-surface-muted);
  border-color: var(--sgds-purple-border-color-muted);
  color: var(--sgds-purple-color-default);
}
.wf-node--ai {
  background: var(--sgds-warning-surface-muted);
  border-color: var(--sgds-warning-border-color-muted);
  color: var(--sgds-warning-color-default);
}
.wf-node--code {
  background: var(--sgds-success-surface-muted);
  border-color: var(--sgds-success-border-color-muted);
  color: var(--sgds-success-color-default);
}

/* Legend dots */
.wf-legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  border: 1px solid;
  flex-shrink: 0;
}
.wf-legend-dot--user  {
  background: var(--sgds-accent-surface-muted);
  border-color: var(--sgds-accent-border-color-muted);
}
.wf-legend-dot--figma {
  background: var(--sgds-purple-surface-muted);
  border-color: var(--sgds-purple-border-color-muted);
}
.wf-legend-dot--ai {
  background: var(--sgds-warning-surface-muted);
  border-color: var(--sgds-warning-border-color-muted);
}
.wf-legend-dot--code {
  background: var(--sgds-success-surface-muted);
  border-color: var(--sgds-success-border-color-muted);
}
</style>
