import { useContext } from 'react';
import { ThemeContextValue } from '../types/theme';
import { ThemeContext } from 'src/app/providers/ThemeProvider';

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
};
