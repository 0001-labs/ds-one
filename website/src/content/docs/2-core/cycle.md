---
title: Cycle Component
description: Cycling through content with automatic or manual transitions
---

The `ds-cycle` component allows cycling through content items with automatic or manual transitions.

## Basic Usage

```html
<ds-cycle>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</ds-cycle>
```

## Automatic Cycling

Enable auto-play with a specified interval:

```html
<ds-cycle auto interval="3000">
  <div>First item</div>
  <div>Second item</div>
  <div>Third item</div>
</ds-cycle>
```

## Manual Navigation

```html
<ds-cycle id="myCycle">
  <div>Item A</div>
  <div>Item B</div>
  <div>Item C</div>
</ds-cycle>

<script>
  const cycle = document.getElementById('myCycle');
  // Navigate programmatically
  cycle.next();
  cycle.previous();
  cycle.goTo(2);
</script>
```

## Attributes

| Attribute  | Type      | Default | Description                           |
| ---------- | --------- | ------- | ------------------------------------- |
| `auto`     | `boolean` | `false` | Enable automatic cycling              |
| `interval` | `number`  | `5000`  | Interval between transitions (ms)     |
| `loop`     | `boolean` | `true`  | Loop back to start after last item    |

## Methods

| Method       | Description                    |
| ------------ | ------------------------------ |
| `next()`     | Go to the next item            |
| `previous()` | Go to the previous item        |
| `goTo(n)`    | Go to a specific item by index |

## Events

| Event    | Description                        |
| -------- | ---------------------------------- |
| `change` | Fired when the active item changes |
