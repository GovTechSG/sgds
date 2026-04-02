<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CodeToken from "./CodeToken.vue";
import Section from "./Section.vue";
import PortalNumberedItem from "./PortalNumberedItem.vue";
import { getComponentDoc } from "../data/component-docs";

const props = defineProps<{
  componentKey: string;
  docOverride?: ReturnType<typeof getComponentDoc>;
}>();

const doc = computed(() => props.docOverride ?? getComponentDoc(props.componentKey));
const currentPageKey = computed(() => doc.value?.key ?? props.componentKey);
const anatomyCanvasRef = ref<HTMLElement | null>(null);
const accessibilityCanvasRefs = ref<Record<string, HTMLElement | null>>({});
const anatomyCalloutPositions = ref<
  Array<{ number: number; direction: "left" | "right" | "top" | "bottom"; badgeLeft: number; badgeTop: number; strokeLeft: number; strokeTop: number; strokeWidth: number; strokeHeight: number; }>
>([]);
const accessibilityHighlightPositions = ref<Record<string, Array<{ key: string; left: number; top: number; width: number; height: number }>>>({});
let anatomyResizeObserver: ResizeObserver | null = null;
let accessibilityMutationObservers: MutationObserver[] = [];

const measurementExamples = computed(() => {
  if (!doc.value) return [];
  if (doc.value.measurements) return doc.value.measurements;
  return doc.value.demos.slice(0, 2);
});

const codePreviewMarkup = computed(() => {
  if (!doc.value) return "";
  return doc.value.anatomyMarkup || doc.value.demos[0]?.markup || `<${doc.value.tag}></${doc.value.tag}>`;
});

const anatomyPreviewMarkup = computed(() => {
  if (!doc.value) return "";
  if (doc.value.anatomyMarkup) return doc.value.anatomyMarkup;
  if (doc.value.demos.length <= 1) {
    return doc.value.demos[0]?.markup || `<${doc.value.tag}></${doc.value.tag}>`;
  }

  return `<div class="portal-demo-stack">${doc.value.demos
    .map((example) => `<div class="portal-anatomy-demo-block">${example.markup}</div>`)
    .join("")}</div>`;
});

const bestPracticeRows = computed(() => {
  const practices = doc.value?.usage?.bestPractices ?? [];
  const dos = practices.filter((item) => item.tone === "do");
  const donts = practices.filter((item) => item.tone === "dont");
  const rowCount = Math.max(dos.length, donts.length);

  return Array.from({ length: rowCount }, (_, index) => ({
    do: dos[index] ?? null,
    dont: donts[index] ?? null,
  }));
});

const initSteppers = async () => {
  await nextTick();
  const root = document.querySelector(`[data-component-page="${currentPageKey.value}"]`);
  if (!root) return;

  root.querySelectorAll<HTMLElement>('sgds-stepper[data-portal-stepper="default"]').forEach((el) => {
    (el as HTMLElement & { steps?: unknown[] }).steps = [
      { stepHeader: "Start", component: "Step one" },
      { stepHeader: "Review", component: "Step two" },
      { stepHeader: "Confirm", component: "Step three" },
    ];
  });
};

const getPointOnRect = (
  rect: DOMRect,
  x: "left" | "center" | "right" = "center",
  y: "top" | "center" | "bottom" = "center",
) => {
  const pointX = x === "left" ? rect.left : x === "right" ? rect.right : rect.left + rect.width / 2;
  const pointY = y === "top" ? rect.top : y === "bottom" ? rect.bottom : rect.top + rect.height / 2;

  return { x: pointX, y: pointY };
};

const updateAnatomyCallouts = async () => {
  await nextTick();

  const canvas = anatomyCanvasRef.value;
  const callouts = doc.value?.anatomyCallouts;
  if (!canvas || !callouts?.length) {
    anatomyCalloutPositions.value = [];
    return;
  }

  const styles = getComputedStyle(canvas);
  const badgeSize = parseFloat(styles.getPropertyValue("--sgds-dimension-24")) || 24;
  const badgeRadius = badgeSize / 2;
  const canvasRect = canvas.getBoundingClientRect();

  anatomyCalloutPositions.value = callouts
    .map((callout) => {
      const baseTarget = canvas.querySelector(callout.targetSelector) as HTMLElement | null;
      const target = callout.targetShadowSelector
        ? ((baseTarget as HTMLElement | null)?.shadowRoot?.querySelector(callout.targetShadowSelector) as HTMLElement | null)
        : baseTarget;

      if (!target) return null;

      const targetRect = target.getBoundingClientRect();
      const point = getPointOnRect(
        targetRect,
        callout.targetX || "center",
        callout.targetY || "center",
      );

      const stemLength =
        parseFloat(
          styles.getPropertyValue(callout.stemLengthToken || "--sgds-dimension-48"),
        ) || 48;

      const localX = point.x - canvasRect.left;
      const localY = point.y - canvasRect.top;

      if (callout.direction === "right") {
        return {
          number: callout.number,
          direction: callout.direction,
          badgeLeft: localX + stemLength + badgeRadius,
          badgeTop: localY,
          strokeLeft: localX,
          strokeTop: localY,
          strokeWidth: stemLength,
          strokeHeight: 0,
        };
      }

      if (callout.direction === "left") {
        return {
          number: callout.number,
          direction: callout.direction,
          badgeLeft: localX - stemLength - badgeRadius,
          badgeTop: localY,
          strokeLeft: localX - stemLength,
          strokeTop: localY,
          strokeWidth: stemLength,
          strokeHeight: 0,
        };
      }

      if (callout.direction === "top") {
        return {
          number: callout.number,
          direction: callout.direction,
          badgeLeft: localX,
          badgeTop: localY - stemLength - badgeRadius,
          strokeLeft: localX,
          strokeTop: localY - stemLength,
          strokeWidth: 0,
          strokeHeight: stemLength,
        };
      }

      return {
        number: callout.number,
        direction: callout.direction,
        badgeLeft: localX,
        badgeTop: localY + stemLength + badgeRadius,
        strokeLeft: localX,
        strokeTop: localY,
        strokeWidth: 0,
        strokeHeight: stemLength,
      };
    })
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
};

