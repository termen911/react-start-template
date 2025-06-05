import React, { FC } from 'react';
import { Header } from '../Header';
import { LayoutProps } from '../types';
import s from './Layout.module.css';

export const Layout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`${s.layout} ${className || ''}`}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
};
