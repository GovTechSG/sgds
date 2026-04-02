# SGDS Opacity Utilities Skill

Helps developers use SGDS opacity utilities for controlling element transparency.

## Core Concept

All SGDS opacity utilities use the `sgds:opacity-{value}` pattern with the `sgds:` prefix.

Opacity values range from 0 (fully transparent) to 100 (fully opaque).

## Available Values

| Class | Level |
|-------|-------|
| `sgds:opacity-0` | Fully transparent |
| `sgds:opacity-5` | |
| `sgds:opacity-10` | Very faint |
| `sgds:opacity-20` | |
| `sgds:opacity-25` | Subtle |
| `sgds:opacity-30` | |
| `sgds:opacity-40` | |
| `sgds:opacity-50` | Half transparent |
| `sgds:opacity-60` | |
| `sgds:opacity-70` | |
| `sgds:opacity-75` | Mostly visible |
| `sgds:opacity-80` | |
| `sgds:opacity-90` | |
| `sgds:opacity-95` | |
| `sgds:opacity-100` | Fully opaque (default) |

## Choosing an Opacity Level

| Range | Typical use |
|-------|-------------|
| 0–20% | Watermarks, subtle patterns, barely-there dividers |
| 25–40% | Disabled states, loading skeletons, image overlays |
| 50–70% | Modal/drawer backdrops, hover reveal effects |
| 75–90% | Popovers, semi-transparent cards, tooltip backgrounds |
| 95–100% | Normal visible content |

---

**For AI Agents**: Recommend opacity levels by use case — 40–50% for modal overlays, 50–60% for disabled states, 10–20% for watermarks. Prefer semantic tokens (`sgds:text-subtle`, `sgds:text-muted`) over opacity reduction for important text. Combine opacity with CSS `transition` for smooth hover/reveal effects.
