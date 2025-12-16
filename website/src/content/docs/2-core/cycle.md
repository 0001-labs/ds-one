---
title: Cycle Component
description: Interactive cycle button for toggling between options
---

The `ds-cycle` component provides an interactive button that cycles through a set of values, commonly used for settings like language, theme, accent color, and display preferences.

## Basic Usage

```html
<ds-cycle type="theme"></ds-cycle>
```

## Types

### Language

Cycle through available languages:

```html
<ds-cycle type="language"></ds-cycle>
```

The component automatically detects available languages from your translation files and cycles through them.

### Theme

Toggle between light and dark themes:

```html
<ds-cycle type="theme"></ds-cycle>
```

### Accent Color

Cycle through available accent colors:

```html
<ds-cycle type="accent-color"></ds-cycle>
```

Available colors: `--apple-green`, `--every-green`, `--zenith-blue`, `--sharp-blue`, `--pink`, `--tuned-red`, `--orange`, `--yellow`

### Notes Style Medium

Cycle through notes display styles:

```html
<ds-cycle type="notes-style-medium"></ds-cycle>
```

Options: `default`, `big`, `gallery`

### Page Style

Toggle between note and page display modes:

```html
<ds-cycle type="page-style"></ds-cycle>
```

### Icon Only

Icon-only cycle for note/page toggle:

```html
<ds-cycle type="icon-only"></ds-cycle>
```

## Attributes

| Attribute | Type     | Default | Description                                                                                      |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------ |
| `type`    | `string` | -       | Cycle type: `language`, `theme`, `accent-color`, `notes-style-medium`, `page-style`, `icon-only` |
| `variant` | `string` | -       | Button variant (inherits from button component)                                                  |

## Variants

You can customize the button appearance:

```html
<ds-cycle type="theme" variant="primary"></ds-cycle>
<ds-cycle type="theme" variant="secondary"></ds-cycle>
```

## Examples

### Language Selector

```html
<ds-cycle type="language"></ds-cycle>
```

Displays the current language name and cycles to the next available language when clicked.

### Theme Toggle

```html
<ds-cycle type="theme"></ds-cycle>
```

Toggles between light and dark themes with view transitions.

### Accent Color Picker

```html
<ds-cycle type="accent-color"></ds-cycle>
```

Cycles through accent colors with a color preview indicator.

### Custom Display

```html
<ds-cycle type="notes-style-medium"></ds-cycle>
```

Shows icons for different display styles (default, big, gallery).

## Behavior

- **Language**: Cycles through available languages, saves preference, and dispatches language change events
- **Theme**: Toggles between light/dark, saves preference, and applies theme changes
- **Accent Color**: Cycles through color options, saves preference, and updates CSS variables
- **Notes Style Medium**: Cycles through display options, disabled when page-style is "note"
- **Page Style**: Toggles between note and page modes
- **Icon Only**: Icon-only version of page style toggle

## Events

The component dispatches custom events when values change:

- `language-changed` - When language is cycled
- `theme-changed` - When theme is cycled
- `accent-color-changed` - When accent color is cycled
- `notes-style-medium-changed` - When notes style is cycled
- `page-style-changed` - When page style is cycled

## Accessibility

The cycle component is keyboard accessible and maintains focus states. It automatically saves preferences to localStorage and syncs with the design system's preference management.
