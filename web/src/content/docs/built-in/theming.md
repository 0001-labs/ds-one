---
title: Theming
description: Built-in theming system in DS one
---

## Overview

DS one uses CSS custom properties for theming, allowing you to customize colors and styles without modifying component code.

## Quick Customization

### Change Accent Color

```html
<style>
  :root {
    --accent-color: #6366f1;
  }
</style>
```

### Dark Mode Support

DS one automatically adapts to system dark mode preferences:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --accent-color: #818cf8;
  }
}
```

## Component Theming

### Per-Component Colors

```html
<div style="--accent-color: #ef4444;">
  <button-v1 variant="primary">Red Button</button-v1>
</div>

<div style="--accent-color: #10b981;">
  <button-v1 variant="primary">Green Button</button-v1>
</div>
```

## CSS Variables

Common theme variables:

```css
:root {
  --accent-color: #0066cc;
  --background-color: #ffffff;
  --text-color: #000000;
  --border-color: #e0e0e0;
}
```

## Learn More

For detailed theming documentation, see the [Advanced Theming Guide](/advanced/theming/).
