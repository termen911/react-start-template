import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { BaseLayout } from 'src/shared';
import { Navigation } from './navigation/Navigation';
import { I18nProvider, ThemeProvider } from './providers';
import { AppInitializer } from './providers/AppInitializer';
import { store } from './store';
import './styles/global.scss';
import { QueryClientProvider } from './providers/QueryClientProvider';

function App() {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '/' : '/react-start-template/'}>
      <Provider store={store}>
        <I18nProvider>
          <ThemeProvider>
            <QueryClientProvider>
              <AppInitializer>
                <BaseLayout>
                  <Navigation />
                </BaseLayout>
              </AppInitializer>
            </QueryClientProvider>
          </ThemeProvider>
        </I18nProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
