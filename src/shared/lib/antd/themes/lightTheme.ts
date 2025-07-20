import type { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    colorBgContainer: '#ffffff',
    colorText: '#000000',
    colorTextSecondary: '#666666',
    colorBgLayout: '#f5f5f5',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: '#000000',
    },
  },
  algorithm: undefined, // default algorithm
};
