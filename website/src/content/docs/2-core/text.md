---
title: Text Component
description: Typography component for displaying text content
---

The `ds-text` component provides consistent typography styles across your application.

## Basic Usage

```html
<ds-text variant="body">This is some text</ds-text>
```

## Variants

### Heading

Large heading text:

```html
<ds-text variant="heading">Main Heading</ds-text>
```

### Body

Standard body text:

```html
<ds-text variant="body">This is body text for paragraphs.</ds-text>
```

### Small

Smaller text for captions or secondary information:

```html
<ds-text variant="small">Small text for captions</ds-text>
```

## Attributes

| Attribute  | Type                             | Default  | Description              |
| ---------- | -------------------------------- | -------- | ------------------------ |
| `variant`  | `'heading' \| 'body' \| 'small'` | `'body'` | Text style variant       |
| `data-key` | `string`                         | -        | Translation key for i18n |

## With Translations

```html
<ds-text variant="heading" data-key="welcome"></ds-text>
```

## Examples

### Multi-line Text

```html
<ds-text variant="body">
  This text component supports multiple lines and will maintain proper spacing
  and formatting.
</ds-text>
```

### Semantic HTML

The component renders semantic HTML based on the variant:

- `heading` → `<h1>`, `<h2>`, etc.
- `body` → `<p>`
- `small` → `<small>`
