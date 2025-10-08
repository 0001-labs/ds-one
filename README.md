# DS one

Build modern UIs with web components!

> A component-based design system built with TypeScript and LitElement that provides reusable UI components with built-in theming, internationalization, and accessibility features.

[![npm version](https://badge.fury.io/js/ds-one.svg)](https://badge.fury.io/js/ds-one)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-0.1.0--beta-blue.svg)](https://github.com/Jo4712/ds-one)

**DS one** is a modern design system that provides a comprehensive set of reusable UI components built with Web Components. Think "Material Design meets Web Standards"—a simple, accessible component library that works with any framework or vanilla JavaScript.

**📦 Now available on NPM!** Install with `bun add ds-one@beta` and start building today.

## 🚀 Quick Start

### Install

```bash
# Using bun (recommended)
bun add ds-one@beta

# Using npm
npm install ds-one@beta

# Using yarn
yarn add ds-one@beta
```

**Note**: Currently published as beta version `0.1.0-beta`. Use `@beta` tag to install.

### Basic Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="node_modules/design-system-one/1 Root/screen.css"
    />
    <script
      type="module"
      src="node_modules/design-system-one/2 Core/button-v1.ts"
    ></script>
    <script
      type="module"
      src="node_modules/design-system-one/2 Core/text-v1.ts"
    ></script>
  </head>
  <body>
    <button-v1 variant="primary" key="welcomeButton">Get Started</button-v1>
    <text-v1 variant="heading" key="mainHeading">Welcome to DS one</text-v1>
  </body>
</html>
```

### Online demo

Try DS one in your browser: **[ds-one.dev/demo](https://ds-one.dev/demo)**

## ✨ Features

### Core Components

- **Web Components**: Built with LitElement for maximum compatibility
- **TypeScript support**: Full type definitions and IntelliSense
- **Accessibility**: ARIA support and keyboard navigation built-in
- **Responsive design**: Mobile-first with scaling factors
- **Theme system**: CSS custom properties for easy customization

### Internationalization

- **Language keys**: All text via camelCase keys for full i18n
- **Notion CMS integration**: Dynamic content management
- **Fallback support**: Graceful degradation when translations missing
- **Multi-language**: Built-in language switching

### Developer Experience

- **Zero dependencies**: Pure Web Components, no framework required
- **Fast loading**: Optimized bundle size and tree-shaking
- **Hot reload**: Live updates in development
- **Comprehensive testing**: Full test coverage

## Documentation

- **[Component Reference](./docs/components.md)** - Complete component API documentation
- **[Theming Guide](./docs/theming.md)** - Customization and accent colors
- **[Internationalization](./docs/i18n.md)** - Language keys and Notion CMS setup
- **[Examples](./docs/examples.md)** - Usage examples and patterns

## Current Status: v0.1.0-beta

### Completed Features

- Core component library (button, text, app, icon)
- Theming system with accent color support
- Internationalization with language keys
- Responsive design with mobile scaling
- TypeScript definitions and type safety
- Accessibility features and ARIA support
- Notion CMS integration for dynamic content

### In Progress (0.1.0 Beta Goals)

- Additional component variants and states
- Enhanced theming documentation
- Component testing suite
- Storybook integration

### Planned (0.2.0+)

- Advanced components (forms, navigation, data display)
- Animation system and transitions
- Design tokens and design system documentation
- Figma integration and design handoff tools

## Architecture

```
DS one/
├── DS1/
│   ├── 0-face/       # Device and language detection
│   ├── 1-root/       # Core styles, fonts, and design tokens
│   ├── 2-core/       # Core components (buttons, text, etc.)
│   ├── 3-unit/       # Composite components
│   ├── 4-page/       # Page-level components
│   ├── x-utils/      # Shared utilities (language, theme, etc.)
│   └── x-icon/       # SVG icon library
├── dist/             # Built files for NPM
├── examples/         # HTML examples
└── docs/             # Documentation
```

## Roadmap

### v0.1.0 (Beta) - Q1 2025

- [ ] Complete core component set
- [ ] Enhanced theming system
- [ ] Component testing suite
- [ ] Storybook documentation

### v0.2.0 (Stable) - Q2 2025

- [ ] Advanced components (forms, navigation)
- [ ] Animation system
- [ ] Design tokens
- [ ] Figma integration

### v1.0.0 (Production) - Q3 2025

- [ ] Complete feature set
- [ ] Production-ready tooling
- [ ] Long-term API stability

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Jo4712/ds-one.git
cd ds-one

# Install dependencies
bun install

# Run tests
bun test

# Start development server
bun run dev

# Build components
bun run build
```

### Release Process

```bash
# Create a new release
bun run release:patch    # 0.1.0-beta → 0.1.1-beta
bun run release:minor    # 0.1.0-beta → 0.2.0-beta
bun run release:major    # 0.1.0-beta → 1.0.0
```

## License

MIT © [DS one](https://github.com/Jo4712/ds-one)

## 🔗 Links

- **[Online Demo](https://dsone.dev/demo)** - Try DS one in your browser
- **[Documentation](https://dsone.dev/docs)** - Complete documentation
- **[GitHub](https://github.com/Jo4712/ds-one)** - Source code and issues
- **[NPM Package](https://www.npmjs.com/package/ds-one)** - Install from NPM

---

**DS one** - _Build modern UIs with web components that work everywhere._
