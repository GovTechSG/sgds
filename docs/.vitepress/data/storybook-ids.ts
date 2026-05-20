/**
 * Maps template/block keys to their Storybook story IDs.
 * Used by TemplatePreview and TemplatePreviewToolbar to construct Storybook URLs.
 */

export const STORYBOOK_BASE_URL = "https://www.webcomponent.designsystem.tech.gov.sg";

// In local dev, use the Vite proxy path to bypass CSP frame-ancestors restriction.
// In production, the docs portal is on *.designsystem.tech.gov.sg which is allowed by CSP.
const STORYBOOK_IFRAME_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "/__storybook"
    : STORYBOOK_BASE_URL;

export const storybookStoryIds: Record<string, string> = {
  "template:about-us": "templates-about-us-basic--basic",
  "template:application-management": "templates-application-management-application-list--application-list",
  "template:blog": "templates-blog-success-story--success-story",
  "template:catalogue": "templates-catalogue-search-filter--search-and-filter",
  "template:form-page": "templates-form-basic--basic",
  "template:landing": "templates-landing-basic--basic",
  "template:multi-step-form": "templates-form-multi-step-form--multi-step-form",
  "template:report-issue": "templates-form-report-issue--report-issue",
  "block:cards": "blocks-cards--cards-3",
  "block:cards-3-per-column": "blocks-cards--cards-3",
  "block:cards-4-per-column": "blocks-cards--cards-4",
  "block:cta": "blocks-call-to-action-contained-primary--default",
  "block:cta-contained-primary-center": "blocks-call-to-action-contained-primary-center--default",
  "block:cta-contained-primary": "blocks-call-to-action-contained-primary--default",
  "block:cta-contained-raised-center": "blocks-call-to-action-contained-raised-center--default",
  "block:cta-contained-raised": "blocks-call-to-action-contained-raised--default",
  "block:cta-full-bleed-alternate-center": "blocks-call-to-action-full-bleed-alternate-center--default",
  "block:cta-full-bleed-alternate": "blocks-call-to-action-full-bleed-alternate--default",
  "block:cta-full-bleed-primary-center": "blocks-call-to-action-full-bleed-primary-center--default",
  "block:cta-full-bleed-primary": "blocks-call-to-action-full-bleed-primary--default",
  "block:feature": "blocks-feature--feature-image-left-48",
  "block:feature-image-left-4-8": "blocks-feature--feature-image-left-48",
  "block:feature-image-right-4-8": "blocks-feature--feature-image-right-48",
  "block:feature-component-left-6-6": "blocks-feature--feature-component-left-66",
  "block:feature-component-right-6-6": "blocks-feature--feature-component-right-66",
  "block:feature-image-left-6-6": "blocks-feature--feature-image-left-66",
  "block:feature-image-right-6-6": "blocks-feature--feature-image-right-66",
  "block:feature-image-left-8-4": "blocks-feature--feature-image-left-84",
  "block:feature-image-right-8-4": "blocks-feature--feature-image-right-84",
  "block:feature-cards-below": "blocks-feature--feature-cards-below",
  "block:feature-no-image-center": "blocks-feature--feature-no-image-center",
  "block:feature-no-image-left": "blocks-feature--feature-no-image-left",
  "block:filter": "blocks-filter--filter-checkboxes",
  "block:filter-checkboxes": "blocks-filter--filter-checkboxes",
  "block:form-all-types": "blocks-form--all-types",
  "block:form-basic-center": "blocks-form--basic-center",
  "block:form-basic-left": "blocks-form--basic-left",
  "block:form-basic-right": "blocks-form--basic-right",
  "block:form-fields-checkbox": "blocks-form--form-fields-checkbox",
  "block:form-fields-dates-quantities": "blocks-form--form-fields-dates-quantities",
  "block:form-fields-file-upload": "blocks-form--form-fields-file-upload",
  "block:form-fields-radio": "blocks-form--form-fields-radio",
  "block:form-fields-selects": "blocks-form--form-fields-selects",
  "block:form-fields-textarea": "blocks-form--form-fields-textarea",
  "block:form-multi-step": "blocks-form--form-multistep-stepper",
  "block:form-full-width-only": "blocks-form--fullwidth-only",
  "block:form-paired-only": "blocks-form--paired-only",
  "block:form-sections-single": "blocks-form--sections-single",
  "block:form-sections-three": "blocks-form--sections-three",
  "block:form-sections-two": "blocks-form--sections-two",
  "block:header": "blocks-header--page-header",
  "block:header-page-header-with-breadcrumb": "blocks-header--page-header-with-breadcrumb",
  "block:header-page-header": "blocks-header--page-header",
  "block:hero": "blocks-hero--hero",
  "block:hero-background-image-light": "blocks-hero--hero-bg-image-light",
  "block:hero-background-image": "blocks-hero--hero-bg-image",
  "block:hero-center": "blocks-hero--hero-center",
  "block:hero-fullbleed": "blocks-hero--hero-fullbleed",
  "block:hero-image": "blocks-hero--hero-image",
  "block:hero-basic": "blocks-hero--hero",
  "block:stats": "blocks-stats--stats-3",
  "block:stats-3-statistics": "blocks-stats--stats-3",
  "block:stats-4-statistics": "blocks-stats--stats-4",
  "block:stats-5-statistics": "blocks-stats--stats-5",
  "block:stats-right-6-column": "blocks-stats--stats-right-6",
  "block:stats-right-8-columns": "blocks-stats--stats-right-8",
};

/**
 * Build the Storybook embed URL for a given template/block key.
 * Uses the toolbar embed format: ?path=/story/{id}&full=1&shortcuts=false&singleStory=true
 */
export function getStorybookIframeUrl(kind: "template" | "block", key: string): string {
  const storyId = storybookStoryIds[`${kind}:${key}`];
  if (!storyId) return "";

  const params = new URLSearchParams({
    path: `/story/${storyId}`,
    full: "1",
    shortcuts: "false",
    singleStory: "true",
  });

  return `${STORYBOOK_IFRAME_BASE}/?${params.toString()}`;
}

/**
 * Build the full Storybook page URL (with sidebar/UI) for a given template/block key.
 */
export function getStorybookPageUrl(kind: "template" | "block", key: string): string {
  const storyId = storybookStoryIds[`${kind}:${key}`];
  return storyId
    ? `${STORYBOOK_BASE_URL}/?path=/story/${storyId}`
    : `${STORYBOOK_BASE_URL}/`;
}
