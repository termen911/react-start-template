import React, { FC, ReactNode } from 'react';
import { Header } from '../Header';
import s from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={`${s.layout} ${className || ''}`}>
      <Header />
      <main className={s.main}>{children}</main>
    </div>
  );
};
