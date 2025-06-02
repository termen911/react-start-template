import React, { FC, ReactNode } from 'react';
import s from './Header.module.css';
import { Logo } from '../../ui';

interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export const Header: FC<HeaderProps> = ({ children, className }) => {
  return (
    <header className={`${s.header} ${className || ''}`}>
      <div className={s.container}>
        <div className={s.logoSection}>
          <Logo size="medium" />
        </div>

        {children && <div className={s.content}>{children}</div>}
      </div>
    </header>
  );
};