const setAccessibilityCanvasRef = (title: string) => (el: Element | null) => {
  accessibilityCanvasRefs.value[title] = el as HTMLElement | null;
  if (el && anatomyResizeObserver) {
    anatomyResizeObserver.observe(el as HTMLElement);
  }
};

const updateAccessibilityHighlights = async () => {
  await nextTick();

  const sections = doc.value?.accessibility?.sections ?? [];
  const positions: Record<string, Array<{ key: string; left: number; top: number; width: number; height: number }>> = {};

  for (const section of sections) {
    const canvas = accessibilityCanvasRefs.value[section.title];
    if (!canvas || !section.highlights?.length) continue;

    const canvasRect = canvas.getBoundingClientRect();
    const sectionHighlights = section.highlights
      .map((highlight) => {
        const baseTarget = canvas.querySelector(highlight.selector) as HTMLElement | null;
        const target = highlight.targetShadowSelector
          ? ((baseTarget as HTMLElement | null)?.shadowRoot?.querySelector(highlight.targetShadowSelector) as HTMLElement | null)
          : baseTarget;

        if (!target) return null;

        const targetRect = target.getBoundingClientRect();

        return {
          key: highlight.key,
          left: targetRect.left - canvasRect.left,
          top: targetRect.top - canvasRect.top,
          width: targetRect.width,
          height: targetRect.height,
        };
      })
      .filter((value): value is NonNullable<typeof value> => Boolean(value));

    positions[section.title] = sectionHighlights;
  }

  accessibilityHighlightPositions.value = positions;
};

