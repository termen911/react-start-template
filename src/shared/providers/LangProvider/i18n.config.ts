import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LocalizationScheme } from './types';

// Импортируем файлы переводов
import enTranslations from './locales/en.json';
import ruTranslations from './locales/ru.json';

// Определяем ресурсы переводов
const resources = {
  [LocalizationScheme.ru]: {
    translation: ruTranslations,
  },
  [LocalizationScheme.en]: {
    translation: enTranslations,
  },
};

// Инициализируем i18n
i18n.use(initReactI18next).init({
  lng: LocalizationScheme.ru,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
