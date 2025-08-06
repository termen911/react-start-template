import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
};
