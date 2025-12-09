---
title: Tooltip Component
description: Contextual tooltip component for additional information
---

The `ds-tooltip` component displays additional information when hovering over an element.

## Basic Usage

```html
<ds-tooltip text="This is helpful information"> Hover over me </ds-tooltip>
```

## Attributes

| Attribute  | Type                                     | Default | Description                |
| ---------- | ---------------------------------------- | ------- | -------------------------- |
| `text`     | `string`                                 | -       | Tooltip content to display |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position           |

## Positioning

### Top (Default)

```html
<ds-tooltip text="Appears above" position="top"> Hover me </ds-tooltip>
```

### Bottom

```html
<ds-tooltip text="Appears below" position="bottom"> Hover me </ds-tooltip>
```

### Left & Right

```html
<ds-tooltip text="Appears on left" position="left"> Hover me </ds-tooltip>

<ds-tooltip text="Appears on right" position="right"> Hover me </ds-tooltip>
```

## Examples

### With Icons

```html
<ds-tooltip text="More information">
  <ds-icon name="note"></ds-icon>
</ds-tooltip>
```

### In Buttons

```html
<ds-button>
  <ds-tooltip text="Save your changes"> Save </ds-tooltip>
</ds-button>
```

## Accessibility

Tooltips are accessible and work with keyboard navigation. The tooltip appears on both hover and focus events.
