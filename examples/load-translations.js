// Load translations from keys.json
// This script should be included before components load

async function loadTranslations() {
  try {
    const response = await fetch("./keys.json");
    const translations = await response.json();

    // Store translations in window for language.ts to access
    window.DS_ONE_TRANSLATIONS = translations;

    console.log(
      "Translations loaded:",
      Object.keys(translations).length,
      "languages"
    );

    // Dispatch event to notify language.ts
    window.dispatchEvent(new CustomEvent("translations-ready"));
  } catch (error) {
    console.error("Failed to load translations:", error);
  }
}

// Load translations before components initialize
loadTranslations();
