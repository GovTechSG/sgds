<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    code: string;
    lang?: string;
    filename?: string;
  }>(),
  { lang: "html" },
);

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
  else if (["js", "javascript", "ts", "typescript"].includes(lang))
    highlighted = highlightJs(raw);
  else if (["css", "scss", "less"].includes(lang))
    highlighted = highlightCss(raw);
  else if (["bash", "shell", "sh", "zsh"].includes(lang))
    highlighted = highlightBash(raw);
  else highlighted = escHtml(raw);

  return highlighted.split("\n");
});

const langLabel = computed(() => {
  const l = (props.lang ?? "").toLowerCase();
  const map: Record<string, string> = {
    js: "JavaScript", javascript: "JavaScript",
    ts: "TypeScript", typescript: "TypeScript",
    html: "HTML", vue: "Vue",
    css: "CSS", scss: "SCSS", less: "LESS",
    bash: "Bash", shell: "Shell", sh: "Shell", zsh: "Zsh",
    json: "JSON",
  };
  return map[l] ?? props.lang ?? "";
});
</script>

<template>
  <div class="cb-root">
    <!-- Header -->
    <div class="cb-header">
      <span class="cb-label">{{ filename ?? langLabel }}</span>
      <button
        class="cb-copy"
        :aria-label="copied ? 'Copied!' : 'Copy code'"
        @click="copy"
      >
        <sgds-icon :name="copied ? 'check' : 'copy'" size="sm" />
        <span class="cb-copy-text">{{ copied ? "Copied" : "Copy" }}</span>
      </button>
    </div>

    <!-- Code area -->
    <div class="cb-body" role="region" aria-label="Code example">
      <table class="cb-table">
        <tbody>
          <tr
            v-for="(line, idx) in highlightedLines"
            :key="idx"
            class="cb-row"
          >
            <td class="cb-ln" aria-hidden="true">{{ idx + 1 }}</td>
            <!-- v-html is safe: content is produced by our own escHtml + tok pipeline above -->
            <td class="cb-code" v-html="line || ' '" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* ── Fixed dark theme ──────────────────────────────────────────────────────────
   CodeBlock must always appear dark regardless of the site day/night palette.
   Using SGDS semantic tokens for "surface" would yield a near-white background
   in day mode, defeating the IDE aesthetic. Hardcoded GitHub Dark values are
   intentional here. All other properties use SGDS tokens where applicable.
────────────────────────────────────────────────────────────────────────────── */

.cb-root {
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: var(--sgds-border-radius-xl);
  font-family: var(--sgds-font-family-mono, ui-monospace, "SFMono-Regular", Menlo, monospace);
  overflow: hidden;
  width: 100%;
}

/* Header */
.cb-header {
  align-items: center;
  background: #161b22;
  border-bottom: 1px solid #30363d;
  display: flex;
  gap: var(--sgds-gap-md);
  justify-content: space-between;
  min-height: 2.75rem;
  padding: 0 0.75rem 0 1rem;
}

.cb-label {
  color: #8b949e;
  font-family: var(--sgds-font-family-mono, ui-monospace, monospace);
  font-size: 0.75rem;
  font-weight: var(--sgds-font-weight-regular);
  letter-spacing: 0.04em;
  line-height: 1;
  text-transform: uppercase;
  user-select: none;
}

/* Copy button */
.cb-copy {
  align-items: center;
  appearance: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--sgds-border-radius-md);
  color: #8b949e;
  cursor: pointer;
  display: flex;
  font-family: var(--sgds-font-family-brand);
  font-size: 0.75rem;
  gap: 0.3rem;
  line-height: 1;
  padding: 0.3rem 0.5rem;
  transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
}

.cb-copy:hover {
  background: #21262d;
  border-color: #30363d;
  color: #c9d1d9;
}

.cb-copy:focus-visible {
  outline: 2px solid var(--sgds-outline-focus, #0d6efd);
  outline-offset: 2px;
}

/* Code body */
.cb-body {
  overflow-x: auto;
  padding: 1rem 0;
}

.cb-table {
  border-collapse: collapse;
  min-width: 100%;
}

/* Rows */
.cb-row {
  line-height: 1.6;
  transition: background 80ms ease;
}

.cb-row:hover {
  background: rgba(255, 255, 255, 0.03);
}

/* Line number gutter */
.cb-ln {
  border-right: 1px solid #21262d;
  color: #484f58;
  font-family: var(--sgds-font-family-mono, ui-monospace, monospace);
  font-size: 0.8125rem;
  min-width: 2.75rem;
  padding: 0 1rem 0 1.25rem;
  text-align: right;
  user-select: none;
  vertical-align: top;
}

/* Code cell */
.cb-code {
  color: #e6edf3;
  font-family: var(--sgds-font-family-mono, ui-monospace, monospace);
  font-size: 0.875rem;
  padding: 0 2rem 0 1.25rem;
  vertical-align: top;
  white-space: pre;
}

/* ── Syntax token colours (GitHub Dark palette) ──────────────────────────── */
.cb-keyword    { color: #ff7b72; }                       /* keywords         */
.cb-string     { color: #a5d6ff; }                       /* strings          */
.cb-comment    { color: #6e7681; font-style: italic; }   /* comments         */
.cb-tag        { color: #7ee787; }                       /* HTML tag names   */
.cb-attr       { color: #79c0ff; }                       /* HTML attributes  */
.cb-vue-attr   { color: #ffa657; }                       /* Vue :prop @event */
.cb-vue-brace  { color: #e2c08d; }                       /* {{ }} mustaches  */
.cb-number     { color: #ffa657; }                       /* numbers          */
.cb-type       { color: #ffa657; }                       /* TS types/classes */
.cb-css-prop   { color: #79c0ff; }                       /* CSS property     */
.cb-css-var    { color: #a5d6ff; }                       /* --custom-props   */
.cb-punct      { color: #8b949e; }                       /* punctuation      */
</style>
