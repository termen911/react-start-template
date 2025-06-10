export enum LocalizationScheme {
  ru = 'ru',
  en = 'en',
}

export interface LocalizationContextType {
  langScheme: LocalizationScheme;
  toggleLangScheme: () => void;
  setLangScheme: (scheme: LocalizationScheme) => void;
}
