---
title: Icon Component
description: SVG icon component with a comprehensive icon set
---

## Overview

The `icon-v1` component provides access to a comprehensive set of SVG icons.

## Basic Usage

```html
<icon-v1 name="check"></icon-v1>
```

## Available Icons

DS One includes 50+ icons:

- `check`, `close`, `open`
- `up`, `down`, `left`, `right`
- `search`, `delete`, `duplicate`
- `star`, `unstar`
- `see`, `unsee`
- `lock`, `unlock`
- And many more...

## Attributes

| Attribute | Type     | Default | Description          |
| --------- | -------- | ------- | -------------------- |
| `name`    | `string` | -       | Icon name to display |
| `size`    | `string` | `'1em'` | Icon size (CSS unit) |

## Sizing

```html
<icon-v1 name="check" size="16px"></icon-v1>
<icon-v1 name="check" size="2em"></icon-v1>
<icon-v1 name="check" size="32px"></icon-v1>
```

## With Colors

Icons inherit the current text color:

```html
<span style="color: red;">
  <icon-v1 name="star"></icon-v1>
</span>
```

## In Buttons

```html
<ds-button variant="primary">
  <icon-v1 name="check"></icon-v1>
  Save
</ds-button>
```

## Icon List

Common icons include:

- Navigation: `up`, `down`, `left`, `right`
- Actions: `check`, `close`, `plus`, `delete`
- UI: `search`, `star`, `lock`, `see`
- Content: `note`, `page`, `title`, `icon`
- Layout: `expand`, `collapse`, `minimize`
