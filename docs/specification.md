# Specification

> Complete specification for publishing and distributing DS one as an NPM package with multiple installation methods

## Overview

This document outlines the complete specification for publishing DS one as a distributable NPM package, including installation methods, file structure, build process, and usage patterns.

## Package Information

### Basic Metadata

```json
{
  "name": "ds-one",
  "version": "0.1.0-beta",
  "description": "a plug and play design system built with TypeScript and LitElement",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist/",
    "1 Root/",
    "2 Core/",
    "3 Unit/",
    "4 Page/",
    "x Icon/",
    "README.md",
    "LICENSE"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./1 Root/screen.css",
    "./components/*": "./2 Core/*.js",
    "./units/*": "./3 Unit/*.js",
    "./pages/*": "./4 Page/*.js",
    "./icons/*": "./x Icon/*.svg"
  },
  "sideEffects": false,
  "keywords": [
    "design-system",
    "web-components",
    "lit-element",
    "typescript",
    "ui-kit",
    "components",
    "theming",
    "i18n"
  ],
  "author": "Jo4712 <jaa90@icloud.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Jo4712/ds-one.git"
  },
  "homepage": "https://dsone.dev",
  "bugs": {
    "url": "https://github.com/Jo4712/ds-one/issues"
  }
}
```

## Installation Methods

### 1. NPM Installation

```bash
npm install ds-one
```

### 2. Bun Installation

```bash
bun add ds-one
```

### 3. Yarn Installation

```bash
yarn add ds-one
```

### 4. CDN Installation

#### ESM (Recommended)

```html
<script type="module">
  import "https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta/dist/index.esm.js";
  import "https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta/1%20Root/screen.css";
</script>
```

#### UMD (Universal)

```html
<script src="https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta/dist/index.umd.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta/1%20Root/screen.css"
/>
```

#### Skypack (ESM with auto-optimization)

```html
<script type="module">
  import "https://cdn.skypack.dev/ds-one@0.1.0-beta";
  import "https://cdn.skypack.dev/ds-one@0.1.0-beta/1%20Root/screen.css";
</script>
```

## File Structure

### Package Distribution Structure

```
ds-one/
├── DS1/                     # Source files
│   ├── 0-face/              # Device and language detection
│   │   ├── 2025-04-23-device.ts
│   │   └── 2025-04-23-language.ts
│   ├── 1-root/              # Core styles and fonts
│   │   ├── screen.css
│   │   ├── dev.css
│   │   └── fonts/
│   ├── 2-core/              # Core components
│   │   ├── button-v1.ts
│   │   ├── text-v1.ts
│   │   ├── app-v1.ts
│   │   └── ...
│   ├── 3-unit/              # Composite components
│   │   ├── list-v1.ts
│   │   ├── panel-v1.ts
│   │   └── ...
│   ├── 4-page/              # Page-level components
│   │   └── app-v1.ts
│   ├── x-utils/             # Shared utilities
│   │   ├── language.ts
│   │   ├── theme.ts
│   │   ├── notionBrowser.ts
│   │   └── ...
│   └── x-icon/              # SVG icon library
│       ├── 1x.svg
│       └── ...
├── dist/                    # Built files
│   ├── index.js             # CommonJS build
│   ├── index.esm.js         # ES Module build
│   └── index.d.ts           # TypeScript definitions
├── examples/                # HTML examples
├── docs/                    # Documentation
├── package.json
├── README.md
└── LICENSE
```

