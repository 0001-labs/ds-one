import { LitElement, html, css } from "lit";
import {
  translate,
  currentLanguage,
  getAvailableLanguagesSync,
  getLanguageDisplayName,
  setLanguage,
} from "../0-face/i18n";
import type { LanguageCode } from "../0-face/i18n";
import { currentTheme, setTheme } from "../0-face/theme";
import type { ThemeType } from "../0-face/theme";
import { savePreferences } from "../0-face/preferences";
import "./ds-button";
import "./ds-icon";
import "./ds-text";

// Accent color utilities
const saveAccentColor = (color: string) => {
  localStorage.setItem("accentColor", color);
};

const getAccentColor = (): string => {
  return localStorage.getItem("accentColor") || "--sharp-blue"; // Default color if none set
};

const applyAccentColor = () => {
  const color = getAccentColor();
  document.documentElement.style.setProperty("--accent-color", `var(${color})`);
};

// Notes style medium utilities
const saveNotesStyleMedium = (style: string) => {
  localStorage.setItem("notesStyleMedium", style);
};

const getNotesStyleMedium = (): string => {
  return localStorage.getItem("notesStyleMedium") || "note"; // Default to note
};

// Note behavior utilities
const savePageStyle = (style: string) => {
  localStorage.setItem("pageStyle", style);
};

const getPageStyle = (): string => {
  return localStorage.getItem("pageStyle") || "note"; // Default to note
};

// App width utilities removed

