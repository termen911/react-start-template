import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
      en: {
        translation: {
          navigation: import('src/shared/config/locales/en/navigation.json'),
        },
      },
      ru: {
        translation: {
          navigation: import('src/shared/config/locales/ru/navigation.json'),
        },
      },
    },
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
