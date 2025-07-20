export { lightTheme } from './lightTheme';
export { darkTheme } from './darkTheme';

import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { ThemeMode } from 'src/shared/types/theme';

export const getThemeConfig = (mode: ThemeMode) => (mode === 'light' ? lightTheme : darkTheme);
