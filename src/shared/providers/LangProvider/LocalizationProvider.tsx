import React, { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { LocalizationContextType, LocalizationScheme } from './types';
import i18n from './i18n.config';
const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
  defaultScheme?: LocalizationScheme;
}

const LOCALIZATION_SCHEME_KEY = 'localization-scheme';

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  defaultScheme = LocalizationScheme.ru,
}) => {
  const [langScheme, setLangScheme] = useState<LocalizationScheme>(() => {
    // Проверяем сохраненную тему в localStorage
    const savedScheme = localStorage.getItem(LOCALIZATION_SCHEME_KEY) as LocalizationScheme;
    if (savedScheme === LocalizationScheme.ru || savedScheme === LocalizationScheme.en) {
      return savedScheme;
    }

    return Object.values(LocalizationScheme).includes(navigator.language as LocalizationScheme)
      ? (navigator.language as LocalizationScheme)
      : defaultScheme;
  });

  const toggleLangScheme = () => {
    setLangScheme((prevScheme) =>
      prevScheme === LocalizationScheme.ru ? LocalizationScheme.en : LocalizationScheme.ru
    );
  };

  const handleSetLangScheme = (scheme: LocalizationScheme) => {
    setLangScheme(scheme);
  };

  useLayoutEffect(() => {
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem(LOCALIZATION_SCHEME_KEY, langScheme);

    // Применяем тему к корневому элементу через data-атрибут
    document.documentElement.setAttribute('lang', langScheme);
  }, [langScheme]);

  useEffect(() => {
    i18n.changeLanguage(langScheme);
  }, [langScheme]);

  const contextValue: LocalizationContextType = {
    langScheme,
    toggleLangScheme,
    setLangScheme: handleSetLangScheme,
    t: (key: string) => i18n.t(key, { lng: langScheme }),
  };

  return <LocalizationContext.Provider value={contextValue}>{children}</LocalizationContext.Provider>;
};

export const useLocalizationScheme = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);

  if (context === undefined) {
    throw new Error('useLocalizationScheme должен использоваться внутри LocalizationProvider');
  }

  return context;
};

// Экспортируем типы для использования в других компонентах
export type { LocalizationContextType };
