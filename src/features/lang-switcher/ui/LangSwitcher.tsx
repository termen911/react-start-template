import React from 'react';
import { Button } from 'antd';
import { useAppTranslation } from 'src/app/providers/i18n';

export const LangSwitcher = () => {
  const { changeLanguage, currentLang } = useAppTranslation();

  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    changeLanguage(newLang);
  };

  return <Button onClick={toggleLang}>{currentLang === 'en' ? '🇷🇺 Русский' : '🇬🇧 English'}</Button>;
};
