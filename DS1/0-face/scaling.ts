// scaling.ts
// Responsive scaling utilities for the design system

import { signal } from "@lit-labs/signals";

export type ScalingMode = "auto" | "fixed" | "fluid";

export interface ScalingConfig {
  mode: ScalingMode;
  baseWidth: number;
  minScale: number;
  maxScale: number;
}

const defaultConfig: ScalingConfig = {
  mode: "auto",
  baseWidth: 280,
  minScale: 0.75,
  maxScale: 2.0,
};

// Reactive scaling factor signal
export const scalingFactor = signal<number>(1);

// Current scaling configuration
export const scalingConfig = signal<ScalingConfig>(defaultConfig);

/**
 * Calculate the scaling factor based on viewport width
 * @param viewportWidth - Current viewport width in pixels
 * @param config - Scaling configuration
 * @returns The calculated scaling factor
 */
export function calculateScalingFactor(
  viewportWidth: number,
  config: ScalingConfig = scalingConfig.get()
): number {
  if (config.mode === "fixed") {
    return 1;
  }

  const rawScale = viewportWidth / config.baseWidth;
  const clampedScale = Math.max(
    config.minScale,
    Math.min(config.maxScale, rawScale)
  );

  return Number(clampedScale.toFixed(3));
}

/**
 * Set the scaling configuration
 * @param config - Partial scaling configuration to apply
 */
export function setScalingConfig(config: Partial<ScalingConfig>): void {
  const currentConfig = scalingConfig.get();
  const newConfig = { ...currentConfig, ...config };
  scalingConfig.set(newConfig);

  // Recalculate scaling factor if in browser
  if (typeof window !== "undefined") {
    updateScalingFactor();
  }
}

/**
 * Update the scaling factor based on current viewport
 */
export function updateScalingFactor(): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const viewportWidth = document.documentElement.clientWidth;
  const config = scalingConfig.get();
  const newFactor = calculateScalingFactor(viewportWidth, config);

  scalingFactor.set(newFactor);

  // Update CSS custom property
  document.documentElement.style.setProperty("--sf", newFactor.toString());

  // Dispatch event for components that need to react
  window.dispatchEvent(
    new CustomEvent("scaling-changed", {
      detail: { scalingFactor: newFactor, config },
    })
  );
}

/**
 * Get the current scaling factor
 * @returns The current scaling factor
 */
export function getScalingFactor(): number {
  return scalingFactor.get();
}

/**
 * Convert a design pixel value to scaled pixels
 * @param designPx - The design pixel value (based on 280px width)
 * @returns The scaled pixel value
 */
export function scale(designPx: number): number {
  return designPx * scalingFactor.get();
}

/**
 * Convert a scaled pixel value back to design pixels
 * @param scaledPx - The scaled pixel value
 * @returns The design pixel value
 */
export function unscale(scaledPx: number): number {
  const factor = scalingFactor.get();
  return factor === 0 ? scaledPx : scaledPx / factor;
}

/**
 * Initialize scaling system
 * This is typically called automatically when the module loads
 */
export function initScaling(): void {
  if (typeof window === "undefined") {
    return;
  }

  // Initial calculation
  updateScalingFactor();

  // Update on resize (debounced)
  let resizeTimeout: ReturnType<typeof setTimeout>;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateScalingFactor();
    }, 100);
  });

  // Update on orientation change
  window.addEventListener("orientationchange", () => {
    setTimeout(updateScalingFactor, 100);
  });
}

// Auto-initialize when module loads in browser
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScaling);
  } else {
    initScaling();
  }
}
