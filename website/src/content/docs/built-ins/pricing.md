---
title: Pricing
description: Currency and pricing utilities for internationalized applications
---

The pricing module provides utilities for formatting and displaying prices with proper currency formatting.

## Overview

DS One includes utilities for handling pricing display with support for multiple currencies and locales.

## Basic Usage

```javascript
import { formatPrice, getCurrencySymbol } from 'ds-one';

// Format a price
const formatted = formatPrice(29.99, 'USD');
// Output: "$29.99"

// Get currency symbol
const symbol = getCurrencySymbol('EUR');
// Output: "€"
```

## Currency Formatting

### By Locale

```javascript
import { formatPrice } from 'ds-one';

// US Dollar
formatPrice(1234.56, 'USD', 'en-US');
// Output: "$1,234.56"

// Japanese Yen
formatPrice(1234, 'JPY', 'ja');
// Output: "¥1,234"

// Euro (French locale)
formatPrice(1234.56, 'EUR', 'fr-FR');
// Output: "1 234,56 €"
```

## Supported Currencies

| Currency | Symbol | Example        |
| -------- | ------ | -------------- |
| USD      | $      | $99.99         |
| EUR      | €      | €99.99         |
| GBP      | £      | £99.99         |
| JPY      | ¥      | ¥9,999         |
| CNY      | ¥      | ¥99.99         |
| KRW      | ₩      | ₩99,999        |

## Pricing Display Component

Use with DS One components:

```html
<ds-text default-value="$29.99"></ds-text>
```

## Configuration

```javascript
import { setPricingConfig } from 'ds-one';

setPricingConfig({
  defaultCurrency: 'USD',
  defaultLocale: 'en-US',
  showCurrencyCode: false,
  decimalPlaces: 2
});
```

## Functions

| Function              | Description                          |
| --------------------- | ------------------------------------ |
| `formatPrice(amount, currency, locale)` | Format a price string |
| `getCurrencySymbol(currency)` | Get currency symbol        |
| `parsePriceString(string)` | Parse a price string to number |

## Integration with i18n

Pricing automatically uses the current language for locale:

```javascript
import { setLanguage } from 'ds-one';
import { formatPrice } from 'ds-one';

setLanguage('ja');
formatPrice(1000, 'JPY');
// Uses Japanese locale formatting
```

## Best Practices

1. **Use native Intl.NumberFormat** - For accurate localized formatting
2. **Consider currency decimals** - JPY has no decimals, USD has 2
3. **Store prices in cents** - Avoid floating-point issues
4. **Display local currency** - Use user's preferred currency when possible
