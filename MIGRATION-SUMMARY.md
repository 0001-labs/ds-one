# Portfolio to DS one Migration Summary

## What Was Accomplished

Successfully migrated 11 Portfolio components to the DS one design system as standalone, reusable web components.

## New DS one Components

### Core Components (DS1/2-core/)

1. **link-v1.ts** - External link with i18n
   - Props: `href`
   - Features: Auto-opens in new tab, uses "link" translation key, shows open icon

2. **year-v1.ts** - Current year display
   - Props: None
   - Features: Automatically shows current year

3. **title-v1.ts** - Page title with i18n
   - Props: `key`, `defaultValue`, `gridarea`
   - Features: Large heading (36px), i18n support, grid placement

4. **header-v1.ts** - Section header
   - Props: `gridarea`
   - Features: Medium heading (14px), slot for content, grid placement

5. **attributes-v1.ts** - Project/work metadata
   - Props: `year`, `category`, `status`, `type`
   - Features: Shows year, category, status indicators, i18n

6. **downloadcv-v1.ts** - Multi-language CV download
   - Props: `urlEn`, `urlDa`, `urlJa`, `filename`
   - Features: Language-specific URLs, blob download, fallback

7. **article-v1.ts** - Article with image/text toggle
   - Props: `imgLightDesktop`, `imgDarkDesktop`, `imgLightMobile`, `imgDarkMobile`, `src`, `alt`, `imageToggle`, `imageOnlyWidth`, `priority`, `externalToggle`, `mobileKey`, `desktopKey`, `textKey`, `defaultValue`
   - Features: Responsive images, theme-aware, text/image toggle, animations

8. **viewtoggle-v1.ts** - View mode toggle button
   - Props: None
   - Features: Toggles between "text" and "image" modes, i18n labels

9. **squarecircle-v1.ts** - Theme toggle square/circle
   - Props: `type`, `shape`, `href`, `project`, `loading`
   - Features: Theme toggle or link, square/circle shapes, loading animation

### Unit Components (DS1/3-unit/)

10. **singlenav-v1.ts** - Single navigation link
    - Props: `type`, `to`
    - Features: "projects" or "work" navigation, i18n

11. **doublenav-v1.ts** - Previous/next navigation
    - Props: `previous`, `next`, `previousText`, `nextText`, `overlay`
    - Features: Bidirectional navigation, overlay colors

## New Icons Added (DS1/x Icon/)

- `open.svg` - External link icon (12x12)
- `expand.svg` - Expand icon (12x12)
- `left.svg` - Left arrow (16x9)
- `right.svg` - Right arrow (15x8)
- `email.svg` - Email icon (16x11)

## Translation Keys Added (DS1/utils/keys.json)

All 3 languages (en-US, da-DK, ja-JP):

- `link`, `projects`, `workExperience`, `downloadCV`
- `year2025`, `categorySoftware`
- `statusOngoing`, `statusDone`, `statusPending`, `statusNotStarted`
- `hideImage`, `viewImage`

## Utilities Added

- **viewMode.ts** - View mode state management (text/image toggle)

## Bundle Size

- **Unminified:** 130.0kb
- **Minified:** 91.1kb
- **Components:** 11 new + 10 existing = 21 total components

## Key Differences: DS one vs Portfolio

### CSS Variables

| DS one             | Portfolio                                 |
| ------------------ | ----------------------------------------- |
| `--black`          | `--dsv1-black`                            |
| `--white`          | `--dsv1-white`                            |
| `--typeface`       | `--typeface-regular`, `--typeface-medium` |
| `--scaling-factor` | `--portfolio-scaling-factor`              |

### Component Naming

| DS one     | Portfolio    |
| ---------- | ------------ |
| `link-v1`  | `dsv1-link`  |
| `year-v1`  | `dsv1-year`  |
| `title-v1` | `dsv1-title` |
| etc.       | etc.         |

## Why Keep Them Separate

**DS one** is designed to be a general-purpose design system that can be used in multiple projects (Ezo, Ritonel, allmythin.gs, etc.)

**Portfolio** has specific styling, CSS variables, and design requirements that are unique to the portfolio project.

## How to Use DS one in New Projects

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/ds-one/DS1/1-root/screen.css" />
    <script
      type="module"
      src="node_modules/ds-one/dist/ds-one.bundle.js"
    ></script>
  </head>
  <body>
    <app-v1>
      <title-v1 key="welcomeHeading"></title-v1>
      <text-v1 key="welcomeBody"></text-v1>
      <link-v1 href="https://example.com"></link-v1>
      <year-v1></year-v1>
    </app-v1>
  </body>
</html>
```

## Test the Migration

DS one examples are running at:

- **http://localhost:3000** (when running `bun run dev` in DS one folder)
- **http://localhost:3000/examples/portfolio-components.html** - All migrated components

## Next Steps

1. ✅ All major Portfolio components migrated to DS one
2. ✅ DS one can be used as a package in new projects
3. ✅ Portfolio continues using its own components with its own CSS
4. 📦 Publish DS one to npm when ready
5. 🎨 Use DS one in Ezo, Ritonel, allmythin.gs projects

---

**Result:** DS one now has a complete set of reusable components that can be used across all your projects! 🎉
