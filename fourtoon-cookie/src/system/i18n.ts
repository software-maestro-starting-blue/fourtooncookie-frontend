import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from '../../locales/en.json';
import ko from '../../locales/ko.json';

const deviceLanguage = Localization.getLocales()[0]?.languageCode || 'en';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },
    lng: deviceLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
