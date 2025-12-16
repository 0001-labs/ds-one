---
title: Form Component
description: Form container with validation and submission handling
---

The `ds-form` component provides a container for form elements with built-in validation and submission handling.

## Basic Usage

```html
<ds-form @form-submit="handleSubmit">
  <ds-input name="email" type="email" required></ds-input>
  <ds-input name="password" type="password" required></ds-input>
  <ds-button type="submit">Submit</ds-button>
</ds-form>
```

## Form Data

Get all form data programmatically:

```javascript
const form = document.querySelector('ds-form');
const data = form.getFormData();
// { email: "user@example.com", password: "secret" }
```

## Validation

The form validates inputs before submission:

```html
<ds-form @form-invalid="handleErrors">
  <ds-input name="email" type="email" required></ds-input>
  <ds-button type="submit">Submit</ds-button>
</ds-form>
```

### Disable Validation

```html
<ds-form novalidate>
  <ds-input name="field"></ds-input>
</ds-form>
```

## Server Submission

Submit to a server endpoint:

```html
<ds-form
  action="/api/submit"
  method="post"
  @form-response="handleResponse"
  @form-error="handleError"
>
  <ds-input name="name" required></ds-input>
  <ds-button type="submit">Send</ds-button>
</ds-form>
```

## Attributes

| Attribute      | Type      | Default  | Description                    |
| -------------- | --------- | -------- | ------------------------------ |
| `action`       | `string`  | -        | Server endpoint URL            |
| `method`       | `string`  | `'post'` | HTTP method (get, post)        |
| `name`         | `string`  | -        | Form name attribute            |
| `novalidate`   | `boolean` | `false`  | Disable form validation        |
| `autocomplete` | `string`  | `'on'`   | Browser autocomplete behavior  |

## Methods

| Method       | Description                    |
| ------------ | ------------------------------ |
| `getFormData()` | Get all form data as object |
| `validate()`    | Validate the form            |
| `reset()`       | Reset all form fields        |
| `submit()`      | Submit the form              |

## Events

| Event          | Detail                         |
| -------------- | ------------------------------ |
| `form-submit`  | `{ data: FormData }`           |
| `form-invalid` | `{ errors: Record<string, string> }` |
| `form-reset`   | -                              |
| `form-response`| `{ response, data }`           |
| `form-error`   | `{ error, data }`              |

## Examples

### Login Form

```html
<ds-form @form-submit="login">
  <ds-input
    label="Email"
    type="email"
    name="email"
    required
  ></ds-input>
  <ds-input
    label="Password"
    type="password"
    name="password"
    required
  ></ds-input>
  <ds-button variant="primary" type="submit">
    Log In
  </ds-button>
</ds-form>
```

### Contact Form

```html
<ds-form action="/api/contact" method="post">
  <ds-input label="Name" name="name" required></ds-input>
  <ds-input label="Email" type="email" name="email" required></ds-input>
  <ds-input label="Message" name="message"></ds-input>
  <ds-button variant="primary" type="submit">Send Message</ds-button>
</ds-form>
```
