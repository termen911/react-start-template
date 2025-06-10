import React, { FC } from 'react';
import { Logo } from '../../ui';
import { ThemeToggle } from '../../ui/ThemeToggle';
import { Sizes } from '../../ui/types';
import { HeaderProps } from '../types';
import s from './Header.module.css';
import { LocalizationToggle } from 'src/components/ui/LocalizationToggle/LocalizationToggle';

export const Header: FC<HeaderProps> = ({ children, className }) => {
  return (
    <header className={`${s.header} ${className || ''}`}>
      <div className={s.container}>
        <div className={s.logoSection}>
          <Logo size={Sizes.medium} />
        </div>

        {children && <div className={s.content}>{children}</div>}

        <div className={s.themeSwitcher}>
          <ThemeToggle />
          <LocalizationToggle />
        </div>
      </div>
    </header>
  );
};
