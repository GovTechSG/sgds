<script setup lang="ts">
// Raw SVGs imported as strings so the var(--sgds-...) tokens inside them are
// resolved by the page's CSS when rendered via v-html. Loading via <img>
// would isolate the SVG from the document's CSS scope.
import baseGridSvg from "./foundations/assets/icon-base-grid.svg?raw";
import paddingSvg from "./foundations/assets/icon-padding.svg?raw";
import liveAreaSvg from "./foundations/assets/icon-live-area.svg?raw";
import keylineSvg from "./foundations/assets/icon-keyline.svg?raw";
import cornerRadiusSvg from "./foundations/assets/icon-corner-radius.svg?raw";
import strokeAlignmentSvg from "./foundations/assets/icon-strokealignment.svg?raw";
import strokeTerminalSvg from "./foundations/assets/icon-stroketerminal.svg?raw";
import strokeSizeSvg from "./foundations/assets/icon-strokesize.svg?raw";
</script>

<template>
  <div class="typography-page-template__body">

        <!-- 1. Line vs solid vs logo -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Line, solid and logo variants</h5>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">SGDS icons (govicons) are available in line, solid and logo variants.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Occasionally, only one style is available for aesthetic reasons.</p>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-variants">
                <sgds-icon name="star" size="2-xl" />
                <sgds-icon name="star-fill" size="2-xl" />
                <sgds-icon name="sg-crest" size="2-xl" />
              </div>
            </div>
          </div>
        </article>

        <!-- 2. Size -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Size</h5>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Set the size of icons using <code>icon-size</code> tokens. Available sizes on our system:</p>
              <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal icon-char-list">
                <li>16 × 16</li>
                <li>20 × 20</li>
                <li>24 × 24 (base)</li>
                <li>32 × 32</li>
                <li>48 × 48</li>
                <li>64 × 64</li>
              </ul>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-sizes">
                <sgds-icon name="mail" size="sm" />
                <sgds-icon name="mail" size="md" />
                <sgds-icon name="mail" />
                <sgds-icon name="mail" size="xl" />
                <sgds-icon name="mail" size="2-xl" />
                <sgds-icon name="mail" size="3-xl" />
              </div>
            </div>
          </div>
        </article>

        <!-- 3. Base grid -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Base grid</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Icons are drawn on a pixel-based grid of 24 × 24 px and scaled down linearly to different sizes. Use the grid as your basic guideline to snap the artwork in place.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-base-grid-card"
              role="img"
              aria-label="Base grid: 24 × 24 px icon grid at 100% scale alongside a 1000%-scaled version showing the pixel cells."
              v-html="baseGridSvg"
            />
          </div>
        </article>

        <!-- 4. Padding -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Padding</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">The grid contains 2 px padding, which helps icons retain their desired scale.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-padding-card"
              role="img"
              aria-label="Padding: 2 px padding highlighted on the 24 × 24 px icon grid, shown at 100% and 1000% scale."
              v-html="paddingSvg"
            />
          </div>
        </article>

        <!-- 5. Live area -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Live area</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">White space surrounding the 20 × 20 px live area.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-live-card"
              role="img"
              aria-label="Live area diagram: 20 × 20 px live area highlighted on the icon grid, shown alongside a scaled-up grid showing the 2 px padding around the shape."
              v-html="liveAreaSvg"
            />
          </div>
        </article>

        <!-- 6. Keyline shapes -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Keyline shapes</h5>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Keylines give you consistent sizes for basic shapes or proportions across the icon set. These basic shapes help unify system icons and regulate their placement on the icon grid.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Available shapes on our system:</p>
              <ul class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal icon-char-list">
                <li>Square</li>
                <li>Circle</li>
                <li>Horizontal rectangle</li>
                <li>Vertical rectangle</li>
              </ul>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-keyline-card"
              role="img"
              aria-label="Keyline shapes: square, rounded square, horizontal rectangle, vertical rectangle, and circle keylines overlaid on an icon grid, with four small keyline thumbnails highlighted in red."
              v-html="keylineSvg"
            />
          </div>
        </article>

        <!-- 7. Corner radius -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Corner radius</h5>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Corner radius is 2 px by default. Interior corners should be square if the radius is 1 px.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">The 2 px radius can be increased by 2 px when necessary to make the icon's metaphor clear. Use an additional radius to make the metaphor reflect the real form of the object.</p>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-radius-card"
              aria-label="Corner radius examples: envelope icon with 20px corner and five squares showing 1–8px corner radius"
              role="img"
              v-html="cornerRadiusSvg"
            />
          </div>
        </article>

        <!-- 8. Stroke alignment -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Stroke alignment</h5>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Stroke placement affects an icon's overall appearance, depending on whether the stroke is placed on the inside, centre, or outside of a shape. In most cases, the stroke is best aligned with the centre of a shape.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use consistent rounded stroke terminals.</p>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-stroke-alignment-card"
              role="img"
              aria-label="Stroke alignment: envelope icon showing stroke centred on the shape's path."
              v-html="strokeAlignmentSvg"
            />
          </div>
        </article>

        <!-- 9. Stroke terminal -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Stroke terminal</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use consistent rounded stroke terminals.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-stroke-terminal-card"
              role="img"
              aria-label="Stroke terminal: arrow icon with the four stroke terminals highlighted with red dots."
              v-html="strokeTerminalSvg"
            />
          </div>
        </article>

        <!-- 10. Stroke size -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Stroke size</h5>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use a consistent stroke width, including curves, angles, and both interior and exterior strokes.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">One icon should not look heavier or lighter than other icons of the same size. Maintain the same visual weight by using a <strong>1.25 px stroke</strong> when designing all icons.</p>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div
              class="typography-page-template__card icon-char-demo-card icon-char-stroke-size-card"
              role="img"
              aria-label="Stroke size: envelope icon with the 1.25 px stroke width annotated."
              v-html="strokeSizeSvg"
            />
          </div>
        </article>

        <!-- 11. Angles -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Angles</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use 45 degree angles for even anti-aliasing whenever that angle is logical or use increments of 15 degree for all other angles. You can create harmony across the icon set by making angles sit on the same increments.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-grid-10x icon-char-angle-grid">
                <svg
                  class="icon-char-angle-svg"
                  viewBox="0 0 241 241"
                  aria-hidden="true"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <!-- Envelope body: rounded rectangle -->
                  <rect
                    x="26.5"
                    y="46.5"
                    width="188"
                    height="148"
                    rx="20"
                    fill="none"
                    stroke="#222222"
                    stroke-width="12"
                  />
                  <!-- Envelope V-flap (black, 12px) with curved apex -->
                  <path
                    d="M25.5 77.5L110.708 125.934C116.787 129.39 124.229 129.419 130.336 126.013L215.5 78.5"
                    fill="none"
                    stroke="#222222"
                    stroke-width="12"
                  />
                  <!-- Red angle trace line drawn on top of V-flap -->
                  <path
                    d="M214.5 79.0578L130.336 126.013C124.23 129.419 116.787 129.39 110.708 125.934L26.5001 78.0684"
                    fill="none"
                    stroke="#d80b16"
                    stroke-width="1"
                  />
                  <!-- Red 120° semicircle arc above V-flap apex -->
                  <path
                    d="M140.5 120.5C140.5 109.454 131.546 100.5 120.5 100.5C109.454 100.5 100.5 109.454 100.5 120.5"
                    fill="none"
                    stroke="#d80b16"
                    stroke-width="1"
                  />
                  <!-- 120° label above the arc -->
                  <text
                    x="108"
                    y="90"
                    fill="#d80b16"
                    font-size="12"
                    font-family="Inter, sans-serif"
                  >120°</text>
                </svg>
              </div>
            </div>
          </div>
        </article>

        <!-- 12. Complex icon shapes -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Complex icon shapes</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">If an icon requires complex details, subtle adjustments can be made to improve its legibility. These adjustments are referred to as optical corrections.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-complex-demo">
                <div class="icon-char-grid-10x icon-char-complex-grid">
                  <svg
                    class="icon-char-complex-svg"
                    viewBox="0 0 240 240"
                    aria-hidden="true"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <!-- Red outline (12px) — represents the "too thick" 1.2px stroke -->
                    <path
                      d="M149.243 74.992L90.15 132.831C82.853 140.09 82.853 151.859 90.15 159.118C97.447 166.377 109.278 166.377 116.575 159.118L183.076 92.962C197.669 78.445 197.669 54.906 183.076 40.388C168.482 25.8705 144.821 25.8705 130.227 40.388L54.918 115.306C33.027 137.083 33.027 172.39 54.918 194.167C76.809 215.944 112.3 215.944 134.191 194.167L201.5 127.249"
                      fill="none"
                      stroke="#FF0000"
                      stroke-width="12"
                      stroke-linecap="round"
                    />
                    <!-- Black stroke (10px) — the "correct" optically adjusted 1px stroke -->
                    <path
                      d="M149.243 74.992L90.15 132.831C82.853 140.09 82.853 151.859 90.15 159.118C97.447 166.377 109.278 166.377 116.575 159.118L183.076 92.962C197.669 78.445 197.669 54.906 183.076 40.388C168.482 25.8705 144.821 25.8705 130.227 40.388L54.918 115.306C33.027 137.083 33.027 172.39 54.918 194.167C76.809 215.944 112.3 215.944 134.191 194.167L201.5 127.249"
                      fill="none"
                      stroke="#222222"
                      stroke-width="10"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div class="icon-char-complex-compare">
                  <div class="icon-char-complex-item">
                    <svg
                      class="icon-char-complex-thumb"
                      viewBox="477 285 13 14"
                      aria-hidden="true"
                    >
                      <path
                        d="M484.95 288.999L481.01 292.855C480.524 293.339 480.524 294.124 481.01 294.608C481.496 295.092 482.285 295.092 482.772 294.608L487.205 290.198C488.178 289.23 488.178 287.66 487.205 286.693C486.232 285.725 484.655 285.725 483.682 286.693L478.661 291.687C477.202 293.139 477.202 295.493 478.661 296.944C480.121 298.396 482.487 298.396 483.946 296.944L488.433 292.483"
                        fill="none"
                        stroke="#222222"
                        stroke-width="1.2"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span class="icon-char-compare-label">1.2 px</span>
                  </div>
                  <div class="icon-char-complex-item">
                    <svg
                      class="icon-char-complex-thumb"
                      viewBox="516 285 13 14"
                      aria-hidden="true"
                    >
                      <path
                        d="M523.95 288.999L520.01 292.855C519.524 293.339 519.524 294.124 520.01 294.608C520.496 295.092 521.285 295.092 521.772 294.608L526.205 290.198C527.178 289.23 527.178 287.66 526.205 286.693C525.232 285.725 523.655 285.725 522.682 286.693L517.661 291.687C516.202 293.139 516.202 295.493 517.661 296.944C519.121 298.396 521.487 298.396 522.946 296.944L527.433 292.483"
                        fill="none"
                        stroke="#222222"
                        stroke-width="1"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span class="icon-char-compare-label">1 px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 13. Icon size with container -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Icon size with container</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use the right icon size within containers such as icon buttons.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-container-wrapper">
                <div class="icon-char-cd-bg">
                  <div class="icon-char-cd-safe"></div>
                  <div class="icon-char-cd-icon-area"></div>
                  <div class="icon-char-cd-labels">
                    <div class="icon-char-cd-lbl"><div class="icon-char-annotation-h-line"></div><span class="icon-char-anno-label">Icon button background</span></div>
                    <div class="icon-char-cd-lbl"><div class="icon-char-annotation-h-line"></div><span class="icon-char-anno-label">Icon size</span></div>
                    <div class="icon-char-cd-lbl"><div class="icon-char-annotation-h-line"></div><span class="icon-char-anno-label">Safe area</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 14. Pairing with text -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Pairing with text</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Icon sizes are optimised to feel balanced when paired with buttons, text links, body copy or actionable elements.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-pairing-demo">
                <span class="icon-char-pairing-text">Link label</span>
                <sgds-icon name="arrow-right" size="md" />
              </div>
            </div>
          </div>
        </article>

        <!-- 15. Counter space -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h5 class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Counter space</h5>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Keep at least 2 px of counter space between lines or shapes.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-annotated-grid">
                <div class="icon-char-grid-10x icon-char-icon-grid">
                  <sgds-icon name="trash" size="3-xl" />
                </div>
                <div class="icon-char-grid-annotation">
                  <div class="icon-char-annotation-h-line"></div>
                  <span class="icon-char-anno-label">2 px</span>
                </div>
              </div>
            </div>
          </div>
        </article>

  </div>
