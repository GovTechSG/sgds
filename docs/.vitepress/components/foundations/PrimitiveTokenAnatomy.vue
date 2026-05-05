<script setup lang="ts">
type SegmentTone = "namespace" | "object" | "scale";

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
    caption: "Primitive token",
    description:
      "For primitive tokens, the name usually identifies a foundation scale and a step:",
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "purple", tone: "object" },
      { text: "700", tone: "scale" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "border", tone: "object" },
      { text: "width", tone: "object" },
      { text: "1", tone: "scale" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "icon", tone: "object" },
      { text: "size", tone: "object" },
      { text: "md", tone: "scale" },
    ],
  },
  {
    segments: [
      { text: "sgds", tone: "namespace" },
      { text: "line-height", tone: "object" },
      { text: "body", tone: "scale" },
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
