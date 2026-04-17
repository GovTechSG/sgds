<script setup lang="ts">
import gsap from "gsap";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const svgRef = ref<SVGSVGElement | null>(null);
let gsapCtx: gsap.Context | undefined;

const W = 536;
const H = 576;
const GRID_STEP = 40;
const gridH = Array.from({ length: Math.ceil(H / GRID_STEP) + 2 }, (_, i) => i * GRID_STEP);
const gridV = Array.from({ length: Math.ceil(W / GRID_STEP) + 2 }, (_, i) => i * GRID_STEP);

// ── Data model ─────────────────────────────────────────────────────────────

type Pt = { x: number; y: number };

type Node = {
  id: string;
  x: number;
  y: number;
  cpIn: Pt | null;   // incoming bezier handle (CP2 of prev→this segment)
  cpOut: Pt | null;  // outgoing bezier handle (CP1 of this→next segment)
};

// Subpath 0 — outer "A" construction shape (the V outline + crossbar)
// Bezier curves at the apex for authentic Inter-style rounded tip
const nodes0 = ref<Node[]>([
  { id: "a0", x: 130, y: 432, cpIn: null,           cpOut: null },
  { id: "a1", x: 246, y: 121, cpIn: null,           cpOut: { x: 253, y: 112 } },
  { id: "a2", x: 268, y:  99, cpIn: { x: 261, y: 103 }, cpOut: { x: 275, y: 103 } },
  { id: "a3", x: 290, y: 121, cpIn: { x: 283, y: 112 }, cpOut: null },
  { id: "a4", x: 406, y: 432, cpIn: null,           cpOut: null },
]);

// Subpath 1 — inner counter V (the counter triangle)
const nodes1 = ref<Node[]>([
  { id: "b0", x: 171, y: 432, cpIn: null, cpOut: null },
  { id: "b1", x: 268, y: 184, cpIn: null, cpOut: null },
  { id: "b2", x: 364, y: 432, cpIn: null, cpOut: null },
]);

// Subpath 2 — crossbar rectangle
const nodes2 = ref<Node[]>([
  { id: "c0", x: 190, y: 310, cpIn: null, cpOut: null },
  { id: "c1", x: 344, y: 310, cpIn: null, cpOut: null },
  { id: "c2", x: 344, y: 344, cpIn: null, cpOut: null },
  { id: "c3", x: 190, y: 344, cpIn: null, cpOut: null },
]);

// ── Path builder ───────────────────────────────────────────────────────────

function buildD(nodes: Node[], closed = false): string {
  if (nodes.length === 0) return "";
  const cmds: string[] = [`M ${nodes[0].x} ${nodes[0].y}`];
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    if (prev.cpOut || curr.cpIn) {
      const c1 = prev.cpOut ?? prev;
      const c2 = curr.cpIn  ?? curr;
      cmds.push(`C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${curr.x} ${curr.y}`);
    } else {
      cmds.push(`L ${curr.x} ${curr.y}`);
    }
  }
  if (closed) cmds.push("Z");
  return cmds.join(" ");
}

const d0 = computed(() => buildD(nodes0.value));
const d1 = computed(() => buildD(nodes1.value));
const d2 = computed(() => buildD(nodes2.value, true));

// ── Drag ───────────────────────────────────────────────────────────────────

type DragPart = "anchor" | "cpIn" | "cpOut";
type DragState = {
  pathIdx: 0 | 1 | 2;
  nodeIdx: number;
  part: DragPart;
  startMx: number;
  startMy: number;
  origX: number;
  origY: number;
};

const drag = ref<DragState | null>(null);

function toSvgPt(e: PointerEvent): Pt {
  const rect = svgRef.value!.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width)  * W,
    y: ((e.clientY - rect.top)  / rect.height) * H,
  };
}

function nodesList(pathIdx: 0 | 1 | 2) {
  return pathIdx === 0 ? nodes0 : pathIdx === 1 ? nodes1 : nodes2;
}