</template>

<style>
/*
  Icon characteristics page styles — non-SGDS-utility CSS required for:
  - CSS repeating-linear-gradient pixel grid background (no utility equivalent)
  - ::before pseudo-element overlays for padding/live area diagrams
  - Measurement line annotation brackets (border-based)
  - align-items: flex-end on icon size row (variant not available)
*/

.typography-page-template__body {
  --icon-char-danger-line: var(--sgds-danger-color-default);
  --icon-char-danger-border: color-mix(in srgb, var(--sgds-danger-color-default) 40%, transparent);
  --icon-char-danger-fill-soft: color-mix(in srgb, var(--sgds-danger-color-default) 15%, transparent);
  --icon-char-danger-fill-mid: color-mix(in srgb, var(--sgds-danger-color-default) 20%, transparent);
  --icon-char-danger-fill-strong: color-mix(in srgb, var(--sgds-danger-color-default) 50%, transparent);
}

.icon-char-demo-card {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 15rem;
  padding: var(--sgds-component-padding-md);
}

/* Block 1 — variants */
.icon-char-variants {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xl);
  justify-content: center;
}

/* Block 2 — sizes */
.icon-char-sizes {
  align-items: flex-end;
  display: flex;
  gap: var(--sgds-gap-lg);
  justify-content: center;
}

