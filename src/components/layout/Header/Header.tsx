import React, { FC } from 'react';
import { Logo } from '../../ui';
import { HeaderProps } from '../types';
import s from './Header.module.css';

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
