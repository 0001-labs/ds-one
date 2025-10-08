# DS one Examples

This folder contains simple HTML examples demonstrating how to use DS one components.

## Examples

### 1. Basic Example (`basic.html`)

The simplest way to get started with DS one. Shows how to:
- Import styles
- Import components with script tags
- Use basic components (app, button, text)

```bash
open basic.html
```

### 2. Icons Example (`with-icons.html`)

Demonstrates the icon component library:
- How to use icon components
- Different icon types available
- Icon component API

```bash
open with-icons.html
```

### 3. CDN Example (`cdn.html`)

Shows how to use DS one from a CDN without npm install:
- Load from jsDelivr CDN
- No build step required
- Perfect for quick prototypes

```bash
open cdn.html
```

### 4. Interactive Example (`interactive.html`)

Advanced example with user interactions:
- Button click handlers
- Accent color cycling
- Language switching
- Interactive components

```bash
open interactive.html
```

## Running the Examples

### Option 1: Open Directly in Browser

Simply double-click any `.html` file or open it in your browser.

### Option 2: Use a Local Server (Recommended)

For better module resolution, use a local server:

```bash
# Using Python
python -m http.server 3000

# Using Bun
bun run --bun serve -p 3000

# Then open: http://localhost:3000/examples/basic.html
```

## Using in Your Own Project

### From NPM Package

```bash
bun add ds-one@beta
```

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/ds-one/DS1/1-root/screen.css" />
    <script type="module" src="node_modules/ds-one/dist/index.esm.js"></script>
  </head>
  <body>
    <button-v1 variant="primary">Click me</button-v1>
  </body>
</html>
```

### From CDN

```html
<!DOCTYPE html>
<html>
  <head>
    <link 
      rel="stylesheet" 
      href="https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta/DS1/1-root/screen.css"
    />
    <script type="module">
      import 'https://cdn.jsdelivr.net/npm/ds-one@0.1.0-beta/dist/index.esm.js';
    </script>
  </head>
  <body>
    <button-v1 variant="primary">Click me</button-v1>
  </body>
</html>
```

## Available Components

- `app-v1` - Application container
- `button-v1` - Button with variants (primary, secondary, title)
- `text-v1` - Typography component (heading, body, caption)
- `icon-v1` - Icon library
- `cycle-v1` - Cyclic selector (accent-color, language)
- `tooltip-v1` - Tooltip component
- `price-v1` - Price display
- `markdown-v1` - Markdown renderer
- `list-v1` - List component
- `panel-v1` - Panel component
- `row-v1` - Row layout

## Component Properties

### Button

```html
<button-v1 
  variant="primary|secondary|title"
  key="languageKey"
  href="/path"
  disabled
>
  Button Text
</button-v1>
```

### Text

```html
<text-v1 
  variant="heading|body|caption"
  key="languageKey"
>
  Your text here
</text-v1>
```

### App

```html
<app-v1 type="default|board">
  <!-- Your components here -->
</app-v1>
```

## Learn More

- [DS one on NPM](https://www.npmjs.com/package/ds-one)
- [GitHub Repository](https://github.com/Jo4712/ds-one)
- [Full Documentation](../README.md)

