import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useTheme } from '../model';

export const ThemeSwitcherButton = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Button
      size="large"
      type="text"
      onClick={toggleTheme}
      icon={mode === 'light' ? <SunOutlined /> : <MoonOutlined />}
    />
  );
};
