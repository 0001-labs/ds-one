---
title: Accordion Component
description: Expandable content sections using native details/summary
---

The `ds-accordion` component provides expandable content sections using the native HTML `<details>` and `<summary>` elements.

## Component Dependencies

`ds-accordion` uses the following components internally:
- **`ds-text`** - For rendering summary and details text with i18n support
- **`ds-icon`** - For the chevron indicator
- **`ds-row`** - For laying out the summary content

## Basic Usage

```html
<ds-accordion
  summary="FAQ Question 1"
  details="FAQ Answer 1"
></ds-accordion>
```

## Initially Open

```html
<ds-accordion
  summary="Section Title"
  details="Section Content"
  open
></ds-accordion>
```

## Multiple Accordions

```html
<ds-accordion summary="FAQ Q1" details="FAQ A1"></ds-accordion>
<ds-accordion summary="FAQ Q2" details="FAQ A2"></ds-accordion>
<ds-accordion summary="FAQ Q3" details="FAQ A3"></ds-accordion>
```

## Attributes

| Attribute     | Type      | Default | Description                          |
| ------------- | --------- | ------- | ------------------------------------ |
| `summary` | `string`  | -       | Translation text for summary text     |
| `details` | `string`  | -       | Translation text for details content  |
| `open`        | `boolean` | `false` | Whether accordion is initially open  |

## Styling

The accordion includes a chevron icon that rotates when expanded:

```css
details[open] ds-icon.chevron {
  transform: rotate(180deg);
}
```

## Accessibility

The accordion uses native `<details>` and `<summary>` elements, providing:

- Keyboard navigation (Enter/Space to toggle)
- Screen reader support
- No JavaScript required for basic functionality

## Example

### FAQ Section

```html
<section class="faq">
  <h2>Frequently Asked Questions</h2>
  
  <ds-accordion
    summary="How to Start"
    details="How to Start Answer"
  ></ds-accordion>
  
  <ds-accordion
    summary="Pricing"
    details="Pricing Answer"
  ></ds-accordion>
  
  <ds-accordion
    summary="Support"
    details="Support Answer"
  ></ds-accordion>
</section>
```
