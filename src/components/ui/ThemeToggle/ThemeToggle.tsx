import React from 'react';
import { ThemeScheme, useThemeScheme } from 'src/shared/providers/ThemeProvider';
import s from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { themeScheme, toggleThemeScheme } = useThemeScheme();
  return (
    <button className={s.themeToggle} onClick={toggleThemeScheme}>
      {themeScheme === ThemeScheme.light ? '🌙' : '☀️'}
    </button>
  );
};
