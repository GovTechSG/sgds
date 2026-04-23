# UK English spelling reference

Set your spell checker to `en-GB`. This list covers words that commonly appear in government digital products and UI copy where UK and US spellings diverge.

## Common word list

| UK (correct) | US (avoid) | Notes |
|---|---|---|
| acknowledgement | acknowledgment | |
| adviser | advisor | preferred UK form |
| ageing | aging | |
| analyse | analyze | and all -yse/-yze verbs |
| behaviour | behavior | |
| cancelled | canceled | double-l in past tense |
| catalogue | catalog | |
| centre | center | |
| cheque | check | financial instrument |
| colour | color | and all -our/-or words |
| defence | defense | noun form |
| dialogue | dialog | except in UI (see note) |
| draught | draft | for the noun meaning a current of air |
| endeavour | endeavor | |
| favour | favor | |
| fibre | fiber | |
| flavour | flavor | |
| fulfil | fulfill | single-l |
| grey | gray | |
| harbour | harbor | |
| honour | honor | |
| humour | humor | |
| judgement | judgment | both acceptable; prefer judgement |
| labour | labor | |
| licence | license | noun only; verb is "license" |
| litre | liter | |
| mould | mold | |
| neighbourhood | neighborhood | |
| organise | organize | and all -ise/-ize verbs (see note) |
| organisation | organization | |
| practise | practice | verb only; noun is "practice" |
| programme | program | use "program" only for software |
| realise | realize | |
| recognise | recognize | |
| rumour | rumor | |
| sceptical | skeptical | |
| signalling | signaling | double-l |
| specialise | specialize | |
| travelling | traveling | double-l |
| tyre | tire | rubber on a wheel |
| vapour | vapor | |

## -ise vs -ize

UK English accepts both -ise and -ize for most verbs (organise/organize, recognise/recognize). This guide standardises on **-ise** for consistency. Do not mix forms in the same document.

## "Dialog" exception

In UI copy that refers to a dialog box (the UI component), use "dialog" not "dialogue" — this is an accepted technical term and matches the HTML `<dialog>` element and common accessibility vocabulary.

## Spell-checker setup

### VS Code
Install the [Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright) extension and add to your workspace settings:

```json
{
  "spellright.language": ["en-GB"],
  "spellright.documentTypes": ["markdown", "plaintext", "html"]
}
```

### cspell (Node.js / CI)
Add to `cspell.json`:

```json
{
  "language": "en-GB",
  "dictionaries": ["en-gb"]
}
```

Install the GB dictionary: `npm install --save-dev @cspell/dict-en-gb`
