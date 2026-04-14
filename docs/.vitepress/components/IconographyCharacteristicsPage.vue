<script setup lang="ts">
import TypographyPageTemplate from "./TypographyPageTemplate.vue";
</script>

<template>
  <TypographyPageTemplate>
    <section class="typography-page-template__section">
      <div class="typography-page-template__body">

        <!-- 1. Line vs solid vs logo -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Line vs solid vs logo</h4>
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
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Size</h4>
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
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Base grid</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Icons are drawn on a pixel based grid of 24 × 24px and scaled down linearly to different sizes. Use the grid as your basic guideline to snap the artwork in place.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-diagram-layout">
                <div class="icon-char-scale-group">
                  <span class="icon-char-scale-label">100% scale</span>
                  <div class="icon-char-annotated">
                    <div class="icon-char-box-1x"></div>
                    <div class="icon-char-vdim"><div class="icon-char-vdim-line"><span class="icon-char-dim-label">24px</span></div></div>
                    <div class="icon-char-hdim"><div class="icon-char-hdim-line"><span class="icon-char-dim-label">24px</span></div></div>
                  </div>
                </div>
                <div class="icon-char-scale-group">
                  <span class="icon-char-scale-label">1000% scale</span>
                  <div class="icon-char-annotated">
                    <div class="icon-char-grid-10x"></div>
                    <div class="icon-char-vdim"><div class="icon-char-vdim-line"><span class="icon-char-dim-label">24px</span></div></div>
                    <div class="icon-char-hdim"><div class="icon-char-hdim-line"><span class="icon-char-dim-label">24px</span></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 4. Padding -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Padding</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">The grid contains 2px padding and this ensures icons will retain their desired scale.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-diagram-layout">
                <div class="icon-char-scale-group">
                  <div class="icon-char-annotated">
                    <div class="icon-char-box-1x icon-char-box-pad"></div>
                    <div class="icon-char-vdim"><div class="icon-char-vdim-line"><span class="icon-char-dim-label">2px</span></div></div>
                    <div class="icon-char-hdim"><div class="icon-char-hdim-line"><span class="icon-char-dim-label">2px</span></div></div>
                  </div>
                </div>
                <div class="icon-char-scale-group">
                  <div class="icon-char-annotated">
                    <div class="icon-char-grid-10x icon-char-grid-pad"></div>
                    <div class="icon-char-vdim"><div class="icon-char-vdim-line"><span class="icon-char-dim-label">2px</span></div></div>
                    <div class="icon-char-hdim"><div class="icon-char-hdim-line"><span class="icon-char-dim-label">2px</span></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 5. Live area -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Live area</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">White space surrounding the 20 × 20px live area.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-diagram-layout">
                <div class="icon-char-scale-group">
                  <div class="icon-char-annotated">
                    <div class="icon-char-box-1x icon-char-box-live"></div>
                    <div class="icon-char-vdim"><div class="icon-char-vdim-line"><span class="icon-char-dim-label">20px</span></div></div>
                    <div class="icon-char-hdim"><div class="icon-char-hdim-line"><span class="icon-char-dim-label">20px</span></div></div>
                  </div>
                </div>
                <div class="icon-char-scale-group">
                  <div class="icon-char-annotated">
                    <div class="icon-char-grid-10x icon-char-grid-live"></div>
                    <div class="icon-char-vdim"><div class="icon-char-vdim-line"><span class="icon-char-dim-label">20px</span></div></div>
                    <div class="icon-char-hdim"><div class="icon-char-hdim-line"><span class="icon-char-dim-label">2px</span></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 6. Keyline shapes -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Keyline shapes</h4>
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
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-keyline-demo">
                <div class="icon-char-keyline-large">
                  <div class="icon-char-kl icon-char-kl-sq"></div>
                  <div class="icon-char-kl icon-char-kl-rsq"></div>
                  <div class="icon-char-kl icon-char-kl-hr"></div>
                  <div class="icon-char-kl icon-char-kl-vr"></div>
                  <div class="icon-char-kl icon-char-kl-ci"></div>
                </div>
                <div class="icon-char-keyline-thumbs">
                  <div class="icon-char-kl-thumb"><div class="icon-char-kl icon-char-kl-sq icon-char-kl-active"></div></div>
                  <div class="icon-char-kl-thumb"><div class="icon-char-kl icon-char-kl-hr icon-char-kl-active"></div></div>
                  <div class="icon-char-kl-thumb"><div class="icon-char-kl icon-char-kl-vr icon-char-kl-active"></div></div>
                  <div class="icon-char-kl-thumb"><div class="icon-char-kl icon-char-kl-ci icon-char-kl-active"></div></div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 7. Corners radius -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Corners radius</h4>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Corner radius are 2px by default. Interior corners should be square if the radius are 1px.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">The 2px radius can be increased by 2px when necessary to make the icon's metaphor clear. Use an additional radius to make the metaphor reflect the real form of the object.</p>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-radius-row">
                <div class="icon-char-radius-item">
                  <span class="icon-char-radius-label">1px</span>
                  <div class="icon-char-radius-box icon-char-radius-1"></div>
                </div>
                <div class="icon-char-radius-item">
                  <span class="icon-char-radius-label">2px</span>
                  <div class="icon-char-radius-box icon-char-radius-2"></div>
                </div>
                <div class="icon-char-radius-item">
                  <span class="icon-char-radius-label">4px</span>
                  <div class="icon-char-radius-box icon-char-radius-4"></div>
                </div>
                <div class="icon-char-radius-item">
                  <span class="icon-char-radius-label">6px</span>
                  <div class="icon-char-radius-box icon-char-radius-6"></div>
                </div>
                <div class="icon-char-radius-item">
                  <span class="icon-char-radius-label">8px</span>
                  <div class="icon-char-radius-box icon-char-radius-8"></div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 8. Stroke alignment -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Stroke alignment</h4>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Stroke placement affects an icon's overall appearance, depending on whether the stroke is placed on the inside, center, or outside of a shape. In most cases, the stroke is best aligned with the center of a shape.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use a consistent rounded stroke terminals.</p>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-grid-10x icon-char-icon-grid">
                <sgds-icon name="mail" size="3-xl" />
              </div>
            </div>
          </div>
        </article>

        <!-- 9. Stroke terminal -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Stroke terminal</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use a consistent rounded stroke terminals.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-grid-10x icon-char-icon-grid">
                <sgds-icon name="arrow-right" size="3-xl" />
              </div>
            </div>
          </div>
        </article>

        <!-- 10. Stroke size -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Stroke size</h4>
            <div class="icon-char-copy-list">
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use a consistent stroke width, including curves, angles, and both interior and exterior strokes.</p>
              <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">One icon should not look heavier or lighter than other icons of the same size. Maintain the same visual weight by using a <strong>1.25px stroke</strong> when designing all icons.</p>
            </div>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-annotated-grid">
                <div class="icon-char-grid-10x icon-char-icon-grid">
                  <sgds-icon name="mail" size="3-xl" />
                </div>
                <div class="icon-char-grid-annotation">
                  <div class="icon-char-annotation-h-line"></div>
                  <span class="icon-char-anno-label">1.25px</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 11. Angles -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Angles</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use 45 degree angles for even anti-aliasing whenever that angle is logical or use increments of 15 degree for all other angles. You can create harmony across the icon set by making angles sit on the same increments.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-annotated-grid">
                <div class="icon-char-grid-10x icon-char-icon-grid">
                  <sgds-icon name="mail" size="3-xl" />
                </div>
                <div class="icon-char-grid-annotation">
                  <div class="icon-char-annotation-h-line"></div>
                  <span class="icon-char-anno-label">120°</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 12. Complex icon shapes -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Complex icon shapes</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">If an icon requires complex details, subtle adjustments can be made to improve its legibility. These adjustments are referred to as optical corrections.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-complex-demo">
                <div class="icon-char-grid-10x icon-char-icon-grid">
                  <sgds-icon name="paperclip" size="3-xl" />
                </div>
                <div class="icon-char-complex-compare">
                  <div class="icon-char-complex-item">
                    <sgds-icon name="paperclip" size="md" />
                    <span class="icon-char-compare-label">1.2px</span>
                  </div>
                  <div class="icon-char-complex-item">
                    <sgds-icon name="paperclip" size="md" />
                    <span class="icon-char-compare-label">1px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 13. Icon size with container -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Icon size with container</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Use the specific icon size within a container like Icon Button.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-container-wrapper">
                <div class="icon-char-cd-bg">
                  <div class="icon-char-cd-safe"></div>
                  <div class="icon-char-cd-icon-area"></div>
                </div>
                <div class="icon-char-cd-labels">
                  <div class="icon-char-cd-lbl"><div class="icon-char-annotation-h-line"></div><span class="icon-char-anno-label">Icon button background</span></div>
                  <div class="icon-char-cd-lbl"><div class="icon-char-annotation-h-line"></div><span class="icon-char-anno-label">Icon size</span></div>
                  <div class="icon-char-cd-lbl"><div class="icon-char-annotation-h-line"></div><span class="icon-char-anno-label">Safe area</span></div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- 14. Pairing with text -->
        <article class="typography-page-template__split-row">
          <div class="typography-page-template__copy-pane">
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Pairing with text</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">Icons size are optimized to feel balanced when paired with Button, Text link, Body or actionable elements.</p>
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
            <h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">Counter space</h4>
            <p class="sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal">A minimum 2px counter space for each lines or shapes.</p>
          </div>
          <div class="typography-page-template__demo-pane">
            <div class="typography-page-template__card icon-char-demo-card">
              <div class="icon-char-annotated-grid">
                <div class="icon-char-grid-10x icon-char-icon-grid">
                  <sgds-icon name="trash" size="3-xl" />
                </div>
                <div class="icon-char-grid-annotation">
                  <div class="icon-char-annotation-h-line"></div>
                  <span class="icon-char-anno-label">2px</span>
                </div>
              </div>
            </div>
          </div>
        </article>

      </div>
    </section>
  </TypographyPageTemplate>
