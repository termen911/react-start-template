import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: {
        navigation: {
          profile: string;
          products: string;
          transactions: string;
        };
      };
    };
  }
}
