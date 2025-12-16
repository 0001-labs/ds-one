---
title: Date Component
description: Simple component for displaying the current year
---

The `ds-date` component displays the current year, commonly used in footers and copyright notices.

## Basic Usage

```html
<ds-date></ds-date>
```

This will display the current year (e.g., "2024").

## Examples

### Copyright Notice

```html
<p>© <ds-date></ds-date> Your Company Name</p>
```

Renders as: "© 2024 Your Company Name"

### In Footer

```html
<footer>
  <ds-text variant="small">
    Copyright <ds-date></ds-date> All rights reserved
  </ds-text>
</footer>
```

### With Text

```html
<ds-text variant="body">
  Established in 2020, updated <ds-date></ds-date>
</ds-text>
```

## Styling

The component inherits font family, size, and color from its parent element, making it easy to style consistently with surrounding text.

## Attributes

The `ds-date` component has no attributes. It automatically displays the current year based on the system date.

## Notes

- The year is calculated at render time using `new Date().getFullYear()`
- The component updates automatically when the page is reloaded
- For static sites, the year will be correct for the year the page was generated
