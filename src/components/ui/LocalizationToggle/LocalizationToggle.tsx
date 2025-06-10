import React from 'react';
import { useLocalizationScheme } from 'src/shared/providers/LangProvider';
import s from './LocalizationToggle.module.css';

export const LocalizationToggle = () => {
  const { langScheme, toggleLangScheme } = useLocalizationScheme();
  return <button className={s.localizationToggle} onClick={toggleLangScheme}>{langScheme}</button>;
};