const bindAccessibilityObservers = async () => {
  await nextTick();

  accessibilityMutationObservers.forEach((observer) => observer.disconnect());
  accessibilityMutationObservers = [];

  Object.values(accessibilityCanvasRefs.value).forEach((canvas) => {
    if (!canvas) return;

    const observer = new MutationObserver(() => {
      void updateAccessibilityHighlights();
    });

    observer.observe(canvas, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    accessibilityMutationObservers.push(observer);
  });
};

onMounted(() => {
  void initSteppers();
  void updateAnatomyCallouts();
  void updateAccessibilityHighlights();
  void bindAccessibilityObservers();

  anatomyResizeObserver = new ResizeObserver(() => {
    void updateAnatomyCallouts();
    void updateAccessibilityHighlights();
  });

  if (anatomyCanvasRef.value) {
    anatomyResizeObserver.observe(anatomyCanvasRef.value);
  }

  Object.values(accessibilityCanvasRefs.value).forEach((canvas) => {
    if (canvas) anatomyResizeObserver?.observe(canvas);
  });

  window.addEventListener("resize", updateAnatomyCallouts);
  window.addEventListener("resize", updateAccessibilityHighlights);
});

watch(doc, () => {
  void initSteppers();
  void updateAnatomyCallouts();
  void updateAccessibilityHighlights();
  void bindAccessibilityObservers();
});

onBeforeUnmount(() => {
  anatomyResizeObserver?.disconnect();
  accessibilityMutationObservers.forEach((observer) => observer.disconnect());
  window.removeEventListener("resize", updateAnatomyCallouts);
  window.removeEventListener("resize", updateAccessibilityHighlights);
});
</script>

<template>
  <div v-if="doc" :class="$style.page" :data-component-page="currentPageKey">
    <sgds-tab-group :class="$style.tabGroup" variant="underlined">
      <sgds-tab slot="nav" panel="design" active>Design</sgds-tab>
      <sgds-tab slot="nav" panel="usage">Usage</sgds-tab>
      <sgds-tab slot="nav" panel="code">Code</sgds-tab>
      <sgds-tab slot="nav" panel="accessibility">Accessibility</sgds-tab>
      <sgds-tab slot="nav" panel="updates">Updates</sgds-tab>

      <sgds-tab-panel name="design">
        <div :class="$style.sectionStack">
          <Section title="Purpose">
            <div :class="$style.purposeGrid">
              <article
                v-for="card in doc.purposeCards"
                :key="card.title"
                :class="$style.purposeCard"
              >
                <h3 :class="[$style.cardTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ card.title }}</h3>
                <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ card.description }}</p>
              </article>
            </div>
          </Section>

          <Section title="Anatomy">
            <div :class="$style.anatomyStack">
              <div :class="$style.showcaseCard">
                <div :class="$style.anatomyPreview">
                  <template v-if="doc.anatomyAsset">
                    <img
                      :class="[$style.anatomyImage, $style.anatomyImageLight]"
                      :src="doc.anatomyAsset.lightSrc"
                      :alt="doc.anatomyAsset.alt"
                    />
                    <img
                      :class="[$style.anatomyImage, $style.anatomyImageDark]"
                      :src="doc.anatomyAsset.darkSrc"
                      :alt="`${doc.anatomyAsset.alt} in dark mode`"
                    />
                  </template>
                  <div v-else ref="anatomyCanvasRef" :class="$style.anatomyCanvas">
                    <div :class="$style.demoMarkup" v-html="anatomyPreviewMarkup"></div>
                    <span
                      v-for="callout in anatomyCalloutPositions"
                      :key="`stroke-${callout.number}`"
                      :class="[
                        $style.anatomyCalloutStroke,
                        callout.direction === 'left' || callout.direction === 'right'
                          ? $style.anatomyCalloutStrokeHorizontal
                          : $style.anatomyCalloutStrokeVertical,
                      ]"
                      :style="{
                        left: `${callout.strokeLeft}px`,
                        top: `${callout.strokeTop}px`,
                        width: callout.strokeWidth ? `${callout.strokeWidth}px` : undefined,
                        height: callout.strokeHeight ? `${callout.strokeHeight}px` : undefined,
                      }"
                    ></span>
                    <span
                      v-for="callout in anatomyCalloutPositions"
                      :key="`badge-${callout.number}`"
                      :class="$style.anatomyCalloutBadge"
                      :style="{ left: `${callout.badgeLeft}px`, top: `${callout.badgeTop}px` }"
                    >
                      {{ callout.number }}
                    </span>
                  </div>
                </div>
              </div>

              <div :class="$style.anatomyGrid">
                <div :class="$style.anatomyColumn">
                  <PortalNumberedItem
                    v-for="part in doc.resolvedAnatomyParts.slice(0, Math.ceil(doc.resolvedAnatomyParts.length / 2))"
                    :key="part.number"
                    :number="part.number"
                    :title="part.title"
                    :note="part.note"
                  />
                </div>

                <div :class="$style.anatomyColumn">
                  <PortalNumberedItem
                    v-for="part in doc.resolvedAnatomyParts.slice(Math.ceil(doc.resolvedAnatomyParts.length / 2))"
                    :key="part.number"
                    :number="part.number"
                    :title="part.title"
                    :note="part.note"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section title="Configuration">
            <div :class="$style.configurationStack">
              <article
                v-for="example in doc.demos"
                :key="example.title"
                :class="$style.configurationRow"
              >
                <div :class="$style.configurationCopy">
                  <h3 :class="[$style.configurationTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ example.title }}</h3>
                  <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ example.description }}</p>
                </div>

                <div :class="$style.configurationPreview">
                  <div :class="[example.title === 'Density' ? $style.accordionSurfaceFlush : $style.accordionSurface]">
                    <div :class="$style.demoMarkup" v-html="example.markup"></div>
                  </div>
                </div>
              </article>
            </div>
          </Section>

          <Section v-if="measurementExamples.length" title="Measurements">
            <div :class="$style.measurementsGrid">
              <article
                v-for="example in measurementExamples"
                :key="example.title"
                :class="$style.measurementCard"
              >
                <div :class="$style.measurementHeader">
                  <h3 :class="$style.measurementTitle">{{ example.title }}</h3>
                </div>

                <div :class="$style.measurementPreview">
                  <template v-if="'lightSrc' in example">
                    <img
                      :class="[$style.measurementImage, $style.measurementImageLight]"
                      :src="example.lightSrc"
                      :alt="example.alt"
                    />
                    <img
                      :class="[$style.measurementImage, $style.measurementImageDark]"
                      :src="example.darkSrc"
                      :alt="`${example.alt} in dark mode`"
                    />
                  </template>
                  <div v-else :class="$style.demoMarkup" v-html="example.markup"></div>
                </div>
              </article>
            </div>
          </Section>
        </div>
      </sgds-tab-panel>

      <sgds-tab-panel name="usage">
        <div v-if="doc.usage" :class="$style.sectionStack">
          <Section v-if="doc.usage.guidance?.length" title="Usage">
            <div :class="$style.usageGuidanceStack">
              <article
                v-for="section in doc.usage.guidance"
                :key="section.title"
                :class="$style.usageGuidanceBlock"
              >
                <div :class="$style.usageGuidanceHeader">
                  <span
                    :class="[
                      $style.bestPracticeMarker,
                      section.tone === 'do' ? $style.bestPracticeMarkerDo : $style.bestPracticeMarkerDont,
                    ]"
                  >
                    <sgds-icon :name="section.tone === 'do' ? 'check-circle-fill' : 'xcircle-fill'" size="lg"></sgds-icon>
                  </span>
                  <h3 :class="[$style.configurationTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ section.title }}</h3>
                </div>
                <ul :class="$style.list">
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section v-if="doc.usage.behaviours?.length" title="Behaviours">
            <div :class="$style.configurationStack">
              <article
                v-for="example in doc.usage.behaviours"
                :key="example.title"
                :class="$style.configurationRow"
              >
                <div :class="$style.configurationCopy">
                  <h3 :class="[$style.configurationTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">{{ example.title }}</h3>
                  <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ example.description }}</p>
                </div>
                <div :class="$style.configurationPreview">
                  <div :class="[example.surface === 'flush' ? $style.accordionSurfaceFlush : $style.accordionSurface]">
                    <div :class="$style.demoMarkup" v-html="example.markup"></div>
                  </div>
                </div>
              </article>
            </div>
          </Section>

          <Section v-if="doc.usage.content?.length" title="Content">
            <div :class="$style.contentGuidanceStack">
              <article
                v-for="section in doc.usage.content"
                :key="section.title"
                :class="$style.contentGuidanceBlock"
              >
                <h3 :class="[$style.configurationTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">
                  {{ section.title }}
                </h3>
                <ul :class="$style.list">
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ul>
              </article>
            </div>
          </Section>

          <Section v-if="doc.usage.motion" title="Motion">
            <div :class="$style.measurementsGrid">
              <article :class="$style.measurementCard">
                <div :class="$style.measurementPreview">
                  <div :class="$style.motionDemoSurface">
                    <div :class="$style.demoMarkup" v-html="doc.usage.motion.previewMarkup"></div>
                  </div>
                </div>
              </article>
              <div :class="$style.motionTableBlock">
                <h3 :class="[$style.motionTableTitle, 'sgds:text-3 sgds:font-semibold sgds:leading-xs sgds:tracking-normal']">Motion specifications</h3>
                <sgds-table tableBorder headerBackground>
                  <sgds-table-row>
                    <sgds-table-head>Element</sgds-table-head>
                    <sgds-table-head>Value</sgds-table-head>
                    <sgds-table-head>Duration</sgds-table-head>
                    <sgds-table-head>Ease</sgds-table-head>
                  </sgds-table-row>
                  <sgds-table-row v-for="spec in doc.usage.motion.specs" :key="spec.element">
                    <sgds-table-cell>{{ spec.element }}</sgds-table-cell>
                    <sgds-table-cell>{{ spec.value }}</sgds-table-cell>
                    <sgds-table-cell>{{ spec.duration }}</sgds-table-cell>
                    <sgds-table-cell>{{ spec.easing }}</sgds-table-cell>
                  </sgds-table-row>
                </sgds-table>
              </div>
            </div>
          </Section>

          <Section v-if="doc.usage.bestPractices?.length" title="Best practices">
            <div :class="$style.bestPracticesRows">
              <div
                v-for="(row, index) in bestPracticeRows"
                :key="`best-practice-row-${index}`"
                :class="$style.bestPracticesColumns"
              >
                <article
                  v-if="row.do"
                  :key="row.do.title"
                  :class="$style.bestPracticeCard"
                >
                  <div :class="$style.bestPracticePreview">
                    <div :class="$style.accordionSurface">
                      <div :class="$style.demoMarkup" v-html="row.do.markup"></div>
                    </div>
                  </div>
                  <div :class="$style.bestPracticeFeedback">
                    <span :class="[$style.bestPracticeMarker, $style.bestPracticeMarkerDo]">
                      <sgds-icon name="check-circle-fill" size="lg"></sgds-icon>
                    </span>
                    <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ row.do.description }}</p>
                  </div>
                </article>
                <div v-else :class="$style.bestPracticeEmpty"></div>

                <article
                  v-if="row.dont"
                  :key="row.dont.title"
                  :class="$style.bestPracticeCard"
                >
                  <div :class="$style.bestPracticePreview">
                    <div :class="$style.accordionSurface">
                      <div :class="$style.demoMarkup" v-html="row.dont.markup"></div>
                    </div>
                  </div>
                  <div :class="$style.bestPracticeFeedback">
                    <span :class="[$style.bestPracticeMarker, $style.bestPracticeMarkerDont]">
                      <sgds-icon name="xcircle-fill" size="lg"></sgds-icon>
                    </span>
                    <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">{{ row.dont.description }}</p>
                  </div>
                </article>
                <div v-else :class="$style.bestPracticeEmpty"></div>
              </div>
            </div>
          </Section>
        </div>

        <article v-else :class="$style.infoCard">
          <h3 :class="$style.cardTitle">Usage guidance</h3>
          <p :class="$style.cardBody">
            Use <code>{{ doc.title }}</code> when its built-in SGDS pattern matches the task, instead of recreating the same interaction with custom markup.
          </p>
        </article>
      </sgds-tab-panel>

      <sgds-tab-panel name="code">
        <div :class="$style.sectionStack">
          <Section title="Live demo">
            <article :class="$style.measurementCard">
              <div :class="$style.measurementPreview">
                <div :class="$style.motionDemoSurface">
                  <div :class="$style.demoMarkup" v-html="codePreviewMarkup"></div>
                </div>
              </div>
            </article>
          </Section>

          <Section v-if="doc.props?.length" title="Props">
            <sgds-table tableBorder headerBackground>
              <sgds-table-row>
                <sgds-table-head>Property</sgds-table-head>
                <sgds-table-head>Type</sgds-table-head>
                <sgds-table-head>Default</sgds-table-head>
                <sgds-table-head>Description</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row v-for="prop in doc.props || []" :key="prop.name">
                <sgds-table-cell>{{ prop.name }}</sgds-table-cell>
                <sgds-table-cell>{{ prop.type }}</sgds-table-cell>
                <sgds-table-cell>{{ prop.defaultValue }}</sgds-table-cell>
                <sgds-table-cell>{{ prop.description }}</sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </Section>
        </div>
      </sgds-tab-panel>

      <sgds-tab-panel name="accessibility">
        <div v-if="doc.accessibility?.sections?.length || doc.accessibility?.keyboardInteractions?.length" :class="$style.sectionStack">
          <Section title="Accessibility">
            <div :class="$style.accessibilitySectionStack">
              <article
                v-for="section in doc.accessibility?.sections || []"
                :key="section.title"
                :class="$style.configurationRow"
              >
                <div :class="$style.configurationCopy">
                  <h3 :class="[$style.accessibilitySubsectionTitle, 'sgds:text-4 sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">
                    {{ section.title }}
                  </h3>
                  <div v-if="section.description?.length" :class="$style.accessibilityDescription">
                    <p
                      v-for="paragraph in section.description"
                      :key="paragraph"
                      :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                  <ol v-if="section.items.length" :class="$style.accessibilityList">
                    <li v-for="item in section.items" :key="item">{{ item }}</li>
                  </ol>
                </div>
                <div :class="$style.configurationPreview">
                  <div v-if="section.markup" :class="$style.accordionSurface">
                    <div
                      :ref="setAccessibilityCanvasRef(section.title)"
                      :class="$style.accessibilityDemoCanvas"
                    >
                      <span
                        v-for="highlight in accessibilityHighlightPositions[section.title] || []"
                        :key="`${section.title}-${highlight.key}`"
                        :class="$style.accessibilityHighlight"
                        :style="{
                          left: `${highlight.left}px`,
                          top: `${highlight.top}px`,
                          width: `${highlight.width}px`,
                          height: `${highlight.height}px`,
                        }"
                      ></span>
                      <div :class="$style.demoMarkup" v-html="section.markup"></div>
                    </div>
                  </div>
                </div>
              </article>

              <section v-if="doc.accessibility?.keyboardInteractions?.length" :class="$style.accessibilitySubsection">
                <h3 :class="[$style.accessibilitySubsectionTitle, 'sgds:text-4 sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">
                  Keyboard interaction
                </h3>
                <sgds-table tableBorder headerBackground>
                  <sgds-table-row>
                    <sgds-table-head>Key</sgds-table-head>
                    <sgds-table-head>Interaction</sgds-table-head>
                  </sgds-table-row>
                  <sgds-table-row v-for="row in doc.accessibility?.keyboardInteractions || []" :key="row.key">
                    <sgds-table-cell>
                      <CodeToken :label="row.key" />
                    </sgds-table-cell>
                    <sgds-table-cell>{{ row.description }}</sgds-table-cell>
                  </sgds-table-row>
                </sgds-table>
              </section>
            </div>
          </Section>
        </div>

        <article v-else :class="$style.infoCard">
          <h3 :class="$style.cardTitle">Accessibility notes</h3>
          <ul v-if="doc.accessibilityNotes?.length" :class="$style.list">
            <li v-for="note in doc.accessibilityNotes" :key="note">{{ note }}</li>
          </ul>
          <p v-else :class="$style.cardBody">
            Use the component with clear labels, meaningful text, and the SGDS interaction states that come with the component. Validate keyboard flow and screen reader behaviour in the surrounding page context.
          </p>
        </article>
      </sgds-tab-panel>

      <sgds-tab-panel name="updates">
        <div :class="$style.sectionStack">
          <Section :title="doc.updates.updates.title">
            <sgds-table tableBorder headerBackground>
              <sgds-table-row>
                <sgds-table-head v-for="column in doc.updates.updates.columns" :key="column">
                  <span
                    :class="[
                      $style.tableCellContent,
                      column === 'Date' ? $style.tableCellDate : '',
                    ]"
                  >
                    {{ column }}
                  </span>
                </sgds-table-head>
              </sgds-table-row>
              <sgds-table-row
                v-for="(row, index) in doc.updates.updates.rows"
                :key="`${doc.updates.updates.title}-${index}`"
              >
                <sgds-table-cell v-for="column in doc.updates.updates.columns" :key="column">
                  <span
                    :class="[
                      $style.tableCellContent,
                      column === 'Date' ? $style.tableCellDate : '',
                    ]"
                  >
                    {{ row[column] }}
                  </span>
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </Section>

          <Section :title="doc.updates.roadmap.title">
            <sgds-table tableBorder headerBackground>
              <sgds-table-row>
                <sgds-table-head v-for="column in doc.updates.roadmap.columns" :key="column">{{ column }}</sgds-table-head>
              </sgds-table-row>
              <sgds-table-row
                v-for="(row, index) in doc.updates.roadmap.rows"
                :key="`${doc.updates.roadmap.title}-${index}`"
              >
                <sgds-table-cell v-for="column in doc.updates.roadmap.columns" :key="column">
                  {{ row[column] }}
                </sgds-table-cell>
              </sgds-table-row>
            </sgds-table>
          </Section>

          <Section :title="doc.updates.feedback.title">
            <div :class="$style.updatesTextBlock">
              <h3 :class="[$style.configurationTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">
                {{ doc.updates.feedback.heading }}
              </h3>
              <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">
                {{ doc.updates.feedback.prefix }}
                <sgds-link><a :href="doc.updates.feedback.href">{{ doc.updates.feedback.linkLabel }}</a></sgds-link>
              </p>
            </div>
          </Section>

          <Section :title="doc.updates.bugReports.title">
            <div :class="$style.updatesTextBlock">
              <h3 :class="[$style.configurationTitle, 'sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight']">
                {{ doc.updates.bugReports.heading }}
              </h3>
              <p :class="[$style.cardBody, 'sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal']">
                {{ doc.updates.bugReports.prefix }}
                <sgds-link><a :href="doc.updates.bugReports.href">{{ doc.updates.bugReports.linkLabel }}</a></sgds-link>
              </p>
            </div>
          </Section>
        </div>
      </sgds-tab-panel>
    </sgds-tab-group>
  </div>
