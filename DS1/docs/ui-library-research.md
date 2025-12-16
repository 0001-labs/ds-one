# UI Library Research for DS One

## Overview

This document summarizes research into three popular UI libraries: **Radix UI**, **Base UI**, and **Shadcn UI**. The goal is to identify patterns, primitives, and concepts that can be integrated into **DS One**.

## 1. Radix UI

**Repository:** `radix-ui/primitives`  
**Website:** [radix-ui.com](https://radix-ui.com)

### Key Characteristics
- **Headless:** Components have no styling; they provide only the functional logic and accessibility attributes.
- **Accessibility:** excellent WAI-ARIA compliance, focus management, and keyboard navigation out of the box.
- **Composition:** heavily relies on the "Slot" pattern to merge props onto child elements, allowing for semantic HTML control.

### Relevant Primitives
Radix offers a suite of complex interactive primitives that are difficult to build from scratch. Relevant ones for DS One include:
- **Dialog / Alert Dialog:** Handles focus trapping, portal rendering, and screen reader announcements.
- **Popover / Tooltip:** Manages positioning (floating-ui) and collision detection.
- **Accordion / Collapsible:** Manages expanded/collapsed states with proper ARIA attributes.
- **Radio Group / Checkbox / Switch:** Provides accessible form controls that can be fully styled.

### Integration Strategy for DS One
- **Internal Logic:** Use Radix primitives as the internal engine for DS One components. For example, `ds-tooltip` could wrap Radix's Tooltip primitive to ensure accessibility while exposing DS One's simplified API.
- **Slot Utility:** Adopt the `Slot` component pattern to allow DS One components to compose their behavior onto user-provided elements (polymorphism).

## 2. Base UI

**Repository:** `mui/base-ui`  
**Website:** [base-ui.com](https://base-ui.com)

### Key Characteristics
- **Unstyled (MUI):** The "headless" version of Material UI. It separates logic from the Material Design styling.
- **Hooks vs. Components:** Offers both component primitives and low-level hooks (`useButton`, `useSelect`, etc.) for maximum flexibility.
- **Interoperability:** Designed to work with any styling solution (CSS Modules, Tailwind, CSS-in-JS).

### Relevant Features
- **Hooks API:** Base UI's hook-first approach (e.g., `useAutocomplete`, `useMenu`) is powerful if DS One prefers to keep the DOM structure completely under its own control without strictly wrapping a component.
- **FormControl:** Provides a robust context for form state management that could inspire DS One's input handling.

### Integration Strategy for DS One
- **Complex Inputs:** Use Base UI hooks for complex inputs like Autocomplete or Select where state management is tricky.
- **State Management:** Leverage their state management hooks for logic-heavy components to avoid reinventing the wheel.

## 3. Shadcn UI

**Repository:** `shadcn-ui/ui`  
**Website:** [ui.shadcn.com](https://ui.shadcn.com)

### Key Characteristics
- **Not a Library:** It is a collection of re-usable components that you copy and paste into your apps.
- **Built on Radix:** Most components are wrappers around Radix UI primitives.
- **Tailwind CSS:** Styled by default using Tailwind, but designed to be customized.
- **Ownership:** The consumer owns the code.

### Concepts to Adopt
- **"Copy-Paste" / Ejection:** While DS One is a library, the philosophy of exposing the component code (or making it easy to override) is valuable.
- **Class Variance Authority (CVA):** Shadcn uses `cva` to manage style variants. DS One might benefit from a similar utility for managing its component variations (primary, secondary, size, etc.) in a type-safe way.
- **Registry Pattern:** The way Shadcn organizes components (independent files, minimal dependencies) serves as a good reference for maintaining a clean, modular codebase.

## Summary & Recommendations

For **DS One**, the strongest integration path is:

1.  **Adopt Radix UI (or Base UI) for Accessibility:** Do not rebuild complex interactive logic (Dialogs, Popovers) from scratch. Wrap these headless primitives to ensure `ds one` components are accessible by default.
2.  **Reference Shadcn's API Design:** Shadcn's component APIs are modern and developer-friendly. Review their prop naming and composition patterns when designing new `ds-` components.
3.  **Documentation:** Notice how these libraries document "Accessibility" explicitly for each component. DS One documentation should mirror this practice.
