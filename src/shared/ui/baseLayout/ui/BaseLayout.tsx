import { App } from 'antd';
import React from 'react';
import { Outlet } from 'react-router';

export const BaseLayout = () => {
  return (
    <App>
      <Outlet />
    </App>
  );
};
