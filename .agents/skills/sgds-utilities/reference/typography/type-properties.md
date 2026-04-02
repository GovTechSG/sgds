# Typography Type Properties Reference

Full scale tables for all SGDS typography token properties.

## Font Size

Apply with `sgds:text-{size}`:

| Token | Pixel value | Typical use |
|-------|-------------|-------------|
| `sgds:text-xs` | 12px | Fine print, captions, badge labels |
| `sgds:text-sm` | 14px | Secondary labels, helper text |
| `sgds:text-base` | 16px | Default body text |
| `sgds:text-lg` | 18px | Lead paragraphs |
| `sgds:text-xl` | 20px | Minor headings, intro text |
| `sgds:text-2-xl` | 24px | H4 / subheadings |
| `sgds:text-3-xl` | 30px | H3 / section headings |
| `sgds:text-4-xl` | 36px | H2 |
| `sgds:text-5-xl` | 48px | H1 / page titles |
| `sgds:text-6-xl` | 60px | Large display |
| `sgds:text-7-xl` | 72px | Extra large display |
| `sgds:text-8-xl` | 96px | Hero display |
| `sgds:text-9-xl` | 128px | Max display |

```html
<p class="sgds:text-xs">Fine print (12px)</p>
<p class="sgds:text-base">Body text (16px)</p>
<h2 class="sgds:text-3-xl">Section heading (30px)</h2>
<h1 class="sgds:text-5-xl">Page title (48px)</h1>
```

---

## Font Weight

Apply with `sgds:font-{weight}`:

| Token | Numeric weight | Typical use |
|-------|---------------|-------------|
| `sgds:font-thin` | 100 | Decorative, rarely used |
| `sgds:font-extralight` | 200 | Decorative |
| `sgds:font-light` | 300 | Large display text |
| `sgds:font-regular` | 400 | Reboot default — no need to set explicitly |
| `sgds:font-medium` | 500 | Slightly emphasised body, labels |
| `sgds:font-semibold` | 600 | Subheadings, button labels |
| `sgds:font-bold` | 700 | Headings |
| `sgds:font-extrabold` | 800 | Strong emphasis |
| `sgds:font-black` | 900 | Maximum weight display |

```html
<label class="sgds:font-medium">Form label</label>
<h3 class="sgds:font-semibold">Subheading</h3>
<h1 class="sgds:font-bold">Heading</h1>
```

**When to use:**
- Body text → no class needed (reboot default); use `medium` for slight emphasis
- Headings → `semibold` or `bold`
- Display → `bold` or `extrabold`
- Never use `thin` / `extralight` for small text — poor readability

---

## Line Height

Apply with `sgds:leading-{size}`:

| Token | Value | Typical use |
|-------|-------|-------------|
| `sgds:leading-none` | 1 | Large display text where spacing is handled by layout |
| `sgds:leading-tight` | 1.25 | Display headings, hero text |
| `sgds:leading-snug` | 1.375 | Section headings (H2, H3) |
| `sgds:leading-normal` | 1.5 | Default — single-line labels, short content |
| `sgds:leading-relaxed` | 1.625 | Body text, long-form reading |
| `sgds:leading-loose` | 2 | Long-form content needing extra air |

```html
<h1 class="sgds:text-5-xl sgds:leading-tight">Display heading</h1>
<h2 class="sgds:text-3-xl sgds:leading-snug">Section heading</h2>
<p class="sgds:text-base sgds:leading-relaxed">Body paragraph</p>
```

**Rule of thumb**: As font size increases, use tighter leading. As font size decreases, use normal or relaxed leading.

---

## Letter Spacing

Apply with `sgds:tracking-{size}`:

| Token | Value | Typical use |
|-------|-------|-------------|
| `sgds:tracking-tighter` | −0.05em | Very large display headings |
| `sgds:tracking-tight` | −0.025em | Large headings (5-xl and above) |
| `sgds:tracking-normal` | 0em | Default — body text |
| `sgds:tracking-wide` | 0.025em | Slightly open body text |
| `sgds:tracking-wider` | 0.05em | Small uppercase labels |
| `sgds:tracking-widest` | 0.1em | Spaced uppercase badges or caps |

```html
<h1 class="sgds:text-6-xl sgds:tracking-tight">Large heading</h1>
<p class="sgds:text-base sgds:tracking-normal">Body text</p>
<span class="sgds:text-xs sgds:uppercase sgds:tracking-wider">Badge label</span>
```

**Rule of thumb**: Tighten letter spacing for large text; widen for small uppercase text. Leave body text at `normal`.

---

## Font Family

Apply with `sgds:font-{family}`:

| Token | Stack | Use for |
|-------|-------|---------|
| `sgds:font-sans` | Inter, system-ui, sans-serif | All prose, headings, labels (default) |
| `sgds:font-mono` | JetBrainsMono, Courier New, monospace | All code — inline and blocks |

```html
<p class="sgds:font-sans">Regular text content</p>
<code class="sgds:font-mono sgds:text-sm">const value = 42;</code>
<pre class="sgds:font-mono sgds:text-sm sgds:leading-relaxed">
  function hello() {
    return 'world';
  }
</pre>
```

**Always use `sgds:font-mono` for code.** Never use `sgds:font-sans` on `<code>` or `<pre>` elements.

## See Also

- **[patterns.md](patterns.md)** — Common HTML patterns pairing these properties for headings, body, forms, code, buttons
