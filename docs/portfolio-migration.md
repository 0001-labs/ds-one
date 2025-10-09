# Portfolio to DS one Migration

## Overview

This document tracks the migration of components from the Portfolio project to the DS one design system package.

## Migration Status

### ✅ Completed Migrations (11 components)

| Portfolio Component | DS one Component  | Status      | Notes                                 |
| ------------------- | ----------------- | ----------- | ------------------------------------- |
| `dsv1-link`         | `link-v1`         | ✅ Complete | Simple external link with i18n        |
| `dsv1-year`         | `year-v1`         | ✅ Complete | Current year display                  |
| `dsv1-title`        | `title-v1`        | ✅ Complete | Page title with i18n and grid support |
| `dsv1-header`       | `header-v1`       | ✅ Complete | Section header with slot support      |
| `dsv1-attributes`   | `attributes-v1`   | ✅ Complete | Project/work metadata display         |
| `dsv1-downloadcv`   | `downloadcv-v1`   | ✅ Complete | Multi-language CV download            |
| `dsv1-article`      | `article-v1`      | ✅ Complete | Article with image/text toggle        |
| `dsv1-viewtoggle`   | `viewtoggle-v1`   | ✅ Complete | Image/text view mode toggle           |
| `dsv1-squarecircle` | `squarecircle-v1` | ✅ Complete | Theme toggle square/circle            |
| `dsv1-singlenav`    | `singlenav-v1`    | ✅ Complete | Single navigation link                |
| `dsv1-doublenav`    | `doublenav-v1`    | ✅ Complete | Previous/next navigation              |

### 🔄 Partial Migrations (Using existing DS one components)

| Portfolio Component | DS one Component | Status         | Notes                                                    |
| ------------------- | ---------------- | -------------- | -------------------------------------------------------- |
| `dsv1-icon`         | `icon-v1`        | ✅ Icons Added | Added Portfolio icons (open, expand, left, right, email) |
| `dsv1-button`       | `button-v1`      | ⚠️ Exists      | May need Portfolio-specific styling                      |
| `dsv1-text`         | `text-v1`        | ⚠️ Exists      | May need mobile/desktop key support                      |
| `dsv1-cycle`        | `cycle-v1`       | ⚠️ Exists      | Already compatible                                       |

## New Files Created in DS one

### Core Components (2-core/)

- `link-v1.ts` - External link component
- `year-v1.ts` - Current year component
- `title-v1.ts` - Page title component
- `header-v1.ts` - Section header component
- `attributes-v1.ts` - Project attributes component
- `downloadcv-v1.ts` - CV download component
- `article-v1.ts` - Article with media toggle
- `viewtoggle-v1.ts` - View mode toggle
- `squarecircle-v1.ts` - Theme toggle component

### Unit Components (3-unit/)

- `singlenav-v1.ts` - Single navigation
- `doublenav-v1.ts` - Double navigation

### Utilities (utils/)

- `viewMode.ts` - View mode state management

### Icons (x Icon/)

- `open.svg` - External link icon
- `expand.svg` - Expand icon
- `left.svg` - Left arrow
- `right.svg` - Right arrow
- `email.svg` - Email icon

## Translation Keys Added

Added to `DS1/utils/keys.json` in all 3 languages (en-US, da-DK, ja-JP):

```json
{
  "link": "Link / Link / リンク",
  "projects": "Projects / Projekter / プロジェクト",
  "workExperience": "Work experience / Erfaring / 職務経験",
  "downloadCV": "Download CV / Hent CV / 履歴書DL",
  "year2025": "2025 / 2025 / 2025年",
  "categorySoftware": "Software / Software / ソフトウェア",
  "statusOngoing": "Ongoing / I gang / 進行中",
  "statusDone": "Done / Færdig / 完了",
  "statusPending": "Pending / Afventer / 保留中",
  "statusNotStarted": "Not started / Ikke begyndt / 未開始",
  "hideImage": "Hide image / Skjul billede / 画像を非表示",
  "viewImage": "View image / Vis billede / 画像を表示"
}
```

## Portfolio Integration

### Method 1: Using Wrappers (Backward Compatible)

Portfolio uses `ds1-wrappers.ts` which:

1. Imports DS one components
2. Creates aliases with `dsv1-*` naming
3. Allows existing HTML to work unchanged

**File:** `Portfolio/client/design/components/ds1-wrappers.ts`

### Method 2: Direct Import (Future)

Can directly import DS one components:

```typescript
import "ds-one/DS1/2-core/link-v1";
import "ds-one/DS1/2-core/year-v1";
// etc...
```

## Package Setup

### DS one

- **Package:** `ds-one`
- **Version:** 0.1.7
- **Linked:** Yes (via `bun link`)

### Portfolio

- **Dependency:** `ds-one: ^0.1.7-beta`
- **Linked:** Yes (via `bun link ds-one`)
- **Registry:** Updated to import from `ds-one` package

## Build Outputs

### DS one Bundle

- **Unminified:** 130.0kb
- **Minified:** 91.1kb
- **Includes:** All 11 migrated components + existing DS one components

### Portfolio

- Uses linked `ds-one` package
- Imports only needed components
- Maintains backward compatibility via wrappers

## Testing

### DS one Examples

- http://localhost:3000/examples/portfolio-components.html - All migrated components
- http://localhost:3000/examples/test-link.html - Link component test

### Portfolio

- http://localhost:5173 - Main portfolio (using DS one components)
- http://localhost:5173/projects - Projects page
- http://localhost:5173/work/ikea - Work detail pages

## Next Steps

### Remaining Work

1. ✅ Verify all components render correctly in Portfolio
2. ✅ Test language switching works
3. ✅ Test theme switching works
4. ⚠️ Migrate remaining Portfolio-specific components (button, text, cycle)
5. 📦 Publish updated `ds-one` package to npm
6. 🧹 Clean up old Portfolio component files

### Future Enhancements

- Add Portfolio-specific color variables to DS one
- Create Portfolio theme preset in DS one
- Publish to npm registry
- Add automated tests

## Commands Reference

```bash
# DS one
cd "DS one"
bun run build          # Build bundle
bun link              # Link locally
bun run serve         # Start test server (port 3000)

# Portfolio
cd Portfolio
bun link ds-one       # Link to local DS one
bun install           # Install dependencies
bun run dev           # Start dev server (port 5173)
bun run build         # Build for production
```

## Files Modified

### DS one

- `package.json` - Updated exports
- `dist/bundle-entry.js` - Added new components
- `DS1/utils/keys.json` - Added translation keys
- Created 11 new component files
- Created 1 new utility file
- Added 5 new SVG icons

### Portfolio

- `client/design/registry.ts` - Updated to import from ds-one
- `client/design/components/ds1-wrappers.ts` - Created wrapper file
- `package.json` - Already had ds-one dependency

---

**Migration Date:** October 9, 2025
**Status:** ✅ Successfully migrated 11 components
**Servers Running:**

- DS one: http://localhost:3000
- Portfolio: http://localhost:5173