function onPointerDown(pathIdx: 0 | 1 | 2, nodeIdx: number, part: DragPart, e: PointerEvent) {
  e.preventDefault();
  e.stopPropagation();
  svgRef.value?.setPointerCapture(e.pointerId);
  const { x: mx, y: my } = toSvgPt(e);
  const node = nodesList(pathIdx).value[nodeIdx];
  let ox = node.x, oy = node.y;
  if (part === "cpIn"  && node.cpIn)  { ox = node.cpIn.x;  oy = node.cpIn.y; }
  if (part === "cpOut" && node.cpOut) { ox = node.cpOut.x; oy = node.cpOut.y; }
  drag.value = { pathIdx, nodeIdx, part, startMx: mx, startMy: my, origX: ox, origY: oy };
}

function onPointerMove(e: PointerEvent) {
  if (!drag.value) return;
  e.preventDefault();
  const { pathIdx, nodeIdx, part, startMx, startMy, origX, origY } = drag.value;
  const { x: mx, y: my } = toSvgPt(e);
  const nx = origX + (mx - startMx);
  const ny = origY + (my - startMy);
  const ref = nodesList(pathIdx);
  ref.value = ref.value.map((n, i) => {
    if (i !== nodeIdx) return n;
    const updated: Node = { ...n };
    if (part === "anchor") {
      const dx = nx - n.x, dy = ny - n.y;
      updated.x = nx; updated.y = ny;
      if (n.cpIn)  updated.cpIn  = { x: n.cpIn.x  + dx, y: n.cpIn.y  + dy };
      if (n.cpOut) updated.cpOut = { x: n.cpOut.x + dx, y: n.cpOut.y + dy };
    } else if (part === "cpIn"  && n.cpIn)  { updated.cpIn  = { x: nx, y: ny }; }
    else if (part === "cpOut" && n.cpOut) { updated.cpOut = { x: nx, y: ny }; }
    return updated;
  });
}

function onPointerUp() { drag.value = null; }

// ── Intro animation ────────────────────────────────────────────────────────

onMounted(() => {
  if (!svgRef.value) return;
  gsapCtx = gsap.context(() => {
    gsap.set([".tca-grid", ".tca-hatch", ".tca-path", ".tca-handles", ".tca-points", ".tca-measure"], { opacity: 0 });
    gsap
      .timeline({ delay: 0.1 })
      .to(".tca-grid",    { opacity: 1,    duration: 0.35, ease: "power1.out" })
      .to(".tca-hatch",   { opacity: 0.58, duration: 0.35, ease: "power1.out" }, "<")
      .to(".tca-path",    { opacity: 1,    duration: 0.5,  ease: "power2.inOut" }, "-=0.1")
      .to(".tca-handles", { opacity: 1,    duration: 0.3,  ease: "power1.out" }, "-=0.1")
      .to(".tca-points",  { opacity: 1,    duration: 0.3,  ease: "power1.out" }, "-=0.15")
      .to(".tca-measure", { opacity: 1,    duration: 0.25, ease: "power1.out" }, "-=0.1");
  }, svgRef.value);
});

onBeforeUnmount(() => gsapCtx?.revert());
</script>

