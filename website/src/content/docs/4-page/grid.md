---
title: Grid
description: Learn about grid components in DS one
---

# Grid

Grid components create structured layouts using CSS Grid and provide alignment utilities for organizing content.

## Flexible Content

`ds-grid` is a **flexible layout component** that can hold any content. Each grid cell can contain:
- **`ds-card`** - For card-based layouts
- **`ds-container`** - For nested containers
- Any other components or HTML elements

## Features

The grid components include:

- CSS Grid-based layouts
- Column and row management
- Responsive grid behavior
- Gap and spacing utilities
- Alignment and distribution options

Grids are essential for creating responsive, multi-column layouts with precise control.

## Example

```html
<ds-grid columns="3" gap="medium">
  <ds-card>Card 1</ds-card>
  <ds-card>Card 2</ds-card>
  <ds-card>Card 3</ds-card>
</ds-grid>
```
