import type { ResolvedComponentDoc } from "./component-docs";
import {
  aboutUsMarkup,
  applicationManagementMarkup,
  blogMarkup,
  catalogueMarkup,
  formPageMarkup,
  landingMarkup,
  multiStepFormPageMarkup,
} from "./template-markup";
import {
  cardsCards3Markup,
  cardsCards4Markup,
  ctaContainedPrimaryMarkup,
  ctaContainedPrimaryCenterMarkup,
  ctaContainedRaisedMarkup,
  ctaContainedRaisedCenterMarkup,
  ctaFullbleedPrimaryMarkup,
  ctaFullbleedPrimaryCenterMarkup,
  ctaFullbleedAlternateMarkup,
  ctaFullbleedAlternateCenterMarkup,
  featureFeature48ImgLeftMarkup,
  featureFeature48ImgRightMarkup,
  featureFeature66ComponentLeftMarkup,
  featureFeature66ComponentRightMarkup,
  featureFeature66ImgLeftMarkup,
  featureFeature66ImgRightMarkup,
  featureFeature84ImgLeftMarkup,
  featureFeature84ImgRightMarkup,
  featureFeatureCardsBelowMarkup,
  featureFeatureNoImgCenterMarkup,
  featureFeatureNoImgLeftMarkup,
  filterFilterMarkup,
  formAllTypesMarkup,
  formBasicCenterMarkup,
  formBasicLeftMarkup,
  formBasicRightMarkup,
  formFormFieldsCheckboxMarkup,
  formFormFieldsDatesQuantitiesMarkup,
  formFormFieldsFileUploadMarkup,
  formFormFieldsRadioMarkup,
  formFormFieldsSelectsMarkup,
  formFormFieldsTextareaMarkup,
  formFormMultistepStepperMarkup,
  formFullwidthOnlyMarkup,
  formPairedOnlyMarkup,
  formSectionsSingleMarkup,
  formSectionsThreeMarkup,
  formSectionsTwoMarkup,
  headerPageHeaderMarkup,
  headerPageHeaderBreadcrumbMarkup,
  heroHeroMarkup,
  heroHeroCenterMarkup,
  heroHeroFullbleedMarkup,
  heroHeroImageMarkup,
  heroHeroBgImageMarkup,
  heroHeroBgImageLightMarkup,
  statsStats3Markup,
  statsStats4Markup,
  statsStats5Markup,
  statsStatsRight6Markup,
  statsStatsRight8Markup,
} from "./block-markup";

export type PatternGroup = "page templates" | "block templates";

export type TemplateOverviewItem = {
  key: string;
  title: string;
  description: string;
  href: string;
  previewHref: string;
  group: PatternGroup;
  groupLabel: string;
  demoCount: number;
  usedComponents: string[];
};

export type TemplateOverviewGroup = {
  group: PatternGroup;
  title: string;
  description: string;
  items: TemplateOverviewItem[];
};

export type PatternDemo = {
  title: string;
  description: string;
  markup: string;
};

type UsageGuidance = {
  title: string;
  tone: "do" | "dont";
  items: string[];
};

type PatternDoc = {
  title: string;
  group: PatternGroup;
  usedComponents: string[];
  whenToUse: string[];
  whenNotToUse?: string[];
  demos: PatternDemo[];
  bestPractices?: UsageGuidance[];
  hideFromOverview?: boolean;
  categoryLabel?: string;
};

type BlockVariantDocInput = {
  title: string;
  categoryLabel: string;
  markup: string;
  usedComponents: string[];
  description: string;
  whenToUse: string;
  whenNotToUse?: string;
};

const createBlockVariantDoc = ({
  title,
  categoryLabel,
  markup,
  usedComponents,
  description,
  whenToUse,
  whenNotToUse,
}: BlockVariantDocInput): PatternDoc => ({
  title,
  group: "block templates",
  categoryLabel,
  usedComponents,
  whenToUse: [whenToUse],
  whenNotToUse: whenNotToUse ? [whenNotToUse] : undefined,
  demos: [{ title, description, markup }],
});

const formBlockComponents = [
  "sgds-input",
  "sgds-textarea",
  "sgds-select",
  "sgds-checkbox",
  "sgds-checkbox-group",
  "sgds-radio",
  "sgds-radio-group",
  "sgds-datepicker",
  "sgds-quantity-toggle",
  "sgds-file-upload",
  "sgds-stepper",
  "sgds-button",
];

export const blockTemplateCategoryOrder: string[] = [
  "Cards",
  "Call to action",
  "Feature",
  "Filter",
  "Form",
  "Header",
  "Hero",
  "Stats",
];

export const blockTemplateRecommendedOrder: string[] = [
  "cards-3-per-column",
  "cards-4-per-column",
  "cta-contained-primary-center",
  "cta-contained-primary",
  "cta-contained-raised-center",
  "cta-contained-raised",
  "cta-full-bleed-alternate-center",
  "cta-full-bleed-alternate",
  "cta-full-bleed-primary-center",
  "cta-full-bleed-primary",
  "feature-image-left-4-8",
  "feature-image-right-4-8",
  "feature-component-left-6-6",
  "feature-component-right-6-6",
  "feature-image-left-6-6",
  "feature-image-right-6-6",
  "feature-image-left-8-4",
  "feature-image-right-8-4",
  "feature-cards-below",
  "feature-no-image-center",
  "feature-no-image-left",
  "filter-checkboxes",
  "form-all-types",
  "form-basic-center",
  "form-basic-left",
  "form-basic-right",
  "form-fields-checkbox",
  "form-fields-dates-quantities",
  "form-fields-file-upload",
  "form-fields-radio",
  "form-fields-selects",
  "form-fields-textarea",
  "form-multi-step",
  "form-full-width-only",
  "form-paired-only",
  "form-sections-single",
  "form-sections-three",
  "form-sections-two",
  "header-page-header-with-breadcrumb",
  "header-page-header",
  "hero-background-image-light",
  "hero-background-image",
  "hero-center",
  "hero-fullbleed",
  "hero-image",
  "hero-basic",
  "stats-3-statistics",
  "stats-4-statistics",
  "stats-5-statistics",
  "stats-right-6-column",
  "stats-right-8-columns",
];