/* Bullet list — descendant selector zeroes VitePress's default li margin-top */
.icon-char-list {
  list-style: disc;
  margin: 0;
  padding-left: 1.25rem;
}

.icon-char-list li {
  margin: 0;
}

/* Copy helpers */
.icon-char-copy-list {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-text-gap-xs);
}

/* Blocks 3–5 — diagram layout */
.icon-char-diagram-layout {
  align-items: flex-start;
  display: flex;
  gap: var(--sgds-gap-3-xl);
  justify-content: center;
}

.icon-char-scale-group {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
}

.icon-char-scale-label {
  color: var(--sgds-body-color-subtle);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-body-sm);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-xs);
  white-space: nowrap;
}

/* Annotation grid: box | vdim-right / hdim-bottom | gap */
.icon-char-annotated {
  display: grid;
  grid-template-areas:
    "box  vdim"
    "hdim gap";
  grid-template-columns: auto 2.5rem;
  grid-template-rows: auto 1.75rem;
}

.icon-char-annotated > :first-child { grid-area: box; }
.icon-char-vdim { grid-area: vdim; padding-left: 6px; }
.icon-char-hdim { grid-area: hdim; padding-top: 6px; }

/* 1× reference box (24 × 24) */
.icon-char-box-1x {
  background: rgba(217, 217, 217, 0.25);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: 1px;
  height: 24px;
  position: relative;
  width: 24px;
}

