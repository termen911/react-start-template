import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { worker } from './mocks/browser';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// Дожидаемся инициализации MSW перед рендерингом приложения
worker.start().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