export const pageTemplateCategoryOrder: string[] = [
  "Landing pages",
  "Content pages",
  "Browse and manage",
  "Forms",
];

export const pageTemplateRecommendedOrder: string[] = [
  "landing",
  "about-us",
  "blog",
  "catalogue",
  "application-management",
  "form-page",
  "multi-step-form",
];

const formBlockVariantDocs: Record<string, PatternDoc> = {
  "form-all-types": {
    title: "All types",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When you need a complete reference form that shows the available SGDS field types together."],
    whenNotToUse: ["When a page needs a focused form with only the fields required for the task."],
    demos: [{ title: "All types", description: "Demonstration form showing every supported field type in one layout.", markup: formAllTypesMarkup }],
  },
  "form-basic-center": {
    title: "Basic center",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["For short, single-section forms that should sit prominently in the centre of the page."],
    whenNotToUse: ["For long forms or forms that need supporting content beside the fields."],
    demos: [{ title: "Basic center", description: "Single-section form centered on the page.", markup: formBasicCenterMarkup }],
  },
  "form-basic-left": {
    title: "Basic left",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["For simple forms that should align with the page container and reading flow."],
    whenNotToUse: ["When the form needs strong standalone emphasis in the centre of the page."],
    demos: [{ title: "Basic left", description: "Single-section form, content left-aligned within the page container.", markup: formBasicLeftMarkup }],
  },
  "form-basic-right": {
    title: "Basic right",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["For layouts where the form sits beside explanatory content or supporting media."],
    whenNotToUse: ["When the form is the only major content on the page."],
    demos: [{ title: "Basic right", description: "Single-section form right-aligned.", markup: formBasicRightMarkup }],
  },
  "form-fields-checkbox": {
    title: "Form fields checkbox",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When users can select one or more options from a visible set."],
    whenNotToUse: ["When the user must choose exactly one option — use radio fields instead."],
    demos: [{ title: "Form fields checkbox", description: "Checkbox and checkbox-group examples, including grouped options.", markup: formFormFieldsCheckboxMarkup }],
  },
  "form-fields-dates-quantities": {
    title: "Form fields dates quantities",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When a form needs date or quantity controls with SGDS field styling."],
    whenNotToUse: ["When plain text entry would be clearer than a specialised control."],
    demos: [{ title: "Form fields dates quantities", description: "Datepicker and quantity-toggle field examples.", markup: formFormFieldsDatesQuantitiesMarkup }],
  },
  "form-fields-file-upload": {
    title: "Form fields file upload",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When users need to attach files or supporting documents to a form."],
    whenNotToUse: ["When uploaded files are not required to complete the user task."],
    demos: [{ title: "Form fields file upload", description: "File upload field examples with drop zone and validation.", markup: formFormFieldsFileUploadMarkup }],
  },
  "form-fields-radio": {
    title: "Form fields radio",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When users must choose exactly one option from a visible set."],
    whenNotToUse: ["When users can choose multiple options — use checkboxes instead."],
    demos: [{ title: "Form fields radio", description: "Radio and radio-group examples.", markup: formFormFieldsRadioMarkup }],
  },
  "form-fields-selects": {
    title: "Form fields selects",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When users choose from a longer list of predefined options."],
    whenNotToUse: ["When there are only a few options that should stay visible — use radio fields instead."],
    demos: [{ title: "Form fields selects", description: "Select examples for single-value list inputs.", markup: formFormFieldsSelectsMarkup }],
  },
  "form-fields-textarea": {
    title: "Form fields textarea",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When users need to enter longer free-text responses."],
    whenNotToUse: ["When the response should be short and structured — use an input instead."],
    demos: [{ title: "Form fields textarea", description: "Textarea examples with hint and validation.", markup: formFormFieldsTextareaMarkup }],
  },
  "form-multi-step": {
    title: "Form multi-step",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["For transactional forms that are easier to complete as a step-by-step flow."],
    whenNotToUse: ["For short forms that fit comfortably on one page."],
    demos: [{ title: "Form multi-step", description: "Stepper-driven form for transactional flows.", markup: formFormMultistepStepperMarkup }],
  },
  "form-full-width-only": {
    title: "Full-width only",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When every field needs the full form width for readability."],
    whenNotToUse: ["When related short fields can be paired to reduce scanning distance."],
    demos: [{ title: "Full-width only", description: "Layout where every field spans the form's full width.", markup: formFullwidthOnlyMarkup }],
  },
  "form-paired-only": {
    title: "Paired only",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When related short fields work better side-by-side on wider viewports."],
    whenNotToUse: ["When fields need long labels, hints, or validation messages."],
    demos: [{ title: "Paired only", description: "Layout pairing fields side-by-side on wider viewports.", markup: formPairedOnlyMarkup }],
  },
  "form-sections-single": {
    title: "Sections single",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When a form has one clear group of related fields."],
    whenNotToUse: ["When fields belong to multiple topics that need separate headings."],
    demos: [{ title: "Sections single", description: "One labelled section grouping related fields.", markup: formSectionsSingleMarkup }],
  },
  "form-sections-three": {
    title: "Sections three",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["For longer forms that need three labelled sections to make scanning easier."],
    whenNotToUse: ["When one or two sections are enough to describe the task."],
    demos: [{ title: "Sections three", description: "Three labelled sections — use for longer forms.", markup: formSectionsThreeMarkup }],
  },
  "form-sections-two": {
    title: "Sections two",
    group: "block templates",
    categoryLabel: "Form",
    usedComponents: formBlockComponents,
    whenToUse: ["When a form has two clear groups of related fields."],
    whenNotToUse: ["When every field belongs to the same topic."],
    demos: [{ title: "Sections two", description: "Two labelled sections separated by spacing.", markup: formSectionsTwoMarkup }],
  },
};

