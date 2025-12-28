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
<ds-banner text="Welcome Message" variant="info"></ds-banner>
```

## Variants

### Warning

```html
<ds-banner text="Warning Message" variant="warning"></ds-banner>
```

### Info

```html
<ds-banner text="Info Message" variant="info"></ds-banner>
```

### Success

```html
<ds-banner text="Success Message" variant="success"></ds-banner>
```

### Error

```html
<ds-banner text="Error Message" variant="error"></ds-banner>
```

## With Action

```html
<ds-banner
  text="Issue Report"
  action="Contact Us"
  mailto="support@example.com"
  variant="warning"
></ds-banner>
```

## Attributes

| Attribute       | Type     | Default     | Description                              |
| --------------- | -------- | ----------- | ---------------------------------------- |
| `text`      | `string` | -           | Translation text for banner text          |
| `action`    | `string` | -           | Translation text for action button        |
| `variant`       | `string` | `'warning'` | Banner style: warning, info, success, error |
| `href`          | `string` | -           | Link URL for the action                  |
| `mailto`        | `string` | -           | Email address for mailto link            |
| `subject`   | `string` | -           | Translation text for email subject        |
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
