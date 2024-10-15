import i18n, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '../../locales/en.json';
import ko from '../../locales/ko.json';

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const locales = RNLocalize.getLocales();
    if (locales && locales.length > 0) {
      return locales[0].languageTag;
    } else {
      return 'en';
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