const cardsBlockComponents = ["sgds-card", "sgds-badge", "sgds-link", "sgds-icon"];
const ctaBlockComponents = ["sgds-button"];
const featureBlockComponents = ["sgds-button", "sgds-card", "sgds-icon"];
const filterBlockComponents = ["sgds-checkbox", "sgds-checkbox-group", "sgds-link"];
const headerBlockComponents = ["sgds-breadcrumb", "sgds-button", "sgds-icon"];
const heroBlockComponents = ["sgds-button", "sgds-icon"];
const statsBlockComponents = ["sgds-icon"];

const blockVariantDocs: Record<string, PatternDoc> = {
  "cards-3-per-column": createBlockVariantDoc({
    title: "3 per column",
    categoryLabel: "Cards",
    markup: cardsCards3Markup,
    usedComponents: cardsBlockComponents,
    description: "3-column card grid with section header and linked cards.",
    whenToUse: "When users need to scan a medium-sized set of cards in rows of three.",
  }),
  "cards-4-per-column": createBlockVariantDoc({
    title: "4 per column",
    categoryLabel: "Cards",
    markup: cardsCards4Markup,
    usedComponents: cardsBlockComponents,
    description: "4-column card grid for denser browsing layouts on wider viewports.",
    whenToUse: "When users need to scan a larger set of cards with less vertical scrolling.",
  }),
  "cta-contained-primary-center": createBlockVariantDoc({
    title: "Contained primary center",
    categoryLabel: "Call to action",
    markup: ctaContainedPrimaryCenterMarkup,
    usedComponents: ctaBlockComponents,
    description: "Contained CTA on a primary surface with centered content.",
    whenToUse: "When a primary action needs strong emphasis inside the page container.",
  }),
  "cta-contained-primary": createBlockVariantDoc({
    title: "Contained primary",
    categoryLabel: "Call to action",
    markup: ctaContainedPrimaryMarkup,
    usedComponents: ctaBlockComponents,
    description: "Contained CTA on a primary surface with left-aligned content.",
    whenToUse: "When a primary action should sit within the normal page reading flow.",
  }),
  "cta-contained-raised-center": createBlockVariantDoc({
    title: "Contained raised center",
    categoryLabel: "Call to action",
    markup: ctaContainedRaisedCenterMarkup,
    usedComponents: ctaBlockComponents,
    description: "Contained CTA on a raised surface with centered content.",
    whenToUse: "When a CTA needs moderate emphasis without using the primary surface.",
  }),
  "cta-contained-raised": createBlockVariantDoc({
    title: "Contained raised",
    categoryLabel: "Call to action",
    markup: ctaContainedRaisedMarkup,
    usedComponents: ctaBlockComponents,
    description: "Contained CTA on a raised surface with left-aligned content.",
    whenToUse: "When a CTA should support a content section without dominating it.",
  }),
  "cta-full-bleed-alternate-center": createBlockVariantDoc({
    title: "Full bleed alternate center",
    categoryLabel: "Call to action",
    markup: ctaFullbleedAlternateCenterMarkup,
    usedComponents: ctaBlockComponents,
    description: "Full-bleed alternate CTA with centered content.",
    whenToUse: "When a lower-emphasis CTA should span the full viewport width.",
  }),
  "cta-full-bleed-alternate": createBlockVariantDoc({
    title: "Full bleed alternate",
    categoryLabel: "Call to action",
    markup: ctaFullbleedAlternateMarkup,
    usedComponents: ctaBlockComponents,
    description: "Full-bleed alternate CTA with left-aligned content.",
    whenToUse: "When a full-width CTA should read as a continuation of the page content.",
  }),
  "cta-full-bleed-primary-center": createBlockVariantDoc({
    title: "Full bleed primary center",
    categoryLabel: "Call to action",
    markup: ctaFullbleedPrimaryCenterMarkup,
    usedComponents: ctaBlockComponents,
    description: "Full-bleed primary CTA with centered content.",
    whenToUse: "When the primary action should become a major page moment.",
  }),
  "cta-full-bleed-primary": createBlockVariantDoc({
    title: "Full bleed primary",
    categoryLabel: "Call to action",
    markup: ctaFullbleedPrimaryMarkup,
    usedComponents: ctaBlockComponents,
    description: "Full-bleed primary CTA with left-aligned content.",
    whenToUse: "When the primary action should span the full viewport while following the page reading flow.",
  }),
  "feature-image-left-4-8": createBlockVariantDoc({
    title: "Image left 4:8",
    categoryLabel: "Feature",
    markup: featureFeature48ImgLeftMarkup,
    usedComponents: featureBlockComponents,
    description: "Feature section with image in 4 columns and content in 8 columns.",
    whenToUse: "When supporting imagery should introduce a wider content area.",
  }),
  "feature-image-right-4-8": createBlockVariantDoc({
    title: "Image right 4:8",
    categoryLabel: "Feature",
    markup: featureFeature48ImgRightMarkup,
    usedComponents: featureBlockComponents,
    description: "Feature section with content in 8 columns and image in 4 columns.",
    whenToUse: "When content should lead and supporting imagery should sit to the right.",
  }),
  "feature-component-left-6-6": createBlockVariantDoc({
    title: "Component left 6:6",
    categoryLabel: "Feature",
    markup: featureFeature66ComponentLeftMarkup,
    usedComponents: featureBlockComponents,
    description: "Balanced feature section with an SGDS component on the left.",
    whenToUse: "When a live component example should sit beside explanatory content.",
  }),
  "feature-component-right-6-6": createBlockVariantDoc({
    title: "Component right 6:6",
    categoryLabel: "Feature",
    markup: featureFeature66ComponentRightMarkup,
    usedComponents: featureBlockComponents,
    description: "Balanced feature section with an SGDS component on the right.",
    whenToUse: "When explanatory content should lead into a component example.",
  }),
  "feature-image-left-6-6": createBlockVariantDoc({
    title: "Image left 6:6",
    categoryLabel: "Feature",
    markup: featureFeature66ImgLeftMarkup,
    usedComponents: featureBlockComponents,
    description: "Balanced feature section with image on the left.",
    whenToUse: "When image and content need equal visual weight.",
  }),
  "feature-image-right-6-6": createBlockVariantDoc({
    title: "Image right 6:6",
    categoryLabel: "Feature",
    markup: featureFeature66ImgRightMarkup,
    usedComponents: featureBlockComponents,
    description: "Balanced feature section with image on the right.",
    whenToUse: "When content and image need equal visual weight with content first.",
  }),
  "feature-image-left-8-4": createBlockVariantDoc({
    title: "Image left 8:4",
    categoryLabel: "Feature",
    markup: featureFeature84ImgLeftMarkup,
    usedComponents: featureBlockComponents,
    description: "Feature section with dominant image on the left.",
    whenToUse: "When imagery should carry most of the visual weight.",
  }),
  "feature-image-right-8-4": createBlockVariantDoc({
    title: "Image right 8:4",
    categoryLabel: "Feature",
    markup: featureFeature84ImgRightMarkup,
    usedComponents: featureBlockComponents,
    description: "Feature section with dominant image on the right.",
    whenToUse: "When content should introduce a visually dominant image.",
  }),
  "feature-cards-below": createBlockVariantDoc({
    title: "Cards below",
    categoryLabel: "Feature",
    markup: featureFeatureCardsBelowMarkup,
    usedComponents: featureBlockComponents,
    description: "Feature section with supporting cards below the heading content.",
    whenToUse: "When a feature needs supporting points or benefits beneath the main message.",
  }),
  "feature-no-image-center": createBlockVariantDoc({
    title: "No image center",
    categoryLabel: "Feature",
    markup: featureFeatureNoImgCenterMarkup,
    usedComponents: featureBlockComponents,
    description: "Centered feature section without imagery.",
    whenToUse: "When the message should stand alone without a visual asset.",
  }),
  "feature-no-image-left": createBlockVariantDoc({
    title: "No image left",
    categoryLabel: "Feature",
    markup: featureFeatureNoImgLeftMarkup,
    usedComponents: featureBlockComponents,
    description: "Left-aligned feature section without imagery.",
    whenToUse: "When the message should stay aligned with the surrounding content flow.",
  }),
  "filter-checkboxes": createBlockVariantDoc({
    title: "Filter checkboxes",
    categoryLabel: "Filter",
    markup: filterFilterMarkup,
    usedComponents: filterBlockComponents,
    description: "Faceted filter panel with grouped checkbox controls.",
    whenToUse: "When users need to narrow search, catalogue, or list results with multiple facets.",
  }),
  "header-page-header-with-breadcrumb": createBlockVariantDoc({
    title: "Page header with breadcrumb",
    categoryLabel: "Header",
    markup: headerPageHeaderBreadcrumbMarkup,
    usedComponents: headerBlockComponents,
    description: "Page header with breadcrumb, title, description, and action.",
    whenToUse: "When a page needs hierarchical context above the title.",
  }),
  "header-page-header": createBlockVariantDoc({
    title: "Page header",
    categoryLabel: "Header",
    markup: headerPageHeaderMarkup,
    usedComponents: headerBlockComponents,
    description: "Page header with title, description, and action.",
    whenToUse: "When a page needs a clear title area and primary action.",
  }),
  "hero-background-image-light": createBlockVariantDoc({
    title: "Hero background image light",
    categoryLabel: "Hero",
    markup: heroHeroBgImageLightMarkup,
    usedComponents: heroBlockComponents,
    description: "Hero with background image and light overlay treatment.",
    whenToUse: "When a hero needs photographic context while keeping a light visual tone.",
  }),
  "hero-background-image": createBlockVariantDoc({
    title: "Hero background image",
    categoryLabel: "Hero",
    markup: heroHeroBgImageMarkup,
    usedComponents: heroBlockComponents,
    description: "Hero with background image and dark overlay treatment.",
    whenToUse: "When a hero needs a strong image-led first impression.",
  }),
  "hero-center": createBlockVariantDoc({
    title: "Hero center",
    categoryLabel: "Hero",
    markup: heroHeroCenterMarkup,
    usedComponents: heroBlockComponents,
    description: "Centered hero with title, supporting text, and action.",
    whenToUse: "When a landing section should feel formal and balanced.",
  }),
  "hero-fullbleed": createBlockVariantDoc({
    title: "Hero fullbleed",
    categoryLabel: "Hero",
    markup: heroHeroFullbleedMarkup,
    usedComponents: heroBlockComponents,
    description: "Hero with content and a full-bleed image treatment.",
    whenToUse: "When imagery should extend beyond the content container.",
  }),
  "hero-image": createBlockVariantDoc({
    title: "Hero image",
    categoryLabel: "Hero",
    markup: heroHeroImageMarkup,
    usedComponents: heroBlockComponents,
    description: "Hero with content beside a right-aligned image.",
    whenToUse: "When the hero needs a clear visual companion without full bleed.",
  }),
  "hero-basic": createBlockVariantDoc({
    title: "Basic hero",
    categoryLabel: "Hero",
    markup: heroHeroMarkup,
    usedComponents: heroBlockComponents,
    description: "Basic left-aligned hero with title, text, and action.",
    whenToUse: "When a page needs a simple introduction and primary action.",
  }),
  "stats-3-statistics": createBlockVariantDoc({
    title: "3 statistics",
    categoryLabel: "Stats",
    markup: statsStats3Markup,
    usedComponents: statsBlockComponents,
    description: "Three side-by-side statistics centred on the page.",
    whenToUse: "When three metrics are enough to support the page narrative.",
  }),
  "stats-4-statistics": createBlockVariantDoc({
    title: "4 statistics",
    categoryLabel: "Stats",
    markup: statsStats4Markup,
    usedComponents: statsBlockComponents,
    description: "Four side-by-side statistics for denser numeric summaries.",
    whenToUse: "When four metrics need equal emphasis.",
  }),
  "stats-5-statistics": createBlockVariantDoc({
    title: "5 statistics",
    categoryLabel: "Stats",
    markup: statsStats5Markup,
    usedComponents: statsBlockComponents,
    description: "Five-column statistics for wider viewports.",
    whenToUse: "When a larger metric set needs to stay in one row on desktop.",
  }),
  "stats-right-6-column": createBlockVariantDoc({
    title: "Statistic right 6 column",
    categoryLabel: "Stats",
    markup: statsStatsRight6Markup,
    usedComponents: statsBlockComponents,
    description: "Right-aligned six-column statistics grouping.",
    whenToUse: "When metrics should sit as a compact panel alongside content.",
  }),
  "stats-right-8-columns": createBlockVariantDoc({
    title: "Statistic right 8 columns",
    categoryLabel: "Stats",
    markup: statsStatsRight8Markup,
    usedComponents: statsBlockComponents,
    description: "Right-aligned eight-column statistics grouping.",
    whenToUse: "When a dense metric group needs more horizontal space.",
  }),
};

