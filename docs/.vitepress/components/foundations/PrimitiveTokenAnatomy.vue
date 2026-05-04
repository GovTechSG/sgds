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
      <div class="pta-row">
        <span
          v-for="(segment, segmentIndex) in example.segments"
          :key="`${exampleIndex}-${segmentIndex}`"
          :class="['pta-segment', `pta-segment--${segment.tone}`]"
        >
          {{ segment.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style>
.pta-row {
  align-items: center;
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--sgds-text-gap-xs);
  max-width: max-content;
}

/* Pill text uses SGDS "label default" typography (label-md regular). Text
   is always the fixed-dark colour so it stays legible on the pastel chip
   surfaces in both themes. */
.pta-segment {
  border-radius: var(--sgds-border-radius-full);
  color: var(--sgds-color-fixed-dark);
  font-size: var(--sgds-font-size-label-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-xs);
  padding: var(--sgds-padding-2-xs) var(--sgds-padding-md);
  white-space: nowrap;
}

/* Namespace = neutral grey */
.pta-segment--namespace {
  background: var(--sgds-neutral-surface-muted);
}

/* Object / property = SGDS primary muted (brand purple) */
.pta-segment--object {
  background: var(--sgds-primary-surface-muted);
}

/* Scale value = success muted (green) */
.pta-segment--scale {
  background: var(--sgds-success-surface-muted);
}
</style>
