import { App } from 'antd';
import React from 'react';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return <App>{children}</App>;
};
