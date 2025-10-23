---
title: Button Component
description: Interactive button component with multiple variants
---

The `ds-button` component provides a customizable button with multiple visual variants.

## Basic Usage

```html
<ds-button variant="primary">Click Me</ds-button>
```

## Variants

### Primary

The primary button style, used for main actions:

```html
<ds-button variant="primary">Primary Button</ds-button>
```

### Secondary

Secondary button style for less prominent actions:

```html
<ds-button variant="secondary">Secondary Button</ds-button>
```

### Text

A text-only button without a background:

```html
<ds-button variant="text">Text Button</ds-button>
```

## Attributes

| Attribute  | Type                                 | Default     | Description                    |
| ---------- | ------------------------------------ | ----------- | ------------------------------ |
| `variant`  | `'primary' \| 'secondary' \| 'text'` | `'primary'` | Button style variant           |
| `disabled` | `boolean`                            | `false`     | Whether the button is disabled |

## Events

The button component emits standard button events:

```javascript
const button = document.querySelector("ds-button");
button.addEventListener("click", (e) => {
  console.log("Button clicked!");
});
```

## Examples

### Disabled State

```html
<ds-button variant="primary" disabled>Disabled Button</ds-button>
```

### With Icons

```html
<ds-button variant="primary">
  <icon-v1 name="check"></icon-v1>
  Save Changes
</ds-button>
```

## Styling

The button component respects your theme's accent color and can be customized using CSS custom properties.
