---
title: UI Library Research (Radix UI, Base UI, shadcn/ui)
description: Practical patterns from popular UI libraries that DS One can adopt (without switching stacks)
---

This page summarizes what **Radix UI**, **Base UI**, and **shadcn/ui** do well—and the specific patterns DS One (Lit-based Web Components) can adopt.

## Repos (canonical)

- **Radix UI Primitives**: `https://github.com/radix-ui/primitives` (MIT) — accessible, composable React primitives
- **Base UI**: `https://github.com/mui/base-ui` (MIT) — headless React components + low-level hooks (uses Floating UI)
- **shadcn/ui**: `https://github.com/shadcn-ui/ui` (MIT) — “distribution platform” of components (largely Radix + Tailwind)

## What DS One can *directly* reuse vs “port as a pattern”

- **Direct reuse**: mostly *ideas*, not source, because DS One is **Web Components** (Lit), while the libraries above are **React**.
- **Port-as-pattern** (high-value): focus management, keyboard interaction, state modeling, composition APIs, styling hooks, and accessibility contracts.

## Radix UI: patterns worth borrowing

### 1) `asChild` / “slotting” composition
Radix’s `Primitive` components support an `asChild` prop, rendering a `Slot` wrapper that *merges props/events* onto the provided child element (rather than forcing a specific DOM tag).

Why it matters for DS One:
- **Avoid wrapper DOM** when consumers want their own `<a>`/`button`/`div` while keeping DS One behavior.
- Enables patterns like “make this `ds-button` behave like a link” *without* adding ad-hoc `href` logic inside the component.

A Web Components analogue:
- Prefer **light-dom composition** with slots + `::slotted()` styling.
- For “asChild”-like behavior, provide a **`part`-based API** and an opt-in mode that *upgrades the slotted element* (attach listeners/ARIA to the slotted child) instead of rendering an internal `<button>`.

### 2) “Primitives + utilities” structure
Radix isn’t only components; it’s also reusable utilities like:
- **roving focus** (keyboard navigation within a collection)
- **focus scope / focus guards** (modal focus trapping)
- **dismissable layer** (outside click / escape to close)
- **portal / presence** (render overlays elsewhere + mount/unmount animation support)

Why it matters for DS One:
- DS One already has overlay-ish components (`ds-tooltip`) and interactive structures (`ds-accordion`, `ds-list`, `ds-navigation` docs). These benefit from standardized, tested interaction primitives.

DS One integration idea:
- Create an internal `DS1/2-core/behavior/` (or similar) set of utilities:
  - `focus-scope` (trap + restore)
  - `dismissable-layer` (pointerdown outside + escape)
  - `roving-focus` (arrow key navigation)
  - `portal` (render to `document.body` or configurable root)

### 3) Controlled vs uncontrolled state discipline
Radix’s `useControllableState` formalizes “controlled prop vs internal state”, with dev warnings for switching.

Why it matters for DS One:
- For Web Components, the analogue is: **attribute/property control** vs internal state.

DS One integration idea:
- Adopt a consistent pattern:
  - If attribute/property is present, treat it as source-of-truth.
  - Emit `*-change` events with `{ detail: nextValue }`.
  - Never silently switch control modes mid-lifecycle.

## Base UI: patterns worth borrowing

### 1) State → `data-*` attributes as styling contract
Base UI standardizes state exposure via attributes like `data-disabled`, `data-focused`, `data-filled`, `data-invalid`, etc.

Why it matters for DS One:
- DS One already relies heavily on **CSS custom properties** for theming.
- Adding **stateful attributes** makes styling variants and interaction states far easier than deep selectors.

DS One integration idea:
- For interactive components, reflect key state as attributes on the host:
  - `ds-input`: `[data-filled]`, `[data-focused]`, `[data-invalid]`
  - `ds-tooltip`: `[data-state="open|closed"]`
  - `ds-accordion`: use `[open]` on `<details>` already—mirror on host if helpful

### 2) `mergeProps` (event handler composition + class/style merge)
Base UI explicitly merges props in a predictable way:
- event handlers chain
- `className` concatenates
- `style` merges

Why it matters for DS One:
- Web Components don’t merge React props, but you *do* often merge:
  - internal listeners + consumer listeners
  - internal inline styles + consumer overrides

DS One integration idea:
- Standardize a “composition” helper for:
  - chaining listeners (`composeHandlers(a,b)`) with a clear cancellation mechanism
  - merging class tokens on internal parts

### 3) Floating UI as an overlay positioning engine
Base UI depends on `@floating-ui/*` for tooltip/popover/menu positioning.

Why it matters for DS One:
- Current `ds-tooltip` uses absolute positioning relative to the host; it won’t handle viewport edges, flipping, collision padding, or anchored overlays.

DS One integration idea:
- Add Floating UI (DOM) for overlay components (tooltip, popover, dropdown, context menu).
- Define a shared overlay API:
  - `placement`, `offset`, `flip`, `shift`, `arrow`, `collisionPadding`

## shadcn/ui: patterns worth borrowing

### 1) “Build your own library” distribution model
shadcn/ui isn’t a runtime component dependency; it’s a **curated set of components you copy into your codebase**, with consistent conventions.

Why it matters for DS One:
- DS One already looks like a “library you own”. shadcn’s key value is **conventions + velocity**.

DS One integration idea:
- Establish a DS One “component recipe” standard:
  - file naming, exports, docs template
  - tokens usage
  - accessibility checklist per component

### 2) `data-slot` conventions
shadcn components attach `data-slot="..."` to subparts. This is a lightweight, framework-agnostic hook for styling/testing.

Why it matters for DS One:
- Web Components already have **`part`** (best for styling) and test selectors.

DS One integration idea:
- Keep using `part` for styling, but also consider `data-slot` on internal nodes for:
  - easier integration tests
  - consumer-specific targeting when `::part()` isn’t enough

### 3) Variants as a first-class concept
shadcn uses a variant system (e.g., `variant`, `size`) and encodes state with `data-variant`, `data-size`.

Why it matters for DS One:
- DS One already has `variant` (e.g. `ds-button`). Extending the pattern across components makes the system more predictable.

DS One integration idea:
- For each component, define:
  - a small set of variants
  - a consistent attribute naming scheme (`variant`, `size`, etc.)
  - mirror variant selection into `data-variant` on the host for styling

## Concrete “DS One backlog” inspired by this research

### High-impact utilities (foundation)
- **Overlay foundation**: portal + anchored positioning + outside-dismiss + escape-dismiss
- **Focus foundation**: focus trap + restore + roving tabindex
- **State foundation**: consistent controlled/uncontrolled attribute/property pattern

### Component upgrades (immediately relevant)
- **`ds-tooltip`**
  - add proper ARIA (`role="tooltip"`, trigger `aria-describedby`)
  - add open/close delay + `data-state` and `data-side`
  - use a shared overlay positioning utility (Floating UI-style)
- **`ds-input`**
  - implement fully (currently stubbed)
  - expose `data-focused`, `data-filled`, `data-invalid`, `data-disabled`
  - integrate with a future `ds-field` (label, description, error)

## Licensing / safety notes

All three repos above are **MIT**, which generally allows reuse of ideas and code with attribution. For DS One, treat this page as guidance to **re-implement patterns** (not copy/paste React internals).
