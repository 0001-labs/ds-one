// to be moved into portfolio project. not realted to here

export type ViewMode = "text" | "image";

const STORAGE_KEY = "ds-one:view-mode";

function getInitialViewMode(): ViewMode {
  if (typeof window === "undefined") {
    return "text";
  }

  const stored = window.localStorage?.getItem(STORAGE_KEY);
  if (stored === "text" || stored === "image") {
    return stored;
  }

  return "text";
}

export function getViewMode(): ViewMode {
  return getInitialViewMode();
}

export function setViewMode(mode: ViewMode): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage?.setItem(STORAGE_KEY, mode);
  } catch (error) {
    console.warn("ds-one: unable to persist view mode preference", error);
  }

  window.dispatchEvent(
    new CustomEvent("view-mode-changed", {
      detail: mode,
      bubbles: true,
      composed: true,
    })
  );
}
