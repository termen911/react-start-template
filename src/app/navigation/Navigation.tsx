import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { SpinLoader } from './SpinLoader/SpinLoader';

// HOC для обертывания компонентов в Suspense и ErrorBoundary
const withSuspenseAndErrorBoundary = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary>
      <Suspense fallback={<SpinLoader />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );

  // Добавляем displayName для отладки
  const componentName = Component.displayName || Component.name || 'Unknown';
  WrappedComponent.displayName = `withSuspenseAndErrorBoundary(${componentName})`;

  return WrappedComponent;
};

// Создаем обернутые компоненты
const WrappedHomePage = withSuspenseAndErrorBoundary(lazy(() => import('src/pages/home/ui/HomePage')));
const WrappedProfilePage = withSuspenseAndErrorBoundary(lazy(() => import('src/pages/profile/ui/ProfilePage')));
const WrappedTransactionsPage = withSuspenseAndErrorBoundary(
  lazy(() => import('src/pages/transactions/ui/TransactionsPage'))
);
const WrappedTransactionDetailPage = withSuspenseAndErrorBoundary(
  lazy(() => import('src/pages/transactions/ui/TransactionDetailPage'))
);
const WrappedNotFoundPage = withSuspenseAndErrorBoundary(lazy(() => import('src/pages/notFound/ui/NotFoundPage')));
const WrappedSignupPage = withSuspenseAndErrorBoundary(lazy(() => import('src/pages/auth/signup/ui/SignupPage')));
const WrappedSigninPage = withSuspenseAndErrorBoundary(lazy(() => import('src/pages/auth/signin/ui/SigninPage')));

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<WrappedHomePage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <WrappedProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <WrappedTransactionsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <ProtectedRoute>
            <WrappedTransactionDetailPage />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<WrappedSigninPage />} />
      <Route path="/signup" element={<WrappedSignupPage />} />
      <Route path="*" element={<WrappedNotFoundPage />} />
    </Routes>
  );
};
