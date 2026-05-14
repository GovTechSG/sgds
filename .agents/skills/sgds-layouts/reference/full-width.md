# Full Width Layouts

Full Width layouts are for public-facing pages, informational sites, and general-purpose applications that do not require persistent side navigation.

**Content container:** `.sgds-container` — centred, responsive max-width

| Breakpoint | `.sgds-container` max-width |
|---|---|
| < 512px | `calc(100% - 40px)` |
| >= 512px (sm) | `calc(100% - 48px)` |
| >= 768px (md) | `calc(100% - 56px)` |
| >= 1024px (lg) | `888px` |
| >= 1280px (xl) | `1168px` |
| >= 1440px (2xl) | `1312px` |

---

## Default

The simplest layout — single content area with standard page chrome.

```
+-------------------------------+
| sgds-masthead                 |
+-------------------------------+
| sgds-mainnav                  |
+-------------------------------+
|                               |
|    .sgds-container            |
|    [  main content area  ]    |
|                               |
+-------------------------------+
| sgds-footer                   |
+-------------------------------+
```

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Default | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/Default.stories.js |

---

## Aside Left

Content with a left aside panel. Uses `.sgds-grid` with a 4/8 column split (stacks on small screens).

```
+-------------------------------+
| sgds-masthead                 |
+-------------------------------+
| sgds-mainnav                  |
+-------------------------------+
|  .sgds-container              |
|  +-------+------------------+ |
|  | aside |   main content   | |
|  | col-4 |     col-8        | |
|  +-------+------------------+ |
+-------------------------------+
| sgds-footer                   |
+-------------------------------+
```

Grid classes: `sgds-col-4 sgds-col-sm-8 sgds-col-lg-4` (aside) + `sgds-col-8 sgds-col-sm-8 sgds-col-lg-8` (main)

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Aside Left | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/AsideLeft.stories.js |

---

## Aside Right

Content with a right aside panel. Same grid ratios as Aside Left but reversed order.

```
+-------------------------------+
| sgds-masthead                 |
+-------------------------------+
| sgds-mainnav                  |
+-------------------------------+
|  .sgds-container              |
|  +------------------+-------+ |
|  |   main content   | aside | |
|  |     col-8        | col-4 | |
|  +------------------+-------+ |
+-------------------------------+
| sgds-footer                   |
+-------------------------------+
```

Grid classes: `sgds-col-8 sgds-col-sm-8 sgds-col-lg-8` (main) + `sgds-col-4 sgds-col-sm-8 sgds-col-lg-4` (aside)

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Aside Right | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/AsideRight.stories.js |

---

## Aside Both

Content flanked by aside panels on both sides. Uses a 3/6/3 column split.

```
+-------------------------------+
| sgds-masthead                 |
+-------------------------------+
| sgds-mainnav                  |
+-------------------------------+
|  .sgds-container              |
|  +-----+------------+------+ |
|  |aside| main       | aside| |
|  |col-3| col-6      | col-3| |
|  +-----+------------+------+ |
+-------------------------------+
| sgds-footer                   |
+-------------------------------+
```

Grid classes: `sgds-col-3 sgds-col-sm-8 sgds-col-lg-3` (left aside) + `sgds-col-6 sgds-col-sm-8 sgds-col-lg-6` (main) + `sgds-col-3 sgds-col-sm-8 sgds-col-lg-3` (right aside)

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Aside Both | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/AsideBoth.stories.js |

---

## Split

Two equal content panels side by side using flexbox.

```
+-------------------------------+
| sgds-masthead                 |
+-------------------------------+
| sgds-mainnav                  |
+-------------------------------+
|  .sgds-container              |
|  +-------------+------------+ |
|  |   panel 1   |  panel 2   | |
|  |   flex-1    |  flex-1    | |
|  +-------------+------------+ |
+-------------------------------+
| sgds-footer                   |
+-------------------------------+
```

Uses `sgds:flex sgds:gap-layout-md` with two `sgds:flex-1` children.

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Split | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/Split.stories.js |

---

## Breadcrumb

Full-width layout with a breadcrumb navigation bar between the mainnav and content area.

```
+-------------------------------+
| sgds-masthead                 |
+-------------------------------+
| sgds-mainnav                  |
+-------------------------------+
| breadcrumb bar (border-b)     |
+-------------------------------+
|                               |
|    .sgds-container            |
|    [  main content area  ]    |
|                               |
+-------------------------------+
| sgds-footer                   |
+-------------------------------+
```

The breadcrumb bar uses `sgds:border-b sgds:border-muted sgds:text-body-sm` with `<sgds-breadcrumb>` inside `.sgds-container sgds:py-md`.

### Raw Content Link

| Layout | Raw URL |
|---|---|
| Breadcrumb | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/Breadcrumb.stories.js |

---

## All Raw Content Links

| Layout | Raw URL |
|---|---|
| Default | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/Default.stories.js |
| Aside Left | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/AsideLeft.stories.js |
| Aside Right | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/AsideRight.stories.js |
| Aside Both | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/AsideBoth.stories.js |
| Split | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/Split.stories.js |
| Breadcrumb | https://raw.githubusercontent.com/GovTechSG/sgds-web-component/master/stories/layouts/FullWidth/Breadcrumb.stories.js |
