<script setup lang="ts">
import { computed, ref, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    code: string;
    lang?: string;
    filename?: string;
    hideLineNumbers?: boolean;
    prompt?: boolean;
    wrap?: boolean;
    codeRegionClass?: string;
  }>(),
  { lang: "html", hideLineNumbers: false, prompt: false, wrap: false },
);

const slots = useSlots();
const hasSlotContent = computed(() => !!slots.default);

const copied = ref(false);

async function copy() {
  await navigator.clipboard.writeText(props.code);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

// ─── Tokenizer ──────────────────────────────────────────────────────────────
// Each tok() call splits on \n so that no <span> ever crosses a line boundary.
// This means the highlighted string can be safely split by \n to get per-line
// HTML without breaking any open tags.

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tok(text: string, cls: string): string {
  return text
    .split("\n")
    .map((line) => `<span class="cb-${cls}">${escHtml(line)}</span>`)
    .join("\n");
}

// ── HTML / Vue ──────────────────────────────────────────────────────────────
function highlightHtml(code: string): string {
  let out = "";
  let i = 0;

  while (i < code.length) {
    // Vue mustache: {{ ... }}
    if (code.startsWith("{{", i)) {
      const end = code.indexOf("}}", i + 2);
      const close = end === -1 ? code.length - 2 : end;
      out += tok("{{", "vue-brace");
      out += escHtml(code.slice(i + 2, close));
      out += tok("}}", "vue-brace");
      i = close + 2;
      continue;
    }

    // HTML comment: <!-- ... -->
    if (code.startsWith("<!--", i)) {
      const end = code.indexOf("-->", i + 4);
      const close = end === -1 ? code.length - 3 : end + 3;
      out += tok(code.slice(i, close), "comment");
      i = close;
      continue;
    }

    // Opening or closing tag
    if (
      code[i] === "<" &&
      i + 1 < code.length &&
      (code[i + 1] === "/" || /[a-zA-Z!]/.test(code[i + 1]))
    ) {
      const { html, end } = tokenizeTag(code, i);
      out += html;
      i = end;
      continue;
    }

    // Plain text — advance to next special character
    let j = i + 1;
    while (j < code.length) {
      const c = code[j];
      if (c === "<" || code.startsWith("{{", j) || code.startsWith("<!--", j))
        break;
      j++;
    }
    out += escHtml(code.slice(i, j));
    i = j;
  }

  return out;
}

function tokenizeTag(
  code: string,
  start: number,
): { html: string; end: number } {
  let out = "";
  let i = start + 1; // skip '<'

  const isClose = code[i] === "/";
  out += tok(isClose ? "</" : "<", "punct");
  if (isClose) i++;

  // tag name
  const nm = code.slice(i).match(/^[a-zA-Z][a-zA-Z0-9-]*/);
  if (nm) {
    out += tok(nm[0], "tag");
    i += nm[0].length;
  }

  // attributes until > or />
  while (i < code.length && code[i] !== ">") {
    if (code[i] === "/" && code[i + 1] === ">") {
      out += tok("/>", "punct");
      return { html: out, end: i + 2 };
    }

    // whitespace / newlines — pass through as-is
    const ws = code.slice(i).match(/^[\s]+/);
    if (ws) {
      out += escHtml(ws[0]);
      i += ws[0].length;
      continue;
    }

    // Vue / shorthand binding: :prop, @event, v-directive, #slot
    const vueAttr = code.slice(i).match(/^(?:[:@#]|v-)[\w.:-]*/);
    if (vueAttr) {
      out += tok(vueAttr[0], "vue-attr");
      i += vueAttr[0].length;
      continue;
    }

    // Regular attribute name
    const attrNm = code.slice(i).match(/^[a-zA-Z_][\w-]*/);
    if (attrNm) {
      out += tok(attrNm[0], "attr");
      i += attrNm[0].length;
      continue;
    }

    // = sign
    if (code[i] === "=") {
      out += tok("=", "punct");
      i++;
      continue;
    }

    // Quoted attribute value
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q) {
        if (code[j] === "\\") j++;
        j++;
      }
      out += tok(code.slice(i, j + 1), "string");
      i = j + 1;
      continue;
    }

    out += escHtml(code[i]);
    i++;
  }

  if (code[i] === ">") {
    out += tok(">", "punct");
    i++;
  }

  return { html: out, end: i };
}

// ── JavaScript / TypeScript ─────────────────────────────────────────────────
const JS_KEYWORDS = new Set([
  "import", "from", "export", "default", "const", "let", "var", "function",
  "class", "extends", "return", "if", "else", "for", "while", "do", "switch",
  "case", "break", "continue", "new", "typeof", "instanceof", "in", "of",
  "try", "catch", "finally", "throw", "async", "await", "yield", "static",
  "get", "set", "this", "super", "null", "undefined", "true", "false",
  // TypeScript
  "type", "interface", "enum", "namespace", "declare", "as", "satisfies",
  "readonly", "abstract", "override", "implements",
]);

function highlightJs(code: string): string {
  let out = "";
  let i = 0;

  while (i < code.length) {
    // Line comment
    if (code.startsWith("//", i)) {
      const end = code.indexOf("\n", i);
      const comment = end === -1 ? code.slice(i) : code.slice(i, end);
      out += tok(comment, "comment");
      i += comment.length;
      continue;
    }

    // Block comment
    if (code.startsWith("/*", i)) {
      const end = code.indexOf("*/", i + 2);
      const comment = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      out += tok(comment, "comment");
      i += comment.length;
      continue;
    }

    // Template literal
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && code[j] !== "`") {
        if (code[j] === "\\") j++;
        j++;
      }
      out += tok(code.slice(i, j + 1), "string");
      i = j + 1;
      continue;
    }

    // String
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q && code[j] !== "\n") {
        if (code[j] === "\\") j++;
        j++;
      }
      out += tok(code.slice(i, j + 1), "string");
      i = j + 1;
      continue;
    }

    // Number
    const numM = code.slice(i).match(/^\d+(\.\d+)?([eE][+-]?\d+)?/);
    if (numM && !/[a-zA-Z_$]/.test(code[i - 1] ?? " ")) {
      out += tok(numM[0], "number");
      i += numM[0].length;
      continue;
    }

    // Identifier / keyword
    const idM = code.slice(i).match(/^[a-zA-Z_$][\w$]*/);
    if (idM) {
      const word = idM[0];
      if (JS_KEYWORDS.has(word)) {
        out += tok(word, "keyword");
      } else if (/^[A-Z]/.test(word)) {
        out += tok(word, "type");
      } else {
        out += escHtml(word);
      }
      i += word.length;
      continue;
    }

    // Punctuation / operators
    const opM = code.slice(i).match(/^[=><!+\-*/%&|^~?:.;,()[\]{}]+/);
    if (opM) {
      out += tok(opM[0], "punct");
      i += opM[0].length;
      continue;
    }

    out += escHtml(code[i]);
    i++;
  }
  return out;
}

