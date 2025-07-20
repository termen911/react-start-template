import React, { ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config/i18n';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Loading translations...</div>}>{children}</Suspense>
    </I18nextProvider>
  );
};
