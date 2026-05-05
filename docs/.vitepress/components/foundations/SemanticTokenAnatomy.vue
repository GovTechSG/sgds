<script setup lang="ts">
type SegmentTone = "namespace" | "context" | "object" | "scale";

type TokenSegment = {
  text: string;
  tone: SegmentTone;
};

type TokenExample = {
  segments: TokenSegment[];
};

type TokenGroup = {
  caption: string;
  description?: string;
  examples: TokenExample[];
};

const groups: TokenGroup[] = [
  {
    caption: "Semantic token (simplified)",
    description:
      "Names a role, the property it controls, and the emphasis level.",
    examples: [
      {
        segments: [
          { text: "sgds", tone: "namespace" },
          { text: "primary", tone: "object" },
          { text: "bg", tone: "object" },
          { text: "emphasis", tone: "scale" },
        ],
      },
      {
        segments: [
          { text: "sgds", tone: "namespace" },
          { text: "default", tone: "object" },
          { text: "bg", tone: "object" },
          { text: "muted", tone: "scale" },
        ],
      },
      {
        segments: [
          { text: "sgds", tone: "namespace" },
          { text: "primary", tone: "object" },
          { text: "border", tone: "object" },
          { text: "color", tone: "object" },
          { text: "subtle", tone: "scale" },
        ],
      },
    ],
  },
  {
    caption: "Semantic token (granular)",
    description:
      "Adds a context segment, such as form, when the decision is scoped to a specific surface.",
    examples: [
      {
        segments: [
          { text: "sgds", tone: "namespace" },
          { text: "form", tone: "context" },
          { text: "primary", tone: "object" },
          { text: "bg", tone: "object" },
          { text: "emphasis", tone: "scale" },
        ],
      },
      {
        segments: [
          { text: "sgds", tone: "namespace" },
          { text: "form", tone: "context" },
          { text: "padding", tone: "object" },
          { text: "y", tone: "scale" },
        ],
      },
      {
        segments: [
          { text: "sgds", tone: "namespace" },
          { text: "form", tone: "context" },
          { text: "padding", tone: "object" },
          { text: "inline", tone: "object" },
          { text: "xs", tone: "scale" },
        ],
      },
    ],
  },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-md">
    <div
      v-for="(group, groupIndex) in groups"
      :key="groupIndex"
      class="sgds:flex sgds:flex-col sgds:gap-text-xs"
    >
      <div
        v-for="(example, exampleIndex) in group.examples"
        :key="`${groupIndex}-${exampleIndex}`"
        class="sgds:flex sgds:flex-col sgds:gap-text-sm"
      >
        <div
          v-if="exampleIndex === 0"
          class="sgds:flex sgds:flex-col sgds:gap-text-2-xs"
        >
          <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0">
            {{ group.caption }}
          </h5>
          <p
            v-if="group.description"
            class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:m-0"
          >
            {{ group.description }}
          </p>
        </div>
        <div class="sgds:inline-flex sgds:max-w-full sgds:flex-wrap sgds:items-center sgds:gap-text-xs">
          <span
            v-for="(segment, segmentIndex) in example.segments"
            :key="`${groupIndex}-${exampleIndex}-${segmentIndex}`"
            :class="[
              'sgds:whitespace-nowrap sgds:rounded-full sgds:px-md sgds:py-2-xs sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-fixed-dark',
              segment.tone === 'namespace' ? 'sgds:bg-neutral-surface-muted' : '',
              segment.tone === 'context' ? 'sgds:bg-accent-surface-muted' : '',
              segment.tone === 'object' ? 'sgds:bg-primary-surface-muted' : '',
              segment.tone === 'scale' ? 'sgds:bg-success-surface-muted' : '',
            ]"
          >
            {{ segment.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
