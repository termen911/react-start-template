import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import { BaseLayout } from 'src/layouts/base-layout';

// Lazy loading компонентов для избежания циклических зависимостей
const HomePage = lazy(() => import('src/pages/home/ui/HomePage').then((module) => ({ default: module.HomePage })));
const ProfilePage = lazy(() =>
  import('src/pages/profile/ui/ProfilePage').then((module) => ({ default: module.ProfilePage }))
);
const ProductsPage = lazy(() =>
  import('src/pages/products/ui/ProductsPage').then((module) => ({ default: module.ProductsPage }))
);
const TransactionsPage = lazy(() =>
  import('src/pages/transactions/ui/TransactionsPage').then((module) => ({ default: module.TransactionsPage }))
);

// Компонент обертка для Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/profile',
        element: (
          <SuspenseWrapper>
            <ProfilePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/products',
        element: (
          <SuspenseWrapper>
            <ProductsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: '/transactions',
        element: (
          <SuspenseWrapper>
            <TransactionsPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
]);
