---
title: Row Component
description: Horizontal layout component for arranging content
---

The `ds-row` component provides a horizontal layout container for arranging content with flexible alignment options.

## Flexible Content

`ds-row` is a **flexible container** that can hold any content. It doesn't impose restrictions on what can be placed inside - use it to arrange any combination of components, text, or HTML elements horizontally.

## Basic Usage

```html
<ds-row>
  <span>Left content</span>
  <span>Right content</span>
</ds-row>
```

## Types

### Fill (Default)

Content is distributed with space between:

```html
<ds-row type="fill">
  <ds-text key="label"></ds-text>
  <ds-text key="value"></ds-text>
</ds-row>
```

### Centered

Content is centered with small gaps:

```html
<ds-row type="centered">
  <ds-icon name="check"></ds-icon>
  <ds-text key="completed"></ds-text>
</ds-row>
```

## Attributes

| Attribute | Type     | Default  | Description                    |
| --------- | -------- | -------- | ------------------------------ |
| `type`    | `string` | `'fill'` | Layout type: fill or centered  |

## Styling

The row uses flexbox layout:

```css
:host {
  display: flex;
  align-items: end;
  width: calc(240px * var(--sf));
}

:host([type="fill"]) {
  justify-content: space-between;
}

:host([type="centered"]) {
  justify-content: center;
  gap: calc(var(--025) * var(--sf));
}
```

## Examples

### Label-Value Row

```html
<ds-row type="fill">
  <ds-text key="settings.language"></ds-text>
  <ds-text key="languages.english"></ds-text>
</ds-row>
```

### Icon with Text

```html
<ds-row type="centered">
  <ds-icon name="star"></ds-icon>
  <ds-text key="favorites"></ds-text>
</ds-row>
```

### Navigation Item

```html
<ds-row type="fill">
  <ds-text key="nav.settings"></ds-text>
  <ds-icon name="right"></ds-icon>
</ds-row>
```
