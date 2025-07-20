import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
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

// Lazy loading компонентов
const HomePage = lazy(() => import('src/pages/home/ui/HomePage'));
const ProfilePage = lazy(() => import('src/pages/profile/ui/ProfilePage'));
const TransactionsPage = lazy(() => import('src/pages/transactions/ui/TransactionsPage'));
const TransactionDetailPage = lazy(() => import('src/pages/transactions/ui/TransactionDetailPage'));
const NotFoundPage = lazy(() => import('src/pages/notFound/ui/NotFoundPage'));

// Создаем обернутые компоненты
const WrappedHomePage = withSuspenseAndErrorBoundary(HomePage);
const WrappedProfilePage = withSuspenseAndErrorBoundary(ProfilePage);
const WrappedTransactionsPage = withSuspenseAndErrorBoundary(TransactionsPage);
const WrappedTransactionDetailPage = withSuspenseAndErrorBoundary(TransactionDetailPage);
const WrappedNotFoundPage = withSuspenseAndErrorBoundary(NotFoundPage);

export const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<WrappedHomePage />} />
      <Route path="/profile" element={<WrappedProfilePage />} />
      <Route path="/transactions" element={<WrappedTransactionsPage />} />
      <Route path="/transactions/:id" element={<WrappedTransactionDetailPage />} />
      <Route path="*" element={<WrappedNotFoundPage />} />
    </Routes>
  );
};
