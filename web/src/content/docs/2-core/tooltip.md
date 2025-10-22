---
title: Tooltip Component
description: Contextual tooltip component for additional information
---

## Overview

The `tooltip-v1` component displays additional information when hovering over an element.

## Basic Usage

```html
<tooltip-v1 text="This is helpful information"> Hover over me </tooltip-v1>
```

## Attributes

| Attribute  | Type                                     | Default | Description                |
| ---------- | ---------------------------------------- | ------- | -------------------------- |
| `text`     | `string`                                 | -       | Tooltip content to display |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position           |

## Positioning

### Top (Default)

```html
<tooltip-v1 text="Appears above" position="top"> Hover me </tooltip-v1>
```

### Bottom

```html
<tooltip-v1 text="Appears below" position="bottom"> Hover me </tooltip-v1>
```

### Left & Right

```html
<tooltip-v1 text="Appears on left" position="left"> Hover me </tooltip-v1>

<tooltip-v1 text="Appears on right" position="right"> Hover me </tooltip-v1>
```

## Examples

### With Icons

```html
<tooltip-v1 text="More information">
  <icon-v1 name="note"></icon-v1>
</tooltip-v1>
```

### In Buttons

```html
<ds-button>
  <tooltip-v1 text="Save your changes"> Save </tooltip-v1>
</ds-button>
```

## Accessibility

Tooltips are accessible and work with keyboard navigation. The tooltip appears on both hover and focus events.
