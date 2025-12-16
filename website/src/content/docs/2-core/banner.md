---
title: Banner Component
description: Fixed notification banner for alerts and messages
---

The `ds-banner` component provides a fixed notification banner for displaying alerts, warnings, or informational messages.

## Component Dependencies

`ds-banner` uses the following components internally:
- **`ds-text`** - For rendering banner text and action labels with i18n support
- **`ds-button`** - For action buttons (optional)

## Basic Usage

```html
<ds-banner text-key="welcomeMessage" variant="info"></ds-banner>
```

## Variants

### Warning

```html
<ds-banner text-key="warningMessage" variant="warning"></ds-banner>
```

### Info

```html
<ds-banner text-key="infoMessage" variant="info"></ds-banner>
```

### Success

```html
<ds-banner text-key="successMessage" variant="success"></ds-banner>
```

### Error

```html
<ds-banner text-key="errorMessage" variant="error"></ds-banner>
```

## With Action

```html
<ds-banner
  text-key="issueReport"
  action-key="contactUs"
  mailto="support@example.com"
  variant="warning"
></ds-banner>
```

## Attributes

| Attribute       | Type     | Default     | Description                              |
| --------------- | -------- | ----------- | ---------------------------------------- |
| `text-key`      | `string` | -           | Translation key for banner text          |
| `action-key`    | `string` | -           | Translation key for action button        |
| `variant`       | `string` | `'warning'` | Banner style: warning, info, success, error |
| `href`          | `string` | -           | Link URL for the action                  |
| `mailto`        | `string` | -           | Email address for mailto link            |
| `subject-key`   | `string` | -           | Translation key for email subject        |
| `version`       | `string` | -           | Version number to display on click       |

## Events

The banner responds to translation changes and updates automatically when the language changes.

## Positioning

The banner is fixed to the top of the viewport and spans the full width:

```css
:host {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
```