</template>

<style module>
.page {
  display: flex;
  flex-direction: column;
}

.tabGroup {
  display: block;
  width: 100%;
}

.sectionStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-margin-5-xl);
  padding-top: var(--sgds-layout-gap-lg);
}

.sectionCopyStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.accessibilitySectionStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-margin-5-xl);
}

.accessibilitySubsection {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-md);
}

.accessibilitySubsectionTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
}

.purposeGrid {
  display: grid;
  gap: var(--sgds-layout-gap-md);
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.purposeCard {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  min-width: 0;
  padding: var(--sgds-padding-none);
}

.anatomyStack,
.configurationStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.anatomyGrid {
  column-gap: var(--sgds-gap-2-xl);
  display: grid;
  row-gap: var(--sgds-gap-md);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.anatomyColumn {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.measurementsGrid {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
}

.configurationPreview,
.infoCard,
.codeCard,
.measurementCard,
.showcaseCard {
  background: var(--sgds-surface-raised);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-xl);
}

.showcaseCard,
.infoCard,
.codeCard,
.measurementCard {
  padding: var(--sgds-component-padding-md);
}

.infoCard,
.codeCard {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.anatomyPreview,
.measurementPreview {
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}

.anatomyCanvas {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-inline: auto;
  max-width: var(--sgds-dimension-688);
  min-height: var(--sgds-dimension-320);
  position: relative;
  width: 100%;
}

.anatomyImage,
.measurementImage {
  display: block;
  height: auto;
  max-width: 100%;
}

.anatomyImage {
  width: min(100%, var(--sgds-dimension-512));
}

.anatomyCalloutStroke {
  background: var(--sgds-border-color-default);
  pointer-events: none;
  position: absolute;
}

.anatomyCalloutStrokeHorizontal {
  height: var(--sgds-border-width-1);
  transform: translateY(-50%);
}

.anatomyCalloutStrokeVertical {
  transform: translateX(-50%);
  width: var(--sgds-border-width-1);
}

.anatomyCalloutBadge {
  align-items: center;
  background: var(--sgds-surface-inverse);
  border-radius: 50%;
  color: var(--sgds-color-inverse);
  display: inline-flex;
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  height: var(--sgds-dimension-24);
  justify-content: center;
  left: 50%;
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-16);
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: var(--sgds-dimension-24);
  z-index: 1;
}

.measurementImage {
  width: min(100%, var(--sgds-dimension-688));
}

.anatomyImageDark,
.measurementImageDark {
  display: none;
}

:global(.sgds-night-theme) .anatomyImageLight,
:global(.sgds-night-theme) .measurementImageLight {
  display: none;
}

:global(.sgds-night-theme) .anatomyImageDark,
:global(.sgds-night-theme) .measurementImageDark {
  display: block;
}

.usageGuidanceStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
  max-width: var(--sgds-container-max-width-md);
}

.contentGuidanceStack {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-lg);
  max-width: var(--sgds-container-max-width-md);
}

