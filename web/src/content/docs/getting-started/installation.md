---
title: Installation
description: Learn how to install DS one in your project
---

## Installation Methods

DS one can be installed via package managers or loaded directly from a CDN.

### Package Manager

Install DS one using your preferred package manager:

```bash
# Using bun (recommended)
bun add ds-one

# Using npm
npm install ds-one

# Using yarn
yarn add ds-one
```

### CDN (No Build Step)

For quick prototyping or simple projects, you can load DS one directly from a CDN:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DS one Example</title>

    <!-- DS one Styles -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/ds-one@0.1.8/DS1/1-root/one.css"
    />

    <!-- DS one Components -->
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/ds-one@0.1.8/dist/ds-one.bundle.js"
    ></script>
  </head>
  <body>
    <button-v1 variant="primary">Click Me</button-v1>
  </body>
</html>
```

### Using @beta Tag

For automatic updates to the latest beta version, you can use the `@beta` tag:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/ds-one@beta/dist/ds-one.bundle.js"
></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/ds-one@beta/DS1/1-root/one.css"
/>
```

## Import in JavaScript/TypeScript

After installing via package manager, you can import components:

```typescript
// Import all components
import "ds-one";

// Or import specific components
import "ds-one/DS1/2-core/button-v1";
import "ds-one/DS1/2-core/text-v1";

// Import styles
import "ds-one/styles";
```

## Next Steps

- [Quick Start Guide](/getting-started/quick-start/) - Learn the basics
- [Components](/components/button/) - Explore available components