const patternDocs: Record<string, PatternDoc> = {
  hero: {
    title: "Hero",
    group: "block templates",
    categoryLabel: "Hero",
    hideFromOverview: true,
    usedComponents: ["sgds-button", "sgds-icon"],
    whenToUse: [
      "At the top of a landing page to communicate the primary value proposition",
      "When you need a strong visual anchor before the main page content",
    ],
    whenNotToUse: [
      "On detail or utility pages where users already know the context",
      "Inside dashboards or data-heavy interfaces",
    ],
    demos: [
      { title: "Default", description: "Left-aligned headline + description + CTA, surface-default background.", markup: heroHeroMarkup },
      { title: "Center", description: "Same hero, content centered horizontally for a more formal feel.", markup: heroHeroCenterMarkup },
      { title: "Image right", description: "50/50 split — content on the left, image on the right.", markup: heroHeroImageMarkup },
      { title: "Full-bleed image right", description: "Content in 6 cols, image absolutely positioned full-bleed on the right.", markup: heroHeroFullbleedMarkup },
      { title: "Background image", description: "Full-cover background image with dark overlay and inverted text.", markup: heroHeroBgImageMarkup },
      { title: "Background image (light)", description: "Light translucent overlay over a background image, with fixed-dark text.", markup: heroHeroBgImageLightMarkup },
    ],
  },
  cards: {
    title: "Cards",
    group: "block templates",
    categoryLabel: "Cards",
    hideFromOverview: true,
    usedComponents: ["sgds-card", "sgds-badge", "sgds-link", "sgds-icon"],
    whenToUse: [
      "To display a collection of items of equal importance",
      "When users need to scan and compare multiple entries",
      "For programme listings, service highlights, or resource collections",
    ],
    whenNotToUse: [
      "When items have a clear hierarchy — use a list instead",
      "When there are fewer than three items to show",
    ],
    demos: [
      { title: "3 columns", description: "3-column grid (3 per row) with overline + section title and clamped card titles.", markup: cardsCards3Markup },
      { title: "4 columns", description: "4-column grid for denser browsing layouts on wider viewports.", markup: cardsCards4Markup },
    ],
  },
  cta: {
    title: "Call to action",
    group: "block templates",
    categoryLabel: "Call to action",
    hideFromOverview: true,
    usedComponents: ["sgds-button"],
    whenToUse: [
      "To convert visitors at the end of a marketing page",
      "To anchor a primary action in the middle of long-form content",
      "To break up content with a focused decision moment",
    ],
    whenNotToUse: [
      "Inside transactional flows where actions belong with the form",
      "When the user is mid-task and shouldn't be redirected",
    ],
    demos: [
      { title: "Contained · primary", description: "Constrained-width CTA on a primary surface, left-aligned.", markup: ctaContainedPrimaryMarkup },
      { title: "Contained · primary · center", description: "Same CTA, content centered.", markup: ctaContainedPrimaryCenterMarkup },
      { title: "Contained · raised", description: "Constrained-width CTA on a raised surface for soft emphasis.", markup: ctaContainedRaisedMarkup },
      { title: "Contained · raised · center", description: "Raised surface, content centered.", markup: ctaContainedRaisedCenterMarkup },
      { title: "Full-bleed · primary", description: "Edge-to-edge primary-coloured CTA section for maximum impact.", markup: ctaFullbleedPrimaryMarkup },
      { title: "Full-bleed · primary · center", description: "Edge-to-edge primary CTA, content centered.", markup: ctaFullbleedPrimaryCenterMarkup },
      { title: "Full-bleed · alternate", description: "Edge-to-edge alternate-surface CTA, lower visual weight.", markup: ctaFullbleedAlternateMarkup },
      { title: "Full-bleed · alternate · center", description: "Edge-to-edge alternate CTA, content centered.", markup: ctaFullbleedAlternateCenterMarkup },
    ],
  },
  feature: {
    title: "Feature",
    group: "block templates",
    categoryLabel: "Feature",
    hideFromOverview: true,
    usedComponents: ["sgds-button", "sgds-card", "sgds-icon"],
    whenToUse: [
      "To showcase a product capability or service benefit",
      "To pair an image or component with descriptive copy in a marketing page",
      "When you need flexible content + visual ratios to balance density and emphasis",
    ],
    whenNotToUse: [
      "For dense data displays — use stat cards or a table",
      "When you need consistent uniform tiles — use the cards block",
    ],
    demos: [
      { title: "4 + 8 · image left", description: "Image in 4 cols, content in 8 cols, image first.", markup: featureFeature48ImgLeftMarkup },
      { title: "4 + 8 · image right", description: "Image in 4 cols, content in 8 cols, image second.", markup: featureFeature48ImgRightMarkup },
      { title: "6 + 6 · image left", description: "Balanced 50/50 split, image first.", markup: featureFeature66ImgLeftMarkup },
      { title: "6 + 6 · image right", description: "Balanced 50/50 split, image second.", markup: featureFeature66ImgRightMarkup },
      { title: "6 + 6 · component left", description: "50/50 split with an SGDS component (not an image) on the left.", markup: featureFeature66ComponentLeftMarkup },
      { title: "6 + 6 · component right", description: "50/50 split with an SGDS component on the right.", markup: featureFeature66ComponentRightMarkup },
      { title: "8 + 4 · image left", description: "Image in 8 cols (dominant), content in 4 cols, image first.", markup: featureFeature84ImgLeftMarkup },
      { title: "8 + 4 · image right", description: "Image in 8 cols (dominant), content in 4 cols, image second.", markup: featureFeature84ImgRightMarkup },
      { title: "Cards below", description: "Section header with feature cards arranged in a row below.", markup: featureFeatureCardsBelowMarkup },
      { title: "No image · center", description: "Headline + description + actions, no image, centered.", markup: featureFeatureNoImgCenterMarkup },
      { title: "No image · left", description: "Headline + description + actions, no image, left-aligned.", markup: featureFeatureNoImgLeftMarkup },
    ],
  },
  filter: {
    title: "Filter",
    group: "block templates",
    categoryLabel: "Filter",
    hideFromOverview: true,
    usedComponents: ["sgds-checkbox", "sgds-checkbox-group", "sgds-link"],
    whenToUse: [
      "On catalogue, search, or admin list pages where users narrow down results",
      "When you have multiple facet groups (status, type, date) that combine independently",
      "When the filter set is stable enough to live in a sidebar",
    ],
    whenNotToUse: [
      "For pages with fewer than ~6 results — filters add noise without value",
      "When filters need to be applied across multi-step flows — use a wizard instead",
    ],
    demos: [
      { title: "Sidebar filter", description: "Faceted filter panel with header, clear-all link, and grouped checkbox controls.", markup: filterFilterMarkup },
    ],
  },
  form: {
    title: "Form",
    group: "block templates",
    usedComponents: formBlockComponents,
    hideFromOverview: true,
    whenToUse: [
      "Whenever a page needs to collect structured input from users",
      "For multi-section forms that benefit from labelled groupings",
      "For wizard-style flows broken into named steps",
    ],
    whenNotToUse: [
      "For a single text query — use an inline search input instead",
      "For decisions that should be a confirmation dialog — use a modal",
    ],
    demos: [
      { title: "All field types", description: "Demonstration form showing every supported field type in one layout.", markup: formAllTypesMarkup },
      { title: "Basic · left", description: "Single-section form, content left-aligned within the page container.", markup: formBasicLeftMarkup },
      { title: "Basic · center", description: "Single-section form centered on the page.", markup: formBasicCenterMarkup },
      { title: "Basic · right", description: "Single-section form right-aligned.", markup: formBasicRightMarkup },
      { title: "Sections · single", description: "One labelled section grouping related fields.", markup: formSectionsSingleMarkup },
      { title: "Sections · two", description: "Two labelled sections separated by spacing.", markup: formSectionsTwoMarkup },
      { title: "Sections · three", description: "Three labelled sections — use for longer forms.", markup: formSectionsThreeMarkup },
      { title: "Multi-step · stepper", description: "Stepper-driven form for transactional flows.", markup: formFormMultistepStepperMarkup },
      { title: "Field types · checkbox", description: "Checkbox + checkbox-group examples, including grouped options.", markup: formFormFieldsCheckboxMarkup },
      { title: "Field types · radio", description: "Radio + radio-group examples.", markup: formFormFieldsRadioMarkup },
      { title: "Field types · select", description: "Select examples for single-value list inputs.", markup: formFormFieldsSelectsMarkup },
      { title: "Field types · textarea", description: "Textarea examples with hint and validation.", markup: formFormFieldsTextareaMarkup },
      { title: "Field types · dates & quantities", description: "Datepicker and quantity-toggle field examples.", markup: formFormFieldsDatesQuantitiesMarkup },
      { title: "Field types · file upload", description: "File upload field examples with drop zone and validation.", markup: formFormFieldsFileUploadMarkup },
      { title: "Full-width fields", description: "Layout where every field spans the form's full width.", markup: formFullwidthOnlyMarkup },
      { title: "Paired fields", description: "Layout pairing fields side-by-side on wider viewports.", markup: formPairedOnlyMarkup },
    ],
  },
  ...formBlockVariantDocs,
  ...blockVariantDocs,
  header: {
    title: "Page header",
    group: "block templates",
    categoryLabel: "Header",
    hideFromOverview: true,
    usedComponents: ["sgds-breadcrumb", "sgds-button", "sgds-icon"],
    whenToUse: [
      "At the top of internal-tool pages and content pages alike",
      "To anchor a page with title, description, and primary actions",
      "When users need breadcrumb context to navigate back up the hierarchy",
    ],
    whenNotToUse: [
      "On marketing pages — use the hero block instead for stronger visual impact",
      "Inside modal dialogs — use the modal's own title slot",
    ],
    demos: [
      { title: "Default", description: "Page header with title, description, and right-aligned action.", markup: headerPageHeaderMarkup },
      { title: "With breadcrumb", description: "Page header with a breadcrumb above the title for hierarchical context.", markup: headerPageHeaderBreadcrumbMarkup },
    ],
  },
  stats: {
    title: "Stats",
    group: "block templates",
    categoryLabel: "Stats",
    hideFromOverview: true,
    usedComponents: ["sgds-icon"],
    whenToUse: [
      "On about pages and reports to highlight quantitative outcomes",
      "On dashboards as a quick at-a-glance KPI summary",
      "When numeric values reinforce a narrative section",
    ],
    whenNotToUse: [
      "When metrics need interaction — use a data table or chart instead",
      "When the trend matters more than the snapshot — use a chart",
    ],
    demos: [
      { title: "3 columns", description: "Three side-by-side stats centred on the page.", markup: statsStats3Markup },
      { title: "4 columns", description: "Four side-by-side stats for denser numeric summaries.", markup: statsStats4Markup },
      { title: "5 columns", description: "Five-column stats — use sparingly on wider viewports.", markup: statsStats5Markup },
      { title: "6 columns · right-aligned", description: "Six-column right-aligned stats grouping for a compact panel.", markup: statsStatsRight6Markup },
      { title: "8 columns · right-aligned", description: "Eight-column right-aligned stats for the densest summaries.", markup: statsStatsRight8Markup },
    ],
  },
  "form-page": {
    title: "Form page",
    group: "page templates",
    categoryLabel: "Forms",
    usedComponents: ["sgds-input", "sgds-select", "sgds-button", "sgds-breadcrumb"],
    whenToUse: [
      "For single-topic forms where all fields can be shown on one screen",
      "When the form is short enough not to need a stepper (under 8 fields)",
    ],
    whenNotToUse: [
      "For multi-step forms — use the stepper page template instead",
      "When the form requires conditional branching based on user answers",
    ],
    demos: [
      {
        title: "Default",
        description: "A simple form page with a heading, description, fields, and submission actions.",
        markup: formPageMarkup,
      },
    ],
  },
  "multi-step-form": {
    title: "Multi-step form",
    group: "page templates",
    categoryLabel: "Forms",
    usedComponents: ["sgds-stepper", "sgds-input", "sgds-button", "sgds-breadcrumb"],
    whenToUse: [
      "When a form has more than 8 fields and benefits from being broken into logical steps",
      "When different sections of the form require different levels of user attention",
      "For complex transactional flows like applications or registrations",
    ],
    whenNotToUse: [
      "For simple forms that fit on one page — use the form page template instead",
    ],
    demos: [
      {
        title: "Default",
        description: "A multi-step form with a stepper indicator, step content, and navigation buttons.",
        markup: multiStepFormPageMarkup,
      },
    ],
  },
  "application-management": {
    title: "Application management",
    group: "page templates",
    categoryLabel: "Browse and manage",
    usedComponents: [
      "sgds-masthead",
      "sgds-mainnav",
      "sgds-breadcrumb",
      "sgds-checkbox-group",
      "sgds-input",
      "sgds-table",
      "sgds-pagination",
      "sgds-button",
      "sgds-footer",
    ],
    whenToUse: [
      "For admin dashboards and management portals that list registered applications or records",
      "When users need sidebar filters together with a searchable, paginated data table",
      "For internal tools where browsing, filtering, and acting on items is the primary task",
    ],
    whenNotToUse: [
      "For citizen-facing catalogues — use the catalogue template instead",
      "For dashboards focused on charts and metrics rather than tabular data",
    ],
    demos: [
      {
        title: "Application list",
        description: "Sidebar filters, search bar, results count, and a paginated table of records.",
        markup: applicationManagementMarkup,
      },
    ],
  },
  catalogue: {
    title: "Catalogue",
    group: "page templates",
    categoryLabel: "Browse and manage",
    usedComponents: [
      "sgds-masthead",
      "sgds-mainnav",
      "sgds-input",
      "sgds-checkbox-group",
      "sgds-select",
      "sgds-card",
      "sgds-pagination",
      "sgds-footer",
    ],
    whenToUse: [
      "For public catalogues of programmes, events, services, or content",
      "When users need search, sidebar filters, sort, and a card-based results grid",
      "For browsing experiences where each item shares the same card structure",
    ],
    whenNotToUse: [
      "For tabular records that admins need to manage — use the application management template",
      "When the result set is small enough to render without filters or pagination",
    ],
    demos: [
      {
        title: "Search and filter",
        description: "Page header with search, sidebar filters, sort dropdown, and a responsive grid of result cards.",
        markup: catalogueMarkup,
      },
    ],
  },
  "about-us": {
    title: "About us",
    group: "page templates",
    categoryLabel: "Content pages",
    usedComponents: [
      "sgds-masthead",
      "sgds-mainnav",
      "sgds-thumbnail-card",
      "sgds-link",
      "sgds-footer",
    ],
    whenToUse: [
      "For agency or product about pages that introduce the team, mission, and impact",
      "When the page combines a headline, supporting imagery, partner logos, and stats",
      "For storytelling pages that anchor a brand without selling a single product",
    ],
    whenNotToUse: [
      "For product launches or campaigns — use the landing page template instead",
      "For long-form articles or case studies — use the blog template instead",
    ],
    demos: [
      {
        title: "Default",
        description: "Two-column headline, image grid, animated logo strip, and an achievements stats panel.",
        markup: aboutUsMarkup,
      },
    ],
  },
  landing: {
    title: "Landing page",
    group: "page templates",
    categoryLabel: "Landing pages",
    usedComponents: [
      "sgds-masthead",
      "sgds-mainnav",
      "sgds-button",
      "sgds-card",
      "sgds-link",
      "sgds-footer",
    ],
    whenToUse: [
      "For product or service launch pages with a clear primary call to action",
      "When you need a hero section followed by features, stats, and a closing CTA",
      "For campaign pages that introduce a new initiative to the public",
    ],
    whenNotToUse: [
      "For internal tools or admin portals — use a dashboard or management template",
      "For long-form storytelling — use the blog template instead",
    ],
    demos: [
      {
        title: "Default",
        description: "Hero with headline and CTAs, life-moments feature cards, stats row, and a closing call to action.",
        markup: landingMarkup,
      },
    ],
  },
  blog: {
    title: "Blog",
    group: "page templates",
    categoryLabel: "Content pages",
    usedComponents: [
      "sgds-masthead",
      "sgds-mainnav",
      "sgds-breadcrumb",
      "sgds-button",
      "sgds-footer",
    ],
    whenToUse: [
      "For long-form content like blog posts, news articles, success stories, or case studies",
      "When the page needs a clear hierarchy of headline, body sections, and supporting stats",
      "For editorial pages anchored by a breadcrumb and overline tag",
    ],
    whenNotToUse: [
      "For task-driven pages — use a form, dashboard, or management template instead",
      "For brand or product introductions — use the about us or landing template",
    ],
    demos: [
      {
        title: "Success story",
        description: "Breadcrumb, article header, body sections with sub-headings, results stats, and a closing CTA.",
        markup: blogMarkup,
      },
    ],
  },
};

