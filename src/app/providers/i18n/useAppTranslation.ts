import { useTranslation } from 'react-i18next';

export const useAppTranslation = () => {
  // Используем translation namespace
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return { t, changeLanguage, currentLang: i18n.language };
};
