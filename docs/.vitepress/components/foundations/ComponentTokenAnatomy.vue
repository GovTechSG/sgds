<script setup lang="ts">
type SegmentTone = "namespace" | "context" | "object" | "scale";

type TokenSegment = {
  text: string;
  tone: SegmentTone;
};

type TokenExample = {
  caption?: string;
  description?: string;
  segments: TokenSegment[];
};

const examples: TokenExample[] = [
  {
    caption: "Component token",
    description:
      "Names a component, then the role, property, and emphasis scoped to that component.",
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "stepper", tone: "context" },
      { text: "visited", tone: "object" },
      { text: "border", tone: "object" },
      { text: "color", tone: "object" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "badge", tone: "context" },
      { text: "info", tone: "object" },
      { text: "outlined", tone: "object" },
      { text: "bg", tone: "object" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "btn", tone: "context" },
      { text: "label", tone: "object" },
      { text: "padding", tone: "object" },
      { text: "x", tone: "scale" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "btn", tone: "context" },
      { text: "md", tone: "object" },
      { text: "min", tone: "object" },
      { text: "width", tone: "object" },
    ],
  },
];
</script>

<template>
  <div class="sgds:flex sgds:flex-col sgds:gap-text-xs">
    <div
      v-for="(example, exampleIndex) in examples"
      :key="exampleIndex"
      class="sgds:flex sgds:flex-col sgds:gap-text-sm"
    >
      <div
        v-if="example.caption || example.description"
        class="sgds:flex sgds:flex-col sgds:gap-text-2-xs"
      >
        <h5
          v-if="example.caption"
          class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-sm sgds:tracking-tight sgds:text-heading-default sgds:m-0"
        >
          {{ example.caption }}
        </h5>
        <p
          v-if="example.description"
          class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:text-body-default sgds:m-0"
        >
          {{ example.description }}
        </p>
      </div>
      <div class="sgds:inline-flex sgds:max-w-full sgds:flex-wrap sgds:items-center sgds:gap-text-xs">
        <span
          v-for="(segment, segmentIndex) in example.segments"
          :key="`${exampleIndex}-${segmentIndex}`"
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
</template>