/* 10× pixel grid (240 × 240) — cells filled with subtle gray to match the 100% box */
.icon-char-grid-10x {
  background-color: rgba(217, 217, 217, 0.25);
  background-image:
    linear-gradient(to right, var(--sgds-border-color-muted) 1px, transparent 1px),
    linear-gradient(to bottom, var(--sgds-border-color-muted) 1px, transparent 1px);
  background-size: 10px 10px;
  border: 1px solid var(--sgds-border-color-muted);
  height: 240px;
  position: relative;
  width: 240px;
}

/* Padding overlay — 2px at 1× / 20px at 10×. Figma uses a subtle 20% red ring */
.icon-char-box-pad {
  box-shadow: inset 0 0 0 2px var(--icon-char-danger-fill-mid);
}

.icon-char-grid-pad::before {
  border: 20px solid var(--icon-char-danger-fill-mid);
  bottom: 0;
  box-sizing: border-box;
  content: '';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}

/* Padding dimension brackets — span only the padding strip (2px at 1× / 20px at 10×),
   anchored to the bottom-right, not the full box. */
.icon-char-box-pad ~ .icon-char-vdim,
.icon-char-grid-pad ~ .icon-char-vdim {
  align-items: flex-end;
  display: flex;
}

.icon-char-box-pad ~ .icon-char-hdim,
.icon-char-grid-pad ~ .icon-char-hdim {
  display: flex;
  justify-content: flex-end;
}

