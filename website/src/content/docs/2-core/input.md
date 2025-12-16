---
title: Input Component
description: Form input component with consistent styling
---

The `ds-input` component provides a styled input field that matches the design system's visual language.

## Basic Usage

```html
<ds-input type="text" placeholder="Enter text"></ds-input>
```

## Input Types

### Text

Standard text input:

```html
<ds-input type="text" placeholder="Enter your name"></ds-input>
```

### Email

Email input with validation:

```html
<ds-input type="email" placeholder="Enter your email"></ds-input>
```

### Password

Password input with hidden characters:

```html
<ds-input type="password" placeholder="Enter your password"></ds-input>
```

## Attributes

| Attribute      | Type      | Default  | Description                                   |
| -------------- | --------- | -------- | --------------------------------------------- |
| `type`         | `string`  | `'text'` | Input type: `text`, `email`, `password`, etc. |
| `placeholder`  | `string`  | -        | Placeholder text                              |
| `value`        | `string`  | -        | Input value                                   |
| `disabled`     | `boolean` | `false`  | Whether the input is disabled                 |
| `required`     | `boolean` | `false`  | Whether the input is required                 |
| `id`           | `string`  | -        | Input ID attribute                            |
| `name`         | `string`  | -        | Input name attribute for forms                |
| `autocomplete` | `string`  | -        | Autocomplete attribute value                  |

## Examples

### Basic Form Input

```html
<ds-input
  type="text"
  id="username"
  name="username"
  placeholder="Username"
></ds-input>
```

### Email Input

```html
<ds-input
  type="email"
  id="email"
  name="email"
  placeholder="Enter your email address"
  autocomplete="email"
></ds-input>
```

### Disabled State

```html
<ds-input type="text" value="Read-only value" disabled></ds-input>
```

### Required Field

```html
<ds-input type="email" placeholder="Email (required)" required></ds-input>
```

## JavaScript API

The component exposes standard input properties and methods:

```javascript
const input = document.querySelector("ds-input");

// Get value
const value = input.value;

// Set value
input.value = "New value";

// Focus the input
input.focus();
```

## Events

The component dispatches standard input events:

```javascript
const input = document.querySelector("ds-input");

input.addEventListener("input", (e) => {
  console.log("Input changed:", e.detail.value);
});

input.addEventListener("change", (e) => {
  console.log("Input changed:", e.detail.value);
});
```

## Styling

The input component uses design system CSS variables:

- Background: `--base-light-grey`
- Text color: `--base-darker-grey` (default), `--base-slate` (focused)
- Font: `--typeface-regular`
- Size: `--type-size-default`

The input has a subtle opacity when not focused (0.5) and becomes fully opaque when focused.

## Form Integration

The component works seamlessly with HTML forms:

```html
<form>
  <ds-input type="email" name="email" placeholder="Email" required></ds-input>
  <ds-button type="submit">Submit</ds-button>
</form>
```
