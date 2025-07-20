import { Button, Flex, Layout, Space } from 'antd';
import React, { useState } from 'react';
import { UserAvatar } from 'src/features/auth/userAvatar';
import { LangSwitcher } from 'src/features/langSwitcher';
import { ThemeSwitcherButton } from 'src/features/themeSwitcher';
import { Logo } from 'src/shared/ui/logo';
import { Navigation } from './Navigation';

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <Layout.Header>
      <Flex gap={16} align="center">
        <Logo />
        <Navigation />
        <Space>
          <Flex gap={16} align="center">
            <LangSwitcher />
            <ThemeSwitcherButton />
            {isAuthenticated ? (
              <UserAvatar />
            ) : (
              <Button type="primary" onClick={() => setIsAuthenticated(true)}>
                Login
              </Button>
            )}
          </Flex>
        </Space>
      </Flex>
    </Layout.Header>
  );
};
