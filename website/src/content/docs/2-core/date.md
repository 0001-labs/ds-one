---
title: Date Component
description: Date display and formatting component
---

The `ds-date` component provides formatted date display with localization support.

## Basic Usage

```html
<ds-date value="2024-01-15"></ds-date>
```

## Formats

### Short Date

```html
<ds-date value="2024-01-15" format="short"></ds-date>
<!-- Output: 1/15/24 -->
```

### Long Date

```html
<ds-date value="2024-01-15" format="long"></ds-date>
<!-- Output: January 15, 2024 -->
```

### Relative Date

```html
<ds-date value="2024-01-15" format="relative"></ds-date>
<!-- Output: 3 days ago -->
```

## With Time

```html
<ds-date value="2024-01-15T14:30:00" show-time></ds-date>
<!-- Output: January 15, 2024 at 2:30 PM -->
```

## Attributes

| Attribute   | Type      | Default    | Description                                 |
| ----------- | --------- | ---------- | ------------------------------------------- |
| `value`     | `string`  | -          | Date value (ISO format or timestamp)        |
| `format`    | `string`  | `'medium'` | Format: short, medium, long, relative       |
| `show-time` | `boolean` | `false`    | Include time in output                      |
| `locale`    | `string`  | -          | Override locale for formatting              |

## Localization

The date component automatically uses the current language setting:

```html
<!-- With Japanese locale -->
<ds-date value="2024-01-15" format="long"></ds-date>
<!-- Output: 2024年1月15日 -->
```

## Relative Time Updates

When using relative format, the display updates automatically:

```html
<ds-date value="2024-01-15" format="relative" live></ds-date>
```
