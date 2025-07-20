import { theme } from 'antd';
import React from 'react';
import { NavLink } from 'react-router';

export const Logo = () => {
  const { token } = theme.useToken();

  return (
    <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="40" height="40" rx="8" fill={token.colorPrimary} />
        <path d="M20 30L30 20L40 30L30 40L20 30Z" fill="white" />
      </svg>
    </NavLink>
  );
};
