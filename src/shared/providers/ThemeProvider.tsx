import React, { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react';

export enum ThemeScheme {
  light = 'light',
  dark = 'dark',
}

interface ThemeContextType {
  themeScheme: ThemeScheme;
  toggleThemeScheme: () => void;
  setThemeScheme: (scheme: ThemeScheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultScheme?: ThemeScheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultScheme = ThemeScheme.light }) => {
  const [themeScheme, setThemeScheme] = useState<ThemeScheme>(() => {
    // Проверяем сохраненную тему в localStorage
    const savedScheme = localStorage.getItem('theme-scheme') as ThemeScheme;
    if (savedScheme === ThemeScheme.light || savedScheme === ThemeScheme.dark) {
      return savedScheme;
    }

    // Проверяем системные предпочтения пользователя
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return ThemeScheme.dark;
    }

    return defaultScheme;
  });

  const toggleThemeScheme = () => {
    setThemeScheme((prevScheme) => (prevScheme === ThemeScheme.light ? ThemeScheme.dark : ThemeScheme.light));
  };

  const handleSetThemeScheme = (scheme: ThemeScheme) => {
    setThemeScheme(scheme);
  };

  useLayoutEffect(() => {
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem('theme-scheme', themeScheme);

    // Применяем тему к корневому элементу через data-атрибут
    document.documentElement.setAttribute('data-theme', themeScheme);
  }, [themeScheme]);

  // Слушаем изменения системных предпочтений
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Обновляем тему только если пользователь не выбрал конкретную тему
      const savedScheme = localStorage.getItem('theme-scheme');
      if (!savedScheme) {
        setThemeScheme(e.matches ? ThemeScheme.dark : ThemeScheme.light);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const contextValue: ThemeContextType = {
    themeScheme,
    toggleThemeScheme,
    setThemeScheme: handleSetThemeScheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useThemeScheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeScheme должен использоваться внутри ThemeProvider');
  }

  return context;
};

// Экспортируем типы для использования в других компонентах
export type { ThemeContextType };
