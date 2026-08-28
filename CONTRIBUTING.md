# Contributing Guide

Thank you for contributing to the SGDS documentation portal. Please read this guide before starting.

## Contributing workflow

1. Check our [Issues](https://github.com/GovTechSG/sgds/issues) section for similar bugs or feature requests.
2. If your issue is not found, open one using the issue template.
3. Describe the problem or proposal in detail.
4. A SGDS admin will review and notify you if accepted.
5. Fork the repository and work on your changes.
6. Raise a PR tagging the issue number and request a review.

## Setup for development

### Prerequisites

- Node.js >= 20
- pnpm >= 10

### Install and run

```bash
pnpm install
pnpm docs:dev       # Start dev server at localhost:5173
```

### Other commands

```bash
pnpm docs:build     # Production build
pnpm docs:preview   # Preview production build
pnpm test:a11y      # Run accessibility tests (builds first)
```

## Project structure

```
docs/
  .vitepress/
    components/      # Vue components (renderers only)
    data/            # Single source of truth for all content
    theme/           # VitePress theme and layouts
    composables/     # Shared Vue composables
    utils/           # Shared utilities
  components/        # One .md per component doc
  patterns/          # One .md per pattern doc
  guidelines/        # One .md per guideline
  resources/         # One .md per resource
```

Content data lives in `docs/.vitepress/data/`. Vue components render it — they never own it. See `CLAUDE.md` for full architectural details.

## Commit standard

Follow [Conventional Commits](https://www.conventionalcommits.org/) format.

## Publishing (admin only)

The site is built and deployed via CI. No manual publish steps are required for documentation changes.