## Build Configuration

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "useDefineForClassFields": false
  },
  "include": ["DS1/2-core/**/*", "DS1/3-unit/**/*", "DS1/4-page/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

### Build Scripts

```json
{
  "scripts": {
    "build": "bun run build:types && bun run build:components",
    "build:types": "tsc --noEmit",
    "build:components": "bun run build:core && bun run build:units && bun run build:pages",
    "build:core": "bun run build:component -- DS1/2-core",
    "build:units": "bun run build:component -- DS1/3-unit",
    "build:pages": "bun run build:component -- DS1/4-page",
    "build:component": "bun run scripts/build-component.ts",
    "prepublishOnly": "bun run build",
    "dev": "bun run --bun serve",
    "test": "bun test",
    "lint": "eslint . --ext .ts,.js",
    "format": "prettier --write ."
  }
}
```

## Usage Patterns

### 1. Full Package Import

```javascript
// Import entire design system
import "ds-one";
import "ds-one/styles";

// Components are auto-registered
document.body.innerHTML = `
  <app-v1 type="default">
    <text-v1 variant="heading" key="welcomeTitle">Welcome</text-v1>
    <button-v1 variant="primary" key="getStarted">Get Started</button-v1>
  </app-v1>
`;
```

### 2. Individual Component Import

```javascript
// Import specific components
import "ds-one/components/button-v1";
import "ds-one/components/text-v1";
import "ds-one/styles";

// Use imported components
document.body.innerHTML = `
  <button-v1 variant="primary">Click me</button-v1>
  <text-v1 variant="body">Hello World</text-v1>
`;
```

### 3. Tree-shaking with Named Imports

```javascript
// Import only what you need
import { Button, Text, App } from "ds-one";
import "ds-one/styles";

// Use imported components
const app = new App();
const button = new Button();
const text = new Text();
```

### 4. CSS-only Import

```css
/* Import only styles */
@import "ds-one/styles";

/* Use CSS custom properties */
.my-component {
  --accent-color: var(--blue);
  --scaling-factor: 1.2;
}
```

## CDN Distribution

### JSDelivr Configuration

```html
<!-- Latest version -->
<script type="module" src="https://cdn.jsdelivr.net/npm/ds-one"></script>

<!-- Specific version -->
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta"
></script>

<!-- Specific file -->
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta/dist/components/button-v1.js"
></script>
```

### Unpkg Configuration

```html
<!-- Latest version -->
<script src="https://unpkg.com/ds-one"></script>

<!-- Specific version -->
<script src="https://unpkg.com/ds-one@0.1.0-beta"></script>

<!-- Styles -->
<link
  rel="stylesheet"
  href="https://unpkg.com/ds-one@0.1.0-beta/1%20Root/screen.css"
/>
```

## TypeScript Support

### Type Definitions

```typescript
// Global component declarations
declare global {
  interface HTMLElementTagNameMap {
    "button-v1": Button;
    "text-v1": Text;
    "app-v1": App;
    "cycle-v1": Cycle;
    "icon-v1": Icon;
    "tooltip-v1": Tooltip;
    "price-v1": Price;
    "markdown-v1": Markdown;
    "federated-v1": Federated;
    "home-v1": Home;
    "list-v1": List;
    "panel-v1": Panel;
    "row-v1": Row;
  }
}

// Component interfaces
interface Button extends HTMLElement {
  variant: "primary" | "secondary" | "title";
  disabled: boolean;
  key: string;
  href: string;
}

interface Text extends HTMLElement {
  variant: "heading" | "body" | "caption";
  key: string;
}

interface App extends HTMLElement {
  type: "default" | "board";
}
```

## Browser Support

### Target Browsers

- **Modern Browsers**: Chrome 88+, Firefox 78+, Safari 14+, Edge 88+
- **Web Components**: Native support required
- **ES Modules**: Native support required
- **CSS Custom Properties**: Native support required

### Polyfills (Optional)

For older browsers, include polyfills:

```html
<!-- Web Components polyfill -->
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.6.0/webcomponents-loader.js"></script>

<!-- CSS Custom Properties polyfill -->
<script src="https://unpkg.com/css-vars-ponyfill@2.4.7/dist/css-vars-ponyfill.min.js"></script>
<script>
  cssVars({
    onlyLegacy: true,
  });
</script>
```

## Performance Considerations

### Bundle Size

- **Core library**: ~15KB gzipped
- **Individual components**: ~2-5KB each
- **Styles**: ~8KB gzipped
- **Total with all components**: ~45KB gzipped

### Loading Strategy

```html
<!-- Critical CSS inline -->
<style>
  /* Critical styles here */
</style>

<!-- Non-critical CSS loaded async -->
<link
  rel="preload"
  href="ds-one/styles"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>

<!-- Components loaded on demand -->
<script type="module">
  // Load components as needed
  if (document.querySelector("button-v1")) {
    import("ds-one/components/button-v1");
  }
</script>
```

## Development Workflow

### Local Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Run tests
bun test

# Build for production
bun run build

# Publish to NPM
bun run publish
```

### Testing Package Locally

```bash
# Link package locally
bun link

# In test project
bun link ds-one

# Test installation
bun add ds-one
```

## Publishing Process

### Pre-publish Checklist

- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] Bundle size within limits
- [ ] Documentation updated
- [ ] Version bumped correctly
- [ ] CHANGELOG.md updated

### Automated Publishing

```bash
# Patch release
bun run release:patch

# Minor release
bun run release:minor

# Major release
bun run release:major

# Beta release
bun run release:beta
```

## Security Considerations

### Content Security Policy

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' https://cdn.jsdelivr.net https://unpkg.com; 
               style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com;"
/>
```

### Package Integrity

- All CDN resources use integrity hashes
- NPM package includes checksums
- Signed releases with GPG signatures

## Migration Guide

### From Local Development

```javascript
// Before (local development)
import "./DS1/2-core/button-v1.ts";
import "./DS1/1-root/screen.css";

// After (NPM package)
import "ds-one/components/button-v1";
import "ds-one/styles";
```

### Version Updates

```bash
# Update to latest
bun update ds-one

# Update to specific version
bun add ds-one@0.2.0

# Check for updates
bun outdated ds-one
```

## Troubleshooting

### Common Issues

1. **Components not registering**: Ensure CSS is loaded before JavaScript
2. **TypeScript errors**: Update @types definitions
3. **Styling issues**: Check CSS custom property support
4. **Build failures**: Verify Node.js version compatibility

### Debug Mode

```javascript
// Enable debug logging
window.DS_ONE_DEBUG = true;

// Check component registration
console.log(customElements.get("button-v1"));
```

## Future Enhancements

### Planned Features

- [ ] ESM-only package for smaller bundle size
- [ ] Individual component packages (`@ds-one/button`, `@ds-one/text`)
- [ ] Framework-specific wrappers (React, Vue, Angular)
- [ ] Design tokens package (`@ds-one/tokens`)
- [ ] Storybook integration
- [ ] Figma plugin for design handoff

### Experimental Features

- [ ] CSS-in-JS support
- [ ] Server-side rendering
- [ ] Progressive enhancement mode
- [ ] Automatic component lazy loading

---

This specification ensures DS one can be easily installed and used across different environments while maintaining optimal performance and developer experience.