.contentGuidanceBlock {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.updatesTextBlock {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  max-width: var(--sgds-container-max-width-md);
}

.tableCellContent {
  display: inline-block;
}

.tableCellDate {
  min-width: var(--sgds-dimension-80);
  white-space: nowrap;
}

.usageGuidanceBlock {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.usageGuidanceHeader {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-2-xs);
}

.motionDemoSurface {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  min-height: 100%;
  width: 100%;
}

.motionTableTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
}

.motionTableBlock {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xl);
}

.bestPracticesRows {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-xl);
}

.bestPracticesColumns {
  align-items: stretch;
  display: grid;
  gap: var(--sgds-gap-2-xl);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.bestPracticeCard {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-layout-gap-sm);
  height: 100%;
}

.bestPracticePreview {
  background: var(--sgds-surface-raised);
  border-radius: var(--sgds-border-radius-xl);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: var(--sgds-dimension-280);
  overflow: hidden;
  gap: var(--sgds-gap-md);
  padding: var(--sgds-component-padding-md);
}

.bestPracticeEmpty {
  min-width: 0;
}

.bestPracticeFeedback {
  align-items: flex-start;
  display: flex;
  gap: var(--sgds-gap-xs);
}

.bestPracticeMarker {
  align-self: flex-start;
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  height: var(--sgds-dimension-32);
  justify-content: center;
  width: var(--sgds-dimension-32);
}