.icon-char-box-pad ~ .icon-char-vdim .icon-char-vdim-line {
  height: 2px;
}

.icon-char-box-pad ~ .icon-char-hdim .icon-char-hdim-line {
  width: 2px;
}

.icon-char-grid-pad ~ .icon-char-vdim .icon-char-vdim-line {
  height: 20px;
}

.icon-char-grid-pad ~ .icon-char-hdim .icon-char-hdim-line {
  width: 20px;
}

/* Live area overlay — 20 × 20 = 200 × 200 at 10× (inside 20px = 2px padding) */
.icon-char-box-live::before {
  background: var(--icon-char-danger-fill-soft);
  bottom: 2px;
  content: '';
  left: 2px;
  pointer-events: none;
  position: absolute;
  right: 2px;
  top: 2px;
}

.icon-char-grid-live::before {
  background: var(--icon-char-danger-fill-soft);
  bottom: 20px;
  content: '';
  left: 20px;
  pointer-events: none;
  position: absolute;
  right: 20px;
  top: 20px;
}

/* Vertical dimension bracket (right side) */
.icon-char-vdim-line {
  border-bottom: 1px solid var(--icon-char-danger-line);
  border-left: 1px solid var(--icon-char-danger-line);
  border-top: 1px solid var(--icon-char-danger-line);
  height: 100%;
  position: relative;
  width: 4px;
}

/* Horizontal dimension bracket (bottom) */
.icon-char-hdim-line {
  border-bottom: 1px solid var(--icon-char-danger-line);
  border-left: 1px solid var(--icon-char-danger-line);
  border-right: 1px solid var(--icon-char-danger-line);
  height: 4px;
  position: relative;
  width: 100%;
}

/* Dimension labels */
.icon-char-dim-label {
  color: var(--icon-char-danger-line);
  font-family: var(--sgds-font-family-brand);
  font-size: 10px;
  font-weight: var(--sgds-font-weight-regular);
  line-height: 1;
  position: absolute;
  white-space: nowrap;
}

.icon-char-vdim-line .icon-char-dim-label {
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.icon-char-hdim-line .icon-char-dim-label {
  left: 50%;
  top: 6px;
  transform: translateX(-50%);
}

/* Blocks 3–10 — base grid, padding, live area, keyline shapes, corner radius,
 * stroke alignment, stroke terminal, stroke size. All eight demos are inlined
 * as raw SVG via v-html so the var(--sgds-...) tokens inside resolve from the
 * page's CSS scope, and their viewBoxes share the 640×420 aspect ratio so the
 * cards render at matching dimensions. */
.icon-char-base-grid-card,
.icon-char-padding-card,
.icon-char-live-card,
.icon-char-keyline-card,
.icon-char-radius-card,
.icon-char-stroke-alignment-card,
.icon-char-stroke-terminal-card,
.icon-char-stroke-size-card {
  display: flex;
  justify-content: center;
  padding: var(--sgds-component-padding-md);
}

.icon-char-base-grid-card > svg,
.icon-char-padding-card > svg,
.icon-char-live-card > svg,
.icon-char-keyline-card > svg,
.icon-char-radius-card > svg,
.icon-char-stroke-alignment-card > svg,
.icon-char-stroke-terminal-card > svg,
.icon-char-stroke-size-card > svg {
  block-size: auto;
  display: block;
  inline-size: 100%;
  max-inline-size: 40rem;
}

/* Blocks 8-12, 15 - icon centred on pixel grid */
.icon-char-icon-grid {
  align-items: center;
  display: flex;
  justify-content: center;
}

/* Block 11 — angles demo: envelope drawn at 10× scale with 120° arc marker */
.icon-char-angle-grid {
  overflow: hidden;
}

.icon-char-angle-svg {
  display: block;
  height: 100%;
  width: 100%;
}

/* Annotated grid (stroke size, angles, counter space) */
.icon-char-annotated-grid {
  position: relative;
}

.icon-char-grid-annotation {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xs);
  position: absolute;
  right: -5.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.icon-char-annotation-h-line {
  background: var(--icon-char-danger-line);
  flex-shrink: 0;
  height: 1px;
  width: 16px;
}

.icon-char-anno-label {
  color: var(--icon-char-danger-line);
  font-family: var(--sgds-font-family-brand);
  font-size: 10px;
  font-weight: var(--sgds-font-weight-regular);
  line-height: 1;
  white-space: nowrap;
}

/* Block 12 — complex icon shapes */
.icon-char-complex-demo {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-lg);
}

