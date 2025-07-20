import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { BaseLayout } from 'src/layouts/base-layout';
import { HomePage } from 'src/pages/home';

export const RouterProvider: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          {/* Главная страница */}
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