.bestPracticeMarkerDo {
  color: var(--sgds-success-color-default);
}

.bestPracticeMarkerDont {
  color: var(--sgds-danger-color-default);
}

.accordionSurfaceFlush {
  background: var(--sgds-surface-default);
  margin-inline: auto;
  max-width: var(--sgds-dimension-512);
  width: 100%;
}

.list {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  margin: 0;
  padding-left: var(--sgds-padding-lg);
}

.accessibilityList {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
  margin: 0;
  padding-left: var(--sgds-padding-lg);
}

.accessibilityDescription {
  color: var(--sgds-body-color-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

.measurementPreview {
  flex: 1 1 auto;
  justify-content: center;
  width: 100%;
}

.accessibilityDemoCanvas {
  position: relative;
  width: 100%;
}

.accessibilityHighlight {
  background: var(--sgds-primary-surface-translucent);
  border: var(--sgds-border-width-1) dashed var(--sgds-primary-border-color-default);
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.measurementCard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: var(--sgds-dimension-280);
  position: relative;
}

.measurementHeader {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  left: var(--sgds-component-padding-md);
  position: absolute;
  top: var(--sgds-component-padding-md);
  z-index: 1;
}

.configurationRow {
  display: grid;
  gap: var(--sgds-layout-gap-lg);
  grid-template-columns: minmax(0, 3fr) minmax(0, 5fr);
}

.configurationCopy {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
}

.configurationPreview {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-288);
  padding: var(--sgds-component-padding-md);
}

.accordionSurface {
  background: transparent;
  margin-inline: auto;
  max-width: var(--sgds-dimension-512);
  width: 100%;
}

.configurationTitle,
.cardTitle {
  color: var(--sgds-heading-color-default);
  margin: 0;
}

.measurementTitle {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-label-sm);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-20);
  margin: 0;
}

