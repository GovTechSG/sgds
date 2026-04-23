---
name: "sgds-writing"
description: "Writing style guide for the Singapore Government Design System (SGDS). Use when writing or reviewing UI copy, documentation, labels, error messages, tooltips, or any content that accompanies SGDS components. Covers tone, grammar, spelling, casing, punctuation, and plain language principles."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: content
---

# SGDS Writing Guide

Content standards for government digital products built with the Singapore Government Design System. Apply these rules to all UI copy, documentation, tooltips, labels, error messages, and any written content that accompanies SGDS components.

---

## Tone and voice

Write as a trusted, competent partner — not as a bureaucracy. GovTech's voice is:

- **Clear** — say exactly what you mean in as few words as needed
- **Direct** — address the reader as "you"; use active voice
- **Respectful** — treat readers as capable adults; do not over-explain
- **Purposeful** — every sentence earns its place; remove filler

Avoid corporate jargon ("leverage", "synergise", "holistic approach"), hollow intensifiers ("very", "extremely", "crucial"), and vague forward-looking language ("innovative", "cutting-edge", "future-proof") unless the context genuinely calls for them.

**Preferred:** We help agencies share data securely.
**Avoid:** We leverage cutting-edge, innovative solutions to holistically enable seamless data exchange across government agencies.

---

## Spelling

Use **UK English** spelling throughout.

| UK (correct) | US (avoid) |
|---|---|
| colour | color |
| centre | center |
| programme | program (unless referring to software) |
| organisation | organization |
| recognise | recognize |
| analyse | analyze |
| catalogue | catalog |
| licence (noun) | license (noun) |
| license (verb) | licence (verb) |
| travelled | traveled |
| fulfil | fulfill |
| practise (verb) | practice (verb) |
| practice (noun) | practise (noun) |

> **Spell-check setting**: set your editor and CI spell checker to `en-GB`. In VS Code, set `"editor.language": "en-GB"` or use the [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright) extension with `"spellright.language": ["en-GB"]`.

See [→ reference/spelling.md](reference/spelling.md) for a full word list.

---

## Capitalisation

Use **sentence case** for all headings, labels, button text, navigation items, error messages, and body copy — unless a rule below explicitly overrides it.

Sentence case means: capitalise the first word and proper nouns only.

**Correct:**
- Submit your application
- View all services
- Error: file size exceeds the limit

**Incorrect (title case):**
- Submit Your Application
- View All Services
- Error: File Size Exceeds the Limit

### Exceptions where capitalisation is required

- Proper nouns: GovTech, SingPass, CorpPass, Smart Nation, Singapore, Ministry of Finance
- Acronyms that are always written in capitals: API, ICT, UI, UX, PDF, URL
- Product and system names that have an established capitalisation: Singpass, CorpPass, MyInfo
- The word "I" when used as a pronoun

### Do not capitalise

- Job titles used descriptively: "the director approved the request" (capitalise only when used as a title directly before a name: "Director Jane Tan approved the request")
- Government services or programmes used generically: "the digital identity programme", "the data-sharing initiative"
- Seasons, directions, or concepts: "the autumn release", "head north on the main road"

---

## Punctuation

### No em dash

Do not use the em dash (—) under any circumstances. It creates visual noise and is often misread or skipped by screen readers.

**Alternatives:**

| Instead of | Use |
|---|---|
| The form — which is required — must be submitted by Friday. | The form, which is required, must be submitted by Friday. |
| Submit before Friday — or your application will lapse. | Submit before Friday. Otherwise, your application will lapse. |
| Three options — email, phone, or in person — are available. | Three options are available: email, phone, or in person. |

Use a colon, comma pair, or a new sentence. Never an em dash.

### Commas

Use the Oxford comma (serial comma) in lists of three or more items.

**Correct:** You will need your NRIC, passport, and proof of address.
**Incorrect:** You will need your NRIC, passport and proof of address.

### Hyphens and en dashes

- Use a hyphen (-) for compound modifiers before a noun: "user-friendly interface", "end-to-end encryption"
- Use an en dash (–) only for number ranges: "pages 10–15", "2020–2024"
- Do not use an en dash as a substitute for an em dash

### Apostrophes

- Use for possessives: the agency's portal, the user's profile
- Do not use for plurals: APIs not API's, PDFs not PDF's

### Colons and semicolons

- Colons introduce lists or explanations. Do not capitalise the word after a colon unless it is a proper noun or the start of a full sentence that stands alone.
- Use semicolons sparingly. Prefer two short sentences over a semicolded compound sentence.

---

## Grammar

### Active voice

Prefer active voice. The subject acts; it is not acted upon.

**Active:** The system sends a confirmation email.
**Passive:** A confirmation email is sent by the system.

Passive voice is acceptable when the actor is unknown, irrelevant, or less important than the action: "Your data is encrypted at rest."

### No contrastive negation

Do not use contrastive negation — the pattern "not X, but Y" or "not only X but also Y". It adds a negation step that slows reading.

**Avoid:**
- Not a bug tracker, but a full project management tool.
- This is not optional, but mandatory.
- We do not just build tools — we build trust.

