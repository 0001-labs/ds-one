---
title: Quick Start
description: Get up and running with DS one in minutes
---

## Your First DS one Page

Create a simple HTML page using DS one components:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My DS one App</title>

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/ds-one@alpha/DS1/1-root/one.css"
    />
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/ds-one@alpha/dist/ds-one.bundle.js"
    ></script>
  </head>
  <body>
    <ds-layout>
      <header-v1 slot="header">
        <title-v1 variant="site">My App</title-v1>
      </header-v1>

      <main>
        <text-v1 variant="heading">Welcome to DS one</text-v1>
        <text-v1 variant="body">
          A modern design system built with TypeScript and Lit.
        </text-v1>

        <ds-button variant="primary">Get Started</ds-button>
        <ds-button variant="secondary">Learn More</ds-button>
      </main>
    </ds-layout>
  </body>
</html>
```

## Basic Components

### Button

```html
<ds-button variant="primary">Primary Button</ds-button>
<ds-button variant="secondary">Secondary Button</ds-button>
<ds-button variant="text">Text Button</ds-button>
```

### Text

```html
<text-v1 variant="heading">This is a heading</text-v1>
<text-v1 variant="body">This is body text</text-v1>
<text-v1 variant="small">This is small text</text-v1>
```

### Link

```html
<link-v1 href="https://example.com">Visit Example</link-v1>
<link-v1 href="/about" internal>About Page</link-v1>
```

## With Translation Support

DS one includes built-in internationalization:

```html
<script type="module">
  import {
    setLanguage,
    loadTranslations,
  } from "https://cdn.jsdelivr.net/npm/ds-one@alpha/dist/ds-one.bundle.js";

  // Load translations
  await loadTranslations({
    en: { greeting: "Hello", welcome: "Welcome" },
    es: { greeting: "Hola", welcome: "Bienvenido" },
  });

  // Set language
  setLanguage("en");
</script>

<text-v1 data-key="greeting"></text-v1>
<text-v1 data-key="welcome"></text-v1>
```

## Next Steps

- Explore [all components](/2-core/button/)
- Learn about [theming](/advanced/theming/)
- Set up [internationalization](/advanced/i18n/)
