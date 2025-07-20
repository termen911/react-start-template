import React, { ReactNode, Suspense } from 'react';

export const withSuspense = <P extends object>(
  Component: React.ComponentType<P>,
  fallback: ReactNode = 'Загрузка...'
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );

  // Добавляем displayName для отладки
  const name = (Component as any).displayName || (Component as any).name || 'Unknown';
  WrappedComponent.displayName = `withSuspense(${name})`;

  return WrappedComponent;
};
