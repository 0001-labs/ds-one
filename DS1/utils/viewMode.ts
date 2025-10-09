// View mode state management utility
export type ViewMode = "text" | "image";

const VIEW_KEY = "view";

// Reactive-ish holder, mirrors language pattern
export const currentViewMode = {
  value: ((): ViewMode => {
    try {
      const saved = localStorage.getItem(VIEW_KEY);
      return saved === "image" ? "image" : "text";
    } catch (_e) {
      return "text";
    }
  })(),
  set(mode: ViewMode) {
    this.value = mode;
    try {
      localStorage.setItem(VIEW_KEY, mode);
    } catch (_e) {
      /* no-op */
    }
    window.dispatchEvent(
      new CustomEvent("view-mode-changed", {
        detail: mode,
        bubbles: true,
        composed: true,
      })
    );
  },
};

export function getViewMode(): ViewMode {
  return currentViewMode.value;
}

export function setViewMode(mode: ViewMode): void {
  currentViewMode.set(mode);
}

export function initializeViewMode(): void {
  const mode = getViewMode();
  window.dispatchEvent(new CustomEvent("view-mode-changed", { detail: mode }));
}
