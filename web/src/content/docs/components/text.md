---
title: Text Component
description: Typography component for displaying text content
---

## Overview

The `text-v1` component provides consistent typography styles across your application.

## Basic Usage

```html
<text-v1 variant="body">This is some text</text-v1>
```

## Variants

### Heading

Large heading text:

```html
<text-v1 variant="heading">Main Heading</text-v1>
```

### Body

Standard body text:

```html
<text-v1 variant="body">This is body text for paragraphs.</text-v1>
```

### Small

Smaller text for captions or secondary information:

```html
<text-v1 variant="small">Small text for captions</text-v1>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'heading' \| 'body' \| 'small'` | `'body'` | Text style variant |
| `data-key` | `string` | - | Translation key for i18n |

## With Translations

```html
<text-v1 variant="heading" data-key="welcome"></text-v1>
```

## Examples

### Multi-line Text

```html
<text-v1 variant="body">
  This text component supports multiple lines
  and will maintain proper spacing and formatting.
</text-v1>
```

### Semantic HTML

The component renders semantic HTML based on the variant:

- `heading` → `<h1>`, `<h2>`, etc.
- `body` → `<p>`
- `small` → `<small>`

