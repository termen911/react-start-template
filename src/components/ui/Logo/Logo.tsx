import React, { FC } from 'react';
import s from './Logo.module.css';
import { LogoProps, Sizes } from '../types';

export const Logo: FC<LogoProps> = ({ size = Sizes.medium }) => {
  return (
    <div className={`${s.logo} ${s[size]}`}>
      <div className={s.icon}>
        <div className={s.circle}></div>
        <div className={s.innerCircle}></div>
      </div>
      <span className={s.text}>OTUS</span>
    </div>
  );
};
