---
title: Mobile Detection
description: Built-in device detection in DS one
---

DS one includes automatic mobile and device detection, allowing your components to adapt to different screen sizes and device capabilities.

## Device Detection

The system automatically detects:

- Mobile devices (phones and tablets)
- Touch-capable devices
- Screen size breakpoints
- Device orientation

## Responsive Components

DS one components automatically adapt to mobile devices:

```html
<!-- Automatically responsive -->
<ds-layout>
  <header-v1>Navigation</header-v1>
  <main>Content adapts to screen size</main>
</ds-layout>
```

## Touch Events

Components automatically handle touch events on mobile devices:

```html
<ds-button variant="primary">
  <!-- Handles both click and touch events -->
  Tap Me
</ds-button>
```

## Device-Specific Styling

Apply styles based on device type:

```css
/* Mobile-specific styles */
@media (max-width: 768px) {
  ds-button {
    --button-size: larger;
  }
}

/* Touch device styles */
@media (hover: none) {
  ds-button {
    --button-padding: 1rem;
  }
}
```

## JavaScript Detection

Access device information in JavaScript:

```javascript
// Check if mobile
if (window.innerWidth < 768) {
  console.log("Mobile device detected");
}

// Check for touch support
if ("ontouchstart" in window) {
  console.log("Touch-capable device");
}
```

## Responsive Breakpoints

DS one uses these standard breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Best Practices

1. Test on real devices when possible
2. Use responsive units (rem, em, %)
3. Design mobile-first
4. Ensure touch targets are at least 44x44px
5. Test both portrait and landscape orientations
