import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BaseLayout } from 'src/shared';
import { Navigation } from './navigation/Navigation';
import { I18nProvider, ThemeProvider } from './providers';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ThemeProvider>
          <BaseLayout>
            <Navigation />
          </BaseLayout>
        </ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  );
}

export default App;
