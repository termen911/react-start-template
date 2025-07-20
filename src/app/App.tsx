import React from 'react';
import { RouterProvider } from 'react-router';
import { routeConfig } from './config';
import { I18nProvider, ThemeProvider } from './providers';
import './styles/global.scss';

function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        <RouterProvider router={routeConfig} />
      </ThemeProvider>
    </I18nProvider>
  );
}

export default App;