.icon-char-complex-compare {
  display: flex;
  gap: var(--sgds-gap-2-xl);
}

.icon-char-complex-item {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xs);
}

.icon-char-compare-label {
  color: var(--sgds-body-color-subtle);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-body-sm);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-xs);
}

/* Block 13 — icon size with container */
.icon-char-container-wrapper {
  display: flex;
  justify-content: center;
}

.icon-char-cd-bg {
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-2-xl);
  flex-shrink: 0;
  height: 200px;
  position: relative;
  width: 200px;
}

.icon-char-cd-safe {
  border: 1.5px dashed var(--icon-char-danger-line);
  border-radius: 50%;
  height: 160px;
  left: 20px;
  position: absolute;
  top: 20px;
  width: 160px;
}

.icon-char-cd-icon-area {
  background: var(--icon-char-danger-fill-soft);
  border: 1px solid var(--icon-char-danger-border);
  height: 120px;
  left: 40px;
  position: absolute;
  top: 40px;
  width: 120px;
}

/* Labels float to the right of the bg box */
.icon-char-cd-labels {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  justify-content: center;
  left: calc(100% + var(--sgds-gap-xl));
  position: absolute;
  top: 0;
  bottom: 0;
}

.icon-char-cd-lbl {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xs);
}

/* Block 14 — pairing with text */
.icon-char-pairing-demo {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-2-xs);
}

.icon-char-pairing-text {
  background: var(--icon-char-danger-fill-soft);
  color: var(--sgds-body-color-default);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-xs);
  padding: 2px 4px;
}

@media (max-width: 1023px) {
  .icon-char-demo-card {
    min-height: auto;
    padding: var(--sgds-component-padding-sm);
  }

  .icon-char-diagram-layout {
    flex-wrap: wrap;
    gap: var(--sgds-gap-2-xl);
    justify-content: flex-start;
  }

  .icon-char-diagram-layout--focused {
    display: flex;
  }

  .icon-char-grid-10x {
    height: 160px;
    width: 160px;
  }

  .icon-char-grid-pad::before {
    border-width: 13px;
  }

  .icon-char-grid-pad ~ .icon-char-vdim .icon-char-vdim-line {
    height: 13px;
  }

  .icon-char-grid-pad ~ .icon-char-hdim .icon-char-hdim-line {
    width: 13px;
  }

  .icon-char-grid-live::before {
    bottom: 13px;
    left: 13px;
    right: 13px;
    top: 13px;
  }
}

@media (max-width: 767px) {
  .icon-char-sizes {
    flex-wrap: wrap;
    justify-content: center;
  }

  .icon-char-keyline-thumbs {
    flex-wrap: wrap;
    justify-content: center;
  }

  .icon-char-radius-row {
    flex-wrap: wrap;
    justify-content: center;
  }

  .icon-char-annotated-grid {
    margin-right: 4rem;
  }

  .icon-char-container-wrapper {
    flex-wrap: wrap;
  }
}
</style>
