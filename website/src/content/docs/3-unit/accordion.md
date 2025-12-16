---
title: Accordion Component
description: Expandable content sections using native details/summary
---

The `ds-accordion` component provides expandable content sections using the native HTML `<details>` and `<summary>` elements.

## Basic Usage

```html
<ds-accordion
  summary-key="faq.question1"
  details-key="faq.answer1"
></ds-accordion>
```

## Initially Open

```html
<ds-accordion
  summary-key="section.title"
  details-key="section.content"
  open
></ds-accordion>
```

## Multiple Accordions

```html
<ds-accordion summary-key="faq.q1" details-key="faq.a1"></ds-accordion>
<ds-accordion summary-key="faq.q2" details-key="faq.a2"></ds-accordion>
<ds-accordion summary-key="faq.q3" details-key="faq.a3"></ds-accordion>
```

## Attributes

| Attribute     | Type      | Default | Description                          |
| ------------- | --------- | ------- | ------------------------------------ |
| `summary-key` | `string`  | -       | Translation key for summary text     |
| `details-key` | `string`  | -       | Translation key for details content  |
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
    summary-key="faq.howToStart"
    details-key="faq.howToStartAnswer"
  ></ds-accordion>
  
  <ds-accordion
    summary-key="faq.pricing"
    details-key="faq.pricingAnswer"
  ></ds-accordion>
  
  <ds-accordion
    summary-key="faq.support"
    details-key="faq.supportAnswer"
  ></ds-accordion>
</section>
```
