---
title: Input Component
description: Text input component with validation and styling
---

The `ds-input` component provides styled text inputs with validation support.

## Basic Usage

```html
<ds-input name="email" placeholder="Enter your email"></ds-input>
```

## Input Types

### Text

```html
<ds-input type="text" name="username"></ds-input>
```

### Email

```html
<ds-input type="email" name="email" required></ds-input>
```

### Password

```html
<ds-input type="password" name="password"></ds-input>
```

### Number

```html
<ds-input type="number" name="age" min="0" max="120"></ds-input>
```

## With Labels

```html
<ds-input
  label="Email Address"
  type="email"
  name="email"
  required
></ds-input>
```

### With Translation Keys

```html
<ds-input
  label-key="form.email.label"
  placeholder-key="form.email.placeholder"
  name="email"
></ds-input>
```

## Variants

### Default

```html
<ds-input variant="default" name="field"></ds-input>
```

### Filled

```html
<ds-input variant="filled" name="field"></ds-input>
```

### Outlined

```html
<ds-input variant="outlined" name="field"></ds-input>
```

## Validation

```html
<ds-input
  type="email"
  name="email"
  required
  error="Please enter a valid email"
></ds-input>
```

## Attributes

| Attribute        | Type      | Default     | Description                    |
| ---------------- | --------- | ----------- | ------------------------------ |
| `type`           | `string`  | `'text'`    | Input type                     |
| `name`           | `string`  | -           | Input name attribute           |
| `value`          | `string`  | -           | Current input value            |
| `placeholder`    | `string`  | -           | Placeholder text               |
| `placeholder-key`| `string`  | -           | Translation key for placeholder|
| `label`          | `string`  | -           | Label text                     |
| `label-key`      | `string`  | -           | Translation key for label      |
| `disabled`       | `boolean` | `false`     | Disable the input              |
| `readonly`       | `boolean` | `false`     | Make input read-only           |
| `required`       | `boolean` | `false`     | Mark as required               |
| `variant`        | `string`  | `'default'` | Visual variant                 |
| `error`          | `string`  | -           | Error message to display       |
| `error-key`      | `string`  | -           | Translation key for error      |

## Events

| Event          | Description                      |
| -------------- | -------------------------------- |
| `input-change` | Fired when the value changes     |
| `input-focus`  | Fired when the input gains focus |
| `input-blur`   | Fired when the input loses focus |

## Methods

| Method     | Description             |
| ---------- | ----------------------- |
| `focus()`  | Focus the input         |
| `blur()`   | Remove focus            |
| `select()` | Select all input text   |
