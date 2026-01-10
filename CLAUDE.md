# DS one

Component-based design system with Lit Web Components.

## Stack

- Lit 3.0.0 (Web Components)
- TypeScript 5.0.0
- Vite
- Bun

## Version

0.3.0-alpha.7

## Scripts

- `bun run dev` — Development server
- `bun run build` — Full production build
- `bun run docs:dev` — Documentation site
- `bun run build:bundle` — Standard + minified bundles
- `bun run lint` / `lint:fix` — ESLint
- `bun run test` — Bun test runner
- `bun run release:patch|minor|major` — Semantic versioning

## Architecture (DS1/)

- `0-face/` — Device detection, i18n, localStorage, themes
- `1-root/` — CSS variables (design tokens), fonts
- `2-core/` — Components: banner, buttons, text, cycle, date, icon, input, tooltip
- `3-unit/` — Composite: list, row, table
- `4-page/` — Page-level layouts
- `x-icon/` — SVG icon library

## Distribution

- npm package (`@alpha` tag)
- CDN via jsDelivr

## Integration

Foundation for Ezo, TAU, and all 0001 products.
