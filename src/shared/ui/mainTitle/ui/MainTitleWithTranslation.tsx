import React from 'react';
import { useAppTranslation } from 'src/app/providers/i18n';
import type { MainTitleProps } from '../model';
import { MainTitle } from './MainTitle';

interface MainTitleWithTranslationProps extends Omit<MainTitleProps, 'backText'> {
  backTextKey?: string;
}

export const MainTitleWithTranslation: React.FC<MainTitleWithTranslationProps> = ({
  backTextKey = 'common.back',
  ...props
}) => {
  const { t } = useAppTranslation();

  return <MainTitle {...props} backText={props.onBack ? t(backTextKey) : undefined} />;
};
