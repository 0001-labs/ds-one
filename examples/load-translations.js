// Load translations from keys.json
// This script should be included in examples to enable language switching

async function loadTranslations() {
  try {
    const response = await fetch('./keys.json');
    const translations = await response.json();
    
    // Store translations in window for components to access
    window.DS_ONE_TRANSLATIONS = translations;
    
    console.log('Translations loaded:', Object.keys(translations).length, 'keys');
    
    // Dispatch event to notify language.ts to load from window
    window.dispatchEvent(new CustomEvent('translations-ready'));
    
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
}

// Load translations when page loads
loadTranslations();

