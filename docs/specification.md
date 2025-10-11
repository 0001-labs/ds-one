# Specification

> Complete specification for publishing and distributing DS one as an NPM package with multiple installation methods

## Overview

This document outlines the complete specification for publishing DS one as a distributable NPM package, including installation methods, file structure, build process, and usage patterns.

## Supported Languages

DS one supports the following languages out of the box:

- **Danish** (da)
- **Norwegian** (no)
- **Swedish** (sv)
- **German** (de)
- **English** (en)
- **French** (fr)
- **Spanish** (es)
- **Chinese** (zh)
- **Japanese** (ja)
- **Korean** (ko)

The design system uses standard [ISO 639-1 language codes](https://www.w3schools.com/tags/ref_language_codes.asp). The internationalization features automatically detect available languages from your translation files and provide real-time language switching capabilities through the `<cycle-v1 type="language">` component.

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
│   │   └── ...
│   ├── 3-unit/              # Composite components
│   │   ├── list-v1.ts
│   │   ├── panel-v1.ts
│   │   └── ...
│   ├── 4-page/              # Page-level components
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
  <ds-layout mode="portfolio" align="center">
    <text-v1
      style="grid-area: title"
      variant="heading"
      key="welcomeTitle"
    >
      Welcome
    </text-v1>
    <div
      style="grid-area: projects; display: flex; gap: var(--1)"
    >
      <button-v1 variant="primary" key="getStarted">
        Get Started
      </button-v1>
      <button-v1 variant="secondary">Learn more</button-v1>
    </div>
  </ds-layout>
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
import { Button, Text, Layout } from "ds-one";
import "ds-one/styles";

// Use imported components
const layout = new Layout();
layout.mode = "portfolio";

const button = new Button();
button.variant = "primary";
button.textContent = "Click me";

const text = new Text();
text.variant = "body";
text.textContent = "Hello World";

layout.append(text, button);
document.body.append(layout);
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
  href="https://unpkg.com/ds-one@0.1.0-beta/1-root/screen.css"
/>
```

### Internationalization with CDN

DS one includes a powerful, automatic translation system for CDN users. The system automatically detects and loads translations from a local JSON file (defaults to `keys.json`), making internationalization simple and intuitive. Out of the box the cycle component prioritises these 10 languages (using standard HTML `lang` codes in your JSON keys): Danish (`da-DK`), Norwegian (`nb-NO`), Swedish (`sv-SE`), German (`de-DE`), English (`en-US`), French (`fr-FR`), Spanish (`es-ES`), Chinese (`zh-Hans` or `zh-Hant`), Japanese (`ja-JP`), and Korean (`ko-KR`).

#### Automatic Translation Loading

The CDN bundle automatically attempts to load a translation JSON file from the same directory as your HTML file.

**For common filenames:** Automatically tries `keys.json`, `tekst.json`, `tekster.json`, `language.json`, `languages.json`, `translations.json`, `translate.json`, `i18n.json`, `locales.json`, `strings.json`, `text.json`, `texts.json` (no configuration needed).

**For ANY custom filename** (like `my-project-2024.json` or `site-languages.json`), specify it with:

- `data-ds-one-translations="filename.json"` on the `<script>` tag, OR
- `window.DS_ONE_TRANSLATIONS_FILE = "filename.json"` before import, OR
- `<meta name="ds-one:translations" content="filename.json" />`

If none are found, the system falls back to bundled translations.

**Basic Setup (auto-detects common filenames):**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Multilingual Site</title>

    <!-- Import CSS stylesheet -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/ds-one@0.1.9-beta.3/DS1/1-root/screen.css"
    />

    <!-- Import DS one bundle - will auto-load keys.json, tekst.json, etc. -->
    <script type="module">
      import "https://cdn.jsdelivr.net/npm/ds-one@0.1.9-beta.3/dist/ds-one.bundle.min.js";
    </script>
  </head>
  <body>
    <!-- Language selector - automatically shows available languages -->
    <cycle-v1 type="language"></cycle-v1>

    <!-- Text components with translation keys -->
    <text-v1 key="welcome"></text-v1>
    <text-v1 key="description"></text-v1>

    <!-- Works in buttons too -->
    <button-v1 variant="primary">
      <text-v1 key="getStarted"></text-v1>
    </button-v1>
  </body>
</html>
```

**Custom Filename (ANY name works):**

```html
<!-- For a file named 230984324u023.json or my-custom-name.json -->
<script type="module" data-ds-one-translations="230984324u023.json">
  import "https://cdn.jsdelivr.net/npm/ds-one@0.1.9-beta.3/dist/ds-one.bundle.min.js";
</script>
```

#### Translation File Structure

Create a translation JSON file (default name `keys.json`) in the same directory as your HTML files. The system uses ISO language codes as top-level keys:

```json
{
  "en": {
    "welcome": "Welcome to our website",
    "description": "This is a demonstration of translations",
    "getStarted": "Get Started"
  },
  "da": {
    "welcome": "Velkommen til vores hjemmeside",
    "description": "Dette er en demonstration af oversættelser",
    "getStarted": "Kom i gang"
  },
  "ja": {
    "welcome": "ウェブサイトへようこそ",
    "description": "これは翻訳のデモンストレーションです",
    "getStarted": "はじめる"
  }
}
```

**Supported Language Codes:**

- Use ISO 639-1 language codes with ISO 3166-1 country codes
- Format: `language-COUNTRY` (e.g., `en-US`, `da-DK`, `ja-JP`)
- The system is extensible and supports any valid ISO language code

#### Dynamic Language Detection

The `<cycle-v1 type="language">` component automatically:

1. **Detects available languages** from your translation file
2. **Shows only the languages you've defined** (no manual configuration)
3. **Persists user language choice** in localStorage
4. **Updates all text components** in real-time when language changes

```html
<!-- Language cycle - automatically populated with available languages -->
<cycle-v1 type="language"></cycle-v1>
```

If your translation file has 3 languages, the cycle will show 3 options. Add a 4th language to the JSON, and it automatically appears in the cycle—no code changes needed!

Language labels are generated automatically using `Intl.DisplayNames` (when available) and fall back to curated names for the 10 priority languages: Danish, Norwegian, Swedish, Portuguese, Spanish, Chinese, Korean, Japanese, English, and German.

#### Auto-Updating Components

All `<text-v1>` components with a `key` attribute automatically update when the user changes language. No page reload required.

```html
<!-- These all update automatically when language changes -->
<text-v1 key="siteTitle"></text-v1>
<text-v1 key="welcomeMessage"></text-v1>
<text-v1 key="footerCopyright"></text-v1>

<!-- Works inside other components too -->
<button-v1 variant="primary">
  <text-v1 key="submitButton"></text-v1>
</button-v1>
```

#### Complete Example

**File structure:**

```
my-website/
├── index.html
├── about.html
├── contact.html
└── keys.json (or your chosen filename)
```

**Example translation file (`keys.json`):**

```json
{
  "en": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "welcome": "Welcome",
    "description": "A modern multilingual website"
  },
  "da": {
    "home": "Hjem",
    "about": "Om",
    "contact": "Kontakt",
    "welcome": "Velkommen",
    "description": "En moderne flersproget hjemmeside"
  },
  "ja": {
    "home": "ホーム",
    "about": "について",
    "contact": "お問い合わせ",
    "welcome": "ようこそ",
    "description": "モダンな多言語ウェブサイト"
  }
}
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Multilingual Site</title>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/ds-one@0.1.8/DS1/1-root/screen.css"
    />

    <script type="module">
      import "https://cdn.jsdelivr.net/npm/ds-one@0.1.8/dist/ds-one.bundle.min.js";
    </script>
  </head>
  <body>
    <!-- Header with language selector -->
    <header>
      <text-v1 key="welcome"></text-v1>
      <cycle-v1 type="language"></cycle-v1>
    </header>

    <!-- Navigation - all text updates on language change -->
    <nav>
      <button-v1 href="index.html"><text-v1 key="home"></text-v1></button-v1>
      <button-v1 href="about.html"><text-v1 key="about"></text-v1></button-v1>
      <button-v1 href="contact.html"
        ><text-v1 key="contact"></text-v1
      ></button-v1>
    </nav>

    <!-- Content -->
    <main>
      <text-v1 key="description"></text-v1>
    </main>
  </body>
</html>
```

#### How It Works

1. **Automatic Detection**: When the CDN bundle loads, it automatically attempts to fetch your configured translation file (falling back to `./keys.json`)
2. **Language Registration**: Available languages are extracted from the JSON keys
3. **Component Initialization**: The `cycle-v1` component populates with available languages
4. **User Selection**: User clicks the language cycle to change languages
5. **Event Broadcasting**: A `language-changed` event is dispatched
6. **Automatic Updates**: All `text-v1` components listen for the event and update their content
7. **Persistence**: The selected language is saved to localStorage

#### Benefits

- **Zero Configuration**: Just add a translation JSON file next to your HTML
- **Automatic Discovery**: Languages are detected from the JSON structure
- **Real-time Updates**: No page reload needed
- **Persistent Preference**: User's language choice is remembered
- **Extensible**: Add new languages by editing JSON—no code changes
- **Fallback Support**: Falls back to bundled translations if no translation file is found

#### Advanced: Custom Translation Loading

For advanced use cases, you can manually load translations:

```javascript
// Load custom translations programmatically
window.DS_ONE_TRANSLATIONS = {
  "en-US": { key: "value" },
  "fr-FR": { key: "valeur" },
};

// Notify the system
window.dispatchEvent(new CustomEvent("translations-ready"));
```

See the complete working example in `examples/project-cdn/`.

## TypeScript Support

### Type Definitions

```typescript
// Global component declarations
declare global {
  interface HTMLElementTagNameMap {
    "button-v1": Button;
    "text-v1": Text;
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

## Documentation Strategy

### Starlight Documentation Site

The primary documentation will be built using [Starlight](https://starlight.astro.build/), Astro's documentation framework, providing:

- **Component Documentation**: Interactive component examples with live code
- **API Reference**: Complete TypeScript interface documentation
- **Theming Guide**: Customization and theming instructions
- **Integration Guides**: Framework-specific implementation examples
- **Design Tokens**: Color, typography, and spacing reference
- **Migration Guides**: Version upgrade instructions

### Notion Sync Integration

Documentation will be synchronized with Notion for:

- **Internal Documentation**: Team collaboration and internal notes
- **Design System Governance**: Component approval workflows
- **Version Control**: Documentation versioning alongside code releases
- **Cross-Platform Access**: Notion's collaborative editing and commenting
- **Integration with Design Process**: Seamless handoff between design and development

#### Sync Implementation

```typescript
// Automated sync from Starlight to Notion
interface DocumentationSync {
  source: "starlight";
  target: "notion";
  components: ComponentDocumentation[];
  api: APIDocumentation[];
  guides: IntegrationGuide[];
  syncFrequency: "on-release" | "on-commit" | "manual";
}
```

## Future Enhancements

### Planned Features

- [x] Starlight documentation site with component, theming, and integration guides
- [ ] Notion sync integration for collaborative documentation
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
