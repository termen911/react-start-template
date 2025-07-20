import { Layout } from 'antd';
import React, { ReactNode } from 'react';
import { Header } from 'src/widgets/header/ui/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <Header />
      </Layout.Header>

      <Layout.Content style={{ padding: '16px' }}>{children}</Layout.Content>
    </Layout>
  );
};
