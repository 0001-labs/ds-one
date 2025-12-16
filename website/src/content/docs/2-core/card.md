---
title: Card Component
description: Container component for displaying content in a styled box
---

The `ds-card` component provides a container for displaying content in a styled, contained box.

## Flexible Content

`ds-card` is a **flexible container** that can hold any content. Use it to wrap and style any combination of components, text, images, or HTML elements.

## Basic Usage

```html
<ds-card>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</ds-card>
```

## Variants

### Default

```html
<ds-card variant="default">
  Default card with border
</ds-card>
```

### Outlined

```html
<ds-card variant="outlined">
  Transparent with visible border
</ds-card>
```

### Elevated

```html
<ds-card variant="elevated">
  Card with shadow
</ds-card>
```

### Filled

```html
<ds-card variant="filled">
  Card with background color
</ds-card>
```

## Elevation

Control the shadow depth:

```html
<ds-card elevation="0">No shadow</ds-card>
<ds-card elevation="1">Light shadow</ds-card>
<ds-card elevation="2">Medium shadow</ds-card>
<ds-card elevation="3">Strong shadow</ds-card>
```

## Interactive Cards

Make cards clickable:

```html
<ds-card interactive @click="handleClick">
  Click me!
</ds-card>
```

## Padding

Control internal padding:

```html
<ds-card padding="none">No padding</ds-card>
<ds-card padding="small">Small padding</ds-card>
<ds-card padding="medium">Medium padding</ds-card>
<ds-card padding="large">Large padding</ds-card>
```

## Attributes

| Attribute     | Type      | Default     | Description                           |
| ------------- | --------- | ----------- | ------------------------------------- |
| `variant`     | `string`  | `'default'` | default, outlined, elevated, filled   |
| `elevation`   | `number`  | `1`         | Shadow depth (0-3)                    |
| `interactive` | `boolean` | `false`     | Enable hover effects                  |
| `disabled`    | `boolean` | `false`     | Disable interactions                  |
| `padding`     | `string`  | `'medium'`  | none, small, medium, large            |

## Styling

The card respects theme colors:

```css
ds-card {
  --card-background: var(--surface-color);
  --border-color: rgba(0, 0, 0, 0.1);
}
```

## Examples

### Profile Card

```html
<ds-card variant="elevated" padding="large">
  <ds-icon name="avatar"></ds-icon>
  <h3>John Doe</h3>
  <p>Software Developer</p>
</ds-card>
```

### Feature Card

```html
<ds-card interactive variant="outlined">
  <ds-icon name="star"></ds-icon>
  <h4>Premium Feature</h4>
  <p>Unlock advanced features</p>
  <ds-button variant="primary">Learn More</ds-button>
</ds-card>
```
