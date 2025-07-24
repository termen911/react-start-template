import React, { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute';
import { SpinLoader } from './SpinLoader/SpinLoader';

// Создаем компонент для обработки ошибок
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary поймал ошибку:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Что-то пошло не так.</h2>
          <button onClick={() => this.setState({ hasError: false })}>Попробовать снова</button>
        </div>
      );
    }

    return this.props.children;
  }
}

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
const WrappedLoginPage = withSuspenseAndErrorBoundary(lazy(() => import('src/pages/login/ui/LoginPage')));
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
      <Route path="/transactions" element={<WrappedTransactionsPage />} />
      <Route path="/transactions/:id" element={<WrappedTransactionDetailPage />} />
      <Route path="/login" element={<WrappedLoginPage />} />
      <Route path="*" element={<WrappedNotFoundPage />} />
    </Routes>
  );
};