// ── CSS ─────────────────────────────────────────────────────────────────────
function highlightCss(code: string): string {
  let out = "";
  let i = 0;

  while (i < code.length) {
    // Block comment
    if (code.startsWith("/*", i)) {
      const end = code.indexOf("*/", i + 2);
      const comment = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      out += tok(comment, "comment");
      i += comment.length;
      continue;
    }

    // String
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q) j++;
      out += tok(code.slice(i, j + 1), "string");
      i = j + 1;
      continue;
    }

    // CSS custom property: --some-token
    const varM = code.slice(i).match(/^--[\w-]+/);
    if (varM) {
      out += tok(varM[0], "css-var");
      i += varM[0].length;
      continue;
    }

    // At-rule
    if (code[i] === "@") {
      const atM = code.slice(i).match(/^@[\w-]+/);
      if (atM) {
        out += tok(atM[0], "keyword");
        i += atM[0].length;
        continue;
      }
    }

    // Property: word followed by optional whitespace then colon
    const propM = code.slice(i).match(/^([\w-]+)(\s*)(:)(?!:)/);
    if (propM && !/[.#:[\]{(,>~+]/.test(code[i - 1] ?? " ")) {
      out +=
        tok(propM[1], "css-prop") +
        escHtml(propM[2]) +
        tok(propM[3], "punct");
      i += propM[0].length;
      continue;
    }

    // Number + optional unit
    const numM = code
      .slice(i)
      .match(/^-?\d+(\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|s|ms|deg|ch)?/);
    if (numM && !/[a-zA-Z_-]/.test(code[i - 1] ?? " ")) {
      out += tok(numM[0], "number");
      i += numM[0].length;
      continue;
    }

    // Braces / punctuation
    if ("{}:;,".includes(code[i])) {
      out += tok(code[i], "punct");
      i++;
      continue;
    }

    out += escHtml(code[i]);
    i++;
  }
  return out;
}

// ── Bash / shell ─────────────────────────────────────────────────────────────
function highlightBash(code: string): string {
  let out = "";
  let i = 0;

  while (i < code.length) {
    // Comment
    if (code[i] === "#") {
      const end = code.indexOf("\n", i);
      const comment = end === -1 ? code.slice(i) : code.slice(i, end);
      out += tok(comment, "comment");
      i += comment.length;
      continue;
    }

    // String
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length && code[j] !== q) {
        if (code[j] === "\\") j++;
        j++;
      }
      out += tok(code.slice(i, j + 1), "string");
      i = j + 1;
      continue;
    }

    // Flags: -flag or --flag
    const flagM = code.slice(i).match(/^--?[\w-]+/);
    if (flagM && (code[i - 1] === " " || i === 0)) {
      out += tok(flagM[0], "attr");
      i += flagM[0].length;
      continue;
    }

    out += escHtml(code[i]);
    i++;
  }
  return out;
}

// ── Dispatch ─────────────────────────────────────────────────────────────────
const highlightedLines = computed<string[]>(() => {
  const lang = (props.lang ?? "html").toLowerCase();
  const raw = props.code.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  let highlighted: string;
  if (lang === "html" || lang === "vue") highlighted = highlightHtml(raw);
  else if (["js", "javascript", "ts", "typescript", "jsx", "tsx", "json"].includes(lang))
    highlighted = highlightJs(raw);
  else if (["css", "scss", "less"].includes(lang))
    highlighted = highlightCss(raw);
  else if (["bash", "shell", "sh", "zsh"].includes(lang))
    highlighted = highlightBash(raw);
  else highlighted = escHtml(raw);

  return highlighted.split("\n");
});

