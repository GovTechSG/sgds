# SGDS Opacity Utilities Skill

Helps developers use SGDS opacity utilities for controlling element transparency.

## Core Concept

All SGDS opacity utilities use the `sgds:opacity-{value}` pattern with the `sgds:` prefix.

Opacity values range from 0 (fully transparent) to 100 (fully opaque).

## Available Values

| Class | Level |
|-------|-------|
| `sgds:opacity-0` | Fully transparent |
| `sgds:opacity-3` | |
| `sgds:opacity-5` | |
| `sgds:opacity-8` | |
| `sgds:opacity-10` | Very faint |
| `sgds:opacity-15` | |
| `sgds:opacity-20` | |
| `sgds:opacity-30` | |
| `sgds:opacity-40` | |
| `sgds:opacity-50` | Half transparent |
| `sgds:opacity-60` | |
| `sgds:opacity-70` | |
| `sgds:opacity-80` | |
| `sgds:opacity-90` | |
| `sgds:opacity-100` | Fully opaque (default) |

## Choosing an Opacity Level

| Range | Typical use |
|-------|-------------|
| 0–20% | Watermarks, subtle patterns, barely-there dividers |
| 40% | Disabled states, loading skeletons |
| 50% | Modal/drawer backdrops (scrim) |
| 60–70% | Hover reveal effects, image overlays |
| 80–90% | Popovers, semi-transparent cards, tooltip backgrounds |
| 100% | Normal visible content |

---

**For AI Agents**: Recommend opacity levels by use case — `sgds:opacity-40` for disabled states, `sgds:opacity-50` for modal overlays/scrim, 10–20% for watermarks. Prefer semantic tokens (`sgds:text-subtle`, `sgds:text-muted`) over opacity reduction for important text. Combine opacity with CSS `transition` for smooth hover/reveal effects.