// Use a regular class with proper TypeScript type declarations and JSDoc comments
export class Cycle extends LitElement {
  // Define reactive properties using Lit's property system
  static get properties() {
    return {
      type: { type: String },
      values: { type: Array },
      currentValue: { type: String, state: true }, // Make this a private state property
      translationsReady: { type: Boolean, state: true }, // Track if translations are loaded
      disabled: { type: Boolean, state: true },
      variant: { type: String },
    };
  }

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
    }

    .cycle {
      display: inline-flex;
      align-items: center;
      gap: var(--025);
    }

    .color-preview {
      width: var(--05);
      height: var(--05);
      border-radius: 999px;
      border: 1px solid
        color-mix(in srgb, var(--text-color-primary) 20%, transparent);
      flex: 0 0 auto;
    }
  `;

  // Add runtime properties using the any type
  // These are just for TypeScript and don't create shadowing fields
  declare type: string;
  declare values: string[];
  declare currentValue: string;
  declare translationsReady: boolean;
  declare disabled: boolean;
  declare variant: string;

  // Store bound event handlers for proper cleanup
  private boundHandlers: {
    translationsLoaded: EventListener;
    languageChanged: EventListener;
    handleLanguageChanged: EventListener;
    handleThemeChanged: EventListener;
    handleAccentColorChanged: EventListener;
    handleNoteBehaviorChanged: EventListener;
  };

  constructor() {
    super();

    // Initialize properties with default values
    this.type = "";
    this.values = [];
    this.currentValue = "";
    this.translationsReady = false;
    this.disabled = false;
    this.variant = "";

    // Bind event handlers to this instance for proper cleanup
    this.boundHandlers = {
      translationsLoaded: this.handleTranslationsLoaded.bind(this),
      languageChanged: this.handleLanguageChanged.bind(this),
      handleLanguageChanged: this.handleLanguageChanged.bind(this),
      handleThemeChanged: this.handleThemeChanged.bind(this),
      handleAccentColorChanged: this.handleAccentColorChanged.bind(this),
      handleNoteBehaviorChanged: this.handleNoteBehaviorChanged.bind(this),
    };
  }

  connectedCallback() {
    super.connectedCallback();

    // Add event listeners
    window.addEventListener(
      "translations-loaded",
      this.boundHandlers.translationsLoaded
    );
    window.addEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
    window.addEventListener(
      "theme-changed",
      this.boundHandlers.handleThemeChanged
    );
    window.addEventListener(
      "accent-color-changed",
      this.boundHandlers.handleAccentColorChanged
    );
    window.addEventListener(
      "page-style-changed",
      this.boundHandlers.handleNoteBehaviorChanged
    );

    // Initialize the component
    this.initializeValues();
  }

  async initializeValues() {
    if (this.type === "language") {
      // Dynamically get available languages from translation data
      const availableLanguages = getAvailableLanguagesSync();
      this.values = availableLanguages;
      this.currentValue = currentLanguage.value;
    } else if (this.type === "theme") {
      // Set up theme cycling
      this.values = ["light", "dark"];

      // Set initial value based on current theme
      const currentThemeValue = currentTheme.get();
      this.currentValue = currentThemeValue;
    } else if (this.type === "accent-color") {
      // Set up accent color cycling
      this.values = [
        "--apple-green",
        "--every-green",
        "--zenith-blue",
        "--sharp-blue",
        "--pink",
        "--tuned-red",
        "--orange",
        "--yellow",
      ];

      // Set initial value based on current accent color
      const currentAccentColor = getAccentColor();
      this.currentValue = currentAccentColor;

      // Apply the accent color to ensure it's active
      applyAccentColor();
    } else if (this.type === "notes-style-medium") {
      // Set up notes style medium cycling
      this.values = ["default", "big", "gallery"];

      // Set initial value based on current notes style medium
      const currentNotesStyle = getNotesStyleMedium();
      this.currentValue = currentNotesStyle;

      // Check if this should be disabled based on note behavior
      const currentPageStyle = getPageStyle();
      this.disabled = currentPageStyle === "note";
    } else if (this.type === "page-style") {
      // Set up page style cycling
      this.values = ["note", "page"];

      // Set initial value based on current page style
      const currentPageStyle = getPageStyle();
      this.currentValue = currentPageStyle;
    } else if (this.type === "icon-only") {
      // Set up icon-only cycling (no label)
      this.values = ["note", "page"];

      // Set initial value
      this.currentValue = this.values[0];
    }

    // Request update to re-render with new values
    this.requestUpdate();
  }

  ensureThemeInitialized() {
    // Ensure theme is properly initialized
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      localStorage.setItem("theme", defaultTheme);
      document.documentElement.classList.add(`${defaultTheme}-theme`);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name === "type" && oldValue !== newValue) {
      // Type changed, reinitialize values
      this.initializeValues();
    }
  }

  async setupInitialValue() {
    if (this.type === "language") {
      // Get current language
      const currentLang = currentLanguage.value;
      this.currentValue = currentLang;
    } else if (this.type === "theme") {
      // Get current theme
      const currentThemeValue = currentTheme.get();
      this.currentValue = currentThemeValue;
    } else if (this.type === "accent-color") {
      // Get current accent color
      const currentAccentColor = getAccentColor();
      this.currentValue = currentAccentColor;

      // Apply the accent color to ensure it's active
      applyAccentColor();
    } else if (this.type === "notes-style-medium") {
      // Get current notes style medium
      const currentNotesStyle = getNotesStyleMedium();
      this.currentValue = currentNotesStyle;

      // Check if this should be disabled based on note behavior
      const currentPageStyle = getPageStyle();
      this.disabled = currentPageStyle === "note";
    } else if (this.type === "page-style") {
      // Get current page style
      const currentPageStyle = getPageStyle();
      this.currentValue = currentPageStyle;
    } else if (this.type === "icon-only") {
      // Get current page style for icon-only
      const currentPageStyle = getPageStyle();
      this.currentValue = currentPageStyle;
    }

    this.requestUpdate();
  }

  handleSettingsChanges() {
    // Handle any settings changes that might affect this component
    this.setupInitialValue();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove event listeners
    window.removeEventListener(
      "translations-loaded",
      this.boundHandlers.translationsLoaded
    );
    window.removeEventListener(
      "language-changed",
      this.boundHandlers.languageChanged
    );
    window.removeEventListener(
      "theme-changed",
      this.boundHandlers.handleThemeChanged
    );
    window.removeEventListener(
      "accent-color-changed",
      this.boundHandlers.handleAccentColorChanged
    );
    window.removeEventListener(
      "page-style-changed",
      this.boundHandlers.handleNoteBehaviorChanged
    );
  }

  handleButtonClick(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    // Don't handle clicks if disabled
    if (this.disabled) {
      return;
    }

    if (this.type === "language") {
      // Cycle through available languages
      const currentIndex = this.values.indexOf(this.currentValue);
      const nextIndex = (currentIndex + 1) % this.values.length;
      const newLanguage = this.values[nextIndex];

      // Update current value
      this.currentValue = newLanguage;

      // Set the new language with view transition like Portfolio
      if ((document as any).startViewTransition) {
        (document as any).startViewTransition(() => {
          setLanguage(newLanguage as LanguageCode);
        });
      } else {
        setLanguage(newLanguage as LanguageCode);
      }

      // Save preferences
      savePreferences({ language: newLanguage as LanguageCode });

      // Dispatch language change event
      window.dispatchEvent(
        new CustomEvent("language-changed", {
          detail: { language: newLanguage },
        })
      );
    } else if (this.type === "theme") {
      // Cycle through themes
      const currentIndex = this.values.indexOf(this.currentValue);
      const nextIndex = (currentIndex + 1) % this.values.length;
      const newTheme = this.values[nextIndex];

      // Update current value
      this.currentValue = newTheme;

      // Set the new theme using the shared helper
      setTheme(newTheme as ThemeType);

      // Save preferences
      savePreferences({ theme: newTheme as ThemeType });

      // Theme helper already emits the change event, so no manual dispatch here
    } else if (this.type === "accent-color") {
      // Cycle through accent colors
      const currentIndex = this.values.indexOf(this.currentValue);
      const nextIndex = (currentIndex + 1) % this.values.length;
      const newColor = this.values[nextIndex];

      // Update current value
      this.currentValue = newColor;

      // Save the new accent color
      saveAccentColor(newColor);

      // Apply the new accent color
      applyAccentColor();

      // Save preferences
      savePreferences({ accentColor: newColor });

      // Dispatch accent color change event
      window.dispatchEvent(
        new CustomEvent("accent-color-changed", {
          detail: { color: newColor },
        })
      );
    } else if (this.type === "notes-style-medium") {
      // Cycle through notes style medium options
      const currentIndex = this.values.indexOf(this.currentValue);
      const nextIndex = (currentIndex + 1) % this.values.length;
      const newStyle = this.values[nextIndex];

      // Update current value
      this.currentValue = newStyle;

      // Save the new notes style medium
      saveNotesStyleMedium(newStyle);

      // Save preferences
      savePreferences({ notesStyleMedium: newStyle });

      // Dispatch notes style medium change event
      window.dispatchEvent(
        new CustomEvent("notes-style-medium-changed", {
          detail: { style: newStyle },
        })
      );
    } else if (this.type === "page-style") {
      // Cycle through note behavior options
      const currentIndex = this.values.indexOf(this.currentValue);
      const nextIndex = (currentIndex + 1) % this.values.length;
      const newBehavior = this.values[nextIndex];

      // Update current value
      this.currentValue = newBehavior;

      // Save the new note behavior
      savePageStyle(newBehavior);

      // Save preferences
      savePreferences({ pageStyle: newBehavior });

      // Dispatch note behavior change event
      window.dispatchEvent(
        new CustomEvent("page-style-changed", {
          detail: { behavior: newBehavior },
        })
      );
    } else if (this.type === "icon-only") {
      // Cycle through icon-only options (note/page)
      const currentIndex = this.values.indexOf(this.currentValue);
      const nextIndex = (currentIndex + 1) % this.values.length;
      const newIconOnlyValue = this.values[nextIndex];

      // Update current value
      this.currentValue = newIconOnlyValue;

      // Save the new page style
      savePageStyle(newIconOnlyValue);

      // Save preferences
      savePreferences({ pageStyle: newIconOnlyValue });

      // Dispatch page style change event
      window.dispatchEvent(
        new CustomEvent("page-style-changed", {
          detail: { behavior: newIconOnlyValue },
        })
      );
    }

    // Request update to re-render
    this.requestUpdate();
  }

  getValueDisplay(value: string): string | any {
    if (this.type === "language") {
      return getLanguageDisplayName(value, {
        locale: currentLanguage.value,
      });
    } else if (this.type === "theme") {
      // Try to get translated theme name
      if (this.translationsReady) {
        const translatedName = translate(value);
        if (translatedName && translatedName !== value) {
          return translatedName;
        }
      }

      // Fall back to the theme value itself
      return value;
    } else if (this.type === "accent-color") {
      // Get color name from CSS variable
      return this.getColorName(value);
    } else if (this.type === "notes-style-medium") {
      // Return SVG icon for notes style medium
      return this.getNotesStyleIcon(value);
    } else if (this.type === "page-style") {
      // Return translated text for note behavior
      if (this.translationsReady) {
        const translatedText = translate(value === "note" ? "note" : "page");
        if (
          translatedText &&
          translatedText !== (value === "note" ? "note" : "page")
        ) {
          return translatedText;
        }
      }
      return value;
    } else if (this.type === "icon-only") {
      // Return SVG icon for icon-only type (note/page icons)
      if (value === "note") {
        return html`<ds-icon type="note"></ds-icon>`;
      } else if (value === "page") {
        return html`<ds-icon type="page"></ds-icon>`;
      }
      return html`<span>${value}</span>`;
    }

    return value;
  }

  getColorKey(colorVar: string): string {
    // Map CSS variables to language keys
    const colorMap: { [key: string]: string } = {
      "--tuned-red": "red",
      "--orange": "orange",
      "--yellow": "yellow",
      "--apple-green": "appleGreen",
      "--every-green": "green",
      "--zenith-blue": "lightBlue",
      "--sharp-blue": "blue",
      "--pink": "pink",
    };

    return colorMap[colorVar] || colorVar.replace("--", "").replace("-", " ");
  }

  getColorName(colorVar: string): string {
    // Map CSS variables to language keys
    const colorMap: { [key: string]: string } = {
      "--tuned-red": "red",
      "--orange": "orange",
      "--yellow": "yellow",
      "--apple-green": "appleGreen",
      "--every-green": "green",
      "--zenith-blue": "lightBlue",
      "--sharp-blue": "blue",
      "--pink": "pink",
    };

    const languageKey = colorMap[colorVar];
    if (languageKey && this.translationsReady) {
      const translatedName = translate(languageKey);
      if (translatedName && translatedName !== languageKey) {
        return translatedName;
      }
    }

    // Fallback to simple name conversion
    return colorVar.replace("--", "").replace("-", " ");
  }

  getNotesStyleIcon(style: string) {
    if (style === "page") {
      return html`<ds-icon type="page"></ds-icon>`;
    } else if (style === "note") {
      return html`<ds-icon type="note"></ds-icon>`;
    } else if (style === "default") {
      return html`<ds-icon type="default"></ds-icon>`;
    } else if (style === "big") {
      return html`<ds-icon type="big"></ds-icon>`;
    } else if (style === "gallery") {
      return html`<ds-icon type="gallery"></ds-icon>`;
    }
    return html`<span>${style}</span>`;
  }

  render() {
    return html`
      <div class="cycle">
        <ds-button
          variant=${this.variant ||
          (this.type === "language" || this.type === "theme"
            ? "secondary"
            : "primary")}
          ?disabled=${this.disabled}
          @click=${this.handleButtonClick}
        >
          ${this.type === "notes-style-medium" || this.type === "icon-only"
            ? html`<span
                style="display: inline-flex; align-items: center; gap: var(--025)"
                >${this.getValueDisplay(this.currentValue)}</span
              >`
            : this.type === "language"
              ? html`<ds-text
                  default-value=${this.getValueDisplay(this.currentValue)}
                ></ds-text>`
              : this.type === "theme"
                ? html`<ds-text
                    key=${this.currentValue}
                    default-value=${this.currentValue}
                  ></ds-text>`
                : this.type === "accent-color"
                  ? html`<ds-text
                      key=${this.getColorKey(this.currentValue)}
                      default-value=${this.getColorName(this.currentValue)}
                    ></ds-text>`
                  : this.type === "page-style"
                    ? html`<ds-text
                        key=${this.currentValue}
                        default-value=${this.currentValue}
                      ></ds-text>`
                    : html`<ds-text
                        default-value=${this.getValueDisplay(this.currentValue)}
                      ></ds-text>`}
        </ds-button>

        ${this.type === "accent-color"
          ? html`
              <div
                class="color-preview"
                style="background-color: var(${this.currentValue})"
              ></div>
            `
          : ""}
      </div>
    `;
  }

  private async waitForTranslations(): Promise<void> {
    return new Promise((resolve) => {
      if (this.translationsReady) {
        resolve();
        return;
      }

      const handleTranslationsLoaded = () => {
        this.translationsReady = true;
        resolve();
      };

      window.addEventListener("translations-loaded", handleTranslationsLoaded, {
        once: true,
      });

      // Timeout after 5 seconds
      setTimeout(() => {
        this.translationsReady = true;
        resolve();
      }, 5000);
    });
  }

  private handleTranslationsLoaded() {
    this.translationsReady = true;

    // Refresh language values if this is a language cycle
    if (this.type === "language") {
      const availableLanguages = getAvailableLanguagesSync();
      this.values = availableLanguages;
    }

    this.setupInitialValue();
  }

  private handleLanguageChanged() {
    this.setupInitialValue();
  }

  private handleThemeChanged() {
    this.setupInitialValue();
  }

  private handleAccentColorChanged() {
    this.setupInitialValue();
  }

  private handleNoteBehaviorChanged() {
    this.setupInitialValue();
  }
}

customElements.define("ds-cycle", Cycle);

declare global {
  interface HTMLElementTagNameMap {
    "ds-cycle": Cycle;
  }
}
