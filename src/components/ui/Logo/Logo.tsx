import React, { FC } from 'react';
import { useLocalizationScheme } from 'src/shared/providers/LangProvider';
import { LogoProps, Sizes } from '../types';
import s from './Logo.module.css';

export const Logo: FC<LogoProps> = ({ size = Sizes.medium }) => {
  const { t } = useLocalizationScheme();

  return (
    <div className={`${s.logo} ${s[size]}`}>
      <div className={s.icon}>
        <div className={s.circle}></div>
        <div className={s.innerCircle}></div>
      </div>
      <span className={s.text}>{t('common.logoName')}</span>
    </div>
  );
};
