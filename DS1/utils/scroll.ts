// scroll.ts
// Scroll position utilities for carrying scroll position across page navigations

export type ScrollPosition = {
  x: number;
  y: number;
};

const SCROLL_POSITION_KEY = "ds-scroll-position";

/**
 * Save the current scroll position
 */
export function saveScrollPosition(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const position: ScrollPosition = {
      x: window.scrollX,
      y: window.scrollY,
    };

    sessionStorage.setItem(SCROLL_POSITION_KEY, JSON.stringify(position));
  } catch (error) {
    console.warn("[DS one] Failed to save scroll position:", error);
  }
}

/**
 * Get the saved scroll position
 */
export function getScrollPosition(): ScrollPosition | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = sessionStorage.getItem(SCROLL_POSITION_KEY);

    if (!stored) {
      return null;
    }

    const position = JSON.parse(stored) as ScrollPosition;

    // Validate the parsed data
    if (
      typeof position.x === "number" &&
      typeof position.y === "number" &&
      !isNaN(position.x) &&
      !isNaN(position.y)
    ) {
      return position;
    }

    return null;
  } catch (error) {
    console.warn("[DS one] Failed to retrieve scroll position:", error);
    return null;
  }
}

/**
 * Restore the saved scroll position
 */
export function restoreScrollPosition(
  options: { smooth?: boolean; clear?: boolean } = {}
): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const position = getScrollPosition();

  if (!position) {
    return false;
  }

  try {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo({
        left: position.x,
        top: position.y,
        behavior: options.smooth ? "smooth" : "instant",
      });

      // Optionally clear the saved position after restoring
      if (options.clear) {
        clearScrollPosition();
      }

      // Dispatch custom event
      window.dispatchEvent(
        new CustomEvent("scroll-restored", {
          detail: position,
        })
      );
    });

    return true;
  } catch (error) {
    console.warn("[DS one] Failed to restore scroll position:", error);
    return false;
  }
}

/**
 * Clear the saved scroll position
 */
export function clearScrollPosition(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.removeItem(SCROLL_POSITION_KEY);
  } catch (error) {
    console.warn("[DS one] Failed to clear scroll position:", error);
  }
}

/**
 * Initialize scroll position management
 * Call this once to set up automatic save/restore behavior
 */
export function initScrollManagement(
  options: {
    autoSave?: boolean;
    autoRestore?: boolean;
    smooth?: boolean;
    clearOnRestore?: boolean;
  } = {}
): void {
  if (typeof window === "undefined") {
    return;
  }

  const {
    autoSave = true,
    autoRestore = true,
    smooth = false,
    clearOnRestore = false,
  } = options;

  // Auto-save scroll position before leaving the page
  if (autoSave) {
    window.addEventListener("beforeunload", () => {
      saveScrollPosition();
    });

    // Also save on history state changes (for SPAs)
    window.addEventListener("pagehide", () => {
      saveScrollPosition();
    });
  }

  // Auto-restore scroll position when page loads
  if (autoRestore) {
    const restore = () => {
      restoreScrollPosition({ smooth, clear: clearOnRestore });
    };

    if (document.readyState === "loading") {
      // Wait for DOM to be ready
      document.addEventListener("DOMContentLoaded", restore);
    } else {
      // DOM is already ready
      restore();
    }
  }
}

// Auto-initialize scroll management when module loads
if (typeof window !== "undefined") {
  initScrollManagement({
    autoSave: true,
    autoRestore: true,
    smooth: false,
    clearOnRestore: false,
  });
}
