import { ReactNode } from 'react';

export enum Sizes {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface LogoProps {
  size?: Sizes;
}

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
}
