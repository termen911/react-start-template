import { Button, Flex, Layout, Space } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/app/store';
import { selectSessionIsAuthenticated } from 'src/entities/session';
import { setLastRedirect } from 'src/entities/session/model/slice';
import { UserAvatar } from 'src/features/auth/userAvatar';
import { LangSwitcher } from 'src/features/langSwitcher';
import { ThemeSwitcherButton } from 'src/features/themeSwitcher';
import { Logo } from 'src/shared/ui/logo';
import { Navigation } from './Navigation';

export const Header = () => {
  const isAuthenticated = useSelector(selectSessionIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

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
              <Button
                type="primary"
                onClick={() => {
                  dispatch(setLastRedirect(location.pathname));
                  navigate('/login');
                }}
              >
                Login
              </Button>
            )}
          </Flex>
        </Space>
      </Flex>
    </Layout.Header>
  );
};