</template>

<style>
/*
  Icon characteristics page styles — non-SGDS-utility CSS required for:
  - CSS repeating-linear-gradient pixel grid background (no utility equivalent)
  - ::before pseudo-element overlays for padding/live area diagrams
  - Measurement line annotation brackets (border-based)
  - align-items: flex-end on icon size row (variant not available)
*/

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

/* Bullet list */
.icon-char-list {
  list-style: disc;
  margin: 0;
  padding-left: 1.25rem;
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
  border: 1px solid var(--sgds-border-color-emphasis);
  border-radius: 1px;
  height: 24px;
  position: relative;
  width: 24px;
}

/* 10× pixel grid (240 × 240) */
.icon-char-grid-10x {
  background-color: var(--sgds-surface-default);
  background-image:
    linear-gradient(to right, var(--sgds-border-color-muted) 1px, transparent 1px),
    linear-gradient(to bottom, var(--sgds-border-color-muted) 1px, transparent 1px);
  background-size: 10px 10px;
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  height: 240px;
  position: relative;
  width: 240px;
}

/* Padding overlay — 2px = 20px at 10× */
.icon-char-box-pad {
  box-shadow: inset 0 0 0 2px rgba(194, 47, 47, 0.5);
}

.icon-char-grid-pad::before {
  border: 20px solid rgba(194, 47, 47, 0.2);
  bottom: 0;
  content: '';
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}

