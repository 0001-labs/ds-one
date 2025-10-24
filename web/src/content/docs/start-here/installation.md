---
title: Installation
description: Learn how to install DS one in your project
---

DS one can be installed via package managers or loaded directly from a CDN.

### Package Manager

Install DS one using your preferred package manager:

```bash
# Using bun (recommended)
bun add ds-one@alpha

# Using npm
npm install ds-one@alpha

# Using yarn
yarn add ds-one@alpha
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
      href="https://cdn.jsdelivr.net/npm/ds-one@alpha/DS1/1-root/one.css"
    />

    <!-- DS one Components -->
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/ds-one@alpha/dist/ds-one.bundle.js"
    ></script>
  </head>
  <body>
    <ds-button variant="primary">Click Me</ds-button>
  </body>
</html>
```

### Using @alpha Tag

For automatic updates to the latest alpha version, you can use the `@alpha` tag:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/ds-one@alpha/dist/ds-one.bundle.js"
></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/ds-one@alpha/DS1/1-root/one.css"
/>
```

## Import in JavaScript/TypeScript

After installing via package manager, you can import components:

```typescript
// Import all components
import "ds-one";

// Or import specific components
import "ds-one/DS1/2-core/ds-button";
import "ds-one/DS1/2-core/ds-text";

// Import styles
import "ds-one/styles";
```

## Next Steps

- [Quick Start Guide](/start-here/quick-start/) - Learn the basics
- [Components](/2-core/button/) - Explore available components