.cardBody {
  color: var(--sgds-body-color-subtle);
  margin: 0;
  white-space: pre-line;
}

.codeBlock {
  background: var(--sgds-bg-default);
  border: 1px solid var(--sgds-border-color-muted);
  border-radius: var(--sgds-border-radius-lg);
  color: var(--sgds-body-color-default);
  font-size: var(--sgds-font-size-1);
  line-height: var(--sgds-line-height-20);
  margin: 0;
  overflow-x: auto;
  padding: var(--sgds-component-padding-md);
}

.demoMarkup {
  align-items: center;
  display: flex;
  justify-content: center;
  min-width: 0;
  width: 100%;
}

.demoMarkup :global(> sgds-accordion) {
  background: var(--sgds-surface-default);
  display: block;
  width: 100%;
}

.demoMarkup :global(> sgds-alert) {
  display: block;
  width: 100%;
}

.demoMarkup :global(sgds-alert-link) {
  vertical-align: baseline;
}

.anatomyCanvas .demoMarkup :global(> sgds-alert) {
  display: block;
  max-width: var(--sgds-dimension-512);
  width: 100%;
}


:global(.portal-demo-row) {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-sm);
}

:global(.portal-demo-stack) {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-md);
  width: 100%;
}

:global(.portal-anatomy-demo-block) {
  width: 100%;
}

:global(.portal-demo-stack-sm) {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-xs);
}

:global(.portal-demo-card) {
  max-width: var(--sgds-dimension-320);
  width: 100%;
}