const templateGroupLabel: Record<PatternGroup, string> = {
  "page templates": "Page template",
  "block templates": "Block template",
};

const templateGroupTitle: Record<PatternGroup, string> = {
  "page templates": "Page templates",
  "block templates": "Block templates",
};

const templateGroupDescription: Record<PatternGroup, string> = {
  "page templates": "Complete page layouts for common SGDS product flows.",
  "block templates": "Reusable page sections that can be composed into larger SGDS experiences.",
};

const getPatternHref = (key: string, group: PatternGroup) => {
  if (group === "block templates") return `/blocks/${key}`;
  return `/templates/page-templates/${key}`;
};

const getPatternPreviewHref = (key: string, group: PatternGroup) => {
  if (group === "block templates") return `/blocks/preview/${key}`;
  return `/templates/page-templates/preview/${key}`;
};

export const templateOverviewGroups: TemplateOverviewGroup[] = ([
  "page templates",
  "block templates",
] as PatternGroup[]).map((group) => ({
  group,
  title: templateGroupTitle[group],
  description: templateGroupDescription[group],
  items: Object.entries(patternDocs)
    .filter(([, doc]) => doc.group === group && !doc.hideFromOverview)
    .map(([key, doc]) => ({
      key,
      title: doc.title,
      description: doc.demos[0]?.description || doc.whenToUse[0] || `${doc.title} template.`,
      href: getPatternHref(key, doc.group),
      previewHref: getPatternPreviewHref(key, doc.group),
      group: doc.group,
      groupLabel: doc.categoryLabel ?? templateGroupLabel[doc.group],
      demoCount: doc.demos.length,
      usedComponents: doc.usedComponents,
    })),
}));

