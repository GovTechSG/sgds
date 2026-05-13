<script setup lang="ts">
import CodeToken from './CodeToken.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ command: string }>()
const copied = ref(false)

function copy() {
  navigator.clipboard.writeText(props.command)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

// ──────────────────────────────────────────────────────────────────────────
// Lightweight syntax highlighter — tokenises the command into spans with
// editor-style colour classes. Auto-detects HTML vs JS vs plain shell. Plain
// (e.g. `npm install ...`) is rendered unchanged so existing AI-page usage
// is unaffected.
// ──────────────────────────────────────────────────────────────────────────

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function wrap(text: string, token: string): string {
  return `<span class="il-tok il-tok-${token}">${escapeHtml(text)}</span>`
}

function highlightJs(input: string): string {
  // Tokens: strings, keywords (import/from), identifiers, punctuation
  const keywords = /^(import|from|export|const|let|var|return|default)\b/
  let out = ''
  let i = 0
  while (i < input.length) {
    const rest = input.slice(i)

    // Strings in single or double quotes
    const strMatch = rest.match(/^(["'`])(?:\\.|(?!\1).)*\1/)
    if (strMatch) {
      out += wrap(strMatch[0], 'string')
      i += strMatch[0].length
      continue
    }

    // Keywords
    const kwMatch = rest.match(keywords)
    if (kwMatch) {
      out += wrap(kwMatch[0], 'keyword')
      i += kwMatch[0].length
      continue
    }

    // Identifiers / other word tokens
    const idMatch = rest.match(/^[A-Za-z_$][\w$]*/)
    if (idMatch) {
      out += escapeHtml(idMatch[0])
      i += idMatch[0].length
      continue
    }

    // Single character — punctuation, whitespace, operator
    out += escapeHtml(input[i])
    i += 1
  }
  return out
}

function highlightHtml(input: string): string {
  // Two phases: walk through tags (`<...>`), keeping text content between
  // them untouched. Inside each tag, colour the tag name and attribute names
  // separately from attribute values (quoted strings).
  let out = ''
  let i = 0
  while (i < input.length) {
    const ch = input[i]
    if (ch !== '<') {
      out += escapeHtml(ch)
      i += 1
      continue
    }

    // Find matching `>` (ignoring ones inside quoted attributes)
    let j = i + 1
    let inStr: string | null = null
    while (j < input.length) {
      const c = input[j]
      if (inStr) {
        if (c === inStr && input[j - 1] !== '\\') inStr = null
      } else if (c === '"' || c === "'") {
        inStr = c
      } else if (c === '>') {
        break
      }
      j += 1
    }

    const tag = input.slice(i, j + 1)
    out += highlightHtmlTag(tag)
    i = j + 1
  }
  return out
}

function highlightHtmlTag(tag: string): string {
  // tag is e.g. an opening tag like `<script src="..." integrity="...">` or a
  // closing tag. Render the angle brackets and slash as punctuation, the tag
  // name in one colour, attribute names in another, attribute values as strings.
  // Render `<`, `</`, `/>`, `>` as punctuation, the tag name in one colour,
  // attribute names in another, attribute values as strings.
  let out = ''
  // Opening punctuation
  const openMatch = tag.match(/^<\/?/)
  if (openMatch) {
    out += wrap(openMatch[0], 'punct')
  }
  let cursor = openMatch ? openMatch[0].length : 0

  // Tag name
  const nameMatch = tag.slice(cursor).match(/^[A-Za-z][\w-]*/)
  if (nameMatch) {
    out += wrap(nameMatch[0], 'tag')
    cursor += nameMatch[0].length
  }

  // Attributes
  while (cursor < tag.length) {
    const rest = tag.slice(cursor)

    // Closing punctuation
    const closeMatch = rest.match(/^\s*\/?\s*>/)
    if (closeMatch) {
      // preserve whitespace literally, wrap the bracket only
      const ws = closeMatch[0].match(/^\s*/)?.[0] ?? ''
      const bracket = closeMatch[0].slice(ws.length)
      out += escapeHtml(ws)
      out += wrap(bracket, 'punct')
      cursor += closeMatch[0].length
      continue
    }

    // Whitespace
    const wsMatch = rest.match(/^\s+/)
    if (wsMatch) {
      out += escapeHtml(wsMatch[0])
      cursor += wsMatch[0].length
      continue
    }

    // Attribute name
    const attrMatch = rest.match(/^[A-Za-z_][\w-]*/)
    if (attrMatch) {
      out += wrap(attrMatch[0], 'attr')
      cursor += attrMatch[0].length
      continue
    }

    // `=`
    if (rest.startsWith('=')) {
      out += wrap('=', 'punct')
      cursor += 1
      continue
    }

    // Quoted value
    const strMatch = rest.match(/^(["'])(?:\\.|(?!\1).)*\1/)
    if (strMatch) {
      out += wrap(strMatch[0], 'string')
      cursor += strMatch[0].length
      continue
    }

    // Fallback single char
    out += escapeHtml(rest[0])
    cursor += 1
  }

  return out
}

const formattedCommand = computed(() => {
  const raw = props.command
  const trimmed = raw.trimStart()
  if (trimmed.startsWith('<')) return highlightHtml(raw)
  if (/\b(import|from|export|const|let|var)\b/.test(raw)) return highlightJs(raw)
  return null // plain, no highlighting
})

const isMultiline = computed(() => props.command.includes('\n'))
const escapedCommand = computed(() => escapeHtml(props.command))
</script>

<template>
  <div class="sgds:flex sgds:items-center sgds:justify-between sgds:bg-surface-raised sgds:border sgds:border-muted sgds:rounded-md sgds:px-component-xs sgds:py-2 sgds:gap-component-xs">
    <code
      v-if="formattedCommand || isMultiline"
      class="il-command-code sgds:text-default sgds:font-mono sgds:flex-1 sgds:min-w-0"
      v-html="formattedCommand || escapedCommand"
    />
    <CodeToken v-else :label="command" :surface="false" class="sgds:flex-1 sgds:min-w-0" />
    <sgds-tooltip :content="copied ? 'Copied' : 'Copy to clipboard'" placement="top">
      <button
        class="sgds:bg-transparent sgds:border-0 sgds:cursor-pointer sgds:text-default sgds:flex sgds:items-center sgds:p-1 sgds:rounded sgds:flex-shrink-0 sgds:hover:bg-muted"
        :aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
        @click="copy"
      >
        <sgds-icon :name="copied ? 'check' : 'copy'" size="md"></sgds-icon>
      </button>
    </sgds-tooltip>
  </div>
</template>

<style>
/* Editor-style token colours for <CopyCommand>. Uses SGDS semantic colour
 * tokens so the palette tracks day/night themes — no hardcoded hex values. */
.il-command-code {
  font-size: 0.875em;
  line-height: var(--leading-20);
  white-space: pre;
  overflow-x: auto;
  padding-block: 0.125rem;
}

.il-tok-keyword { color: var(--sgds-primary-color-default); }
.il-tok-string  { color: var(--sgds-success-color-default); }
.il-tok-tag     { color: var(--sgds-danger-color-default); }
.il-tok-attr    { color: var(--sgds-accent-color-default); }
.il-tok-punct   { color: var(--sgds-body-color-subtle); }
</style>
