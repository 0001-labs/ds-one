---
title: Scaling
description: Responsive scaling utilities for the design system
---

The scaling module provides utilities for responsive scaling across different device sizes.

## Overview

DS One uses a scaling factor (`--sf`) to adapt component sizes to different viewport widths. This ensures consistent proportions across mobile, tablet, and desktop devices.

## Basic Usage

```javascript
import { getScalingFactor, scale } from 'ds-one';

// Get current scaling factor
const factor = getScalingFactor(); // e.g., 1.5

// Scale a design value
const scaledSize = scale(20); // 20 * 1.5 = 30
```

## Scaling Modes

### Auto (Default)

Automatically calculates scaling based on viewport width:

```javascript
import { setScalingConfig } from 'ds-one';

setScalingConfig({ mode: 'auto' });
```

### Fixed

Use a fixed scaling factor of 1:

```javascript
setScalingConfig({ mode: 'fixed' });
```

## Configuration

```javascript
import { setScalingConfig } from 'ds-one';

setScalingConfig({
  mode: 'auto',      // 'auto' | 'fixed'
  baseWidth: 280,    // Design base width in pixels
  minScale: 0.75,    // Minimum scaling factor
  maxScale: 2.0      // Maximum scaling factor
});
```

## CSS Custom Property

The scaling factor is available as a CSS custom property:

```css
.my-element {
  /* Use scaling factor in CSS */
  width: calc(100px * var(--sf));
  padding: calc(16px * var(--sf));
  font-size: calc(14px * var(--sf));
}
```

## Functions

| Function            | Description                                |
| ------------------- | ------------------------------------------ |
| `getScalingFactor()`| Get current scaling factor                 |
| `scale(value)`      | Scale a design pixel value                 |
| `unscale(value)`    | Convert scaled value back to design pixels |
| `updateScalingFactor()` | Recalculate scaling factor             |
| `setScalingConfig(config)` | Update scaling configuration        |

## Events

The scaling system dispatches an event when the scaling factor changes:

```javascript
window.addEventListener('scaling-changed', (e) => {
  console.log('New scaling factor:', e.detail.scalingFactor);
  console.log('Config:', e.detail.config);
});
```

## Signals

Access scaling as reactive signals:

```javascript
import { scalingFactor, scalingConfig } from 'ds-one';

// Read current values
const factor = scalingFactor.get();
const config = scalingConfig.get();
```

## Responsive Design

The scaling system integrates with device detection:

- Desktop: `--sf: 1` (no scaling)
- Mobile/Tablet: `--sf` calculated based on viewport width

This allows components to maintain proper proportions while adapting to different screen sizes.
