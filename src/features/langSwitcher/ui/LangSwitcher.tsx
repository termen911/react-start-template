import { Button, Typography } from 'antd';
import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';

export const LangSwitcher = () => {
  const { changeLanguage, currentLang } = useAppTranslation();

  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    changeLanguage(newLang);
  };

  return (
    <Button type="text" onClick={toggleLang}>
      <Typography.Text style={{ fontSize: 16 }}>{currentLang === 'en' ? '🇷🇺' : 'en'}</Typography.Text>
    </Button>
  );
};
