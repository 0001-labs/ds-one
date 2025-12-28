---
title: Text Component
description: Typography component for displaying text content with i18n support
---

The `ds-text` component provides consistent typography styles across your application with built-in internationalization support.

## Basic Usage

Display text directly:

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

| Attribute  | Type                             | Default  | Description                                          |
| ---------- | -------------------------------- | -------- | ---------------------------------------------------- |
| `variant`  | `'heading' \| 'body' \| 'small'` | `'body'` | Text style variant                                   |
| `text`     | `string`                         | -        | Translation key for i18n (use this instead of `key`) |
| `fallback` | `string`                         | -        | Fallback text (deprecated)                           |

## With Translations

Use the `text` attribute to specify the translation key:

```html
<ds-text variant="heading" text="Welcome"></ds-text>
<ds-text variant="body" text="Greeting"></ds-text>
```

**Important:** Always use the `text` attribute for translations, not `key`. If a translation is not found, the component will fall back to displaying the `text` attribute value itself.

## Examples

### Direct Text Content

Display text directly without translations:

```html
<ds-text variant="body">
  This text component supports multiple lines and will maintain proper spacing
  and formatting.
</ds-text>
```

### Translation

```html
<ds-text variant="heading" text="Page Title"></ds-text>
```

If the translation for "Page Title" is not found, it will display "Page Title" as the fallback.

### Semantic HTML

The component renders semantic HTML based on the variant:

- `heading` → `<h1>`, `<h2>`, etc.
- `body` → `<p>`
- `small` → `<small>`