<template>
  <svg
    ref="svgRef"
    viewBox="0 0 536 576"
    xmlns="http://www.w3.org/2000/svg"
    class="tca-root sgds:block sgds:h-full sgds:w-full"
    aria-label="Interactive typography path editor showing Inter letter A"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
  >
    <defs>
      <pattern id="tca-hatch-pat" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#2f9e44" stroke-width="2" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="536" height="576" fill="#81dd88" />

    <!-- Grid -->
    <g class="tca-grid">
      <line v-for="y in gridH" :key="`h${y}`" :y1="y" :y2="y" x1="0" :x2="W" stroke="#42b35d" stroke-width="1" />
      <line v-for="x in gridV" :key="`v${x}`" :x1="x" :x2="x" y1="0" :y2="H" stroke="#42b35d" stroke-width="1" />
    </g>

    <!-- Side-margin hatches -->
    <rect class="tca-hatch" x="0"   y="0" width="128" height="576" fill="url(#tca-hatch-pat)" />
    <rect class="tca-hatch" x="408" y="0" width="128" height="576" fill="url(#tca-hatch-pat)" />

    <!-- Construction paths -->
    <g class="tca-path" fill="none" stroke="#092414" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
      <path :d="d0" />
      <path :d="d1" />
      <path :d="d2" />
    </g>

    <!-- Bezier handle lines -->
    <g class="tca-handles" fill="none">
      <template v-for="node in nodes0" :key="`hl-${node.id}`">
        <line v-if="node.cpOut"
          :x1="node.x" :y1="node.y" :x2="node.cpOut.x" :y2="node.cpOut.y"
          stroke="#092414" stroke-width="1.2" stroke-dasharray="4,3" />
        <line v-if="node.cpIn"
          :x1="node.cpIn.x" :y1="node.cpIn.y" :x2="node.x" :y2="node.y"
          stroke="#092414" stroke-width="1.2" stroke-dasharray="4,3" />
      </template>
    </g>

    <!-- All interactive points -->
    <g class="tca-points">

      <!-- Handle circles for nodes0 (open, draggable) -->
      <template v-for="(node, ni) in nodes0" :key="`hc-${node.id}`">
        <circle v-if="node.cpOut"
          class="tca-handle-circle"
          :cx="node.cpOut.x" :cy="node.cpOut.y" r="4"
          fill="white" stroke="#092414" stroke-width="1.5"
          @pointerdown="onPointerDown(0, ni, 'cpOut', $event)" />
        <circle v-if="node.cpIn"
          class="tca-handle-circle"
          :cx="node.cpIn.x" :cy="node.cpIn.y" r="4"
          fill="white" stroke="#092414" stroke-width="1.5"
          @pointerdown="onPointerDown(0, ni, 'cpIn', $event)" />
      </template>

      <!-- Anchor circles for nodes0 (outer shape) -->
      <circle
        v-for="(node, ni) in nodes0"
        :key="`a0-${node.id}`"
        class="tca-anchor-circle"
        :cx="node.x" :cy="node.y" r="5.5"
        fill="white" stroke="#092414" stroke-width="1.5"
        @pointerdown="onPointerDown(0, ni, 'anchor', $event)" />

      <!-- Anchor circles for nodes1 (counter, filled) -->
      <circle
        v-for="(node, ni) in nodes1"
        :key="`a1-${node.id}`"
        class="tca-anchor-circle"
        :cx="node.x" :cy="node.y" r="4"
        fill="#092414" stroke="#092414" stroke-width="1.5"
        @pointerdown="onPointerDown(1, ni, 'anchor', $event)" />

      <!-- Anchor circles for nodes2 (crossbar, filled) -->
      <circle
        v-for="(node, ni) in nodes2"
        :key="`a2-${node.id}`"
        class="tca-anchor-circle"
        :cx="node.x" :cy="node.y" r="4"
        fill="#092414" stroke="#092414" stroke-width="1.5"
        @pointerdown="onPointerDown(2, ni, 'anchor', $event)" />
    </g>

    <!-- Measurement markers -->
    <g class="tca-measure" font-family="monospace" font-size="14" fill="#092414">
      <line x1="128" y1="538" x2="128" y2="552" stroke="#092414" stroke-width="1.4" />
      <line x1="135" y1="538" x2="135" y2="552" stroke="#092414" stroke-width="1.4" />
      <line x1="401" y1="538" x2="401" y2="552" stroke="#092414" stroke-width="1.4" />
      <line x1="408" y1="538" x2="408" y2="552" stroke="#092414" stroke-width="1.4" />
      <text x="120" y="570">20</text>
      <text x="252" y="570">1338</text>
      <text x="400" y="570">20</text>
    </g>
  </svg>
</template>

<style>
/* Prevent scroll-jank during drag and set pointer cursor */
.tca-root {
  touch-action: none;
  user-select: none;
}

.tca-anchor-circle,
.tca-handle-circle {
  cursor: grab;
}

.tca-anchor-circle:active,
.tca-handle-circle:active {
  cursor: grabbing;
}
</style>
