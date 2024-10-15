import i18n, { LanguageDetectorModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '../../locales/en.json'; // 영어 번역 파일
import ko from '../../locales/ko.json'; // 한국어 번역 파일

// 언어 감지 함수 설정
const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const locales = RNLocalize.getLocales();
    if (locales && locales.length > 0) {
      return locales[0].languageTag;
    } else {
      return 'en'; // 기본값은 영어
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

// i18next 초기화
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // 기본 언어 설정
    compatibilityJSON: 'v3', // JSON 포맷 호환성 설정 (i18next 버전 20 이상에서 필요)
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },
    interpolation: {
      escapeValue: false, // React는 XSS 보호를 위해 escaping을 자동으로 처리합니다.
    },
  });

export default i18n;
