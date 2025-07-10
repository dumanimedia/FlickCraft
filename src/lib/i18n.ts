type TranslationObject = Record<string, any>;

const defaultLocale = "en";

async function loadLocale(locale: string): Promise<TranslationObject> {
  try {
    const messages = await import(`../i18n/${locale}.json`);
    return messages.default;
  } catch (e) {
    console.warn(
      `Missing translations for '${locale}', falling back to '${defaultLocale}'.`
    );
    const fallback = await import(`../i18n/${defaultLocale}.json`);
    return fallback.default;
  }
}

function getValueByKeyPath(obj: any, keyPath: string): string {
  return keyPath
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : keyPath),
      obj
    );
}

/**
 * Loads the translations and returns a `t()` function to access keys
 */
export async function useTranslations(locale: string) {
  const translations = await loadLocale(locale);

  function t(key: string): string {
    return getValueByKeyPath(translations, key);
  }

  return { t };
}