**Preferred:**
- A full project management tool that also tracks bugs.
- This is mandatory.
- We build tools that earn trust.

### Sentence length

Aim for sentences under 20 words. If a sentence needs a clause to clarify another clause, split it into two sentences.

### Parallel structure

Items in a list, heading pairs, and button labels must follow the same grammatical form.

**Correct (all verb phrases):**
- Create a new account
- Reset your password
- View your transaction history

**Incorrect (mixed forms):**
- Create a new account
- Password reset
- Viewing your transaction history

### Contractions

Do not use contractions in any content. Write out the full form at all times.

**Correct:** You do not need to create an account.
**Incorrect:** You don't need to create an account.

**Correct:** We have updated the interface.
**Incorrect:** We've updated the interface.

> **Note:** This is a deliberate departure from most product design system guides. GOV.UK, Canada.ca, Shopify Polaris, and Apple HIG all recommend using contractions on the grounds that they sound more natural. We avoid them to maintain formal, consistent language appropriate for official Singapore Government products, and to eliminate ambiguity (for example, "it's" vs "its").

### Modal verbs — must, need to, should, may

Use modal verbs precisely. The wrong choice creates unintended legal obligations or false reassurances.

| Word | When to use | Example |
|---|---|---|
| **Must** | Legal obligation — the user has no choice | You must submit the form by 31 January. |
| **Need to** | An administrative step the user is expected to complete | You need to verify your email before signing in. |
| **Should** | A recommendation — the user is advised but not obligated | You should save your progress regularly. |
| **May** | Permitted but optional | You may attach supporting documents. |

Do not use "must" for administrative steps — it implies a legal consequence that may not exist. Do not use "should" when the step is actually required.

### Numbers

- Spell out numbers one to nine; use numerals for 10 and above.
- Always use numerals for: percentages (5%), currency ($10), measurements (3 MB), and version numbers (version 2).
- Use commas in numbers of 1,000 or more: 1,000 not 1000.
- Use numerals for ranges even if both numbers are below 10: "3–9 working days".

### Dates and times

- Dates: 1 January 2025 (day month year, no ordinal suffixes — not "1st January")
- Times: 9am, 3:30pm (no space between number and am/pm)
- Date ranges in prose: 1 to 3 January 2025 (write "to", not an en dash)
- Date ranges in tables and compact UI elements: 1–3 Jan 2025 (en dash is acceptable where space is limited)

---

## Plain language principles

1. **Lead with the most important information.** Put the key point in the first sentence.
2. **One idea per paragraph.** If a paragraph covers two ideas, split it.
3. **Cut filler.** Remove "please note that", "it should be noted", "in order to", "at this point in time".
4. **Prefer short words.** Use "use" not "utilise", "help" not "facilitate", "buy" not "procure", "show" not "demonstrate".
5. **Avoid nominalisations.** Change "make a decision" to "decide"; "provide assistance" to "help"; "conduct an investigation" to "investigate".
6. **Do not use "please" in instructions.** It adds no information and reads as hedging. Write "Submit the form" not "Please submit the form". The exception is expressions of genuine courtesy in transactional emails or formal correspondence.
7. **Do not use subjective adjectives.** Do not tell users that something is "important", "easy", "simple", "quick", or "exciting". If it is important, show why. If it is simple, let the design demonstrate that. Subjective claims that cannot be verified erode trust.

---

## UI copy patterns

### Buttons and calls to action

- Use verb phrases: "Submit form", "Download report", "Sign in"
- Do not use vague labels: "Click here", "OK", "Go"
- Do not add punctuation to button labels

### Error messages

- State what happened and what the user should do next.
- Do not blame the user.

**Correct:** The file is too large. Upload a file under 5 MB.
**Incorrect:** You uploaded a file that is too large. Please upload a smaller file.

### Empty states

- Explain why the space is empty and offer a next step.

**Correct:** No applications yet. Start your first application.
**Incorrect:** Nothing here.

### Tooltips and helper text

- Keep tooltips to one sentence.
- Helper text below a field explains the format or constraint, not a restatement of the label.

**Label:** Date of birth
**Helper text:** Use DD/MM/YYYY format
**Not:** Enter your date of birth in DD/MM/YYYY format

### Loading and status messages

- Use present progressive: "Loading your results…", "Saving changes…"
- Confirm success with past tense: "Changes saved.", "Application submitted."

---

## Accessibility considerations

- Do not rely on colour alone to convey meaning — always pair colour with text.
- Alt text for images should describe function, not appearance: "GovTech logo" not "blue rectangular image with text".
- Link text must make sense out of context: "Download the annual report (PDF, 2 MB)" not "click here".
- Avoid directional instructions that rely on visual layout: "see the section on the right" does not work for screen-reader users.

---

## Reference files

| Topic | File |
|---|---|
| UK vs US spelling word list | [→ reference/spelling.md](reference/spelling.md) |
| Grammar rules quick reference | [→ reference/grammar.md](reference/grammar.md) |
| Punctuation quick reference | [→ reference/punctuation.md](reference/punctuation.md) |
| Word choice and plain language | [→ reference/word-choice.md](reference/word-choice.md) |
