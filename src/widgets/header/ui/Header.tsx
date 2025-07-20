import { Flex, Layout, Space } from 'antd';
import React from 'react';
import { LangSwitcher } from 'src/features/lang-switcher';
import { ThemeSwitcherButton } from 'src/features/theme-switcher';
import { Logo } from 'src/shared/ui/Logo';
import { Navigation } from './Navigation';

export const Header = () => {
  return (
    <Layout.Header>
      <Flex gap={16} align="center">
        <Logo />
        <Navigation />
        <Space>
          <Flex gap={16} align="center">
            <LangSwitcher />
            <ThemeSwitcherButton />
            <div>123</div>
          </Flex>
        </Space>
      </Flex>
    </Layout.Header>
  );
};
