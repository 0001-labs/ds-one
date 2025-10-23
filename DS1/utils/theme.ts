import { signal } from "@lit-labs/signals";

export type ThemeType = "light" | "dark";

function getInitialTheme(): ThemeType {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage?.getItem("ds-one:theme");
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  // Check system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export const currentTheme = signal<ThemeType>(getInitialTheme());

export function setTheme(theme: ThemeType): void {
  if (theme === currentTheme.get()) {
    return;
  }

  currentTheme.set(theme);

  if (typeof window !== "undefined") {
    try {
      window.localStorage?.setItem("ds-one:theme", theme);
    } catch (error) {
      console.warn("ds-one: unable to persist theme preference", error);
    }

    const root = window.document?.documentElement;
    if (root) {
      root.classList.remove("light-theme", "dark-theme");
      root.classList.add(`${theme}-theme`);
    }

    window.dispatchEvent(
      new CustomEvent("theme-changed", { detail: { theme } })
    );
  }
}

// Initialize theme on load
if (typeof window !== "undefined") {
  const theme = currentTheme.get();
  const root = window.document?.documentElement;
  if (root) {
    root.classList.remove("light-theme", "dark-theme");
    root.classList.add(`${theme}-theme`);
  }
}
