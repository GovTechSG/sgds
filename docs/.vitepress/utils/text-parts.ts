/**
 * Splits prose into a sequence of code/text parts so prop names and attribute
 * tokens (e.g. `role="tooltip"`, `hasFeedback`, `aria-modal`) render with the
 * same code styling as design tokens.
 *
 * Detected as code:
 *   - Backtick-wrapped fragments: `hasFeedback`
 *   - HTML/component attribute fragments: prop="value", prop='value', prop=value
 * Detected as links:
 *   - Markdown links: [label](/path)
 */
const propAttributePattern = /^[a-zA-Z][\w-]*=(?:"[^"]+"|'[^']+'|[A-Za-z0-9_-]+)$/;
const markdownLinkPattern = /^\[([^\]]+)\]\(([^)]+)\)$/;

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const inlineCodePattern = (codeTerms: readonly string[] = []) => {
  const termPattern = codeTerms.length
    ? `|\\b(?:${codeTerms.map(escapeRegExp).join("|")})\\b`
    : "";

  return new RegExp(
    `(\\[[^\\]]+\\]\\([^)]+\\)|\`[^\`]+\`|\\b[a-zA-Z][\\w-]*=(?:"[^"]+"|'[^']+'|[A-Za-z0-9_-]+)${termPattern})`,
    "g",
  );
};

export type TextPart = {
  isCode: boolean;
  text: string;
  href?: string;
};

export const textParts = (text: string, codeTerms: readonly string[] = []): TextPart[] => {
  const codeTermSet = new Set(codeTerms);

  return text
    .split(inlineCodePattern(codeTerms))
    .filter(Boolean)
    .map((part) => {
      const markdownLinkMatch = part.match(markdownLinkPattern);
      if (markdownLinkMatch) {
        return {
          isCode: false,
          text: markdownLinkMatch[1],
          href: markdownLinkMatch[2],
        };
      }

      const isBacktickCode = part.startsWith("`") && part.endsWith("`");
      const isPropCode = propAttributePattern.test(part);
      const isCodeTerm = codeTermSet.has(part);
      return {
        isCode: isBacktickCode || isPropCode || isCodeTerm,
        text: isBacktickCode ? part.slice(1, -1) : part,
      };
    });
};
