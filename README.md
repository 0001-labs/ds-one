# DS one (0.3.0-alpha.9)

A plug and play design system

> A component-based design system built with Lit that provides reusable UI components with built-in theming, internationalization, and accessibility features.

**DS one** is a comprehensive modern design system that provides a set of reusable UI components built with Web Components via Lit. Available via CDN or npm.

## Installation

```bash
# Using bun (recommended)
bun add ds-one@alpha

# Using npm
npm install ds-one@alpha

# Using yarn
yarn add ds-one@alpha

```

**Note**: Currently published as alpha version `0.3.0-alpha.9`

## Quick Start

### CDN Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- CSS -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/ds-one@alpha/DS1/1-root/one.css"
    />
    <!-- Bundle -->
    <script type="module">
      import "https://cdn.jsdelivr.net/npm/ds-one@alpha/dist/ds-one.bundle.min.js";
    </script>
  </head>
  <body>
    <ds-button variant="primary" text="Get Started"></ds-button>
    <ds-text text="Welcome"></ds-text>
  </body>
</html>
```

### NPM Usage

```tsx
import "ds-one/styles";
import "ds-one";
```

## Documentation

See the full documentation for DS one at: [**dsone.dev**](https://dsone.dev/)

## Features

### Internationalization

- **Language keys**: Add a `translations.json` to your project and everything is translatable with the cycle type language button
- **Multi-language**: Automatically switches language based on browser language settings

### Core Components

- **Web Components**: Built with Lit for maximum compatibility
- **Responsive design**: Mobile-first approach with scaling factor
- **Theme system**: CSS custom properties for easy customization

### Completed Features

- ✅ Core component library (ds-button, ds-text, ds-icon, etc.)
- ✅ Theming system with accent colors
- ✅ Internationalization with language keys
- ✅ Responsive design with mobile scaling
- ✅ CDN delivery via jsDelivr
- ✅ NPM package published

### In Progress

- 🚧 Documentation site
- 🚧 Additional component variants and states defined in Figma

## Architecture

```
DS one/
├── dist/             # Built files for NPM
├── DS1/
│   ├── 0-face/       # Utilities for device detection, internationalization,
│   │                 # localStorage preferences, pricing and theme
│   ├── 1-root/       # Core styles, fonts, and design tokens
│   │                 # (everything as CSS variables)
│   ├── 2-core/       # Core components (banner, buttons, text, cycle,
│   │                 # date, icon, input, tooltip)
│   ├── 3-unit/       # Composite components (list, row, table)
│   ├── 4-page/       # Page-level components for layout (layout, grid)
│   └── x-icon/       # SVG icon library
├── examples/         # HTML examples
└── docs/             # Documentation

```

## License

MIT © [DS one](https://github.com/0001-labs/ds-one)

## 🔗 Links

- [**Website**](https://dsone.dev/) - Official website
- [**GitHub**](https://github.com/0001-labs/ds-one) - Source code and issues
- [**NPM Package**](https://www.npmjs.com/package/ds-one) - Install with `@alpha` tag
- [**CDN**](https://cdn.jsdelivr.net/npm/ds-one@alpha/) - Direct browser usage
