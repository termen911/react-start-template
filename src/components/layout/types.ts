import { ReactNode } from 'react';

export interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface LayoutProps {
  children: ReactNode;
  className?: string;
}