:global(.portal-slot-example) {
  align-items: center;
  background: var(--sgds-accent-surface-muted);
  border: var(--sgds-border-width-1) dashed var(--sgds-link-color-default);
  border-radius: var(--sgds-border-radius-none);
  color: var(--sgds-link-color-default);
  display: flex;
  gap: var(--sgds-gap-sm);
  justify-content: flex-start;
  padding: var(--sgds-padding-md);
  width: 100%;
}

:global(.portal-slot-example span) {
  color: inherit;
  text-align: left;
}

:global(.portal-slot-example sgds-icon) {
  color: inherit;
  flex-shrink: 0;
}

:global(.portal-demo-overlay) {
  min-height: var(--sgds-dimension-288);
  position: relative;
  width: 100%;
}

:global(.portal-modal-preview) {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: var(--sgds-dimension-288);
  width: 100%;
}

:global(.portal-modal-panel) {
  background: var(--sgds-surface-default);
  border-radius: var(--sgds-border-radius-md);
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-2-xl);
  max-width: var(--sgds-dimension-480);
  padding: var(--sgds-padding-xl);
  width: 100%;
}

:global(.portal-modal-header) {
  display: flex;
  gap: var(--sgds-gap-md);
  justify-content: space-between;
}

:global(.portal-modal-header-copy) {
  display: flex;
  flex-direction: column;
  gap: var(--sgds-gap-sm);
}

:global(.portal-modal-title) {
  color: var(--sgds-heading-color-default);
  font-size: var(--sgds-font-size-24);
  font-weight: var(--sgds-font-weight-semibold);
  letter-spacing: var(--sgds-letter-spacing-tight);
  line-height: var(--sgds-line-height-40);
}

:global(.portal-modal-description) {
  color: var(--sgds-body-color-subtle);
  font-size: var(--sgds-font-size-body-md);
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: var(--sgds-letter-spacing-normal);
  line-height: var(--sgds-line-height-24);
}

:global(.portal-modal-body) {
  color: var(--sgds-body-color-default);
}

:global(.portal-modal-body p) {
  margin: 0;
}

:global(.portal-modal-footer) {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sgds-gap-md);
  justify-content: flex-end;
}

:global(.portal-demo-nav) {
  max-width: var(--sgds-dimension-688);
  width: 100%;
}

:global(.portal-demo-nav-sm) {
  max-width: var(--sgds-dimension-320);
  width: 100%;
}

:global(.portal-demo-list-item) {
  align-items: center;
  display: flex;
  gap: var(--sgds-gap-sm);
}

:global(.portal-accessibility-preview) {
  min-height: var(--sgds-dimension-400);
  position: relative;
  width: 100%;
}

:global(.portal-accessibility-frame) {
  left: 50%;
  max-width: var(--sgds-dimension-400);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

:global(.portal-accessibility-accordion) {
  background: var(--sgds-surface-default);
  display: block;
  position: relative;
  width: 100%;
  z-index: 1;
}

:global(.portal-accessibility-link) {
  margin-top: var(--sgds-gap-sm);
}

:global(.portal-accessibility-callout) {
  left: 0;
  position: absolute;
  width: var(--sgds-dimension-80);
  z-index: 3;
}

:global(.portal-accessibility-callout::before) {
  border-color: var(--sgds-primary-border-color-default);
  border-style: solid;
  border-width: 0 0 var(--sgds-border-width-1) var(--sgds-border-width-1);
  border-bottom-left-radius: var(--sgds-border-radius-xl);
  content: "";
  height: var(--sgds-dimension-24);
  left: var(--sgds-dimension-24);
  position: absolute;
  top: 50%;
  width: var(--sgds-dimension-40);
}

:global(.portal-accessibility-badge) {
  align-items: center;
  background: var(--sgds-surface-inverse);
  border-radius: 50%;
  color: var(--sgds-color-inverse);
  display: inline-flex;
  font-size: var(--sgds-font-size-0);
  font-weight: var(--sgds-font-weight-regular);
  height: var(--sgds-dimension-24);
  justify-content: center;
  line-height: var(--sgds-line-height-16);
  width: var(--sgds-dimension-24);
}

:global(.portal-accessibility-callout-1) {
  top: 22%;
}

:global(.portal-accessibility-callout-2) {
  top: 35%;
}

:global(.portal-accessibility-callout-3) {
  top: 57%;
}

:global(.portal-accessibility-callout-4) {
  top: 80%;
}

:global(.portal-demo-stepper) {
  max-width: var(--sgds-dimension-688);
  width: 100%;
}

@media (max-width: 1023px) {
  .purposeGrid,
  .anatomyGrid,
  .configurationRow {
    grid-template-columns: 1fr;
  }

  .bestPracticesColumns {
    grid-template-columns: 1fr;
  }

  .configurationPreview {
    min-height: var(--sgds-dimension-320);
  }

  :global(.portal-accessibility-preview) {
    min-height: var(--sgds-dimension-360);
  }
}
</style>
