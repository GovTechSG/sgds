<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>SGDS Agent Setup Instructions</title></head>
<body>

You are helping this project use the Singapore Government Design System (SGDS).

Follow these instructions before generating or editing SGDS code.

1. Check whether @govtechsg/sgds-web-component is installed. If it is missing, run this in the project root:

```bash
npm i @govtechsg/sgds-web-component
```

2. Install the SGDS agent skills. Choose one install path:

Skills CLI, for most users:

```bash
npx skills add govtechsg/sgds-web-component -y
```

GovTech CLI, for GovTech Singapore users:

```bash
gt apd install gto-desp
```

Use the GovTech CLI path only if the user is from GovTech Singapore or the project already uses GT CLI. Otherwise, use the Skills CLI path. Do not run both paths unless the user asks for both.

3. If prompted, select all SGDS skills.

4. After installation, read this file first:

```txt
.agents/skills/sgds-workflow/SKILL.md
```

5. Follow the SGDS skills when generating or editing code:
- Use @govtechsg/sgds-web-component components where available.
- Use sgds: utility classes for layout, spacing, typography, and colours.
- Do not invent SGDS component names, utility classes, or design tokens.
- Do not use inline styles unless a runtime dynamic value is required.
- For new apps, follow sgds-getting-started before writing UI code.
- For existing apps, use sgds-workflow to pick the right skill for the task.

</body>
</html>
