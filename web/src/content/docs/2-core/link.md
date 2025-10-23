---
title: Link Component
description: Navigation link component with automatic scroll position preservation
---

The `link-v1` component provides navigation links with built-in support for internal routing and scroll position preservation.

## Basic Usage

```html
<link-v1 href="/about">About</link-v1>
```

## External Links

```html
<link-v1 href="https://example.com">External Link</link-v1>
```

## Internal Links

Internal links automatically preserve scroll position when navigating:

```html
<link-v1 href="/products" internal>View Products</link-v1>
```

## Attributes

| Attribute  | Type      | Default | Description                                                    |
| ---------- | --------- | ------- | -------------------------------------------------------------- |
| `href`     | `string`  | -       | URL to navigate to                                             |
| `internal` | `boolean` | `false` | Whether this is an internal link (enables scroll preservation) |
| `target`   | `string`  | -       | Link target (`_blank`, `_self`, etc.)                          |

## Scroll Position Preservation

DS One automatically preserves scroll position when navigating between pages using internal links. This provides a better user experience when users navigate back.

```html
<!-- Scroll position is preserved -->
<link-v1 href="/page1" internal>Page 1</link-v1>
<link-v1 href="/page2" internal>Page 2</link-v1>
```

## Examples

### Open in New Tab

```html
<link-v1 href="https://github.com/jo4712/ds-one" target="_blank">
  View on GitHub
</link-v1>
```

### With Icon

```html
<link-v1 href="/documentation">
  <icon-v1 name="open"></icon-v1>
  Documentation
</link-v1>
```
