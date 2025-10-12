---
title: Button Component
description: Interactive button component with multiple variants
---

## Overview

The `button-v1` component provides a customizable button with multiple visual variants.

## Basic Usage

```html
<button-v1 variant="primary">Click Me</button-v1>
```

## Variants

### Primary

The primary button style, used for main actions:

```html
<button-v1 variant="primary">Primary Button</button-v1>
```

### Secondary

Secondary button style for less prominent actions:

```html
<button-v1 variant="secondary">Secondary Button</button-v1>
```

### Text

A text-only button without a background:

```html
<button-v1 variant="text">Text Button</button-v1>
```

## Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'text'` | `'primary'` | Button style variant |
| `disabled` | `boolean` | `false` | Whether the button is disabled |

## Events

The button component emits standard button events:

```javascript
const button = document.querySelector('button-v1');
button.addEventListener('click', (e) => {
  console.log('Button clicked!');
});
```

## Examples

### Disabled State

```html
<button-v1 variant="primary" disabled>Disabled Button</button-v1>
```

### With Icons

```html
<button-v1 variant="primary">
  <icon-v1 name="check"></icon-v1>
  Save Changes
</button-v1>
```

## Styling

The button component respects your theme's accent color and can be customized using CSS custom properties.

