import { Spin } from 'antd';
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import NotFoundPage from 'src/pages/notFound/ui/NotFoundPage';
import { BaseLayout } from 'src/shared/ui/baseLayout';

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

// Компонент для загрузки
const PageLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    }}
  >
    <Spin size="large" />
  </div>
);

// HOC для обертывания компонентов в Suspense и ErrorBoundary
const withSuspenseAndErrorBoundary = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
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

// Создаем обернутые компоненты
const WrappedHomePage = withSuspenseAndErrorBoundary(HomePage);
const WrappedProfilePage = withSuspenseAndErrorBoundary(ProfilePage);
const WrappedTransactionsPage = withSuspenseAndErrorBoundary(TransactionsPage);
const WrappedTransactionDetailPage = withSuspenseAndErrorBoundary(TransactionDetailPage);
const WrappedNotFoundPage = withSuspenseAndErrorBoundary(NotFoundPage);

export const routeConfig = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <WrappedHomePage />,
      },
      {
        path: '/profile',
        element: <WrappedProfilePage />,
      },
      {
        path: '/transactions',
        element: <WrappedTransactionsPage />,
      },
      {
        path: '/transactions/:id',
        element: <WrappedTransactionDetailPage />,
      },
      {
        path: '*',
        element: <WrappedNotFoundPage />,
      },
    ],
  },
]);
