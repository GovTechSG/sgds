<script setup lang="ts">
import tokenUpdateDiagramSource from "./assets/token-update.svg?raw";

const tokenizedTokenUpdateDiagram = tokenUpdateDiagramSource
  .split("\n")
  .map((line, index, lines) => {
    let tokenizedLine = line;
    const previousLine = lines[index - 1] ?? "";

    if (!line.includes("<mask")) {
      tokenizedLine = tokenizedLine.replaceAll('fill="white"', 'fill="var(--sgds-surface-default)"');
    }

    if (previousLine.includes('cx="290"')) {
      tokenizedLine = tokenizedLine.replaceAll('fill="#1A1A1A"', 'fill="transparent"');
    }

    if (line.includes('cx="290"')) {
      tokenizedLine += `
<defs>
  <clipPath id="system-update-raw-value-clip">
    <rect x="304" y="32" width="48" height="16" />
  </clipPath>
</defs>
<g aria-hidden="true" clip-path="url(#system-update-raw-value-clip)">
  <text class="system-update-flow__raw-value-start" x="304" y="44" font-family="var(--sgds-font-family-base)" font-size="11" fill="var(--sgds-color-default)">#6B4FEB</text>
  <text class="system-update-flow__raw-value-end" x="304" y="44" font-family="var(--sgds-font-family-base)" font-size="11" fill="var(--sgds-color-default)">#0269D0</text>
</g>`;
    }

    return tokenizedLine
      .replace(
        /<svg/,
        '<svg class="sgds:block sgds:h-auto sgds:w-[642px] sgds:max-w-full" role="img" aria-label="Raw value updates a primitive token, semantic tokens, and the components that use them"',
      )
      .replaceAll('fill="#0E0E0E"', 'fill="var(--sgds-color-default)"')
      .replaceAll('fill="#1A1A1A"', 'fill="var(--sgds-color-default)"')
      .replaceAll('fill="black"', 'fill="var(--sgds-color-default)"')
      .replaceAll('fill="#2A2A2A"', 'fill="var(--sgds-neutral-surface-emphasis)"')
      .replaceAll('fill="#525252"', 'fill="var(--sgds-color-subtle)"')
      .replaceAll('fill="#6B4FEB"', 'fill="var(--system-update-token-colour)"')
      .replaceAll('fill="#DFDFDF"', 'fill="var(--sgds-border-color-muted)"')
      .replaceAll('fill="#F3F3F3"', 'fill="var(--sgds-color-fixed-light)"')
      .replaceAll('fill="#F7F7F7"', 'fill="var(--sgds-surface-raised)"')
      .replaceAll('stroke="#DFDFDF"', 'stroke="var(--sgds-border-color-muted)"');
  })
  .join("\n");
</script>

<template>
  <figure
    class="system-update-flow sgds:m-0 sgds:block sgds:w-full sgds:max-w-full sgds:min-w-0"
    aria-label="Raw value updating tokens and components"
  >
    <div class="sgds:block sgds:w-full sgds:max-w-full sgds:min-w-0 sgds:overflow-x-auto">
      <div
        class="sgds:relative sgds:mx-auto sgds:block sgds:w-full sgds:max-w-[642px]"
      >
        <div v-html="tokenizedTokenUpdateDiagram"></div>
      </div>
    </div>
  </figure>
</template>

<style>
/* The SVG is rendered through v-html, and the animated colour demonstrates a
   raw value changing once before the connected token examples update. */
.system-update-flow {
  --system-update-token-colour: var(--sgds-primary-surface-default);
  --system-update-govtech-blue: #0269d0;
  animation: system-update-token-colour-change 5.5s ease-in-out infinite;
}

.system-update-flow__raw-value-start,
.system-update-flow__raw-value-end {
  animation-duration: 5.5s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transform-box: fill-box;
  transform-origin: center;
}

.system-update-flow__raw-value-start {
  animation-name: system-update-raw-value-start;
}

.system-update-flow__raw-value-end {
  animation-name: system-update-raw-value-end;
  opacity: 0;
}

@keyframes system-update-token-colour-change {
  0%,
  34% {
    --system-update-token-colour: var(--sgds-primary-surface-default);
  }
  50%,
  84% {
    --system-update-token-colour: var(--system-update-govtech-blue);
  }
  100% {
    --system-update-token-colour: var(--sgds-primary-surface-default);
  }
}

@keyframes system-update-raw-value-start {
  0%,
  34% {
    opacity: 1;
    transform: translateY(0);
  }
  50%,
  84% {
    opacity: 0;
    transform: translateY(-14px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes system-update-raw-value-end {
  0%,
  34% {
    opacity: 0;
    transform: translateY(14px);
  }
  50%,
  84% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(14px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .system-update-flow,
  .system-update-flow__raw-value-start,
  .system-update-flow__raw-value-end {
    animation: none;
  }

  .system-update-flow {
    --system-update-token-colour: var(--system-update-govtech-blue);
  }

  .system-update-flow__raw-value-start {
    opacity: 0;
  }

  .system-update-flow__raw-value-end {
    opacity: 1;
  }
}
</style>
