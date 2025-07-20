import React from 'react';
import { RouterProvider } from 'react-router';
import { routes } from 'src/shared/config';
import { ThemeProvider } from './providers';
import './styles/global.scss';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