const isBash = computed(() => ["bash", "shell", "sh", "zsh"].includes((props.lang ?? "").toLowerCase()));

const langLabel = computed(() => {
  const l = (props.lang ?? "").toLowerCase();
  const map: Record<string, string> = {
    js: "JavaScript", javascript: "JavaScript", jsx: "JSX",
    ts: "TypeScript", typescript: "TypeScript", tsx: "TSX",
    html: "HTML", vue: "Vue",
    css: "CSS", scss: "SCSS", less: "LESS",
    bash: "Bash", shell: "Shell", sh: "Shell", zsh: "Zsh",
    json: "JSON",
  };
  return map[l] ?? props.lang ?? "";
});
</script>

<template>
  <div :class="['sgds:bg-surface-default sgds:border sgds:border-muted sgds:rounded-xl sgds:box-border sgds:overflow-hidden sgds:w-full', prompt ? 'sgds:max-w-full sgds:min-w-0' : 'sgds:font-mono']">
    <!-- Header -->
    <div class="sgds:flex sgds:items-center sgds:bg-surface-default sgds:border-b sgds:border-muted sgds:gap-md sgds:justify-between sgds:min-h-[2.75rem] sgds:py-0 sgds:pl-[1rem] sgds:pr-[0.75rem]">
      <span class="sgds:text-default sgds:font-mono sgds:text-body-sm sgds:font-regular sgds:tracking-[0.04em] sgds:leading-none sgds:uppercase sgds:select-none">{{ filename ?? (prompt ? 'Example prompt' : langLabel) }}</span>
      <sgds-button
        size="xs"
        variant="ghost"
        tone="neutral"
        :ariaLabel="copied ? 'Copied!' : (prompt ? 'Copy prompt' : 'Copy code')"
        @click="copy"
      >
        <sgds-icon :name="copied ? 'check' : 'files'" size="sm" slot="leftIcon"></sgds-icon>
        {{ copied ? "Copied" : "Copy" }}
      </sgds-button>
    </div>

    <!-- Prompt area -->
    <div v-if="prompt" class="cb-prompt-text sgds:text-default sgds:text-body-sm sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:m-0 sgds:min-w-0 sgds:w-full sgds:max-w-full sgds:whitespace-pre-wrap sgds:break-words sgds:[overflow-wrap:anywhere] sgds:py-[1rem] sgds:px-[1rem]" tabindex="0">
      <slot v-if="hasSlotContent" />
      <template v-else>{{ code }}</template>
    </div>

    <!-- Code area -->
    <div v-else class="sgds:overflow-x-auto sgds:py-[1rem]" aria-label="Code example" tabindex="0">
      <table class="sgds:min-w-full sgds:[border-collapse:collapse]">
        <tbody>
          <tr
            v-for="(line, idx) in highlightedLines"
            :key="idx"
            class="sgds:leading-[1.6]"
          >
            <td v-if="!hideLineNumbers || isBash" class="sgds:bg-surface-default sgds:border-r sgds:border-muted sgds:text-subtle sgds:font-mono sgds:text-body-sm sgds:w-[2rem] sgds:px-[0.75rem] sgds:text-right sgds:select-none sgds:align-top" aria-hidden="true">{{ isBash ? '$' : idx + 1 }}</td>
            <!-- v-html is safe: content is produced by our own escHtml + tok pipeline above -->
            <td :class="['sgds:text-default sgds:font-mono sgds:text-body-sm sgds:pl-[0.75rem] sgds:pr-[1rem] sgds:align-top', wrap ? 'sgds:whitespace-pre-wrap sgds:break-words sgds:[overflow-wrap:anywhere]' : 'sgds:whitespace-pre']" v-html="line || ' '" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* Prompt text wrapping — applied via v-html slots, must remain as CSS */
.cb-prompt-text {
  max-width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  white-space: normal;
  word-break: normal;
}

/* Global selector targeting slotted p elements inside prompt — requires descendant combinator */
.cb-prompt-text p {
  margin: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

/* Syntax token colours — applied via v-html, must remain as CSS */
.cb-keyword    { color: var(--sgds-warning-color-default); }
.cb-string     { color: var(--sgds-accent-color-default); }
.cb-comment    { color: var(--sgds-color-subtle); font-style: italic; }
.cb-tag        { color: var(--sgds-color-default); }
.cb-attr       { color: var(--sgds-cyan-color-default); }
.cb-vue-attr   { color: #ffa657; }
.cb-vue-brace  { color: #e2c08d; }
.cb-number     { color: #ffa657; }
.cb-type       { color: var(--sgds-purple-color-default); }
.cb-css-prop   { color: #79c0ff; }
.cb-css-var    { color: #a5d6ff; }
.cb-punct      { color: var(--sgds-color-subtle); }
</style>
