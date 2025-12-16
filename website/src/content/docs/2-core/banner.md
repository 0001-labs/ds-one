---
title: Banner Component
description: Fixed banner component for notifications and alerts
---

The `ds-banner` component provides a fixed-position banner at the top of the page for displaying notifications, alerts, and important messages.

## Basic Usage

```html
<ds-banner variant="warning" text-key="updateAvailable">
  Update available
</ds-banner>
```

## Variants

### Warning

Yellow warning banner for important notices:

```html
<ds-banner variant="warning" text-key="maintenanceNotice">
  Scheduled maintenance tonight
</ds-banner>
```

### Info

Blue informational banner:

```html
<ds-banner variant="info" text-key="newFeature">
  New feature available
</ds-banner>
```

### Success

Green success banner:

```html
<ds-banner variant="success" text-key="saveSuccess">
  Changes saved successfully
</ds-banner>
```

### Error

Red error banner:

```html
<ds-banner variant="error" text-key="errorMessage">
  An error occurred
</ds-banner>
```

## Attributes

| Attribute         | Type                                          | Default     | Description                                |
| ----------------- | --------------------------------------------- | ----------- | ------------------------------------------ |
| `variant`         | `'warning' \| 'info' \| 'success' \| 'error'` | `'warning'` | Banner style variant                       |
| `text-key`        | `string`                                      | -           | Translation key for the banner text        |
| `action-key`      | `string`                                      | -           | Translation key for the action button text |
| `href`            | `string`                                      | -           | Direct link URL for the action             |
| `mailto`          | `string`                                      | -           | Email address for mailto link              |
| `subject-key`     | `string`                                      | -           | Translation key for email subject          |
| `describe-key`    | `string`                                      | -           | Translation key for email body description |
| `app-version-key` | `string`                                      | -           | Translation key for app version label      |
| `version`         | `string`                                      | -           | App version to display when clicked        |

## With Action Link

Add an action link to the banner:

```html
<ds-banner
  variant="info"
  text-key="feedbackRequest"
  action-key="sendFeedback"
  href="https://example.com/feedback"
>
  We'd love your feedback
</ds-banner>
```

## With Email Action

Create a mailto link with internationalized subject and body:

```html
<ds-banner
  variant="error"
  text-key="reportIssue"
  action-key="contactSupport"
  mailto="support@example.com"
  subject-key="issueReport"
  describe-key="describeIssue"
  app-version-key="appVersion"
  version="1.0.0"
>
  Report an issue
</ds-banner>
```

## Version Display

Clicking the banner text toggles between the message and version number (if `version` is provided):

```html
<ds-banner variant="info" text-key="appInfo" version="2.1.0">
  Click to see version
</ds-banner>
```

## Examples

### Simple Notification

```html
<ds-banner variant="info" text-key="welcomeMessage">
  Welcome to the new version
</ds-banner>
```

### With Custom Action

```html
<ds-banner
  variant="warning"
  text-key="deprecationNotice"
  action-key="learnMore"
  href="/migration-guide"
>
  This feature will be deprecated
</ds-banner>
```

## Styling

The banner component uses CSS custom properties for theming and automatically adapts text colors based on the variant. It's positioned absolutely at the top of the page with a high z-index (9999).