const buildPatternPurposeCards = (doc: PatternDoc) => [
  {
    title: "Support the page structure",
    description:
      doc.whenToUse[0] ||
      `${doc.title} helps organise content with a reusable SGDS pattern.`,
  },
  {
    title: "Keep the layout consistent",
    description:
      doc.whenToUse[1] ||
      "Use the same SGDS building blocks to keep spacing, hierarchy, and interaction patterns predictable.",
  },
  {
    title: "Use it intentionally",
    description:
      doc.whenNotToUse?.[0] ||
      "Choose this pattern only when its structure fits the task better than a simpler page section.",
  },
];

const buildPatternAnatomyParts = (doc: PatternDoc) =>
  (doc.usedComponents.length ? doc.usedComponents : ["sgds-container"]).map((component, index) => ({
    number: index + 1,
    title: component,
    note: "(used)",
  }));

const buildPatternGuidance = (doc: PatternDoc) => {
  const guidance = [
    {
      title: "When to use",
      tone: "do" as const,
      items: doc.whenToUse,
    },
  ];

  if (doc.whenNotToUse?.length) {
    guidance.push({
      title: "When not to use",
      tone: "dont" as const,
      items: doc.whenNotToUse,
    });
  }

  return guidance;
};

const buildPatternBestPractices = (doc: PatternDoc) =>
  (doc.bestPractices ?? []).map((practice) => ({
    title: practice.title,
    tone: practice.tone,
    description: practice.items.join(" "),
    markup: doc.demos[0]?.markup || `<div></div>`,
  }));