/* Live area overlay — 20 × 20 = 200 × 200 at 10× (inside 20px = 2px padding) */
.icon-char-box-live::before {
  background: rgba(194, 47, 47, 0.15);
  bottom: 2px;
  content: '';
  left: 2px;
  pointer-events: none;
  position: absolute;
  right: 2px;
  top: 2px;
}

.icon-char-grid-live::before {
  background: rgba(194, 47, 47, 0.15);
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
  border-bottom: 1px solid #c22f2f;
  border-left: 1px solid #c22f2f;
  border-top: 1px solid #c22f2f;
  height: 100%;
  position: relative;
  width: 4px;
}

/* Horizontal dimension bracket (bottom) */
.icon-char-hdim-line {
  border-bottom: 1px solid #c22f2f;
  border-left: 1px solid #c22f2f;
  border-right: 1px solid #c22f2f;
  height: 4px;
  position: relative;
  width: 100%;
}

/* Dimension labels */
.icon-char-dim-label {
  color: #c22f2f;
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

/* Block 6 — keyline shapes */
.icon-char-keyline-demo {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xl);
}

.icon-char-keyline-large {
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  height: 160px;
  position: relative;
  width: 160px;
}

.icon-char-kl {
  border: 1px solid var(--sgds-border-color-emphasis);
  display: block;
}

