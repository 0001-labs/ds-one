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

## Attributes

### Fill

Content is distributed with space between:

```html
<ds-row fill>
  <ds-text text="Label"></ds-text>
  <ds-text text="Value"></ds-text>
</ds-row>
```

### Centered

Content is centered with small gaps:

```html
<ds-row centered>
  <ds-icon name="check"></ds-icon>
  <ds-text text="Completed"></ds-text>
</ds-row>
```

### End

Content is aligned to the end:

```html
<ds-row end>
  <ds-text text="Right aligned"></ds-text>
</ds-row>
```

## Attributes

| Attribute  | Type      | Default | Description                           |
| ---------- | --------- | ------- | ------------------------------------- |
| `fill`     | `boolean` | `false` | Distribute content with space between |
| `centered` | `boolean` | `false` | Center content with gaps              |
| `end`      | `boolean` | `false` | Align content to the end              |

## Styling

The row uses flexbox layout:

```css
:host {
  display: flex;
  flex-direction: row;
  align-items: end;
  width: calc(240px * var(--sf));
}

:host([fill]) {
  justify-content: space-between;
  height: calc(var(--1) * var(--sf));
}

:host([centered]) {
  justify-content: center;
  height: calc(var(--1) * var(--sf));
  gap: calc(var(--025) * var(--sf));
}

:host([end]) {
  justify-content: flex-end;
  height: calc(var(--1) * var(--sf));
  gap: calc(var(--025) * var(--sf));
}
```

## Examples

### Label-Value Row

```html
<ds-row fill>
  <ds-text text="Language"></ds-text>
  <ds-text text="English"></ds-text>
</ds-row>
```

### Icon with Text

```html
<ds-row centered>
  <ds-icon name="star"></ds-icon>
  <ds-text text="Favorites"></ds-text>
</ds-row>
```

### Navigation Item

```html
<ds-row fill>
  <ds-text text="Settings"></ds-text>
  <ds-icon name="right"></ds-icon>
</ds-row>
```
