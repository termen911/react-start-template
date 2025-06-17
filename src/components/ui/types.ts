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
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}
