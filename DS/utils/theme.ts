import { signal } from "@lit-labs/signals";

export type ThemeType = "light" | "dark";

const storedTheme =
  typeof window !== "undefined"
    ? window.localStorage?.getItem("ds-one:theme") ?? undefined
    : undefined;

export const currentTheme = signal<ThemeType>(
  (storedTheme as ThemeType | undefined) || "light"
);

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
