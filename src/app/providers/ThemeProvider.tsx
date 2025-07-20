import { ConfigProvider } from 'antd';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getThemeConfig } from '../../shared/lib/antd/themes';
import { ThemeContextValue, ThemeMode } from '../../shared/types/theme';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  // Применяем тему к body для глобальных стилей
  useEffect(() => {
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  const contextValue: ThemeContextValue = {
    mode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={getThemeConfig(mode)}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};
