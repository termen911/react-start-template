import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { BaseLayout } from 'src/shared';
import { Navigation } from './navigation/Navigation';
import { I18nProvider, ThemeProvider } from './providers';
import { AppInitializer } from './providers/AppInitializer';
import { store } from './store';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter basename="/react-start-template/">
      <Provider store={store}>
        <I18nProvider>
          <ThemeProvider>
            <AppInitializer>
              <BaseLayout>
                <Navigation />
              </BaseLayout>
            </AppInitializer>
          </ThemeProvider>
        </I18nProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
