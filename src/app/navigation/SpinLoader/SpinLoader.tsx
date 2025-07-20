import { Spin } from 'antd';
import React from 'react';

export const SpinLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
      }}
    >
      <Spin size="large" />
    </div>
  );
};
