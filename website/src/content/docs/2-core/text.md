---
title: Text Component
description: Typography component for displaying text content with i18n support
---

The `ds-text` component provides consistent typography styles across your application with built-in internationalization support.

## Basic Usage

Use the slot content as the translation key (recommended):

```html
<ds-text>Welcome to the app</ds-text>
```

The text inside the element serves as both the translation key and the fallback text. If a translation exists for "Welcome to the app", it will be displayed; otherwise, the original text is shown.

## Slot Syntax vs Attribute Syntax

### Slot Syntax (Preferred)

The cleanest way to use `ds-text` - just put your text inside:

```html
<ds-text>Services</ds-text>
<ds-text>Contact us</ds-text>
<ds-text>© 2025 0001</ds-text>
```

### Attribute Syntax (Still Supported)

The `text` attribute still works for backwards compatibility:

```html
<ds-text text="Services"></ds-text>
```

## With Translations

The component automatically looks up translations using the text content as the key:

```html
<!-- If translations.json has { "Welcome": "ようこそ" } for Japanese -->
<ds-text>Welcome</ds-text>
<!-- Displays "ようこそ" when language is Japanese, "Welcome" otherwise -->
```

## Attributes

| Attribute | Type     | Default | Description                                    |
| --------- | -------- | ------- | ---------------------------------------------- |
| `text`    | `string` | -       | Translation key (optional if using slot syntax)|

## Examples

### Navigation Links

```html
<a href="/about"><ds-text>About</ds-text></a>
<a href="/contact"><ds-text>Contact</ds-text></a>
<a href="/products"><ds-text>Products</ds-text></a>
```

### Headings

```html
<h1><ds-text>Welcome to our site</ds-text></h1>
<h2><ds-text>Our services</ds-text></h2>
```

### Paragraphs

```html
<p><ds-text>We design digital products that tell stories.</ds-text></p>
```

### With Styling

```html
<span style="font-size: 48px;">
  <ds-text>0001</ds-text>
</span>
```

## Language Support

The component automatically updates when the language changes and applies appropriate font settings for CJK languages (Japanese, Chinese).