const buildPatternAccessibilitySections = (doc: PatternDoc) => {
  const previewMarkup = doc.demos[0]?.markup || `<div></div>`;

  return [
    {
      title: "Keyboard support",
      description: [
        `Use the SGDS components inside the ${doc.title.toLowerCase()} pattern so keyboard behaviour stays predictable.`,
        "Check focus order and action placement in the surrounding page context, especially when the pattern groups multiple interactive elements together.",
      ],
      items: [],
      markup: previewMarkup,
    },
    {
      title: "Tab order",
      description: [],
      items: [
        "Move focus into the pattern.",
        "Navigate through interactive elements in visual order.",
        "Confirm any revealed or supporting content remains reachable.",
        "Continue to the next interactive element on the page.",
      ],
      markup: previewMarkup,
    },
  ];
};

const buildPatternUpdates = (doc: PatternDoc) => ({
  updates: {
    title: "Updates",
    columns: ["Date", "Version", "Description"],
    rows: [
      {
        Date: "TBD",
        Version: "TBD",
        Description: `${doc.title} pattern updates will be documented here.`,
      },
    ],
  },
  roadmap: {
    title: "Roadmap",
    columns: ["Planned item", "Status", "Target"],
    rows: [
      {
        "Planned item": `Future improvements for ${doc.title.toLowerCase()}`,
        Status: "Planned",
        Target: "TBD",
      },
    ],
  },
  feedback: {
    title: "Feedback",
    heading: "Have suggestions or feedback?",
    prefix: "Share them with us on ",
    linkLabel: "Slack → #ask-sgds-v3",
    href: "https://govtech.slack.com/archives/C07VD8Z5QKS",
  },
  bugReports: {
    title: "Bug Reports",
    heading: "Found a bug or issue?",
    prefix: "Report it on GitHub ",
    linkLabel: `Issues → sgds/templates/${doc.title.toLowerCase().replace(/\s+/g, "-")}`,
    href: "#",
  },
});

