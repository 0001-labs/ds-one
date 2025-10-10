// viewMode.ts
// View mode utilities for managing text/image view states

export type ViewMode = "text" | "image";

const VIEW_MODE_KEY = "ds-view-mode";
const DEFAULT_VIEW_MODE: ViewMode = "text";

/**
 * Get the current view mode from localStorage or return default
 */
export function getViewMode(): ViewMode {
  if (typeof window === "undefined") {
    return DEFAULT_VIEW_MODE;
  }

  try {
    const stored = localStorage.getItem(VIEW_MODE_KEY);
    return stored === "image" || stored === "text" ? stored : DEFAULT_VIEW_MODE;
  } catch {
    return DEFAULT_VIEW_MODE;
  }
}

/**
 * Set the view mode in localStorage and dispatch change event
 */
export function setViewMode(mode: ViewMode): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(VIEW_MODE_KEY, mode);

    // Dispatch custom event for components to listen to
    window.dispatchEvent(
      new CustomEvent("view-mode-changed", {
        detail: mode,
      })
    );
  } catch (error) {
    console.warn("Failed to save view mode:", error);
  }
}

/**
 * Toggle between text and image view modes
 */
export function toggleViewMode(): ViewMode {
  const currentMode = getViewMode();
  const newMode = currentMode === "text" ? "image" : "text";
  setViewMode(newMode);
  return newMode;
}