.icon-char-keyline-large > .icon-char-kl {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.icon-char-kl-sq { height: 100px; width: 100px; }
.icon-char-kl-rsq { border-radius: 10px; height: 96px; width: 96px; }
.icon-char-kl-hr { border-radius: 4px; height: 68px; width: 100px; }
.icon-char-kl-vr { border-radius: 4px; height: 100px; width: 68px; }
.icon-char-kl-ci { border-radius: 50%; height: 88px; width: 88px; }

.icon-char-kl-active {
  background: rgba(194, 47, 47, 0.15);
  border-color: #c22f2f;
}

.icon-char-keyline-thumbs {
  display: flex;
  gap: var(--sgds-gap-sm);
}

.icon-char-kl-thumb {
  align-items: center;
  background: var(--sgds-surface-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-sm);
  display: flex;
  height: 64px;
  justify-content: center;
  width: 64px;
}

.icon-char-kl-thumb .icon-char-kl-sq { height: 36px; width: 36px; }
.icon-char-kl-thumb .icon-char-kl-hr { height: 24px; width: 36px; }
.icon-char-kl-thumb .icon-char-kl-vr { height: 36px; width: 24px; }
.icon-char-kl-thumb .icon-char-kl-ci { height: 32px; width: 32px; }

/* Block 7 — corners radius */
.icon-char-radius-row {
  align-items: flex-end;
  display: flex;
  gap: var(--sgds-gap-lg);
  justify-content: center;
}

.icon-char-radius-item {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
}

.icon-char-radius-label {
  color: var(--sgds-body-color-subtle);
  font-family: var(--sgds-font-family-brand);
  font-size: var(--sgds-font-size-body-sm);
  font-weight: var(--sgds-font-weight-regular);
  line-height: var(--sgds-line-height-xs);
  white-space: nowrap;
}

.icon-char-radius-box {
  background: var(--sgds-surface-default);
  border: 1.5px solid var(--sgds-border-color-emphasis);
  height: 64px;
  width: 64px;
}

.icon-char-radius-1 { border-radius: 1px; }
.icon-char-radius-2 { border-radius: 2px; }
.icon-char-radius-4 { border-radius: 4px; }
.icon-char-radius-6 { border-radius: 6px; }
.icon-char-radius-8 { border-radius: 8px; }

/* Blocks 8–12, 15 — icon centered on pixel grid */
.icon-char-icon-grid {
  align-items: center;
  display: flex;
  justify-content: center;
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
  background: #c22f2f;
  flex-shrink: 0;
  height: 1px;
  width: 16px;
}

.icon-char-anno-label {
  color: #c22f2f;
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
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-xl);
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
  border: 1.5px dashed #c22f2f;
  border-radius: 50%;
  height: 160px;
  left: 20px;
  position: absolute;
  top: 20px;
  width: 160px;
}

.icon-char-cd-icon-area {
  background: rgba(194, 47, 47, 0.15);
  border: 1px solid rgba(194, 47, 47, 0.4);
  height: 120px;
  left: 40px;
  position: absolute;
  top: 40px;
  width: 120px;
}

.icon-char-cd-labels {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
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
  background: rgba(194, 47, 47, 0.15);
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

  .icon-char-grid-10x {
    height: 160px;
    width: 160px;
  }

  .icon-char-grid-pad::before {
    border-width: 13px;
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
