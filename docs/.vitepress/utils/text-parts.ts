/**
 * Splits prose into a sequence of code/text parts so prop names and attribute
 * tokens (e.g. `role="tooltip"`, `hasFeedback`, `aria-modal`) render with the
 * same code styling as design tokens.
 *
 * Detected as code:
 *   - Backtick-wrapped fragments: `hasFeedback`
 *   - HTML/component attribute fragments: prop="value", prop='value', prop=value
 */
const inlineCodePattern = /(`[^`]+`|\b[a-zA-Z][\w-]*=(?:"[^"]+"|'[^']+'|[A-Za-z0-9_-]+))/g;
const propAttributePattern = /^[a-zA-Z][\w-]*=(?:"[^"]+"|'[^']+'|[A-Za-z0-9_-]+)$/;

export type TextPart = {
  isCode: boolean;
  text: string;
};

export const textParts = (text: string): TextPart[] =>
  text
    .split(inlineCodePattern)
    .filter(Boolean)
    .map((part) => {
      const isBacktickCode = part.startsWith("`") && part.endsWith("`");
      const isPropCode = propAttributePattern.test(part);
      return {
        isCode: isBacktickCode || isPropCode,
        text: isBacktickCode ? part.slice(1, -1) : part,
      };
    });