export function getPatternDoc(key: string): ResolvedComponentDoc | null {
  const doc = patternDocs[key];
  if (!doc) return null;

  return {
    key,
    title: doc.title,
    summary:
      doc.whenToUse[0] ||
      doc.demos[0]?.description ||
      `${doc.title} is an SGDS pattern for building structured interfaces.`,
    tag: "div",
    group: "layout",
    demos: doc.demos,
    purposeCards: buildPatternPurposeCards(doc),
    anatomyMarkup: doc.demos[0]?.markup,
    resolvedAnatomyParts: buildPatternAnatomyParts(doc),
    usage: {
      guidance: buildPatternGuidance(doc),
      behaviours: doc.demos.map((demo) => ({
        ...demo,
        surface: "default",
      })),
      bestPractices: buildPatternBestPractices(doc),
    },
    accessibility: {
      sections: buildPatternAccessibilitySections(doc),
      keyboardInteractions: [
        {
          key: "Tab",
          description: `Moves focus through the interactive elements inside the ${doc.title.toLowerCase()} pattern.`,
        },
        {
          key: "Shift + Tab",
          description: "Moves focus to the previous interactive element.",
        },
        {
          key: "Enter",
          description: "Activates the focused action or confirms the current selection when supported.",
        },
        {
          key: "Space",
          description: "Activates focused controls when the contained SGDS component supports toggling or selection.",
        },
      ],
    },
    updates: buildPatternUpdates(doc),
    props: [],
    measurements: [],
    metadataStatus: {
      figma: "available",
      responsive: "unavailable",
      storybook: "unavailable",
    },
  };
}
